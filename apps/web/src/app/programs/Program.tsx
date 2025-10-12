/**
 * Description : Program.tsx - 📌 프로그램 섹션
 * Author : Shiwoo Min
 * Date : 2025-10-11 (Updated: with detail link and default image)
 */

'use client';

import { useState, useMemo } from 'react';
import programsDataRaw from 'data/programs.json';
import venuesDataRaw from 'data/rooms-by-venue.json';
import Link from 'next/link';

interface Program {
  id: number;
  title: string;
  date: string;
  image: string;
  category: string;
  status: string;
  type: string;
  venueId?: number;
  roomId?: number;
  instructor?: string;
}

interface Venue {
  id: number;
  name: string;
  slug: string;
  categories: {
    type: string;
    label: string;
    rooms: Room[];
  }[];
}

interface Room {
  id: number;
  name: string;
  capacity: number;
  status: string;
  hourlyRate: number;
  thumbnail: string;
}

const programsData = programsDataRaw.programs as Program[];
const venuesData = venuesDataRaw.venues as Venue[];

// 기본 이미지 생성 함수 (이미지가 없거나 로드 실패 시 사용)
// 프로그램 제목 기반 placeholder 이미지 생성
// const getDefaultImage = (title: string) => {
//   const encodedTitle = encodeURIComponent(title);
//   return `https://ui-avatars.com/api/?name=${encodedTitle}&size=600&background=4F46E5&color=fff&font-size=0.35&bold=true&length=2`;
// };

// 또는 DiceBear를 사용하려면 아래 주석 해제
const getDefaultImage = (title: string) => {
  const seed = encodeURIComponent(title);
  return `https://api.dicebear.com/7.x/shapes/svg?seed=${seed}`;
};

export default function ProgramsPage() {
  const [visiblePrograms, setVisiblePrograms] = useState(10);

  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('전체');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedStatus, setSelectedStatus] = useState('전체');
  const [selectedVenue, setSelectedVenue] = useState('전체');

  // 이미지 에러 핸들링
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});

  const handleImageError = (programId: number) => {
    setImageErrors(prev => ({ ...prev, [programId]: true }));
  };

  const getImageUrl = (program: Program) => {
    if (!program.image || program.image === '' || imageErrors[program.id]) {
      return getDefaultImage(program.title);
    }
    return program.image;
  };

  const types = ['전체', 'online', 'offline'];
  const typeLabels: Record<string, string> = {
    전체: '전체',
    online: '온라인',
    offline: '오프라인',
  };

  const categories = [
    '전체', 'investment', 'education', 'competition', 'mentoring',
    'workshop', 'seminar', 'training', 'networking', 'conference',
  ];
  const categoryLabels: Record<string, string> = {
    전체: '전체',
    investment: '투자',
    education: '교육',
    competition: '공모전',
    mentoring: '멘토링',
    workshop: '워크샵',
    seminar: '세미나',
    training: '교육',
    networking: '네트워킹',
    conference: '컨퍼런스',
  };

  const statuses = ['전체', 'recruiting', 'ongoing', 'upcoming', 'closed'];
  const statusLabels: Record<string, string> = {
    전체: '전체',
    recruiting: '모집중',
    ongoing: '진행중',
    upcoming: '예정',
    closed: '마감',
  };

  // 지점 데이터
  const venues = ['전체', ...venuesData.map(v => v.id.toString())];
  const venueLabels: Record<string, string> = {
    전체: '전체',
    ...Object.fromEntries(venuesData.map(v => [v.id.toString(), v.name]))
  };

  // 지점별 룸 정보 가져오기
  const getVenueAndRoomInfo = (program: Program) => {
    if (program.type === 'online' || !program.venueId) return null;

    const venue = venuesData.find(v => v.id === program.venueId);
    if (!venue) return null;

    const room = venue.categories
      .flatMap(c => c.rooms)
      .find(r => r.id === program.roomId);

    return { venue, room };
  };

  const handleSearch = () => {
    setSearchTerm(searchInput);
    setVisiblePrograms(10);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleReset = () => {
    setSearchInput('');
    setSearchTerm('');
    setSelectedType('전체');
    setSelectedCategory('전체');
    setSelectedStatus('전체');
    setSelectedVenue('전체');
    setVisiblePrograms(10);
  };

  const filteredPrograms = useMemo(() => {
    return programsData.filter((program) => {
      const matchSearch =
        searchTerm === '' ||
        program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (program.instructor &&
          program.instructor.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchType =
        selectedType === '전체' || program.type === selectedType;
      const matchCategory =
        selectedCategory === '전체' || program.category === selectedCategory;
      const matchStatus =
        selectedStatus === '전체' || program.status === selectedStatus;
      const matchVenue =
        selectedVenue === '전체' ||
        (program.venueId && program.venueId.toString() === selectedVenue);
      return matchSearch && matchType && matchCategory && matchStatus && matchVenue;
    });
  }, [searchTerm, selectedType, selectedCategory, selectedStatus, selectedVenue]);

  const visibleProgramsData = filteredPrograms.slice(0, visiblePrograms);
  const loadMore = () => setVisiblePrograms((prev) => prev + 10);

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      recruiting: 'bg-green-100 text-green-700',
      ongoing: 'bg-blue-100 text-blue-700',
      upcoming: 'bg-yellow-100 text-yellow-700',
      closed: 'bg-gray-100 text-gray-500',
    };
    return styles[status] || 'bg-gray-100 text-gray-500';
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 필터 영역 */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-[80%] mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* 검색 영역 */}
              <div className="flex-1 flex gap-2">
                <div className="relative flex-1">
                  <svg
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="프로그램명, 강사명으로 검색하세요"
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

              {/* 필터 영역 */}
              <div className="flex gap-2 flex-wrap lg:flex-nowrap">
                {/* 프로그램 유형 */}
                <div className="relative">
                  <select
                    value={selectedType}
                    onChange={(e) => {
                      setSelectedType(e.target.value);
                      setVisiblePrograms(10);
                    }}
                    className="appearance-none pl-4 pr-10 py-3 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition cursor-pointer"
                  >
                    {types.map((type) => (
                      <option key={type} value={type}>
                        {typeLabels[type]}
                      </option>
                    ))}
                  </select>
                  <i className="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg pointer-events-none"></i>
                </div>

                {/* 카테고리 */}
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setVisiblePrograms(10);
                    }}
                    className="appearance-none pl-4 pr-10 py-3 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition cursor-pointer"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {categoryLabels[cat]}
                      </option>
                    ))}
                  </select>
                  <i className="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg pointer-events-none"></i>
                </div>

                {/* 상태 */}
                <div className="relative">
                  <select
                    value={selectedStatus}
                    onChange={(e) => {
                      setSelectedStatus(e.target.value);
                      setVisiblePrograms(10);
                    }}
                    className="appearance-none pl-4 pr-10 py-3 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition cursor-pointer"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {statusLabels[status]}
                      </option>
                    ))}
                  </select>
                  <i className="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg pointer-events-none"></i>
                </div>

                {/* 지점 필터 */}
                <div className="relative">
                  <select
                    value={selectedVenue}
                    onChange={(e) => {
                      setSelectedVenue(e.target.value);
                      setVisiblePrograms(10);
                    }}
                    className="appearance-none pl-4 pr-10 py-3 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition cursor-pointer"
                  >
                    {venues.map((venue) => (
                      <option key={venue} value={venue}>
                        {venueLabels[venue]}
                      </option>
                    ))}
                  </select>
                  <i className="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg pointer-events-none"></i>
                </div>

                {/* 초기화 버튼 */}
                <button
                  onClick={handleReset}
                  className="px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  <i className="ri-refresh-line"></i>
                  초기화
                </button>
              </div>
            </div>
          </div>

          {/* 결과 정보 */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-lg font-semibold text-gray-900">
              전체 <span className="text-blue-600">{filteredPrograms.length}</span>개
            </span>
          </div>

          {/* 프로그램 리스트 */}
          {filteredPrograms.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              검색 결과가 없습니다 😢
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
              {visibleProgramsData.map((program) => (
                <Link
                  key={program.id}
                  href={`/programs/${program.id}`}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all transform hover:scale-[1.03] flex flex-col"
                >
                  <div className="aspect-square relative overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={getImageUrl(program)}
                      alt={program.title}
                      onError={() => handleImageError(program.id)}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-3 left-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          program.type === 'online'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {program.type === 'online' ? '온라인' : '오프라인'}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                          program.status
                        )}`}
                      >
                        {statusLabels[program.status]}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 leading-snug min-h-[2.5rem]">
                      {program.title}
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600 flex-grow">
                      <div className="flex items-center gap-2">
                        <i className="ri-calendar-line text-gray-400 text-sm flex-shrink-0"></i>
                        <span className="text-xs">{program.date}</span>
                      </div>
                      {program.type === 'offline' && (() => {
                        const info = getVenueAndRoomInfo(program);
                        return info ? (
                          <>
                            <div className="flex items-center gap-2">
                              <i className="ri-map-pin-line text-gray-400 text-sm flex-shrink-0"></i>
                              <span className="text-xs line-clamp-1">{info.venue.name}</span>
                            </div>
                            {info.room && (
                              <div className="flex items-center gap-2">
                                <i className="ri-door-open-line text-gray-400 text-sm flex-shrink-0"></i>
                                <span className="text-xs line-clamp-1">{info.room.name}</span>
                              </div>
                            )}
                          </>
                        ) : null;
                      })()}
                      {program.instructor && (
                        <div className="flex items-center gap-2">
                          <i className="ri-user-line text-gray-400 text-sm flex-shrink-0"></i>
                          <span className="text-xs">{program.instructor}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-3 flex justify-between items-center pt-3 border-t border-gray-100">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          program.category === 'education'
                            ? 'bg-green-50 text-green-700'
                            : program.category === 'investment'
                            ? 'bg-orange-50 text-orange-700'
                            : program.category === 'mentoring'
                            ? 'bg-purple-50 text-purple-700'
                            : 'bg-gray-50 text-gray-700'
                        }`}
                      >
                        {categoryLabels[program.category]}
                      </span>

                      {/* 🔹 자세히 보기 */}
                      <span className="text-blue-600 text-xs font-medium flex items-center gap-1">
                        자세히 보기
                        <i className="ri-arrow-right-line text-sm"></i>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* 더보기 버튼 */}
          {visiblePrograms < filteredPrograms.length && (
            <div className="text-center">
              <button
                onClick={loadMore}
                className="px-8 py-3 bg-white border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-colors text-sm shadow-sm"
              >
                더보기 ({filteredPrograms.length - visiblePrograms}개 더)
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
