/**
 * Description : console.ts - 📌 콘솔로 내보내는 트랜스포트
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import type { ConsoleTransportOptions, LogLevel, LogRecord, Transport } from '@connectwon/logger/logger-types';
import { levelWeight } from '@connectwon/logger/logger-types';

/**
 * @description 콘솔 출력용 트랜스포트 생성 함수
 * @param opts 콘솔 트랜스포트 옵션 (로그 레벨, JSON 출력 여부 등)
 * @returns Transport 인터페이스 구현체
 */
export function ConsoleTransport(opts: ConsoleTransportOptions = {}): Transport {
  const min = levelWeight(opts.level ?? 'info'); // 출력 최소 레벨 가중치
  const errMin = levelWeight(opts.stderrLevel ?? 'error'); // stderr 출력 최소 레벨 가중치

  // 로그 레코드 → 문자열 변환 함수
  const toLine = (r: LogRecord) =>
    opts.json
      ? JSON.stringify(r) // JSON 형태 출력 시
      : `[${typeof r.time === 'number' ? new Date(r.time).toISOString() : (r.time ?? '')}] ${String(r.level).toUpperCase()} ${r.msg ?? r.message ?? ''}`;

  return {
    log(rec) {
      const w = levelWeight(rec.level as LogLevel);
      if (w < min) return; // 설정 레벨보다 낮으면 무시
      const line = toLine(rec) + '\n';
      (w >= errMin ? process.stderr : process.stdout).write(line); // 에러 레벨 이상은 stderr
    },

    // stdout/stderr 버퍼가 비워질 때까지 보장 (운영환경 flush 대응)
    async flush() {
      return new Promise<void>((resolve, reject) => {
        let pending = 2;

        const done = (err?: Error | null) => {
          if (err) {
            reject(err);
            return;
          }
          if (--pending === 0) resolve();
        };

        process.stdout.write('', done);
        process.stderr.write('', done);
      });
    },
  };
}
