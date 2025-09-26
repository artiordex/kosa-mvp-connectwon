
'use client';

import Link from 'next/link';
import { useState } from 'react';

interface InsightDetailProps {
  insightId: string;
}

export default function InsightDetail({ insightId }: InsightDetailProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  // 실제로는 API에서 데이터를 가져올 것
  const insight = {
    id: insightId,
    title: "2025 커넥트원 온라인 창업 성장 프로그램, 스타트업 부트캠프 5기 참가자 모집",
    date: "2024-12-10",
    category: "#커넥트원 소식",
    tags: ["#커넥트원 소식", "#프로그램 소식"],
    author: "커넥트원 운영팀",
    views: 1247,
    image: "https://readdy.ai/api/search-image?query=startup%20bootcamp%20recruitment%20poster%20with%20modern%20design%2C%20entrepreneurship%20program%20announcement%2C%20business%20incubation%20opportunity%2C%20professional%20marketing%20material&width=800&height=400&seq=bootcamp-recruit-detail&orientation=landscape",
    content: `
      <h2>프로그램 개요</h2>
      <p>커넥트원에서 2025년 스타트업 부트캠프 5기 참가자를 모집합니다. 이번 프로그램은 예비창업자와 초기 스타트업을 대상으로 체계적인 창업 교육과 멘토링을 제공합니다.</p>
      
      <h3>주요 프로그램</h3>
      <ul>
        <li>창업 아이디어 발굴 및 검증</li>
        <li>비즈니스 모델 수립</li>
        <li>시제품 개발 및 테스트</li>
        <li>투자 유치 전략</li>
        <li>마케팅 및 세일즈</li>
      </ul>
      
      <h3>지원 혜택</h3>
      <p>선발된 팀에게는 다음과 같은 혜택이 제공됩니다:</p>
      <ul>
        <li>전문 멘토 1:1 매칭</li>
        <li>사무공간 및 개발환경 제공</li>
        <li>법무, 회계, 특허 등 전문서비스 지원</li>
        <li>데모데이 발표 기회</li>
        <li>투자연계 프로그램 참여 자격</li>
      </ul>
      
      <h3>모집 요강</h3>
      <p><strong>모집 대상:</strong> 예비창업자 및 창업 3년 이내 스타트업</p>
      <p><strong>모집 규모:</strong> 20팀 (팀당 2-4명)</p>
      <p><strong>프로그램 기간:</strong> 2025년 3월 ~ 8월 (6개월)</p>
      <p><strong>참가비:</strong> 무료</p>
      
      <h3>지원 방법</h3>
      <p>커넥트원 공식 홈페이지에서 온라인 지원서를 작성하여 제출하시기 바랍니다. 서류 심사 후 선발된 팀은 개별 연락드립니다.</p>
      
      <div class="cta-box">
        <h4>지금 바로 지원하세요!</h4>
        <p>여러분의 아이디어를 현실로 만들어보세요. 커넥트원이 함께하겠습니다.</p>
      </div>
    `
  };

  const relatedInsights = [
    {
      id: 3,
      title: "25년도 상반기 커넥트원 정기모집 (~1/31 18:00)",
      date: "2024-12-05",
      image: "https://readdy.ai/api/search-image?query=application%20deadline%20announcement%20with%20countdown%20timer%20design%2C%20regular%20recruitment%20notice%2C%20business%20opportunity%20advertisement&width=200&height=120&seq=related-1&orientation=landscape"
    },
    {
      id: 7,
      title: "스타트업 펀딩 라운드 완전 가이드",
      date: "2024-11-10", 
      image: "https://readdy.ai/api/search-image?query=startup%20funding%20guide%20infographic%2C%20investment%20rounds%20explanation%20diagram%2C%20venture%20capital%20process%20visualization&width=200&height=120&seq=related-2&orientation=landscape"
    },
    {
      id: 9,
      title: "커넥트원 데모데이 2024 성공적 개최",
      date: "2024-10-30",
      image: "https://readdy.ai/api/search-image?query=startup%20demo%20day%20event%20with%20presenters%20on%20stage%2C%20pitch%20competition%20audience%2C%20innovation%20showcase%20event&width=200&height=120&seq=related-3&orientation=landscape"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* 브레드크럼 */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-4xl mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">홈</Link>
            <i className="ri-arrow-right-s-line w-4 h-4 flex items-center justify-center"></i>
            <Link href="/insights" className="hover:text-blue-600">인사이트</Link>
            <i className="ri-arrow-right-s-line w-4 h-4 flex items-center justify-center"></i>
            <span className="text-gray-900">상세보기</span>
          </nav>
        </div>
      </div>

      <article className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* 헤더 */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                {insight.category}
              </span>
              <span className="text-gray-400">|</span>
              <span className="text-sm text-gray-600">{insight.date}</span>
              <span className="text-gray-400">|</span>
              <span className="text-sm text-gray-600">조회 {insight.views.toLocaleString()}</span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              {insight.title}
            </h1>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">작성자: {insight.author}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`p-2 rounded-lg transition-colors ${
                    isBookmarked ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <i className={`${isBookmarked ? 'ri-bookmark-fill' : 'ri-bookmark-line'} w-5 h-5 flex items-center justify-center`}></i>
                </button>
                <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                  <i className="ri-share-line w-5 h-5 flex items-center justify-center"></i>
                </button>
              </div>
            </div>
          </header>

          {/* 메인 이미지 */}
          <div className="mb-8">
            <img 
              src={insight.image}
              alt={insight.title}
              className="w-full h-96 object-cover rounded-xl shadow-lg"
            />
          </div>

          {/* 콘텐츠 */}
          <div 
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: insight.content }}
            style={{
              lineHeight: '1.8'
            }}
          />

          {/* 태그 */}
          <div className="border-t border-gray-200 pt-8 mb-12">
            <div className="flex flex-wrap gap-2">
              {insight.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 관련 글 */}
          <div className="border-t border-gray-200 pt-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6">관련 인사이트</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedInsights.map((related) => (
                <Link 
                  key={related.id} 
                  href={`/insights/${related.id}`}
                  className="group block"
                >
                  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <img 
                      src={related.image}
                      alt={related.title}
                      className="w-full h-24 object-cover rounded-lg mb-3"
                    />
                    <h4 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {related.title}
                    </h4>
                    <p className="text-xs text-gray-500">{related.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* 네비게이션 */}
          <div className="border-t border-gray-200 pt-12 mt-12">
            <div className="flex justify-between">
              <Link 
                href="/insights" 
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <i className="ri-arrow-left-line w-5 h-5 flex items-center justify-center"></i>
                <span>목록으로</span>
              </Link>
              
              <div className="flex space-x-4">
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap">
                  이전 글
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap">
                  다음 글
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>

      <style jsx>{`
        .prose h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        
        .prose h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #374151;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        
        .prose h4 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #374151;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
        }
        
        .prose p {
          margin-bottom: 1rem;
          color: #4b5563;
        }
        
        .prose ul {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }
        
        .prose li {
          margin-bottom: 0.5rem;
          color: #4b5563;
        }
        
        .prose .cta-box {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          padding: 2rem;
          border-radius: 12px;
          margin: 2rem 0;
          text-align: center;
        }
        
        .prose .cta-box h4 {
          color: white;
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
        }
        
        .prose .cta-box p {
          color: white;
          opacity: 0.9;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
