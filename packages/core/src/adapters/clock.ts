/**
 * Description : clock.ts - 📌 시스템 시계 구현체
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import type { Clock } from '../ports/time.port.js';

/**
 * @description 런타임의 실제 시간을 반환하는 시스템 시계
 * @implements {Clock}
 */
export class SystemClock implements Clock {
  /**
   * @description 현재 시각을 Date 객체로 반환
   * @returns {Date}
   */
  now(): Date {
    return new Date();
  }

  /**
   * @description 오늘 날짜를 ISO(YYYY-MM-DD)로 반환
   * @returns {string} 예: "2025-09-10"
   */
  todayISO(): string {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  }
}
