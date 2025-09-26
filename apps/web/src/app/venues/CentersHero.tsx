
'use client';

export default function CentersHero() {
  return (
    <section 
      className="relative h-96 flex items-center justify-center bg-cover bg-center text-white"
      style={{
        backgroundImage: 'url("https://readdy.ai/api/search-image?query=modern%20coworking%20space%20interior%20with%20comfortable%20seating%20area%2C%20contemporary%20office%20design%2C%20warm%20lighting%2C%20professional%20workspace%20atmosphere%2C%20clean%20minimalist%20design%20with%20orange%20accent%20colors&width=1920&height=600&seq=centers-hero-bg&orientation=landscape")',
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
