/**
 * Description : prettier.config.mjs - 📌 Prettier 설정
 * Author : Shiwoo Min
 * Date : 2025-09-29
 * Note :
 *  - Monorepo 기반 (Nx + pnpm) 환경 최적화
 *  - Import 순서 및 Tailwind 플러그인 정렬 충돌 방지
 *  - VSCode / WebStorm 호환성 강화
 */

export default {
  arrowParens: 'avoid',
  trailingComma: 'all',
  singleQuote: true,
  tabWidth: 2,
  printWidth: 150,
  bracketSpacing: true,
  semi: true,

  // 플러그인 (정렬 + Tailwind)
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],

  // IDE 호환성 (Nx + pnpm workspace 환경에서 플러그인 탐색 방지)
  pluginSearchDirs: false,

  // import 순서 설정
  importOrder: [
    '^node:',
    '^react',
    '^next',
    '^@nestjs',
    '^@connectwon',
    '^@',
    '',
    '^apps/',
    '^configs/',
    '^infra/',
    '^packages/',
    '',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderCaseInsensitive: true,
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy', 'classProperties'],
};
