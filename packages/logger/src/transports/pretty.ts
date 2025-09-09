/**
 * Description : pretty.ts - 📌 색상과 형식을 꾸며서 콘솔로 출력하는 트랜스포트 (개발용)
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */

import type { Transport, LogRecord, LogLevel, PrettyTransportOptions } from '../../logger-types.js';
import { levelWeight } from '../../logger-types.js';

// 색상 함수들
const C = {
  dim: (s: string) => `\x1b[2m${s}\x1b[0m`,
  gray: (s: string) => `\x1b[90m${s}\x1b[0m`,
  blue: (s: string) => `\x1b[34m${s}\x1b[0m`,
  green: (s: string) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s: string) => `\x1b[33m${s}\x1b[0m`,
  red: (s: string) => `\x1b[31m${s}\x1b[0m`,
  magenta: (s: string) => `\x1b[35m${s}\x1b[0m`,
};

const colorByLevel: Record<LogLevel, (s: string) => string> = {
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

export function PrettyTransport(opts: PrettyTransportOptions = {}): Transport {
  const min = levelWeight(opts.level ?? 'info');

  const ts = (r: LogRecord) => {
    const t = typeof r.time === 'number' ? new Date(r.time).toISOString() : (r.time ?? new Date().toISOString());
    return C.dim(t);
  };

  return {
    log(rec) {
      if (levelWeight(rec.level as LogLevel) < min) return;

      const levelStr = String(rec.level).toUpperCase();
      const colorFn = colorByLevel[rec.level as LogLevel] ?? ((s: string) => s);
      const lvl = colorFn(levelStr);

      const head = `${opts.withTimestamp !== false ? `[${ts(rec)}] ` : ''}${lvl}`;
      const msg = rec.msg ?? rec.message ?? '';
      const svc = rec.service ? C.dim(` (${rec.service})`) : '';
      const err = rec.error?.message ? ` - ${rec.error.message}` : '';

      if (opts.singleLine) {
        process.stdout.write(`${head} ${msg}${svc}${err}\n`);
      } else {
        process.stdout.write(`${head} ${msg}${svc}${err}\n`);

        if (rec.error?.stack) {
          process.stdout.write(C.gray(rec.error.stack) + '\n');
        }

        const rest = { ...rec };
        delete (rest as any).msg;
        delete (rest as any).message;
        delete (rest as any).error;
        delete (rest as any).level;
        delete (rest as any).time;
        delete (rest as any).service;

        const body = Object.keys(rest).length ? ' ' + C.dim(JSON.stringify(rest)) : '';
        if (body.trim()) process.stdout.write(body + '\n');
      }
    },
    async flush() { /* noop */ }
  };
}
