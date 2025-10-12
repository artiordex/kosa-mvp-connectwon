/**
 * Description : layout.tsx - 📌 공간 및 디바이스 예약 페이지 레이아웃
 * Author : Shiwoo Min
 * Date : 2025-10-12
 */

'use client';

import { Suspense } from 'react';
import type { ReactNode } from 'react';
import FacilitiesHero from './FacilitiesHero';
import FacilitiesSelector from './FacilitiesSelector';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="pt-20">
      {/* 헤더 영역 여백 확보 */}
      <FacilitiesHero />
      <FacilitiesSelector />
        <Suspense
          fallback={
            <div className="flex items-center justify-center text-gray-500 py-20">
              <i className="ri-loader-4-line animate-spin mr-2"></i>
              로딩 중...
            </div>
          }
        >
          {children}
        </Suspense>
      </div>
    </div>
  );
}
