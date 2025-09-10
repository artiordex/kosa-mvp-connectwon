/**
 * Description : cancel-booking.ts - 📌 예약 취소 & 대기열 승급
 * Author      : Shiwoo Min
 * Date        : 2025-09-10
 */
import { Injectable } from '@nestjs/common';

// 도메인 최소 모델 (인메모리용)
export interface Session {
  id: string;
  capacity: number;
  participants: string[];
  waitlist: string[];
}

export type CancelStatus = 'not_found' | 'cancelled' | 'cancelled_and_promoted';

@Injectable()
export class CancelBookingUsecase {
  /**
   * 예약 취소 후, 빈자리가 생기면 대기열에서 1명 승급
   */
  execute(userId: string, session: Session): { status: CancelStatus; session: Session } {
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
      if (next) {
        // 이미 참가자였다면 중복 방지
        if (!session.participants.includes(next)) {
          session.participants.push(next);
        }
        return { status: 'cancelled_and_promoted', session };
      }
    }

    return { status: 'cancelled', session };
  }
}
