/**
 * Description : FacilitiesSelector.tsx - 📌 공간 / 디바이스 선택 네비게이션 바
 * Author : Shiwoo Min
 * Date : 2025-10-12
 */

'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function FacilitiesSelector() {
  const router = useRouter();
  const pathname = usePathname();

  // 버튼 탭 데이터
  const tabs = [
    {
      key: 'reservations',
      label: '커넥트원 통합 예약',
      href: '/facilities/reservations',
      icon: 'ri-calendar-check-line',
    },
    {
      key: 'venues',
      label: '커넥트원 공간 안내',
      href: '/facilities/venues',
      icon: 'ri-community-line',
    },
    {
      key: 'equipments',
      label: '커넥트원 디바이스 안내',
      href: '/facilities/equipments',
      icon: 'ri-cpu-line',
    },
  ];

  const currentTab = tabs.find((t) => pathname === t.href)?.key || 'reservations';

  return (
    <div className="relative z-20 -mt-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        <div className="grid grid-cols-3 divide-x divide-gray-200">
          {tabs.map((tab) => {
            const isActive = currentTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => router.push(tab.href)}
                className={`w-full py-4 text-sm md:text-base font-semibold transition-all duration-200 flex items-center justify-center gap-2
                  ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
              >
                <i className={`${tab.icon} text-lg`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
