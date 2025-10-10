/**
 * Description : page.tsx - 📌 ConnectWon 지점 관리 페이지 (리스트)
 * Author : Shiwoo Min
 * Date : 2025-10-12
 */
'use client';

import VenueList from './Venue';

export default function VenuePage() {
  return (
    <div className="space-y-6">
      {/* 지점 리스트 */}
      <VenueList />
    </div>
  );
}
