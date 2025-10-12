/**
 * Description : QuickFab.tsx - 📌 퀵 액션 버튼 컴포넌트 (문의하기, 위치, 비즈니스 등)
 * Author : Shiwoo Min
 * Date : 2025-10-10
 */

'use client';

import { useState } from 'react';

export default function QuickFab() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEmailSupport = () => {
    window.location.href = 'mailto:info@connectone.com?subject=문의사항';
  };

  const menuItems = [
    { icon: 'ri-map-pin-2-line', label: '위치' },
    { icon: 'ri-briefcase-line', label: '비즈니스' },
    { icon: 'ri-phone-line', label: '전화' },
    { icon: 'ri-team-line', label: '팀' },
    { icon: 'ri-computer-line', label: '디바이스' },
    { icon: 'ri-mail-line', label: '이메일 문의', action: handleEmailSupport },
    { icon: 'ri-arrow-up-line', label: '위로 가기', action: scrollToTop },
  ];

  return (
    <div className="fixed right-4 bottom-4 z-50">
      <div className="relative">
        {/* 메뉴 아이템들 */}
        {menuItems.map((item, index) => {
          const spacing = 60;
          const offset = isOpen ? (index + 1) * spacing : 0;

          return (
            <div
              key={index}
              className="absolute transition-all duration-300"
              style={{
                right: '2px',
                bottom: `${offset + 56}px`,
                opacity: isOpen ? 1 : 0,
                pointerEvents: isOpen ? 'auto' : 'none',
              }}
            >
              <div className="relative group">
                <button
                  onClick={item.action}
                  className="
                    w-12 h-12 rounded-full
                    border-2 border-blue-600
                    bg-blue-500 text-white
                    flex items-center justify-center
                    shadow-md
                    hover:bg-blue-600
                    transition-all duration-200 cursor-pointer
                  "
                >
                  <i className={`${item.icon} text-base`}></i>
                </button>

                {/* 툴팁 */}
                <div className="absolute right-16 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                    {item.label}
                  </div>
                  <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-0 h-0 border-l-4 border-l-black/80 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                </div>
              </div>
            </div>
          );
        })}

        {/* QUICK 메인 버튼 */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 flex items-center justify-center relative overflow-hidden cursor-pointer"
        >
          <div
            className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${
              isOpen ? 'rotate-45' : 'rotate-0'
            }`}
          >
            <i className="ri-add-line text-lg"></i>
          </div>
        </button>
      </div>
    </div>
  );
}
