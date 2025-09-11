/**
 * Description : index.ts - 📌 Zod 스키마 정의
 * Author : Shiwoo Min
 * Date : 2025-09-07
 */

import { z } from 'zod'

// 역할 및 상태 enum 스키마
export const UserRoleSchema = z.enum(['USER', 'PROGRAM_CREATOR', 'ADMIN'])
export const SessionStatusSchema = z.enum(['SCHEDULED', 'CONFIRMED', 'CANCELLED', 'COMPLETED'])
export const RoomStatusSchema = z.enum(['ACTIVE', 'INACTIVE', 'MAINTENANCE'])
export const ReservationStatusSchema = z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'])
export const ParticipantRoleSchema = z.enum(['HOST', 'ATTENDEE'])
export const ParticipantStatusSchema = z.enum(['APPLIED', 'CONFIRMED', 'CANCELLED', 'NO_SHOW'])

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
})

export const UpdateUserSchema = z.object({
  name: z.string().min(1).optional(),
  preferences: z.record(z.any()).optional(),
})

// 인증 관련 스키마
export const GoogleCallbackResponseSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  picture: z.string().url().optional(),
})

export const AuthErrorSchema = z.object({
  error: z.string(),
  message: z.string(),
  code: z.string().optional(),
})

// 지점/방 관련 스키마
export const VenueSchema = z.object({
  id: z.bigint(),
  name: z.string(),
  address: z.string().nullable(),
  openingHours: z.record(z.any()).nullable(),
  blackoutRules: z.record(z.any()).nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const CreateVenueSchema = z.object({
  name: z.string().min(1, '지점명은 필수입니다'),
  address: z.string().optional(),
  openingHours: z.record(z.string()).optional(),
  blackoutRules: z.record(z.any()).optional(),
})

export const RoomSchema = z.object({
  id: z.bigint(),
  venueId: z.bigint(),
  name: z.string(),
  capacity: z.number().int().positive().nullable(),
  status: RoomStatusSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
})

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
})

export const CreateProgramSchema = z.object({
  type: z.string().optional(),
  title: z.string().min(1, '프로그램 제목은 필수입니다'),
  description: z.string().optional(),
  aiSummaryTags: z.array(z.string()).optional(),
})

export const ProgramListResponseSchema = z.object({
  programs: z.array(ProgramSchema),
  hasNext: z.boolean(),
  nextCursor: z.string().optional(),
})

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
})

export const CreateSessionSchema = z.object({
  programId: z.bigint(),
  startsAt: z.date(),
  endsAt: z.date(),
  capacity: z.number().int().positive().optional(),
  participantFee: z.number().int().nonnegative().optional(),
  locationText: z.string().optional(),
})
.refine(data => data.endsAt > data.startsAt, {
  message: '종료 시간은 시작 시간보다 늦어야 합니다',
  path: ['endsAt']
})

// 예약 관련 스키마
export const CreateReservationSchema = z.object({
  roomId: z.bigint(),
  startsAt: z.date(),
  endsAt: z.date(),
  purpose: z.string().optional(),
})
.refine(data => data.endsAt > data.startsAt, {
  message: '종료 시간은 시작 시간보다 늦어야 합니다',
  path: ['endsAt']
})

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
})

// 결제 관련 스키마
export const PaymentSchema = z.object({
  id: z.bigint(),
  userId: z.bigint(),
  amount: z.number().int().positive(),
  method: z.enum(['CREDIT_CARD', 'BANK_TRANSFER', 'MOBILE_PAY', 'CASH']),
  status: z.enum(['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED', 'CANCELLED']),
  transactionId: z.string().nullable(),
  paymentData: z.record(z.any()).nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const CreatePaymentSchema = z.object({
  amount: z.number().int().positive(),
  method: z.enum(['CREDIT_CARD', 'BANK_TRANSFER', 'MOBILE_PAY', 'CASH']),
})

export const PaymentIntentResponseSchema = z.object({
  id: z.string(),
  clientSecret: z.string(),
  amount: z.number(),
  currency: z.string().default('KRW'),
  status: z.string(),
})

// 공통 응답 스키마
export const ErrorResponseSchema = z.object({
  success: z.literal(false),
  error: z.string(),
  message: z.string(),
  code: z.string().optional(),
  details: z.record(z.any()).optional(),
})

export const SuccessResponseSchema = z.object({
  success: z.literal(true),
  data: z.any(),
  message: z.string().optional(),
})

export const PaginationSchema = z.object({
  hasNext: z.boolean(),
  nextCursor: z.string().optional(),
  total: z.number().int().nonnegative().optional(),
})

// API 응답 래퍼 스키마
export const ApiResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.union([
    SuccessResponseSchema.extend({ data: dataSchema }),
    ErrorResponseSchema,
  ])

// 검증 헬퍼 함수
export function validateRequest<T extends z.ZodType>(
  schema: T,
  data: unknown
): z.infer<T> {
  return schema.parse(data)
}

export function validateOptionalRequest<T extends z.ZodType>(
  schema: T,
  data: unknown
): z.infer<T> | null {
  try {
    return schema.parse(data)
  } catch {
    return null
  }
}
