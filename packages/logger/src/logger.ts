/**
 * Description : logger.ts - 📌 로깅 유틸리티
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import fs from 'node:fs';
import path from 'node:path';

import type { LogConfig, LogError, LoggerOptions, LogLevel } from '../logger-types.js';
import type { TransformableInfo } from 'logform';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

/**
 * @description 환경변수로부터 불리언 값 해석 함수
 * @param v 문자열 값
 * @param def 기본값 (기본:false)
 * @returns boolean 값
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
 * @returns 개발 환경일 경우 true 반환
 */
export const isDevelopment = (): boolean => (process.env['NODE_ENV'] ?? 'development') === 'development';

/**
 * @description 로깅 설정 병합 함수
 * @param overrides 사용자 설정 덮어쓰기 옵션
 * @returns 병합된 LogConfig 객체
 */
const resolveLogConfig = (overrides?: Partial<LogConfig>): LogConfig => ({
  ...DEFAULT_LOG_CONFIG,
  ...(overrides ?? {}),
});

/**
 * @description 디렉터리 존재 확인 및 없으면 생성 함수
 * @param dir 경로
 */
function ensureDir(dir: string): void {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

/**
 * @description 민감 정보 필드 네임 패턴 배열
 */
const REDACT_KEYS = [/password/i, /secret/i, /token/i, /apikey/i, /authorization/i];

/**
 * @description 객체 내 민감 정보 가리기
 * @param obj 필드가 가려질 객체
 * @returns 민감 정보가 가려진 객체
 */
function redact(obj: Record<string, unknown>): Record<string, unknown> {
  for (const k of Object.keys(obj)) {
    if (REDACT_KEYS.some(rx => rx.test(k))) obj[k] = '[REDACTED]';
  }
  return obj;
}

/**
 * @description 에러 객체를 LogError 타입으로 정규화
 * @param err 입력 에러
 * @returns 정규화된 LogError 객체
 */
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

/**
 * @description 로그 정보 안전 JSON 변환 함수 (민감 정보 가림, 에러 정규화 포함)
 * @param info winston 로그 정보 객체
 * @param fallbackService 서비스명 기본값
 * @returns 직렬화용 JSON 객체
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
    ...(normalized !== undefined ? { error: normalized } : {}),
    ...(meta !== undefined ? { meta } : {}),
  };
}

/**
 * @description winston 포맷 생성 함수 (개발용 콘솔, JSON)
 * @param serviceName 서비스명
 * @returns devConsoleFormat, jsonFormat 객체
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
 * @description winston 트랜스포트 빌드 함수
 * @param cfg LogConfig 객체
 * @returns 트랜스포트 배열
 */
function buildTransports(cfg: LogConfig): winston.transport[] {
  const { devConsoleFormat, jsonFormat } = makeFormats(cfg.serviceName);
  const transports: winston.transport[] = [];

  // 콘솔 트랜스포트 추가
  transports.push(
    new winston.transports.Console({
      silent: !cfg.enableLogs,
      level: cfg.level,
      format: isDevelopment() ? devConsoleFormat : jsonFormat,
    }),
  );

  // 파일 로깅이 활성화된 경우
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
      }) as unknown as winston.transport,
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
      }) as unknown as winston.transport,
    );
  }

  return transports;
}

/**
 * @description winston 로거 생성 함수
 * @param service 서비스명 (기본값: DEFAULT_LOG_CONFIG.serviceName)
 * @param overrides LogConfig 덮어쓰기 옵션
 * @returns 생성된 winston.Logger 인스턴스
 */
export function createLogger(service: string = DEFAULT_LOG_CONFIG.serviceName, overrides?: LoggerOptions): winston.Logger {
  const cfg = resolveLogConfig(overrides);
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
    logger.debug(`Logger initialized for service: ${service}`, {
      level: logger.level,
      logToFile: cfg.logToFile,
      logDir: cfg.logDir,
    });
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
export const httpStream = { write: (message: string) => logger.http(message.trim()) };

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

  /**
   * @param ctx 추가할 컨텍스트 메타정보
   * @param baseLogger 기본 로거 (기본: 전역 logger)
   */
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

  /**
   * @description 자식 컨텍스트 로거 생성
   * @param extra 추가할 컨텍스트
   * @returns 새로운 ContextLogger 인스턴스
   */
  child(extra: Record<string, unknown>) {
    return new ContextLogger({ ...this.ctx, ...extra }, this.base);
  }
}

/**
 * @description 컨텍스트 로거 생성 편의 함수
 * @param context 초기 컨텍스트 정보
 * @returns ContextLogger 인스턴스
 */
export const createContextLogger = (context: Record<string, unknown> = {}) => new ContextLogger(context);

/**
 * @description 로거 종료 함수 (트랜스포트 close 호출)
 * @param l 종료할 로거 (기본: 전역 logger)
 */
export function closeLogger(l: winston.Logger = logger) {
  for (const t of l.transports) {
    if (typeof t.close === 'function') t.close();
  }
}

// 프로세스 종료 시 로거 닫기 처리
process.on('SIGTERM', () => {
  closeLogger();
});
process.on('SIGINT', () => {
  closeLogger();
});
