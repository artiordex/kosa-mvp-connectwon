/**
 * Description : Venue.tsx - 📌 ConnectWon 지점 관리 리스트
 * Author : Shiwoo Min
 * Date : 2025-10-12
 */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import venueData from 'data/venues.json';

// venues.json 데이터 타입 정의
interface Venue {
  id: number;
  name: string;
  address: string;
  description: string;
  roomCount: number;
  capacity: number;
  rating: number;
  thumbnail: string;
  details: {
    phone: string;
    email: string;
    location: string;
    color: string;
  };
}

export default function VenueList() {
  // 바로 JSON에서 데이터 로드
  const [search, setSearch] = useState('');

  const venues: Venue[] = (venueData as any).connectWonCenters || [];

  const filtered = venues.filter(
    (v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* 검색 영역 */}
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">지점 목록</h2>
        <div className="relative">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input
            type="text"
            placeholder="지점명 또는 주소 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* 카드형 리스트 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {filtered.map((v) => (
          <div
            key={v.id}
            className={`border rounded-xl shadow-sm hover:shadow-md transition overflow-hidden ${v.details.color}`}
          >
            <div className="relative w-full h-40 overflow-hidden">
              <img src={v.thumbnail} alt={v.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                {v.roomCount}개 공간
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-900">{v.name}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{v.description}</p>

              <div className="mt-3 text-sm text-gray-700">
                <p>
                  <i className="ri-map-pin-line mr-1"></i>
                  {v.address}
                </p>
                <p>
                  <i className="ri-phone-line mr-1"></i>
                  {v.details.phone}
                </p>
              </div>

              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500">
                  ⭐ {v.rating.toFixed(1)} / {v.capacity}명 수용
                </span>
                <Link
                  href={{ pathname: `/facilities/venues/${v.id}` }}
                  className="text-blue-600 text-sm font-medium hover:underline hover:text-blue-700 transition-colors"
                  prefetch={true}
                >
                  상세보기 <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          <i className="ri-building-line text-3xl mb-2 block"></i>
          검색된 지점이 없습니다.
        </div>
      )}
    </div>
  );
}
