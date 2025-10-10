/**
 * Description : page.tsx - ✏️ ConnectWon 장비 수정 페이지
 * Author : Shiwoo Min
 * Date : 2025-10-12
 */
'use client';

import EquipmentEditForm from './EquipmentEditForm';

export default function EditEquipmentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">장비 정보 수정</h1>
          <p className="text-gray-600 mt-1">선택한 장비의 정보를 수정합니다.</p>
        </div>
      </div>
      <EquipmentEditForm />
    </div>
  );
}
