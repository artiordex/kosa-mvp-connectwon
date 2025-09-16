/**
 * Description : sessions.ts - 📌 세션/참여자/AI 스키마
 * Author : Shiwoo Min
 * Date : 2025-09-16
 */
import { z } from 'zod';

// 세션 상태 정의
export const SessionStatus = z.enum(['SCHEDULED', 'CONFIRMED', 'CANCELLED', 'COMPLETED']);

// 참가자 역할 정의
export const ParticipantRole = z.enum(['HOST', 'ATTENDEE']);

// 참가자 상태 정의
export const ParticipantStatus = z.enum(['APPLIED', 'CONFIRMED', 'CANCELLED', 'NO_SHOW']);

// 예약 상태 정의
export const ReservationStatus = z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']);

// 룸 상태 정의
export const RoomStatus = z.enum(['ACTIVE', 'INACTIVE', 'MAINTENANCE']);

// AI 제공자 정의
export const AIProvider = z.enum(['OPENAI', 'ANTHROPIC', 'GOOGLE', 'HUGGINGFACE']);

// AI 상호작용 종류 정의
export const AIInteractionKind = z.enum(['CHAT', 'EMBED', 'COMPLETION', 'SUMMARY']);

// AI 상호작용 상태 정의
export const AIInteractionStatus = z.enum(['OK', 'ERROR']);

// 타입 추출
export type SessionStatus = z.infer<typeof SessionStatus>;
export type ParticipantRole = z.infer<typeof ParticipantRole>;
export type ParticipantStatus = z.infer<typeof ParticipantStatus>;
export type ReservationStatus = z.infer<typeof ReservationStatus>;
export type RoomStatus = z.infer<typeof RoomStatus>;
export type AIProvider = z.infer<typeof AIProvider>;
export type AIInteractionKind = z.infer<typeof AIInteractionKind>;
export type AIInteractionStatus = z.infer<typeof AIInteractionStatus>;

// 세션 스키마
export const SessionSchema = z.object({
  id: z.string(),
  program_id: z.string(),
  starts_at: z.date(),
  ends_at: z.date(),
  capacity: z.number().int().min(1).nullable(),
  participant_fee: z.number().int().min(0).nullable(),
  status: SessionStatus.default('SCHEDULED'),
  room_reservation_id: z.string().nullable(), // 1:1 연결
  location_text: z.string().nullable(),
  created_at: z.date(),
  updated_at: z.date(),
});

// 프로그램 참가자 스키마
export const ProgramParticipantSchema = z.object({
  id: z.string(),
  session_id: z.string(),
  user_id: z.string(),
  role: ParticipantRole.default('ATTENDEE'),
  status: ParticipantStatus.default('APPLIED'),
  joined_at: z.date(),
});

// 룸 예약 스키마
export const RoomReservationSchema = z.object({
  id: z.string(),
  room_id: z.string(),
  user_id: z.string().nullable(),
  starts_at: z.date(),
  ends_at: z.date(),
  purpose: z.string().nullable(),
  status: ReservationStatus.default('PENDING'),
  meta: z.record(z.unknown()).nullable(),
  session_id: z.string().nullable(), // 1:1 연결
  created_at: z.date(),
  updated_at: z.date(),
});

// AI 상호작용 스키마
export const AIInteractionSchema = z.object({
  id: z.string(),
  user_id: z.string().nullable(),
  program_id: z.string().nullable(),
  session_id: z.string().nullable(),
  provider: AIProvider,
  model: z.string(),
  kind: AIInteractionKind,
  prompt_tokens: z.number().int().min(0).default(0),
  completion_tokens: z.number().int().min(0).default(0),
  cost: z.number().min(0).default(0),
  status: AIInteractionStatus.default('OK'),
  trace_id: z.string().nullable(),
  meta: z.record(z.unknown()).nullable(),
  created_at: z.date(),
});

// 세션 생성 스키마
export const CreateSessionSchema = z.object({
  program_id: z.string(),
  starts_at: z.string().datetime(),
  ends_at: z.string().datetime(),
  capacity: z.number().int().min(1).optional(),
  participant_fee: z.number().int().min(0).optional(),
  status: SessionStatus.optional(),
  room_reservation_id: z.string().optional(),
  location_text: z.string().optional(),
});

// 세션 수정 스키마
export const UpdateSessionSchema = z.object({
  starts_at: z.string().datetime().optional(),
  ends_at: z.string().datetime().optional(),
  capacity: z.number().int().min(1).optional(),
  participant_fee: z.number().int().min(0).optional(),
  status: SessionStatus.optional(),
  room_reservation_id: z.string().optional(),
  location_text: z.string().optional(),
});

// 참가자 생성 스키마
export const CreateParticipantSchema = z.object({
  session_id: z.string(),
  user_id: z.string(),
  role: ParticipantRole.optional(),
  status: ParticipantStatus.optional(),
});

// 참가자 수정 스키마
export const UpdateParticipantSchema = z.object({
  role: ParticipantRole.optional(),
  status: ParticipantStatus.optional(),
});

// 룸 예약 생성 스키마
export const CreateRoomReservationSchema = z.object({
  room_id: z.string(),
  user_id: z.string().optional(),
  starts_at: z.string().datetime(),
  ends_at: z.string().datetime(),
  purpose: z.string().optional(),
  status: ReservationStatus.optional(),
  meta: z.record(z.unknown()).optional(),
  session_id: z.string().optional(),
});

// 룸 예약 수정 스키마
export const UpdateRoomReservationSchema = z.object({
  starts_at: z.string().datetime().optional(),
  ends_at: z.string().datetime().optional(),
  purpose: z.string().optional(),
  status: ReservationStatus.optional(),
  meta: z.record(z.unknown()).optional(),
});

// AI 상호작용 생성 스키마
export const CreateAIInteractionSchema = z.object({
  user_id: z.string().optional(),
  program_id: z.string().optional(),
  session_id: z.string().optional(),
  provider: AIProvider,
  model: z.string(),
  kind: AIInteractionKind,
  prompt_tokens: z.number().int().min(0).optional(),
  completion_tokens: z.number().int().min(0).optional(),
  cost: z.number().min(0).optional(),
  status: AIInteractionStatus.optional(),
  trace_id: z.string().optional(),
  meta: z.record(z.unknown()).optional(),
});

// 세션 쿼리 스키마
export const SessionQuerySchema = z.object({
  program_id: z.string().optional(),
  status: SessionStatus.optional(),
  starts_after: z.string().datetime().optional(),
  starts_before: z.string().datetime().optional(),
  room_reservation_id: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

// 참가자 쿼리 스키마
export const ParticipantQuerySchema = z.object({
  session_id: z.string().optional(),
  user_id: z.string().optional(),
  role: ParticipantRole.optional(),
  status: ParticipantStatus.optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

// 룸 예약 쿼리 스키마
export const RoomReservationQuerySchema = z.object({
  room_id: z.string().optional(),
  user_id: z.string().optional(),
  status: ReservationStatus.optional(),
  starts_after: z.string().datetime().optional(),
  starts_before: z.string().datetime().optional(),
  session_id: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

// AI 상호작용 쿼리 스키마
export const AIInteractionQuerySchema = z.object({
  user_id: z.string().optional(),
  program_id: z.string().optional(),
  session_id: z.string().optional(),
  provider: AIProvider.optional(),
  kind: AIInteractionKind.optional(),
  status: AIInteractionStatus.optional(),
  created_after: z.string().datetime().optional(),
  created_before: z.string().datetime().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

// 페이지네이션 스키마
export const PaginationSchema = z.object({
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
  pages: z.number().int().min(0),
});

// 세션 목록 응답 스키마
export const SessionListResponseSchema = z.object({
  sessions: z.array(SessionSchema),
  pagination: PaginationSchema,
});

// 참가자 목록 응답 스키마
export const ParticipantListResponseSchema = z.object({
  participants: z.array(ProgramParticipantSchema),
  pagination: PaginationSchema,
});

// 룸 예약 목록 응답 스키마
export const RoomReservationListResponseSchema = z.object({
  reservations: z.array(RoomReservationSchema),
  pagination: PaginationSchema,
});

// AI 상호작용 목록 응답 스키마
export const AIInteractionListResponseSchema = z.object({
  interactions: z.array(AIInteractionSchema),
  pagination: PaginationSchema,
});

// 참여자 세션 상세 응답 스키마
export const SessionWithParticipantsSchema = SessionSchema.extend({
  participants: z.array(ProgramParticipantSchema),
  current_participants: z.number().int().min(0),
  available_slots: z.number().int().min(0),
  program: z.object({
    id: z.string(),
    title: z.string(),
    type: z.string().nullable(),
  }),
  room_reservation: RoomReservationSchema.nullable(),
});

// 참가자 상세 응답 스키마
export const ParticipantWithDetailsSchema = ProgramParticipantSchema.extend({
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
  }),
  session: SessionSchema,
});

// 룸 예약 상세 응답 스키마
export const RoomReservationWithDetailsSchema = RoomReservationSchema.extend({
  room: z.object({
    id: z.string(),
    venue_id: z.string(),
    name: z.string(),
    capacity: z.number().nullable(),
  }),
  user: z
    .object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
    })
    .nullable(),
  session: SessionSchema.nullable(),
});

// 세션 통계 스키마
export const SessionStatsSchema = z.object({
  session_id: z.string(),
  total_participants: z.number().int().min(0),
  confirmed_participants: z.number().int().min(0),
  no_show_count: z.number().int().min(0),
  attendance_rate: z.number().min(0).max(100),
  revenue: z.number().min(0),
});

// AI 사용 통계 스키마
export const AIUsageStatsSchema = z.object({
  period: z.string(), // YYYY-MM
  total_interactions: z.number().int().min(0),
  total_prompt_tokens: z.number().int().min(0),
  total_completion_tokens: z.number().int().min(0),
  total_cost: z.number().min(0),
  provider_breakdown: z.record(
    AIProvider,
    z.object({
      interactions: z.number().int().min(0),
      cost: z.number().min(0),
    }),
  ),
  kind_breakdown: z.record(
    AIInteractionKind,
    z.object({
      interactions: z.number().int().min(0),
      tokens: z.number().int().min(0),
    }),
  ),
});

// 타입 추출
export type Session = z.infer<typeof SessionSchema>;
export type ProgramParticipant = z.infer<typeof ProgramParticipantSchema>;
export type RoomReservation = z.infer<typeof RoomReservationSchema>;
export type AIInteraction = z.infer<typeof AIInteractionSchema>;
export type CreateSession = z.infer<typeof CreateSessionSchema>;
export type UpdateSession = z.infer<typeof UpdateSessionSchema>;
export type CreateParticipant = z.infer<typeof CreateParticipantSchema>;
export type UpdateParticipant = z.infer<typeof UpdateParticipantSchema>;
export type CreateRoomReservation = z.infer<typeof CreateRoomReservationSchema>;
export type UpdateRoomReservation = z.infer<typeof UpdateRoomReservationSchema>;
export type CreateAIInteraction = z.infer<typeof CreateAIInteractionSchema>;
export type SessionQuery = z.infer<typeof SessionQuerySchema>;
export type ParticipantQuery = z.infer<typeof ParticipantQuerySchema>;
export type RoomReservationQuery = z.infer<typeof RoomReservationQuerySchema>;
export type AIInteractionQuery = z.infer<typeof AIInteractionQuerySchema>;
export type SessionListResponse = z.infer<typeof SessionListResponseSchema>;
export type ParticipantListResponse = z.infer<typeof ParticipantListResponseSchema>;
export type RoomReservationListResponse = z.infer<typeof RoomReservationListResponseSchema>;
export type AIInteractionListResponse = z.infer<typeof AIInteractionListResponseSchema>;
export type SessionWithParticipants = z.infer<typeof SessionWithParticipantsSchema>;
export type ParticipantWithDetails = z.infer<typeof ParticipantWithDetailsSchema>;
export type RoomReservationWithDetails = z.infer<typeof RoomReservationWithDetailsSchema>;
export type SessionStats = z.infer<typeof SessionStatsSchema>;
export type AIUsageStats = z.infer<typeof AIUsageStatsSchema>;
export type Pagination = z.infer<typeof PaginationSchema>;

// 세션 유효 상태 체크
export function isSessionAvailable(session: Session): boolean {
  return session.status === 'SCHEDULED' || session.status === 'CONFIRMED';
}

// 세션이 가득 찼는지 체크
export function isSessionFull(session: SessionWithParticipants): boolean {
  return session.capacity !== null && session.current_participants >= session.capacity;
}

// 사용자가 세션에 참여할 수 있는지 체크
export function canJoinSession(session: SessionWithParticipants): boolean {
  return isSessionAvailable(session) && !isSessionFull(session);
}

// 참가자가 확정 상태인지 체크
export function isParticipantConfirmed(participant: ProgramParticipant): boolean {
  return participant.status === 'CONFIRMED';
}

// 참가자가 호스트인지 체크
export function isSessionHost(participant: ProgramParticipant): boolean {
  return participant.role === 'HOST';
}

// 세션 기간 계산
export function getSessionDurationMinutes(session: Session): number {
  const start = new Date(session.starts_at);
  const end = new Date(session.ends_at);
  return (end.getTime() - start.getTime()) / (1000 * 60);
}

// 세션의 남은 참여 가능 슬롯 계산
export function getAvailableSlots(session: SessionWithParticipants): number {
  if (!session.capacity) return Infinity;
  return Math.max(0, session.capacity - session.current_participants);
}

// 세션 수익 계산
export function calculateSessionRevenue(session: SessionWithParticipants): number {
  const confirmedCount = session.participants.filter(p => p.status === 'CONFIRMED').length;
  return (session.participant_fee || 0) * confirmedCount;
}

// 세션 취소 가능 여부
export function canCancelSession(session: Session): boolean {
  const now = new Date();
  const sessionStart = new Date(session.starts_at);
  const hoursUntilStart = (sessionStart.getTime() - now.getTime()) / (1000 * 60 * 60);
  return (
    (session.status === 'SCHEDULED' || session.status === 'CONFIRMED') && hoursUntilStart >= 24
  );
}

// 예약 겹침 여부 체크
export function isReservationOverlapping(
  reservation1: { starts_at: Date; ends_at: Date },
  reservation2: { starts_at: Date; ends_at: Date },
): boolean {
  return (
    reservation1.starts_at < reservation2.ends_at && reservation2.starts_at < reservation1.ends_at
  );
}

// 예약 상태 메시지
export function getReservationStatusMessage(status: ReservationStatus): string {
  const messages = {
    PENDING: '승인 대기',
    CONFIRMED: '확정됨',
    CANCELLED: '취소됨',
    COMPLETED: '완료됨',
  };
  return messages[status];
}

// 참가자 상태 메시지
export function getParticipantStatusMessage(status: ParticipantStatus): string {
  const messages = {
    APPLIED: '신청함',
    CONFIRMED: '확정됨',
    CANCELLED: '취소함',
    NO_SHOW: '불참',
  };
  return messages[status];
}

// AI 제공자 표시 이름
export function getAIProviderDisplayName(provider: AIProvider): string {
  const names = {
    OPENAI: 'OpenAI',
    ANTHROPIC: 'Anthropic',
    GOOGLE: 'Google AI',
    HUGGINGFACE: 'Hugging Face',
  };
  return names[provider];
}

// 토큰 수 포맷팅
export function formatTokenCount(tokens: number): string {
  if (tokens < 1000) return `${tokens}`;
  if (tokens < 1000000) return `${(tokens / 1000).toFixed(1)}K`;
  return `${(tokens / 1000000).toFixed(1)}M`;
}

// 세션 생성 데이터 검증
export function validateCreateSession(data: unknown) {
  return CreateSessionSchema.safeParse(data);
}

// 참가자 생성 데이터 검증
export function validateCreateParticipant(data: unknown) {
  return CreateParticipantSchema.safeParse(data);
}

// 룸 예약 생성 데이터 검증
export function validateCreateRoomReservation(data: unknown) {
  return CreateRoomReservationSchema.safeParse(data);
}

// 세션 쿼리 파라미터 검증
export function validateSessionQuery(data: unknown) {
  return SessionQuerySchema.safeParse(data);
}

// 타임 슬롯 유효성 검사
export function isValidTimeSlot(startsAt: Date, endsAt: Date): boolean {
  return endsAt > startsAt;
}

// 영업 시간 내 예약 가능 여부
export function isBusinessHours(datetime: Date): boolean {
  const hour = datetime.getHours();
  const day = datetime.getDay();
  return day >= 1 && day <= 5 && hour >= 9 && hour <= 18;
}

// 시간 슬롯 포맷팅
export function formatTimeSlot(startsAt: Date, endsAt: Date): string {
  const start = startsAt.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  const end = endsAt.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  return `${start} - ${end}`;
}

// 기본 세션 설정
export const DEFAULT_SESSION_SETTINGS = {
  status: 'SCHEDULED' as SessionStatus,
  capacity: 30,
  participant_fee: 0,
};

// 기본 예약 설정
export const DEFAULT_RESERVATION_SETTINGS = {
  status: 'PENDING' as ReservationStatus,
};

// AI 토큰 및 비용 제한
export const AI_TOKEN_LIMITS = {
  MAX_PROMPT_TOKENS: 50000,
  MAX_COMPLETION_TOKENS: 10000,
  DAILY_COST_LIMIT: 100, // $100
} as const;
