'use client';

import { SiNaver } from 'react-icons/si';
import { signIn } from 'next-auth/react';

/**
 * @description SSOLogin 컴포넌트 (네이버, 카카오, 구글 소셜 로그인 아이콘)
 * @component
 */
export default function SSOLogin() {
  const handleSocialLogin = (provider: 'naver' | 'kakao' | 'google') => {
    console.log(`${provider} 로그인 시도`);
    signIn(provider, { callbackUrl: process.env['NEXT_PUBLIC_LOGIN_REDIRECT_URL'] || '/' });
  };

  return (
    <div className="mb-6">
      {/* 소셜 로그인 아이콘 버튼 */}
      <div className="flex justify-center space-x-6">
        {/* 카카오 (말풍선 안 TALK 텍스트) */}
        <button
          onClick={() => handleSocialLogin('kakao')}
          aria-label="카카오 로그인"
          className="w-12 h-12 rounded-full flex items-center justify-center bg-[#FEE500] hover:scale-105 transition-transform shadow-md"
        >
          <span className="bg-black text-[#FEE500] text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">TALK</span>
        </button>

        {/* 네이버 (기존 유지) */}
        <button
          onClick={() => handleSocialLogin('naver')}
          aria-label="네이버 로그인"
          className="w-12 h-12 rounded-full flex items-center justify-center bg-[#03C75A] hover:scale-105 transition-transform shadow-md"
        >
          <SiNaver className="text-white text-xl" />
        </button>

        {/* 구글 (빨간 원 안에 G 텍스트) */}
        <button
          onClick={() => handleSocialLogin('google')}
          aria-label="구글 로그인"
          className="w-12 h-12 rounded-full flex items-center justify-center bg-[#EA4335] hover:scale-105 transition-transform shadow-md"
        >
          <span className="text-white text-xl font-bold">G</span>
        </button>
      </div>
    </div>
  );
}
