/**
 * Description : base.ts - 📌 eslint 기본 설정
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */

import tseslint from 'typescript-eslint';
import type { Linter } from 'eslint';

// Flat Config 방식
const config: Linter.FlatConfig[] = [
  {
    ignores: ['node_modules/**', 'dist/**', '.next/**', 'coverage/**'],
  },
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        project: true,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      // 기본 규칙
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'comma-dangle': ['error', 'es5'],
      'no-console': 'warn',
      'no-debugger': 'error',

      // TypeScript 규칙
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/prefer-const': 'error',
      '@typescript-eslint/no-var-requires': 'off', // CommonJS 호환성
    },
  },
  {
    // JavaScript 파일용 별도 설정
    files: ['**/*.{js,jsx}'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
];

export default config;
