/**
 * Description : CreatorSection.tsx - 📌 크리에이터 섹션
 * Author : Shiwoo Min
 * Date : 2025-10-10
 */

'use client';

import { useState, useMemo } from 'react';
import creatorsDataRaw from 'data/creator.json';

// 크리에이터 타입 정의
interface Creator {
  id: number;
  name: string;
  englishName: string;
  position: string;
  role: string;
  category: string;
  description: string;
  quote: string;
  intro: string;
  keywords: string[];
  achievements: string[];
  photo: string;
  establishedYear: number;
  fundingAmount: string;
}

// JSON 데이터 타입 캐스팅
const creatorsData = creatorsDataRaw as Creator[];

// 기본 이미지 생성 함수 (이미지가 없거나 로드 실패 시 사용)
// UI Avatars API 사용 - 이름 기반 자동 생성
// const getDefaultImage = (name: string) => {
//   const encodedName = encodeURIComponent(name);
//   return `https://ui-avatars.com/api/?name=${encodedName}&size=400&background=random&color=fff&font-size=0.4&bold=true`;
// };

// 또는 DiceBear Avatars 사용하려면 아래 주석 해제
const getDefaultImage = (name: string) => {
  const seed = encodeURIComponent(name);
  return `https://api.dicebear.com/7.x/notionists/svg?seed=${seed}`;
  // 다른 스타일: initials, personas, lorelei, notionists
};

export default function CreatorSection() {
  const [visibleCreators, setVisibleCreators] = useState(5);
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);

  // 검색 / 필터 상태
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('전체');
  const [selectedCategory, setSelectedCategory] = useState('전체');

  // 이미지 에러 핸들링
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});

  const handleImageError = (creatorId: number) => {
    setImageErrors(prev => ({ ...prev, [creatorId]: true }));
  };

  const getImageUrl = (creator: Creator) => {
    if (!creator.photo || creator.photo === '' || imageErrors[creator.id]) {
      return getDefaultImage(creator.name);
    }
    return creator.photo;
  };

  // 지역 / 카테고리 옵션
  const regions = ['전체', '서울', '경기', '부산', '인천', '제주'];
  const categories = ['전체', '컴퓨터/기술', '언어', '자기계발'];

  // 검색 실행
  const handleSearch = () => {
    setSearchTerm(searchInput);
    setVisibleCreators(5);
  };

  // 엔터키 검색
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 필터 초기화
  const handleReset = () => {
    setSearchInput('');
    setSearchTerm('');
    setSelectedRegion('전체');
    setSelectedCategory('전체');
    setVisibleCreators(5);
  };

  // 필터링된 데이터 계산
  const filteredCreators = useMemo(() => {
    return creatorsData.filter((creator) => {
      const matchSearch =
        searchTerm === '' ||
        creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creator.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creator.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creator.keywords.some((kw) => kw.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchRegion = selectedRegion === '전체' || creator.role === selectedRegion;
      const matchCategory = selectedCategory === '전체' || creator.category === selectedCategory;

      return matchSearch && matchRegion && matchCategory;
    });
  }, [searchTerm, selectedRegion, selectedCategory]);

  // 표시할 개수
  const visibleCreatorsData = filteredCreators.slice(0, visibleCreators);
  const loadMore = () => setVisibleCreators((prev) => prev + 5);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-[90%] mx-auto px-4">

        {/* 필터 영역 */}
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="이름, 기술, 키워드로 검색하세요"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
              <button
                onClick={handleSearch}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                검색
              </button>
            </div>

            {/* 필터 영역 */}
            <div className="flex gap-2 flex-wrap lg:flex-nowrap">
              {/* 지역 필터 */}
              <div className="relative">
                <select
                  value={selectedRegion}
                  onChange={(e) => {
                    setSelectedRegion(e.target.value);
                    setVisibleCreators(5);
                  }}
                  className="appearance-none pl-4 pr-10 py-3 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition cursor-pointer"
                >
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region === '전체' ? '지역 전체' : region}
                    </option>
                  ))}
                </select>
                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* 카테고리 필터 */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setVisibleCreators(5);
                  }}
                  className="appearance-none pl-4 pr-10 py-3 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === '전체' ? '분야 전체' : cat}
                    </option>
                  ))}
                </select>
                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* 초기화 버튼 */}
              <button
                onClick={handleReset}
                className="px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                초기화
              </button>
            </div>
          </div>

          {/* 활성 필터 표시 */}
          {(searchTerm || selectedRegion !== '전체' || selectedCategory !== '전체') && (
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
              <span className="text-sm text-gray-600 font-medium">활성 필터:</span>
              <div className="flex flex-wrap gap-2">
                {searchTerm && (
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm flex items-center gap-1">
                    검색: {searchTerm}
                    <button onClick={() => { setSearchTerm(''); setSearchInput(''); }} className="hover:text-blue-900">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </span>
                )}
                {selectedRegion !== '전체' && (
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm flex items-center gap-1">
                    지역: {selectedRegion}
                    <button onClick={() => setSelectedRegion('전체')} className="hover:text-blue-900">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </span>
                )}
                {selectedCategory !== '전체' && (
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm flex items-center gap-1">
                    분야: {selectedCategory}
                    <button onClick={() => setSelectedCategory('전체')} className="hover:text-blue-900">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 결과 정보 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold text-gray-900">
              전체 <span className="text-blue-600">{filteredCreators.length}</span>명
            </span>
            {filteredCreators.length !== creatorsData.length && (
              <span className="text-sm text-gray-500">
                (총 {creatorsData.length}명 중)
              </span>
            )}
          </div>
        </div>

        {/* 크리에이터 카드 목록 */}
        {filteredCreators.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-500 text-lg mb-2">검색 결과가 없습니다</p>
            <p className="text-gray-400 text-sm">다른 키워드로 검색하거나 필터를 조정해보세요</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
            {visibleCreatorsData.map((creator) => (
              <div
                key={creator.id}
                onClick={() => setSelectedCreator(creator)}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all cursor-pointer transform hover:scale-[1.03]"
              >
                <div className="aspect-[4/5] overflow-hidden bg-gray-100 relative">
                  <img
                    src={getImageUrl(creator)}
                    alt={creator.name}
                    onError={() => handleImageError(creator.id)}
                    className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{creator.name}</h3>
                    <span className="text-xs text-gray-500">{creator.englishName}</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">{creator.description}</p>
                  <div className="space-y-1">
                    {creator.achievements.slice(0, 2).map((achievement, index) => (
                      <div key={index} className="flex items-start space-x-1">
                        <span className="text-orange-500 text-xs mt-0.5">•</span>
                        <span className="text-xs text-gray-600">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 더보기 버튼 */}
        {visibleCreators < filteredCreators.length && (
          <div className="text-center">
            <button
              onClick={loadMore}
              className="px-8 py-3 bg-white border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-colors text-sm shadow-sm"
            >
              더보기 ({filteredCreators.length - visibleCreators}명 더)
            </button>
          </div>
        )}
      </div>

      {/* 모달 팝업 */}
      {selectedCreator && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedCreator(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 닫기 버튼 */}
            <button
              onClick={() => setSelectedCreator(null)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors z-20"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* 모달 본문 */}
            <div className="relative p-8">

              {/* 워터마크 */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                <div
                  className="text-gray-900 font-black select-none"
                  style={{
                    fontSize: '8rem',
                    transform: 'rotate(-15deg)'
                  }}
                >
                  커넥트원
                </div>
              </div>

              {/* 헤더 */}
              <div className="mb-6 relative z-10">
                <div className="flex flex-wrap items-baseline justify-between mb-2">
                  <h2 className="text-3xl font-bold text-gray-900">{selectedCreator.name}</h2>
                  <span className="text-sm text-gray-500">{selectedCreator.englishName}</span>
                </div>
                <p className="text-xl text-orange-500 font-semibold mb-4">{selectedCreator.position}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">
                    {selectedCreator.role}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                    {selectedCreator.category}
                  </span>
                </div>
              </div>

              {/* 인용구 */}
              <div className="mb-6 p-6 bg-orange-50 rounded-xl border-l-4 border-orange-500 relative z-10">
                <svg className="w-8 h-8 text-orange-400 mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                </svg>
                <p className="text-base text-gray-800 leading-relaxed italic">{selectedCreator.quote}</p>
              </div>

              {/* 소개 */}
              <div className="mb-6 relative z-10">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="w-1 h-5 bg-orange-500 mr-2"></span>소개
                </h3>
                <p className="text-gray-700 leading-relaxed">{selectedCreator.intro}</p>
              </div>

              {/* 주요 경력 */}
              <div className="mb-6 relative z-10">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="w-1 h-5 bg-orange-500 mr-2"></span>주요 경력
                </h3>
                <div className="space-y-2">
                  {selectedCreator.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 키워드 */}
              <div className="mb-6 relative z-10">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="w-1 h-5 bg-orange-500 mr-2"></span>키워드
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCreator.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-orange-50 text-orange-600 rounded-lg text-sm font-medium border border-orange-200"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* 추가 정보 */}
              <div className="pt-6 border-t border-gray-200 relative z-10">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <span className="text-sm text-gray-500 block mb-1">설립연도</span>
                    <p className="text-xl font-bold text-gray-900">{selectedCreator.establishedYear}년</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <span className="text-sm text-gray-500 block mb-1">누적 투자금</span>
                    <p className="text-xl font-bold text-gray-900">{selectedCreator.fundingAmount}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
