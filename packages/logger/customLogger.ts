/**
 * Description : customLogger.ts - 📌 공통 Logger 유틸 (winston 기반)
 * Author : Shiwoo Min
 * Date : 2025-09-08
 */

import fs from 'fs'
import path from 'path'
import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

// pnpm add -D tsconfig-paths
import { logConfig, isDevelopment } from '../../connectwon-env'

// 디렉터리 보장
function ensureDir(dir: string): void {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

// 공통 베이스 포맷: 에러 스택, printf %o, 타임스탬프
const baseFormats = [
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
]

// 개발용 콘솔 포맷(컬러)
const devConsoleFormat = winston.format.combine(
  ...baseFormats,
  winston.format.colorize({ all: true }),
  winston.format.printf((info: any) => {
    const { level, message, timestamp, service, ...rest } = info
    const extra = Object.keys(rest).length ? ` ${JSON.stringify(rest)}` : ''
    return `${timestamp} [${service ?? logConfig.serviceName}] ${level}: ${message}${extra}`
  })
)

// 운영/스테이징 콘솔 포맷(JSON)
const prodConsoleFormat = winston.format.combine(
  ...baseFormats,
  winston.format.printf((info: any) =>
    JSON.stringify({
      timestamp: info.timestamp,
      level: info.level,
      service: info.service ?? logConfig.serviceName,
      message: info.message,
      ...info,
    })
  )
)

// 파일(JSON) 포맷
const fileJsonFormat = winston.format.combine(
  ...baseFormats,
  winston.format.printf((info: any) =>
    JSON.stringify({
      timestamp: info.timestamp,
      level: info.level,
      service: info.service ?? logConfig.serviceName,
      message: info.message,
      ...info,
    })
  )
)

// 트랜스포트 구성 (명시적 타입 제거 → winston-transport 설치 불필요)
function buildTransports() {
  const transports: any[] = []

  // 콘솔: ENABLE_LOGS=false면 조용히(silent)
  transports.push(
    new winston.transports.Console({
      silent: !logConfig.enableLogs,
      level: logConfig.level,
      format: isDevelopment() ? devConsoleFormat : prodConsoleFormat,
    })
  )

  if (logConfig.logToFile) {
    ensureDir(logConfig.logDir)

    // 일자별 JSON 로그
    transports.push(
      new DailyRotateFile({
        filename: path.join(logConfig.logDir, '%DATE%.json'),
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxFiles: logConfig.maxFiles, // e.g. '7d'
        maxSize: '20m',
        level: logConfig.level,
        format: fileJsonFormat,
      }) as any
    )

    // 에러 전용 파일
    transports.push(
      new winston.transports.File({
        filename: path.join(logConfig.logDir, 'errors.log'),
        level: 'error',
        maxsize: 5 * 1024 * 1024, // 5MB
        maxFiles: 5,
        format: fileJsonFormat,
      })
    )
  }

  return transports
}

// 로거 생성
export function createLogger(service: string = logConfig.serviceName): winston.Logger {
  const logger = winston.createLogger({
    // npm 레벨: error,warn,info,http,verbose,debug,silly
    levels: winston.config.npm.levels,
    level: logConfig.level,
    defaultMeta: { service, pid: process.pid },
    transports: buildTransports(),
    exceptionHandlers: logConfig.logToFile
      ? [
          new winston.transports.File({
            filename: path.join(logConfig.logDir, 'exceptions.log'),
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
          }),
        ]
      : [],
    rejectionHandlers: logConfig.logToFile
      ? [
          new winston.transports.File({
            filename: path.join(logConfig.logDir, 'rejections.log'),
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
          }),
        ]
      : [],
    exitOnError: false,
  })

  if (isDevelopment()) {
    logger.debug(`Logger initialized for service: ${service}`, {
      level: logger.level,
      logToFile: logConfig.logToFile,
      logDir: logConfig.logDir,
    })
  }

  return logger
}

// 기본 인스턴스
export const logger = createLogger()

// Express morgan 연동용 스트림
export const httpStream = {
  write: (message: string) => {
    logger.http(message.trim())
  },
}

// 편의 래퍼
export const log = {
  error: (message: string, meta?: any) => logger.error(message, meta),
  warn: (message: string, meta?: any) => logger.warn(message, meta),
  info: (message: string, meta?: any) => logger.info(message, meta),
  http: (message: string, meta?: any) => logger.http(message, meta),
  verbose: (message: string, meta?: any) => logger.verbose(message, meta),
  debug: (message: string, meta?: any) => logger.debug(message, meta),
  silly: (message: string, meta?: any) => logger.silly(message, meta),
}

// 컨텍스트 로거
type Level = 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly'

export class ContextLogger {
  private base: winston.Logger
  private ctx: Record<string, any>

  constructor(context: Record<string, any> = {}, baseLogger?: winston.Logger) {
    this.base = baseLogger || logger
    this.ctx = context
  }

  // 🔧 여기서 level을 string으로 캐스팅 → "keyof NpmConfigSetLevels" 오류 회피
  private logWith(level: Level, message: string, meta: any = {}) {
    this.base.log(level as string, message, { ...this.ctx, ...meta })
  }

  error(message: string, meta?: any) { this.logWith('error', message, meta) }
  warn(message: string, meta?: any) { this.logWith('warn', message, meta) }
  info(message: string, meta?: any) { this.logWith('info', message, meta) }
  http(message: string, meta?: any) { this.logWith('http', message, meta) }
  verbose(message: string, meta?: any) { this.logWith('verbose', message, meta) }
  debug(message: string, meta?: any) { this.logWith('debug', message, meta) }
  silly(message: string, meta?: any) { this.logWith('silly', message, meta) }

  child(extra: Record<string, any>) {
    return new ContextLogger({ ...this.ctx, ...extra }, this.base)
  }
}

export const createContextLogger = (context: Record<string, any> = {}) => new ContextLogger(context)
