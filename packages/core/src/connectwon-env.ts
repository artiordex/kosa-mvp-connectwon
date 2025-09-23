/**
 * Description : connectwon-env.ts - 📌 환경변수 타입정의 및 공통 로더
 * Author : Shiwoo Min
 * Date : 2025-09-09
 * 09-09 - ESM 호환, isServer 도입, dotenv 동적 import, 주석 보강
 * 09-11 - 큐 설정 추가 (QUEUE_CONCURRENCY, QUEUE_PREFIX), queueConfig 제공
 * 09-16 - .env와 동기화, AWS/모니터링/비즈니스/Feature Flags 등 추가
 * 09-21 - envBool 확장, envDurationSec 단위 추가, 함수 주석 보강, 기본값 명시 강화
 */

// 런타임 가드 & dotenv 로드 (ESM 안전)

// 서버(노드) 환경 여부: 브라우저 번들로 새지 않게 가드
export const isServer =
  typeof process !== 'undefined' && !!process.release && process.release.name === 'node';

// 서버(노드) 환경에서만 dotenv 로드 (ESM 동적 import 사용)
(async function safeLoadDotenv() {
  if (!isServer) return;
  try {
    const { config } = await import('dotenv');
    const dotenvPath = process.env['DOTENV_PATH'];
    config(dotenvPath ? { path: dotenvPath } : undefined);
  } catch {
    // dotenv 미설치/불필요 시 무시
  }
})();

// 타입 정의
export interface ConnectWonEnv {
  // 환경 구분 및 서버 포트 설정
  NODE_ENV: 'development' | 'staging' | 'production' | 'test';
  TZ?: string;

  // 포트 설정
  WEB_PORT: string;
  API_PORT: string;
  ADMIN_PORT?: string;
  WORKER_PORT?: string;
  NGINX_PORT?: string;

  // URL 주소 설정
  WEB_URL: string;
  API_URL: string;
  ADMIN_URL?: string;
  FRONTEND_URL?: string;
  BACKEND_URL?: string;
  CORS_ORIGINS?: string;

  // 데이터베이스 연결 정보
  DATABASE_URL: string;
  DATABASE_HOST?: string;
  DATABASE_PORT?: string;
  DATABASE_NAME?: string;
  DATABASE_USER?: string;
  DATABASE_PASSWORD?: string;
  DATABASE_SSL?: string;
  DATABASE_POOL_MIN?: string;
  DATABASE_POOL_MAX?: string;
  TEST_DATABASE_URL?: string;

  // Redis 연결 정보
  REDIS_URL: string;
  REDIS_HOST?: string;
  REDIS_PORT?: string;
  REDIS_PASSWORD?: string;
  REDIS_DB?: string;
  TEST_REDIS_URL?: string;
  REDISINSIGHT_PORT?: string;

  // 큐 (BullMQ 등) 설정
  QUEUE_REDIS_URL?: string;
  QUEUE_REDIS_HOST?: string;
  QUEUE_REDIS_PORT?: string;
  QUEUE_REDIS_DB?: string;
  QUEUE_CONCURRENCY?: string;
  QUEUE_PREFIX?: string;

  // 인증 및 세션
  JWT_SECRET: string;
  JWT_EXPIRES_IN?: string;
  JWT_REFRESH_SECRET?: string;
  JWT_REFRESH_EXPIRES_IN?: string;
  SESSION_SECRET: string;
  SESSION_MAX_AGE?: string;

  // 쿠키 설정
  COOKIE_SECRET?: string;
  COOKIE_DOMAIN?: string;
  COOKIE_SECURE?: string;
  COOKIE_HTTP_ONLY?: string;
  COOKIE_SAME_SITE?: string;

  // 외부 API 키 (AI 등)
  OPENAI_API_KEY?: string;
  ANTHROPIC_API_KEY?: string;
  HUGGINGFACE_API_KEY?: string;

  // 결제 설정
  STRIPE_SECRET_KEY?: string;
  STRIPE_PUBLISHABLE_KEY?: string;
  STRIPE_WEBHOOK_SECRET?: string;
  PAYMENT_PROVIDER?: string;
  PAYMENT_CURRENCY?: string;
  PAYMENT_TIMEOUT_MINUTES?: string;

  // Azure 스토리지 및 CDN 설정
  AZURE_STORAGE_ACCOUNT?: string;
  AZURE_STORAGE_ACCESS_KEY?: string;
  AZURE_STORAGE_CONTAINER?: string;
  AZURE_CDN_ENDPOINT?: string;
  AZURE_REGION?: string;

  // 이메일 및 슬랙 알림 설정
  EMAIL_PROVIDER?: string;
  SMTP_HOST?: string;
  SMTP_PORT?: string;
  SMTP_SECURE?: string;
  SMTP_USER?: string;
  SMTP_PASS?: string;
  SMTP_FROM_EMAIL?: string;
  SMTP_FROM_NAME?: string;
  SLACK_WEBHOOK_URL?: string;
  SLACK_TOKEN?: string;
  SLACK_CHANNEL?: string;

  // 로깅 및 모니터링 설정
  LOG_LEVEL?: 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly';
  LOG_FORMAT?: 'json' | 'pretty' | 'simple';
  SENTRY_DSN?: string;
  NEW_RELIC_LICENSE_KEY?: string;
  NEW_RELIC_APP_NAME?: string;

  // Grafana 설정
  GF_SECURITY_ADMIN_USER?: string;
  GF_SECURITY_ADMIN_PASSWORD?: string;
  GF_SECURITY_SECRET_KEY?: string;
  GF_SERVER_HTTP_PORT?: string;
  GF_SERVER_ROOT_URL?: string;

  // 비즈니스 로직 관련 설정
  DEFAULT_RESERVATION_DURATION?: string;
  MAX_ADVANCE_BOOKING_DAYS?: string;
  CANCELLATION_DEADLINE_HOURS?: string;
  OVERBOOKING_THRESHOLD?: string;
  REFUND_POLICY_DAYS?: string;
  POINTS_PER_KRW?: string;
  SIGNUP_BONUS_POINTS?: string;
  REFERRAL_BONUS_POINTS?: string;

  // Rate Limiting 설정
  RATE_LIMIT_WINDOW_MS?: string;
  RATE_LIMIT_MAX_REQUESTS?: string;
  RATE_LIMIT_SKIP_IF_SUCCESSFUL?: string;
  API_RATE_LIMIT_PER_MINUTE?: string;
  LOGIN_RATE_LIMIT_PER_HOUR?: string;

  // 작업(Job) 스케줄 및 백그라운드 작업
  JOB_ATTEMPTS?: string;
  JOB_BACKOFF_TYPE?: string;
  JOB_DELAY?: string;
  CLEANUP_JOB_CRON?: string;
  NOTIFICATION_JOB_CRON?: string;
  BACKUP_JOB_CRON?: string;

  // Feature Flags
  FEATURE_AI_RECOMMENDATIONS?: string;
  FEATURE_PAYMENT_GATEWAY?: string;
  FEATURE_EMAIL_NOTIFICATIONS?: string;
  FEATURE_SLACK_NOTIFICATIONS?: string;
  FEATURE_ADVANCED_ANALYTICS?: string;
  FEATURE_BETA_FEATURES?: string;

  // 소셜 OAuth 설정
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_REDIRECT_URI?: string;
  KAKAO_CLIENT_ID?: string;
  KAKAO_CLIENT_SECRET?: string;
  NAVER_CLIENT_ID?: string;
  NAVER_CLIENT_SECRET?: string;

  // 애널리틱스 (Google, Mixpanel 등)
  GOOGLE_ANALYTICS_ID?: string;
  GOOGLE_TAG_MANAGER_ID?: string;
  MIXPANEL_TOKEN?: string;

  // n8n 워크플로우 설정
  N8N_PORT?: string;
  N8N_WEBHOOK_URL?: string;
  N8N_DB_NAME?: string;
  N8N_BASIC_AUTH_ACTIVE?: string;
  N8N_BASIC_AUTH_USER?: string;
  N8N_BASIC_AUTH_PASSWORD?: string;
  N8N_ENCRYPTION_KEY?: string;
  N8N_LOG_LEVEL?: string;

  // 추가 서비스 (Twilio, FCM, VAPID 등)
  TWILIO_ACCOUNT_SID?: string;
  TWILIO_AUTH_TOKEN?: string;
  TWILIO_PHONE_NUMBER?: string;
  FCM_SERVER_KEY?: string;
  VAPID_PUBLIC_KEY?: string;
  VAPID_PRIVATE_KEY?: string;

  // 회사 및 로케일 정보
  COMPANY_NAME?: string;
  COMPANY_EMAIL?: string;
  COMPANY_PHONE?: string;
  SUPPORT_EMAIL?: string;
  DEFAULT_TIMEZONE?: string;
  DATE_FORMAT?: string;
  TIME_FORMAT?: string;
  DEFAULT_LANGUAGE?: string;
  SUPPORTED_LANGUAGES?: string;
  USE_I18N?: string;

  // E2E 및 테스트 설정
  HEADLESS?: 'true' | 'false';
  BASE_URL?: string;
  CI?: 'true' | 'false';
  ACTION_TIMEOUT?: string;
  NAVIGATION_TIMEOUT?: string;
  SLOW_MO?: string;
  BROWSER_LAUNCH_TIMEOUT?: string;
  START_WEB_SERVER?: 'true' | 'false';
  WEB_COMMAND?: string;
  TEST_USER_EMAIL?: string;
  TEST_USER_PASSWORD?: string;
  TEST_ADMIN_EMAIL?: string;
  TEST_ADMIN_PASSWORD?: string;

  // Docker & Infra
  COMPOSE_PROJECT_NAME?: string;
  COMPOSE_FILE?: string;
  API_HEALTH_URL?: string;
  WEB_HEALTH_URL?: string;
  ADMIN_HEALTH_URL?: string;
  POSTGRES_EXTERNAL_PORT?: string;
  REDIS_EXTERNAL_PORT?: string;

  // 레거시 필드 (기존 호환 용도)
  TEST_TIMEOUT?: string;
  E2E_ARTIFACTS_DIR?: string;
  SAVE_TRACE_ON_FAIL?: 'true' | 'false';
  LOG_VIDEO_ON_FAIL?: 'true' | 'false';
  SAVE_TEST_RESULTS?: 'true' | 'false';
  SCREENSHOT_QUALITY?: 'low' | 'medium' | 'high';
  CLEANUP_ARTIFACTS_DAYS?: string;
  DEBUG_MODE?: 'true' | 'false';
  SERVICE_NAME?: string;
  ENABLE_LOGS?: 'true' | 'false';
  LOG_TO_FILE?: 'true' | 'false';
  LOG_DIR?: string;
  LOG_MAX_FILES?: string;
  LOG_EXECUTION_TIME?: 'true' | 'false';
  CORS_ORIGIN?: string;
  RATE_LIMIT_MAX?: string;
  RATE_LIMIT_WINDOW?: string;
  OPENAI_ORG_ID?: string;
  UPLOAD_DIR?: string;
  RETRIES?: string;
  WEB_URL_TEST?: string;
  EMAIL_SERVICE?: string;
  EMAIL_USER?: string;
  EMAIL_PASS?: string;
  PRISMA_HIDE_UPDATE_MESSAGE?: 'true' | 'false';
  DISABLE_PRISMA_TELEMETRY?: 'true' | 'false';
}

// 전역 확장(선택)
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv extends Partial<ConnectWonEnv> {}
  }
}

/**
 * 환경변수 값 가져오기
 * @param key 환경변수 이름
 * @param defaultValue 기본값 (옵션)
 * @returns 환경변수 값 또는 기본값
 */
export const env = (key: string, defaultValue?: string): string => {
  const v = process.env[key];
  return v === undefined || v === null || v === '' ? (defaultValue ?? '') : v;
};

/**
 * 불리언 환경변수 안전 파싱 함수
 * @param key 환경변수 이름
 * @param defaultValue 기본값, 없으면 false
 * @returns boolean 값
 */
export const envBool = (key: string, defaultValue = false): boolean => {
  const v = env(key);
  if (!v) return defaultValue;
  const s = v.toLowerCase();
  if (['true', '1', 'yes', 'on'].includes(s)) return true;
  if (['false', '0', 'no', 'off'].includes(s)) return false;
  return defaultValue;
};

/**
 * 정수형 환경변수 파싱 (NaN 시 기본값 사용)
 * @param key 환경변수 이름
 * @param defaultValue 기본값 (기본 0)
 * @returns 정수 값
 */
export const envInt = (key: string, defaultValue = 0): number => {
  const v = env(key);
  const n = parseInt(v, 10);
  return Number.isNaN(n) ? defaultValue : n;
};

/**
 * 쉼표 구분 문자열을 배열로 변환
 * @param key 환경변수 이름
 * @param defaultValue 기본값 배열 (비어있음)
 * @returns 문자열 배열
 */
export const envArray = (key: string, defaultValue: string[] = []): string[] => {
  const v = env(key);
  return v
    ? v
        .split(',')
        .map(s => s.trim())
        .filter(Boolean)
    : defaultValue;
};

/**
 * JSON 문자열 파싱 (실패 시 기본값 사용)
 * @param key 환경변수 이름
 * @param defaultValue 기본값
 * @returns 파싱 결과 객체 또는 기본값
 */
export const envJson = <T = unknown>(key: string, defaultValue: T): T => {
  const v = env(key);
  if (!v) return defaultValue;
  try {
    return JSON.parse(v) as T;
  } catch {
    return defaultValue;
  }
};

// duration 단위(초,분,시,일,주)
const DUR = { s: 1, m: 60, h: 3600, d: 86400, w: 604800 } as const;
type Unit = keyof typeof DUR;

/**
 * duration 문자열("10m","3h" 등) 을 초단위 숫자로 변환
 * @param key 환경변수 이름
 * @param defSec 기본 초 단위 값
 * @returns 초 단위 숫자
 */
export const envDurationSec = (key: string, defSec: number): number => {
  const v = env(key);
  if (!v) return defSec;

  const m = /^(\d+)\s*([smhdw])?$/i.exec(v);
  if (!m) return defSec;

  const n = Number(m[1]);
  const u = (m[2]?.toLowerCase() ?? 's') as Unit;

  return n * DUR[u];
};

/**
 * URL 유효성 검증 및 반환
 * @param key 환경변수 이름
 * @param def 기본값 URL 문자열 (옵션)
 * @throws 유효하지 않은 URL일 경우 Error throw
 * @returns 유효한 URL 문자열
 */
export const envUrl = (key: string, def?: string): string => {
  const value = env(key, def);
  try {
    return new URL(value).toString();
  } catch {
    throw new Error(`Invalid URL in ${key}: ${value}`);
  }
};

// 마스킹 할 비밀키 목록
const SECRET_KEYS = new Set([
  'JWT_SECRET',
  'JWT_REFRESH_SECRET',
  'SESSION_SECRET',
  'COOKIE_SECRET',
  'GOOGLE_CLIENT_SECRET',
  'KAKAO_CLIENT_SECRET',
  'NAVER_CLIENT_SECRET',
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'OPENAI_API_KEY',
  'ANTHROPIC_API_KEY',
  'HUGGINGFACE_API_KEY',
  'AWS_SECRET_ACCESS_KEY',
  'SMTP_PASS',
  'SLACK_TOKEN',
  'GF_SECURITY_ADMIN_PASSWORD',
  'GF_SECURITY_SECRET_KEY',
  'N8N_BASIC_AUTH_PASSWORD',
  'N8N_ENCRYPTION_KEY',
  'SENTRY_DSN',
  'NEW_RELIC_LICENSE_KEY',
]);

/**
 * 비밀키 값 마스킹 처리 함수 (로그용)
 * @param k 환경변수 이름
 * @param v 값
 * @returns 마스킹된 값 또는 원본
 */
export const maskSecret = (k: string, v: string) =>
  SECRET_KEYS.has(k) ? v.replace(/.(?=.{4})/g, '*') : v;

/**
 * 현재 환경명 가져오기 (NODE_ENV)
 * @returns 환경명 ('development'|'staging'|'production'|'test')
 */
export function getEnvironment(): ConnectWonEnv['NODE_ENV'] {
  const raw = env('NODE_ENV', 'development');
  if (['development', 'staging', 'production', 'test'].includes(raw)) {
    return raw as ConnectWonEnv['NODE_ENV'];
  }
  return 'development';
}
export const isProduction = () => getEnvironment() === 'production';
export const isDevelopment = () => getEnvironment() === 'development';
export const isStaging = () => getEnvironment() === 'staging';
export const isTest = () => getEnvironment() === 'test';
export const isCI = () => envBool('CI', false);

// 환경별 기본 환경변수 기본값 테이블
export const ENV_DEFAULTS = {
  development: {
    WEB_PORT: '3000',
    API_PORT: '8000',
    ADMIN_PORT: '3001',
    LOG_LEVEL: 'debug' as const,
    JWT_EXPIRES_IN: '7d',
    ENABLE_LOGS: 'true',
    LOG_TO_FILE: 'false',
    HEADLESS: 'false',
    SAVE_TRACE_ON_FAIL: 'true',
    DEBUG_MODE: 'true',
    QUEUE_CONCURRENCY: '5',
    QUEUE_PREFIX: 'connectwon',
    PAYMENT_PROVIDER: 'stripe',
    PAYMENT_CURRENCY: 'KRW',
    DEFAULT_LANGUAGE: 'ko',
    USE_I18N: 'true',
  },
  test: {
    WEB_PORT: '3001',
    API_PORT: '8001',
    ADMIN_PORT: '3002',
    LOG_LEVEL: 'warn' as const,
    JWT_EXPIRES_IN: '1d',
    ENABLE_LOGS: 'false',
    LOG_TO_FILE: 'false',
    HEADLESS: 'true',
    SAVE_TRACE_ON_FAIL: 'false',
    DEBUG_MODE: 'false',
    QUEUE_CONCURRENCY: '1',
    QUEUE_PREFIX: 'connectwon-test',
    PAYMENT_PROVIDER: 'stripe',
    PAYMENT_CURRENCY: 'KRW',
    DEFAULT_LANGUAGE: 'ko',
    USE_I18N: 'false',
  },
  staging: {
    WEB_PORT: '3000',
    API_PORT: '8000',
    ADMIN_PORT: '3001',
    LOG_LEVEL: 'info' as const,
    JWT_EXPIRES_IN: '1d',
    ENABLE_LOGS: 'true',
    LOG_TO_FILE: 'true',
    HEADLESS: 'true',
    SAVE_TRACE_ON_FAIL: 'true',
    DEBUG_MODE: 'false',
    QUEUE_CONCURRENCY: '5',
    QUEUE_PREFIX: 'connectwon',
    PAYMENT_PROVIDER: 'stripe',
    PAYMENT_CURRENCY: 'KRW',
    DEFAULT_LANGUAGE: 'ko',
    USE_I18N: 'true',
  },
  production: {
    WEB_PORT: '3000',
    API_PORT: '8000',
    ADMIN_PORT: '3001',
    LOG_LEVEL: 'info' as const,
    JWT_EXPIRES_IN: '1d',
    ENABLE_LOGS: 'false',
    LOG_TO_FILE: 'true',
    HEADLESS: 'true',
    SAVE_TRACE_ON_FAIL: 'false',
    DEBUG_MODE: 'false',
    QUEUE_CONCURRENCY: '10',
    QUEUE_PREFIX: 'connectwon',
    PAYMENT_PROVIDER: 'stripe',
    PAYMENT_CURRENCY: 'KRW',
    DEFAULT_LANGUAGE: 'ko',
    USE_I18N: 'true',
  },
} as const;

/**
 * 기본값까지 포함하여 환경변수 값을 가져오는 래퍼
 * @param key 환경변수 이름
 * @param defaultValue 기본값 (옵션)
 */
export function getConfig<K extends keyof ConnectWonEnv>(key: K, defaultValue?: string): string {
  const envName = getEnvironment();
  const envDefaults = ENV_DEFAULTS[envName] as Record<string, string | undefined>;
  return env(key as string, defaultValue ?? envDefaults[key as string] ?? '');
}

/**
 * 불리언 환경변수 기본값 처리 함수
 * @param key 환경변수 이름
 * @param defaultValue 기본값
 */
export function getConfigBool<K extends keyof ConnectWonEnv>(
  key: K,
  defaultValue?: boolean,
): boolean {
  const envName = getEnvironment();
  const envDefaults = ENV_DEFAULTS[envName] as Record<string, string | undefined>;
  const fallback = defaultValue ?? envDefaults[key as string] === 'true';
  return envBool(key as string, fallback);
}

/**
 * 정수형 환경변수 기본값 처리 함수
 * @param key 환경변수 이름
 * @param defaultValue 기본값 (기본 0)
 */
export const getConfigInt = (key: keyof ConnectWonEnv, defaultValue = 0): number =>
  envInt(key as string, defaultValue);

// testConfig 객체
export const testConfig = {
  artifactsDir: getConfig('E2E_ARTIFACTS_DIR', './e2e-artifacts'),
  saveTrace: getConfigBool('SAVE_TRACE_ON_FAIL', true),
  logVideo: getConfigBool('LOG_VIDEO_ON_FAIL', true),
  headless: getConfigBool('HEADLESS', true),
  baseUrl: getConfig('BASE_URL', 'http://localhost:3000'),
  actionTimeout: getConfigInt('ACTION_TIMEOUT', 30),
  navigationTimeout: getConfigInt('NAVIGATION_TIMEOUT', 60),
  slowMo: getConfigInt('SLOW_MO', 100),
  cleanupDays: getConfigInt('CLEANUP_ARTIFACTS_DAYS', 7),
};
