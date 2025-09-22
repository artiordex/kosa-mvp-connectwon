/**
 * Description : cache.ts - 📌 Redis 기반 캐시 시스템 포트(Interface)와 관련 타입, 키 네임스페이스 정의
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */

/**
 * @description Redis-like 캐시 시스템 인터페이스
 */
export interface CacheService {
  /**
   * @description 키에 저장된 값을 조회
   * @template T 반환 타입
   * @param {string} key 캐시 키
   * @returns {Promise<T | null>} 값이 없으면 null
   */
  get<T = unknown>(key: string): Promise<T | null>;

  /**
   * @description 키에 값을 저장 (선택 TTL)
   * @template T 저장 타입
   * @param {string} key 캐시 키
   * @param {T} value 저장할 값
   * @param {number} [ttlSeconds] 만료(초)
   * @returns {Promise<void>}
   */
  set<T = unknown>(key: string, value: T, ttlSeconds?: number): Promise<void>;

  /**
   * @description 단일 키 삭제
   * @param {string} key 캐시 키
   * @returns {Promise<void>}
   */
  delete(key: string): Promise<void>;

  /**
   * @description 키 존재 여부
   * @param {string} key 캐시 키
   * @returns {Promise<boolean>} 존재하면 true
   */
  exists(key: string): Promise<boolean>;

  /**
   * @description TTL 설정/연장
   * @param {string} key 캐시 키
   * @param {number} ttlSeconds 만료(초)
   * @returns {Promise<void>}
   */
  expire(key: string, ttlSeconds: number): Promise<void>;

  /**
   * @description 남은 TTL 조회
   * @param {string} key 캐시 키
   * @returns {Promise<number>} 남은 초(없으면 -1/-2 구현체에 따름)
   */
  ttl(key: string): Promise<number>;

  /**
   * @description 여러 키 동시 조회
   * @template T 반환 타입
   * @param {string[]} keys 캐시 키 배열
   * @returns {Promise<(T | null)[]>} 각 키의 값 또는 null
   */
  mget<T = unknown>(keys: string[]): Promise<(T | null)[]>;

  /**
   * @description 여러 키 동시 저장
   * @template T 저장 타입
   * @param {Record<string, T>} keyValues 키-값 맵
   * @param {number} [ttlSeconds] 공통 TTL(초)
   * @returns {Promise<void>}
   */
  mset<T = unknown>(keyValues: Record<string, T>, ttlSeconds?: number): Promise<void>;

  /**
   * @description 여러 키 동시 삭제
   * @param {string[]} keys 캐시 키 배열
   * @returns {Promise<number>} 삭제된 키 개수
   */
  mdel(keys: string[]): Promise<number>;

  /**
   * @description 패턴으로 키 나열 (주의: 대량 키 환경에서 비용 큼)
   * @param {string} pattern 예: "user:*"
   * @returns {Promise<string[]>} 일치 키 목록
   */
  keys(pattern: string): Promise<string[]>;

  /**
   * @description 패턴으로 일괄 삭제
   * @param {string} pattern 예: "temp:*"
   * @returns {Promise<number>} 삭제 개수
   */
  deleteByPattern(pattern: string): Promise<number>;

  /**
   * @description 해시 필드 조회
   * @template T 반환 타입
   * @param {string} key 해시 키
   * @param {string} field 필드명
   * @returns {Promise<T | null>} 값 또는 null
   */
  hget<T = unknown>(key: string, field: string): Promise<T | null>;

  /**
   * @description 해시 필드 저장
   * @template T 저장 타입
   * @param {string} key 해시 키
   * @param {string} field 필드명
   * @param {T} value 값
   * @returns {Promise<void>}
   */
  hset<T = unknown>(key: string, field: string, value: T): Promise<void>;

  /**
   * @description 해시 필드 삭제
   * @param {string} key 해시 키
   * @param {string} field 필드명
   * @returns {Promise<void>}
   */
  hdel(key: string, field: string): Promise<void>;

  /**
   * @description 해시 전체 조회
   * @template T 값 타입
   * @param {string} key 해시 키
   * @returns {Promise<Record<string, T>>} 필드-값 맵
   */
  hgetall<T = unknown>(key: string): Promise<Record<string, T>>;

  /**
   * @description 해시 필드명 목록
   * @param {string} key 해시 키
   * @returns {Promise<string[]>}
   */
  hkeys(key: string): Promise<string[]>;

  /**
   * @description 리스트 왼쪽 삽입
   * @template T 값 타입
   * @param {string} key 리스트 키
   * @param {...T} values 값들
   * @returns {Promise<number>} 리스트 길이
   */
  lpush<T = unknown>(key: string, ...values: T[]): Promise<number>;

  /**
   * @description 리스트 오른쪽 삽입
   * @template T 값 타입
   * @param {string} key 리스트 키
   * @param {...T} values 값들
   * @returns {Promise<number>} 리스트 길이
   */
  rpush<T = unknown>(key: string, ...values: T[]): Promise<number>;

  /**
   * @description 리스트 왼쪽 팝
   * @template T 값 타입
   * @param {string} key 리스트 키
   * @returns {Promise<T | null>}
   */
  lpop<T = unknown>(key: string): Promise<T | null>;

  /**
   * @description 리스트 오른쪽 팝
   * @template T 값 타입
   * @param {string} key 리스트 키
   * @returns {Promise<T | null>}
   */
  rpop<T = unknown>(key: string): Promise<T | null>;

  /**
   * @description 리스트 범위 조회
   * @template T 값 타입
   * @param {string} key 리스트 키
   * @param {number} start 시작 인덱스
   * @param {number} stop 종료 인덱스(포함)
   * @returns {Promise<T[]>}
   */
  lrange<T = unknown>(key: string, start: number, stop: number): Promise<T[]>;

  /**
   * @description 리스트 길이
   * @param {string} key 리스트 키
   * @returns {Promise<number>}
   */
  llen(key: string): Promise<number>;

  /**
   * @description 집합에 멤버 추가
   * @template T 값 타입
   * @param {string} key 집합 키
   * @param {...T} members 멤버들
   * @returns {Promise<number>} 추가된 개수
   */
  sadd<T = unknown>(key: string, ...members: T[]): Promise<number>;

  /**
   * @description 집합에서 멤버 제거
   * @template T 값 타입
   * @param {string} key 집합 키
   * @param {...T} members 멤버들
   * @returns {Promise<number>} 제거된 개수
   */
  srem<T = unknown>(key: string, ...members: T[]): Promise<number>;

  /**
   * @description 집합의 모든 멤버
   * @template T 값 타입
   * @param {string} key 집합 키
   * @returns {Promise<T[]>}
   */
  smembers<T = unknown>(key: string): Promise<T[]>;

  /**
   * @description 멤버 포함 여부
   * @template T 값 타입
   * @param {string} key 집합 키
   * @param {T} member 멤버
   * @returns {Promise<boolean>}
   */
  sismember<T = unknown>(key: string, member: T): Promise<boolean>;

  /**
   * @description 집합 크기
   * @param {string} key 집합 키
   * @returns {Promise<number>}
   */
  scard(key: string): Promise<number>;

  /**
   * @description 정렬 집합에 멤버 추가
   * @param {string} key ZSET 키
   * @param {number} score 점수
   * @param {string} member 멤버
   * @returns {Promise<number>} 추가 수
   */
  zadd(key: string, score: number, member: string): Promise<number>;

  /**
   * @description 정렬 집합에서 멤버 제거
   * @param {string} key ZSET 키
   * @param {...string} members 멤버들
   * @returns {Promise<number>} 제거 수
   */
  zrem(key: string, ...members: string[]): Promise<number>;

  /**
   * @description 정렬 집합 범위 조회(인덱스)
   * @param {string} key ZSET 키
   * @param {number} start 시작(0-base)
   * @param {number} stop 종료(포함)
   * @returns {Promise<string[]>}
   */
  zrange(key: string, start: number, stop: number): Promise<string[]>;

  /**
   * @description 점수 범위로 조회
   * @param {string} key ZSET 키
   * @param {number} min 최소 점수
   * @param {number} max 최대 점수
   * @returns {Promise<string[]>}
   */
  zrangebyscore(key: string, min: number, max: number): Promise<string[]>;

  /**
   * @description 정렬 집합 크기
   * @param {string} key ZSET 키
   * @returns {Promise<number>}
   */
  zcard(key: string): Promise<number>;

  /**
   * @description 특정 멤버의 점수 조회
   * @param {string} key ZSET 키
   * @param {string} member 멤버
   * @returns {Promise<number | null>} 없으면 null
   */
  zscore(key: string, member: string): Promise<number | null>;

  /**
   * @description 원자적 증가
   * @param {string} key 키
   * @returns {Promise<number>} 증가 후 값
   */
  incr(key: string): Promise<number>;

  /**
   * @description 원자적 감소
   * @param {string} key 키
   * @returns {Promise<number>} 감소 후 값
   */
  decr(key: string): Promise<number>;

  /**
   * @description 지정 증가
   * @param {string} key 키
   * @param {number} increment 증가량
   * @returns {Promise<number>} 증가 후 값
   */
  incrby(key: string, increment: number): Promise<number>;

  /**
   * @description 지정 감소
   * @param {string} key 키
   * @param {number} decrement 감소량
   * @returns {Promise<number>} 감소 후 값
   */
  decrby(key: string, decrement: number): Promise<number>;

  /**
   * @description 전체 캐시 플러시(주의)
   * @returns {Promise<void>}
   */
  flushall(): Promise<void>;

  /**
   * @description 연결 확인
   * @returns {Promise<string>} 'PONG' 등 구현체 응답
   */
  ping(): Promise<string>;

  /**
   * @description 구현체의 상태 정보 문자열
   * @returns {Promise<string>}
   */
  info(): Promise<string>;
}

/**
 * @description 세션/인증/레이트리미팅을 위한 캐시 포트
 */
export interface SessionCache {
  /**
   * @description 사용자 세션 조회
   * @param {string} userId 사용자 ID
   * @returns {Promise<UserSession | null>}
   */
  getUserSession(userId: string): Promise<UserSession | null>;

  /**
   * @description 사용자 세션 저장
   * @param {string} userId 사용자 ID
   * @param {UserSession} session 세션 데이터
   * @param {number} [ttlSeconds] TTL(초)
   * @returns {Promise<void>}
   */
  setUserSession(userId: string, session: UserSession, ttlSeconds?: number): Promise<void>;

  /**
   * @description 사용자 세션 삭제
   * @param {string} userId 사용자 ID
   * @returns {Promise<void>}
   */
  deleteUserSession(userId: string): Promise<void>;

  /**
   * @description 이메일/목적별 인증코드 조회
   * @param {string} email 이메일
   * @param {string} purpose 용도
   * @returns {Promise<VerificationCode | null>}
   */
  getVerificationCode(email: string, purpose: string): Promise<VerificationCode | null>;

  /**
   * @description 인증코드 저장
   * @param {string} email 이메일
   * @param {string} purpose 용도
   * @param {VerificationCode} code 코드
   * @param {number} [ttlSeconds] TTL(초)
   * @returns {Promise<void>}
   */
  setVerificationCode(
    email: string,
    purpose: string,
    code: VerificationCode,
    ttlSeconds?: number,
  ): Promise<void>;

  /**
   * @description 인증코드 삭제
   * @param {string} email 이메일
   * @param {string} purpose 용도
   * @returns {Promise<void>}
   */
  deleteVerificationCode(email: string, purpose: string): Promise<void>;

  /**
   * @description 임시 데이터 조회
   * @template T 타입
   * @param {string} key 키
   * @returns {Promise<T | null>}
   */
  getTempData<T = unknown>(key: string): Promise<T | null>;

  /**
   * @description 임시 데이터 저장
   * @template T 타입
   * @param {string} key 키
   * @param {T} data 데이터
   * @param {number} [ttlSeconds] TTL(초)
   * @returns {Promise<void>}
   */
  setTempData<T = unknown>(key: string, data: T, ttlSeconds?: number): Promise<void>;

  /**
   * @description 임시 데이터 삭제
   * @param {string} key 키
   * @returns {Promise<void>}
   */
  deleteTempData(key: string): Promise<void>;

  /**
   * @description 레이트리미트 정보 조회
   * @param {string} identifier 사용자/클라이언트 식별자
   * @param {string} action 액션명
   * @returns {Promise<RateLimitInfo>}
   */
  getRateLimit(identifier: string, action: string): Promise<RateLimitInfo>;

  /**
   * @description 레이트리미트 카운터 증가 + 허용 여부 판단
   * @param {string} identifier 식별자
   * @param {string} action 액션명
   * @param {number} windowSeconds 윈도우(초)
   * @param {number} maxAttempts 최대 허용 횟수
   * @returns {Promise<RateLimitResult>}
   */
  incrementRateLimit(
    identifier: string,
    action: string,
    windowSeconds: number,
    maxAttempts: number,
  ): Promise<RateLimitResult>;

  /**
   * @description 레이트리미트 리셋
   * @param {string} identifier 식별자
   * @param {string} action 액션명
   * @returns {Promise<void>}
   */
  resetRateLimit(identifier: string, action: string): Promise<void>;

  /**
   * @description 분산 락 획득 (SET NX PX)
   * @param {string} resource 리소스 키
   * @param {number} ttlSeconds TTL(초)
   * @returns {Promise<string | null>} 획득 시 락 토큰, 실패 시 null
   */
  acquireLock(resource: string, ttlSeconds: number): Promise<string | null>;

  /**
   * @description 락 해제
   * @param {string} resource 리소스 키
   * @param {string} lockId 락 토큰
   * @returns {Promise<boolean>} 성공 여부
   */
  releaseLock(resource: string, lockId: string): Promise<boolean>;

  /**
   * @description 락 갱신
   * @param {string} resource 리소스 키
   * @param {string} lockId 락 토큰
   * @param {number} ttlSeconds TTL(초)
   * @returns {Promise<boolean>} 성공 여부
   */
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
 * @description 레이트리미트 현재 상태
 */
export interface RateLimitInfo {
  current: number;
  max: number;
  windowStart: string;
  windowEnd: string;
  blocked: boolean;
}

/**
 * @description 레이트리미트 증가 결과
 */
export interface RateLimitResult {
  allowed: boolean;
  current: number;
  remaining: number;
  resetTime: string;
  retryAfter?: number;
}

/**
 * @description 캐시 통계 정보
 */
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

/**
 * @description 캐시 키 네임스페이스/헬퍼
 */
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
