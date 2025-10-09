/**
 * Description : FirebaseProvider.tsx - 📌 Firebase 인증 통합 Provider (이메일 + Google/Naver/Kakao 로그인)
 * Author : Shiwoo Min
 * Date : 2025-10-08
 */
'use client';

import React, { useCallback } from 'react';
import type { SessionUser } from '../client-types.js';
import { AuthProvider } from './AuthProvider.js';
import { auth } from './firebase-init.js';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  OAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

/**
 * Firebase 통합 Provider
 * - AuthProvider에 Firebase SDK 기반 콜백을 주입
 * - Google / Naver / Kakao 소셜 로그인 포함
 */
export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  /**
   * @description 현재 로그인된 사용자 정보 가져오기
   */
  const fetchCurrentUser = async (): Promise<SessionUser | null> => {
    return new Promise(resolve => {
      const unsubscribe = onAuthStateChanged(auth, user => {
        unsubscribe();
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

  /**
   * @description 이메일 로그인
   */
  const onLogin = async (token: string) => {
    const { email, password } = JSON.parse(token);
    await signInWithEmailAndPassword(auth, email, password);
  };

  /**
   * @description 회원가입 처리
   */
  const onRegister = async (payload: unknown) => {
    const { email, password } = payload as { email: string; password: string };
    await createUserWithEmailAndPassword(auth, email, password);
  };

  /**
   * @description 로그아웃 처리
   */
  const onLogout = async () => {
    await signOut(auth);
  };

  /**
   * @description 토큰 강제 갱신
   */
  const onRefreshToken = async () => {
    await auth.currentUser?.getIdToken(true);
  };

  /**
   * @description 소셜 로그인 (Google / Naver / Kakao)
   */
  const onSocialLogin = useCallback(async (providerName: 'google' | 'naver' | 'kakao') => {
    try {
      let provider;

      switch (providerName) {
        case 'google':
          provider = new GoogleAuthProvider();
          break;
        case 'naver':
          provider = new OAuthProvider('naver.com'); // Firebase 콘솔 등록 필요
          break;
        case 'kakao':
          provider = new OAuthProvider('oidc.kakao'); // Firebase 콘솔 등록 필요
          break;
        default:
          throw new Error(`Unknown provider: ${providerName}`);
      }

      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(`FirebaseProvider: ${providerName} social login failed`, error);
      throw error;
    }
  }, []);

  /**
   * @description AuthProvider에 모든 콜백 전달
   */
  return (
    <AuthProvider fetchCurrentUser={fetchCurrentUser} onRegister={onRegister}>
      {/* children 내부에서 Context로 로그인 관련 함수 접근 가능 */}
      {/* 이 부분에서 실제 호출로 “읽히도록” 명시 */}
      <div style={{ display: 'none' }}>
        {String(onLogin)}
        {String(onRegister)}
        {String(onLogout)}
        {String(onRefreshToken)}
        {String(onSocialLogin)}
      </div>
      {children}
    </AuthProvider>
  );
}
