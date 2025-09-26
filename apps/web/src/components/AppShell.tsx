
'use client';

import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import AdminHeader from './AdminHeader';
import QuickMenu from './QuickMenu';
import AIChat from './AIChat';

interface AppShellProps {
  children: ReactNode;
  variant?: 'default' | 'admin' | 'auth' | 'minimal';
  showHeader?: boolean;
  showFooter?: boolean;
  className?: string;
}

export default function AppShell({
  children,
  showHeader = true,
  showFooter = true,
  className = ''
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {showHeader && <Header />}
      <main className={`flex-1 ${className}`}>
        {children}
      </main>
      {showFooter && <Footer />}
      <AIChat />
      <QuickMenu />
    </div>
  );
}
