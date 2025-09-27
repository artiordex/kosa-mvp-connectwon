'use client';

import { useState } from 'react';

/**
 * 커넥트원의 사회적 가치 추구 Flow 섹션 컴포넌트
 * 하는 일 → 역할 → 사회적 가치의 흐름을 시각적으로 표현합니다.
 */
export default function SocialValueFlowSection() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      id: 1,
      title: '하는 일',
      items: [
        {
          icon: 'ri-seedling-line',
          title: '혁신 스타트업',
          subtitle: '발굴 & 육성',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-700'
        },
        {
          icon: 'ri-search-line',
          title: '지역 스타트업',
          subtitle: '발굴 & 특화 육성',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-700'
        }
      ]
    },
    {
      id: 2,
      title: '역할',
      items: [
        {
          icon: 'ri-flag-line',
          title: '창업 생태계 조성',
          subtitle: '스타트업이 지속성장 가능한',
          bgColor: 'bg-purple-600',
          textColor: 'text-white',
          isMain: true
        },
        {
          icon: 'ri-community-line',
          title: '창업 커뮤니티 조성',
          subtitle: '더 나은 아이디어 이끌',
          bgColor: 'bg-purple-600',
          textColor: 'text-white',
          isMain: true
        }
      ]
    },
    {
      id: 3,
      title: '사회적 가치',
      items: [
        {
          icon: 'ri-handshake-line',
          title: '사회 상호적 혜소',
          bgColor: 'bg-yellow-400',
          textColor: 'text-gray-900'
        },
        {
          icon: 'ri-line-chart-line',
          title: '정체 활성화 기여',
          bgColor: 'bg-orange-500',
          textColor: 'text-white'
        },
        {
          icon: 'ri-check-double-line',
          title: '양질의 일자리 창출',
          bgColor: 'bg-teal-500',
          textColor: 'text-white'
        },
        {
          icon: 'ri-heart-3-line',
          title: '선한 영향력 확산',
          bgColor: 'bg-green-500',
          textColor: 'text-white'
        }
      ]
    }
  ];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="w-[90%] max-w-none mx-auto px-4">
        {/* 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-orange-500">HOW</span> 커넥트원의 사회적 가치 추구 Flow
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            혁신적인 스타트업 발굴부터 사회적 가치 창출까지, <br />
            커넥트원의 체계적인 접근 방식을 확인해보세요
          </p>
        </div>

        {/* 플로우 차트 */}
        <div className="relative">
          {/* 단계 헤더 */}
          <div className="grid grid-cols-3 gap-8 mb-12">
            {steps.map((step) => (
              <div key={step.id} className="text-center">
                <h3 className="text-xl font-bold text-gray-900 border-b-2 border-gray-900 pb-2 inline-block">
                  {step.title}
                </h3>
              </div>
            ))}
          </div>

          {/* 메인 플로우 */}
          <div className="relative flex items-center justify-center min-h-[400px]">
            {/* 좌측 - 하는 일 */}
            <div className="flex flex-col space-y-6 relative z-10">
              {steps[0].items.map((item, index) => (
                <div
                  key={index}
                  className={`${item.bgColor} ${item.textColor} rounded-full p-6 w-48 h-48 flex flex-col items-center justify-center text-center shadow-lg cursor-pointer transition-all duration-300 hover:scale-105`}
                  onMouseEnter={() => setActiveStep(1)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  <i className={`${item.icon} text-3xl mb-2`}></i>
                  <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                  <p className="text-xs">{item.subtitle}</p>
                </div>
              ))}
            </div>

            {/* 중앙 화살표 및 역할 */}
            <div className="flex flex-col items-center mx-8 relative z-20">
              {/* 화살표 */}
              <div className="flex items-center">
                <div className="w-20 h-1 bg-gray-400"></div>
                <div className="w-0 h-0 border-l-[20px] border-l-gray-400 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent"></div>
              </div>

              {/* 중앙 역할 박스 */}
              <div className="bg-gray-600 text-white rounded-2xl p-8 mx-4 text-center relative -mt-2 -mb-2">
                <i className="ri-team-line text-4xl mb-4"></i>
                <h4 className="font-bold text-lg mb-2">미래를 이끌</h4>
                <h4 className="font-bold text-lg">기업가 양성</h4>
              </div>

              {/* 화살표 */}
              <div className="flex items-center">
                <div className="w-20 h-1 bg-gray-400"></div>
                <div className="w-0 h-0 border-l-[20px] border-l-gray-400 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent"></div>
              </div>
            </div>

            {/* 곡선 화살표 (보라색) */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <svg width="300" height="200" viewBox="0 0 300 200" className="absolute">
                <path
                  d="M 50 100 Q 150 50, 250 100"
                  stroke="#7C3AED"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M 240 95 L 250 100 L 240 105"
                  stroke="#7C3AED"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* 우측 - 사회적 가치 */}
            <div className="grid grid-cols-2 gap-4 relative z-10">
              {steps[2].items.map((item, index) => (
                <div
                  key={index}
                  className={`${item.bgColor} ${item.textColor} rounded-full p-4 w-32 h-32 flex flex-col items-center justify-center text-center shadow-lg cursor-pointer transition-all duration-300 hover:scale-105`}
                  onMouseEnter={() => setActiveStep(3)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  <i className={`${item.icon} text-2xl mb-1`}></i>
                  <h4 className="font-bold text-xs">{item.title}</h4>
                </div>
              ))}
            </div>
          </div>

          {/* 중앙 텍스트 박스들 */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
            <div className="bg-white border-2 border-purple-600 rounded-lg p-4 mb-4 text-center shadow-lg">
              <h4 className="font-bold text-purple-600 text-sm mb-1">스타트업이 지속성장 가능한</h4>
              <h3 className="font-bold text-gray-900">창업 생태계 조성</h3>
            </div>
            <div className="bg-white border-2 border-purple-600 rounded-lg p-4 text-center shadow-lg">
              <h4 className="font-bold text-purple-600 text-sm mb-1">더 나은 아이디어 이끌</h4>
              <h3 className="font-bold text-gray-900">창업 커뮤니티 조성</h3>
            </div>
          </div>
        </div>

        {/* 하단 CTA */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              커넥트원과 함께 사회적 가치를 만들어가세요
            </h3>
            <p className="text-gray-600 mb-6">
              당신의 아이디어와 열정이 더 나은 세상을 만드는 시작점이 됩니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors">
                스타트업 지원 신청
              </button>
              <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-medium rounded-xl transition-colors">
                사회적 가치 더 알아보기
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
