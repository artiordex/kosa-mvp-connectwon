'use client';

import Link from 'next/link';

export default function CentersList() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">공간 소개</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            <span className="block">청년 창업가들의 꿈과 희망을 키우는</span>
            <span className="block mt-2">
              <strong className="text-orange-600">커넥트원</strong> <strong>공간</strong> 입니다.
            </span>
          </p>
          <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
            커넥트원은 국내 총 3개 센터로 이루어져 있으며, 서울지역 2개, 광명지역 1개의 센터를 운영 중에 있습니다.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* 강남센터 */}
          <Link href="/centers/gangnam" className="group">
            <div className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://readdy.ai/api/search-image?query=modern%20office%20building%20exterior%20in%20Gangnam%20Seoul%2C%20glass%20facade%20with%20clean%20architectural%20design%2C%20urban%20business%20district%20atmosphere%2C%20professional%20corporate%20environment%2C%20contemporary%20commercial%20building&width=400&height=300&seq=gangnam-center&orientation=landscape"
                  alt="강남센터"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">강남센터</h3>
                  <p className="text-sm opacity-90">서울 강남구</p>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>센터규모</span>
                    <span className="font-medium text-gray-900">2,685㎡</span>
                  </div>
                  <div className="flex justify-between">
                    <span>업무공간</span>
                    <span className="font-medium text-gray-900">독립공간 22실</span>
                  </div>
                  <div className="flex justify-between">
                    <span>운영시간</span>
                    <span className="font-medium text-gray-900">연중무휴</span>
                  </div>
                </div>
                <div className="mt-4 text-orange-600 font-medium text-sm flex items-center group-hover:text-orange-700">
                  자세히 보기
                  <i className="ri-arrow-right-line ml-2 w-4 h-4 flex items-center justify-center"></i>
                </div>
              </div>
            </div>
          </Link>

          {/* 마포센터 */}
          <Link href="/centers/mapo" className="group">
            <div className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://readdy.ai/api/search-image?query=contemporary%20office%20building%20in%20Mapo%20Seoul%20near%20Han%20river%2C%20modern%20glass%20architecture%2C%20startup%20friendly%20workspace%20environment%2C%20creative%20district%20atmosphere%2C%20innovative%20business%20center&width=400&height=300&seq=mapo-center&orientation=landscape"
                  alt="마포센터"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">마포센터</h3>
                  <p className="text-sm opacity-90">서울 마포구</p>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>센터규모</span>
                    <span className="font-medium text-gray-900">1,850㎡</span>
                  </div>
                  <div className="flex justify-between">
                    <span>업무공간</span>
                    <span className="font-medium text-gray-900">독립공간 16실</span>
                  </div>
                  <div className="flex justify-between">
                    <span>운영시간</span>
                    <span className="font-medium text-gray-900">연중무휴</span>
                  </div>
                </div>
                <div className="mt-4 text-orange-600 font-medium text-sm flex items-center group-hover:text-orange-700">
                  자세히 보기
                  <i className="ri-arrow-right-line ml-2 w-4 h-4 flex items-center justify-center"></i>
                </div>
              </div>
            </div>
          </Link>

          {/* 광명센터 */}
          <Link href="/centers/gwangmyeong" className="group">
            <div className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://readdy.ai/api/search-image?query=modern%20business%20complex%20in%20Gwangmyeong%20city%2C%20contemporary%20office%20building%20with%20green%20surroundings%2C%20suburban%20business%20center%2C%20innovative%20workspace%20architecture%2C%20clean%20corporate%20environment&width=400&height=300&seq=gwangmyeong-center&orientation=landscape"
                  alt="광명센터"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">광명센터</h3>
                  <p className="text-sm opacity-90">경기 광명시</p>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>센터규모</span>
                    <span className="font-medium text-gray-900">1,200㎡</span>
                  </div>
                  <div className="flex justify-between">
                    <span>업무공간</span>
                    <span className="font-medium text-gray-900">독립공간 12실</span>
                  </div>
                  <div className="flex justify-between">
                    <span>운영시간</span>
                    <span className="font-medium text-gray-900">연중무휴</span>
                  </div>
                </div>
                <div className="mt-4 text-orange-600 font-medium text-sm flex items-center group-hover:text-orange-700">
                  자세히 보기
                  <i className="ri-arrow-right-line ml-2 w-4 h-4 flex items-center justify-center"></i>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}