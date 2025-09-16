/**
 * Description : vitest.config.ts - 📌 루트 vitest 환경 설정
 * Author : Shiwoo Min
 * Date : 2025-09-07
 * 09-16 - ESM 환경에서 __dirname 미정의 → fileURLToPath로 __dirname 유사값 구성
 */
/// <reference types="vite/client" />
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
// __dirname 대체용
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
    exclude: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.next/**'],
  },
  resolve: {
    alias: {
      '@/web': path.resolve(__dirname, './apps/web/src'),
      '@/api': path.resolve(__dirname, './apps/api/src'),
      '@/admin': path.resolve(__dirname, './apps/admin/src'),
    },
  },
});
