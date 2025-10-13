/**
 * Description : Login.tsx - 📌 이메일/비밀번호 로그인 폼 및 UX 로직 (Mock 계정 + 보안기록 연동)
 * Author : Shiwoo Min
 * Date : 2025-10-10 (patched: set storage → dispatch → navigate + security logs)
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SSOLogin from './SSO';
import Input from 'components/Input';

/* Security session keys (SecurityPage와 동일) */
const S_LOGIN_HISTORY   = 'security:loginHistory';
const S_TRUSTED_DEVICES = 'security:trustedDevices';
const S_SSO_CONNECTED   = 'security:ssoConnected';

/* Helpers: 탐지/라벨/시간 */
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
  password: 'connectwon123!',
  providers: ['local', 'google'],
  picture: '/images/avatar.png',
  role: 'Creator',
  role_flags: 2,
  preferences: { language: 'ko', theme: 'light', emailNotifications: true, smsNotifications: false, pushNotifications: true },
  stats: { totalReservations: 3, upcomingReservations: 1, completedPrograms: 2, totalPoints: 12000 },
  createdAt: new Date().toISOString(),
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 보안 기록에 로그인 반영(로컬 로그인)
  const logLocalLogin = () => {
    try {
      const history = JSON.parse(sessionStorage.getItem(S_LOGIN_HISTORY) || '[]') as any[];
      const label = buildDeviceLabel();
      const row = {
        device: label,
        location: approxLocation(),
        ip: 'N/A',
        date: nowStamp(),
        action: 'login' as const,
        provider: 'local' as const,
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

      // 로컬 로그인은 SSO 상태 false로
      sessionStorage.setItem(S_SSO_CONNECTED, 'false');
    } catch (e) {
      console.error('[Login] logLocalLogin failed:', e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((r) => setTimeout(r, 300)); // 살짝의 UX 딜레이

      if (email === DUMMY_USER.email && password === DUMMY_USER.password) {
        // 1) mock 세션 저장
        localStorage.setItem('mockUser', JSON.stringify({ ...DUMMY_USER, provider: 'local' }));

        // 2) 보안 기록(세션 스토리지)에 남기기
        logLocalLogin();

        // 3) 브로드캐스트 + 라우팅
        window.dispatchEvent(new Event('auth-changed'));
        router.replace('/');

      } else {
        alert('이메일 또는 비밀번호가 올바르지 않습니다.');
      }
    } catch (err) {
      console.error('로그인 실패:', err);
      alert('로그인 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4">
      <div className="bg-white rounded-xl shadow-md p-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">로그인</h1>
          <p className="text-gray-600">Connectwon에 다시 오신 걸 환영합니다.</p>
        </div>

        {/* 이메일/비밀번호 로그인 */}
        <form onSubmit={handleSubmit} className="space-y-6 mb-6">
          <Input id="email" name="email" type="email" label="이메일" value={email} onChangeAction={setEmail} required />
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            label="비밀번호"
            value={password}
            onChangeAction={setPassword}
            required
            rightElement={
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-500 hover:text-gray-700">
                <i className={`${showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} w-5 h-5`} />
              </button>
            }
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              <span className="ml-2 text-sm text-gray-600">로그인 상태 유지</span>
            </label>
            <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">비밀번호 찾기</Link>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50">
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        {/* 구분선 + SNS 로그인 */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300" /></div>
          <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">또는 SNS 로그인</span></div>
        </div>

        <SSOLogin />

        <div className="mt-6 text-center">
          <span className="text-gray-600">아직 계정이 없으신가요? </span>
          <Link href="/signup" className="text-blue-600 font-medium hover:text-blue-800">회원가입</Link>
        </div>

        {/* 개발용 힌트 */}
        <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-xs text-blue-800 font-medium">💡 개발용 계정 정보</p>
          <p className="text-xs text-blue-600 mt-1">
            이메일: {DUMMY_USER.email}<br />비밀번호: {DUMMY_USER.password}
          </p>
          <p className="text-[10px] text-gray-500 mt-1">(크리에이터 일반 로그인 및 구글 연동 테스트용 계정입니다.)</p>
        </div>
      </div>
    </div>
  );
}
