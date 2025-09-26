
'use client';

export default function CTASection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8 md:p-12 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              함께 만들어가는 <br />
              <span className="text-blue-600">더 나은 사회</span>
            </h2>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              커넥트원의 사회적 가치 창출 여정에 함께해 주세요. <br className="hidden md:block" />
              작은 참여가 모여 큰 변화를 만들어갑니다.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <i className="ri-hand-heart-line text-blue-600 w-6 h-6 flex items-center justify-center text-xl"></i>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">자원봉사 참여</h3>
                <p className="text-sm text-gray-600">전문성을 나누고 함께 성장하세요</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <i className="ri-building-line text-green-600 w-6 h-6 flex items-center justify-center text-xl"></i>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">기관 협력</h3>
                <p className="text-sm text-gray-600">파트너가 되어 함께 가치를 창출하세요</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <i className="ri-lightbulb-line text-purple-600 w-6 h-6 flex items-center justify-center text-xl"></i>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">아이디어 제안</h3>
                <p className="text-sm text-gray-600">새로운 사회적 가치 창출 아이디어를 제안하세요</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                참여 신청하기
              </button>
              <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-medium rounded-lg transition-colors">
                더 자세히 알아보기
              </button>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="text-center">
                <h4 className="font-bold text-gray-900 mb-4">문의 및 상담</h4>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <div className="flex items-center gap-2">
                    <i className="ri-phone-line w-4 h-4 flex items-center justify-center"></i>
                    <span className="text-sm text-gray-600">02-1234-5678</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-mail-line w-4 h-4 flex items-center justify-center"></i>
                    <span className="text-sm text-gray-600">social@connectone.co.kr</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
