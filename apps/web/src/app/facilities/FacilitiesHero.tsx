/**
 * Description : FacilitiesHero.tsx - 📌 공간 / 시설 예약 히어로 섹션
 * Author : Shiwoo Min
 * Date : 2025-10-12
 */

'use client';

export default function FacilitiesHero() {
  return (
    <section
      className="relative py-28 text-white bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900"
      style={{
        backgroundImage: "url('/images/facilities_hero_bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 bg-black/55 mix-blend-multiply"></div>

      {/* 콘텐츠 */}
      <div className="relative max-w-6xl mx-auto px-4 text-center">
        {/* 태그 */}
        <span className="inline-block px-5 py-2 bg-blue-600/20 rounded-full text-yellow-300 text-sm font-semibold backdrop-blur-sm border border-blue-400/30 mb-6">
          FACILITIES
        </span>

        {/* 타이틀 */}
        <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6 tracking-tight text-white drop-shadow-md">
          ConnectWon 공간 & 장비 예약
        </h1>

        {/* 설명문 */}
        <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
          다양한 지점의 회의실, 세미나실, 스튜디오 등 공간을 예약하고
          <br className="hidden md:block" />
          필요한 장비를 함께 대여해보세요.
        </p>
      </div>
    </section>
  );
}
