/**
 * Description : ProgramHero.tsx - 📌 프로그램 히어로
 * Author : Shiwoo Min
 * Date : 2025-10-11
 */

'use client';

export default function ProgramHero() {
  return (
    <section
      className="relative py-28 text-white bg-gradient-to-br from-indigo-800 to-indigo-900"
      style={{
        backgroundImage: "url('/images/program_hero_bg.png')",
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
          <span className="inline-block px-5 py-2 bg-indigo-600/20 rounded-full text-yellow-300 text-sm font-semibold backdrop-blur-sm border border-indigo-400/30">
            PROGRAM
          </span>

          {/* 타이틀 */}
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6 tracking-tight">
            ConnectWon의 주요 프로그램을 만나보세요
          </h1>

          {/* 설명문 */}
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            창업, 협업, 교육을 위한 다양한 프로그램이
            <br className="hidden md:block" />
            여러분의 성장과 도전을 함께합니다.
          </p>
        </div>
      </div>
    </section>
  );
}
