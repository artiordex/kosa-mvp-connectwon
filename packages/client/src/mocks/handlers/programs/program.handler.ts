/**
 * Description : program.handler.ts - 📌 프로그램(Program) 관련 Mock API 핸들러
 * Author : Shiwoo Min
 * Date : 2025-10-09
 */
import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker/locale/ko';
import { db } from '../../db/schema';

// 프로그램 생성
export const programCreateHandler = http.post('/api/programs', async ({ request }) => {
  const body = (await request.json().catch(() => ({}))) as Record<string, any>;

  const program = db.program.create({
    ['title']: body['title'] ?? faker.helpers.arrayElement([
      'AI 기반 서비스 기획',
      '스타트업 브랜딩 워크샵',
      'UX/UI 기초 세션',
      '창업 전략 포럼',
    ]),
    ['description']: body['description'] ?? faker.lorem.paragraphs(2),
    ['createdByUserId']: body['userId'] ?? faker.number.int({ min: 1, max: 999 }),
    ['category']: body['category'] ?? '창업',
    ['meta']: JSON.stringify({
      thumbnail: faker.image.url(),
      tags: ['AI', '비즈니스', '디자인'],
      maxParticipants: faker.number.int({ min: 10, max: 50 }),
    }),
  });

  return HttpResponse.json({ ['program']: program }, { status: 201 });
});

// 프로그램 목록 조회
export const programListHandler = http.get('/api/programs', () => {
  const programs = db.program.getAll().map((p) => ({
    ['id']: p.id,
    ['title']: p.title,
    ['category']: p.category,
    ['createdAt']: p.createdAt,
  }));
  return HttpResponse.json({ ['programs']: programs }, { status: 200 });
});

// 프로그램 상세 조회
export const programDetailHandler = http.get('/api/programs/:id', ({ params }) => {
  const id = Number(params['id']);
  const program = db.program.findFirst({ where: { id: { equals: id } } });
  if (!program) return HttpResponse.json({ error: 'Program not found' }, { status: 404 });
  return HttpResponse.json({ ['program']: program }, { status: 200 });
});

// 프로그램 삭제
export const programDeleteHandler = http.delete('/api/programs/:id', ({ params }) => {
  const id = Number(params['id']);
  db.program.delete({ where: { id: { equals: id } } });
  return HttpResponse.json({ ['deleted']: id }, { status: 200 });
});

// Export
export const programHandlers = [
  programCreateHandler,
  programListHandler,
  programDetailHandler,
  programDeleteHandler,
];
