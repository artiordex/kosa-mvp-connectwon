/**
 * Description : users.ts - 📌 Users 관련 타입정의
 * Author : Shiwoo Min
 * Date : 2025-09-11
 */
// 사용자 인터페이스
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

// 사용자 생성 요청 및 응답 인터페이스
export interface CreateUserRequest {
  email?: string;
  name?: string;
  google_sub?: string;
  role_flags?: number;
  preferences?: Record<string, any>;
}

// 사용자 수정 요청 인터페이스
export interface UpdateUserRequest {
  email?: string;
  name?: string;
  last_login_at?: string;
  role_flags?: number;
  preferences?: Record<string, any>;
}

// 사용자 목록 조회 쿼리 파라미터 인터페이스
export interface UserListQuery {
  page?: number;
  limit?: number;
  email?: string;
  role_flags?: number;
  created_after?: string;
  created_before?: string;
}

// API 응답 인터페이스
export interface UserResponse {
  data: User;
  message?: string;
}

// 사용자 목록 응답 인터페이스
export interface UsersListResponse {
  data: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
