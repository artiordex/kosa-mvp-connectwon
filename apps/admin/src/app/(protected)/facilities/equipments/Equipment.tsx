/**
 * Description : Equipment.tsx - 📌 ConnectWon 장비 관리 리스트
 * Author : Assistant
 * Date : 2025-10-12
 */

import { useState } from 'react';

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
  venueId: number;
  venueName: string;
  venueSlug: string;
  quantity: number;
  availableQuantity: number;
}

export default function EquipmentList() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVenue, setSelectedVenue] = useState('all');

  // 임시 데이터
  const equipmentList: Equipment[] = [
    {
      id: 1,
      name: "빔프로젝터 EPSON EB-2250U",
      category: "projector",
      brand: "EPSON",
      model: "EB-2250U",
      rentalPrice: 50000,
      depositPrice: 200000,
      status: "active",
      thumbnail: "/images/equipment/projector-1.jpg",
      venueId: 1,
      venueName: "ConnectWon 강남지점",
      venueSlug: "gangnam-center",
      quantity: 3,
      availableQuantity: 2
    },
    {
      id: 3,
      name: "노트북 MacBook Pro 16 (M3 Max)",
      category: "laptop",
      brand: "Apple",
      model: "MacBook Pro 16",
      rentalPrice: 80000,
      depositPrice: 500000,
      status: "active",
      thumbnail: "/images/equipment/laptop-1.jpg",
      venueId: 1,
      venueName: "ConnectWon 강남지점",
      venueSlug: "gangnam-center",
      quantity: 5,
      availableQuantity: 3
    },
    {
      id: 12,
      name: "무선 마이크 세트",
      category: "microphone",
      brand: "Shure",
      model: "BLX24/SM58",
      rentalPrice: 40000,
      depositPrice: 200000,
      status: "active",
      thumbnail: "/images/equipment/mic-1.jpg",
      venueId: 2,
      venueName: "ConnectWon 마포지점",
      venueSlug: "mapo-studio",
      quantity: 4,
      availableQuantity: 3
    },
    {
      id: 17,
      name: "카메라 Sony A7 IV",
      category: "camera",
      brand: "Sony",
      model: "A7 IV",
      rentalPrice: 100000,
      depositPrice: 500000,
      status: "active",
      thumbnail: "/images/equipment/camera-1.jpg",
      venueId: 2,
      venueName: "ConnectWon 마포지점",
      venueSlug: "mapo-studio",
      quantity: 2,
      availableQuantity: 1
    },
    {
      id: 26,
      name: "태블릿 Samsung Galaxy Tab S9",
      category: "tablet",
      brand: "Samsung",
      model: "Galaxy Tab S9",
      rentalPrice: 30000,
      depositPrice: 150000,
      status: "active",
      thumbnail: "/images/equipment/tablet-2.jpg",
      venueId: 3,
      venueName: "ConnectWon 광명지점",
      venueSlug: "gwangmyeong-campus",
      quantity: 5,
      availableQuantity: 5
    },
    {
      id: 5,
      name: "노트북 LG gram 17",
      category: "laptop",
      brand: "LG",
      model: "gram 17",
      rentalPrice: 40000,
      depositPrice: 250000,
      status: "active",
      thumbnail: "/images/equipment/laptop-3.jpg",
      venueId: 2,
      venueName: "ConnectWon 마포지점",
      venueSlug: "mapo-studio",
      quantity: 3,
      availableQuantity: 0
    }
  ];

  const categories = [
    { value: 'all', label: '전체 카테고리' },
    { value: 'projector', label: '프로젝터' },
    { value: 'laptop', label: '노트북' },
    { value: 'microphone', label: '마이크' },
    { value: 'speaker', label: '스피커' },
    { value: 'camera', label: '카메라' },
    { value: 'tablet', label: '태블릿' },
    { value: 'monitor', label: '모니터' }
  ];

  const venues = [
    { value: 'all', label: '전체 지점' },
    { value: 1, label: 'ConnectWon 강남지점' },
    { value: 2, label: 'ConnectWon 마포지점' },
    { value: 3, label: 'ConnectWon 광명지점' }
  ];

  const getCategoryLabel = (category: string) => {
    return categories.find(cat => cat.value === category)?.label || category;
  };

  const getStatusBadge = (available: number, total: number) => {
    if (available === 0) {
      return <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded">대여불가</span>;
    } else if (available < total * 0.3) {
      return <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded">품절임박</span>;
    } else {
      return <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">대여가능</span>;
    }
  };

  const filtered = equipmentList.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                         item.brand.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesVenue = selectedVenue === 'all' || item.venueId === parseInt(selectedVenue);

    return matchesSearch && matchesCategory && matchesVenue;
  });

  const goToDetail = (itemId: number) => {
    console.log('상세 페이지로 이동:', itemId);
  };

  const goToAdd = () => {
    console.log('장비 추가 페이지로 이동');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* 검색 및 필터 영역 */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-900">장비 목록</h2>
          <button
            onClick={goToAdd}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <i className="ri-add-line"></i>
            장비 추가
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="장비명 또는 브랜드 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>

          <select
            value={selectedVenue}
            onChange={(e) => setSelectedVenue(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {venues.map(venue => (
              <option key={venue.value} value={venue.value}>{venue.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 카드형 리스트 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => goToDetail(item.id)}
            className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden cursor-pointer bg-white"
          >
            <div className="relative w-full h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
              <i className="ri-tools-line text-6xl text-gray-300"></i>
              <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                {getCategoryLabel(item.category)}
              </div>
              <div className="absolute top-2 right-2">
                {getStatusBadge(item.availableQuantity, item.quantity)}
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{item.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.brand} {item.model}</p>

              <div className="mt-3 space-y-1 text-sm text-gray-700">
                <p>
                  <i className="ri-map-pin-line mr-1"></i>
                  {item.venueName}
                </p>
                <p>
                  <i className="ri-price-tag-3-line mr-1"></i>
                  대여료: {item.rentalPrice.toLocaleString()}원/일
                </p>
              </div>

              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-500">
                  재고: <span className="font-semibold text-blue-600">{item.availableQuantity}</span> / {item.quantity}
                </span>
                <span className="text-blue-600 text-sm font-medium hover:underline">
                  상세보기 <span aria-hidden="true">→</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          <i className="ri-tools-line text-3xl mb-2 block"></i>
          검색된 장비가 없습니다.
        </div>
      )}
    </div>
  );
}
