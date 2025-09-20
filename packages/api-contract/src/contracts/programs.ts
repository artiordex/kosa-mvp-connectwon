/**
 * Description : programs.ts - 📌 Programs 관련 타입정의
 * Author : Shiwoo Min
 * Date : 2025-09-11
 * 09-21 - 주석 보강
 */
/**
 * @description 프로그램 인터페이스 정의
 * @returns 프로그램에 대한 기본 정보와 상태를 포함하는 객체
 */
export interface Program {
  id: string;
  created_by_user_id: string;
  type: string | null;
  title: string;
  description: string | null;
  ai_summary_tags: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * @description 프로그램 생성 요청 인터페이스
 * @returns 프로그램 생성에 필요한 필드들을 포함
 */
export interface CreateProgramRequest {
  type?: string;
  title: string;
  description?: string;
  ai_summary_tags?: string[];
  is_active?: boolean;
}

/**
 * @description 프로그램 수정 요청 인터페이스
 * @returns 프로그램 수정에 사용할 수 있는 선택적 필드들
 */
export interface UpdateProgramRequest {
  type?: string;
  title?: string;
  description?: string;
  ai_summary_tags?: string[];
  is_active?: boolean;
}

/**
 * @description 프로그램 목록 조회 쿼리 파라미터 인터페이스
 * @returns 프로그램 목록을 필터링하고 페이지네이션하는 데 사용
 */
export interface ProgramListQuery {
  page?: number;
  limit?: number;
  created_by_user_id?: string;
  type?: string;
  is_active?: boolean;
  title?: string;
  created_after?: string;
  created_before?: string;
}

/**
 * @description 단일 프로그램 API 응답 인터페이스
 * @returns 프로그램 데이터와 선택적 메시지를 포함
 */
export interface ProgramResponse {
  data: Program;
  message?: string;
}

/**
 * @description 프로그램 목록 API 응답 인터페이스
 * @returns 프로그램 배열과 페이지네이션 정보를 포함
 */
export interface ProgramsListResponse {
  data: Program[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
