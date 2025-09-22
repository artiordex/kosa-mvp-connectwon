/**
 * Description : ai.ts - 📌 AI 서비스 포트 인터페이스
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import type { AIProvider } from '../../core-types.js';

/**
 * @description AI 서비스 포트 인터페이스
 */
export interface AIService {
  /**
   * @description 프롬프트 기반 텍스트 생성
   * @param {string} prompt 프롬프트
   * @param {AIGenerationOptions} [options] 생성 옵션
   * @returns {Promise<AITextResult>}
   */
  generateText(prompt: string, options?: AIGenerationOptions): Promise<AITextResult>;

  /**
   * @description 대화형 채팅
   * @param {AIChatMessage[]} messages 대화 이력
   * @param {AIChatOptions} [options] 채팅 옵션
   * @returns {Promise<AIChatResult>}
   */
  chat(messages: AIChatMessage[], options?: AIChatOptions): Promise<AIChatResult>;

  /**
   * @description 텍스트 요약
   * @param {string} text 원문
   * @param {SummaryOptions} [options] 요약 옵션
   * @returns {Promise<AISummaryResult>}
   */
  summarize(text: string, options?: SummaryOptions): Promise<AISummaryResult>;

  /**
   * @description 텍스트 분석(감정/주제/키워드 등)
   * @param {string} text 원문
   * @param {AIAnalysisType} analysisType 분석 종류
   * @returns {Promise<AIAnalysisResult>}
   */
  analyzeText(text: string, analysisType: AIAnalysisType): Promise<AIAnalysisResult>;

  /**
   * @description 감정 분석(positive/negative/neutral)
   * @param {string} text 원문
   * @returns {Promise<AISentimentResult>}
   */
  analyzeSentiment(text: string): Promise<AISentimentResult>;

  /**
   * @description 키워드 추출
   * @param {string} text 원문
   * @param {number} [maxKeywords] 최대 개수
   * @returns {Promise<AIKeywordsResult>}
   */
  extractKeywords(text: string, maxKeywords?: number): Promise<AIKeywordsResult>;

  /**
   * @description 텍스트 분류
   * @param {string} text 원문
   * @param {string[]} categories 후보 카테고리
   * @returns {Promise<AIClassificationResult>}
   */
  classifyText(text: string, categories: string[]): Promise<AIClassificationResult>;

  /**
   * @description 단일 임베딩 생성
   * @param {string} text 원문
   * @returns {Promise<AIEmbeddingResult>}
   */
  generateEmbedding(text: string): Promise<AIEmbeddingResult>;

  /**
   * @description 복수 임베딩 생성
   * @param {string[]} texts 원문 리스트
   * @returns {Promise<AIEmbeddingResult[]>}
   */
  generateEmbeddings(texts: string[]): Promise<AIEmbeddingResult[]>;

  /**
   * @description 텍스트 유사도 계산
   * @param {string} text1 텍스트 1
   * @param {string} text2 텍스트 2
   * @returns {Promise<AISimilarityResult>}
   */
  calculateSimilarity(text1: string, text2: string): Promise<AISimilarityResult>;

  /**
   * @description 코퍼스에서 상위 유사 텍스트 찾기
   * @param {string} queryText 질의 텍스트
   * @param {string[]} corpus 후보 리스트
   * @param {number} [topK] 상위 K
   * @returns {Promise<AISimilarityMatch[]>}
   */
  findSimilarTexts(
    queryText: string,
    corpus: string[],
    topK?: number,
  ): Promise<AISimilarityMatch[]>;

  /**
   * @description 기계 번역
   * @param {string} text 원문
   * @param {string} targetLanguage 목표 언어 코드
   * @param {string} [sourceLanguage] 원문 언어 코드
   * @returns {Promise<AITranslationResult>}
   */
  translate(
    text: string,
    targetLanguage: string,
    sourceLanguage?: string,
  ): Promise<AITranslationResult>;

  /**
   * @description 문체 보정(톤/명료성 개선)
   * @param {string} text 원문
   * @param {'formal'|'casual'|'professional'} [style] 스타일
   * @returns {Promise<AITextResult>}
   */
  improveText(text: string, style?: 'formal' | 'casual' | 'professional'): Promise<AITextResult>;

  /**
   * @description 프로그램 소개문 생성
   * @param {string} title 제목
   * @param {string} [type] 유형
   * @param {string} [details] 추가 설명
   * @returns {Promise<AITextResult>}
   */
  generateProgramDescription(title: string, type?: string, details?: string): Promise<AITextResult>;

  /**
   * @description 세션 계획 생성(아젠다/구성)
   * @param {string} topic 주제
   * @param {string} duration 소요시간
   * @param {string} audience 대상
   * @returns {Promise<AITextResult>}
   */
  generateSessionPlan(topic: string, duration: string, audience: string): Promise<AITextResult>;

  /**
   * @description 태그 생성
   * @param {string} title 제목
   * @param {string} [description] 설명
   * @param {number} [maxTags] 최대 태그 수
   * @returns {Promise<AIKeywordsResult>}
   */
  generateTags(title: string, description?: string, maxTags?: number): Promise<AIKeywordsResult>;

  /**
   * @description 다중 피드백 분석(주요 테마/인사이트)
   * @param {string[]} feedback 피드백 목록
   * @returns {Promise<AIFeedbackAnalysis>}
   */
  analyzeFeedback(feedback: string[]): Promise<AIFeedbackAnalysis>;

  /**
   * @description 사용 가능한 모델 목록
   * @returns {Promise<AIModel[]>}
   */
  getAvailableModels(): Promise<AIModel[]>;

  /**
   * @description 사용 모델 전환
   * @param {AIProvider} provider 공급자
   * @param {string} model 모델명
   * @returns {Promise<void>}
   */
  switchModel(provider: AIProvider, model: string): Promise<void>;

  /**
   * @description 사용량 통계
   * @param {TimeRange} [timeRange] 기간
   * @returns {Promise<AIUsageStats>}
   */
  getUsageStats(timeRange?: TimeRange): Promise<AIUsageStats>;

  /**
   * @description 캐시 조회
   * @param {string} cacheKey 키
   * @returns {Promise<unknown>}
   */
  getCachedResult(cacheKey: string): Promise<unknown>;

  /**
   * @description 캐시 저장
   * @param {string} cacheKey 키
   * @param {unknown} result 값
   * @param {number} [ttl] TTL(초)
   * @returns {Promise<void>}
   */
  setCachedResult(cacheKey: string, result: unknown, ttl?: number): Promise<void>;
}

/**
 * @description AI 채팅 메시지
 */
export interface AIChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/**
 * @description 텍스트 생성 옵션
 */
export interface AIGenerationOptions {
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  model?: string;
  provider?: AIProvider;
}

/**
 * @description 채팅 옵션(생성 옵션 확장)
 */
export interface AIChatOptions extends AIGenerationOptions {
  systemPrompt?: string;
}

/**
 * @description 요약 옵션
 */
export interface SummaryOptions {
  maxLength?: number;
  style?: 'bullet' | 'paragraph' | 'key-points';
  language?: string;
}

/** @description 분석 유형 */
export type AIAnalysisType = 'sentiment' | 'topics' | 'keywords' | 'category' | 'readability';

/**
 * @description 텍스트 결과
 */
export interface AITextResult {
  success: boolean;
  content: string;
  usage?: AIUsage;
  model?: string;
  provider?: AIProvider;
  error?: string;
}

/**
 * @description 채팅 결과
 */
export interface AIChatResult extends AITextResult {
  finishReason?: string;
}

/**
 * @description 요약 결과
 */
export interface AISummaryResult extends AITextResult {
  originalLength: number;
  summaryLength: number;
  compressionRatio: number;
}

/**
 * @description 분석 결과
 */
export interface AIAnalysisResult {
  success: boolean;
  analysisType: AIAnalysisType;
  result: unknown;
  confidence?: number;
  usage?: AIUsage;
  error?: string;
}

/**
 * @description 감정 분석 결과
 */
export interface AISentimentResult {
  success: boolean;
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  /** @description -1 ~ 1 */
  score: number;
  details?: {
    positive: number;
    negative: number;
    neutral: number;
  };
  error?: string;
}

/**
 * @description 키워드 추출 결과
 */
export interface AIKeywordsResult {
  success: boolean;
  keywords: string[];
  scores?: number[];
  usage?: AIUsage;
  error?: string;
}

/**
 * @description 텍스트 분류 결과
 */
export interface AIClassificationResult {
  success: boolean;
  category: string;
  confidence: number;
  allScores?: Array<{
    category: string;
    score: number;
  }>;
  usage?: AIUsage;
  error?: string;
}

/**
 * @description 임베딩 결과
 */
export interface AIEmbeddingResult {
  success: boolean;
  embedding: number[];
  dimensions: number;
  usage?: AIUsage;
  error?: string;
}

/**
 * @description 유사도 결과
 */
export interface AISimilarityResult {
  success: boolean;
  similarity: number;
  error?: string;
}

/**
 * @description 유사 텍스트 매치
 */
export interface AISimilarityMatch {
  text: string;
  similarity: number;
  index: number;
}

/**
 * @description 번역 결과
 */
export interface AITranslationResult extends AITextResult {
  sourceLanguage?: string;
  targetLanguage: string;
  confidence?: number;
}

/**
 * @description 피드백 분석 결과
 */
export interface AIFeedbackAnalysis {
  success: boolean;
  overallSentiment: 'positive' | 'negative' | 'mixed' | 'neutral';
  sentimentScore: number;
  themes: Array<{
    theme: string;
    frequency: number;
    sentiment: string;
  }>;
  suggestions: string[];
  keyInsights: string[];
  usage?: AIUsage;
  error?: string;
}

/**
 * @description 모델 메타 정보
 */
export interface AIModel {
  provider: AIProvider;
  name: string;
  displayName: string;
  capabilities: AICapability[];
  maxTokens: number;
  costPer1kTokens: number;
  isAvailable: boolean;
}

/** @description 모델 능력 플래그 */
export type AICapability =
  | 'text_generation'
  | 'chat'
  | 'embedding'
  | 'translation'
  | 'analysis'
  | 'summarization'
  | 'classification';

/**
 * @description 토큰/비용 사용량
 */
export interface AIUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  costUSD?: number;
}

/**
 * @description 사용량 통계
 */
export interface AIUsageStats {
  totalRequests: number;
  totalTokens: number;
  totalCost: number;
  byProvider: Record<
    AIProvider,
    {
      requests: number;
      tokens: number;
      cost: number;
    }
  >;
  byModel: Record<
    string,
    {
      requests: number;
      tokens: number;
      cost: number;
    }
  >;
  byCapability: Record<
    AICapability,
    {
      requests: number;
      tokens: number;
      cost: number;
    }
  >;
  timeRange: TimeRange;
}

/**
 * @description 시간 범위
 */
export interface TimeRange {
  start: string;
  end: string;
}

/**
 * @description AI 작업 큐 포트
 */
export interface AIJobQueue {
  /**
   * @description 비동기 텍스트 생성 작업 추가
   * @param {string} prompt 프롬프트
   * @param {AIGenerationOptions} [options] 옵션
   * @returns {Promise<string>} jobId
   */
  addTextGenerationJob(prompt: string, options?: AIGenerationOptions): Promise<string>;

  /**
   * @description 분석 작업 추가
   * @param {string} text 원문
   * @param {AIAnalysisType} analysisType 분석 종류
   * @returns {Promise<string>} jobId
   */
  addAnalysisJob(text: string, analysisType: AIAnalysisType): Promise<string>;

  /**
   * @description 배치 처리 작업 추가
   * @param {string[]} texts 원문 리스트
   * @param {AIBatchOperation} operation 배치 작업 종류
   * @returns {Promise<string>} jobId
   */
  addBatchProcessingJob(texts: string[], operation: AIBatchOperation): Promise<string>;

  /**
   * @description 작업 상태 조회
   * @param {string} jobId 작업 ID
   * @returns {Promise<AIJobStatus>}
   */
  getJobStatus(jobId: string): Promise<AIJobStatus>;

  /**
   * @description 작업 결과 조회
   * @param {string} jobId 작업 ID
   * @returns {Promise<unknown>}
   */
  getJobResult(jobId: string): Promise<unknown>;

  /**
   * @description 작업 취소
   * @param {string} jobId 작업 ID
   * @returns {Promise<boolean>} 취소 성공 여부
   */
  cancelJob(jobId: string): Promise<boolean>;

  /**
   * @description 작업 재시도
   * @param {string} jobId 작업 ID
   * @returns {Promise<void>}
   */
  retryJob(jobId: string): Promise<void>;
}

/** @description 배치 작업 종류 */
export type AIBatchOperation =
  | 'generate_tags'
  | 'analyze_sentiment'
  | 'generate_summaries'
  | 'translate'
  | 'classify';

/**
 * @description AI 작업 상태
 */
export interface AIJobStatus {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  progress?: number;
  result?: unknown;
  error?: string;
  createdAt: string;
  completedAt?: string;
}
