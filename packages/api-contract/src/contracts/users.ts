/**
 * Description : users.ts - 📌 Users 관련 타입정의
 * Author : Shiwoo Min
 * Date : 2025-09-11
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

export interface CreateUserRequest {
  email?: string;
  name?: string;
  google_sub?: string;
  role_flags?: number;
  preferences?: Record<string, any>;
}

export interface UpdateUserRequest {
  email?: string;
  name?: string;
  last_login_at?: string;
  role_flags?: number;
  preferences?: Record<string, any>;
}

export interface UserListQuery {
  page?: number;
  limit?: number;
  email?: string;
  role_flags?: number;
  created_after?: string;
  created_before?: string;
}

export interface UserResponse {
  data: User;
  message?: string;
}

export interface UsersListResponse {
  data: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
