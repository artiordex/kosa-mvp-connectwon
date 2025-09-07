/**
 * Description : customLogger.ts - 📌 공통 Logger 유틸 (winston 기반)
 * Author : Shiwoo Min
 * Date : 2025-09-07
 */

import fs from 'fs';
import path from 'path';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

// 환경 변수
// NODE_ENV: development | production
const NODE_ENV = process.env.NODE_ENV || 'development';
// LOG_LEVEL: error | warn | info | http | verbose | debug | silly
const LOG_LEVEL = (process.env.LOG_LEVEL || 'info').toLowerCase();
// ENABLE_LOGS: true | false (개발환경에서 콘솔 로그 강제 활성화)
const ENABLE_LOGS = process.env.ENABLE_LOGS === 'true';
// LOG_TO_FILE: true | false (파일 로그 활성화)
const LOG_TO_FILE = process.env.LOG_TO_FILE === 'true';
// LOG_DIR: 로그 파일 저장 경로
const LOG_DIR = process.env.LOG_DIR || path.resolve(process.cwd(), 'logs');
// MAX_FILES: 로그 파일 보존 기간
const MAX_FILES = process.env.LOG_MAX_FILES || '7d';
// 서비스명 (로그에 포함)
const SERVICE_NAME = process.env.SERVICE_NAME || 'app';

// 디렉터리 보장
function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// 콘솔 포맷 (개발: 컬러, 운영: 심플)
const consoleFormat = NODE_ENV === 'development' || ENABLE_LOGS
  ? winston.format.combine(
      winston.format.colorize({ all: true }),
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.printf(({ level, message, timestamp, service, ...rest }) => {
        const extra = Object.keys(rest).length ? ` ${JSON.stringify(rest)}` : '';
        return `${timestamp} [${service ?? SERVICE_NAME}] ${level}: ${message}${extra}`;
      })
    )
  : winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(({ level, message, timestamp, service, ...rest }) =>
        JSON.stringify({ timestamp, level, service: service ?? SERVICE_NAME, message, ...rest })
      )
    );

// 파일 포맷(JSON)
const fileJsonFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(({ level, message, timestamp, service, ...rest }) =>
    JSON.stringify({ timestamp, level, service: service ?? SERVICE_NAME, message, ...rest })
  )
);

// 트랜스포트 구성
function buildTransports() {
  const transports: winston.transport[] = [
    new winston.transports.Console({ format: consoleFormat }),
  ];

  if (LOG_TO_FILE) {
    ensureDir(LOG_DIR);
    transports.push(
      new DailyRotateFile({
        filename: path.join(LOG_DIR, '%DATE%.json'),
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxFiles: MAX_FILES,
        format: fileJsonFormat,
      })
    );
  }

  return transports;
}

// 로거 생성 (서비스명 메타 부여)
export function createLogger(service = SERVICE_NAME): winston.Logger {
  return winston.createLogger({
    level: LOG_LEVEL,
    defaultMeta: { service },
    transports: buildTransports(),
  });
}

// 기본 로거 (환경변수 SERVICE_NAME 사용)
export const logger = createLogger();

// morgan 연동용 스트림 (선택)
export const httpStream = {
  write: (msg: string) => logger.http?.(msg.trim()),
};
