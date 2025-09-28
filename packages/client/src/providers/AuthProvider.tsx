/**
 * Description : AuthProvider.tsx - 📌 클라이언트 측 인증 컨텍스트 제공자
 * Author : Shiwoo Min
 * Date : 2025-09-12
 */
'use client';

import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import type { SessionUser, UserRole } from '../client-types.js';

/**
 * Description : AuthProvider.tsx - 📌 클라이언트 측 인증 컨텍스트 제공자
 * Author : Shiwoo Min
 * Date : 2025-09-12
 */

/**
 * @description 인증 컨텍스트 값 타입 (클라이언트 전용)
 */
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

/**
 * @description AuthProvider props 정의
 */
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

/**
 * @description 클라이언트 측 인증 컨텍스트 제공자
 */
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
  const [loading, setLoading] = useState(!initialUser && !!fetchCurrentUser);

  /**
   * @description 사용자 정보 새로고침
   */
  const refresh = useCallback(async () => {
    if (!fetchCurrentUser) return;
    setLoading(true);
    try {
      const next = await fetchCurrentUser();
      setUser(next);
    } catch (error) {
      console.error('AuthProvider: Failed to refresh user', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [fetchCurrentUser]);

  /**
   * @description 로그인 처리
   */
  const login = useCallback(
    async (token: string) => {
      try {
        await onLogin?.(token);
        await refresh();
      } catch (error) {
        console.error('AuthProvider: Login failed', error);
        throw error;
      }
    },
    [onLogin, refresh],
  );

  /**
   * @description 로그아웃 처리
   */
  const logout = useCallback(async () => {
    try {
      await onLogout?.();
    } catch (error) {
      console.error('AuthProvider: Logout failed', error);
    } finally {
      setUser(null);
    }
  }, [onLogout]);

  /**
   * @description 역할 체크
   */
  const hasRole = useCallback(
    (roleOrRoles: UserRole | UserRole[]): boolean => {
      if (!user) return false;
      const roles = user.roles ?? [];
      return Array.isArray(roleOrRoles) ? roleOrRoles.some(r => roles.includes(r)) : roles.includes(roleOrRoles);
    },
    [user],
  );

  /**
   * @description 권한 체크
   */
  const hasPermission = useCallback(
    (perm: string): boolean => {
      if (!user) return false;
      if (permissionResolver) return permissionResolver(user, perm);

      const metadata = user.metadata as Record<string, unknown> | undefined;
      if (!metadata || typeof metadata !== 'object') return false;

      const permissions = metadata['permissions'];
      return Array.isArray(permissions) && permissions.includes(perm);
    },
    [user, permissionResolver],
  );

  /**
   * @description 회원가입 처리
   */
  const register = useCallback(
    async (payload: unknown) => {
      try {
        await onRegister?.(payload);
      } catch (error) {
        console.error('AuthProvider: Registration failed', error);
        throw error;
      }
    },
    [onRegister],
  );

  /**
   * @description 토큰 갱신 처리
   */
  const refreshToken = useCallback(async () => {
    try {
      await onRefreshToken?.();
      await refresh();
    } catch (error) {
      console.error('AuthProvider: Token refresh failed', error);
      throw error;
    }
  }, [onRefreshToken, refresh]);

  /**
   * @description 초기 사용자 정보 로딩
   */
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
