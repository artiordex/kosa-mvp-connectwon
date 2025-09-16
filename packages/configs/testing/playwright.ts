/**
 * Description : playwright.ts - 📌 Playwright 공통 설정 팩토리
 * Author : Shiwoo Min
 * Date : 2025-09-11
 * 09-11 - exactOptionalPropertyTypes 호환
 */
import { defineConfig, devices, type PlaywrightTestConfig } from '@playwright/test';

// Playwright 프리셋 타입
export type PWPreset = 'web-desktop' | 'web-mobile' | 'api-only';

// Playwright 환경 옵션 타입
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
export function createPlaywrightConfig(
  preset: PWPreset = 'web-desktop',
  overrides: Partial<PlaywrightTestConfig> = {},
  env: PWEnvOptions = {},
) {
  // CI 감지
  const isCI = process.env['CI'] === 'true';
  // 기본 URL (환경 변수 우선)
  const baseURL =
    env.baseURL ||
    process.env['E2E_WEB_BASE_URL'] ||
    process.env['BASE_URL'] ||
    'http://localhost:3001';
  // API 테스트용
  const storageState = env.storageStatePath || process.env['STORAGE_STATE'] || '.auth/state.json';
  const headless = env.headless ?? (process.env['HEADLESS'] === 'true' || isCI);
  const trace =
    env.trace ||
    (process.env['E2E_TRACE'] as 'on' | 'off' | 'retain-on-failure') ||
    'retain-on-failure';
  const envWorkers = process.env['WORKERS'];
  const workersFromEnv = envWorkers ? Number(envWorkers) : undefined;
  const baseWorkers: number | undefined = env.workers ?? workersFromEnv;
  const retries =
    env.retries ?? (process.env['RETRY_COUNT'] ? Number(process.env['RETRY_COUNT']) : isCI ? 2 : 0);

  // reporter는 문자열 또는 배열 모두 허용
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

  // overrides에서 문제 키 걷어내고 안전 병합
  const {
    reporter: overrideReporter,
    projects: overrideProjects,
    workers: overrideWorkersUnknown,
    use: overrideUse,
    ...restOverrides
  } = overrides as Partial<
    Omit<PlaywrightTestConfig, 'reporter' | 'projects' | 'workers' | 'use'>
  > & {
    reporter?: PlaywrightTestConfig['reporter'];
    projects?: PlaywrightTestConfig['projects'];
    workers?: unknown; // 문자열 등 들어올 수 있어 unknown으로 받음
    use?: PlaywrightTestConfig['use'];
  };

  // reporter 확정
  const resolvedReporter: NonNullable<PlaywrightTestConfig['reporter']> = (overrideReporter ??
    baseConfig.reporter)!;

  // projects 확정
  const resolvedProjects: NonNullable<PlaywrightTestConfig['projects']> = (overrideProjects ??
    baseConfig.projects)!;

  // workers는 number만 허용
  const resolvedWorkers =
    typeof overrideWorkersUnknown === 'number' ? overrideWorkersUnknown : baseWorkers;

  // use 병합
  const resolvedUse: NonNullable<PlaywrightTestConfig['use']> = {
    ...baseConfig.use,
    ...(overrideUse ?? {}),
  };

  // 최종 구성 (undefined 불가 항목은 모두 확정해서 넣음)
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

// default
export default createPlaywrightConfig();
