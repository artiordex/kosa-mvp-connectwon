/**
 * Description : AppShell.tsx - 📌 ConnectWon UI 애플리케이션 공통 레이아웃 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-09-19
 */
import type { AppShellProps } from '../../ui-types.js';

// 기본 헤더 컴포넌트
const DefaultHeader: React.FC<{ variant: string }> = ({ variant }) => {
  // variant별 기본 스타일 정의
  const variantStyles = {
    default: 'bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700',
    admin: 'bg-blue-600 dark:bg-blue-800 text-white shadow-sm',
    auth: 'bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700',
    minimal: 'bg-transparent'
  };

  return (
    <header className={`h-16 px-4 flex items-center justify-between shrink-0 ${variantStyles[variant as keyof typeof variantStyles]}`}>
      {/* 좌측 영역 */}
      <div className="flex items-center space-x-4">
        {/* 로고/브랜드 영역 */}
        <div className="flex items-center">
          <div className="w-8 h-8 rounded bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* 네비게이션 영역 (데스크톱) */}
        <nav className="hidden md:flex items-center space-x-1">
          {/* 각 프로젝트에서 메뉴 구현 */}
        </nav>
      </div>

      {/* 우측 영역 */}
      <div className="flex items-center space-x-3">
        {/* 액션 버튼들 */}
        {variant === 'admin' && (
          <div className="flex items-center space-x-2">
            {/* 관리자 전용 액션들 */}
          </div>
        )}
      </div>
    </header>
  );
};

/**
 * 기본 사이드바 컴포넌트
 * 실제 프로젝트에서는 sidebarSlot으로 커스텀 사이드바를 주입해서 사용
 */
const DefaultSidebar: React.FC<{ variant: string }> = ({ variant }) => {
  // admin variant가 아니면 사이드바 미표시
  if (variant !== 'admin') return null;

  return (
    <aside className="w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shrink-0">
      <div className="flex flex-col h-full">
        {/* 사이드바 헤더 */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="w-full h-8 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>

        {/* 네비게이션 영역 */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {/* 각 프로젝트에서 메뉴 구현 */}
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-full h-10 bg-gray-200 dark:bg-gray-700 rounded" />
            ))}
          </div>
        </nav>

        {/* 사이드바 푸터 */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="w-full h-10 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    </aside>
  );
};

/**
 * 기본 푸터 컴포넌트
 * 실제 프로젝트에서는 footerSlot으로 커스텀 푸터를 주입해서 사용
 */
const DefaultFooter: React.FC<{ variant: string }> = ({ variant }) => {
  const variantStyles = {
    default: 'bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700',
    admin: 'bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700',
    auth: 'bg-transparent',
    minimal: 'bg-transparent'
  };

  return (
    <footer className={`shrink-0 px-4 py-6 ${variantStyles[variant as keyof typeof variantStyles]}`}>
      <div className="max-w-7xl mx-auto">
        {/* 각 프로젝트에서 푸터 내용 구현 */}
        <div className="text-center">
          <div className="w-48 h-4 bg-gray-200 dark:bg-gray-700 rounded mx-auto" />
        </div>
      </div>
    </footer>
  );
};

// =================================================================
// Main AppShell Component
// =================================================================

/**
 * AppShell 메인 컴포넌트
 *
 * @example
 * // 사용자 앱 (사이드바 없음)
 * <AppShell variant="default">
 *   <UserContent />
 * </AppShell>
 *
 * // 관리자 앱 (사이드바 있음)
 * <AppShell variant="admin">
 *   <AdminContent />
 * </AppShell>
 *
 * // 커스텀 컴포넌트 주입
 * <AppShell variant="admin" headerSlot={<CustomHeader />}>
 *   <Content />
 * </AppShell>
 */
export const AppShell: React.FC<AppShellProps> = ({
  children,
  variant = 'default',
  showHeader = true,
  showFooter = true,
  showSidebar,
  className,
  headerSlot,
  sidebarSlot,
  footerSlot,
}) => {
  // 사이드바 표시 여부 결정
  // 1. showSidebar가 명시적으로 설정된 경우 그 값 사용
  // 2. 그렇지 않으면 admin variant일 때만 true
  const shouldShowSidebar = showSidebar ?? (variant === 'admin');

  // variant별 전체 레이아웃 스타일
  const layoutStyles = {
    default: 'min-h-screen bg-white dark:bg-gray-900 flex flex-col',
    admin: 'min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col',
    auth: 'min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center',
    minimal: 'min-h-screen flex flex-col'
  };

  // variant별 메인 컨텐츠 영역 스타일
  const mainStyles = {
    default: 'flex-1 overflow-auto',
    admin: 'flex-1 overflow-auto p-6',
    auth: 'w-full max-w-md px-4',
    minimal: 'flex-1 overflow-auto'
  };

  // auth variant는 특별한 중앙 정렬 레이아웃
  if (variant === 'auth') {
    return (
      <div className={`${layoutStyles.auth} ${className || ''}`}>
        {showHeader && (headerSlot || <DefaultHeader variant={variant} />)}

        <main className={`flex-1 flex items-center justify-center p-4 ${mainStyles.auth}`}>
          {children}
        </main>

        {showFooter && (footerSlot || <DefaultFooter variant={variant} />)}
      </div>
    );
  }

  // 일반적인 레이아웃 (default, admin, minimal)
  return (
    <div className={`${layoutStyles[variant]} ${className || ''}`}>
      {/* Header */}
      {showHeader && (headerSlot || <DefaultHeader variant={variant} />)}

      {/* Body: Sidebar + Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {shouldShowSidebar && (sidebarSlot || <DefaultSidebar variant={variant} />)}

        {/* Main Content */}
        <main className={`${mainStyles[variant]} w-full`}>
          {children}
        </main>
      </div>

      {/* Footer */}
      {showFooter && (footerSlot || <DefaultFooter variant={variant} />)}
    </div>
  );
};
export default AppShell;
