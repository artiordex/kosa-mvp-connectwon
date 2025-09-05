/**
 * 환경변수 타입 정의
 */

export interface ConnectWonEnv {
  // 환경 구분
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
  SESSION_SECRET: string

  // 구글 OAuth
  GOOGLE_CLIENT_ID: string
  GOOGLE_CLIENT_SECRET: string

  // 결제 설정
  STRIPE_SECRET_KEY: string
  STRIPE_WEBHOOK_SECRET: string

  // AI 설정
  OPENAI_API_KEY: string

  // 알림 설정
  SLACK_WEBHOOK_URL?: string

  // 테스트 설정
  HEADLESS?: 'true' | 'false'
  TEST_TIMEOUT?: string
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends ConnectWonEnv {}
  }
}
