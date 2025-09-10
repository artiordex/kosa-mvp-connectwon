/**
 * Description : queue/processor.ts - 📌 큐 작업 처리기
 * Author      : Shiwoo Min
 * Date        : 2025-09-10
 */
import type {
  AIProcessingJob,
  CleanupJob,
  EmailJob,
  Job,
  JobResult,
  ReportJob,
  SessionReminderJob,
  SlackJob,
} from './types.js';

// ============== 작업 처리기 인터페이스 ==============

export interface JobProcessor<T extends Job = Job> {
  process(job: T): Promise<JobResult>;
}

// ============== 이메일 작업 처리기 ==============

export class EmailJobProcessor implements JobProcessor<EmailJob> {
  constructor(
    private emailService: any, // 실제로는 EmailService 타입
  ) {}

  async process(job: EmailJob): Promise<JobResult> {
    try {
      const { to, subject, html, text, template } = job.data;

      let emailContent: { html?: string; text?: string } = { html, text };

      // 템플릿이 있는 경우 렌더링
      if (template) {
        // 템플릿 엔진을 통해 html/text 생성
        emailContent = await this.renderTemplate(template.id, template.variables);
      }

      const result = await this.emailService.sendEmail({
        to,
        subject,
        ...emailContent,
      });

      return {
        success: result.success,
        data: { message_id: result.message_id },
        error: result.error,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown email processing error',
      };
    }
  }

  private async renderTemplate(templateId: string, variables: Record<string, unknown>) {
    // 템플릿 렌더링 로직
    return {
      html: `<h1>Template ${templateId}</h1>`,
      text: `Template ${templateId}`,
    };
  }
}

// ============== Slack 작업 처리기 ==============

export class SlackJobProcessor implements JobProcessor<SlackJob> {
  constructor(
    private slackService: any, // 실제로는 SlackService 타입
  ) {}

  async process(job: SlackJob): Promise<JobResult> {
    try {
      const { channel, user_id, text, attachments, blocks } = job.data;

      const result = await this.slackService.sendMessage({
        channel,
        user_id,
        text,
        attachments,
        blocks,
      });

      return {
        success: result.success,
        data: result.response,
        error: result.error,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown Slack processing error',
      };
    }
  }
}

// ============== 세션 리마인더 처리기 ==============

export class SessionReminderProcessor implements JobProcessor<SessionReminderJob> {
  constructor(
    private sessionRepository: any,
    private notificationService: any,
  ) {}

  async process(job: SessionReminderJob): Promise<JobResult> {
    try {
      const { session_id, reminder_type, participants } = job.data;

      // 세션 정보 조회
      const session = await this.sessionRepository.findByIdWithDetails(session_id);
      if (!session) {
        throw new Error(`Session not found: ${session_id}`);
      }

      // 각 참가자에게 리마인더 전송
      const results = await Promise.allSettled(
        participants.map(userId => this.sendReminderToUser(session, userId, reminder_type)),
      );

      const successCount = results.filter(r => r.status === 'fulfilled').length;
      const failCount = results.filter(r => r.status === 'rejected').length;

      return {
        success: failCount === 0,
        data: {
          total_sent: participants.length,
          success_count: successCount,
          fail_count: failCount,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown reminder processing error',
      };
    }
  }

  private async sendReminderToUser(session: any, userId: string, reminderType: string) {
    // 사용자별 리마인더 전송 로직
    return this.notificationService.sendSessionReminder(session, userId, reminderType);
  }
}

// ============== AI 처리 작업 처리기 ==============

export class AIProcessingProcessor implements JobProcessor<AIProcessingJob> {
  constructor(private aiService: any) {}

  async process(job: AIProcessingJob): Promise<JobResult> {
    try {
      const { entity_type, entity_id, task_type, input_data } = job.data;

      let result: any;

      switch (task_type) {
        case 'generate_tags':
          result = await this.generateTags(entity_type, entity_id, input_data);
          break;
        case 'generate_summary':
          result = await this.generateSummary(entity_type, entity_id, input_data);
          break;
        case 'analyze_feedback':
          result = await this.analyzeFeedback(entity_type, entity_id, input_data);
          break;
        default:
          throw new Error(`Unknown AI task type: ${task_type}`);
      }

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown AI processing error',
      };
    }
  }

  private async generateTags(entityType: string, entityId: string, inputData: any) {
    // AI 태그 생성 로직
    return { tags: ['ai-generated', 'processed'] };
  }

  private async generateSummary(entityType: string, entityId: string, inputData: any) {
    // AI 요약 생성 로직
    return { summary: 'AI generated summary' };
  }

  private async analyzeFeedback(entityType: string, entityId: string, inputData: any) {
    // AI 피드백 분석 로직
    return { sentiment: 'positive', score: 0.8 };
  }
}

// ============== 정리 작업 처리기 ==============

export class CleanupJobProcessor implements JobProcessor<CleanupJob> {
  constructor(
    private repositories: {
      session: any;
      notification: any;
      files: any;
    },
  ) {}

  async process(job: CleanupJob): Promise<JobResult> {
    try {
      const { target, older_than_days, dry_run = false } = job.data;

      let result: any;

      switch (target) {
        case 'expired_sessions':
          result = await this.cleanupExpiredSessions(older_than_days, dry_run);
          break;
        case 'old_notifications':
          result = await this.cleanupOldNotifications(older_than_days, dry_run);
          break;
        case 'temp_files':
          result = await this.cleanupTempFiles(older_than_days, dry_run);
          break;
        default:
          throw new Error(`Unknown cleanup target: ${target}`);
      }

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown cleanup processing error',
      };
    }
  }

  private async cleanupExpiredSessions(olderThanDays: number, dryRun: boolean) {
    // 만료된 세션 정리 로직
    return { cleaned_count: 0, dry_run: dryRun };
  }

  private async cleanupOldNotifications(olderThanDays: number, dryRun: boolean) {
    // 오래된 알림 정리 로직
    return { cleaned_count: 0, dry_run: dryRun };
  }

  private async cleanupTempFiles(olderThanDays: number, dryRun: boolean) {
    // 임시 파일 정리 로직
    return { cleaned_count: 0, dry_run: dryRun };
  }
}

// ============== 보고서 생성 처리기 ==============

export class ReportJobProcessor implements JobProcessor<ReportJob> {
  constructor(private reportService: any) {}

  async process(job: ReportJob): Promise<JobResult> {
    try {
      const { report_type, date_range, recipients, format } = job.data;

      const report = await this.generateReport(report_type, date_range);
      const result = await this.sendReport(report, recipients, format);

      return {
        success: true,
        data: {
          report_id: result.report_id,
          recipients_count: recipients.length,
          format,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown report processing error',
      };
    }
  }

  private async generateReport(reportType: string, dateRange: any) {
    // 보고서 생성 로직
    return { type: reportType, data: {} };
  }

  private async sendReport(report: any, recipients: string[], format: string) {
    // 보고서 전송 로직
    return { report_id: `report_${Date.now()}` };
  }
}
