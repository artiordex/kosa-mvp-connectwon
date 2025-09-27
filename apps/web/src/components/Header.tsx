'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('한국어');

  const languages = [
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLanguageSelect = (language: any) => {
    setCurrentLanguage(language.name);
    setIsLanguageOpen(false);
  };

  return (
    <>
      <header className={`fixed top-0 w-full shadow-sm z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md' : 'bg-white'}`}>
        <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <img
                  src="/images/header_logo.png"
                  alt="커넥트원 로고"
                  className="h-16 w-auto object-contain"
                />
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/social-value" className="text-gray-700 hover:text-orange-600 transition-colors">
                사회적가치
              </Link>
              <Link href="/programs" className="text-gray-700 hover:text-orange-600 transition-colors">
                프로그램
              </Link>
              <Link href="/venues" className="text-gray-700 hover:text-orange-600 transition-colors">
                공간 및 디바이스
              </Link>
              <Link href="/insights" className="text-gray-700 hover:text-orange-600 transition-colors">
                인사이트
              </Link>
              <Link href="/creator" className="text-gray-700 hover:text-orange-600 transition-colors">
                크리에이터
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-4">
                {/* 언어 선택 드롭다운 */}
                <div className="relative">
                  <button
                    onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                    className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer rounded-lg hover:bg-gray-50"
                  >
                    <i className="ri-global-line w-4 h-4 flex items-center justify-center"></i>
                    <span className="text-sm font-medium">{currentLanguage}</span>
                    <i
                      className={`ri-arrow-down-s-line w-4 h-4 flex items-center justify-center transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`}
                    ></i>
                  </button>

                  {isLanguageOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-50">
                      {languages.map(language => (
                        <button
                          key={language.code}
                          onClick={() => handleLanguageSelect(language)}
                          className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors cursor-pointer ${
                            currentLanguage === language.name ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                          }`}
                        >
                          <span className="text-lg">{language.flag}</span>
                          <span className="text-sm font-medium">{language.name}</span>
                          {currentLanguage === language.name && (
                            <i className="ri-check-line w-4 h-4 flex items-center justify-center ml-auto text-blue-600"></i>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <Link href="/login" className="text-gray-700 hover:text-blue-600 cursor-pointer text-xl font-medium">
                  로그인
                </Link>
                <Link
                  href="/signup"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap text-xl font-medium"
                >
                  회원가입
                </Link>
              </div>

              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 cursor-pointer relative z-60">
                <i
                  className={`${isMenuOpen ? 'ri-close-line' : 'ri-menu-line'} w-10 h-10 flex items-center justify-center text-2xl transition-all duration-300`}
                ></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 언어 드롭다운이 열렸을 때 배경 클릭으로 닫기 */}
      {isLanguageOpen && <div className="fixed inset-0 z-30" onClick={() => setIsLanguageOpen(false)}></div>}

      {/* 풀 네비게이션 오버레이 */}
      <div className={`fixed inset-0 bg-white z-40 transition-all duration-500 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="h-full flex flex-col">
          {/* 상단 여백 (헤더 높이만큼) */}
          <div className="h-20"></div>

          {/* 메인 네비게이션 */}
          <div className="flex-1 flex flex-col justify-center px-8 py-8">
            <nav className="max-w-4xl mx-auto w-full">
              <div className="grid md:grid-cols-2 gap-6">
                {/* 주요 메뉴 */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">메인 메뉴</h3>

                  <Link
                    href="/social-value"
                    onClick={closeMenu}
                    className="group block py-3 border-b border-gray-100 hover:border-blue-600 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">사회적가치</h4>
                        <p className="text-gray-600 mt-1 text-sm">우리의 사회적 책임과 가치</p>
                      </div>
                      <i className="ri-arrow-right-line text-xl text-gray-400 group-hover:text-blue-600 group-hover:translate-x-2 transition-all duration-300"></i>
                    </div>
                  </Link>

                  <Link
                    href="/programs"
                    onClick={closeMenu}
                    className="group block py-3 border-b border-gray-100 hover:border-blue-600 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                          공간 및 프로그램
                        </h4>
                        <p className="text-gray-600 mt-1 text-sm">다양한 공간과 교육 프로그램</p>
                      </div>
                      <i className="ri-arrow-right-line text-xl text-gray-400 group-hover:text-blue-600 group-hover:translate-x-2 transition-all duration-300"></i>
                    </div>
                  </Link>

                  <Link
                    href="/spaces"
                    onClick={closeMenu}
                    className="group block py-3 border-b border-gray-100 hover:border-blue-600 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                          공간 및 디바이스
                        </h4>
                        <p className="text-gray-600 mt-1 text-sm">최첨단 시설과 장비</p>
                      </div>
                      <i className="ri-arrow-right-line text-xl text-gray-400 group-hover:text-blue-600 group-hover:translate-x-2 transition-all duration-300"></i>
                    </div>
                  </Link>

                  <Link
                    href="/insights"
                    onClick={closeMenu}
                    className="group block py-3 border-b border-gray-100 hover:border-blue-600 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">인사이트</h4>
                        <p className="text-gray-600 mt-1 text-sm">트렌드와 인사이트</p>
                      </div>
                      <i className="ri-arrow-right-line text-xl text-gray-400 group-hover:text-blue-600 group-hover:translate-x-2 transition-all duration-300"></i>
                    </div>
                  </Link>

                  <Link
                    href="/family"
                    onClick={closeMenu}
                    className="group block py-3 border-b border-gray-100 hover:border-blue-600 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">크리에이터</h4>
                        <p className="text-gray-600 mt-1 text-sm">창업 코치와 전문가들</p>
                      </div>
                      <i className="ri-arrow-right-line text-xl text-gray-400 group-hover:text-blue-600 group-hover:translate-x-2 transition-all duration-300"></i>
                    </div>
                  </Link>
                </div>

                {/* 계정 메뉴 및 추가 정보 */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">계정</h3>

                  <div className="space-y-3">
                    {/* 모바일 언어 선택 */}
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <h4 className="text-base font-semibold text-gray-900 mb-3">언어 선택</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {languages.map(language => (
                          <button
                            key={language.code}
                            onClick={() => handleLanguageSelect(language)}
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

                    <Link
                      href="/login"
                      onClick={closeMenu}
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
                      onClick={closeMenu}
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
                  </div>

                  {/* 연락처 정보 */}
                  <div className="mt-8 p-4 bg-gray-50 rounded-xl">
                    <h4 className="text-base font-semibold text-gray-900 mb-3">문의하기</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <i className="ri-phone-line text-blue-600 text-sm"></i>
                        <span className="text-gray-700 text-sm">02-1234-5678</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <i className="ri-mail-line text-blue-600 text-sm"></i>
                        <span className="text-gray-700 text-sm">info@connectone.com</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <i className="ri-map-pin-line text-blue-600 text-sm"></i>
                        <span className="text-gray-700 text-sm">서울시 강남구 테헤란로</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
