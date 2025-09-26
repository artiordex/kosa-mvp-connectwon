
'use client';

export default function ValueIntroduction() {
  const values = [
    {
      icon: "ri-lightbulb-line",
      title: "사회 문제 해결에 기여",
      description: "창업과 교육을 통해 사회의 다양한 문제를 해결하고, 혁신적인 아이디어로 더 나은 사회를 만들어갑니다."
    },
    {
      icon: "ri-building-line",
      title: "경제 활성화와 일자리 창출",
      description: "지역 기반 스타트업 육성과 창업 생태계 조성을 통해 경제 발전과 양질의 일자리 창출에 기여합니다."
    },
    {
      icon: "ri-team-line",
      title: "건강한 창업·도전 문화 확산",
      description: "도전을 두려워하지 않는 문화를 조성하고, 실패를 성장의 기회로 받아들이는 건강한 창업 문화를 확산합니다."
    },
    {
      icon: "ri-user-heart-line",
      title: "청년들의 자립과 성장 지원",
      description: "차세대 인재들이 자립할 수 있는 역량을 기르고, 지속적인 성장을 통해 사회에 기여할 수 있도록 지원합니다."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* WHY 섹션 */}
        <div className="text-center mb-20">
          <div className="mb-8">
            <span className="text-5xl font-bold text-orange-500">WHY</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-4">
              더 나은 도전과 성장을 위한 <span className="text-orange-500">ConnectWon</span>의 사회적 가치 추구
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
            ConnectWon은 도전과 취·창업을 준비하는 차세대 인재들이 성장할 수 있도록 지원하며, 
            다양한 파트너십과 협력을 통해 지속 가능한 창업·커리어 생태계를 만들어가고 있습니다.
            <br /><br />
            우리는 사회적 가치를 실현하는 과정에서 회원과 지역사회, 파트너와 함께 성장하며, 
            더 나은 미래를 열어나가는 것을 목표로 합니다.
          </p>
        </div>

        {/* HOW 섹션 */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <span className="text-5xl font-bold text-orange-500">HOW</span>
            <h3 className="text-4xl font-bold text-gray-900 mt-4">
              <span className="text-orange-500">ConnectWon</span>의 사회적 가치 추구 Flow
            </h3>
          </div>

          {/* Flow 다이어그램 */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm mb-16">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* 하는 일 */}
              <div className="text-center">
                <h4 className="text-2xl font-bold text-gray-900 mb-6">하는 일</h4>
                <div className="space-y-4">
                  <div className="bg-gray-100 rounded-2xl p-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i className="ri-lightbulb-line text-orange-600 w-6 h-6 flex items-center justify-center text-xl"></i>
                    </div>
                    <p className="font-medium text-gray-900">혁신 아이디어와<br />인재 발굴</p>
                  </div>
                  <div className="bg-gray-100 rounded-2xl p-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i className="ri-graduation-cap-line text-blue-600 w-6 h-6 flex items-center justify-center text-xl"></i>
                    </div>
                    <p className="font-medium text-gray-900">미래형 기업가<br />양성</p>
                  </div>
                  <div className="bg-gray-100 rounded-2xl p-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i className="ri-community-line text-green-600 w-6 h-6 flex items-center justify-center text-xl"></i>
                    </div>
                    <p className="font-medium text-gray-900">지역 기반 스타트업 및<br />커뮤니티 성장 지원</p>
                  </div>
                </div>
              </div>

              {/* 역할 */}
              <div className="text-center">
                <h4 className="text-2xl font-bold text-gray-900 mb-6">역할</h4>
                <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl p-8 text-white h-full flex flex-col justify-center">
                  <div className="mb-6">
                    <i className="ri-rocket-line w-16 h-16 flex items-center justify-center text-4xl mx-auto mb-4"></i>
                  </div>
                  <div className="space-y-4">
                    <p className="font-bold text-lg">창업과 커리어 도전을 위한<br />지속 가능한 생태계 조성</p>
                    <div className="h-px bg-white/30 my-4"></div>
                    <p className="font-bold text-lg">함께 배우고 성장하는<br />커뮤니티 형성</p>
                  </div>
                </div>
              </div>

              {/* 사회적 가치 */}
              <div className="text-center">
                <h4 className="text-2xl font-bold text-gray-900 mb-6">사회적 가치</h4>
                <div className="space-y-4">
                  <div className="bg-orange-500 text-white rounded-2xl p-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i className="ri-heart-line text-white w-6 h-6 flex items-center justify-center text-xl"></i>
                    </div>
                    <p className="font-medium">사회 문제 해결에 기여</p>
                  </div>
                  <div className="bg-emerald-500 text-white rounded-2xl p-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i className="ri-line-chart-line text-white w-6 h-6 flex items-center justify-center text-xl"></i>
                    </div>
                    <p className="font-medium">경제 활성화와<br />일자리 창출</p>
                  </div>
                  <div className="bg-blue-500 text-white rounded-2xl p-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i className="ri-group-line text-white w-6 h-6 flex items-center justify-center text-xl"></i>
                    </div>
                    <p className="font-medium">건강한 창업·도전<br />문화 확산</p>
                  </div>
                  <div className="bg-purple-500 text-white rounded-2xl p-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i className="ri-user-heart-line text-white w-6 h-6 flex items-center justify-center text-xl"></i>
                    </div>
                    <p className="font-medium">청년들의 자립과<br />성장 지원</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 사회적 가치 상세 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                <i className={`${value.icon} text-orange-600 w-8 h-8 flex items-center justify-center text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-3xl p-8 md:p-12 shadow-sm">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                지역 사회와 함께하는 <br />
                <span className="text-orange-500">창업 생태계 조성</span>
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                ConnectWon은 단순히 공간과 프로그램을 제공하는 것을 넘어서, 지역 사회의 창업 인프라를 
                강화하고 모든 도전자들이 성공할 수 있는 환경을 조성하고 있습니다.
              </p>
              <p className="text-gray-600 leading-relaxed">
                우리의 모든 활동은 지역 사회의 지속 가능한 발전과 청년 창업가 육성, 
                그리고 혁신적인 비즈니스 생태계 구축이라는 목표를 향해 나아가고 있습니다.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://readdy.ai/api/search-image?query=young%20entrepreneurs%20working%20together%20in%20modern%20startup%20incubator%20space%2C%20collaborative%20workspace%20with%20diverse%20team%20members%20brainstorming%2C%20innovative%20business%20environment%20with%20creative%20atmosphere%2C%20bright%20and%20inspiring%20coworking%20space&width=600&height=400&seq=startup-ecosystem&orientation=landscape"
                alt="창업 생태계"
                className="rounded-2xl shadow-lg object-cover w-full h-80"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
