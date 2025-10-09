/**
 * Description : recommendation.handler.ts - 📌 AI 추천(Mock Recommendation) API 핸들러
 * Author : Shiwoo Min
 * Date : 2025-10-09
 */
import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker/locale/ko';
import { db } from '../../db/schema';

// AI Recommendation - 사용자 맞춤 프로그램 추천 시뮬레이션
export const aiRecommendationHandler = http.post('/api/ai/recommendation', async ({ request }) => {
  const body = (await request.json().catch(() => ({}))) as Record<string, any>;
  const userId = body['userId'];

  const recommended = Array.from({ length: 5 }).map(() => ({
    ['programId']: faker.number.int({ min: 1, max: 300 }),
    ['title']: faker.helpers.arrayElement([
      'AI 기초 과정',
      '창업 인사이트 세션',
      '디자인 씽킹 워크숍',
      '개발자 네트워킹',
      '비즈니스 피칭 훈련',
    ]),
    ['reason']: faker.lorem.sentence(),
  }));

  // 로그 기록
  const interaction = db.aiInteraction.create({
    ['userId']: userId ?? null,
    ['provider']: 'openai',
    ['model']: 'gpt-4',
    ['kind']: 'recommendation',
    ['status']: 'OK',
  });

  // 응답
  return HttpResponse.json(
    {
      ['userId']: userId,
      ['recommendations']: recommended,
      ['traceId']: interaction.id,
    },
    { status: 200 }
  );
});

// Export
export const recommendationHandlers = [aiRecommendationHandler];
