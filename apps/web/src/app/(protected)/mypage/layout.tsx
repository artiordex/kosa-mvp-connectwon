/**
 * Description : layout.tsx - 📌 마이페이지 공통 레이아웃
 * Author : Shiwoo Min
 * Date : 2025-10-13
 */

import '../../globals.css';
import MyPageSidebar from './MyPageSidebar';
import mypageData from 'data/mypage-with-user.json';

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = mypageData;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* 헤더 영역 */}
      <header className="border-b border-gray-100 bg-white/70 backdrop-blur-md">
        <div className="w-[80%] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">마이페이지</h1>
            <p className="text-sm text-gray-600 mt-1">
              나의 프로그램 예약과 활동을 관리하세요
            </p>
          </div>
        </div>
      </header>

      {/* 본문 그리드 */}
      <main className="w-[80%] mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 사이드바 */}
        <aside className="lg:col-span-1">
          <MyPageSidebar
            user={{
              name: user.name,
              email: user.email,
              points: user.stats.totalPoints,
              role: user.role,
              role_flags: user.role_flags,
              picture: user.profileImage,
            }}
            notificationCount={3}
          />
        </aside>

        {/* 하위 페이지 */}
        <section className="lg:col-span-3">{children}</section>
      </main>
    </div>
  );
}
