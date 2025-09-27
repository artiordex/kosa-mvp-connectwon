'use client';

import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import QuickMenu from './QuickFab';
import AIChat from './ai/AIChat';

/**
 * @description AppShell 컴포넌트 (전체 페이지를 감싸는 레이아웃 역할)
 *
 * @component
 * @param {ReactNode} children - 페이지 콘텐츠
 * @param {'default' | 'admin' | 'auth' | 'minimal'} [variant] - 레이아웃 유형 (현재는 사용되지 않음)
 * @param {boolean} [showHeader=true] - 헤더 표시 여부
 * @param {boolean} [showFooter=true] - 푸터 표시 여부
 * @param {string} [className] - 메인 영역에 추가할 클래스
 *
 * @example
 * <AppShell showHeader={false}>
 *   <Dashboard />
 * </AppShell>
 */
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
    // 전체 화면 높이와 배경색 설정
    <div className="min-h-screen bg-gray-50">
      {/* 조건부 헤더 렌더링 */}
      {showHeader && <Header />}

      {/* 메인 콘텐츠 영역 */}
      <main className={`flex-1 ${className}`}>
        {children}
      </main>

      {/* 조건부 푸터 렌더링 */}
      {showFooter && <Footer />}

      {/* 고정형 AI 챗봇 및 퀵메뉴 */}
      <AIChat />
      <QuickMenu />
    </div>
  );
}
