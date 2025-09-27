'use client';

import { useEffect, useState } from 'react';

/**
 * 어드민 전용 로딩 페이지 컴포넌트
 * 데이터 로딩 중 표시되는 전문적인 로딩 화면을 제공합니다.
 *
 * @returns {JSX.Element} 어드민 로딩 페이지
 */
export default function AdminLoading() {
  const [loadingText, setLoadingText] = useState('시스템 초기화 중');
  const [progress, setProgress] = useState(0);
  const loadingSteps = ['시스템 초기화 중', '데이터베이스 연결 중', '사용자 권한 확인 중', '대시보드 데이터 로딩 중', '컴포넌트 렌더링 중'];

  useEffect(() => {
    let currentStep = 0;
    let progressValue = 0;

    const progressInterval = setInterval(() => {
      progressValue += 2;
      setProgress(progressValue);

      // 단계별 텍스트 변경
      if (progressValue >= 20 && currentStep < 1) {
        setLoadingText(loadingSteps[1] || '데이터베이스 연결 중');
        currentStep = 1;
      } else if (progressValue >= 40 && currentStep < 2) {
        setLoadingText(loadingSteps[2] || '사용자 권한 확인 중');
        currentStep = 2;
      } else if (progressValue >= 60 && currentStep < 3) {
        setLoadingText(loadingSteps[3] || '대시보드 데이터 로딩 중');
        currentStep = 3;
      } else if (progressValue >= 80 && currentStep < 4) {
        setLoadingText(loadingSteps[4] || '컴포넌트 렌더링 중');
        currentStep = 4;
      }

      if (progressValue >= 100) {
        clearInterval(progressInterval);
      }
    }, 100);

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.2) 2px, transparent 0)`,
            backgroundSize: '50px 50px',
          }}
        ></div>
      </div>

      {/* 메인 로딩 컨테이너 */}
      <div className="relative z-10 text-center max-w-md w-full px-6">
        {/* 로고 영역 */}
        <div className="mb-12">
          <div className="relative">
            {/* 메인 로고 아이콘 */}
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center relative">
              <i className="ri-admin-line text-3xl text-white"></i>

              {/* 회전하는 테두리 */}
              <div className="absolute inset-0 border-2 border-transparent border-t-blue-400 border-r-purple-400 rounded-2xl animate-spin"></div>
            </div>

            {/* 회사명 */}
            <h1 className="text-2xl font-bold text-white mb-2">ConnectOne</h1>
            <p className="text-slate-400 text-sm">Admin Dashboard</p>
          </div>
        </div>

        {/* 로딩 스피너 */}
        <div className="mb-8">
          <div className="relative w-16 h-16 mx-auto mb-6">
            {/* 외부 링 */}
            <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>

            {/* 내부 회전 링 */}
            <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin"></div>

            {/* 중앙 점 */}
            <div className="absolute inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* 로딩 텍스트 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-2 animate-pulse">{loadingText}</h2>
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>

        {/* 프로그레스 바 */}
        <div className="mb-8">
          <div className="bg-slate-700 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              {/* 프로그레스 바 글로우 효과 */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-75 animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-slate-400 mt-2">
            <span>0%</span>
            <span className="font-medium text-white">{progress}%</span>
            <span>100%</span>
          </div>
        </div>

        {/* 시스템 상태 */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-slate-300">시스템 상태</span>
            </div>
            <span className="text-green-400 font-medium">정상</span>
          </div>

          <div className="flex items-center justify-between text-sm mt-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-slate-300">서버 연결</span>
            </div>
            <span className="text-blue-400 font-medium">연결됨</span>
          </div>

          <div className="flex items-center justify-between text-sm mt-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-slate-300">권한 확인</span>
            </div>
            <span className="text-purple-400 font-medium">인증됨</span>
          </div>
        </div>

        {/* 하단 정보 */}
        <div className="mt-8 text-xs text-slate-500">
          <p>관리자 전용 시스템</p>
          <p className="mt-1">버전 1.0.0 | 빌드 2024.12</p>
        </div>
      </div>

      {/* 배경 입자 효과 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
