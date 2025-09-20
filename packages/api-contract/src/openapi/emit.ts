/**
 * Description : emit.ts - 📌 OpenAPI 문서화 관련 타입정의
 * Author : Shiwoo Min
 * Date : 2025-09-11
 * 09-21 - 주석 보강
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

import { document } from './document.js';

export interface EmitOptions {
  outFile?: string;
  pretty?: number | false;
}

/**
 * @description OpenAPI 문서 JSON 파일 생성 함수
 * @param opts 생성 옵션 { outFile?: string, pretty?: number | false }
 * @returns 생성된 파일 절대 경로 문자열
 */
export async function emitOpenApi(opts: EmitOptions = {}): Promise<string> {
  const DEFAULT_OUT_FILE = 'dist/openapi.json';

  const outFile = opts.outFile ?? DEFAULT_OUT_FILE;
  /** pretty가 숫자일 경우 공백 수, false면 무포맷 */
  const pretty = opts.pretty ?? 2;

  try {
    const abs = resolve(outFile);
    await mkdir(dirname(abs), { recursive: true });
    const json = pretty === false ? JSON.stringify(document) : JSON.stringify(document, null, pretty);
    await writeFile(abs, json, 'utf8');
    return abs;
  } catch (error) {
    console.error('OpenAPI 문서 생성 중 오류 발생:', error);
    throw error;
  }
}
