/**
 * Description : queue/manager.ts - 📌 큐 매니저
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import { randomUUID } from 'node:crypto';

import type { Job, JobProcessor, JobResult, QueueConfig, QueueStats } from '../../core-types.js';

// 큐 매니저 클래스
export class QueueManager {
  private jobs: Map<string, Job> = new Map();
  private processing: Set<string> = new Set();
  private processors: Map<string, JobProcessor<any>> = new Map();
  constructor(private readonly config: QueueConfig) {}

  // 작업 프로세서 등록
  registerProcessor<T extends Job = Job>(type: string, processor: JobProcessor<T>) {
    this.processors.set(type, processor);
  }

  // 새 작업 추가
  async addJob<T>(type: string, data: T, priority: Job['priority'] = 'normal'): Promise<Job<T>> {
    const id = randomUUID();
    const job: Job<T> = {
      id,
      type,
      data,
      priority,
      status: 'pending',
      attempts: 0,
      maxAttempts: this.config.defaultJobOptions.maxAttempts,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.jobs.set(id, job);
    return job;
  }

  // 다음 작업 처리
  async processNextJob(): Promise<void> {
    if (this.processing.size >= this.config.concurrency) return;
    const next = [...this.jobs.values()].find(j => j.status === 'pending');
    if (!next) return;
    const processor = this.processors.get(next.type);
    if (!processor) return;
    this.processing.add(next.id);
    next.status = 'processing';
    next.startedAt = new Date().toISOString();
    try {
      const result: JobResult = await processor.process(next);
      if (result.success) {
        next.status = 'completed';
        next.completedAt = new Date().toISOString();
      } else {
        next.status = 'failed';
        next.failedAt = new Date().toISOString();
        next.error = result.error;
      }
    } catch (err) {
      next.status = 'failed';
      next.failedAt = new Date().toISOString();
      next.error = (err as Error).message;
    } finally {
      next.updatedAt = new Date().toISOString();
      this.processing.delete(next.id);
    }
  }

  // 상태 조회
  async getStats(): Promise<QueueStats> {
    const jobs = [...this.jobs.values()];
    return {
      pending: jobs.filter(j => j.status === 'pending').length,
      processing: jobs.filter(j => j.status === 'processing').length,
      completed: jobs.filter(j => j.status === 'completed').length,
      failed: jobs.filter(j => j.status === 'failed').length,
      total: jobs.length,
      throughput: { per_minute: 0, per_hour: 0 }, // TODO: 추후 구현
    };
  }
}
