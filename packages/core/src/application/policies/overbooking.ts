/**
 * Description : overbooking.ts - 📌 초과 예약 정책
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import type { OverbookingMode } from '../../core-types.js';

/**
 * @description 초과 예약 정책 옵션 인터페이스
 */
export interface OverbookingPolicyOptions {
  mode: OverbookingMode;
  value?: number;
}

/**
 * @description 초과 예약 정책 서비스
 * @summary 세션 정원에 대한 초과 예약 허용 여부를 판단하는 비즈니스 로직 제공
 */
export class OverbookingPolicyService {
  canOverbook(currentCount: number, capacity: number, options: OverbookingPolicyOptions = { mode: 'disallow' }): boolean {
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
