/**
 * Description: ai.generator.ts - 📌 AI 상호작용 데이터 생성기
 * Author: Shiwoo Min
 * Date: 2025-10-09
 */
import { faker } from '@faker-js/faker/locale/ko';
import type {
  AIProvider,

  AIInteraction,
  AIChatMessage,
  AIRecommendation,
  AISentiment
} from '../../mock-types.js';

// AI 상호작용 생성
export function generateAIInteraction(override: Partial<AIInteraction> = {}): AIInteraction {
  const provider = faker.helpers.arrayElement(['openai', 'anthropic', 'huggingface'] as const);
  const kind = faker.helpers.arrayElement([
    'program_summary',
    'recommendation',
    'chatbot',
    'moderation',
    'sentiment_analysis',
    'tag_generation',
    'search_enhancement',
    'content_generation',
  ] as const);

  const modelMap: Record<AIProvider, string[]> = {
    openai: ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo'],
    anthropic: ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku'],
    huggingface: ['llama-2', 'mistral-7b', 'flan-t5'],
  };

  const promptTokens = faker.number.int({ min: 100, max: 2000 });
  const completionTokens = faker.number.int({ min: 50, max: 1000 });

  const costPerToken: Record<AIProvider, number> = {
    openai: 0.00003,
    anthropic: 0.00002,
    huggingface: 0.00001,
  };

  const cost = (promptTokens + completionTokens) * costPerToken[provider];

  return {
    id: faker.string.uuid(),
    userId: Math.random() > 0.2 ? faker.number.int({ min: 1, max: 999 }) : undefined,
    programId: Math.random() > 0.5 ? faker.number.int({ min: 1, max: 999 }) : undefined,
    sessionId: Math.random() > 0.7 ? faker.number.int({ min: 1, max: 999 }) : undefined,
    provider,
    model: faker.helpers.arrayElement(modelMap[provider]),
    kind,
    promptTokens,
    completionTokens,
    cost: parseFloat(cost.toFixed(6)),
    status: faker.helpers.arrayElement(['OK', 'OK', 'OK', 'ERROR']),
    traceId: faker.string.uuid(),
    metadata: {
      temperature: faker.number.float({ min: 0, max: 1, fractionDigits: 1 }),
      maxTokens: faker.number.int({ min: 500, max: 2000 }),
      topP: faker.number.float({ min: 0.8, max: 1.0, fractionDigits: 1 }),
    },
    createdAt: faker.date.recent().toISOString(),
    ...override,
  } satisfies AIInteraction;
}

// AI 챗봇 메시지 생성
export function generateAIChatMessage(override: Partial<AIChatMessage> = {}): AIChatMessage {
  const role = faker.helpers.arrayElement(['user', 'assistant'] as const);

  const userMessages = [
    '프로그램 추천해줘',
    '예약 어떻게 해?',
    '취소 정책이 어떻게 돼?',
    '환불 가능해?',
    '강남점 위치가 어디야?',
    '멤버십 혜택이 뭐야?',
  ];

  const assistantMessages = [
    '네, 도움을 드리겠습니다. 관심있는 분야를 알려주시겠어요?',
    '예약은 웹사이트에서 원하시는 프로그램을 선택하신 후 날짜를 선택하시면 됩니다.',
    '취소는 프로그램 시작 24시간 전까지 가능하며, 전액 환불됩니다.',
    '강남점은 서울시 강남구 테헤란로 123에 위치해 있습니다.',
    '멤버십은 Basic, Pro, Premium 3가지가 있으며, 각각 다른 혜택을 제공합니다.',
  ];

  const content =
    role === 'user'
      ? faker.helpers.arrayElement(userMessages)
      : faker.helpers.arrayElement(assistantMessages);

  return {
    id: faker.string.uuid(),
    conversationId: faker.string.uuid(),
    role,
    content,
    timestamp: faker.date.recent().toISOString(),
    tokens: Math.round(content.length * 1.5),
    ...override,
  };
}

// AI 추천 데이터 생성
export function generateAIRecommendation(override: Partial<AIRecommendation> = {}): AIRecommendation {
  const type = faker.helpers.arrayElement(['program', 'session', 'venue', 'mentor'] as const);
  const itemCount = faker.number.int({ min: 3, max: 10 });

  const reasons = {
    program: [
      '이전 참여 프로그램과 유사한 주제입니다',
      '관심사 기반 추천입니다',
      '높은 만족도를 받은 프로그램입니다',
      '비슷한 사용자들이 선택한 프로그램입니다',
    ],
    session: ['선호하는 시간대입니다', '참여 가능한 인원이 있습니다', '가까운 거리에 있습니다'],
    venue: ['접근성이 좋은 위치입니다', '시설이 우수합니다', '평점이 높은 장소입니다'],
    mentor: ['전문 분야의 멘토입니다', '높은 평가를 받은 멘토입니다', '활발한 활동을 하고 있습니다'],
  };

  const items = Array.from({ length: itemCount }, () => ({
    id: faker.number.int({ min: 1, max: 999 }),
    score: faker.number.float({ min: 0.6, max: 1.0, fractionDigits: 2 }),
    reason: faker.helpers.arrayElement(reasons[type]),
  })).sort((a, b) => b.score - a.score);

  return {
    id: faker.string.uuid(),
    userId: faker.number.int({ min: 1, max: 999 }),
    type,
    items,
    generatedAt: faker.date.recent().toISOString(),
    ...override,
  };
}

// AI 감성 분석 생성
export function generateAISentiment(text?: string): AISentiment {
  const sentiment = faker.helpers.arrayElement(['positive', 'negative', 'neutral'] as const);

  const sentimentScores = {
    positive: faker.number.float({ min: 0.6, max: 1.0, fractionDigits: 2 }),
    negative: faker.number.float({ min: -1.0, max: -0.6, fractionDigits: 2 }),
    neutral: faker.number.float({ min: -0.2, max: 0.2, fractionDigits: 2 }),
  };

  const keywordsBySentiment = {
    positive: ['좋아요', '훌륭해요', '만족', '추천', '최고', '감사합니다'],
    negative: ['별로', '실망', '불편', '아쉬워요', '개선 필요'],
    neutral: ['보통', '그냥', '평범', '무난'],
  };

  return {
    text: text || faker.lorem.sentence(),
    sentiment,
    score: sentimentScores[sentiment],
    keywords: faker.helpers.arrayElements(keywordsBySentiment[sentiment], 3),
    confidence: faker.number.float({ min: 0.7, max: 1.0, fractionDigits: 2 }),
  };
}

// AI 프로그램 요약 생성
export function generateProgramSummary(programId: number) {
  return {
    programId,
    summary: faker.lorem.paragraph(),
    keyPoints: [faker.lorem.sentence(), faker.lorem.sentence(), faker.lorem.sentence()],
    targetAudience: faker.helpers.arrayElement([
      '창업 준비자',
      '마케팅 실무자',
      '개발자',
      '디자이너',
      '일반인',
    ]),
    difficulty: faker.helpers.arrayElement(['초급', '중급', '고급']),
    estimatedDuration: `${faker.number.int({ min: 1, max: 12 })}주`,
    generatedAt: faker.date.recent().toISOString(),
  };
}

// AI 콘텐츠 모더레이션 결과 생성
export function generateModerationResult(content: string) {
  const isSafe = Math.random() > 0.1;

  return {
    content,
    isSafe,
    categories: {
      hate: faker.number.float({ min: 0, max: 0.1, fractionDigits: 2 }),
      harassment: faker.number.float({ min: 0, max: 0.1, fractionDigits: 2 }),
      selfHarm: faker.number.float({ min: 0, max: 0.05, fractionDigits: 2 }),
      sexual: faker.number.float({ min: 0, max: 0.1, fractionDigits: 2 }),
      violence: faker.number.float({ min: 0, max: 0.1, fractionDigits: 2 }),
      spam: faker.number.float({ min: 0, max: isSafe ? 0.2 : 0.8, fractionDigits: 2 }),
    },
    flagged: !isSafe,
    reason: isSafe ? null : '스팸 가능성이 높습니다',
    reviewedAt: faker.date.recent().toISOString(),
  };
}

// AI 태그 생성
export function generateAITags(content: string) {
  const allTags = [
    '창업', '마케팅', '재무', 'IT', '디자인',
    '온라인', '오프라인', '초급', '중급', '고급',
    '실습', '이론', '워크샵', '세미나', '멘토링',
  ];

  const tagCount = faker.number.int({ min: 3, max: 7 });

  const tags = faker.helpers.arrayElements(allTags, tagCount).map(tag => ({
    name: tag,
    confidence: faker.number.float({ min: 0.6, max: 1.0, fractionDigits: 2 }),
  }));

  return {
    content,
    tags: tags.sort((a, b) => b.confidence - a.confidence),
    generatedAt: faker.date.recent().toISOString(),
  };
}
