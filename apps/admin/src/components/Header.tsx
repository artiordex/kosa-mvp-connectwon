
'use client';

import Link from 'next/link';
import { useState } from 'react';

interface AdminHeaderProps {
  isSidebarCollapsed?: boolean;
}

export default function AdminHeader({ isSidebarCollapsed }: AdminHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white shadow-sm border-b z-40">
      <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">관리자 대시보드</h1>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/admin" className="text-gray-700 hover:text-blue-600 cursor-pointer">
                대시보드
              </Link>
              <Link href="/admin/programs" className="text-gray-700 hover:text-blue-600 cursor-pointer">
                프로그램 관리
              </Link>
              <Link href="/admin/rooms" className="text-gray-700 hover:text-blue-600 cursor-pointer">
                룸 관리
              </Link>
              <Link href="/admin/reservations" className="text-gray-700 hover:text-blue-600 cursor-pointer">
                예약 관리
              </Link>
              <Link href="/admin/users" className="text-gray-700 hover:text-blue-600 cursor-pointer">
                회원 관리
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-blue-600 cursor-pointer">
                <i className="ri-notification-line w-6 h-6 flex items-center justify-center"></i>
              </button>
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
                    <Link href="/admin/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                      프로필 설정
                    </Link>
                    <Link href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                      사용자 사이트로
                    </Link>
                    <hr className="my-2" />
                    <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 cursor-pointer">
                      로그아웃
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 cursor-pointer"
              >
                <i className="ri-menu-line w-6 h-6 flex items-center justify-center"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/admin/programs" className="block px-3 py-2 text-gray-700 hover:text-blue-600 cursor-pointer">
              프로그램 관리
            </Link>
            <Link href="/admin/rooms" className="block px-3 py-2 text-gray-700 hover:text-blue-600 cursor-pointer">
              룸 관리
            </Link>
            <Link href="/admin/reservations" className="block px-3 py-2 text-gray-700 hover:text-blue-600 cursor-pointer">
              예약 관리
            </Link>
            <Link href="/admin/users" className="block px-3 py-2 text-gray-700 hover:text-blue-600 cursor-pointer">
              회원 관리
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}