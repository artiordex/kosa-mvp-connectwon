/**
 * Description : page.tsx - 📌 ConnectWon 지점 수정 페이지
 * Author : Shiwoo Min
 * Date : 2025-10-12
 */
'use client';

import VenueEditForm from './VenueEditForm';

export default function EditVenuePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">지점 정보 수정</h1>
          <p className="text-gray-600 mt-1">선택된 지점의 정보를 편집합니다.</p>
        </div>
      </div>
      <VenueEditForm />
    </div>
  );
}
