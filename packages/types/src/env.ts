/**
 * Description : env.ts - 📌 환경변수 타입정의
 * Author : Shiwoo Min
 * Date : 2025-09-07
 */

export interface ConnectWonEnv {
  // 환경 구분(MVP에서는 development 만 사용)
  NODE_ENV: 'development' | 'staging' | 'production'

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

  // 결제 설정 (optional - 나중에 추가할 수 있음)
  STRIPE_SECRET_KEY?: string
  STRIPE_WEBHOOK_SECRET?: string
  STRIPE_PUBLISHABLE_KEY?: string

  // AI 설정 (optional - 나중에 추가할 수 있음)
  OPENAI_API_KEY?: string
  OPENAI_ORG_ID?: string

  // n8n 설정 (현재 인프라에 있음)
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
  LOG_LEVEL?: 'error' | 'warn' | 'info' | 'debug'
  LOG_FORMAT?: 'json' | 'simple'

  // 알림 설정
  SLACK_WEBHOOK_URL?: string
  EMAIL_SERVICE?: string
  EMAIL_USER?: string
  EMAIL_PASS?: string

  // 테스트 설정
  HEADLESS?: 'true' | 'false'
  TEST_TIMEOUT?: string
  TEST_DATABASE_URL?: string  // 테스트용 별도 DB

  // 개발 도구
  PRISMA_HIDE_UPDATE_MESSAGE?: 'true' | 'false'
  DISABLE_PRISMA_TELEMETRY?: 'true' | 'false'
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends ConnectWonEnv {}
  }
}

// 환경변수 검증 헬퍼
export function validateEnv(): void {
  const required = [
    'NODE_ENV',
    'DATABASE_URL',
    'JWT_SECRET',
    'API_PORT'
  ] as const

  const missing = required.filter(key => !process.env[key])

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}

// 환경별 기본값
export const ENV_DEFAULTS = {
  development: {
    WEB_PORT: '3000',
    API_PORT: '8000',
    LOG_LEVEL: 'debug' as const,
    JWT_EXPIRES_IN: '7d',
  },
  production: {
    WEB_PORT: '3000',
    API_PORT: '8000',
    LOG_LEVEL: 'info' as const,
    JWT_EXPIRES_IN: '1d',
  },
  staging: {
    WEB_PORT: '3000',
    API_PORT: '8000',
    LOG_LEVEL: 'info' as const,
    JWT_EXPIRES_IN: '1d',
  }
} as const

// 현재 환경 확인
export function getEnvironment(): ConnectWonEnv['NODE_ENV'] {
  return (process.env.NODE_ENV as ConnectWonEnv['NODE_ENV']) || 'development'
}

// 프로덕션 환경 여부
export function isProduction(): boolean {
  return getEnvironment() === 'production'
}

// 개발 환경 여부
export function isDevelopment(): boolean {
  return getEnvironment() === 'development'
}
