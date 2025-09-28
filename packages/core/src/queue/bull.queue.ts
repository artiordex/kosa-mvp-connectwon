/**
 * Description : bull.queue.ts - 📌 BullMQ 기반 큐 시스템
 * Author : Shiwoo Min
 * Date : 2025-09-12
 * - ioredis 인스턴스 기반 공유/블로킹 커넥션 단일화
 * - makeQueue / makeWorker / makeQueueEvents 팩토리 제공
 * - BullQueueSystem(고수준 오케스트레이션) 제공
 * - exactOptionalPropertyTypes 안전: 옵션 키는 값이 있을 때만 추가
 */
import { createRequire } from 'node:module';
import type { AIProcessingJob, CleanupJob, EmailJob, JobResult, QueueConfig, ReportJob, SessionReminderJob, SlackJob } from '../core-types.js';
import {
  AIProcessingProcessor,
  CleanupJobProcessor,
  EmailJobProcessor,
  ReportJobProcessor,
  SessionReminderProcessor,
  SlackJobProcessor,
} from './processor.queue.js';
import { type Job, type JobsOptions, type Processor, Queue, QueueEvents, Worker, type WorkerOptions } from 'bullmq';
import type { RedisOptions } from 'ioredis';

/**
 * @description ioredis import (CJS/ESM 호환)
 * @private
 */
const require = createRequire(import.meta.url);
const IORedis = require('ioredis') as typeof import('ioredis');
const RedisCtor: new (...args: any[]) => any = (IORedis as any).default ?? (IORedis as any);

/**
 * @description 큐 이름 상수
 */
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

/**
 * @description 큐 이름 타입
 */
export type QueueName = (typeof QUEUES)[keyof typeof QUEUES];

/**
 * @description Redis 커넥션 옵션 (환경변수 기반, 필요 시 TLS 등 확장 가능)
 * @private
 */
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

/**
 * @description ioredis 인스턴스 (공유용)
 * @private
 */
const sharedConn = new RedisCtor(redisOptions);

/**
 * @description ioredis 인스턴스 (블로킹용)
 * @private
 */
const blockingConn = new RedisCtor(redisOptions);

/**
 * @description 기본 잡 옵션 (환경변수로 조정 가능)
 * @private
 */
const defaultJobOptions: JobsOptions = {
  attempts: process.env['JOB_ATTEMPTS'] ? Number(process.env['JOB_ATTEMPTS']) : 3,
  removeOnComplete: Number(process.env['JOB_REMOVE_ON_COMPLETE'] ?? 1000),
  removeOnFail: Number(process.env['JOB_REMOVE_ON_FAIL'] ?? 1000),
  backoff:
    (process.env['JOB_BACKOFF_TYPE'] ?? 'exponential') === 'fixed'
      ? { type: 'fixed', delay: Number(process.env['JOB_BACKOFF_DELAY'] ?? 5000) }
      : { type: 'exponential', delay: Number(process.env['JOB_BACKOFF_DELAY'] ?? 5000) },
};

/**
 * @description 큐 생성 팩토리 함수
 * @param name 큐 이름
 * @returns BullMQ Queue 인스턴스
 */
export const makeQueue = (name: QueueName) => new Queue(name, { connection: sharedConn, defaultJobOptions });

/**
 * @description 이벤트 리스너 생성 팩토리 함수
 * @param name 큐 이름
 * @returns BullMQ QueueEvents 인스턴스
 */
export const makeQueueEvents = (name: QueueName) => new QueueEvents(name, { connection: sharedConn });

/**
 * @description 워커 생성 팩토리 함수
 * @template Data 잡 데이터 타입
 * @template Result 잡 결과 타입
 * @param name 큐 이름
 * @param processor 잡 처리 함수 (동기/비동기 모두 허용)
 * @param options 워커 옵션 (기본값 주입)
 * @returns BullMQ Worker 인스턴스
 */
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
  const normalized: Processor<Data, Result, string> = async job => await Promise.resolve(processor(job));
  return new Worker<Data, Result, string>(name, normalized, {
    connection,
    concurrency,
    ...rest,
  });
}

/**
 * @description 타입 추출 유틸리티
 * @template T 잡 타입
 * @private
 */
type PayloadOf<T> = T extends { data: infer D } ? D : never;
type EmailPayload = PayloadOf<EmailJob>;
type SlackPayload = PayloadOf<SlackJob>;
type SessionReminderPayload = PayloadOf<SessionReminderJob>;
type AIPayload = PayloadOf<AIProcessingJob>;
type CleanupPayload = PayloadOf<CleanupJob>;
type ReportPayload = PayloadOf<ReportJob>;
type ProcessorFunc<T> = (data: T, job?: Job<T>) => Promise<JobResult>;

/**
 * @description 고수준 큐 시스템 의존성 인터페이스
 */
export interface BullQueueSystemDeps {
  /** @description 이메일 서비스 */
  emailService?: any;
  /** @description 슬랙 서비스 */
  slackService?: any;
  /** @description 세션 저장소 */
  sessionRepository?: any;
  /** @description 알림 서비스 */
  notificationService?: any;
  /** @description AI 서비스 */
  aiService?: any;
  /** @description 보고서 서비스 */
  reportService?: any;
  /** @description 저장소 컬렉션 */
  repositories?: {
    session?: any;
    notification?: any;
    files?: any;
  };
}

/**
 * @description 큐 시스템 클래스
 * @summary 의존성 주입 기반의 고수준 큐 시스템 오케스트레이션
 */
export class BullQueueSystem {
  /** @description 큐 맵 */
  private readonly queues = new Map<string, Queue>();
  /** @description 워커 맵 */
  private readonly workers = new Map<string, Worker>();

  /**
   * @description BullQueueSystem 생성자
   * @param config 큐 설정
   * @param deps 의존성 객체
   */
  constructor(
    private readonly config: QueueConfig,
    private readonly deps: BullQueueSystemDeps = {},
  ) {
    this.registerProcessors();
  }

  /**
   * @description Queue 셋업 헬퍼 메서드
   * @template T 잡 데이터 타입
   * @param name 큐 이름
   * @param handler 잡 처리 함수
   * @private
   */
  private setupQueue<T>(name: QueueName, handler: ProcessorFunc<T>) {
    const queue = new Queue<T>(name, {
      connection: sharedConn,
      defaultJobOptions: {
        attempts: this.config?.defaultJobOptions?.maxAttempts ?? defaultJobOptions.attempts!,
        backoff: {
          type: this.config?.defaultJobOptions?.backoff?.type ?? (defaultJobOptions.backoff as any).type,
          delay: this.config?.defaultJobOptions?.backoff?.delay ?? (defaultJobOptions.backoff as any).delay,
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

  /**
   * @description 프로세서 등록 메서드
   * @private
   */
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
      const p = new SessionReminderProcessor(this.deps.sessionRepository, this.deps.notificationService);
      this.setupQueue<SessionReminderPayload>(QUEUES.SESSION_REMINDER, (data, job) => p.process(data, job));
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

  /**
   * @description 잡 추가 (퍼블릭 API)
   * @template T 잡 데이터 타입
   * @param queueName 큐 이름
   * @param data 잡 데이터
   * @param opts 잡 옵션
   * @returns 추가된 잡 객체
   * @throws {Error} 큐를 찾을 수 없는 경우
   */
  async addJob<T>(queueName: QueueName, data: T, opts?: JobsOptions) {
    const queue = this.queues.get(queueName);
    if (!queue) throw new Error(`Queue "${queueName}" not found`);
    // 관례상 job name은 queue 이름과 동일
    return queue.add(queueName, data, opts);
  }

  /**
   * @description 특정 큐의 잡 상태 카운트 조회
   * @param queueName 큐 이름
   * @returns 잡 상태별 카운트
   * @throws {Error} 큐를 찾을 수 없는 경우
   */
  async getCounts(queueName: QueueName) {
    const queue = this.queues.get(queueName);
    if (!queue) throw new Error(`Queue "${queueName}" not found`);
    return queue.getJobCounts();
  }

  /**
   * @description 시스템 종료
   * @returns 종료 완료 Promise
   */
  async close() {
    for (const w of this.workers.values()) await w.close();
    for (const q of this.queues.values()) await q.close();
    // ioredis 인스턴스는 공용이므로 여기서 닫지 않는다(shared/blocking는 모듈 단일 인스턴스)
  }
}

/**
 * @description BullQueueSystem 팩토리 함수
 * @param config 큐 설정
 * @param deps 의존성 객체
 * @returns BullQueueSystem 인스턴스
 */
export function createBullQueueSystem(config: QueueConfig, deps: BullQueueSystemDeps) {
  return new BullQueueSystem(config, deps);
}

/**
 * @description ioredis 공유 인스턴스 (재사용을 위한 export)
 */
export const redisShared = sharedConn;

/**
 * @description ioredis 블로킹 인스턴스 (재사용을 위한 export)
 */
export const redisBlocking = blockingConn;

/**
 * @description BullMQ Queue 타입 별칭
 * @template Data 큐 데이터 타입
 * @template Result 큐 결과 타입
 */
export type BullQueue<Data = unknown, Result = unknown> = Queue<Data, Result, string>;

/**
 * @description BullMQ Worker 타입 별칭
 * @template Data 워커 데이터 타입
 * @template Result 워커 결과 타입
 */
export type BullWorker<Data = unknown, Result = unknown> = Worker<Data, Result, string>;

/**
 * @description BullMQ QueueEvents 타입 별칭
 */
export type BullQueueEvents = QueueEvents;
