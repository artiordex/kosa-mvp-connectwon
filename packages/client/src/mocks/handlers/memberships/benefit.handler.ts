/**
 * Description : benefit.handler.ts - 📌 멤버십 혜택(쿠폰, 포인트, 이벤트 등) 관련 Mock API 핸들러
 * Author : Shiwoo Min
 * Date : 2025-10-09
 */

import { http, HttpResponse } from 'msw';
import { db } from '../../db/schema.js';
import { faker } from '@faker-js/faker/locale/ko';

/**
 * 모든 혜택 조회 (GET /api/benefits)
 * - 전체 혜택 목록 반환
 */
export const getAllBenefitsHandler = http.get('/api/benefits', () => {
  const benefits = db.benefit.getAll?.() ?? [];

  return HttpResponse.json({
    total: benefits.length,
    data: benefits,
  });
});

/**
 * 특정 혜택 조회 (GET /api/benefits/:id)
 * - ID 기반 단일 혜택 상세조회
 */
export const getBenefitByIdHandler = http.get('/api/benefits/:id', ({ params }) => {
  const { id } = params;
  const benefit = db.benefit.findFirst({
    where: { id: { equals: Number(id) } },
  });

  if (!benefit) {
    return HttpResponse.json({ error: '해당 혜택을 찾을 수 없습니다.' }, { status: 404 });
  }

  return HttpResponse.json(benefit);
});

/**
 * 혜택 등록 (POST /api/benefits)
 * - 관리자용 신규 혜택 생성
 */
export const createBenefitHandler = http.post('/api/benefits', async ({ request }) => {
  const body = (await request.json()) as {
    title: string;
    description: string;
    type: 'coupon' | 'point' | 'event';
    value: number;
    expiresAt?: string;
  };

  const newBenefit = db.benefit.create({
    title: body.title,
    description: body.description,
    type: body.type,
    value: body.value,
    expiresAt: body.expiresAt ? new Date(body.expiresAt) : faker.date.future(),
    createdAt: new Date(),
  });

  return HttpResponse.json({
    message: '혜택이 등록되었습니다.',
    data: newBenefit,
  });
});

/**
 * 혜택 삭제 (DELETE /api/benefits/:id)
 * - 관리자 전용
 */
export const deleteBenefitHandler = http.delete('/api/benefits/:id', ({ params }) => {
  const { id } = params;
  const deleted = db.benefit.delete({
    where: { id: { equals: Number(id) } },
  });

  if (!deleted) {
    return HttpResponse.json({ error: '삭제할 혜택이 존재하지 않습니다.' }, { status: 404 });
  }

  return HttpResponse.json({ message: '혜택이 삭제되었습니다.' });
});

/**
 * 사용 가능한 혜택 조회 (GET /api/benefits/active)
 * - 만료되지 않은 혜택 목록 반환
 */
export const getActiveBenefitsHandler = http.get('/api/benefits/active', () => {
  const now = new Date();
  const active = db.benefit.getAll?.().filter((b: any) => new Date(b.expiresAt) > now) ?? [];

  return HttpResponse.json({
    total: active.length,
    data: active,
  });
});

export const benefitHandlers = [
  getAllBenefitsHandler,
  getBenefitByIdHandler,
  createBenefitHandler,
  deleteBenefitHandler,
  getActiveBenefitsHandler,
];
