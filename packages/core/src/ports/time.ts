/**
 * Description : time.ts - 📌 시간 관련 포트 인터페이스
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
/**
 * @description 시스템 시계 포트
 */
export interface Clock {
  /**
   * @description 현재 시간을 반환
   * @returns {Date}
   */
  now(): Date;

  /**
   * @description 오늘 날짜를 ISO-8601(YYYY-MM-DD)로 반환
   * @returns {string}
   */
  todayISO(): string;
}

