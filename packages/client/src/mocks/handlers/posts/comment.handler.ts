/**
 * Description : comment.handler.ts - 📌 댓글(Comment) 관련 Mock API 핸들러
 * Author : Shiwoo Min
 * Date : 2025-10-09
 */

import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker/locale/ko';

// 댓글 작성
export const commentCreateHandler = http.post('/api/comments', async ({ request }) => {
  const body = (await request.json().catch(() => ({}))) as Record<string, any>;
  const comment = {
    ['id']: faker.number.int({ min: 1, max: 999999 }),
    ['postId']: body['postId'] ?? faker.number.int({ min: 1, max: 300 }),
    ['userId']: body['userId'] ?? faker.number.int({ min: 1, max: 999 }),
    ['content']: body['content'] ?? faker.lorem.sentence(),
    ['createdAt']: new Date().toISOString(),
  };

  return HttpResponse.json({ ['comment']: comment }, { status: 201 });
});

// 댓글 목록 조회
export const commentListHandler = http.get('/api/comments/:postId', ({ params }) => {
  const postId = Number(params['postId']);
  const comments = Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(() => ({
    ['id']: faker.number.int({ min: 1, max: 999999 }),
    ['postId']: postId,
    ['userName']: faker.person.fullName(),
    ['content']: faker.lorem.sentence(),
    ['createdAt']: new Date().toISOString(),
  }));

  return HttpResponse.json({ ['comments']: comments }, { status: 200 });
});

// 댓글 삭제
export const commentDeleteHandler = http.delete('/api/comments/:id', ({ params }) => {
  const id = Number(params['id']);
  return HttpResponse.json({ ['deleted']: id }, { status: 200 });
});

// Export
export const commentHandlers = [
  commentCreateHandler,
  commentListHandler,
  commentDeleteHandler,
];
