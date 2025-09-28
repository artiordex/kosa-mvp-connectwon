/**
 * Description : notification.port.ts - 📌 알림 서비스 포트 (DB + 이벤트/이메일/슬랙)
 * Author : Shiwoo Min
 * Date : 2025-09-30
 */
import type { CursorPaginatedResponse, CursorPaginationQuery, Id, ISODateTime } from '@connectwon/core/core-types';

/** @description 알림 채널 종류 */
export type NotificationChannel = 'system' | 'email' | 'slack' | 'sms' | 'push';

/** @description 알림 유형 */
export type NotificationType = 'reservation' | 'device' | 'program' | 'system';

/** @description 알림 엔터티 (DB 테이블 반영) */
export interface Notification {
  id: Id;
  userId: Id;
  type: NotificationType;
  title: string;
  message?: string;
  isRead: boolean;
  createdAt: ISODateTime;
}

/** @description 알림 생성 입력 */
export interface CreateNotification {
  userId: Id;
  type: NotificationType;
  title: string;
  message?: string;
  channel?: NotificationChannel;
}

/** @description 알림 수정 입력 */
export interface UpdateNotification {
  title?: string;
  message?: string;
  isRead?: boolean;
}

/**
 * @description 알림 저장소 포트 (DB CRUD)
 */
export interface NotificationRepository {
  findById(id: Id): Promise<Notification | null>;
  create(data: CreateNotification): Promise<Notification>;
  update(id: Id, updates: UpdateNotification): Promise<Notification>;
  delete(id: Id): Promise<void>;

  findMany(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Notification>>;
  findByUserId(userId: Id, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Notification>>;
  findUnreadByUserId(userId: Id, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Notification>>;

  markAsRead(id: Id): Promise<void>;
  markAllAsRead(userId: Id): Promise<void>;

  count(): Promise<number>;
  countUnreadByUser(userId: Id): Promise<number>;
  exists(id: Id): Promise<boolean>;
}

/**
 * @description 이벤트 기반 알림 요청
 */
export interface NotificationEvent {
  title: string;
  content: { text: string; html?: string };
  channels: NotificationChannel[];
  recipients: { email?: string[]; slack?: string[] };
}

/**
 * @description 알림 서비스 포트 (통합)
 */
export interface NotificationService {
  sendEventNotification(event: NotificationEvent): Promise<NotificationResult[]>;

  // 이메일
  sendEmail(request: EmailRequest): Promise<EmailResult>;
  sendTemplateEmail(request: TemplateEmailRequest): Promise<EmailResult>;
  sendBulkEmail(requests: EmailRequest[]): Promise<EmailResult[]>;
  sendVerificationCode(email: string, code: string, purpose: 'signup' | 'email_change'): Promise<EmailResult>;
  sendEmailExtended(request: SendEmailRequest): Promise<EmailResult>;
  sendVerificationCodeExtended(params: SendVerificationCodeParams): Promise<EmailResult>;

  // 슬랙
  sendSlack(request: SlackRequest): Promise<SlackResult>;
  uploadSlackFile(request: SlackFileRequest): Promise<SlackFileResult>;

  // 헬스체크
  testEmailConnection(): Promise<boolean>;
  testSlackConnection(): Promise<boolean>;
}

/** @description 채널별 알림 결과 */
export interface NotificationResult {
  success: boolean;
  channel: NotificationChannel;
  messageId?: string;
  error?: string;
}

export interface EmailRequest {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}

export interface TemplateEmailRequest {
  to: string;
  templateId: string;
  templateData: Record<string, unknown>;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface EmailAddress {
  email: string;
  name?: string;
}

export interface EmailAttachment {
  filename: string;
  content: Buffer | string;
  contentType?: string;
  disposition?: 'attachment' | 'inline';
  contentId?: string;
}

export type EmailPriority = 'high' | 'normal' | 'low' | 'urgent';

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

export interface SendVerificationCodeParams {
  email: string;
  code: string;
  expiresInMinutes?: number;
  purpose?: 'signup' | 'email_change' | 'password_reset';
  appName?: string;
}

export interface EmailAuth {
  user: string;
  pass: string;
}

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

export interface SlackRequest {
  channel: string;
  text: string;
  blocks?: SlackBlock[];
  thread_ts?: string;
  username?: string;
  icon_emoji?: string;
  icon_url?: string;
}

export interface SlackResult {
  success: boolean;
  ts?: string;
  channel?: string;
  error?: string;
}

export interface SlackFileRequest {
  channel: string;
  filename: string;
  content: Buffer | string;
  filetype?: string;
  title?: string;
  initialComment?: string;
  thread_ts?: string;
}

export interface SlackFileResult {
  success: boolean;
  fileId?: string;
  url?: string;
  permalink?: string;
  error?: string;
}

export interface SlackBlock {
  type: string;
  text?: SlackTextObject;
  elements?: SlackElement[];
  accessory?: SlackElement;
  fields?: SlackTextObject[];
  block_id?: string;
}

export interface SlackTextObject {
  type: 'plain_text' | 'mrkdwn';
  text: string;
  emoji?: boolean;
  verbatim?: boolean;
}

export interface SlackElement {
  type: string;
  text?: SlackTextObject;
  action_id?: string;
  value?: string;
  url?: string;
  style?: 'primary' | 'danger';
}

export interface SlackConfig {
  token: string;
  signingSecret?: string;
  appToken?: string;
  defaultChannel?: string;
}

/* ---------------------- 팩토리 & 고급 기능 ---------------------- */

export interface NotificationServiceFactory {
  createEmailService(config: EmailConfig): NotificationService;
  createSlackService(config: SlackConfig): NotificationService;
  createMultiChannelService(services: NotificationService[]): NotificationService;
  createFromEnvironment(): NotificationService;
}

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
  variables?: string[];
}

export interface TemplateManager {
  render(templateId: string, data: Record<string, unknown>): RenderedTemplate | null;
  addTemplate(id: string, template: EmailTemplate): void;
  getTemplate(id: string): EmailTemplate | null;
  listTemplates(): string[];
}

export interface RenderedTemplate {
  subject: string;
  html: string;
  text: string;
}

export interface NotificationStats {
  totalSent: number;
  successCount: number;
  failureCount: number;
  byChannel: Record<NotificationChannel, { sent: number; success: number; failure: number }>;
  lastSent?: Date;
}

export interface BatchSendOptions {
  batchSize?: number;
  delayBetweenBatches?: number;
  maxRetries?: number;
  onProgress?: (sent: number, total: number) => void;
  onError?: (error: Error, item: any, index: number) => void;
}

export interface QueuedSendOptions {
  priority?: 'high' | 'normal' | 'low';
  delay?: number;
  attempts?: number;
  backoff?: 'exponential' | 'linear';
}

export interface AdvancedNotificationService extends NotificationService {
  sendBatchEmails(requests: EmailRequest[], options?: BatchSendOptions): Promise<EmailResult[]>;
  queueEmail(request: EmailRequest, options?: QueuedSendOptions): Promise<string>;
  getStats(): Promise<NotificationStats>;
  getTemplateManager(): TemplateManager;
  setWebhook(url: string, events: string[]): Promise<void>;
}
