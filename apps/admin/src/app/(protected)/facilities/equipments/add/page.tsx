/**
 * Description : page.tsx - 📦 ConnectWon 장비 추가 페이지
 * Author : Shiwoo Min
 * Date : 2025-10-12
 */
'use client';

import EquipmentAddForm from './EquipmentAddForm';

export default function AddEquipmentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">새 장비 추가</h1>
          <p className="text-gray-600 mt-1">새로운 장비(Equipment)를 등록합니다.</p>
        </div>
      </div>
      <EquipmentAddForm />
    </div>
  );
}
