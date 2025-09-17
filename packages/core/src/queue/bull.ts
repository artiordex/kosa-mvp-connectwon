/**
 * Description : bull.ts - 📌 BullMQ 기반 큐 시스템
 * Author : Shiwoo Min
 * Date : 2025-09-12
 * - ioredis 인스턴스 기반 공유/블로킹 커넥션 단일화
 * - makeQueue / makeWorker / makeQueueEvents 팩토리 제공
 * - BullQueueSystem(고수준 오케스트레이션) 제공
 * - exactOptionalPropertyTypes 안전: 옵션 키는 값이 있을 때만 추가
 */
import { createRequire } from 'node:module';
import type {
  AIProcessingJob,
  CleanupJob,
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
import {
  type Job,
  type JobsOptions,
  type Processor,
  Queue,
  QueueEvents,
  Worker,
  type WorkerOptions,
} from 'bullmq';
import type { RedisOptions } from 'ioredis';

// ioredis import (CJS/ESM 호환)
const require = createRequire(import.meta.url);
const IORedis = require('ioredis') as typeof import('ioredis');
const RedisCtor: new (...args: any[]) => any = (IORedis as any).default ?? (IORedis as any);

// 큐 이름 상수
export const QUEUES = {
  // 예약/알림 (기존)
  RESERVATION: 'reservation',
  NOTIFICATION: 'notification',

  // 시스템/운영 (bull.ts 기존)
  EMAIL: 'email',
  SLACK: 'slack',
  SESSION_REMINDER: 'session_reminder',
  AI_PROCESSING: 'ai_processing',
  CLEANUP: 'cleanup',
  REPORT: 'report',
} as const;
export type QueueName = (typeof QUEUES)[keyof typeof QUEUES];

// Redis 커넥션 옵션 (환경변수 기반, 필요 시 TLS 등 확장 가능)
const redisOptions: RedisOptions = {
  host: process.env['REDIS_HOST'] ?? 'localhost',
  port: process.env['REDIS_PORT'] ? Number(process.env['REDIS_PORT']) : 6379,
  ...(process.env['REDIS_PASSWORD'] ? { password: process.env['REDIS_PASSWORD'] } : {}),
  ...(process.env['REDIS_DB'] ? { db: Number(process.env['REDIS_DB']) } : {}),
  // 필요 시 사용자명: ioredis는 username 지원 (ACL). 값 있을 때만 추가.
  ...(process.env['REDIS_USERNAME'] ? { username: process.env['REDIS_USERNAME'] } : {}),
  // 필요 시 TLS: REDIS_TLS=true
  ...(process.env['REDIS_TLS'] ? { tls: {} as Record<string, unknown> } : {}),
};

// ioredis 인스턴스 (공유/블로킹 용도 분리)
const sharedConn = new RedisCtor(redisOptions);
const blockingConn = new RedisCtor(redisOptions);

// 기본 잡 옵션 (환경변수로 조정 가능)
const defaultJobOptions: JobsOptions = {
  attempts: process.env['JOB_ATTEMPTS'] ? Number(process.env['JOB_ATTEMPTS']) : 3,
  removeOnComplete: Number(process.env['JOB_REMOVE_ON_COMPLETE'] ?? 1000),
  removeOnFail: Number(process.env['JOB_REMOVE_ON_FAIL'] ?? 1000),
  backoff:
    (process.env['JOB_BACKOFF_TYPE'] ?? 'exponential') === 'fixed'
      ? { type: 'fixed', delay: Number(process.env['JOB_BACKOFF_DELAY'] ?? 5000) }
      : { type: 'exponential', delay: Number(process.env['JOB_BACKOFF_DELAY'] ?? 5000) },
};

// 큐 생성 팩토리
export const makeQueue = (name: QueueName) =>
  new Queue(name, { connection: sharedConn, defaultJobOptions });

// 이벤트 리스너 생성 팩토리
export const makeQueueEvents = (name: QueueName) =>
  new QueueEvents(name, { connection: sharedConn });

// 워커 생성 팩토리
export function makeWorker<Data = unknown, Result = unknown>(
  name: QueueName,
  // 동기/비동기 모두 허용 → 내부에서 Promise로 표준화
  processor: (job: Job<Data, Result, string>) => Result | Promise<Result>,
  // WorkerOptions를 Partial로 받아서 기본값 주입 (connection 필수 오류 방지)
  options: Partial<WorkerOptions> = {},
) {
  const {
    connection = blockingConn,
    concurrency = process.env['QUEUE_CONCURRENCY'] ? Number(process.env['QUEUE_CONCURRENCY']) : 5,
    ...rest
  } = options ?? {};
  const normalized: Processor<Data, Result, string> = async job =>
    await Promise.resolve(processor(job));
  return new Worker<Data, Result, string>(name, normalized, {
    connection,
    concurrency,
    ...rest,
  });
}

// 타입 추출 유틸리티
type PayloadOf<T> = T extends { data: infer D } ? D : never;
type EmailPayload = PayloadOf<EmailJob>;
type SlackPayload = PayloadOf<SlackJob>;
type SessionReminderPayload = PayloadOf<SessionReminderJob>;
type AIPayload = PayloadOf<AIProcessingJob>;
type CleanupPayload = PayloadOf<CleanupJob>;
type ReportPayload = PayloadOf<ReportJob>;
type ProcessorFunc<T> = (data: T, job?: Job<T>) => Promise<JobResult>;

// 고수준 큐 시스템 (의존성 주입 기반)
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

// 큐 시스템 클래스
export class BullQueueSystem {
  private readonly queues = new Map<string, Queue>();
  private readonly workers = new Map<string, Worker>();
  constructor(
    private readonly config: QueueConfig,
    private readonly deps: BullQueueSystemDeps = {},
  ) {
    this.registerProcessors();
  }

  // Queue 셋업 헬퍼
  private setupQueue<T>(name: QueueName, handler: ProcessorFunc<T>) {
    const queue = new Queue<T>(name, {
      connection: sharedConn,
      defaultJobOptions: {
        attempts: this.config?.defaultJobOptions?.maxAttempts ?? defaultJobOptions.attempts!,
        backoff: {
          type:
            this.config?.defaultJobOptions?.backoff?.type ??
            (defaultJobOptions.backoff as any).type,
          delay:
            this.config?.defaultJobOptions?.backoff?.delay ??
            (defaultJobOptions.backoff as any).delay,
        },
        removeOnComplete: (defaultJobOptions.removeOnComplete as number | undefined) ?? 50, // fallback 안전망
        removeOnFail: (defaultJobOptions.removeOnFail as number | undefined) ?? 20,
      } satisfies JobsOptions,
    });

    const worker = new Worker<T>(name, async (job: Job<T>) => handler(job.data, job), {
      connection: blockingConn,
      concurrency: this.config?.concurrency ?? 5,
    });

    // 관찰 이벤트
    worker.on('failed', (job, err) => {
      console.error(`❌ [${name}] job ${job?.id} failed:`, err?.message);
    });
    worker.on('completed', job => {
      console.debug(`✅ [${name}] job ${job.id} completed`, job.returnvalue);
    });
    this.queues.set(name, queue);
    this.workers.set(name, worker);
  }

  // 프로세서 등록
  private registerProcessors() {
    // email
    if (this.deps.emailService) {
      const p = new EmailJobProcessor(this.deps.emailService);
      this.setupQueue<EmailPayload>(QUEUES.EMAIL, (data, job) => p.process(data, job));
    }
    // slack
    if (this.deps.slackService) {
      const p = new SlackJobProcessor(this.deps.slackService);
      this.setupQueue<SlackPayload>(QUEUES.SLACK, (data, job) => p.process(data, job));
    }
    // session reminder
    if (this.deps.sessionRepository && this.deps.notificationService) {
      const p = new SessionReminderProcessor(
        this.deps.sessionRepository,
        this.deps.notificationService,
      );
      this.setupQueue<SessionReminderPayload>(QUEUES.SESSION_REMINDER, (data, job) =>
        p.process(data, job),
      );
    }
    // ai processing
    if (this.deps.aiService) {
      const p = new AIProcessingProcessor(this.deps.aiService);
      this.setupQueue<AIPayload>(QUEUES.AI_PROCESSING, (data, job) => p.process(data, job));
    }
    // cleanup
    if (this.deps.repositories) {
      const p = new CleanupJobProcessor(this.deps.repositories);
      this.setupQueue<CleanupPayload>(QUEUES.CLEANUP, (data, job) => p.process(data, job));
    }
    // report
    if (this.deps.reportService) {
      const p = new ReportJobProcessor(this.deps.reportService);
      this.setupQueue<ReportPayload>(QUEUES.REPORT, (data, job) => p.process(data, job));
    }
  }

  // 퍼블릭 API
  async addJob<T>(queueName: QueueName, data: T, opts?: JobsOptions) {
    const queue = this.queues.get(queueName);
    if (!queue) throw new Error(`Queue "${queueName}" not found`);
    // 관례상 job name은 queue 이름과 동일
    return queue.add(queueName, data, opts);
  }

  // 특정 큐의 잡 상태 카운트 조회
  async getCounts(queueName: QueueName) {
    const queue = this.queues.get(queueName);
    if (!queue) throw new Error(`Queue "${queueName}" not found`);
    return queue.getJobCounts();
  }

  // 시스템 종료
  async close() {
    for (const w of this.workers.values()) await w.close();
    for (const q of this.queues.values()) await q.close();
    // ioredis 인스턴스는 공용이므로 여기서 닫지 않는다(shared/blocking는 모듈 단일 인스턴스)
  }
}

// 팩토리
export function createBullQueueSystem(config: QueueConfig, deps: BullQueueSystemDeps) {
  return new BullQueueSystem(config, deps);
}

// ioredis 인스턴스 재사용을 위한 export
export const redisShared = sharedConn;
export const redisBlocking = blockingConn;

// 타입 노출
export type BullQueue<Data = unknown, Result = unknown> = Queue<Data, Result, string>;
export type BullWorker<Data = unknown, Result = unknown> = Worker<Data, Result, string>;
export type BullQueueEvents = QueueEvents;
