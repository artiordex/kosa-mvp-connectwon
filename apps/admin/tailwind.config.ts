/**
 * Description : tailwind.config.ts - 📌 Admin 앱 Tailwind CSS 설정
 */
import baseConfig from '../../packages/configs/tailwind/base.js';
import type { Config } from 'tailwindcss';

const config: Config = {
  ...baseConfig,
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
    '../../packages/shared/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    ...baseConfig.theme,
    extend: {
      ...baseConfig.theme?.extend,
      // Admin 전용 확장
      spacing: {
        ...(baseConfig.theme?.extend?.spacing ?? {}),
        sidebar: '16rem',
        'sidebar-mini': '4rem',
        header: '4rem',
        content: 'calc(100vh - 4rem)',
      },
      width: {
        ...(baseConfig.theme?.extend?.width ?? {}),
        sidebar: '16rem',
        'sidebar-mini': '4rem',
        content: 'calc(100vw - 16rem)',
        'content-mini': 'calc(100vw - 4rem)',
      },
      height: {
        ...(baseConfig.theme?.extend?.height ?? {}),
        header: '4rem',
        content: 'calc(100vh - 4rem)',
      },
      zIndex: {
        ...(baseConfig.theme?.extend?.zIndex ?? {}),
        sidebar: '40',
        header: '30',
        modal: '50',
        dropdown: '45',
        tooltip: '60',
      },
      animation: {
        ...(baseConfig.theme?.extend?.animation ?? {}),
        'sidebar-slide': 'sidebarSlide 0.3s ease-out',
        'content-shift': 'contentShift 0.3s ease-out',
      },
      keyframes: {
        ...(baseConfig.theme?.extend?.keyframes ?? {}),
        sidebarSlide: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        contentShift: {
          '0%': { marginLeft: '4rem' },
          '100%': { marginLeft: '16rem' },
        },
      },
      boxShadow: {
        ...(baseConfig.theme?.extend?.boxShadow ?? {}),
        admin: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'admin-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        sidebar: '-2px 0 8px 0 rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [
    ...baseConfig.plugins,
    // Admin 전용 plugin 추가 가능
  ],
};

export default config;
