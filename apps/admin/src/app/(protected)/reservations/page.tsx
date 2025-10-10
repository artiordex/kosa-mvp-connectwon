'use client';

import { useState } from 'react';
import Scheduler from './Scheduler';
import SpaceReservation from './SpaceReservation';
import ProgramReservation from './ProgramReservation';

type TabType = 'space' | 'program' | 'schedule';

export default function ReservationPage() {
  const [activeTab, setActiveTab] = useState<TabType>('space');

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">통합 예약 관리</h1>
          <p className="text-gray-600 mt-1">공간 & 디바이스, 프로그램 예약, 스케줄을 한 곳에서 관리하세요.</p>
        </div>

        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('space')}
            className={`px-5 py-2 rounded-md text-sm font-medium transition ${
              activeTab === 'space'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <i className="ri-building-line mr-2"></i>공간
          </button>
          <button
            onClick={() => setActiveTab('program')}
            className={`px-5 py-2 rounded-md text-sm font-medium transition ${
              activeTab === 'program'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <i className="ri-book-line mr-2"></i>프로그램
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-5 py-2 rounded-md text-sm font-medium transition ${
              activeTab === 'schedule'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <i className="ri-calendar-line mr-2"></i>스케줄러
          </button>
        </div>
      </div>

      {/* 컨텐츠 */}
      {activeTab === 'space' && <SpaceReservation />}
      {activeTab === 'program' && <ProgramReservation />}
      {activeTab === 'schedule' && <Scheduler />}
    </div>
  );
}
