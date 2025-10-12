/**
 * Description : CreatorHero.tsx - 📌 크리에이터 히어로
 * Author : Shiwoo Min
 * Date : 2025-10-10
 */

'use client';

export default function CreatorHero() {
  return (
    <section
      className="relative py-28 text-white bg-gradient-to-br from-gray-800 to-gray-900"
      style={{
        backgroundImage: "url('/images/creator_hero_bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* 콘텐츠 */}
      <div className="relative max-w-6xl mx-auto px-4 text-center">
        <div className="mb-10">
          {/* 태그 */}
          <span className="inline-block px-5 py-2 bg-blue-600/20 rounded-full text-orange-400 text-sm font-semibold backdrop-blur-sm border border-blue-400/30">
            CREATOR
          </span>

          {/* 타이틀 */}
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6 tracking-tight">
            ConnectWon의 크리에이터들을 소개합니다
          </h1>

          {/* 설명문 */}
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            혁신적인 아이디어와 전문성을 갖춘 다양한 분야의 크리에이터들이
            <br className="hidden md:block" />
            여러분의 성공을 함께 지원합니다.
          </p>
        </div>
      </div>
    </section>
  );
}
