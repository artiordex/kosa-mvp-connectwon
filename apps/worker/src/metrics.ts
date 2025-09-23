/**
 * Description : metrics.ts - 📌Prometheus 메트릭 노출
 * Author : Shiwoo Min
 * Date : 2025-09-22
 */
import { collectDefaultMetrics, Counter, Gauge, Histogram, Registry } from 'prom-client';

/**
 * @description 전용 메트릭 레지스트리
 */
const register = new Registry();

/**
 * @description 기본 시스템 메트릭 수집 활성화
 */
collectDefaultMetrics({
  register,
  gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5],
});

/**
 * @description 작업 실행 카운터
 */
export const jobExecutionCounter = new Counter({
  name: 'worker_jobs_executed_total',
  help: 'Total number of executed jobs by type and status',
  labelNames: ['job_type', 'status'] as const,
  registers: [register],
});

/**
 * @description 작업 실패 카운터
 */
export const jobFailureCounter = new Counter({
  name: 'worker_job_failures_total',
  help: 'Total number of failed jobs by type and error',
  labelNames: ['job_type', 'error_type'] as const,
  registers: [register],
});

/**
 * @description 작업 처리 시간 히스토그램
 */
export const jobDurationHistogram = new Histogram({
  name: 'worker_job_duration_seconds',
  help: 'Duration of job processing in seconds',
  labelNames: ['job_type'] as const,
  buckets: [0.1, 0.5, 1, 2, 5, 10, 30, 60, 300],
  registers: [register],
});

/**
 * @description 큐 크기 게이지
 */
export const queueSizeGauge = new Gauge({
  name: 'worker_queue_size',
  help: 'Current size of job queues',
  labelNames: ['queue_name'] as const,
  registers: [register],
});

/**
 * @description 활성 작업 게이지
 */
export const activeJobsGauge = new Gauge({
  name: 'worker_active_jobs',
  help: 'Number of currently active jobs',
  labelNames: ['worker_id'] as const,
  registers: [register],
});

/**
 * @description Redis 연결 상태 게이지
 */
export const redisConnectionGauge = new Gauge({
  name: 'worker_redis_connection_status',
  help: 'Redis connection status (1=connected, 0=disconnected)',
  registers: [register],
});

/**
 * @description 작업 시작을 기록
 */
export function recordJobStart(jobType: string, workerId: string = 'default') {
  const timer = jobDurationHistogram.startTimer({ job_type: jobType });
  activeJobsGauge.inc({ worker_id: workerId });

  return (status: 'completed' | 'failed', errorType?: string) => {
    timer();
    activeJobsGauge.dec({ worker_id: workerId });
    jobExecutionCounter.inc({ job_type: jobType, status });

    if (status === 'failed' && errorType) {
      jobFailureCounter.inc({ job_type: jobType, error_type: errorType });
    }
  };
}

/**
 * @description 큐 크기 업데이트
 */
export function updateQueueSize(queueName: string, size: number): void {
  queueSizeGauge.set({ queue_name: queueName }, size);
}

/**
 * @description Redis 연결 상태 업데이트
 */
export function updateRedisConnectionStatus(connected: boolean): void {
  redisConnectionGauge.set(connected ? 1 : 0);
}

/**
 * @description 모든 메트릭을 Prometheus 형식으로 반환
 */
export async function getMetrics(): Promise<string> {
  try {
    return await register.metrics();
  } catch (error) {
    console.error('Failed to collect metrics:', error);
    throw new Error('Metrics collection failed');
  }
}
