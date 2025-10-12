/**
 * Description : SSO.tsx - 📌 소셜 로그인 (네이버, 카카오, 구글 - 실제 팝업 + Mock)
 * Author : Shiwoo Min
 * Date : 2025-10-10
 */

'use client';

import { useState } from 'react';
import { SiNaver } from 'react-icons/si';

export default function SSOLogin() {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState<string>('');

  const DUMMY_USER = {
    id: 'mock-user-001',
    name: '민시우',
    email: 'artiordex@gmail.com',
    providers: ['local', 'google'],
    picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=connectwon',
  };

  const handleGooglePopupMock = () => {
    setLoadingProvider('google');
    setLoadingMessage('Google 로그인 페이지로 이동 중...');

    const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    googleAuthUrl.searchParams.set(
      'client_id',
      '115173039797-ecvh16mgnv6l2noho9j6ov6bcou3ad84.apps.googleusercontent.com'
    );
    googleAuthUrl.searchParams.set(
      'redirect_uri',
      'http://localhost:3000/api/auth/callback/google'
    );
    googleAuthUrl.searchParams.set('response_type', 'code');
    googleAuthUrl.searchParams.set('scope', 'openid email profile');
    googleAuthUrl.searchParams.set('state', 'mock');

    const popup = window.open(
      googleAuthUrl.toString(),
      'google-login',
      'width=500,height=600'
    );

    setTimeout(() => setLoadingMessage('Google 계정 선택 중...'), 1500);
    setTimeout(() => setLoadingMessage('계정 정보를 확인하는 중...'), 3500);
    setTimeout(() => setLoadingMessage('인증 중입니다...'), 4800);

    const timer = setInterval(() => {
      if (popup?.closed) {
        clearInterval(timer);
        finishMockGoogleLogin();
      }
    }, 800);

    setTimeout(() => {
      if (!popup?.closed) popup?.close();
      finishMockGoogleLogin();
    }, 6000);
  };

  const finishMockGoogleLogin = () => {
    localStorage.setItem(
      'mockUser',
      JSON.stringify({ ...DUMMY_USER, provider: 'google' })
    );
    alert(`Google 계정(${DUMMY_USER.email})으로 로그인되었습니다.`);
    setLoadingProvider(null);
    window.location.href = '/';
  };

  const handleSocialLogin = async (provider: 'naver' | 'kakao' | 'google') => {
    if (provider === 'google') {
      handleGooglePopupMock();
      return;
    }

    setLoadingProvider(provider);
    setLoadingMessage(`${provider.toUpperCase()} 로그인 중...`);
    await new Promise(resolve => setTimeout(resolve, 1500));
    localStorage.setItem(
      'mockUser',
      JSON.stringify({
        ...DUMMY_USER,
        provider,
        email: `${provider}@connectwon.com`,
      })
    );
    alert(`${provider.toUpperCase()} 계정으로 로그인되었습니다.`);
    window.location.href = '/';
  };

  return (
    <div className="relative mb-6">
      {loadingProvider && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg z-10">
          <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mb-3" />
          <p className="text-sm text-gray-700 font-medium">{loadingMessage}</p>
        </div>
      )}

      <div className="flex justify-center space-x-6">
        {/* 카카오 */}
        <button
          onClick={() => handleSocialLogin('kakao')}
          aria-label="카카오 로그인"
          className="w-12 h-12 rounded-full flex items-center justify-center bg-[#FEE500] hover:scale-105 transition-transform shadow-md"
        >
          <span className="bg-black text-[#FEE500] text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
            TALK
          </span>
        </button>

        {/* 네이버 */}
        <button
          onClick={() => handleSocialLogin('naver')}
          aria-label="네이버 로그인"
          className="w-12 h-12 rounded-full flex items-center justify-center bg-[#03C75A] hover:scale-105 transition-transform shadow-md"
        >
          <SiNaver className="text-white text-xl" />
        </button>

        {/* 구글 */}
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
