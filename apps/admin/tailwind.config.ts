/**
 * Description : tailwind.config.ts - 📌 Admin 앱 Tailwind CSS 설정
 * Author : Shiwoo Min
 * Date : 2025-09-11
 */
import type { Config } from 'tailwindcss';

const baseConfig = require('../../configs/tailwind/base');

const config: Config = {
  ...baseConfig,
  content: [
    // Admin 앱 src 디렉토리
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
      // Admin 전용 확장
      colors: {
        ...baseConfig.theme?.extend?.colors,
      },

      // Admin 레이아웃 전용 spacing
      spacing: {
        ...baseConfig.theme?.extend?.spacing,
        sidebar: '16rem', // 256px - 사이드바 너비
        'sidebar-mini': '4rem', // 64px - 축소 사이드바
        header: '4rem', // 64px - 헤더 높이
        content: 'calc(100vh - 4rem)', // 컨텐츠 영역 높이
      },

      // Admin 레이아웃 전용 width
      width: {
        ...baseConfig.theme?.extend?.width,
        sidebar: '16rem',
        'sidebar-mini': '4rem',
        content: 'calc(100vw - 16rem)',
        'content-mini': 'calc(100vw - 4rem)',
      },

      // Admin 전용 높이
      height: {
        ...baseConfig.theme?.extend?.height,
        header: '4rem',
        content: 'calc(100vh - 4rem)',
      },

      // Admin 전용 z-index
      zIndex: {
        ...baseConfig.theme?.extend?.zIndex,
        sidebar: '40',
        header: '30',
        modal: '50',
        dropdown: '45',
        tooltip: '60',
      },

      // Admin 전용 애니메이션
      animation: {
        ...baseConfig.theme?.extend?.animation,
        'sidebar-slide': 'sidebarSlide 0.3s ease-out',
        'content-shift': 'contentShift 0.3s ease-out',
      },

      keyframes: {
        ...baseConfig.theme?.extend?.keyframes,
        sidebarSlide: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        contentShift: {
          '0%': { marginLeft: '4rem' },
          '100%': { marginLeft: '16rem' },
        },
      },

      // Admin 전용 박스 섀도우
      boxShadow: {
        ...baseConfig.theme?.extend?.boxShadow,
        admin: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'admin-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        sidebar: '-2px 0 8px 0 rgba(0, 0, 0, 0.1)',
      },
    },
  },
};

export default config;
