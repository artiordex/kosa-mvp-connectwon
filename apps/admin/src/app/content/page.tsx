'use client';

import AdminLayout from '../../../components/AdminLayout';
import AdminHeader from '../../../components/AdminHeader';
import { useState } from 'react';
import Link from 'next/link';

export default function AdminContent() {
  const [activeTab, setActiveTab] = useState('banners');
  const [showAddModal, setShowAddModal] = useState(false);

  const banners = [
    {
      id: 1,
      title: '2025 스타트업 부트캠프 모집',
      position: '메인 히어로',
      status: 'active',
      startDate: '2024-12-01',
      endDate: '2025-01-31',
      image: "https://readdy.ai/api/search-image?query=startup%20bootcamp%20banner%20design%20with%20modern%20typography%2C%20professional%20business%20promotion%20banner%2C%20clean%20corporate%20design%20with%20call%20to%20action&width=400&height=200&seq=banner-1&orientation=landscape",
      views: 15420,
      clicks: 892
    },
    {
      id: 2,
      title: '커넥트원 데모데이 2024',
      position: '서브 배너',
      status: 'scheduled',
      startDate: '2024-12-20',
      endDate: '2024-12-31',
      image: "https://readdy.ai/api/search-image?query=demo%20day%20event%20banner%20with%20stage%20presentation%20graphics%2C%20innovation%20showcase%20promotion%2C%20professional%20event%20marketing%20banner&width=400&height=200&seq=banner-2&orientation=landscape",
      views: 8750,
      clicks: 456
    },
    {
      id: 3,
      title: '연말 특별 프로그램',
      position: '사이드바',
      status: 'ended',
      startDate: '2024-11-01',
      endDate: '2024-11-30',
      image: "https://readdy.ai/api/search-image?query=year%20end%20special%20program%20banner%20with%20festive%20design%2C%20holiday%20themed%20business%20promotion%2C%20seasonal%20marketing%20banner&width=400&height=200&seq=banner-3&orientation=landscape",
      views: 12300,
      clicks: 678
    }
  ];

  const pages = [
    {
      id: 1,
      title: '회사 소개',
      slug: '/about',
      status: 'published',
      lastModified: '2024-12-10',
      author: '관리자',
      views: 5420
    },
    {
      id: 2,
      title: '서비스 안내',
      slug: '/services',
      status: 'draft',
      lastModified: '2024-12-08',
      author: '콘텐츠팀',
      views: 0
    },
    {
      id: 3,
      title: '이용약관',
      slug: '/terms',
      status: 'published',
      lastModified: '2024-11-25',
      author: '법무팀',
      views: 2150
    }
  ];

  const articles = [
    {
      id: 1,
      title: '2025 커넥트원 온라인 창업 성장 프로그램 모집',
      category: '공지사항',
      author: '운영팀',
      status: 'published',
      publishDate: '2024-12-10',
      views: 1247,
      comments: 23
    },
    {
      id: 2,
      title: 'AI 스타트업 트렌드 분석 보고서',
      category: '인사이트',
      author: '리서치팀',
      status: 'scheduled',
      publishDate: '2024-12-15',
      views: 0,
      comments: 0
    },
    {
      id: 3,
      title: '커넥트원 데모데이 2024 성공적 개최',
      category: '뉴스',
      author: '마케팅팀',
      status: 'draft',
      publishDate: null,
      views: 0,
      comments: 0
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
      case 'published':
        return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">활성</span>;
      case 'scheduled':
        return <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">예약</span>;
      case 'draft':
        return <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">임시저장</span>;
      case 'ended':
        return <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">종료</span>;
      default:
        return null;
    }
  };

  const tabs = [
    { id: 'banners', name: '배너 관리', icon: 'ri-image-line' },
    { id: 'pages', name: '페이지 관리', icon: 'ri-file-text-line' },
    { id: 'articles', name: '글 관리', icon: 'ri-article-line' }
  ];

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        
        <main className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">콘텐츠 관리</h1>
                <p className="text-gray-600">웹사이트 콘텐츠를 관리하고 편집하세요</p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                새 콘텐츠 추가
              </button>
            </div>

            {/* 탭 네비게이션 */}
            <div className="bg-white rounded-xl shadow-sm mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors cursor-pointer whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <i className={`${tab.icon} mr-2 w-4 h-4 flex items-center justify-center inline-flex`}></i>
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>

              {/* 배너 관리 */}
              {activeTab === 'banners' && (
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {banners.map((banner) => (
                      <div key={banner.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="aspect-video relative">
                          <img
                            src={banner.image}
                            alt={banner.title}
                            className="w-full h-full object-cover object-top"
                          />
                          <div className="absolute top-3 right-3">
                            {getStatusBadge(banner.status)}
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-2">{banner.title}</h3>
                          <div className="space-y-2 text-sm text-gray-600 mb-4">
                            <div className="flex items-center">
                              <i className="ri-map-pin-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                              <span>{banner.position}</span>
                            </div>
                            <div className="flex items-center">
                              <i className="ri-calendar-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                              <span>{banner.startDate} ~ {banner.endDate}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <i className="ri-eye-line mr-1 w-4 h-4 flex items-center justify-center"></i>
                                <span>{banner.views.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center">
                                <i className="ri-cursor-line mr-1 w-4 h-4 flex items-center justify-center"></i>
                                <span>{banner.clicks.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                              편집
                            </button>
                            <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap">
                              미리보기
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 페이지 관리 */}
              {activeTab === 'pages' && (
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            페이지 제목
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            URL
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            상태
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            작성자
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            수정일
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            조회수
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            작업
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {pages.map((page) => (
                          <tr key={page.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{page.title}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-600">{page.slug}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {getStatusBadge(page.status)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {page.author}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {page.lastModified}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {page.views.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <button className="text-blue-600 hover:text-blue-900 cursor-pointer">편집</button>
                                <button className="text-gray-600 hover:text-gray-900 cursor-pointer">미리보기</button>
                                <button className="text-red-600 hover:text-red-900 cursor-pointer">삭제</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 글 관리 */}
              {activeTab === 'articles' && (
                <div className="p-6">
                  {/* 필터 */}
                  <div className="flex flex-wrap gap-4 mb-6">
                    <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8">
                      <option>전체 카테고리</option>
                      <option>공지사항</option>
                      <option>인사이트</option>
                      <option>뉴스</option>
                    </select>
                    <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8">
                      <option>전체 상태</option>
                      <option>발행됨</option>
                      <option>임시저장</option>
                      <option>예약발행</option>
                    </select>
                    <input
                      type="text"
                      placeholder="제목 검색..."
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            제목
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            카테고리
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            작성자
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            상태
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            발행일
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            조회/댓글
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            작업
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {articles.map((article) => (
                          <tr key={article.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                                {article.title}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                {article.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {article.author}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {getStatusBadge(article.status)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {article.publishDate || '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              <div className="flex items-center space-x-4">
                                <span className="flex items-center">
                                  <i className="ri-eye-line mr-1 w-4 h-4 flex items-center justify-center"></i>
                                  {article.views}
                                </span>
                                <span className="flex items-center">
                                  <i className="ri-chat-3-line mr-1 w-4 h-4 flex items-center justify-center"></i>
                                  {article.comments}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <Link 
                                  href={`/admin/content/articles/${article.id}/edit`}
                                  className="text-blue-600 hover:text-blue-900 cursor-pointer"
                                >
                                  편집
                                </Link>
                                <button className="text-gray-600 hover:text-gray-900 cursor-pointer">복제</button>
                                <button className="text-red-600 hover:text-red-900 cursor-pointer">삭제</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </AdminLayout>
  );
}