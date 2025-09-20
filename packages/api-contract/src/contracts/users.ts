/**
 * Description : users.ts - 📌 Users 관련 타입정의
 * Author : Shiwoo Min
 * Date : 2025-09-11
 * 09-21 - 주석 보강
 */
/**
 * @description 사용자 인터페이스
 * @returns 사용자에 대한 기본 정보와 상태를 포함하는 객체
 */
export interface User {
  id: string;
  email: string | null;
  name: string | null;
  google_sub: string | null;
  last_login_at: string | null;
  role_flags: number;
  preferences: Record<string, any>;
  created_at: string;
  updated_at: string;
}

/**
 * @description 사용자 생성 요청 인터페이스
 * @returns 사용자 생성에 사용할 수 있는 필드들
 */
export interface CreateUserRequest {
  email?: string;
  name?: string;
  google_sub?: string;
  role_flags?: number;
  preferences?: Record<string, any>;
}

/**
 * @description 사용자 수정 요청 인터페이스
 * @returns 사용자 정보 수정에 사용 가능한 선택적 필드들
 */
export interface UpdateUserRequest {
  email?: string;
  name?: string;
  last_login_at?: string;
  role_flags?: number;
  preferences?: Record<string, any>;
}

/**
 * @description 사용자 목록 조회 쿼리 파라미터 인터페이스
 * @returns 사용자 목록 필터링 및 페이징에 사용
 */
export interface UserListQuery {
  page?: number;
  limit?: number;
  email?: string;
  role_flags?: number;
  created_after?: string;
  created_before?: string;
}

/**
 * @description 단일 사용자 API 응답 인터페이스
 * @returns 사용자 데이터와 선택적 메시지 포함
 */
export interface UserResponse {
  data: User;
  message?: string;
}

/**
 * @description 사용자 목록 API 응답 인터페이스
 * @returns 사용자 배열과 페이지네이션 정보 포함
 */
export interface UsersListResponse {
  data: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
