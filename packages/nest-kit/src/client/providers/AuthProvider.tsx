/**
 * Description : AuthProvider.ts - 📌 클라이언트 측 인증 컨텍스트 제공자
 * Author : Shiwoo Min
 * Date : 2025-09-12
 */
'use client';

import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';

import type { SessionUser } from '../../nest-types.js';

// API 응답 공용 타입
export type AuthContextValue = {
  user: SessionUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<SessionUser | null>>;
  refresh: () => Promise<void>;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  hasRole: (roleOrRoles: string | string[]) => boolean;
  hasPermission: (perm: string) => boolean;
  register: (payload: unknown) => Promise<void>;
  refreshToken: () => Promise<void>;
};

// 인증 컨텍스트
export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type Props = {
  children: React.ReactNode;
  initialUser?: SessionUser | null;
  fetchCurrentUser?: () => Promise<SessionUser | null>;
  onLogin?: (token: string) => Promise<void> | void;
  onLogout?: () => Promise<void> | void;
  onRegister?: (payload: unknown) => Promise<void> | void;
  onRefreshToken?: () => Promise<void> | void;
  permissionResolver?: (user: SessionUser, perm: string) => boolean;
};

export function AuthProvider({
  children,
  initialUser = null,
  fetchCurrentUser,
  onLogin,
  onLogout,
  onRegister,
  onRefreshToken,
  permissionResolver,
}: Props) {
  const [user, setUser] = useState<SessionUser | null>(initialUser);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!fetchCurrentUser) return;
    setLoading(true);
    try {
      const next = await fetchCurrentUser();
      setUser(next);
    } finally {
      setLoading(false);
    }
  }, [fetchCurrentUser]);

  const login = useCallback(
    async (token: string) => {
      await onLogin?.(token);
      await refresh();
    },
    [onLogin, refresh],
  );

  const logout = useCallback(async () => {
    await onLogout?.();
    setUser(null);
  }, [onLogout]);

  const hasRole = useCallback(
    (roleOrRoles: string | string[]) => {
      const roles = user?.roles ?? [];
      return Array.isArray(roleOrRoles)
        ? roleOrRoles.some(r => roles.includes(r as any))
        : roles.includes(roleOrRoles as any);
    },
    [user],
  );

  const hasPermission = useCallback(
    (perm: string) => {
      if (!user) return false;
      if (permissionResolver) return permissionResolver(user, perm);
      const perms = Array.isArray((user.metadata as any)?.permissions)
        ? ((user.metadata as any).permissions as string[])
        : undefined;
      return perms?.includes(perm) ?? false;
    },
    [user, permissionResolver],
  );

  const register = useCallback(
    async (payload: unknown) => {
      await onRegister?.(payload);
    },
    [onRegister],
  );

  const refreshToken = useCallback(async () => {
    await onRefreshToken?.();
    await refresh();
  }, [onRefreshToken, refresh]);

  useEffect(() => {
    if (!initialUser && fetchCurrentUser) void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
