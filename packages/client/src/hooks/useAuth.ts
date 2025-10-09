/**
 * Description : useAuth.ts - 📌 클라이언트 측 인증 컨텍스트 훅 (Next.js 비의존형)
 * Author : Shiwoo Min
 * Date : 2025-10-07
 */
'use client';

import { useCallback, useContext, useEffect, useMemo } from 'react';
import type { SessionUser, UserRole } from '../client-types.js';
import { AuthContext, type AuthContextValue } from '../providers/AuthProvider.js';

/**
 * @description 기본 인증 컨텍스트 훅
 */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
}

/**
 * @description 인증된 사용자 정보 훅 (옵션: required)
 */
export function useAuthUser(): SessionUser | null;
export function useAuthUser(opts: { required: true; message?: string }): SessionUser;
export function useAuthUser(opts?: { required?: boolean; message?: string }): SessionUser | null {
  const { user, loading, isAuthenticated } = useAuth();
  if (opts?.required && !loading && !isAuthenticated) {
    throw new Error(opts.message ?? 'Authentication required');
  }
  return user;
}

/**
 * @description 인증 필수 체크 훅 (자동 리다이렉트 지원, Next.js 독립형)
 */
export function useRequireAuth(opts?: {
  redirectTo?: string;
  redirect?: (to: string) => void; // ✅ 외부에서 push 주입
  onUnauthenticated?: () => void;
}) {
  const { user, loading, isAuthenticated } = useAuth();
  const redirectTo = opts?.redirectTo ?? '/login';

  const doRedirect = useCallback(
    (to: string) => {
      if (opts?.redirect) return opts.redirect(to); // Next.js 환경이면 router.push 주입
      if (typeof window !== 'undefined') window.location.href = to; // ✅ fallback
    },
    [opts],
  );

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      opts?.onUnauthenticated?.();
      doRedirect(redirectTo);
    }
  }, [loading, isAuthenticated, doRedirect, redirectTo, opts]);

  return useMemo(
    () => ({
      user,
      loading,
      isAuthenticated,
      isReady: !loading,
    }),
    [user, loading, isAuthenticated],
  );
}

/**
 * @description 권한 체크 훅
 */
export function usePermission(permission: string | string[]) {
  const { user, hasPermission } = useAuth();

  return useMemo(() => {
    if (!user) return false;
    return Array.isArray(permission) ? permission.some(p => hasPermission(p)) : hasPermission(permission);
  }, [user, permission, hasPermission]);
}

/**
 * @description 타입 안전한 역할 체크 훅
 */
export function useRole(role: UserRole | UserRole[]) {
  const { user, hasRole } = useAuth();
  return useMemo(() => {
    if (!user) return false;
    return hasRole(role);
  }, [user, role, hasRole]);
}

/**
 * @description 로그인 상태 여부
 */
export function useIsAuthenticated(): boolean {
  return useAuth().isAuthenticated;
}

/**
 * @description 현재 사용자 + 로딩 상태
 */
export function useCurrentUser() {
  const { user, loading } = useAuth();
  return useMemo(() => ({ user, loading, isLoaded: !loading }), [user, loading]);
}

/**
 * @description 인증 관련 액션 모음
 */
export function useAuthActions() {
  const { login, logout, register, refreshToken } = useAuth();
  return useMemo(() => ({ login, logout, register, refreshToken }), [login, logout, register, refreshToken]);
}

/**
 * @description 조건부 렌더링 가드
 */
export function useAuthGuard() {
  const { user, loading, isAuthenticated } = useAuth();
  return useMemo(
    () => ({
      isLoading: loading,
      isAuthenticated: isAuthenticated && !!user,
      isGuest: !loading && !isAuthenticated,
      isReady: !loading,
      user,
    }),
    [user, loading, isAuthenticated],
  );
}
