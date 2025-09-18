/**
 * Description : main.ts - 📌 BullMQ 워커 & 스케줄러 부트스트랩
 * Author : Shiwoo Min
 * Date : 2025-09-12
 * 09-18 : BullMQ Dashboard 추가
 */
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { notificationProcessor } from './processors/notification.js';
import { reservationProcessor } from './processors/reservation.js';
import { registerNightlySchedules } from './schedules/nightly.js';
import { type JobsOptions, type Processor, Queue, QueueEvents, Worker, type WorkerOptions } from 'bullmq';
import express from 'express';

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

// Express 서버 및 Bull Board 대시보드 설정
const app = express();
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues: [new BullMQAdapter(reservationQueue), new BullMQAdapter(notificationQueue)],
  serverAdapter: serverAdapter,
});

// Bull Board 미들웨어 추가
app.use('/admin/queues', serverAdapter.getRouter());

// 워커 상태 정보 엔드포인트
app.get('/', (_req, res) => {
  res.json({
    status: 'running',
    message: 'ConnectWon Worker Service',
    queues: Object.values(QUEUES),
    redis: `${connection.host}:${connection.port}`,
    endpoints: {
      dashboard: '/admin/queues',
      health: '/health',
    },
    timestamp: new Date().toISOString(),
  });
});

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// 큐 통계 정보
app.get('/stats', async (_req, res) => {
  try {
    const [reservationStats, notificationStats] = await Promise.all([
      Promise.all([
        reservationQueue.getWaiting(),
        reservationQueue.getActive(),
        reservationQueue.getCompleted(),
        reservationQueue.getFailed(),
      ]),
      Promise.all([
        notificationQueue.getWaiting(),
        notificationQueue.getActive(),
        notificationQueue.getCompleted(),
        notificationQueue.getFailed(),
      ]),
    ]);

    res.json({
      reservation: {
        waiting: reservationStats[0].length,
        active: reservationStats[1].length,
        completed: reservationStats[2].length,
        failed: reservationStats[3].length,
      },
      notification: {
        waiting: notificationStats[0].length,
        active: notificationStats[1].length,
        completed: notificationStats[2].length,
        failed: notificationStats[3].length,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get queue stats' });
  }
});

// Express 서버 시작
const port = process.env['WORKER_PORT'] || 3003;
const server = app.listen(port, () => {
  console.log(`[worker] dashboard: http://localhost:${port}/admin/queues`);
  console.log(`[worker] health: http://localhost:${port}/health`);
  console.log(`[worker] stats: http://localhost:${port}/stats`);
});

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

  // Express 서버 종료
  server.close();

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
