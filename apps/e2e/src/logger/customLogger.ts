/**
 * Description : customLogger.ts - 📌 공통 Logger 적용/winston 방식
 * Author : Shiwoo Min
 * Date : 2025-04-14
 * - 04/10 병력 실행 안전성 확보
 * - 04/14 정규식 추가(파일명, 라인번호)
 */
import { POC_RESULT_PATHS, TEST_RESULT_FILE_NAME } from '@common/constants/PathConstants';
import { POCEnv } from '@common/utils/env/POCEnv';
import fs from 'fs';
import path from 'path';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

// 로그 레벨 정의
export const LOG_LEVELS: { level: string; priority: number }[] = [
  { level: 'error', priority: 0 },
  { level: 'warn', priority: 1 },
  { level: 'info', priority: 2 },
  { level: 'http', priority: 3 },
  { level: 'verbose', priority: 4 },
  { level: 'debug', priority: 5 },
  { level: 'silly', priority: 6 },
];

// Map 형태로 변환
export const LOG_LEVELS_MAP = new Map(LOG_LEVELS.map(({ level, priority }) => [level, priority]));

const VALID_LOG_LEVELS = new Set(LOG_LEVELS.map(l => l.level));
const LOG_LEVEL = VALID_LOG_LEVELS.has(process.env.LOG_LEVEL ?? '')
  ? process.env.LOG_LEVEL!
  : 'info';
const ENABLE_LOGS = process.env.ENABLE_LOGS === 'true';

// 커스텀 포맷터 (POC 표시)
const createSimpleFormatter = (poc: string): winston.Logform.Format =>
  winston.format.combine(
    winston.format(info => {
      const stack =
        (info._stack as string | undefined)?.split('\n') ?? new Error().stack?.split('\n') ?? [];

      const userLine = stack.find(
        line =>
          line.includes('at ') &&
          !line.includes('node_modules') &&
          !line.includes('internal') &&
          !line.includes('customLogger') &&
          !line.includes('Logger') &&
          !line.includes('winston'),
      );
      const match =
        // (full/path/File.ts:line:col)
        userLine?.match(/\((?:.*\/)?([^/]+\.ts|js):(\d+):(\d+)\)/) ||
        // at full/path/File.ts:line:col
        userLine?.match(/at .*\/([^/]+\.ts|js):(\d+):(\d+)/);

      const fileName = match?.[1] || 'unknown.ts';
      const line = match?.[2] || '0';

      info.callsite = `${fileName}:${line}`;
      return info;
    })(),
    winston.format.printf(({ level, message, timestamp, callsite }) => {
      return `${timestamp} [${poc.toUpperCase()}] ${level.toUpperCase()} (${callsite}): ${message}`;
    }),
  );

const jsonFormatter = winston.format.printf(({ level, message, timestamp }) => {
  return JSON.stringify({ timestamp, level, message });
});

// 디렉토리 업케이드 검증
const ensureDirectoryExists = (filePath: string) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

/**
 * POC별 싱글턴 Logger 관리 클래스
 */
export class Logger {
  private static instances: Map<string, winston.Logger> = new Map();

  // 오버로드 시그니처
  public static getLogger(poc: 'all'): Record<string, winston.Logger>;
  public static getLogger(poc: string): winston.Logger;
  public static getLogger(poc: string): winston.Logger | Record<string, winston.Logger> {
    if (!poc) throw new Error(`[Logger] poc 값이 누락되었습니다.`);

    if (poc === 'all') {
      const allLoggers: Record<string, winston.Logger> = {};
      for (const value of POCEnv.getPOCList()) {
        allLoggers[value] = Logger.getLogger(value);
      }
      return allLoggers;
    }

    if (Logger.instances.has(poc)) {
      return Logger.instances.get(poc)!;
    }

    const resultPaths = POC_RESULT_PATHS(poc);
    const resultFiles = TEST_RESULT_FILE_NAME(poc);

    const logDir = resultPaths.log?.find(dir => dir.includes('logs'));
    const logFile = resultFiles.log?.find(file => file.endsWith('.json'));

    if (!logDir || !logFile) {
      throw new Error(`[Logger] '${poc}'의 로그 경로 또는 파일이 정의되지 않았습니다.`);
    }
    ensureDirectoryExists(logFile);

    const fileTransports: winston.transport[] = Object.values(resultFiles)
      .flat()
      .map(
        fp =>
          new winston.transports.File({
            filename: fp,
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
          }),
      );

    const rotateTransport = new DailyRotateFile({
      filename: path.join(logDir, '%DATE%.json'),
      datePattern: 'YYYY-MM-DD',
      maxFiles: '7d',
      zippedArchive: true,
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    });

    const transports: winston.transport[] = [
      new winston.transports.Console({
        format:
          ENABLE_LOGS || process.env.NODE_ENV === 'development'
            ? winston.format.combine(winston.format.timestamp(), createSimpleFormatter(poc))
            : winston.format.simple(),
      }),
      ...fileTransports,
      rotateTransport,
    ];

    const logger = winston.createLogger({
      level: LOG_LEVEL,
      levels: Object.fromEntries(LOG_LEVELS.map(({ level, priority }) => [level, priority])),
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        jsonFormatter,
      ),
      transports,
      defaultMeta: { poc },
    });

    Logger.instances.set(poc, logger);
    return logger;
  }

  public static initAllLoggers(): void {
    for (const poc of POCEnv.getPOCList()) {
      Logger.getLogger(poc);
    }
  }

  public static clear(): void {
    Logger.instances.clear();
  }
}
