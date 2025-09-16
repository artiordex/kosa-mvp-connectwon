/**
 * Description : schemas/index.ts - 📌 통합 Zod 스키마 정의
 * Author : Shiwoo Min
 * Date : 2025-09-07
 */
import { z } from 'zod';

// 기본 타입 스키마
export const IdParamSchema = z.object({
  id: z.string().min(1, 'ID가 필요합니다'),
});

export const BigIntIdSchema = z.bigint();

// Enum 스키마
export const UserRoleSchema = z.enum(['USER', 'CREATOR', 'ADMIN']);
export const SessionStatusSchema = z.enum(['SCHEDULED', 'CONFIRMED', 'CANCELLED', 'COMPLETED']);
export const RoomStatusSchema = z.enum(['ACTIVE', 'INACTIVE', 'MAINTENANCE']);
export const ReservationStatusSchema = z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']);
export const ParticipantRoleSchema = z.enum(['HOST', 'ATTENDEE']);
export const ParticipantStatusSchema = z.enum(['APPLIED', 'CONFIRMED', 'CANCELLED', 'NO_SHOW']);

// 공통 응답 스키마
export const BaseErrorResponseSchema = z.object({
  success: z.literal(false),
  error: z.string(),
  message: z.string(),
  code: z.string().optional(),
  details: z.record(z.any()).optional(),
});

// 성공 응답 스키마
export const BaseSuccessResponseSchema = z.object({
  success: z.literal(true),
  message: z.string().optional(),
});

// API 전용 간단한 응답 스키마
export const SimpleErrorResponseSchema = z.object({
  error: z.string(),
  code: z.string().optional(),
  details: z.unknown().optional(),
});

// 간단한 성공 응답 스키마
export const SimpleSuccessResponseSchema = z.object({
  message: z.string(),
  data: z.unknown().optional(),
});

// 커서 기반 페이지네이션 (무한 스크롤용)
export const CursorPaginationSchema = z.object({
  hasNext: z.boolean(),
  nextCursor: z.string().optional(),
  total: z.number().int().nonnegative().optional(),
});

// 오프셋 기반 페이지네이션 (일반적인 페이지 번호용)
export const OffsetPaginationSchema = z.object({
  page: z.number().min(1),
  limit: z.number().min(1).max(100),
  total: z.number(),
  pages: z.number(),
});

// 검색 쿼리 스키마
export const SearchQuerySchema = z.object({
  search: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

// 사용자 관련 스키마
export const UserSchema = z.object({
  id: z.bigint(),
  email: z.string().email().nullable(),
  name: z.string().nullable(),
  googleSub: z.string().nullable(),
  lastLoginAt: z.date().nullable(),
  roleFlags: z.number().int().default(0),
  preferences: z.record(z.any()).default({}),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// 사용자 업데이트용 스키마
export const UpdateUserSchema = z.object({
  name: z.string().min(1).optional(),
  preferences: z.record(z.any()).optional(),
});

// 인증 관련 스키마
export const GoogleCallbackResponseSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  picture: z.string().url().optional(),
});

// 인증 에러 스키마
export const AuthErrorSchema = z.object({
  error: z.string(),
  message: z.string(),
  code: z.string().optional(),
});

// 지점/방 관련 스키마
export const VenueSchema = z.object({
  id: z.bigint(),
  name: z.string(),
  address: z.string().nullable(),
  openingHours: z.record(z.any()).nullable(),
  blackoutRules: z.record(z.any()).nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// 지점 생성용 스키마
export const CreateVenueSchema = z.object({
  name: z.string().min(1, '지점명은 필수입니다'),
  address: z.string().optional(),
  openingHours: z.record(z.string()).optional(),
  blackoutRules: z.record(z.any()).optional(),
});

// 방 관련 스키마
export const RoomSchema = z.object({
  id: z.bigint(),
  venueId: z.bigint(),
  name: z.string(),
  capacity: z.number().int().positive().nullable(),
  status: RoomStatusSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});

// 프로그램 관련 스키마
export const ProgramSchema = z.object({
  id: z.bigint(),
  createdByUserId: z.bigint(),
  type: z.string().nullable(),
  title: z.string(),
  description: z.string().nullable(),
  aiSummaryTags: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// 프로그램 생성용 스키마
export const CreateProgramSchema = z.object({
  type: z.string().optional(),
  title: z.string().min(1, '프로그램 제목은 필수입니다'),
  description: z.string().optional(),
  aiSummaryTags: z.array(z.string()).optional(),
});

// 프로그램 리스트 응답 스키마
export const ProgramListResponseSchema = z.object({
  programs: z.array(ProgramSchema),
  pagination: CursorPaginationSchema,
});

// 세션 관련 스키마
export const SessionSchema = z.object({
  id: z.bigint(),
  programId: z.bigint(),
  startsAt: z.date(),
  endsAt: z.date(),
  capacity: z.number().int().positive().nullable(),
  participantFee: z.number().int().nonnegative().nullable(),
  status: SessionStatusSchema,
  roomReservationId: z.bigint().nullable(),
  locationText: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// 세션 생성용 스키마
export const CreateSessionSchema = z
  .object({
    programId: z.bigint(),
    startsAt: z.date(),
    endsAt: z.date(),
    capacity: z.number().int().positive().optional(),
    participantFee: z.number().int().nonnegative().optional(),
    locationText: z.string().optional(),
  })
  .refine(data => data.endsAt > data.startsAt, {
    message: '종료 시간은 시작 시간보다 늦어야 합니다',
    path: ['endsAt'],
  });

// 예약 관련 스키마
export const CreateReservationSchema = z
  .object({
    roomId: z.bigint(),
    startsAt: z.date(),
    endsAt: z.date(),
    purpose: z.string().optional(),
  })
  .refine(data => data.endsAt > data.startsAt, {
    message: '종료 시간은 시작 시간보다 늦어야 합니다',
    path: ['endsAt'],
  });

// 예약 응답 스키마
export const ReservationResponseSchema = z.object({
  id: z.bigint(),
  roomId: z.bigint(),
  userId: z.bigint().nullable(),
  startsAt: z.date(),
  endsAt: z.date(),
  purpose: z.string().nullable(),
  status: ReservationStatusSchema,
  meta: z.record(z.any()),
  sessionId: z.bigint().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// 결제 관련 스키마
export const PaymentMethodSchema = z.enum(['CREDIT_CARD', 'BANK_TRANSFER', 'MOBILE_PAY', 'CASH']);
export const PaymentStatusSchema = z.enum([
  'PENDING',
  'COMPLETED',
  'FAILED',
  'REFUNDED',
  'CANCELLED',
]);

// 결제 스키마
export const PaymentSchema = z.object({
  id: z.bigint(),
  userId: z.bigint(),
  amount: z.number().int().positive(),
  method: PaymentMethodSchema,
  status: PaymentStatusSchema,
  transactionId: z.string().nullable(),
  paymentData: z.record(z.any()).nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// 결제 생성용 스키마
export const CreatePaymentSchema = z.object({
  amount: z.number().int().positive(),
  method: PaymentMethodSchema,
});

// 결제 인텐트 응답 스키마
export const PaymentIntentResponseSchema = z.object({
  id: z.string(),
  clientSecret: z.string(),
  amount: z.number(),
  currency: z.string().default('KRW'),
  status: z.string(),
});

// 제네릭 리스트 응답 스키마
export const ListResponseSchema = <T extends z.ZodType>(itemSchema: T) =>
  z.object({
    items: z.array(itemSchema),
    pagination: CursorPaginationSchema,
  });

  // 페이징 리스트 응답 스키마
export const PagedListResponseSchema = <T extends z.ZodType>(itemSchema: T) =>
  z.object({
    items: z.array(itemSchema),
    pagination: OffsetPaginationSchema,
  });

// 특화된 리스트 응답 스키마
export const UserListResponseSchema = z.object({
  items: z.array(UserSchema),
  pagination: CursorPaginationSchema,
});

// 지점 리스트 응답 스키마
export const VenueListResponseSchema = z.object({
  items: z.array(VenueSchema),
  pagination: CursorPaginationSchema,
});

// 방 리스트 응답 스키마
export const RoomListResponseSchema = z.object({
  items: z.array(RoomSchema),
  pagination: CursorPaginationSchema,
});

// 세션 리스트 응답 스키마
export const SessionListResponseSchema = z.object({
  items: z.array(SessionSchema),
  pagination: CursorPaginationSchema,
});

// 결제 리스트 응답 스키마
export const PaymentListResponseSchema = z.object({
  items: z.array(PaymentSchema),
  pagination: CursorPaginationSchema,
});

// 예약 리스트 응답 스키마
export const ReservationListResponseSchema = z.object({
  items: z.array(ReservationResponseSchema),
  pagination: CursorPaginationSchema,
});

// API 응답 래퍼 스키마
export const ApiResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.union([BaseSuccessResponseSchema.extend({ data: dataSchema }), BaseErrorResponseSchema]);

// 리퀘스트 검증 유틸리티
export function validateRequest<T extends z.ZodType>(schema: T, data: unknown): z.infer<T> {
  return schema.parse(data);
}

// 선택적 리퀘스트 검증 유틸리티
export function validateOptionalRequest<T extends z.ZodType>(
  schema: T,
  data: unknown,
): z.infer<T> | null {
  try {
    return schema.parse(data);
  } catch {
    return null;
  }
}

// 타입 변환 유틸리티
export function stringToBigInt(value: string): bigint {
  return BigInt(value);
}

// ID 파라미터 검증 헬퍼
export function bigIntToString(value: bigint): string {
  return value.toString();
}

// 타입 내보내기
export type IdParam = z.infer<typeof IdParamSchema>;
export type BigIntId = z.infer<typeof BigIntIdSchema>;
export type SearchQuery = z.infer<typeof SearchQuerySchema>;

// Enum 타입
export type UserRole = z.infer<typeof UserRoleSchema>;
export type SessionStatus = z.infer<typeof SessionStatusSchema>;
export type RoomStatus = z.infer<typeof RoomStatusSchema>;
export type ReservationStatus = z.infer<typeof ReservationStatusSchema>;
export type ParticipantRole = z.infer<typeof ParticipantRoleSchema>;
export type ParticipantStatus = z.infer<typeof ParticipantStatusSchema>;
export type PaymentMethod = z.infer<typeof PaymentMethodSchema>;
export type PaymentStatus = z.infer<typeof PaymentStatusSchema>;

// 공통 응답 타입
export type BaseErrorResponse = z.infer<typeof BaseErrorResponseSchema>;
export type BaseSuccessResponse = z.infer<typeof BaseSuccessResponseSchema>;
export type ErrorResponse = z.infer<typeof SimpleErrorResponseSchema>;
export type SuccessResponse = z.infer<typeof SimpleSuccessResponseSchema>;

// 페이지네이션 타입
export type CursorPagination = z.infer<typeof CursorPaginationSchema>;
export type OffsetPagination = z.infer<typeof OffsetPaginationSchema>;

// 엔티티 타입
export type User = z.infer<typeof UserSchema>;
export type UpdateUserRequest = z.infer<typeof UpdateUserSchema>;
export type Venue = z.infer<typeof VenueSchema>;
export type CreateVenueRequest = z.infer<typeof CreateVenueSchema>;
export type Room = z.infer<typeof RoomSchema>;
export type Program = z.infer<typeof ProgramSchema>;
export type CreateProgramRequest = z.infer<typeof CreateProgramSchema>;
export type ProgramListResponse = z.infer<typeof ProgramListResponseSchema>;
export type Session = z.infer<typeof SessionSchema>;
export type CreateSessionRequest = z.infer<typeof CreateSessionSchema>;
export type CreateReservationRequest = z.infer<typeof CreateReservationSchema>;
export type ReservationResponse = z.infer<typeof ReservationResponseSchema>;
export type Payment = z.infer<typeof PaymentSchema>;
export type CreatePaymentRequest = z.infer<typeof CreatePaymentSchema>;
export type PaymentIntentResponse = z.infer<typeof PaymentIntentResponseSchema>;

// 인증 타입
export type GoogleAuthUser = z.infer<typeof GoogleCallbackResponseSchema>;
export type AuthError = z.infer<typeof AuthErrorSchema>;

// 제네릭 타입
export type ListResponse<T> = {
  items: T[];
  pagination: CursorPagination;
};

// 페이징 리스트 응답 타입
export type PagedListResponse<T> = {
  items: T[];
  pagination: OffsetPagination;
};

// API 응답 타입
export type ApiResponse<T> = (BaseSuccessResponse & { data: T }) | BaseErrorResponse;

// 타입 내보내기
export type UserListResponse = z.infer<typeof UserListResponseSchema>;
export type VenueListResponse = z.infer<typeof VenueListResponseSchema>;
export type RoomListResponse = z.infer<typeof RoomListResponseSchema>;
export type SessionListResponse = z.infer<typeof SessionListResponseSchema>;
export type PaymentListResponse = z.infer<typeof PaymentListResponseSchema>;
export type ReservationListResponse = z.infer<typeof ReservationListResponseSchema>;
