/**
 * Description : vitest.config.ts - 📌 루트 vitest 환경 설정
 * Author : Shiwoo Min
 * Date : 2025-09-07
 */
/// <reference types="vite/client" />
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vitest/config';

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
      '@/shared': path.resolve(__dirname, './packages/shared/src'),
      '@/ui': path.resolve(__dirname, './packages/ui/src'),
    },
  },
});
