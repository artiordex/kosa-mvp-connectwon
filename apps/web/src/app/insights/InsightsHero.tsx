/**
 * Description : InsightsHero.tsx - 📌 인사이트 섹션 상단 Hero 영역
 * Author : Shiwoo Min
 * Date : 2025-10-10
 */

export default function InsightsHero() {
  return (
    <section
      className="relative py-32 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url('https://readdy.ai/api/search-image?query=modern%20workspace%20with%20person%20reading%20newspaper%20and%20laptop%2C%20business%20professional%20staying%20informed%20about%20industry%20trends%2C%20knowledge%20sharing%20and%20insights%2C%20clean%20minimalist%20office%20environment%2C%20natural%20lighting&width=1200&height=600&seq=insights-hero&orientation=landscape')`,
      }}
    >
      <div className="max-w-6xl mx-auto px-4 text-center text-white">
        {/* 🔹 상단 블루 캡슐 라벨 */}
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-blue-600/20 rounded-full text-blue-200 text-sm font-medium backdrop-blur-sm border border-blue-400/30">
            INSIGHT
          </span>
        </div>

        {/* 메인 타이틀 */}
        <h1 className="text-5xl font-bold mb-4">인사이트</h1>

        {/* 서브 텍스트 (선택) */}
        <p className="text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
          커넥트원의 전문가 인사이트와 트렌드를 통해 새로운 아이디어를 얻어보세요.
        </p>
      </div>
    </section>
  );
}
