/**
 * Description : user.handler.ts - 📌 사용자(User) 기본 Mock API 핸들러
 * Author : Shiwoo Min
 * Date : 2025-10-09
 */
import { http, HttpResponse } from 'msw';
import { db } from '../../db/schema';
import { faker } from '@faker-js/faker/locale/ko';

// 사용자 목록
export const userListHandler = http.get('/api/users', () => {
  const users = db.user.getAll().map((u) => ({
    ['id']: u.id,
    ['name']: u.name,
    ['email']: u.email,
    ['roleFlags']: u.roleFlags,
    ['joinedAt']: u.createdAt,
  }));
  return HttpResponse.json({ ['users']: users }, { status: 200 });
});

// 사용자 상세
export const userDetailHandler = http.get('/api/users/:id', ({ params }) => {
  const id = Number(params['id']);
  const user = db.user.findFirst({ where: { id: { equals: id } } });
  if (!user) return HttpResponse.json({ error: 'User not found' }, { status: 404 });
  return HttpResponse.json({ ['user']: user }, { status: 200 });
});

// 사용자 생성
export const userCreateHandler = http.post('/api/users', async ({ request }) => {
  const body = (await request.json().catch(() => ({}))) as Record<string, any>;
  const newUser = db.user.create({
    ['email']: body['email'] ?? faker.internet.email(),
    ['name']: body['name'] ?? faker.person.fullName(),
    ['roleFlags']: body['roleFlags'] ?? 0,
    ['preferences']: JSON.stringify({ theme: 'light', lang: 'ko' }),
  });
  return HttpResponse.json({ ['created']: newUser }, { status: 201 });
});

// 사용자 삭제
export const userDeleteHandler = http.delete('/api/users/:id', ({ params }) => {
  const id = Number(params['id']);
  db.user.delete({ where: { id: { equals: id } } });
  return HttpResponse.json({ ['deleted']: id }, { status: 200 });
});

// Export
export const userHandlers = [
  userListHandler,
  userDetailHandler,
  userCreateHandler,
  userDeleteHandler,
];
