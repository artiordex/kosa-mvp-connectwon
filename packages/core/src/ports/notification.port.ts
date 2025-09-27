/**
 * Description : notification.port.ts - 📌 알림 서비스 포트(이벤트/이메일/슬랙) 인터페이스
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import type { NotificationChannel, NotificationEvent } from '../core-types.js';

/**
 * @description 알림 서비스 포트 (통합)
 */
export interface NotificationService {
  /** @description 이벤트 기반 알림 */
  sendEventNotification(event: NotificationEvent): Promise<NotificationResult[]>;

  /** @description 이메일 전송 */
  sendEmail(request: EmailRequest): Promise<EmailResult>;

  /** @description 템플릿 기반 이메일 전송 */
  sendTemplateEmail(request: TemplateEmailRequest): Promise<EmailResult>;

  /** @description 대량 이메일 전송 */
  sendBulkEmail(requests: EmailRequest[]): Promise<EmailResult[]>;

  /** @description 인증번호 이메일 전송 */
  sendVerificationCode(email: string, code: string, purpose: 'signup' | 'email_change'): Promise<EmailResult>;

  /** @description 슬랙 메시지 전송 */
  sendSlack(request: SlackRequest): Promise<SlackResult>;

  /** @description 슬랙 파일 업로드 */
  uploadSlackFile(request: SlackFileRequest): Promise<SlackFileResult>;

  /** @description 연결 테스트 */
  testEmailConnection(): Promise<boolean>;
  testSlackConnection(): Promise<boolean>;
}

/**
 * @description 채널별 알림 결과
 */
export interface NotificationResult {
  success: boolean;
  channel: NotificationChannel;
  messageId?: string;
  error?: string;
}

// 이메일
/** @description 이메일 요청 */
export interface EmailRequest {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}

/** @description 템플릿 기반 이메일 요청 */
export interface TemplateEmailRequest {
  to: string;
  templateId: string;
  templateData: Record<string, unknown>;
}

/** @description 이메일 결과 */
export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

// 슬랙
/** @description 슬랙 메시지 요청 */
export interface SlackRequest {
  channel: string;
  text: string;
  blocks?: SlackBlock[];
}

/** @description 슬랙 전송 결과 */
export interface SlackResult {
  success: boolean;
  ts?: string;
  channel?: string;
  error?: string;
}

/** @description 슬랙 파일 업로드 요청 */
export interface SlackFileRequest {
  channel: string;
  filename: string;
  content: Buffer | string;
  filetype?: string;
  title?: string;
  initialComment?: string;
}

/** @description 슬랙 파일 업로드 결과 */
export interface SlackFileResult {
  success: boolean;
  fileId?: string;
  url?: string;
  error?: string;
}

/** @description 슬랙 Block Kit 블록 */
export interface SlackBlock {
  type: string;
  text?: {
    type: 'plain_text' | 'mrkdwn';
    text: string;
  };
  elements?: unknown[];
}
