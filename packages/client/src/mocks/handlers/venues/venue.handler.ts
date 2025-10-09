/**
 * Description : venue.handler.ts - 📌 장소(Venue) 관리 Mock API 핸들러
 * Author : Shiwoo Min
 * Date : 2025-10-09
 */
import { http, HttpResponse } from 'msw';
import { db } from '../../db/schema';
import { faker } from '@faker-js/faker/locale/ko';

// 장소 목록
export const venueListHandler = http.get('/api/venues', () => {
  const venues = db.venue.getAll().map((v) => ({
    ['id']: v.id,
    ['name']: v.name,
    ['address']: v.address,
    ['openingHours']: v.openingHours,
  }));
  return HttpResponse.json({ ['venues']: venues }, { status: 200 });
});

// 장소 등록
export const venueCreateHandler = http.post('/api/venues', async ({ request }) => {
  const body = (await request.json().catch(() => ({}))) as Record<string, any>;
  const newVenue = db.venue.create({
    ['name']: body['name'] ?? `${faker.location.city()} 창업센터`,
    ['address']: body['address'] ?? faker.location.streetAddress(),
    ['openingHours']: body['openingHours'] ?? JSON.stringify({
      weekday: { open: '09:00', close: '21:00' },
      weekend: { open: '10:00', close: '18:00' },
    }),
  });
  return HttpResponse.json({ ['created']: newVenue }, { status: 201 });
});

// 장소 삭제
export const venueDeleteHandler = http.delete('/api/venues/:id', ({ params }) => {
  const id = Number(params['id']);
  db.venue.delete({ where: { id: { equals: id } } });
  return HttpResponse.json({ ['deleted']: id }, { status: 200 });
});

// Export
export const venueHandlers = [venueListHandler, venueCreateHandler, venueDeleteHandler];
