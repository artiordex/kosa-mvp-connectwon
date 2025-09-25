/**
 * Description : reservation.processor.ts - 📌 예약 관련 비동기 작업 처리 Processor
 * Author : Shiwoo Min
 * Date : 2025-09-26
 */
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import type { IReservationService } from './reservation.interface';
import { Job } from 'bullmq';

export enum ReservationQueue {
  NOTIFICATION = 'reservation_notifications',
  REMINDERS = 'reservation_reminders',
  WAITLIST = 'reservation_waitlist',
  CONFLICT = 'reservation_conflicts',
}

@Injectable()
@Processor(ReservationQueue.NOTIFICATION)
export class ReservationProcessor extends WorkerHost {
  private readonly logger = new Logger(ReservationProcessor.name);

  constructor(private readonly reservationService: IReservationService) {
    super();
  }

  /**
   * @description 예약 관련 알림 처리 (확인, 취소, 안내 등)
   * Job Data 예시:
   * {
   *   type: 'confirmation' | 'cancellation' | 'reminder',
   *   reservationId: string
   * }
   */
  async process(job: Job<any, any, string>): Promise<void> {
    this.logger.debug(`Processing job [${job.name}] with data: ${JSON.stringify(job.data)}`);

    const { type, reservationId } = job.data;

    switch (type) {
      case 'confirmation':
        // TODO: 예약 확정 알림 발송
        await this.reservationService.sendReservationConfirmation(reservationId);
        break;
      case 'cancellation':
        // TODO: 예약 취소 알림 발송
        await this.reservationService.sendCancellationNotice(reservationId);
        break;
      case 'reminder':
        // TODO: 예약 리마인더 발송
        await this.reservationService.sendReservationReminder(reservationId);
        break;
      default:
        this.logger.warn(`Unknown notification job type: ${type}`);
    }
  }
}

@Injectable()
@Processor(ReservationQueue.REMINDERS)
export class ReservationReminderProcessor extends WorkerHost {
  private readonly logger = new Logger(ReservationReminderProcessor.name);

  constructor(private readonly reservationService: IReservationService) {
    super();
  }

  /**
   * @description 예약 리마인더 스케줄링 및 발송
   * Job Data 예시:
   * {
   *   reservationId: string,
   *   remindAt: Date
   * }
   */
  async process(job: Job<any, any, string>): Promise<void> {
    const { reservationId, remindAt } = job.data;

    this.logger.debug(`Scheduling reminder for reservation ${reservationId} at ${remindAt}`);

    // TODO: 예약 시간 - remindAt 기준으로 알림 발송
    await this.reservationService.scheduleReminders(reservationId);
  }
}

@Injectable()
@Processor(ReservationQueue.WAITLIST)
export class ReservationWaitlistProcessor extends WorkerHost {
  private readonly logger = new Logger(ReservationWaitlistProcessor.name);

  constructor(private readonly reservationService: IReservationService) {
    super();
  }

  /**
   * @description 대기자 명단 처리 (승격, 알림 등)
   * Job Data 예시:
   * {
   *   roomId: string,
   *   availableSlot: TimeSlot
   * }
   */
  async process(job: Job<any, any, string>): Promise<void> {
    const { roomId, availableSlot } = job.data;

    this.logger.debug(`Processing waitlist for room ${roomId} with slot ${JSON.stringify(availableSlot)}`);

    // TODO: 대기자 명단 사용자들에게 알림
    await this.reservationService.notifyWaitlistUsers(roomId, availableSlot);

    // TODO: 조건 충족 시 대기자 자동 승격 처리 (promoteFromWaitlist)
    await this.reservationService.promoteFromWaitlist(roomId, 1); // 슬롯 1개 예시
  }
}

@Injectable()
@Processor(ReservationQueue.CONFLICT)
export class ReservationConflictProcessor extends WorkerHost {
  private readonly logger = new Logger(ReservationConflictProcessor.name);

  constructor(private readonly reservationService: IReservationService) {
    super();
  }

  /**
   * @description 예약 충돌 감지 및 해결
   * Job Data 예시:
   * {
   *   roomId: string,
   *   startTime: Date,
   *   endTime: Date
   * }
   */
  async process(job: Job<any, any, string>): Promise<void> {
    const { roomId, startTime, endTime } = job.data;

    this.logger.debug(`Checking conflicts for room ${roomId} between ${startTime} and ${endTime}`);

    // TODO: 충돌 탐지
    const conflicts = await this.reservationService.detectReservationConflicts(roomId, startTime, endTime);

    if (conflicts.length > 0) {
      this.logger.warn(`Found conflicts: ${JSON.stringify(conflicts)}`);

      for (const conflict of conflicts) {
        // TODO: 자동 해결 또는 관리자 알림
        await this.reservationService.resolveConflict(conflict.id, {
          strategy: 'notify-admin',
        });
      }
    }
  }
}
