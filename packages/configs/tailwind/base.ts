/**
 * Description : tsconfig.json - 📌 모노레포 전체를 위한 통합 TypeScript 설정
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */

import type { Config } from 'tailwindcss';

const base: Partial<Config> = {
  // 명시적 다크모드(class) 채택
  // darkMode:'media', 'class', 'false', 'media-optional', 'media-hover', 'media-pointer'
  darkMode: ['class'],
  theme: {
    extend: {
      // CSS 변수 기반 색상 팔레트
      colors: {
        brand: {
          DEFAULT: 'rgb(var(--brand) / <alpha-value>)',
          fg:      'rgb(var(--brand-fg) / <alpha-value>)'
        },
        // 배경/텍스트/테두리 색상
        bg: {
          DEFAULT: 'rgb(var(--bg) / <alpha-value>)',
          soft:    'rgb(var(--bg-soft) / <alpha-value>)',
        },
        // 텍스트 색상
        text: {
          DEFAULT: 'rgb(var(--text) / <alpha-value>)',
          muted:   'rgb(var(--text-muted) / <alpha-value>)'
        },
        // 테두리 색상
        border: 'rgb(var(--border) / <alpha-value>)'
      },
      // 폰트 설정
      fontFamily: {
        sans: [
          'Inter', 'Pretendard', 'system-ui', '-apple-system', 'Segoe UI',
          'Roboto', 'Noto Sans', 'Apple SD Gothic Neo', 'Malgun Gothic',
          'Arial', 'sans-serif'
        ]
      },
      // 컨테이너 설정
      container: {
        center: true,
        padding: '1rem'
      },
      // 라운드된 모서리 유틸
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem'
      },
      // 가벼운 트랜지션 유틸
      transitionDuration: {
        DEFAULT: '200ms'
      }
    }
  },
  plugins: []
};

export default base;
