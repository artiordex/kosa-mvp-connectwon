'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: (collapsed: boolean) => void;
}

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { href: '/admin', icon: 'ri-dashboard-line', label: '대시보드', exact: true },
    { href: '/admin/programs', icon: 'ri-book-line', label: '프로그램 관리' },
    { href: '/admin/rooms', icon: 'ri-building-line', label: '룸 관리' },
    { href: '/admin/reservations', icon: 'ri-calendar-check-line', label: '예약 관리' },
    { href: '/admin/users', icon: 'ri-user-line', label: '회원 관리' },
  ];

  const isActive = (href: string, exact?: boolean) => (exact ? pathname === href : pathname.startsWith(href));

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-50 hidden md:block ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* 로고 */}
      <div className="h-20 flex items-center justify-center border-b border-gray-200 px-4">
        {isCollapsed ? (
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <i className="ri-building-line text-white text-xl"></i>
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

      {/* 메뉴 */}
      <div className={`${isCollapsed ? 'p-2' : 'p-4'}`}>
        <nav className="space-y-2">
          {menuItems.map(item => (
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
            </Link>
          ))}
        </nav>
      </div>

      {/* 토글 버튼 */}
      <div className="absolute bottom-20 left-0 right-0 px-2 border-t border-gray-200 pt-4">
        <div className="flex justify-center">
          <button
            onClick={() => onToggle(!isCollapsed)}
            aria-label={isCollapsed ? '사이드바 펼치기' : '사이드바 접기'}
            className="p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition"
          >
            <i className={`${isCollapsed ? 'ri-menu-unfold-line' : 'ri-menu-fold-line'} w-5 h-5`}></i>
          </button>
        </div>
      </div>
    </aside>
  );
}
