/**
 * Description : page.tsx - 📌 로그인 페이지 (Login 컴포넌트 엔트리)
 * Author : Shiwoo Min
 * Date : 2025-10-10
 */

'use client';

import Login from './Login';

export default function LoginPage() {
  return (
    <div className="min-h-[90vh] flex items-center justify-center pt-12 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 lg:pb-16">
      <Login />
    </div>
  );
}
