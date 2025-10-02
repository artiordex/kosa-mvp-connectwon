'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

/* 글로벌 로딩 컴포넌트 */
export default function Loading() {
  const messages = ['데이터 불러오는 중...', 'AI 분석 준비 중...', '대시보드 구성 중...', '곧 완료됩니다 🚀'];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex(prev => (prev + 1) % messages.length);
    }, 3000); // 3초마다 메시지 변경
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="flex flex-col items-center space-y-8 animate-fade-in">
        {/* 로고 - 파란 원 안에 로고 */}
        <div className="w-32 h-32 rounded-full bg-blue-600 flex items-center justify-center shadow-2xl animate-bounce">
          <Image
            src="/images/logo.png"
            alt="ConnectWon Logo"
            width={240}
            height={240}
            className="object-contain"
          />
        </div>

        {/* 도트 스피너 */}
        <div className="flex space-x-3">
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.2s]"></div>
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.4s]"></div>
        </div>

        {/* 로딩 메시지 - 단계별 변경 */}
        <p className="text-lg text-gray-700 font-medium animate-pulse">{messages[currentMessageIndex]}</p>
      </div>
    </div>
  );
}
