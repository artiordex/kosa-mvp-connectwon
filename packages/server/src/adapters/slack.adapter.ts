/**
 * Description : slack.adapter.ts - 📌 Slack API 어댑터
 * Author : Shiwoo Min
 * Date : 2025-09-28
 */
import { WebClient } from '@slack/web-api';

import type {
  EmailRequest,
  EmailResult,
  NotificationEvent,
  NotificationResult,
  NotificationService,
  SendEmailRequest,
  SendVerificationCodeParams,
  SlackConfig,
  SlackFileRequest,
  SlackFileResult,
  SlackRequest,
  SlackResult,
  TemplateEmailRequest,
} from '../../../core/src/ports/notification.port.js';

import type {
  EmailRequest,
  EmailResult,
  NotificationEvent,
  NotificationResult,
  NotificationService,
  SendEmailRequest,
  SendVerificationCodeParams,
  SlackConfig,
  SlackFileRequest,
  SlackFileResult,
  SlackRequest,
  SlackResult,
  TemplateEmailRequest,
} from '../../../core/src/ports/notification.port.js';

/**
 * @description Slack 어댑터 클래스
 * @implements {NotificationService}
 */
export class SlackAdapter implements NotificationService {
  private readonly client: WebClient;

  /**
   * @description SlackAdapter 생성자
   * @param config Slack 설정 (토큰, 기본 채널 등)
   */
  constructor(private readonly config: SlackConfig) {
    this.client = new WebClient(config.token);
  }

  /**
   * @description Slack 메시지 전송
   * @param request SlackRequest
   * @returns SlackResult
   */
  async sendSlack(request: SlackRequest): Promise<SlackResult> {
    try {
      const params: any = {
        channel: request.channel ?? this.config.defaultChannel ?? '',
        text: request.text,
      };

      if (request.blocks) params.blocks = request.blocks;
      if (request.thread_ts) params.thread_ts = request.thread_ts;
      if (request.username) params.username = request.username;
      if (request.icon_emoji) params.icon_emoji = request.icon_emoji;
      if (request.icon_url) params.icon_url = request.icon_url;

      const res = await this.client.chat.postMessage(params);

      return {
        success: true,
        ts: res.ts ?? '',
        channel: res.channel ?? '',
      };
    } catch (err) {
      return { success: false, error: (err as Error).message };
    }
  }

  /**
   * @description Slack 파일 업로드
   * @param request SlackFileRequest
   * @returns SlackFileResult
   */
  async uploadSlackFile(request: SlackFileRequest): Promise<SlackFileResult> {
    try {
      const params: any = {
        channels: request.channel,
        filename: request.filename,
        file: request.content,
      };

      if (request.filetype) params.filetype = request.filetype;
      if (request.title) params.title = request.title;
      if (request.initialComment) params.initial_comment = request.initialComment;
      if (request.thread_ts) params.thread_ts = request.thread_ts;

      const res = await this.client.files.upload(params);
      const file = (res as any).file ?? {};

      return {
        success: true,
        fileId: file.id ?? '',
        url: file.url_private ?? '',
        permalink: file.permalink ?? '',
      };
    } catch (err) {
      return { success: false, error: (err as Error).message };
    }
  }

  /**
   * @description Slack 연결 테스트
   * @returns 성공 여부
   */
  async testSlackConnection(): Promise<boolean> {
    try {
      await this.client.auth.test();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * @description 아직 미구현된 인터페이스 메서드들
   */
  async sendEventNotification(_event: NotificationEvent): Promise<NotificationResult[]> {
    throw new Error('Not implemented');
  }

  async sendEmail(_request: EmailRequest): Promise<EmailResult> {
    throw new Error('Not implemented');
  }

  async sendTemplateEmail(_request: TemplateEmailRequest): Promise<EmailResult> {
    throw new Error('Not implemented');
  }

  async sendBulkEmail(_requests: EmailRequest[]): Promise<EmailResult[]> {
    throw new Error('Not implemented');
  }

  async sendVerificationCode(_email: string, _code: string, _purpose: 'signup' | 'email_change'): Promise<EmailResult> {
    throw new Error('Not implemented');
  }

  async sendEmailExtended(_request: SendEmailRequest): Promise<EmailResult> {
    throw new Error('Not implemented');
  }

  async sendVerificationCodeExtended(_params: SendVerificationCodeParams): Promise<EmailResult> {
    throw new Error('Not implemented');
  }

  async testEmailConnection(): Promise<boolean> {
    return false;
  }
}
