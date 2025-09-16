/**
 * Description : api.ts - 📌 API 관련 스키마
 * Author : Shiwoo Min
 * Date : 2025-09-07
 */
import * as schemas from '../schemas/index.js';
import { z } from 'zod';

// 기본 타입
export type IdParam = z.infer<typeof schemas.IdParamSchema>;
export type SearchQuery = z.infer<typeof schemas.SearchQuerySchema>;

// 사용자 관련 타입
export type User = z.infer<typeof schemas.UserSchema>;
export type UpdateUserRequest = z.infer<typeof schemas.UpdateUserSchema>;
export type UserRole = z.infer<typeof schemas.UserRoleSchema>;

// 인증 관련 타입
export type GoogleAuthUser = z.infer<typeof schemas.GoogleCallbackResponseSchema>;
export type AuthError = z.infer<typeof schemas.AuthErrorSchema>;

// 지점/방 관련 타입
export type Venue = z.infer<typeof schemas.VenueSchema>;
export type CreateVenueRequest = z.infer<typeof schemas.CreateVenueSchema>;
export type Room = z.infer<typeof schemas.RoomSchema>;
export type RoomStatus = z.infer<typeof schemas.RoomStatusSchema>;

// 프로그램 관련 타입
export type Program = z.infer<typeof schemas.ProgramSchema>;
export type CreateProgramRequest = z.infer<typeof schemas.CreateProgramSchema>;
export type ProgramListResponse = z.infer<typeof schemas.ProgramListResponseSchema>;

// 세션 관련 타입
export type Session = z.infer<typeof schemas.SessionSchema>;
export type CreateSessionRequest = z.infer<typeof schemas.CreateSessionSchema>;
export type SessionStatus = z.infer<typeof schemas.SessionStatusSchema>;

// 예약 관련 타입
export type CreateReservationRequest = z.infer<typeof schemas.CreateReservationSchema>;
export type ReservationResponse = z.infer<typeof schemas.ReservationResponseSchema>;
export type ReservationStatus = z.infer<typeof schemas.ReservationStatusSchema>;

// 결제 관련 타입
export type Payment = z.infer<typeof schemas.PaymentSchema>;
export type CreatePaymentRequest = z.infer<typeof schemas.CreatePaymentSchema>;
export type PaymentIntentResponse = z.infer<typeof schemas.PaymentIntentResponseSchema>;
export type PaymentMethod = z.infer<typeof schemas.PaymentMethodSchema>;
export type PaymentStatus = z.infer<typeof schemas.PaymentStatusSchema>;

// 참가자 관련 타입
export type ParticipantRole = z.infer<typeof schemas.ParticipantRoleSchema>;
export type ParticipantStatus = z.infer<typeof schemas.ParticipantStatusSchema>;

// 공통 응답 타입
export type BaseErrorResponse = z.infer<typeof schemas.BaseErrorResponseSchema>;
export type BaseSuccessResponse = z.infer<typeof schemas.BaseSuccessResponseSchema>;
export type SimpleErrorResponse = z.infer<typeof schemas.SimpleErrorResponseSchema>;
export type SimpleSuccessResponse = z.infer<typeof schemas.SimpleSuccessResponseSchema>;

// 페이지네이션 타입
export type CursorPagination = z.infer<typeof schemas.CursorPaginationSchema>;
export type OffsetPagination = z.infer<typeof schemas.OffsetPaginationSchema>;

// API 응답 타입
export type ApiResponse<T> = (BaseSuccessResponse & { data: T }) | BaseErrorResponse;

// 제네릭 리스트 응답 타입
export type ListResponse<T> = {
  items: T[];
  pagination: CursorPagination;
};

// 오프셋 기반 리스트 응답 타입
export type PagedListResponse<T> = {
  items: T[];
  pagination: OffsetPagination;
};

// 특화된 응답 타입
export type UserListResponse = ListResponse<User>;
export type VenueListResponse = ListResponse<Venue>;
export type RoomListResponse = ListResponse<Room>;
export type SessionListResponse = ListResponse<Session>;
export type PaymentListResponse = ListResponse<Payment>;

// 유저 역할 타입
export type UserWithRoles = User & {
  roles: UserRole[];
};

// 프로그램 상세 정보 타입
export type SessionWithDetails = Session & {
  program: Program;
  room?: Room;
  venue?: Venue;
};

// 예약 상세 정보 타입
export type ReservationWithDetails = ReservationResponse & {
  room: Room;
  venue: Venue;
  session?: Session;
};

// 요청/응답 페어 인터페이스
export interface CreateUserFlow {
  request: UpdateUserRequest;
  response: ApiResponse<User>;
}

// 장소 생성 요청/응답 페어 인터페이스
export interface CreateVenueFlow {
  request: CreateVenueRequest;
  response: ApiResponse<Venue>;
}

// 방 생성 요청/응답 페어 인터페이스
export interface CreateProgramFlow {
  request: CreateProgramRequest;
  response: ApiResponse<Program>;
}

// 세션 생성 요청/응답 페어 인터페이스
export interface CreateSessionFlow {
  request: CreateSessionRequest;
  response: ApiResponse<Session>;
}

// 예약 생성 요청/응답 페어 인터페이스
export interface CreateReservationFlow {
  request: CreateReservationRequest;
  response: ApiResponse<ReservationResponse>;
}

// 결제 생성 요청/응답 페어 인터페이스
export interface CreatePaymentFlow {
  request: CreatePaymentRequest;
  response: ApiResponse<PaymentIntentResponse>;
}

// 공통 유틸리티 타입 및 함수
export type EntityId = string | bigint;
export type Timestamp = Date | string;

// ID 변환을 위한 타입 가드 (string)
export function isStringId(id: EntityId): id is string {
  return typeof id === 'string';
}

// ID 변환을 위한 타입 가드 (bigint)
export function isBigIntId(id: EntityId): id is bigint {
  return typeof id === 'bigint';
}

// 옵셔널 필드 타입
export type PartialUpdate<T> = {
  [P in keyof T]?: T[P];
};

// 특정 필드를 필수로 만드는 유틸리티 타입
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// 에러 타입 확장
export interface ValidationError extends BaseErrorResponse {
  code: 'VALIDATION_ERROR';
  details: {
    field: string;
    message: string;
  }[];
}

// 인증 및 권한 에러 타입
export interface AuthenticationError extends BaseErrorResponse {
  code: 'AUTHENTICATION_ERROR';
}

// 권한 없음 에러 타입
export interface AuthorizationError extends BaseErrorResponse {
  code: 'AUTHORIZATION_ERROR';
}

// 리소스 없음 에러 타입
export interface NotFoundError extends BaseErrorResponse {
  code: 'NOT_FOUND';
  details: {
    resource: string;
    id: EntityId;
  };
}

// 충돌 에러 타입
export interface ConflictError extends BaseErrorResponse {
  code: 'CONFLICT';
  details: {
    resource: string;
    conflict: string;
  };
}

// API 엔드포인트 타입
export type ApiEndpoint = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// API 라우트 정의 인터페이스
export interface ApiRoute {
  method: ApiEndpoint;
  path: string;
  description?: string;
}

// 쿼리 필터 타입
export interface BaseFilters {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// 특화된 필터 인터페이스
export interface UserFilters extends BaseFilters {
  role?: UserRole;
  isActive?: boolean;
}

// 장소 필터 인터페이스
export interface SessionFilters extends BaseFilters {
  status?: SessionStatus;
  programId?: bigint;
  venueId?: bigint;
  startDate?: Date;
  endDate?: Date;
}

// 방 필터 인터페이스
export interface ReservationFilters extends BaseFilters {
  status?: ReservationStatus;
  roomId?: bigint;
  userId?: bigint;
  startDate?: Date;
  endDate?: Date;
}
