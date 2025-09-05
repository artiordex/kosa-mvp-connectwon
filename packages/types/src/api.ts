/**
 * API 관련 타입 (api-contract에서 생성)
 */
import { z } from 'zod'
import type * as schemas from '@connectwon/api-contract'

// 사용자 관련 타입
export type User = z.infer<typeof schemas.UserSchema>
export type UpdateUserRequest = z.infer<typeof schemas.UpdateUserSchema>

// 인증 관련 타입
export type GoogleAuthUser = z.infer<typeof schemas.GoogleCallbackResponseSchema>
export type AuthError = z.infer<typeof schemas.AuthErrorSchema>

// 지점 관련 타입
export type Venue = z.infer<typeof schemas.VenueSchema>
export type CreateVenueRequest = z.infer<typeof schemas.CreateVenueSchema>
export type Room = z.infer<typeof schemas.RoomSchema>

// 프로그램 관련 타입
export type Program = z.infer<typeof schemas.ProgramSchema>
export type CreateProgramRequest = z.infer<typeof schemas.CreateProgramSchema>
export type ProgramListResponse = z.infer<typeof schemas.ProgramListResponseSchema>

// 예약 관련 타입
export type Session = z.infer<typeof schemas.SessionSchema>
export type CreateSessionRequest = z.infer<typeof schemas.CreateSessionSchema>
export type CreateReservationRequest = z.infer<typeof schemas.CreateReservationSchema>
export type ReservationResponse = z.infer<typeof schemas.ReservationResponseSchema>

// 결제 관련 타입
export type Payment = z.infer<typeof schemas.PaymentSchema>
export type CreatePaymentRequest = z.infer<typeof schemas.CreatePaymentSchema>
export type PaymentIntentResponse = z.infer<typeof schemas.PaymentIntentResponseSchema>

// 공통 타입
export type ErrorResponse = z.infer<typeof schemas.ErrorResponseSchema>
export type SuccessResponse = z.infer<typeof schemas.SuccessResponseSchema>
export type Pagination = z.infer<typeof schemas.PaginationSchema>
