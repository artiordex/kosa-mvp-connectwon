/**
 * Description : core-types.ts - 📌 핵심 기능에서 공유하는 타입 정의
 * Author: Shiwoo Min
 * Date : 2025-09-10
 * 09-17 : core 패키지의 domain/authz 참조 추가, Repository 임포트 에러 해결
 */

/**
 * @description 식별자 공통 타입
 */
export type Id = string;

/**
 * @description ISO 8601 날짜-시간 문자열 (예: 'YYYY-MM-DDTHH:mm:ss.sssZ')
 */
export type ISODateTime = string;

/**
 * @description ISO 8601 날짜 문자열 (예: 'YYYY-MM-DD')
 */
export type ISODateOnly = string;

/**
 * @description 임의의 JSON 객체
 */
export type JsonObject = Record<string, unknown>;

/**
 * @description 시스템 역할 플래그 (비즈니스 권한과 분리)
 */
export type Role = 'ADMIN' | 'CREATOR' | 'USER';

/**
 * @description 도메인별 식별자 별칭
 */
export type UserId = Id;
export type ProgramId = Id;
export type SessionId = Id;
export type RoomId = Id;
export type VenueId = Id;
export type ParticipantId = Id;
export type ReservationId = Id;
export type PaymentId = Id;
export type AIInteractionId = Id;

/**
 * @description 페이지네이션 결과 포맷 (페이지 기반)
 */
export interface Page<T> {
  /** @description 결과 항목들 */
  items: T[];
  /** @description 전체 개수 */
  total: number;
  /** @description 현재 페이지(1-base) */
  page: number; // 1-base
  /** @description 페이지 크기 */
  pageSize: number;
}

/**
 * @description 커서 기반 페이지네이션 쿼리
 */
export interface CursorPaginationQuery {
  cursor?: string | null;
  limit?: number;
}

/**
 * @description 커서 기반 페이지네이션 응답
 */
export interface CursorPaginatedResponse<T> {
  items: T[];
  nextCursor: string | null;
  total?: number;
}

/**
 * @description 사용자 엔터티
 */
export interface User {
  id: Id;
  email: string;
  name: string;
  googleSub?: string;
  /** @description 역할 플래그(bitmask) */
  roleFlags: number;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
  lastLoginAt?: ISODateTime;
}

/**
 * @description 사용자 생성 입력
 */
export interface CreateUser {
  email: string;
  name: string;
  googleSub?: string;
  roleFlags?: number;
}

/**
 * @description 사용자 수정 입력
 */
export interface UpdateUser {
  email?: string;
  name?: string;
  googleSub?: string;
  roleFlags?: number;
  lastLoginAt?: ISODateTime;
}

/**
 * @description 시설(베뉴) 엔터티
 */
export interface Venue {
  id: Id;
  name: string;
  address?: string;
  location?: string;
  /** @description IANA 타임존 (예: "Asia/Seoul") */
  timezone: string;
  openingHours?: Array<{ dayOfWeek: number; opensAt: string; closesAt: string }>;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

/**
 * @description 시설 생성 입력
 */
export interface CreateVenue {
  name: string;
  address?: string;
  location?: string;
  timezone: string;
  openingHours?: Array<{ dayOfWeek: number; opensAt: string; closesAt: string }>;
}

/**
 * @description 시설 수정 입력
 */
export interface UpdateVenue {
  name?: string;
  address?: string;
  location?: string;
  timezone?: string;
  openingHours?: Array<{ dayOfWeek: number; opensAt: string; closesAt: string }>;
}

/**
 * @description 프로그램(수업/강좌 등) 엔터티
 */
export interface Program {
  id: ProgramId;
  title: string;
  description?: string;
  type: string;
  isActive: boolean;
  createdByUserId: UserId;
  aiSummary?: string;
  aiSummaryTags?: string[];
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

/**
 * @description 프로그램 생성 입력
 */
export interface CreateProgram {
  title: string;
  description?: string;
  type: string;
  isActive?: boolean;
  createdByUserId: UserId;
}

/**
 * @description 프로그램 수정 입력
 */
export interface UpdateProgram {
  title?: string;
  description?: string;
  type?: string;
  isActive?: boolean;
  aiSummary?: string;
  aiSummaryTags?: string[];
}

/**
 * @description 작성자 정보를 포함한 프로그램
 */
export interface ProgramWithCreator extends Program {
  creator: User;
}

/**
 * @description 세션(개별 일정) 상태
 */
export type SessionStatus = 'DRAFT' | 'SCHEDULED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';

/**
 * @description DB/비즈니스 레이어 엔티티 세션
 */
export interface Session {
  id: SessionId;
  programId: ProgramId;
  title: string;
  description?: string;
  status: SessionStatus;
  startsAt: ISODateTime;
  endsAt: ISODateTime;
  locationText?: string;
  roomId?: RoomId;
  maxParticipants?: number;
  currentParticipants: number;
  cost?: number;
  currency?: string;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

/**
 * @description 세션 생성 입력
 */
export interface CreateSession {
  programId: ProgramId;
  title: string;
  description?: string;
  startsAt: ISODateTime;
  endsAt: ISODateTime;
  locationText?: string;
  roomId?: RoomId;
  maxParticipants?: number;
  cost?: number;
  currency?: string;
}

/**
 * @description 세션 수정 입력
 */
export interface UpdateSession {
  title?: string;
  description?: string;
  status?: SessionStatus;
  startsAt?: ISODateTime;
  endsAt?: ISODateTime;
  locationText?: string;
  roomId?: RoomId;
  maxParticipants?: number;
  cost?: number;
  currency?: string;
}

/**
 * @description 프로그램을 포함한 세션
 */
export interface SessionWithProgram extends Session {
  program: Program;
}

/**
 * @description 참가자 목록을 포함한 세션
 */
export interface SessionWithParticipants extends Session {
  participants: ProgramParticipant[];
}

/**
 * @description 프로그램/시설 정보를 포함한 세션
 */
export interface SessionWithProgramAndVenue extends Session {
  program: Program;
  venue?: Venue;
  room?: Room;
}

/**
 * @description 스케줄링된 세션
 */
export interface ScheduledSession {
  id: SessionId;
  programId: ProgramId;
  date: ISODateOnly;
  capacity: number;
  participants: UserId[];
  waitlist: UserId[];
}

/**
 * @description 방(공간) 상태
 */
export type RoomStatus = 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE' | 'CLOSED';

/**
 * @description 방(공간) 엔터티
 */
export interface Room {
  id: RoomId;
  venueId: VenueId;
  name: string;
  description?: string;
  capacity: number;
  status: RoomStatus;
  equipment?: string[];
  hourlyRate?: number;
  currency?: string;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

/**
 * @description 방 생성 입력
 */
export interface CreateRoom {
  venueId: VenueId;
  name: string;
  description?: string;
  capacity: number;
  status?: RoomStatus;
  equipment?: string[];
  hourlyRate?: number;
  currency?: string;
}

/**
 * @description 방 수정 입력
 */
export interface UpdateRoom {
  name?: string;
  description?: string;
  capacity?: number;
  status?: RoomStatus;
  equipment?: string[];
  hourlyRate?: number;
  currency?: string;
}

/**
 * @description 시설 정보를 포함한 방
 */
export interface RoomWithVenue extends Room {
  venue: Venue;
}

/**
 * @description 예약 상태
 */
export type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

/**
 * @description 방 예약 엔터티
 */
export interface RoomReservation {
  id: ReservationId;
  roomId: RoomId;
  userId: UserId;
  sessionId?: SessionId;
  purpose: string;
  status: ReservationStatus;
  startsAt: ISODateTime;
  endsAt: ISODateTime;
  totalCost?: number;
  currency?: string;
  notes?: string;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

/**
 * @description 예약 생성 입력
 */
export interface CreateReservation {
  roomId: RoomId;
  sessionId?: SessionId;
  purpose: string;
  startsAt: ISODateTime;
  endsAt: ISODateTime;
  notes?: string;
}

/**
 * @description 예약 수정 입력
 */
export interface UpdateReservation {
  purpose?: string;
  status?: ReservationStatus;
  startsAt?: ISODateTime;
  endsAt?: ISODateTime;
  notes?: string;
}

/**
 * @description 세션 참가자 역할
 */
export type ParticipantRole = 'INSTRUCTOR' | 'PARTICIPANT' | 'OBSERVER' | 'ASSISTANT';

/**
 * @description 세션 참가자 상태
 */
export type ParticipantStatus = 'REGISTERED' | 'CONFIRMED' | 'ATTENDED' | 'NO_SHOW' | 'CANCELLED';

/**
 * @description 세션 참가자 엔터티
 */
export interface ProgramParticipant {
  id: ParticipantId;
  sessionId: SessionId;
  userId: UserId;
  role: ParticipantRole;
  status: ParticipantStatus;
  registeredAt: ISODateTime;
  confirmedAt?: ISODateTime;
  attendedAt?: ISODateTime;
  notes?: string;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

/**
 * @description 참가자 생성 입력
 */
export interface CreateParticipant {
  sessionId: SessionId;
  userId: UserId;
  role: ParticipantRole;
  notes?: string;
}

/**
 * @description 참가자 수정 입력
 */
export interface UpdateParticipant {
  role?: ParticipantRole;
  status?: ParticipantStatus;
  confirmedAt?: ISODateTime;
  attendedAt?: ISODateTime;
  notes?: string;
}

/**
 * @description 결제 상태
 */
export type PaymentStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'REFUNDED' | 'CANCELLED';

/**
 * @description 결제 수단
 */
export type PaymentMethod = 'CREDIT_CARD' | 'BANK_TRANSFER' | 'CASH' | 'DIGITAL_WALLET' | 'OTHER';

/**
 * @description 결제 엔터티
 */
export interface Payment {
  id: PaymentId;
  sessionId: SessionId;
  userId: UserId;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: PaymentMethod;
  transactionId?: string;
  description?: string;
  processedAt?: ISODateTime;
  refundedAt?: ISODateTime;
  metadata?: JsonObject;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

/**
 * @description 결제 생성 입력
 */
export interface CreatePayment {
  sessionId: SessionId;
  userId: UserId;
  amount: number;
  currency: string;
  method: PaymentMethod;
  description?: string;
  metadata?: JsonObject;
}

/**
 * @description 결제 수정 입력
 */
export interface UpdatePayment {
  status?: PaymentStatus;
  transactionId?: string;
  processedAt?: ISODateTime;
  refundedAt?: ISODateTime;
  metadata?: JsonObject;
}

/**
 * @description AI 상호작용 유형
 */
export type AIInteractionKind = 'SUMMARIZE' | 'CLASSIFY' | 'EMBEDDINGS' | 'TAGS' | 'CHAT' | 'COMPLETION';

/**
 * @description AI 상호작용 처리 상태
 */
export type AIInteractionStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';

/**
 * @description AI 상호작용 엔터티
 */
export interface AIInteraction {
  id: AIInteractionId;
  userId?: UserId;
  provider: AIProvider;
  model: string;
  kind: AIInteractionKind;
  status: AIInteractionStatus;
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
  costUSD?: number;
  durationMs?: number;
  errorMessage?: string;
  metadata?: JsonObject;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

/**
 * @description AI 상호작용 생성 입력
 */
export interface CreateAIInteraction {
  provider: AIProvider;
  model: string;
  kind: AIInteractionKind;
  metadata?: JsonObject;
}

/**
 * @description AI 상호작용 수정 입력
 */
export interface UpdateAIInteraction {
  status?: AIInteractionStatus;
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
  costUSD?: number;
  durationMs?: number;
  errorMessage?: string;
  metadata?: JsonObject;
}

/**
 * @description 지원하는 AI 제공자
 */
export type AIProvider = 'openai' | 'anthropic' | 'huggingface';

/**
 * @description AI 메시지 역할
 */
export type AIRole = 'system' | 'user' | 'assistant';

/**
 * @description AI 채팅 파라미터
 */
export interface AIChatParams {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
}

/**
 * @description 토큰/비용 사용량
 */
export interface AIUsage {
  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
  costUSD?: number;
}

/**
 * @description 응답 종료 이유
 */
export type FinishReason = 'stop' | 'length' | 'content_filter' | 'tool_calls' | string | undefined;

/**
 * @description 알림 채널 종류 (최소한 유지)
 */
export type NotificationChannel = 'email' | 'slack' | 'sms' | 'push';

/**
 * @description n8n 웹훅 페이로드
 */
export interface N8nWebhookPayload {
  event_type: string;
  entity_type: 'session' | 'program' | 'user' | 'reservation';
  entity_id: string;
  data: Record<string, unknown>;
  timestamp: string;
}

/**
 * @description 잡(작업) 상태
 */
export type JobStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'delayed';

/**
 * @description 잡(작업) 우선순위
 */
export type JobPriority = 'low' | 'normal' | 'high' | 'critical';

/**
 * @description 재시도 백오프 설정
 */
export interface QueueBackoff {
  type: 'fixed' | 'exponential';
  delay: number;
}

/**
 * @description 기본 잡 옵션
 */
export interface QueueDefaultJobOptions {
  maxAttempts: number;
  backoff: QueueBackoff;
}

/**
 * @description 큐 동작 설정
 */
export interface QueueConfig {
  concurrency: number;
  defaultJobOptions: QueueDefaultJobOptions;
}

/**
 * @description 큐 통계
 */
export interface QueueStats {
  pending: number;
  processing: number;
  completed: number;
  failed: number;
  total: number;
  throughput: { per_minute: number; per_hour: number };
}

/**
 * @description 잡 처리 결과
 */
export type JobResult<T = unknown> = { success: true; data?: T } | { success: false; error: string };

/**
 * @description 잡(작업) 공통 포맷
 */
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

/**
 * @description 이메일 전송 잡 데이터
 */
export interface EmailJobData {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  templateId?: string;
  variables?: Record<string, unknown>;
}

/**
 * @description Slack 전송 잡 데이터
 */
export interface SlackJobData {
  channel: string;
  text: string;
  blocks?: unknown[];
  mentions?: string[];
}

/**
 * @description 세션 리마인더 잡 데이터
 */
export interface SessionReminderJobData {
  sessionId: string;
  userIds?: string[];
  reminderType: '24h_before' | '1h_before' | 'start' | 'follow_up';
}

/**
 * @description AI 처리 잡 데이터
 */
export interface AIProcessingJobData {
  task: 'summarize' | 'classify' | 'embeddings' | 'tags';
  entityType: 'session' | 'program' | 'user' | 'reservation' | 'payment';
  entityId: string;
  payload?: Record<string, unknown>;
}

/**
 * @description 정리(청소) 잡 데이터
 */
export interface CleanupJobData {
  target: 'sessions' | 'reservations' | 'logs' | 'emails' | 'slack';
  retentionDays: number;
  dryRun?: boolean;
}

/**
 * @description 리포트 생성/발송 잡 데이터
 */
export interface ReportJobData {
  reportType: 'daily' | 'weekly' | 'monthly';
  period?: { from: string; to: string };
  recipients: { emails?: string[]; slackChannels?: string[] };
}

/**
 * @description 이메일 잡
 */
export type EmailJob = Job<EmailJobData>;
/**
 * @description Slack 잡
 */
export type SlackJob = Job<SlackJobData>;
/**
 * @description 세션 리마인더 잡
 */
export type SessionReminderJob = Job<SessionReminderJobData>;
/**
 * @description AI 처리 잡
 */
export type AIProcessingJob = Job<AIProcessingJobData>;
/**
 * @description 정리 잡
 */
export type CleanupJob = Job<CleanupJobData>;
/**
 * @description 리포트 잡
 */
export type ReportJob = Job<ReportJobData>;

/**
 * @description 잡 처리기 인터페이스
 */
export interface JobProcessor<T extends Job = Job> {
  process(job: T): Promise<JobResult>;
}

/**
 * @description 레거시 호환: 임의 데이터 잡(얇은 별칭)
 */
export type BaseJob = Job<Record<string, unknown>>;

/**
 * @description 초과 예약 모드 타입
 */
export type OverbookingMode = 'disallow' | 'percent' | 'fixed';

/**
 * @description 대기열 정책 옵션 인터페이스
 */
export interface WaitlistPolicyOptions {
  /** @description 대기열 최대 인원(기본 10명) */
  maxWaitlist?: number;
  /** @description 중복 가입 허용 여부(기본 false) */
  allowDuplicates?: boolean;
}
