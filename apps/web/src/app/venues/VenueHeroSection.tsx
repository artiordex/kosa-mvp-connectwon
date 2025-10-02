
'use client';

export default function CentersHero() {
  return (
    <section
      className="relative h-96 flex items-center justify-center bg-cover bg-center text-white"
      style={{
        backgroundImage: 'url("/images/venues_hero_bg.jpg")',
        minHeight: '384px'
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 text-center">
        <div className="mb-4">
          <span className="inline-block px-4 py-2 bg-orange-600/20 rounded-full text-orange-200 text-sm font-medium backdrop-blur-sm border border-orange-400/30">
            CENTER
          </span>
        </div>

        <h1 className="text-5xl font-bold mb-6">
          공간 소개
        </h1>
      </div>
    </section>
  );
}
