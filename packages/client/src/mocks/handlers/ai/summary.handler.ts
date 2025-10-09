/**
 * Description : summary.handler.ts - 📌 AI 요약(Mock Summary) API 핸들러
 * Author : Shiwoo Min
 * Date : 2025-10-09
 */
import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker/locale/ko';
import { db } from '../../db/schema';

// AI Summary - 텍스트 요약 시뮬레이션
export const aiSummaryHandler = http.post('/api/ai/summary', async ({ request }) => {
  const body = (await request.json().catch(() => ({}))) as Record<string, any>;
  const text = body['text'] ?? faker.lorem.paragraphs(2);

  const summary = faker.lorem.sentences(3);

  // 로그 저장
  const interaction = db.aiInteraction.create({
    ['userId']: body['userId'] ?? null,
    ['programId']: body['programId'] ?? null,
    ['sessionId']: body['sessionId'] ?? null,
    ['provider']: 'openai',
    ['model']: 'gpt-4',
    ['kind']: 'program_summary',
    ['status']: 'OK',
  });

  // 응답 반환
  return HttpResponse.json(
    {
      ['input']: text,
      ['summary']: summary,
      ['traceId']: interaction.id,
      ['meta']: { sourceLength: text.length },
    },
    { status: 200 }
  );
});

// Export
export const summaryHandlers = [aiSummaryHandler];
