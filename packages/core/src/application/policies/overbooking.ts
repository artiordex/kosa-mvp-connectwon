/**
 * Description : overbooking.ts - 📌 초과 예약 정책
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */

import { Injectable } from "@nestjs/common";

/**
 * @description 초과 예약 모드 타입
 */
export type OverbookingMode = 'disallow' | 'percent' | 'fixed';

/**
 * @description 초과 예약 정책 옵션 인터페이스
 */
export interface OverbookingPolicyOptions {
  /** @description 초과 예약 모드 */
  mode: OverbookingMode;
  /** @description 초과 예약 값 (percent면 0~100, fixed면 0 이상의 정수) */
  value?: number;
}

/**
 * @description 초과 예약 정책 서비스
 * @summary 세션 정원에 대한 초과 예약 허용 여부를 판단하는 비즈니스 로직 제공
 */
@Injectable()
export class OverbookingPolicyService {
  /**
   * @description 초과 예약 가능 여부 판단
   * @param currentCount 현재 예약 인원
   * @param capacity 정원(양수)
   * @param options 정책 옵션 (기본: disallow)
   * @returns 초과 예약 가능 여부
   * @example
   * ```typescript
   * const canBook = service.canOverbook(12, 10, { mode: 'percent', value: 20 });
   * // 10명 정원에 20% 허용하면 12명까지 가능 -> true
   * ```
   */
  canOverbook(
    currentCount: number,
    capacity: number,
    options: OverbookingPolicyOptions = { mode: 'disallow' },
  ): boolean {
    if (capacity <= 0) return false;

    switch (options.mode) {
      case 'disallow':
        return false;

      case 'percent': {
        const p = Math.max(0, Math.min(100, Math.floor(options.value ?? 0)));
        const max = Math.ceil(capacity * (1 + p / 100));
        return currentCount < max;
      }

      case 'fixed': {
        const extra = Math.max(0, Math.floor(options.value ?? 0));
        const max = capacity + extra;
        return currentCount < max;
      }

      default:
        return false;
    }
  }
}
