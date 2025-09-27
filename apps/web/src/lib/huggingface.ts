const HUGGING_FACE_API_KEY = process.env['NEXT_PUBLIC_HUGGING_FACE_API_KEY'] || '';

export interface IntentResult {
  intent: 'room_booking' | 'program_registration' | 'general_inquiry';
  entities: {
    date: string;
    time: string;
    duration?: string;
    roomType?: string;
    capacity?: number;
    facilities?: string[];
    programType?: string;
    participants?: number;
  };
  confidence: number;
}

export interface RecommendationResult {
  type: 'room' | 'program';
  items: Array<{
    id: string;
    name: string;
    confidence: number;
    reason: string;
  }>;
}

// 자연어 의도 분석
export async function analyzeIntent(text: string): Promise<IntentResult> {
  try {
    if (!HUGGING_FACE_API_KEY || HUGGING_FACE_API_KEY === 'hf_your_api_key_here') {
      return fallbackIntentAnalysis(text);
    }

    const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
      headers: {
        Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        inputs: `다음 텍스트를 분석하여 의도를 파악해주세요: "${text}"`,
      }),
    });

    if (!response.ok) {
      console.warn('Hugging Face API 호출 실패, 폴백 분석 사용');
      return fallbackIntentAnalysis(text);
    }

    const result = await response.json();

    const intent = extractIntent(text);
    const entities = extractEntities(text);

    return {
      intent,
      entities,
      confidence: calculateConfidence(text, intent),
    };
  } catch (error) {
    console.warn('Intent analysis error, using fallback:', error);
    return fallbackIntentAnalysis(text);
  }
}

// 추천 시스템
export async function getRecommendations(
  userId: string,
  type: 'room' | 'program',
  userHistory: any[],
  preferences: any,
): Promise<RecommendationResult> {
  try {
    if (!HUGGING_FACE_API_KEY || HUGGING_FACE_API_KEY === 'hf_your_api_key_here') {
      return fallbackRecommendations(type, userHistory, preferences);
    }

    const response = await fetch('https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2', {
      headers: {
        Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        inputs: {
          source_sentence: JSON.stringify(preferences),
          sentences: userHistory.map(item => JSON.stringify(item)),
        },
      }),
    });

    if (!response.ok) {
      console.warn('Hugging Face 추천 API 호출 실패, 폴백 추천 사용');
      return fallbackRecommendations(type, userHistory, preferences);
    }

    const result = await response.json();

    return generateRecommendations(type, result, userHistory);
  } catch (error) {
    console.warn('Recommendation error, using fallback:', error);
    return fallbackRecommendations(type, userHistory, preferences);
  }
}

// 날짜/시간 추출
export function extractDateTime(text: string): { date: string; time: string } {
  const datePatterns = [
    { pattern: /내일/g, offset: 1 },
    { pattern: /모레/g, offset: 2 },
    { pattern: /(\d{1,2})월\s*(\d{1,2})일/g, type: 'specific' },
    { pattern: /(다음주|다음 주)/g, offset: 7 },
    { pattern: /(이번주|이번 주)/g, offset: 0 },
  ];

  const timePatterns = [/(\d{1,2})시/g, /(오전|오후)\s*(\d{1,2})시?/g, /(\d{1,2}):(\d{2})/g];

  let extractedDate: string | undefined;
  let extractedTime: string | undefined;

  // 날짜 추출
  for (const { pattern, offset, type } of datePatterns) {
    const match = text.match(pattern);
    if (match) {
      if (type === 'specific') {
        const monthMatch = text.match(/(\d{1,2})월\s*(\d{1,2})일/);
        if (monthMatch) {
          const month = parseInt(monthMatch[1] ?? '1', 10);
          const day = parseInt(monthMatch[2] ?? '1', 10);
          const year = new Date().getFullYear();
          extractedDate = `${year}-${month.toString().padStart(2, '0')}-${day
            .toString()
            .padStart(2, '0')}`;
        }
      } else if (typeof offset === 'number') {
        const date = new Date();
        date.setDate(date.getDate() + offset);
        extractedDate = date.toISOString().split('T')[0];
      }
      break;
    }
  }

  // 시간 추출
  for (const pattern of timePatterns) {
    const match = text.match(pattern);
    if (match) {
      extractedTime = match[0];
      break;
    }
  }

  return { date: extractedDate ?? '', time: extractedTime ?? '' };
}

// 의도 추출
function extractIntent(text: string): IntentResult['intent'] {
  const roomKeywords = ['회의실', '룸', '공간', '예약', '홀'];
  const programKeywords = ['프로그램', '수업', '클래스', '참여', '등록'];

  if (roomKeywords.some(keyword => text.includes(keyword))) {
    return 'room_booking';
  } else if (programKeywords.some(keyword => text.includes(keyword))) {
    return 'program_registration';
  }
  return 'general_inquiry';
}

// 엔티티 추출
function extractEntities(text: string): IntentResult['entities'] {
  const entities: IntentResult['entities'] = { date: '', time: '' };

  const datetime = extractDateTime(text);
  entities.date = datetime.date || '';
  entities.time = datetime.time || '';

  const capacityMatch = text.match(/(\d+)명/);
  if (capacityMatch?.[1]) {
    entities.capacity = parseInt(capacityMatch[1], 10);
  }

  const facilities = [];
  if (text.includes('프로젝터')) facilities.push('프로젝터');
  if (text.includes('화이트보드')) facilities.push('화이트보드');
  if (text.includes('음향')) facilities.push('음향시설');
  if (facilities.length > 0) entities.facilities = facilities;

  return entities;
}

// 신뢰도 계산
function calculateConfidence(text: string, intent: IntentResult['intent']): number {
  const keywords = {
    room_booking: ['회의실', '룸', '예약', '홀', '공간'],
    program_registration: ['프로그램', '수업', '참여', '등록', '클래스'],
    general_inquiry: ['문의', '안내', '정보'],
  };

  const relevantKeywords = keywords[intent];
  const matchCount = relevantKeywords.filter(keyword => text.includes(keyword)).length;

  return Math.min(0.9, 0.3 + matchCount * 0.2);
}

// Fallback intent 분석
function fallbackIntentAnalysis(text: string): IntentResult {
  const intent = extractIntent(text);
  const entities = extractEntities(text);

  return {
    intent,
    entities,
    confidence: calculateConfidence(text, intent),
  };
}

// 추천 결과 생성
function generateRecommendations(type: 'room' | 'program', aiResult: any, userHistory: any[]): RecommendationResult {
  if (type === 'room') {
    return {
      type: 'room',
      items: [
        {
          id: 'room-a',
          name: 'A홀 (프로젝터 포함)',
          confidence: 0.85,
          reason: '자주 프로젝터가 있는 회의실을 예약하셨습니다',
        },
        {
          id: 'room-b',
          name: 'B홀 (소규모 회의)',
          confidence: 0.72,
          reason: '작은 규모의 회의를 선호하시는 것 같습니다',
        },
      ],
    };
  } else {
    return {
      type: 'program',
      items: [
        {
          id: 'yoga-class',
          name: '요가 클래스',
          confidence: 0.88,
          reason: '건강 관련 프로그램에 관심이 많으신 것 같습니다',
        },
        {
          id: 'pilates-class',
          name: '필라테스 기초',
          confidence: 0.76,
          reason: '운동 프로그램을 자주 이용하셨습니다',
        },
      ],
    };
  }
}

// 폴백 추천
function fallbackRecommendations(type: 'room' | 'program', userHistory: any[], preferences: any): RecommendationResult {
  if (type === 'room') {
    return {
      type: 'room',
      items: [
        {
          id: 'room-a',
          name: 'A홀 (프로젝터 포함)',
          confidence: 0.85,
          reason: '자주 프로젝터가 있는 회의실을 예약하셨습니다',
        },
        {
          id: 'room-b',
          name: 'B홀 (소규모 회의)',
          confidence: 0.72,
          reason: '작은 규모의 회의를 선호하시는 것 같습니다',
        },
        {
          id: 'room-c',
          name: 'C홀 (대형 컨퍼런스)',
          confidence: 0.68,
          reason: '다양한 규모의 회의실을 이용하신 기록이 있습니다',
        },
      ],
    };
  } else {
    return {
      type: 'program',
      items: [
        {
          id: 'yoga-class',
          name: '요가 클래스',
          confidence: 0.88,
          reason: '건강 관련 프로그램에 관심이 많으신 것 같습니다',
        },
        {
          id: 'pilates-class',
          name: '필라테스 기초',
          confidence: 0.76,
          reason: '운동 프로그램을 자주 이용하셨습니다',
        },
        {
          id: 'cooking-class',
          name: '쿠킹 클래스',
          confidence: 0.71,
          reason: '실용적인 취미 활동을 선호하시는 경향이 있습니다',
        },
      ],
    };
  }
}
