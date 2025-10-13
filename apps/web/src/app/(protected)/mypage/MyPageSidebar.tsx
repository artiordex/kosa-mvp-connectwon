/**
 * Description : MyPageSidebar.tsx - 📌 마이페이지 사이드바
 * Author : Shiwoo Min
 * Date : 2025-10-12 (patched: separate badges + listen notifications-updated)
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

interface User {
  name: string;
  email: string;
  points: number;
  role?: string;
  role_flags?: number;
  picture?: string | null;
  company?: string;
  department?: string;
  position?: string;
}

interface Features {
  ssoEnabled?: boolean;
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

  /** 알림 배지(외부에서 내려줄 경우) */
  notificationsBadgeCount?: number;

  /** 예약 배지 */
  reservationsBadgeCount?: number;

  /** 하위호환 */
  notificationCount?: number;

  features?: Features;
}

export default function MyPageSidebar({
  user,
  notificationsBadgeCount,
  reservationsBadgeCount = 0,
  notificationCount, // legacy
  features,
}: MyPageSidebarProps) {
  const pathname = usePathname();

  // 유저별 키 (알림 상태 저장/복원용). 이메일 > 이름 > 'default'
  const userKey = useMemo(
    () => (user?.email || user?.name || 'default').toString().toLowerCase(),
    [user?.email, user?.name]
  );

  // 알림 배지 내부 상태: props 우선 → localStorage 복원 → 0
  const [notifBadge, setNotifBadge] = useState<number>(
    notificationsBadgeCount ?? notificationCount ?? 0
  );

  // 마운트 시 localStorage에서 읽지 않음 복원
  useEffect(() => {
    try {
      const raw = localStorage.getItem(`notifState:${userKey}`);
      if (!raw) return;
      const saved = JSON.parse(raw);
      const unread = Array.isArray(saved?.items)
        ? saved.items.filter((n: any) => n?.status === 'unread').length
        : 0;
      // 외부 prop이 없을 때만 로컬 복원치 반영
      if (notificationsBadgeCount == null && notificationCount == null) {
        setNotifBadge(unread);
      }
    } catch (e) {
      console.error('[MyPageSidebar] failed to restore notif badge:', e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userKey]);

  // 알림 페이지에서 쏘는 커스텀 이벤트 수신 → 배지 즉시 갱신
  useEffect(() => {
    const onUpdated = (e: Event) => {
      const ev = e as CustomEvent<{ unread: number }>;
      if (typeof ev.detail?.unread === 'number') {
        setNotifBadge(ev.detail.unread);
      }
    };
    window.addEventListener('notifications-updated', onUpdated);
    return () => window.removeEventListener('notifications-updated', onUpdated);
  }, []);

  const isEnterprise = user.role_flags === 3;
  const showSSO = isEnterprise || !!features?.ssoEnabled;

  const navItems: NavItem[] = [
    { href: '/mypage', label: '대시보드', icon: 'ri-dashboard-line' },
    {
      href: '/mypage/reservations',
      label: '내 예약',
      icon: 'ri-calendar-line',
      ...(reservationsBadgeCount > 0 && { badge: reservationsBadgeCount }),
    },
    { href: '/mypage/programs', label: '내 프로그램', icon: 'ri-folder-line', requiredGrade: ['creator'] },
    { href: '/mypage/reviews', label: '나의 리뷰 관리', icon: 'ri-chat-3-line' },
    { href: '/mypage/profile', label: '프로필 설정', icon: 'ri-user-settings-line' },
    { href: '/mypage/points', label: '포인트', icon: 'ri-coin-line' },
    {
      href: '/mypage/notifications',
      label: '알림',
      icon: 'ri-notification-3-line',
      // ✅ 숫자 대신 NEW로 표기
      ...(notifBadge > 0 && { badge: 'NEW' }),
    },
  ];

  const enterpriseNavItems: NavItem[] = [
    { href: '/mypage/team', label: '팀 관리', icon: 'ri-team-line', requiredGrade: ['enterprise'] },
    { href: '/mypage/analytics', label: '분석 리포트', icon: 'ri-line-chart-line', requiredGrade: ['enterprise', 'advisor'] },
    { href: '/mypage/billing', label: '결제 관리', icon: 'ri-bill-line', requiredGrade: ['enterprise'] },
  ];

  const settingsNavItems: NavItem[] = [
    { href: '/mypage/security', label: '보안 설정', icon: 'ri-shield-check-line' },
    ...(showSSO ? ([{ href: '/mypage/sso', label: 'SSO 설정', icon: 'ri-link-m', requiredGrade: ['enterprise'] }] as NavItem[]) : []),
    { href: '/mypage/integrations', label: '연동 관리', icon: 'ri-plug-line', requiredGrade: ['enterprise', 'advisor'] },
  ];

  const filterMenuByRoleFlags = (items: NavItem[]) =>
    items.filter((item) => {
      if (!item.requiredGrade) return true;
      if (user.role_flags === 2) {
        return item.requiredGrade.includes('creator') || item.requiredGrade.includes('advisor');
      }
      if (user.role_flags === 3) {
        return true;
      }
      return false;
    });

  const filteredNavItems = filterMenuByRoleFlags(navItems);
  const filteredEnterpriseItems = filterMenuByRoleFlags(enterpriseNavItems);
  const filteredSettingsItems = filterMenuByRoleFlags(settingsNavItems);

  const getRoleBadgeStyle = (roleFlags?: number) => {
    switch (roleFlags) {
      case 3: return 'bg-purple-100 text-purple-700 border border-purple-200';
      case 2: return 'bg-blue-100 text-blue-700 border border-blue-200';
      case 1: return 'bg-green-100 text-green-700 border border-green-200';
      default: return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  const getRoleLabel = (role?: string, roleFlags?: number) => {
    if (role) return role;
    switch (roleFlags) {
      case 3: return 'Enterprise';
      case 2: return 'Creator';
      case 1: return 'Advisor';
      default: return 'Member';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      {/* 프로필 */}
      <div className="text-center mb-6 pb-6 border-b border-gray-100">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
          {typeof user.picture === 'string' && user.picture ? (
            <img src={user.picture} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <i className="ri-user-line text-3xl text-blue-600 w-8 h-8 flex items-center justify-center"></i>
          )}
        </div>
        <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
        <p className="text-gray-600 text-sm mt-1">{user.email}</p>

        {user.company && (
          <div className="mt-2 text-xs text-gray-500">
            <p>{user.company}</p>
            {user.department && <p>{user.department} · {user.position}</p>}
          </div>
        )}

        <div className="mt-3 inline-flex items-center">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadgeStyle(user.role_flags)}`}>
            {getRoleLabel(user.role, user.role_flags)}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-center">
          <i className="ri-coin-line text-yellow-500 mr-1 w-4 h-4 flex items-center justify-center"></i>
          <span className="text-sm font-medium text-gray-700">
            {Number(user.points ?? 0).toLocaleString()} 포인트
          </span>
        </div>
      </div>

      {/* 네비게이션 */}
      <nav className="space-y-1">
        {filteredNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-colors ${
                isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <i className={`${item.icon} mr-3 w-5 h-5 flex items-center justify-center`}></i>
                {item.label}
              </div>
              {typeof item.badge !== 'undefined' && (
                <span className="bg-red-500 text-white text-[10px] font-semibold rounded-full px-2 py-0.5 ml-1">
                  {typeof item.badge === 'number' ? item.badge : item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* 엔터프라이즈 */}
      {filteredEnterpriseItems.length > 0 && (
        <>
          <div className="my-4 border-t border-gray-100"></div>
          <div className="mb-2 px-4">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Enterprise</span>
          </div>
          <nav className="space-y-1">
            {filteredEnterpriseItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <i className={`${item.icon} mr-3 w-5 h-5 flex items-center justify-center`}></i>
                    {item.label}
                  </div>
                  {typeof item.badge !== 'undefined' && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                      {typeof item.badge === 'number' ? item.badge : item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </>
      )}

      {/* 설정 */}
      {filteredSettingsItems.length > 0 && (
        <>
          <div className="my-4 border-t border-gray-100"></div>
          <div className="mb-2 px-4">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">설정</span>
          </div>
          <nav className="space-y-1">
            {filteredSettingsItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-50'
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
