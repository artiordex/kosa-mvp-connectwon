/**
 * Description : console.ts - 📌 콘솔로 내보내는 트랜스포트
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */

import type { Transport, LogRecord, LogLevel, ConsoleTransportOptions } from '../../logger-types.js';
import { levelWeight } from '../../logger-types.js';



// 콘솔 출력 트랜스포트
export function ConsoleTransport(opts: ConsoleTransportOptions = {}): Transport {
  const min = levelWeight(opts.level ?? 'info');
  const errMin = levelWeight(opts.stderrLevel ?? 'error');

  const toLine = (r: LogRecord) =>
    opts.json
      ? JSON.stringify(r)
      : `[${typeof r.time === 'number' ? new Date(r.time).toISOString() : r.time ?? ''}] ${String(r.level).toUpperCase()} ${r.msg ?? r.message ?? ''}`;

  return {
    log(rec) {
      const w = levelWeight(rec.level as LogLevel);
      if (w < min) return;
      const line = toLine(rec) + '\n';
      (w >= errMin ? process.stderr : process.stdout).write(line);
    },
    async flush() { /* noop */ }
  };
}
