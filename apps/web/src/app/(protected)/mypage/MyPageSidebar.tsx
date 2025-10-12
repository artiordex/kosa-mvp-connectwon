/**
 * Description : MyPageSidebar.tsx - 📌 마이페이지 사이드바
 * Author : Shiwoo Min
 * Date : 2025-10-12
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface User {
  name: string;
  email: string;
  points: number;
  role?: string;
  role_flags?: number;
  picture?: string;
  company?: string;
  department?: string;
  position?: string;
}

interface NavItem {
  href: string;
  label: string;
  icon: string;
  badge?: string | number;
  requiredGrade?: string[];
}

interface MyPageSidebarProps {
  user: User;
  notificationCount?: number;
}

export default function MyPageSidebar({ user, notificationCount = 0 }: MyPageSidebarProps) {
  const pathname = usePathname();

  // role_flags로 Creator 여부 확인 (2 = Creator)
  const isCreator = user.role_flags === 2;
  const isEnterprise = user.role_flags === 3; // 예시로 3을 enterprise로 가정

  // 메뉴 항목을 배열로 분리
  const navItems: NavItem[] = [
    {
      href: '/mypage',
      label: '대시보드',
      icon: 'ri-dashboard-line'
    },
    {
      href: '/mypage/reservations',
      label: '내 예약',
      icon: 'ri-calendar-line',
      ...(notificationCount > 0 && { badge: notificationCount })
    },
    {
      href: '/mypage/programs',
      label: '내 프로그램',
      icon: 'ri-folder-line',
      requiredGrade: ['creator']
    },
    {
      href: '/mypage/reviews',
      label: '나의 리뷰 관리',
      icon: 'ri-chat-3-line'
    },
    {
      href: '/mypage/profile',
      label: '프로필 설정',
      icon: 'ri-user-settings-line'
    },
    {
      href: '/mypage/points',
      label: '포인트',
      icon: 'ri-coin-line'
    },
    {
      href: '/mypage/notifications',
      label: '알림',
      icon: 'ri-notification-3-line',
      ...(notificationCount > 0 && { badge: notificationCount })
    },
  ];

  // 엔터프라이즈 전용 메뉴
  const enterpriseNavItems: NavItem[] = [
    {
      href: '/mypage/team',
      label: '팀 관리',
      icon: 'ri-team-line',
      requiredGrade: ['enterprise']
    },
    {
      href: '/mypage/analytics',
      label: '분석 리포트',
      icon: 'ri-line-chart-line',
      requiredGrade: ['enterprise', 'advisor']
    },
    {
      href: '/mypage/billing',
      label: '결제 관리',
      icon: 'ri-bill-line',
      requiredGrade: ['enterprise']
    },
  ];

  // 설정 메뉴
  const settingsNavItems: NavItem[] = [
    {
      href: '/mypage/security',
      label: '보안 설정',
      icon: 'ri-shield-check-line'
    },
    {
      href: '/mypage/sso',
      label: 'SSO 설정',
      icon: 'ri-link-m',
      requiredGrade: ['enterprise']
    },
    {
      href: '/mypage/integrations',
      label: '연동 관리',
      icon: 'ri-plug-line',
      requiredGrade: ['enterprise', 'advisor']
    },
  ];

  // role_flags에 따라 메뉴 필터링
  const filterMenuByRoleFlags = (items: NavItem[]) => {
    return items.filter(item => {
      if (!item.requiredGrade) return true;
      // Creator(2)는 'creator', 'advisor' 메뉴 접근 가능
      if (user.role_flags === 2) {
        return item.requiredGrade.includes('creator') || item.requiredGrade.includes('advisor');
      }
      // Enterprise(3)는 모든 메뉴 접근 가능
      if (user.role_flags === 3) {
        return true;
      }
      return false;
    });
  };

  const filteredNavItems = filterMenuByRoleFlags(navItems);
  const filteredEnterpriseItems = filterMenuByRoleFlags(enterpriseNavItems);
  const filteredSettingsItems = filterMenuByRoleFlags(settingsNavItems);

  // Role 뱃지 스타일
  const getRoleBadgeStyle = (roleFlags?: number) => {
    switch (roleFlags) {
      case 3: // Enterprise
        return 'bg-purple-100 text-purple-700 border border-purple-200';
      case 2: // Creator
        return 'bg-blue-100 text-blue-700 border border-blue-200';
      case 1: // Advisor
        return 'bg-green-100 text-green-700 border border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  const getRoleLabel = (role?: string, roleFlags?: number) => {
    if (role) return role;
    switch (roleFlags) {
      case 3:
        return 'Enterprise';
      case 2:
        return 'Creator';
      case 1:
        return 'Advisor';
      default:
        return 'Member';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      {/* 프로필 */}
      <div className="text-center mb-6 pb-6 border-b border-gray-100">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
          {user.picture ? (
            <img src={user.picture} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <i className="ri-user-line text-3xl text-blue-600 w-8 h-8 flex items-center justify-center"></i>
          )}
        </div>
        <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
        <p className="text-gray-600 text-sm mt-1">{user.email}</p>

        {/* 회사 정보 (Enterprise) */}
        {user.company && (
          <div className="mt-2 text-xs text-gray-500">
            <p>{user.company}</p>
            {user.department && <p>{user.department} · {user.position}</p>}
          </div>
        )}

        {/* Role 뱃지 */}
        <div className="mt-3 inline-flex items-center">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadgeStyle(user.role_flags)}`}>
            {getRoleLabel(user.role, user.role_flags)}
          </span>
        </div>

        {/* 포인트 */}
        <div className="mt-3 flex items-center justify-center">
          <i className="ri-coin-line text-yellow-500 mr-1 w-4 h-4 flex items-center justify-center"></i>
          <span className="text-sm font-medium text-gray-700">
            {user.points.toLocaleString()} 포인트
          </span>
        </div>
      </div>

      {/* 기본 네비게이션 */}
      <nav className="space-y-1">
        {filteredNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-colors ${
                isActive
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <i className={`${item.icon} mr-3 w-5 h-5 flex items-center justify-center`}></i>
                {item.label}
              </div>
              {notificationCount > 0 && item.href === '/mypage/notifications' && (
                <span className="bg-red-500 text-white text-[10px] font-semibold rounded-full px-2 py-0.5 ml-1">
                  NEW
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* 엔터프라이즈 메뉴 */}
      {filteredEnterpriseItems.length > 0 && (
        <>
          <div className="my-4 border-t border-gray-100"></div>
          <div className="mb-2 px-4">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Enterprise
            </span>
          </div>
          <nav className="space-y-1">
            {filteredEnterpriseItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <i className={`${item.icon} mr-3 w-5 h-5 flex items-center justify-center`}></i>
                    {item.label}
                  </div>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </>
      )}

      {/* 설정 메뉴 */}
      {filteredSettingsItems.length > 0 && (
        <>
          <div className="my-4 border-t border-gray-100"></div>
          <div className="mb-2 px-4">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              설정
            </span>
          </div>
          <nav className="space-y-1">
            {filteredSettingsItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <i className={`${item.icon} mr-3 w-5 h-5 flex items-center justify-center`}></i>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </>
      )}
    </div>
  );
}
