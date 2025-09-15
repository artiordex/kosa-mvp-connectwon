/**
 * Description : programs.ts - 📌 프로그램/세션/참여자 스키마 (Zod 기반, DTO 대체)
 * Author : Shiwoo Min
 * Date : 2025-09-16
 */
import { z } from 'zod';

// Enums
export const ProgramStatus = z.enum(['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED']);
export const SessionStatus = z.enum(['SCHEDULED', 'CONFIRMED', 'CANCELLED', 'COMPLETED']);
export const ParticipantRole = z.enum(['HOST', 'ATTENDEE']);
export const ParticipantStatus = z.enum(['APPLIED', 'CONFIRMED', 'CANCELLED', 'NO_SHOW']);

export type ProgramStatus = z.infer<typeof ProgramStatus>;
export type SessionStatus = z.infer<typeof SessionStatus>;
export type ParticipantRole = z.infer<typeof ParticipantRole>;
export type ParticipantStatus = z.infer<typeof ParticipantStatus>;

// Base Schemas
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

export const ParticipantSchema = z.object({
  id: z.string(),
  session_id: z.string(),
  user_id: z.string(),
  role: ParticipantRole.default('ATTENDEE'),
  status: ParticipantStatus.default('APPLIED'),
  joined_at: z.date(),
});

// CRUD Schemas
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

export const UpdateSessionSchema = z.object({
  starts_at: z.string().datetime().optional(),
  ends_at: z.string().datetime().optional(),
  capacity: z.number().min(1).optional(),
  participant_fee: z.number().min(0).optional(),
  status: SessionStatus.optional(),
  room_reservation_id: z.string().optional(),
  location_text: z.string().optional(),
});

export const CreateParticipantSchema = z.object({
  session_id: z.string(),
  user_id: z.string(),
  role: ParticipantRole.optional(),
  status: ParticipantStatus.optional(),
});

export const UpdateParticipantSchema = z.object({
  role: ParticipantRole.optional(),
  status: ParticipantStatus.optional(),
});

// Query Schemas
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

export const SessionQuerySchema = z.object({
  program_id: z.string().optional(),
  status: SessionStatus.optional(),
  starts_after: z.string().datetime().optional(),
  starts_before: z.string().datetime().optional(),
  room_reservation_id: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const ParticipantQuerySchema = z.object({
  session_id: z.string().optional(),
  user_id: z.string().optional(),
  role: ParticipantRole.optional(),
  status: ParticipantStatus.optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

// Response Schemas
export const PaginationSchema = z.object({
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
  pages: z.number().int().min(0),
});

export const ProgramListResponseSchema = z.object({
  programs: z.array(ProgramSchema),
  pagination: PaginationSchema,
});

export const SessionListResponseSchema = z.object({
  sessions: z.array(SessionSchema),
  pagination: PaginationSchema,
});

export const ParticipantListResponseSchema = z.object({
  participants: z.array(ParticipantSchema),
  pagination: PaginationSchema,
});

// Extended Response Schemas
export const ProgramWithSessionsSchema = ProgramSchema.extend({
  sessions: z.array(SessionSchema),
  total_sessions: z.number().int().min(0),
  upcoming_sessions: z.number().int().min(0),
  completed_sessions: z.number().int().min(0),
});

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

// Stats Schemas
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

export const SessionStatsSchema = z.object({
  session_id: z.string(),
  total_participants: z.number().int().min(0),
  confirmed_participants: z.number().int().min(0),
  no_show_count: z.number().int().min(0),
  attendance_rate: z.number().min(0).max(100),
  revenue: z.number().min(0),
  average_rating: z.number().min(0).max(5).optional(),
});

// Type Exports
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

// Helper Functions
export function isProgramActive(program: Program): boolean {
  return program.is_active && program.status === 'APPROVED';
}

export function isSessionAvailable(session: Session): boolean {
  return session.status === 'SCHEDULED' || session.status === 'CONFIRMED';
}

export function isSessionFull(session: SessionWithParticipants): boolean {
  return session.capacity !== null && session.current_participants >= session.capacity;
}

export function canJoinSession(session: SessionWithParticipants): boolean {
  return isSessionAvailable(session) && !isSessionFull(session);
}

export function isParticipantConfirmed(participant: Participant): boolean {
  return participant.status === 'CONFIRMED';
}

export function calculateSessionRevenue(session: SessionWithParticipants): number {
  const confirmedCount = session.participants.filter(p => p.status === 'CONFIRMED').length;
  return (session.participant_fee || 0) * confirmedCount;
}

export function getSessionDurationHours(session: Session): number {
  const start = new Date(session.starts_at);
  const end = new Date(session.ends_at);
  return (end.getTime() - start.getTime()) / (1000 * 60 * 60);
}

export function getAvailableSlots(session: SessionWithParticipants): number {
  if (!session.capacity) return Infinity;
  return Math.max(0, session.capacity - session.current_participants);
}

export function isSessionHost(participant: Participant): boolean {
  return participant.role === 'HOST';
}

export function getProgramTotalRevenue(program: ProgramWithSessions): number {
  return program.sessions.reduce((total, session) => {
    // 참여자 정보가 있다면 계산, 없다면 0
    return (
      total + ((session as any).participant_fee || 0) * ((session as any).current_participants || 0)
    );
  }, 0);
}

// Validation Helpers
export function validateCreateProgram(data: unknown) {
  return CreateProgramSchema.safeParse(data);
}

export function validateCreateSession(data: unknown) {
  return CreateSessionSchema.safeParse(data);
}

export function validateCreateParticipant(data: unknown) {
  return CreateParticipantSchema.safeParse(data);
}

export function validateProgramQuery(data: unknown) {
  return ProgramQuerySchema.safeParse(data);
}

export function validateSessionQuery(data: unknown) {
  return SessionQuerySchema.safeParse(data);
}

// Business Logic Helpers
export function canCancelSession(session: Session): boolean {
  const now = new Date();
  const sessionStart = new Date(session.starts_at);
  const hoursUntilStart = (sessionStart.getTime() - now.getTime()) / (1000 * 60 * 60);

  return (
    (session.status === 'SCHEDULED' || session.status === 'CONFIRMED') && hoursUntilStart >= 24 // 24시간 전까지만 취소 가능
  );
}

export function canModifySession(session: Session): boolean {
  const now = new Date();
  const sessionStart = new Date(session.starts_at);
  return sessionStart > now && session.status !== 'CANCELLED';
}

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

// Constants
export const DEFAULT_PROGRAM_SETTINGS = {
  max_participants: 30,
  price: 0,
  is_active: true,
  status: 'PENDING' as ProgramStatus,
};

export const DEFAULT_SESSION_SETTINGS = {
  capacity: 30,
  participant_fee: 0,
  status: 'SCHEDULED' as SessionStatus,
};
