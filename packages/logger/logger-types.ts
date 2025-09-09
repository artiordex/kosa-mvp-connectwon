/**
 * Description : logger-types.ts - 📌 SDK 공용 로깅 타입
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */

export type LogLevel =
  | 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal'
  | 'http'  | 'verbose' | 'silly';

export interface LogError {
  message: string;
  stack?: string;
  name?: string;
  code?: string | number;
  cause?: unknown;
}

export interface LogRecord {
  time?: number | string;        // epoch(ms) 또는 ISO 문자열
  level: LogLevel | string;      // 외부 입력 대비해 string 허용
  msg?: string;                  // 짧은 메시지
  message?: string;              // winston 호환
  service?: string;              // 서비스/모듈명
  error?: LogError;              // 에러 상세(선택)
  [k: string]: unknown;          // 추가 메타
}

export type LogConfig = {
  serviceName: string;
  level: 'error'|'warn'|'info'|'http'|'verbose'|'debug'|'silly'|string;
  enableLogs: boolean;
  logToFile: boolean;
  logDir: string;
  maxFiles: string; // e.g. '7d'
};

export type LoggerOptions = Partial<LogConfig>;

export interface Transport {
  log(rec: LogRecord): void | Promise<void>;
  flush?(): Promise<void>;
  close?(): void | Promise<void>;
}

export const LEVEL_ORDER: LogLevel[] = [
  'trace', 'debug', 'info', 'http', 'verbose', 'warn', 'error', 'fatal', 'silly'
];

export function levelWeight(lvl: LogLevel | string): number {
  const i = LEVEL_ORDER.indexOf(lvl as LogLevel);
  return i === -1 ? Number.POSITIVE_INFINITY : i;
}

export function isLogError(v: unknown): v is LogError {
  return !!v && typeof v === 'object' && v !== null && 'message' in v;
}

export interface ConsoleTransportOptions {
  level?: LogLevel;       // 최소 레벨
  json?: boolean;         // true면 NDJSON
  stderrLevel?: LogLevel; // 이 레벨 이상은 stderr로
}

export interface FileTransportOptions {
  dir: string;                     // 로그 디렉터리
  prefix?: string;                 // 파일 접두사 (기본: app)
  level?: LogLevel;                // 최소 레벨 (기본: info)
  rotate?: 'daily' | 'none';       // 일자별 롤링 (기본: daily)
}

export interface HttpTransportOptions {
  endpoint: string;
  headers?: Record<string, string>;
  batchSize?: number;
  intervalMs?: number;
  fetchImpl?: typeof fetch;
  level?: LogLevel;
}

export interface PrettyTransportOptions {
  level?: LogLevel;
  withTimestamp?: boolean;
  singleLine?: boolean;
}

export interface SlackTransportOptions {
  webhookUrl: string;
  username?: string;
  iconEmoji?: string;
  channel?: string;
  fetchImpl?: typeof fetch;
  level?: LogLevel;
}
