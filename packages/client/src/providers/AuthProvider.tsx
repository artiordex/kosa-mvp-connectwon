/**
 * Description : AuthProvider.tsx - 📌 클라이언트 측 인증 컨텍스트 제공자
 * Author : Shiwoo Min
 * Date : 2025-09-12
 */
'use client';

import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import type { SessionUser, UserRole } from '../../client-types.js';

/**
 * Description : AuthProvider.tsx - 📌 클라이언트 측 인증 컨텍스트 제공자
 * Author : Shiwoo Min
 * Date : 2025-09-12
 */

// 타입 안전한 AuthContextValue
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

// 인증 컨텍스트
export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Props 타입 정의
interface AuthProviderProps {
  children: React.ReactNode;
  initialUser?: SessionUser | null;
  fetchCurrentUser?: () => Promise<SessionUser | null>;
  onLogin?: (token: string) => Promise<void> | void;
  onLogout?: () => Promise<void> | void;
  onRegister?: (payload: unknown) => Promise<void> | void;
  onRefreshToken?: () => Promise<void> | void;
  permissionResolver?: (user: SessionUser, perm: string) => boolean;
}

// 인증 제공자 컴포넌트
export function AuthProvider({
  children,
  initialUser = null,
  fetchCurrentUser,
  onLogin,
  onLogout,
  onRegister,
  onRefreshToken,
  permissionResolver,
}: AuthProviderProps) {
  const [user, setUser] = useState<SessionUser | null>(initialUser);
  const [loading, setLoading] = useState(false);
  // 사용자 정보 새로고침 함수
  const refresh = useCallback(async () => {
    if (!fetchCurrentUser) return;
    setLoading(true);
    try {
      const next = await fetchCurrentUser();
      setUser(next);
    } catch (error) {
      console.error('Failed to refresh user:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [fetchCurrentUser]);
  // 로그인 함수
  const login = useCallback(
    async (token: string) => {
      try {
        await onLogin?.(token);
        await refresh();
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },
    [onLogin, refresh],
  );
  // 로그아웃 함수
  const logout = useCallback(async () => {
    try {
      await onLogout?.();
    } finally {
      setUser(null);
    }
  }, [onLogout]);

  // 타입 안전한 역할 체크
  const hasRole = useCallback(
    (roleOrRoles: UserRole | UserRole[]): boolean => {
      const roles = user?.roles ?? [];
      if (Array.isArray(roleOrRoles)) {
        return roleOrRoles.some(r => roles.includes(r));
      }
      return roles.includes(roleOrRoles);
    },
    [user],
  );

  // 개선된 권한 체크
  const hasPermission = useCallback(
    (perm: string): boolean => {
      if (!user) return false;
      if (permissionResolver) return permissionResolver(user, perm);

      // 타입 안전한 메타데이터 접근
      const metadata = user.metadata as Record<string, unknown> | undefined;
      if (!metadata || typeof metadata !== 'object') return false;

      const permissions = metadata['permissions'];
      if (!Array.isArray(permissions)) return false;

      return permissions.some(p => typeof p === 'string' && p === perm);
    },
    [user, permissionResolver],
  );

  // 회원가입 함수
  const register = useCallback(
    async (payload: unknown) => {
      try {
        await onRegister?.(payload);
      } catch (error) {
        console.error('Registration failed:', error);
        throw error;
      }
    },
    [onRegister],
  );

  // 토큰 갱신 함수
  const refreshToken = useCallback(async () => {
    try {
      await onRefreshToken?.();
      await refresh();
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw error;
    }
  }, [onRefreshToken, refresh]);

  // 초기 로딩 최적화
  useEffect(() => {
    if (!initialUser && fetchCurrentUser) {
      void refresh();
    }
  }, [fetchCurrentUser, initialUser, refresh]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,
      setUser,
      refresh,
      login,
      logout,
      hasRole,
      hasPermission,
      register,
      refreshToken,
    }),
    [user, loading, refresh, login, logout, hasRole, hasPermission, register, refreshToken],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
