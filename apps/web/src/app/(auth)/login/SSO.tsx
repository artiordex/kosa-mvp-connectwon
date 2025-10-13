/**
 * Description : SSO.tsx - 📌 소셜 로그인
 * Author : Shiwoo Min
 * Date : 2025-10-10
 */

'use client';

import { useState } from 'react';
import { SiNaver } from 'react-icons/si';

/* Security session keys */
const S_LOGIN_HISTORY   = 'security:loginHistory';
const S_TRUSTED_DEVICES = 'security:trustedDevices';
const S_SSO_CONNECTED   = 'security:ssoConnected';

/* Helpers */
const s = (v?: string) => v ?? '';
const pad2 = (n: number) => (n < 10 ? `0${n}` : `${n}`);
const nowStamp = (d: Date = new Date()) =>
  `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())} ${pad2(d.getHours())}:${pad2(d.getMinutes())}`;

function detectBrowser() {
  try {
    if (typeof navigator === 'undefined') return { name: 'Unknown', version: '' };
    const navAny = navigator as any;
    const brands = navAny.userAgentData?.brands as {brand:string;version?:string}[] | undefined;
    if (brands?.length) {
      const pick = (label:string) => brands.find(b => b.brand?.includes(label));
      const edge = pick('Microsoft Edge') || pick('Edg') || pick('Edge');
      const chrome = pick('Google Chrome') || pick('Chrome');
      const chromium = pick('Chromium');
      if (edge)     return { name:'Edge',    version:s(edge.version) };
      if (chrome)   return { name:'Chrome',  version:s(chrome.version) };
      if (chromium) return { name:'Chromium',version:s(chromium.version) };
    }
    const ua = navigator.userAgent;
    const mEdge    = ua.match(/Edg\/([\d.]+)/);
    const mChrome  = ua.match(/Chrome\/([\d.]+)/);
    const mFirefox = ua.match(/Firefox\/([\d.]+)/);
    const mSafari  = ua.match(/Version\/([\d.]+) Safari\//);
    const mOpera   = ua.match(/OPR\/([\d.]+)/);
    if (mEdge)    return { name:'Edge',    version:s(mEdge[1]) };
    if (mChrome)  return { name:'Chrome',  version:s(mChrome[1]) };
    if (mFirefox) return { name:'Firefox', version:s(mFirefox[1]) };
    if (mSafari && /Safari\//.test(ua) && !/Chrome\//.test(ua))
                  return { name:'Safari',  version:s(mSafari[1]) };
    if (mOpera)   return { name:'Opera',   version:s(mOpera[1]) };
    return { name:'Unknown', version:'' };
  } catch {
    return { name:'Unknown', version:'' };
  }
}
function detectOS() {
  try {
    if (typeof navigator === 'undefined') return { name:'Unknown' };
    const ua = navigator.userAgent;
    if (/Windows NT/.test(ua))         return { name:'Windows' };
    if (/Macintosh|Mac OS X/.test(ua)) return { name:'macOS' };
    if (/iPhone|iPad|iPod/.test(ua))   return { name:'iOS' };
    if (/Android/.test(ua))            return { name:'Android' };
    if (/CrOS/.test(ua))               return { name:'ChromeOS' };
    if (/Linux/.test(ua))              return { name:'Linux' };
    return { name:'Unknown' };
  } catch {
    return { name:'Unknown' };
  }
}
function buildDeviceLabel() {
  const b = detectBrowser();
  const os = detectOS();
  const major = s(b.version).split('.')[0] || '';
  const br = b.name === 'Unknown' ? 'Unknown Browser' : `${b.name}${major ? ' ' + major : ''}`;
  const osPart = os.name === 'Unknown' ? 'Unknown OS' : os.name;
  return `${osPart} · ${br}`;
}
function deviceId() {
  try {
    if (typeof navigator === 'undefined') return 'dev-unknown';
    const raw = `${navigator.userAgent}|${(navigator as any).userAgentData?.platform ?? navigator.platform}|${navigator.language}`;
    let h = 0;
    for (let i = 0; i < raw.length; i++) { h = (h << 5) - h + raw.charCodeAt(i); h |= 0; }
    return `dev-${Math.abs(h)}`;
  } catch {
    return 'dev-unknown';
  }
}
function approxLocation() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Etc/UTC';
    if (tz.startsWith('Asia/Seoul') || tz.includes('Seoul')) return '서울, 대한민국';
    if (tz.startsWith('Asia/Tokyo')) return '도쿄, 일본';
    if (tz.startsWith('America/'))   return '미주(추정)';
    if (tz.startsWith('Europe/'))    return '유럽(추정)';
    return tz;
  } catch {
    return '알 수 없음';
  }
}

/* 샘플 더미 계정 */
const DUMMY_USER = {
  id: 'mock-user-001',
  name: '민시우',
  email: 'creator@connectwon.com',
  providers: ['local', 'google'],
  picture: '/images/avatar.png',
};

export default function SSOLogin() {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState<string>('');

  // 보안 기록에 SSO 로그인 반영
  const logSsoLogin = (provider: 'google'|'kakao'|'naver') => {
    try {
      const history = JSON.parse(sessionStorage.getItem(S_LOGIN_HISTORY) || '[]') as any[];
      const label = buildDeviceLabel();
      const row = {
        device: label,
        location: approxLocation(),
        ip: 'N/A',
        date: nowStamp(),
        action: 'login' as const,
        provider: 'sso' as const,
      };
      sessionStorage.setItem(S_LOGIN_HISTORY, JSON.stringify([row, ...history]));

      const devs = JSON.parse(sessionStorage.getItem(S_TRUSTED_DEVICES) || '[]') as any[];
      const id = deviceId();
      const idx = devs.findIndex((d:any) => d.id === id);
      if (idx >= 0) {
        devs[idx] = { id, name: label, lastUsed: row.date };
      } else {
        devs.unshift({ id, name: label, lastUsed: row.date });
      }
      sessionStorage.setItem(S_TRUSTED_DEVICES, JSON.stringify(devs));

      // SSO 상태 true로
      sessionStorage.setItem(S_SSO_CONNECTED, 'true');

      // mockUser 저장
      localStorage.setItem('mockUser', JSON.stringify({ ...DUMMY_USER, provider }));
      window.dispatchEvent(new Event('auth-changed'));
    } catch (e) {
      console.error('[SSO] logSsoLogin failed:', e);
    }
  };

  const handleGooglePopupMock = () => {
    setLoadingProvider('google');
    setLoadingMessage('Google 로그인 페이지로 이동 중...');

    const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    googleAuthUrl.searchParams.set('client_id','115173039797-ecvh16mgnv6l2noho9j6ov6bcou3ad84.apps.googleusercontent.com');
    googleAuthUrl.searchParams.set('redirect_uri','http://localhost:3000/api/auth/callback/google');
    googleAuthUrl.searchParams.set('response_type','code');
    googleAuthUrl.searchParams.set('scope','openid email profile');
    googleAuthUrl.searchParams.set('state','mock');

    const popup = window.open(googleAuthUrl.toString(),'google-login','width=500,height=600');

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
    try {
      logSsoLogin('google');
      alert(`Google 계정(${DUMMY_USER.email})으로 로그인되었습니다.`);
      setLoadingProvider(null);
      window.location.href = '/';
    } catch (e) {
      console.error('[SSO] finishMockGoogleLogin failed:', e);
      setLoadingProvider(null);
      alert('구글 로그인 처리 중 오류가 발생했습니다.');
    }
  };

  const handleSocialLogin = async (provider: 'naver' | 'kakao' | 'google') => {
    if (provider === 'google') {
      handleGooglePopupMock();
      return;
    }

    try {
      setLoadingProvider(provider);
      setLoadingMessage(`${provider.toUpperCase()} 로그인 중...`);
      await new Promise(resolve => setTimeout(resolve, 1200));

      logSsoLogin(provider);
      alert(`${provider.toUpperCase()} 계정으로 로그인되었습니다.`);
      window.location.href = '/';
    } catch (e) {
      console.error('[SSO] handleSocialLogin failed:', e);
      setLoadingProvider(null);
      alert('소셜 로그인 처리 중 오류가 발생했습니다.');
    }
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
        <button onClick={() => handleSocialLogin('kakao')} aria-label="카카오 로그인"
          className="w-12 h-12 rounded-full flex items-center justify-center bg-[#FEE500] hover:scale-105 transition-transform shadow-md">
          <span className="bg-black text-[#FEE500] text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">TALK</span>
        </button>

        {/* 네이버 */}
        <button onClick={() => handleSocialLogin('naver')} aria-label="네이버 로그인"
          className="w-12 h-12 rounded-full flex items-center justify-center bg-[#03C75A] hover:scale-105 transition-transform shadow-md">
          <SiNaver className="text-white text-xl" />
        </button>

        {/* 구글 */}
        <button onClick={() => handleSocialLogin('google')} aria-label="구글 로그인"
          className="w-12 h-12 rounded-full flex items-center justify-center bg-[#EA4335] hover:scale-105 transition-transform shadow-md">
          <span className="text-white text-xl font-bold">G</span>
        </button>
      </div>
    </div>
  );
}
