/**
 * Description : Header.tsx - 📌 ConnectWon 관리자 공통 헤더 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-10-11
 */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import menu from 'data/menu.json';

interface AdminHeaderProps {
  isSidebarCollapsed?: boolean;
}

interface AdminProfile {
  id: number;
  name: string;
  email: string;
  role: string;
  image_url: string;
}

export default function AdminHeader({ isSidebarCollapsed }: AdminHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [adminInfo, setAdminInfo] = useState<AdminProfile | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  // 현재 경로에 맞는 메뉴 타이틀
  const currentTitle = menu.find(item => pathname.startsWith(item.href))?.title || '관리자 대시보드';

  // 로그인된 관리자 정보 불러오기
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 인증 확인
      const isAuth = localStorage.getItem('connectwon_admin_auth');
      if (!isAuth) {
        router.push('/login');
        return;
      }

      // 프로필 정보 불러오기
      const storedProfile = localStorage.getItem('connectwon_profile');
      if (storedProfile) {
        try {
          const parsed = JSON.parse(storedProfile);
          setAdminInfo({
            id: parsed.id,
            name: parsed.name,
            email: parsed.email,
            role: parsed.role,
            image_url: parsed.image_url || '/images/avatar.png',
          });
        } catch (e) {
          console.error('관리자 정보 파싱 오류:', e);
        }
      }
    }
  }, [router]);

  // 로그아웃 처리
  const handleLogout = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      // localStorage 초기화
      localStorage.removeItem('connectwon_admin_auth');
      localStorage.removeItem('connectwon_profile');
      localStorage.removeItem('connectwon_ip');

      // 메뉴 닫기
      setIsMenuOpen(false);

      // 로그인 페이지로 이동
      router.push('/login');
    }
  };

  // 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.admin-menu')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

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
              <div className="relative admin-menu">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 cursor-pointer"
                >
                  {/* 프로필 이미지 또는 기본 아이콘 */}
                  {adminInfo?.image_url ? (
                    <Image
                      src={adminInfo.image_url}
                      alt="관리자 프로필"
                      width={32}
                      height={32}
                      className="rounded-full aspect-square object-cover border"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <i className="ri-user-line text-white w-5 h-5 flex items-center justify-center"></i>
                    </div>
                  )}

                  <div className="text-left">
                    <span className="text-sm font-medium block">
                      {adminInfo?.name || '로딩 중...'}
                    </span>
                    <span className="text-xs text-gray-500 block">
                      {adminInfo?.role || ''}
                    </span>
                  </div>
                  <i className="ri-arrow-down-s-line w-4 h-4 flex items-center justify-center"></i>
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border py-2 z-50">
                    {/* 관리자 정보 */}
                    <div className="px-4 py-3 border-b">
                      <p className="text-sm font-medium text-gray-900">
                        {adminInfo?.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {adminInfo?.email}
                      </p>
                    </div>

                    {/* 메뉴 아이템 */}
                    <Link
                      href="/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <i className="ri-user-settings-line w-4 h-4"></i>
                      <span>프로필 설정</span>
                    </Link>

                    <Link
                      href="http://localhost:3000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <i className="ri-external-link-line w-4 h-4"></i>
                      <span>사용자 사이트로</span>
                    </Link>

                    <hr className="my-2" />

                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                    >
                      <i className="ri-logout-box-line w-4 h-4"></i>
                      <span>로그아웃</span>
                    </button>
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
