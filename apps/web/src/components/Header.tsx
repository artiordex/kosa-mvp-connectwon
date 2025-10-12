/**
 * Description : Header.tsx - 📌 헤더 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-10-11
 */

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('한국어');
  const [user, setUser] = useState<any>(null);
  const [isTranslateLoaded, setIsTranslateLoaded] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  const router = useRouter();

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

  // 쿠키에서 언어 읽기
  const getCookieLang = () => {
    const match = document.cookie.match(/googtrans=\/ko\/([a-zA-Z-]+)/);
    return match ? match[1] : 'ko';
  };

  // 쿠키에 언어 저장 (세션 스토리지에도 캐싱)
  const setCookieLang = (lang: string) => {
    document.cookie = `googtrans=/ko/${lang};path=/;max-age=31536000`; // 1년
    sessionStorage.setItem('preferredLang', lang);
  };

  // 언어 적용 (더 빠른 방식)
  const applyLanguage = (langCode: string) => {
    setIsTranslating(true);
    setCookieLang(langCode);

    // 즉시 쿠키 설정 후 리로드 (가장 빠른 방법)
    if (langCode === 'ko') {
      // 한국어로 되돌리기
      document.cookie = 'googtrans=; path=/; max-age=0';
      sessionStorage.removeItem('preferredLang');
      window.location.reload();
    } else {
      // 다른 언어로 변경
      window.location.reload();
    }
  };

  // ✅ Google Translate 초기화
  useEffect(() => {
    const initGoogleTranslate = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'ko',
            includedLanguages: 'ko,en,ja,vi',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          'google_translate_element'
        );

        // 저장된 언어 자동 적용
        const savedLang = sessionStorage.getItem('preferredLang') || getCookieLang();
        if (savedLang && savedLang !== 'ko') {
          const langName = languages.find(l => l.code === savedLang)?.name || '한국어';
          setCurrentLanguage(langName);
        }

        setTimeout(() => setIsTranslateLoaded(true), 500);
      }
    };

    if (typeof window !== 'undefined') {
      window.googleTranslateElementInit = initGoogleTranslate;
    }

    if (window.google && window.google.translate) {
      initGoogleTranslate();
    }
  }, []);

  // ✅ 스크롤 상태
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ 로그인 감시
  useEffect(() => {
    const checkUser = () => {
      const stored = localStorage.getItem('mockUser');
      setUser(stored ? JSON.parse(stored) : null);
    };
    const timer = setTimeout(checkUser, 300);
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'mockUser') checkUser();
    };
    window.addEventListener('storage', handleStorage);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('mockUser');
    setUser(null);
    alert('로그아웃되었습니다.');
    router.replace('/login');
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
      {/* ✅ Google 번역 스크립트 */}
      <Script
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="lazyOnload"
      />

      {/* 숨겨진 번역 영역 */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>

      {/* 번역 중 스피너 (오른쪽 상단) */}
      {isTranslating && (
        <div className="fixed top-24 right-8 z-50 bg-white rounded-lg shadow-lg p-4 flex items-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="text-sm font-medium text-gray-700">번역 중...</span>
        </div>
      )}

      {/* 헤더 */}
      <header
        className={`fixed top-0 w-full shadow-sm z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md' : 'bg-white'
        }`}
      >
        <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* 로고 */}
            <Link href="/" className="flex items-center">
              <img
                src="/images/header_logo.png"
                alt="커넥트원 로고"
                className="h-16 w-auto object-contain"
              />
            </Link>

            {/* 네비게이션 */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
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
                  <i
                    className={`ri-arrow-down-s-line w-4 h-4 transition-transform duration-200 ${
                      isLanguageOpen ? 'rotate-180' : ''
                    }`}
                  ></i>
                </button>

                {isLanguageOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-50">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => changeLanguage(language.code, language.name)}
                        className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 ${
                          currentLanguage === language.name
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-700'
                        }`}
                      >
                        <span className="text-lg">{language.flag}</span>
                        <span className="text-sm font-medium">{language.name}</span>
                        {currentLanguage === language.name && (
                          <i className="ri-check-line ml-auto text-blue-600"></i>
                        )}
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
                    <Link
                      href="/mypage"
                      className="px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    >
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
                    <Link
                      href="/login"
                      className="text-gray-700 hover:text-blue-600 text-base font-medium"
                    >
                      로그인
                    </Link>
                    <Link
                      href="/signup"
                      className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 text-base font-medium"
                    >
                      회원가입
                    </Link>
                  </>
                )}
              </div>

              {/* 모바일 메뉴 버튼 */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 cursor-pointer relative z-60"
              >
                <i
                  className={`${
                    isMenuOpen ? 'ri-close-line' : 'ri-menu-line'
                  } w-10 h-10 text-2xl transition-all duration-300`}
                ></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 언어 백드롭 */}
      {isLanguageOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setIsLanguageOpen(false)}
        ></div>
      )}

      {/* 모바일 풀스크린 네비게이션 */}
      <div
        className={`fixed inset-0 bg-white z-40 transition-all duration-500 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
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
                          onClick={() => changeLanguage(language.code, language.name)}
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

      {/* ✅ Google 번역 UI 완전 숨기기 + 스피너 위치 조정 */}
      <style jsx global>{`
        /* Google Translate 배너/버튼 숨기기 */
        .goog-te-banner-frame,
        .goog-te-balloon-frame,
        .goog-te-ftab,
        .goog-te-menu-value span:first-child {
          display: none !important;
        }

        body {
          top: 0 !important;
          position: static !important;
        }

        .skiptranslate {
          display: none !important;
        }

        /* Google 스피너를 오른쪽으로 이동 */
        .goog-te-spinner-pos {
          position: fixed !important;
          top: 100px !important;
          right: 30px !important;
          left: auto !important;
          z-index: 9999 !important;
        }

        /* 번역 중 표시 스타일 개선 */
        .goog-te-spinner {
          background: white !important;
          padding: 12px 20px !important;
          border-radius: 8px !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
        }

        /* 페이지 상단 여백 제거 */
        body.translated-ltr {
          top: 0 !important;
        }
      `}</style>
    </>
  );
}
