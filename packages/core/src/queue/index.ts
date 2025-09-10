// 팩토리 함수
import { QueueManager } from './manager.js';
import {
  AIProcessingProcessor,
  CleanupJobProcessor,
  EmailJobProcessor,
  ReportJobProcessor,
  SessionReminderProcessor,
  SlackJobProcessor,
} from './processor.js';
import { JobScheduler } from './scheduler.js';
import type { QueueConfig } from './types.js';

/**
 * Description : queue/index.ts - 📌 큐 시스템 통합 인덱스
 * Author      : Shiwoo Min
 * Date        : 2025-09-10
 */

// 타입 정의
export * from './types.js';

// 큐 매니저
export * from './manager.js';

// 작업 처리기들
export * from './processor.js';

// 스케줄러
export * from './scheduler.js';

// ============== 큐 시스템 팩토리 ==============

export interface QueueSystemDependencies {
  emailService?: any;
  slackService?: any;
  sessionRepository?: any;
  notificationService?: any;
  aiService?: any;
  repositories?: {
    session?: any;
    notification?: any;
    files?: any;
  };
  reportService?: any;
}

export class QueueSystem {
  public readonly manager: QueueManager;
  public readonly scheduler: JobScheduler;

  constructor(config: QueueConfig, dependencies: QueueSystemDependencies = {}) {
    this.manager = new QueueManager(config);
    this.scheduler = new JobScheduler(this.manager);

    // 처리기들 등록
    this.registerProcessors(dependencies);
  }

  private registerProcessors(deps: QueueSystemDependencies): void {
    // 이메일 처리기
    if (deps.emailService) {
      this.manager.registerProcessor('email', new EmailJobProcessor(deps.emailService));
    }

    // Slack 처리기
    if (deps.slackService) {
      this.manager.registerProcessor('slack', new SlackJobProcessor(deps.slackService));
    }

    // 세션 리마인더 처리기
    if (deps.sessionRepository && deps.notificationService) {
      this.manager.registerProcessor(
        'session_reminder',
        new SessionReminderProcessor(deps.sessionRepository, deps.notificationService),
      );
    }

    // AI 처리기
    if (deps.aiService) {
      this.manager.registerProcessor('ai_processing', new AIProcessingProcessor(deps.aiService));
    }

    // 정리 작업 처리기
    if (deps.repositories) {
      this.manager.registerProcessor('cleanup', new CleanupJobProcessor(deps.repositories));
    }

    // 보고서 처리기
    if (deps.reportService) {
      this.manager.registerProcessor('report', new ReportJobProcessor(deps.reportService));
    }
  }

  // 시스템 시작
  start(): void {
    this.manager.start();
    this.scheduler.start();
  }

  // 시스템 중지
  stop(): void {
    this.scheduler.stop();
    this.manager.stop();
  }

  // 상태 확인
  getStatus() {
    return {
      manager: {
        stats: this.manager.getStats(),
      },
      scheduler: {
        isRunning: true, // 실제로는 scheduler에서 상태 확인
      },
    };
  }
}

// ============== 기본 설정 팩토리 ==============

export function createDefaultQueueConfig(): QueueConfig {
  return {
    name: 'connectwon-queue',
    concurrency: 5,
    defaultJobOptions: {
      maxAttempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
      removeOnComplete: 50,
      removeOnFail: 20,
    },
  };
}

// ============== 환경변수 기반 설정 ==============

export function createQueueConfigFromEnv(): QueueConfig {
  return {
    name: process.env['QUEUE_NAME'] || 'connectwon-queue',
    concurrency: parseInt(process.env['QUEUE_CONCURRENCY'] || '5'),
    defaultJobOptions: {
      maxAttempts: parseInt(process.env['QUEUE_MAX_ATTEMPTS'] || '3'),
      backoff: {
        type: (process.env['QUEUE_BACKOFF_TYPE'] as 'exponential' | 'fixed') || 'exponential',
        delay: parseInt(process.env['QUEUE_BACKOFF_DELAY'] || '2000'),
      },
      removeOnComplete: parseInt(process.env['QUEUE_REMOVE_ON_COMPLETE'] || '50'),
      removeOnFail: parseInt(process.env['QUEUE_REMOVE_ON_FAIL'] || '20'),
    },
  };
}

// ============== 시스템 팩토리 ==============

export function createQueueSystem(
  config?: QueueConfig,
  dependencies?: QueueSystemDependencies,
): QueueSystem {
  const queueConfig = config || createDefaultQueueConfig();
  return new QueueSystem(queueConfig, dependencies || {});
}

export function createQueueSystemFromEnv(dependencies?: QueueSystemDependencies): QueueSystem {
  const config = createQueueConfigFromEnv();
  return new QueueSystem(config, dependencies || {});
}
