/**
 * Description : session.adapter.ts - 📌 Redis 기반 세션/락/레이트리밋 어댑터
 * Author : Shiwoo Min
 * Date : 2025-09-30
 */
import type { CacheService, CacheUserSession, RateLimitInfo, RateLimitResult, SessionCache, VerificationCode } from '@connectwon/core/ports/cache.port.js';
import * as Redis from 'ioredis';

/**
 * @class RedisSessionAdapter
 * @description Redis를 이용한 세션/락/레이트리밋/코드 캐시 어댑터 구현체
 */
export class RedisSessionAdapter implements CacheService, SessionCache {
  private client: Redis.Redis;

  constructor(redisUrl: string) {
    this.client = new Redis.Redis(redisUrl);
  }

  async get<T = unknown>(key: string): Promise<T | null> {
    const val = await this.client.get(key);
    return val ? (JSON.parse(val) as T) : null;
  }

  async set<T = unknown>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    const str = JSON.stringify(value);
    if (ttlSeconds) {
      await this.client.set(key, str, 'EX', ttlSeconds);
    } else {
      await this.client.set(key, str);
    }
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key);
  }

  async exists(key: string): Promise<boolean> {
    return (await this.client.exists(key)) > 0;
  }

  async expire(key: string, ttlSeconds: number): Promise<boolean> {
    return (await this.client.expire(key, ttlSeconds)) === 1;
  }

  async ttl(key: string): Promise<number | null> {
    const ttl = await this.client.ttl(key);
    if (ttl === -1) return null; // 만료 없음
    if (ttl === -2) return -2; // 키 없음
    return ttl;
  }

  async ping(): Promise<string> {
    return this.client.ping();
  }

  async info(): Promise<string> {
    return this.client.info();
  }

  async getUserSession(userId: string): Promise<CacheUserSession | null> {
    return this.get<CacheUserSession>(`session:user:${userId}`);
  }

  async setUserSession(userId: string, session: CacheUserSession, ttlSeconds?: number): Promise<void> {
    return this.set(`session:user:${userId}`, session, ttlSeconds);
  }

  async deleteUserSession(userId: string): Promise<void> {
    return this.delete(`session:user:${userId}`);
  }

  async getVerificationCode(email: string, purpose: string): Promise<VerificationCode | null> {
    return this.get<VerificationCode>(`verify:${purpose}:${email}`);
  }

  async setVerificationCode(email: string, purpose: string, code: VerificationCode, ttlSeconds?: number): Promise<void> {
    return this.set(`verify:${purpose}:${email}`, code, ttlSeconds);
  }

  async deleteVerificationCode(email: string, purpose: string): Promise<void> {
    return this.delete(`verify:${purpose}:${email}`);
  }

  async getTempData<T = unknown>(key: string): Promise<T | null> {
    return this.get<T>(`temp:${key}`);
  }

  async setTempData<T = unknown>(key: string, data: T, ttlSeconds?: number): Promise<void> {
    return this.set(`temp:${key}`, data, ttlSeconds);
  }

  async deleteTempData(key: string): Promise<void> {
    return this.delete(`temp:${key}`);
  }

  async getRateLimit(identifier: string, action: string): Promise<RateLimitInfo> {
    const key = `rate:${action}:${identifier}`;
    const val = await this.get<{ current: number; max: number; windowEnd: string }>(key);

    if (!val) {
      return {
        current: 0,
        max: 0,
        windowStart: new Date().toISOString(),
        windowEnd: new Date().toISOString(),
        blocked: false,
      };
    }

    return {
      current: val.current,
      max: val.max,
      windowStart: new Date().toISOString(),
      windowEnd: val.windowEnd,
      blocked: val.current >= val.max,
    };
  }

  async incrementRateLimit(
    identifier: string,
    action: string,
    windowSeconds: number,
    maxAttempts: number,
  ): Promise<RateLimitResult> {
    const key = `rate:${action}:${identifier}`;
    const current = await this.client.incr(key);

    if (current === 1) {
      await this.client.expire(key, windowSeconds);
    }

    const ttl = await this.ttl(key);
    const resetTime = new Date(Date.now() + (ttl ?? windowSeconds) * 1000).toISOString();

    return {
      allowed: current <= maxAttempts,
      current,
      remaining: Math.max(0, maxAttempts - current),
      resetTime,
      ...(current > maxAttempts ? { retryAfter: ttl ?? windowSeconds } : {}),
    };
  }

  async resetRateLimit(identifier: string, action: string): Promise<void> {
    await this.delete(`rate:${action}:${identifier}`);
  }

  async acquireLock(resource: string, ttlSeconds: number, lockId?: string): Promise<string | null> {
    const key = `lock:${resource}`;
    const value = lockId ?? Math.random().toString(36).substring(2);

    // 타입 정의 버그 때문에 as any 필요
    const result = await (this.client.set as any)(key, value, "NX", "EX", ttlSeconds);

    return result ? value : null;
  }

  async releaseLock(resource: string, lockId: string): Promise<boolean> {
    const key = `lock:${resource}`;
    const script = `
      if redis.call("get", KEYS[1]) == ARGV[1] then
        return redis.call("del", KEYS[1])
      else
        return 0
      end
    `;
    const result = await this.client.eval(script, 1, key, lockId);
    return result === 1;
  }

  async renewLock(resource: string, lockId: string, ttlSeconds: number): Promise<boolean> {
    const key = `lock:${resource}`;
    const script = `
      if redis.call("get", KEYS[1]) == ARGV[1] then
        return redis.call("expire", KEYS[1], ARGV[2])
      else
        return 0
      end
    `;
    const result = await this.client.eval(script, 1, key, lockId, ttlSeconds);
    return result === 1;
  }
}
