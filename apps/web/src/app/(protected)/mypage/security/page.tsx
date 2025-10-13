/**
 * Description : page.tsx - 📌 보안 설정 페이지 (confirm + 글로벌 로그아웃 연동)
 * Author : Shiwoo Min
 * Date : 2025-10-12 (patched)
 */

'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

/* ========================= Session Keys ========================= */
const S_LOGIN_HISTORY    = 'security:loginHistory';
const S_TRUSTED_DEVICES  = 'security:trustedDevices';
const S_2FA              = 'security:is2FA';
const S_SSO_CONNECTED    = 'security:ssoConnected';

/* ========================= Types ========================= */
type LoginRow = {
  device: string;
  location: string;
  ip: string;
  date: string;
  action: 'login' | 'logout' | 'other';
  provider?: 'sso' | 'local' | 'unknown';
};
type TrustedDevice = {
  id: string;
  name: string;
  lastUsed: string;
};
type BrowserInfo = {
  name: 'Chrome'|'Edge'|'Safari'|'Firefox'|'Opera'|'Chromium'|'Unknown';
  version: string;
};
type OSInfo = {
  name: 'Windows'|'macOS'|'iOS'|'Android'|'Linux'|'ChromeOS'|'Unknown';
  version?: string;
};

/* ========================= Utils ========================= */
const s = (v?: string) => v ?? '';
const pad2 = (n: number) => (n < 10 ? `0${n}` : `${n}`);
const nowStamp = () => {
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())} ${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
};

function detectBrowser(): BrowserInfo {
  try {
    if (typeof navigator === 'undefined') return { name: 'Unknown', version: '' };
    const navAny = navigator as any;
    const brands: { brand: string; version?: string }[] | undefined = navAny.userAgentData?.brands;
    if (brands?.length) {
      const pick = (label: string) => brands.find(b => b.brand?.includes(label));
      const edge = pick('Microsoft Edge') || pick('Edge') || pick('Edg');
      const chrome = pick('Google Chrome') || pick('Chrome');
      const chromium = pick('Chromium');
      if (edge)     return { name: 'Edge',     version: s(edge.version) };
      if (chrome)   return { name: 'Chrome',   version: s(chrome.version) };
      if (chromium) return { name: 'Chromium', version: s(chromium.version) };
    }
    const ua = navigator.userAgent;
    const mEdge    = ua.match(/Edg\/([\d.]+)/);
    const mChrome  = ua.match(/Chrome\/([\d.]+)/);
    const mFirefox = ua.match(/Firefox\/([\d.]+)/);
    const mSafari  = ua.match(/Version\/([\d.]+) Safari\//);
    const mOpera   = ua.match(/OPR\/([\d.]+)/);

    if (mEdge)    return { name: 'Edge',    version: s(mEdge[1]) };
    if (mChrome)  return { name: 'Chrome',  version: s(mChrome[1]) };
    if (mFirefox) return { name: 'Firefox', version: s(mFirefox[1]) };
    if (mSafari && /Safari\//.test(ua) && !/Chrome\//.test(ua))
                  return { name: 'Safari',  version: s(mSafari[1]) };
    if (mOpera)   return { name: 'Opera',   version: s(mOpera[1]) };
    return { name: 'Unknown', version: '' };
  } catch {
    return { name: 'Unknown', version: '' };
  }
}
function detectOS(): OSInfo {
  try {
    if (typeof navigator === 'undefined') return { name: 'Unknown' };
    const ua = navigator.userAgent;
    if (/Windows NT/.test(ua)) return { name: 'Windows' };
    if (/Macintosh|Mac OS X/.test(ua)) return { name: 'macOS' };
    if (/iPhone|iPad|iPod/.test(ua)) return { name: 'iOS' };
    if (/Android/.test(ua)) return { name: 'Android' };
    if (/CrOS/.test(ua)) return { name: 'ChromeOS' };
    if (/Linux/.test(ua)) return { name: 'Linux' };
    return { name: 'Unknown' };
  } catch {
    return { name: 'Unknown' };
  }
}
function buildDeviceLabel(b: BrowserInfo, os: OSInfo) {
  const osPart = os.name === 'Unknown' ? 'Unknown OS' : os.name;
  const ver = s(b.version);
  const major = ver ? ver.split('.')[0] : '';
  const brPart = b.name === 'Unknown' ? 'Unknown Browser' : `${b.name}${major ? ' ' + major : ''}`;
  return `${osPart} · ${brPart}`;
}
function deviceId(): string {
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
function approxLocation(): string {
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

/* ========================= Seed ========================= */
const seedLoginHistory: LoginRow[] = [
  { device: 'macOS · Safari 17', location: '서울, 대한민국', ip: '192.168.0.15', date: '2025-10-10 09:42', action: 'login', provider: 'local' },
  { device: 'iOS · Safari 17',   location: '서울, 대한민국', ip: '192.168.0.17', date: '2025-10-08 21:31', action: 'login', provider: 'local' },
];
const seedTrusted: TrustedDevice[] = [
  { id: 'dev-01', name: 'MacBook Pro (민시우)', lastUsed: '2025-10-10 09:42' },
  { id: 'dev-02', name: 'iPhone 15',          lastUsed: '2025-10-08 21:31' },
];

/* ========================= Component ========================= */
export default function SecurityPage() {
  const router = useRouter();

  // sessionStorage 로딩
  const [loginHistory, setLoginHistory] = useState<LoginRow[]>(() => {
    if (typeof window === 'undefined') return seedLoginHistory;
    try {
      const raw = sessionStorage.getItem(S_LOGIN_HISTORY);
      if (raw) return JSON.parse(raw) as LoginRow[];
      sessionStorage.setItem(S_LOGIN_HISTORY, JSON.stringify(seedLoginHistory));
      return seedLoginHistory;
    } catch {
      return seedLoginHistory;
    }
  });

  const [trustedDevices, setTrustedDevices] = useState<TrustedDevice[]>(() => {
    if (typeof window === 'undefined') return seedTrusted;
    try {
      const raw = sessionStorage.getItem(S_TRUSTED_DEVICES);
      if (raw) return JSON.parse(raw) as TrustedDevice[];
      sessionStorage.setItem(S_TRUSTED_DEVICES, JSON.stringify(seedTrusted));
      return seedTrusted;
    } catch {
      return seedTrusted;
    }
  });

  const [is2FAEnabled, setIs2FAEnabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    try {
      const raw = sessionStorage.getItem(S_2FA);
      return raw ? raw === 'true' : true;
    } catch {
      return true;
    }
  });

  const [ssoConnected, setSsoConnected] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      const raw = sessionStorage.getItem(S_SSO_CONNECTED);
      return raw ? raw === 'true' : false;
    } catch {
      return false;
    }
  });

  // persist
  useEffect(() => {
    try {
      sessionStorage.setItem(S_LOGIN_HISTORY, JSON.stringify(loginHistory));
    } catch (e) {
      // 세션 저장 실패: 용량 초과, 프라이버시 모드 등
      console.error('[persist] failed to save loginHistory to sessionStorage:', e);
    }
  }, [loginHistory]);

  useEffect(() => {
    try {
      sessionStorage.setItem(S_TRUSTED_DEVICES, JSON.stringify(trustedDevices));
    } catch (e) {
      console.error('[persist] failed to save trustedDevices to sessionStorage:', e);
    }
  }, [trustedDevices]);

  useEffect(() => {
    try {
      sessionStorage.setItem(S_2FA, String(is2FAEnabled));
    } catch (e) {
      console.error('[persist] failed to save is2FAEnabled to sessionStorage:', e);
    }
  }, [is2FAEnabled]);

  useEffect(() => {
    try {
      sessionStorage.setItem(S_SSO_CONNECTED, String(ssoConnected));
    } catch (e) {
      console.error('[persist] failed to save ssoConnected to sessionStorage:', e);
    }
  }, [ssoConnected]);

  // 현재 디바이스 라벨
  const curDevice = useMemo(() => {
    const b = detectBrowser();
    const os = detectOS();
    return { id: deviceId(), label: buildDeviceLabel(b, os) };
  }, []);

  /* ========================= 공통 Confirm + 글로벌 로그아웃 ========================= */
  const confirmLogout = (message = '정말로 로그아웃 하시겠습니까?') => {
    try {
      return window.confirm(message);
    } catch {
      return true; // confirm 사용 불가한 환경이면 강행
    }
  };

  const doGlobalLogout = (sourceLabel: string, providerHint?: 'sso'|'local'|'unknown') => {
    try {
      // 1) 이력 추가
      const row: LoginRow = {
        device: `${curDevice.label} (${sourceLabel})`,
        location: approxLocation(),
        ip: 'N/A',
        date: nowStamp(),
        action: 'logout',
        provider: providerHint ?? (ssoConnected ? 'sso' : 'local'),
      };
      setLoginHistory(prev => [row, ...prev]);

      // 2) 신뢰 기기에서 현재 기기 제거
      setTrustedDevices(prev => prev.filter(d => d.id !== curDevice.id));

      // 3) SSO 연결 해제
      setSsoConnected(false);

      // 4) mock 사용자 제거 + 헤더 업데이트 + 메인 이동
      try {
        localStorage.removeItem('mockUser');
      } catch (e) {
        console.error('[logout] failed to remove mockUser from localStorage:', e);
      }

      try {
        window.dispatchEvent(new Event('auth-changed'));
      } catch (e) {
        console.error('[logout] failed to dispatch "auth-changed" event:', e);
      }
      router.replace('/'); // 메인
    } catch (e) {
      console.error('[doGlobalLogout] failed:', e);
      alert('로그아웃 처리 중 오류가 발생했습니다.');
    }
  };

  /* ========================= Handlers ========================= */

  // 2FA 토글
  const handleToggle2FA = () => {
    try {
      setIs2FAEnabled(prev => !prev);
      alert(!is2FAEnabled ? '2단계 인증이 활성화되었습니다.' : '2단계 인증이 비활성화되었습니다.');
    } catch (e) {
      console.error('[handleToggle2FA] failed:', e);
      alert('2단계 인증 상태 변경에 실패했습니다.');
    }
  };

  // 연결된 기기 → 로그아웃
  const handleRemoveDevice = (id: string) => {
    try {
      if (!confirmLogout()) return;

      // 기록(선행) + 목록 제거
      const row: LoginRow = {
        device: id === curDevice.id ? `${curDevice.label} (기기 로그아웃)` : `ID:${id} (기기 로그아웃)`,
        location: approxLocation(),
        ip: 'N/A',
        date: nowStamp(),
        action: 'logout',
        provider: ssoConnected ? 'sso' : 'unknown',
      };
      setLoginHistory(prev => [row, ...prev]);
      setTrustedDevices(prev => prev.filter(d => d.id !== id));

      // 요구사항: 여기서도 **항상** 글로벌 로그아웃 + 메인 이동
      doGlobalLogout('연결된 기기에서 로그아웃', row.provider);
    } catch (e) {
      console.error('[handleRemoveDevice] failed:', e);
      alert('기기 로그아웃 중 오류가 발생했습니다.');
    }
  };

  // SSO 로그인 (데모)
  const handleSsoLogin = () => {
    try {
      setSsoConnected(true);
      const row: LoginRow = {
        device: curDevice.label,
        location: approxLocation(),
        ip: 'N/A',
        date: nowStamp(),
        action: 'login',
        provider: 'sso',
      };
      setLoginHistory(prev => [row, ...prev]);
      setTrustedDevices(prev => {
        const exists = prev.some(d => d.id === curDevice.id);
        if (exists) {
          return prev.map<TrustedDevice>(d => d.id === curDevice.id ? { id: d.id, name: curDevice.label, lastUsed: row.date } : d);
        }
        return [{ id: curDevice.id, name: curDevice.label, lastUsed: row.date }, ...prev];
      });
    } catch (e) {
      console.error('[handleSsoLogin] failed:', e);
      alert('SSO 로그인 처리에 실패했습니다.');
    }
  };

  // SSO 로그아웃
  const handleSsoLogout = () => {
    try {
      if (!confirmLogout()) return;
      // 기록은 doGlobalLogout에서 처리하지만, 버튼 출처를 남기고 싶으면 사전 row 추가도 가능
      doGlobalLogout('SSO 로그아웃', 'sso');
    } catch (e) {
      console.error('[handleSsoLogout] failed:', e);
      alert('SSO 로그아웃 처리에 실패했습니다.');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-8 space-y-10">
      {/* 헤더 */}
      <div className="pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">보안 설정</h1>
        <p className="text-sm text-gray-600 mt-1">계정의 안전을 위해 비밀번호, 2단계 인증, 로그인 기기 등을 관리하세요.</p>
      </div>

      {/* 🔑 비밀번호 변경 */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">비밀번호 변경</h2>
        <p className="text-sm text-gray-600 mb-6">정기적으로 비밀번호를 변경하면 계정 보안을 강화할 수 있습니다.</p>
        <div className="max-w-md space-y-4">
          <input type="password" placeholder="현재 비밀번호" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          <input type="password" placeholder="새 비밀번호" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          <input type="password" placeholder="새 비밀번호 확인" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">변경하기</button>
        </div>
      </div>

      {/* 🔐 2단계 인증 */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">2단계 인증 (2FA)</h2>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium text-gray-900">2단계 인증 활성화</p>
            <p className="text-sm text-gray-500">로그인 시 비밀번호 외에도 인증 코드를 요구하여 보안을 강화합니다.</p>
          </div>
          <button
            onClick={handleToggle2FA}
            type="button"
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${is2FAEnabled ? 'bg-blue-600' : 'bg-gray-300'}`}
          >
            <span className={`inline-block h-4 w-4 transform bg-white rounded-full transition-transform ${is2FAEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>

      {/* 💻 최근 로그인 이력 */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">최근 로그인 이력</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-100 rounded-lg overflow-hidden">
            <thead className="bg-gray-50 text-sm text-gray-600">
              <tr>
                <th className="px-4 py-2 text-left">기기</th>
                <th className="px-4 py-2 text-left">위치</th>
                <th className="px-4 py-2 text-left">IP</th>
                <th className="px-4 py-2 text-left">시간</th>
                <th className="px-4 py-2 text-left">행위</th>
                <th className="px-4 py-2 text-left">방식</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {loginHistory.length === 0 ? (
                <tr><td className="px-4 py-6 text-gray-500" colSpan={6}>로그인 이력이 없습니다.</td></tr>
              ) : (
                loginHistory.map((log, idx) => (
                  <tr key={`${log.device}-${log.date}-${idx}`} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-2">{log.device}</td>
                    <td className="px-4 py-2">{log.location}</td>
                    <td className="px-4 py-2">{log.ip}</td>
                    <td className="px-4 py-2">{log.date}</td>
                    <td className="px-4 py-2">{log.action === 'login' ? '로그인' : log.action === 'logout' ? '로그아웃' : '기타'}</td>
                    <td className="px-4 py-2">{log.provider === 'sso' ? 'SSO' : log.provider === 'local' ? '로컬' : '알 수 없음'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🧩 연결된 기기 관리 */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">연결된 기기</h2>
        <p className="text-sm text-gray-600 mb-6">로그인 상태가 유지된 신뢰할 수 있는 기기 목록입니다.</p>
        <div className="space-y-4">
          {trustedDevices.length === 0 ? (
            <p className="text-gray-500 text-sm">등록된 기기가 없습니다.</p>
          ) : (
            trustedDevices.map(device => (
              <div key={device.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                <div>
                  <p className="font-medium text-gray-900">{device.name}</p>
                  <p className="text-sm text-gray-500">{device.lastUsed}</p>
                </div>
                <button
                  onClick={() => handleRemoveDevice(device.id)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  로그아웃
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 🏢 SSO 설정 */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-3 pb-3 border-b border-gray-200">SSO 설정</h2>
        <p className="text-sm text-gray-600 mb-6">조직용 계정(Single Sign-On)을 통해 로그인할 수 있습니다.</p>
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
              <i className="ri-building-4-fill text-purple-600 text-xl"></i>
            </div>
            <div>
              <p className="font-medium text-gray-900">SSO (Okta)</p>
              <p className="text-sm text-gray-500">
                <span className="inline-flex items-center">
                  <i className={`ri-checkbox-circle-fill mr-1 ${ssoConnected ? 'text-green-500' : 'text-gray-300'}`}></i>
                  {ssoConnected ? '연동됨' : '연동 안됨'}
                </span>
              </p>
            </div>
          </div>

          {ssoConnected ? (
            <button
              type="button"
              onClick={handleSsoLogout}
              className="px-4 py-2 rounded-lg text-sm font-medium border border-red-500 text-red-600 hover:bg-red-50"
              title="SSO 로그아웃(기록 + 글로벌 로그아웃)"
            >
              SSO 로그아웃
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSsoLogin}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
              title="SSO 로그인(기록 추가)"
            >
              SSO 로그인
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
