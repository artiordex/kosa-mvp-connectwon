import { prisma } from '../database.js';
import { emailService } from './email.js';
import { logger } from '@connectwon/logger';

export class ReservationService {
  async createReservation(
    userId: string,
    sessionId: string,
    participants: number = 1
  ) {
    try {
      // 세션 정보 조회
      const session = await prisma.session.findUnique({
        where: { id: sessionId },
        include: {
          program: { include: { venue: true } },
          _count: { select: { reservations: true } }
        }
      });

      if (!session) {
        throw new Error('Session not found');
      }

      // 잔여 석 확인
      const availableSlots = session.maxParticipants - session._count.reservations;
      if (availableSlots < participants) {
        throw new Error('Not enough available slots');
      }

      // 중복 예약 확인
      const existingReservation = await prisma.reservation.findFirst({
        where: {
          userId,
          sessionId,
          status: { not: 'CANCELLED' }
        }
      });

      if (existingReservation) {
        throw new Error('Already reserved for this session');
      }

      // 예약 생성
      const reservation = await prisma.reservation.create({
        data: {
          userId,
          sessionId,
          participants,
          totalPrice: session.program.price * participants,
          status: 'PENDING'
        },
        include: {
          session: {
            include: { program: { include: { venue: true } } }
          },
          user: true
        }
      });

      // 확인 이메일 발송
      await emailService.sendBookingConfirmation(
        reservation.user.email,
        reservation.session.program.title,
        reservation.session.startTime
      );

      logger.info('Reservation created', { reservationId: reservation.id });
      return reservation;
    } catch (error) {
      logger.error('Failed to create reservation', { error, userId, sessionId });
      throw error;
    }
  }

  async cancelReservation(reservationId: string, userId: string) {
    try {
      const reservation = await prisma.reservation.findUnique({
        where: { id: reservationId },
        include: { session: true }
      });

      if (!reservation) {
        throw new Error('Reservation not found');
      }

      if (reservation.userId !== userId) {
        throw new Error('Unauthorized');
      }

      // 취소 가능 시간 확인 (예: 2시간 전까지)
      const cancellationDeadline = new Date(reservation.session.startTime);
      cancellationDeadline.setHours(cancellationDeadline.getHours() - 2);

      if (new Date() > cancellationDeadline) {
        throw new Error('Cannot cancel within 2 hours of session start');
      }

      const updatedReservation = await prisma.reservation.update({
        where: { id: reservationId },
        data: { status: 'CANCELLED' }
      });

      logger.info('Reservation cancelled', { reservationId });
      return updatedReservation;
    } catch (error) {
      logger.error('Failed to cancel reservation', { error, reservationId, userId });
      throw error;
    }
  }
}

export const reservationService = new ReservationService();
