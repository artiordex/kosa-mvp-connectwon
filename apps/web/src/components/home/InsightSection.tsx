/**
 * Description : InsightSection.tsx - 📌 커넥트원 인사이트 섹션
 * Author : Shiwoo Min
 * Date : 2025-10-09
 */

'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import insights from 'data/insights.json';

export default function InsightSection() {
  // 랜덤으로 5개의 인사이트 선택
  const randomInsights = useMemo(() => {
    const shuffled = [...insights].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  }, []);

  return (
    <section className="py-20">
      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <span className="text-blue-600 font-semibold text-lg">커넥트원 인사이트</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2">
              커넥트원의 인사이트를 확인하세요
            </h2>
          </div>
          <Link href="/insights" className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
            인사이트 더보기
            <i className="ri-arrow-right-line ml-1 w-4 h-4 flex items-center justify-center"></i>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {randomInsights.map((item, index) => (
            <Link
              key={index}
              href={`/insights/${item.id || index}`}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="mb-3">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                  {item.category}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-3 leading-tight">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500">{item.date}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
