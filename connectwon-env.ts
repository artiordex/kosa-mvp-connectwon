/**
 * Description : connectwon-env.ts - 📌 환경변수 타입정의 및 공통 로더
 * Author : Shiwoo Min
 * Date : 2025-09-09
 * 09-09: ESM 호환, isServer 도입, dotenv 동적 import, 주석 보강
 * 09-11: 큐 설정 추가 (QUEUE_CONCURRENCY, QUEUE_PREFIX), queueConfig 제공
 * 09-16: .env와 동기화, AWS/모니터링/비즈니스/Feature Flags 등 추가
 */

// 런타임 가드 & dotenv 로드 (ESM 안전)

// 서버(노드) 환경 여부: 브라우저 번들로 새지 않게 가드
export const isServer =
  typeof process !== 'undefined' && !!process.release && process.release.name === 'node';

// 서버(노드) 환경에서만 dotenv 로드 (ESM 동적 import 사용)
(async function safeLoadDotenv() {
  if (!isServer) return;
  try {
    // @ts-expect-error: provided by consuming app
    const { config } = await import('dotenv');
    const dotenvPath = process.env['DOTENV_PATH'];
    config(dotenvPath ? { path: dotenvPath } : undefined);
  } catch {
    // dotenv 미설치/불필요 시 무시
  }
})();

// 타입 정의
export interface ConnectWonEnv {
  // 환경 구분
  NODE_ENV: 'development' | 'staging' | 'production' | 'test';
  TZ?: string;

  // 서버 설정
  WEB_PORT: string;
  API_PORT: string;
  ADMIN_PORT?: string;
  WORKER_PORT?: string;
  NGINX_PORT?: string;

  // URL 설정
  WEB_URL: string;
  API_URL: string;
  ADMIN_URL?: string;
  FRONTEND_URL?: string;
  BACKEND_URL?: string;
  CORS_ORIGINS?: string;

  // 데이터베이스
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

  // Redis
  REDIS_URL: string;
  REDIS_HOST?: string;
  REDIS_PORT?: string;
  REDIS_PASSWORD?: string;
  REDIS_DB?: string;
  TEST_REDIS_URL?: string;
  REDISINSIGHT_PORT?: string;

  // 큐 설정
  QUEUE_REDIS_URL?: string;
  QUEUE_REDIS_HOST?: string;
  QUEUE_REDIS_PORT?: string;
  QUEUE_REDIS_DB?: string;
  QUEUE_CONCURRENCY?: string;
  QUEUE_PREFIX?: string;

  // 인증 설정
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

  // AI 설정
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

  // AWS/Storage 설정
  AWS_ACCESS_KEY_ID?: string;
  AWS_SECRET_ACCESS_KEY?: string;
  AWS_REGION?: string;
  AWS_S3_BUCKET?: string;
  AWS_S3_PUBLIC_BUCKET?: string;
  AWS_CLOUDFRONT_DOMAIN?: string;
  UPLOAD_PATH?: string;
  MAX_FILE_SIZE?: string;
  ALLOWED_FILE_TYPES?: string;

  // 이메일/알림 설정
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

  // 모니터링 설정
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

  // 비즈니스 설정
  DEFAULT_RESERVATION_DURATION?: string;
  MAX_ADVANCE_BOOKING_DAYS?: string;
  CANCELLATION_DEADLINE_HOURS?: string;
  OVERBOOKING_THRESHOLD?: string;
  REFUND_POLICY_DAYS?: string;
  POINTS_PER_KRW?: string;
  SIGNUP_BONUS_POINTS?: string;
  REFERRAL_BONUS_POINTS?: string;

  // Rate Limiting
  RATE_LIMIT_WINDOW_MS?: string;
  RATE_LIMIT_MAX_REQUESTS?: string;
  RATE_LIMIT_SKIP_IF_SUCCESSFUL?: string;
  API_RATE_LIMIT_PER_MINUTE?: string;
  LOGIN_RATE_LIMIT_PER_HOUR?: string;

  // Background Jobs
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

  // 소셜 OAuth
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_REDIRECT_URI?: string;
  KAKAO_CLIENT_ID?: string;
  KAKAO_CLIENT_SECRET?: string;
  NAVER_CLIENT_ID?: string;
  NAVER_CLIENT_SECRET?: string;

  // Analytics
  GOOGLE_ANALYTICS_ID?: string;
  GOOGLE_TAG_MANAGER_ID?: string;
  MIXPANEL_TOKEN?: string;

  // n8n 설정
  N8N_PORT?: string;
  N8N_WEBHOOK_URL?: string;
  N8N_DB_NAME?: string;
  N8N_BASIC_AUTH_ACTIVE?: string;
  N8N_BASIC_AUTH_USER?: string;
  N8N_BASIC_AUTH_PASSWORD?: string;
  N8N_ENCRYPTION_KEY?: string;
  N8N_EXECUTIONS_TIMEOUT?: string;
  N8N_EXECUTIONS_MAX_TIMEOUT?: string;
  N8N_LOG_LEVEL?: string;

  // 추가 서비스
  TWILIO_ACCOUNT_SID?: string;
  TWILIO_AUTH_TOKEN?: string;
  TWILIO_PHONE_NUMBER?: string;
  FCM_SERVER_KEY?: string;
  VAPID_PUBLIC_KEY?: string;
  VAPID_PRIVATE_KEY?: string;

  // Company/Locale
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

  // E2E/테스트 설정
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

  // 레거시 필드들 (기존 호환)
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

// 기본 env getter (빈 문자열도 미설정으로 간주)
export const env = (key: string, defaultValue?: string): string => {
  const v = process.env[key];
  return v === undefined || v === null || v === '' ? (defaultValue ?? '') : v;
};

// 타입별 env getter
export const envBool = (key: string, defaultValue = false): boolean => {
  const v = env(key);
  if (!v) return defaultValue;
  const s = v.toLowerCase();
  return s === 'true' || s === '1' || s === 'yes' || s === 'on';
};

// 정수형 파싱 (NaN 시 기본값)
export const envInt = (key: string, defaultValue = 0): number => {
  const v = env(key);
  const n = parseInt(v, 10);
  return Number.isNaN(n) ? defaultValue : n;
};

// 쉼표 구분 문자열 → 배열 파싱
export const envArray = (key: string, defaultValue: string[] = []): string[] => {
  const v = env(key);
  return v
    ? v
        .split(',')
        .map(s => s.trim())
        .filter(Boolean)
    : defaultValue;
};

// JSON 파싱 (실패 시 기본값)
export const envJson = <T = unknown>(key: string, defaultValue: T): T => {
  const v = env(key);
  if (!v) return defaultValue;
  try {
    return JSON.parse(v) as T;
  } catch {
    return defaultValue;
  }
};

// "7d"|"12h"|"30m"|"45s"|"300" → 초 단위로 파싱
const DUR = { s: 1, m: 60, h: 3600, d: 86400 } as const;
type Unit = keyof typeof DUR; // 's' | 'm' | 'h' | 'd'

export const envDurationSec = (key: string, defSec: number): number => {
  const v = env(key);
  if (!v) return defSec;

  const m = /^(\d+)\s*([smhd])?$/i.exec(v);
  if (!m) return defSec;

  const n = Number(m[1]);
  const u = (m[2]?.toLowerCase() ?? 's') as Unit;

  return n * DUR[u]; // ← 이제 number로 확정
};

// URL 유효성 보장
export const envUrl = (key: string, def?: string): string => {
  const value = env(key, def);
  try {
    return new URL(value).toString();
  } catch {
    throw new Error(`Invalid URL in ${key}: ${value}`);
  }
};

// 비밀 키 마스킹 (로그 시 사용)
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

export const maskSecret = (k: string, v: string) =>
  SECRET_KEYS.has(k) ? v.replace(/.(?=.{4})/g, '*') : v;

// 환경 판별 & 기본값 테이블
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

// 환경별 기본값
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

// 기본값(ENV_DEFAULTS)까지 고려한 getter 래퍼
export function getConfig<K extends keyof ConnectWonEnv>(key: K, defaultValue?: string): string {
  const envName = getEnvironment();
  const envDefaults = ENV_DEFAULTS[envName] as Record<string, string | undefined>;
  return env(key as string, defaultValue ?? envDefaults[key as string] ?? '');
}

// 불리언 기본값 처리
export function getConfigBool<K extends keyof ConnectWonEnv>(
  key: K,
  defaultValue?: boolean,
): boolean {
  const envName = getEnvironment();
  const envDefaults = ENV_DEFAULTS[envName] as Record<string, string | undefined>;
  const fallback = defaultValue ?? envDefaults[key as string] === 'true';
  return envBool(key as string, fallback);
}

// 정수 기본값 처리
export const getConfigInt = (key: keyof ConnectWonEnv, defaultValue = 0) =>
  envInt(key as string, defaultValue);

// 서비스 별 설정 모음
export const serverConfig = {
  webPort: getConfigInt('WEB_PORT', 3000),
  apiPort: getConfigInt('API_PORT', 8000),
  adminPort: getConfigInt('ADMIN_PORT', 3001),
  webUrl: envUrl('WEB_URL', 'http://localhost:3000'),
  apiUrl: envUrl('API_URL', 'http://localhost:8000'),
  adminUrl: getConfig('ADMIN_URL', 'http://localhost:3001'),
  corsOrigin: getConfig('CORS_ORIGINS', '*'),
};

// DB/Redis 설정
export const dbConfig = {
  url: getConfig('DATABASE_URL'),
  redisUrl: getConfig('REDIS_URL'),
  testUrl: getConfig('TEST_DATABASE_URL'),
  poolMin: getConfigInt('DATABASE_POOL_MIN', 2),
  poolMax: getConfigInt('DATABASE_POOL_MAX', 10),
};

// 인증 설정
export const authConfig = {
  jwtSecret: getConfig('JWT_SECRET'),
  jwtExpiresIn: getConfig('JWT_EXPIRES_IN', '7d'),
  jwtRefreshSecret: getConfig('JWT_REFRESH_SECRET'),
  jwtRefreshExpiresIn: getConfig('JWT_REFRESH_EXPIRES_IN', '30d'),
  sessionSecret: getConfig('SESSION_SECRET'),
  sessionMaxAge: getConfigInt('SESSION_MAX_AGE', 86400000),
  cookieSecret: getConfig('COOKIE_SECRET'),
  cookieDomain: getConfig('COOKIE_DOMAIN', 'localhost'),
  cookieSecure: getConfigBool('COOKIE_SECURE', false),
};

// 소셜 OAuth 설정
export const oauthConfig = {
  google: {
    clientId: getConfig('GOOGLE_CLIENT_ID'),
    clientSecret: getConfig('GOOGLE_CLIENT_SECRET'),
    redirectUri: getConfig('GOOGLE_REDIRECT_URI'),
  },
  kakao: {
    clientId: getConfig('KAKAO_CLIENT_ID'),
    clientSecret: getConfig('KAKAO_CLIENT_SECRET'),
  },
  naver: {
    clientId: getConfig('NAVER_CLIENT_ID'),
    clientSecret: getConfig('NAVER_CLIENT_SECRET'),
  },
};

// AI 설정
export const aiConfig = {
  openai: {
    apiKey: getConfig('OPENAI_API_KEY'),
  },
  anthropic: {
    apiKey: getConfig('ANTHROPIC_API_KEY'),
  },
  huggingface: {
    apiKey: getConfig('HUGGINGFACE_API_KEY'),
  },
};

// 결제 설정
export const paymentConfig = {
  provider: getConfig('PAYMENT_PROVIDER', 'stripe'),
  currency: getConfig('PAYMENT_CURRENCY', 'KRW'),
  timeout: getConfigInt('PAYMENT_TIMEOUT_MINUTES', 15),
  stripe: {
    secretKey: getConfig('STRIPE_SECRET_KEY'),
    publishableKey: getConfig('STRIPE_PUBLISHABLE_KEY'),
    webhookSecret: getConfig('STRIPE_WEBHOOK_SECRET'),
  },
};

// AWS/Storage 설정
export const awsConfig = {
  accessKeyId: getConfig('AWS_ACCESS_KEY_ID'),
  secretAccessKey: getConfig('AWS_SECRET_ACCESS_KEY'),
  region: getConfig('AWS_REGION', 'ap-northeast-2'),
  s3Bucket: getConfig('AWS_S3_BUCKET'),
  s3PublicBucket: getConfig('AWS_S3_PUBLIC_BUCKET'),
  cloudfrontDomain: getConfig('AWS_CLOUDFRONT_DOMAIN'),
};

// 업로드 설정
export const uploadConfig = {
  path: getConfig('UPLOAD_PATH', './uploads'),
  maxFileSize: getConfigInt('MAX_FILE_SIZE', 10485760),
  allowedTypes: envArray('ALLOWED_FILE_TYPES', ['image/jpeg', 'image/png']),
};

// 이메일 설정
export const emailConfig = {
  provider: getConfig('EMAIL_PROVIDER', 'smtp'),
  smtp: {
    host: getConfig('SMTP_HOST'),
    port: getConfigInt('SMTP_PORT', 587),
    secure: getConfigBool('SMTP_SECURE', false),
    user: getConfig('SMTP_USER'),
    pass: getConfig('SMTP_PASS'),
    fromEmail: getConfig('SMTP_FROM_EMAIL'),
    fromName: getConfig('SMTP_FROM_NAME', 'ConnectWon'),
  },
};

// 알림 설정
export const notificationConfig = {
  slack: {
    webhookUrl: getConfig('SLACK_WEBHOOK_URL'),
    token: getConfig('SLACK_TOKEN'),
    channel: getConfig('SLACK_CHANNEL', '#notifications'),
  },
};

// 모니터링 설정
export const monitoringConfig = {
  sentry: {
    dsn: getConfig('SENTRY_DSN'),
  },
  newRelic: {
    licenseKey: getConfig('NEW_RELIC_LICENSE_KEY'),
    appName: getConfig('NEW_RELIC_APP_NAME', 'ConnectWon'),
  },
  grafana: {
    adminUser: getConfig('GF_SECURITY_ADMIN_USER', 'admin'),
    adminPassword: getConfig('GF_SECURITY_ADMIN_PASSWORD'),
    secretKey: getConfig('GF_SECURITY_SECRET_KEY'),
    port: getConfigInt('GF_SERVER_HTTP_PORT', 3030),
  },
};

// 비즈니스 설정
export const businessConfig = {
  reservation: {
    defaultDuration: getConfigInt('DEFAULT_RESERVATION_DURATION', 60),
    maxAdvanceBookingDays: getConfigInt('MAX_ADVANCE_BOOKING_DAYS', 30),
    cancellationDeadlineHours: getConfigInt('CANCELLATION_DEADLINE_HOURS', 24),
    overbookingThreshold: parseFloat(getConfig('OVERBOOKING_THRESHOLD', '0.1')),
  },
  payment: {
    refundPolicyDays: getConfigInt('REFUND_POLICY_DAYS', 7),
  },
  points: {
    perKrw: parseFloat(getConfig('POINTS_PER_KRW', '0.01')),
    signupBonus: getConfigInt('SIGNUP_BONUS_POINTS', 1000),
    referralBonus: getConfigInt('REFERRAL_BONUS_POINTS', 5000),
  },
};

// Rate Limiting 설정
export const rateLimitConfig = {
  windowMs: getConfigInt('RATE_LIMIT_WINDOW_MS', 900000),
  maxRequests: getConfigInt('RATE_LIMIT_MAX_REQUESTS', 100),
  skipIfSuccessful: getConfigBool('RATE_LIMIT_SKIP_IF_SUCCESSFUL', true),
  apiPerMinute: getConfigInt('API_RATE_LIMIT_PER_MINUTE', 60),
  loginPerHour: getConfigInt('LOGIN_RATE_LIMIT_PER_HOUR', 5),
};

// Feature Flags 설정
export const featureFlags = {
  aiRecommendations: getConfigBool('FEATURE_AI_RECOMMENDATIONS', true),
  paymentGateway: getConfigBool('FEATURE_PAYMENT_GATEWAY', true),
  emailNotifications: getConfigBool('FEATURE_EMAIL_NOTIFICATIONS', true),
  slackNotifications: getConfigBool('FEATURE_SLACK_NOTIFICATIONS', false),
  advancedAnalytics: getConfigBool('FEATURE_ADVANCED_ANALYTICS', false),
  betaFeatures: getConfigBool('FEATURE_BETA_FEATURES', false),
};

// 로그 설정
export const logConfig = {
  level: getConfig('LOG_LEVEL', 'info'),
  format: getConfig('LOG_FORMAT', 'pretty'),
  enableLogs: getConfigBool('ENABLE_LOGS', true),
  logToFile: getConfigBool('LOG_TO_FILE', false),
  logDir: getConfig('LOG_DIR', './logs'),
  maxFiles: getConfig('LOG_MAX_FILES', '7d'),
  serviceName: getConfig('SERVICE_NAME', 'connectwon-app'),
  executionTime: getConfigBool('LOG_EXECUTION_TIME', true),
};

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
  timeout: getConfigInt('ACTION_TIMEOUT', 30),
  navigationTimeout: getConfigInt('NAVIGATION_TIMEOUT', 60),
  slowMo: getConfigInt('SLOW_MO', 100),
};

// 큐 설정 모음 (Worker/BullMQ에서 사용)
export const queueConfig = {
  prefix: getConfig('QUEUE_PREFIX', 'connectwon'),
  concurrency: getConfigInt('QUEUE_CONCURRENCY', 5),
  jobAttempts: getConfigInt('JOB_ATTEMPTS', 3),
  jobBackoffType: getConfig('JOB_BACKOFF_TYPE', 'exponential'),
  jobDelay: getConfigInt('JOB_DELAY', 5000),
};

// n8n 설정
export const n8nConfig = {
  port: getConfigInt('N8N_PORT', 5678),
  webhookUrl: getConfig('N8N_WEBHOOK_URL'),
  dbName: getConfig('N8N_DB_NAME', 'n8n'),
  basicAuth: {
    active: getConfigBool('N8N_BASIC_AUTH_ACTIVE', true),
    user: getConfig('N8N_BASIC_AUTH_USER', 'admin'),
    password: getConfig('N8N_BASIC_AUTH_PASSWORD'),
  },
  encryptionKey: getConfig('N8N_ENCRYPTION_KEY'),
  logLevel: getConfig('N8N_LOG_LEVEL', 'info'),
};

// Analytics 설정
export const analyticsConfig = {
  googleAnalyticsId: getConfig('GOOGLE_ANALYTICS_ID'),
  googleTagManagerId: getConfig('GOOGLE_TAG_MANAGER_ID'),
  mixpanelToken: getConfig('MIXPANEL_TOKEN'),
};

// Company/Locale 설정
export const companyConfig = {
  name: getConfig('COMPANY_NAME', 'ConnectWon'),
  email: getConfig('COMPANY_EMAIL', 'contact@connectwon.com'),
  phone: getConfig('COMPANY_PHONE'),
  supportEmail: getConfig('SUPPORT_EMAIL', 'support@connectwon.com'),
  defaultTimezone: getConfig('DEFAULT_TIMEZONE', 'Asia/Seoul'),
  dateFormat: getConfig('DATE_FORMAT', 'YYYY-MM-DD'),
  timeFormat: getConfig('TIME_FORMAT', 'HH:mm'),
  defaultLanguage: getConfig('DEFAULT_LANGUAGE', 'ko'),
  supportedLanguages: envArray('SUPPORTED_LANGUAGES', ['ko', 'en']),
  useI18n: getConfigBool('USE_I18N', true),
};

// 기본 필수값 검증
export function validateEnv(): void {
  const required = ['NODE_ENV', 'DATABASE_URL', 'JWT_SECRET', 'API_PORT'] as const;
  const missing = required.filter(k => !process.env[k]);
  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

// 환경별 추가 필수값 검증 (AI/결제 등 필요시 확장)
export function validateEnvByEnvironment(): void {
  const envName = getEnvironment();

  // 환경별 필수 환경변수 정의
  const envRequirements = {
    development: ['DATABASE_URL', 'JWT_SECRET', 'SESSION_SECRET'],
    test: ['TEST_DATABASE_URL', 'JWT_SECRET', 'SESSION_SECRET'],
    staging: [
      'DATABASE_URL',
      'JWT_SECRET',
      'SESSION_SECRET',
      'GOOGLE_CLIENT_ID',
      'GOOGLE_CLIENT_SECRET',
      'REDIS_URL',
    ],
    production: [
      'DATABASE_URL',
      'JWT_SECRET',
      'SESSION_SECRET',
      'GOOGLE_CLIENT_ID',
      'GOOGLE_CLIENT_SECRET',
      'REDIS_URL',
    ],
  } as const satisfies Record<ConnectWonEnv['NODE_ENV'], readonly string[]>;

  const required = envRequirements[envName];
  const missing = required.filter(k => !process.env[k]);

  if (missing.length) {
    throw new Error(`Missing required environment variables for ${envName}: ${missing.join(', ')}`);
  }
}
