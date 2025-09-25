/**
 * Description : health.spec.ts - 📌 API Health Check E2E 테스트
 * Author : Shiwoo Min
 * Date : 2025-09-26
 */
import { expect, request, test } from '@playwright/test';
import type { APIRequestContext } from '@playwright/test';

test.describe('API Health Check', () => {
  let apiContext: APIRequestContext;

  test.beforeAll(async () => {
    // API request context 생성
    apiContext = await request.newContext({
      baseURL: process.env['API_BASE_URL'] || 'http://localhost:3000/api',
    });
  });

  test.afterAll(async () => {
    // request context 정리
    await apiContext.dispose();
  });

  test('Health Check 엔드포인트 응답 확인', async () => {
    const response = await apiContext.get('/health');
    expect(response.status()).toBe(200);

    const body = await response.json();

    // 응답 구조 확인
    expect(body).toHaveProperty('status');
    expect(body).toHaveProperty('timestamp');
    expect(body).toHaveProperty('uptime');
    expect(body).toHaveProperty('version');

    // status 값 검증
    expect(body.status).toMatch(/ok|healthy/);

    // timestamp 유효성 검증
    const ts = new Date(body.timestamp).getTime();
    const now = Date.now();
    expect(Math.abs(now - ts)).toBeLessThan(10_000);

    // uptime 값 검증
    expect(Number(body.uptime)).toBeGreaterThanOrEqual(0);

    // version 형식 검증 (SemVer)
    expect(body.version).toMatch(/^\d+\.\d+\.\d+$/);
  });

  test('Health Check - 의존성 상태 확인 (DB, Redis 등)', async () => {
    const response = await apiContext.get('/health/details');

    if (response.status() === 404) {
      test.skip(true, 'Health details endpoint not implemented');
      return;
    }

    const body = await response.json();

    // DB 연결 상태 확인
    expect(body).toHaveProperty('database');
    expect(body.database).toMatch(/ok|connected|healthy/);

    // Redis 연결 상태 확인
    if (body.redis) {
      expect(body.redis).toMatch(/ok|connected|healthy/);
    }

    // 외부 API (예: 결제, SSO) 상태 확인
    if (body.providers) {
      for (const status of Object.values(body.providers as Record<string, string>)) {
        expect(status).toMatch(/ok|healthy/);
      }
    }
  });
});
