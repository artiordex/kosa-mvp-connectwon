/**
 * Description : cache.ts - 📌 캐시 시스템 포트 인터페이스
 * Author      : Shiwoo Min
 * Date        : 2025-09-10
 */

// Redis 기반 캐시 시스템 인터페이스 정의
export interface CacheService {
  // 기본 작업
  get<T = unknown>(key: string): Promise<T | null>;
  set<T = unknown>(key: string, value: T, ttlSeconds?: number): Promise<void>;
  delete(key: string): Promise<void>;
  exists(key: string): Promise<boolean>;

  // 만료 시간 관련
  expire(key: string, ttlSeconds: number): Promise<void>;
  ttl(key: string): Promise<number>;

  // 복수 키 작업
  mget<T = unknown>(keys: string[]): Promise<(T | null)[]>;
  mset<T = unknown>(keyValues: Record<string, T>, ttlSeconds?: number): Promise<void>;
  mdel(keys: string[]): Promise<number>;

  // 패턴 기반 작업
  keys(pattern: string): Promise<string[]>;
  deleteByPattern(pattern: string): Promise<number>;

  // 해시 작업
  hget<T = unknown>(key: string, field: string): Promise<T | null>;
  hset<T = unknown>(key: string, field: string, value: T): Promise<void>;
  hdel(key: string, field: string): Promise<void>;
  hgetall<T = unknown>(key: string): Promise<Record<string, T>>;
  hkeys(key: string): Promise<string[]>;

  // 리스트 작업
  lpush<T = unknown>(key: string, ...values: T[]): Promise<number>;
  rpush<T = unknown>(key: string, ...values: T[]): Promise<number>;
  lpop<T = unknown>(key: string): Promise<T | null>;
  rpop<T = unknown>(key: string): Promise<T | null>;
  lrange<T = unknown>(key: string, start: number, stop: number): Promise<T[]>;
  llen(key: string): Promise<number>;

  // 집합 작업
  sadd<T = unknown>(key: string, ...members: T[]): Promise<number>;
  srem<T = unknown>(key: string, ...members: T[]): Promise<number>;
  smembers<T = unknown>(key: string): Promise<T[]>;
  sismember<T = unknown>(key: string, member: T): Promise<boolean>;
  scard(key: string): Promise<number>;

  // 정렬된 집합 작업
  zadd(key: string, score: number, member: string): Promise<number>;
  zrem(key: string, ...members: string[]): Promise<number>;
  zrange(key: string, start: number, stop: number): Promise<string[]>;
  zrangebyscore(key: string, min: number, max: number): Promise<string[]>;
  zcard(key: string): Promise<number>;
  zscore(key: string, member: string): Promise<number | null>;

  // 원자적 작업
  incr(key: string): Promise<number>;
  decr(key: string): Promise<number>;
  incrby(key: string, increment: number): Promise<number>;
  decrby(key: string, decrement: number): Promise<number>;

  // 전체 관리
  flushall(): Promise<void>;
  ping(): Promise<string>;
  info(): Promise<string>;
}

// ============== 세션 캐시 ==============

export interface SessionCache {
  // 사용자 세션
  getUserSession(userId: string): Promise<UserSession | null>;
  setUserSession(userId: string, session: UserSession, ttlSeconds?: number): Promise<void>;
  deleteUserSession(userId: string): Promise<void>;

  // 인증번호
  getVerificationCode(email: string, purpose: string): Promise<VerificationCode | null>;
  setVerificationCode(
    email: string,
    purpose: string,
    code: VerificationCode,
    ttlSeconds?: number,
  ): Promise<void>;
  deleteVerificationCode(email: string, purpose: string): Promise<void>;

  // 임시 데이터
  getTempData<T = unknown>(key: string): Promise<T | null>;
  setTempData<T = unknown>(key: string, data: T, ttlSeconds?: number): Promise<void>;
  deleteTempData(key: string): Promise<void>;

  // 레이트 리미팅
  getRateLimit(identifier: string, action: string): Promise<RateLimitInfo>;
  incrementRateLimit(
    identifier: string,
    action: string,
    windowSeconds: number,
    maxAttempts: number,
  ): Promise<RateLimitResult>;
  resetRateLimit(identifier: string, action: string): Promise<void>;

  // 락 메커니즘
  acquireLock(resource: string, ttlSeconds: number): Promise<string | null>;
  releaseLock(resource: string, lockId: string): Promise<boolean>;
  renewLock(resource: string, lockId: string, ttlSeconds: number): Promise<boolean>;
}

// 캐시 관련 타입 정의
export interface UserSession {
  userId: string;
  email: string;
  name: string;
  roleFlags: number;
  lastActivity: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface VerificationCode {
  code: string;
  purpose: string;
  email: string;
  attempts: number;
  maxAttempts: number;
  createdAt: string;
  expiresAt: string;
}

export interface RateLimitInfo {
  current: number;
  max: number;
  windowStart: string;
  windowEnd: string;
  blocked: boolean;
}

export interface RateLimitResult {
  allowed: boolean;
  current: number;
  remaining: number;
  resetTime: string;
  retryAfter?: number;
}

// 캐시 통계
export interface CacheStats {
  hits: number;
  misses: number;
  hitRate: number;
  keyCount: number;
  usedMemory: number;
  maxMemory: number;
  evictedKeys: number;
  expiredKeys: number;
  connections: number;
}

// 캐시 키 네임스페이스
export class CacheKeys {
  static readonly USER_SESSION = (userId: string) => `session:user:${userId}`;
  static readonly VERIFICATION_CODE = (email: string, purpose: string) =>
    `verify:${purpose}:${email}`;
  static readonly TEMP_DATA = (key: string) => `temp:${key}`;
  static readonly RATE_LIMIT = (identifier: string, action: string) =>
    `rate:${action}:${identifier}`;
  static readonly LOCK = (resource: string) => `lock:${resource}`;
  static readonly PROGRAM_CACHE = (programId: string) => `program:${programId}`;
  static readonly SESSION_CACHE = (sessionId: string) => `session:${sessionId}`;
  static readonly USER_PREFERENCES = (userId: string) => `prefs:${userId}`;
  static readonly AI_CACHE = (key: string) => `ai:${key}`;
}
