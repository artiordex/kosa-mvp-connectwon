/**
 * Description : logger.ts - 📌 로깅 유틸리티
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */

import fs from 'node:fs';
import path from 'node:path';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import type { TransformableInfo } from 'logform';
import type { LogConfig, LogError, LoggerOptions, LogLevel } from '../logger-types.js';

// 환경변수로부터 불리언 값 해석
const asBool = (v: string | undefined, def = false) => {
  if (v == null || v === '') return def;
  const s = v.toLowerCase();
  return s === 'true' || s === '1' || s === 'yes' || s === 'on';
};

// 기본 설정
const DEFAULT_LOG_CONFIG: LogConfig = {
  serviceName: process.env['SERVICE_NAME'] ?? 'connectwon-app',
  level:       process.env['LOG_LEVEL'] ?? 'info',
  enableLogs:  asBool(process.env['ENABLE_LOGS'], true),
  logToFile:   asBool(process.env['LOG_TO_FILE'], false),
  logDir:      process.env['LOG_DIR'] ?? './logs',
  maxFiles:    process.env['LOG_MAX_FILES'] ?? '7d',
};

// 개발 환경 여부
export const isDevelopment = () =>
  (process.env['NODE_ENV'] ?? 'development') === 'development';

const resolveLogConfig = (overrides?: Partial<LogConfig>): LogConfig =>
  ({ ...DEFAULT_LOG_CONFIG, ...(overrides ?? {}) });

// 디렉터리 보장
function ensureDir(dir: string): void {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// 민감 정보 가리기
const REDACT_KEYS = [/password/i, /secret/i, /token/i, /apikey/i, /authorization/i];
function redact(obj: Record<string, unknown>) {
  for (const k of Object.keys(obj)) if (REDACT_KEYS.some(rx => rx.test(k))) obj[k] = '[REDACTED]';
  return obj;
}

// 에러 정규화
function normalizeError(err: unknown): LogError {
  if (err instanceof Error) {
    const out: LogError = { message: err.message };
    if (err.name !== undefined) out.name = err.name;
    if (err.stack !== undefined) out.stack = err.stack;
    return out;
  }
  if (err && typeof err === 'object' && 'message' in (err as any)) {
    const e = err as any;
    const out: LogError = { message: String(e.message) };
    if (typeof e.name === 'string') out.name = e.name;
    if (typeof e.stack === 'string') out.stack = e.stack;
    return out;
  }
  return { message: String(err) };
}

// 안전한 JSON 변환 (에러, 메타 가공)
function toSafeJSON(info: TransformableInfo, fallbackService: string) {
  const { timestamp, level, message, service, error, ...rest } = info as any;
  const meta = Object.keys(rest).length ? redact({ ...rest }) : undefined;
  const normalized = error !== undefined ? normalizeError(error) : undefined;
  return {
    timestamp,
    level,
    service: service ?? fallbackService,
    message,
    ...(normalized !== undefined ? { error: normalized } : {}),
    ...(meta !== undefined ? { meta } : {}),
  };
}

// 포맷 생성
function makeFormats(serviceName: string) {
  const base = [
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  ];
  const devConsoleFormat = winston.format.combine(
    ...base,
    winston.format.colorize({ all: true }),
    winston.format.printf((info: TransformableInfo) => {
      const json = toSafeJSON(info, serviceName);
      const extra = json.meta ? ` ${JSON.stringify(json.meta)}` : '';
      return `${json.timestamp} [${json.service}] ${json.level}: ${json.message ?? ''}${extra}`;
    })
  );
  const jsonFormat = winston.format.combine(
    ...base,
    winston.format.printf((info: TransformableInfo) => JSON.stringify(toSafeJSON(info, serviceName)))
  );
  return { devConsoleFormat, jsonFormat };
}

// 트랜스포트 빌드
function buildTransports(cfg: LogConfig): winston.transport[] {
  const { devConsoleFormat, jsonFormat } = makeFormats(cfg.serviceName);
  const transports: winston.transport[] = [];
  transports.push(new winston.transports.Console({
    silent: !cfg.enableLogs,
    level: cfg.level,
    format: isDevelopment() ? devConsoleFormat : jsonFormat,
  }));

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
      }) as unknown as winston.transport
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
      }) as unknown as winston.transport
    );
  }
  return transports;
}

// 로거 생성 함수
export function createLogger(
  service: string = DEFAULT_LOG_CONFIG.serviceName,
  overrides?: LoggerOptions
): winston.Logger {
  const cfg = resolveLogConfig(overrides);
  const logger = winston.createLogger({
    levels: winston.config.npm.levels,
    level: cfg.level,
    defaultMeta: { service, pid: process.pid },
    transports: buildTransports(cfg),
    exceptionHandlers: cfg.logToFile
      ? [ new winston.transports.File({ filename: path.join(cfg.logDir, 'exceptions.log'), format: makeFormats(cfg.serviceName).jsonFormat }) ]
      : [],
    rejectionHandlers: cfg.logToFile
      ? [ new winston.transports.File({ filename: path.join(cfg.logDir, 'rejections.log'), format: makeFormats(cfg.serviceName).jsonFormat }) ]
      : [],
    exitOnError: false,
  });

  if (isDevelopment()) {
    logger.debug(`Logger initialized for service: ${service}`, {
      level: logger.level,
      logToFile: cfg.logToFile,
      logDir: cfg.logDir,
    });
  }
  return logger;
}

// 기본 로거 인스턴스
export const logger = createLogger();

// morgan 호환 스트림
export const httpStream = { write: (message: string) => logger.http(message.trim()) };

// 단순 함수형 로거
export const log = {
  error: (message: string, meta?: unknown) => logger.error(message, meta),
  warn:  (message: string, meta?: unknown) => logger.warn(message, meta),
  info:  (message: string, meta?: unknown) => logger.info(message, meta),
  http:  (message: string, meta?: unknown) => logger.http(message, meta),
  verbose:(message: string, meta?: unknown) => logger.verbose(message, meta),
  debug: (message: string, meta?: unknown) => logger.debug(message, meta),
  silly: (message: string, meta?: unknown) => logger.silly(message, meta),
};

// 컨텍스트 로거 클래스
export class ContextLogger {
  private base: winston.Logger;
  constructor(private ctx: Record<string, unknown> = {}, baseLogger?: winston.Logger) {
    this.base = (baseLogger ?? logger).child(this.ctx);
  }
  private logWith(level: LogLevel, message: string, meta: Record<string, unknown> = {}) {
    this.base.log(level, message, meta);
  }
  error(m: string, meta?: Record<string, unknown>) { this.logWith('error', m, meta ?? {}); }
  warn(m: string, meta?: Record<string, unknown>)  { this.logWith('warn',  m, meta ?? {}); }
  info(m: string, meta?: Record<string, unknown>)  { this.logWith('info',  m, meta ?? {}); }
  http(m: string, meta?: Record<string, unknown>)  { this.logWith('http',  m, meta ?? {}); }
  verbose(m: string, meta?: Record<string, unknown>) { this.logWith('verbose', m, meta ?? {}); }
  debug(m: string, meta?: Record<string, unknown>) { this.logWith('debug', m, meta ?? {}); }
  silly(m: string, meta?: Record<string, unknown>) { this.logWith('silly', m, meta ?? {}); }
  child(extra: Record<string, unknown>) { return new ContextLogger({ ...this.ctx, ...extra }, this.base); }
}

// 컨텍스트 로거 생성 함수
export const createContextLogger = (context: Record<string, unknown> = {}) =>
  new ContextLogger(context);

// 로거 종료 (트랜스포트 close 호출)
export function closeLogger(l: winston.Logger = logger) {
  for (const t of l.transports) {
    // 대부분의 winston transport는 close를 가짐
    if (typeof t.close === 'function') t.close();
  }
}

process.on('SIGTERM', () => { closeLogger(); });
process.on('SIGINT',  () => { closeLogger(); });
