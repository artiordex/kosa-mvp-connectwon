/**
 * Description : web.ts - 📌 Tailwind CSS 설정 (웹 프론트엔드 전용)
 * Author : Shiwoo Min
 * Date   : 2025-09-09
 */

import type { Config } from 'tailwindcss';
import base from './base.js';

// Tailwind 확장 타입
type TWExtend = NonNullable<NonNullable<Config['theme']>['extend']>;
const extendBase = (base.theme?.extend ?? {}) as TWExtend;

// 웹 전용 Tailwind 설정
const web: Partial<Config> = {
  ...base,
  theme: {
    ...(base.theme ?? {}),
    extend: {
      ...(extendBase || {}),
      colors: {
        ...(extendBase?.colors || {}),
        brand: { DEFAULT: '#1D4ED8', light: '#3B82F6', dark: '#1E40AF', fg: '#FFFFFF' },
        gradient: { from: '#667EEA', via: '#764BA2', to: '#F093FB' },
        accent: { purple: '#8B5CF6', pink: '#EC4899', orange: '#F97316', cyan: '#06B6D4' },
        hero: { primary: '#1D4ED8', secondary: '#7C3AED', accent: '#F59E0B' }
      },
      fontSize: {
        ...(extendBase?.fontSize || {}),
        hero: ['4rem', { lineHeight: '1.1', fontWeight: '800' }],
        display: ['3.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        headline: ['2.5rem', { lineHeight: '1.3', fontWeight: '600' }]
      },
      borderRadius: {
        ...(extendBase?.borderRadius || {}),
        xl: '1rem', '2xl': '1.25rem', '3xl': '1.75rem', '4xl': '2rem'
      },
      boxShadow: {
        ...(extendBase?.boxShadow || {}),
        hero: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        float: '0 10px 40px -10px rgb(0 0 0 / 0.15)',
        'glow-blue': '0 0 30px rgb(29 78 216 / 0.3)',
        'glow-purple': '0 0 30px rgb(139 92 246 / 0.3)',
        'card-hover': '0 20px 40px -8px rgb(0 0 0 / 0.12)'
      },
      backgroundImage: {
        ...(extendBase?.backgroundImage || {}),
        'hero-gradient': 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
        'card-gradient': 'linear-gradient(145deg, #FFFFFF 0%, #F8FAFC 100%)',
        'button-gradient': 'linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)',
        'accent-gradient': 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)'
      },
      animation: {
        ...(extendBase?.animation || {}),
        float: 'float 6s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 3s ease-in-out infinite',
        'slide-in-bottom': 'slide-in-bottom 0.5s ease-out',
        'zoom-in': 'zoom-in 0.3s ease-out',
        'rotate-slow': 'rotate-slow 10s linear infinite'
      },
      keyframes: {
        ...(extendBase?.keyframes || {}),
        float: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-10px)' } },
        'pulse-glow': { '0%, 100%': { boxShadow: '0 0 20px rgb(29 78 216 / 0.3)' }, '50%': { boxShadow: '0 0 40px rgb(29 78 216 / 0.6)' } },
        'gradient-shift': { '0%, 100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
        'slide-in-bottom': { '0%': { transform: 'translateY(30px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        'zoom-in': { '0%': { transform: 'scale(0.8)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' } },
        'rotate-slow': { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } }
      },
      backdropBlur: { ...(extendBase?.backdropBlur || {}), '4xl': '72px' }
    }
  },
  plugins: [...(base.plugins ?? [])]
};

export default web;
