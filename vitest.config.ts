/**
 * Description : vitest.config.ts - 📌 루트 vitest 환경 설정
 * Author : Shiwoo Min
 * Date : 2025-09-07
 * 09-16 - ESM 환경에서 __dirname 미정의 → fileURLToPath로 __dirname 유사값 구성
 * 10-08 - tsconfigPaths 플러그인 추가, React 18 jsdom URL 보강, thread 옵션 최신화
 * 10-09 - CI 환경용 절대경로 setup, Node 환경 fallback 추가
 */
/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vitest/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    environmentOptions: {
      jsdom: {
        url: 'http://localhost/',
      },
    },
    // setup 파일 절대경로화
    setupFiles: [path.resolve(__dirname, './tools/testkit/setup.ts')],

    // Node 환경 fallback (API / Worker용)
    environmentMatchGlobs: [
      ['**/apps/api/**', 'node'],
      ['**/apps/worker/**', 'node'],
    ],

    include: [
      'apps/**/*.{test,spec}.{js,ts,jsx,tsx}',
      'packages/**/*.{test,spec}.{js,ts,jsx,tsx}',
      'test/**/*.{test,spec}.{js,ts,jsx,tsx}',
    ],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.next/**',
      '**/e2e-artifacts/**',
      '**/playwright-report/**',
      '**/test-results/**',
      'apps/e2e/**',
    ],

    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        'dist/**',
        'build/**',
        '**/*.d.ts',
        '**/*.config.{js,ts,mjs}',
        '**/coverage/**',
        'apps/e2e/**',
      ],
    },

    // 추가 안정성 설정
    restoreMocks: true,
    clearMocks: true,
    pool: 'threads',
    poolOptions: {
      threads: {
        maxThreads: 4,
        minThreads: 1,
      },
    },
  },
  resolve: {
    alias: {
      '@/web': path.resolve(__dirname, './apps/web/src'),
      '@/api': path.resolve(__dirname, './apps/api/src'),
      '@/admin': path.resolve(__dirname, './apps/admin/src'),
      '@/worker': path.resolve(__dirname, './apps/worker/src'),
      '@/e2e': path.resolve(__dirname, './apps/e2e/src'),
      '@connectwon/core': path.resolve(__dirname, './packages/core/src'),
      '@connectwon/configs': path.resolve(__dirname, './packages/configs/src'),
      '@connectwon/database': path.resolve(__dirname, './packages/database/src'),
      '@connectwon/logger': path.resolve(__dirname, './packages/logger/src'),
      '@connectwon/ui': path.resolve(__dirname, './packages/ui/src'),
      '@connectwon/client': path.resolve(__dirname, './packages/client/src'),
      '@connectwon/sdk': path.resolve(__dirname, './packages/sdk/src'),
      '@connectwon/server': path.resolve(__dirname, './packages/server/src'),
      '@connectwon/api-contract': path.resolve(__dirname, './packages/api-contract/src'),
    },
  },
});
