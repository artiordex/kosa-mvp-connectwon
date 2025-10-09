/**
 * Description : profile.handler.ts - 📌 사용자 프로필(Profile) 관련 Mock API 핸들러
 * Author : Shiwoo Min
 * Date : 2025-10-09
 */
import { http, HttpResponse } from 'msw';
import { db } from '../../db/schema';

// 프로필 조회
export const profileGetHandler = http.get('/api/users/:userId/profile', ({ params }) => {
  const userId = Number(params['userId']);
  const user = db.user.findFirst({ where: { id: { equals: userId } } });
  if (!user) return HttpResponse.json({ error: 'User not found' }, { status: 404 });

  const profile = {
    ['id']: user.id,
    ['name']: user.name,
    ['email']: user.email,
    ['preferences']: user.preferences,
    ['joinedAt']: user.createdAt,
  };

  return HttpResponse.json({ ['profile']: profile }, { status: 200 });
});

// 프로필 수정
export const profileUpdateHandler = http.put('/api/users/:userId/profile', async ({ params, request }) => {
  const userId = Number(params['userId']);
  const body = (await request.json().catch(() => ({}))) as Record<string, any>;
  const user = db.user.findFirst({ where: { id: { equals: userId } } });
  if (!user) return HttpResponse.json({ error: 'User not found' }, { status: 404 });

  const updated = db.user.update({
    where: { id: { equals: userId } },
    data: {
      ['name']: body['name'] ?? user.name,
      ['preferences']: JSON.stringify(body['preferences'] ?? user.preferences),
      ['updatedAt']: new Date(),
    },
  });

  return HttpResponse.json({ ['updated']: updated }, { status: 200 });
});

// Export
export const profileHandlers = [profileGetHandler, profileUpdateHandler];
