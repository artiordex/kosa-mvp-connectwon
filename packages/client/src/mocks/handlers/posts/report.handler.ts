/**
 * Description : report.handler.ts - 📌 신고(Report) 관련 Mock API 핸들러
 * Author : Shiwoo Min
 * Date : 2025-10-09
 */
import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker/locale/ko';

// 신고 접수
export const reportCreateHandler = http.post('/api/reports', async ({ request }) => {
  const body = (await request.json().catch(() => ({}))) as Record<string, any>;
  const report = {
    ['id']: faker.number.int({ min: 1, max: 999999 }),
    ['targetType']: body['targetType'] ?? faker.helpers.arrayElement(['post', 'comment']),
    ['targetId']: body['targetId'] ?? faker.number.int({ min: 1, max: 999999 }),
    ['reason']: body['reason'] ?? faker.lorem.sentence(),
    ['reporterId']: body['reporterId'] ?? faker.number.int({ min: 1, max: 999 }),
    ['createdAt']: new Date().toISOString(),
    ['status']: 'RECEIVED',
  };

  return HttpResponse.json({ ['report']: report }, { status: 201 });
});

// 신고 목록 조회
export const reportListHandler = http.get('/api/admin/reports', () => {
  const reports = Array.from({ length: 10 }).map(() => ({
    ['id']: faker.number.int({ min: 1, max: 999999 }),
    ['targetType']: faker.helpers.arrayElement(['post', 'comment']),
    ['reason']: faker.lorem.sentence(),
    ['status']: faker.helpers.arrayElement(['RECEIVED', 'IN_REVIEW', 'RESOLVED']),
    ['createdAt']: new Date().toISOString(),
  }));
  return HttpResponse.json({ ['reports']: reports }, { status: 200 });
});

// 신고 상태 변경
export const reportUpdateHandler = http.patch('/api/admin/reports/:id', async ({ params, request }) => {
  const id = Number(params['id']);
  const body = (await request.json().catch(() => ({}))) as Record<string, any>;
  const updated = {
    ['id']: id,
    ['status']: body['status'] ?? 'RESOLVED',
    ['updatedAt']: new Date().toISOString(),
  };

  return HttpResponse.json({ ['report']: updated }, { status: 200 });
});

// Export
export const reportHandlers = [
  reportCreateHandler,
  reportListHandler,
  reportUpdateHandler,
];
