
'use client';

import { useState } from 'react';

export default function QuickMenu() {
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
    { icon: 'ri-computer-line', label: 'PC' },
    { icon: 'ri-file-text-line', label: '문서' },
    { icon: 'ri-mail-line', label: '이메일 문의', action: handleEmailSupport },
  ];

  return (
    <div className="fixed right-6 bottom-6 z-50">
      <div className="relative">
        {/* 메뉴 아이템들 */}
        <div 
          className={`absolute bottom-16 right-0 transition-all duration-300 ${
            isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'
          }`}
        >
          <div className="flex flex-col space-y-3">
            {menuItems.map((item, index) => (
              <div key={index} className="relative group">
                <button
                  onClick={item.action}
                  className="w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 cursor-pointer"
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: isOpen ? 'slideInUp 0.3s ease-out forwards' : 'none'
                  }}
                >
                  <i className={`${item.icon} text-lg`}></i>
                </button>
                
                {/* 툴팁 */}
                <div className="absolute right-14 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap">
                    {item.label}
                  </div>
                  <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-800 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                </div>
              </div>
            ))}
            
            {/* 위로 가기 버튼 */}
            <div className="relative group">
              <button
                onClick={scrollToTop}
                className="w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 cursor-pointer"
                style={{
                  animationDelay: `${menuItems.length * 50}ms`,
                  animation: isOpen ? 'slideInUp 0.3s ease-out forwards' : 'none'
                }}
              >
                <i className="ri-arrow-up-line text-lg"></i>
              </button>
              
              {/* 툴팁 */}
              <div className="absolute right-14 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap">
                  위로 가기
                </div>
                <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-800 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
              </div>
            </div>
          </div>
        </div>

        {/* QUICK 메인 버튼 */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 flex items-center justify-center relative overflow-hidden cursor-pointer"
        >
          <div className="flex flex-col items-center justify-center">
            <span className="text-xs font-semibold leading-tight">QUICK</span>
          </div>
          
          {/* 회전 애니메이션을 위한 아이콘 */}
          <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
            <i className="ri-add-line text-xl"></i>
          </div>
        </button>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
