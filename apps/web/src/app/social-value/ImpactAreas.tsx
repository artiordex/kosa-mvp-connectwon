
'use client';

export default function ImpactAreas() {
  const impactAreas = [
    {
      title: "교육 격차 해소",
      description: "경제적 여건에 관계없이 모든 사람이 양질의 교육을 받을 수 있도록 다양한 장학 프로그램과 무료 교육 과정을 운영합니다.",
      stats: "연간 500명+ 수혜",
      image: "https://readdy.ai/api/search-image?query=diverse%20students%20studying%20together%20in%20bright%20classroom%2C%20inclusive%20education%20environment%2C%20scholarship%20recipients%20learning%2C%20equal%20education%20opportunities%2C%20supportive%20learning%20atmosphere&width=400&height=300&seq=education-gap&orientation=landscape"
    },
    {
      title: "지역 인재 양성",
      description: "지역 특성에 맞는 맞춤형 교육 프로그램을 통해 지역 경제 발전에 기여할 수 있는 전문 인재를 양성합니다.",
      stats: "지역 취업률 85%",
      image: "https://readdy.ai/api/search-image?query=local%20talent%20development%20program%2C%20regional%20professionals%20training%2C%20community-based%20education%2C%20local%20economic%20development%20through%20education%2C%20skilled%20workforce%20development&width=400&height=300&seq=local-talent&orientation=landscape"
    },
    {
      title: "사회적 기업 지원",
      description: "사회 문제 해결을 목표로 하는 기업과 단체들에게 교육 공간과 프로그램을 제공하여 사회적 가치 창출을 지원합니다.",
      stats: "30개 기업 지원",
      image: "https://readdy.ai/api/search-image?query=social%20enterprise%20support%20program%2C%20nonprofit%20organizations%20meeting%2C%20community%20impact%20initiatives%2C%20social%20entrepreneurs%20working%20together%2C%20collaborative%20social%20innovation&width=400&height=300&seq=social-enterprise&orientation=landscape"
    },
    {
      title: "디지털 포용",
      description: "디지털 소외계층을 위한 IT 교육과 디지털 리터러시 향상 프로그램을 통해 디지털 격차를 줄여나가고 있습니다.",
      stats: "월 200명 교육",
      image: "https://readdy.ai/api/search-image?query=digital%20inclusion%20program%2C%20elderly%20people%20learning%20computers%2C%20digital%20literacy%20training%2C%20technology%20education%20for%20all%20ages%2C%20bridging%20digital%20divide%2C%20seniors%20using%20computers&width=400&height=300&seq=digital-inclusion&orientation=landscape"
    },
    {
      title: "환경 교육",
      description: "지속 가능한 미래를 위한 환경 교육과 친환경 실천 프로그램을 통해 환경 의식을 높이고 실천 문화를 확산합니다.",
      stats: "친환경 인증 획득",
      image: "https://readdy.ai/api/search-image?query=environmental%20education%20program%2C%20sustainability%20workshop%2C%20eco-friendly%20learning%20activities%2C%20green%20education%20initiatives%2C%20environmental%20awareness%20training%2C%20recycling%20and%20sustainability%20education&width=400&height=300&seq=environment-edu&orientation=landscape"
    },
    {
      title: "문화 다양성",
      description: "다양한 문화적 배경을 가진 사람들이 함께 학습하고 소통할 수 있는 열린 교육 환경을 조성합니다.",
      stats: "15개국 참여",
      image: "https://readdy.ai/api/search-image?query=multicultural%20education%20program%2C%20diverse%20cultural%20exchange%2C%20international%20students%20learning%20together%2C%20cultural%20diversity%20celebration%2C%20inclusive%20educational%20environment&width=400&height=300&seq=cultural-diversity&orientation=landscape"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            우리가 만들어가는 <span className="text-blue-600">사회적 임팩트</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            커넥트원의 다양한 사회적 가치 창출 활동들을 통해 지역 사회에 
            실질적이고 지속 가능한 변화를 만들어가고 있습니다
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {impactAreas.map((area, index) => (
            <div key={index} className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={area.image}
                  alt={area.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {area.stats}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{area.title}</h3>
                <p className="text-gray-600 leading-relaxed">{area.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 bg-blue-50 px-8 py-4 rounded-full">
            <i className="ri-award-line text-blue-600 w-6 h-6 flex items-center justify-center text-xl"></i>
            <span className="text-blue-800 font-medium">
              2024년 사회적 가치 우수기관 선정
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}