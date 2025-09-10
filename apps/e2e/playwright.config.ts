/**
 * Description : playwright.config.ts - 📌 Playwright 테스트 실행 환경 정의 파일
 * Author      : Shiwoo Min
 * Date        : 2025-09-07
 * Note        : 최소 설정으로 웹/모바일 웹 E2E 테스트만 진행
 */

import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'
import os from 'os'
import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

// ESM 경로 유틸
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// .env 로드 (이 파일과 같은 폴더의 .env)
dotenv.config({ path: path.resolve(__dirname, '.env') })

// ENV 헬퍼 (대괄호 접근 + 안전 파싱)
const truthy = new Set(['1', 'true', 'yes', 'on'])
const falsy = new Set(['0', 'false', 'no', 'off'])
const env = (k: string) => process.env[k]

const envBool = (k: string, def: boolean) => {
  const raw = env(k)
  if (raw == null) return def
  const v = raw.toLowerCase()
  if (truthy.has(v)) return true
  if (falsy.has(v)) return false
  return def
}
const envInt = (k: string, def: number) => {
  const n = Number.parseInt(String(env(k) ?? ''), 10)
  return Number.isFinite(n) ? n : def
}
const envStr = (k: string, def: string) => env(k) ?? def

// 파싱된 ENV
const IS_CI  = envBool('CI', false)
const HEADLESS = envBool('HEADLESS', true) // false면 UI(headed) 모드
const BASE_URL = envStr('BASE_URL', 'http://localhost:3000')

// CI면 2회, 아니면 0 (원하면 RETRIES로 override 가능)
const RETRIES = envInt('RETRIES', IS_CI ? 2 : 0)
// CI=1 → 워커 1, 로컬 → CPU 75% (최소 1)
const WORKERS = IS_CI ? 1 : Math.max(1, Math.floor(os.cpus().length * 0.75))

// 타임아웃/슬로모션
const GLOBAL_TIMEOUT_MS         = 30 * 60 * 1000 // 30분
const ACTION_TIMEOUT_MS         = envInt('ACTION_TIMEOUT', 30) * 1000
const NAVIGATION_TIMEOUT_MS     = envInt('NAVIGATION_TIMEOUT', 60) * 1000
const SLOW_MO_MS                = envInt('SLOW_MO', 0)
const BROWSER_LAUNCH_TIMEOUT_MS = envInt('BROWSER_LAUNCH_TIMEOUT', 60_000)

// 공통 use 옵션
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
}

// 프로젝트 정의
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
}

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
        '--disable-blink-features=AutomationControlled',
      ],
      timeout: BROWSER_LAUNCH_TIMEOUT_MS,
    },
  },
}

// webServer: 조건 만족 시에만 키 추가
const webServer = envBool('START_WEB_SERVER', false)
  ? {
      command: envStr('WEB_COMMAND', 'pnpm dev'),
      url:     envStr('WEB_URL', 'http://localhost:3000'),
      reuseExistingServer: true,
      timeout: 120_000,
    }
  : undefined

// 최종 설정
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
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],

  // exactOptionalPropertyTypes 대응
  ...(webServer ? { webServer } : {}),
})
