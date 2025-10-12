/**
 * Description : page.tsx - 📌 장비 목록 / 대여 페이지
 * Author : Shiwoo Min
 * Date : 2025-10-13
 */

'use client';

import EquipmentSection from './Equipment';

export default function EquipmentPage() {
  return (
    <div className="min-h-screen">
      {/* 장비 검색 / 필터 */}
      <EquipmentSection />
    </div>
  );
}
