/**
 * Description : layout.tsx - 📌 ConnectWon 시설 관리 공통 레이아웃
 * Author : Shiwoo Min
 * Date : 2025-10-12
 */
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

type FacilityTab = 'venue' | 'room' | 'equipment';

export default function FacilitiesLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  // 현재 탭 자동 감지 (URL 기준)
  const currentTab: FacilityTab =
    pathname.includes('/rooms') ? 'room' :
    pathname.includes('/equipments') ? 'equipment' :
    'venue';

  const tabs = [
    { key: 'venue', label: '지점 관리', icon: 'ri-community-line', desc: '지점(센터) 등록 및 관리', href: '/facilities/venues' },
    { key: 'room', label: '공간 관리', icon: 'ri-door-open-line', desc: '회의실, 세미나실 등 공간 관리', href: '/facilities/rooms' },
    { key: 'equipment', label: '장비 관리', icon: 'ri-tools-line', desc: '장비 및 비품 관리', href: '/facilities/equipments' },
  ];

  return (
    <div className="space-y-6">
      {/* 공통 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">통합 공간 및 장비 관리</h1>
          <p className="text-gray-600 mt-1">
            지점, 공간, 설비 정보를 통합적으로 관리 할 수 있습니다.
          </p>
        </div>

        {/* 탭 선택 */}
        <div className="flex flex-wrap gap-2 bg-gray-100 p-1 rounded-lg shadow-inner">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => router.push(tab.href)}
              className={`px-5 py-2 rounded-md font-medium flex items-center transition-all ${
                currentTab === tab.key
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <i className={`${tab.icon} mr-2 text-lg`} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 현재 탭 설명 */}
      <div className="bg-blue-50 border border-blue-100 p-4 rounded-md text-blue-700 text-sm flex items-center">
        <i className="ri-information-line mr-2 text-base" />
        {tabs.find((t) => t.key === currentTab)?.desc}
      </div>

      {/* 각 하위 페이지 렌더 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
