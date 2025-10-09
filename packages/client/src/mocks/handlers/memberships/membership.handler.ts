/**
 * Description : membership.handler.ts - 📌 사용자 멤버십(등급, 만료, 혜택 연동) 관련 Mock API 핸들러
 * Author : Shiwoo Min
 * Date : 2025-10-09
 */

import { http, HttpResponse } from 'msw';
import { db } from '../../db/schema';
import { faker } from '@faker-js/faker/locale/ko';

/**
 * 전체 멤버십 목록 조회 (GET /api/memberships)
 * - 관리자용
 */
export const getAllMembershipsHandler = http.get('/api/memberships', () => {
  const memberships = db.membership.getAll?.() ?? [];

  return HttpResponse.json({
    total: memberships.length,
    data: memberships,
  });
});

/**
 * 사용자 멤버십 조회 (GET /api/memberships/:userId)
 * - 사용자 자신의 멤버십 상태 확인
 */
export const getMembershipByUserHandler = http.get('/api/memberships/:userId', ({ params }) => {
  const { userId } = params;
  const membership = db.membership.findFirst({
    where: { userId: { equals: Number(userId) } },
  });

  if (!membership) {
    return HttpResponse.json(
      { error: '해당 사용자의 멤버십 정보를 찾을 수 없습니다.' },
      { status: 404 }
    );
  }

  return HttpResponse.json(membership);
});

/**
 * 멤버십 등록 (POST /api/memberships)
 * - 신규 멤버 가입 또는 업그레이드
 */
export const createMembershipHandler = http.post('/api/memberships', async ({ request }) => {
  const body = (await request.json()) as {
    userId: number;
    level: 'BASIC' | 'PRO' | 'PREMIUM';
    expiresAt?: string;
  };

  const exists = db.membership.findFirst({
    where: { userId: { equals: body.userId } },
  });

  if (exists) {
    return HttpResponse.json(
      { error: '이미 멤버십이 존재합니다.' },
      { status: 409 }
    );
  }

  const newMembership = db.membership.create({
    userId: body.userId,
    level: body.level,
    joinedAt: new Date(),
    expiresAt: body.expiresAt ? new Date(body.expiresAt) : faker.date.future(),
    benefits: JSON.stringify([]),
  });

  return HttpResponse.json({
    message: '멤버십이 등록되었습니다.',
    data: newMembership,
  });
});

/**
 * 멤버십 갱신 (PATCH /api/memberships/:userId)
 * - 등급 변경 또는 연장
 */
export const updateMembershipHandler = http.patch('/api/memberships/:userId', async ({ params, request }) => {
  const { userId } = params;
  const body = (await request.json()) as {
    level?: 'BASIC' | 'PRO' | 'PREMIUM';
    expiresAt?: string;
  };

  const membership = db.membership.findFirst({
    where: { userId: { equals: Number(userId) } },
  });

  if (!membership) {
    return HttpResponse.json({ error: '갱신할 멤버십이 없습니다.' }, { status: 404 });
  }

  const updated = db.membership.update({
    where: { id: { equals: membership.id } },
    data: {
      level: body.level ?? membership.level,
      expiresAt: body.expiresAt ? new Date(body.expiresAt) : faker.date.future(),
      updatedAt: new Date(),
    },
  });

  return HttpResponse.json({
    message: '멤버십 정보가 갱신되었습니다.',
    data: updated,
  });
});

/**
 * 멤버십 해지 (DELETE /api/memberships/:userId)
 */
export const deleteMembershipHandler = http.delete('/api/memberships/:userId', ({ params }) => {
  const { userId } = params;
  const deleted = db.membership.delete({
    where: { userId: { equals: Number(userId) } },
  });

  if (!deleted) {
    return HttpResponse.json({ error: '삭제할 멤버십이 없습니다.' }, { status: 404 });
  }

  return HttpResponse.json({ message: '멤버십이 해지되었습니다.' });
});

export const membershipHandlers = [
  getAllMembershipsHandler,
  getMembershipByUserHandler,
  createMembershipHandler,
  updateMembershipHandler,
  deleteMembershipHandler,
];
