/**
 * Description : clock.ts - 📌 시스템 시계 구현체
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import type { Clock } from '../ports/time.ts';

// 시스템 시계 구현체
export class SystemClock implements Clock {
  now(): Date {
    return new Date();
  }
  todayISO(): string {
    // YYYY-MM-DD 형식
    const d = new Date();
    return d.toISOString().slice(0, 10);
  }
}
