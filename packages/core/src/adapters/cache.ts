/**
 * Description : infrastructure/cache.ts - 📌 Redis 기반 Cache/SessionCache 구현체
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import crypto from 'node:crypto';

import type { CacheService, RateLimitInfo, RateLimitResult, SessionCache, UserSession, VerificationCode } from '../ports/cache.port.js';
import { CacheKeys } from '../ports/cache.port.js';
import type { Redis as RedisClient } from 'ioredis';
import Redis from 'ioredis';

/**
 * @description Redis 기반 CacheService & SessionCache 구현체
 */
export class RedisCacheService implements CacheService, SessionCache {
  private client: RedisClient;

  /** @description Redis 클라이언트 초기화 */
  constructor(redisUrl: string) {
    this.client = new Redis(redisUrl);
  }

  /** @description 단일 키 조회 */
  async get<T = unknown>(key: string): Promise<T | null> {
    const v = await this.client.get(key);
    return v ? (JSON.parse(v) as T) : null;
  }

  /** @description 단일 키 저장 (옵션 TTL) */
  async set<T = unknown>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    const payload = JSON.stringify(value);
    if (ttlSeconds) {
      await this.client.set(key, payload, 'EX', ttlSeconds);
    } else {
      await this.client.set(key, payload);
    }
  }

  /** @description 단일 키 삭제 */
  async delete(key: string): Promise<void> {
    await this.client.del(key);
  }

  /** @description 키 존재 여부 확인 */
  async exists(key: string): Promise<boolean> {
    return (await this.client.exists(key)) > 0;
  }

  /** @description TTL 설정/연장 */
  async expire(key: string, ttlSeconds: number): Promise<void> {
    await this.client.expire(key, ttlSeconds);
  }

  /** @description TTL 남은 시간 조회 */
  async ttl(key: string): Promise<number> {
    return await this.client.ttl(key);
  }

  /** @description 여러 키 동시 조회 */
  async mget<T = unknown>(keys: string[]): Promise<(T | null)[]> {
    if (keys.length === 0) return [];
    const values = await this.client.mget(keys);
    return values.map(v => (v ? (JSON.parse(v) as T) : null));
  }

  /** @description 여러 키 동시 저장 */
  async mset<T = unknown>(keyValues: Record<string, T>, ttlSeconds?: number): Promise<void> {
    const pipeline = this.client.pipeline();
    for (const [k, v] of Object.entries(keyValues)) {
      const payload = JSON.stringify(v);
      if (ttlSeconds) pipeline.set(k, payload, 'EX', ttlSeconds);
      else pipeline.set(k, payload);
    }
    await pipeline.exec();
  }

  /** @description 여러 키 동시 삭제 */
  async mdel(keys: string[]): Promise<number> {
    if (keys.length === 0) return 0;
    return await this.client.del(...keys);
  }

  /** @description 패턴으로 키 목록 조회 */
  async keys(pattern: string): Promise<string[]> {
    return await this.client.keys(pattern);
  }

  /** @description 패턴으로 일괄 삭제 */
  async deleteByPattern(pattern: string): Promise<number> {
    const keys = await this.client.keys(pattern);
    if (keys.length > 0) return await this.client.del(...keys);
    return 0;
  }

  /** @description 해시 필드 조회 */
  async hget<T = unknown>(key: string, field: string): Promise<T | null> {
    const v = await this.client.hget(key, field);
    return v ? (JSON.parse(v) as T) : null;
  }

  /** @description 해시 필드 저장 */
  async hset<T = unknown>(key: string, field: string, value: T): Promise<void> {
    await this.client.hset(key, field, JSON.stringify(value));
  }

  /** @description 해시 필드 삭제 */
  async hdel(key: string, field: string): Promise<void> {
    await this.client.hdel(key, field);
  }

  /** @description 해시 전체 조회 */
  async hgetall<T = unknown>(key: string): Promise<Record<string, T>> {
    const raw = await this.client.hgetall(key);
    const result: Record<string, T> = {};
    for (const [f, v] of Object.entries(raw)) {
      try {
        result[f] = JSON.parse(v) as T;
      } catch {
        result[f] = v as unknown as T;
      }
    }
    return result;
  }

  /** @description 해시 필드명 목록 */
  async hkeys(key: string): Promise<string[]> {
    return await this.client.hkeys(key);
  }

  /** @description 리스트 왼쪽 삽입 */
  async lpush<T = unknown>(key: string, ...values: T[]): Promise<number> {
    const payloads = values.map(v => JSON.stringify(v));
    return await this.client.lpush(key, ...payloads);
  }

  /** @description 리스트 오른쪽 삽입 */
  async rpush<T = unknown>(key: string, ...values: T[]): Promise<number> {
    const payloads = values.map(v => JSON.stringify(v));
    return await this.client.rpush(key, ...payloads);
  }

  /** @description 리스트 왼쪽 팝 */
  async lpop<T = unknown>(key: string): Promise<T | null> {
    const v = await this.client.lpop(key);
    return v ? (JSON.parse(v) as T) : null;
  }

  /** @description 리스트 오른쪽 팝 */
  async rpop<T = unknown>(key: string): Promise<T | null> {
    const v = await this.client.rpop(key);
    return v ? (JSON.parse(v) as T) : null;
  }

  /** @description 리스트 범위 조회 */
  async lrange<T = unknown>(key: string, start: number, stop: number): Promise<T[]> {
    const values = await this.client.lrange(key, start, stop);
    return values.map(v => JSON.parse(v) as T);
  }

  /** @description 리스트 길이 */
  async llen(key: string): Promise<number> {
    return await this.client.llen(key);
  }

  /** @description 집합에 멤버 추가 */
  async sadd<T = unknown>(key: string, ...members: T[]): Promise<number> {
    const payloads = members.map(m => JSON.stringify(m));
    return await this.client.sadd(key, ...payloads);
  }

  /** @description 집합에서 멤버 제거 */
  async srem<T = unknown>(key: string, ...members: T[]): Promise<number> {
    const payloads = members.map(m => JSON.stringify(m));
    return await this.client.srem(key, ...payloads);
  }

  /** @description 집합의 모든 멤버 */
  async smembers<T = unknown>(key: string): Promise<T[]> {
    const values = await this.client.smembers(key);
    return values.map(v => JSON.parse(v) as T);
  }

  /** @description 멤버 포함 여부 */
  async sismember<T = unknown>(key: string, member: T): Promise<boolean> {
    const payload = JSON.stringify(member);
    return (await this.client.sismember(key, payload)) === 1;
  }

  /** @description 집합 크기 */
  async scard(key: string): Promise<number> {
    return await this.client.scard(key);
  }

  /** @description 정렬 집합에 멤버 추가 */
  async zadd(key: string, score: number, member: string): Promise<number> {
    return await this.client.zadd(key, score, member);
  }

  /** @description 정렬 집합에서 멤버 제거 */
  async zrem(key: string, ...members: string[]): Promise<number> {
    return await this.client.zrem(key, ...members);
  }

  /** @description 정렬 집합 범위 조회(인덱스) */
  async zrange(key: string, start: number, stop: number): Promise<string[]> {
    return await this.client.zrange(key, start, stop);
  }

  /** @description 점수 범위로 조회 */
  async zrangebyscore(key: string, min: number, max: number): Promise<string[]> {
    return await this.client.zrangebyscore(key, min, max);
  }

  /** @description 정렬 집합 크기 */
  async zcard(key: string): Promise<number> {
    return await this.client.zcard(key);
  }

  /** @description 특정 멤버의 점수 조회 */
  async zscore(key: string, member: string): Promise<number | null> {
    const v = await this.client.zscore(key, member);
    return v !== null ? Number(v) : null;
  }

  /** @description 원자적 증가 */
  async incr(key: string): Promise<number> {
    return await this.client.incr(key);
  }

  /** @description 원자적 감소 */
  async decr(key: string): Promise<number> {
    return await this.client.decr(key);
  }

  /** @description 지정 증가 */
  async incrby(key: string, increment: number): Promise<number> {
    return await this.client.incrby(key, increment);
  }

  /** @description 지정 감소 */
  async decrby(key: string, decrement: number): Promise<number> {
    return await this.client.decrby(key, decrement);
  }

  /** @description 전체 캐시 플러시 */
  async flushall(): Promise<void> {
    await this.client.flushall();
  }

  /** @description 연결 확인 */
  async ping(): Promise<string> {
    return await this.client.ping();
  }

  /** @description 상태 정보 조회 */
  async info(): Promise<string> {
    return await this.client.info();
  }

  /* ------------------------- SessionCache 구현 ------------------------- */

  /** @description 사용자 세션 조회 */
  async getUserSession(userId: string): Promise<UserSession | null> {
    return this.get<UserSession>(CacheKeys.USER_SESSION(userId));
  }

  /** @description 사용자 세션 저장 */
  async setUserSession(userId: string, session: UserSession, ttlSeconds?: number): Promise<void> {
    await this.set(CacheKeys.USER_SESSION(userId), session, ttlSeconds);
  }

  /** @description 사용자 세션 삭제 */
  async deleteUserSession(userId: string): Promise<void> {
    await this.delete(CacheKeys.USER_SESSION(userId));
  }

  /** @description 인증코드 조회 */
  async getVerificationCode(email: string, purpose: string): Promise<VerificationCode | null> {
    return this.get<VerificationCode>(CacheKeys.VERIFICATION_CODE(email, purpose));
  }

  /** @description 인증코드 저장 */
  async setVerificationCode(email: string, purpose: string, code: VerificationCode, ttlSeconds?: number): Promise<void> {
    await this.set(CacheKeys.VERIFICATION_CODE(email, purpose), code, ttlSeconds);
  }

  /** @description 인증코드 삭제 */
  async deleteVerificationCode(email: string, purpose: string): Promise<void> {
    await this.delete(CacheKeys.VERIFICATION_CODE(email, purpose));
  }

  /** @description 임시 데이터 조회 */
  async getTempData<T = unknown>(key: string): Promise<T | null> {
    return this.get<T>(CacheKeys.TEMP_DATA(key));
  }

  /** @description 임시 데이터 저장 */
  async setTempData<T = unknown>(key: string, data: T, ttlSeconds?: number): Promise<void> {
    await this.set(CacheKeys.TEMP_DATA(key), data, ttlSeconds);
  }

  /** @description 임시 데이터 삭제 */
  async deleteTempData(key: string): Promise<void> {
    await this.delete(CacheKeys.TEMP_DATA(key));
  }

  /** @description 레이트리미트 상태 조회 */
  async getRateLimit(identifier: string, action: string): Promise<RateLimitInfo> {
    const key = CacheKeys.RATE_LIMIT(identifier, action);
    const current = Number((await this.client.get(key)) || 0);
    return {
      current,
      max: 0,
      windowStart: new Date().toISOString(),
      windowEnd: new Date().toISOString(),
      blocked: false,
    };
  }

  /** @description 레이트리미트 카운터 증가 */
  async incrementRateLimit(identifier: string, action: string, windowSeconds: number, maxAttempts: number): Promise<RateLimitResult> {
    const key = CacheKeys.RATE_LIMIT(identifier, action);
    const tx = this.client.multi();
    tx.incr(key);
    tx.expire(key, windowSeconds, 'NX');
    const res = (await tx.exec()) || [];
    const countRes = res[0]?.[1] as number | undefined;
    const current = typeof countRes === 'number' ? countRes : 0;
    return {
      allowed: current <= maxAttempts,
      current,
      remaining: Math.max(0, maxAttempts - current),
      resetTime: new Date(Date.now() + windowSeconds * 1000).toISOString(),
    };
  }

  /** @description 레이트리미트 리셋 */
  async resetRateLimit(identifier: string, action: string): Promise<void> {
    await this.delete(CacheKeys.RATE_LIMIT(identifier, action));
  }

  /** @description 분산 락 획득 */
  async acquireLock(resource: string, ttlSeconds: number): Promise<string | null> {
    const key = CacheKeys.LOCK(resource);
    const lockId = crypto.randomUUID();
    const res = await this.client.set(key, lockId, 'EX', ttlSeconds, 'NX');
    return res === 'OK' ? lockId : null;
  }

  /** @description 분산 락 해제 */
  async releaseLock(resource: string, lockId: string): Promise<boolean> {
    const key = CacheKeys.LOCK(resource);
    const script = `
      if redis.call("get", KEYS[1]) == ARGV[1]
      then
        return redis.call("del", KEYS[1])
      else
        return 0
      end
    `;
    const result = await this.client.eval(script, 1, key, lockId);
    return result === 1;
  }

  /** @description 분산 락 갱신 */
  async renewLock(resource: string, lockId: string, ttlSeconds: number): Promise<boolean> {
    const key = CacheKeys.LOCK(resource);
    const script = `
      if redis.call("get", KEYS[1]) == ARGV[1]
      then
        return redis.call("expire", KEYS[1], ARGV[2])
      else
        return 0
      end
    `;
    const result = await this.client.eval(script, 1, key, lockId, ttlSeconds.toString());
    return result === 1;
  }
}
