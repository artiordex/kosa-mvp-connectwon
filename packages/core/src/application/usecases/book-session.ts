/**
 * Description : book-session.ts - 📌 세션 예약
 * Author      : Shiwoo Min
 * Date        : 2025-09-10
 */
import { Injectable } from '@nestjs/common';

import { OverbookingPolicyService } from '../policies/overbooking-policy.js';
import { WaitlistPolicyService } from '../policies/waitlist-policy.js';

// 도메인 최소 모델 (인메모리용)
export interface Session {
  id: string;
  capacity: number;
  participants: string[];
  waitlist: string[];
}

export type BookStatus = 'booked' | 'overbooked' | 'waitlisted' | 'full';

@Injectable()
export class BookSessionUsecase {
  constructor(
    private readonly overbooking: OverbookingPolicyService,
    private readonly waitlist: WaitlistPolicyService,
  ) {}

  /**
   * 세션 예약 로직
   * 1) 정원 내 -> 바로 참가
   * 2) 초과 예약 허용 -> 참가 (overbooked)
   * 3) 대기열 가능 -> 대기열 등록
   * 4) 꽉참 -> full
   */
  execute(userId: string, session: Session): { status: BookStatus; session: Session } {
    // 이미 참가 중이면 중복 등록 방지
    if (session.participants.includes(userId)) {
      return { status: 'booked', session };
    }

    // 정원 내
    if (session.participants.length < session.capacity) {
      session.participants.push(userId);
      return { status: 'booked', session };
    }

    // 초과 예약 정책 (예: 10% 허용)
    if (
      this.overbooking.canOverbook(session.participants.length, session.capacity, {
        mode: 'percent',
        value: 10,
      })
    ) {
      session.participants.push(userId);
      return { status: 'overbooked', session };
    }

    // 대기열 정책
    if (this.waitlist.canJoinWaitlist(session.waitlist, userId, { maxWaitlist: 10 })) {
      session.waitlist.push(userId);
      return { status: 'waitlisted', session };
    }

    return { status: 'full', session };
  }
}
