/**
 * Description : Equipment.tsx - 📌 커넥트원 장비 검색 및 대여 섹션 (개선 버전)
 * Author : Shiwoo Min
 * Date : 2025-10-13
 */

'use client';

import { useState, useMemo, useDeferredValue } from 'react';
import equipmentDataRaw from 'data/equipment-with-venues.json';
import Image from 'next/image';

interface Equipment {
  id: number;
  name: string;
  category: string;
  brand: string;
  model: string;
  specifications: Record<string, any>;
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

const equipmentData = equipmentDataRaw as Equipment[];

// 안정적인 기본 이미지 URL 생성기 (DiceBear 기반)
const getDefaultImage = (title: string) => {
  const seed = encodeURIComponent(title);
  return `https://api.dicebear.com/7.x/shapes/png?seed=${seed}`;
};

export default function EquipmentSection() {
  const [visibleCount, setVisibleCount] = useState(9);
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVenue, setSelectedVenue] = useState('전체');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

  const deferredSearch = useDeferredValue(searchTerm);

  const venues = ['전체', ...Array.from(new Set(equipmentData.map((e) => e.venueName)))];
  const categories = ['전체', ...Array.from(new Set(equipmentData.map((e) => e.category)))];

  const handleSearch = () => setSearchTerm(searchInput);
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };
  const handleReset = () => {
    setSearchInput('');
    setSearchTerm('');
    setSelectedVenue('전체');
    setSelectedCategory('전체');
    setVisibleCount(9);
  };

  const filteredEquipment = useMemo(() => {
    return equipmentData.filter((eq) => {
      const name = (eq.name || '').toLowerCase();
      const brand = (eq.brand || '').toLowerCase();
      const model = (eq.model || '').toLowerCase();

      const matchSearch =
        deferredSearch === '' ||
        name.includes(deferredSearch.toLowerCase()) ||
        brand.includes(deferredSearch.toLowerCase()) ||
        model.includes(deferredSearch.toLowerCase());

      const matchVenue = selectedVenue === '전체' || eq.venueName === selectedVenue;
      const matchCategory = selectedCategory === '전체' || eq.category === selectedCategory;

      return matchSearch && matchVenue && matchCategory;
    });
  }, [deferredSearch, selectedVenue, selectedCategory]);

  const visibleEquipment = filteredEquipment.slice(0, visibleCount);
  const loadMore = () => setVisibleCount((prev) => prev + 9);

  const getCategoryLabel = (cat: string) => {
    const map: Record<string, string> = {
      projector: '프로젝터',
      laptop: '노트북',
      adapter: '어댑터',
      cable: '케이블',
      microphone: '마이크',
      speaker: '스피커',
      camera: '카메라',
      tripod: '삼각대',
      lighting: '조명',
      whiteboard: '화이트보드',
      tablet: '태블릿',
      monitor: '모니터',
      webcam: '웹캠',
    };
    return map[cat] || cat;
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-[90%] mx-auto px-4">
        {/* 검색 및 필터 박스 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <i className="ri-search-line absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="장비명, 브랜드, 모델명으로 검색하세요"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
              <button
                onClick={handleSearch}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <i className="ri-search-line"></i>
                검색
              </button>
            </div>

            <div className="flex gap-2 flex-wrap lg:flex-nowrap">
              <select
                value={selectedVenue}
                onChange={(e) => setSelectedVenue(e.target.value)}
                className="pl-4 pr-8 py-3 border border-gray-300 rounded-lg text-sm bg-white cursor-pointer focus:ring-2 focus:ring-blue-500 transition"
              >
                {venues.map((venue) => (
                  <option key={venue} value={venue}>
                    {venue}
                  </option>
                ))}
              </select>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-4 pr-8 py-3 border border-gray-300 rounded-lg text-sm bg-white cursor-pointer focus:ring-2 focus:ring-blue-500 transition"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === '전체' ? '카테고리 전체' : getCategoryLabel(cat)}
                  </option>
                ))}
              </select>

              <button
                onClick={handleReset}
                className="px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <i className="ri-refresh-line"></i>
                초기화
              </button>
            </div>
          </div>

          {(searchTerm || selectedVenue !== '전체' || selectedCategory !== '전체') && (
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100 text-sm">
              <span className="text-gray-600 font-medium">활성 필터:</span>
              {searchTerm && (
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full flex items-center gap-1">
                  검색: {searchTerm}
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSearchInput('');
                    }}
                  >
                    <i className="ri-close-line text-xs"></i>
                  </button>
                </span>
              )}
              {selectedVenue !== '전체' && (
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full flex items-center gap-1">
                  지점: {selectedVenue}
                  <button onClick={() => setSelectedVenue('전체')}>
                    <i className="ri-close-line text-xs"></i>
                  </button>
                </span>
              )}
              {selectedCategory !== '전체' && (
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full flex items-center gap-1">
                  카테고리: {getCategoryLabel(selectedCategory)}
                  <button onClick={() => setSelectedCategory('전체')}>
                    <i className="ri-close-line text-xs"></i>
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* 장비 리스트 */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-lg font-semibold text-gray-900">
            전체 <span className="text-blue-600">{filteredEquipment.length}</span>개 장비
          </span>
        </div>

        {filteredEquipment.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <i className="ri-emotion-unhappy-line text-5xl mb-3 text-gray-300"></i>
            <p>검색 결과가 없습니다. 다른 조건을 시도해보세요.</p>
            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
            >
              초기화
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {visibleEquipment.map((eq) => {
              const thumbnailSrc =
                eq.thumbnail && eq.thumbnail.startsWith('http')
                  ? eq.thumbnail
                  : getDefaultImage(eq.name);

              return (
                <div
                  key={eq.id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer hover:scale-[1.02]"
                  onClick={() => setSelectedEquipment(eq)}
                >
                  <div className="relative h-52 bg-gray-100 overflow-hidden">
                    <Image
                      src={thumbnailSrc}
                      alt={eq.name}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 truncate">{eq.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {(eq.brand || '브랜드 미상')} · {(eq.model || '모델 미상')}
                    </p>
                    <div className="text-xs text-gray-600 space-y-1 mb-3">
                      <p>
                        대여가:{' '}
                        <span className="font-medium text-blue-600">
                          {eq.rentalPrice.toLocaleString()}원
                        </span>
                      </p>
                      <p>
                        보증금:{' '}
                        <span className="font-medium text-gray-700">
                          {eq.depositPrice.toLocaleString()}원
                        </span>
                      </p>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{eq.venueName}</span>
                      <span>
                        재고 {eq.availableQuantity}/{eq.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {visibleCount < filteredEquipment.length && (
          <div className="text-center">
            <button
              onClick={loadMore}
              className="px-8 py-3 bg-white border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-colors text-sm shadow-sm"
            >
              더보기 ({filteredEquipment.length - visibleCount}개 더)
            </button>
          </div>
        )}
      </div>

      {/* 🔍 상세 모달 */}
      {selectedEquipment && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedEquipment(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full overflow-y-auto max-h-[90vh] relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedEquipment(null)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-100 transition"
            >
              <i className="ri-close-line text-lg text-gray-700"></i>
            </button>

            <div className="p-6">
              <div className="relative h-64 rounded-xl overflow-hidden mb-6">
                <Image
                  src={
                    selectedEquipment.thumbnail && selectedEquipment.thumbnail.startsWith('http')
                      ? selectedEquipment.thumbnail
                      : getDefaultImage(selectedEquipment.name)
                  }
                  alt={selectedEquipment.name}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedEquipment.name}</h2>
              <p className="text-gray-600 mb-4">
                {(selectedEquipment.brand || '브랜드 미상')} ·{' '}
                {(selectedEquipment.model || '모델 미상')}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-600 mb-1">대여가</p>
                  <p className="text-lg font-bold text-blue-900">
                    {selectedEquipment.rentalPrice.toLocaleString()}원
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-green-600 mb-1">보증금</p>
                  <p className="text-lg font-bold text-green-900">
                    {selectedEquipment.depositPrice.toLocaleString()}원
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">기본 사양</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  {Object.entries(selectedEquipment.specifications).map(([key, value]) => (
                    <li key={key} className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>
                        {key}: {Array.isArray(value) ? value.join(', ') : String(value)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-gray-200 text-sm text-gray-600">
                <p>{selectedEquipment.venueName}</p>
                <p>
                  재고: {selectedEquipment.availableQuantity} / {selectedEquipment.quantity}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
