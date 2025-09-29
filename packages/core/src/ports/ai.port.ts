/**
 * Description : ai.port.ts - 📌 AI 서비스/상호작용 저장소 포트 (OpenAI / Anthropic / HuggingFace 지원)
 * Author : Shiwoo Min
 * Date : 2025-09-29
 */
import type { CursorPaginatedResponse, CursorPaginationQuery, Id } from '../core-types.js';
import type { TimeRange } from '../domain/value-objects.js';

/**
 * @description 지원되는 AI Provider
 */
export type AIProvider = 'openai' | 'anthropic' | 'huggingface';

/**
 * @description AI 메시지 역할
 */
export type AIRole = 'system' | 'user' | 'assistant';

/**
 * @description AI 메시지
 */
export interface AIMessage {
  role: AIRole;
  content: string;
}

/**
 * @description AI 채팅 파라미터
 */
export interface AIChatParams {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
}

/**
 * @description AI 채팅 입력
 */
export interface AIChatInput {
  messages: AIMessage[];
  system?: string;
  params?: AIChatParams;
}

/**
 * @description 응답 종료 이유
 */
export type FinishReason = 'stop' | 'length' | 'content_filter' | 'tool_calls' | string | undefined;

/**
 * @description 토큰 사용량
 */
export interface AIUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

/**
 * @description AI 채팅 결과
 */
export interface AIChatResult {
  content: string;
  finishReason?: FinishReason;
  usage?: AIUsage;
  raw?: unknown;
}

/**
 * @description AI 클라이언트 추상화 (Provider별 Adapter가 구현)
 */
export interface AIClient {
  chat(input: AIChatInput): Promise<AIChatResult>;
}

/**
 * @description AI 클라이언트 옵션
 */
export interface AIClientOptions {
  apiKey: string;
  baseURL?: string;
  defaultModel?: string;
  provider?: AIProvider;
}

/**
 * @description AI 서비스 포트 인터페이스
 */
export interface AIService extends AIClient {
  generateText(prompt: string, options?: AIGenerationOptions): Promise<AITextResult>;
  summarize(text: string, options?: SummaryOptions): Promise<AISummaryResult>;
  analyzeText(text: string, analysisType: AIAnalysisType): Promise<AIAnalysisResult>;
  analyzeSentiment(text: string): Promise<AISentimentResult>;
  extractKeywords(text: string, maxKeywords?: number): Promise<AIKeywordsResult>;
  classifyText(text: string, categories: string[]): Promise<AIClassificationResult>;
  generateEmbedding(text: string): Promise<AIEmbeddingResult>;
  generateEmbeddings(texts: string[]): Promise<AIEmbeddingResult[]>;
  calculateSimilarity(text1: string, text2: string): Promise<AISimilarityResult>;
  findSimilarTexts(queryText: string, corpus: string[], topK?: number): Promise<AISimilarityMatch[]>;
  translate(text: string, targetLanguage: string, sourceLanguage?: string): Promise<AITranslationResult>;
  generateProgramDescription(title: string, type?: string, details?: string): Promise<AITextResult>;
  generateSessionPlan(topic: string, duration: string, audience: string): Promise<AITextResult>;
  generateTags(title: string, description?: string, maxTags?: number): Promise<AIKeywordsResult>;
  analyzeFeedback(feedback: string[]): Promise<AIFeedbackAnalysis>;
  getAvailableModels(): Promise<AIModel[]>;
  getUsageStats(timeRange?: TimeRange): Promise<AIUsageStats>;
}

/**
 * @description AI 서비스 팩토리
 */
export interface AIServiceFactory {
  createOpenAIService(options: AIClientOptions): AIService;
  createAnthropicService(options: AIClientOptions): AIService;
  createHuggingFaceService(options: AIClientOptions): AIService;
  createFromEnvironment(): AIService;
  createMultiProviderService(providers: AIService[]): AIService;
}

/**
 * @description AI 상호작용 엔티티
 */
export interface AIInteraction {
  id: Id;
  userId?: Id;
  programId?: Id;
  sessionId?: Id;
  provider: string;
  model: string;
  kind: string;
  status: 'OK' | 'ERROR';
  promptTokens?: number;
  completionTokens?: number;
  costUSD?: number;
  traceId?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

/**
 * @description AI 상호작용 생성 DTO
 */
export interface CreateAIInteraction {
  userId?: Id;
  programId?: Id;
  sessionId?: Id;
  provider: string;
  model: string;
  kind: string;
  metadata?: Record<string, unknown>;
}

/**
 * @description AI 상호작용 갱신 DTO
 */
export interface UpdateAIInteraction {
  status?: 'OK' | 'ERROR';
  promptTokens?: number;
  completionTokens?: number;
  costUSD?: number;
  traceId?: string;
  metadata?: Record<string, unknown>;
}

/**
 * @description AI 상호작용 저장소 포트
 */
export interface AIInteractionRepository {
  findById(id: Id): Promise<AIInteraction | null>;
  create(data: CreateAIInteraction): Promise<AIInteraction>;
  update(id: Id, updates: UpdateAIInteraction): Promise<AIInteraction>;
  delete(id: Id): Promise<boolean>;
  findMany(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<AIInteraction>>;
  findByUser(userId: Id, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<AIInteraction>>;
  count(): Promise<number>;
}

/** @description 텍스트 생성 옵션 */
export interface AIGenerationOptions {
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  model?: string;
  provider?: AIProvider;
}

/** @description 채팅 옵션 */
export interface AIChatOptions extends AIGenerationOptions {
  systemPrompt?: string;
}

/** @description 요약 옵션 */
export interface SummaryOptions {
  maxLength?: number;
  style?: 'bullet' | 'paragraph' | 'key-points';
  language?: string;
}

/** @description 분석 유형 */
export type AIAnalysisType = 'sentiment' | 'topics' | 'keywords' | 'category';

/** @description 텍스트 결과 */
export interface AITextResult {
  success: boolean;
  content: string;
  usage?: AIUsage;
  model?: string;
  provider?: AIProvider;
  error?: string;
}

/** @description 요약 결과 */
export interface AISummaryResult extends AITextResult {
  originalLength: number;
  summaryLength: number;
  compressionRatio: number;
}

/** @description 분석 결과 */
export interface AIAnalysisResult {
  success: boolean;
  analysisType: AIAnalysisType;
  result: unknown;
  confidence?: number;
  usage?: AIUsage;
  error?: string;
}

/** @description 감정 분석 결과 */
export interface AISentimentResult {
  success: boolean;
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  score: number;
  error?: string;
}

/** @description 키워드 추출 결과 */
export interface AIKeywordsResult {
  success: boolean;
  keywords: string[];
  usage?: AIUsage;
  error?: string;
}

/** @description 텍스트 분류 결과 */
export interface AIClassificationResult {
  success: boolean;
  category: string;
  confidence: number;
  error?: string;
}

/** @description 임베딩 결과 */
export interface AIEmbeddingResult {
  success: boolean;
  embedding: number[];
  dimensions: number;
  usage?: AIUsage;
  error?: string;
}

/** @description 유사도 결과 */
export interface AISimilarityResult {
  success: boolean;
  similarity: number;
  error?: string;
}

/** @description 유사 텍스트 매치 */
export interface AISimilarityMatch {
  text: string;
  similarity: number;
  index: number;
}

/** @description 번역 결과 */
export interface AITranslationResult extends AITextResult {
  sourceLanguage?: string;
  targetLanguage: string;
  confidence?: number;
}

/** @description 피드백 분석 결과 */
export interface AIFeedbackAnalysis {
  success: boolean;
  overallSentiment: 'positive' | 'negative' | 'mixed' | 'neutral';
  themes: Array<{ theme: string; frequency: number; sentiment: string }>;
  keyInsights: string[];
  usage?: AIUsage;
  error?: string;
}

/** @description 모델 메타 정보 */
export interface AIModel {
  provider: AIProvider;
  name: string;
  displayName: string;
  capabilities: AICapability[];
  maxTokens: number;
  isAvailable: boolean;
}

/** @description 모델 능력 플래그 */
export type AICapability = 'text_generation' | 'chat' | 'embedding' | 'translation' | 'analysis' | 'summarization' | 'classification';

/** @description 사용량 통계 */
export interface AIUsageStats {
  totalRequests: number;
  totalTokens: number;
  totalCost: number;
  byProvider: Partial<Record<AIProvider, { requests: number; tokens: number; cost: number }>>;
  byModel: Record<string, { requests: number; tokens: number; cost: number }>;
  byCapability: Partial<Record<AICapability, { requests: number; tokens: number; cost: number }>>;
  timeRange: TimeRange;
}
