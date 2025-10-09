/**
 * Description : post.handler.ts - 📌 게시글(Post) 관련 Mock API 핸들러
 * Author : Shiwoo Min
 * Date : 2025-10-09
 */

import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker/locale/ko';

// 게시글 작성
export const postCreateHandler = http.post('/api/posts', async ({ request }) => {
  const body = (await request.json().catch(() => ({}))) as Record<string, any>;

  const post = {
    ['id']: faker.number.int({ min: 1, max: 999999 }),
    ['userId']: body['userId'] ?? faker.number.int({ min: 1, max: 999 }),
    ['title']: body['title'] ?? faker.lorem.sentence(),
    ['content']: body['content'] ?? faker.lorem.paragraph(),
    ['category']: body['category'] ?? faker.helpers.arrayElement(['공지', '자유', 'Q&A']),
    ['createdAt']: new Date().toISOString(),
  };

  return HttpResponse.json({ ['post']: post }, { status: 201 });
});

// 게시글 목록 조회
export const postListHandler = http.get('/api/posts', () => {
  const posts = Array.from({ length: 10 }).map(() => ({
    ['id']: faker.number.int({ min: 1, max: 999999 }),
    ['title']: faker.lorem.sentence(),
    ['author']: faker.person.fullName(),
    ['category']: faker.helpers.arrayElement(['공지', '자유', 'Q&A']),
    ['createdAt']: new Date().toISOString(),
  }));

  return HttpResponse.json({ ['posts']: posts }, { status: 200 });
});

// 게시글 상세 조회
export const postDetailHandler = http.get('/api/posts/:id', ({ params }) => {
  const id = Number(params['id']);
  const post = {
    ['id']: id,
    ['title']: faker.lorem.sentence(),
    ['content']: faker.lorem.paragraphs(2),
    ['author']: faker.person.fullName(),
    ['category']: faker.helpers.arrayElement(['공지', '자유', 'Q&A']),
    ['createdAt']: new Date().toISOString(),
  };

  return HttpResponse.json({ ['post']: post }, { status: 200 });
});

// 게시글 삭제
export const postDeleteHandler = http.delete('/api/posts/:id', ({ params }) => {
  const id = Number(params['id']);
  return HttpResponse.json({ ['deleted']: id }, { status: 200 });
});

// Export
export const postHandlers = [
  postCreateHandler,
  postListHandler,
  postDetailHandler,
  postDeleteHandler,
];
