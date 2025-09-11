/**
 * Description : processor.ts - 📌 BullMQ 프로세서 모음
 * Author      : Shiwoo Min
 * Date        : 2025-09-10
 */
import type { Job as BullJob } from 'bullmq';

import type {
  AIProcessingJob,
  CleanupJob,
  EmailJob,
  JobResult,
  ReportJob,
  SessionReminderJob,
  SlackJob,
} from '../../core-types.js';

// payload 추론
type PayloadOf<T> = T extends { data: infer D } ? D : never;

type EmailPayload = PayloadOf<EmailJob>;
type SlackPayload = PayloadOf<SlackJob>;
type SessionReminderPayload = PayloadOf<SessionReminderJob>;
type AIPayload = PayloadOf<AIProcessingJob>;
type CleanupPayload = PayloadOf<CleanupJob>;
type ReportPayload = PayloadOf<ReportJob>;

export class EmailJobProcessor {
  constructor(private readonly emailService: any) {}
  async process(data: EmailPayload, _job?: BullJob<EmailPayload>): Promise<JobResult> {
    // 실제 전송 로직
    await this.emailService.send(data);
    return { success: true };
  }
}

export class SlackJobProcessor {
  constructor(private readonly slackService: any) {}
  async process(data: SlackPayload, _job?: BullJob<SlackPayload>): Promise<JobResult> {
    await this.slackService.postMessage(data);
    return { success: true };
  }
}

export class SessionReminderProcessor {
  constructor(
    private readonly sessionRepo: any,
    private readonly notificationService: any,
  ) {}
  async process(
    data: SessionReminderPayload,
    _job?: BullJob<SessionReminderPayload>,
  ): Promise<JobResult> {
    const session = await this.sessionRepo.getById(data.sessionId);
    if (!session) return { success: false, error: 'session_not_found' };

    await this.notificationService.sendReminders(session, data);
    return { success: true };
  }
}

export class AIProcessingProcessor {
  constructor(private readonly aiService: any) {}
  async process(data: AIPayload, _job?: BullJob<AIPayload>): Promise<JobResult> {
    const result = await this.aiService.runTask(data);
    return { success: true, data: result };
  }
}

export class CleanupJobProcessor {
  constructor(private readonly repositories: any) {}
  async process(data: CleanupPayload, _job?: BullJob<CleanupPayload>): Promise<JobResult> {
    // 예: repositories.session/notification/files 등 정리
    // await this.repositories.session.cleanup(data);
    return { success: true };
  }
}

export class ReportJobProcessor {
  constructor(private readonly reportService: any) {}
  async process(data: ReportPayload, _job?: BullJob<ReportPayload>): Promise<JobResult> {
    await this.reportService.generate(data);
    return { success: true };
  }
}
