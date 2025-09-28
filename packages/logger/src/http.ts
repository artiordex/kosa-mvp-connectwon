/**
 * Description : http.ts - 📌 HTTP 엔드포인트로 배치 전송하는 트랜스포트
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import { levelWeight } from '@connectwon/logger/logger-types';
import type { HttpTransportOptions, LogLevel, LogRecord, Transport } from '@connectwon/logger/logger-types';

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

  // 내부 배치 flush 함수
  const flushBatch = async () => {
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
        // 실패 시 다시 큐에 삽입 (단, 무한루프 방지 로직은 필요 시 추가)
        queue.unshift(...batch);
      }
    } catch {
      // 네트워크 에러 시도 동일
      queue.unshift(...batch);
    } finally {
      flushing = false;
    }
  };

  const timer = setInterval(() => {
    flushBatch();
  }, intervalMs);

  // Node.js에서는 프로세스 종료 방해하지 않게
  if (typeof timer.unref === 'function') {
    timer.unref();
  }

  return {
    log(rec) {
      if (levelWeight(rec.level as LogLevel) < min) return;
      queue.push(rec);
      if (queue.length >= batchSize) {
        void flushBatch();
      }
    },
    async flush() {
      await flushBatch();
    },
    async close() {
      clearInterval(timer);
      await flushBatch(); // 종료 시 남은 로그 강제 전송
    },
  };
}
