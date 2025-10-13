/**
 * Description : Header.tsx - 📌 헤더 컴포넌트 (mock 즉시 반영 + 보안기록 로그아웃 연동, 모바일 네비 포함)
 * Author : Shiwoo Min
 * Date : 2025-10-11 (patched)
 */

'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useState } from 'react';

/* Security session keys (SecurityPage와 동일) */
const S_LOGIN_HISTORY   = 'security:loginHistory';
const S_TRUSTED_DEVICES = 'security:trustedDevices';
const S_SSO_CONNECTED   = 'security:ssoConnected';

/* Helpers */
const s = (v?: string) => v ?? '';
const pad2 = (n: number) => (n < 10 ? `0${n}` : `${n}`);
const nowStamp = (d: Date = new Date()) =>
  `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())} ${pad2(d.getHours())}:${pad2(d.getMinutes())}`;

type Persona = '1' | '2' | 'none';

const readMockUser = () => {
  try {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem('mockUser');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const resolvePersona = (u: any): Persona => {
  if (!u) return 'none';

  const email = String(u?.email ?? '').trim().toLowerCase();
  const name = String(u?.name ?? '').trim();

  // 이메일 우선 판별
  if (email === 'creator@connectwon.com') return '1';
  if (email === 'test@gmail.com') return '2';

  // 이름으로 판별 (fallback)
  if (name === '민시우') return '1';
  if (name === '소나무') return '2';

  console.warn('Unknown user:', { email, name });
  return 'none';
};

/** user 상태 갱신 + sessionStorage.viewProfile 세팅 + user-switched 이벤트 발행을 한방에 */
const applyAuthSnapshot = (setUser: (u: any) => void) => {
  const u = readMockUser();
  const persona = resolvePersona(u);
  setUser(u);
  try { sessionStorage.setItem('viewProfile', persona); } catch {}
  try { window.dispatchEvent(new Event('user-switched')); } catch {}
};

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

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('한국어');
  const [user, setUser] = useState<any>(null);
  const [isTranslateLoaded, setIsTranslateLoaded] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { href: '/social-value', label: '사회적가치', desc: '우리의 사회적 책임과 가치' },
    { href: '/programs', label: '프로그램', desc: '다양한 공간과 교육 프로그램' },
    { href: '/facilities', label: '공간 및 디바이스', desc: '최첨단 시설과 장비' },
    { href: '/insights', label: '인사이트', desc: '트렌드와 인사이트' },
    { href: '/creator', label: '크리에이터', desc: '창업 코치와 전문가들' },
  ];

  const languages = [
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  ];

  /* ---- 공통 스냅샷 갱신기 (applyAuthSnapshot 사용) ---- */
  const refreshAuth = () => applyAuthSnapshot(setUser);

  // 번역 쿠키
  const getCookieLang = () => {
    const match = typeof document !== 'undefined'
      ? document.cookie.match(/googtrans=\/ko\/([a-zA-Z-]+)/)
      : null;
    return match ? match[1] : 'ko';
  };
  const setCookieLang = (lang: string) => {
    document.cookie = `googtrans=/ko/${lang};path=/;max-age=31536000`;
    sessionStorage.setItem('preferredLang', lang);
  };
  const applyLanguage = (langCode: string) => {
    setIsTranslating(true);
    setCookieLang(langCode);
    if (langCode === 'ko') {
      document.cookie = 'googtrans=; path=/; max-age=0';
      sessionStorage.removeItem('preferredLang');
      window.location.reload();
    } else {
      window.location.reload();
    }
  };

  // Google Translate 초기화
  useEffect(() => {
    const initGoogleTranslate = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          { pageLanguage: 'ko', includedLanguages: 'ko,en,ja,vi', layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE, autoDisplay: false },
          'google_translate_element'
        );
        const savedLang = sessionStorage.getItem('preferredLang') || getCookieLang();
        if (savedLang && savedLang !== 'ko') {
          const langName = languages.find(l => l.code === savedLang)?.name || '한국어';
          setCurrentLanguage(langName);
        }
        setTimeout(() => setIsTranslateLoaded(true), 500);
      }
    };
    if (typeof window !== 'undefined') (window as any).googleTranslateElementInit = initGoogleTranslate;
    if (window.google && window.google.translate) initGoogleTranslate();
  }, []);

  // 스크롤 상태
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 로그인 상태 동기화 (모두 refreshAuth로 통일)
  useEffect(() => {
    refreshAuth();
    const onAuthChanged = () => refreshAuth();
    const onStorage = (e: StorageEvent) => { if (e.key === 'mockUser') refreshAuth(); };
    const onVisibility = () => { if (!document.hidden) refreshAuth(); };

    window.addEventListener('auth-changed', onAuthChanged);
    window.addEventListener('storage', onStorage);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('auth-changed', onAuthChanged);
      window.removeEventListener('storage', onStorage);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);
  useEffect(() => { refreshAuth(); }, [pathname]);

  /* ========= 핵심: 헤더 로그아웃 시 보안 기록 남기기 ========= */
  const handleLogout = () => {
    try {
      // 1) 로그인 이력에 로그아웃 추가
      const label = buildDeviceLabel();
      const history = JSON.parse(sessionStorage.getItem(S_LOGIN_HISTORY) || '[]') as any[];
      const mock = readMockUser();
      const provider: 'sso' | 'local' =
        mock && (mock as any).provider && (mock as any).provider !== 'local' ? 'sso' : 'local';

      const row = {
        device: `${label} (헤더 로그아웃)`,
        location: approxLocation(),
        ip: 'N/A',
        date: nowStamp(),
        action: 'logout' as const,
        provider,
      };
      sessionStorage.setItem(S_LOGIN_HISTORY, JSON.stringify([row, ...history]));

      // 2) 신뢰 기기에서 현재 기기 제거
      const id = deviceId();
      const devs = JSON.parse(sessionStorage.getItem(S_TRUSTED_DEVICES) || '[]') as any[];
      const next = devs.filter((d: any) => d.id !== id);
      sessionStorage.setItem(S_TRUSTED_DEVICES, JSON.stringify(next));

      // 3) SSO 연결 상태 끔
      sessionStorage.setItem(S_SSO_CONNECTED, 'false');
    } catch (e) {
      console.error('[Header] logout logging failed:', e);
      // 기록 실패해도 실제 로그아웃은 계속 진행
    }

    try {
      // 4) mock 사용자 세션 제거 + 공통 스냅샷 반영
      localStorage.removeItem('mockUser');
      refreshAuth(); // => user=null, viewProfile='none', user-switched 이벤트 발행
      window.dispatchEvent(new Event('auth-changed')); // 다른 리스너 호환

      setIsMenuOpen(false);
      alert('로그아웃되었습니다.');
      router.replace('/login');
    } catch (e) {
      console.error('[Header] local logout failed:', e);
      alert('로그아웃 처리 중 오류가 발생했습니다.');
    }
  };

  const changeLanguage = (langCode: string, langName: string) => {
    setCurrentLanguage(langName);
    setIsLanguageOpen(false);
    if (!isTranslateLoaded) {
      alert('번역 기능을 로딩 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }
    applyLanguage(langCode);
  };

  return (
    <>
      {/* Google 번역 스크립트 */}
      <Script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" strategy="lazyOnload" />
      {/* 숨겨진 번역 영역 */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>

      {/* 번역 중 스피너 */}
      {isTranslating && (
        <div className="fixed top-24 right-8 z-50 bg-white rounded-lg shadow-lg p-4 flex items-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="text-sm font-medium text-gray-700">번역 중...</span>
        </div>
      )}

      {/* 헤더 */}
      <header className={`fixed top-0 w-full shadow-sm z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md' : 'bg-white'}`}>
        <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* 로고 */}
            <Link href="/" className="flex items-center">
              <img src="/images/header_logo.png" alt="커넥트원 로고" className="h-16 w-auto object-contain" />
            </Link>

            {/* 네비게이션 */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="text-gray-700 hover:text-orange-600 transition-colors">
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* 우측 메뉴 */}
            <div className="flex items-center space-x-4">
              {/* 언어 변경 */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-50"
                >
                  <i className="ri-global-line w-4 h-4"></i>
                  <span className="text-sm font-medium">{currentLanguage}</span>
                  <i className={`ri-arrow-down-s-line w-4 h-4 transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`}></i>
                </button>

                {isLanguageOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-50">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => changeLanguage(language.code, language.name)}
                        className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 ${
                          currentLanguage === language.name ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                        }`}
                      >
                        <span className="text-lg">{language.flag}</span>
                        <span className="text-sm font-medium">{language.name}</span>
                        {currentLanguage === language.name && <i className="ri-check-line ml-auto text-blue-600"></i>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 로그인 상태 */}
              <div className="hidden md:flex items-center space-x-4">
                {user ? (
                  <>
                    <span className="font-semibold text-gray-900">{user.name} 님</span>
                    <Link href="/mypage" className="px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                      마이페이지
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-md hover:text-blue-600 hover:border-blue-400 transition-all"
                    >
                      로그아웃
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="text-gray-700 hover:text-blue-600 text-base font-medium">
                      로그인
                    </Link>
                    <Link href="/signup" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 text-base font-medium">
                      회원가입
                    </Link>
                  </>
                )}
              </div>

              {/* 모바일 메뉴 버튼 */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 cursor-pointer relative z-60"
                aria-label="모바일 메뉴"
              >
                <i className={`${isMenuOpen ? 'ri-close-line' : 'ri-menu-line'} w-10 h-10 text-2xl transition-all duration-300`}></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 언어 백드롭 */}
      {isLanguageOpen && <div className="fixed inset-0 z-30" onClick={() => setIsLanguageOpen(false)}></div>}

      {/* 모바일 풀스크린 네비게이션 */}
      <div className={`fixed inset-0 bg-white z-40 transition-all duration-500 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="h-full flex flex-col">
          <div className="h-20" />
          <div className="flex-1 flex flex-col justify-center px-8 py-8 overflow-y-auto">
            <nav className="max-w-4xl mx-auto w-full">
              <div className="grid md:grid-cols-2 gap-6">
                {/* 메인 메뉴 */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
                    메인 메뉴
                  </h3>
                  {navItems.map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="group block py-3 border-b border-gray-100 hover:border-blue-600 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                            {item.label}
                          </h4>
                          {item.desc && (
                            <p className="text-gray-600 mt-1 text-sm">{item.desc}</p>
                          )}
                        </div>
                        <i className="ri-arrow-right-line text-xl text-gray-400 group-hover:text-blue-600 group-hover:translate-x-2 transition-all duration-300"></i>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* 계정 및 언어 + 문의 */}
                <div className="space-y-6">
                  {/* 계정 */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                      계정
                    </h3>
                    {user ? (
                      <div className="p-4 bg-gray-50 rounded-xl space-y-3">
                        <p className="text-gray-900 font-semibold">{user.name} 님</p>

                        <Link
                          href="/mypage"
                          onClick={() => setIsMenuOpen(false)}
                          className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                          마이페이지
                        </Link>

                        <button
                          onClick={() => {
                            handleLogout();
                            setIsMenuOpen(false);
                          }}
                          className="block w-full text-center border border-gray-300 text-gray-700 py-2 rounded-lg hover:text-blue-600 hover:border-blue-400 transition-colors text-sm font-medium"
                        >
                          로그아웃
                        </button>
                      </div>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          onClick={() => setIsMenuOpen(false)}
                          className="group flex items-center space-x-4 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                        >
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                            <i className="ri-login-circle-line text-blue-600 text-lg"></i>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">로그인</h4>
                            <p className="text-gray-600 text-sm">계정으로 로그인하기</p>
                          </div>
                        </Link>

                        <Link
                          href="/signup"
                          onClick={() => setIsMenuOpen(false)}
                          className="group flex items-center space-x-4 py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors duration-300"
                        >
                          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-700 transition-colors duration-300">
                            <i className="ri-user-add-line text-white text-lg"></i>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">회원가입</h4>
                            <p className="text-gray-600 text-sm">새 계정 만들기</p>
                          </div>
                        </Link>
                      </>
                    )}
                  </div>

                  {/* 언어 선택 */}
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="text-base font-semibold text-gray-900 mb-3">언어 선택</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {languages.map(language => (
                        <button
                          key={language.code}
                          onClick={() => {
                            changeLanguage(language.code, language.name);
                            setIsMenuOpen(false);
                          }}
                          className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                            currentLanguage === language.name
                              ? 'bg-blue-100 text-blue-600 border border-blue-200'
                              : 'bg-white text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <span>{language.flag}</span>
                          <span className="text-sm font-medium">{language.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 문의하기 섹션 */}
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="text-base font-semibold text-gray-900 mb-3">문의하기</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <i className="ri-phone-line text-blue-600 text-sm"></i>
                        <span className="text-gray-700 text-sm">00-0000-0000</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <i className="ri-mail-line text-blue-600 text-sm"></i>
                        <span className="text-gray-700 text-sm">info@connectwon.com</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <i className="ri-map-pin-line text-blue-600 text-sm"></i>
                        <span className="text-gray-700 text-sm">경기도 광명시</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Google 번역 UI 완전 숨기기 + 스피너 위치 조정 */}
      <style jsx global>{`
        .goog-te-banner-frame,
        .goog-te-balloon-frame,
        .goog-te-ftab,
        .goog-te-menu-value span:first-child { display: none !important; }
        body { top: 0 !important; position: static !important; }
        .skiptranslate { display: none !important; }
        .goog-te-spinner-pos { position: fixed !important; top: 100px !important; right: 30px !important; left: auto !important; z-index: 9999 !important; }
        .goog-te-spinner { background: white !important; padding: 12px 20px !important; border-radius: 8px !important; box-shadow: 0 4px 6px -1px rgba(0,0,0,.1) !important; }
        body.translated-ltr { top: 0 !important; }
      `}</style>
    </>
  );
}
