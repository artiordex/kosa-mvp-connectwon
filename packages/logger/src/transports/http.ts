/**
 * Description : http.ts - 📌 HTTP 엔드포인트로 배치 전송하는 트랜스포트
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */

// 로그를 HTTP 엔드포인트로 배치 전송
import type { Transport, LogRecord, LogLevel, HttpTransportOptions } from '../../logger-types.js';
import { levelWeight } from '../../logger-types.js';

export function HttpTransport(opts: HttpTransportOptions): Transport {
  const min = levelWeight(opts.level ?? 'info');
  const batchSize = opts.batchSize ?? 20;
  const intervalMs = opts.intervalMs ?? 1000;
  const fetchFn = opts.fetchImpl ?? fetch;

  const queue: LogRecord[] = [];
  let flushing = false;

  const timer = setInterval(() => flush(), intervalMs);

  const flush = async () => {
    if (flushing || queue.length === 0) return;
    flushing = true;

    const batch = queue.splice(0, batchSize);
    try {
      const res = await fetchFn(opts.endpoint, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          ...(opts.headers ?? {})
        },
        body: JSON.stringify(batch),
      });

      if (!res.ok) {
        // 실패시 큐 앞에 다시 넣기
        queue.unshift(...batch);
      }
    } catch (error) {
      // 에러시 큐 앞에 다시 넣기
      queue.unshift(...batch);
    } finally {
      flushing = false;
    }
  };

  return {
    log(rec) {
      if (levelWeight(rec.level as LogLevel) < min) return;
      queue.push(rec);
      if (queue.length >= batchSize) flush();
    },

    async flush() {
      await flush();
    },

    close() {
      clearInterval(timer);
    }
  };
}
