/**
 * Description : postcss.config.mjs - 📌 Web 앱 PostCSS 설정
 * Author : Shiwoo Min
 * Date : 2025-09-25
 */
import tailwindConfig from '@connectwon/ui/tailwind.config';

export default {
  plugins: {
    tailwindcss: { config: tailwindConfig },
    autoprefixer: {},
  },
};
