/**
 * Description : subscription.handler.ts - 📌 구독(Mock Subscription) 관련 API 핸들러
 * Author : Shiwoo Min
 * Date : 2025-10-09
 */
import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker/locale/ko';
import { db } from '../../db/schema';

// 구독 생성
export const subscriptionCreateHandler = http.post('/api/subscriptions', async ({ request }) => {
  const body = (await request.json().catch(() => ({}))) as Record<string, any>;

  const subscription = db.membership.create({
    ['userId']: body['userId'] ?? faker.number.int({ min: 1, max: 9999 }),
    ['level']: body['level'] ?? faker.helpers.arrayElement(['BASIC', 'PRO', 'PREMIUM']),
    ['joinedAt']: new Date(),
    ['expiresAt']: faker.date.future(),
    ['benefits']: JSON.stringify(['무료 세션 1회', '우선 예약 혜택']),
  });

  return HttpResponse.json({ ['subscription']: subscription }, { status: 201 });
});

// 구독 목록 조회
export const subscriptionListHandler = http.get('/api/subscriptions', () => {
  const list = db.membership.getAll().map((m) => ({
    ['id']: m.id,
    ['userId']: m.userId,
    ['level']: m.level,
    ['joinedAt']: m.joinedAt,
    ['expiresAt']: m.expiresAt,
  }));

  return HttpResponse.json({ ['subscriptions']: list }, { status: 200 });
});

// 구독 해지
export const subscriptionCancelHandler = http.delete('/api/subscriptions/:id', ({ params }) => {
  const id = Number(params['id']);
  db.membership.delete({ where: { id: { equals: id } } });
  return HttpResponse.json({ ['cancelled']: id }, { status: 200 });
});


// Export
export const subscriptionHandlers = [
  subscriptionCreateHandler,
  subscriptionListHandler,
  subscriptionCancelHandler,
];
