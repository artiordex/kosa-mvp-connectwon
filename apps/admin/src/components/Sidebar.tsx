'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import menu from 'data/menu.json';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: (collapsed: boolean) => void;
}

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  // 현재 경로에 맞는 메뉴 하나 찾기
  const currentMenu = menu.find(item => (item.exact ? pathname === item.href : pathname.startsWith(item.href)));

  const isActive = (href: string, exact?: boolean) => (exact ? pathname === href : pathname.startsWith(href));

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-50 ${isCollapsed ? 'w-16' : 'w-64'}`}
    >
      {/* 로고 */}
      <div className="h-20 flex items-center justify-center border-b border-gray-200 px-4">
        {isCollapsed ? (
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center group relative">
            <img src="/images/header_logo.png" alt="커넥트원 로고" className="h-8 w-8 object-contain" />
            {/* 접혔을 때 툴팁 */}
            <div className="absolute left-16 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
              커넥트원
            </div>
          </div>
        ) : (
          <Link href="/admin" className="flex items-center">
            <img src="/images/header_logo.png" alt="커넥트원 로고" className="h-12 w-auto object-contain" />
          </Link>
        )}
      </div>

      {/* 메인 메뉴 */}
      <div className={`${isCollapsed ? 'p-2' : 'p-4'}`}>
        <nav className="space-y-2">
          {menu.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center rounded-lg transition-all duration-200 group relative ${
                isCollapsed ? 'p-3 justify-center' : 'px-3 py-3'
              } ${isActive(item.href, item.exact) ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'}`}
            >
              {isActive(item.href, item.exact) && isCollapsed && (
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r"></div>
              )}
              <i className={`${item.icon} ${isCollapsed ? 'text-xl' : 'w-5 h-5 mr-3'} flex items-center justify-center`}></i>
              {!isCollapsed && <span className="font-medium">{item.label}</span>}

              {/* 접혔을 때 툴팁 */}
              {isCollapsed && (
                <div className="absolute left-16 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {item.label}
                </div>
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* 추가 메뉴 (설정 / 도움말 / 사이드바 접기) */}
      <div className={`${isCollapsed ? 'p-2' : 'p-4'} border-t border-gray-200 mt-4`}>
        <nav className="space-y-2">
          <Link
            href="/settings"
            className={`flex items-center rounded-lg text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-all duration-200 group relative ${
              isCollapsed ? 'p-3 justify-center' : 'px-3 py-3'
            }`}
          >
            <i className={`ri-settings-line ${isCollapsed ? 'text-xl' : 'w-5 h-5 mr-3'}`}></i>
            {!isCollapsed && <span className="font-medium">설정</span>}
            {isCollapsed && (
              <div className="absolute left-16 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 whitespace-nowrap">
                설정
              </div>
            )}
          </Link>

          <Link
            href="/help"
            className={`flex items-center rounded-lg text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-all duration-200 group relative ${
              isCollapsed ? 'p-3 justify-center' : 'px-3 py-3'
            }`}
          >
            <i className={`ri-question-line ${isCollapsed ? 'text-xl' : 'w-5 h-5 mr-3'}`}></i>
            {!isCollapsed && <span className="font-medium">도움말</span>}
            {isCollapsed && (
              <div className="absolute left-16 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 whitespace-nowrap">
                도움말
              </div>
            )}
          </Link>

          <button
            onClick={() => onToggle(!isCollapsed)}
            className={`w-full flex items-center rounded-lg text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-all duration-200 group relative ${
              isCollapsed ? 'p-3 justify-center' : 'px-3 py-3'
            }`}
          >
            <i className={`${isCollapsed ? 'ri-menu-unfold-line' : 'ri-menu-fold-line'} ${isCollapsed ? 'text-xl' : 'w-5 h-5 mr-3'}`}></i>
            {!isCollapsed && <span className="font-medium">{isCollapsed ? '사이드바 펼치기' : '사이드바 접기'}</span>}
            {isCollapsed && (
              <div className="absolute left-16 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {isCollapsed ? '사이드바 펼치기' : '사이드바 접기'}
              </div>
            )}
          </button>
        </nav>
      </div>

      {/* 하단 사용자 정보 */}
      <div className="absolute bottom-4 left-0 right-0 px-2">
        {isCollapsed ? (
          <div className="flex justify-center group relative">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer">
              <i className="ri-user-line text-white text-lg"></i>
            </div>
            <div className="absolute left-16 px-3 py-2 bg-gray-800 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
              <div className="font-medium">관리자</div>
              <div className="text-xs text-gray-300">artiordex@gmail.com</div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-3 mx-2">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <i className="ri-user-line text-white w-4 h-4"></i>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">관리자</p>
                <p className="text-xs text-gray-600">artiordex@gmail.com</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
