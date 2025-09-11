/**
 * Description : ai.ts - 📌 AI 관련 타입정의
 * Author : Shiwoo Min
 * Date : 2025-09-11
 */

export type AIInteractionStatus = 'OK' | 'ERROR';
export type AIInteractionKind = 'chat' | 'embed' | 'completion' | 'image' | 'audio';

export interface AIInteraction {
  id: string;
  user_id: string | null;
  program_id: string | null;
  session_id: string | null;
  provider: string;
  model: string;
  kind: AIInteractionKind;
  prompt_tokens: number;
  completion_tokens: number;
  cost: number;
  status: AIInteractionStatus;
  trace_id: string | null;
  meta: Record<string, any>;
  created_at: string;
}

export interface CreateAIInteractionRequest {
  user_id?: string;
  program_id?: string;
  session_id?: string;
  provider: string;
  model: string;
  kind: AIInteractionKind;
  prompt_tokens?: number;
  completion_tokens?: number;
  cost?: number;
  status?: AIInteractionStatus;
  trace_id?: string;
  meta?: Record<string, any>;
}

export interface UpdateAIInteractionRequest {
  prompt_tokens?: number;
  completion_tokens?: number;
  cost?: number;
  status?: AIInteractionStatus;
  trace_id?: string;
  meta?: Record<string, any>;
}

export interface AIInteractionListQuery {
  page?: number;
  limit?: number;
  user_id?: string;
  program_id?: string;
  session_id?: string;
  provider?: string;
  model?: string;
  kind?: AIInteractionKind;
  status?: AIInteractionStatus;
  trace_id?: string;
  created_after?: string;
  created_before?: string;
}

export interface AIInteractionStatsQuery {
  user_id?: string;
  program_id?: string;
  session_id?: string;
  provider?: string;
  model?: string;
  kind?: AIInteractionKind;
  date_from?: string;
  date_to?: string;
}

export interface AIInteractionStats {
  total_interactions: number;
  total_prompt_tokens: number;
  total_completion_tokens: number;
  total_cost: number;
  success_rate: number;
  breakdown_by_provider: Record<
    string,
    {
      count: number;
      cost: number;
      tokens: number;
    }
  >;
  breakdown_by_kind: Record<
    string,
    {
      count: number;
      cost: number;
      tokens: number;
    }
  >;
}

export interface AIInteractionResponse {
  data: AIInteraction;
  message?: string;
}

export interface AIInteractionsListResponse {
  data: AIInteraction[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AIInteractionStatsResponse {
  data: AIInteractionStats;
  query_period: {
    from: string;
    to: string;
  };
}
