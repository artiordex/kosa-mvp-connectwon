/**
 * Description : QuickMenu.tsx - 📌 ConnectWon UI 플로팅 퀵메뉴 React 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-09-19
 */
import { useEffect, useState } from 'react';
import type { QuickMenuItem, QuickMenuProps } from '../ui-types.js';

const defaultMenuItems: QuickMenuItem[] = [
  {
    id: 'location',
    icon: 'ri-map-pin-2-line',
    label: '위치',
    onClick: () => console.log('위치 클릭'),
  },
  {
    id: 'business',
    icon: 'ri-briefcase-line',
    label: '비즈니스',
    onClick: () => console.log('비즈니스 클릭'),
  },
  {
    id: 'phone',
    icon: 'ri-phone-line',
    label: '전화',
    onClick: () => console.log('전화 클릭'),
  },
  {
    id: 'team',
    icon: 'ri-team-line',
    label: '팀',
    onClick: () => console.log('팀 클릭'),
  },
  {
    id: 'pc',
    icon: 'ri-computer-line',
    label: 'PC',
    onClick: () => console.log('PC 클릭'),
  },
  {
    id: 'document',
    icon: 'ri-file-text-line',
    label: '문서',
    onClick: () => console.log('문서 클릭'),
  },
];

// =================================================================
// QuickMenu 컴포넌트
// =================================================================

export const QuickMenu: React.FC<QuickMenuProps> = ({
  items = defaultMenuItems,
  position = 'bottom-right',
  showScrollToTop = true,
  scrollThreshold = 300,
  className = '',
  buttonColor = 'bg-blue-600 hover:bg-blue-700',
  enableAnimation = true,
  isClient = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // 클라이언트 사이드 마운트 확인
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 스크롤 이벤트 처리
  useEffect(() => {
    if (!isMounted || !showScrollToTop) return;

    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      setShowScrollButton(scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMounted, showScrollToTop, scrollThreshold]);

  // 맨 위로 스크롤
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // 위치 클래스
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  // 메뉴 방향 클래스
  const menuDirectionClasses = {
    'bottom-right': 'bottom-16 right-0',
    'bottom-left': 'bottom-16 left-0',
    'top-right': 'top-16 right-0',
    'top-left': 'top-16 left-0',
  };

  // 툴팁 방향 클래스
  const tooltipPositionClasses = {
    'bottom-right': 'right-14',
    'bottom-left': 'left-14',
    'top-right': 'right-14',
    'top-left': 'left-14',
  };

  // 아이콘 렌더링
  const renderIcon = (icon: string | React.ReactNode) => {
    if (typeof icon === 'string') {
      // RemixIcon 클래스명인 경우
      return <i className={`${icon} text-lg`} />;
    }
    // React 노드인 경우
    return icon;
  };

  // 메뉴 아이템 핸들러
  const handleItemClick = (item: QuickMenuItem) => {
    if (item.href) {
      if (item.target === '_blank') {
        window.open(item.href, '_blank');
      } else {
        window.location.href = item.href;
      }
    }
    item.onClick();
  };

  // 클라이언트에서만 렌더링 (Next.js 호환성)
  if (isClient && !isMounted) {
    return null;
  }

  return (
    <>
      <div className={`fixed z-50 ${positionClasses[position]} ${className}`}>
        <div className="relative">
          {/* 메뉴 아이템들 */}
          <div
            className={`absolute transition-all duration-300 ${menuDirectionClasses[position]} ${
              isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'
            }`}
          >
            <div className="flex flex-col space-y-3">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="relative group"
                  style={enableAnimation && isOpen ? { '--animation-delay': `${index * 50}ms` } as React.CSSProperties : {}}
                >
                  <button
                    onClick={() => handleItemClick(item)}
                    className={`w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 ${
                      enableAnimation && isOpen ? 'animate-slide-in-up' : ''
                    }`}
                    title={item.label}
                  >
                    {renderIcon(item.icon)}
                  </button>

                  {/* 툴팁 */}
                  <div
                    className={`absolute top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none ${tooltipPositionClasses[position]}`}
                  >
                    <div className="bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap relative">
                      {item.label}
                      {/* 툴팁 화살표 */}
                      <div
                        className={`absolute top-1/2 transform -translate-y-1/2 w-0 h-0 ${
                          position.includes('right')
                            ? 'right-0 translate-x-1 border-l-4 border-l-gray-800 border-t-2 border-t-transparent border-b-2 border-b-transparent'
                            : 'left-0 -translate-x-1 border-r-4 border-r-gray-800 border-t-2 border-t-transparent border-b-2 border-b-transparent'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* 맨 위로 버튼 */}
              {showScrollToTop && showScrollButton && (
                <div
                  className="relative group"
                  style={
                    enableAnimation && isOpen ? { '--animation-delay': `${items.length * 50}ms` } as React.CSSProperties : {}
                  }
                >
                  <button
                    onClick={scrollToTop}
                    className={`w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 ${
                      enableAnimation && isOpen ? 'animate-slide-in-up' : ''
                    }`}
                    title="위로 가기"
                  >
                    <i className="ri-arrow-up-line text-lg" />
                  </button>

                  {/* 툴팁 */}
                  <div
                    className={`absolute top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none ${tooltipPositionClasses[position]}`}
                  >
                    <div className="bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap relative">
                      위로 가기
                      {/* 툴팁 화살표 */}
                      <div
                        className={`absolute top-1/2 transform -translate-y-1/2 w-0 h-0 ${
                          position.includes('right')
                            ? 'right-0 translate-x-1 border-l-4 border-l-gray-800 border-t-2 border-t-transparent border-b-2 border-b-transparent'
                            : 'left-0 -translate-x-1 border-r-4 border-r-gray-800 border-t-2 border-t-transparent border-b-2 border-b-transparent'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* QUICK 메인 버튼 */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-16 h-16 ${buttonColor} text-white rounded-full shadow-lg transition-all duration-200 flex items-center justify-center relative overflow-hidden`}
            title={isOpen ? '메뉴 닫기' : '퀵메뉴 열기'}
          >
            <div className="flex flex-col items-center justify-center">
              <span className="text-xs font-semibold leading-tight">QUICK</span>
            </div>

            {/* 회전 애니메이션을 위한 아이콘 */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${
                isOpen ? 'rotate-45' : 'rotate-0'
              }`}
            >
              <i className="ri-add-line text-xl" />
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

// =================================================================
// 기본 아이콘 컴포넌트들 (RemixIcon 없이 사용할 때)
// =================================================================

export const DefaultIcons = {
  Location: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
  Phone: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  ),
  Team: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  ),
  Document: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  ),
  ArrowUp: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 10l7-7m0 0l7 7m-7-7v18"
      />
    </svg>
  ),
};

export default QuickMenu;
