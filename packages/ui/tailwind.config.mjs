/**
 * Description : tailwind.config.mjs - 📌 TailwindCSS 설정 (UI 패키지)
 * Author : Shiwoo Min
 * Date : 2025-10-09
 *
 * Environment :
 *  - Docker / Cloud Run / Firebase / Azure / Local 개발환경 완전 호환
 *  - Nx monorepo 구조 대응 (apps + packages)
 *  - UI 패키지: admin + web 통합형 스타일 시스템
 *
 * Note :
 *  - configs 패키지의 Tailwind preset 확장
 *  - admin, web, shared 색상/테마 구분
 *  - preset 기준: https://tailwindcss.com/docs/configuration
 */

// TailwindCSS 공식 플러그인 import
import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import lineClamp from '@tailwindcss/line-clamp';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
const config = {
  // 다크모드 클래스 기반
  darkMode: ['class'],

  // Tailwind 스캔 경로 (Nx 모노레포 전역 포함)
  content: [
    // UI 내부
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layout/**/*.{js,ts,jsx,tsx}',
    './charts/**/*.{js,ts,jsx,tsx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',

    // Nx 전체 앱/패키지
    '../../apps/**/*.{js,ts,jsx,tsx}',
    '../../packages/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    screens: {
      xs: '475px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },

    extend: {
      // 색상 팔레트
      colors: {
        // 공통 색상
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

        // Admin 전용 색상
        admin: {
          neutral: {
            50: '#FAFAFA',
            100: '#F5F5F5',
            200: '#EEEEEE',
            300: '#E0E0E0',
            400: '#BDBDBD',
            500: '#9E9E9E',
            600: '#757575',
            700: '#616161',
            800: '#424242',
            900: '#212121',
          },
          sidebar: {
            DEFAULT: 'rgb(var(--sidebar-bg) / <alpha-value>)',
            hover: 'rgb(var(--sidebar-hover) / <alpha-value>)',
            active: 'rgb(var(--sidebar-active) / <alpha-value>)',
          },
          table: {
            header: '#F3F4F6',
            rowHover: '#F9FAFB',
          },
          status: {
            active: '#10B981',
            inactive: '#6B7280',
            pending: '#F59E0B',
            blocked: '#EF4444',
          },
        },

        // Web 전용 색상
        web: {
          gradient: {
            from: '#667EEA',
            via: '#764BA2',
            to: '#F093FB',
          },
          accent: {
            purple: '#8B5CF6',
            pink: '#EC4899',
            orange: '#F97316',
            cyan: '#06B6D4',
          },
          hero: {
            primary: '#1D4ED8',
            secondary: '#7C3AED',
            accent: '#F59E0B',
          },
          chart: {
            primary: '#3b82f6',
            success: '#10b981',
            warning: '#f59e0b',
            danger: '#ef4444',
            purple: '#8b5cf6',
            cyan: '#06b6d4',
          },
        },
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

      // box-shadow + animation 등은 그대로 유지
      boxShadow: {
        sidebar: '2px 0 8px 0 rgb(0 0 0 / 0.05)',
        header: '0 2px 8px 0 rgb(0 0 0 / 0.05)',
        card: '0 4px 12px 0 rgb(0 0 0 / 0.05)',
        modal: '0 20px 40px 0 rgb(0 0 0 / 0.15)',
        hero: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      },
    },
  },

  // 플러그인
  plugins: [typography, forms, lineClamp, aspectRatio, containerQueries],
};

export default config;
