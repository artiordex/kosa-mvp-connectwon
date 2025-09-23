/**
 * Description : scheduler.ts - 📌 배치 작업 스케줄러
 * Author : Shiwoo Min
 * Date : 2025-09-23
 */
import { logger } from '@connectwon/logger';
import type { JobsOptions, Queue } from 'bullmq';

/**
 * @description 스케줄 컨텍스트 타입 정의
 */
type Ctx = {
  reservationQueue: Queue;
  notificationQueue: Queue;
};

/**
 * @description 스케줄 작업 옵션
 */
interface ScheduleJobOptions extends JobsOptions {
  repeat: {
    pattern: string;
    tz: string;
  };
  jobId: string;
}

/**
 * @description 기본 작업 옵션
 */
const DEFAULT_JOB_OPTIONS: Partial<ScheduleJobOptions> = {
  attempts: 3,
  backoff: {
    type: 'exponential',
    delay: 5000,
  },
  removeOnComplete: 10,
  removeOnFail: 5,
};

/**
 * @description 스케줄 작업 정보
 */
interface ScheduleJobInfo {
  queueName: keyof Ctx;
  jobName: string;
  jobData: Record<string, unknown>;
  schedule: string;
  jobId: string;
  description: string;
}

/**
 * @description 배치 작업 목록
 */
const SCHEDULED_JOBS: ScheduleJobInfo[] = [
  {
    queueName: 'reservationQueue',
    jobName: 'daily.reservation.cleanup',
    jobData: {
      reindex: true,
      cleanupExpired: true,
    },
    schedule: '0 2 * * *', // 새벽 2시
    jobId: 'daily:reservation:cleanup',
    description: '만료된 예약 정리 및 인덱스 재구성',
  },
  {
    queueName: 'reservationQueue',
    jobName: 'daily.reservation.reminder',
    jobData: {
      type: 'next-day-reminder',
      lookAhead: 24, // 24시간 후 예약
    },
    schedule: '0 18 * * *', // 오후 6시
    jobId: 'daily:reservation:reminder',
    description: '다음날 예약 리마인더 생성',
  },
  {
    queueName: 'notificationQueue',
    jobName: 'daily.notification.reminder',
    jobData: {
      kind: 'reservation-reminder',
      batchSize: 100,
    },
    schedule: '10 18 * * *', // 오후 6시 10분
    jobId: 'daily:notification:reminder',
    description: '예약 리마인더 알림 발송',
  },
  {
    queueName: 'notificationQueue',
    jobName: 'weekly.notification.digest',
    jobData: {
      type: 'weekly-digest',
      recipients: ['admin'],
    },
    schedule: '0 9 * * 1', // 매주 월요일 오전 9시
    jobId: 'weekly:notification:digest',
    description: '주간 요약 알림 발송',
  },
];

/**
 * @description 큐에 스케줄 작업을 추가하는 헬퍼 함수
 * @param queue - 대상 큐
 * @param jobInfo - 작업 정보
 */
async function addScheduleJob(queue: Queue, jobInfo: ScheduleJobInfo): Promise<void> {
  try {
    const options: ScheduleJobOptions = {
      ...DEFAULT_JOB_OPTIONS,
      repeat: {
        pattern: jobInfo.schedule,
        tz: 'Asia/Seoul',
      },
      jobId: jobInfo.jobId,
    };

    await queue.add(jobInfo.jobName, jobInfo.jobData, options);

    logger.info('Schedule job registered', {
      jobId: jobInfo.jobId,
      jobName: jobInfo.jobName,
      schedule: jobInfo.schedule,
      description: jobInfo.description,
    });
  } catch (error) {
    logger.error('Failed to register schedule job', {
      jobId: jobInfo.jobId,
      jobName: jobInfo.jobName,
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
}

/**
 * @description 모든 스케줄 작업을 등록
 * @param ctx - 스케줄 컨텍스트 (큐들을 포함)
 */
export async function registerSchedules(ctx: Ctx): Promise<void> {
  logger.info('Registering scheduled jobs', {
    totalJobs: SCHEDULED_JOBS.length,
  });

  const registrationPromises = SCHEDULED_JOBS.map(async jobInfo => {
    const queue = ctx[jobInfo.queueName];
    if (!queue) {
      logger.warn('Queue not available for job', {
        queueName: jobInfo.queueName,
        jobId: jobInfo.jobId,
      });
      return;
    }

    return addScheduleJob(queue, jobInfo);
  });

  try {
    await Promise.allSettled(registrationPromises);

    logger.info('Schedule registration completed', {
      registeredJobs: SCHEDULED_JOBS.length,
    });
  } catch (error) {
    logger.error('Failed to register schedules', {
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
}

/**
 * @description 등록된 스케줄 작업 목록을 조회
 * @param ctx - 스케줄 컨텍스트
 * @returns 등록된 작업 정보 배열
 */
export async function getScheduledJobs(ctx: Ctx): Promise<
  Array<{
    queueName: string;
    jobId: string;
    nextRunTime?: Date;
  }>
> {
  const schedules: Array<{
    queueName: string;
    jobId: string;
    nextRunTime?: Date;
  }> = [];

  for (const [queueName, queue] of Object.entries(ctx)) {
    if (!queue || typeof queue.getRepeatableJobs !== 'function') {
      continue;
    }

    try {
      const repeatableJobs = await queue.getRepeatableJobs();

      for (const job of repeatableJobs) {
        schedules.push({
          queueName,
          jobId: job.id || job.key || 'unknown',
          nextRunTime: job.next ? new Date(job.next) : undefined,
        });
      }
    } catch (error) {
      logger.warn('Failed to get repeatable jobs', {
        queueName,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return schedules;
}

/**
 * @description 특정 스케줄 작업을 제거
 * @param ctx - 스케줄 컨텍스트
 * @param queueName - 큐 이름
 * @param jobId - 작업 ID
 */
export async function removeScheduledJob(ctx: Ctx, queueName: keyof Ctx, jobId: string): Promise<void> {
  const queue = ctx[queueName];
  if (!queue) {
    throw new Error(`Queue ${String(queueName)} not found`);
  }

  try {
    await queue.removeRepeatableByKey(jobId);
    logger.info('Schedule removed successfully', {
      queueName: String(queueName),
      jobId,
    });
  } catch (error) {
    logger.error('Failed to remove schedule', {
      queueName: String(queueName),
      jobId,
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
}
