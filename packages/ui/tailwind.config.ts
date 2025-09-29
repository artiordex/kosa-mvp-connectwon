/**
 * Description : tailwind.config.ts - 📌 tailwindcss 설정
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */
import baseConfig from '@connectwon/';
import type { Config } from 'tailwindcss';

const config: Config = {
  ...baseConfig,
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
    ...baseConfig.theme,
    extend: {
      ...baseConfig.theme?.extend,
      // UI 패키지 전용 확장
      colors: {
        ...baseConfig.theme?.extend?.colors,
        // 차트 전용 색상 추가
        chart: {
          primary: '#3b82f6',
          success: '#10b981',
          warning: '#f59e0b',
          danger: '#ef4444',
          purple: '#8b5cf6',
          cyan: '#06b6d4',
        },
      },
      // 차트 관련 애니메이션
      animation: {
        ...baseConfig.theme?.extend?.animation,
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        ...baseConfig.theme?.extend?.keyframes,
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
};
export default config
