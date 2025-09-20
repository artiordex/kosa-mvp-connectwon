/**
 * Description : api.ts - 📌 API 관련 스키마
 * Author : Shiwoo Min
 * Date : 2025-09-07
 */
import * as schemas from '../schemas/index.js';
import { z } from 'zod';

/**
 * @description 기본 타입들
 */
export type IdParam = z.infer<typeof schemas.IdParamSchema>;
export type SearchQuery = z.infer<typeof schemas.SearchQuerySchema>;

/**
 * @description 사용자 관련 타입
 */
export type User = z.infer<typeof schemas.UserSchema>;
export type UpdateUserRequest = z.infer<typeof schemas.UpdateUserSchema>;
export type UserRole = z.infer<typeof schemas.UserRoleSchema>;

/**
 * @description 인증 관련 타입
 */
export type GoogleAuthUser = z.infer<typeof schemas.GoogleCallbackResponseSchema>;
export type AuthError = z.infer<typeof schemas.AuthErrorSchema>;

/**
 * @description 지점/방 관련 타입
 */
export type Venue = z.infer<typeof schemas.VenueSchema>;
export type CreateVenueRequest = z.infer<typeof schemas.CreateVenueSchema>;
export type CreateRoomRequest = z.infer<typeof schemas.CreateRoomSchema>;
export type Room = z.infer<typeof schemas.RoomSchema>;
export type RoomStatus = z.infer<typeof schemas.RoomStatusSchema>;

/**
 * @description 프로그램 관련 타입
 */
export type Program = z.infer<typeof schemas.ProgramSchema>;
export type CreateProgramRequest = z.infer<typeof schemas.CreateProgramSchema>;
export type ProgramListResponse = z.infer<typeof schemas.ProgramListResponseSchema>;

/**
 * @description 세션 관련 타입
 */
export type Session = z.infer<typeof schemas.SessionSchema>;
export type CreateSessionRequest = z.infer<typeof schemas.CreateSessionSchema>;
export type SessionStatus = z.infer<typeof schemas.SessionStatusSchema>;

/**
 * @description 예약 관련 타입
 */
export type CreateReservationRequest = z.infer<typeof schemas.CreateReservationSchema>;
export type ReservationResponse = z.infer<typeof schemas.ReservationResponseSchema>;
export type ReservationStatus = z.infer<typeof schemas.ReservationStatusSchema>;

/**
 * @description 결제 관련 타입
 */
export type Payment = z.infer<typeof schemas.PaymentSchema>;
export type CreatePaymentRequest = z.infer<typeof schemas.CreatePaymentSchema>;
export type PaymentIntentResponse = z.infer<typeof schemas.PaymentIntentResponseSchema>;
export type PaymentMethod = z.infer<typeof schemas.PaymentMethodSchema>;
export type PaymentStatus = z.infer<typeof schemas.PaymentStatusSchema>;

/**
 * @description 참가자 관련 타입
 */
export type ParticipantRole = z.infer<typeof schemas.ParticipantRoleSchema>;
export type ParticipantStatus = z.infer<typeof schemas.ParticipantStatusSchema>;

/**
 * @description 공통 응답 타입
 */
export type BaseErrorResponse = z.infer<typeof schemas.BaseErrorResponseSchema>;
export type BaseSuccessResponse = z.infer<typeof schemas.BaseSuccessResponseSchema>;
export type SimpleErrorResponse = z.infer<typeof schemas.SimpleErrorResponseSchema>;
export type SimpleSuccessResponse = z.infer<typeof schemas.SimpleSuccessResponseSchema>;

/**
 * @description 페이지네이션 타입
 */
export type CursorPagination = z.infer<typeof schemas.CursorPaginationSchema>;
export type OffsetPagination = z.infer<typeof schemas.OffsetPaginationSchema>;

/**
 * @description API 응답 데이터 타입: 성공 및 실패 반환 타입
 */
export type ApiResponse<T> = (BaseSuccessResponse & { data: T }) | BaseErrorResponse;

/**
 * @description 제네릭 리스트 응답 타입 (커서 기반 페이지네이션)
 */
export type ListResponse<T> = {
  items: T[];
  pagination: CursorPagination;
};

/**
 * @description 오프셋 기반 리스트 응답 타입
 */
export type PagedListResponse<T> = {
  items: T[];
  pagination: OffsetPagination;
};

/**
 * @description 특화된 리스트 응답 타입들
 */
export type UserListResponse = ListResponse<User>;
export type VenueListResponse = ListResponse<Venue>;
export type RoomListResponse = ListResponse<Room>;
export type SessionListResponse = ListResponse<Session>;
export type PaymentListResponse = ListResponse<Payment>;

/**
 * @description 유저 역할 포함 타입
 */
export type UserWithRoles = User & {
  roles: UserRole[];
};

/**
 * @description 프로그램 상세 정보에 세션, 장소 포함 타입
 */
export type SessionWithDetails = Session & {
  program: Program;
  room?: Room;
  venue?: Venue;
};

/**
 * @description 예약 상세 정보에 세션 및 장소 포함 타입
 */
export type ReservationWithDetails = ReservationResponse & {
  room: Room;
  venue: Venue;
  session?: Session;
};

/**
 * @description 유저 생성/수정 플로우 타입
 */
export interface CreateUserFlow {
  request: UpdateUserRequest;
  response: ApiResponse<User>;
}

/**
 * @description 지점 생성 플로우 타입
 */
export interface CreateVenueFlow {
  request: CreateVenueRequest;
  response: ApiResponse<Venue>;
}

/**
 * @description 방 생성 플로우 타입
 */
export interface CreateRoomFlow {
  request: CreateRoomRequest;
  response: ApiResponse<Room>;
}

/**
 * @description 프로그램 생성 플로우 타입
 */
export interface CreateProgramFlow {
  request: CreateProgramRequest;
  response: ApiResponse<Program>;
}

/**
 * @description 세션 생성 플로우 타입
 */
export interface CreateSessionFlow {
  request: CreateSessionRequest;
  response: ApiResponse<Session>;
}

/**
 * @description 예약 생성 플로우 타입
 */
export interface CreateReservationFlow {
  request: CreateReservationRequest;
  response: ApiResponse<ReservationResponse>;
}

/**
 * @description 결제 생성 플로우 타입
 */
export interface CreatePaymentFlow {
  request: CreatePaymentRequest;
  response: ApiResponse<PaymentIntentResponse>;
}

/**
 * @description 공통 유틸리티 타입 정의들
 */
export type EntityId = string | bigint;
export type Timestamp = Date | string;

/**
 * @description ID가 string 타입인지 확인하는 타입 가드
 */
export function isStringId(id: EntityId): id is string {
  return typeof id === 'string';
}

/**
 * @description ID가 bigint 타입인지 확인하는 타입 가드
 */
export function isBigIntId(id: EntityId): id is bigint {
  return typeof id === 'bigint';
}

/**
 * @description 옵셔널 필드로 변환하는 유틸리티 타입
 */
export type PartialUpdate<T> = {
  [P in keyof T]?: T[P];
};

/**
 * @description 특정 필드를 필수로 만드는 유틸리티 타입
 */
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * @description 유효성 검사 에러 확장 타입
 */
export interface ValidationError extends BaseErrorResponse {
  code: 'VALIDATION_ERROR';
  details: {
    field: string;
    message: string;
  }[];
}

/**
 * @description 인증 실패 에러 타입
 */
export interface AuthenticationError extends BaseErrorResponse {
  code: 'AUTHENTICATION_ERROR';
}

/**
 * @description 권한 없음 에러 타입
 */
export interface AuthorizationError extends BaseErrorResponse {
  code: 'AUTHORIZATION_ERROR';
}

/**
 * @description 리소스 없음 에러 타입
 */
export interface NotFoundError extends BaseErrorResponse {
  code: 'NOT_FOUND';
  details: {
    resource: string;
    id: EntityId;
  };
}

/**
 * @description 충돌 에러 타입
 */
export interface ConflictError extends BaseErrorResponse {
  code: 'CONFLICT';
  details: {
    resource: string;
    conflict: string;
  };
}

/**
 * @description API 엔드포인트 메서드 타입
 */
export type ApiEndpoint = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * @description API 라우트 정의 인터페이스
 */
export interface ApiRoute {
  method: ApiEndpoint;
  path: string;
  description?: string;
}

/**
 * @description 기본 필터 쿼리 타입
 */
export interface BaseFilters {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * @description 사용자 필터 인터페이스
 */
export interface UserFilters extends BaseFilters {
  role?: UserRole;
  isActive?: boolean;
}

/**
 * @description 세션 필터 인터페이스
 */
export interface SessionFilters extends BaseFilters {
  status?: SessionStatus;
  programId?: bigint;
  venueId?: bigint;
  startDate?: Date;
  endDate?: Date;
}

/**
 * @description 예약 필터 인터페이스
 */
export interface ReservationFilters extends BaseFilters {
  status?: ReservationStatus;
  roomId?: bigint;
  userId?: bigint;
  startDate?: Date;
  endDate?: Date;
}
