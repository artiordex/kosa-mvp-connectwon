/**
 * Description : ai.contract.ts - 📌 Zod를 사용하여 데이터 구조를 검증하며, AI 상호작용에 필요한 스키마를 정의
 * Author : Shiwoo Min
 * Date : 2025-09-24
 */
import { z } from 'zod';

/**
 * @description AI 상호작용 성공/실패 상태 타입
 * @returns 'OK' 또는 'ERROR' 상태 문자열
 */
export const AIInteractionStatusSchema = z.enum(['OK', 'ERROR']);
export type AIInteractionStatus = z.infer<typeof AIInteractionStatusSchema>;

/**
 * @description AI 상호작용 종류 타입
 * @returns 상호작용의 구체적 종류 (e.g., 'chat', 'embed', 'completion', 'image', 'audio')
 */
export const AIInteractionKindSchema = z.enum(['chat', 'embed', 'completion', 'image', 'audio']);
export type AIInteractionKind = z.infer<typeof AIInteractionKindSchema>;

/**
 * @description AI 상호작용 상세정보 스키마
 * @returns AI 상호작용에 관한 상세 데이터 구조
 */
export const AIInteractionSchema = z.object({
  id: z.string(),
  user_id: z.string().nullable(),
  program_id: z.string().nullable(),
  session_id: z.string().nullable(),
  provider: z.string(),
  model: z.string(),
  kind: AIInteractionKindSchema,
  prompt_tokens: z.number(),
  completion_tokens: z.number(),
  cost: z.number(),
  status: AIInteractionStatusSchema,
  trace_id: z.string().nullable(),
  meta: z.record(z.any()),
  created_at: z.string(),
});
export type AIInteraction = z.infer<typeof AIInteractionSchema>;

/**
 * @description AI 상호작용 생성 요청 스키마
 * @returns AI 상호작용 생성을 위한 요청 데이터 구조
 */
export const CreateAIInteractionRequestSchema = z.object({
  user_id: z.string().optional(),
  program_id: z.string().optional(),
  session_id: z.string().optional(),
  provider: z.string(),
  model: z.string(),
  kind: AIInteractionKindSchema,
  prompt_tokens: z.number().optional(),
  completion_tokens: z.number().optional(),
  cost: z.number().optional(),
  status: AIInteractionStatusSchema.optional(),
  trace_id: z.string().optional(),
  meta: z.record(z.any()).optional(),
});
export type CreateAIInteractionRequest = z.infer<typeof CreateAIInteractionRequestSchema>;

/**
 * @description AI 상호작용 업데이트 요청 스키마
 * @returns AI 상호작용 업데이트를 위한 필드들
 */
export const UpdateAIInteractionRequestSchema = z.object({
  prompt_tokens: z.number().optional(),
  completion_tokens: z.number().optional(),
  cost: z.number().optional(),
  status: AIInteractionStatusSchema.optional(),
  trace_id: z.string().optional(),
  meta: z.record(z.any()).optional(),
});
export type UpdateAIInteractionRequest = z.infer<typeof UpdateAIInteractionRequestSchema>;

/**
 * @description AI 상호작용 목록 조회 쿼리 파라미터 스키마
 * @returns AI 상호작용 목록을 조회하는 데 필요한 쿼리 파라미터
 */
export const AIInteractionListQuerySchema = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
  user_id: z.string().optional(),
  program_id: z.string().optional(),
  session_id: z.string().optional(),
  provider: z.string().optional(),
  model: z.string().optional(),
  kind: AIInteractionKindSchema.optional(),
  status: AIInteractionStatusSchema.optional(),
  trace_id: z.string().optional(),
  created_after: z.string().optional(),
  created_before: z.string().optional(),
});
export type AIInteractionListQuery = z.infer<typeof AIInteractionListQuerySchema>;

/**
 * @description AI 상호작용 통계 조회 쿼리 파라미터 스키마
 * @returns AI 상호작용 통계 데이터를 조회하는 데 필요한 파라미터
 */
export const AIInteractionStatsQuerySchema = z.object({
  user_id: z.string().optional(),
  program_id: z.string().optional(),
  session_id: z.string().optional(),
  provider: z.string().optional(),
  model: z.string().optional(),
  kind: AIInteractionKindSchema.optional(),
  date_from: z.string().optional(),
  date_to: z.string().optional(),
});
export type AIInteractionStatsQuery = z.infer<typeof AIInteractionStatsQuerySchema>;

/**
 * @description AI 상호작용 통계 응답 스키마
 * @returns AI 상호작용에 대한 통계 데이터
 */
export const AIInteractionStatsSchema = z.object({
  total_interactions: z.number(),
  total_prompt_tokens: z.number(),
  total_completion_tokens: z.number(),
  total_cost: z.number(),
  success_rate: z.number(),
  breakdown_by_provider: z.record(z.object({
    count: z.number(),
    cost: z.number(),
    tokens: z.number(),
  })),
  breakdown_by_kind: z.record(z.object({
    count: z.number(),
    cost: z.number(),
    tokens: z.number(),
  })),
});
export type AIInteractionStats = z.infer<typeof AIInteractionStatsSchema>;

/**
 * @description AI 상호작용 생성 요청 및 응답 스키마
 * @returns 생성된 AI 상호작용 및 메시지 포함 응답
 */
export const AIInteractionResponseSchema = z.object({
  data: AIInteractionSchema,
  message: z.string().optional(),
});
export type AIInteractionResponse = z.infer<typeof AIInteractionResponseSchema>;

/**
 * @description AI 상호작용 목록 응답 스키마
 * @returns AI 상호작용 목록 및 페이지네이션 정보 포함
 */
export const AIInteractionsListResponseSchema = z.object({
  data: z.array(AIInteractionSchema),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
  }),
});
export type AIInteractionsListResponse = z.infer<typeof AIInteractionsListResponseSchema>;

/**
 * @description AI 상호작용 통계 응답 스키마
 * @returns AI 상호작용 통계 데이터와 쿼리 기간 포함
 */
export const AIInteractionStatsResponseSchema = z.object({
  data: AIInteractionStatsSchema,
  query_period: z.object({
    from: z.string(),
    to: z.string(),
  }),
});
export type AIInteractionStatsResponse = z.infer<typeof AIInteractionStatsResponseSchema>;
