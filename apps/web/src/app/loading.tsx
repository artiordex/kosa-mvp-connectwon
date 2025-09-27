'use client';

/**
 * Next.js 스타일 웹사이트 전역 로딩 페이지
 * 간결하고 성능에 최적화된 로딩 화면을 제공합니다.
 *
 * @returns {JSX.Element} 웹 로딩 페이지
 */
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center space-y-4">
        {/* 로딩 스피너 */}
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>

        {/* 로딩 텍스트 */}
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  );
}
