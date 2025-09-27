'use client';

import { useState } from 'react';
import creatorsData from '../../data/creator.json';

export default function CreatorSection() {
  const [visibleCreators, setVisibleCreators] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('전체');
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const regions = ['전체', '서울', '경기', '부산', '제주', '충청', '인천', '대전', '광주', '울산'];
  const categories = ['전체', 'AI/로보틱스', '핀테크', '헬스케어', '이커머스', '게임', '교육', '미디어', '기타'];

  const filteredCreators = creatorsData.filter(creator => {
    const matchesSearch =
      creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      creator.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      creator.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      creator.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === '전체' || creator.role === selectedRegion;
    const matchesCategory = selectedCategory === '전체' || creator.category === selectedCategory;
    return matchesSearch && matchesRegion && matchesCategory;
  });

  const visibleCreatorsData = filteredCreators.slice(0, visibleCreators);

  const loadMore = () => {
    setVisibleCreators(prev => prev + 5);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[90%] mx-auto px-4">
        {/* 결과 정보 */}
        <div className="flex items-center justify-between mb-8">
          <span className="text-lg font-semibold text-gray-900">
            전체 <span className="text-orange-500">{filteredCreators.length}</span>명
          </span>
        </div>

        {/* 크리에이터 리스트 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {visibleCreatorsData.map(creator => (
            <div
              key={creator.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="aspect-[4/5] overflow-hidden bg-gray-100">
                <img src={creator.photo} alt={creator.name} className="w-full h-full object-cover object-top" />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{creator.name}</h3>
                  <span className="text-xs text-gray-500">{creator.englishName}</span>
                </div>
                <p className="text-xs text-gray-600 mb-3">{creator.description}</p>
                <div className="space-y-1">
                  {creator.achievements.map((achievement, index) => (
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

        {/* 더보기 버튼 */}
        {visibleCreators < filteredCreators.length && (
          <div className="text-center">
            <button
              onClick={loadMore}
              className="px-6 py-2 bg-white border-2 border-orange-500 text-orange-500 font-medium rounded-lg hover:bg-orange-500 hover:text-white transition-colors whitespace-nowrap text-sm"
            >
              더보기 ({filteredCreators.length - visibleCreators}명 더)
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
