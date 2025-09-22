/**
 * Description : schedule.ts - 📌 세션 스케줄링
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';

/**
 * @description 스케줄 세션 인터페이스
 */
export interface ScheduledSession {
  /** @description 세션 고유 ID */
  id: string;
  /** @description 소속 프로그램 ID */
  programId: string;
  /** @description 세션 날짜 */
  date: string;
  /** @description 세션 정원 */
  capacity: number;
  /** @description 참가자 ID 목록 */
  participants: string[];
  /** @description 대기열 ID 목록 */
  waitlist: string[];
}

/**
 * @description 세션 스케줄링 유스케이스
 * @summary 프로그램에 새로운 세션을 스케줄링하는 비즈니스 로직 처리
 */
@Injectable()
export class ScheduleSessionUsecase {
  /**
   * @description 새 세션 스케줄링 실행
   * @param programId 세션이 속할 프로그램 ID
   * @param date 세션 날짜
   * @param capacity 세션 정원
   * @returns 생성된 스케줄 세션 객체
   * @example
   * ```typescript
   * const session = usecase.execute('prog123', '2025-12-25', 20);
   * // { id: 'uuid...', programId: 'prog123', date: '2025-12-25', capacity: 20, participants: [], waitlist: [] }
   * ```
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
