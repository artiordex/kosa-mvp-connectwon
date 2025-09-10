/**
 * Description : schedule-session.ts - 📌 세션 스케줄링
 * Author      : Shiwoo Min
 * Date        : 2025-09-10
 */
import { Injectable } from '@nestjs/common';

import { randomUUID } from 'node:crypto';

// 인메모리 세션 모델
export interface ScheduledSession {
  id: string;
  programId: string;
  date: string; // ISO string
  capacity: number;
  participants: string[];
  waitlist: string[];
}

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
