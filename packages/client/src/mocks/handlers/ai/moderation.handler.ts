/**
 * Description : moderation.handler.ts - 📌 AI 검열(Mock Moderation) API 핸들러
 * Author : Shiwoo Min
 * Date : 2025-10-09
 */
import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker/locale/ko';
import { db } from '../../db/schema';

// AI Moderation - 텍스트 검열 시뮬레이션
export const aiModerationHandler = http.post('/api/ai/moderation', async ({ request }) => {
  const body = (await request.json().catch(() => ({}))) as Record<string, any>;
  const text = body['text'] ?? '';

  // 10% 확률로 검열 플래그 발생
  const flagged = faker.datatype.boolean({ probability: 0.1 });
  const categories = flagged ? ['욕설', '폭력적 표현'] : [];

  // 상호작용 로그 저장
  const interaction = db.aiInteraction.create({
    ['userId']: body['userId'] ?? null,
    ['provider']: 'openai',
    ['model']: 'gpt-4',
    ['kind']: 'moderation',
    ['status']: flagged ? 'ERROR' : 'OK',
  });

  // 응답 반환
  return HttpResponse.json(
    {
      ['input']: text,
      ['flagged']: flagged,
      ['categories']: categories,
      ['safe']: !flagged,
      ['traceId']: interaction.id,
    },
    { status: 200 }
  );
});

// Export
export const moderationHandlers = [aiModerationHandler];
