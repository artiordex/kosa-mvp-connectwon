/**
 * Description : bull.ts - 📌 BullMQ 기반 큐 시스템 (v5.x / 타입 정리)
 * Author      : Shiwoo Min
 * Date        : 2025-09-10
 */
import { Queue, Worker } from 'bullmq';
import type { Job as BullJob, ConnectionOptions, JobsOptions } from 'bullmq';

import type {
  AIProcessingJob,
  CleanupJob,
  // payload 추론용 Job 별 alias
  EmailJob,
  JobResult,
  QueueConfig,
  ReportJob,
  SessionReminderJob,
  SlackJob,
} from '../../core-types.js';
import {
  AIProcessingProcessor,
  CleanupJobProcessor,
  EmailJobProcessor,
  ReportJobProcessor,
  SessionReminderProcessor,
  SlackJobProcessor,
} from './processor.js';

export interface BullQueueSystemDeps {
  emailService?: any;
  slackService?: any;
  sessionRepository?: any;
  notificationService?: any;
  aiService?: any;
  reportService?: any;
  repositories?: {
    session?: any;
    notification?: any;
    files?: any;
  };
}

// ===== 유틸: Job alias에서 data(payload) 타입 추론 =====
type PayloadOf<T> = T extends { data: infer D } ? D : never;

type EmailPayload = PayloadOf<EmailJob>;
type SlackPayload = PayloadOf<SlackJob>;
type SessionReminderPayload = PayloadOf<SessionReminderJob>;
type AIPayload = PayloadOf<AIProcessingJob>;
type CleanupPayload = PayloadOf<CleanupJob>;
type ReportPayload = PayloadOf<ReportJob>;

type ProcessorFunc<T> = (data: T, job?: BullJob<T>) => Promise<JobResult>;

// ===== Redis 연결 옵션: ioredis 인스턴스 없이, 옵션 객체만 사용 =====
function buildConnectionOptions(): ConnectionOptions {
  const host = process.env['REDIS_HOST'] ?? '127.0.0.1';
  const portEnv = process.env['REDIS_PORT'];
  const port = Number.isFinite(Number(portEnv)) ? Number(portEnv) : 6379;
  const password = process.env['REDIS_PASSWORD']; // string | undefined

  // ⚠️ exactOptionalPropertyTypes=true → undefined 값을 넣지 말고 키 자체를 생략
  const conn: ConnectionOptions = {
    host,
    port,
    ...(password ? { password } : {}),
    // 필요 시 TLS 켜기: REDIS_TLS=true
    ...(process.env['REDIS_TLS'] ? { tls: {} as Record<string, unknown> } : {}),
  };

  return conn;
}

export class BullQueueSystem {
  private readonly connection = buildConnectionOptions();
  private readonly queues = new Map<string, Queue>();
  private readonly workers = new Map<string, Worker>();

  constructor(
    private readonly config: QueueConfig,
    private readonly deps: BullQueueSystemDeps = {},
  ) {
    this.registerProcessors();
  }

  // 공통 Queue/Worker 셋업
  private setupQueue<T>(name: string, handler: ProcessorFunc<T>) {
    const queue = new Queue<T>(name, {
      connection: this.connection,
      defaultJobOptions: {
        attempts: this.config.defaultJobOptions.maxAttempts,
        backoff: {
          type: this.config.defaultJobOptions.backoff.type,
          delay: this.config.defaultJobOptions.backoff.delay,
        },
        removeOnComplete: 50,
        removeOnFail: 20,
      } as JobsOptions,
    });

    const worker = new Worker<T>(name, async (job: BullJob<T>) => handler(job.data, job), {
      connection: this.connection,
      concurrency: this.config.concurrency,
    });

    // 관찰용 이벤트
    worker.on('failed', (job, err) => {
      console.error(`❌ [${name}] job ${job?.id} failed:`, err?.message);
    });
    worker.on('completed', job => {
      // console.debug(`✅ [${name}] job ${job.id} completed`, job.returnvalue);
    });

    this.queues.set(name, queue);
    this.workers.set(name, worker);
  }

  // 프로세서 등록
  private registerProcessors() {
    // email
    if (this.deps.emailService) {
      const p = new EmailJobProcessor(this.deps.emailService);
      this.setupQueue<EmailPayload>('email', (data, job) => p.process(data, job));
    }
    // slack
    if (this.deps.slackService) {
      const p = new SlackJobProcessor(this.deps.slackService);
      this.setupQueue<SlackPayload>('slack', (data, job) => p.process(data, job));
    }
    // session reminder
    if (this.deps.sessionRepository && this.deps.notificationService) {
      const p = new SessionReminderProcessor(
        this.deps.sessionRepository,
        this.deps.notificationService,
      );
      this.setupQueue<SessionReminderPayload>('session_reminder', (data, job) =>
        p.process(data, job),
      );
    }
    // ai processing
    if (this.deps.aiService) {
      const p = new AIProcessingProcessor(this.deps.aiService);
      this.setupQueue<AIPayload>('ai_processing', (data, job) => p.process(data, job));
    }
    // cleanup
    if (this.deps.repositories) {
      const p = new CleanupJobProcessor(this.deps.repositories);
      this.setupQueue<CleanupPayload>('cleanup', (data, job) => p.process(data, job));
    }
    // report
    if (this.deps.reportService) {
      const p = new ReportJobProcessor(this.deps.reportService);
      this.setupQueue<ReportPayload>('report', (data, job) => p.process(data, job));
    }
  }

  // 퍼블릭 API
  async addJob<T>(queueName: string, data: T, opts?: JobsOptions) {
    const queue = this.queues.get(queueName);
    if (!queue) throw new Error(`Queue "${queueName}" not found`);
    // job name은 관례상 queue 이름과 동일하게 사용
    return queue.add(queueName, data, opts);
  }

  async getCounts(queueName: string) {
    const queue = this.queues.get(queueName);
    if (!queue) throw new Error(`Queue "${queueName}" not found`);
    return queue.getJobCounts();
  }

  async close() {
    for (const w of this.workers.values()) await w.close();
    for (const q of this.queues.values()) await q.close();
    // connection은 옵션 객체라 닫을 리소스 없음
  }
}

// 팩토리
export function createBullQueueSystem(config: QueueConfig, deps: BullQueueSystemDeps) {
  return new BullQueueSystem(config, deps);
}
