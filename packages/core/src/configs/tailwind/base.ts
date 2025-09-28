/**
 * Description : base.ts - 📌 모노레포 전체를 위한 통합 Tailwind CSS 설정 (애니메이션 포함)
 * Author : Shiwoo Min
 * Date   : 2025-09-09
 * 09-09 : 기본 색상/폰트/레이아웃 확장
 * 09-16 : animations.ts → base.ts 통합, 한 군데에서만 관리
 * 09-28 : 프로젝트 전반 공통 토큰/애니메이션 반영
 */
import type { Config } from 'tailwindcss';

// Tailwind 기본 설정
const base = {
  darkMode: ['class'],
  theme: {
    // 반응형 브레이크포인트
    screens: {
      xs: '475px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      // CSS 변수 기반 색상 팔레트
      colors: {
        brand: {
          DEFAULT: 'rgb(var(--brand) / <alpha-value>)',
          light: 'rgb(var(--brand-light) / <alpha-value>)',
          dark: 'rgb(var(--brand-dark) / <alpha-value>)',
          fg: 'rgb(var(--brand-fg) / <alpha-value>)',
        },
        bg: {
          DEFAULT: 'rgb(var(--bg) / <alpha-value>)',
          soft: 'rgb(var(--bg-soft) / <alpha-value>)',
          muted: 'rgb(var(--bg-muted) / <alpha-value>)',
        },
        text: {
          DEFAULT: 'rgb(var(--text) / <alpha-value>)',
          muted: 'rgb(var(--text-muted) / <alpha-value>)',
          soft: 'rgb(var(--text-soft) / <alpha-value>)',
        },
        success: { DEFAULT: '#10B981', fg: '#fff' },
        warning: { DEFAULT: '#F59E0B', fg: '#fff' },
        error: { DEFAULT: '#EF4444', fg: '#fff' },
        info: { DEFAULT: '#3B82F6', fg: '#fff' },
      },

      // 폰트 패밀리
      fontFamily: {
        sans: [
          'Inter',
          'Pretendard',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Noto Sans',
          'Apple SD Gothic Neo',
          'Malgun Gothic',
          'Arial',
          'sans-serif',
        ],
        mono: ['JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', 'Courier New', 'monospace'],
      },

      // 스페이싱/레이어
      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
      },
      zIndex: {
        1: '1',
        50: '50',
        100: '100',
      },

      // 📌 애니메이션 확장 (animations.ts 통합)
      animation: {
        'spin-slow': 'spin 1s linear infinite',
        'pulse-dots': 'pulse 1.4s ease-in-out infinite both',
        skeleton: 'skeleton 1.5s infinite',
        heartbeat: 'heartbeat 1.5s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'float-in': 'floatIn 0.5s ease-out',
        'modal-slide': 'modalSlide 0.4s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatIn: {
          '0%': { opacity: '0', transform: 'translateX(100px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        modalSlide: {
          '0%': { transform: 'scale(0.7) translateY(-20px)', opacity: '0' },
          '100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
        },
        skeleton: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        heartbeat: {
          '0%,100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Partial<Config>;

// 애니메이션/키프레임 타입 (자동완성용)
export type AnimationName = keyof typeof base.theme.extend.animation;
export type KeyframeName = keyof typeof base.theme.extend.keyframes;

// 유틸 헬퍼
export const getAnimationClass = (name: AnimationName): string => `animate-${name}`;
export const getKeyframeName = (name: KeyframeName): string => name;

export default base;
