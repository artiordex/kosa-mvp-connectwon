
/**
 * Description : eslint.config.mjs - 📌 모노레포 ESLint Flat Config 설정
 * Author : Shiwoo Min
 * Date : 2025-09-25
 */
import eslint from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import nx from '@nx/eslint-plugin';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import playwright from 'eslint-plugin-playwright';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import playwright from 'eslint-plugin-playwright';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  // 기본 추천 설정
  eslint.configs.recommended,

  // 전역 설정
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: typescriptParser,
      parserOptions: {
        project: ['./tsconfig.json', './apps/*/tsconfig.json', './packages/*/tsconfig.json'],
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        // Node.js 환경
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        // Browser 환경
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        // ES2022
        globalThis: 'readonly',
      },
    },

    plugins: {
      '@nx': nx,
      '@typescript-eslint': typescript,
      import: importPlugin,
      playwright: playwright,
      'react-hooks': reactHooks,
      react: react,
      '@next/next': nextPlugin,
    },

    settings: {
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.json', './apps/*/tsconfig.json', './packages/*/tsconfig.json'],
          alwaysTryTypes: true,
        },
        node: {
          extensions: ['.mjs', '.js', '.ts', '.tsx', '.jsx', '.cjs'],
        },
      },
      react: {
        version: 'detect',
      },
    },

    rules: {
      // TypeScript 기본 규칙
      ...typescript.configs.recommended.rules,

      // NX 모듈 경계 규칙
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            { sourceTag: 'type:app', onlyDependOnLibsWithTags: ['type:lib', 'scope:shared'] },
            { sourceTag: 'scope:api', onlyDependOnLibsWithTags: ['scope:shared'] },
          ],
        },
      ],

      // 팀 스타일 규칙
      semi: ['error', 'always'],
      quotes: 'off', // Prettier에서 처리
      '@typescript-eslint/quotes': 'off',
      indent: 'off', // Prettier에서 처리
      '@typescript-eslint/indent': 'off',
      'linebreak-style': 'off',
      'no-trailing-spaces': 'off',
      'no-console': 'off',
      'object-shorthand': 'off',
      'class-methods-use-this': 'off',
      'no-underscore-dangle': 'off',
      'no-plusplus': 'off',
      'function-paren-newline': 'off',
      'function-call-argument-newline': 'off',
      'lines-between-class-members': 'off',
      '@typescript-eslint/lines-between-class-members': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-await-in-loop': 'off',

      // Import 관련 규칙
      'import/no-extraneous-dependencies': [
        'error',
        {
          peerDependencies: true,
          optionalDependencies: true,
          devDependencies: false,
        },
      ],
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
          pathGroups: [{ pattern: '@connectwon/**', group: 'internal', position: 'after' }],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-duplicates': 'warn',
      'import/newline-after-import': ['warn', { count: 1 }],

      // 줄 길이 규칙
      'max-len': [
        'warn',
        {
          code: 120,
          ignoreComments: true,
          ignoreTrailingComments: true,
          ignoreTemplateLiterals: true,
          ignoreUrls: true,
        },
      ],

      // React 관련 규칙
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      // Next.js 규칙
      '@next/next/no-html-link-for-pages': 'off',
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },

  // 파일별 무시 패턴
  {
    ignores: ['node_modules/', 'dist/', 'build/', '.next/', '.nx/', 'coverage/', 'generated/'],
  },

  // TypeScript 파일 전용 설정
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // TypeScript 전용 규칙들
    },
  },

  // 테스트 파일 설정
  {
    files: [
      '**/*.test.ts',
      '**/*.spec.ts',
      '**/*.test.tsx',
      '**/*.spec.tsx',
      '**/*.stories.*',
      '**/*.mdx',
      '**/playwright.config.*',
      '**/vitest.config.*',
      '**/*.config.*',
      'scripts/**',
    ],
    rules: {
      // Playwright 규칙
      'playwright/no-focused-test': 'error',
      'playwright/no-skipped-test': 'warn',
      'playwright/no-conditional-in-test': 'warn',

      // 테스트 파일에서는 devDependencies 허용
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
          peerDependencies: true,
          optionalDependencies: true,
        },
      ],
    },
  },

  // JavaScript/Config 파일 설정
  {
    files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },

  // Next.js 특수 파일들 설정
  {
    files: [
      'apps/*/src/app/**/*.tsx',
      'apps/*/src/pages/**/*.tsx',
      'apps/*/pages/**/*.tsx',
      '**/page.tsx',
      '**/layout.tsx',
      '**/loading.tsx',
      '**/error.tsx',
      '**/not-found.tsx',
    ],
    rules: {
      'import/no-default-export': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
];
