/**
 * Description : postcss.config.mjs - 📌 Admin 앱 PostCSS 설정
 * Author : Shiwoo Min
 * Date : 2025-09-25
 */
import baseConfig from '@connectwon/ui/tailwind-config';

const adminConfig = {
  ...baseConfig,
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}', // Admin 앱 소스
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}', // UI 패키지
    '../../packages/shared/src/**/*.{js,ts,jsx,tsx}', // Shared 패키지
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
      },
      zIndex: {
        ...(baseConfig.theme?.extend?.zIndex ?? {}),
        sidebar: '40',
        header: '30',
      },
    },
  },
};

export default {
  plugins: {
    tailwindcss: { config: adminConfig },
    autoprefixer: {},
  },
};
