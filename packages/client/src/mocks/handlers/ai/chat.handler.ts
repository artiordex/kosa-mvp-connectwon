/**
 * Description : chat.handler.ts - 📌 AI Chat(대화형) Mock API 핸들러
 * Author : Shiwoo Min
 * Date : 2025-10-09
 */
import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker/locale/ko';
import { db } from '../../db/schema';

// AI Chat - 사용자 메시지 기반 대화형 응답 모킹
export const aiChatHandler = http.post('/api/ai/chat', async ({ request }) => {
  // 요청 바디 안전 파싱
  const body = (await request.json().catch(() => ({}))) as Record<string, any>;
  const userMessage = body['message'] ?? '(empty)';

  // 랜덤 응답 (ChatGPT/Claude 느낌으로)
  const response = faker.helpers.arrayElement([
    '그건 정말 흥미로운 아이디어네요!',
    '조금 더 구체적으로 설명해주실 수 있을까요?',
    '비슷한 사례로 이런 게 있습니다...',
    '좋은 접근이에요. 다만 이 부분은 유의해야 합니다.',
    '흥미로운 질문이에요. 더 자세히 이야기해볼까요?',
  ]);

  // AI 상호작용 로그 저장
  const interaction = db.aiInteraction.create({
    ['userId']: body['userId'] ?? null,
    ['provider']: 'openai',
    ['model']: 'gpt-4',
    ['kind']: 'chatbot',
    ['status']: 'OK',
  });

  // 응답 반환
  return HttpResponse.json(
    {
      ['userMessage']: userMessage,
      ['reply']: response,
      ['traceId']: interaction.id,
      ['meta']: {
        tokens: faker.number.int({ min: 300, max: 800 }),
        model: 'gpt-4',
      },
    },
    { status: 200 }
  );
});

// AI Chat - 세션 기반 대화 이력 조회
export const aiChatHistoryHandler = http.get('/api/ai/chat/history/:userId', ({ params }) => {
  const userId = Number(params['userId']);
  const logs = db.aiInteraction
    .getAll()
    .filter((a) => a.userId === userId && a.kind === 'chatbot')
    .slice(-10)
    .map((a) => ({
      ['traceId']: a.id,
      ['model']: a.model,
      ['status']: a.status,
      ['createdAt']: a.createdAt,
    }));

  return HttpResponse.json(
    {
      ['userId']: userId,
      ['messages']: logs,
    },
    { status: 200 }
  );
});

// Export
export const chatHandlers = [aiChatHandler, aiChatHistoryHandler];
