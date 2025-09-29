/**
 * Description : prettier.config.mjs - 📌 Prettier 설정
 * Author : Shiwoo Min
 * Date : 2025-09-29
 */

export default {
  arrowParens: 'avoid',
  trailingComma: 'all',
  singleQuote: true,
  tabWidth: 2,
  printWidth: 150,
  bracketSpacing: true,
  semi: true,

  // 플러그인 (정렬용)
  plugins: ['@trivago/prettier-plugin-sort-imports'],

  // import 순서 설정
  importOrder: [
    '^node:',
    '^react',
    '^next',
    '^@nestjs',
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
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
};
