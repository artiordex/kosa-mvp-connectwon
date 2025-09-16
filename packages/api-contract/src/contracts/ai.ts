/**
 * Description : ai.ts - 📌 AI 관련 타입정의
 * Author : Shiwoo Min
 * Date : 2025-09-11
 */
// AI 상호작용 성공/실패 상태 타입
export type AIInteractionStatus = 'OK' | 'ERROR';

// AI 상호작용 종류 타입
export type AIInteractionKind = 'chat' | 'embed' | 'completion' | 'image' | 'audio';

// AI 상호작용 상세정보 인터페이스
export interface AIInteraction {
  // 고유 식별자
  id: string;
  // 관련 사용자 ID (있을 경우)
  user_id: string | null;
  // 관련 프로그램 ID (있을 경우)
  program_id: string | null;
  // 관련 세션 ID (있을 경우)
  session_id: string | null;
  // AI 서비스 제공자 이름
  provider: string;
  // 사용된 AI 모델 이름
  model: string;
  // 상호작용 종류
  kind: AIInteractionKind;
  // 프롬프트 토큰 수
  prompt_tokens: number;
  // 완료 토큰 수
  completion_tokens: number;
  // 상호작용 비용
  cost: number;
  // 상호작용 상태
  status: AIInteractionStatus;
  // 추적 ID (있을 경우)
  trace_id: string | null;
  // 생성 메타데이터
  meta: Record<string, any>;
  // 생성 일시
  created_at: string;
}

// AI 상호작용 생성 요청 인터페이스
export interface CreateAIInteractionRequest {
  // 관련 사용자 ID (있을 경우)
  user_id?: string;
  // 관련 프로그램 ID (있을 경우)
  program_id?: string;
  // 관련 세션 ID (있을 경우)
  session_id?: string;
  // AI 서비스 제공자 이름
  provider: string;
  // 사용된 AI 모델 이름
  model: string;
  // 상호작용 종류
  kind: AIInteractionKind;
  // 프롬프트 토큰 수
  prompt_tokens?: number;
  // 완료 토큰 수
  completion_tokens?: number;
  // 상호작용 비용
  cost?: number;
  // 상호작용 상태
  status?: AIInteractionStatus;
  // 추적 ID (있을 경우)
  trace_id?: string;
  // 생성 메타데이터
  meta?: Record<string, any>;
}

// AI 상호작용 목록 조회 시 사용되는 쿼리 파라미터 인터페이스
export interface UpdateAIInteractionRequest {
  // AI 서비스 제공자 이름
  prompt_tokens?: number;
  // 사용된 AI 모델 이름
  completion_tokens?: number;
  // 상호작용 종류
  cost?: number;
  // 상호작용 상태
  status?: AIInteractionStatus;
  // 추적 ID (있을 경우)
  trace_id?: string;
  // 생성 메타데이터
  meta?: Record<string, any>;
}

// AI 상호작용 통계 조회를 위한 쿼리 파라미터 인터페이스
export interface AIInteractionListQuery {
  // 페이지 번호
  page?: number;
  // 페이지당 항목 수
  limit?: number;
  // 사용자 ID 필터
  user_id?: string;
  // 프로그램 ID 필터
  program_id?: string;
  // 세션 ID 필터
  session_id?: string;
  // 제공자 필터
  provider?: string;
  // 모델 필터
  model?: string;
  // 종류 필터
  kind?: AIInteractionKind;
  // 상태 필터
  status?: AIInteractionStatus;
  // 추적 ID 필터
  trace_id?: string;
  // 생성 일시 범위 필터 (시작)
  created_after?: string;
  // 생성 일시 범위 필터 (종료)
  created_before?: string;
}

// AI 상호작용 통계 조회를 위한 쿼리 파라미터 인터페이스
export interface AIInteractionStatsQuery {
  // 사용자 ID 필터
  user_id?: string;
  // 프로그램 ID 필터
  program_id?: string;
  // 세션 ID 필터
  session_id?: string;
  // 제공자 필터
  provider?: string;
  // 모델 필터
  model?: string;
  // 상태 필터
  kind?: AIInteractionKind;
  // 생성 일시 범위 필터 (시작)
  date_from?: string;
  // 생성 일시 범위 필터 (종료)
  date_to?: string;
}

// AI 상호작용 통계 응답 인터페이스
export interface AIInteractionStats {
  // 통계 기간 시작 일시
  total_interactions: number;
  // 통계 기간 종료 일시
  total_prompt_tokens: number;
  // 총 상호작용 수
  total_completion_tokens: number;
  // 총 프롬프트 토큰 수
  total_cost: number;
  // 총 완료 토큰 수
  success_rate: number;
  // 총 비용
  breakdown_by_provider: Record<
    string,
    {
      count: number;
      cost: number;
      tokens: number;
    }
  >;
  // 성공 비율
  breakdown_by_kind: Record<
    string,
    {
      count: number;
      cost: number;
      tokens: number;
    }
  >;
}

// API 응답 인터페이스
export interface AIInteractionResponse {
  // 단일 AI 상호작용 데이터
  data: AIInteraction;
  // 선택적 메시지
  message?: string;
}

// AI 상호작용 목록 응답 인터페이스
export interface AIInteractionsListResponse {
  // AI 상호작용 데이터 배열
  data: AIInteraction[];
  // 페이지네이션 정보
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// AI 상호작용 통계 응답 인터페이스
export interface AIInteractionStatsResponse {
  // AI 상호작용 통계 데이터
  data: AIInteractionStats;
  // 선택적 메시지
  query_period: {
    from: string;
    to: string;
  };
}
