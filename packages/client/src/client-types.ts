/**
 * Description : next-types.ts - 📌 Next.js 클라이언트 타입 정의
 * Author : Shiwoo Min
 * Date : 2025-09-11
 */
// 사용자 인증 인터페이스
export type UserRole = 'admin' | 'creator' | 'user';

// 역할 상수
export const Roles = {
  Admin: 'admin',
  Creator: 'creator',
  User: 'user',
} as const;

// 유저 세션 인터페이스
export interface SessionUser {
  id: string;
  email: string;
  name?: string;
  roles: UserRole[];
  pictureUrl?: string;
  tenantId?: string;
  locale?: string;
  metadata?: Record<string, unknown>;
}

// API 응답 공용 타입
export type ErrorCode =
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'RATE_LIMITED'
  | 'INTERNAL'
  | 'VALIDATION';

// 에러 응답 바디
export interface ErrorBody {
  code: ErrorCode;
  message: string;
  details?: unknown;
}

// 응답 메타 정보
export interface ResponseMeta {
  requestId?: string;
  traceId?: string;
  elapsedMs?: number;
  page?: number;
  pageSize?: number;
  totalItems?: number;
  totalPages?: number;
}

// API 응답 타입
export type ApiSuccess<T> = { success: true; data: T; meta?: ResponseMeta };
export type ApiError<E extends ErrorBody = ErrorBody> = {
  success: false;
  error: E;
  meta?: ResponseMeta;
};
export type ApiResponse<T, E extends ErrorBody = ErrorBody> = ApiSuccess<T> | ApiError<E>;

// API 성공 체크
export function isApiSuccess<T, E extends ErrorBody = ErrorBody>(
  r: ApiResponse<T, E>,
): r is ApiSuccess<T> {
  return (r as any)?.success === true;
}

// API 에러 체크
export function isApiError<T, E extends ErrorBody = ErrorBody>(
  r: ApiResponse<T, E>,
): r is ApiError<E> {
  return (r as any)?.success === false;
}

// 페이지네이션 인터페이스
export interface PageMeta {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

// 페이지네이션 결과 타입
export interface Paginated<T> {
  items: T[];
  meta: PageMeta;
}

// 커서네이션 결과 타입
export interface CursorPage<T> {
  items: T[];
  nextCursor?: string;
  hasMore: boolean;
}

// 정렬 옵션 타입
export interface PageQuery {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// 커서네이션 쿼리 옵션 타입
export interface CursorQuery {
  cursor?: string;
  limit?: number;
}
export const DEFAULT_PAGE_SIZE = 20;

// 인증 컨텍스트 인터페이스
export interface AuthContextValue {
  user: SessionUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<SessionUser | null>>;
  refresh: () => Promise<void>;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  hasRole: (roleOrRoles: UserRole | UserRole[]) => boolean;
  hasPermission: (perm: string) => boolean;
  register: (payload: unknown) => Promise<void>;
  refreshToken: () => Promise<void>;
}

// 인증 제공자 범위 인터페이스
export interface AuthProviderProps {
  children: React.ReactNode;
  initialUser?: SessionUser | null;
  fetchCurrentUser?: () => Promise<SessionUser | null>;
  onLogin?: (token: string) => Promise<void> | void;
  onLogout?: () => Promise<void> | void;
  onRegister?: (payload: unknown) => Promise<void> | void;
  onRefreshToken?: () => Promise<void> | void;
  permissionResolver?: (user: SessionUser, perm: string) => boolean;
}

// 타입 추출
export type ID = string;
export type Maybe<T> = T | null | undefined;
export type MaybePromise<T> = T | Promise<T>;

// 역할 체크 헬퍼
export function hasRole(userRoles: UserRole[], role: UserRole | UserRole[]): boolean {
  if (Array.isArray(role)) {
    return role.some(r => userRoles.includes(r));
  }
  return userRoles.includes(role);
}
