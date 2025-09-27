'use client';

import AIInsights from '../ai/AIInsights';
import AIRecommendations from '../ai/AIRecommendations';

/**
 * AI 대시보드 섹션 컴포넌트
 * AI 추천 (공간/디바이스, 프로그램)과 AI 인사이트를 하나의 섹션에 통합하여 표시합니다.
 *
 * @returns {JSX.Element} AI 대시보드 섹션
 */
export default function AIDashboardSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      <div className="w-[90%] max-w-none mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <i className="ri-robot-line text-2xl text-white"></i>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">AI로 더 스마트하게</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            인공지능이 당신의 사용 패턴을 분석하여 최적의 공간, 디바이스, 프로그램을 추천하고
            <br />
            데이터 기반의 통찰을 제공합니다
          </p>
        </div>

        {/* AI 컴포넌트 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI 추천 - 공간 및 디바이스 */}
          <div className="lg:col-span-1">
            <AIRecommendations type="room" className="h-full" />
          </div>

          {/* AI 추천 - 프로그램 */}
          <div className="lg:col-span-1">
            <AIRecommendations type="program" className="h-full" />
          </div>

          {/* AI 인사이트 */}
          <div className="lg:col-span-1">
            <AIInsights />
          </div>
        </div>

        {/* 하단 액션 영역 */}
        <div className="mt-16 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border-white/50">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">더 많은 AI 기능이 궁금하신가요?</h3>
                <p className="text-gray-600">커넥트원의 AI 어시스턴트와 대화해보세요</p>
              </div>
              <div className="flex gap-3">
                <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                  <i className="ri-chat-3-line mr-2"></i>
                  AI 어시스턴트
                </button>
                <button className="inline-flex items-center px-6 py-3 bg-white text-gray-700 font-medium rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl">
                  <i className="ri-bar-chart-line mr-2"></i>
                  상세 분석
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
