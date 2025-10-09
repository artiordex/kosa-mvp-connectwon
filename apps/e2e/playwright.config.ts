/**
 * Description : playwright.config.ts - 📌 Playwright 테스트 실행 환경 정의 파일
 * Author : Shiwoo Min
 * Date : 2025-09-07
 * 09-07 - 최소 설정으로 웹/모바일 웹 E2E 테스트만 진행
 * 10-09 - CI/로컬 reporter 분리, expect timeout, outputDir 추가
 */

import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import os from 'os';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

/**
 * @description ESM 파일 경로 유틸 (Node.js ESM 환경에서 __filename/__dirname 대체)
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * @description e2e 폴더의 .env를 로드한다.
 */
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @description truthy / falsy 문자열 집합
 */
const truthy = new Set(['1', 'true', 'yes', 'on']);
const falsy = new Set(['0', 'false', 'no', 'off']);

const env = (k: string): string | undefined => process.env[k];
const envBool = (k: string, def: boolean): boolean => {
  const raw = env(k);
  if (raw == null) return def;
  const v = raw.toLowerCase();
  if (truthy.has(v)) return true;
  if (falsy.has(v)) return false;
  return def;
};
const envInt = (k: string, def: number): number => {
  const n = Number.parseInt(String(env(k) ?? ''), 10);
  return Number.isFinite(n) ? n : def;
};
const envStr = (k: string, def: string): string => env(k) ?? def;

/**
 * @description 파싱된 실행 환경 값들
 */
const IS_CI = envBool('CI', false);
const IS_DOCKER = envBool('DOCKER', false);
const HEADLESS = envBool('HEADLESS', true);
const BASE_URL = envStr('BASE_URL', 'http://localhost:3000');

/**
 * @description 재시도/워커 설정
 */
const RETRIES = envInt('RETRIES', IS_CI ? 2 : 0);
const WORKERS = IS_CI ? 1 : Math.max(1, Math.floor(os.cpus().length * 0.75));

/**
 * @description 타임아웃 및 슬로모션 설정(ms)
 */
const GLOBAL_TIMEOUT_MS = 30 * 60 * 1000;
const EXPECT_TIMEOUT_MS = 5000;
const ACTION_TIMEOUT_MS = envInt('ACTION_TIMEOUT', 30) * 1000;
const NAVIGATION_TIMEOUT_MS = envInt('NAVIGATION_TIMEOUT', 60) * 1000;
const SLOW_MO_MS = envInt('SLOW_MO', 0);
const BROWSER_LAUNCH_TIMEOUT_MS = envInt('BROWSER_LAUNCH_TIMEOUT', 60_000);

/**
 * @description 공통 Playwright `use` 옵션
 */
const commonUse = {
  baseURL: BASE_URL,
  headless: HEADLESS,
  ignoreHTTPSErrors: true,
  acceptDownloads: true,
  actionTimeout: ACTION_TIMEOUT_MS,
  navigationTimeout: NAVIGATION_TIMEOUT_MS,
  screenshot: 'only-on-failure' as const,
  video: 'retain-on-failure' as const,
  trace: 'on-first-retry' as const,

  // Docker 환경 최적화
  ...(IS_DOCKER && {
    bypassCSP: true,
    locale: 'ko-KR',
    timezoneId: 'Asia/Seoul',
  }),
};

/**
 * @description 데스크톱 크롬 프로젝트 설정
 */
const desktopProject = {
  name: 'Desktop Chrome',
  use: {
    ...devices['Desktop Chrome'],
    viewport: { width: 1920, height: 1080 },
    slowMo: SLOW_MO_MS,
    launchOptions: {
      args: [
        '--start-maximized',
        '--disable-extensions',
        '--disable-dev-shm-usage',
        '--no-sandbox',
        '--disable-gpu',
        '--disable-blink-features=AutomationControlled',
      ],
      timeout: BROWSER_LAUNCH_TIMEOUT_MS,
    },
  },
};

/**
 * @description 모바일(픽셀5) 크롬 프로젝트 설정
 */
const mobileProject = {
  name: 'Mobile Chrome',
  use: {
    ...devices['Pixel 5'],
    viewport: { width: 393, height: 851 },
    slowMo: SLOW_MO_MS,
    launchOptions: {
      args: [
        '--disable-dev-shm-usage',
        '--no-sandbox',
        '--disable-gpu',
        '--disable-blink-features=AutomationControlled',
      ],
      timeout: BROWSER_LAUNCH_TIMEOUT_MS,
    },
  },
};

/**
 * @description 웹 서버 자동 기동 설정(옵션)
 * Playwright 타입에 맞게 stdout/stderr 제거
 */
const webServer = envBool('START_WEB_SERVER', false)
  ? {
      command: envStr('WEB_COMMAND', 'pnpm dev'),
      url: envStr('WEB_URL', BASE_URL),
      reuseExistingServer: !IS_CI,
      timeout: 120_000,
    }
  : undefined;

/**
 * @description 최종 Playwright 구성 값
 */
export default defineConfig({
  testDir: '.',
  testMatch: ['e2e/**/*.spec.ts'],
  outputDir: './test-results',
  fullyParallel: true,
  forbidOnly: IS_CI,
  retries: RETRIES,
  workers: WORKERS,
  timeout: GLOBAL_TIMEOUT_MS,

  expect: {
    timeout: EXPECT_TIMEOUT_MS,
  },

  use: commonUse,
  projects: [desktopProject, mobileProject],

  reporter: IS_CI
    ? [['list'], ['html', { open: 'never' }]]
    : [['list'], ['html', { open: 'on-failure' }]],

  // 타입 호환을 위해 webServer는 존재 시만 추가
  ...(webServer ? { webServer } : {}),
});
