/**
 * Description : admin.ts - 📌 Tailwind CSS 설정 (관리자 대시보드 전용)
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */
import type { Config } from 'tailwindcss';
import base from './base.js';

type TWExtend = NonNullable<NonNullable<Config['theme']>['extend']>;
const extendBase = (base.theme?.extend ?? {}) as TWExtend;

const admin: Partial<Config> = {
  ...base,
  theme: {
    ...(base.theme ?? {}),
    extend: {
      ...(extendBase || {}),
      colors: {
        ...(extendBase?.colors || {}),
        brand: { DEFAULT: '#6366F1', light: '#818CF8', dark: '#4F46E5', fg: '#FFFFFF' },
        neutral: {
          50: '#FAFAFA', 100: '#F5F5F5', 200: '#EEEEEE', 300: '#E0E0E0',
          400: '#BDBDBD', 500: '#9E9E9E', 600: '#757575', 700: '#616161',
          800: '#424242', 900: '#212121'
        },
        sidebar: {
          DEFAULT: 'rgb(var(--sidebar-bg) / <alpha-value>)',
          hover: 'rgb(var(--sidebar-hover) / <alpha-value>)',
          active: 'rgb(var(--sidebar-active) / <alpha-value>)'
        },
        status: { active: '#10B981', inactive: '#6B7280', pending: '#F59E0B', blocked: '#EF4444' },
        table: { header: '#F3F4F6', rowHover: '#F9FAFB' }
      },
      spacing: { ...(extendBase?.spacing || {}), sidebar: '16rem', header: '4rem', content: '2rem' },
      boxShadow: {
        ...(extendBase?.boxShadow || {}),
        sidebar: '2px 0 8px 0 rgb(0 0 0 / 0.05)',
        header: '0 2px 8px 0 rgb(0 0 0 / 0.05)',
        card: '0 4px 12px 0 rgb(0 0 0 / 0.05)',
        modal: '0 20px 40px 0 rgb(0 0 0 / 0.15)'
      },
      animation: {
        ...(extendBase?.animation || {}),
        'slide-in-left': 'slide-in-left 0.3s ease-out',
        'slide-out-left': 'slide-out-left 0.3s ease-in',
        progress: 'progress 1s ease-in-out',
        loading: 'loading 1.5s ease-in-out infinite'
      },
      keyframes: {
        ...(extendBase?.keyframes || {}),
        'slide-in-left': { '0%': { transform: 'translateX(-100%)', opacity: '0' }, '100%': { transform: 'translateX(0)', opacity: '1' } },
        'slide-out-left': { '0%': { transform: 'translateX(0)', opacity: '1' }, '100%': { transform: 'translateX(-100%)', opacity: '0' } },
        progress: { '0%': { transform: 'scaleX(0)' }, '100%': { transform: 'scaleX(1)' } },
        loading: { '0%, 80%, 100%': { transform: 'scale(0)' }, '40%': { transform: 'scale(1)' } }
      }
    }
  },
  plugins: [...(base.plugins ?? [])]
};

export default admin;
