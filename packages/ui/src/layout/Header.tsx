/**
 * Description : Header.tsx - 📌 ConnectWon UI 헤더 React 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-09-19
 */
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { CommonHeaderProps } from '../../ui-types.js';

export default function Header({
  logo,
  nav = [],
  activePath,
  showAuth = true,
  loginHref = '/login',
  signupHref = '/signup',
  authRight,
  languages,
  currentLanguage,
  onLanguageChange,
  className,
  sticky = true,
}: CommonHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // 바깥 클릭/ESC로 드롭다운/메뉴 닫기
  useEffect(() => {
    const onDown = (e: MouseEvent | PointerEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLanguageOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLanguageOpen(false);
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  const containerCls = [sticky ? 'sticky top-0 z-50' : '', 'bg-white shadow-sm', className ?? '']
    .filter(Boolean)
    .join(' ');

  const currentLangName =
    languages?.find(l => l.code === currentLanguage)?.name ?? languages?.[0]?.name ?? '한국어';

  return (
    <header className={containerCls}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* 로고 */}
          <Link href="/" className="flex items-center" aria-label="홈으로 이동">
            {logo ?? <span className="font-bold text-xl">ConnectWon</span>}
          </Link>

          {/* 데스크톱 내비 */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="주요 메뉴">
            {nav.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  'text-gray-700 hover:text-blue-600 cursor-pointer text-xl font-medium',
                  activePath === item.href ? 'text-blue-600' : '',
                ].join(' ')}
                aria-current={activePath === item.href ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* 우측 영역 */}
          <div className="flex items-center space-x-4">
            {/* 데스크톱: 로그인/회원가입/언어/커스텀 */}
            <div className="hidden md:flex items-center space-x-4">
              {showAuth && (
                <>
                  <Link
                    href={loginHref}
                    className="text-gray-700 hover:text-blue-600 cursor-pointer text-xl font-medium"
                  >
                    로그인
                  </Link>
                  <Link
                    href={signupHref}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap text-xl font-medium"
                  >
                    회원가입
                  </Link>
                </>
              )}

              {authRight /* 우측 커스텀 슬롯(알림/아바타 등) */}

              {/* 언어 선택 (languages 제공시에만 노출) */}
              {languages && languages.length > 0 && (
                <div className="relative" ref={langRef}>
                  <button
                    type="button"
                    onClick={() => setIsLanguageOpen(v => !v)}
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer px-3 py-2 rounded-lg border border-gray-200"
                    aria-haspopup="menu"
                    aria-expanded={isLanguageOpen}
                    aria-controls="lang-menu"
                  >
                    <i
                      aria-hidden="true"
                      className="ri-global-line w-5 h-5 flex items-center justify-center"
                    />
                    <span className="text-sm font-medium">{currentLangName}</span>
                    <i
                      aria-hidden="true"
                      className="ri-arrow-down-s-line w-4 h-4 flex items-center justify-center"
                    />
                  </button>

                  {isLanguageOpen && (
                    <div
                      id="lang-menu"
                      role="menu"
                      className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border py-2 z-50"
                    >
                      {languages.map(l => (
                        <button
                          key={l.code}
                          type="button"
                          onClick={() => onLanguageChange?.(l.code)}
                          role="menuitemradio"
                          aria-checked={currentLanguage === l.code}
                          className={[
                            'block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer',
                            currentLanguage === l.code
                              ? 'text-blue-600 bg-blue-50'
                              : 'text-gray-700',
                          ].join(' ')}
                        >
                          {l.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 모바일 햄버거 */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(v => !v)}
              className="text-gray-700 cursor-pointer md:hidden"
              aria-label="모바일 메뉴 열기"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <i
                aria-hidden="true"
                className="ri-menu-line w-10 h-10 flex items-center justify-center text-2xl"
              />
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {isMenuOpen && (
        <nav
          id="mobile-menu"
          className="bg-white border-t shadow-lg md:hidden"
          aria-label="모바일 메뉴"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {nav.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  'block px-3 py-2 text-gray-700 hover:text-blue-600 cursor-pointer text-xl font-medium',
                  activePath === item.href ? 'text-blue-600' : '',
                ].join(' ')}
                aria-current={activePath === item.href ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}

            {showAuth && (
              <>
                <hr className="my-2" />
                <Link
                  href={loginHref}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 cursor-pointer text-xl font-medium"
                >
                  로그인
                </Link>
                <Link
                  href={signupHref}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 cursor-pointer text-xl font-medium"
                >
                  회원가입
                </Link>
              </>
            )}

            {languages && languages.length > 0 && (
              <>
                <hr className="my-2" />
                <div className="px-3 py-2">
                  <div className="text-sm font-medium text-gray-700 mb-2">언어 선택</div>
                  {languages.map(l => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => onLanguageChange?.(l.code)}
                      className={[
                        'block w-full text-left px-2 py-1 text-sm rounded cursor-pointer',
                        currentLanguage === l.code
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-600 hover:bg-gray-50',
                      ].join(' ')}
                    >
                      {l.name}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
