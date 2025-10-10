/**
 * Description : page.tsx - 📌 ConnectWon 공간(룸) 관리 페이지
 * Author : Shiwoo Min
 * Date : 2025-10-12
 */
'use client';

import Room from './Room';

export default function RoomPage() {
  return (
    <div className="space-y-6">
      {/* 룸 목록 */}
      <Room />
    </div>
  );
}
