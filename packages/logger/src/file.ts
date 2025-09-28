/**
 * Description : file.ts - 📌 파일에 NDJSON으로 기록하는 트랜스포트
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import * as fsSync from 'node:fs';
import { promises as fsp } from 'node:fs';
import type { WriteStream } from 'node:fs';
import path from 'node:path';
import type { FileTransportOptions, LogRecord, Transport } from '@connectwon/logger/logger-types';
import { levelWeight } from '@connectwon/logger/logger-types';

/**
 * @description 디렉터리 존재 확인 및 없으면 생성
 * @param dir 디렉터리 경로
 */
function ensureDir(dir: string) {
  if (!fsSync.existsSync(dir)) fsSync.mkdirSync(dir, { recursive: true });
}

/**
 * @description 파일 출력용 NDJSON 트랜스포트 생성 함수
 * @param opts 파일 트랜스포트 옵션 (저장 경로, 회전 정책 등)
 * @returns Transport 인터페이스 구현체
 */
export function FileTransport(opts: FileTransportOptions): Transport {
  const min = levelWeight(opts.level ?? 'info');
  const prefix = opts.prefix ?? 'app';
  const rotate = opts.rotate ?? 'daily';
  ensureDir(opts.dir);

  let stream: WriteStream | null = null;
  let currentPath = '';

  // 현재 날짜를 키로 사용 (daily) 또는 고정(static)
  const keyForNow = () => (rotate === 'daily' ? new Date().toISOString().slice(0, 10) : 'static');

  // 스트림 신규 생성 또는 교체
  function ensureStream() {
    const key = keyForNow();
    const filename = rotate === 'daily' ? `${prefix}-${key}.ndjson` : `${prefix}.ndjson`;
    const full = path.join(opts.dir, filename);

    // 이미 같은 파일 쓰고 있으면 유지
    if (stream && currentPath === full) return;

    // 이전 스트림 종료
    stream?.end();

    // 새 스트림 열기 (에러 핸들링)
    stream = fsSync.createWriteStream(full, { flags: 'a' });
    stream.on('error', err => {
      console.error(`[FileTransport] stream error: ${err.message}`);
    });

    currentPath = full;
  }

  // 안전한 flush: drain 이벤트 대기 + 파일 동기화
  async function flushImpl() {
    if (!stream) return;
    await new Promise<void>((resolve, reject) => {
      if (stream!.writableNeedDrain) {
        stream!.once('drain', (err?: Error) => {
          if (err) reject(err);
          else resolve();
        });
      } else {
        resolve();
      }
    });
    if (currentPath) {
      const fh = await fsp.open(currentPath, 'a');
      try {
        await fh.sync();
      } finally {
        await fh.close();
      }
    }
  }

  return {
    log(rec: LogRecord) {
      if (levelWeight(rec.level as string) < min) return;
      ensureStream();
      try {
        stream!.write(JSON.stringify(rec) + '\n');
      } catch (err) {
        console.error(`[FileTransport] write error: ${(err as Error).message}`);
      }
    },

    async flush() {
      await flushImpl();
    },

    async close() {
      if (stream) {
        await flushImpl();
        stream.end();
        stream = null;
      }
    },
  };
}
