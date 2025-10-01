/**
 * Description : postcss.config.mjs - 📌 Web 앱 PostCSS 설정
 * Author : Shiwoo Min
 * Date : 2025-09-25
 */
import baseConfig from '@connectwon/ui/tailwind-config';

const webConfig = {
  ...baseConfig,
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}', // Web 소스
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}', // UI 패키지
    '../../packages/shared/src/**/*.{js,ts,jsx,tsx}', // Shared 패키지
  ],
};

export default {
  plugins: {
    tailwindcss: { config: webConfig },
    autoprefixer: {},
  },
};
