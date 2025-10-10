/**
 * Description : page.tsx - 📌 ConnectWon 시설 관리 기본 진입 (자동 지점 관리로 이동)
 * Author : Shiwoo Min
 * Date : 2025-10-12
 */
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FacilitiesPage() {
  const router = useRouter();

  useEffect(() => {
    // 페이지 진입 시 /facilities/venues 로 자동 이동
    router.replace('/facilities/venues');
  }, [router]);

  return (
    <div className="flex items-center justify-center h-64 text-gray-500">
      <i className="ri-loader-4-line animate-spin text-2xl mr-2" />
      지점 관리 페이지로 이동 중...
    </div>
  );
}
