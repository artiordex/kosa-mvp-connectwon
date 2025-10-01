'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import menu from 'data/menu.json';

interface AdminHeaderProps {
  isSidebarCollapsed?: boolean;
}

export default function AdminHeader({ isSidebarCollapsed }: AdminHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // 현재 경로에 맞는 메뉴에서 title 추출
  const currentTitle = menu.find(item => pathname.startsWith(item.href))?.title || '관리자 대시보드';

  return (
    <header className="fixed top-0 w-full bg-white shadow-sm border-b z-40">
      <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* 왼쪽 타이틀 */}
            <div className="flex items-center">
              <h2 className="text-xl font-semibold text-gray-900">{currentTitle}</h2>
            </div>

            {/* 오른쪽: 알람 + 관리자 메뉴 */}
            <div className="flex items-center space-x-4">
              {/* 알림 버튼 */}
              <button className="text-gray-700 hover:text-blue-600 cursor-pointer">
                <i className="ri-notification-line w-6 h-6 flex items-center justify-center"></i>
              </button>

              {/* 관리자 메뉴 */}
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 cursor-pointer"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <i className="ri-user-line text-white w-5 h-5 flex items-center justify-center"></i>
                  </div>
                  <span className="text-sm">관리자</span>
                  <i className="ri-arrow-down-s-line w-4 h-4 flex items-center justify-center"></i>
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-50">
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                      프로필 설정
                    </Link>
                    <Link
                      href="http://localhost:3000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                    >
                      사용자 사이트로
                    </Link>
                    <hr className="my-2" />
                    <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 cursor-pointer">로그아웃</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
