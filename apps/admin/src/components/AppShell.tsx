'use client';

import { ReactNode, useState } from 'react';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  // 사이드바 접힘/펼침 상태 관리 (false = 펼쳐짐, true = 접힘)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 좌측 사이드바 */}
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={setIsSidebarCollapsed} />

      {/* 상단 헤더 */}
      <Header isSidebarCollapsed={isSidebarCollapsed} />

      {/* 메인 컨텐츠 영역
          - pt-20 : 헤더 높이만큼 위에 여백
          - ml-16 / ml-64 : 사이드바 접힘 여부에 따른 좌측 마진 */}
      <main className={`transition-all duration-300 pt-20 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        {/* 실제 페이지 컨텐츠 */}
        <div className="px-4 sm:px-6 lg:px-8 py-8">{children}</div>
      </main>
    </div>
  );
}
