/**
 * Description : reservation.ts - 📌 세션 예약/취소 (대기열 승급 포함)
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import { Injectable } from '@nestjs/common';

import { OverbookingPolicyService } from '../policies/overbooking.js';
import { WaitlistPolicyService } from '../policies/waitlist.js';

// 세션 도메인 모델 인터페이스
export interface Session {
  id: string;
  capacity: number;
  participants: string[];
  waitlist: string[];
}

// 예약상태 타입
export type BookStatus = 'booked' | 'overbooked' | 'waitlisted' | 'full';

// 예약취소 결과 타입
export type CancelStatus = 'not_found' | 'cancelled' | 'cancelled_and_promoted';

// 세션 예약취소 유스케이스
@Injectable()
export class ReservationUsecase {
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
  book(userId: string, session: Session): { status: BookStatus; session: Session } {
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

  // 예약 취소 후, 빈자리가 생기면 대기열에서 1명 승급
  cancel(userId: string, session: Session): { status: CancelStatus; session: Session } {
    const before = session.participants.length;

    // 참가자 목록에서 제거
    session.participants = session.participants.filter(id => id !== userId);
    if (session.participants.length === before) {
      // 참가자에 없었음
      return { status: 'not_found', session };
    }

    // 자리 생겼고 대기열 존재 -> 맨 앞 1명 승급
    if (session.waitlist.length > 0 && session.participants.length < session.capacity) {
      const next = session.waitlist.shift();
      if (next && !session.participants.includes(next)) {
        session.participants.push(next);
      }
      return { status: 'cancelled_and_promoted', session };
    }
    return { status: 'cancelled', session };
  }
}
