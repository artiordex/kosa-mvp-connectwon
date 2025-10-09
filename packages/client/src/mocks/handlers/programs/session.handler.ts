/**
 * Description : session.handler.ts - 📌 세션(Session) 관련 Mock API 핸들러
 * Author : Shiwoo Min
 * Date : 2025-10-09
 */

import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker/locale/ko';
import { db } from '../../db/schema';

// 세션 생성
export const sessionCreateHandler = http.post('/api/sessions', async ({ request }) => {
  const body = (await request.json().catch(() => ({}))) as Record<string, any>;

  const session = db.session.create({
    ['programId']: body['programId'] ?? faker.number.int({ min: 1, max: 300 }),
    ['startsAt']: body['startsAt'] ?? faker.date.future(),
    ['endsAt']: body['endsAt'] ?? faker.date.future(),
    ['capacity']: body['capacity'] ?? faker.number.int({ min: 5, max: 30 }),
    ['participantFee']: body['participantFee'] ?? faker.number.int({ min: 0, max: 50000 }),
    ['status']: 'SCHEDULED',
  });

  return HttpResponse.json({ ['session']: session }, { status: 201 });
});

// 세션 목록 조회
export const sessionListHandler = http.get('/api/sessions', () => {
  const sessions = db.session.getAll().map((s) => ({
    ['id']: s.id,
    ['programId']: s.programId,
    ['startsAt']: s.startsAt,
    ['endsAt']: s.endsAt,
    ['capacity']: s.capacity,
    ['status']: s.status,
  }));

  return HttpResponse.json({ ['sessions']: sessions }, { status: 200 });
});

// 세션 상세 조회
export const sessionDetailHandler = http.get('/api/sessions/:id', ({ params }) => {
  const id = Number(params['id']);
  const session = db.session.findFirst({ where: { id: { equals: id } } });
  if (!session) return HttpResponse.json({ error: 'Session not found' }, { status: 404 });
  return HttpResponse.json({ ['session']: session }, { status: 200 });
});

// 세션 삭제
export const sessionDeleteHandler = http.delete('/api/sessions/:id', ({ params }) => {
  const id = Number(params['id']);
  db.session.delete({ where: { id: { equals: id } } });
  return HttpResponse.json({ ['deleted']: id }, { status: 200 });
});

// Export
export const sessionHandlers = [
  sessionCreateHandler,
  sessionListHandler,
  sessionDetailHandler,
  sessionDeleteHandler,
];
