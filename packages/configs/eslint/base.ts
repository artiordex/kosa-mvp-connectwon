/**
 * Description : base.ts - 📌 eslint 기본 설정
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import type { Linter } from 'eslint';

const config: Linter.Config[] = [
  // 공통 무시 경로
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**',
      '**/.nx/**',
      '**/coverage/**',
      '**/generated/**',
    ],
  },

  // JS 코어 추천 규칙 (@eslint/js)
  js.configs.recommended,

  // TS 추천 규칙(타입 인지) – tsconfig 자동 탐색
  ...tseslint.configs.recommendedTypeChecked,

  // 프로젝트 공통 커스터마이즈 (JS/TS 공통)
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        // tsconfig 자동 탐색
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
      'prefer-const': 'error', // ← fix: 코어 룰

      // TS 전용 규칙
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-var-requires': 'off', // CommonJS 호환성(필요 시)
    },
  },

  // JS 전용 추가 조정
  {
    files: ['**/*.{js,jsx}'],
    rules: {
      // JS 파일에서 TS 전용 규칙 강제 비활성화(안전망)
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
];

export default config;
