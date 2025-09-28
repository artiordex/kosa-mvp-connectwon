/**
 * Description : logger.ts - 📌 로깅 유틸리티
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import fs from 'node:fs';
import path from 'node:path';
import type { LogConfig, LogError, LoggerOptions, LogLevel } from '@connectwon/logger/logger-types';
import type { TransformableInfo } from 'logform';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import type TransportStream from 'winston-transport';

/**
 * @description 환경변수로부터 불리언 값 해석 함수
 */
const asBool = (v: string | undefined, def = false): boolean => {
  if (v == null || v === '') return def;
  const s = v.toLowerCase();
  return s === 'true' || s === '1' || s === 'yes' || s === 'on';
};

/**
 * @description 기본 로깅 설정
 */
const DEFAULT_LOG_CONFIG: LogConfig = {
  serviceName: process.env['SERVICE_NAME'] ?? 'connectwon-app',
  level: process.env['LOG_LEVEL'] ?? 'info',
  enableLogs: asBool(process.env['ENABLE_LOGS'], true),
  logToFile: asBool(process.env['LOG_TO_FILE'], false),
  logDir: process.env['LOG_DIR'] ?? './logs',
  maxFiles: process.env['LOG_MAX_FILES'] ?? '7d',
};

/**
 * @description 개발 환경 여부 검사
 */
export const isDevelopment = (): boolean => (process.env['NODE_ENV'] ?? 'development') === 'development';

/**
 * @description 로깅 설정 병합 함수
 */
const resolveLogConfig = (overrides?: Partial<LogConfig>): LogConfig => ({
  ...DEFAULT_LOG_CONFIG,
  ...(overrides ?? {}),
});

/**
 * @description 디렉터리 존재 확인 및 없으면 생성
 */
function ensureDir(dir: string): void {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

/**
 * @description 민감 정보 필드 네임 패턴
 */
const REDACT_KEYS = [/password/i, /secret/i, /token/i, /apikey/i, /authorization/i];

/**
 * @description 객체 내 민감 정보 가리기
 */
function redact(obj: Record<string, unknown>): Record<string, unknown> {
  for (const k of Object.keys(obj)) {
    if (REDACT_KEYS.some(rx => rx.test(k))) obj[k] = '[REDACTED]';
  }
  return obj;
}

/**
 * @description 에러 객체 정규화
 */
function normalizeError(err: unknown): LogError {
  if (err instanceof Error) {
    const out: LogError = { message: err.message };
    if (err.name) out.name = err.name;
    if (err.stack) out.stack = err.stack;
    if ((err as any).cause) out.cause = String((err as any).cause);
    return out;
  }
  if (err && typeof err === 'object' && 'message' in (err as any)) {
    const e = err as any;
    const out: LogError = { message: String(e.message) };
    if (typeof e.name === 'string') out.name = e.name;
    if (typeof e.stack === 'string') out.stack = e.stack;
    return out;
  }
  return { message: JSON.stringify(err) };
}

/**
 * @description 로그 정보 안전 JSON 변환
 */
function toSafeJSON(info: TransformableInfo, fallbackService: string) {
  const { timestamp, level, message, service, error, ...rest } = info as any;
  const meta = Object.keys(rest).length ? redact({ ...rest }) : undefined;
  const normalized = error !== undefined ? normalizeError(error) : undefined;
  return {
    timestamp,
    level,
    service: service ?? fallbackService,
    message,
    ...(normalized ? { error: normalized } : {}),
    ...(meta ? { meta } : {}),
  };
}

/**
 * @description winston 포맷 생성 (개발용 콘솔, JSON)
 */
function makeFormats(serviceName: string) {
  const base = [winston.format.errors({ stack: true }), winston.format.splat(), winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })];
  const devConsoleFormat = winston.format.combine(
    ...base,
    winston.format.colorize({ all: true }),
    winston.format.printf((info: TransformableInfo) => {
      const json = toSafeJSON(info, serviceName);
      const extra = json.meta ? ` ${JSON.stringify(json.meta)}` : '';
      return `${json.timestamp} [${json.service}] ${json.level}: ${json.message ?? ''}${extra}`;
    }),
  );
  const jsonFormat = winston.format.combine(
    ...base,
    winston.format.printf((info: TransformableInfo) => JSON.stringify(toSafeJSON(info, serviceName))),
  );
  return { devConsoleFormat, jsonFormat };
}

/**
 * @description winston 트랜스포트 빌드
 */
function buildTransports(cfg: LogConfig): TransportStream[] {
  const { devConsoleFormat, jsonFormat } = makeFormats(cfg.serviceName);
  const transports: TransportStream[] = [];

  transports.push(
    new winston.transports.Console({
      silent: !cfg.enableLogs,
      level: cfg.level,
      format: isDevelopment() ? devConsoleFormat : jsonFormat,
    }),
  );

  if (cfg.logToFile) {
    ensureDir(cfg.logDir);

    transports.push(
      new DailyRotateFile({
        filename: path.join(cfg.logDir, '%DATE%.json'),
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxFiles: cfg.maxFiles,
        maxSize: '20m',
        level: cfg.level,
        format: jsonFormat,
      }),
    );

    transports.push(
      new DailyRotateFile({
        filename: path.join(cfg.logDir, 'errors-%DATE%.json'),
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxFiles: cfg.maxFiles,
        maxSize: '10m',
        level: 'error',
        format: jsonFormat,
      }),
    );
  }

  return transports;
}

/**
 * @description winston 로거 생성
 */
export function createLogger(service: string = DEFAULT_LOG_CONFIG.serviceName, overrides?: LoggerOptions): winston.Logger {
  const cfg = resolveLogConfig(overrides);
  ensureDir(cfg.logDir);

  const logger = winston.createLogger({
    levels: winston.config.npm.levels,
    level: cfg.level,
    defaultMeta: { service, pid: process.pid },
    transports: buildTransports(cfg),
    exceptionHandlers: cfg.logToFile
      ? [
          new winston.transports.File({
            filename: path.join(cfg.logDir, 'exceptions.log'),
            format: makeFormats(cfg.serviceName).jsonFormat,
          }),
        ]
      : [],
    rejectionHandlers: cfg.logToFile
      ? [
          new winston.transports.File({
            filename: path.join(cfg.logDir, 'rejections.log'),
            format: makeFormats(cfg.serviceName).jsonFormat,
          }),
        ]
      : [],
    exitOnError: false,
  });

  if (isDevelopment()) {
    console.log(`[logger] initialized for service=${service}, level=${cfg.level}, logToFile=${cfg.logToFile}`);
  }

  return logger;
}

/**
 * @description 기본 로거 인스턴스
 */
export const logger = createLogger();

/**
 * @description morgan 호환 HTTP 로그 스트림
 */
export const httpStream = {
  write: (message: string) => logger.http(message.trim()),
};

/**
 * @description 단순 함수형 로거 유틸
 */
export const log = {
  error: (message: string, meta?: unknown) => logger.error(message, meta),
  warn: (message: string, meta?: unknown) => logger.warn(message, meta),
  info: (message: string, meta?: unknown) => logger.info(message, meta),
  http: (message: string, meta?: unknown) => logger.http(message, meta),
  verbose: (message: string, meta?: unknown) => logger.verbose(message, meta),
  debug: (message: string, meta?: unknown) => logger.debug(message, meta),
  silly: (message: string, meta?: unknown) => logger.silly(message, meta),
};

/**
 * @description 컨텍스트 로거 클래스
 */
export class ContextLogger {
  private base: winston.Logger;
  private ctx: Record<string, unknown>;

  constructor(ctx: Record<string, unknown> = {}, baseLogger?: winston.Logger) {
    this.ctx = ctx;
    this.base = (baseLogger ?? logger).child(this.ctx);
  }

  private logWith(level: LogLevel, message: string, meta: Record<string, unknown> = {}) {
    this.base.log(level, message, meta);
  }

  error(m: string, meta?: Record<string, unknown>) {
    this.logWith('error', m, meta ?? {});
  }
  warn(m: string, meta?: Record<string, unknown>) {
    this.logWith('warn', m, meta ?? {});
  }
  info(m: string, meta?: Record<string, unknown>) {
    this.logWith('info', m, meta ?? {});
  }
  http(m: string, meta?: Record<string, unknown>) {
    this.logWith('http', m, meta ?? {});
  }
  verbose(m: string, meta?: Record<string, unknown>) {
    this.logWith('verbose', m, meta ?? {});
  }
  debug(m: string, meta?: Record<string, unknown>) {
    this.logWith('debug', m, meta ?? {});
  }
  silly(m: string, meta?: Record<string, unknown>) {
    this.logWith('silly', m, meta ?? {});
  }

  child(extra: Record<string, unknown>) {
    return new ContextLogger({ ...this.ctx, ...extra }, this.base);
  }
}

/**
 * @description 컨텍스트 로거 생성 편의 함수
 */
export const createContextLogger = (context: Record<string, unknown> = {}) => new ContextLogger(context);

/**
 * @description 로거 종료 함수 (flush 후 close)
 */
export async function closeLogger(l: winston.Logger = logger) {
  for (const t of l.transports) {
    if (typeof (t as any).flush === 'function') {
      await (t as any).flush();
    }
    if (typeof (t as any).close === 'function') {
      (t as any).close();
    }
  }
}

// 종료 시 안전하게 로거 닫기
process.on('SIGTERM', async () => {
  await closeLogger();
});
process.on('SIGINT', async () => {
  await closeLogger();
});
