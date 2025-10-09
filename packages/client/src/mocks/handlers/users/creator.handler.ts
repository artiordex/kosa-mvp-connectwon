/**
 * Description : creator.handler.ts - 📌 프로그램 크리에이터(주최자) 관련 Mock API 핸들러
 * Author : Shiwoo Min
 * Date : 2025-10-09
 */

import { http, HttpResponse } from 'msw';
import { db } from '../../db/schema';
import { faker } from '@faker-js/faker/locale/ko';

// 크리에이터 목록 조회
export const creatorListHandler = http.get('/api/creators', () => {
  const creators = db.user
    .getAll()
    .filter((u) => (u.roleFlags ?? 0) & 2) // 2 비트 → Creator 권한
    .map((c) => ({
      ['id']: c.id,
      ['name']: c.name,
      ['email']: c.email,
      ['joinedAt']: c.createdAt,
      ['programCount']: faker.number.int({ min: 1, max: 10 }),
    }));

  return HttpResponse.json({ ['creators']: creators }, { status: 200 });
});

// 크리에이터 상세
export const creatorDetailHandler = http.get('/api/creators/:id', ({ params }) => {
  const id = Number(params['id']);
  const creator = db.user.findFirst({ where: { id: { equals: id } } });
  if (!creator) return HttpResponse.json({ error: 'Creator not found' }, { status: 404 });

  const programs = db.program
    .getAll()
    .filter((p) => p.createdByUserId === id)
    .map((p) => ({ ['id']: p.id, ['title']: p.title }));

  return HttpResponse.json({ ['creator']: creator, ['programs']: programs }, { status: 200 });
});

// Export
export const creatorHandlers = [creatorListHandler, creatorDetailHandler];
