/**
 * Description : overbooking.ts - 📌 초과 예약 정책
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import { Injectable } from '@nestjs/common';

// 초과 초과 예약 모드
export type OverbookingMode = 'disallow' | 'percent' | 'fixed';

// 초과 예약 정책 옵션 인터페이스
export interface OverbookingPolicyOptions {
  mode: OverbookingMode;
  value?: number; // percent면 0~100, fixed면 0 이상의 정수
}

// 초과 예약 정책 서비스
@Injectable()
export class OverbookingPolicyService {
  /**
   * @param currentCount 현재 예약 인원
   * @param capacity     정원(양수)
   * @param options      정책 옵션 (기본: disallow)
   * @returns 초과 예약 가능 여부
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
