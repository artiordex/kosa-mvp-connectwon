/**
 * Description : waitlist.policy.ts - 📌 대기열 정책
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import type { WaitlistPolicyOptions } from '../../core-types.js';

/**
 * @description 대기열 정책 서비스
 * @summary 세션 대기열에 대한 가입 규칙과 관리 로직 제공
 */
export class WaitlistPolicyService {
  /**
   * @description 대기열에 새 사용자를 추가 가능한지 판단
   * @param waitlist 현재 대기열 ID 목록
   * @param newUserId 새로 넣으려는 사용자 ID
   * @param options 정책 옵션
   * @returns 대기열 가입 가능 여부
   * @example
   * ```
   */
  canJoinWaitlist(waitlist: string[], newUserId: string, options: WaitlistPolicyOptions = {}): boolean {
    const max = Number.isFinite(options.maxWaitlist) ? Math.max(0, Math.floor(options.maxWaitlist!)) : 10;
    const allowDup = options.allowDuplicates ?? false;

    if (!allowDup && waitlist.includes(newUserId)) return false;
    return waitlist.length < max;
  }

  /**
   * @description 대기열에서 다음 사용자 ID를 꺼내는 메서드
   * @param waitlist 대기열 배열 (원본이 수정됨)
   * @returns 다음 사용자 ID (없으면 undefined)
   */
  popNext(waitlist: string[]): string | undefined {
    return waitlist.shift();
  }
}
