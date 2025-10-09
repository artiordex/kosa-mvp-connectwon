/**
 * Description : review.handler.ts - 📌 리뷰(Review) 관련 Mock API 핸들러
 * Author : Shiwoo Min
 * Date : 2025-10-09
 */
import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker/locale/ko';
import { db } from '../../db/schema';

// 리뷰 작성
export const reviewCreateHandler = http.post('/api/reviews', async ({ request }) => {
  const body = (await request.json().catch(() => ({}))) as Record<string, any>;

  const review = db.review.create({
    ['userId']: body['userId'] ?? faker.number.int({ min: 1, max: 999 }),
    ['targetType']: body['targetType'] ?? 'program',
    ['targetId']: body['targetId'] ?? faker.number.int({ min: 1, max: 300 }),
    ['rating']: body['rating'] ?? faker.number.int({ min: 1, max: 5 }),
    ['comment']: body['comment'] ?? faker.lorem.sentence(),
  });
  return HttpResponse.json({ ['review']: review }, { status: 201 });
});

// 리뷰 목록 조회
export const reviewListHandler = http.get('/api/reviews/:targetType/:targetId', ({ params }) => {
  const { targetType, targetId } = params;
  const reviews = db.review
    .getAll()
    .filter((r) => r.targetType === targetType && r.targetId === Number(targetId));
  return HttpResponse.json({ ['reviews']: reviews }, { status: 200 });
});

// 리뷰 삭제
export const reviewDeleteHandler = http.delete('/api/reviews/:id', ({ params }) => {
  const id = Number(params['id']);
  db.review.delete({ where: { id: { equals: id } } });
  return HttpResponse.json({ ['deleted']: id }, { status: 200 });
});

// Export
export const reviewHandlers = [
  reviewCreateHandler,
  reviewListHandler,
  reviewDeleteHandler,
];
