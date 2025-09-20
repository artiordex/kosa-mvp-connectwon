/**
 * Description : sessions.ts - 📌 세션/참여자/AI 스키마
 * Author : Shiwoo Min
 * Date : 2025-09-16
 */
import { z } from 'zod';

/**
 * @description 세션 상태 열거형
 */
export const SessionStatus = z.enum(['SCHEDULED', 'CONFIRMED', 'CANCELLED', 'COMPLETED']);

/**
 * @description 참가자 역할 열거형
 */
export const ParticipantRole = z.enum(['HOST', 'ATTENDEE']);

/**
 * @description 참가자 상태 열거형
 */
export const ParticipantStatus = z.enum(['APPLIED', 'CONFIRMED', 'CANCELLED', 'NO_SHOW']);

/**
 * @description 예약 상태 열거형
 */
export const ReservationStatus = z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']);

/**
 * @description 룸 상태 열거형
 */
export const RoomStatus = z.enum(['ACTIVE', 'INACTIVE', 'MAINTENANCE']);

/**
 * @description AI 제공자 열거형
 */
export const AIProvider = z.enum(['OPENAI', 'ANTHROPIC', 'GOOGLE', 'HUGGINGFACE']);

/**
 * @description AI 상호작용 종류 열거형
 */
export const AIInteractionKind = z.enum(['CHAT', 'EMBED', 'COMPLETION', 'SUMMARY']);

/**
 * @description AI 상호작용 상태 열거형
 */
export const AIInteractionStatus = z.enum(['OK', 'ERROR']);

/**
 * @description 세션 상태 타입
 */
export type SessionStatus = z.infer<typeof SessionStatus>;

/**
 * @description 참가자 역할 타입
 */
export type ParticipantRole = z.infer<typeof ParticipantRole>;

/**
 * @description 참가자 상태 타입
 */
export type ParticipantStatus = z.infer<typeof ParticipantStatus>;

/**
 * @description 예약 상태 타입
 */
export type ReservationStatus = z.infer<typeof ReservationStatus>;

/**
 * @description 룸 상태 타입
 */
export type RoomStatus = z.infer<typeof RoomStatus>;

/**
 * @description AI 제공자 타입
 */
export type AIProvider = z.infer<typeof AIProvider>;

/**
 * @description AI 상호작용 종류 타입
 */
export type AIInteractionKind = z.infer<typeof AIInteractionKind>;

/**
 * @description AI 상호작용 상태 타입
 */
export type AIInteractionStatus = z.infer<typeof AIInteractionStatus>;

/**
 * @description 세션 기본 스키마
 */
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

/**
 * @description 프로그램 참가자 기본 스키마
 */
export const ProgramParticipantSchema = z.object({
  id: z.string(),
  session_id: z.string(),
  user_id: z.string(),
  role: ParticipantRole.default('ATTENDEE'),
  status: ParticipantStatus.default('APPLIED'),
  joined_at: z.date(),
});

/**
 * @description 룸 예약 기본 스키마
 */
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

/**
 * @description AI 상호작용 기본 스키마
 */
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

/**
 * @description 세션 생성 요청 스키마
 */
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

/**
 * @description 세션 수정 요청 스키마
 */
export const UpdateSessionSchema = z.object({
  starts_at: z.string().datetime().optional(),
  ends_at: z.string().datetime().optional(),
  capacity: z.number().int().min(1).optional(),
  participant_fee: z.number().int().min(0).optional(),
  status: SessionStatus.optional(),
  room_reservation_id: z.string().optional(),
  location_text: z.string().optional(),
});

/**
 * @description 참가자 생성 요청 스키마
 */
export const CreateParticipantSchema = z.object({
  session_id: z.string(),
  user_id: z.string(),
  role: ParticipantRole.optional(),
  status: ParticipantStatus.optional(),
});

/**
 * @description 참가자 수정 요청 스키마
 */
export const UpdateParticipantSchema = z.object({
  role: ParticipantRole.optional(),
  status: ParticipantStatus.optional(),
});

/**
 * @description 룸 예약 생성 요청 스키마
 */
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

/**
 * @description 룸 예약 수정 요청 스키마
 */
export const UpdateRoomReservationSchema = z.object({
  starts_at: z.string().datetime().optional(),
  ends_at: z.string().datetime().optional(),
  purpose: z.string().optional(),
  status: ReservationStatus.optional(),
  meta: z.record(z.unknown()).optional(),
});

/**
 * @description AI 상호작용 생성 요청 스키마
 */
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

/**
 * @description 세션 목록 조회 쿼리 스키마
 */
export const SessionQuerySchema = z.object({
  program_id: z.string().optional(),
  status: SessionStatus.optional(),
  starts_after: z.string().datetime().optional(),
  starts_before: z.string().datetime().optional(),
  room_reservation_id: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

/**
 * @description 참가자 목록 조회 쿼리 스키마
 */
export const ParticipantQuerySchema = z.object({
  session_id: z.string().optional(),
  user_id: z.string().optional(),
  role: ParticipantRole.optional(),
  status: ParticipantStatus.optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

/**
 * @description 룸 예약 목록 조회 쿼리 스키마
 */
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

/**
 * @description AI 상호작용 목록 조회 쿼리 스키마
 */
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

/**
 * @description 페이지네이션 스키마
 */
export const PaginationSchema = z.object({
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
  pages: z.number().int().min(0),
});

/**
 * @description 세션 목록 응답 스키마
 */
export const SessionListResponseSchema = z.object({
  sessions: z.array(SessionSchema),
  pagination: PaginationSchema,
});

/**
 * @description 참가자 목록 응답 스키마
 */
export const ParticipantListResponseSchema = z.object({
  participants: z.array(ProgramParticipantSchema),
  pagination: PaginationSchema,
});

/**
 * @description 룸 예약 목록 응답 스키마
 */
export const RoomReservationListResponseSchema = z.object({
  reservations: z.array(RoomReservationSchema),
  pagination: PaginationSchema,
});

/**
 * @description AI 상호작용 목록 응답 스키마
 */
export const AIInteractionListResponseSchema = z.object({
  interactions: z.array(AIInteractionSchema),
  pagination: PaginationSchema,
});

/**
 * @description 참여자 포함 세션 스키마
 */
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

/**
 * @description 상세 정보 포함 참가자 스키마
 */
export const ParticipantWithDetailsSchema = ProgramParticipantSchema.extend({
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
  }),
  session: SessionSchema,
});

/**
 * @description 상세 정보 포함 룸 예약 스키마
 */
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

/**
 * @description 세션 통계 스키마
 */
export const SessionStatsSchema = z.object({
  session_id: z.string(),
  total_participants: z.number().int().min(0),
  confirmed_participants: z.number().int().min(0),
  no_show_count: z.number().int().min(0),
  attendance_rate: z.number().min(0).max(100),
  revenue: z.number().min(0),
});

/**
 * @description AI 사용 통계 스키마
 */
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

/**
 * @description 세션 기본 타입
 */
export type Session = z.infer<typeof SessionSchema>;

/**
 * @description 프로그램 참가자 기본 타입
 */
export type ProgramParticipant = z.infer<typeof ProgramParticipantSchema>;

/**
 * @description 룸 예약 기본 타입
 */
export type RoomReservation = z.infer<typeof RoomReservationSchema>;

/**
 * @description AI 상호작용 기본 타입
 */
export type AIInteraction = z.infer<typeof AIInteractionSchema>;

/**
 * @description 세션 생성 요청 타입
 */
export type CreateSession = z.infer<typeof CreateSessionSchema>;

/**
 * @description 세션 수정 요청 타입
 */
export type UpdateSession = z.infer<typeof UpdateSessionSchema>;

/**
 * @description 참가자 생성 요청 타입
 */
export type CreateParticipant = z.infer<typeof CreateParticipantSchema>;

/**
 * @description 참가자 수정 요청 타입
 */
export type UpdateParticipant = z.infer<typeof UpdateParticipantSchema>;

/**
 * @description 룸 예약 생성 요청 타입
 */
export type CreateRoomReservation = z.infer<typeof CreateRoomReservationSchema>;

/**
 * @description 룸 예약 수정 요청 타입
 */
export type UpdateRoomReservation = z.infer<typeof UpdateRoomReservationSchema>;

/**
 * @description AI 상호작용 생성 요청 타입
 */
export type CreateAIInteraction = z.infer<typeof CreateAIInteractionSchema>;

/**
 * @description 세션 목록 조회 쿼리 타입
 */
export type SessionQuery = z.infer<typeof SessionQuerySchema>;

/**
 * @description 참가자 목록 조회 쿼리 타입
 */
export type ParticipantQuery = z.infer<typeof ParticipantQuerySchema>;

/**
 * @description 룸 예약 목록 조회 쿼리 타입
 */
export type RoomReservationQuery = z.infer<typeof RoomReservationQuerySchema>;

/**
 * @description AI 상호작용 목록 조회 쿼리 타입
 */
export type AIInteractionQuery = z.infer<typeof AIInteractionQuerySchema>;

/**
 * @description 세션 목록 응답 타입
 */
export type SessionListResponse = z.infer<typeof SessionListResponseSchema>;

/**
 * @description 참가자 목록 응답 타입
 */
export type ParticipantListResponse = z.infer<typeof ParticipantListResponseSchema>;

/**
 * @description 룸 예약 목록 응답 타입
 */
export type RoomReservationListResponse = z.infer<typeof RoomReservationListResponseSchema>;

/**
 * @description AI 상호작용 목록 응답 타입
 */
export type AIInteractionListResponse = z.infer<typeof AIInteractionListResponseSchema>;

/**
 * @description 참여자 포함 세션 타입
 */
export type SessionWithParticipants = z.infer<typeof SessionWithParticipantsSchema>;

/**
 * @description 상세 정보 포함 참가자 타입
 */
export type ParticipantWithDetails = z.infer<typeof ParticipantWithDetailsSchema>;

/**
 * @description 상세 정보 포함 룸 예약 타입
 */
export type RoomReservationWithDetails = z.infer<typeof RoomReservationWithDetailsSchema>;

/**
 * @description 세션 통계 타입
 */
export type SessionStats = z.infer<typeof SessionStatsSchema>;

/**
 * @description AI 사용 통계 타입
 */
export type AIUsageStats = z.infer<typeof AIUsageStatsSchema>;

/**
 * @description 페이지네이션 타입
 */
export type Pagination = z.infer<typeof PaginationSchema>;

/**
 * @description 세션 이용 가능 상태 확인 함수
 * @param session 확인할 세션 객체
 * @returns 세션이 예약되거나 확정된 상태이면 true, 그렇지 않으면 false
 */
export function isSessionAvailable(session: Session): boolean {
  return session.status === 'SCHEDULED' || session.status === 'CONFIRMED';
}

/**
 * @description 세션 정원 초과 여부 확인 함수
 * @param session 확인할 세션 객체 (참여자 정보 포함)
 * @returns 정원이 가득 찼으면 true, 그렇지 않으면 false
 */
export function isSessionFull(session: SessionWithParticipants): boolean {
  return session.capacity !== null && session.current_participants >= session.capacity;
}

/**
 * @description 사용자의 세션 참여 가능 여부 확인 함수
 * @param session 확인할 세션 객체 (참여자 정보 포함)
 * @returns 참여 가능하면 true, 그렇지 않으면 false
 */
export function canJoinSession(session: SessionWithParticipants): boolean {
  return isSessionAvailable(session) && !isSessionFull(session);
}

/**
 * @description 참가자 확정 상태 여부 확인 함수
 * @param participant 확인할 참가자 객체
 * @returns 참가자가 확정 상태이면 true, 그렇지 않으면 false
 */
export function isParticipantConfirmed(participant: ProgramParticipant): boolean {
  return participant.status === 'CONFIRMED';
}

/**
 * @description 세션 호스트 여부 확인 함수
 * @param participant 확인할 참가자 객체
 * @returns 세션의 호스트이면 true, 그렇지 않으면 false
 */
export function isSessionHost(participant: ProgramParticipant): boolean {
  return participant.role === 'HOST';
}

/**
 * @description 세션 진행 시간 계산 함수 (분 단위)
 * @param session 계산할 세션 객체
 * @returns 세션 진행 시간 (분 단위)
 */
export function getSessionDurationMinutes(session: Session): number {
  const start = new Date(session.starts_at);
  const end = new Date(session.ends_at);
  return (end.getTime() - start.getTime()) / (1000 * 60);
}

/**
 * @description 세션의 남은 참여 가능 슬롯 계산 함수
 * @param session 계산할 세션 객체 (참여자 정보 포함)
 * @returns 남은 참여 가능 슬롯 수 (정원이 없으면 Infinity)
 */
export function getAvailableSlots(session: SessionWithParticipants): number {
  if (!session.capacity) return Infinity;
  return Math.max(0, session.capacity - session.current_participants);
}

/**
 * @description 세션 수익 계산 함수
 * @param session 계산할 세션 객체 (참여자 정보 포함)
 * @returns 확정된 참가자 기준 총 수익
 */
export function calculateSessionRevenue(session: SessionWithParticipants): number {
  const confirmedCount = session.participants.filter(p => p.status === 'CONFIRMED').length;
  return (session.participant_fee || 0) * confirmedCount;
}

/**
 * @description 세션 취소 가능 여부 확인 함수
 * @param session 확인할 세션 객체
 * @returns 세션 시작 24시간 전이고 취소 가능한 상태이면 true, 그렇지 않으면 false
 */
export function canCancelSession(session: Session): boolean {
  const now = new Date();
  const sessionStart = new Date(session.starts_at);
  const hoursUntilStart = (sessionStart.getTime() - now.getTime()) / (1000 * 60 * 60);
  return (session.status === 'SCHEDULED' || session.status === 'CONFIRMED') && hoursUntilStart >= 24;
}

/**
 * @description 예약 시간 겹침 여부 확인 함수
 * @param reservation1 첫 번째 예약 객체
 * @param reservation2 두 번째 예약 객체
 * @returns 예약 시간이 겹치면 true, 그렇지 않으면 false
 */
export function isReservationOverlapping(
  reservation1: { starts_at: Date; ends_at: Date },
  reservation2: { starts_at: Date; ends_at: Date },
): boolean {
  return reservation1.starts_at < reservation2.ends_at && reservation2.starts_at < reservation1.ends_at;
}

/**
 * @description 예약 상태별 메시지 반환 함수
 * @param status 예약 상태
 * @returns 한국어 상태 메시지
 */
export function getReservationStatusMessage(status: ReservationStatus): string {
  const messages = {
    PENDING: '승인 대기',
    CONFIRMED: '확정됨',
    CANCELLED: '취소됨',
    COMPLETED: '완료됨',
  };
  return messages[status];
}

/**
 * @description 참가자 상태별 메시지 반환 함수
 * @param status 참가자 상태
 * @returns 한국어 상태 메시지
 */
export function getParticipantStatusMessage(status: ParticipantStatus): string {
  const messages = {
    APPLIED: '신청함',
    CONFIRMED: '확정됨',
    CANCELLED: '취소함',
    NO_SHOW: '불참',
  };
  return messages[status];
}

/**
 * @description AI 제공자 표시명 반환 함수
 * @param provider AI 제공자
 * @returns AI 제공자 표시명
 */
export function getAIProviderDisplayName(provider: AIProvider): string {
  const names = {
    OPENAI: 'OpenAI',
    ANTHROPIC: 'Anthropic',
    GOOGLE: 'Google AI',
    HUGGINGFACE: 'Hugging Face',
  };
  return names[provider];
}

/**
 * @description 토큰 수 포맷팅 함수
 * @param tokens 토큰 수
 * @returns 포맷된 토큰 수 문자열 (예: "1.5K", "2.3M")
 */
export function formatTokenCount(tokens: number): string {
  if (tokens < 1000) return `${tokens}`;
  if (tokens < 1000000) return `${(tokens / 1000).toFixed(1)}K`;
  return `${(tokens / 1000000).toFixed(1)}M`;
}

/**
 * @description 세션 생성 데이터 유효성 검사 함수
 * @param data 검사할 데이터
 * @returns Zod 파싱 결과
 */
export function validateCreateSession(data: unknown) {
  return CreateSessionSchema.safeParse(data);
}

/**
 * @description 참가자 생성 데이터 유효성 검사 함수
 * @param data 검사할 데이터
 * @returns Zod 파싱 결과
 */
export function validateCreateParticipant(data: unknown) {
  return CreateParticipantSchema.safeParse(data);
}

/**
 * @description 룸 예약 생성 데이터 유효성 검사 함수
 * @param data 검사할 데이터
 * @returns Zod 파싱 결과
 */
export function validateCreateRoomReservation(data: unknown) {
  return CreateRoomReservationSchema.safeParse(data);
}

/**
 * @description 세션 쿼리 파라미터 유효성 검사 함수
 * @param data 검사할 데이터
 * @returns Zod 파싱 결과
 */
export function validateSessionQuery(data: unknown) {
  return SessionQuerySchema.safeParse(data);
}

/**
 * @description 시간 슬롯 유효성 검사 함수
 * @param startsAt 시작 시간
 * @param endsAt 종료 시간
 * @returns 종료 시간이 시작 시간보다 늦으면 true, 그렇지 않으면 false
 */
export function isValidTimeSlot(startsAt: Date, endsAt: Date): boolean {
  return endsAt > startsAt;
}

/**
 * @description 영업 시간 내 예약 가능 여부 확인 함수
 * @param datetime 확인할 날짜/시간
 * @returns 평일 오전 9시~오후 6시 내이면 true, 그렇지 않으면 false
 */
export function isBusinessHours(datetime: Date): boolean {
  const hour = datetime.getHours();
  const day = datetime.getDay();
  return day >= 1 && day <= 5 && hour >= 9 && hour <= 18;
}

/**
 * @description 시간 슬롯 한국어 포맷팅 함수
 * @param startsAt 시작 시간
 * @param endsAt 종료 시간
 * @returns 포맷된 시간 문자열 (예: "09:00 - 11:00")
 */
export function formatTimeSlot(startsAt: Date, endsAt: Date): string {
  const start = startsAt.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  const end = endsAt.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  return `${start} - ${end}`;
}

/**
 * @description 기본 세션 설정 상수
 */
export const DEFAULT_SESSION_SETTINGS = {
  status: 'SCHEDULED' as SessionStatus,
  capacity: 30,
  participant_fee: 0,
};

/**
 * @description 기본 예약 설정 상수
 */
export const DEFAULT_RESERVATION_SETTINGS = {
  status: 'PENDING' as ReservationStatus,
};

/**
 * @description AI 토큰 및 비용 제한 상수
 */
export const AI_TOKEN_LIMITS = {
  MAX_PROMPT_TOKENS: 50000,
  MAX_COMPLETION_TOKENS: 10000,
  DAILY_COST_LIMIT: 100, // $100
} as const;
