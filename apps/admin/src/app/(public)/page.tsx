/**
 * Description : page.tsx - 📌 ConnectWon Admin Root 엔트리
 * Author : Shiwoo Min
 * Date : 2025-10-11
 */
'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminPage() {
  // TODO: 추후 mock-auth 또는 실제 인증 로직 추가 후 조건부 리다이렉트로 변경
  useEffect(() => {
    redirect('/login');
  }, []);

  return null;
}
