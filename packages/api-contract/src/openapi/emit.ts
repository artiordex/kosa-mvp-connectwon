/**
 * Description : emit.ts - 📌 OpenAPI 문서화 관련 타입정의
 * Author : Shiwoo Min
 * Date : 2025-09-11
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

import { document } from './document.js';

// OpenAPI 문서 생성 옵션
export interface EmitOptions {
  outFile?: string;
  pretty?: number | false;
}

// OpenAPI 문서 생성 함수
export async function emitOpenApi(opts: EmitOptions = {}): Promise<string> {
  // 출력 파일 경로 및 포맷 옵션 설정
  const outFile = opts.outFile ?? 'dist/openapi.json';
  // 포맷팅 옵션 설정
  const pretty = opts.pretty ?? 2;
  // 절대 경로로 변환
  const abs = resolve(outFile);
  // 디렉토리 생성
  await mkdir(dirname(abs), { recursive: true });
  // JSON 문자열 생성
  const json = pretty === false ? JSON.stringify(document) : JSON.stringify(document, null, pretty);
  // 파일 쓰기
  await writeFile(abs, json, 'utf8');
  return abs;
}
