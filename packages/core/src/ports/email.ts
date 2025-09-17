/**
 * Description : email.ts - 📌 이메일 제공자 포트 인터페이스
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */

// 이메일 제공자 포트 인터페이스
export interface EmailProvider {
  // 제공자 정보
  name: string;

  // 이메일 전송
  sendEmail(request: EmailSendRequest): Promise<EmailSendResult>;

  // 대량 전송
  sendBulkEmail(requests: EmailSendRequest[]): Promise<EmailSendResult[]>;

  // 템플릿 전송
  sendTemplateEmail(request: TemplateEmailRequest): Promise<EmailSendResult>;

  // 연결 테스트
  testConnection(): Promise<boolean>;

  // 제공자 상태
  isAvailable(): boolean;
  getStatus(): Promise<ProviderStatus>;

  // 사용량 정보
  getUsageStats(): Promise<UsageStats>;

  // 웹훅 처리 (전송 상태 업데이트)
  handleWebhook(payload: unknown): Promise<WebhookResult>;
}

// 이메일 전송 요청 인터페이스
export interface EmailSendRequest {
  to: EmailAddress[];
  cc?: EmailAddress[];
  bcc?: EmailAddress[];
  from?: EmailAddress;
  replyTo?: EmailAddress;
  subject: string;
  html?: string;
  text?: string;
  attachments?: EmailAttachment[];
  headers?: Record<string, string>;
  tags?: string[];
  metadata?: Record<string, unknown>;
}

// 템플릿 기반 이메일 전송 요청 인터페이스
export interface TemplateEmailRequest {
  to: EmailAddress[];
  cc?: EmailAddress[];
  bcc?: EmailAddress[];
  templateId: string;
  templateData: Record<string, unknown>;
  tags?: string[];
  metadata?: Record<string, unknown>;
}

// 이메일 주소 인터페이스
export interface EmailAddress {
  email: string;
  name?: string;
}

// 이메일 첨부파일 인터페이스
export interface EmailAttachment {
  filename: string;
  content: Buffer | string;
  contentType: string;
  disposition?: 'attachment' | 'inline';
  contentId?: string;
}

// 이메일 전송 결과 인터페이스
export interface EmailSendResult {
  success: boolean;
  messageId?: string;
  providerId?: string;
  error?: string;
  details?: {
    accepted?: string[];
    rejected?: string[];
    pending?: string[];
  };
  metadata?: Record<string, unknown>;
}

// 제공자 상태 인터페이스
export interface ProviderStatus {
  name: string;
  isHealthy: boolean;
  lastChecked: string;
  responseTime?: number;
  errorRate?: number;
  dailyQuota?: {
    used: number;
    total: number;
    remaining: number;
  };
  monthlyQuota?: {
    used: number;
    total: number;
    remaining: number;
  };
}

// 사용량 통계 인터페이스
export interface UsageStats {
  today: {
    sent: number;
    delivered: number;
    bounced: number;
    failed: number;
  };
  thisMonth: {
    sent: number;
    delivered: number;
    bounced: number;
    failed: number;
  };
  deliveryRate: number;
  bounceRate: number;
  lastUpdated: string;
}

// 웹훅 처리 인터페이스
export interface WebhookResult {
  processed: boolean;
  events: EmailEvent[];
  error?: string;
}

// 이메일 이벤트 인터페이스
export interface EmailEvent {
  messageId: string;
  event: EmailEventType;
  timestamp: string;
  recipient?: string;
  reason?: string;
  metadata?: Record<string, unknown>;
}

// 이메일 이벤트 유형
export type EmailEventType =
  | 'sent'
  | 'delivered'
  | 'opened'
  | 'clicked'
  | 'bounced'
  | 'dropped'
  | 'deferred'
  | 'unsubscribed'
  | 'spam_reported';

// SMTP 제공자 인터페이스
export interface SMTPEmailProvider extends EmailProvider {
  name: 'smtp';

  // SMTP 특화 설정
  configure(config: SMTPConfig): void;

  // 연결 풀 관리
  getConnectionPoolStats(): Promise<ConnectionPoolStats>;
}

// SMTP 설정 인터페이스
export interface SMTPConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  pool?: boolean;
  maxConnections?: number;
  maxMessages?: number;
  rateDelta?: number;
  rateLimit?: number;
}

// 연결 통계 인터페이스
export interface ConnectionPoolStats {
  total: number;
  idle: number;
  active: number;
}

// SendGrid 제공자 인터페이스
export interface SendGridEmailProvider extends EmailProvider {
  name: 'sendgrid';

  // SendGrid 특화 기능
  getTemplates(): Promise<SendGridTemplate[]>;
  createTemplate(template: CreateTemplateRequest): Promise<SendGridTemplate>;
  updateTemplate(templateId: string, updates: UpdateTemplateRequest): Promise<SendGridTemplate>;
  deleteTemplate(templateId: string): Promise<void>;

  // 통계 조회
  getDetailedStats(startDate: string, endDate: string): Promise<SendGridStats>;
}

// SendGrid 템플릿 인터페이스
export interface SendGridTemplate {
  id: string;
  name: string;
  generation: 'legacy' | 'dynamic';
  updated_at: string;
  versions: Array<{
    id: string;
    template_id: string;
    active: number;
    name: string;
    subject: string;
    updated_at: string;
  }>;
}

// 템플릿 관리 요청 인터페이스
export interface CreateTemplateRequest {
  name: string;
  generation: 'legacy' | 'dynamic';
}

// 템플릿 업데이트 요청 인터페이스
export interface UpdateTemplateRequest {
  name?: string;
}

// SendGrid 통계 인터페이스
export interface SendGridStats {
  date: string;
  stats: Array<{
    metrics: {
      blocks: number;
      bounce_drops: number;
      bounces: number;
      clicks: number;
      deferred: number;
      delivered: number;
      invalid_emails: number;
      opens: number;
      processed: number;
      requests: number;
      spam_report_drops: number;
      spam_reports: number;
      unique_clicks: number;
      unique_opens: number;
      unsubscribe_drops: number;
      unsubscribes: number;
    };
  }>;
}

// 이메일 제공자 팩토리
export interface EmailProviderFactory {
  createSMTPProvider(config: SMTPConfig): SMTPEmailProvider;
  createSendGridProvider(apiKey: string): SendGridEmailProvider;

  // 환경변수 기반 생성
  createFromEnvironment(): EmailProvider;

  // 다중 제공자 지원
  createFailoverProvider(providers: EmailProvider[]): EmailProvider;
  createLoadBalancingProvider(providers: EmailProvider[]): EmailProvider;
}
