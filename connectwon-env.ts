/**
 * Description : env.ts - 📌 환경변수 타입정의 및 공통 로더
 * Author : Shiwoo Min
 * Date : 2025-09-09
 * 09-09: ESM 호환, isServer 도입, dotenv 동적 import, 주석 보강
 */

// 런타임 가드 & dotenv 로드 (ESM 안전)

// 서버(노드) 환경 여부: 브라우저 번들로 새지 않게 가드
export const isServer =
  typeof process !== "undefined" && !!process.release && process.release.name === "node";

// 서버(노드) 환경에서만 dotenv 로드 (ESM 동적 import 사용)
(async function safeLoadDotenv() {
  if (!isServer) return;
  try {
    // @ts-expect-error: provided by consuming app
    const { config } = await import("dotenv");
    const dotenvPath = process.env["DOTENV_PATH"];
    config(dotenvPath ? { path: dotenvPath } : undefined);
  } catch {
    // dotenv 미설치/불필요 시 무시
  }
})();

// 타입 정의
export interface ConnectWonEnv {
  // 환경 구분 (MVP 단계에서는 development 만 사용)
  NODE_ENV: "development" | "staging" | "production" | "test";

  // 서버 설정
  WEB_PORT: string;
  API_PORT: string;

  // URL 설정
  WEB_URL: string;
  API_URL: string;

  // 데이터베이스
  DATABASE_URL: string;
  REDIS_URL: string;

  // 인증 설정
  JWT_SECRET: string;
  JWT_EXPIRES_IN?: string;
  SESSION_SECRET: string;

  // 구글 OAuth
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_REDIRECT_URI?: string;

  // 결제 설정 (optional)
  STRIPE_SECRET_KEY?: string;
  STRIPE_WEBHOOK_SECRET?: string;
  STRIPE_PUBLISHABLE_KEY?: string;

  // AI 설정 (optional)
  OPENAI_API_KEY?: string;
  OPENAI_ORG_ID?: string;

  // n8n 설정
  N8N_WEBHOOK_URL?: string;
  N8N_BASIC_AUTH_USER?: string;
  N8N_BASIC_AUTH_PASSWORD?: string;

  // 파일 업로드 설정
  MAX_FILE_SIZE?: string;
  UPLOAD_DIR?: string;

  // 보안 설정
  CORS_ORIGIN?: string;
  RATE_LIMIT_MAX?: string;
  RATE_LIMIT_WINDOW?: string;

  // 로그 설정
  LOG_LEVEL?: "error" | "warn" | "info" | "http" | "verbose" | "debug" | "silly";
  LOG_FORMAT?: "json" | "simple";
  SERVICE_NAME?: string;
  ENABLE_LOGS?: "true" | "false";
  LOG_TO_FILE?: "true" | "false";
  LOG_DIR?: string;
  LOG_MAX_FILES?: string;
  LOG_EXECUTION_TIME?: "true" | "false";

  // E2E/테스트 설정
  HEADLESS?: "true" | "false";
  TEST_TIMEOUT?: string;
  TEST_DATABASE_URL?: string;
  E2E_ARTIFACTS_DIR?: string;
  SAVE_TRACE_ON_FAIL?: "true" | "false";
  LOG_VIDEO_ON_FAIL?: "true" | "false";
  SAVE_TEST_RESULTS?: "true" | "false";
  SCREENSHOT_QUALITY?: "low" | "medium" | "high";
  CLEANUP_ARTIFACTS_DAYS?: string;
  DEBUG_MODE?: "true" | "false";

  // Playwright 설정
  BASE_URL?: string;
  CI?: "true" | "false";
  RETRIES?: string;
  ACTION_TIMEOUT?: string;
  NAVIGATION_TIMEOUT?: string;
  SLOW_MO?: string;
  BROWSER_LAUNCH_TIMEOUT?: string;
  START_WEB_SERVER?: "true" | "false";
  WEB_COMMAND?: string;
  WEB_URL_TEST?: string;

  // 알림 설정
  SLACK_WEBHOOK_URL?: string;
  EMAIL_SERVICE?: string;
  EMAIL_USER?: string;
  EMAIL_PASS?: string;

  // 개발 도구
  PRISMA_HIDE_UPDATE_MESSAGE?: "true" | "false";
  DISABLE_PRISMA_TELEMETRY?: "true" | "false";
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
  return v === undefined || v === null || v === "" ? defaultValue ?? "" : v;
};

// 타입별 env getter
export const envBool = (key: string, defaultValue = false): boolean => {
  const v = env(key);
  if (!v) return defaultValue;
  const s = v.toLowerCase();
  return s === "true" || s === "1" || s === "yes" || s === "on";
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
  return v ? v.split(",").map((s) => s.trim()).filter(Boolean) : defaultValue;
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
  const u = (m[2]?.toLowerCase() ?? "s") as Unit;

  return n * DUR[u]; // ← 이제 number로 확정
};

/** URL 유효성 보장 */
export const envUrl = (key: string, def?: string): string => {
  const value = env(key, def);
  try {
    return new URL(value).toString();
  } catch {
    throw new Error(`Invalid URL in ${key}: ${value}`);
  }
};

/** 비밀 키 마스킹 (로그 시 사용) */
const SECRET_KEYS = new Set([
  "JWT_SECRET",
  "SESSION_SECRET",
  "GOOGLE_CLIENT_SECRET",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "OPENAI_API_KEY",
]);
export const maskSecret = (k: string, v: string) =>
  SECRET_KEYS.has(k) ? v.replace(/.(?=.{4})/g, "*") : v;


// 환경 판별 & 플래그
export function getEnvironment(): ConnectWonEnv["NODE_ENV"] {
  const raw = env("NODE_ENV", "development");
  if (["development", "staging", "production", "test"].includes(raw)) {
    return raw as ConnectWonEnv["NODE_ENV"];
  }
  return "development";
}

export const isProduction = () => getEnvironment() === "production";
export const isDevelopment = () => getEnvironment() === "development";
export const isStaging = () => getEnvironment() === "staging";
export const isTest = () => getEnvironment() === "test";
export const isCI = () => envBool("CI", false);

// 환경별 기본값
export const ENV_DEFAULTS = {
  development: {
    WEB_PORT: "3000",
    API_PORT: "8000",
    LOG_LEVEL: "debug" as const,
    JWT_EXPIRES_IN: "7d",
    ENABLE_LOGS: "true",
    LOG_TO_FILE: "false",
    HEADLESS: "false",
    SAVE_TRACE_ON_FAIL: "true",
    DEBUG_MODE: "true",
  },
  test: {
    WEB_PORT: "3001",
    API_PORT: "8001",
    LOG_LEVEL: "warn" as const,
    JWT_EXPIRES_IN: "1d",
    ENABLE_LOGS: "false",
    LOG_TO_FILE: "false",
    HEADLESS: "true",
    SAVE_TRACE_ON_FAIL: "false",
    DEBUG_MODE: "false",
  },
  staging: {
    WEB_PORT: "3000",
    API_PORT: "8000",
    LOG_LEVEL: "info" as const,
    JWT_EXPIRES_IN: "1d",
    ENABLE_LOGS: "true",
    LOG_TO_FILE: "true",
    HEADLESS: "true",
    SAVE_TRACE_ON_FAIL: "true",
    DEBUG_MODE: "false",
  },
  production: {
    WEB_PORT: "3000",
    API_PORT: "8000",
    LOG_LEVEL: "info" as const,
    JWT_EXPIRES_IN: "1d",
    ENABLE_LOGS: "false",
    LOG_TO_FILE: "true",
    HEADLESS: "true",
    SAVE_TRACE_ON_FAIL: "false",
    DEBUG_MODE: "false",
  },
} as const;

// 기본값(ENV_DEFAULTS)까지 고려한 getter 모음
export function getConfig<K extends keyof ConnectWonEnv>(key: K, defaultValue?: string): string {
  const envName = getEnvironment();
  const envDefaults = ENV_DEFAULTS[envName] as Record<string, string | undefined>;
  return env(key, defaultValue ?? envDefaults[key as string] ?? "");
}

export function getConfigBool<K extends keyof ConnectWonEnv>(key: K, defaultValue?: boolean): boolean {
  const envName = getEnvironment();
  const envDefaults = ENV_DEFAULTS[envName] as Record<string, string | undefined>;
  const fallback = defaultValue ?? (envDefaults[key as string] === "true");
  return envBool(key, fallback);
}

export const getConfigInt = (key: keyof ConnectWonEnv, defaultValue = 0) =>
  envInt(key as string, defaultValue);

// 서비스 별 설정 모음
export const serverConfig = {
  webPort: getConfigInt("WEB_PORT", 3000),
  apiPort: getConfigInt("API_PORT", 8000),
  webUrl: envUrl("WEB_URL", "http://localhost:3000"),
  apiUrl: envUrl("API_URL", "http://localhost:8000"),
  corsOrigin: getConfig("CORS_ORIGIN", "*"),
};

// DB/Redis, 인증, 로그, 테스트 등 설정
export const dbConfig = {
  url: getConfig("DATABASE_URL"),
  redisUrl: getConfig("REDIS_URL"),
  testUrl: getConfig("TEST_DATABASE_URL"),
};

// 인증 설정
export const authConfig = {
  jwtSecret: getConfig("JWT_SECRET"),
  jwtExpiresIn: getConfig("JWT_EXPIRES_IN", "7d"),
  sessionSecret: getConfig("SESSION_SECRET"),
  googleClientId: getConfig("GOOGLE_CLIENT_ID"),
  googleClientSecret: getConfig("GOOGLE_CLIENT_SECRET"),
  googleRedirectUri: getConfig("GOOGLE_REDIRECT_URI"),
};

// 로그 설정
export const logConfig = {
  level: getConfig("LOG_LEVEL", "info"),
  enableLogs: getConfigBool("ENABLE_LOGS", true),
  logToFile: getConfigBool("LOG_TO_FILE", false),
  logDir: getConfig("LOG_DIR", "./logs"),
  maxFiles: getConfig("LOG_MAX_FILES", "7d"),
  serviceName: getConfig("SERVICE_NAME", "connectwon-app"),
  executionTime: getConfigBool("LOG_EXECUTION_TIME", true),
};

// E2E/단위테스트 설정
export const testConfig = {
  headless: getConfigBool("HEADLESS", true),
  baseUrl: getConfig("BASE_URL", "http://localhost:3000"),
  artifactsDir: getConfig("E2E_ARTIFACTS_DIR", "./e2e-artifacts"),
  saveTrace: getConfigBool("SAVE_TRACE_ON_FAIL", true),
  logVideo: getConfigBool("LOG_VIDEO_ON_FAIL", true),
  screenshotQuality: getConfig("SCREENSHOT_QUALITY", "medium"),
  debugMode: getConfigBool("DEBUG_MODE", false),
  cleanupDays: getConfigInt("CLEANUP_ARTIFACTS_DAYS", 7),
  timeout: getConfigInt("TEST_TIMEOUT", 30000),
};

// 공통 필수값 검증
export function validateEnv(): void {
  const required = ["NODE_ENV", "DATABASE_URL", "JWT_SECRET", "API_PORT"] as const;
  const missing = required.filter((k) => !process.env[k]);
  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
}

// 환경별 추가 필수값 검증 (AI/결제 등 필요시 확장)
export function validateEnvByEnvironment(): void {
  const envName = getEnvironment();
  const envRequirements: Record<ConnectWonEnv["NODE_ENV"], string[]> = {
    development: ["DATABASE_URL", "JWT_SECRET"],
    test: ["TEST_DATABASE_URL", "JWT_SECRET"],
    staging: ["DATABASE_URL", "JWT_SECRET", "GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET" /*, "OPENAI_API_KEY"*/],
    production: [
      "DATABASE_URL",
      "JWT_SECRET",
      "GOOGLE_CLIENT_ID",
      "GOOGLE_CLIENT_SECRET",
      "REDIS_URL",
      /* "OPENAI_API_KEY" */
    ],
  };
  const required = envRequirements[envName] ?? [];
  const missing = required.filter((k) => !process.env[k]);
  if (missing.length) {
    throw new Error(`Missing required environment variables for ${envName}: ${missing.join(", ")}`);
  }
}

// 초기화 (로드+검증+로그)  ※ 테스트에선 hardExitOnFail=false 권장
export async function initializeEnv(opts?: { hardExitOnFail?: boolean }): Promise<void> {
  const hardExit = opts?.hardExitOnFail ?? true;
  try {
    validateEnv();
    validateEnvByEnvironment();

    if (isDevelopment() && isServer) {
      const os = await import("node:os");
      // eslint-disable-next-line no-console
      console.log(`[env] Initialized (${getEnvironment()}) on ${os.hostname()}`);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[env] Initialization failed:", err);
    if (hardExit && isServer) process.exit(1);
    else throw err;
  }
}
