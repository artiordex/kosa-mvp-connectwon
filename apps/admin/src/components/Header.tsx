'use client';

interface HeaderProps {
  isSidebarCollapsed: boolean;
}

export default function Header({ isSidebarCollapsed }: HeaderProps) {
  return (
    <header className={`fixed top-0 w-full bg-white shadow-sm border-b z-40 transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
      <div className="px-4 sm:px-6 lg:px-8 flex items-center h-20">
        <h1 className="text-xl font-semibold text-gray-900">관리자 대시보드</h1>
      </div>
    </header>
  );
}
