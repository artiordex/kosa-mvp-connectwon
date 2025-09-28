/**
 * Description : reservation.usecase.ts - 📌 세션 예약/취소 (대기열 승급 포함)
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import type { OverbookingPolicyService } from '@connectwon/core/application/policies/overbooking.policies';
import type { WaitlistPolicyService } from '@connectwon/core/application/policies/waitlist.policy';
import type { Session, UserId } from '@connectwon/core/core-types';

/**
 * @description 예약 유스케이스에서만 사용하는 확장 세션 타입
 */
export interface ReservableSession extends Session {
  participants: UserId[];
  waitlist: UserId[];
  capacity: number; // core-types의 maxParticipants 대신 명확히 사용
}

/**
 * @description 예약 상태 타입
 */
export type BookStatus = 'booked' | 'overbooked' | 'waitlisted' | 'full';
export type CancelStatus = 'not_found' | 'cancelled' | 'cancelled_and_promoted';

/**
 * @description 세션 예약/취소 유스케이스
 */
export class ReservationUsecase {
  constructor(
    private readonly overbooking: OverbookingPolicyService,
    private readonly waitlist: WaitlistPolicyService,
  ) {}

  /**
   * @description 세션 예약
   */
  book(userId: UserId, session: ReservableSession): { status: BookStatus; session: ReservableSession } {
    if (session.participants.includes(userId)) {
      return { status: 'booked', session };
    }

    if (session.participants.length < session.capacity) {
      session.participants.push(userId);
      return { status: 'booked', session };
    }

    if (
      this.overbooking.canOverbook(session.participants.length, session.capacity, {
        mode: 'percent',
        value: 10,
      })
    ) {
      session.participants.push(userId);
      return { status: 'overbooked', session };
    }

    if (this.waitlist.canJoinWaitlist(session.waitlist, userId, { maxWaitlist: 10 })) {
      session.waitlist.push(userId);
      return { status: 'waitlisted', session };
    }

    return { status: 'full', session };
  }

  /**
   * @description 세션 예약 취소 + 대기열 승급
   */
  cancel(userId: UserId, session: ReservableSession): { status: CancelStatus; session: ReservableSession } {
    const before = session.participants.length;
    session.participants = session.participants.filter(id => id !== userId);

    if (session.participants.length === before) {
      return { status: 'not_found', session };
    }

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
