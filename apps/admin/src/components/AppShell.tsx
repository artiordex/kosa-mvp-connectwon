'use client';

import { ReactNode, useState } from 'react';

import Header from './Header';
import Sidebar from './Sidebar';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={setIsSidebarCollapsed} />
      <Header isSidebarCollapsed={isSidebarCollapsed} />
      <main className={`transition-all duration-300 pt-20 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="px-4 sm:px-6 lg:px-8 py-8">{children}</div>
      </main>
    </div>
  );
}
