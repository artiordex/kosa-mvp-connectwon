
'use client';

export default function PartnershipsSection() {
  const partners = [
    {
      type: "공공기관",
      name: "서울시 평생교육진흥원",
      description: "지역 평생교육 활성화를 위한 공동 프로그램 운영",
      collaboration: "교육과정 개발 및 운영"
    },
    {
      type: "교육기관",
      name: "지역 대학교 산학협력단",
      description: "대학 자원을 활용한 지역사회 교육 서비스 확대",
      collaboration: "전문가 파견 및 시설 공유"
    },
    {
      type: "사회적 기업",
      name: "희망나눔 사회적협동조합",
      description: "취약계층 대상 직업교육 및 일자리 창출 지원",
      collaboration: "교육-취업 연계 서비스"
    },
    {
      type: "지역단체",
      name: "마포구 자원봉사센터",
      description: "지역 자원봉사자와 함께하는 교육 멘토링 프로그램",
      collaboration: "멘토-멘티 매칭 시스템"
    },
    {
      type: "기업",
      name: "지역 중소기업 연합회",
      description: "실무 중심 직업교육과 현장 인턴십 기회 제공",
      collaboration: "현장 실습 및 취업 연계"
    },
    {
      type: "NGO",
      name: "다문화가족지원센터",
      description: "다문화 가정의 교육 접근성 향상 및 문화 통합 지원",
      collaboration: "언어교육 및 문화교류"
    }
  ];

  const achievements = [
    {
      number: "25+",
      label: "파트너 기관",
      description: "다양한 분야의 협력 기관"
    },
    {
      number: "1,200+",
      label: "협력 프로그램 수혜자",
      description: "파트너십을 통한 교육 수혜"
    },
    {
      number: "15개",
      label: "공동 프로젝트",
      description: "진행 중인 협력 사업"
    },
    {
      number: "89%",
      label: "만족도",
      description: "파트너 기관 만족도"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            함께하는 <span className="text-blue-600">파트너십</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            지역사회의 다양한 기관들과 협력하여 더 큰 사회적 가치를 창출하고 
            지속 가능한 교육 생태계를 만들어가고 있습니다
          </p>
        </div>

        {/* 성과 지표 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {achievements.map((achievement, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{achievement.number}</div>
              <div className="text-lg font-semibold text-gray-900 mb-1">{achievement.label}</div>
              <div className="text-sm text-gray-600">{achievement.description}</div>
            </div>
          ))}
        </div>

        {/* 파트너 소개 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {partners.map((partner, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  {partner.type}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{partner.name}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{partner.description}</p>
              <div className="border-t pt-4">
                <span className="text-xs text-gray-500">협력 내용</span>
                <p className="text-sm font-medium text-gray-900 mt-1">{partner.collaboration}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 파트너십 프로세스 */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
            파트너십 협력 프로세스
          </h3>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-lightbulb-line text-blue-600 w-8 h-8 flex items-center justify-center text-2xl"></i>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">제안 및 기획</h4>
              <p className="text-sm text-gray-600">협력 아이디어 발굴 및 사업 계획 수립</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-handshake-line text-blue-600 w-8 h-8 flex items-center justify-center text-2xl"></i>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">협약 체결</h4>
              <p className="text-sm text-gray-600">상호 협력 조건 합의 및 공식 파트너십 체결</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-team-line text-blue-600 w-8 h-8 flex items-center justify-center text-2xl"></i>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">공동 실행</h4>
              <p className="text-sm text-gray-600">각 기관의 강점을 활용한 프로그램 운영</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-bar-chart-line text-blue-600 w-8 h-8 flex items-center justify-center text-2xl"></i>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">성과 평가</h4>
              <p className="text-sm text-gray-600">협력 성과 측정 및 개선점 도출</p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            새로운 파트너를 찾고 있습니다
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            사회적 가치 창출에 함께 참여하실 기관이나 단체가 있으시면 언제든 연락해 주세요. 
            함께 더 나은 지역사회를 만들어갑시다.
          </p>
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
            파트너십 문의하기
          </button>
        </div>
      </div>
    </section>
  );
}