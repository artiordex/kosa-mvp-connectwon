/**
 * Description : ContentCreation.tsx - 📌 콘텐츠 제작 컴포넌트 (배너, 페이지, 글쓰기)
 * Author : Shiwoo Min
 * Date : 2025-10-11
 */
'use client';

import { useState } from 'react';

type ContentTab = 'write' | 'banners' | 'pages';
type PostType = 'notice' | 'program' | 'general';

export default function ContentCreation() {
  const [activeTab, setActiveTab] = useState<ContentTab>('write');

  return (
    <div className="space-y-6">
      {/* 탭 네비게이션 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          <TabButton
            active={activeTab === 'write'}
            onClick={() => setActiveTab('write')}
            icon="ri-edit-line"
            label="글쓰기"
          />
          <TabButton
            active={activeTab === 'banners'}
            onClick={() => setActiveTab('banners')}
            icon="ri-image-line"
            label="배너 관리"
          />
          <TabButton
            active={activeTab === 'pages'}
            onClick={() => setActiveTab('pages')}
            icon="ri-file-text-line"
            label="페이지 관리"
          />
        </div>

        <div className="p-6">
          {activeTab === 'write' && <WritePost />}
          {activeTab === 'banners' && <BannerManagement />}
          {activeTab === 'pages' && <PageManagement />}
        </div>
      </div>
    </div>
  );
}

/* ==================== 탭 버튼 컴포넌트 ==================== */
function TabButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: string; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all border-b-2 ${
        active
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
      }`}
    >
      <i className={`${icon} text-lg`}></i>
      <span>{label}</span>
    </button>
  );
}

/* ==================== 1. 글쓰기 ==================== */
function WritePost() {
  const [postType, setPostType] = useState<PostType>('notice');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (isDraft: boolean) => {
    console.log('Submit:', { postType, title, content, isDraft });
    alert(isDraft ? '임시저장되었습니다' : '게시되었습니다');
  };

  return (
    <div className="space-y-6">
      {/* 게시글 유형 선택 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">게시글 유형</label>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setPostType('notice')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              postType === 'notice' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <i className="ri-notification-line mr-1"></i>
            공지사항
          </button>
          <button
            onClick={() => setPostType('program')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              postType === 'program' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <i className="ri-book-2-line mr-1"></i>
            프로그램 안내
          </button>
          <button
            onClick={() => setPostType('general')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              postType === 'general' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <i className="ri-article-line mr-1"></i>
            일반글
          </button>
        </div>
      </div>

      {/* 제목 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="게시글 제목을 입력하세요"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 내용 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">내용</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="게시글 내용을 입력하세요"
          rows={12}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {/* 파일 업로드 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">첨부파일</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
          <i className="ri-upload-cloud-line text-4xl text-gray-400 mb-2"></i>
          <p className="text-sm text-gray-600">클릭하거나 파일을 드래그하여 업로드</p>
          <p className="text-xs text-gray-500 mt-1">이미지, PDF, 문서 파일 (최대 10MB)</p>
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex items-center justify-end space-x-3 pt-4 border-t">
        <button
          onClick={() => handleSubmit(true)}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
        >
          임시저장
        </button>
        <button
          onClick={() => handleSubmit(false)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          게시하기
        </button>
      </div>
    </div>
  );
}

/* ==================== 2. 배너 관리 ==================== */
function BannerManagement() {
  const banners = [
    {
      id: 1,
      title: '신규 회원 특별 할인',
      image: '/images/banner1.jpg',
      position: '메인 페이지 상단',
      startDate: '2025-10-01',
      endDate: '2025-10-31',
      views: 15234,
      clicks: 892,
      status: 'active'
    },
    {
      id: 2,
      title: '요가 클래스 오픈',
      image: '/images/banner2.jpg',
      position: '프로그램 페이지',
      startDate: '2025-10-05',
      endDate: '2025-11-05',
      views: 8456,
      clicks: 523,
      status: 'active'
    },
    {
      id: 3,
      title: '겨울 시즌 이벤트',
      image: '/images/banner3.jpg',
      position: '메인 페이지 하단',
      startDate: '2025-11-01',
      endDate: '2025-12-31',
      views: 0,
      clicks: 0,
      status: 'scheduled'
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">활성</span>;
      case 'scheduled':
        return <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">예약</span>;
      case 'ended':
        return <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">종료</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* 새 배너 추가 버튼 */}
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
          <i className="ri-add-line mr-2"></i>
          새 배너 추가
        </button>
      </div>

      {/* 배너 목록 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {banners.map(banner => (
          <div key={banner.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative bg-gray-200">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <i className="ri-image-line text-6xl"></i>
              </div>
              <div className="absolute top-3 right-3">{getStatusBadge(banner.status)}</div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{banner.title}</h3>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <i className="ri-map-pin-line mr-2"></i>
                  <span>{banner.position}</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-calendar-line mr-2"></i>
                  <span>
                    {banner.startDate} ~ {banner.endDate}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <i className="ri-eye-line mr-1"></i>
                    <span>{banner.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center">
                    <i className="ri-cursor-line mr-1"></i>
                    <span>{banner.clicks.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
                  편집
                </button>
                <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors">
                  미리보기
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==================== 3. 페이지 관리 ==================== */
function PageManagement() {
  const pages = [
    { id: 1, title: '회사 소개', slug: '/about', status: 'published', author: '관리자', lastModified: '2025-10-09', views: 2341 },
    { id: 2, title: '서비스 안내', slug: '/services', status: 'published', author: '관리자', lastModified: '2025-10-08', views: 1823 },
    { id: 3, title: '이용 약관', slug: '/terms', status: 'published', author: '법무팀', lastModified: '2025-10-01', views: 956 },
    { id: 4, title: '개인정보처리방침', slug: '/privacy', status: 'published', author: '법무팀', lastModified: '2025-10-01', views: 1234 },
    { id: 5, title: '신규 프로그램 소개', slug: '/new-programs', status: 'draft', author: '운영팀', lastModified: '2025-10-10', views: 0 },
  ];

  const getStatusBadge = (status: string) => {
    return status === 'published'
      ? <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">발행됨</span>
      : <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">임시저장</span>;
  };

  return (
    <div className="space-y-6">
      {/* 새 페이지 추가 버튼 */}
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
          <i className="ri-add-line mr-2"></i>
          새 페이지 추가
        </button>
      </div>

      {/* 페이지 목록 */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">페이지 제목</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작성자</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">수정일</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">조회수</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작업</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pages.map(page => (
              <tr key={page.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{page.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">{page.slug}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(page.status)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{page.author}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{page.lastModified}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{page.views.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">편집</button>
                    <button className="text-gray-600 hover:text-gray-900">미리보기</button>
                    <button className="text-red-600 hover:text-red-900">삭제</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
