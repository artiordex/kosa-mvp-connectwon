/**
 * Description : FacilitiesSection.tsx - 📌 ConnectWon 공간 및 시설 섹션
 * Author : Shiwoo Min
 * Date : 2025-10-13
 */

'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import roomsData from 'data/rooms-by-venue.json';
import equipmentData from 'data/equipment-with-venues.json';

/**
 * 공간 데이터 타입 정의
 */
interface Room {
  id: number;
  name: string;
  capacity: number;
  status: string;
  hourlyRate: number;
  thumbnail: string;
}

/**
 * 장비 데이터 타입 정의
 */
interface Equipment {
  id: number;
  name: string;
  category: string;
  brand: string;
  model: string;
  rentalPrice: number;
  depositPrice: number;
  status: string;
  thumbnail: string;
  venueName: string;
  quantity: number;
  availableQuantity: number;
}

type TabType = 'rooms' | 'equipment';

/**
 * 안정적인 기본 이미지 URL 생성기 (DiceBear 기반)
 */
const getDefaultImage = (title: string) => {
  const seed = encodeURIComponent(title);
  return `https://api.dicebear.com/7.x/shapes/png?seed=${seed}`;
};

/**
 * 커넥트원 공간 및 디바이스 섹션 컴포넌트
 *
 * @returns {JSX.Element} 공간 및 디바이스 섹션
 */
export default function RoomSection() {
  const [activeTab, setActiveTab] = useState<TabType>('rooms');

  // 모든 venue의 rooms를 하나의 배열로 합치기
  const allRooms: Room[] = useMemo(() => {
    const rooms: Room[] = [];
    roomsData.venues.forEach((venue) => {
      venue.categories.forEach((category) => {
        category.rooms.forEach((room) => {
          rooms.push(room);
        });
      });
    });
    return rooms;
  }, []);

  // 랜덤으로 5개의 공간 선택
  const randomRooms = useMemo(() => {
    const shuffled = [...allRooms].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  }, [allRooms]);

  // 랜덤으로 5개의 장비 선택
  const randomEquipment = useMemo(() => {
    const shuffled = [...equipmentData].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  }, []);

  /**
   * 상태에 따른 스타일을 반환합니다.
   */
  const getStatusStyle = (status: string): string => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'occupied':
        return 'bg-red-100 text-red-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  /**
   * 상태 텍스트를 반환합니다.
   */
  const getStatusText = (status: string): string => {
    const statusMap: { [key: string]: string } = {
      available: '이용 가능',
      occupied: '사용 중',
      active: '대여 가능',
    };
    return statusMap[status] || status;
  };

  /**
   * 카테고리 한글명을 반환합니다.
   */
  const getCategoryLabel = (category: string): string => {
    const categoryMap: { [key: string]: string } = {
      projector: '빔프로젝터',
      laptop: '노트북',
      adapter: '충전 어댑터',
      cable: '케이블',
      microphone: '마이크',
      speaker: '스피커',
      camera: '카메라',
      webcam: '웹캠',
      tripod: '삼각대',
      lighting: '조명',
      whiteboard: '화이트보드',
      tablet: '태블릿',
      monitor: '모니터',
    };
    return categoryMap[category] || category;
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="w-[90%] max-w-none mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더와 탭을 나란히 배치 */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-blue-600 font-semibold text-lg">커넥트원 공간 및 디바이스</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2">커넥트원의 공간 및 디바이스를 확인하세요</h2>
          </div>

          {/* 탭 네비게이션 */}
          <div className="flex gap-1 border-b-2 border-gray-200">
            <button
              onClick={() => setActiveTab('rooms')}
              className={`px-6 py-3 font-medium transition-all ${
                activeTab === 'rooms'
                  ? 'text-blue-600 border-b-2 border-blue-600 -mb-0.5'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              공간
            </button>
            <button
              onClick={() => setActiveTab('equipment')}
              className={`px-6 py-3 font-medium transition-all ${
                activeTab === 'equipment'
                  ? 'text-blue-600 border-b-2 border-blue-600 -mb-0.5'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              장비
            </button>
          </div>
        </div>

        {/* 공간 탭 */}
        {activeTab === 'rooms' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {randomRooms.map((room: Room) => (
              <Link key={room.id} href={`/facilities/venues`} className="group">
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group-hover:scale-[1.02]">
                  <div className="relative">
                    <img
                      src={room.thumbnail}
                      alt={room.name}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = getDefaultImage(room.name);
                      }}
                      className="w-full h-48 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>

                    {/* 타입 뱃지 */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                        <i className="ri-building-line mr-1 w-3 h-3 flex items-center justify-center"></i>
                        공간
                      </span>
                    </div>

                    {/* 상태 뱃지 */}
                    <div className="absolute top-3 right-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusStyle(room.status)}`}>
                        {getStatusText(room.status)}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 leading-tight group-hover:text-blue-600 transition-colors flex-1">
                        {room.name}
                      </h3>
                      <div className="ml-2 text-right flex-shrink-0">
                        <div className="text-sm font-bold text-blue-600">
                          {room.hourlyRate === 0 ? '무료' : `${room.hourlyRate.toLocaleString()}원`}
                        </div>
                        {room.hourlyRate > 0 && <div className="text-xs text-gray-500">/ 시간</div>}
                      </div>
                    </div>

                    {/* 수용인원 */}
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <i className="ri-group-line mr-1 w-4 h-4 flex items-center justify-center"></i>
                      최대 {room.capacity}명
                    </div>
                  </div>

                  {/* 하단 액션 영역 */}
                  <div className="px-6 pb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-blue-600 font-medium group-hover:underline">
                        {room.status === 'available' ? '예약하기' : '자세히 보기'}
                      </span>
                      <i className="ri-arrow-right-line text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"></i>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* 장비 탭 */}
        {activeTab === 'equipment' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {randomEquipment.map((equipment: Equipment) => (
              <Link key={equipment.id} href={`/facilities/equipments`} className="group">
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group-hover:scale-[1.02]">
                  <div className="relative">
                    <img
                      src={equipment.thumbnail}
                      alt={equipment.name}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = getDefaultImage(equipment.name);
                      }}
                      className="w-full h-48 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>

                    {/* 타입 뱃지 */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                        <i className="ri-computer-line mr-1 w-3 h-3 flex items-center justify-center"></i>
                        장비
                      </span>
                    </div>

                    {/* 상태 뱃지 */}
                    <div className="absolute top-3 right-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusStyle(equipment.status)}`}>
                        {getStatusText(equipment.status)}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors flex-1">
                        {equipment.name}
                      </h3>
                      <div className="ml-2 text-right flex-shrink-0">
                        <div className="text-sm font-bold text-blue-600">{equipment.rentalPrice.toLocaleString()}원</div>
                        <div className="text-xs text-gray-500">/ 일</div>
                      </div>
                    </div>

                    {/* 카테고리 및 재고 */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <div className="flex items-center">
                        <i className="ri-price-tag-3-line mr-1 w-4 h-4 flex items-center justify-center"></i>
                        {getCategoryLabel(equipment.category)}
                      </div>
                      <div className="flex items-center">
                        <i className="ri-inbox-line mr-1 w-4 h-4 flex items-center justify-center"></i>
                        {equipment.availableQuantity}/{equipment.quantity}
                      </div>
                    </div>

                    {/* 브랜드 정보 */}
                    <div className="mb-3">
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">{equipment.brand}</span>
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full ml-1">{equipment.venueName}</span>
                    </div>
                  </div>

                  {/* 하단 액션 영역 */}
                  <div className="px-6 pb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-blue-600 font-medium group-hover:underline">
                        {equipment.availableQuantity > 0 ? '대여하기' : '자세히 보기'}
                      </span>
                      <i className="ri-arrow-right-line text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"></i>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* 더 많은 항목 보기 버튼 */}
        <div className="text-center mt-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {activeTab === 'rooms' ? (
              <Link
                href="/facilities/venues"
                className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all duration-200"
              >
                <span>모든 공간 보기</span>
                <i className="ri-arrow-right-line ml-2"></i>
              </Link>
            ) : (
              <Link
                href="/facilities/equipments"
                className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all duration-200"
              >
                <span>모든 장비 보기</span>
                <i className="ri-arrow-right-line ml-2"></i>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
