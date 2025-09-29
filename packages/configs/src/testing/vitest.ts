/**
 * Description : vitest.ts - 📌 vitest 공통 설정 파일 관리
 * Author : Shiwoo Min
 * Date : 2025-09-09
 * 09-29 - reporters/coverage 확정 (undefined 제거)
 */
import tsconfigPaths from 'vite-tsconfig-paths';
import { type ViteUserConfig } from 'vitest/config';

// vitest 환경 프리셋 타입
export type EnvPreset = 'node' | 'jsdom';

// vitest 설정 생성 함수
export function createVitestConfig(env: EnvPreset = 'node', overrides: ViteUserConfig = {}): ViteUserConfig {
  // CI 여부에 따른 기본 reporters 확정
  const defaultReporters: NonNullable<NonNullable<ViteUserConfig['test']>['reporters']> = process.env['CI'] ? ['default', 'junit'] : ['default'];

  // 기본 test 설정 (reporters/coverage 항상 확정)
  const baseTest: NonNullable<ViteUserConfig['test']> = {
    globals: true,
    environment: env,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    reporters: defaultReporters,
    coverage: {
      provider: 'istanbul',
      reportsDirectory: 'coverage',
    },
  };

  // overrides에서 test 분리
  const { test: overrideTest, ...restOverrides } = overrides;

  // reporters를 항상 확정 (절대 undefined 불가)
  const resolvedReporters: NonNullable<NonNullable<ViteUserConfig['test']>['reporters']> = (overrideTest?.reporters ??
    baseTest.reporters) as NonNullable<NonNullable<ViteUserConfig['test']>['reporters']>;

  // coverage.provider도 fallback 보장
  const resolvedCoverage = {
    ...baseTest.coverage,
    ...overrideTest?.coverage,
    provider: (overrideTest?.coverage as any)?.provider ?? (baseTest.coverage as any)?.provider ?? 'istanbul',
  };

  // 최종 test 설정
  const resolvedTest: NonNullable<ViteUserConfig['test']> = {
    ...baseTest,
    ...(overrideTest ?? {}),
    reporters: resolvedReporters, // 확정 타입
    coverage: resolvedCoverage,
  };

  // 최종 config
  const resolvedConfig: ViteUserConfig = {
    plugins: [tsconfigPaths()],
    test: resolvedTest,
    ...restOverrides,
  };

  return resolvedConfig;
}

// default export
export default createVitestConfig();
