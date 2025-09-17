/**
 * Description : waitlist.ts - 📌 대기열 정책
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import { Injectable } from '@nestjs/common';

// 대기열 정책 옵션 인터페이스
export interface WaitlistPolicyOptions {
  // 대기열 최대 인원(기본 10명)
  maxWaitlist?: number;
  // 중복 가입 허용 여부(기본 false)
  allowDuplicates?: boolean;
}

// 대기열 정책 서비스
@Injectable()
export class WaitlistPolicyService {
  /**
   * 대기열에 새 사용자를 추가 가능한지 판단
   * @param waitlist       현재 대기열 ID 목록
   * @param newUserId      새로 넣으려는 사용자 ID
   * @param options        정책 옵션
   */
  canJoinWaitlist(
    waitlist: string[],
    newUserId: string,
    options: WaitlistPolicyOptions = {},
  ): boolean {
    const max = Number.isFinite(options.maxWaitlist)
      ? Math.max(0, Math.floor(options.maxWaitlist!))
      : 10;
    const allowDup = options.allowDuplicates ?? false;

    if (!allowDup && waitlist.includes(newUserId)) return false;
    return waitlist.length < max;
  }

  // 대기열에서 다음 사용자 ID를 꺼내는 메서드 (선택적)
  popNext(waitlist: string[]): string | undefined {
    return waitlist.shift();
  }
}
