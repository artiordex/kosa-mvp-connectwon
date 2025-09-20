/**
 * Description : ai.ts - 📌 AI 관련 타입정의
 * Author : Shiwoo Min
 * Date : 2025-09-11
 * 09-21 - 주석 보강
 */
/**
 * @description AI 상호작용 성공/실패 상태 타입
 * @returns 'OK' 또는 'ERROR' 상태 문자열
 */
export type AIInteractionStatus = 'OK' | 'ERROR';

/**
 * @description AI 상호작용 종류 타입
 * @returns 상호작용의 구체적 종류
 */
export type AIInteractionKind = 'chat' | 'embed' | 'completion' | 'image' | 'audio';

/**
 * @description AI 상호작용 상세정보 인터페이스
 * @returns AI 상호작용에 관한 상세 데이터 구조
 */
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

/**
 * @description AI 상호작용 생성 요청 인터페이스
 * @returns 생성 요청 시 필요한 데이터 구조
 */
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

/**
 * @description AI 상호작용 업데이트 요청 인터페이스
 * @returns 업데이트 시 사용 가능한 필드들
 */
export interface UpdateAIInteractionRequest {
  prompt_tokens?: number;
  completion_tokens?: number;
  cost?: number;
  status?: AIInteractionStatus;
  trace_id?: string;
  meta?: Record<string, any>;
}

/**
 * @description AI 상호작용 목록 조회 쿼리 파라미터 인터페이스
 * @returns 목록 조회에 사용할 필터 및 페이징 정보
 */
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

/**
 * @description AI 상호작용 통계 조회 쿼리 파라미터 인터페이스
 * @returns 통계 조회를 위한 필터 조건
 */
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

/**
 * @description AI 상호작용 통계 응답 인터페이스
 * @returns 상호작용 통계 데이터
 */
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

/**
 * @description 단일 AI 상호작용 API 응답
 * @returns AI 상호작용 단일 데이터 및 선택적 메시지 포함
 */
export interface AIInteractionResponse {
  data: AIInteraction;
  message?: string;
}

/**
 * @description AI 상호작용 목록 API 응답
 * @returns 데이터 배열과 페이지네이션 정보 포함
 */
export interface AIInteractionsListResponse {
  data: AIInteraction[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * @description AI 상호작용 통계 API 응답
 * @returns 통계 데이터 및 쿼리 기간 포함
 */
export interface AIInteractionStatsResponse {
  data: AIInteractionStats;
  query_period: {
    from: string;
    to: string;
  };
}
