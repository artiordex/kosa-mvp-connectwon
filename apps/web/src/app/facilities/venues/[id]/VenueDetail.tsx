/**
 * Description : VenueDetail.tsx - 📌 지점 상세 페이지 (Venue + Room 통합)
 * Author : Shiwoo Min
 * Date : 2025-10-13
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import centersData from 'data/venues.json';
import roomsData from 'data/rooms-by-venue.json';

interface VenueDetailProps {
  id: number;
}

// 기본 이미지 생성 함수 (shapes 스타일)
const getDefaultImage = (title: string) => {
  const seed = encodeURIComponent(title);
  return `https://api.dicebear.com/7.x/shapes/svg?seed=${seed}`;
};

export default function VenueDetail({ id }: VenueDetailProps) {
  // 지점 기본 정보
  const venue = centersData.connectWonCenters.find((v) => v.id === id);
  // 해당 지점의 룸 정보
  const venueRooms = roomsData.venues.find((v) => v.id === id);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!venue) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        해당 지점 정보를 찾을 수 없습니다.
      </div>
    );
  }

  const { details, images, name, address } = venue;

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  // 룸 상태별 색상
  const getRoomStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'occupied':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoomStatusLabel = (status: string) => {
    switch (status) {
      case 'available':
        return '예약 가능';
      case 'occupied':
        return '사용중';
      default:
        return '알 수 없음';
    }
  };

  // 카테고리별 아이콘
  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'development':
        return 'ri-code-line';
      case 'meeting':
        return 'ri-group-line';
      case 'lounge':
        return 'ri-community-line';
      case 'relax':
        return 'ri-emotion-happy-line';
      case 'studio':
        return 'ri-camera-line';
      case 'workspace':
        return 'ri-briefcase-line';
      case 'education':
        return 'ri-book-line';
      default:
        return 'ri-door-line';
    }
  };

  // 필터링된 룸 목록
  const filteredCategories = venueRooms?.categories.filter(
    (cat) => selectedCategory === 'all' || cat.type === selectedCategory
  );

  // 전체 룸 수 계산
  const totalRooms = venueRooms?.categories.reduce((acc, cat) => acc + cat.rooms.length, 0) || 0;
  const availableRooms = venueRooms?.categories.reduce(
    (acc, cat) => acc + cat.rooms.filter((r) => r.status === 'available').length,
    0
  ) || 0;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          {/* 헤더 섹션 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{name}</h1>
            <p className="text-lg text-gray-600 flex items-center">
              <i className="ri-map-pin-line mr-2 text-gray-500"></i>
              {address}
            </p>
          </div>

          {/* 지점 기본 정보 */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* 이미지 갤러리 */}
              <div>
                <div className="relative mb-4">
                  <img
                    src={
                      images && images.length > 0
                        ? images[currentImageIndex]
                        : getDefaultImage(name)
                    }
                    alt={details.centerName}
                    className="w-full h-80 object-cover rounded-xl"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.src = getDefaultImage(name);
                    }}
                  />
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                      >
                        <i className="ri-arrow-left-line text-gray-800"></i>
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                      >
                        <i className="ri-arrow-right-line text-gray-800"></i>
                      </button>
                    </>
                  )}
                </div>

                {images.length > 1 && (
                  <div className="flex space-x-2 justify-center">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          idx === currentImageIndex ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* 상세 정보 */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-blue-600 mb-1">지점 규모</p>
                    <p className="text-xl font-bold text-blue-900">{details.capacityArea}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-sm text-green-600 mb-1">독립공간</p>
                    <p className="text-xl font-bold text-green-900">{details.independentRooms}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                    <i className="ri-time-line mr-2 text-gray-500"></i>
                    운영시간
                  </h3>
                  <p className="text-gray-700">{details.operatingHours}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                    <i className="ri-phone-line mr-2 text-gray-500"></i>
                    연락처
                  </h3>
                  <p className="text-gray-700">
                    {details.phone} /{' '}
                    <a
                      href={`mailto:${details.email}`}
                      className="text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      {details.email}
                    </a>
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <i className="ri-star-line mr-2 text-gray-500"></i>
                    주요 시설
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {details.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-gray-700">
                        <i className="ri-checkbox-circle-fill text-green-500 mr-2"></i>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <i className="ri-car-line mr-2 text-gray-500"></i>
                    주차
                  </h3>
                  <p className="text-gray-700 flex items-center">
                    <i className="ri-parking-box-line mr-2 text-gray-500"></i>
                    {details.parking}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 지도 및 위치 정보 */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <i className="ri-map-pin-line mr-2 text-gray-500"></i>
              오시는 길
            </h2>

            <div className="mb-6">
              <div className="flex items-start space-x-2 text-gray-700 mb-4">
                <i className="ri-map-pin-fill text-gray-500 mt-1"></i>
                <div>
                  <p className="font-medium text-gray-900 mb-1">주소</p>
                  <p>{address}</p>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="rounded-xl overflow-hidden border border-gray-200 mb-6">
              <div className="h-96">
                <iframe
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* 교통편 안내 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <i className="ri-subway-line mr-2 text-blue-600"></i>
                  대중교통
                </h3>
                <div className="space-y-2">
                  {details.transportation.map((t, i) => (
                    <p key={i} className="text-sm text-gray-700 flex items-start">
                      <i className="ri-arrow-right-s-line mr-1 mt-0.5 text-blue-600"></i>
                      {t}
                    </p>
                  ))}
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <i className="ri-car-line mr-2 text-green-600"></i>
                  주차 안내
                </h3>
                <p className="text-sm text-gray-700 flex items-start">
                  <i className="ri-parking-box-line mr-2 mt-0.5 text-green-600"></i>
                  {details.parking}
                </p>
              </div>
            </div>
          </div>

          {/* 룸 정보 섹션 */}
          {venueRooms && (
            <div>
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">공간 정보</h2>
                    <p className="text-gray-600">이용 가능한 공간을 확인하고 예약하세요</p>
                  </div>
                  <div className="flex space-x-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-500">전체 공간</p>
                      <p className="text-2xl font-bold text-gray-900">{totalRooms}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">예약 가능</p>
                      <p className="text-2xl font-bold text-green-600">{availableRooms}</p>
                    </div>
                  </div>
                </div>

                {/* 카테고리 필터 */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <i className="ri-grid-line mr-2"></i>
                    전체
                  </button>
                  {venueRooms.categories.map((cat) => (
                    <button
                      key={cat.type}
                      onClick={() => setSelectedCategory(cat.type)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedCategory === cat.type
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <i className={`${getCategoryIcon(cat.type)} mr-2`}></i>
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 룸 카드 리스트 */}
              <div className="space-y-8">
                {filteredCategories?.map((category) => (
                  <div key={category.type}>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <i className={`${getCategoryIcon(category.type)} mr-3 text-gray-500`}></i>
                      {category.label}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.rooms.map((room) => (
                        <div
                          key={room.id}
                          className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                        >
                          <div className="relative h-48 bg-gray-200">
                            <img
                              src={
                                room.thumbnail && room.thumbnail.trim() !== ''
                                  ? room.thumbnail
                                  : getDefaultImage(room.name)
                              }
                              alt={room.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.currentTarget as HTMLImageElement;
                                target.src = getDefaultImage(room.name);
                              }}
                            />
                            <div className="absolute top-3 right-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoomStatusColor(room.status)}`}>
                                {getRoomStatusLabel(room.status)}
                              </span>
                            </div>
                          </div>
                          <div className="p-4">
                            <h4 className="font-semibold text-gray-900 mb-2">{room.name}</h4>
                            <div className="space-y-2 text-sm text-gray-600 mb-4">
                              <p className="flex items-center">
                                <i className="ri-group-line mr-2 text-gray-400"></i>
                                최대 {room.capacity}명
                              </p>
                              <p className="flex items-center">
                                <i className="ri-money-dollar-circle-line mr-2 text-gray-400"></i>
                                {room.hourlyRate > 0 ? `${room.hourlyRate.toLocaleString()}원/시간` : '무료'}
                              </p>
                            </div>
                            <Link
                              href={`/facilities/venues/${id}/rooms/${room.id}`}
                              className="w-full block text-center py-2 rounded-lg font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700"
                            >
                              자세히 보기
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA 버튼 */}
          <div className="text-center mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/venues"
              className="inline-flex items-center px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors"
            >
              <i className="ri-arrow-left-line mr-2"></i>
              다른 지점 보기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
