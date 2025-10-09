/**
 * Description : AuthProvider.tsx - 📌 Firebase 통합 클라이언트 인증 컨텍스트 제공자
 * Author : Shiwoo Min
 * Date : 2025-10-07
 */
'use client';
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import type { SessionUser, UserRole } from '../client-types.js';
import { auth } from '../providers/firebase-init.js';
import type { User as FirebaseUser } from 'firebase/auth';
import { onAuthStateChanged, onIdTokenChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

/**
 * @description 인증 컨텍스트 값 타입 (클라이언트 전용)
 */
export interface AuthContextValue {
  user: SessionUser | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<SessionUser | null>>;
  refresh: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hasRole: (roleOrRoles: UserRole | UserRole[]) => boolean;
  hasPermission: (perm: string) => boolean;
  register: (payload: unknown) => Promise<void>;
  refreshToken: () => Promise<void>;
}

// 인증 컨텍스트 생성
export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * @description AuthProvider props 정의
 */
interface AuthProviderProps {
  children: React.ReactNode;
  initialUser?: SessionUser | null;
  fetchCurrentUser?: (token?: string) => Promise<SessionUser | null>;
  onRegister?: (payload: unknown) => Promise<void> | void;
  /**
   * @description 권한 확인 로직 (선택사항)
   * @default 모든 권한 true 반환
   */
  permissionResolver?: (user: SessionUser, perm: string) => boolean; 
}

/**
 * @description Firebase 기반 클라이언트 인증 컨텍스트 제공자
 */
export function AuthProvider({
  children,
  initialUser = null,
  fetchCurrentUser,
  onRegister,
  permissionResolver,
}: AuthProviderProps) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<SessionUser | null>(initialUser);
  const [loading, setLoading] = useState(true);

  /**
   * Firebase 유저 상태 감시 및 SessionUser fetch
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async fbUser => {
      setFirebaseUser(fbUser);
      if (fbUser && fetchCurrentUser) {
        try {
          const token = await fbUser.getIdToken();
          const currentUser = await fetchCurrentUser(token);
          setUser(currentUser);
        } catch (error) {
          console.error('AuthProvider: fetchCurrentUser failed', error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, [fetchCurrentUser]);

  /**
   * Firebase 토큰 갱신 감시
   */
  useEffect(() => {
    const unsub = onIdTokenChanged(auth, async fbUser => {
      if (fbUser) await fbUser.getIdToken(true);
    });
    return unsub;
  }, []);

  /**
   * 사용자 정보 새로고침
   */
  const refresh = useCallback(async () => {
    if (firebaseUser && fetchCurrentUser) {
      setLoading(true);
      try {
        const token = await firebaseUser.getIdToken();
        const refreshed = await fetchCurrentUser(token);
        setUser(refreshed);
      } catch (error) {
        console.error('AuthProvider: Failed to refresh user', error);
      } finally {
        setLoading(false);
      }
    }
  }, [firebaseUser, fetchCurrentUser]);

  /**
   * 로그인
   */
  const login = useCallback(async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('AuthProvider: Login failed', error);
      throw error;
    }
  }, []);

  /**
   * 로그아웃
   */
  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('AuthProvider: Logout failed', error);
    }
  }, []);

  /**
   * 역할 검사
   */
  const hasRole = useCallback(
    (roleOrRoles: UserRole | UserRole[]): boolean => {
      if (!user) return false;
      const roles = user.roles ?? [];
      return Array.isArray(roleOrRoles)
        ? roleOrRoles.some(r => roles.includes(r))
        : roles.includes(roleOrRoles);
    },
    [user],
  );

  /**
   * 권한 검사
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
   * 회원가입
   */
  const register = useCallback(async (payload: unknown) => {
    try {
      await onRegister?.(payload);
    } catch (error) {
      console.error('AuthProvider: Registration failed', error);
      throw error;
    }
  }, [onRegister]);

  /**
   * 토큰 강제 갱신
   */
  const refreshToken = useCallback(async () => {
    try {
      if (firebaseUser) {
        await firebaseUser.getIdToken(true);
        await refresh();
      }
    } catch (error) {
      console.error('AuthProvider: Token refresh failed', error);
      throw error;
    }
  }, [firebaseUser, refresh]);

  /**
   * Context 값
   */
  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      firebaseUser,
      loading,
      isAuthenticated: !!firebaseUser,
      setUser,
      refresh,
      login,
      logout,
      hasRole,
      hasPermission,
      register,
      refreshToken,
    }),
    [user, firebaseUser, loading, refresh, login, logout, hasRole, hasPermission, register, refreshToken],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
