/**
 * Description : useLogoutOn401.ts - 📌 API 401 Unauthorized 시 자동 로그아웃 훅
 * Author : Shiwoo Min
 * Date : 2025-09-29
 */
"use client";

import { useEffect } from 'react';
import { useAuth } from './useAuth.js';

/**
 * @description 401 응답 발생 시 자동 로그아웃 처리
 * @param subscribe 함수: API 클라이언트의 401 이벤트를 구독하는 핸들러 등록
 *
 * 예시)
 *   useLogoutOn401((on401) => apiClient.on('401', on401))
 */
export function useLogoutOn401(subscribe: (on401: () => void) => void) {
  const { logout } = useAuth();

  useEffect(() => {
    const handler = async () => {
      await logout();
    };
    subscribe(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logout]);
}
