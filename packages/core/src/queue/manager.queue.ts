/**
 * Description : manager.queue.ts - 📌 큐 매니저
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import { randomUUID } from 'node:crypto';
import type { Job, JobPriority, JobProcessor, JobResult, QueueConfig, QueueStats } from '../core-types.js';

/**
 * @description 큐 매니저 클래스
 * @summary 작업 큐의 생성, 관리, 처리를 담당하는 중앙 관리자
 */
export class QueueManager {
  /** @description 모든 작업들을 저장하는 맵 (ID -> Job) */
  private jobs: Map<string, Job<any>> = new Map();

  /** @description 현재 처리 중인 작업 ID 집합 */
  private processing: Set<string> = new Set();

  /** @description 작업 타입별 프로세서 맵 */
  private processors: Map<string, JobProcessor<any>> = new Map();

  constructor(private readonly config: QueueConfig) {}

  /**
   * @description 작업 프로세서 등록
   * @template T 작업 데이터 타입
   * @param type 작업 타입
   * @param processor 작업 처리기
   */
  registerProcessor<T extends Job = Job>(type: string, processor: JobProcessor<T>) {
    this.processors.set(type, processor);
  }

  /**
   * @description 새 작업 추가
   * @template T 작업 데이터 타입
   * @param type 작업 타입
   * @param data 작업 데이터
   * @param priority 작업 우선순위 (기본값: normal)
   * @returns 생성된 작업 객체
   */
  async addJob<T>(type: string, data: T, priority: JobPriority = 'normal'): Promise<Job<T>> {
    const id = randomUUID();

    const job: Job<T> = {
      id,
      type,
      data,
      priority,
      status: 'pending',
      attempts: 0,
      maxAttempts: this.config.defaultJobOptions?.maxAttempts ?? 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.jobs.set(id, job);
    return job;
  }

  /**
   * @description 다음 작업 처리
   * @summary 대기 중인 작업을 찾아서 해당 프로세서로 처리
   */
  async processNextJob(): Promise<void> {
    if (this.processing.size >= (this.config.concurrency ?? 1)) return;

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
        next.error = result.error ?? '';
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

  /**
   * @description 상태 조회
   * @returns 큐 통계 정보
   */
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
