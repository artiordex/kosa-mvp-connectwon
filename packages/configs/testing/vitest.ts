/**
 * Description : vitest.ts - 📌 vitest 공통 설정 파일 관리
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */

import { defineConfig, type UserConfigExport } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export type EnvPreset = 'node' | 'jsdom';

export function createVitestConfig(
  env: EnvPreset = 'node',
  overrides: UserConfigExport = {},
) {
  return defineConfig({
    plugins: [tsconfigPaths()],
    test: {
      // 공통 설정
      globals: true,
      // 테스트 환경: 'node' | 'jsdom'
      environment: env,
      include: ['src/**/*.{test,spec}.{ts,tsx}'],
      reporters: process.env['CI'] ? ['default', 'junit'] : ['default'],
      coverage: {
        reporter: process.env['CI'] ? ['text', 'lcov'] : ['text'],
        reportsDirectory: 'coverage',
      },
      // 디버깅 시 launch.json에서 --no-threads 권장(브레이크포인트 안정)
    },
    ...overrides,
  });
}

// default
export default createVitestConfig();
