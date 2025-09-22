/**
 * Description : email.ts - 📌 이메일 전송/템플릿/통계/웹훅 등 이메일 제공자 포트 인터페이스
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
/**
 * @description 이메일 제공자 공통 포트
 */
export interface EmailProvider {
  /** @description 제공자 이름 */
  name: string;

  /** @description 단건 이메일 전송 */
  sendEmail(request: EmailSendRequest): Promise<EmailSendResult>;
  /** @description 대량 이메일 전송 */
  sendBulkEmail(requests: EmailSendRequest[]): Promise<EmailSendResult[]>;
  /** @description 템플릿 기반 전송 */
  sendTemplateEmail(request: TemplateEmailRequest): Promise<EmailSendResult>;
  /** @description 연결 테스트 */
  testConnection(): Promise<boolean>;
  /** @description 사용 가능 여부 */
  isAvailable(): boolean;
  /** @description 헬스/상태 조회 */
  getStatus(): Promise<ProviderStatus>;
  /** @description 사용량 통계 */
  getUsageStats(): Promise<UsageStats>;
  /** @description 웹훅 처리(전송 상태 갱신 등) */
  handleWebhook(payload: unknown): Promise<WebhookResult>;
}

/**
 * @description 이메일 전송 요청
 */
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

/**
 * @description 템플릿 이메일 전송 요청
 */
export interface TemplateEmailRequest {
  to: EmailAddress[];
  cc?: EmailAddress[];
  bcc?: EmailAddress[];
  templateId: string;
  templateData: Record<string, unknown>;
  tags?: string[];
  metadata?: Record<string, unknown>;
}

/**
 * @description 이메일 주소
 */
export interface EmailAddress {
  email: string;
  name?: string;
}

/**
 * @description 이메일 첨부
 */
export interface EmailAttachment {
  filename: string;
  content: Buffer | string;
  contentType: string;
  disposition?: 'attachment' | 'inline';
  contentId?: string;
}

/**
 * @description 전송 결과
 */
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

/**
 * @description 제공자 상태
 */
export interface ProviderStatus {
  name: string;
  isHealthy: boolean;
  lastChecked: string;
  responseTime?: number;
  errorRate?: number;
  dailyQuota?: { used: number; total: number; remaining: number };
  monthlyQuota?: { used: number; total: number; remaining: number };
}

/**
 * @description 사용량 통계(요약)
 */
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

/**
 * @description 웹훅 처리 결과
 */
export interface WebhookResult {
  processed: boolean;
  events: EmailEvent[];
  error?: string;
}

/**
 * @description 이메일 이벤트
 */
export interface EmailEvent {
  messageId: string;
  event: EmailEventType;
  timestamp: string;
  recipient?: string;
  reason?: string;
  metadata?: Record<string, unknown>;
}

/** @description 이메일 이벤트 종류 */
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

/**
 * @description SMTP 제공자 포트
 */
export interface SMTPEmailProvider extends EmailProvider {
  /** @description 고정 'smtp' */
  name: 'smtp';
  /** @description SMTP 설정 주입 */
  configure(config: SMTPConfig): void;
  /** @description 커넥션 풀 상태 */
  getConnectionPoolStats(): Promise<ConnectionPoolStats>;
}

/**
 * @description SMTP 설정
 */
export interface SMTPConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: { user: string; pass: string };
  pool?: boolean;
  maxConnections?: number;
  maxMessages?: number;
  rateDelta?: number;
  rateLimit?: number;
}

/**
 * @description 연결 풀 통계
 */
export interface ConnectionPoolStats {
  total: number;
  idle: number;
  active: number;
}

/**
 * @description SendGrid 제공자 포트
 */
export interface SendGridEmailProvider extends EmailProvider {
  /** @description 고정 'sendgrid' */
  name: 'sendgrid';

  /** @description 템플릿 목록 */
  getTemplates(): Promise<SendGridTemplate[]>;
  /** @description 템플릿 생성 */
  createTemplate(template: CreateTemplateRequest): Promise<SendGridTemplate>;
  /** @description 템플릿 수정 */
  updateTemplate(templateId: string, updates: UpdateTemplateRequest): Promise<SendGridTemplate>;
  /** @description 템플릿 삭제 */
  deleteTemplate(templateId: string): Promise<void>;

  /** @description 기간별 상세 통계 */
  getDetailedStats(startDate: string, endDate: string): Promise<SendGridStats>;
}

/**
 * @description SendGrid 템플릿
 */
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

/** @description 템플릿 생성 요청 */
export interface CreateTemplateRequest {
  name: string;
  generation: 'legacy' | 'dynamic';
}

/** @description 템플릿 업데이트 요청 */
export interface UpdateTemplateRequest {
  name?: string;
}

/**
 * @description SendGrid 통계 응답
 */
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

/**
 * @description 이메일 제공자 팩토리 포트
 */
export interface EmailProviderFactory {
  createSMTPProvider(config: SMTPConfig): SMTPEmailProvider;
  createSendGridProvider(apiKey: string): SendGridEmailProvider;
  /** @description 환경변수 기반 기본 제공자 생성 */
  createFromEnvironment(): EmailProvider;
  /** @description 장애 시 순차 페일오버 */
  createFailoverProvider(providers: EmailProvider[]): EmailProvider;
  /** @description 라운드로빈 로드밸런싱 */
  createLoadBalancingProvider(providers: EmailProvider[]): EmailProvider;
}
