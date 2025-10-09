/**
 * Description : ai.handler.ts - 📌 AI 통합 Mock API 핸들러
 * Author : Shiwoo Min
 * Date : 2025-10-09
 */
import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker/locale/ko';
import { db } from '../../db/schema';

// AI 요약 (Summary)
export const aiSummaryHandler = http.post('/api/ai/summary', async ({ request }) => {
  const body = (await request.json().catch(() => ({}))) as Record<string, any>;
  const text = body['text'] ?? faker.lorem.paragraphs(2);

  const summary = faker.lorem.sentences(3);
  const interaction = db.aiInteraction.create({
    ['userId']: body['userId'] ?? null,
    ['programId']: body['programId'] ?? null,
    ['sessionId']: body['sessionId'] ?? null,
    ['provider']: 'openai',
    ['model']: 'gpt-4',
    ['kind']: 'program_summary',
  });

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

// AI 추천 (Recommendation)
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

  db.aiInteraction.create({
    ['userId']: userId ?? null,
    ['provider']: 'openai',
    ['model']: 'gpt-4',
    ['kind']: 'recommendation',
  });

  return HttpResponse.json(
    { ['userId']: userId, ['recommendations']: recommended },
    { status: 200 }
  );
});


// AI 채팅 (Chat)
export const aiChatHandler = http.post('/api/ai/chat', async ({ request }) => {
  const body = (await request.json().catch(() => ({}))) as Record<string, any>;
  const userMessage = body['message'] ?? '(empty)';

  const response = faker.helpers.arrayElement([
    '그건 정말 흥미로운 아이디어네요!',
    '조금 더 구체적으로 설명해주실 수 있을까요?',
    '비슷한 사례로 이런 게 있습니다...',
    '좋은 접근이에요. 다만 이 부분은 유의해야 합니다.',
  ]);

  const interaction = db.aiInteraction.create({
    ['userId']: body['userId'] ?? null,
    ['provider']: 'openai',
    ['model']: 'gpt-4',
    ['kind']: 'chatbot',
  });

  return HttpResponse.json(
    {
      ['userMessage']: userMessage,
      ['reply']: response,
      ['traceId']: interaction.id,
      ['meta']: { tokens: faker.number.int({ min: 300, max: 800 }) },
    },
    { status: 200 }
  );
});

// AI 검열 (Moderation)
export const aiModerationHandler = http.post('/api/ai/moderation', async ({ request }) => {
  const body = (await request.json().catch(() => ({}))) as Record<string, any>;
  const text = body['text'] ?? '';

  const flagged = faker.datatype.boolean({ probability: 0.1 });
  const categories = flagged ? ['욕설', '폭력적 표현'] : [];

  db.aiInteraction.create({
    ['userId']: body['userId'] ?? null,
    ['provider']: 'openai',
    ['model']: 'gpt-4',
    ['kind']: 'moderation',
  });

  return HttpResponse.json(
    {
      ['input']: text,
      ['flagged']: flagged,
      ['categories']: categories,
      ['safe']: !flagged,
    },
    { status: 200 }
  );
});

// AI 로그 조회 (관리용)
export const aiLogsHandler = http.get('/api/admin/ai/logs', () => {
  const logs = db.aiInteraction
    .getAll()
    .slice(-20)
    .map((a) => ({
      ['id']: a.id,
      ['kind']: a.kind,
      ['model']: a.model,
      ['status']: a.status,
      ['createdAt']: a.createdAt,
    }));

  return HttpResponse.json({ ['logs']: logs }, { status: 200 });
});

// Export
export const aiHandlers = [
  aiSummaryHandler,
  aiRecommendationHandler,
  aiChatHandler,
  aiModerationHandler,
  aiLogsHandler,
];
