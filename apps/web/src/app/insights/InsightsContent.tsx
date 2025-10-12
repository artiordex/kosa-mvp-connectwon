/**
 * Description : InsightsContent.tsx - 📌 인사이트 섹션 콘텐츠
 * Author : Shiwoo Min
 * Date : 2025-10-10
 */

'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import insightsData from 'data/insights.json';

// 인사이트 타입 정의
interface Insight {
  id: number;
  title: string;
  date: string;
  category: string;
  tags: string[];
  image: string;
}

// JSON 데이터 타입 캐스팅
const allInsights = insightsData as Insight[];

export default function InsightsContent() {
  const [visibleItems, setVisibleItems] = useState(5);

  // 검색 / 필터 상태
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const categories = [
    '전체',
    '#커넥트원 소식',
    '#프로그램 소식',
    '#언론보도',
    '#트렌드',
    '#기타',
    '#공지사항'
  ];

  // 검색 실행
  const handleSearch = () => {
    setSearchTerm(searchInput);
    setVisibleItems(5);
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
    setSelectedCategory('전체');
    setVisibleItems(5);
  };

  // 필터링된 데이터 계산
  const filteredInsights = useMemo(() => {
    return allInsights.filter((insight) => {
      const matchSearch =
        searchTerm === '' ||
        insight.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        insight.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchCategory = selectedCategory === '전체' || insight.tags.includes(selectedCategory);

      return matchSearch && matchCategory;
    });
  }, [searchTerm, selectedCategory]);

  const visibleInsights = filteredInsights.slice(0, visibleItems);

  const loadMore = () => {
    setVisibleItems(prev => prev + 5);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-[90%] mx-auto px-4">
        {/* 검색/필터 영역 */}
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
                  placeholder="제목, 태그로 검색하세요"
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
            <div className="flex gap-2">
              {/* 카테고리 필터 */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setVisibleItems(5);
                  }}
                  className="appearance-none pl-4 pr-10 py-3 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === '전체' ? '카테고리 전체' : cat}
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
          {(searchTerm || selectedCategory !== '전체') && (
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
              <span className="text-sm text-gray-600 font-medium">활성 필터:</span>
              <div className="flex flex-wrap gap-2">
                {searchTerm && (
                  <span key="filter-search" className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm flex items-center gap-1">
                    검색: {searchTerm}
                    <button onClick={() => { setSearchTerm(''); setSearchInput(''); }} className="hover:text-blue-900">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </span>
                )}
                {selectedCategory !== '전체' && (
                  <span key="filter-category" className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm flex items-center gap-1">
                    카테고리: {selectedCategory}
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
              전체 <span className="text-blue-600">{filteredInsights.length}</span>개
            </span>
            {filteredInsights.length !== allInsights.length && (
              <span className="text-sm text-gray-500">
                (총 {allInsights.length}개 중)
              </span>
            )}
          </div>
        </div>

        {/* 인사이트 리스트 */}
        {filteredInsights.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-500 text-lg mb-2">검색 결과가 없습니다</p>
            <p className="text-gray-400 text-sm">다른 키워드로 검색하거나 필터를 조정해보세요</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            {visibleInsights.map((insight) => (
              <Link
                key={insight.id}
                href={`/insights/${insight.id}`}
                className="group block"
              >
                <article className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all overflow-hidden border border-gray-200 h-full flex flex-col">
                  <div className="aspect-video relative overflow-hidden bg-gray-100">
                    <img
                      src={insight.image}
                      alt={insight.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-base font-bold text-gray-900 mb-3 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors flex-1">
                      {insight.title}
                    </h3>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {insight.date}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {insight.tags && insight.tags.slice(0, 2).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full border border-blue-100"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {/* 더보기 버튼 */}
        {visibleItems < filteredInsights.length && (
          <div className="text-center">
            <button
              onClick={loadMore}
              className="px-8 py-3 bg-white border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-colors text-sm shadow-sm"
            >
              더보기 ({filteredInsights.length - visibleItems}개 더)
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
