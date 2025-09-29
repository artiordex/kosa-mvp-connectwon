/**
 * Description : playwright.config.ts - 📌 Playwright 테스트 실행 환경 정의 파일
 * Author : Shiwoo Min
 * Date : 2025-09-07
 * 09-07 - 최소 설정으로 웹/모바일 웹 E2E 테스트만 진행
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
 * @description truthy 문자열 집합
 */
const truthy = new Set(['1', 'true', 'yes', 'on']);

/**
 * @description falsy 문자열 집합
 */
const falsy = new Set(['0', 'false', 'no', 'off']);

/**
 * @description 환경변수 값 가져오기
 * @param {string} k 키
 * @returns {string | undefined} 환경변수 값
 */
const env = (k: string): string | undefined => process.env[k];

/**
 * @description 환경변수를 불리언으로 파싱
 * @param {string} k 키
 * @param {boolean} def 기본값
 * @returns {boolean} 파싱된 불리언 값
 */
const envBool = (k: string, def: boolean): boolean => {
  const raw = env(k);
  if (raw == null) return def;
  const v = raw.toLowerCase();
  if (truthy.has(v)) return true;
  if (falsy.has(v)) return false;
  return def;
};

/**
 * @description 환경변수를 정수로 파싱
 * @param {string} k 키
 * @param {number} def 기본값
 * @returns {number} 파싱된 정수 값
 */
const envInt = (k: string, def: number): number => {
  const n = Number.parseInt(String(env(k) ?? ''), 10);
  return Number.isFinite(n) ? n : def;
};

/**
 * @description 환경변수를 문자열로 가져오기 (없으면 기본값)
 * @param {string} k 키
 * @param {string} def 기본값
 * @returns {string} 문자열 값
 */
const envStr = (k: string, def: string): string => env(k) ?? def;

/**
 * @description 파싱된 실행 환경 값들
 */
const IS_CI = envBool('CI', false);
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
  trace: 'on-first-retry' as const
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
        '--disable-blink-features=AutomationControlled'
      ],
      timeout: BROWSER_LAUNCH_TIMEOUT_MS
    }
  }
};

/**
 * @description 모바일(픽셀5) 크롬 프로젝트 설정
 */
const mobileProject = {
  name: 'Mobile Chrome',
  use: {
    ...devices['Pixel 5'],
    slowMo: SLOW_MO_MS,
    launchOptions: {
      args: [
        '--disable-dev-shm-usage',
        '--no-sandbox',
        '--disable-gpu',
        '--disable-blink-features=AutomationControlled'
      ],
      timeout: BROWSER_LAUNCH_TIMEOUT_MS
    }
  }
};

/**
 * @description 웹 서버 자동 기동 설정(옵션)
 */
const webServer = envBool('START_WEB_SERVER', false)
  ? {
      command: envStr('WEB_COMMAND', 'pnpm dev'),
      url: envStr('WEB_URL', 'http://localhost:3000'),
      reuseExistingServer: true,
      timeout: 120_000
    }
  : undefined;

/**
 * @description 최종 Playwright 구성 값
 */
export default defineConfig({
  testDir: '.',
  testMatch: ['e2e/**/*.spec.ts'],
  fullyParallel: true,
  forbidOnly: IS_CI,
  retries: RETRIES,
  workers: WORKERS,
  timeout: GLOBAL_TIMEOUT_MS,
  use: commonUse,
  projects: [desktopProject, mobileProject],
  reporter: [['list'], ['html', { open: 'never' }]],
  ...(webServer ? { webServer } : {})
});
