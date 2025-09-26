
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function InsightsContent() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [visibleItems, setVisibleItems] = useState(6);

  const categories = [
    '전체',
    '#커넥트원 소식',
    '#프로그램 소식',
    '#언론보도',
    '#트렌드',
    '#기타',
    '#공지사항'
  ];

  const allInsights = [
    {
      id: 1,
      title: "커넥트원 개인정보처리방침 변경 안내 (시행 2025.01.01)",
      date: "2024-12-15",
      category: "#공지사항",
      tags: ["#공지사항", "#기타"],
      image: "https://readdy.ai/api/search-image?query=official%20announcement%20document%20with%20corporate%20branding%2C%20privacy%20policy%20update%20notification%2C%20professional%20business%20communication%2C%20clean%20document%20design&width=300&height=180&seq=privacy-notice&orientation=landscape"
    },
    {
      id: 2, 
      title: "2025 커넥트원 온라인 창업 성장 프로그램, 스타트업 부트캠프 5기 참가자 모집",
      date: "2024-12-10",
      category: "#커넥트원 소식",
      tags: ["#커넥트원 소식", "#프로그램 소식"],
      image: "https://readdy.ai/api/search-image?query=startup%20bootcamp%20recruitment%20poster%20with%20modern%20design%2C%20entrepreneurship%20program%20announcement%2C%20business%20incubation%20opportunity%2C%20professional%20marketing%20material&width=300&height=180&seq=bootcamp-recruit&orientation=landscape"
    },
    {
      id: 3,
      title: "25년도 상반기 커넥트원 정기모집 (~1/31 18:00)",
      date: "2024-12-05", 
      category: "#커넥트원 소식",
      tags: ["#커넥트원 소식", "#공지사항"],
      image: "https://readdy.ai/api/search-image?query=application%20deadline%20announcement%20with%20countdown%20timer%20design%2C%20regular%20recruitment%20notice%2C%20business%20opportunity%20advertisement%2C%20professional%20application%20process&width=300&height=180&seq=regular-recruit&orientation=landscape"
    },
    {
      id: 4,
      title: "2024 AI 스타트업 트렌드 분석 보고서",
      date: "2024-11-28",
      category: "#트렌드",
      tags: ["#트렌드", "#언론보도"],
      image: "https://readdy.ai/api/search-image?query=AI%20technology%20trend%20analysis%20report%20cover%2C%20artificial%20intelligence%20startup%20market%20research%2C%20data%20visualization%20charts%20and%20graphs%2C%20professional%20business%20report%20design&width=300&height=180&seq=ai-trend-report&orientation=landscape"
    },
    {
      id: 5,
      title: "커넥트원, '2024 우수 창업지원기관' 선정",
      date: "2024-11-20",
      category: "#언론보도", 
      tags: ["#언론보도", "#커넥트원 소식"],
      image: "https://readdy.ai/api/search-image?query=award%20ceremony%20with%20trophy%20and%20certificate%2C%20excellence%20in%20startup%20support%20recognition%2C%20business%20achievement%20celebration%2C%20professional%20award%20presentation&width=300&height=180&seq=excellence-award&orientation=landscape"
    },
    {
      id: 6,
      title: "메타버스 기술을 활용한 원격 협업의 미래",
      date: "2024-11-15",
      category: "#트렌드",
      tags: ["#트렌드", "#기타"],
      image: "https://readdy.ai/api/search-image?query=metaverse%20virtual%20collaboration%20workspace%2C%20people%20working%20together%20in%20digital%20environment%2C%20futuristic%20remote%20work%20technology%2C%203D%20virtual%20meeting%20space&width=300&height=180&seq=metaverse-collab&orientation=landscape"
    },
    {
      id: 7,
      title: "스타트업 펀딩 라운드 완전 가이드",
      date: "2024-11-10",
      category: "#프로그램 소식",
      tags: ["#프로그램 소식", "#트렌드"],
      image: "https://readdy.ai/api/search-image?query=startup%20funding%20guide%20infographic%2C%20investment%20rounds%20explanation%20diagram%2C%20venture%20capital%20process%20visualization%2C%20professional%20business%20education%20material&width=300&height=180&seq=funding-guide&orientation=landscape"
    },
    {
      id: 8,
      title: "글로벌 시장 진출을 위한 스타트업 전략",
      date: "2024-11-05",
      category: "#트렌드",
      tags: ["#트렌드", "#프로그램 소식"],
      image: "https://readdy.ai/api/search-image?query=global%20business%20expansion%20strategy%20presentation%2C%20world%20map%20with%20connection%20lines%2C%20international%20market%20entry%20planning%2C%20professional%20business%20strategy%20document&width=300&height=180&seq=global-strategy&orientation=landscape"
    },
    {
      id: 9,
      title: "커넥트원 데모데이 2024 성공적 개최",
      date: "2024-10-30",
      category: "#커넥트원 소식",
      tags: ["#커넥트원 소식", "#프로그램 소식"],
      image: "https://readdy.ai/api/search-image?query=startup%20demo%20day%20event%20with%20presenters%20on%20stage%2C%20pitch%20competition%20audience%2C%20innovation%20showcase%20event%2C%20professional%20business%20presentation&width=300&height=180&seq=demo-day&orientation=landscape"
    }
  ];

  const filteredInsights = selectedCategory === '전체' 
    ? allInsights 
    : allInsights.filter(insight => insight.tags.includes(selectedCategory));

  const visibleInsights = filteredInsights.slice(0, visibleItems);

  const loadMore = () => {
    setVisibleItems(prev => prev + 6);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* 섹션 소개 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">인사이트</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            <span className="block">스타트업계 뉴스, 커넥트원 소식, 창업인사이트를</span>
            <span className="block">공유드립니다.</span>
          </p>
        </div>

        {/* 카테고리 필터 */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setVisibleItems(6);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 인사이트 리스트 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {visibleInsights.map((insight) => (
            <Link 
              key={insight.id} 
              href={`/insights/${insight.id}`}
              className="group block"
            >
              <article className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={insight.image}
                    alt={insight.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                    {insight.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {insight.date}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {insight.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* 더보기 버튼 */}
        {visibleItems < filteredInsights.length && (
          <div className="text-center">
            <button
              onClick={loadMore}
              className="px-8 py-3 bg-white border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-600 hover:text-white transition-colors whitespace-nowrap"
            >
              더보기
            </button>
          </div>
        )}

        {/* 검색 결과 없음 */}
        {filteredInsights.length === 0 && (
          <div className="text-center py-16">
            <i className="ri-search-line w-16 h-16 flex items-center justify-center text-gray-400 text-4xl mx-auto mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">검색 결과가 없습니다</h3>
            <p className="text-gray-600">다른 카테고리를 선택해보세요.</p>
          </div>
        )}
      </div>
    </section>
  );
}
