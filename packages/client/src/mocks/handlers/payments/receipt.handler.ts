/**
 * Description : receipt.handler.ts - 📌 결제 영수증(Mock Receipt) 관련 API 핸들러
 * Author : Shiwoo Min
 * Date : 2025-10-09
 */
import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker/locale/ko';

// 영수증 생성
export const receiptCreateHandler = http.post('/api/receipts', async ({ request }) => {
  const body = (await request.json().catch(() => ({}))) as Record<string, any>;

  const receipt = {
    ['id']: faker.string.uuid(),
    ['paymentId']: body['paymentId'] ?? faker.string.uuid(),
    ['userId']: body['userId'] ?? null,
    ['amount']: body['amount'] ?? faker.number.int({ min: 1000, max: 50000 }),
    ['issuedAt']: new Date().toISOString(),
    ['merchant']: faker.company.name(),
    ['receiptUrl']: faker.internet.url(),
  };

  return HttpResponse.json({ ['receipt']: receipt }, { status: 201 });
});

// 영수증 조회
export const receiptDetailHandler = http.get('/api/receipts/:id', ({ params }) => {
  const id = params['id'];
  const receipt = {
    ['id']: id,
    ['paymentId']: faker.string.uuid(),
    ['userId']: faker.number.int({ min: 1, max: 999 }),
    ['amount']: faker.number.int({ min: 1000, max: 80000 }),
    ['issuedAt']: new Date().toISOString(),
    ['merchant']: faker.company.name(),
    ['receiptUrl']: faker.internet.url(),
  };

  return HttpResponse.json({ ['receipt']: receipt }, { status: 200 });
});

// Export
export const receiptHandlers = [receiptCreateHandler, receiptDetailHandler];
