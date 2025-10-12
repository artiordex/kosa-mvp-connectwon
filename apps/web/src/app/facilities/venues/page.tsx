/**
 * Description : page.tsx - 📌 지점 목록 페이지
 * Author : Shiwoo Min
 * Date : 2025-10-10
 */

'use client';

import Link from 'next/link';
import venuesData from 'data/venues.json';

export default function VenuesListPage() {
  const venues = venuesData.connectWonCenters;

  return (
    <div className="pt-20 max-w-[90rem] mx-auto px-6 md:px-12 pb-20">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">공간 소개</h1>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
          <span className="block">청년 창업가들의 꿈과 희망을 키우는</span>
          <span className="block mt-2">
            <strong className="text-orange-600">커넥트원</strong> <strong>공간</strong> 입니다.
          </span>
        </p>
        <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
          커넥트원은 국내 총 {venues.length}개 지점으로 이루어져 있으며, 서울지역 2개, 광명지역 1개의 지점을 운영 중에 있습니다.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {venues.map((venue) => (
          <Link key={venue.id} href={`/facilities/venues/${venue.id}`} className="group">
            <div className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={venue.thumbnail}
                  alt={venue.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{venue.details.centerName}</h3>
                  <p className="text-sm opacity-90">{venue.details.location}</p>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>공간규모</span>
                    <span className="font-medium text-gray-900">{venue.details.capacityArea}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>업무공간</span>
                    <span className="font-medium text-gray-900">{venue.details.independentRooms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>운영시간</span>
                    <span className="font-medium text-gray-900">{venue.details.operatingHours}</span>
                  </div>
                </div>
                <div className="mt-4 text-orange-600 font-medium text-sm flex items-center group-hover:text-orange-700">
                  자세히 보기
                  <i className="ri-arrow-right-line ml-2 w-4 h-4 flex items-center justify-center"></i>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
