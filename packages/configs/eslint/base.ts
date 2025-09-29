/**
 * Description : base.ts - 📌 ESLint 기본 설정 (ESLint 9 flat config 대응)
 * Author : Shiwoo Min
 * Date : 2025-09-28
 */
import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import type { Linter } from 'eslint';


const config: Linter.Config[] = [
  // 공통 무시 경로
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/.next/**', '**/.nx/**', '**/coverage/**', '**/generated/**'],
  },

  // JS 코어 추천 규칙
  js.configs.recommended,

  // TS 추천 규칙 (타입 인지) – undefined 안전 처리
  ...(tseslint.configs['recommendedTypeChecked'] ? [tseslint.configs['recommendedTypeChecked'] as unknown as Linter.Config] : []),
  // 프로젝트 공통 커스터마이즈 (JS/TS 공통)
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser,
      parserOptions: {
        project: true, // tsconfig 자동 탐색
      },
    } as any, // ← 타입 보정 (ESLint 9 타입 정의 충돌 회피)
    rules: {
      // 기본 규칙
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'comma-dangle': ['error', 'es5'],
      'no-console': 'warn',
      'no-debugger': 'error',
      'prefer-const': 'error',

      // TS 전용 규칙
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-var-requires': 'off',
    },
  },

  // JS 전용 추가 조정
  {
    files: ['**/*.{js,jsx}'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
];

export default config;
