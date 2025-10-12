/**
 * Description : Room.tsx - 📌 ConnectWon 룸 목록 (카드 적용)
 * Author : Shiwoo Min
 * Date : 2025-10-12
 */
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import roomData from 'data/rooms-by-venue.json';

interface RoomType {
  id: number;
  name: string;
  capacity: number;
  status: string;
  hourlyRate: number;
  thumbnail: string;
}

interface CategoryType {
  type: string;
  label: string;
  rooms: RoomType[];
}

interface VenueType {
  id: number;
  name: string;
  slug: string;
  categories: CategoryType[];
}

export default function Room() {
  const venues = (roomData as any).venues || [];
  const [selectedVenueId, setSelectedVenueId] = useState<number>(venues[0]?.id || 1);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const currentVenue = venues.find((v: VenueType) => v.id === selectedVenueId);
  const allCategories = currentVenue?.categories || [];
  const allRoomsInVenue = allCategories.flatMap((cat: CategoryType) =>
    cat.rooms.map(room => ({ ...room, categoryType: cat.type, categoryLabel: cat.label }))
  );

  const filteredRooms = useMemo(() => {
    let rooms = allRoomsInVenue;
    if (selectedCategory !== 'all') rooms = rooms.filter((room: any) => room.categoryType === selectedCategory);
    if (searchQuery) rooms = rooms.filter((room: any) => room.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return rooms;
  }, [allRoomsInVenue, selectedCategory, searchQuery]);

  const stats = {
    total: allRoomsInVenue.length,
    available: allRoomsInVenue.filter((r: any) => r.status === 'available').length,
    occupied: allRoomsInVenue.filter((r: any) => r.status === 'occupied').length,
  };

  if (!venues.length)
    return (
      <div className="text-center text-gray-500 py-20">
        <i className="ri-error-warning-line text-3xl mb-2 block"></i>
        등록된 공간(룸)이 없습니다.
      </div>
    );

  return (
    <div className="space-y-6">
      {/* 전체 카드 컨테이너 */}
      <div className="bg-white border rounded-xl shadow-sm p-6 space-y-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">룸(공간) 관리</h1>
            <p className="text-gray-600 mt-1">지점별 회의실, 세미나실, 교육실 등을 관리하세요.</p>
          </div>
          <Link
            href="/facilities/rooms/add"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
          >
            <i className="ri-add-line mr-2"></i> 룸 추가
          </Link>
        </div>

        {/* 지점 탭 */}
        <div className="border rounded-lg overflow-hidden">
          <div className="border-b bg-gray-50">
            <div className="flex overflow-x-auto">
              {venues.map((venue: VenueType) => {
                const venueRoomCount = venue.categories.reduce((sum, cat) => sum + cat.rooms.length, 0);
                return (
                  <button
                    key={venue.id}
                    onClick={() => {
                      setSelectedVenueId(venue.id);
                      setSelectedCategory('all');
                      setSearchQuery('');
                    }}
                    className={`px-6 py-4 font-medium transition border-b-2 whitespace-nowrap ${
                      selectedVenueId === venue.id
                        ? 'border-blue-600 text-blue-600 bg-white'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <i className="ri-building-line"></i>
                      <span>{venue.name}</span>
                      <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                        {venueRoomCount}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 통계 카드 */}
          <div className="grid grid-cols-3 gap-4 p-6 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">전체 룸</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="text-center border-l border-r border-gray-300">
              <p className="text-sm text-gray-600 mb-1">예약 가능</p>
              <p className="text-2xl font-bold text-green-600">{stats.available}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">사용중</p>
              <p className="text-2xl font-bold text-red-600">{stats.occupied}</p>
            </div>
          </div>
        </div>

        {/* 필터 & 검색 바 */}
        <div className="border rounded-lg p-4 shadow-sm bg-white">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* 카테고리 */}
            <div className="flex-1 w-full">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    selectedCategory === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  전체 ({allRoomsInVenue.length})
                </button>
                {allCategories.map((cat: CategoryType) => (
                  <button
                    key={cat.type}
                    onClick={() => setSelectedCategory(cat.type)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      selectedCategory === cat.type
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat.label} ({cat.rooms.length})
                  </button>
                ))}
              </div>
            </div>

            {/* 검색 */}
            <div className="w-full md:w-64">
              <div className="relative">
                <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="룸 이름 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* 뷰 모드 */}
            <div className="flex gap-2 border rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                title="그리드 뷰"
              >
                <i className="ri-grid-line"></i>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                title="리스트 뷰"
              >
                <i className="ri-list-check"></i>
              </button>
            </div>
          </div>
        </div>

        {/* 룸 목록 */}
        {filteredRooms.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 border rounded-lg">
            <i className="ri-inbox-line text-5xl text-gray-400 mb-3 block"></i>
            <p className="text-gray-600">조건에 맞는 룸이 없습니다.</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredRooms.map((room: any) => (
              <div
                key={room.id}
                className="border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition overflow-hidden"
              >
                <div className="relative h-40 overflow-hidden">
                  <img src={room.thumbnail} alt={room.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2">
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                      {room.categoryLabel}
                    </span>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        room.status === 'available'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {room.status === 'available' ? '예약가능' : '사용중'}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="text-base font-semibold text-gray-900 truncate mb-2">{room.name}</h4>
                  <div className="space-y-1 text-sm text-gray-600 mb-3">
                    <p className="flex items-center">
                      <i className="ri-user-line mr-2 text-gray-400"></i>
                      {room.capacity}명
                    </p>
                    <p className="flex items-center">
                      <i className="ri-price-tag-3-line mr-2 text-gray-400"></i>
                      {room.hourlyRate > 0 ? (
                        <span className="font-medium text-blue-600">
                          {room.hourlyRate.toLocaleString()}원/시간
                        </span>
                      ) : (
                        <span className="text-gray-400">무료</span>
                      )}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/facilities/rooms/${room.id}`}
                      className="flex-1 text-center px-3 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition text-sm"
                    >
                      상세
                    </Link>
                    <Link
                      href={`/facilities/rooms/${room.id}/edit`}
                      className="flex-1 text-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                    >
                      수정
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredRooms.map((room: any) => (
              <div
                key={room.id}
                className="bg-white border rounded-lg shadow-sm p-4 hover:shadow-md transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={room.thumbnail} alt={room.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                        {room.categoryLabel}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          room.status === 'available'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {room.status === 'available' ? '예약가능' : '사용중'}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{room.name}</h4>
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span>
                        <i className="ri-user-line mr-1"></i>
                        {room.capacity}명
                      </span>
                      <span>
                        <i className="ri-price-tag-3-line mr-1"></i>
                        {room.hourlyRate > 0
                          ? `${room.hourlyRate.toLocaleString()}원/시간`
                          : '무료'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Link
                      href={`/facilities/rooms/${room.id}`}
                      className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition text-sm"
                    >
                      상세보기
                    </Link>
                    <Link
                      href={`/facilities/rooms/${room.id}/edit`}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                    >
                      수정
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
