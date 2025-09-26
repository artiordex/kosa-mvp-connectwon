
'use client';

export default function StorySection() {
  const stories = [
    {
      category: "교육 지원",
      title: "김민준 학생의 꿈 실현 스토리",
      description: "경제적 어려움으로 포기하려던 프로그래밍 꿈을 커넥트원의 장학 프로그램을 통해 이루고, 현재는 지역 IT 기업에서 개발자로 활동하고 있습니다.",
      image: "https://readdy.ai/api/search-image?query=young%20korean%20student%20studying%20programming%20at%20computer%2C%20scholarship%20recipient%20success%20story%2C%20determined%20student%20learning%20coding%2C%20bright%20future%20through%20education%2C%20inspiring%20educational%20journey&width=400&height=250&seq=student-success&orientation=landscape",
      outcome: "IT 기업 개발자 취업",
      year: "2024"
    },
    {
      category: "지역 협력",
      title: "행복마을 교육공동체 성공사례",
      description: "주민들이 서로의 재능을 나누며 함께 성장하는 마을 교육공동체가 형성되어, 지역 결속력 강화와 함께 다양한 학습 기회가 확산되었습니다.",
      image: "https://readdy.ai/api/search-image?query=community%20members%20teaching%20each%20other%20in%20village%20setting%2C%20intergenerational%20learning%2C%20neighbors%20sharing%20skills%2C%20collaborative%20community%20education%2C%20warm%20community%20gathering&width=400&height=250&seq=community-story&orientation=landscape",
      outcome: "5개 마을 확산",
      year: "2023"
    },
    {
      category: "디지털 교육",
      title: "박순자 어르신의 디지털 도전",
      description: "스마트폰 사용법부터 온라인 쇼핑까지, 75세 박순자 어르신이 실버 디지털 아카데미를 통해 새로운 디지털 세상에 적응하며 삶의 질을 크게 향상시켰습니다.",
      image: "https://readdy.ai/api/search-image?query=elderly%20korean%20woman%20learning%20to%20use%20smartphone%20with%20instructor%2C%20senior%20citizen%20digital%20education%2C%20technology%20training%20for%20seniors%2C%20positive%20learning%20experience%2C%20digital%20inclusion%20success&width=400&height=250&seq=senior-digital&orientation=landscape",
      outcome: "디지털 리더 선정",
      year: "2024"
    }
  ];

  const testimonials = [
    {
      name: "이현수",
      role: "지역 사회적기업 대표",
      content: "커넥트원과의 협력을 통해 우리 기업도 성장하고, 지역사회에도 의미 있는 변화를 만들 수 있어서 정말 보람있습니다. 앞으로도 지속적인 파트너십을 기대합니다.",
      image: "https://readdy.ai/api/search-image?query=korean%20business%20professional%20smiling%20confidently%2C%20social%20enterprise%20leader%2C%20community%20impact%20advocate%2C%20professional%20headshot%2C%20successful%20entrepreneur&width=80&height=80&seq=testimonial-1&orientation=squarish"
    },
    {
      name: "정미경",
      role: "다문화가족지원센터 팀장",
      content: "글로벌 브릿지 프로그램 덕분에 다문화 가정들이 한국 사회에 더 잘 적응할 수 있게 되었어요. 커넥트원의 체계적인 지원에 감사드립니다.",
      image: "https://readdy.ai/api/search-image?query=korean%20woman%20social%20worker%20smiling%20warmly%2C%20multicultural%20support%20coordinator%2C%20caring%20professional%2C%20community%20service%20leader%2C%20friendly%20demeanor&width=80&height=80&seq=testimonial-2&orientation=squarish"
    },
    {
      name: "김태영",
      role: "자원봉사자",
      content: "멘토링 프로그램에 참여하면서 제가 가진 지식을 나누는 기쁨을 알게 되었습니다. 학습자들의 성장하는 모습을 보며 저도 함께 성장하고 있어요.",
      image: "https://readdy.ai/api/search-image?query=young%20korean%20man%20volunteer%20mentor%20smiling%2C%20educational%20volunteer%2C%20community%20helper%2C%20mentoring%20program%20participant%2C%20caring%20expression&width=80&height=80&seq=testimonial-3&orientation=squarish"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            변화의 <span className="text-blue-600">스토리</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            커넥트원과 함께한 사람들의 진짜 이야기를 들어보세요. 
            작은 변화가 모여 큰 사회적 가치를 만들어가고 있습니다
          </p>
        </div>

        {/* 성공 스토리 */}
        <div className="space-y-12 mb-20">
          {stories.map((story, index) => (
            <div key={index} className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="relative">
                  <img 
                    src={story.image}
                    alt={story.title}
                    className="w-full h-80 object-cover rounded-2xl shadow-lg"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                    {story.year}
                  </div>
                </div>
              </div>
              <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                    {story.category}
                  </span>
                  <span className="text-green-600 font-medium text-sm">
                    {story.outcome}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{story.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{story.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 후기 */}
        <div className="bg-white rounded-3xl p-8 md:p-12">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
            함께한 분들의 이야기
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="text-center">
                <img 
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4 shadow-md"
                />
                <h4 className="font-bold text-gray-900 mb-1">{testimonial.name}</h4>
                <p className="text-sm text-blue-600 mb-4">{testimonial.role}</p>
                <p className="text-gray-600 leading-relaxed text-sm italic">
                  "{testimonial.content}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 임팩트 지표 */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 md:p-12 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">2024년 사회적 임팩트</h3>
            <p className="text-blue-100">숫자로 보는 우리의 사회적 가치 창출</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">2,340</div>
              <div className="text-blue-100 text-sm">총 교육 수혜자</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">85%</div>
              <div className="text-blue-100 text-sm">취업 연계율</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">42개</div>
              <div className="text-blue-100 text-sm">협력 프로그램</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="text-blue-100 text-sm">참여자 만족도</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}