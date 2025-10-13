/**
 * Description : layout.tsx - 📌 마이페이지 공통 레이아웃
 * Author : Shiwoo Min
 * Date : 2025-10-13 (patched: pick newUser via flag OR identity match; stay on /mypage)
 */

'use client';

import '../../globals.css';
import { useEffect, useState } from 'react';
import MyPageSidebar from './MyPageSidebar';
import mypageData from 'data/mypage-with-user.json';

type SidebarUser = {
  name: string;
  email: string;
  points: number;
  role: string;
  role_flags: number;
  picture?: string | null;
  company?: string;
  department?: string;
  position?: string;
};

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  const demoUser = (mypageData as any).user;
  const demoUnread =
    ((mypageData as any).myNotifications?.filter((n: any) => n.status === 'unread') ?? []).length;

  const [sidebarUser, setSidebarUser] = useState<SidebarUser>({
    name: demoUser.name,
    email: demoUser.email,
    points: demoUser.stats.totalPoints,
    role: demoUser.role,
    role_flags: demoUser.role_flags,
    picture: demoUser.profileImage ?? null,
    company: demoUser.company,
    department: demoUser.department,
    position: demoUser.position,
  });
  const [notificationCount, setNotificationCount] = useState<number>(demoUnread);
  const [features, setFeatures] = useState<{ ssoEnabled?: boolean }>({
    ssoEnabled: !!demoUser?.security?.ssoEnabled,
  });

  useEffect(() => {
    try {
      const flag = typeof window !== 'undefined' ? localStorage.getItem('signupCongratsPending') : null;
      const raw = typeof window !== 'undefined' ? localStorage.getItem('mockUser') : null;
      const u = raw ? JSON.parse(raw) : null;

      const nu = (mypageData as any).newUser ?? {};
      const isSameAsNewUser =
        !!u &&
        (
          (nu.id && u.id && String(u.id) === String(nu.id)) ||
          (nu.email && u.email && String(u.email).toLowerCase() === String(nu.email).toLowerCase()) ||
          (nu.name && u.name && String(u.name) === String(nu.name))
        );

      if (flag === 'true' || isSameAsNewUser) {
        // 신규(소나무) 사용자 사이드바
        const target = nu;
        setSidebarUser({
          name: target.name,
          email: target.email,
          points: target.stats?.totalPoints ?? 0,
          role: target.role ?? 'Family',
          role_flags: target.role_flags ?? 0,
          picture: target.profileImage ?? null,
          company: target.company,
          department: target.department,
          position: target.position,
        });
        setNotificationCount((target.notifications ?? []).filter((n: any) => n.status === 'unread').length);
        setFeatures({ ssoEnabled: !!target?.security?.ssoEnabled });
        // page.tsx에서 flag는 이미 제거됨(1회성)
      } else if (u?.id) {
        // 실사용자(SSO etc.) 모드 — 현재는 demoUser 구조 재사용
        const target = (mypageData as any).user;
        setSidebarUser({
          name: target.name,
          email: target.email,
          points: target.stats?.totalPoints ?? 0,
          role: target.role ?? 'Member',
          role_flags: target.role_flags ?? 0,
          picture: target.profileImage ?? null,
          company: target.company,
          department: target.department,
          position: target.position,
        });
        setNotificationCount(
          ((mypageData as any).myNotifications ?? []).filter((n: any) => n.status === 'unread').length
        );
        setFeatures({ ssoEnabled: !!target?.security?.ssoEnabled });
      } else {
        // 기본 데모
        const target = demoUser;
        setSidebarUser({
          name: target.name,
          email: target.email,
          points: target.stats.totalPoints,
          role: target.role,
          role_flags: target.role_flags,
          picture: target.profileImage ?? null,
          company: target.company,
          department: target.department,
          position: target.position,
        });
        setNotificationCount(demoUnread);
        setFeatures({ ssoEnabled: !!target?.security?.ssoEnabled });
      }
    } catch {
      // 조용히 데모로 폴백
      const target = demoUser;
      setSidebarUser({
        name: target.name,
        email: target.email,
        points: target.stats.totalPoints,
        role: target.role,
        role_flags: target.role_flags,
        picture: target.profileImage ?? null,
        company: target.company,
        department: target.department,
        position: target.position,
      });
      setNotificationCount(demoUnread);
      setFeatures({ ssoEnabled: !!target?.security?.ssoEnabled });
    }
  }, [demoUnread, demoUser]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <header className="border-b border-gray-100 bg-white/70 backdrop-blur-md">
        <div className="w-[80%] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">마이페이지</h1>
            <p className="text-sm text-gray-600 mt-1">나의 프로그램 예약과 활동을 관리하세요</p>
          </div>
        </div>
      </header>

      <main className="w-[80%] mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1">
          <MyPageSidebar user={sidebarUser} notificationCount={notificationCount} features={features} />
        </aside>
        <section className="lg:col-span-3">{children}</section>
      </main>
    </div>
  );
}
