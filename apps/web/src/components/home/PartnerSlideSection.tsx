'use client';

import React, { useEffect, useRef, useState } from 'react';
import partnersData from '../../data/partners.json';

/**
 * 파트너 로고 아이콘 타입 (이모지 기반)
 */
interface LogoIcon {
  type: 'emoji';
  content: string;
  containerClassName?: string;
  className: string;
}

/**
 * 파트너 로고 텍스트 타입
 */
interface LogoText {
  content: string;
  className: string;
}

/**
 * 파트너 로고 요소 (텍스트 조각)
 */
interface LogoElement {
  type: 'text';
  content: string;
  className: string;
}

/**
 * 파트너 데이터 구조 정의
 */
interface PartnerData {
  id: string;
  name: string;
  logoType: 'text' | 'icon-text' | 'image';
  logoData: {
    elements?: LogoElement[];
    icon?: LogoIcon;
    text?: LogoText;
    containerClassName?: string;
    src?: string;
    alt?: string;
  };
  minWidth: string;
}

/**
 * PartnerSlider 컴포넌트 Props 정의
 */
interface PartnerSliderProps {
  customPartners?: PartnerData[];
  autoSlideSpeed?: number;
  className?: string;
}

/**
 * 파트너 로고 렌더링 함수
 * - 텍스트, 아이콘+텍스트, 이미지 타입에 따라 다르게 출력
 */
const renderLogo = (partner: PartnerData): React.ReactNode => {
  const { logoType, logoData } = partner;
  switch (logoType) {
    case 'text':
      return (
        <div className="flex items-center justify-center h-full">
          {logoData.elements?.map((element, index) => (
            <span key={index} className={element.className}>
              {element.content}
            </span>
          ))}
        </div>
      );
    case 'icon-text':
      return (
        <div className={logoData.containerClassName || 'flex items-center'}>
          {logoData.icon && (
            <div className={logoData.icon.containerClassName || ''}>
              <span className={logoData.icon.className}>{logoData.icon.content}</span>
            </div>
          )}
          {logoData.text && <span className={logoData.text.className}>{logoData.text.content}</span>}
        </div>
      );
    case 'image':
      return <img src={logoData.src} alt={logoData.alt || partner.name} className="h-10 object-contain" />;
    default:
      return <span>{partner.name}</span>;
  }
};

/**
 * PartnerSlideSection 컴포넌트
 * - 파트너 로고를 무한 슬라이드 형태로 보여줌
 * - 이전/다음 버튼 및 재생/일시정지 버튼 포함
 */
const PartnerSlideSection: React.FC<PartnerSliderProps> = ({ customPartners, autoSlideSpeed = 15000, className = '' }) => {
  // 슬라이드 일시정지 여부
  const [isPaused, setIsPaused] = useState(false);

  // 수동 이동 시 transform 값 저장
  const [currentTransform, setCurrentTransform] = useState(0);

  // 슬라이드 트랙 참조
  const trackRef = useRef<HTMLDivElement>(null);

  // 터치 시작 위치 저장 (모바일 제스처용)
  const startXRef = useRef(0);

  // JSON 데이터 불러오기 (외부 customPartners가 있으면 우선 사용)
  const partners = customPartners || (partnersData as PartnerData[]);

  // 무한 슬라이드를 위해 파트너 리스트를 두 배로 늘림
  const doubledPartners = [...partners, ...partners];

  /**
   * 자동 슬라이드 속도 적용 (CSS animation-duration 변경)
   */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.style.animationDuration = `${autoSlideSpeed}ms`;
  }, [autoSlideSpeed]);

  /**
   * ◀ 이전 버튼 클릭 시 슬라이드 이동
   */
  const handlePrevious = () => {
    const moveDistance = 160;
    setCurrentTransform(prev => prev + moveDistance);
    if (trackRef.current) trackRef.current.style.transform = `translateX(${currentTransform + moveDistance}px)`;
  };

  /**
   * ▶ 다음 버튼 클릭 시 슬라이드 이동
   */
  const handleNext = () => {
    const moveDistance = 160;
    setCurrentTransform(prev => prev - moveDistance);
    if (trackRef.current) trackRef.current.style.transform = `translateX(${currentTransform - moveDistance}px)`;
  };

  /**
   * ⏯ 일시정지/재생 버튼 클릭
   */
  const handlePlayPause = () => setIsPaused(prev => !prev);

  /**
   * 마우스 오버 시 자동 슬라이드 일시정지
   */
  const handleMouseEnter = () => {
    if (!isPaused && trackRef.current) trackRef.current.style.animationPlayState = 'paused';
  };

  /**
   * 마우스 떠날 시 자동 슬라이드 재생
   */
  const handleMouseLeave = () => {
    if (!isPaused && trackRef.current) trackRef.current.style.animationPlayState = 'running';
  };

  /**
   * 모바일: 터치 시작 위치 저장
   */
  const handleTouchStart = (e: React.TouchEvent) => {
    const firstTouch = e.touches?.[0];
    if (firstTouch) startXRef.current = firstTouch.clientX;
  };

  /**
   * 모바일: 터치 종료 시 방향 판단 후 슬라이드 이동
   */
  const handleTouchEnd = (e: React.TouchEvent) => {
    const firstChangedTouch = e.changedTouches?.[0];
    if (firstChangedTouch) {
      const diffX = startXRef.current - firstChangedTouch.clientX;
      if (Math.abs(diffX) > 50) diffX > 0 ? handleNext() : handlePrevious();
    }
  };

  /**
   * isPaused 값에 따라 애니메이션 재생 여부 설정
   */
  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.animationPlayState = isPaused ? 'paused' : 'running';
    }
  }, [isPaused]);

  return (
    <div className={`w-full mx-auto px-4 ${className}`}>
      {/* 전체 슬라이더 박스 */}
      <div className="bg-white rounded-lg py-6 relative overflow-hidden group h-[80px] flex items-center">

        {/* ◀ 이전 버튼 */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
          aria-label="이전 파트너"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* ▶ 다음 버튼 */}
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
          aria-label="다음 파트너"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* ⏯ 일시정지/재생 버튼 */}
        <button
          onClick={handlePlayPause}
          className="absolute right-20 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
          aria-label={isPaused ? '재생' : '일시정지'}
        >
          {isPaused ? (
            // ▶ 재생 아이콘
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 3v18l15-9L5 3z" />
            </svg>
          ) : (
            // ⏸ 일시정지 아이콘
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          )}
        </button>

        {/* 파트너 로고 슬라이더 영역 */}
        <div className="partner-slider flex items-center justify-center overflow-hidden px-40 h-full">
          <div
            ref={trackRef}
            className="partner-track flex items-center gap-16 animate-slide"
            style={{ animation: `slide ${autoSlideSpeed}ms linear infinite` }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {doubledPartners.map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className={`flex-shrink-0 flex items-center justify-center h-12 ${partner.minWidth}
                            opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-pointer`}
              >
                {renderLogo(partner)}
              </div>
            ))}
          </div>
        </div>

        {/* 슬라이드 애니메이션 정의 */}
        <style jsx>{`
          @keyframes slide {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-slide {
            animation: slide ${autoSlideSpeed}ms linear infinite;
          }
        `}</style>
      </div>
    </div>
  );
};
export default PartnerSlideSection;
