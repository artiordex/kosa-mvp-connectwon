/**
 * Description : queue/scheduler.ts - 📌 큐 스케줄러
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import type { QueueManager } from './manager.js';

// 큐 스케줄러
export class QueueScheduler {
  private interval: NodeJS.Timeout | null = null;

  constructor(
    private readonly manager: QueueManager,
    private readonly tickMs: number = 1000,
  ) {}

  start() {
    if (this.interval) return;
    this.interval = setInterval(() => {
      void this.manager.processNextJob();
    }, this.tickMs);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}
