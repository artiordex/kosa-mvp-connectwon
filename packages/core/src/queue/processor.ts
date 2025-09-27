/**
 * Description : processor.ts - 📌 BullMQ 프로세서 모음
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import type { AIProcessingJob, CleanupJob, EmailJob, JobResult, ReportJob, SessionReminderJob, SlackJob } from '../core-types.js';
import type { Job as BullJob } from 'bullmq';

/**
 * @description BullMQ Job의 Payload 타입 추출 유틸리티
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

/**
 * @description 이메일 전송 프로세서
 * @summary 이메일 작업을 처리하는 프로세서 클래스
 */
export class EmailJobProcessor {
  /**
   * @description EmailJobProcessor 생성자
   * @param emailService 이메일 서비스 인스턴스
   */
  constructor(private readonly emailService: any) {}

  /**
   * @description 이메일 작업 처리
   * @param data 이메일 데이터
   * @param _job BullMQ 작업 객체 (선택사항)
   * @returns 작업 처리 결과
   */
  async process(data: EmailPayload, _job?: BullJob<EmailPayload>): Promise<JobResult> {
    await this.emailService.send(data);
    return { success: true };
  }
}

/**
 * @description Slack 메시지 전송 프로세서
 * @summary Slack 메시지 작업을 처리하는 프로세서 클래스
 */
export class SlackJobProcessor {
  /**
   * @description SlackJobProcessor 생성자
   * @param slackService Slack 서비스 인스턴스
   */
  constructor(private readonly slackService: any) {}

  /**
   * @description Slack 메시지 작업 처리
   * @param data Slack 메시지 데이터
   * @param _job BullMQ 작업 객체 (선택사항)
   * @returns 작업 처리 결과
   */
  async process(data: SlackPayload, _job?: BullJob<SlackPayload>): Promise<JobResult> {
    await this.slackService.postMessage(data);
    return { success: true };
  }
}

/**
 * @description 세션 리마인더 전송 프로세서
 * @summary 세션 리마인더 알림 작업을 처리하는 프로세서 클래스
 */
export class SessionReminderProcessor {
  /**
   * @description SessionReminderProcessor 생성자
   * @param sessionRepo 세션 저장소
   * @param notificationService 알림 서비스
   */
  constructor(
    private readonly sessionRepo: any,
    private readonly notificationService: any,
  ) {}

  /**
   * @description 세션 리마인더 작업 처리
   * @param data 리마인더 데이터
   * @param _job BullMQ 작업 객체 (선택사항)
   * @returns 작업 처리 결과
   */
  async process(data: SessionReminderPayload, _job?: BullJob<SessionReminderPayload>): Promise<JobResult> {
    const session = await this.sessionRepo.getById(data.sessionId);
    if (!session) return { success: false, error: 'session_not_found' };

    await this.notificationService.sendReminders(session, data);
    return { success: true };
  }
}

/**
 * @description AI 작업 처리 프로세서
 * @summary AI 관련 작업을 처리하는 프로세서 클래스
 */
export class AIProcessingProcessor {
  /**
   * @description AIProcessingProcessor 생성자
   * @param aiService AI 서비스 인스턴스
   */
  constructor(private readonly aiService: any) {}

  /**
   * @description AI 작업 처리
   * @param data AI 작업 데이터
   * @param _job BullMQ 작업 객체 (선택사항)
   * @returns 작업 처리 결과 (결과 데이터 포함)
   */
  async process(data: AIPayload, _job?: BullJob<AIPayload>): Promise<JobResult> {
    const result = await this.aiService.runTask(data);
    return { success: true, data: result };
  }
}

/**
 * @description 시스템 정리 작업 프로세서
 * @summary 시스템 정리 및 유지보수 작업을 처리하는 프로세서 클래스
 */
export class CleanupJobProcessor {
  /**
   * @description CleanupJobProcessor 생성자
   * @param repositories 저장소 컬렉션
   */
  constructor(private readonly repositories: any) {}

  /**
   * @description 정리 작업 처리
   * @param data 정리 작업 데이터
   * @param _job BullMQ 작업 객체 (선택사항)
   * @returns 작업 처리 결과
   */
  async process(data: CleanupPayload, _job?: BullJob<CleanupPayload>): Promise<JobResult> {
    await this.repositories.session.cleanup(data);
    return { success: true };
  }
}

/**
 * @description 보고서 생성 작업 프로세서
 * @summary 보고서 생성 작업을 처리하는 프로세서 클래스
 */
export class ReportJobProcessor {
  /**
   * @description ReportJobProcessor 생성자
   * @param reportService 보고서 서비스 인스턴스
   */
  constructor(private readonly reportService: any) {}

  /**
   * @description 보고서 생성 작업 처리
   * @param data 보고서 데이터
   * @param _job BullMQ 작업 객체 (선택사항)
   * @returns 작업 처리 결과
   */
  async process(data: ReportPayload, _job?: BullJob<ReportPayload>): Promise<JobResult> {
    await this.reportService.generate(data);
    return { success: true };
  }
}
