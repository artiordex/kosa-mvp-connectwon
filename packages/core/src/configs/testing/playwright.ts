/**
 * Description : playwright.ts - 📌 Playwright 공통 설정 팩토리
 * Author : Shiwoo Min
 * Date : 2025-09-11
 * 09-11 - exactOptionalPropertyTypes 호환
 * 09-28 - reporter/projects/workers undefined 방지
 */
import { defineConfig, devices, type PlaywrightTestConfig } from '@playwright/test';

// 프리셋 타입
export type PWPreset = 'web-desktop' | 'web-mobile' | 'api-only';

// 환경 옵션 타입
export interface PWEnvOptions {
  baseURL?: string;
  apiBaseURL?: string;
  storageStatePath?: string;
  headless?: boolean;
  trace?: 'on' | 'off' | 'retain-on-failure';
  workers?: number;
  retries?: number;
}

// Playwright 설정 생성 함수
export function createPlaywrightConfig(preset: PWPreset = 'web-desktop', overrides: Partial<PlaywrightTestConfig> = {}, env: PWEnvOptions = {}) {
  // CI 감지
  const isCI = process.env['CI'] === 'true';

  // 기본 URL
  const baseURL = env.baseURL || process.env['E2E_WEB_BASE_URL'] || process.env['BASE_URL'] || 'http://localhost:3001';

  // 상태 저장 경로
  const storageState = env.storageStatePath || process.env['STORAGE_STATE'] || '.auth/state.json';

  // 브라우저 옵션
  const headless = env.headless ?? (process.env['HEADLESS'] === 'true' || isCI);
  const trace = env.trace || (process.env['E2E_TRACE'] as 'on' | 'off' | 'retain-on-failure') || 'retain-on-failure';

  // workers
  const envWorkers = process.env['WORKERS'];
  const workersFromEnv = envWorkers ? Number(envWorkers) : undefined;
  const baseWorkers: number | undefined = env.workers ?? workersFromEnv;

  // retries
  const retries = env.retries ?? (process.env['RETRY_COUNT'] ? Number(process.env['RETRY_COUNT']) : isCI ? 2 : 0);

  // 기본 reporter
  const defaultReporter: NonNullable<PlaywrightTestConfig['reporter']> = isCI
    ? [['list'], ['junit', { outputFile: 'test-results/junit.xml' }], ['html', { open: 'never' }]]
    : [['list'], ['html', { open: 'never' }]];

  // 프리셋 프로젝트
  const presetProjects: NonNullable<PlaywrightTestConfig['projects']> =
    preset === 'api-only'
      ? [{ name: 'api', use: {} }]
      : preset === 'web-mobile'
        ? [
            { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
            { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
          ]
        : [
            { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
            { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
            { name: 'webkit', use: { ...devices['Desktop Safari'] } },
          ];

  // 기본 설정
  const baseConfig: PlaywrightTestConfig = {
    testDir: './tests',
    timeout: 30_000,
    expect: { timeout: 5_000 },
    fullyParallel: true,
    retries,
    reporter: defaultReporter,
    use: {
      baseURL,
      headless,
      trace,
      screenshot: 'only-on-failure',
      video: 'retain-on-failure',
      storageState,
      actionTimeout: 10_000,
      navigationTimeout: 15_000,
    },
    projects: presetProjects,
    ...(baseWorkers !== undefined ? { workers: baseWorkers } : {}),
  };

  // overrides 정리
  const {
    reporter: overrideReporter,
    projects: overrideProjects,
    workers: overrideWorkersUnknown,
    use: overrideUse,
    ...restOverrides
  } = overrides as Partial<Omit<PlaywrightTestConfig, 'reporter' | 'projects' | 'workers' | 'use'>> & {
    reporter?: PlaywrightTestConfig['reporter'];
    projects?: PlaywrightTestConfig['projects'];
    workers?: unknown;
    use?: PlaywrightTestConfig['use'];
  };

  // reporter 확정 (undefined 방지)
  const resolvedReporter: NonNullable<PlaywrightTestConfig['reporter']> = overrideReporter ?? baseConfig.reporter ?? [['list']];

  // projects 확정 (undefined 방지)
  const resolvedProjects: NonNullable<PlaywrightTestConfig['projects']> = overrideProjects ?? baseConfig.projects ?? [];

  // workers 확정 (number만 허용)
  const resolvedWorkers = typeof overrideWorkersUnknown === 'number' ? overrideWorkersUnknown : baseWorkers;

  // use 병합
  const resolvedUse: NonNullable<PlaywrightTestConfig['use']> = {
    ...baseConfig.use,
    ...(overrideUse ?? {}),
  };

  // 최종 구성
  const finalConfig: PlaywrightTestConfig = defineConfig({
    ...baseConfig,
    ...restOverrides,
    use: resolvedUse,
    reporter: resolvedReporter,
    projects: resolvedProjects,
    ...(resolvedWorkers !== undefined ? { workers: resolvedWorkers } : {}),
  });

  return finalConfig;
}

// default export
export default createPlaywrightConfig();
