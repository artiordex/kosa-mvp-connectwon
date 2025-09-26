
'use client';

export default function SocialValueHero() {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center text-white pt-20"
      style={{
        backgroundImage: 'url("https://readdy.ai/api/search-image?query=diverse%20group%20of%20young%20entrepreneurs%20working%20together%20in%20modern%20shared%20workspace%2C%20professional%20lighting%2C%20collaborative%20atmosphere%2C%20warm%20and%20inviting%20workspace%2C%20modern%20startup%20office%20environment%20with%20clean%20design%20and%20natural%20lighting&width=1920&height=1080&seq=social-hero-bg&orientation=landscape")'
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-blue-600/20 rounded-full text-blue-200 text-sm font-medium backdrop-blur-sm border border-blue-400/30">
            SOCIAL VALUE
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          <span className="block">함께 성장하는</span>
          <span className="block text-blue-400">사회적 가치</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-12">
          커넥트원은 단순한 프로그램 제공을 넘어, 지역 사회와 함께 성장하며 
          <br className="hidden md:block" />
          지속 가능한 교육 생태계를 구축해 나가고 있습니다
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
            사회적 가치 알아보기
          </button>
          <button className="px-8 py-4 border-2 border-white/30 hover:border-white text-white font-medium rounded-lg transition-colors backdrop-blur-sm">
            임팩트 스토리 보기
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <i className="ri-arrow-down-line text-white w-6 h-6 flex items-center justify-center text-2xl"></i>
      </div>
    </section>
  );
}
