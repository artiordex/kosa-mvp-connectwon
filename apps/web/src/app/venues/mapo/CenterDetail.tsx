
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CenterDetail() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "https://readdy.ai/api/search-image?query=modern%20startup%20office%20interior%20near%20Han%20river%2C%20creative%20workspace%20with%20river%20view%2C%20contemporary%20coworking%20space%20with%20innovative%20design%2C%20bright%20office%20environment&width=800&height=500&seq=mapo-interior-1&orientation=landscape",
    "https://readdy.ai/api/search-image?query=creative%20meeting%20room%20with%20modern%20design%2C%20collaborative%20workspace%20with%20artistic%20elements%2C%20contemporary%20conference%20room%20with%20creative%20industry%20atmosphere&width=800&height=500&seq=mapo-interior-2&orientation=landscape",
    "https://readdy.ai/api/search-image?query=startup%20office%20lounge%20with%20creative%20design%2C%20modern%20workplace%20break%20area%20with%20artistic%20decor%2C%20contemporary%20office%20relaxation%20space%20with%20vibrant%20colors&width=800&height=500&seq=mapo-interior-3&orientation=landscape",
    "https://readdy.ai/api/search-image?query=modern%20office%20workspace%20with%20startup%20atmosphere%2C%20creative%20industry%20office%20interior%2C%20contemporary%20business%20space%20with%20innovative%20design%20elements&width=800&height=500&seq=mapo-interior-4&orientation=landscape"
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* 헤더 */}
      <section 
        className="relative h-96 flex items-center justify-center bg-cover bg-center text-white"
        style={{
          backgroundImage: 'url("https://readdy.ai/api/search-image?query=modern%20office%20building%20in%20Mapo%20district%20Seoul%20with%20Han%20river%20view%2C%20contemporary%20architecture%20in%20creative%20district%2C%20startup%20friendly%20business%20environment&width=1920&height=600&seq=mapo-hero&orientation=landscape")',
          minHeight: '384px'
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center">
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-orange-600/20 rounded-full text-orange-200 text-sm font-medium backdrop-blur-sm border border-orange-400/30">
              MAPO CENTER
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-6">마포센터</h1>
          <p className="text-xl text-gray-200">서울 마포구 월드컵북로 396</p>
        </div>
      </section>

      {/* 콘텐츠 */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* 네비게이션 */}
          <div className="mb-8">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-orange-600">홈</Link>
              <i className="ri-arrow-right-s-line w-4 h-4 flex items-center justify-center"></i>
              <Link href="/centers" className="hover:text-orange-600">공간소개</Link>
              <i className="ri-arrow-right-s-line w-4 h-4 flex items-center justify-center"></i>
              <span className="text-orange-600 font-medium">마포센터</span>
            </nav>
          </div>

          {/* 센터 탭 */}
          <div className="mb-12">
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 max-w-md">
              <Link href="/centers/gangnam" className="px-6 py-2 text-gray-600 hover:text-gray-900">
                강남센터
              </Link>
              <Link href="/centers/mapo" className="px-6 py-2 bg-white rounded-md shadow-sm text-orange-600 font-medium">
                마포센터
              </Link>
              <Link href="/centers/gwangmyeong" className="px-6 py-2 text-gray-600 hover:text-gray-900">
                광명센터
              </Link>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* 이미지 갤러리 */}
            <div>
              <div className="relative mb-4">
                <img 
                  src={images[currentImageIndex]}
                  alt="마포센터"
                  className="w-full h-80 object-cover rounded-2xl"
                />
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
                >
                  <i className="ri-arrow-left-line w-5 h-5 flex items-center justify-center"></i>
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
                >
                  <i className="ri-arrow-right-line w-5 h-5 flex items-center justify-center"></i>
                </button>
              </div>
              
              <div className="flex space-x-2 justify-center">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === currentImageIndex ? 'bg-orange-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* 센터 정보 */}
            <div>
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">센터규모</h3>
                  <p className="text-gray-600">1,850㎡</p>
                </div>

                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">업무공간</h3>
                  <p className="text-gray-600">독립공간 16실, 오픈스페이스 45석, 회의실 8실</p>
                </div>

                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">편의시설</h3>
                  <p className="text-gray-600">카페테리아, 라운지, 다목적실, 공용 OA공간, 휴게공간</p>
                </div>

                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">센터구성</h3>
                  <div className="text-gray-600 space-y-1">
                    <p>&lt;3층&gt; 독립공간 8실, 오픈스페이스 25석, 회의실 4실</p>
                    <p>&lt;4층&gt; 독립공간 8실, 오픈스페이스 20석, 회의실 4실</p>
                    <p>&lt;5층&gt; 라운지, 카페테리아, 다목적실</p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">운영시간</h3>
                  <p className="text-gray-600">연중무휴</p>
                </div>

                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">문의처</h3>
                  <p className="text-gray-600">02-3143-8620 / <a href="mailto:mapo@connectone.or.kr" className="text-orange-600 hover:text-orange-700">mapo@connectone.or.kr</a></p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">주소</h3>
                  <p className="text-gray-600">서울특별시 마포구 월드컵북로 396 커넥트원 마포센터 3~5F</p>
                </div>
              </div>
            </div>
          </div>

          {/* 지도 */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">오시는 길</h3>
            <div className="bg-gray-100 rounded-2xl h-96 flex items-center justify-center">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.123!2d126.889!3d37.555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c98f2b2d4a567%3A0x1a2b3c4d5e6f7890!2z7ISc7Jq47Yq567OE67OE7IucIOuniO2PrOq1rCDsm5Drk5zzsoXrtoHroZwgMzk2!5e0!3m2!1sko!2skr!4v1630655507166!5m2!1sko!2skr"
                width="100%" 
                height="100%" 
                loading="lazy" 
                allowFullScreen
                className="rounded-2xl"
              ></iframe>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 bg-orange-50 rounded-3xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">마포센터 이용 문의</h3>
            <p className="text-gray-600 mb-6">
              한강 뷰를 갖춘 마포센터에서 창의적인 업무 환경을 경험해 보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors whitespace-nowrap">
                공간 예약하기
              </button>
              <button className="px-8 py-3 border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-medium rounded-lg transition-colors whitespace-nowrap">
                전화 문의하기
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
