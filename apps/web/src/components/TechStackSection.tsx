'use client';

import { useState } from 'react';

export default function TechStackSection() {
  const [activeCategory, setActiveCategory] = useState('frontend');

  const techStacks = {
    frontend: [
      {
        name: 'React',
        icon: 'ri-reactjs-line',
        description: '사용자 인터페이스 구축을 위한 JavaScript 라이브러리',
        level: 95,
        color: 'bg-blue-500'
      },
      {
        name: 'Next.js',
        icon: 'ri-pages-line',
        description: 'React 기반의 풀스택 웹 프레임워크',
        level: 90,
        color: 'bg-gray-900'
      },
      {
        name: 'TypeScript',
        icon: 'ri-code-s-slash-line',
        description: '타입 안정성을 제공하는 JavaScript 확장',
        level: 88,
        color: 'bg-blue-600'
      },
      {
        name: 'Tailwind CSS',
        icon: 'ri-palette-line',
        description: '유틸리티 우선 CSS 프레임워크',
        level: 92,
        color: 'bg-cyan-500'
      }
    ],
    backend: [
      {
        name: 'Node.js',
        icon: 'ri-nodejs-line',
        description: 'JavaScript 런타임 환경',
        level: 85,
        color: 'bg-green-600'
      },
      {
        name: 'Supabase',
        icon: 'ri-database-2-line',
        description: 'Backend-as-a-Service 플랫폼',
        level: 80,
        color: 'bg-green-500'
      },
      {
        name: 'PostgreSQL',
        icon: 'ri-database-line',
        description: '오픈소스 관계형 데이터베이스',
        level: 82,
        color: 'bg-blue-700'
      },
      {
        name: 'API Design',
        icon: 'ri-api-line',
        description: 'RESTful API 설계 및 구현',
        level: 87,
        color: 'bg-purple-600'
      }
    ],
    tools: [
      {
        name: 'Git',
        icon: 'ri-git-branch-line',
        description: '버전 관리 시스템',
        level: 90,
        color: 'bg-orange-600'
      },
      {
        name: 'Docker',
        icon: 'ri-container-line',
        description: '컨테이너 가상화 플랫폼',
        level: 78,
        color: 'bg-blue-500'
      },
      {
        name: 'Figma',
        icon: 'ri-pencil-ruler-2-line',
        description: 'UI/UX 디자인 협업 도구',
        level: 85,
        color: 'bg-purple-500'
      },
      {
        name: 'VS Code',
        icon: 'ri-code-line',
        description: '통합 개발 환경',
        level: 95,
        color: 'bg-blue-600'
      }
    ],
    cloud: [
      {
        name: 'Vercel',
        icon: 'ri-cloud-line',
        description: '프론트엔드 배포 플랫폼',
        level: 88,
        color: 'bg-black'
      },
      {
        name: 'AWS',
        icon: 'ri-amazon-line',
        description: '클라우드 컴퓨팅 서비스',
        level: 75,
        color: 'bg-orange-500'
      },
      {
        name: 'Netlify',
        icon: 'ri-global-line',
        description: '웹 개발 플랫폼',
        level: 82,
        color: 'bg-teal-500'
      },
      {
        name: 'GitHub Actions',
        icon: 'ri-git-repository-line',
        description: 'CI/CD 자동화 도구',
        level: 80,
        color: 'bg-gray-800'
      }
    ]
  };

  const categories = [
    { key: 'frontend', label: '프론트엔드', icon: 'ri-window-line' },
    { key: 'backend', label: '백엔드', icon: 'ri-server-line' },
    { key: 'tools', label: '개발도구', icon: 'ri-tools-line' },
    { key: 'cloud', label: '클라우드', icon: 'ri-cloud-line' }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            기술 스택
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            최신 기술과 도구를 활용하여 혁신적인 디지털 솔루션을 제공합니다
          </p>
        </div>

        {/* 카테고리 탭 */}
        <div className="flex flex-wrap justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full mx-2 mb-4 transition-all duration-300 cursor-pointer whitespace-nowrap ${
                activeCategory === category.key
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-blue-50'
              }`}
            >
              <i className={`${category.icon} w-5 h-5 flex items-center justify-center`}></i>
              <span className="font-medium">{category.label}</span>
            </button>
          ))}
        </div>

        {/* 기술스택 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {techStacks[activeCategory as keyof typeof techStacks].map((tech, index) => (
            <div
              key={tech.name}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* 아이콘과 이름 */}
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 ${tech.color} rounded-lg flex items-center justify-center mr-4`}>
                  <i className={`${tech.icon} text-white text-2xl w-6 h-6 flex items-center justify-center`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{tech.name}</h3>
              </div>

              {/* 설명 */}
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {tech.description}
              </p>

              {/* 숙련도 바 */}
              <div className="mb-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">숙련도</span>
                  <span className="text-sm font-bold text-gray-900">{tech.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${tech.color} transition-all duration-1000 ease-out`}
                    style={{ width: `${tech.level}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 통계 섹션 */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-code-s-slash-line text-blue-600 text-2xl w-8 h-8 flex items-center justify-center"></i>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">50+</h3>
            <p className="text-gray-600">활용 기술</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-rocket-line text-green-600 text-2xl w-8 h-8 flex items-center justify-center"></i>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">200+</h3>
            <p className="text-gray-600">완료 프로젝트</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-team-line text-purple-600 text-2xl w-8 h-8 flex items-center justify-center"></i>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">15+</h3>
            <p className="text-gray-600">개발팀 규모</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-award-line text-orange-600 text-2xl w-8 h-8 flex items-center justify-center"></i>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">5+</h3>
            <p className="text-gray-600">수상 경력</p>
          </div>
        </div>
      </div>
    </section>
  );
}