/**
 * Description : reservation.ts - 📌 세션 예약/취소 (대기열 승급 포함)
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import { Injectable } from '@nestjs/common';
import { OverbookingPolicyService } from '../policies/overbooking.js';
import { WaitlistPolicyService } from '../policies/waitlist.js';

/**
 * @description 세션 도메인 모델 인터페이스
 */
export interface Session {
  /** @description 세션 고유 ID */
  id: string;
  /** @description 세션 정원 */
  capacity: number;
  /** @description 참가자 ID 목록 */
  participants: string[];
  /** @description 대기열 ID 목록 */
  waitlist: string[];
}

/**
 * @description 예약 상태 타입
 */
export type BookStatus = 'booked' | 'overbooked' | 'waitlisted' | 'full';

/**
 * @description 예약 취소 결과 타입
 */
export type CancelStatus = 'not_found' | 'cancelled' | 'cancelled_and_promoted';

/**
 * @description 세션 예약취소 유스케이스
 * @summary 세션 예약, 취소 및 대기열 관리 로직을 통합한 비즈니스 서비스
 */
@Injectable()
export class ReservationUsecase {
  /**
   * @description ReservationUsecase 생성자
   * @param overbooking 초과 예약 정책 서비스
   * @param waitlist 대기열 정책 서비스
   */
  constructor(
    private readonly overbooking: OverbookingPolicyService,
    private readonly waitlist: WaitlistPolicyService,
  ) {}

  /**
   * @description 세션 예약 로직
   * @param userId 예약할 사용자 ID
   * @param session 예약할 세션 (원본이 수정됨)
   * @returns 예약 결과와 업데이트된 세션
   * @summary 예약 우선순위: 정원 내 → 초과 예약 → 대기열 → 거부
   * @example
   * ```typescript
   * const result = usecase.book('user123', session);
   * if (result.status === 'booked') {
   *   console.log('예약 완료');
   * } else if (result.status === 'waitlisted') {
   *   console.log('대기열 등록');
   * }
   * ```
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

  /**
   * @description 예약 취소 후, 빈자리가 생기면 대기열에서 1명 승급
   * @param userId 취소할 사용자 ID
   * @param session 취소할 세션 (원본이 수정됨)
   * @returns 취소 결과와 업데이트된 세션
   * @example
   * ```typescript
   * const result = usecase.cancel('user123', session);
   * if (result.status === 'cancelled_and_promoted') {
   *   console.log('취소 완료 및 대기자 승급');
   * }
   * ```
   */
  cancel(userId: string, session: Session): { status: CancelStatus; session: Session } {
    const before = session.participants.length;

    // 참가자 목록에서 제거
    session.participants = session.participants.filter(id => id !== userId);
    if (session.participants.length === before) {
      // 참가자에 없었음
      return { status: 'not_found', session };
    }

    // 자리 생겼고 대기열 존재 → 맨 앞 1명 승급
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
