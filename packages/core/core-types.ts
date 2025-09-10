/**
 * Description : core-types.ts - 📌 알림 및 AI, Job 관련 타입정의
 * Author : Shiwoo Min
 * Date : 2025-09-07
 */

// Slack 설정
export interface SlackConfig {
  webhookUrl: string;
  channel: string;
  mentions?: string[];
}

// Email 설정
export interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  from: { email: string; name: string };
  to?: string[];
}

// 공통 알림 타입
export type NotificationChannel = 'email' | 'slack' | 'sms' | 'push';
export type NotificationPriority = 'low' | 'normal' | 'high' | 'urgent';
export type NotificationStatus = 'pending' | 'sent' | 'failed' | 'delivered' | 'read';

export interface BaseNotification {
  id: string;
  channel: NotificationChannel;
  priority: NotificationPriority;
  status: NotificationStatus;
  created_at: string;
  sent_at?: string;
  delivered_at?: string;
  error_message?: string;
  retry_count: number;
  max_retries: number;
}

// 이메일 알림
export interface EmailAddress {
  email: string;
  name?: string;
}

export interface EmailAttachment {
  filename: string;
  content: Buffer | string;
  content_type: string;
  disposition?: 'attachment' | 'inline';
  content_id?: string;
}

export interface EmailNotification extends BaseNotification {
  channel: 'email';
  to: EmailAddress[];
  cc?: EmailAddress[];
  bcc?: EmailAddress[];
  from: EmailAddress;
  reply_to?: EmailAddress;
  subject: string;
  html?: string;
  text?: string;
  template?: EmailTemplate;
  attachments?: EmailAttachment[];
  headers?: Record<string, string>;
  tags?: string[];
}

export interface SendEmailRequest {
  to: EmailAddress[];
  cc?: EmailAddress[];
  bcc?: EmailAddress[];
  subject: string;
  html?: string;
  text?: string;
  template?: EmailTemplate;
  attachments?: EmailAttachment[];
  priority?: NotificationPriority;
  tags?: string[];
  scheduled_at?: string;
}

// 이메일 템플릿 정의
export interface EmailTemplateDefinition {
  id: string;
  name: string;
  subject_template: string;
  html_template: string;
  text_template?: string;
  required_variables: string[];
  optional_variables?: string[];
  created_at: string;
  updated_at: string;
}

// Slack 알림
export interface SlackField {
  title: string;
  value: string;
  short?: boolean;
}

export interface SlackBlock {
  type: string;
  text?: { type: string; text: string };
  elements?: unknown[];
  accessory?: unknown;
}

export interface SlackAttachment {
  color?: string;
  pretext?: string;
  author_name?: string;
  author_link?: string;
  author_icon?: string;
  title?: string;
  title_link?: string;
  text?: string;
  fields?: SlackField[];
  image_url?: string;
  thumb_url?: string;
  footer?: string;
  footer_icon?: string;
  ts?: number;
}

export interface SlackNotification extends BaseNotification {
  channel: 'slack';
  channel_id?: string;
  channel_name?: string;
  user_id?: string;
  username?: string;
  text: string;
  blocks?: SlackBlock[];
  attachments?: SlackAttachment[];
  thread_ts?: string;
  reply_broadcast?: boolean;
  link_names?: boolean;
  parse?: 'full' | 'none';
  unfurl_links?: boolean;
  unfurl_media?: boolean;
  icon_emoji?: string;
  icon_url?: string;
  username_override?: string;
}

export interface SendSlackRequest {
  channel_id?: string;
  channel_name?: string;
  user_id?: string;
  text: string;
  blocks?: SlackBlock[];
  attachments?: SlackAttachment[];
  thread_ts?: string;
  priority?: NotificationPriority;
  scheduled_at?: string;
}

export interface SlackWebhookConfig {
  webhook_url: string;
  default_channel?: string;
  default_username?: string;
  default_icon?: string;
}

export interface SlackMessage {
  channel: string;
  text: string;
  username?: string;
  icon_emoji?: string;
  icon_url?: string;
  attachments?: SlackAttachment[];
  blocks?: SlackBlock[];
  thread_ts?: string;
}

export interface SlackResult {
  success: boolean;
  error?: string;
  response?: unknown;
}

// 알림 템플릿
export interface NotificationTemplate {
  id: string;
  name: string;
  description?: string;
  channel: NotificationChannel;
  template_data: EmailTemplateDefinition | SlackTemplate;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SlackTemplate {
  text_template: string;
  blocks_template?: unknown;
  required_variables: string[];
  optional_variables?: string[];
}

// 알림 이벤트
export type NotificationEventType =
  | 'session_reminder'
  | 'session_cancelled'
  | 'session_confirmed'
  | 'program_created'
  | 'program_updated'
  | 'participant_joined'
  | 'participant_left'
  | 'room_reservation_confirmed'
  | 'room_reservation_cancelled'
  | 'payment_completed'
  | 'payment_failed';

export interface NotificationEvent {
  event_type: NotificationEventType;
  entity_id: string;
  entity_type: 'session' | 'program' | 'user' | 'reservation' | 'payment';
  recipients: {
    user_ids?: string[];
    email_addresses?: string[];
    slack_channels?: string[];
    slack_users?: string[];
  };
  template_id?: string;
  variables: Record<string, unknown>;
  priority?: NotificationPriority;
  scheduled_at?: string;
}

// 알림 설정
export interface NotificationPreferences {
  user_id: string;
  email_enabled: boolean;
  slack_enabled: boolean;
  sms_enabled: boolean;
  push_enabled: boolean;
  channels: {
    session_reminders: NotificationChannel[];
    session_updates: NotificationChannel[];
    program_updates: NotificationChannel[];
    payment_notifications: NotificationChannel[];
    marketing: NotificationChannel[];
  };
  quiet_hours?: {
    start: string; // HH:mm
    end: string; // HH:mm
    timezone: string;
  };
  frequency_limits?: {
    daily_max: number;
    weekly_max: number;
  };
}

// 알림 통계
export interface NotificationStats {
  total_sent: number;
  total_delivered: number;
  total_failed: number;
  delivery_rate: number;
  by_channel: Record<
    NotificationChannel,
    { sent: number; delivered: number; failed: number; delivery_rate: number }
  >;
  by_template: Record<string, { sent: number; delivered: number; failed: number }>;
  time_period: {
    start: string;
    end: string;
  };
}

// AI 타입
export type AIProvider = 'openai' | 'anthropic' | 'huggingface';
export type AIRole = 'system' | 'user' | 'assistant';

export interface AIMessage {
  role: AIRole;
  content: string;
}

export interface AIChatParams {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
}

export interface AIChatInput {
  messages: AIMessage[];
  system?: string;
  params?: AIChatParams;
}

export interface AIUsage {
  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
  costUSD?: number;
}

export type FinishReason = 'stop' | 'length' | 'content_filter' | 'tool_calls' | string | undefined;

export interface AIChatResult {
  content: string;
  finishReason?: FinishReason;
  usage?: AIUsage;
  raw?: unknown;
}

export interface AIClient {
  chat(input: AIChatInput): Promise<AIChatResult>;
}

export interface AIClientOptions {
  apiKey: string;
  baseURL?: string;
  defaultModel?: string;
}

// n8n 연동 타입
export interface N8nWebhookPayload {
  event_type: string;
  entity_type: 'session' | 'program' | 'user' | 'reservation';
  entity_id: string;
  data: Record<string, unknown>;
  timestamp: string;
}

export interface NotificationPayload {
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  data?: Record<string, unknown>;
  user_id?: string;
  channel?: string;
}

// 이메일 전송
export interface SendEmailParams {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}

export interface EmailResult {
  success: boolean;
  message_id?: string;
  error?: string;
}

// 인증번호 전송
export type VerificationPurpose = 'signup' | 'email_change' | 'password_reset' | 'login';

export interface SendVerificationCodeParams {
  email: string;
  code: string;
  purpose: VerificationPurpose;
  expires_in_minutes?: number;
}

// 이메일 템플릿
export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export type EmailTemplateType = 'verification_code' | 'password_reset' | 'welcome' | 'notification';

// 헬퍼
export interface EmailValidationResult {
  isValid: boolean;
  error?: string;
}

// Job 타입
export type JobStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'retrying';
export type JobPriority = 'low' | 'normal' | 'high' | 'urgent';

export interface BaseJob {
  id: string;
  type: string;
  status: JobStatus;
  priority: JobPriority;
  data: Record<string, unknown>;
  attempts: number;
  maxAttempts: number;
  createdAt: string;
  updatedAt: string;
  processedAt?: string;
  completedAt?: string;
  failedAt?: string;
  error?: string;
  result?: unknown;
}

// 작업 타입별 데이터
export interface EmailJobData {
  to: string;
  subject: string;
  html?: string;
  text?: string;
  template?: { id: string; variables: Record<string, unknown> };
}

export interface SlackJobData {
  channel?: string;
  user_id?: string;
  text: string;
  attachments?: unknown[];
  blocks?: unknown[];
}

export interface SessionReminderJobData {
  session_id: string;
  reminder_type: 'before_1_hour' | 'before_30_min' | 'before_10_min' | 'started';
  participants: string[];
}

export interface AIProcessingJobData {
  entity_type: 'program' | 'session';
  entity_id: string;
  task_type: 'generate_tags' | 'generate_summary' | 'analyze_feedback';
  input_data: Record<string, unknown>;
}

export interface CleanupJobData {
  target: 'expired_sessions' | 'old_notifications' | 'temp_files';
  older_than_days: number;
  dry_run?: boolean;
}

export interface ReportJobData {
  report_type: 'daily_summary' | 'weekly_stats' | 'monthly_report';
  date_range: { start: string; end: string };
  recipients: string[];
  format: 'email' | 'pdf' | 'csv';
}

// ----------------------------------------------
// 기본 원시/브랜드 타입
// ----------------------------------------------
export type Id = string; // 엔티티 식별자
export type ISODateTime = string; // 'YYYY-MM-DDTHH:mm:ss.sssZ'
export type ISODateOnly = string; // 'YYYY-MM-DD'
export type JsonObject = Record<string, unknown>;

// 선택: 도메인 롤(프레임워크 무관)
export type Role = 'ADMIN' | 'PROGRAM_CREATOR' | 'USER';

// 필요하면 VO(브랜드) ID로 확장해 사용
export type UserId = Id;
export type ProgramId = Id;
export type SessionId = Id;
export type RoomId = Id;
export type VenueId = Id;

// ----------------------------------------------
// 공통 페이지네이션
// ----------------------------------------------
export interface Page<T> {
  items: T[];
  total: number;
  page: number; // 1-base
  pageSize: number;
}

// ----------------------------------------------
// 이메일/알림 공용
// ----------------------------------------------
export interface EmailAddress {
  email: string;
  name?: string;
}

export interface AttachmentFile {
  filename: string;
  content: string | Uint8Array; // 바이트 or base64 문자열
  contentType?: string;
  disposition?: 'attachment' | 'inline';
  contentId?: string;
}

// ----------------------------------------------
// Slack 메시지 구조 (여러 곳에서 재사용 시)
//  - 느슨한 블록 타입으로 두어 어댑터에서 구체 검증
// ----------------------------------------------
export interface SlackField {
  title: string;
  value: string;
  short?: boolean;
}

export interface SlackAttachment {
  color?: string;
  title?: string;
  text?: string;
  footer?: string;
  ts?: number;
  fields?: SlackField[];
}

export interface SlackBlock {
  type: string;
  // 실제 섹션/컨텍스트 블록 등 임의 속성 허용
  [k: string]: unknown;
}

// --- 사용자 엔터티/DTO ---
export interface User {
  id: Id;
  email: string;
  name: string;
  googleSub?: string;
  roleFlags: number; // 비트마스크
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
  lastLoginAt?: ISODateTime;
}

// 생성/수정 DTO (업데이트는 부분 갱신)
export interface CreateUser {
  email: string;
  name: string;
  googleSub?: string;
  roleFlags?: number;
}

export interface UpdateUser {
  email?: string;
  name?: string;
  googleSub?: string;
  roleFlags?: number;
  lastLoginAt?: ISODateTime;
}

// --- 커서 페이지네이션 표준 ---
export interface CursorPaginationQuery {
  cursor?: string | null; // 마지막 항목의 커서 (없으면 첫 페이지)
  limit?: number; // 기본 20~50 추천
}

export interface CursorPaginatedResponse<T> {
  items: T[];
  nextCursor: string | null; // 다음 페이지가 없으면 null
  total?: number; // 필요 시 비용 주의
}

export interface Venue {
  id: Id;
  name: string;
  address?: string;
  location?: string; // 도시명, 좌표, 행정구역 등 표현 방식은 구현체에 위임
  timezone: string; // IANA Timezone (e.g. "Asia/Seoul")
  openingHours?: Array<{
    dayOfWeek: number; // 0=Sunday … 6=Saturday
    opensAt: string; // "HH:mm"
    closesAt: string; // "HH:mm"
  }>;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

export interface CreateVenue {
  name: string;
  address?: string;
  location?: string;
  timezone: string;
  openingHours?: Array<{
    dayOfWeek: number;
    opensAt: string;
    closesAt: string;
  }>;
}

export interface UpdateVenue {
  name?: string;
  address?: string;
  location?: string;
  timezone?: string;
  openingHours?: Array<{
    dayOfWeek: number;
    opensAt: string;
    closesAt: string;
  }>;
}
