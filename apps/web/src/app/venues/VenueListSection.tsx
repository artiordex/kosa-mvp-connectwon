'use client';

import Link from 'next/link';





export default function CentersList() {
  // 센터 데이터 JSON
  const centers = [
    {
      id: 'gangnam',
      name: '강남센터',
      location: '서울 강남구',
      size: '2,685㎡',
      workspace: '독립공간 22실',
      hours: '연중무휴',
      image: '/images/venue_sp_1.jpg',
    },
    {
      id: 'mapo',
      name: '마포센터',
      location: '서울 마포구',
      size: '1,850㎡',
      workspace: '독립공간 16실',
      hours: '연중무휴',
      image: '/images/venue_sp_2.jpg',
    },
    {
      id: 'gwangmyeong',
      name: '광명센터',
      location: '경기 광명시',
      size: '1,200㎡',
      workspace: '독립공간 12실',
      hours: '연중무휴',
      image: '/images/venue_sp_3.jpg',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">공간 소개</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            <span className="block">청년 창업가들의 꿈과 희망을 키우는</span>
            <span className="block mt-2">
              <strong className="text-orange-600">커넥트원</strong> <strong>공간</strong> 입니다.
            </span>
          </p>
          <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
            커넥트원은 국내 총 3개 센터로 이루어져 있으며, 서울지역 2개, 광명지역 1개의 센터를 운영 중에 있습니다.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {centers.map(center => (
            <Link key={center.id} href={`/venues/${center.id}`} className="group">
              <div className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={center.image}
                    alt={center.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{center.name}</h3>
                    <p className="text-sm opacity-90">{center.location}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>센터규모</span>
                      <span className="font-medium text-gray-900">{center.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>업무공간</span>
                      <span className="font-medium text-gray-900">{center.workspace}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>운영시간</span>
                      <span className="font-medium text-gray-900">{center.hours}</span>
                    </div>
                  </div>
                  <div className="mt-4 text-orange-600 font-medium text-sm flex items-center group-hover:text-orange-700">
                    자세히 보기
                    <i className="ri-arrow-right-line ml-2 w-4 h-4 flex items-center justify-center"></i>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
