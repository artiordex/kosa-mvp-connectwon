/**
 * Description : queue/scheduler.ts - 📌 큐 매니저의 작업 처리를 주기적으로 실행하는 스케줄러
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */

import type { QueueManager } from './manager.js';
/**
 * @description 큐 스케줄러 클래스
 * @summary QueueManager의 processNextJob을 주기적으로 호출하여 작업 처리를 자동화
 */
export class QueueScheduler {
  /** @description 스케줄러 인터벌 ID */
  private interval: NodeJS.Timeout | null = null;

  /**
   * @description QueueScheduler 생성자
   * @param manager 큐 매니저 인스턴스
   * @param tickMs 스케줄러 실행 간격 (밀리초, 기본값: 1초)
   */
  constructor(
    private readonly manager: QueueManager,
    private readonly tickMs: number = 1000,
  ) {}

  /**
   * @description 스케줄러 시작
   * @summary 지정된 간격으로 큐 매니저의 processNextJob을 실행
   */
  start() {
    if (this.interval) return;
    this.interval = setInterval(() => {
      void this.manager.processNextJob();
    }, this.tickMs);
  }

  /**
   * @description 스케줄러 중지
   * @summary 실행 중인 인터벌을 정리하고 스케줄러를 중지
   */
  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}
