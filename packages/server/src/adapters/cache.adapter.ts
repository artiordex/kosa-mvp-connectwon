/**
 * Description : cache.adapter.ts - 📌 Redis 기반 CacheService/SessionCache 어댑터 구현
 * Author : Shiwoo Min
 * Date : 2025-09-28
 */
import { CacheKeys } from '../../../core/src/ports/cache.port.js';
import type { CacheService, RateLimitInfo, RateLimitResult, SessionCache, UserSession, VerificationCode } from '../../../core/src/ports/cache.port.js';
import Redis from 'ioredis';

/**
 * @class RedisCacheAdapter
 * @description CacheService / SessionCache 인터페이스를 Redis로 구현
 */
export class RedisCacheAdapter implements CacheService, SessionCache {
  private client: Redis; // ✅ import Redis from 'ioredis' → 타입 정상 인식

  /**
   * @param redisUrl Redis 연결 URL (예: redis://localhost:6379)
   */
  constructor(redisUrl: string) {
    this.client = new Redis(redisUrl);
  }

  /** ---------------- CacheService 구현 ---------------- */

  async get<T = unknown>(key: string): Promise<T | null> {
    const value = await this.client.get(key);
    return value ? (JSON.parse(value) as T) : null;
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
    return (await this.client.exists(key)) === 1;
  }

  async expire(key: string, ttlSeconds: number): Promise<void> {
    await this.client.expire(key, ttlSeconds);
  }

  async ttl(key: string): Promise<number> {
    return await this.client.ttl(key);
  }

  async mget<T = unknown>(keys: string[]): Promise<(T | null)[]> {
    const values = await this.client.mget(keys);
    return values.map(v => (v ? JSON.parse(v) : null));
  }

  async mset<T = unknown>(keyValues: Record<string, T>, ttlSeconds?: number): Promise<void> {
    const pipeline = this.client.pipeline();
    for (const [key, value] of Object.entries(keyValues)) {
      const str = JSON.stringify(value);
      if (ttlSeconds) {
        pipeline.set(key, str, 'EX', ttlSeconds);
      } else {
        pipeline.set(key, str);
      }
    }
    await pipeline.exec();
  }

  async mdel(keys: string[]): Promise<number> {
    return await this.client.del(...keys);
  }

  async deleteByPattern(pattern: string): Promise<number> {
    const keys = await this.client.keys(pattern);
    return keys.length > 0 ? await this.client.del(...keys) : 0;
  }

  async hget<T = unknown>(key: string, field: string): Promise<T | null> {
    const value = await this.client.hget(key, field);
    return value ? (JSON.parse(value) as T) : null;
  }

  async hset<T = unknown>(key: string, field: string, value: T): Promise<void> {
    await this.client.hset(key, field, JSON.stringify(value));
  }

  async hdel(key: string, field: string): Promise<void> {
    await this.client.hdel(key, field);
  }

  async hgetall<T = unknown>(key: string): Promise<Record<string, T>> {
    const raw = await this.client.hgetall(key);
    return Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, JSON.parse(v)]));
  }

  async ping(): Promise<string> {
    return await this.client.ping();
  }

  async info(): Promise<string> {
    return await this.client.info();
  }

  /** ---------------- SessionCache 구현 ---------------- */

  async getUserSession(userId: string): Promise<UserSession | null> {
    return this.get<UserSession>(CacheKeys.USER_SESSION(userId));
  }

  async setUserSession(userId: string, session: UserSession, ttlSeconds?: number): Promise<void> {
    await this.set(CacheKeys.USER_SESSION(userId), session, ttlSeconds);
  }

  async deleteUserSession(userId: string): Promise<void> {
    await this.delete(CacheKeys.USER_SESSION(userId));
  }

  async getVerificationCode(email: string, purpose: string): Promise<VerificationCode | null> {
    return this.get<VerificationCode>(CacheKeys.VERIFICATION_CODE(email, purpose));
  }

  async setVerificationCode(email: string, purpose: string, code: VerificationCode, ttlSeconds?: number): Promise<void> {
    await this.set(CacheKeys.VERIFICATION_CODE(email, purpose), code, ttlSeconds);
  }

  async deleteVerificationCode(email: string, purpose: string): Promise<void> {
    await this.delete(CacheKeys.VERIFICATION_CODE(email, purpose));
  }

  async getTempData<T = unknown>(key: string): Promise<T | null> {
    return this.get<T>(CacheKeys.TEMP_DATA(key));
  }

  async setTempData<T = unknown>(key: string, data: T, ttlSeconds?: number): Promise<void> {
    await this.set(CacheKeys.TEMP_DATA(key), data, ttlSeconds);
  }

  async deleteTempData(key: string): Promise<void> {
    await this.delete(CacheKeys.TEMP_DATA(key));
  }

  async getRateLimit(identifier: string, action: string): Promise<RateLimitInfo> {
    const key = CacheKeys.RATE_LIMIT(identifier, action);
    const current = parseInt((await this.client.get(key)) ?? '0', 10);
    return {
      current,
      max: 0,
      windowStart: new Date().toISOString(),
      windowEnd: new Date().toISOString(),
      blocked: false,
    };
  }

  async incrementRateLimit(identifier: string, action: string, windowSeconds: number, maxAttempts: number): Promise<RateLimitResult> {
    const key = CacheKeys.RATE_LIMIT(identifier, action);
    const current = await this.client.incr(key);
    if (current === 1) {
      await this.client.expire(key, windowSeconds);
    }
    const ttl = await this.client.ttl(key);
    return {
      allowed: current <= maxAttempts,
      current,
      remaining: Math.max(0, maxAttempts - current),
      resetTime: new Date(Date.now() + ttl * 1000).toISOString(),
      retryAfter: current > maxAttempts ? ttl : undefined,
    };
  }

  async resetRateLimit(identifier: string, action: string): Promise<void> {
    await this.delete(CacheKeys.RATE_LIMIT(identifier, action));
  }

  async acquireLock(resource: string, ttlSeconds: number): Promise<string | null> {
    const lockId = Math.random().toString(36).slice(2);
    const key = CacheKeys.LOCK(resource);
    const res = await this.client.set(key, lockId, 'NX', 'EX', ttlSeconds);
    return res ? lockId : null;
  }

  async releaseLock(resource: string, lockId: string): Promise<boolean> {
    const key = CacheKeys.LOCK(resource);
    const script = `
      if redis.call("get", KEYS[1]) == ARGV[1] then
        return redis.call("del", KEYS[1])
      else
        return 0
      end
    `;
    const res = await this.client.eval(script, 1, key, lockId);
    return res === 1;
  }

  async renewLock(resource: string, lockId: string, ttlSeconds: number): Promise<boolean> {
    const key = CacheKeys.LOCK(resource);
    const script = `
      if redis.call("get", KEYS[1]) == ARGV[1] then
        return redis.call("expire", KEYS[1], ARGV[2])
      else
        return 0
      end
    `;
    const res = await this.client.eval(script, 1, key, lockId, ttlSeconds.toString());
    return res === 1;
  }
}
