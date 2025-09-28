/**
 * Description : EmptyState.tsx - 📌 빈 상태 페이지
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */
import { type EmptyStateProps } from '@connectwon/ui/ui-types';

// 빈 상태 페이지 컴포넌트
export function EmptyState({
  icon,
  title = '데이터가 없습니다',
  description = '표시할 내용이 없습니다.',
  action,
  className = '',
}: EmptyStateProps) {
  const defaultIcon = (
    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
      />
    </svg>
  );

  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      {/* 아이콘 */}
      <div className="mb-4">{icon || defaultIcon}</div>

      {/* 제목 */}
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>

      {/* 설명 */}
      <p className="text-gray-500 mb-6 max-w-sm">{description}</p>

      {/* 액션 버튼 */}
      {action && (
        <button
          onClick={action.onClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
