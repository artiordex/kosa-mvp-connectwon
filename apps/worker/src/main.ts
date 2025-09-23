/**
 * Description : main.ts - 📌 BullMQ 워커 & 스케줄러 부트스트랩
 * Author : Shiwoo Min
 * Date : 2025-09-12
 */
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { getMetrics, updateQueueSize, updateRedisConnectionStatus } from './metrics.js';
import { notificationProcessor } from './processors/notification.js';
import { reservationProcessor } from './processors/reservation.js';
import { registerSchedules } from './schedules/scheduler.js';
import { type JobsOptions, type Processor, Queue, QueueEvents, Worker, type WorkerOptions } from 'bullmq';
import dotenv from 'dotenv';
import express from 'express';

// 환경 변수 로드
dotenv.config();

/**
 * @description 큐 이름 상수
 */
export const QUEUES = {
  RESERVATION: 'reservation',
  NOTIFICATION: 'notification',
} as const;

/**
 * @description 환경 변수로부터 Redis 연결 설정 생성
 */
function makeRedisConnectionFromEnv() {
  const url = process.env.REDIS_URL;

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
        retryDelayOnFailover: 100,
        enableReadyCheck: false,
        lazyConnect: true,
      };
    } catch (error) {
      console.warn('REDIS_URL 파싱 실패, 개별 환경변수 사용', error);
    }
  }

  const tls = (process.env.REDIS_TLS ?? '').toLowerCase();
  const host = process.env.REDIS_HOST || '127.0.0.1';
  const port = Number(process.env.REDIS_PORT || '6379');

  return {
    host,
    port,
    username: process.env.REDIS_USERNAME || undefined,
    password: process.env.REDIS_PASSWORD || undefined,
    db: process.env.REDIS_DB ? Number(process.env.REDIS_DB) : undefined,
    ...(tls === '1' || tls === 'true' ? { tls: {} } : {}),
    maxRetriesPerRequest: null,
    retryDelayOnFailover: 100,
    enableReadyCheck: false,
    lazyConnect: true,
  };
}

/**
 * @description 기본 작업 옵션 (BullMQ 타입에 맞게 수정)
 */
const DEFAULT_JOB_OPTIONS: JobsOptions = {
  attempts: 3,
  backoff: {
    type: 'exponential',
    delay: 2000,
  },
  removeOnComplete: 50,
  removeOnFail: 20,
};

/**
 * @description 기본 워커 옵션 (BullMQ 타입에 맞게 수정)
 */
const DEFAULT_WORKER_OPTIONS: WorkerOptions = {
  concurrency: Number(process.env.WORKER_CONCURRENCY || '10'),
};

const connection = makeRedisConnectionFromEnv();

/**
 * @description Queue 생성 헬퍼 함수
 */
function makeQueue(name: string, defaultJobOptions?: JobsOptions): Queue {
  const queue = new Queue(name, {
    connection,
    defaultJobOptions: defaultJobOptions || DEFAULT_JOB_OPTIONS,
  } as any);

  queue.on('error', error => {
    console.error('큐 에러 발생', { queueName: name, error: error.message });
    updateRedisConnectionStatus(false);
  });

  return queue;
}

/**
 * @description Worker 생성 헬퍼 함수
 */
function makeWorker<T = any>(name: string, processor: Processor<T, any>, opts?: WorkerOptions) {
  const worker = new Worker<T>(name, processor, {
    connection,
    ...DEFAULT_WORKER_OPTIONS,
    ...opts,
  } as any);

  worker.on('ready', () => {
    console.log('워커 준비 완료', { workerName: name });
    updateRedisConnectionStatus(true);
  });

  worker.on('error', error => {
    console.error('워커 에러 발생', {
      workerName: name,
      error: error.message,
    });
  });

  worker.on('stalled', jobId => {
    console.warn('작업 정체 감지', { workerName: name, jobId });
  });

  return worker;
}

/**
 * @description QueueEvents 생성 및 이벤트 핸들링
 */
function makeQueueEvents(name: string) {
  const events = new QueueEvents(name, { connection } as any);

  events.on('completed', ({ jobId, returnvalue }) => {
    console.log('작업 완료', {
      queueName: name,
      jobId,
      result: returnvalue,
    });
  });

  events.on('failed', ({ jobId, failedReason }) => {
    console.error('작업 실패', {
      queueName: name,
      jobId,
      reason: failedReason,
    });
  });

  return events;
}

// 큐/워커/이벤트 인스턴스 생성
export const reservationQueue = makeQueue(QUEUES.RESERVATION);
export const notificationQueue = makeQueue(QUEUES.NOTIFICATION);

const reservationWorker = makeWorker(QUEUES.RESERVATION, reservationProcessor);
const notificationWorker = makeWorker(QUEUES.NOTIFICATION, notificationProcessor);

const reservationEvents = makeQueueEvents(QUEUES.RESERVATION);
const notificationEvents = makeQueueEvents(QUEUES.NOTIFICATION);

/**
 * @description Express 애플리케이션 설정
 */
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Bull Board 대시보드 설정
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues: [new BullMQAdapter(reservationQueue), new BullMQAdapter(notificationQueue)],
  serverAdapter: serverAdapter,
});

app.use('/admin/queues', serverAdapter.getRouter());

/**
 * @description 루트 엔드포인트
 */
app.get('/', (_req, res) => {
  res.json({
    status: 'running',
    message: 'ConnectWon Worker Service',
    version: process.env['npm_package_version'] || '1.0.0',
    environment: process.env['NODE_ENV'] || 'development',
    queues: Object.values(QUEUES),
    redis: `${connection.host}:${connection.port}`,
    endpoints: {
      dashboard: '/admin/queues',
      health: '/health',
      metrics: '/metrics',
      stats: '/stats',
    },
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

/**
 * @description 헬스체크 엔드포인트
 */
app.get('/health', async (_req, res) => {
  try {
    res.status(200).json({
      status: 'healthy',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    });
  }
});

/**
 * @description Prometheus 메트릭 엔드포인트
 */
app.get('/metrics', async (_req, res) => {
  try {
    res.set('Content-Type', 'text/plain');
    res.send(await getMetrics());
  } catch (error) {
    console.error('메트릭 수집 실패', {
      error: error instanceof Error ? error.message : String(error),
    });
    res.status(500).send('# 메트릭 수집 실패\n');
  }
});

/**
 * @description 큐 통계 정보 엔드포인트
 */
app.get('/stats', async (_req, res) => {
  try {
    const [reservationStats, notificationStats] = await Promise.all([
      Promise.all([reservationQueue.getWaiting(), reservationQueue.getActive(), reservationQueue.getCompleted(), reservationQueue.getFailed()]),
      Promise.all([notificationQueue.getWaiting(), notificationQueue.getActive(), notificationQueue.getCompleted(), notificationQueue.getFailed()]),
    ]);

    updateQueueSize(QUEUES.RESERVATION, reservationStats[0].length);
    updateQueueSize(QUEUES.NOTIFICATION, notificationStats[0].length);

    const stats = {
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
      timestamp: new Date().toISOString(),
    };

    res.json(stats);
  } catch (error) {
    console.error('큐 통계 조회 실패', {
      error: error instanceof Error ? error.message : String(error),
    });
    res.status(500).json({
      error: '큐 통계 조회 실패',
      timestamp: new Date().toISOString(),
    });
  }
});

// Express 서버 시작
const port = Number(process.env['WORKER_PORT'] || '3003');
const host = process.env['WORKER_HOST'] || '0.0.0.0';

const server = app.listen(port, host, () => {
  console.log('워커 서버 시작됨', {
    port,
    host,
  });
});

/**
 * @description 스케줄 작업 등록
 */
async function initializeSchedules() {
  try {
    await registerSchedules({
      reservationQueue,
      notificationQueue,
    });
    console.log('스케줄 작업 등록 완료');
  } catch (error) {
    console.error('스케줄 작업 등록 실패', {
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

initializeSchedules();

/**
 * @description 우아한 종료 처리
 */
async function gracefulShutdown(sig: string) {
  console.log('종료 신호 수신됨', { signal: sig });

  server.close();

  try {
    await Promise.allSettled([
      reservationWorker.close(),
      notificationWorker.close(),
      reservationQueue.close(),
      notificationQueue.close(),
      reservationEvents.close(),
      notificationEvents.close(),
    ]);

    console.log('모든 워커 및 큐 종료 완료');
    process.exit(0);
  } catch (error) {
    console.error('종료 중 오류 발생', error);
    process.exit(1);
  }
}

process.on('SIGINT', () => void gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => void gracefulShutdown('SIGTERM'));
