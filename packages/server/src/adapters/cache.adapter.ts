/**
 * Description : cache.adapter.ts - 📌 Redis 기반 캐시 어댑터 구현
 * Author : Shiwoo Min
 * Date : 2025-09-29
 */
import { CacheKeys, type CacheService, type CacheUserSession, type RateLimitInfo, type RateLimitResult, type SessionCache, type VerificationCode } from '@connectwon/core/ports/cache.port.js';
import { randomUUID } from 'crypto';
import type { Redis as RedisType } from 'ioredis';

/**
 * @description Redis 연결 설정
 */
export interface RedisConfig {
  host: string;
  port: number;
  password?: string;
  db?: number;
  retryDelayOnFailover?: number;
  maxRetriesPerRequest?: number;
  lazyConnect?: boolean;
  keepAlive?: number;
  keyPrefix?: string;
}

/**
 * @description Redis 기반 범용 캐시 서비스
 */
export class RedisCacheService implements CacheService {
  constructor(private readonly redis: RedisType) {}

  async get<T = unknown>(key: string): Promise<T | null> {
    try {
      const value = await this.redis.get(key);
      if (value === null) return null;
      return JSON.parse(value) as T;
    } catch (error) {
      console.error('Redis get error:', error);
      return null;
    }
  }

  async set<T = unknown>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    try {
      const serialized = JSON.stringify(value);
      if (ttlSeconds && ttlSeconds > 0) {
        await this.redis.setex(key, ttlSeconds, serialized);
      } else {
        await this.redis.set(key, serialized);
      }
    } catch (error) {
      console.error('Redis set error:', error);
      throw new Error(`Failed to set cache key: ${key}`);
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.redis.del(key);
    } catch (error) {
      console.error('Redis delete error:', error);
      throw new Error(`Failed to delete cache key: ${key}`);
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      const result = await this.redis.exists(key);
      return result === 1;
    } catch (error) {
      console.error('Redis exists error:', error);
      return false;
    }
  }

  async expire(key: string, ttlSeconds: number): Promise<boolean> {
    try {
      const result = await this.redis.expire(key, ttlSeconds);
      return result === 1;
    } catch (error) {
      console.error('Redis expire error:', error);
      return false;
    }
  }

  async ttl(key: string): Promise<number | null> {
    try {
      const ttl = await this.redis.ttl(key);
      if (ttl === -1) return null; // 만료 없음
      if (ttl === -2) return -2; // 키 없음
      return ttl;
    } catch (error) {
      console.error('Redis ttl error:', error);
      return -2;
    }
  }

  async ping(): Promise<string> {
    try {
      return await this.redis.ping();
    } catch (error) {
      console.error('Redis ping error:', error);
      throw new Error('Redis connection failed');
    }
  }

  async info(): Promise<string> {
    try {
      return await this.redis.info();
    } catch (error) {
      console.error('Redis info error:', error);
      throw new Error('Failed to get Redis info');
    }
  }
}

/**
 * @description Redis 기반 세션/코드/락/레이트리밋 캐시 서비스
 */
export class RedisSessionCache implements SessionCache {
  constructor(private readonly redis: RedisType) {}
  async getUserSession(userId: string): Promise<CacheUserSession | null> {
    try {
      const key = CacheKeys.USER_SESSION(userId);
      const value = await this.redis.get(key);
      if (value === null) return null;
      return JSON.parse(value) as CacheUserSession;
    } catch (error) {
      console.error('Get user session error:', error);
      return null;
    }
  }

  async setUserSession(userId: string, session: CacheUserSession, ttlSeconds?: number): Promise<void> {
    try {
      const key = CacheKeys.USER_SESSION(userId);
      const serialized = JSON.stringify(session);
      if (ttlSeconds && ttlSeconds > 0) {
        await this.redis.setex(key, ttlSeconds, serialized);
      } else {
        await this.redis.set(key, serialized);
      }
    } catch (error) {
      console.error('Set user session error:', error);
      throw new Error(`Failed to set user session: ${userId}`);
    }
  }

  async deleteUserSession(userId: string): Promise<void> {
    try {
      const key = CacheKeys.USER_SESSION(userId);
      await this.redis.del(key);
    } catch (error) {
      console.error('Delete user session error:', error);
      throw new Error(`Failed to delete user session: ${userId}`);
    }
  }

  async getVerificationCode(email: string, purpose: string): Promise<VerificationCode | null> {
    try {
      const key = CacheKeys.VERIFICATION_CODE(email, purpose);
      const value = await this.redis.get(key);
      if (value === null) return null;
      return JSON.parse(value) as VerificationCode;
    } catch (error) {
      console.error('Get verification code error:', error);
      return null;
    }
  }

  async setVerificationCode(email: string, purpose: string, code: VerificationCode, ttlSeconds?: number): Promise<void> {
    try {
      const key = CacheKeys.VERIFICATION_CODE(email, purpose);
      const serialized = JSON.stringify(code);

      if (ttlSeconds && ttlSeconds > 0) {
        await this.redis.setex(key, ttlSeconds, serialized);
      } else {
        await this.redis.set(key, serialized);
      }
    } catch (error) {
      console.error('Set verification code error:', error);
      throw new Error(`Failed to set verification code: ${email}:${purpose}`);
    }
  }

  async deleteVerificationCode(email: string, purpose: string): Promise<void> {
    try {
      const key = CacheKeys.VERIFICATION_CODE(email, purpose);
      await this.redis.del(key);
    } catch (error) {
      console.error('Delete verification code error:', error);
      throw new Error(`Failed to delete verification code: ${email}:${purpose}`);
    }
  }

  async getTempData<T = unknown>(key: string): Promise<T | null> {
    try {
      const cacheKey = CacheKeys.TEMP_DATA(key);
      const value = await this.redis.get(cacheKey);
      if (value === null) return null;
      return JSON.parse(value) as T;
    } catch (error) {
      console.error('Get temp data error:', error);
      return null;
    }
  }

  async setTempData<T = unknown>(key: string, data: T, ttlSeconds?: number): Promise<void> {
    try {
      const cacheKey = CacheKeys.TEMP_DATA(key);
      const serialized = JSON.stringify(data);

      if (ttlSeconds && ttlSeconds > 0) {
        await this.redis.setex(cacheKey, ttlSeconds, serialized);
      } else {
        await this.redis.set(cacheKey, serialized);
      }
    } catch (error) {
      console.error('Set temp data error:', error);
      throw new Error(`Failed to set temp data: ${key}`);
    }
  }

  async deleteTempData(key: string): Promise<void> {
    try {
      const cacheKey = CacheKeys.TEMP_DATA(key);
      await this.redis.del(cacheKey);
    } catch (error) {
      console.error('Delete temp data error:', error);
      throw new Error(`Failed to delete temp data: ${key}`);
    }
  }

  async getRateLimit(identifier: string, action: string): Promise<RateLimitInfo> {
    try {
      const key = CacheKeys.RATE_LIMIT(identifier, action);
      const value = await this.redis.get(key);

      if (value === null) {
        return {
          current: 0,
          max: 0,
          windowStart: new Date().toISOString(),
          windowEnd: new Date().toISOString(),
          blocked: false,
        };
      }

      return JSON.parse(value) as RateLimitInfo;
    } catch (error) {
      console.error('Get rate limit error:', error);
      return {
        current: 0,
        max: 0,
        windowStart: new Date().toISOString(),
        windowEnd: new Date().toISOString(),
        blocked: false,
      };
    }
  }

  async incrementRateLimit(identifier: string, action: string, windowSeconds: number, maxAttempts: number): Promise<RateLimitResult> {
    try {
      const key = CacheKeys.RATE_LIMIT(identifier, action);
      const now = new Date();
      const windowStart = now;
      const windowEnd = new Date(now.getTime() + windowSeconds * 1000);

      // Redis pipeline을 사용한 원자적 연산
      const pipeline = this.redis.pipeline();
      pipeline.incr(key);
      pipeline.expire(key, windowSeconds);
      const results = await pipeline.exec();

      if (!results || results.length === 0) {
        throw new Error('Redis pipeline failed');
      }

      const [incrResult] = results;
      if (incrResult?.[0]) {
        throw new Error('Failed to increment rate limit counter');
      }

      const current = (incrResult?.[1] as number) || 1;
      const allowed = current <= maxAttempts;
      const remaining = Math.max(0, maxAttempts - current);

      // 레이트리밋 정보 저장
      const rateLimitInfo: RateLimitInfo = {
        current,
        max: maxAttempts,
        windowStart: windowStart.toISOString(),
        windowEnd: windowEnd.toISOString(),
        blocked: !allowed,
      };

      await this.redis.setex(`${key}:info`, windowSeconds, JSON.stringify(rateLimitInfo));

      const result: RateLimitResult = {
        allowed,
        current,
        remaining,
        resetTime: windowEnd.toISOString(),
      };

      // retryAfter는 blocked 상태일 때만 추가
      if (!allowed) {
        result.retryAfter = windowSeconds;
      }

      return result;
    } catch (error) {
      console.error('Increment rate limit error:', error);
      throw new Error(`Failed to increment rate limit: ${identifier}:${action}`);
    }
  }

  async resetRateLimit(identifier: string, action: string): Promise<void> {
    try {
      const key = CacheKeys.RATE_LIMIT(identifier, action);
      await this.redis.del(key, `${key}:info`);
    } catch (error) {
      console.error('Reset rate limit error:', error);
      throw new Error(`Failed to reset rate limit: ${identifier}:${action}`);
    }
  }

  async acquireLock(resource: string, ttlSeconds: number, lockId?: string): Promise<string | null> {
    try {
      const key = CacheKeys.LOCK(resource);
      const id = lockId || randomUUID();

      // 타입 정의 버그 우회 (as any)
      const result = await (this.redis.set as any)(key, id, 'NX', 'EX', ttlSeconds);

      return result === 'OK' ? id : null;
    } catch (error) {
      console.error('Acquire lock error:', error);
      return null;
    }
  }

  async releaseLock(resource: string, lockId: string): Promise<boolean> {
    try {
      const key = CacheKeys.LOCK(resource);

      // Lua 스크립트로 원자적 락 해제 (올바른 락 ID인지 확인 후 삭제)
      const luaScript = `
        if redis.call("GET", KEYS[1]) == ARGV[1] then
          return redis.call("DEL", KEYS[1])
        else
          return 0
        end
      `;

      const result = (await this.redis.eval(luaScript, 1, key, lockId)) as number;
      return result === 1;
    } catch (error) {
      console.error('Release lock error:', error);
      return false;
    }
  }

  async renewLock(resource: string, lockId: string, ttlSeconds: number): Promise<boolean> {
    try {
      const key = CacheKeys.LOCK(resource);

      // Lua 스크립트로 원자적 락 갱신 (올바른 락 ID인지 확인 후 TTL 갱신)
      const luaScript = `
        if redis.call("GET", KEYS[1]) == ARGV[1] then
          return redis.call("EXPIRE", KEYS[1], ARGV[2])
        else
          return 0
        end
      `;

      const result = (await this.redis.eval(luaScript, 1, key, lockId, ttlSeconds)) as number;
      return result === 1;
    } catch (error) {
      console.error('Renew lock error:', error);
      return false;
    }
  }
}
