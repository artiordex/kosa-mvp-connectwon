/**
 * Description : server-types.ts - 📌 Nest 서버 공용 타입 모음
 * Author : Shiwoo Min
 * Date : 2025-09-11
 */

// 사용자 역할 타입
export type UserRole = 'admin' | 'creator' | 'user';

// 런타임에서도 안전한 역할 상수
export const Roles = {
  Admin: 'admin',
  Creator: 'creator',
  User: 'user',
} as const;

// 역할 셋 표현
export type RoleSet = ReadonlyArray<UserRole> | ReadonlySet<UserRole>;

// 세션에 주입/전파되는 표준 사용자 페이로드
export interface SessionUser {
  id: string;
  email: string;
  name?: string;
  roles: UserRole[];
  pictureUrl?: string;
  tenantId?: string;
  locale?: string;
  metadata?: Record<string, unknown>;
}

// 요청 처리 중 참조되는 인증 컨텍스트
export interface AuthContext {
  user?: SessionUser;
  token?: string;
  requestId?: string;
  ip?: string;
  userAgent?: string;
}

// 표준화된 JWT 클레임 셋
export interface JwtClaims extends Record<string, unknown> {
  sub: string; // subject = userId
  email?: string;
  name?: string;
  roles?: UserRole[];
  iat?: number;
  exp?: number;
  nbf?: number;
  iss?: string;
  aud?: string | string[];
}

// 역할 가드 메타데이터 키
export const META_ROLES_KEY = 'connectwon:roles' as const;

// API 표준 응답/에러 모델
export type ErrorCode =
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'RATE_LIMITED'
  | 'INTERNAL'
  | 'VALIDATION';

export interface ErrorBody {
  code: ErrorCode;
  message: string;
  details?: unknown;
}

// 응답 메타데이터
export interface ResponseMeta {
  requestId?: string;
  traceId?: string;
  elapsedMs?: number;
  [key: string]: unknown;
}

// API 응답 타입
export type ApiSuccess<T> = { success: true; data: T; meta?: ResponseMeta };
export type ApiError<E extends ErrorBody = ErrorBody> = { success: false; error: E; meta?: ResponseMeta };
export type ApiResponse<T, E extends ErrorBody = ErrorBody> = ApiSuccess<T> | ApiError<E>;

// 런타임 타입가드
export function isApiSuccess<T, E extends ErrorBody = ErrorBody>(r: ApiResponse<T, E>): r is ApiSuccess<T> {
  return (r as any)?.success === true;
}

export function isApiError<T, E extends ErrorBody = ErrorBody>(r: ApiResponse<T, E>): r is ApiError<E> {
  return (r as any)?.success === false;
}

// 응답 생성 헬퍼
export const ok = <T>(data: T, meta?: ResponseMeta): ApiSuccess<T> => ({
  success: true as const,
  data,
  ...(meta !== undefined ? { meta } : {}),
});

export const fail = <E extends ErrorBody>(error: E, meta?: ResponseMeta): ApiError<E> => ({
  success: false as const,
  error,
  ...(meta !== undefined ? { meta } : {}),
});

// 요청 타입
export interface RequestWithUser {
  user?: SessionUser;
  headers?: Record<string, string | string[] | undefined>;
  method?: HttpMethod;
  url?: string;
  [key: string]: unknown;
}

// HTTP 메서드 타입
export type HttpMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS';

// HTTP 헤더 타입
export type HeadersLike = Record<string, string | string[] | undefined>;

// 로깅 컨텍스트 타입
export interface LogContext {
  service?: string;
  requestId?: string;
  traceId?: string;
  userId?: string;
  [k: string]: unknown;
}

// 역할 체크 헬퍼
export function hasRole(target: RoleSet | undefined, role: UserRole): boolean {
  if (!target) return false;
  return Array.isArray(target)
    ? target.includes(role)
    : (target as ReadonlySet<UserRole>).has(role);
}

export function hasAnyRole(target: RoleSet | undefined, roles: ReadonlyArray<UserRole>): boolean {
  return roles.some(r => hasRole(target, r));
}

export function hasAllRoles(target: RoleSet | undefined, roles: ReadonlyArray<UserRole>): boolean {
  return roles.every(r => hasRole(target, r));
}

// 유틸리티 타입
export type ID = string;
export type Maybe<T> = T | null | undefined;
export type MaybePromise<T> = T | Promise<T>;

// 안전한 assert 유틸
export function invariant(condition: unknown, message = 'Invariant failed'): asserts condition {
  if (!condition) throw new Error(message);
}

// 표준화된 응답 메타데이터 헤더 키
export const RESPONSE_META_HEADER = {
  requestId: 'x-request-id',
  traceId: 'x-trace-id',
  elapsedMs: 'x-response-time',
} as const;
