/**
 * Description : ErrorPage.tsx - 📌 범용 에러 페이지
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */
import { type ErrorPageProps } from '../ui-types.js';

// 범용 에러 페이지 컴포넌트
export function ErrorPage({
  type = '500',
  title,
  description,
  onRetry,
  onHome,
  className = '',
}: ErrorPageProps) {
  const errorConfig = {
    '404': {
      title: '페이지를 찾을 수 없습니다',
      description: '요청하신 페이지가 존재하지 않거나 이동되었습니다.',
      showRetry: false,
      showHome: true,
    },
    '403': {
      title: '접근 권한이 없습니다',
      description: '이 페이지에 접근할 권한이 없습니다.',
      showRetry: false,
      showHome: true,
    },
    '405': {
      title: '허용되지 않는 요청입니다',
      description: '요청하신 방법이 허용되지 않습니다.',
      showRetry: true,
      showHome: true,
    },
    '400': {
      title: '잘못된 요청입니다',
      description: '요청이 올바르지 않습니다. 다시 시도해주세요.',
      showRetry: true,
      showHome: true,
    },
    '500': {
      title: '서버 오류가 발생했습니다',
      description: '일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      showRetry: true,
      showHome: true,
    },
  };

  const config = errorConfig[type];
  const finalTitle = title || config.title;
  const finalDescription = description || config.description;

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gray-50 ${className}`}>
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* 에러 아이콘 */}
        <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        {/* 에러 코드 */}
        <div className="text-6xl font-bold text-gray-300 mb-4">{type}</div>

        {/* 에러 제목 */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{finalTitle}</h1>

        {/* 에러 설명 */}
        <p className="text-gray-600 mb-8">{finalDescription}</p>

        {/* 액션 버튼들 */}
        <div className="space-y-3">
          {config.showRetry && onRetry && (
            <button
              onClick={onRetry}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              다시 시도
            </button>
          )}

          {config.showHome && (
            <button
              onClick={onHome || (() => (window.location.href = '/'))}
              className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors"
            >
              홈으로 이동
            </button>
          )}

          <button
            onClick={() => window.history.back()}
            className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
          >
            이전 페이지
          </button>
        </div>
      </div>
    </div>
  );
}
