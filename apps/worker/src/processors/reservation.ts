/**
 * Description : reservation.ts - 📌 예약 처리기
 * Author : Shiwoo Min
 * Date : 2025-09-12
 */
import type { Job } from 'bullmq';

// 예약 작업 데이터 타입
export type ReservationJobData = {
  reservationId: string;
  userId?: string;
  meta?: Record<string, unknown>;
};

// 예약 처리기
export async function reservationProcessor(job: Job<ReservationJobData>) {
  const { reservationId, userId } = job.data;

  // 여기에 실제 비즈니스 로직 배치:
  // 1. DB에서 예약 상태 확인/갱신
  // 2. 좌석/재고/대기열 처리
  // 3. 후속 작업 enqueue (알림 등)
  console.log(
    `[worker][reservation] processing job ${job.id} → reservationId=${reservationId} userId=${userId ?? '-'}`,
  );

  // TODO: 실제 처리… (예: await reservationService.confirm(reservationId))
  // 실패를 유도하려면 throw Error(...) 처리하면 BullMQ 재시도 동작
  return { ok: true, reservationId };
}
