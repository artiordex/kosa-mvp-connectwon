
'use client';

export default function ProgramsSection() {
  const programs = [
    {
      category: "교육 지원",
      title: "꿈나무 장학 프로그램",
      description: "경제적 어려움으로 교육 기회를 놓치는 청소년들에게 학습비와 멘토링을 제공하는 프로그램입니다.",
      beneficiaries: "연간 100명",
      period: "연중",
      color: "bg-blue-500"
    },
    {
      category: "지역 협력",
      title: "마을 교육 공동체",
      description: "지역 주민들이 서로의 재능을 공유하고 함께 성장할 수 있는 상호 학습 네트워크를 구축합니다.",
      beneficiaries: "5개 마을",
      period: "상시",
      color: "bg-green-500"
    },
    {
      category: "취약계층 지원",
      title: "실버 디지털 아카데미",
      description: "고령자들의 디지털 적응력 향상을 위한 맞춤형 IT 교육과 생활 밀착형 디지털 서비스 이용 교육을 진행합니다.",
      beneficiaries: "월 80명",
      period: "주 3회",
      color: "bg-purple-500"
    },
    {
      category: "환경",
      title: "Green Campus 프로젝트",
      description: "친환경 교육 환경 조성과 함께 학습자들의 환경 의식 개선을 위한 다양한 실천 활동을 전개합니다.",
      beneficiaries: "전체 이용자",
      period: "연중",
      color: "bg-emerald-500"
    },
    {
      category: "사회적 기업",
      title: "소셜 임팩트 인큐베이터",
      description: "사회 문제 해결을 목표로 하는 스타트업과 사회적 기업의 성장을 위한 멘토링과 네트워킹을 지원합니다.",
      beneficiaries: "30개 팀",
      period: "6개월 과정",
      color: "bg-orange-500"
    },
    {
      category: "다문화",
      title: "글로벌 브릿지 프로그램",
      description: "다문화 가정과 외국인 학습자들의 한국 생활 적응을 돕고 상호 문화 이해를 증진하는 프로그램입니다.",
      beneficiaries: "연간 200명",
      period: "분기별",
      color: "bg-pink-500"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            사회적 가치 실현 <span className="text-blue-600">프로그램</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            다양한 계층과 영역에서 실질적인 도움이 되는 프로그램들을 통해 
            지역 사회의 포용적 성장을 지원하고 있습니다
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-3 h-3 rounded-full ${program.color}`}></div>
                <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  {program.category}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">{program.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{program.description}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">수혜 대상</span>
                  <span className="font-medium text-gray-900">{program.beneficiaries}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">운영 기간</span>
                  <span className="font-medium text-gray-900">{program.period}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-3xl p-8 md:p-12 shadow-sm">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              프로그램 참여를 원하시나요?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              커넥트원의 사회적 가치 실현 프로그램에 참여하고 싶으시거나, 
              새로운 프로그램 제안이 있으시면 언제든 연락해 주세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                프로그램 신청하기
              </button>
              <button className="px-8 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-medium rounded-lg transition-colors">
                제안서 제출하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}