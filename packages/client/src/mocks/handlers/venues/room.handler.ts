/**
 * Description : room.handler.ts - 📌 공간(Room) 관리 Mock API 핸들러
 * Author : Shiwoo Min
 * Date : 2025-10-09
 */
import { http, HttpResponse } from 'msw';
import { db } from '../../db/schema';
import { faker } from '@faker-js/faker/locale/ko';

// 공간 목록
export const roomListHandler = http.get('/api/venues/rooms', () => {
  const rooms = db.room.getAll().map((r) => ({
    ['id']: r.id,
    ['venueId']: r.venueId,
    ['name']: r.name,
    ['capacity']: r.capacity,
    ['status']: r.status,
  }));
  return HttpResponse.json({ ['rooms']: rooms }, { status: 200 });
});

// 공간 등록
export const roomCreateHandler = http.post('/api/venues/rooms', async ({ request }) => {
  const body = (await request.json().catch(() => ({}))) as Record<string, any>;
  const newRoom = db.room.create({
    ['venueId']: body['venueId'] ?? faker.number.int({ min: 1, max: 20 }),
    ['name']: body['name'] ?? `회의실 ${faker.number.int({ min: 1, max: 50 })}`,
    ['capacity']: body['capacity'] ?? faker.number.int({ min: 4, max: 30 }),
    ['status']: body['status'] ?? 'AVAILABLE',
  });
  return HttpResponse.json({ ['created']: newRoom }, { status: 201 });
});

// 공간 삭제
export const roomDeleteHandler = http.delete('/api/venues/rooms/:id', ({ params }) => {
  const id = Number(params['id']);
  db.room.delete({ where: { id: { equals: id } } });
  return HttpResponse.json({ ['deleted']: id }, { status: 200 });
});

// Export
export const roomHandlers = [roomListHandler, roomCreateHandler, roomDeleteHandler];
