/**
 * Description : http.ts - 📌 HTTP 엔드포인트로 배치 전송하는 트랜스포트
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import { levelWeight } from '../logger-types.js';
import type { HttpTransportOptions, LogLevel, LogRecord, Transport } from '../logger-types.js';

/**
 * @description HTTP 엔드포인트로 로그를 배치 전송하는 트랜스포트 생성 함수
 * @param opts HTTP 트랜스포트 옵션 (엔드포인트, 배치 크기, 전송 인터벌 등)
 * @returns Transport 인터페이스 구현체
 */
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
          ...(opts.headers ?? {}),
        },
        body: JSON.stringify(batch),
      });
      if (!res.ok) {
        queue.unshift(...batch); // 실패 시 다시 큐에 삽입
      }
    } catch (error) {
      queue.unshift(...batch); // 에러 시 다시 큐에 삽입
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
    },
  };
}
