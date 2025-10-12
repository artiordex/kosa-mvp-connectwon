/**
 * Description : InsightDetail.tsx - 📌 인사이트 섹션 상세보기
 * Author : Shiwoo Min
 * Date : 2025-10-10
 */

'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import insightsData from 'data/insights.json';

// 인사이트 타입 정의
interface Insight {
  id: number;
  title: string;
  date: string;
  category: string;
  tags: string[];
  image: string;
  content: string;
  author?: string;
  views?: number;
}

interface InsightDetailProps {
  insightId: string;
}

const allInsights = insightsData as Insight[];

export default function InsightDetail({ insightId }: InsightDetailProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  // 현재 인사이트 찾기
  const insight = useMemo(() => {
    return allInsights.find(item => item.id === parseInt(insightId));
  }, [insightId]);

  // 관련 인사이트 (같은 카테고리, 최대 3개)
  const relatedInsights = useMemo(() => {
    if (!insight) return [];

    return allInsights
      .filter(item =>
        item.id !== insight.id &&
        item.tags.some(tag => insight.tags.includes(tag))
      )
      .slice(0, 3);
  }, [insight]);

  // 이전/다음 글
  const prevInsight = useMemo(() => {
    const currentIndex = allInsights.findIndex(item => item.id === parseInt(insightId));
    return currentIndex > 0 ? allInsights[currentIndex - 1] : null;
  }, [insightId]);

  const nextInsight = useMemo(() => {
    const currentIndex = allInsights.findIndex(item => item.id === parseInt(insightId));
    return currentIndex < allInsights.length - 1 ? allInsights[currentIndex + 1] : null;
  }, [insightId]);

  if (!insight) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">인사이트를 찾을 수 없습니다</h2>
          <Link href="/insights" className="text-blue-600 hover:text-blue-700">
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 브레드크럼 */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-[80%] mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">홈</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/insights" className="hover:text-blue-600">인사이트</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900">상세보기</span>
          </nav>
        </div>
      </div>

      <article className="py-12">
        <div className="max-w-[80%] mx-auto px-4">
          {/* 헤더 */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                {insight.category}
              </span>
              <span className="text-gray-400">|</span>
              <span className="text-sm text-gray-600">{insight.date}</span>
              {insight.views && (
                <>
                  <span className="text-gray-400">|</span>
                  <span className="text-sm text-gray-600">조회 {insight.views.toLocaleString()}</span>
                </>
              )}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              {insight.title}
            </h1>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {insight.author && (
                  <span className="text-sm text-gray-600">작성자: {insight.author}</span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`p-2 rounded-lg transition-colors ${
                    isBookmarked ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  aria-label="북마크"
                >
                  <svg className="w-5 h-5" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
                <button
                  className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                  aria-label="공유"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>
            </div>
          </header>

          {/* 메인 이미지 */}
          <div className="mb-12">
            <img
              src={insight.image}
              alt={insight.title}
              className="w-full h-[500px] object-cover rounded-xl shadow-lg"
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
          {relatedInsights.length > 0 && (
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
          )}

          {/* 네비게이션 */}
          <div className="border-t border-gray-200 pt-12 mt-12">
            <div className="flex justify-between items-center">
              <Link
                href="/insights"
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>목록으로</span>
              </Link>

              <div className="flex space-x-4">
                {prevInsight ? (
                  <Link
                    href={`/insights/${prevInsight.id}`}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap"
                  >
                    이전 글
                  </Link>
                ) : (
                  <button
                    disabled
                    className="px-4 py-2 bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed whitespace-nowrap"
                  >
                    이전 글
                  </button>
                )}

                {nextInsight ? (
                  <Link
                    href={`/insights/${nextInsight.id}`}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap"
                  >
                    다음 글
                  </Link>
                ) : (
                  <button
                    disabled
                    className="px-4 py-2 bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed whitespace-nowrap"
                  >
                    다음 글
                  </button>
                )}
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

        .prose strong {
          color: #1f2937;
          font-weight: 600;
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
