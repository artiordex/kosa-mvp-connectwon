/**
 * Description : ai.ts - 📌 AI 서비스 포트 인터페이스
 * Author      : Shiwoo Min
 * Date        : 2025-09-10
 */
import type { AIProvider, Id } from '../../core-types.js';

// ============== AI 서비스 포트 ==============

export interface AIService {
  // 텍스트 생성
  generateText(prompt: string, options?: AIGenerationOptions): Promise<AITextResult>;

  // 대화형 채팅
  chat(messages: AIChatMessage[], options?: AIChatOptions): Promise<AIChatResult>;

  // 텍스트 요약
  summarize(text: string, options?: SummaryOptions): Promise<AISummaryResult>;

  // 텍스트 분석
  analyzeText(text: string, analysisType: AIAnalysisType): Promise<AIAnalysisResult>;

  // 감정 분석
  analyzeSentiment(text: string): Promise<AISentimentResult>;

  // 키워드 추출
  extractKeywords(text: string, maxKeywords?: number): Promise<AIKeywordsResult>;

  // 텍스트 분류
  classifyText(text: string, categories: string[]): Promise<AIClassificationResult>;

  // 임베딩 생성
  generateEmbedding(text: string): Promise<AIEmbeddingResult>;
  generateEmbeddings(texts: string[]): Promise<AIEmbeddingResult[]>;

  // 텍스트 유사도 계산
  calculateSimilarity(text1: string, text2: string): Promise<AISimilarityResult>;
  findSimilarTexts(
    queryText: string,
    corpus: string[],
    topK?: number,
  ): Promise<AISimilarityMatch[]>;

  // 번역
  translate(
    text: string,
    targetLanguage: string,
    sourceLanguage?: string,
  ): Promise<AITranslationResult>;

  // 텍스트 개선
  improveText(text: string, style?: 'formal' | 'casual' | 'professional'): Promise<AITextResult>;

  // 프로그램/세션 관련 AI 기능
  generateProgramDescription(title: string, type?: string, details?: string): Promise<AITextResult>;
  generateSessionPlan(topic: string, duration: string, audience: string): Promise<AITextResult>;
  generateTags(title: string, description?: string, maxTags?: number): Promise<AIKeywordsResult>;

  // 피드백 분석
  analyzeFeedback(feedback: string[]): Promise<AIFeedbackAnalysis>;

  // AI 모델 관리
  getAvailableModels(): Promise<AIModel[]>;
  switchModel(provider: AIProvider, model: string): Promise<void>;

  // 사용량 추적
  getUsageStats(timeRange?: TimeRange): Promise<AIUsageStats>;

  // 캐시 관리
  getCachedResult(cacheKey: string): Promise<unknown>;
  setCachedResult(cacheKey: string, result: unknown, ttl?: number): Promise<void>;
}

// ============== AI 타입 정의 ==============

export interface AIChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIGenerationOptions {
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  model?: string;
  provider?: AIProvider;
}

export interface AIChatOptions extends AIGenerationOptions {
  systemPrompt?: string;
}

export interface SummaryOptions {
  maxLength?: number;
  style?: 'bullet' | 'paragraph' | 'key-points';
  language?: string;
}

export type AIAnalysisType = 'sentiment' | 'topics' | 'keywords' | 'category' | 'readability';

export interface AITextResult {
  success: boolean;
  content: string;
  usage?: AIUsage;
  model?: string;
  provider?: AIProvider;
  error?: string;
}

export interface AIChatResult extends AITextResult {
  finishReason?: string;
}

export interface AISummaryResult extends AITextResult {
  originalLength: number;
  summaryLength: number;
  compressionRatio: number;
}

export interface AIAnalysisResult {
  success: boolean;
  analysisType: AIAnalysisType;
  result: unknown;
  confidence?: number;
  usage?: AIUsage;
  error?: string;
}

export interface AISentimentResult {
  success: boolean;
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  score: number; // -1 to 1
  details?: {
    positive: number;
    negative: number;
    neutral: number;
  };
  error?: string;
}

export interface AIKeywordsResult {
  success: boolean;
  keywords: string[];
  scores?: number[];
  usage?: AIUsage;
  error?: string;
}

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

export interface AIEmbeddingResult {
  success: boolean;
  embedding: number[];
  dimensions: number;
  usage?: AIUsage;
  error?: string;
}

export interface AISimilarityResult {
  success: boolean;
  similarity: number;
  error?: string;
}

export interface AISimilarityMatch {
  text: string;
  similarity: number;
  index: number;
}

export interface AITranslationResult extends AITextResult {
  sourceLanguage?: string;
  targetLanguage: string;
  confidence?: number;
}

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

export interface AIModel {
  provider: AIProvider;
  name: string;
  displayName: string;
  capabilities: AICapability[];
  maxTokens: number;
  costPer1kTokens: number;
  isAvailable: boolean;
}

export type AICapability =
  | 'text_generation'
  | 'chat'
  | 'embedding'
  | 'translation'
  | 'analysis'
  | 'summarization'
  | 'classification';

export interface AIUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  costUSD?: number;
}

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

export interface TimeRange {
  start: string;
  end: string;
}

// ============== AI 작업 큐 포트 ==============

export interface AIJobQueue {
  // 비동기 AI 작업 추가
  addTextGenerationJob(prompt: string, options?: AIGenerationOptions): Promise<string>;
  addAnalysisJob(text: string, analysisType: AIAnalysisType): Promise<string>;
  addBatchProcessingJob(texts: string[], operation: AIBatchOperation): Promise<string>;

  // 작업 상태 확인
  getJobStatus(jobId: string): Promise<AIJobStatus>;
  getJobResult(jobId: string): Promise<unknown>;

  // 작업 관리
  cancelJob(jobId: string): Promise<boolean>;
  retryJob(jobId: string): Promise<void>;
}

export type AIBatchOperation =
  | 'generate_tags'
  | 'analyze_sentiment'
  | 'generate_summaries'
  | 'translate'
  | 'classify';

export interface AIJobStatus {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  progress?: number;
  result?: unknown;
  error?: string;
  createdAt: string;
  completedAt?: string;
}
