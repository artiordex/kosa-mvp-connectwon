/**
 * Description : nest-types.ts - 📌 Nest/Next 서버 공용 타입 모음
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

// 표준화된 JWT 클레임 셋 (필드 최소화)
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

export interface CurrentUserOptions {
  required?: boolean;
  assertRole?: UserRole | UserRole[];
}

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

// 추적/페이지네이션 등 응답 메타데이터
export interface ResponseMeta {
  requestId?: string;
  traceId?: string;
  elapsedMs?: number;
  page?: number;
  pageSize?: number;
  totalItems?: number;
  totalPages?: number;
  [key: string]: unknown;
}

// 성공/실패 분리 타입
export type ApiSuccess<T> = { success: true; data: T; meta?: ResponseMeta };
export type ApiError<E extends ErrorBody = ErrorBody> = {
  success: false;
  error: E;
  meta?: ResponseMeta;
};

// 통합 래퍼
export type ApiResponse<T, E extends ErrorBody = ErrorBody> = ApiSuccess<T> | ApiError<E>;

// 런타임 타입가드
export function isApiSuccess<T, E extends ErrorBody = ErrorBody>(
  r: ApiResponse<T, E>,
): r is ApiSuccess<T> {
  return (r as any)?.success === true;
}
export function isApiError<T, E extends ErrorBody = ErrorBody>(
  r: ApiResponse<T, E>,
): r is ApiError<E> {
  return (r as any)?.success === false;
}

// 간단한 생성 헬퍼
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

// 페이지네이션 메타/결과 타입
export interface PageMeta {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
export interface Paginated<T> {
  items: T[];
  meta: PageMeta;
}
export interface CursorPage<T> {
  items: T[];
  nextCursor?: string;
  hasMore: boolean;
}

// 기본 페이지 사이즈
export const DEFAULT_PAGE_SIZE = 20;

// 페이지 메타 계산
export function makePageMeta(totalItems: number, page = 1, pageSize = DEFAULT_PAGE_SIZE): PageMeta {
  const totalPages = Math.max(1, Math.ceil(Math.max(0, totalItems) / Math.max(1, pageSize)));
  return { page: Math.max(1, page), pageSize: Math.max(1, pageSize), totalItems, totalPages };
}

// Paginated 헬퍼
export function paginate<T>(
  items: T[],
  totalItems: number,
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
): Paginated<T> {
  return { items, meta: makePageMeta(totalItems, page, pageSize) };
}

// 목록 조회 공통 쿼리 DTO(서버/클라 공유)
export interface PageQuery {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
export interface CursorQuery {
  cursor?: string;
  limit?: number;
}

// Result<T, E> 타입 및 헬퍼
export type Ok<T> = { ok: true; value: T };
export type Err<E = ErrorBody> = { ok: false; error: E };
export type Result<T, E = ErrorBody> = Ok<T> | Err<E>;
export const isOk = <T, E = ErrorBody>(r: Result<T, E>): r is Ok<T> => (r as any)?.ok === true;
export const isErr = <T, E = ErrorBody>(r: Result<T, E>): r is Err<E> => (r as any)?.ok === false;
export const Ok = <T>(value: T): Ok<T> => ({ ok: true, value });
export const Err = <E = ErrorBody>(error: E): Err<E> => ({ ok: false, error });

// 요청/로깅 공통 타입
export interface RequestWithUser {
  user?: SessionUser;
  headers?: Record<string, string | string[] | undefined>;
  method?: HttpMethod;
  url?: string;
  [key: string]: unknown;
}

// HTTP 메서드 타입
export type HttpMethod =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'OPTIONS'
  | 'get'
  | 'head'
  | 'post'
  | 'put'
  | 'patch'
  | 'delete'
  | 'options';

// HTTP 헤더 타입
export type HeadersLike = Record<string, string | string[] | undefined>;

// 로깅 컨텍스트 타입
export interface LogContext {
  service?: string;
  requestId?: string;
  traceId?: string;
  spanId?: string;
  userId?: string;
  [k: string]: unknown;
}

// 단일 역할 보유 여부
export function hasRole(target: RoleSet | undefined, role: UserRole): boolean {
  if (!target) return false;
  return Array.isArray(target)
    ? target.includes(role)
    : (target as ReadonlySet<UserRole>).has(role);
}

// any 역할 매칭
export function hasAnyRole(target: RoleSet | undefined, roles: ReadonlyArray<UserRole>): boolean {
  return roles.some(r => hasRole(target, r));
}

// all 역할 매칭
export function hasAllRoles(target: RoleSet | undefined, roles: ReadonlyArray<UserRole>): boolean {
  return roles.every(r => hasRole(target, r));
}

// JSON/문자열/ID 유틸 타입
export type ID = string;
export type ISODateTime = string; // e.g. 2025-09-11T19:23:00.000Z
export type UnixMs = number; // Date.now()
export type Email = string;
// JSON-serializable 타입
export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;
export interface JsonObject {
  [k: string]: JsonValue;
}
export type JsonArray = JsonValue[];
export type JsonMap<T> = { [k: string]: T };
// 널/언디파인드 허용
export type Maybe<T> = T | null | undefined;
export type MaybePromise<T> = T | Promise<T>;
export type ValueOf<T> = T[keyof T];
export type NonEmptyArray<T> = [T, ...T[]];
export type OneOrMany<T> = T | T[];

// 속성 일부만 Optional/Required 로 바꾸기
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

// 깊은 Partial
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

// 브랜딩/불투명 타입
export type Brand<T, B extends string> = T & { readonly __brand: B };
export type Opaque<T, B extends string> = Brand<T, B>;
export type Prettify<T> = { [K in keyof T]: T[K] } & {};

// 안전한 assert/never 유틸
export function invariant(condition: unknown, message = 'Invariant failed'): asserts condition {
  if (!condition) throw new Error(message);
}

// 절대 도달하지 않는 지점에서 사용
export function assertNever(x: never, msg = 'Unexpected object'): never {
  throw new Error(`${msg}: ${String(x)}`);
}

// 표준화된 응답 메타데이터 헤더 키
export const RESPONSE_META_HEADER = {
  requestId: 'x-request-id',
  traceId: 'x-trace-id',
  elapsedMs: 'x-response-time',
} as const;
