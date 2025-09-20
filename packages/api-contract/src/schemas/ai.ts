/**
 * Description : ai.ts - 📌 AI 스키마 - OpenAI / Anthropic / Hugging Face
 * Author : Shiwoo Min
 * Date : 2025-09-16
 */
import { z } from 'zod';

/**
 * @description 사용 가능한 AI Provider 열거형 스키마 및 타입
 */
export const AiProviderSchema = z.enum(['openai', 'anthropic', 'huggingface']);
export type AiProvider = z.infer<typeof AiProviderSchema>;

/**
 * @description AI 상호작용 종류 열거형 스키마 및 타입
 */
export const AiKindSchema = z.enum(['chat', 'prompt', 'embedding', 'recommendation']);
export type AiKind = z.infer<typeof AiKindSchema>;

/**
 * @description AI 상호작용 상태 열거형 스키마 및 타입
 */
export const AiStatusSchema = z.enum(['OK', 'ERROR']);
export type AiStatus = z.infer<typeof AiStatusSchema>;

/**
 * @description 채팅 메시지 역할 열거형 스키마 및 타입
 */
export const ChatRoleSchema = z.enum(['system', 'user', 'assistant', 'tool']);
export type ChatRole = z.infer<typeof ChatRoleSchema>;

/**
 * @description OpenAI 지원 모델 목록 열거형 스키마 및 타입
 */
export const OpenAIModelSchema = z.enum([
  'gpt-4o',
  'gpt-4o-mini',
  'gpt-4.1',
  'gpt-4.1-mini',
  'gpt-3.5-turbo',
  'text-embedding-3-large',
  'text-embedding-3-small',
]);
export type OpenAIModel = z.infer<typeof OpenAIModelSchema>;

/**
 * @description Anthropic 지원 모델 목록 열거형 스키마 및 타입
 */
export const AnthropicModelSchema = z.enum(['claude-3-5-sonnet', 'claude-3-5-haiku', 'claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku']);
export type AnthropicModel = z.infer<typeof AnthropicModelSchema>;

/**
 * @description Hugging Face 지원 모델 목록 열거형 스키마 및 타입
 */
export const HFModelSchema = z.enum(['meta-llama/Llama-3.1-8B-Instruct', 'mistralai/Mixtral-8x7B-Instruct-v0.1']);
export type HFModel = z.infer<typeof HFModelSchema>;

/**
 * @description AI 모델 선택자 스키마
 * @remarks provider 필드에 따라 알맞은 모델명이 반드시 지정되어야 하며,
 * custom 모델명도 선택적으로 입력 가능함
 */
export const AiModelSelectorSchema = z
  .object({
    provider: AiProviderSchema,
    openai: OpenAIModelSchema.optional(),
    anthropic: AnthropicModelSchema.optional(),
    huggingface: HFModelSchema.optional(),
    custom: z.string().min(1).optional(),
  })
  .refine(
    v =>
      (v.provider === 'openai' && !!v.openai) ||
      (v.provider === 'anthropic' && !!v.anthropic) ||
      (v.provider === 'huggingface' && !!v.huggingface) ||
      !!v.custom,
    { message: 'provider에 맞는 모델명을 지정하거나 custom을 입력하세요.' },
  );
export type AiModelSelector = z.infer<typeof AiModelSelectorSchema>;

/**
 * @description 텍스트 생성 옵션 스키마
 */
export const GenerationOptionsSchema = z.object({
  temperature: z.number().min(0).max(2).optional(),
  top_p: z.number().min(0).max(1).optional(),
  max_tokens: z.number().int().positive().optional(),
  stream: z.boolean().optional(),
});
export type GenerationOptions = z.infer<typeof GenerationOptionsSchema>;

/**
 * @description 툴 호출 메시지 스키마
 */
export const ToolCallSchema = z.object({
  id: z.string(),
  type: z.literal('function'),
  function: z.object({
    name: z.string(),
    arguments: z.union([z.string(), z.record(z.any())]),
  }),
});
export type ToolCall = z.infer<typeof ToolCallSchema>;

/**
 * @description 채팅 메시지 스키마
 */
export const ChatMessageSchema = z.object({
  role: ChatRoleSchema,
  content: z.string().min(1),
  name: z.string().optional(),
  tool_call_id: z.string().optional(),
  tool_calls: z.array(ToolCallSchema).optional(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

/**
 * @description AI 사용량(Usage) 스키마
 */
export const UsageSchema = z.object({
  prompt_tokens: z.number().int().nonnegative(),
  completion_tokens: z.number().int().nonnegative(),
  total_tokens: z.number().int().nonnegative(),
});
export type Usage = z.infer<typeof UsageSchema>;

/**
 * @description Prompt 요청 스키마 및 타입
 */
export const PromptRequestSchema = z.object({
  model: AiModelSelectorSchema,
  prompt: z.string().min(1),
  options: GenerationOptionsSchema.optional(),
  metadata: z.record(z.any()).optional(),
});
export type PromptRequest = z.infer<typeof PromptRequestSchema>;

/**
 * @description Prompt 응답 스키마 및 타입
 */
export const PromptResponseSchema = z.object({
  id: z.string(),
  created: z.number().int().positive(),
  provider: AiProviderSchema,
  model: z.string(),
  output: z.object({
    text: z.string(),
    finish_reason: z.enum(['stop', 'length', 'tool_calls']).optional(),
  }),
  usage: UsageSchema.optional(),
  raw: z.any().optional(),
});
export type PromptResponse = z.infer<typeof PromptResponseSchema>;

/**
 * @description Chat 요청 스키마 및 타입
 */
export const ChatRequestSchema = z.object({
  model: AiModelSelectorSchema,
  messages: z.array(ChatMessageSchema).min(1),
  tools: z
    .array(
      z.object({
        type: z.literal('function'),
        function: z.object({
          name: z.string().min(1),
          description: z.string().optional(),
          parameters: z.record(z.any()).optional(),
        }),
      }),
    )
    .optional(),
  tool_choice: z.union([z.literal('auto'), z.literal('none'), z.string()]).optional(),
  options: GenerationOptionsSchema.optional(),
  metadata: z.record(z.any()).optional(),
});
export type ChatRequest = z.infer<typeof ChatRequestSchema>;

/**
 * @description Chat 응답 스키마 및 타입
 */
export const ChatResponseSchema = z.object({
  id: z.string(),
  created: z.number().int().positive(),
  provider: AiProviderSchema,
  model: z.string(),
  message: ChatMessageSchema.extend({ tool_calls: z.array(ToolCallSchema).optional() }),
  usage: UsageSchema.optional(),
  raw: z.any().optional(),
});
export type ChatResponse = z.infer<typeof ChatResponseSchema>;

/**
 * @description Embedding 요청 스키마 및 타입
 */
export const EmbeddingRequestSchema = z.object({
  provider: AiProviderSchema.default('openai').optional(),
  model: z
    .union([OpenAIModelSchema, z.literal('text-embedding-3-large'), z.literal('text-embedding-3-small'), z.string()])
    .default('text-embedding-3-small'),
  input: z.union([z.string(), z.array(z.string()).min(1)]),
  dimensions: z.number().int().positive().optional(),
  metadata: z.record(z.any()).optional(),
});
export type EmbeddingRequest = z.infer<typeof EmbeddingRequestSchema>;

/**
 * @description Embedding 벡터 정보 스키마 및 타입
 */
export const EmbeddingVectorSchema = z.object({
  object: z.literal('embedding').default('embedding'),
  embedding: z.array(z.number()),
  index: z.number().int().nonnegative(),
});
export type EmbeddingVector = z.infer<typeof EmbeddingVectorSchema>;

/**
 * @description Embedding 응답 스키마 및 타입
 */
export const EmbeddingResponseSchema = z.object({
  provider: AiProviderSchema.optional(),
  model: z.string(),
  data: z.array(EmbeddingVectorSchema).nonempty(),
  usage: z
    .object({
      prompt_tokens: z.number().int().nonnegative(),
      total_tokens: z.number().int().nonnegative(),
    })
    .optional(),
});
export type EmbeddingResponse = z.infer<typeof EmbeddingResponseSchema>;

/**
 * @description AI 상호작용 생성 요청 스키마 및 타입
 */
export const AiInteractionCreateSchema = z.object({
  user_id: z.number().int().optional().nullable(),
  program_id: z.number().int().optional().nullable(),
  session_id: z.number().int().optional().nullable(),
  provider: AiProviderSchema,
  model: z.string().min(1),
  kind: AiKindSchema,
  prompt_tokens: z.number().int().nonnegative().default(0),
  completion_tokens: z.number().int().nonnegative().default(0),
  cost: z.number().min(0).default(0),
  status: AiStatusSchema.default('OK'),
  trace_id: z.string().optional().nullable(),
  meta: z.record(z.any()).default({}),
});
export type AiInteractionCreate = z.infer<typeof AiInteractionCreateSchema>;

/**
 * @description SELECT 결과용 AI 상호작용 데이터 스키마 및 타입
 */
export const AiInteractionRowSchema = AiInteractionCreateSchema.extend({
  id: z.number().int().positive(),
  created_at: z.string(), // ISO string (TIMESTAMPTZ)
});
export type AiInteractionRow = z.infer<typeof AiInteractionRowSchema>;

/**
 * @description AI 상호작용 조회 필터용 스키마 및 타입
 */
export const AiInteractionQuerySchema = z.object({
  user_id: z.number().int().optional(),
  program_id: z.number().int().optional(),
  session_id: z.number().int().optional(),
  provider: AiProviderSchema.optional(),
  kind: AiKindSchema.optional(),
  status: AiStatusSchema.optional(),
  from: z.string().optional(), // ISO string
  to: z.string().optional(),
  limit: z.number().int().positive().max(1000).default(100),
  offset: z.number().int().nonnegative().default(0),
});
export type AiInteractionQuery = z.infer<typeof AiInteractionQuerySchema>;

/**
 * @description AI 관련 모든 Zod 스키마 일괄 내보내기
 */
export const AiSchemas = {
  AiProviderSchema,
  AiKindSchema,
  AiStatusSchema,
  ChatRoleSchema,
  OpenAIModelSchema,
  AnthropicModelSchema,
  HFModelSchema,
  AiModelSelectorSchema,
  GenerationOptionsSchema,
  ToolCallSchema,
  ChatMessageSchema,
  UsageSchema,
  PromptRequestSchema,
  PromptResponseSchema,
  ChatRequestSchema,
  ChatResponseSchema,
  EmbeddingRequestSchema,
  EmbeddingResponseSchema,
  EmbeddingVectorSchema,
  AiInteractionCreateSchema,
  AiInteractionRowSchema,
  AiInteractionQuerySchema,
};
