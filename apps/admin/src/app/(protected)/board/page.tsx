/**
 * Description : page.tsx - 📌 ConnectWon 게시판 통합 관리 메인 페이지
 * Author : Shiwoo Min
 * Date : 2025-10-11
 */
'use client';

import { useState } from 'react';
import BoardManagement from './BoardManagement';
import ContentCreation from './ContentCreation';

type MainTab = 'management' | 'content';

export default function BoardPage() {
  const [activeTab, setActiveTab] = useState<MainTab>('management');

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">게시판 통합 관리</h1>
          <p className="text-gray-600 mt-1">게시글 관리부터 콘텐츠 제작까지 한 곳에서</p>
        </div>

        {/* 탭 선택 */}
        <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('management')}
            className={`px-6 py-2 rounded-md font-medium transition-all ${
              activeTab === 'management'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <i className="ri-settings-4-line mr-2"></i>
            게시판 관리
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`px-6 py-2 rounded-md font-medium transition-all ${
              activeTab === 'content'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <i className="ri-pencil-line mr-2"></i>
            콘텐츠 제작
          </button>
        </div>
      </div>

      {/* 컨텐츠 영역 */}
      {activeTab === 'management' ? <BoardManagement /> : <ContentCreation />}
    </div>
  );
}
