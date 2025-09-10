/**
 * Description : queue/manager.ts - 📌 큐 관리자
 * Author      : Shiwoo Min
 * Date        : 2025-09-10
 */
import type { JobProcessor } from './processor.js';
import type {
  AIProcessingJobData,
  CleanupJobData,
  EmailJobData,
  Job,
  JobPriority,
  JobResult,
  JobStatus,
  QueueConfig,
  QueueStats,
  ReportJobData,
  SessionReminderJobData,
  SlackJobData,
} from './types.js';

// ============== 큐 매니저 ==============

export class QueueManager {
  private jobs = new Map<string, Job>();
  private processors = new Map<string, JobProcessor>();
  private processing = new Set<string>();
  private config: QueueConfig;

  constructor(config: QueueConfig) {
    this.config = config;
  }

  // 처리기 등록
  registerProcessor<T extends Job>(jobType: string, processor: JobProcessor<T>): void {
    this.processors.set(jobType, processor);
  }

  // 작업 추가
  async addJob<T extends Job['data']>(
    type: string,
    data: T,
    options: {
      priority?: JobPriority;
      delay?: number;
      maxAttempts?: number;
    } = {},
  ): Promise<string> {
    const jobId = this.generateJobId();
    const now = new Date().toISOString();

    const job: Job = {
      id: jobId,
      type,
      status: 'pending',
      priority: options.priority || 'normal',
      data,
      attempts: 0,
      maxAttempts: options.maxAttempts || this.config.defaultJobOptions.maxAttempts,
      createdAt: now,
      updatedAt: now,
    } as Job;

    this.jobs.set(jobId, job);

    // 지연 시간이 없으면 즉시 처리 시작
    if (!options.delay) {
      this.processNextJob();
    } else {
      // 지연 처리
      setTimeout(() => this.processNextJob(), options.delay);
    }

    return jobId;
  }

  // 편의 메서드들
  async addEmailJob(
    data: EmailJobData,
    options?: { priority?: JobPriority; delay?: number },
  ): Promise<string> {
    return this.addJob('email', data, options);
  }

  async addSlackJob(
    data: SlackJobData,
    options?: { priority?: JobPriority; delay?: number },
  ): Promise<string> {
    return this.addJob('slack', data, options);
  }

  async addSessionReminderJob(
    data: SessionReminderJobData,
    options?: { priority?: JobPriority; delay?: number },
  ): Promise<string> {
    return this.addJob('session_reminder', data, options);
  }

  async addAIProcessingJob(
    data: AIProcessingJobData,
    options?: { priority?: JobPriority; delay?: number },
  ): Promise<string> {
    return this.addJob('ai_processing', data, options);
  }

  async addCleanupJob(
    data: CleanupJobData,
    options?: { priority?: JobPriority; delay?: number },
  ): Promise<string> {
    return this.addJob('cleanup', data, options);
  }

  async addReportJob(
    data: ReportJobData,
    options?: { priority?: JobPriority; delay?: number },
  ): Promise<string> {
    return this.addJob('report', data, options);
  }

  // 작업 처리
  private async processNextJob(): Promise<void> {
    // 동시 처리 제한 확인
    if (this.processing.size >= this.config.concurrency) {
      return;
    }

    // 처리할 작업 찾기 (우선순위 순)
    const pendingJob = this.findNextPendingJob();
    if (!pendingJob) {
      return;
    }

    // 처리 시작
    this.processing.add(pendingJob.id);
    pendingJob.status = 'processing';
    pendingJob.updatedAt = new Date().toISOString();
    pendingJob.processedAt = new Date().toISOString();

    try {
      const processor = this.processors.get(pendingJob.type);
      if (!processor) {
        throw new Error(`No processor registered for job type: ${pendingJob.type}`);
      }

      const result = await processor.process(pendingJob);

      if (result.success) {
        pendingJob.status = 'completed';
        pendingJob.completedAt = new Date().toISOString();
        pendingJob.result = result.data;
      } else {
        await this.handleJobFailure(pendingJob, result.error || 'Unknown error');
      }
    } catch (error) {
      await this.handleJobFailure(
        pendingJob,
        error instanceof Error ? error.message : 'Unknown error',
      );
    } finally {
      this.processing.delete(pendingJob.id);
      pendingJob.updatedAt = new Date().toISOString();

      // 다음 작업 처리
      setImmediate(() => this.processNextJob());
    }
  }

  // 작업 실패 처리
  private async handleJobFailure(job: Job, error: string): Promise<void> {
    job.attempts += 1;
    job.error = error;

    if (job.attempts >= job.maxAttempts) {
      job.status = 'failed';
      job.failedAt = new Date().toISOString();
    } else {
      job.status = 'retrying';

      // 백오프 지연 후 재시도
      const delay = this.calculateBackoffDelay(job.attempts);
      setTimeout(() => {
        job.status = 'pending';
        this.processNextJob();
      }, delay);
    }
  }

  // 백오프 지연 계산
  private calculateBackoffDelay(attempts: number): number {
    const { type, delay } = this.config.defaultJobOptions.backoff;

    if (type === 'exponential') {
      return delay * Math.pow(2, attempts - 1);
    }

    return delay;
  }

  // 다음 처리할 작업 찾기
  private findNextPendingJob(): Job | null {
    const pendingJobs = Array.from(this.jobs.values()).filter(job => job.status === 'pending');

    if (pendingJobs.length === 0) {
      return null;
    }

    // 우선순위로 정렬 (urgent > high > normal > low)
    const priorityOrder = { urgent: 4, high: 3, normal: 2, low: 1 };

    pendingJobs.sort((a, b) => {
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;

      // 같은 우선순위면 생성 시간 순
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

    return pendingJobs[0];
  }

  // 작업 조회
  getJob(jobId: string): Job | null {
    return this.jobs.get(jobId) || null;
  }

  // 작업 목록 조회
  getJobs(
    filters: {
      status?: JobStatus;
      type?: string;
      limit?: number;
    } = {},
  ): Job[] {
    let jobs = Array.from(this.jobs.values());

    if (filters.status) {
      jobs = jobs.filter(job => job.status === filters.status);
    }

    if (filters.type) {
      jobs = jobs.filter(job => job.type === filters.type);
    }

    // 최신순 정렬
    jobs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    if (filters.limit) {
      jobs = jobs.slice(0, filters.limit);
    }

    return jobs;
  }

  // 작업 취소
  cancelJob(jobId: string): boolean {
    const job = this.jobs.get(jobId);
    if (!job || job.status !== 'pending') {
      return false;
    }

    job.status = 'failed';
    job.error = 'Cancelled by user';
    job.failedAt = new Date().toISOString();
    job.updatedAt = new Date().toISOString();

    return true;
  }

  // 작업 재시도
  retryJob(jobId: string): boolean {
    const job = this.jobs.get(jobId);
    if (!job || job.status !== 'failed') {
      return false;
    }

    job.status = 'pending';
    job.attempts = 0;
    job.error = undefined;
    job.updatedAt = new Date().toISOString();

    this.processNextJob();
    return true;
  }

  // 통계 조회
  getStats(): QueueStats {
    const jobs = Array.from(this.jobs.values());

    const stats = {
      pending: jobs.filter(j => j.status === 'pending').length,
      processing: jobs.filter(j => j.status === 'processing').length,
      completed: jobs.filter(j => j.status === 'completed').length,
      failed: jobs.filter(j => j.status === 'failed').length,
      total: jobs.length,
      throughput: {
        per_minute: 0,
        per_hour: 0,
      },
    };

    // 처리량 계산 (최근 1시간)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentCompleted = jobs.filter(
      j => j.status === 'completed' && j.completedAt && new Date(j.completedAt) > oneHourAgo,
    );

    stats.throughput.per_hour = recentCompleted.length;
    stats.throughput.per_minute = Math.round(recentCompleted.length / 60);

    return stats;
  }

  // 정리 작업
  cleanup(): void {
    const { removeOnComplete, removeOnFail } = this.config.defaultJobOptions;

    if (removeOnComplete > 0) {
      const completedJobs = this.getJobs({ status: 'completed' });
      const toRemove = completedJobs.slice(removeOnComplete);
      toRemove.forEach(job => this.jobs.delete(job.id));
    }

    if (removeOnFail > 0) {
      const failedJobs = this.getJobs({ status: 'failed' });
      const toRemove = failedJobs.slice(removeOnFail);
      toRemove.forEach(job => this.jobs.delete(job.id));
    }
  }

  // 큐 시작
  start(): void {
    // 정기적으로 작업 처리
    setInterval(() => this.processNextJob(), 1000);

    // 정기적으로 정리 작업
    setInterval(() => this.cleanup(), 60000);
  }

  // 큐 중지
  stop(): void {
    // 현재 처리 중인 작업들이 완료될 때까지 대기
    // 실제 구현에서는 더 정교한 shutdown 로직 필요
  }

  private generateJobId(): string {
    return `job_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  }
}
