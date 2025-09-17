/**
 * Description : time.ts - 📌 시간 관련 포트 인터페이스
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
// 시간 관련 포트 인터페이스
export interface Clock {
  now(): Date;
  todayISO(): string;
}
