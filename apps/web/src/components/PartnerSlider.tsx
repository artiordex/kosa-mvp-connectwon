'use client';

import React, { useEffect, useRef, useState } from 'react';

import partnersData from './json/partners.json';

interface LogoIcon {
  type: 'emoji';
  content: string;
  containerClassName?: string;
  className: string;
}

interface LogoText {
  content: string;
  className: string;
}

interface LogoElement {
  type: 'text';
  content: string;
  className: string;
}

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

interface PartnerSliderProps {
  customPartners?: PartnerData[];
  autoSlideSpeed?: number;
  className?: string;
}

const renderLogo = (partner: PartnerData): React.ReactNode => {
  const { logoType, logoData } = partner;

  switch (logoType) {
    case 'text':
      return (
        <div className="flex items-center">
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
          {logoData.icon &&
            (logoData.icon.containerClassName ? (
              <div className={logoData.icon.containerClassName}>
                <span className={logoData.icon.className}>{logoData.icon.content}</span>
              </div>
            ) : (
              <div className={logoData.icon.className}>{logoData.icon.content}</div>
            ))}
          {logoData.text && <span className={logoData.text.className}>{logoData.text.content}</span>}
        </div>
      );

    case 'image':
      return <img src={logoData.src} alt={logoData.alt || partner.name} className="h-8 object-contain" />;

    default:
      return <span>{partner.name}</span>;
  }
};

const PartnerSlider: React.FC<PartnerSliderProps> = ({ customPartners, autoSlideSpeed = 15000, className = '' }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [currentTransform, setCurrentTransform] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);

  // JSON 데이터 사용 (커스텀 파트너가 있으면 우선 사용)
  const partners = customPartners || (partnersData as PartnerData[]);

  // 더블 배열 생성 (무한 슬라이드를 위해)
  const doubledPartners = [...partners, ...partners];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const animationDuration = `${autoSlideSpeed}ms`;
    track.style.animationDuration = animationDuration;
  }, [autoSlideSpeed]);

  const handlePrevious = () => {
    const moveDistance = 160;
    setCurrentTransform(prev => prev + moveDistance);
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${currentTransform + moveDistance}px)`;
    }
  };

  const handleNext = () => {
    const moveDistance = 160;
    setCurrentTransform(prev => prev - moveDistance);
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${currentTransform - moveDistance}px)`;
    }
  };

  const handlePlayPause = () => {
    setIsPaused(prev => !prev);
  };

  const handleMouseEnter = () => {
    if (!isPaused && trackRef.current) {
      trackRef.current.style.animationPlayState = 'paused';
    }
  };

  const handleMouseLeave = () => {
    if (!isPaused && trackRef.current) {
      trackRef.current.style.animationPlayState = 'running';
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const firstTouch = e.touches?.[0];
    if (firstTouch) {
      startXRef.current = firstTouch.clientX;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const firstChangedTouch = e.changedTouches?.[0];
    if (firstChangedTouch) {
      const endX = firstChangedTouch.clientX;
      const diffX = startXRef.current - endX;

      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          handleNext();
        } else {
          handlePrevious();
        }
      }
    }
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (isPaused) {
      track.style.animationPlayState = 'paused';
    } else {
      track.style.animationPlayState = 'running';
    }
  }, [isPaused]);

  return (
    <div className={`w-full max-w-5xl mx-auto px-4 ${className}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 py-8 relative overflow-hidden group">
        {/* 이전 버튼 */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-sm flex items-center justify-center transition-colors duration-200"
          aria-label="이전 파트너"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* 다음 버튼 */}
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-sm flex items-center justify-center transition-colors duration-200"
          aria-label="다음 파트너"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* 일시정지/재생 버튼 */}
        <button
          onClick={handlePlayPause}
          className="absolute right-16 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-sm flex items-center justify-center transition-colors duration-200"
          aria-label={isPaused ? '재생' : '일시정지'}
        >
          {isPaused ? (
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l4.828 4.828a1 1 0 01.293.707V16M15 9h-1.586a1 1 0 00-.707.293L8.879 13.121A1 1 0 008.586 13.828V14"
              />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6" />
            </svg>
          )}
        </button>

        {/* 파트너 슬라이더 */}
        <div className="partner-slider flex items-center justify-center overflow-hidden">
          <div
            ref={trackRef}
            className="partner-track flex items-center gap-16 animate-slide"
            style={{
              animation: `slide ${autoSlideSpeed}ms linear infinite`,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {doubledPartners.map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className={`flex-shrink-0 flex items-center justify-center h-12 ${partner.minWidth} opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-pointer`}
              >
                {renderLogo(partner)}
              </div>
            ))}
          </div>
        </div>

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

export default PartnerSlider;
