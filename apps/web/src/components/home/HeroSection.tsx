'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import slides from '../../data/hero.json';

/**
 * @description HeroSection 메인화면 캐러셀 컴포넌트 (CTA 버튼과 인디케이터, 좌우 화살표를 제공)
 * @component
 * @example
 * return <HeroSection />
 */
export default function HeroSection() {
  /* 현재 보여지는 슬라이드 인덱스 */
  const [currentSlide, setCurrentSlide] = useState(0);

  /* 슬라이드를 10초마다 자동으로 전환 */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[65vh] min-h-[120px] overflow-hidden mt-20">
      {/* 슬라이드 이미지 렌더링 */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          style={{
            backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.7), rgba(30, 58, 138, 0.7)), url('${slide.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        />
      ))}

      {/* 슬라이드 텍스트 및 버튼 영역 */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 h-full flex items-center">
        <div className="w-full text-center text-white">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            {slides[currentSlide]?.title}
            <br />
            <span className="text-yellow-400">{slides[currentSlide]?.highlight}</span>
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">{slides[currentSlide]?.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
          </div>
        </div>
      </div>

      {/* 캐러셀 인디케이터 버튼 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`}
          />
        ))}
      </div>

      {/* 이전 슬라이드 화살표 버튼 */}
      <button
        onClick={() => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors z-20"
      >
        <i className="ri-arrow-left-line w-6 h-6 flex items-center justify-center"></i>
      </button>

      {/* 다음 슬라이드 화살표 버튼 */}
      <button
        onClick={() => setCurrentSlide(prev => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors z-20"
      >
        <i className="ri-arrow-right-line w-6 h-6 flex items-center justify-center"></i>
      </button>
    </section>
  );
}
