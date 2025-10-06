/**
 * Description : FirebaseProvider.tsx - 📌 Firebase 인증 전용 Provider
 * Author : Shiwoo Min
 * Date : 2025-10-03
 */
'use client';

import React from 'react';
import type { SessionUser } from '../client-types.js';
import { AuthProvider } from './AuthProvider.js';
import { auth } from './firebase.js';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

/**
 * Firebase 전용 Provider
 * AuthProvider에 Firebase SDK 기반 콜백을 주입
 */
export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  // 현재 사용자 정보 fetch
  const fetchCurrentUser = async (): Promise<SessionUser | null> => {
    return new Promise(resolve => {
      const unsub = onAuthStateChanged(auth, user => {
        unsub();
        if (!user) return resolve(null);

        resolve({
          id: user.uid,
          email: user.email ?? '',
          roles: ['user'],
          metadata: {
            emailVerified: user.emailVerified,
          },
        });
      });
    });
  };

  // 로그인
  const onLogin = async (token: string) => {
    // 여기서는 token을 email/password JSON으로 받는다고 가정
    const { email, password } = JSON.parse(token);
    await signInWithEmailAndPassword(auth, email, password);
  };

  // 회원가입
  const onRegister = async (payload: unknown) => {
    const { email, password } = payload as { email: string; password: string };
    await createUserWithEmailAndPassword(auth, email, password);
  };

  // 로그아웃
  const onLogout = async () => {
    await signOut(auth);
  };

  // 토큰 갱신
  const onRefreshToken = async () => {
    await auth.currentUser?.getIdToken(true);
  };

  return (
    <AuthProvider fetchCurrentUser={fetchCurrentUser} onLogin={onLogin} onRegister={onRegister} onLogout={onLogout} onRefreshToken={onRefreshToken}>
      {children}
    </AuthProvider>
  );
}
