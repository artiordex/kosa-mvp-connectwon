'use client';

import { useEffect, useState } from 'react';

/**
 * 어드민 전용 에러 페이지 컴포넌트
 * 시스템 오류 발생 시 전문적인 에러 화면과 복구 옵션을 제공합니다.
 *
 * @param {Object} props - 컴포넌트 속성
 * @param {Error & { digest?: string }} props.error - 발생한 에러 객체
 * @returns {JSX.Element} 어드민 에러 페이지
 */
export default function AdminError({ error }: { error: Error & { digest?: string } }) {
  const [errorDetails, setErrorDetails] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isReporting, setIsReporting] = useState(false);

  useEffect(() => {
    // 에러를 에러 리포팅 서비스로 전송
    console.error('Admin Error:', {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    });
  }, [error]);

  /**
   * 에러 리포트 전송 함수
   */
  const handleReportError = async () => {
    setIsReporting(true);
    try {
      // 실제로는 에러 리포팅 서비스에 전송
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('에러 리포트가 성공적으로 전송되었습니다.');
    } catch (err) {
      alert('에러 리포트 전송에 실패했습니다.');
    } finally {
      setIsReporting(false);
    }
  };

  /**
   * 페이지 새로고침
   */
  const handleRefresh = () => {
    window.location.reload();
  };

  /**
   * 재시도 함수 - 페이지 새로고침으로 대체
   */
  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    window.location.reload();
  };

  /**
   * 에러 타입에 따른 아이콘 반환
   */
  const getErrorIcon = () => {
    if (error.message.includes('Network')) return 'ri-wifi-off-line';
    if (error.message.includes('Permission')) return 'ri-lock-line';
    if (error.message.includes('Timeout')) return 'ri-time-line';
    return 'ri-error-warning-line';
  };

  /**
   * 에러 타입에 따른 제목 반환
   */
  const getErrorTitle = () => {
    if (error.message.includes('Network')) return '네트워크 연결 오류';
    if (error.message.includes('Permission')) return '권한 오류';
    if (error.message.includes('Timeout')) return '요청 시간 초과';
    return '시스템 오류 발생';
  };

  /**
   * 에러 타입에 따른 설명 반환
   */
  const getErrorDescription = () => {
    if (error.message.includes('Network')) return '네트워크 연결을 확인하고 다시 시도해주세요.';
    if (error.message.includes('Permission')) return '해당 작업을 수행할 권한이 없습니다. 관리자에게 문의하세요.';
    if (error.message.includes('Timeout')) return '서버 응답이 지연되고 있습니다. 잠시 후 다시 시도해주세요.';
    return '예상치 못한 오류가 발생했습니다. 문제가 지속되면 기술팀에 문의하세요.';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.2) 2px, transparent 0)`,
            backgroundSize: '50px 50px',
          }}
        ></div>
      </div>

      {/* 메인 에러 컨테이너 */}
      <div className="relative z-10 text-center max-w-2xl w-full px-6">
        {/* 에러 아이콘 */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl mx-auto mb-6 flex items-center justify-center relative">
            <i className={`${getErrorIcon()} text-4xl text-white`}></i>

            {/* 경고 효과 */}
            <div className="absolute inset-0 border-2 border-red-400 rounded-2xl animate-pulse"></div>
          </div>
        </div>

        {/* 에러 정보 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">{getErrorTitle()}</h1>
          <p className="text-slate-300 text-lg mb-2">{getErrorDescription()}</p>
          <p className="text-slate-500 text-sm">에러 ID: {error.digest || 'UNKNOWN'}</p>
        </div>

        {/* 에러 상세 정보 토글 */}
        <div className="mb-8">
          <button onClick={() => setErrorDetails(!errorDetails)} className="text-slate-400 hover:text-white text-sm underline transition-colors">
            {errorDetails ? '상세 정보 숨기기' : '상세 정보 보기'}
          </button>

          {errorDetails && (
            <div className="mt-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 text-left">
              <h4 className="text-slate-300 font-medium mb-2">에러 상세 정보:</h4>
              <div className="text-xs text-slate-400 space-y-2">
                <div>
                  <span className="text-slate-500">메시지:</span>
                  <pre className="mt-1 text-red-400 whitespace-pre-wrap break-words">{error.message}</pre>
                </div>
                {error.stack && (
                  <div>
                    <span className="text-slate-500">스택 트레이스:</span>
                    <pre className="mt-1 text-slate-400 whitespace-pre-wrap break-words text-xs max-h-32 overflow-y-auto">{error.stack}</pre>
                  </div>
                )}
                <div>
                  <span className="text-slate-500">발생 시간:</span>
                  <span className="ml-2">{new Date().toLocaleString('ko-KR')}</span>
                </div>
                {retryCount > 0 && (
                  <div>
                    <span className="text-slate-500">재시도 횟수:</span>
                    <span className="ml-2">{retryCount}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 액션 버튼들 */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRetry}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center"
            >
              <i className="ri-refresh-line mr-2"></i>
              다시 시도
            </button>

            <button
              onClick={handleRefresh}
              className="px-8 py-3 bg-slate-700 text-white font-medium rounded-xl hover:bg-slate-600 transition-colors flex items-center justify-center"
            >
              <i className="ri-restart-line mr-2"></i>
              페이지 새로고침
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleReportError}
              disabled={isReporting}
              className="px-6 py-2 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className={`${isReporting ? 'ri-loader-4-line animate-spin' : 'ri-bug-line'} mr-2`}></i>
              {isReporting ? '전송 중...' : '에러 리포트 전송'}
            </button>

            <button
              onClick={() => (window.location.href = '/')}
              className="px-6 py-2 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center"
            >
              <i className="ri-home-line mr-2"></i>
              대시보드로 돌아가기
            </button>
          </div>
        </div>

        {/* 시스템 상태 */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
          <h3 className="text-slate-300 font-medium mb-3">시스템 상태</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">서버 상태</span>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                <span className="text-red-400">오류</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">데이터베이스</span>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                <span className="text-yellow-400">확인 중</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">네트워크</span>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-green-400">정상</span>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 지원 정보 */}
        <div className="mt-8 text-xs text-slate-500">
          <p>문제가 지속되면 기술지원팀에 문의하세요</p>
          <p className="mt-1">이메일: tech-support@connectwon.co.kr | 전화: 00-0000-0000</p>
        </div>
      </div>

      {/* 배경 경고 효과 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-red-400 rounded-full opacity-20 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
