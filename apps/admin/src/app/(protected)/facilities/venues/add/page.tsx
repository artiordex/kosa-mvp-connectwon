/**
 * Description : page.tsx - 📍 ConnectWon 지점 추가 페이지
 * Author : Shiwoo Min
 * Date : 2025-10-12
 */
'use client';

import VenueAddForm from './VenueAddForm';

export default function AddVenuePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">새 지점 추가</h1>
          <p className="text-gray-600 mt-1">새로운 ConnectWon 지점을 등록합니다.</p>
        </div>
      </div>
      <VenueAddForm />
    </div>
  );
}
