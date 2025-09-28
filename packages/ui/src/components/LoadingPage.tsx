/**
 * Description : LoadingSpinner.tsx - 📌 재사용 가능한 스피너
 * Author : Shiwoo Min
 * Date : 2025-09-11
 */
import { type LoadingPageProps } from '@connectwon/ui/ui-types';
import { LoadingSpinner } from './LoadingSpinner.js';

// 로딩 페이지 컴포넌트
export function LoadingPage({
  title = '로딩 중...',
  description = '잠시만 기다려주세요',
  size = 'large',
  className = '',
}: LoadingPageProps) {
  return (
    <div className={`min-h-screen flex items-center justify-center bg-gray-50 ${className}`}>
      <div className="text-center">
        <LoadingSpinner size={size} className="mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
