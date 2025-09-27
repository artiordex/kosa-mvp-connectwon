/**
 * Description : tailwind.config.ts - 📌 Web 앱 Tailwind CSS 설정
 * Author : Shiwoo Min
 * Date : 2025-09-11
 */
import baseConfig from '../../packages/configs/tailwind/base.js';
import type { Config } from 'tailwindcss';

const config: Config = {
  ...baseConfig,
  content: [
    // Web 앱 src 디렉토리
    './src/**/*.{js,ts,jsx,tsx}',

    // UI 패키지 컴포넌트들
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',

    // Shared 패키지 (필요시)
    '../../packages/shared/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    ...baseConfig.theme,
    extend: {
      ...baseConfig.theme?.extend,
      // Web 전용 확장
      colors: {
        ...baseConfig.theme?.extend?.colors,
        // 브랜드 색상 (기존 유지)
        brand: {
          DEFAULT: '#2563eb',
          light: '#3b82f6',
          dark: '#1e40af',
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#2563eb',
          600: '#1d4ed8',
          700: '#1e40af',
          900: '#1e3a8a',
        },
        // Web 사용자 인터페이스 색상
        web: {
          background: '#ffffff',
          foreground: '#0f172a',
          muted: '#f8fafc',
          border: '#e2e8f0',
          accent: '#f1f5f9',
          footer: '#0f172a',
          darkBackground: '#111827',
        },
        // 예약 상태별 색상
        booking: {
          pending: '#f59e0b', // 대기
          confirmed: '#10b981', // 확정
          cancelled: '#ef4444', // 취소
          completed: '#8b5cf6', // 완료
        },
      },

      // Typography (기존 폰트 설정 유지)
      fontFamily: {
        ...(baseConfig.theme?.extend?.fontFamily || {}),
        sans: ['var(--font-inter)', 'Pretendard', 'ui-sans-serif', 'system-ui'],
      },

      // Web 레이아웃 전용 spacing
      spacing: {
        ...(baseConfig.theme?.extend?.spacing || {}),
        header: '4rem', // 64px - 헤더 높이
        hero: '24rem', // 384px - 히어로 섹션
        section: '6rem', // 96px - 섹션 간격
        card: '1.5rem', // 24px - 카드 패딩
      },

      // Web 전용 width (base에 없으므로 독립적으로 생성)
      width: {
        container: '1200px', // 최대 컨테이너 너비
        hero: '100vw', // 히어로 전체 너비
      },

      // Web 전용 높이 (base에 없으므로 독립적으로 생성)
      height: {
        header: '4rem', // 헤더 높이
        hero: '24rem', // 히어로 섹션 높이
        'hero-mobile': '16rem', // 모바일 히어로 높이
      },

      // Web 전용 z-index
      zIndex: {
        ...(baseConfig.theme?.extend?.zIndex || {}),
        header: '40',
        modal: '50',
        dropdown: '45',
        tooltip: '60',
        overlay: '55',
      },

      // Web 전용 애니메이션
      animation: {
        ...(baseConfig.theme?.extend?.animation || {}),
        'fade-up': 'fadeUp 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'bounce-gentle': 'bounceGentle 1s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
      },

      keyframes: {
        ...(baseConfig.theme?.extend?.keyframes || {}),
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(-5%)' },
          '50%': { transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },

      // Web 전용 박스 섀도우
      boxShadow: {
        ...(baseConfig.theme?.extend?.boxShadow || {}),
        web: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'web-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'web-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        hero: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      },

      // Web 전용 border radius
      borderRadius: {
        ...(baseConfig.theme?.extend?.borderRadius || {}),
        web: '0.5rem',
        'web-lg': '1rem',
        hero: '1.5rem',
      },

      // 반응형 브레이크포인트 (base에서 이미 xs가 정의되어 있음)
      screens: {
        ...(baseConfig.theme?.screens || {}),
        // xs는 base.ts에서 이미 '475px'로 정의되어 있으므로 제거
      },
    },
  },

  plugins: [
    ...baseConfig.plugins,
    // Web 전용 플러그인들이 있다면 여기에 추가
  ],
};

export default config;
