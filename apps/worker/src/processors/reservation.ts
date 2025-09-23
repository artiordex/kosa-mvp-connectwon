/**
 * Description : reservation.ts - 📌 예약 처리기
 * Author : Shiwoo Min
 * Date : 2025-09-23
 */

import type { Job } from 'bullmq';
import { logger } from '@connectwon/logger';
import { prisma } from '@connectwon/database';
import { recordJobStart } from '../metrics.js';

/**
 * @description 예약 작업 데이터 타입
 */
export type ReservationJobData = {
  reservationId: string;
  userId?: string;
  action?: 'create' | 'update' | 'cancel' | 'confirm' | 'cleanup';
  meta?: Record<string, unknown>;
};

/**
 * @description 예약 처리 결과 타입
 */
export type ReservationJobResult = {
  ok: boolean;
  reservationId: string;
  action?: string;
  message?: string;
  nextActions?: string[];
};

/**
 * @description 예약 상태 enum
 */
enum ReservationStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
  COMPLETED = 'completed'
}

/**
 * @description 예약 생성 처리
 * @param reservationId - 예약 ID
 * @param userId - 사용자 ID
 */
async function handleReservationCreate(reservationId: string, userId?: string): Promise<ReservationJobResult> {
  logger.info('Processing reservation creation', { reservationId, userId });

  try {
    // 1. 예약 상태 확인
    const reservation = await prisma.reservation.findUnique({
      where: { id: reservationId },
      include: {
        program: true,
        user: true
      }
    });

    if (!reservation) {
      throw new Error(`Reservation ${reservationId} not found`);
    }

    // 2. 좌석/재고 확인
    const availableSlots = await prisma.program.findFirst({
      where: {
        id: reservation.programId,
        maxParticipants: {
          gt: prisma.reservation.count({
            where: {
              programId: reservation.programId,
              status: ReservationStatus.CONFIRMED
            }
          })
        }
      }
    });

    if (!availableSlots) {
      // 대기열 처리
      await prisma.reservation.update({
        where: { id: reservationId },
        data: { status: ReservationStatus.PENDING }
      });

      return {
        ok: true,
        reservationId,
        action: 'waitlisted',
        message: 'Added to waiting list',
        nextActions: ['notification.waitlist']
      };
    }

    // 3. 예약 확정
    await prisma.reservation.update({
      where: { id: reservationId },
      data: {
        status: ReservationStatus.CONFIRMED,
        confirmedAt: new Date()
      }
    });

    return {
      ok: true,
      reservationId,
      action: 'confirmed',
      message: 'Reservation confirmed',
      nextActions: ['notification.confirmation', 'payment.process']
    };

  } catch (error) {
    logger.error('Failed to process reservation creation', {
      reservationId,
      userId,
      error: error instanceof Error ? error.message : String(error)
    });
    throw error;
  }
}

/**
 * @description 예약 취소 처리
 * @param reservationId - 예약 ID
 * @param userId - 사용자 ID
 */
async function handleReservationCancel(reservationId: string, userId?: string): Promise<ReservationJobResult> {
  logger.info('Processing reservation cancellation', { reservationId, userId });

  try {
    // 1. 예약 취소
    const reservation = await prisma.reservation.update({
      where: { id: reservationId },
      data: {
        status: ReservationStatus.CANCELLED,
        cancelledAt: new Date()
      },
      include: {
        program: true
      }
    });

    // 2. 대기열에서 다음 예약자 승격
    const nextWaitingReservation = await prisma.reservation.findFirst({
      where: {
        programId: reservation.programId,
        status: ReservationStatus.PENDING
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    const nextActions: string[] = ['notification.cancellation'];

    if (nextWaitingReservation) {
      await prisma.reservation.update({
        where: { id: nextWaitingReservation.id },
        data: {
          status: ReservationStatus.CONFIRMED,
          confirmedAt: new Date()
        }
      });

      nextActions.push('notification.promoted');
    }

    return {
      ok: true,
      reservationId,
      action: 'cancelled',
      message: 'Reservation cancelled successfully',
      nextActions
    };

  } catch (error) {
    logger.error('Failed to process reservation cancellation', {
      reservationId,
      userId,
      error: error instanceof Error ? error.message : String(error)
    });
    throw error;
  }
}

/**
 * @description 만료된 예약 정리
 * @param reservationId - 예약 ID
 */
async function handleReservationCleanup(reservationId: string): Promise<ReservationJobResult> {
  logger.info('Processing reservation cleanup', { reservationId });

  try {
    // 24시간 이상 지난 미확정 예약들 만료 처리
    const expiredCount = await prisma.reservation.updateMany({
      where: {
        status: ReservationStatus.PENDING,
        createdAt: {
          lt: new Date(Date.now() - 24 * 60 * 60 * 1000) // 24시간 전
        }
      },
      data: {
        status: ReservationStatus.EXPIRED,
        expiredAt: new Date()
      }
    });

    logger.info('Expired reservations cleaned up', {
      expiredCount: expiredCount.count
    });

    return {
      ok: true,
      reservationId: 'batch',
      action: 'cleanup',
      message: `Cleaned up ${expiredCount.count} expired reservations`
    };

  } catch (error) {
    logger.error('Failed to cleanup expired reservations', {
      reservationId,
      error: error instanceof Error ? error.message : String(error)
    });
    throw error;
  }
}

/**
 * @description 예약 상태 업데이트
 * @param reservationId - 예약 ID
 * @param userId - 사용자 ID
 * @param meta - 추가 메타데이터
 */
async function handleReservationUpdate(
  reservationId: string,
  userId?: string,
  meta?: Record<string, unknown>
): Promise<ReservationJobResult> {
  logger.info('Processing reservation update', { reservationId, userId, meta });

  try {
    const updateData: any = {};

    if (meta?.status) {
      updateData.status = meta.status;
    }

    if (meta?.notes) {
      updateData.notes = meta.notes;
    }

    const reservation = await prisma.reservation.update({
      where: { id: reservationId },
      data: {
        ...updateData,
        updatedAt: new Date()
      }
    });

    return {
      ok: true,
      reservationId,
      action: 'updated',
      message: 'Reservation updated successfully',
      nextActions: ['notification.update']
    };

  } catch (error) {
    logger.error('Failed to update reservation', {
      reservationId,
      userId,
      error: error instanceof Error ? error.message : String(error)
    });
    throw error;
  }
}

/**
 * @description 예약 처리기 메인 함수
 * @param job - BullMQ Job 인스턴스
 * @returns 처리 결과
 */
export async function reservationProcessor(job: Job<ReservationJobData>): Promise<ReservationJobResult> {
  const { reservationId, userId, action = 'create', meta } = job.data;

  // 메트릭 기록 시작
  const finishJobMetrics = recordJobStart('reservation', `worker-${process.pid}`);

  logger.info('Starting reservation job processing', {
    jobId: job.id,
    reservationId,
    userId,
    action,
    attempt: job.attemptsMade + 1
  });

  try {
    let result: ReservationJobResult;

    // 액션에 따른 처리 분기
    switch (action) {
      case 'create':
      case 'confirm':
        result = await handleReservationCreate(reservationId, userId);
        break;

      case 'cancel':
        result = await handleReservationCancel(reservationId, userId);
        break;

      case 'update':
        result = await handleReservationUpdate(reservationId, userId, meta);
        break;

      case 'cleanup':
        result = await handleReservationCleanup(reservationId);
        break;

      default:
        throw new Error(`Unknown reservation action: ${action}`);
    }

    // 성공 메트릭 기록
    finishJobMetrics('completed');

    logger.info('Reservation job completed successfully', {
      jobId: job.id,
      reservationId,
      action: result.action,
      message: result.message,
      nextActions: result.nextActions
    });

    return result;

  } catch (error) {
    // 실패 메트릭 기록
    const errorType = error instanceof Error ? error.constructor.name : 'UnknownError';
    finishJobMetrics('failed', errorType);

    logger.error('Reservation job failed', {
      jobId: job.id,
      reservationId,
      userId,
      action,
      attempt: job.attemptsMade + 1,
      error: error instanceof Error ? error.message : String(error)
    });

    // BullMQ 재시도를 위해 에러 재발생
    throw error;
  }
}

/**
 * @description 예약 처리기 헬스체크
 * @returns 처리기 상태
 */
export function getReservationProcessorHealth(): { healthy: boolean; message: string } {
  try {
    // 간단한 헬스체크 로직
    return {
      healthy: true,
      message: 'Reservation processor is healthy'
    };
  } catch (error) {
    return {
      healthy: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
