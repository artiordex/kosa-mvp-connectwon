// app/admin/programs/page.tsx
/**
 * Description : page.tsx - 📌 ConnectWon 프로그램 통합 관리 메인 페이지
 * Author : Shiwoo Min
 * Date : 2025-10-11
 */
'use client';

import { useState } from 'react';
import OnlineProgram from './OnlineProgram';
import OfflineProgram from './OfflineProgram';
import PostProgram from './add/Post';

type MainTab = 'online' | 'offline' | 'post';

export default function ProgramPage() {
  const [activeTab, setActiveTab] = useState<MainTab>('online');

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">프로그램 통합 관리</h1>
          <p className="text-gray-600 mt-1">온라인/오프라인 프로그램을 한 곳에서 관리하세요</p>
        </div>

        {/* 탭 선택 */}
        <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
          {[
            { key: 'online', label: '온라인 프로그램', icon: 'ri-global-line' },
            { key: 'offline', label: '오프라인 프로그램', icon: 'ri-building-line' },
            { key: 'post', label: '프로그램 게시', icon: 'ri-edit-2-line' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as MainTab)}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === tab.key
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <i className={`${tab.icon} mr-2`}></i>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 컨텐츠 영역 */}
      {activeTab === 'online' && <OnlineProgram />}
      {activeTab === 'offline' && <OfflineProgram />}
      {activeTab === 'post' && <PostProgram />}
    </div>
  );
}
