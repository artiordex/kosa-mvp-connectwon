/**
 * Description : vitest.config.ts - 📌 루트 vitest 환경 설정
 * Author : Shiwoo Min
 * Date : 2025-09-07
 * 09-16 - ESM 환경에서 __dirname 미정의 → fileURLToPath로 __dirname 유사값 구성
 */
/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vitest/config';

// ESM에서 __dirname 대체
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
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
        '**/*.config.{js,ts}',
        '**/coverage/**',
        'apps/e2e/**',
      ],
    },
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: false,
        minThreads: 1,
        maxThreads: 4,
      },
    },
  },
  resolve: {
    alias: {
      // 앱 별칭
      '@/web': path.resolve(__dirname, './apps/web/src'),
      '@/api': path.resolve(__dirname, './apps/api/src'),
      '@/admin': path.resolve(__dirname, './apps/admin/src'),

      // 패키지 별칭 추가
      '@connectwon/core': path.resolve(__dirname, './packages/core/src'),
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
