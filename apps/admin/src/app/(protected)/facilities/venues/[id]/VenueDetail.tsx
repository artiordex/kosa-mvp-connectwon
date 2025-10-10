/**
 * Description : VenueDetail.tsx - 📌 ConnectWon 지점 상세 정보 (카드 내 표시용)
 * Author : Shiwoo Min
 * Date : 2025-10-12
 */
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import venueData from 'data/venues.json';

interface Venue {
  id: number;
  name: string;
  address: string;
  description: string;
  thumbnail: string;
  images: string[];
  capacity: number;
  roomCount: number;
  rating: number;
  reviewCount: number;
  status: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  details: {
    centerName: string;
    location: string;
    capacityArea: string;
    independentRooms: string;
    features: string[];
    color: string;
    phone: string;
    email: string;
    operatingHours: string;
    parking: string;
    transportation: string[];
    image: string;
  };
}

export default function VenueDetailCard() {
  const params = useParams();
  const venueId = Number(params?.['id']);
  const [venue, setVenue] = useState<Venue | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    const found = (venueData as any).connectWonCenters.find((v: any) => v.id === venueId);
    if (found) {
      const venueWithImages = { ...found, images: found.images || [] };
      setVenue(venueWithImages);
      setSelectedImage(venueWithImages.thumbnail);
    }
  }, [venueId]);

  if (!venue)
    return (
      <div className="text-center text-gray-500 py-12">
        <i className="ri-error-warning-line text-3xl text-gray-400 mb-2 block" />
        해당 지점을 찾을 수 없습니다.
      </div>
    );

  const d = venue.details;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(d.location)}&output=embed`;

  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
      {/* 상단 헤더 */}
      <div className="flex items-center justify-between p-5 border-b bg-gray-50">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">{venue.name}</h1>
          <p className="text-gray-600 text-sm">{venue.address}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => history.back()}
            className="text-sm px-3 py-1.5 border rounded-lg text-gray-600 hover:bg-gray-100"
          >
            <i className="ri-arrow-left-line mr-1"></i> 목록
          </button>
          <Link
            href={`/facilities/venues/${venue.id}/edit`}
            className="text-sm px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <i className="ri-edit-line mr-1"></i> 수정
          </Link>
        </div>
      </div>

      {/* 이미지 */}
      <div className="relative">
        <img
          src={selectedImage}
          alt={venue.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
          <h2 className="text-lg font-semibold">{d.centerName}</h2>
          <p className="text-xs">{d.location}</p>
        </div>
      </div>

      {/* 기본 정보 */}
      <div className="p-5 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4 text-gray-700">
          <Info label="위치" value={d.location} />
          <Info label="면적" value={d.capacityArea} />
          <Info label="독립공간" value={d.independentRooms} />
          <Info label="수용 인원" value={`${venue.capacity}명`} />
          <Info label="운영 시간" value={d.operatingHours} />
          <Info label="주차" value={d.parking} />
          <Info label="전화번호" value={d.phone} />
          <Info label="이메일" value={d.email} />
        </div>
      </div>

      {/* 지도 */}
      <div className="p-5 border-t">
        <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center">
          <i className="ri-map-pin-line mr-2 text-blue-600"></i>
          오시는 길
        </h3>
        <div className="rounded-lg overflow-hidden border border-gray-200">
          <iframe
            src={mapSrc}
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* 시설, 교통 */}
      <div className="p-5 border-t grid sm:grid-cols-2 gap-6">
        <Section title="보유 시설" icon="ri-building-line" items={d.features} />
        <Section title="교통 정보" icon="ri-bus-line" items={d.transportation} />
      </div>

      {/* 푸터 */}
      <div className="px-5 py-3 border-t text-sm text-gray-500 bg-gray-50">
        등록일: {new Date(venue.createdAt).toLocaleDateString()} / 최근 수정:{' '}
        {new Date(venue.updatedAt).toLocaleDateString()}
      </div>
    </div>
  );
}

// 공통 Info 컴포넌트
function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium text-gray-900 text-sm">{value}</p>
    </div>
  );
}

// 공통 Section 컴포넌트
function Section({ title, icon, items }: { title: string; icon: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-base font-semibold text-gray-900 mb-2 flex items-center">
        <i className={`${icon} mr-2 text-blue-600`}></i>
        {title}
      </h4>
      <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
