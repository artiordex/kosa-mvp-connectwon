/**
 * Description : tailwind.config.ts - 📌 tailwindcss 설정
 * Author : Shiwoo Min
 * Date : 2025-09-09
 * 09-30 : configs 패키지 설정 통합
 * config 기준 : https://tailwindcss.com/docs/configuration
 */
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './layout/**/*.{js,ts,jsx,tsx}',
    './charts/**/*.{js,ts,jsx,tsx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    // 반응형 브레이크포인트 (base)
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
        // base 색상
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

        // admin 색상
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
          900: '#212121'
        },
        sidebar: {
          DEFAULT: 'rgb(var(--sidebar-bg) / <alpha-value>)',
          hover: 'rgb(var(--sidebar-hover) / <alpha-value>)',
          active: 'rgb(var(--sidebar-active) / <alpha-value>)'
        },
        status: {
          active: '#10B981',
          inactive: '#6B7280',
          pending: '#F59E0B',
          blocked: '#EF4444'
        },
        table: {
          header: '#F3F4F6',
          rowHover: '#F9FAFB'
        },

        // web 색상
        gradient: {
          from: '#667EEA',
          via: '#764BA2',
          to: '#F093FB'
        },
        accent: {
          purple: '#8B5CF6',
          pink: '#EC4899',
          orange: '#F97316',
          cyan: '#06B6D4'
        },
        hero: {
          primary: '#1D4ED8',
          secondary: '#7C3AED',
          accent: '#F59E0B'
        },

        // UI 패키지 전용 차트 색상
        chart: {
          primary: '#3b82f6',
          success: '#10b981',
          warning: '#f59e0b',
          danger: '#ef4444',
          purple: '#8b5cf6',
          cyan: '#06b6d4',
        },
      },

      // 폰트 패밀리 (base)
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
        mono: [
          'JetBrains Mono',
          'Fira Code',
          'Monaco',
          'Consolas',
          'Courier New',
          'monospace'
        ],
      },

      // 폰트 사이즈 (web)
      fontSize: {
        hero: ['4rem', { lineHeight: '1.1', fontWeight: '800' }],
        display: ['3.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        headline: ['2.5rem', { lineHeight: '1.3', fontWeight: '600' }]
      },

      // 스페이싱 (base + admin)
      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
        sidebar: '16rem',
        header: '4rem',
        content: '2rem',
      },

      // z-index (base)
      zIndex: {
        1: '1',
        50: '50',
        100: '100',
      },

      // border radius (web)
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2rem'
      },

      // box shadow (admin + web)
      boxShadow: {
        // admin
        sidebar: '2px 0 8px 0 rgb(0 0 0 / 0.05)',
        header: '0 2px 8px 0 rgb(0 0 0 / 0.05)',
        card: '0 4px 12px 0 rgb(0 0 0 / 0.05)',
        modal: '0 20px 40px 0 rgb(0 0 0 / 0.15)',
        // web
        hero: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        float: '0 10px 40px -10px rgb(0 0 0 / 0.15)',
        'glow-blue': '0 0 30px rgb(29 78 216 / 0.3)',
        'glow-purple': '0 0 30px rgb(139 92 246 / 0.3)',
        'card-hover': '0 20px 40px -8px rgb(0 0 0 / 0.12)'
      },

      // background image (web)
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
        'card-gradient': 'linear-gradient(145deg, #FFFFFF 0%, #F8FAFC 100%)',
        'button-gradient': 'linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)',
        'accent-gradient': 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)'
      },

      // backdrop blur (web)
      backdropBlur: {
        '4xl': '72px'
      },

      // 애니메이션 (base + admin + web + UI)
      animation: {
        // base
        'spin-slow': 'spin 1s linear infinite',
        'pulse-dots': 'pulse 1.4s ease-in-out infinite both',
        skeleton: 'skeleton 1.5s infinite',
        heartbeat: 'heartbeat 1.5s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'float-in': 'floatIn 0.5s ease-out',
        'modal-slide': 'modalSlide 0.4s ease-out',
        // admin
        'slide-in-left': 'slide-in-left 0.3s ease-out',
        'slide-out-left': 'slide-out-left 0.3s ease-in',
        progress: 'progress 1s ease-in-out',
        loading: 'loading 1.5s ease-in-out infinite',
        // web
        float: 'float 6s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 3s ease-in-out infinite',
        'slide-in-bottom': 'slide-in-bottom 0.5s ease-out',
        'zoom-in': 'zoom-in 0.3s ease-out',
        'rotate-slow': 'rotate-slow 10s linear infinite',
        // UI 차트 전용
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },

      // 키프레임 (base + admin + web + UI)
      keyframes: {
        // base
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
        // admin
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        'slide-out-left': {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(-100%)', opacity: '0' }
        },
        progress: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' }
        },
        loading: {
          '0%, 80%, 100%': { transform: 'scale(0)' },
          '40%': { transform: 'scale(1)' }
        },
        // web
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgb(29 78 216 / 0.3)' },
          '50%': { boxShadow: '0 0 40px rgb(29 78 216 / 0.6)' }
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        'slide-in-bottom': {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'zoom-in': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        'rotate-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        // UI 차트 전용
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
