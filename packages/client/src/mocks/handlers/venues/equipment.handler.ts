/**
 * Description : equipment.handler.ts - 📌 비품(Equipment) 관리 Mock API 핸들러
 * Author : Shiwoo Min
 * Date : 2025-10-09
 */
import { http, HttpResponse } from 'msw';
import { db } from '../../db/schema';
import { faker } from '@faker-js/faker/locale/ko';

// 비품 목록 조회
export const equipmentListHandler = http.get('/api/venues/equipment', () => {
  const equipmentList = db.equipment.getAll().map((e: any) => ({
    ['id']: e.id,
    ['name']: e.name,
    ['quantity']: e.quantity,
    ['status']: e.status,
  }));
  return HttpResponse.json({ ['equipment']: equipmentList }, { status: 200 });
});

// 비품 등록
export const equipmentCreateHandler = http.post('/api/venues/equipment', async ({ request }) => {
  const body = (await request.json().catch(() => ({}))) as Record<string, any>;
  const newItem = db.equipment.create({
    ['name']: body['name'] ?? faker.commerce.productName(),
    ['quantity']: body['quantity'] ?? faker.number.int({ min: 1, max: 20 }),
    ['status']: body['status'] ?? 'AVAILABLE',
  });

  return HttpResponse.json({ ['created']: newItem }, { status: 201 });
});

// 비품 삭제
export const equipmentDeleteHandler = http.delete('/api/venues/equipment/:id', ({ params }) => {
  const id = Number(params['id']);
  db.equipment.delete({ where: { id: { equals: id } } });
  return HttpResponse.json({ ['deleted']: id }, { status: 200 });
});

// Export
export const equipmentHandlers = [
  equipmentListHandler,
  equipmentCreateHandler,
  equipmentDeleteHandler,
];
