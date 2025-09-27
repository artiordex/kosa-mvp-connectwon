/**
 * Description : server-types.ts - 📌 Nest 서버 공용 타입 모음
 * Author : Shiwoo Min
 * Date : 2025-09-11
 */
import type { Request } from 'express';

// 사용자 역할 타입
export type UserRole = 'admin' | 'creator' | 'user';

// 가드 메타데이터 키
export const META_ROLES_KEY = 'connectwon:roles' as const;

export type RoleSet = ReadonlyArray<UserRole> | ReadonlySet<UserRole>;

// 사용자/세션 관련 타입
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

export interface AuthContext {
  user?: SessionUser;
  token?: string;
  requestId?: string;
  ip?: string;
  userAgent?: string;
}

// JWT Claims
export interface JwtClaims extends Record<string, unknown> {
  sub: string;
  email?: string;
  name?: string;
  roles?: UserRole[];
  iat?: number;
  exp?: number;
  nbf?: number;
  iss?: string;
  aud?: string | string[];
}

// API 응답/에러 모델
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

export interface ResponseMeta {
  requestId?: string;
  traceId?: string;
  elapsedMs?: number;
  [key: string]: unknown;
}

export type ApiSuccess<T> = { success: true; data: T; meta?: ResponseMeta };
export type ApiError<E extends ErrorBody = ErrorBody> = { success: false; error: E; meta?: ResponseMeta };
export type ApiResponse<T, E extends ErrorBody = ErrorBody> = ApiSuccess<T> | ApiError<E>;

export function isApiSuccess<T, E extends ErrorBody = ErrorBody>(r: ApiResponse<T, E>): r is ApiSuccess<T> {
  return (r as any)?.success === true;
}

export function isApiError<T, E extends ErrorBody = ErrorBody>(r: ApiResponse<T, E>): r is ApiError<E> {
  return (r as any)?.success === false;
}

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
export type HttpMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS';
export type HeadersLike = Record<string, string | string[] | undefined>;

/**
 * 프레임워크 독립 LightRequest (테스트/추상화용)
 */
export interface LightRequest {
  user?: SessionUser;
  headers?: HeadersLike;
  method?: HttpMethod;
  url?: string;
  [key: string]: unknown;
}

/**
 * Express 기반 Request 확장 (NestJS 실제 런타임에서 사용)
 */
export type RequestWithUser = Request & {
  user?: SessionUser;
};

// 로깅 컨텍스트
export interface LogContext {
  service?: string;
  requestId?: string;
  traceId?: string;
  userId?: string;
  [k: string]: unknown;
}

// 역할 체크 유틸
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

// 기타 유틸리티
export type ID = string;
export type Maybe<T> = T | null | undefined;
export type MaybePromise<T> = T | Promise<T>;

export function invariant(condition: unknown, message = 'Invariant failed'): asserts condition {
  if (!condition) throw new Error(message);
}

export const RESPONSE_META_HEADER = {
  requestId: 'x-request-id',
  traceId: 'x-trace-id',
  elapsedMs: 'x-response-time',
} as const;

// Cookie 관련 타입
// SameSite 쿠키 속성 타입
export type SameSite = 'lax' | 'strict' | 'none';

// 쿠키 옵션 인터페이스
export interface CookieOptions {
  path?: string;
  domain?: string;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: SameSite;
  maxAge?: number;
  expires?: Date;
  priority?: 'Low' | 'Medium' | 'High';
}

// Swagger 관련 타입
export interface SwaggerConfig {
  /** 문서 제목 */
  title: string;
  /** API 버전 */
  version: string;
  /** API 설명 (optional) */
  description?: string;
  /** CI/CD 시 OpenAPI JSON export 경로 (optional) */
  outputFile?: string;
  /** 태그 목록 */
  tags?: string[];
}

// AI 관련 Core Types
export type AIRole = 'system' | 'user' | 'assistant';

export interface AIMessage {
  role: AIRole;
  content: string;
}

export interface AIChatParams {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
}

export interface AIChatInput {
  messages: AIMessage[];
  system?: string;
  params?: AIChatParams;
}

export interface AIUsage {
  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
  costUSD?: number;
}

export type FinishReason = 'stop' | 'length' | 'content_filter' | 'tool_calls' | string | undefined;

export interface AIChatResult {
  content: string;
  finishReason?: FinishReason;
  usage?: AIUsage;
  raw?: unknown;
}
