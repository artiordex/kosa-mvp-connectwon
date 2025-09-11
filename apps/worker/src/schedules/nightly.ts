/**
 * Description : nightly.ts - 📌 야간 배치 작업 스케줄러
 * Author : Shiwoo Min
 * Date : 2025-09-12
 */
import type { Queue } from 'bullmq';

type Ctx = {
  reservationQueue: Queue;
  notificationQueue: Queue;
};

// 매일 새벽 스케줄러
export function registerNightlySchedules(ctx: Ctx) {
  // 예약 정리 작업
  ctx.reservationQueue.add(
    'nightly.reservation.cleanup',
    { reindex: true },
    {
      repeat: { pattern: '0 4 * * *', tz: 'Asia/Seoul' },
      jobId: 'nightly:reservation:cleanup',
    },
  );

  // 리마인더 알림 작업
  ctx.notificationQueue.add(
    'nightly.notification.reminder',
    { kind: 'reservation-reminder' },
    {
      repeat: { pattern: '10 4 * * *', tz: 'Asia/Seoul' },
      jobId: 'nightly:notification:reminder',
    },
  );
}
