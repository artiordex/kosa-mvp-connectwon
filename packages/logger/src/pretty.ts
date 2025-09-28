/**
 * Description : pretty.ts - 📌 색상과 형식을 꾸며서 콘솔로 출력하는 트랜스포트 (개발용)
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import type { LogLevel, LogRecord, PrettyTransportOptions, Transport } from '@connectwon/logger/logger-types';
import { levelWeight } from '@connectwon/logger/logger-types';

/**
 * @description ANSI 컬러 유틸
 */
const wrap = (code: number) => (s: string) => `\x1b[${code}m${s}\x1b[0m`;
const C = {
  dim: wrap(2),
  gray: wrap(90),
  blue: wrap(34),
  green: wrap(32),
  yellow: wrap(33),
  red: wrap(31),
  magenta: wrap(35),
};

/**
 * @description 로그 레벨별 컬러 매핑
 */
const colorByLevel: Record<string, (s: string) => string> = {
  trace: C.gray,
  debug: C.blue,
  info: C.green,
  warn: C.yellow,
  error: C.red,
  fatal: C.magenta,
  http: C.blue,
  verbose: C.gray,
  silly: C.dim,
};

/**
 * @description 콘솔에 색상 및 형식 꾸며서 출력하는 트랜스포트 (개발 전용)
 */
export function PrettyTransport(opts: PrettyTransportOptions = {}): Transport {
  const min = levelWeight(opts.level ?? 'info');

  // 타임스탬프 문자열 생성
  const ts = (r: LogRecord) => {
    const t = typeof r.time === 'number' ? new Date(r.time).toISOString() : (r.time ?? new Date().toISOString());
    return C.dim(t);
  };

  return {
    log(rec) {
      if (levelWeight(rec.level as LogLevel) < min) return;

      const levelStr = String(rec.level ?? '').toUpperCase();
      const colorFn = colorByLevel[rec.level as string] ?? ((s: string) => s);
      const lvl = colorFn(levelStr);

      const head = `${opts.withTimestamp !== false ? `[${ts(rec)}] ` : ''}${lvl}`;
      const msg = rec.msg ?? rec.message ?? '';
      const svc = rec.service ? C.dim(` (${rec.service})`) : '';
      const err = rec.error?.message ? ` - ${rec.error.message}` : '';

      // 단일 라인 모드
      if (opts.singleLine) {
        process.stdout.write(`${head} ${msg}${svc}${err}\n`);
        return;
      }

      // 기본 출력
      process.stdout.write(`${head} ${msg}${svc}${err}\n`);

      // 에러 스택 (회색 처리, 줄바꿈 포함)
      if (rec.error?.stack) {
        const indented = rec.error.stack
          .split('\n')
          .map(line => C.gray('  ' + line))
          .join('\n');
        process.stdout.write(indented + '\n');
      }

      // 나머지 필드 출력
      const rest = { ...rec };
      delete (rest as any).msg;
      delete (rest as any).message;
      delete (rest as any).error;
      delete (rest as any).level;
      delete (rest as any).time;
      delete (rest as any).service;

      if (Object.keys(rest).length) {
        process.stdout.write(' ' + C.dim(JSON.stringify(rest)) + '\n');
      }
    },
    async flush() {
      if (!process.stdout.writableNeedDrain) return;
      await new Promise<void>(res => process.stdout.once('drain', res));
    },
  };
}
