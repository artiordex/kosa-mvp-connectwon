/**
 * Description : core-types.ts - 📌 알림 · AI · Queue 타입 정의 (중복 정리본)
 * Author      : Shiwoo Min
 * Date        : 2025-09-10
 */

// ================== Common Primitives ==================
export type Id = string;
export type ISODateTime = string; // 'YYYY-MM-DDTHH:mm:ss.sssZ'
export type ISODateOnly = string; // 'YYYY-MM-DD'
export type JsonObject = Record<string, unknown>;
export type Role = 'ADMIN' | 'PROGRAM_CREATOR' | 'USER';

export type UserId = Id;
export type ProgramId = Id;
export type SessionId = Id;
export type RoomId = Id;
export type VenueId = Id;

export interface Page<T> {
  items: T[];
  total: number;
  page: number; // 1-base
  pageSize: number;
}

export interface CursorPaginationQuery {
  cursor?: string | null;
  limit?: number;
}
export interface CursorPaginatedResponse<T> {
  items: T[];
  nextCursor: string | null;
  total?: number;
}

// ================== Users / Venues ==================
export interface User {
  id: Id;
  email: string;
  name: string;
  googleSub?: string;
  roleFlags: number; // bitmask
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
  lastLoginAt?: ISODateTime;
}
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

export interface Venue {
  id: Id;
  name: string;
  address?: string;
  location?: string;
  timezone: string; // IANA, e.g. "Asia/Seoul"
  openingHours?: Array<{ dayOfWeek: number; opensAt: string; closesAt: string }>;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}
export interface CreateVenue {
  name: string;
  address?: string;
  location?: string;
  timezone: string;
  openingHours?: Array<{ dayOfWeek: number; opensAt: string; closesAt: string }>;
}
export interface UpdateVenue {
  name?: string;
  address?: string;
  location?: string;
  timezone?: string;
  openingHours?: Array<{ dayOfWeek: number; opensAt: string; closesAt: string }>;
}

// ================== Email / Notifications ==================
export interface EmailAddress {
  email: string;
  name?: string;
}

export interface EmailAttachment {
  filename: string;
  content: Uint8Array | string; // Node Buffer도 Uint8Array 호환
  content_type: string;
  disposition?: 'attachment' | 'inline';
  content_id?: string;
}

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
  [k: string]: unknown;
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
  quiet_hours?: { start: string; end: string; timezone: string };
  frequency_limits?: { daily_max: number; weekly_max: number };
}

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
  time_period: { start: string; end: string };
}

// ================== AI ==================
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

// ================== n8n ==================
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

// ================== Email Shortcuts ==================
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

export type VerificationPurpose = 'signup' | 'email_change' | 'password_reset' | 'login';
export interface SendVerificationCodeParams {
  email: string;
  code: string;
  purpose: VerificationPurpose;
  expires_in_minutes?: number;
}
export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}
export type EmailTemplateType = 'verification_code' | 'password_reset' | 'welcome' | 'notification';

// ================== Queue / Jobs (Unified) ==================
export type JobStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'delayed';
export type JobPriority = 'low' | 'normal' | 'high' | 'critical';

export interface QueueBackoff {
  type: 'fixed' | 'exponential';
  delay: number;
}
export interface QueueDefaultJobOptions {
  maxAttempts: number;
  backoff: QueueBackoff;
}
export interface QueueConfig {
  concurrency: number;
  defaultJobOptions: QueueDefaultJobOptions;
}
export interface QueueStats {
  pending: number;
  processing: number;
  completed: number;
  failed: number;
  total: number;
  throughput: { per_minute: number; per_hour: number };
}

export type JobResult<T = unknown> =
  | { success: true; data?: T }
  | { success: false; error: string };

export interface Job<T = unknown> {
  id: string;
  type: string;
  status: JobStatus;
  priority: JobPriority;
  data: T;
  attempts: number;
  maxAttempts: number;
  createdAt: string;
  updatedAt: string;
  scheduledAt?: string;
  startedAt?: string;
  completedAt?: string;
  failedAt?: string;
  error?: string;
}

export interface EmailJobData {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  templateId?: string;
  variables?: Record<string, unknown>;
}
export interface SlackJobData {
  channel: string;
  text: string;
  blocks?: unknown[];
  mentions?: string[];
}
export interface SessionReminderJobData {
  sessionId: string;
  userIds?: string[];
  reminderType: '24h_before' | '1h_before' | 'start' | 'follow_up';
}
export interface AIProcessingJobData {
  task: 'summarize' | 'classify' | 'embeddings' | 'tags';
  entityType: 'session' | 'program' | 'user' | 'reservation' | 'payment';
  entityId: string;
  payload?: Record<string, unknown>;
}
export interface CleanupJobData {
  target: 'sessions' | 'reservations' | 'logs' | 'emails' | 'slack';
  retentionDays: number;
  dryRun?: boolean;
}
export interface ReportJobData {
  reportType: 'daily' | 'weekly' | 'monthly';
  period?: { from: string; to: string };
  recipients: { emails?: string[]; slackChannels?: string[] };
}

export type EmailJob = Job<EmailJobData>;
export type SlackJob = Job<SlackJobData>;
export type SessionReminderJob = Job<SessionReminderJobData>;
export type AIProcessingJob = Job<AIProcessingJobData>;
export type CleanupJob = Job<CleanupJobData>;
export type ReportJob = Job<ReportJobData>;

export interface JobProcessor<T extends Job = Job> {
  process(job: T): Promise<JobResult>;
}

// ================== Legacy Compatibility (optional, thin aliases) ==================
// 구버전 BaseJob -> 현재 제네릭 Job의 any 데이터 버전
export type BaseJob = Job<Record<string, unknown>>;

// (필요 시) 구 snake_case JobData와의 가벼운 매핑 타입을 추가해도 됨.
// 예: type LegacySessionReminderJobData = { session_id: string; reminder_type: 'before_1_hour'|'before_30_min'|'before_10_min'|'started'; participants: string[] };
