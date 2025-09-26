
'use client';

export default function FamilyHero() {
  return (
    <section 
      className="relative py-24 bg-gradient-to-br from-gray-800 to-gray-900 text-white"
      style={{
        backgroundImage: `url('https://readdy.ai/api/search-image?query=creative%20startup%20workspace%20with%20entrepreneurs%20and%20innovators%2C%20modern%20collaborative%20environment%20with%20creative%20professionals%2C%20inspiring%20coworking%20space%20atmosphere%2C%20contemporary%20design%20studio%20setting&width=1920&height=600&seq=creator-hero&orientation=landscape')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative max-w-6xl mx-auto px-4 text-center">
        <div className="mb-8">
          <span className="text-orange-400 text-lg font-medium tracking-wide">CREATOR</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6">ConnectWon의 크리에이터들을 소개합니다</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            혁신적인 아이디어와 전문성을 갖춘 다양한 분야의 크리에이터들이 여러분의 성공을 지원합니다
          </p>
        </div>
        
        {/* 통계 섹션 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-full p-6 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-global-line text-orange-500 text-2xl w-8 h-8 flex items-center justify-center"></i>
            </div>
            <div className="text-sm text-gray-200 mb-1">시작일</div>
            <div className="text-2xl font-bold">2014년</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-full p-6 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-user-star-line text-orange-500 text-2xl w-8 h-8 flex items-center justify-center"></i>
            </div>
            <div className="text-sm text-gray-200 mb-1">활동 크리에이터</div>
            <div className="text-2xl font-bold">128명</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-full p-6 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-hand-heart-line text-orange-500 text-2xl w-8 h-8 flex items-center justify-center"></i>
            </div>
            <div className="text-sm text-gray-200 mb-1">총 투자 유치액</div>
            <div className="text-2xl font-bold">6,951억원</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-full p-6 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-trophy-line text-orange-500 text-2xl w-8 h-8 flex items-center justify-center"></i>
            </div>
            <div className="text-sm text-gray-200 mb-1">성공 프로젝트</div>
            <div className="text-2xl font-bold">89개</div>
          </div>
        </div>
      </div>
    </section>
  );
}
