/**
 * Description : slack.adapter.ts - 📌 Slack Web API 기반 알림 어댑터
 * Author : Shiwoo Min
 * Date : 2025-09-30
 */
import type { EmailRequest, EmailResult, NotificationEvent, NotificationResult, NotificationService, SendEmailRequest, SendVerificationCodeParams, SlackConfig, SlackFileRequest, SlackFileResult, SlackRequest, SlackResult, TemplateEmailRequest } from '@connectwon/core/ports/notification.port.js';
import { WebClient } from '@slack/web-api';
import type { Block, KnownBlock } from '@slack/web-api';

/**
 * @class SlackNotificationAdapter
 * @description Slack 메시지/파일 업로드 어댑터
 */
export class SlackNotificationAdapter implements NotificationService {
  private client: WebClient;

  constructor(private readonly config: SlackConfig) {
    this.client = new WebClient(config.token);
  }

  /** @description Slack 메시지 전송 */
  async sendSlack(request: SlackRequest): Promise<SlackResult> {
    try {
      const payload: any = {
        channel: request.channel ?? this.config.defaultChannel ?? '',
        text: request.text,
      };

      if (request.blocks) {
        payload.blocks = request.blocks as (KnownBlock | Block)[];
      }
      if (request.thread_ts) {
        payload.thread_ts = request.thread_ts;
      }
      if (request.username) {
        payload.username = request.username;
      }
      if (request.icon_emoji) {
        payload.icon_emoji = request.icon_emoji;
      }
      if (request.icon_url) {
        payload.icon_url = request.icon_url;
      }

      const res = await this.client.chat.postMessage(payload);

      return {
        success: true,
        ts: res.ts ?? '',
        channel: res.channel ?? '',
      };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  /** @description Slack 파일 업로드 */
  async uploadSlackFile(request: SlackFileRequest): Promise<SlackFileResult> {
    try {
      const res = await this.client.files.upload({
        channels: request.channel,
        filename: request.filename,
        file: request.content,
        filetype: request.filetype,
        title: request.title,
        initial_comment: request.initialComment,
        thread_ts: request.thread_ts,
      } as any);

      const file = (res as any).file ?? {};
      return {
        success: true,
        fileId: file.id,
        url: file.url_private,
        permalink: file.permalink,
      };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  /** @description Slack 연결 테스트 */
  async testSlackConnection(): Promise<boolean> {
    try {
      await this.client.auth.test();
      return true;
    } catch {
      return false;
    }
  }

  // ==== Email 관련 (지원하지 않음) ====
  async sendEmail(_: EmailRequest): Promise<EmailResult> {
    throw new Error('Email not supported in SlackNotificationAdapter');
  }
  async sendTemplateEmail(_: TemplateEmailRequest): Promise<EmailResult> {
    throw new Error('Email not supported in SlackNotificationAdapter');
  }
  async sendBulkEmail(_: EmailRequest[]): Promise<EmailResult[]> {
    throw new Error('Email not supported in SlackNotificationAdapter');
  }
  async sendVerificationCode(_: string, __: string, ___: 'signup' | 'email_change'): Promise<EmailResult> {
    throw new Error('Email not supported in SlackNotificationAdapter');
  }
  async sendEmailExtended(_: SendEmailRequest): Promise<EmailResult> {
    throw new Error('Email not supported in SlackNotificationAdapter');
  }
  async sendVerificationCodeExtended(_: SendVerificationCodeParams): Promise<EmailResult> {
    throw new Error('Email not supported in SlackNotificationAdapter');
  }
  async testEmailConnection(): Promise<boolean> {
    return false;
  }

  // ==== Event 알림 (미구현) ====
  async sendEventNotification(_: NotificationEvent): Promise<NotificationResult[]> {
    throw new Error('Not implemented');
  }
}
