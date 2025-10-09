/**
 * Description : payment.handler.ts - 📌 결제(Mock Payment) 관련 API 핸들러
 * Author : Shiwoo Min
 * Date : 2025-10-09
 */
import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker/locale/ko';

// 결제 생성 (Payment Initiation)
export const paymentCreateHandler = http.post('/api/payments', async ({ request }) => {
  const body = (await request.json().catch(() => ({}))) as Record<string, any>;

  const payment = {
    ['id']: faker.string.uuid(),
    ['userId']: body['userId'] ?? null,
    ['amount']: body['amount'] ?? faker.number.int({ min: 1000, max: 50000 }),
    ['currency']: body['currency'] ?? 'KRW',
    ['method']: body['method'] ?? faker.helpers.arrayElement(['card', 'bank', 'kakao', 'naver']),
    ['status']: 'PENDING',
    ['createdAt']: new Date().toISOString(),
  };
  return HttpResponse.json({ ['payment']: payment }, { status: 201 });
});

// 결제 확인 (Payment Confirmation)
export const paymentConfirmHandler = http.post('/api/payments/:id/confirm', ({ params }) => {
  const paymentId = params['id'];
  const success = faker.datatype.boolean({ probability: 0.95 });

  const updated = {
    ['id']: paymentId,
    ['status']: success ? 'SUCCESS' : 'FAILED',
    ['confirmedAt']: new Date().toISOString(),
  };

  return HttpResponse.json({ ['result']: updated }, { status: 200 });
});

// 결제 상태 조회
export const paymentStatusHandler = http.get('/api/payments/:id', ({ params }) => {
  const paymentId = params['id'];
  const status = faker.helpers.arrayElement(['PENDING', 'SUCCESS', 'FAILED', 'CANCELLED']);

  return HttpResponse.json(
    {
      ['payment']: {
        ['id']: paymentId,
        ['status']: status,
        ['amount']: faker.number.int({ min: 1000, max: 50000 }),
      },
    },
    { status: 200 }
  );
});

// Export
export const paymentHandlers = [
  paymentCreateHandler,
  paymentConfirmHandler,
  paymentStatusHandler,
];
