/**
 * Description : Header.tsx - 📌 ConnectWon UI 헤더 컴포넌트 (Next.js 비의존형)
 * Author : Shiwoo Min
 * Date : 2025-10-07
 */
import { forwardRef, useEffect, useRef, useState } from 'react';
import type { CommonHeaderProps, PageHeaderProps } from '../ui-types.js';

interface HeaderLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  ariaCurrent?: 'page' | undefined; // ✅ 타입 좁힘 (문자열 전체 X)
  external?: boolean;
}

// ✅ 기본 <a> 링크 — Next.js 없이도 작동
const DefaultLink = ({ href, children, className, ariaLabel, ariaCurrent, external }: HeaderLinkProps) =>
  external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} aria-current={ariaCurrent} className={className}>
      {children}
    </a>
  ) : (
    <a href={href} aria-label={ariaLabel} aria-current={ariaCurrent} className={className}>
      {children}
    </a>
  );

export interface CommonHeaderWithLinkProps extends CommonHeaderProps {
  LinkComponent?: React.ElementType;
}

// 공통 헤더 (사이트 네비게이션)
const Header = ({
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
  LinkComponent = DefaultLink, // ✅ 외부에서 NextLink 주입 가능
}: CommonHeaderWithLinkProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

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

  const containerCls = [sticky ? 'sticky top-0 z-50' : '', 'bg-white shadow-sm', className ?? ''].filter(Boolean).join(' ');

  const currentLangName = languages?.find(l => l.code === currentLanguage)?.name ?? languages?.[0]?.name ?? '한국어';

  return (
    <header className={containerCls}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* 로고 */}
          <LinkComponent href="/" ariaLabel="홈으로 이동" className="flex items-center">
            {logo ?? <span className="font-bold text-xl">ConnectWon</span>}
          </LinkComponent>

          {/* 데스크톱 내비 */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="주요 메뉴">
            {nav.map(item => (
              <LinkComponent
                key={item.href}
                href={item.href}
                ariaCurrent={activePath === item.href ? ('page' as const) : undefined} // ✅ 타입 안전 처리
                className={[
                  'text-gray-700 hover:text-blue-600 cursor-pointer text-xl font-medium',
                  activePath === item.href ? 'text-blue-600' : '',
                ].join(' ')}
              >
                {item.label}
              </LinkComponent>
            ))}
          </nav>

          {/* 우측 영역 */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              {showAuth && (
                <>
                  <LinkComponent href={loginHref} className="text-gray-700 hover:text-blue-600 cursor-pointer text-xl font-medium">
                    로그인
                  </LinkComponent>
                  <LinkComponent
                    href={signupHref}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap text-xl font-medium"
                  >
                    회원가입
                  </LinkComponent>
                </>
              )}

              {authRight}

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
                    <i className="ri-global-line w-5 h-5 flex items-center justify-center" />
                    <span className="text-sm font-medium">{currentLangName}</span>
                    <i className="ri-arrow-down-s-line w-4 h-4 flex items-center justify-center" />
                  </button>

                  {isLanguageOpen && (
                    <div id="lang-menu" role="menu" className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border py-2 z-50">
                      {languages.map(l => (
                        <button
                          key={l.code}
                          type="button"
                          onClick={() => onLanguageChange?.(l.code)}
                          role="menuitemradio"
                          aria-checked={currentLanguage === l.code}
                          className={[
                            'block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer',
                            currentLanguage === l.code ? 'text-blue-600 bg-blue-50' : 'text-gray-700',
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
              <i className="ri-menu-line w-10 h-10 flex items-center justify-center text-2xl" />
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {isMenuOpen && (
        <nav id="mobile-menu" className="bg-white border-t shadow-lg md:hidden" aria-label="모바일 메뉴">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {nav.map(item => (
              <LinkComponent
                key={item.href}
                href={item.href}
                className={[
                  'block px-3 py-2 text-gray-700 hover:text-blue-600 cursor-pointer text-xl font-medium',
                  activePath === item.href ? 'text-blue-600' : '',
                ].join(' ')}
              >
                {item.label}
              </LinkComponent>
            ))}

            {showAuth && (
              <>
                <hr className="my-2" />
                <LinkComponent href={loginHref} className="block px-3 py-2 text-gray-700 hover:text-blue-600 cursor-pointer text-xl font-medium">
                  로그인
                </LinkComponent>
                <LinkComponent href={signupHref} className="block px-3 py-2 text-gray-700 hover:text-blue-600 cursor-pointer text-xl font-medium">
                  회원가입
                </LinkComponent>
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
                        currentLanguage === l.code ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50',
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
};

// 페이지 헤더 (개별 페이지 타이틀 영역)
export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ className = '', title, subtitle, description, actions, breadcrumbs, ...props }, ref) => {
    return (
      <div ref={ref} className={`space-y-4 ${className}`} {...props}>
        {breadcrumbs && <div className="text-sm text-text-muted">{breadcrumbs}</div>}

        <div className="flex items-start justify-between">
          <div className="space-y-1">
            {subtitle && <p className="text-sm font-medium text-text-muted">{subtitle}</p>}
            <h1 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">{title}</h1>
            {description && <p className="text-text-muted max-w-2xl">{description}</p>}
          </div>

          {actions && <div className="flex items-center space-x-3">{actions}</div>}
        </div>
      </div>
    );
  },
);

PageHeader.displayName = 'PageHeader';

export default Header;
