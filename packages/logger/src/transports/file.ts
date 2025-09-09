/**
 * Description : file.ts - 📌 파일에 NDJSON으로 기록하는 트랜스포트
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */

import * as fsSync from 'node:fs';          // WriteStream 생성용
import { promises as fsp } from 'node:fs';   // fs.promises (open/sync/close)
import path from 'node:path';
import type { WriteStream } from 'node:fs';
import type { Transport, LogRecord, FileTransportOptions } from '../../logger-types.js';
import { levelWeight } from '../../logger-types.js';

// 디렉터리 보장
function ensureDir(dir: string) {
  if (!fsSync.existsSync(dir)) fsSync.mkdirSync(dir, { recursive: true });
}

// 파일 출력 트랜스포트
export function FileTransport(opts: FileTransportOptions): Transport {
  const min = levelWeight(opts.level ?? 'info');
  const prefix = opts.prefix ?? 'app';
  const rotate = opts.rotate ?? 'daily';
  ensureDir(opts.dir);

  // 현재 스트림/파일경로 상태
  let stream: WriteStream | null = null;
  let currentPath = '';

  // YYYY-MM-DD (daily) 또는 'static'
  const keyForNow = () => (rotate === 'daily' ? new Date().toISOString().slice(0, 10) : 'static');

  // 스트림 준비/교체
  function ensureStream() {
    const key = keyForNow();
    const filename = rotate === 'daily' ? `${prefix}-${key}.ndjson` : `${prefix}.ndjson`;
    const full = path.join(opts.dir, filename);
    if (stream && currentPath === full) return; // 동일 파일이면 유지
    stream?.end();                              // 기존 스트림 종료
    stream = fsSync.createWriteStream(full, { flags: 'a' }); // append 모드
    currentPath = full;                         // 현재 파일 경로 저장
  }

  // 안전 플러시: drain 필요 시 대기 → 파일 핸들을 열어 sync (fd 의존 X)
  async function flushImpl() {
    if (!stream) return;
    await new Promise<void>((res) =>
      stream!.writableNeedDrain ? stream!.once('drain', res) : res()
    );
    if (currentPath) {
      const fh = await fsp.open(currentPath, 'a'); // 동일 파일 잠깐 열기
      try {
        await fh.sync();                            // 디스크 동기화
      } finally {
        await fh.close();                           // 핸들 닫기
      }
    }
  }

  return {
    log(rec: LogRecord) {
      if (levelWeight(rec.level as string) < min) return;
      ensureStream();
      // NDJSON 한 줄
      stream!.write(JSON.stringify(rec) + '\n');
    },
    async flush() {
      await flushImpl();
    },
    close() {
      stream?.end();
      stream = null;
    },
  };
}
