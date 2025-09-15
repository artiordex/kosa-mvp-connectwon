/**
 * Description : sessions.ts - 📌 세션/참여자/AI 스키마
 * Author : Shiwoo Min
 * Date : 2025-09-16
 */
import { z } from 'zod';

// Enums
export const SessionStatus = z.enum(['SCHEDULED', 'CONFIRMED', 'CANCELLED', 'COMPLETED']);
export const ParticipantRole = z.enum(['HOST', 'ATTENDEE']);
export const ParticipantStatus = z.enum(['APPLIED', 'CONFIRMED', 'CANCELLED', 'NO_SHOW']);
export const ReservationStatus = z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']);
export const RoomStatus = z.enum(['ACTIVE', 'INACTIVE', 'MAINTENANCE']);
export const AIProvider = z.enum(['OPENAI', 'ANTHROPIC', 'GOOGLE', 'HUGGINGFACE']);
export const AIInteractionKind = z.enum(['CHAT', 'EMBED', 'COMPLETION', 'SUMMARY']);
export const AIInteractionStatus = z.enum(['OK', 'ERROR']);

export type SessionStatus = z.infer<typeof SessionStatus>;
export type ParticipantRole = z.infer<typeof ParticipantRole>;
export type ParticipantStatus = z.infer<typeof ParticipantStatus>;
export type ReservationStatus = z.infer<typeof ReservationStatus>;
export type RoomStatus = z.infer<typeof RoomStatus>;
export type AIProvider = z.infer<typeof AIProvider>;
export type AIInteractionKind = z.infer<typeof AIInteractionKind>;
export type AIInteractionStatus = z.infer<typeof AIInteractionStatus>;

// Base Schemas (DDL 테이블 구조 기반)
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

export const ProgramParticipantSchema = z.object({
  id: z.string(),
  session_id: z.string(),
  user_id: z.string(),
  role: ParticipantRole.default('ATTENDEE'),
  status: ParticipantStatus.default('APPLIED'),
  joined_at: z.date(),
});

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

// CRUD Schemas
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

export const UpdateSessionSchema = z.object({
  starts_at: z.string().datetime().optional(),
  ends_at: z.string().datetime().optional(),
  capacity: z.number().int().min(1).optional(),
  participant_fee: z.number().int().min(0).optional(),
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

export const UpdateRoomReservationSchema = z.object({
  starts_at: z.string().datetime().optional(),
  ends_at: z.string().datetime().optional(),
  purpose: z.string().optional(),
  status: ReservationStatus.optional(),
  meta: z.record(z.unknown()).optional(),
});

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

// Query Schemas
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

// Response Schemas
export const PaginationSchema = z.object({
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
  pages: z.number().int().min(0),
});

export const SessionListResponseSchema = z.object({
  sessions: z.array(SessionSchema),
  pagination: PaginationSchema,
});

export const ParticipantListResponseSchema = z.object({
  participants: z.array(ProgramParticipantSchema),
  pagination: PaginationSchema,
});

export const RoomReservationListResponseSchema = z.object({
  reservations: z.array(RoomReservationSchema),
  pagination: PaginationSchema,
});

export const AIInteractionListResponseSchema = z.object({
  interactions: z.array(AIInteractionSchema),
  pagination: PaginationSchema,
});

// Extended Response Schemas
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

export const ParticipantWithDetailsSchema = ProgramParticipantSchema.extend({
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
  }),
  session: SessionSchema,
});

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

// Stats Schemas
export const SessionStatsSchema = z.object({
  session_id: z.string(),
  total_participants: z.number().int().min(0),
  confirmed_participants: z.number().int().min(0),
  no_show_count: z.number().int().min(0),
  attendance_rate: z.number().min(0).max(100),
  revenue: z.number().min(0),
});

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

// Type Exports
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

// Helper Functions
export function isSessionAvailable(session: Session): boolean {
  return session.status === 'SCHEDULED' || session.status === 'CONFIRMED';
}

export function isSessionFull(session: SessionWithParticipants): boolean {
  return session.capacity !== null && session.current_participants >= session.capacity;
}

export function canJoinSession(session: SessionWithParticipants): boolean {
  return isSessionAvailable(session) && !isSessionFull(session);
}

export function isParticipantConfirmed(participant: ProgramParticipant): boolean {
  return participant.status === 'CONFIRMED';
}

export function isSessionHost(participant: ProgramParticipant): boolean {
  return participant.role === 'HOST';
}

export function getSessionDurationMinutes(session: Session): number {
  const start = new Date(session.starts_at);
  const end = new Date(session.ends_at);
  return (end.getTime() - start.getTime()) / (1000 * 60);
}

export function getAvailableSlots(session: SessionWithParticipants): number {
  if (!session.capacity) return Infinity;
  return Math.max(0, session.capacity - session.current_participants);
}

export function calculateSessionRevenue(session: SessionWithParticipants): number {
  const confirmedCount = session.participants.filter(p => p.status === 'CONFIRMED').length;
  return (session.participant_fee || 0) * confirmedCount;
}

export function canCancelSession(session: Session): boolean {
  const now = new Date();
  const sessionStart = new Date(session.starts_at);
  const hoursUntilStart = (sessionStart.getTime() - now.getTime()) / (1000 * 60 * 60);

  return (
    (session.status === 'SCHEDULED' || session.status === 'CONFIRMED') && hoursUntilStart >= 24 // 24시간 전까지만 취소 가능
  );
}

export function isReservationOverlapping(
  reservation1: { starts_at: Date; ends_at: Date },
  reservation2: { starts_at: Date; ends_at: Date },
): boolean {
  return (
    reservation1.starts_at < reservation2.ends_at && reservation2.starts_at < reservation1.ends_at
  );
}

export function getReservationStatusMessage(status: ReservationStatus): string {
  const messages = {
    PENDING: '승인 대기',
    CONFIRMED: '확정됨',
    CANCELLED: '취소됨',
    COMPLETED: '완료됨',
  };
  return messages[status];
}

export function getParticipantStatusMessage(status: ParticipantStatus): string {
  const messages = {
    APPLIED: '신청함',
    CONFIRMED: '확정됨',
    CANCELLED: '취소함',
    NO_SHOW: '불참',
  };
  return messages[status];
}

// AI Interaction Helpers
export function calculateTokenCost(
  provider: AIProvider,
  model: string,
  promptTokens: number,
  completionTokens: number,
): number {
  // 간단한 토큰 비용 계산 (실제로는 더 복잡함)
  const rates = {
    OPENAI: { prompt: 0.001, completion: 0.002 }, // GPT-4 기준
    ANTHROPIC: { prompt: 0.0008, completion: 0.0024 }, // Claude 기준
    GOOGLE: { prompt: 0.00025, completion: 0.0005 },
    HUGGINGFACE: { prompt: 0.0001, completion: 0.0002 },
  };

  const rate = rates[provider] || rates.OPENAI;
  return (promptTokens * rate.prompt + completionTokens * rate.completion) / 1000;
}

export function getAIProviderDisplayName(provider: AIProvider): string {
  const names = {
    OPENAI: 'OpenAI',
    ANTHROPIC: 'Anthropic',
    GOOGLE: 'Google AI',
    HUGGINGFACE: 'Hugging Face',
  };
  return names[provider];
}

export function formatTokenCount(tokens: number): string {
  if (tokens < 1000) return `${tokens}`;
  if (tokens < 1000000) return `${(tokens / 1000).toFixed(1)}K`;
  return `${(tokens / 1000000).toFixed(1)}M`;
}

// Validation Helpers
export function validateCreateSession(data: unknown) {
  return CreateSessionSchema.safeParse(data);
}

export function validateCreateParticipant(data: unknown) {
  return CreateParticipantSchema.safeParse(data);
}

export function validateCreateRoomReservation(data: unknown) {
  return CreateRoomReservationSchema.safeParse(data);
}

export function validateSessionQuery(data: unknown) {
  return SessionQuerySchema.safeParse(data);
}

// Time Validation Helpers
export function isValidTimeSlot(startsAt: Date, endsAt: Date): boolean {
  return endsAt > startsAt;
}

export function isBusinessHours(datetime: Date): boolean {
  const hour = datetime.getHours();
  const day = datetime.getDay();
  return day >= 1 && day <= 5 && hour >= 9 && hour <= 18; // 평일 9-18시
}

export function formatTimeSlot(startsAt: Date, endsAt: Date): string {
  const start = startsAt.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  const end = endsAt.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  return `${start} - ${end}`;
}

// Constants
export const DEFAULT_SESSION_SETTINGS = {
  status: 'SCHEDULED' as SessionStatus,
  capacity: 30,
  participant_fee: 0,
};

export const DEFAULT_RESERVATION_SETTINGS = {
  status: 'PENDING' as ReservationStatus,
};

export const AI_TOKEN_LIMITS = {
  MAX_PROMPT_TOKENS: 50000,
  MAX_COMPLETION_TOKENS: 10000,
  DAILY_COST_LIMIT: 100, // $100
} as const;
