/**
 * Description : reservation.handler.ts - 📌 예약(Reservation) 관리 Mock API 핸들러
 * Author : Shiwoo Min
 * Date : 2025-10-09
 */
import { http, HttpResponse } from 'msw';
import { db } from '../../db/schema';
import { faker } from '@faker-js/faker/locale/ko';

// 예약 목록
export const reservationListHandler = http.get('/api/venues/reservations', () => {
  const reservations = db.reservation.getAll().map((r: any) => ({
    ['id']: r.id,
    ['roomId']: r.roomId,
    ['userId']: r.userId,
    ['startTime']: r.startTime,
    ['endTime']: r.endTime,
    ['status']: r.status,
  }));
  return HttpResponse.json({ ['reservations']: reservations }, { status: 200 });
});

// 예약 생성
export const reservationCreateHandler = http.post('/api/venues/reservations', async ({ request }) => {
  const body = (await request.json().catch(() => ({}))) as Record<string, any>;
  const newRes = db.reservation.create({
    ['roomId']: body['roomId'] ?? faker.number.int({ min: 1, max: 50 }),
    ['userId']: body['userId'] ?? faker.number.int({ min: 1, max: 500 }),
    ['startTime']: body['startTime'] ?? faker.date.soon(),
    ['endTime']: body['endTime'] ?? faker.date.soon(),
    ['status']: body['status'] ?? 'CONFIRMED',
  });
  return HttpResponse.json({ ['created']: newRes }, { status: 201 });
});

// 예약 취소
export const reservationDeleteHandler = http.delete('/api/venues/reservations/:id', ({ params }) => {
  const id = Number(params['id']);
  db.reservation.delete({ where: { id: { equals: id } } });
  return HttpResponse.json({ ['deleted']: id }, { status: 200 });
});

// Export
export const reservationHandlers = [
  reservationListHandler,
  reservationCreateHandler,
  reservationDeleteHandler,
];
