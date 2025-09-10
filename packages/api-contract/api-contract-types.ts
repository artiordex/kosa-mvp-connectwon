/**
 * Description : api-contract-types.ts - 📌 공통 API 타입 정의 (DB DDL 기반)
 * Author      : Shiwoo Min
 * Date        : 2025-09-10
 */

import { z } from 'zod';

// API 계층 BIGINT를 문자열로 노출(정확도 보장)
export const IdSchema = z.string().regex(/^\d+$/).brand<'Id'>();
export type Id = z.infer<typeof IdSchema>;

// RFC3339 타임스탬프
export const TimestampSchema = z.string().datetime();
export type Timestamp = z.infer<typeof TimestampSchema>;

// JSONB
export const JsonbSchema = z.record(z.unknown());
export type Jsonb = z.infer<typeof JsonbSchema>;

// 커서 페이지네이션 쿼리 파라미터
export const CursorPaginationQuerySchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sort: z.string().optional(),
  order: z.enum(['asc', 'desc']).default('desc'),
});
export type CursorPaginationQuery = z.infer<typeof CursorPaginationQuerySchema>;

export const CursorPaginationResponseSchema = z.object({
  next_cursor: z.string().nullable(),
  has_more: z.boolean(),
  limit: z.number(),
});
export type CursorPaginationResponse = z.infer<typeof CursorPaginationResponseSchema>;

// CursorPaginationResponseSchema 포함한 응답 래퍼
export const CursorPaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    success: z.literal(true),
    data: z.object({
      items: z.array(itemSchema),
      pagination: CursorPaginationResponseSchema,
    }),
    message: z.string().optional(),
    timestamp: TimestampSchema,
  });

export type CursorPaginatedResponse<T> = {
  success: true;
  data: {
    items: T[];
    pagination: CursorPaginationResponse;
  };
  message?: string;
  timestamp: Timestamp;
};

// API 성공 래퍼
export const ApiSuccessSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.literal(true),
    data: dataSchema,
    message: z.string().optional(),
    timestamp: TimestampSchema,
  });

// API 에러 래퍼
export const ApiErrorResponseSchema = z.object({
  success: z.literal(false),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.unknown().optional(),
  }),
  timestamp: TimestampSchema,
});
export type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>;

// API 성공/실패 통합 래퍼
export const ApiEnvelopeSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.union([ApiSuccessSchema(dataSchema), ApiErrorResponseSchema]);

export type ApiResponse<T> = {
  success: true;
  data: T;
  message?: string;
  timestamp: Timestamp;
};

// USERS
export const UserSchema = z.object({
  id: IdSchema,
  email: z.string().email().nullable(),                 // CITEXT UNIQUE
  name: z.string().nullable(),
  google_sub: z.string().nullable(),                    // TEXT UNIQUE
  last_login_at: TimestampSchema.nullable(),
  role_flags: z.number().int().default(0),
  // 선택 필드 + 기본값 의도면 optional+default 권장
  preferences: JsonbSchema.optional().default({}),
  created_at: TimestampSchema,
  updated_at: TimestampSchema,
});
export type User = z.infer<typeof UserSchema>;

// PROGRAMS
export const ProgramSchema = z.object({
  id: IdSchema,
  created_by_user_id: IdSchema,
  type: z.string().nullable(),
  title: z.string(),
  description: z.string().nullable(),
  ai_summary_tags: z.array(z.string()).optional().default([]),
  is_active: z.boolean().optional().default(true),
  created_at: TimestampSchema,
  updated_at: TimestampSchema,
});
export type Program = z.infer<typeof ProgramSchema>;

// SESSIONS
export const SessionStatusSchema = z.enum(['SCHEDULED', 'CONFIRMED', 'CANCELLED', 'COMPLETED']);
export const SessionSchema = z.object({
  id: IdSchema,
  program_id: IdSchema,
  starts_at: TimestampSchema,
  ends_at: TimestampSchema,
  capacity: z.number().int().positive().nullable(),
  participant_fee: z.coerce.number().int().min(0).nullable(),
  status: SessionStatusSchema.optional().default('SCHEDULED'),
  room_reservation_id: IdSchema.nullable(),
  location_text: z.string().nullable(),
  created_at: TimestampSchema,
  updated_at: TimestampSchema,
});
export type Session = z.infer<typeof SessionSchema>;

// VENUES
export const VenueSchema = z.object({
  id: IdSchema,
  name: z.string(),
  address: z.string().nullable(),
  opening_hours: JsonbSchema.nullable(),
  blackout_rules: JsonbSchema.nullable(),
  created_at: TimestampSchema,
  updated_at: TimestampSchema,
});
export type Venue = z.infer<typeof VenueSchema>;

// ROOMS
export const RoomStatusSchema = z.enum(['ACTIVE', 'INACTIVE', 'MAINTENANCE']);
export const RoomSchema = z.object({
  id: IdSchema,
  venue_id: IdSchema,
  name: z.string(),
  capacity: z.number().int().positive().nullable(),
  status: RoomStatusSchema.optional().default('ACTIVE'),
  created_at: TimestampSchema,
  updated_at: TimestampSchema,
});
export type Room = z.infer<typeof RoomSchema>;

// ROOM_RESERVATIONS
export const ReservationStatusSchema = z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']);
export const RoomReservationSchema = z.object({
  id: IdSchema,
  room_id: IdSchema,
  user_id: IdSchema.nullable(),
  starts_at: TimestampSchema,
  ends_at: TimestampSchema,
  purpose: z.string().nullable(),
  status: ReservationStatusSchema.optional().default('PENDING'),
  meta: JsonbSchema.optional().default({}),
  session_id: IdSchema.nullable(),
  created_at: TimestampSchema,
  updated_at: TimestampSchema,
});
export type RoomReservation = z.infer<typeof RoomReservationSchema>;

// PROGRAM_PARTICIPANTS
export const ParticipantRoleSchema = z.enum(['HOST', 'ATTENDEE']);
export const ParticipantStatusSchema = z.enum(['APPLIED', 'CONFIRMED', 'CANCELLED', 'NO_SHOW']);
export const ProgramParticipantSchema = z.object({
  id: IdSchema,
  session_id: IdSchema,
  user_id: IdSchema,
  role: ParticipantRoleSchema.optional().default('ATTENDEE'),
  status: ParticipantStatusSchema.optional().default('APPLIED'),
  joined_at: TimestampSchema.nullable(),
});
export type ProgramParticipant = z.infer<typeof ProgramParticipantSchema>;

// AI_INTERACTIONS
export const AIInteractionStatusSchema = z.enum(['OK', 'ERROR']);
export const AIInteractionSchema = z.object({
  id: IdSchema,
  user_id: IdSchema.nullable(),
  program_id: IdSchema.nullable(),
  session_id: IdSchema.nullable(),
  provider: z.string(),
  model: z.string(),
  kind: z.string(),
  prompt_tokens: z.coerce.number().int().min(0).optional().default(0),
  completion_tokens: z.coerce.number().int().min(0).optional().default(0),
  cost: z.coerce.number().min(0).optional().default(0),
  status: AIInteractionStatusSchema.optional().default('OK'),
  trace_id: z.string().nullable(),
  meta: JsonbSchema.optional().default({}),
  created_at: TimestampSchema,
});
export type AIInteraction = z.infer<typeof AIInteractionSchema>;

// 생성 DTO (id/생성·수정시각 제외)
export type CreateUser = Omit<User, 'id' | 'created_at' | 'updated_at'>;
export type CreateProgram = Omit<Program, 'id' | 'created_at' | 'updated_at'>;
export type CreateSession = Omit<Session, 'id' | 'created_at' | 'updated_at'>;
export type CreateVenue = Omit<Venue, 'id' | 'created_at' | 'updated_at'>;
export type CreateRoom = Omit<Room, 'id' | 'created_at' | 'updated_at'>;
export type CreateRoomReservation = Omit<RoomReservation, 'id' | 'created_at' | 'updated_at'>;
export type CreateProgramParticipant = Omit<ProgramParticipant, 'id'>;
export type CreateAIInteraction = Omit<AIInteraction, 'id' | 'created_at'>;

// 업데이트 DTO
export type UpdateUser = Partial<Omit<CreateUser, 'google_sub'>>;
export type UpdateProgram = Partial<CreateProgram>;
export type UpdateSession = Partial<CreateSession>;
export type UpdateVenue = Partial<CreateVenue>;
export type UpdateRoom = Partial<CreateRoom>;
export type UpdateRoomReservation = Partial<CreateRoomReservation>;
export type UpdateProgramParticipant = Partial<Omit<CreateProgramParticipant, 'session_id' | 'user_id'>>;


// 조회용 조인 타입
export type SessionWithProgram = Session & { program: Program };
export type SessionWithProgramAndVenue = Session & {
  program: Program;
  room_reservation?: RoomReservation & { room: Room & { venue: Venue } };
};

// 프로그램 생성자 정보 포함
export type ProgramWithCreator = Program & {
  created_by_user: Pick<User, 'id' | 'name' | 'email'>;
};

// 룸 + 장소 정보 포함
export type RoomWithVenue = Room & { venue: Venue };

// 세션 + 프로그램 + 참가자 정보 포함
export type SessionWithParticipants = Session & {
  program: Program;
  participants: (ProgramParticipant & {
    user: Pick<User, 'id' | 'name' | 'email'>;
  })[];
};

// 예약 + 룸 + 장소 + 예약자(사용자) + 세션 + 프로그램 정보 포함
export type RoomReservationWithDetails = RoomReservation & {
  room: Room & { venue: Venue };
  user?: Pick<User, 'id' | 'name' | 'email'>;
  session?: Session & { program: Program };
};

// HTTP 관련 공통 타입
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// 쿼리 파라미터
export type QueryParams = Record<string, string | number | boolean | undefined>;

// 인증된 사용자 정보 (JWT 페이로드)
export type AuthUser = Pick<User, 'id' | 'email' | 'name' | 'role_flags'>;

// Google OAuth 페이로드
export type GoogleOAuthPayload = {
  sub: string;
  email: string;
  name: string;
  picture?: string;
};

// 기타 유틸리티 타입
export type SessionAvailability = {
  session_id: Id;
  available_spots: number;
  is_full: boolean;
  waiting_list_count?: number;
};

// 특정 시간대에 예약 충돌이 있는지 확인 결과
export type RoomConflict = {
  room_id: Id;
  conflicting_reservations: Pick<RoomReservation, 'id' | 'starts_at' | 'ends_at' | 'purpose'>[];
  is_available: boolean;
};

// AI 사용 통계
export type AIUsageStats = {
  total_interactions: number;
  total_tokens: number;
  total_cost: number;
  by_provider: Record<
    string,
    { interactions: number; tokens: number; cost: number }
  >;
};
