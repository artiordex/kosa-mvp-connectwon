/**
 * Description : notification.port.ts - 📌 알림 서비스 포트(이벤트/이메일/슬랙) 인터페이스
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import type { NotificationChannel } from '../core-types.js';

/** @description 이벤트 기반 알림 요청 */
export interface NotificationEvent {
  title: string;
  content: {
    text: string;
    html?: string;
  };
  channels: NotificationChannel[];
  recipients: {
    email?: string[];
    slack?: string[];
  };
}

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

  /** @description 확장된 이메일 전송 (첨부파일, CC/BCC 지원) */
  sendEmailExtended(request: SendEmailRequest): Promise<EmailResult>;

  /** @description 확장된 인증번호 전송 */
  sendVerificationCodeExtended(params: SendVerificationCodeParams): Promise<EmailResult>;

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

// 이메일 관련 타입들
/** @description 이메일 요청 (간소화) */
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

/** @description 이메일 주소 */
export interface EmailAddress {
  email: string;
  name?: string;
}

/** @description 이메일 첨부파일 */
export interface EmailAttachment {
  filename: string;
  content: Buffer | string;
  content_type?: string;
  contentType?: string;
  disposition?: 'attachment' | 'inline';
  content_id?: string;
}

/** @description 이메일 우선순위 */
export type EmailPriority = 'high' | 'normal' | 'low' | 'urgent';

/** @description 확장된 이메일 전송 요청 */
export interface SendEmailRequest {
  to: EmailAddress[];
  cc?: EmailAddress[];
  bcc?: EmailAddress[];
  subject: string;
  html?: string;
  text?: string;
  attachments?: EmailAttachment[];
  priority?: EmailPriority;
}

/** @description 인증번호 이메일 전송 파라미터 */
export interface SendVerificationCodeParams {
  email: string;
  code: string;
  expires_in_minutes?: number;
  purpose?: 'signup' | 'email_change' | 'password_reset';
  app_name?: string;
}

/** @description SMTP 인증 정보 */
export interface EmailAuth {
  user: string;
  pass: string;
}

/** @description 이메일 설정 */
export interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: EmailAuth;
  from: EmailAddress;
  pool?: boolean;
  maxConnections?: number;
  maxMessages?: number;
}

// 슬랙
/** @description 슬랙 메시지 요청 */
export interface SlackRequest {
  channel: string;
  text: string;
  blocks?: SlackBlock[];
  thread_ts?: string;
  username?: string;
  icon_emoji?: string;
  icon_url?: string;
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
  thread_ts?: string;
}

/** @description 슬랙 파일 업로드 결과 */
export interface SlackFileResult {
  success: boolean;
  fileId?: string;
  url?: string;
  permalink?: string;
  error?: string;
}

/** @description 슬랙 Block Kit 블록 */
export interface SlackBlock {
  type: string;
  text?: SlackTextObject;
  elements?: SlackElement[];
  accessory?: SlackElement;
  fields?: SlackTextObject[];
  block_id?: string;
}

/** @description 슬랙 텍스트 객체 */
export interface SlackTextObject {
  type: 'plain_text' | 'mrkdwn';
  text: string;
  emoji?: boolean;
  verbatim?: boolean;
}

/** @description 슬랙 UI 요소 */
export interface SlackElement {
  type: string;
  text?: SlackTextObject;
  action_id?: string;
  value?: string;
  url?: string;
  style?: 'primary' | 'danger';
}

/** @description 슬랙 설정 */
export interface SlackConfig {
  token: string;
  signingSecret?: string;
  appToken?: string;
  defaultChannel?: string;
}

// 팩토리 인터페이스
/** @description 알림 서비스 팩토리 */
export interface NotificationServiceFactory {
  createEmailService(config: EmailConfig): NotificationService;
  createSlackService(config: SlackConfig): NotificationService;
  createMultiChannelService(services: NotificationService[]): NotificationService;
  createFromEnvironment(): NotificationService;
}

// 템플릿 관련
/** @description 이메일 템플릿 */
export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
  variables?: string[];
}

/** @description 템플릿 매니저 인터페이스 */
export interface TemplateManager {
  render(templateId: string, data: Record<string, unknown>): RenderedTemplate | null;
  addTemplate(id: string, template: EmailTemplate): void;
  getTemplate(id: string): EmailTemplate | null;
  listTemplates(): string[];
}

/** @description 렌더링된 템플릿 */
export interface RenderedTemplate {
  subject: string;
  html: string;
  text: string;
}

// 유틸리티
/** @description 알림 통계 */
export interface NotificationStats {
  totalSent: number;
  successCount: number;
  failureCount: number;
  byChannel: Record<NotificationChannel, {
    sent: number;
    success: number;
    failure: number;
  }>;
  lastSent?: Date;
}

/** @description 배치 전송 옵션 */
export interface BatchSendOptions {
  batchSize?: number;
  delayBetweenBatches?: number;
  maxRetries?: number;
  onProgress?: (sent: number, total: number) => void;
  onError?: (error: Error, item: any, index: number) => void;
}

/** @description 큐 기반 전송 옵션 */
export interface QueuedSendOptions {
  priority?: 'high' | 'normal' | 'low';
  delay?: number;
  attempts?: number;
  backoff?: 'exponential' | 'linear';
}

// 고급 기능 인터페이스
/** @description 고급 알림 서비스 (선택적 확장) */
export interface AdvancedNotificationService extends NotificationService {
  /** @description 배치 전송 */
  sendBatchEmails(requests: EmailRequest[], options?: BatchSendOptions): Promise<EmailResult[]>;

  /** @description 큐에 추가 */
  queueEmail(request: EmailRequest, options?: QueuedSendOptions): Promise<string>;

  /** @description 전송 통계 */
  getStats(): Promise<NotificationStats>;

  /** @description 템플릿 관리 */
  getTemplateManager(): TemplateManager;

  /** @description 웹훅 설정 */
  setWebhook(url: string, events: string[]): Promise<void>;
}
