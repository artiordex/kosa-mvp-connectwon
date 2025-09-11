/**
 * Description : main.ts - 📌 BullMQ 워커 & 스케줄러 부트스트랩
 * Author : Shiwoo Min
 * Date : 2025-09-12
 */
import {
  type JobsOptions,
  type Processor,
  Queue,
  QueueEvents,
  Worker,
  type WorkerOptions,
} from 'bullmq';

import { notificationProcessor } from './processors/notification.js';
import { reservationProcessor } from './processors/reservation.js';
import { registerNightlySchedules } from './schedules/nightly.js';

// 큐 이름 상수
export const QUEUES = {
  RESERVATION: 'reservation',
  NOTIFICATION: 'notification',
} as const;

// Redis 연결 설정
function makeRedisConnectionFromEnv() {
  const url = process.env['REDIS_URL'];
  if (url) {
    try {
      const u = new URL(url);
      const tls = u.protocol === 'rediss:';
      return {
        host: u.hostname,
        port: Number(u.port || '6379'),
        username: u.username || undefined,
        password: u.password || undefined,
        db: Number(u.pathname.replace('/', '')) || 0,
        ...(tls ? { tls: {} } : {}),
        maxRetriesPerRequest: null,
      };
    } catch {
      console.warn('[worker] REDIS_URL 파싱 실패. 개별 호스트/포트 환경변수로 대체합니다.');
    }
  }
  const tls = (process.env['REDIS_TLS'] ?? '').toLowerCase();
  return {
    host: process.env['REDIS_HOST'] || '127.0.0.1',
    port: Number(process.env['REDIS_PORT'] || '6379'),
    username: process.env['REDIS_USERNAME'] || undefined,
    password: process.env['REDIS_PASSWORD'] || undefined,
    db: process.env['REDIS_DB'] ? Number(process.env['REDIS_DB']) : undefined,
    ...(tls === '1' || tls === 'true' ? { tls: {} } : {}),
    maxRetriesPerRequest: null,
  };
}

const connection = makeRedisConnectionFromEnv();

// Queue 생성 - 타입 단언 사용
function makeQueue(name: string, defaultJobOptions?: JobsOptions): Queue {
  if (defaultJobOptions) {
    return new Queue(name, { connection, defaultJobOptions } as any);
  }
  return new Queue(name, { connection } as any);
}

// Worker 생성 - 타입 단언 사용
function makeWorker<T = any>(name: string, processor: Processor<T, any>, opts?: WorkerOptions) {
  const baseOptions = { connection, concurrency: 10 };
  if (opts) {
    return new Worker<T>(name, processor, { ...baseOptions, ...opts } as any);
  }
  return new Worker<T>(name, processor, baseOptions as any);
}

// QueueEvents 생성
function makeQueueEvents(name: string) {
  const events = new QueueEvents(name, { connection } as any);
  events.on('completed', ({ jobId }) => {
    console.log(`[${name}] job completed: ${jobId}`);
  });
  events.on('failed', ({ jobId, failedReason }) => {
    console.error(`[${name}] job failed: ${jobId} → ${failedReason}`);
  });
  return events;
}

// 큐/워커/이벤트 인스턴스
export const reservationQueue = makeQueue(QUEUES.RESERVATION);
export const notificationQueue = makeQueue(QUEUES.NOTIFICATION);

const reservationWorker = makeWorker(QUEUES.RESERVATION, reservationProcessor);
const notificationWorker = makeWorker(QUEUES.NOTIFICATION, notificationProcessor);

const reservationEvents = makeQueueEvents(QUEUES.RESERVATION);
const notificationEvents = makeQueueEvents(QUEUES.NOTIFICATION);

// 야간 스케줄 등록
registerNightlySchedules({ reservationQueue, notificationQueue });

console.log(
  `[worker] started. queues: ${Object.values(QUEUES).join(', ')} | redis: ${
    connection.host
  }:${connection.port}`,
);

// 종료 신호 핸들링
async function graceful(sig: string) {
  console.log(`[worker] received ${sig}, shutting down...`);
  await Promise.allSettled([
    reservationWorker.close(),
    notificationWorker.close(),
    reservationQueue.close(),
    notificationQueue.close(),
    reservationEvents.close(),
    notificationEvents.close(),
  ]);
  process.exit(0);
}

process.on('SIGINT', () => void graceful('SIGINT'));
process.on('SIGTERM', () => void graceful('SIGTERM'));
