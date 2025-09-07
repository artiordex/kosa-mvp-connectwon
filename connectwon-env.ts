/**
 * Description : env.ts - 📌 환경변수 타입정의 및 공통 로더
 * Author : Shiwoo Min
 * Date : 2025-09-07
 */

import * as os from 'os'

// 서버(노드) 환경에서만 dotenv 로드
(function safeLoadDotenv() {
  // 브라우저 번들(Next.js 클라이언트)로 새지 않게 보호
  const isNode =
    typeof process !== 'undefined' &&
    !!process.release &&
    process.release.name === 'node'
  if (!isNode) return

  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const dotenv = require('dotenv')
    const dotenvPath = process.env['DOTENV_PATH']
    dotenv.config(dotenvPath ? { path: dotenvPath } : undefined)
  } catch {
    // dotenv 미설치/불필요 시 무시
  }
})()

export interface ConnectWonEnv {
  // 환경 구분
  NODE_ENV: 'development' | 'staging' | 'production' | 'test'

  // 서버 설정
  WEB_PORT: string
  API_PORT: string

  // URL 설정
  WEB_URL: string
  API_URL: string

  // 데이터베이스
  DATABASE_URL: string
  REDIS_URL: string

  // 인증 설정
  JWT_SECRET: string
  JWT_EXPIRES_IN?: string
  SESSION_SECRET: string

  // 구글 OAuth
  GOOGLE_CLIENT_ID: string
  GOOGLE_CLIENT_SECRET: string
  GOOGLE_REDIRECT_URI?: string

  // 결제 설정 (optional)
  STRIPE_SECRET_KEY?: string
  STRIPE_WEBHOOK_SECRET?: string
  STRIPE_PUBLISHABLE_KEY?: string

  // AI 설정 (optional)
  OPENAI_API_KEY?: string
  OPENAI_ORG_ID?: string

  // n8n 설정
  N8N_WEBHOOK_URL?: string
  N8N_BASIC_AUTH_USER?: string
  N8N_BASIC_AUTH_PASSWORD?: string

  // 파일 업로드 설정
  MAX_FILE_SIZE?: string
  UPLOAD_DIR?: string

  // 보안 설정
  CORS_ORIGIN?: string
  RATE_LIMIT_MAX?: string
  RATE_LIMIT_WINDOW?: string

  // 로그 설정
  LOG_LEVEL?: 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly'
  LOG_FORMAT?: 'json' | 'simple'
  SERVICE_NAME?: string
  ENABLE_LOGS?: 'true' | 'false'
  LOG_TO_FILE?: 'true' | 'false'
  LOG_DIR?: string
  LOG_MAX_FILES?: string // e.g. '7d' or number
  LOG_EXECUTION_TIME?: 'true' | 'false'

  // E2E/테스트 설정
  HEADLESS?: 'true' | 'false'
  TEST_TIMEOUT?: string
  TEST_DATABASE_URL?: string
  E2E_ARTIFACTS_DIR?: string
  SAVE_TRACE_ON_FAIL?: 'true' | 'false'
  LOG_VIDEO_ON_FAIL?: 'true' | 'false'
  SAVE_TEST_RESULTS?: 'true' | 'false'
  SCREENSHOT_QUALITY?: 'low' | 'medium' | 'high'
  CLEANUP_ARTIFACTS_DAYS?: string
  DEBUG_MODE?: 'true' | 'false'

  // Playwright 설정
  BASE_URL?: string
  CI?: 'true' | 'false'
  RETRIES?: string
  ACTION_TIMEOUT?: string
  NAVIGATION_TIMEOUT?: string
  SLOW_MO?: string
  BROWSER_LAUNCH_TIMEOUT?: string
  START_WEB_SERVER?: 'true' | 'false'
  WEB_COMMAND?: string
  WEB_URL_TEST?: string

  // 알림 설정
  SLACK_WEBHOOK_URL?: string
  EMAIL_SERVICE?: string
  EMAIL_USER?: string
  EMAIL_PASS?: string

  // 개발 도구
  PRISMA_HIDE_UPDATE_MESSAGE?: 'true' | 'false'
  DISABLE_PRISMA_TELEMETRY?: 'true' | 'false'
}

// 전역 확장은 선택사항
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv extends Partial<ConnectWonEnv> {}
  }
}

// 기본 util
export const env = (key: string, defaultValue?: string): string => {
  const v = process.env[key]
  return v === undefined || v === null || v === '' ? (defaultValue ?? '') : v
}

export const envBool = (key: string, defaultValue = false): boolean => {
  const v = env(key)
  if (!v) return defaultValue
  const s = v.toLowerCase()
  return s === 'true' || s === '1' || s === 'yes' || s === 'on'
}

export const envInt = (key: string, defaultValue = 0): number => {
  const v = env(key)
  const n = parseInt(v, 10)
  return Number.isNaN(n) ? defaultValue : n
}

export const envArray = (key: string, defaultValue: string[] = []): string[] => {
  const v = env(key)
  return v ? v.split(',').map(s => s.trim()).filter(Boolean) : defaultValue
}

export const envJson = <T = unknown>(key: string, defaultValue: T): T => {
  const v = env(key)
  if (!v) return defaultValue
  try { return JSON.parse(v) as T } catch { return defaultValue }
}

// 환경 구분
export function getEnvironment(): ConnectWonEnv['NODE_ENV'] {
  // 기본값은 development
  const raw = env('NODE_ENV', 'development')
  // 잘못된 값 방지
  if (['development', 'staging', 'production', 'test'].includes(raw)) {
    return raw as ConnectWonEnv['NODE_ENV']
  }
  return 'development'
}

export const isProduction = () => getEnvironment() === 'production'
export const isDevelopment = () => getEnvironment() === 'development'
export const isStaging = () => getEnvironment() === 'staging'
export const isTest = () => getEnvironment() === 'test'
export const isCI = () => envBool('CI', false)

// 환경 별 기본값
export const ENV_DEFAULTS = {
  development: {
    WEB_PORT: '3000',
    API_PORT: '8000',
    LOG_LEVEL: 'debug' as const,
    JWT_EXPIRES_IN: '7d',
    ENABLE_LOGS: 'true',
    LOG_TO_FILE: 'false',
    HEADLESS: 'false',
    SAVE_TRACE_ON_FAIL: 'true',
    DEBUG_MODE: 'true',
  },
  test: {
    WEB_PORT: '3001',
    API_PORT: '8001',
    LOG_LEVEL: 'warn' as const,
    JWT_EXPIRES_IN: '1d',
    ENABLE_LOGS: 'false',
    LOG_TO_FILE: 'false',
    HEADLESS: 'true',
    SAVE_TRACE_ON_FAIL: 'false',
    DEBUG_MODE: 'false',
  },
  staging: {
    WEB_PORT: '3000',
    API_PORT: '8000',
    LOG_LEVEL: 'info' as const,
    JWT_EXPIRES_IN: '1d',
    ENABLE_LOGS: 'true',
    LOG_TO_FILE: 'true',
    HEADLESS: 'true',
    SAVE_TRACE_ON_FAIL: 'true',
    DEBUG_MODE: 'false',
  },
  production: {
    WEB_PORT: '3000',
    API_PORT: '8000',
    LOG_LEVEL: 'info' as const,
    JWT_EXPIRES_IN: '1d',
    ENABLE_LOGS: 'false',
    LOG_TO_FILE: 'true',
    HEADLESS: 'true',
    SAVE_TRACE_ON_FAIL: 'false',
    DEBUG_MODE: 'false',
  },
} as const

export function getConfig<K extends keyof ConnectWonEnv>(key: K, defaultValue?: string): string {
  const envName = getEnvironment()
  const envDefaults = ENV_DEFAULTS[envName] as Record<string, string | undefined>
  return env(key, defaultValue ?? envDefaults[key as string] ?? '')
}

export function getConfigBool<K extends keyof ConnectWonEnv>(key: K, defaultValue?: boolean): boolean {
  const envName = getEnvironment()
  const envDefaults = ENV_DEFAULTS[envName] as Record<string, string | undefined>
  const fallback = defaultValue ?? (envDefaults[key as string] === 'true')
  return envBool(key, fallback)
}

export const getConfigInt = (key: keyof ConnectWonEnv, defaultValue = 0) => envInt(key as string, defaultValue)

// 파생 설정
export const serverConfig = {
  webPort: getConfigInt('WEB_PORT', 3000),
  apiPort: getConfigInt('API_PORT', 8000),
  webUrl: getConfig('WEB_URL', 'http://localhost:3000'),
  apiUrl: getConfig('API_URL', 'http://localhost:8000'),
  corsOrigin: getConfig('CORS_ORIGIN', '*'),
}

// 데이터베이스 및 인증 설정
export const dbConfig = {
  url: getConfig('DATABASE_URL'),
  redisUrl: getConfig('REDIS_URL'),
  testUrl: getConfig('TEST_DATABASE_URL'),
}

// 인증 설정
export const authConfig = {
  jwtSecret: getConfig('JWT_SECRET'),
  jwtExpiresIn: getConfig('JWT_EXPIRES_IN', '7d'),
  sessionSecret: getConfig('SESSION_SECRET'),
  googleClientId: getConfig('GOOGLE_CLIENT_ID'),
  googleClientSecret: getConfig('GOOGLE_CLIENT_SECRET'),
  googleRedirectUri: getConfig('GOOGLE_REDIRECT_URI'),
}

// 로그 설정
export const logConfig = {
  level: getConfig('LOG_LEVEL', 'info'),
  enableLogs: getConfigBool('ENABLE_LOGS', true),
  logToFile: getConfigBool('LOG_TO_FILE', false),
  logDir: getConfig('LOG_DIR', './logs'),
  maxFiles: getConfig('LOG_MAX_FILES', '7d'),
  serviceName: getConfig('SERVICE_NAME', 'connectwon-app'),
  executionTime: getConfigBool('LOG_EXECUTION_TIME', true),
}

// E2E/테스트 설정
export const testConfig = {
  headless: getConfigBool('HEADLESS', true),
  baseUrl: getConfig('BASE_URL', 'http://localhost:3000'),
  artifactsDir: getConfig('E2E_ARTIFACTS_DIR', './e2e-artifacts'),
  saveTrace: getConfigBool('SAVE_TRACE_ON_FAIL', true),
  logVideo: getConfigBool('LOG_VIDEO_ON_FAIL', true),
  screenshotQuality: getConfig('SCREENSHOT_QUALITY', 'medium'),
  debugMode: getConfigBool('DEBUG_MODE', false),
  cleanupDays: getConfigInt('CLEANUP_ARTIFACTS_DAYS', 7),
  timeout: getConfigInt('TEST_TIMEOUT', 30000),
}

// 커스텀 윈스턴 로거 생성기
export function validateEnv(): void {
  const required = ['NODE_ENV', 'DATABASE_URL', 'JWT_SECRET', 'API_PORT'] as const
  const missing = required.filter(k => !process.env[k])
  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}

// 환경별 추가 필수값 검증
export function validateEnvByEnvironment(): void {
  const envName = getEnvironment()
  const envRequirements: Record<ConnectWonEnv['NODE_ENV'], string[]> = {
    development: ['DATABASE_URL', 'JWT_SECRET'],
    test: ['TEST_DATABASE_URL', 'JWT_SECRET'],
    staging: ['DATABASE_URL', 'JWT_SECRET', 'GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET'],
    production: ['DATABASE_URL', 'JWT_SECRET', 'GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'REDIS_URL'],
  }
  const required = envRequirements[envName] ?? []
  const missing = required.filter(k => !process.env[k])
  if (missing.length) {
    throw new Error(`Missing required environment variables for ${envName}: ${missing.join(', ')}`)
  }
}

// 초기화(로드+검증)
export function initializeEnv(): void {
  try {
    validateEnv()
    validateEnvByEnvironment()
    const envName = getEnvironment()
    // 개발에서만 친절 로그
    if (isDevelopment()) {
      // eslint-disable-next-line no-console
      console.log(`[env] Initialized (${envName}) on ${os.hostname()}`)
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[env] Initialization failed:', err)
    process.exit(1)
  }
}
