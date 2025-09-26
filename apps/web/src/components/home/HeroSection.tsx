
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "주도자가 되어, 함께 미래를 이끌어갈",
      highlight: "가치를 만들어가다!",
      description: "커넥트원에서 다양한 교육, 문화, 취미 프로그램을 발견하고 간편하게 예약할 수 있습니다. 새로운 경험을 시작해보세요.",
      image: "https://readdy.ai/api/search-image?query=Seven%20young%20entrepreneurs%20celebrating%20success%20with%20raised%20hands%20cheering%20victory%2C%20bright%20sunny%20sky%20with%20warm%20sunlight%20in%20background%2C%20outdoor%20celebration%20scene%2C%20joyful%20business%20team%20achievement%20moment%2C%20inspiring%20startup%20success%20story%2C%20golden%20hour%20lighting%2C%20modern%20professional%20attire&width=1920&height=1080&seq=hero1&orientation=landscape"
    },
    {
      title: "AI와 ICT 기술로 창업, 취업, 그리고",
      highlight: "그 이상의 도전을 만나는 공간!",
      description: "최신 AI와 ICT 기술을 활용한 전문적인 프로그램과 멘토링을 통해 여러분의 꿈을 현실로 만들어보세요.",
      image: "https://readdy.ai/api/search-image?query=Group%20of%20seven%20enthusiastic%20young%20professionals%20raising%20hands%20in%20celebration%20under%20bright%20morning%20sun%2C%20entrepreneurship%20success%20moment%2C%20outdoor%20business%20achievement%20scene%2C%20inspiring%20startup%20team%20victory%2C%20golden%20sunlight%20streaming%2C%20contemporary%20business%20casual%20clothing&width=1920&height=1080&seq=hero2&orientation=landscape"
    },
    {
      title: "ConnectOne과 함께, 도전의 여정을 시작하고",
      highlight: "함께 성장하세요!",
      description: "혁신적인 기술과 실무 중심의 교육으로 미래 사회가 요구하는 인재로 성장할 수 있습니다.",
      image: "https://readdy.ai/api/search-image?query=Seven%20dynamic%20young%20professionals%20celebrating%20with%20arms%20raised%20high%20in%20triumph%2C%20beautiful%20sunrise%20with%20golden%20sun%20rays%2C%20outdoor%20success%20celebration%2C%20energetic%20startup%20team%20achievement%2C%20warm%20morning%20light%2C%20modern%20professional%20style%20clothing&width=1920&height=1080&seq=hero3&orientation=landscape"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden mt-20">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.7), rgba(30, 58, 138, 0.7)), url('${slide.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center'
          }}
        />
      ))}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 h-full flex items-center">
        <div className="w-full text-center text-white">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            {slides[currentSlide].title}
            <br />
            <span className="text-yellow-400">{slides[currentSlide].highlight}</span>
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            {slides[currentSlide].description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/programs"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors cursor-pointer text-center whitespace-nowrap"
            >
              나의 도전 시작하기
            </Link>
            <Link
              href="/signup"
              className="bg-blue-800 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-900 transition-colors cursor-pointer text-center whitespace-nowrap border-2 border-white"
            >
              함께 성장하기
            </Link>
          </div>
        </div>
      </div>

      {/* 캐러셀 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* 캐러셀 화살표 */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors z-20"
      >
        <i className="ri-arrow-left-line w-6 h-6 flex items-center justify-center"></i>
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors z-20"
      >
        <i className="ri-arrow-right-line w-6 h-6 flex items-center justify-center"></i>
      </button>
    </section>
  );
}
