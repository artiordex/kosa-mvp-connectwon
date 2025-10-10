/**
 * Description : page.tsx - 📌 ConnectWon 디바이스 및 시설장비 관리 페이지
 * Author : Shiwoo Min
 * Date : 2025-10-12
 */
'use client';

import Equipment from './Equipment';

export default function RoomPage() {
  return (
    <div className="space-y-6">
      {/* 장비 목록 */}
      <Equipment />
    </div>
  );
}
