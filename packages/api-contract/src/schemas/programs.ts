/**
 * Description : programs.ts - 📌 프로그램/세션/참여자 스키마 (Zod 기반, DTO 대체)
 * Author : Shiwoo Min
 * Date : 2025-09-16
 */
import { z } from 'zod';

// 프로그램 상태
export const ProgramStatus = z.enum(['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED']);

// 세션 상태
export const SessionStatus = z.enum(['SCHEDULED', 'CONFIRMED', 'CANCELLED', 'COMPLETED']);

// 참여자 역할 및 상태
export const ParticipantRole = z.enum(['HOST', 'ATTENDEE']);

// 참여자 상태
export const ParticipantStatus = z.enum(['APPLIED', 'CONFIRMED', 'CANCELLED', 'NO_SHOW']);

// 타입 내보내기
export type ProgramStatus = z.infer<typeof ProgramStatus>;
export type SessionStatus = z.infer<typeof SessionStatus>;
export type ParticipantRole = z.infer<typeof ParticipantRole>;
export type ParticipantStatus = z.infer<typeof ParticipantStatus>;

// 프로그램 스키마
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

// 세션 스키마
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

// 참여자 스키마
export const ParticipantSchema = z.object({
  id: z.string(),
  session_id: z.string(),
  user_id: z.string(),
  role: ParticipantRole.default('ATTENDEE'),
  status: ParticipantStatus.default('APPLIED'),
  joined_at: z.date(),
});

// 프로그램 생성 스키마
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

// 프로그램 수정 스키마
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

// 세션 생성 스키마
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

// 세션 수정 스키마
export const UpdateSessionSchema = z.object({
  starts_at: z.string().datetime().optional(),
  ends_at: z.string().datetime().optional(),
  capacity: z.number().min(1).optional(),
  participant_fee: z.number().min(0).optional(),
  status: SessionStatus.optional(),
  room_reservation_id: z.string().optional(),
  location_text: z.string().optional(),
});

// 참여자 생성 스키마
export const CreateParticipantSchema = z.object({
  session_id: z.string(),
  user_id: z.string(),
  role: ParticipantRole.optional(),
  status: ParticipantStatus.optional(),
});

// 참여자 수정 스키마
export const UpdateParticipantSchema = z.object({
  role: ParticipantRole.optional(),
  status: ParticipantStatus.optional(),
});

// 프로그램 쿼리 스키마
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

// 참여자 쿼리 스키마
export const ParticipantQuerySchema = z.object({
  session_id: z.string().optional(),
  user_id: z.string().optional(),
  role: ParticipantRole.optional(),
  status: ParticipantStatus.optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

// 페이징 응답 스키마
export const PaginationSchema = z.object({
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
  pages: z.number().int().min(0),
});

// 프로그램 리스트 응답 스키마
export const ProgramListResponseSchema = z.object({
  programs: z.array(ProgramSchema),
  pagination: PaginationSchema,
});

// 세션 리스트 응답 스키마
export const SessionListResponseSchema = z.object({
  sessions: z.array(SessionSchema),
  pagination: PaginationSchema,
});

// 참여자 리스트 응답 스키마
export const ParticipantListResponseSchema = z.object({
  participants: z.array(ParticipantSchema),
  pagination: PaginationSchema,
});

// 프로그램 세션 스키마
export const ProgramWithSessionsSchema = ProgramSchema.extend({
  sessions: z.array(SessionSchema),
  total_sessions: z.number().int().min(0),
  upcoming_sessions: z.number().int().min(0),
  completed_sessions: z.number().int().min(0),
});

// 세션 참여자 스키마
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

// 참여자 상세 정보 스키마
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

// 프로그램 통계 스키마
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

// 세션별 통계 스키마
export const SessionStatsSchema = z.object({
  session_id: z.string(),
  total_participants: z.number().int().min(0),
  confirmed_participants: z.number().int().min(0),
  no_show_count: z.number().int().min(0),
  attendance_rate: z.number().min(0).max(100),
  revenue: z.number().min(0),
  average_rating: z.number().min(0).max(5).optional(),
});

// Type 내보내기
export type Program = z.infer<typeof ProgramSchema>;
export type Session = z.infer<typeof SessionSchema>;
export type Participant = z.infer<typeof ParticipantSchema>;
export type CreateProgram = z.infer<typeof CreateProgramSchema>;
export type UpdateProgram = z.infer<typeof UpdateProgramSchema>;
export type CreateSession = z.infer<typeof CreateSessionSchema>;
export type UpdateSession = z.infer<typeof UpdateSessionSchema>;
export type CreateParticipant = z.infer<typeof CreateParticipantSchema>;
export type UpdateParticipant = z.infer<typeof UpdateParticipantSchema>;
export type ProgramQuery = z.infer<typeof ProgramQuerySchema>;
export type SessionQuery = z.infer<typeof SessionQuerySchema>;
export type ParticipantQuery = z.infer<typeof ParticipantQuerySchema>;
export type ProgramListResponse = z.infer<typeof ProgramListResponseSchema>;
export type SessionListResponse = z.infer<typeof SessionListResponseSchema>;
export type ParticipantListResponse = z.infer<typeof ParticipantListResponseSchema>;
export type ProgramWithSessions = z.infer<typeof ProgramWithSessionsSchema>;
export type SessionWithParticipants = z.infer<typeof SessionWithParticipantsSchema>;
export type ParticipantWithDetails = z.infer<typeof ParticipantWithDetailsSchema>;
export type ProgramStats = z.infer<typeof ProgramStatsSchema>;
export type SessionStats = z.infer<typeof SessionStatsSchema>;
export type Pagination = z.infer<typeof PaginationSchema>;

// 프로그램 활성화 여부
export function isProgramActive(program: Program): boolean {
  return program.is_active && program.status === 'APPROVED';
}

// 세션 활성화 여부
export function isSessionAvailable(session: Session): boolean {
  return session.status === 'SCHEDULED' || session.status === 'CONFIRMED';
}

// 세션이 가득 찼는지 여부
export function isSessionFull(session: SessionWithParticipants): boolean {
  return session.capacity !== null && session.current_participants >= session.capacity;
}

// 세션에 참여할 수 있는지 여부
export function canJoinSession(session: SessionWithParticipants): boolean {
  return isSessionAvailable(session) && !isSessionFull(session);
}

// 참여자가 확정 상태인지 여부
export function isParticipantConfirmed(participant: Participant): boolean {
  return participant.status === 'CONFIRMED';
}

// 참여자가 호스트인지 여부
export function isParticipantHost(participant: Participant): boolean {
  return participant.role === 'HOST';
}

// 세션 수익 계산
export function calculateSessionRevenue(session: SessionWithParticipants): number {
  const confirmedCount = session.participants.filter(p => p.status === 'CONFIRMED').length;
  return (session.participant_fee || 0) * confirmedCount;
}

// 유틸리티 함수
export function getSessionDurationHours(session: Session): number {
  const start = new Date(session.starts_at);
  const end = new Date(session.ends_at);
  return (end.getTime() - start.getTime()) / (1000 * 60 * 60);
}

// 비즈니스 로직 헬퍼
export function getAvailableSlots(session: SessionWithParticipants): number {
  if (!session.capacity) return Infinity;
  return Math.max(0, session.capacity - session.current_participants);
}

// 참여자가 호스트인지 여부
export function isSessionHost(participant: Participant): boolean {
  return participant.role === 'HOST';
}

// 프로그램 총 수익 계산
export function getProgramTotalRevenue(program: ProgramWithSessions): number {
  return program.sessions.reduce((total, session) => {
    // 참여자 정보가 있다면 계산, 없다면 0
    return (
      total + ((session as any).participant_fee || 0) * ((session as any).current_participants || 0)
    );
  }, 0);
}

// 프로그램 생성 요청 검증
export function validateCreateProgram(data: unknown) {
  return CreateProgramSchema.safeParse(data);
}

// 프로그램 수정 요청 검증
export function validateCreateSession(data: unknown) {
  return CreateSessionSchema.safeParse(data);
}

// 세션 생성 요청 검증
export function validateCreateParticipant(data: unknown) {
  return CreateParticipantSchema.safeParse(data);
}

// 세션 수정 요청 검증
export function validateProgramQuery(data: unknown) {
  return ProgramQuerySchema.safeParse(data);
}

// 세션 생성 요청 검증
export function validateSessionQuery(data: unknown) {
  return SessionQuerySchema.safeParse(data);
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

// 세션 수정 가능 여부
export function canModifySession(session: Session): boolean {
  const now = new Date();
  const sessionStart = new Date(session.starts_at);
  return sessionStart > now && session.status !== 'CANCELLED';
}

// 상태 메시지 반환
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

// 프로그램 기본 설정
export const DEFAULT_PROGRAM_SETTINGS = {
  max_participants: 30,
  price: 0,
  is_active: true,
  status: 'PENDING' as ProgramStatus,
};

// 세션 기본 설정
export const DEFAULT_SESSION_SETTINGS = {
  capacity: 30,
  participant_fee: 0,
  status: 'SCHEDULED' as SessionStatus,
};
