/**
 * Description : cache.port.ts - 📌 캐시/세션/락/레이트리밋 포트 인터페이스
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */

/**
 * @description 범용 캐시 포트
 */
export interface CacheService {
  get<T = unknown>(key: string): Promise<T | null>;
  set<T = unknown>(key: string, value: T, ttlSeconds?: number): Promise<void>;
  delete(key: string): Promise<void>;
  exists(key: string): Promise<boolean>;
  expire(key: string, ttlSeconds: number): Promise<void>;
  ttl(key: string): Promise<number>;
  ping(): Promise<string>;
  info(): Promise<string>;
}

/**
 * @description 세션/코드/락/레이트리밋 전용 캐시 포트
 */
export interface SessionCache {
  // 사용자 세션
  getUserSession(userId: string): Promise<UserSession | null>;
  setUserSession(userId: string, session: UserSession, ttlSeconds?: number): Promise<void>;
  deleteUserSession(userId: string): Promise<void>;

  // 이메일 인증 코드
  getVerificationCode(email: string, purpose: string): Promise<VerificationCode | null>;
  setVerificationCode(email: string, purpose: string, code: VerificationCode, ttlSeconds?: number): Promise<void>;
  deleteVerificationCode(email: string, purpose: string): Promise<void>;

  // 임시 데이터
  getTempData<T = unknown>(key: string): Promise<T | null>;
  setTempData<T = unknown>(key: string, data: T, ttlSeconds?: number): Promise<void>;
  deleteTempData(key: string): Promise<void>;

  // 레이트리밋
  getRateLimit(identifier: string, action: string): Promise<RateLimitInfo>;
  incrementRateLimit(identifier: string, action: string, windowSeconds: number, maxAttempts: number): Promise<RateLimitResult>;
  resetRateLimit(identifier: string, action: string): Promise<void>;

  // 분산 락
  acquireLock(resource: string, ttlSeconds: number): Promise<string | null>;
  releaseLock(resource: string, lockId: string): Promise<boolean>;
  renewLock(resource: string, lockId: string, ttlSeconds: number): Promise<boolean>;
}

/**
 * @description 사용자 세션 페이로드
 */
export interface UserSession {
  userId: string;
  email: string;
  name: string;
  roleFlags: number;
  lastActivity: string;
  ipAddress?: string;
  userAgent?: string;
}

/**
 * @description 이메일 인증 코드
 */
export interface VerificationCode {
  code: string;
  purpose: string;
  email: string;
  attempts: number;
  maxAttempts: number;
  createdAt: string;
  expiresAt: string;
}

/**
 * @description 레이트리밋 상태
 */
export interface RateLimitInfo {
  current: number;
  max: number;
  windowStart: string;
  windowEnd: string;
  blocked: boolean;
}

/**
 * @description 레이트리밋 결과
 */
export interface RateLimitResult {
  allowed: boolean;
  current: number;
  remaining: number;
  resetTime: string;
  retryAfter?: number;
}

/**
 * @description 캐시 키 네임스페이스
 */
export class CacheKeys {
  static readonly USER_SESSION = (userId: string) => `session:user:${userId}`;
  static readonly VERIFICATION_CODE = (email: string, purpose: string) => `verify:${purpose}:${email}`;
  static readonly TEMP_DATA = (key: string) => `temp:${key}`;
  static readonly RATE_LIMIT = (identifier: string, action: string) => `rate:${action}:${identifier}`;
  static readonly LOCK = (resource: string) => `lock:${resource}`;
}
