/**
 * Description : error.ts - 📌 error
 * Author : Shiwoo Min
 * Date : 2025-09-11
 */
'use client';
import { useEffect } from 'react';
import { ErrorPage } from '../components/ErrorPage.js';

// 글로벌 에러 페이지 컴포넌트
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string; statusCode?: number };
  reset: () => void;
}) {
  useEffect(() => {
    // 에러 로깅 (각 앱에서 커스터마이징 가능)
    console.error('Global Error:', {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
      statusCode: error.statusCode,
      timestamp: new Date().toISOString(),
    });

    // 필요시 외부 에러 모니터링 서비스로 전송
    // logErrorToService(error);
  }, [error]);

  // HTTP 상태 코드에 따른 에러 타입 결정
  const getErrorType = (error: Error & { statusCode?: number }) => {
    const statusCode = error.statusCode || 500;
    if (statusCode === 404) return '404';
    if (statusCode === 403) return '403';
    if (statusCode === 405) return '405';
    if (statusCode >= 500) return '500';
    if (statusCode >= 400) return '400';
    return '500'; // 기본값
  };
  const errorType = getErrorType(error);
  return (
    <html>
      <body>
        <ErrorPage type={errorType} error={error} onRetry={reset} />
      </body>
    </html>
  );
}
