/**
 * Description : vitest.ts - 📌 vitest 공통 설정 파일 관리
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */

import { defineConfig, type UserConfigExport } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

// vitest 환경 프리셋 타입
export type EnvPreset = 'node' | 'jsdom';

// vitest 설정 생성 함수
export function createVitestConfig(
  env: EnvPreset = 'node',
  overrides: UserConfigExport = {},
) {
  return defineConfig({
    plugins: [tsconfigPaths()],
    test: {
      globals: true,
      environment: env,
      include: ['src/**/*.{test,spec}.{ts,tsx}'],
      reporters: process.env['CI'] ? ['default', 'junit'] : ['default'],
      coverage: {
        reporter: process.env['CI'] ? ['text', 'lcov'] : ['text'],
        reportsDirectory: 'coverage',
      },
    },
    ...overrides,
  });
}

// default
export default createVitestConfig();
