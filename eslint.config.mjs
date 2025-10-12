/**
 * Description : eslint.config.mjs - 📌 모노레포 ESLint Flat Config 설정
 * Author : Shiwoo Min
 * Date : 2025-09-25
 * 명령어 : pnpm eslint .
 * 10-08 - Docker/Firebase/Azure 환경 대응 경로 수정 및 중복 import 정리
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
        // 모노레포 경로 문제 대응 (Docker/Firebase 빌드 환경)
        tsconfigRootDir: process.cwd(),
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
          project: [
            './tsconfig.json',
            './apps/*/tsconfig.json',
            './packages/*/tsconfig.json',
          ],
          alwaysTryTypes: true,
          // 모노레포 절대 경로 alias 호환
          paths: {
            '@connectwon/*': ['./packages/*/src'],
          },
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
          devDependencies: false,
          peerDependencies: true,
          optionalDependencies: true,
          packageDir: [
            '.',
            '../../',
            './apps/web',
            './apps/admin', 
          ],
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
          code: 240,
          ignoreComments: true,
          ignoreTrailingComments: true,
          ignoreTemplateLiterals: true,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreRegExpLiterals: true,
        },
      ],

      // React 관련 규칙
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      // React import 불필요 + JSX 내부 no-undef 경고 방지
      'no-undef': 'off',

      // Next.js 규칙
      '@next/next/no-html-link-for-pages': 'off',
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,

      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'import/order': 'off',
      'import/newline-after-import': 'off',
      'import/no-duplicates': 'warn',
    },
  },

  // 파일별 무시 패턴
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '*.config.js',
      '*.config.ts',
      '*.config.mjs',
      'package-lock.json',
      'yarn.lock',
      'pnpm-lock.yaml',
      '*.snap',
      'test-results/**',
      'vite.config.ts',
      'eslintrc.cjs',
    ],
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
    languageOptions: {
      parser: null,
    },
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
    },
  },
];
