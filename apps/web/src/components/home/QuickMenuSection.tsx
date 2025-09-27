'use client';

import Link from 'next/link';

/**
 * @description 홈 화면 - 서비스 메뉴 섹션
 * - 4등분 레이아웃 (아이콘 + 텍스트 설명)
 * - Hover 시 배경 파란색, 글씨/아이콘 흰색으로 변경
 * - 구분선을 회색으로 설정
 */
export default function ServiceMenuSection() {
  const menus = [
    {
      icon: 'ri-graduation-cap-line',
      title: '커넥트원 프로그램',
      description: '창업·개발·네트워킹까지 다양한 프로그램을 제공합니다.',
      link: '/programs',
    },
    {
      icon: 'ri-computer-line',
      title: '커넥트원 디바이스',
      description: '다양한 최신 장비를 무료로 대여·이용해보세요.',
      link: '/devices',
    },
    {
      icon: 'ri-building-line',
      title: '커넥트원 공간안내',
      description: '다양한 공간을 용도에 맞게 자유롭게 이용해보세요.',
      link: '/spaces',
    },
    {
      icon: 'ri-information-line',
      title: '커넥트원 이용가이드',
      description: '이용에 필요한 절차와 유의사항을 안내드립니다.',
      link: '/guide',
    },
  ];

  return (
    <section className="bg-white border-t border-b border-gray-100">
      <div className="min-w-[90%] mx-auto grid grid-cols-1 md:grid-cols-4 divide-y divide-gray-100 md:divide-y-0 md:divide-x md:divide-x-gray-200">
        {menus.map((item, index) => (
          <Link key={index} href={item.link} className="group flex items-start p-12 min-h-[160px] hover:bg-blue-600 transition-colors">
            {/* 아이콘 (2배 크기) */}
            <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center text-blue-600 text-5xl mr-6 group-hover:text-white">
              <i className={item.icon}></i>
            </div>

            {/* 텍스트 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-white">{item.title}</h3>
              <p className="text-lg text-gray-600 leading-snug group-hover:text-white">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
