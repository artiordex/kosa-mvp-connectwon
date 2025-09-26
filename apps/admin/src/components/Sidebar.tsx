
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function AdminSidebar({ isCollapsed, onToggle }: AdminSidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    {
      href: '/admin',
      icon: 'ri-dashboard-line',
      label: '대시보드',
      exact: true
    },
    {
      href: '/admin/programs',
      icon: 'ri-book-line',
      label: '프로그램 관리'
    },
    {
      href: '/admin/rooms',
      icon: 'ri-building-line',
      label: '룸 관리'
    },
    {
      href: '/admin/reservations',
      icon: 'ri-calendar-check-line',
      label: '예약 관리'
    },
    {
      href: '/admin/users',
      icon: 'ri-user-line',
      label: '회원 관리'
    }
  ];

  const isActive = (href: string, exact?: boolean) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-50 hidden md:block ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* 상단 로고 영역 */}
      <div className="h-20 flex items-center justify-center border-b border-gray-200 px-4">
        {isCollapsed ? (
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center group relative">
            <i className="ri-building-line text-white text-xl"></i>
            {/* 툴팁 */}
            <div className="absolute left-16 ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
              커넥트원
              <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-0 h-0 border-r-4 border-r-gray-800 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
            </div>
          </div>
        ) : (
          <Link href="/admin" className="flex items-center">
            <img 
              src="https://static.readdy.ai/image/e8a01b9affdf7f6133d25eaf5a26fc99/5ce16e7de0992ed214e5895b45d04f13.png" 
              alt="커넥트원 로고" 
              className="h-12 w-auto object-contain"
            />
          </Link>
        )}
      </div>

      <div className={`${isCollapsed ? 'p-2' : 'p-4'}`}>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center rounded-lg transition-all duration-200 cursor-pointer group relative ${
                isCollapsed ? 'p-3 justify-center' : 'px-3 py-3'
              } ${
                isActive(item.href, item.exact)
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
              }`}
            >
              {/* 활성 상태 표시 (접힌 상태에서는 작은 점으로) */}
              {isActive(item.href, item.exact) && isCollapsed && (
                <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r"></div>
              )}
              
              <i className={`${item.icon} ${isCollapsed ? 'text-xl' : 'w-5 h-5 mr-3'} flex items-center justify-center`}></i>
              
              {!isCollapsed && (
                <span className="font-medium whitespace-nowrap">{item.label}</span>
              )}
              
              {/* 툴팁 (접혔을 때만 표시) */}
              {isCollapsed && (
                <div className="absolute left-16 ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                  {item.label}
                  <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-0 h-0 border-r-4 border-r-gray-800 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                </div>
              )}
            </Link>
          ))}
        </nav>
        
        {/* 구분선 */}
        <div className={`border-t border-gray-200 ${isCollapsed ? 'my-4' : 'my-6'}`}></div>
        
        {/* 추가 메뉴 */}
        <nav className="space-y-2">
          <Link
            href="/admin/settings"
            className={`flex items-center rounded-lg text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-all duration-200 cursor-pointer group relative ${
              isCollapsed ? 'p-3 justify-center' : 'px-3 py-3'
            }`}
          >
            <i className={`ri-settings-line ${isCollapsed ? 'text-xl' : 'w-5 h-5 mr-3'} flex items-center justify-center`}></i>
            {!isCollapsed && (
              <span className="font-medium whitespace-nowrap">설정</span>
            )}
            
            {isCollapsed && (
              <div className="absolute left-16 ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                설정
                <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-0 h-0 border-r-4 border-r-gray-800 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
              </div>
            )}
          </Link>
          
          <Link
            href="/admin/help"
            className={`flex items-center rounded-lg text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-all duration-200 cursor-pointer group relative ${
              isCollapsed ? 'p-3 justify-center' : 'px-3 py-3'
            }`}
          >
            <i className={`ri-question-line ${isCollapsed ? 'text-xl' : 'w-5 h-5 mr-3'} flex items-center justify-center`}></i>
            {!isCollapsed && (
              <span className="font-medium whitespace-nowrap">도움말</span>
            )}
            
            {isCollapsed && (
              <div className="absolute left-16 ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                도움말
                <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-0 h-0 border-r-4 border-r-gray-800 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
              </div>
            )}
          </Link>
        </nav>
      </div>
      
      {/* 사이드바 토글 버튼 */}
      <div className="absolute bottom-20 left-0 right-0 px-2 border-t border-gray-200 pt-4">
        <div className="flex justify-center">
          <button
            onClick={onToggle}
            className="text-gray-700 hover:text-blue-600 cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group relative"
          >
            <i className={`${isCollapsed ? 'ri-menu-unfold-line' : 'ri-menu-fold-line'} w-5 h-5 flex items-center justify-center`}></i>
            
            {isCollapsed && (
              <div className="absolute left-12 ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                사이드바 펼치기
                <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-0 h-0 border-r-4 border-r-gray-800 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
              </div>
            )}
          </button>
        </div>
      </div>
      
      {/* 하단 사용자 정보 */}
      <div className="absolute bottom-4 left-0 right-0 px-2">
        {isCollapsed ? (
          <div className="flex justify-center group relative">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer">
              <i className="ri-user-line text-white text-lg"></i>
            </div>
            {/* 사용자 정보 툴팁 */}
            <div className="absolute left-16 ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
              <div className="font-medium">관리자</div>
              <div className="text-xs text-gray-300">artiordex@gmail.com</div>
              <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-0 h-0 border-r-4 border-r-gray-800 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-3 mx-2">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <i className="ri-user-line text-white w-4 h-4 flex items-center justify-center"></i>
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