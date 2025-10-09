/**
 * Description : program-management.handler.ts - 📌 관리자용 프로그램 관리 Mock API 핸들러
 * Author : Shiwoo Min
 * Date : 2025-10-09
 */

import { http, HttpResponse } from 'msw';
import { db } from '../../db/schema';
import { faker } from '@faker-js/faker/locale/ko';

/** 프로그램 목록 조회 */
export const programListHandler = http.get('/api/admin/programs', () => {
  const programs = db.program.getAll().map(p => ({
    id: p.id,
    title: p.title,
    category: p.category,
    participants: db.programParticipant.getAll().filter(pp => pp.sessionId === p.id).length,
    createdAt: p.createdAt,
  }));

  return HttpResponse.json({ programs }, { status: 200 });
});

/** 프로그램 등록 */
export const programCreateHandler = http.post('/api/admin/programs', async ({ request }) => {
  const body = (await request.json().catch(() => ({}))) as Record<string, any>;
  const newProgram = db.program.create({
    title: body['title'] ?? '새 프로그램',
    description: body['description'] ?? faker.lorem.paragraph(),
    category: body['category'] ?? '기타',
    createdByUserId: Number(body['userId'] ?? 1),
  });

  return HttpResponse.json({ created: newProgram }, { status: 201 });
});

/** 프로그램 삭제 */
export const programDeleteHandler = http.delete('/api/admin/programs/:id', ({ params }) => {
  const id = Number(params['id']);

  db.program.delete({
    where: { id: { equals: id } },
  });

  return HttpResponse.json({ deleted: id }, { status: 200 });
});

export const programManagementHandlers = [
  programListHandler,
  programCreateHandler,
  programDeleteHandler,
];
