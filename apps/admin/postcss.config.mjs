/**
 * Description : postcss.config.mjs - 📌 Admin 앱 PostCSS 설정
 * Author : Shiwoo Min
 * Date : 2025-09-25
 */
import tailwindConfig from '@connectwon/ui/tailwind.config';

export default {
  plugins: {
    tailwindcss: {
      config: {
        ...tailwindConfig,
        content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', '../../packages/ui/src/**/*.{js,ts,jsx,tsx}', '../../packages/shared/src/**/*.{js,ts,jsx,tsx}'],
        theme: {
          ...tailwindConfig.theme,
          extend: {
            ...tailwindConfig.theme?.extend,
            // Admin 전용 확장
            spacing: {
              ...(tailwindConfig.theme?.extend?.spacing ?? {}),
              sidebar: '16rem',
              'sidebar-mini': '4rem',
            },
            zIndex: {
              ...(tailwindConfig.theme?.extend?.zIndex ?? {}),
              sidebar: '40',
              header: '30',
            },
          },
        },
      },
    },
    autoprefixer: {},
  },
};
