/**
 * Description : session.handler.ts - 📌 세션 검증, 로그아웃, 상태 확인 관련 핸들러
 * Author : Shiwoo Min
 * Date : 2025-10-09
 */

import { http, HttpResponse } from 'msw';
import { db } from '../../db/schema';
import { faker } from '@faker-js/faker/locale/ko';

// 세션 확인 (GET /api/auth/session)
export const sessionCheckHandler = http.get('/api/auth/session', async () => {
  const user = faker.helpers.arrayElement(db.user.getAll());
  if (!user) {
    return HttpResponse.json({ authenticated: false });
  }

  return HttpResponse.json({
    authenticated: true,
    user,
    expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
  });
});

// 로그아웃 (POST /api/auth/logout)
export const logoutHandler = http.post('/api/auth/logout', async () => {
  return HttpResponse.json({ message: '로그아웃 완료', success: true });
});

// 세션 갱신 (POST /api/auth/session/refresh)
export const refreshSessionHandler = http.post('/api/auth/session/refresh', async () => {
  return HttpResponse.json({
    message: '세션이 갱신되었습니다.',
    token: faker.string.uuid(),
    refreshedAt: new Date().toISOString(),
  });
});

export const sessionHandlers = [sessionCheckHandler, logoutHandler, refreshSessionHandler];
