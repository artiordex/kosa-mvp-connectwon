/**
 * Description : programs.ts - 📌 프로그램/세션/참여자 스키마 (Zod 기반, DTO 대체)
 * Author : Shiwoo Min
 * Date : 2025-09-16
 */
import { z } from 'zod';

/**
 * @description 프로그램 상태 열거형
 */
export const ProgramStatus = z.enum(['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED']);

/**
 * @description 세션 상태 열거형
 */
export const SessionStatus = z.enum(['SCHEDULED', 'CONFIRMED', 'CANCELLED', 'COMPLETED']);

/**
 * @description 참여자 역할 열거형
 */
export const ParticipantRole = z.enum(['HOST', 'ATTENDEE']);

/**
 * @description 참여자 상태 열거형
 */
export const ParticipantStatus = z.enum(['APPLIED', 'CONFIRMED', 'CANCELLED', 'NO_SHOW']);

/**
 * @description 프로그램 상태 타입
 */
export type ProgramStatus = z.infer<typeof ProgramStatus>;

/**
 * @description 세션 상태 타입
 */
export type SessionStatus = z.infer<typeof SessionStatus>;

/**
 * @description 참여자 역할 타입
 */
export type ParticipantRole = z.infer<typeof ParticipantRole>;

/**
 * @description 참여자 상태 타입
 */
export type ParticipantStatus = z.infer<typeof ParticipantStatus>;

/**
 * @description 프로그램 기본 스키마
 */
export const ProgramSchema = z.object({
  id: z.string(),
  created_by_user_id: z.string(),
  type: z.string().nullable(), // seminar, workshop, etc.
  title: z.string(),
  description: z.string().nullable(),
  category: z.string().nullable(),
  venue_id: z.string().nullable(),
  max_participants: z.number().min(1).nullable(),
  price: z.number().min(0).nullable(),
  tags: z.array(z.string()).default([]),
  ai_summary_tags: z.array(z.string()).default([]),
  image_url: z.string().url().nullable(),
  ai_summary: z.string().nullable(),
  status: ProgramStatus.default('PENDING'),
  is_active: z.boolean().default(true),
  created_at: z.date(),
  updated_at: z.date(),
});

/**
 * @description 세션 기본 스키마
 */
export const SessionSchema = z.object({
  id: z.string(),
  program_id: z.string(),
  starts_at: z.date(),
  ends_at: z.date(),
  capacity: z.number().min(1).nullable(),
  participant_fee: z.number().min(0).nullable(),
  status: SessionStatus.default('SCHEDULED'),
  room_reservation_id: z.string().nullable(),
  location_text: z.string().nullable(),
  created_at: z.date(),
  updated_at: z.date(),
});

/**
 * @description 참여자 기본 스키마
 */
export const ParticipantSchema = z.object({
  id: z.string(),
  session_id: z.string(),
  user_id: z.string(),
  role: ParticipantRole.default('ATTENDEE'),
  status: ParticipantStatus.default('APPLIED'),
  joined_at: z.date(),
});

/**
 * @description 프로그램 생성 요청 스키마
 */
export const CreateProgramSchema = z.object({
  type: z.string().optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  category: z.string().optional(),
  venue_id: z.string().optional(),
  max_participants: z.number().min(1).max(100).optional(),
  price: z.number().min(0).optional(),
  tags: z.array(z.string()).optional(),
  ai_summary_tags: z.array(z.string()).optional(),
  image_url: z.string().url().optional(),
  is_active: z.boolean().optional(),
});

/**
 * @description 프로그램 수정 요청 스키마
 */
export const UpdateProgramSchema = z.object({
  type: z.string().optional(),
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  venue_id: z.string().optional(),
  max_participants: z.number().min(1).max(100).optional(),
  price: z.number().min(0).optional(),
  tags: z.array(z.string()).optional(),
  ai_summary_tags: z.array(z.string()).optional(),
  image_url: z.string().url().optional(),
  is_active: z.boolean().optional(),
  status: ProgramStatus.optional(),
});

/**
 * @description 세션 생성 요청 스키마
 */
export const CreateSessionSchema = z.object({
  program_id: z.string(),
  starts_at: z.string().datetime(),
  ends_at: z.string().datetime(),
  capacity: z.number().min(1).optional(),
  participant_fee: z.number().min(0).optional(),
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
  capacity: z.number().min(1).optional(),
  participant_fee: z.number().min(0).optional(),
  status: SessionStatus.optional(),
  room_reservation_id: z.string().optional(),
  location_text: z.string().optional(),
});

/**
 * @description 참여자 생성 요청 스키마
 */
export const CreateParticipantSchema = z.object({
  session_id: z.string(),
  user_id: z.string(),
  role: ParticipantRole.optional(),
  status: ParticipantStatus.optional(),
});

/**
 * @description 참여자 수정 요청 스키마
 */
export const UpdateParticipantSchema = z.object({
  role: ParticipantRole.optional(),
  status: ParticipantStatus.optional(),
});

/**
 * @description 프로그램 목록 조회 쿼리 스키마
 */
export const ProgramQuerySchema = z.object({
  type: z.string().optional(),
  title: z.string().optional(),
  category: z.string().optional(),
  is_active: z.boolean().optional(),
  status: ProgramStatus.optional(),
  created_by_user_id: z.string().optional(),
  venue_id: z.string().optional(),
  tags: z.array(z.string()).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
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
 * @description 참여자 목록 조회 쿼리 스키마
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
 * @description 페이지네이션 응답 스키마
 */
export const PaginationSchema = z.object({
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
  pages: z.number().int().min(0),
});

/**
 * @description 프로그램 목록 응답 스키마
 */
export const ProgramListResponseSchema = z.object({
  programs: z.array(ProgramSchema),
  pagination: PaginationSchema,
});

/**
 * @description 세션 목록 응답 스키마
 */
export const SessionListResponseSchema = z.object({
  sessions: z.array(SessionSchema),
  pagination: PaginationSchema,
});

/**
 * @description 참여자 목록 응답 스키마
 */
export const ParticipantListResponseSchema = z.object({
  participants: z.array(ParticipantSchema),
  pagination: PaginationSchema,
});

/**
 * @description 세션 포함 프로그램 스키마
 */
export const ProgramWithSessionsSchema = ProgramSchema.extend({
  sessions: z.array(SessionSchema),
  total_sessions: z.number().int().min(0),
  upcoming_sessions: z.number().int().min(0),
  completed_sessions: z.number().int().min(0),
});

/**
 * @description 참여자 포함 세션 스키마
 */
export const SessionWithParticipantsSchema = SessionSchema.extend({
  participants: z.array(ParticipantSchema),
  current_participants: z.number().int().min(0),
  available_slots: z.number().int().min(0),
  program: z.object({
    id: z.string(),
    title: z.string(),
    type: z.string().nullable(),
  }),
});

/**
 * @description 상세 정보 포함 참여자 스키마
 */
export const ParticipantWithDetailsSchema = ParticipantSchema.extend({
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
  }),
  session: z.object({
    id: z.string(),
    program_id: z.string(),
    starts_at: z.date(),
    ends_at: z.date(),
  }),
});

/**
 * @description 프로그램 통계 스키마
 */
export const ProgramStatsSchema = z.object({
  program_id: z.string(),
  period: z.string(), // YYYY-MM or YYYY
  total_sessions: z.number().int().min(0),
  completed_sessions: z.number().int().min(0),
  cancelled_sessions: z.number().int().min(0),
  total_participants: z.number().int().min(0),
  confirmed_participants: z.number().int().min(0),
  total_revenue: z.number().min(0),
  average_rating: z.number().min(0).max(5).optional(),
  completion_rate: z.number().min(0).max(100),
});

/**
 * @description 세션별 통계 스키마
 */
export const SessionStatsSchema = z.object({
  session_id: z.string(),
  total_participants: z.number().int().min(0),
  confirmed_participants: z.number().int().min(0),
  no_show_count: z.number().int().min(0),
  attendance_rate: z.number().min(0).max(100),
  revenue: z.number().min(0),
  average_rating: z.number().min(0).max(5).optional(),
});

/**
 * @description 프로그램 기본 타입
 */
export type Program = z.infer<typeof ProgramSchema>;

/**
 * @description 세션 기본 타입
 */
export type Session = z.infer<typeof SessionSchema>;

/**
 * @description 참여자 기본 타입
 */
export type Participant = z.infer<typeof ParticipantSchema>;

/**
 * @description 프로그램 생성 요청 타입
 */
export type CreateProgram = z.infer<typeof CreateProgramSchema>;

/**
 * @description 프로그램 수정 요청 타입
 */
export type UpdateProgram = z.infer<typeof UpdateProgramSchema>;

/**
 * @description 세션 생성 요청 타입
 */
export type CreateSession = z.infer<typeof CreateSessionSchema>;

/**
 * @description 세션 수정 요청 타입
 */
export type UpdateSession = z.infer<typeof UpdateSessionSchema>;

/**
 * @description 참여자 생성 요청 타입
 */
export type CreateParticipant = z.infer<typeof CreateParticipantSchema>;

/**
 * @description 참여자 수정 요청 타입
 */
export type UpdateParticipant = z.infer<typeof UpdateParticipantSchema>;

/**
 * @description 프로그램 목록 조회 쿼리 타입
 */
export type ProgramQuery = z.infer<typeof ProgramQuerySchema>;

/**
 * @description 세션 목록 조회 쿼리 타입
 */
export type SessionQuery = z.infer<typeof SessionQuerySchema>;

/**
 * @description 참여자 목록 조회 쿼리 타입
 */
export type ParticipantQuery = z.infer<typeof ParticipantQuerySchema>;

/**
 * @description 프로그램 목록 응답 타입
 */
export type ProgramListResponse = z.infer<typeof ProgramListResponseSchema>;

/**
 * @description 세션 목록 응답 타입
 */
export type SessionListResponse = z.infer<typeof SessionListResponseSchema>;

/**
 * @description 참여자 목록 응답 타입
 */
export type ParticipantListResponse = z.infer<typeof ParticipantListResponseSchema>;

/**
 * @description 세션 포함 프로그램 타입
 */
export type ProgramWithSessions = z.infer<typeof ProgramWithSessionsSchema>;

/**
 * @description 참여자 포함 세션 타입
 */
export type SessionWithParticipants = z.infer<typeof SessionWithParticipantsSchema>;

/**
 * @description 상세 정보 포함 참여자 타입
 */
export type ParticipantWithDetails = z.infer<typeof ParticipantWithDetailsSchema>;

/**
 * @description 프로그램 통계 타입
 */
export type ProgramStats = z.infer<typeof ProgramStatsSchema>;

/**
 * @description 세션별 통계 타입
 */
export type SessionStats = z.infer<typeof SessionStatsSchema>;

/**
 * @description 페이지네이션 타입
 */
export type Pagination = z.infer<typeof PaginationSchema>;

/**
 * @description 프로그램 활성화 여부 확인 함수
 * @param program 확인할 프로그램 객체
 * @returns 프로그램이 활성화되고 승인된 상태이면 true, 그렇지 않으면 false
 */
export function isProgramActive(program: Program): boolean {
  return program.is_active && program.status === 'APPROVED';
}

/**
 * @description 세션 이용 가능 여부 확인 함수
 * @param session 확인할 세션 객체
 * @returns 세션이 예정되거나 확정된 상태이면 true, 그렇지 않으면 false
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
 * @description 세션 참여 가능 여부 확인 함수
 * @param session 확인할 세션 객체 (참여자 정보 포함)
 * @returns 참여 가능하면 true, 그렇지 않으면 false
 */
export function canJoinSession(session: SessionWithParticipants): boolean {
  return isSessionAvailable(session) && !isSessionFull(session);
}

/**
 * @description 참여자 확정 상태 여부 확인 함수
 * @param participant 확인할 참여자 객체
 * @returns 참여자가 확정 상태이면 true, 그렇지 않으면 false
 */
export function isParticipantConfirmed(participant: Participant): boolean {
  return participant.status === 'CONFIRMED';
}

/**
 * @description 참여자 호스트 여부 확인 함수
 * @param participant 확인할 참여자 객체
 * @returns 참여자가 호스트이면 true, 그렇지 않으면 false
 */
export function isParticipantHost(participant: Participant): boolean {
  return participant.role === 'HOST';
}

/**
 * @description 세션 수익 계산 함수
 * @param session 계산할 세션 객체 (참여자 정보 포함)
 * @returns 확정된 참여자 기준 총 수익
 */
export function calculateSessionRevenue(session: SessionWithParticipants): number {
  const confirmedCount = session.participants.filter(p => p.status === 'CONFIRMED').length;
  return (session.participant_fee || 0) * confirmedCount;
}

/**
 * @description 세션 진행 시간 계산 함수 (시간 단위)
 * @param session 계산할 세션 객체
 * @returns 세션 진행 시간 (시간 단위)
 */
export function getSessionDurationHours(session: Session): number {
  const start = new Date(session.starts_at);
  const end = new Date(session.ends_at);
  return (end.getTime() - start.getTime()) / (1000 * 60 * 60);
}

/**
 * @description 세션 남은 자리 수 계산 함수
 * @param session 계산할 세션 객체 (참여자 정보 포함)
 * @returns 남은 자리 수 (정원이 없으면 Infinity)
 */
export function getAvailableSlots(session: SessionWithParticipants): number {
  if (!session.capacity) return Infinity;
  return Math.max(0, session.capacity - session.current_participants);
}

/**
 * @description 세션 호스트 여부 확인 함수
 * @param participant 확인할 참여자 객체
 * @returns 세션의 호스트이면 true, 그렇지 않으면 false
 */
export function isSessionHost(participant: Participant): boolean {
  return participant.role === 'HOST';
}

/**
 * @description 프로그램 총 수익 계산 함수
 * @param program 계산할 프로그램 객체 (세션 정보 포함)
 * @returns 프로그램의 모든 세션 총 수익
 */
export function getProgramTotalRevenue(program: ProgramWithSessions): number {
  return program.sessions.reduce((total, session) => {
    // 참여자 정보가 있다면 계산, 없다면 0
    return total + ((session as any).participant_fee || 0) * ((session as any).current_participants || 0);
  }, 0);
}

/**
 * @description 프로그램 생성 데이터 유효성 검사 함수
 * @param data 검사할 데이터
 * @returns Zod 파싱 결과
 */
export function validateCreateProgram(data: unknown) {
  return CreateProgramSchema.safeParse(data);
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
 * @description 참여자 생성 데이터 유효성 검사 함수
 * @param data 검사할 데이터
 * @returns Zod 파싱 결과
 */
export function validateCreateParticipant(data: unknown) {
  return CreateParticipantSchema.safeParse(data);
}

/**
 * @description 프로그램 조회 쿼리 유효성 검사 함수
 * @param data 검사할 데이터
 * @returns Zod 파싱 결과
 */
export function validateProgramQuery(data: unknown) {
  return ProgramQuerySchema.safeParse(data);
}

/**
 * @description 세션 조회 쿼리 유효성 검사 함수
 * @param data 검사할 데이터
 * @returns Zod 파싱 결과
 */
export function validateSessionQuery(data: unknown) {
  return SessionQuerySchema.safeParse(data);
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
 * @description 세션 수정 가능 여부 확인 함수
 * @param session 확인할 세션 객체
 * @returns 세션 시작 전이고 취소되지 않은 상태이면 true, 그렇지 않으면 false
 */
export function canModifySession(session: Session): boolean {
  const now = new Date();
  const sessionStart = new Date(session.starts_at);
  return sessionStart > now && session.status !== 'CANCELLED';
}

/**
 * @description 세션 상태별 메시지 반환 함수
 * @param session 확인할 세션 객체
 * @returns 한국어 상태 메시지
 */
export function getSessionStatusMessage(session: Session): string {
  switch (session.status) {
    case 'SCHEDULED':
      return '예정됨';
    case 'CONFIRMED':
      return '확정됨';
    case 'CANCELLED':
      return '취소됨';
    case 'COMPLETED':
      return '완료됨';
    default:
      return '알 수 없음';
  }
}

/**
 * @description 참여자 상태별 메시지 반환 함수
 * @param participant 확인할 참여자 객체
 * @returns 한국어 상태 메시지
 */
export function getParticipantStatusMessage(participant: Participant): string {
  switch (participant.status) {
    case 'APPLIED':
      return '신청함';
    case 'CONFIRMED':
      return '확정됨';
    case 'CANCELLED':
      return '취소함';
    case 'NO_SHOW':
      return '불참';
    default:
      return '알 수 없음';
  }
}

/**
 * @description 프로그램 기본 설정 상수
 */
export const DEFAULT_PROGRAM_SETTINGS = {
  max_participants: 30,
  price: 0,
  is_active: true,
  status: 'PENDING' as ProgramStatus,
};

/**
 * @description 세션 기본 설정 상수
 */
export const DEFAULT_SESSION_SETTINGS = {
  capacity: 30,
  participant_fee: 0,
  status: 'SCHEDULED' as SessionStatus,
};
