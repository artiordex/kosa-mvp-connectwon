/**
 * Description : schedule.ts - 📌 세션 스케줄링
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import { Injectable } from '@nestjs/common';

import { randomUUID } from 'node:crypto';

// 스케줄 세션 인터페이스
export interface ScheduledSession {
  id: string;
  programId: string;
  date: string;
  capacity: number;
  participants: string[];
  waitlist: string[];
}

// 세션 스케줄링 유스케이스
@Injectable()
export class ScheduleSessionUsecase {
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
