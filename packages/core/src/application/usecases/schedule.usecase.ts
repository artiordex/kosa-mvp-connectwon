/**
 * Description : schedule.usecase.ts - 📌 세션 스케줄링 유스케이스
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import { randomUUID } from 'node:crypto';

/**
 * @description 스케줄 세션 인터페이스
 */
export interface ScheduledSession {
  id: string;
  programId: string;
  date: string;
  capacity: number;
  participants: string[];
  waitlist: string[];
}

/**
 * @description 세션 스케줄링 유스케이스
 */
export class ScheduleSessionUsecase {
  /**
   * @description 새 세션 스케줄링 실행
   */
  execute(programId: string, date: string, capacity: number): ScheduledSession {
    const safeCapacity = Math.max(0, Math.floor(capacity || 0));

    return {
      id: randomUUID(),
      programId,
      date,
      capacity: safeCapacity,
      participants: [],
      waitlist: [],
    };
  }
}
