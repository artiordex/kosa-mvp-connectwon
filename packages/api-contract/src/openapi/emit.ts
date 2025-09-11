/**
 * Description : emit.ts - 📌 OpenAPI 문서화 관련 타입정의
 * Author : Shiwoo Min
 * Date : 2025-09-11
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

import { document } from './document.js';

export interface EmitOptions {
  outFile?: string; // 기본: dist/openapi.json
  pretty?: number | false; // 2 | false
}

export async function emitOpenApi(opts: EmitOptions = {}): Promise<string> {
  const outFile = opts.outFile ?? 'dist/openapi.json';
  const pretty = opts.pretty ?? 2;

  const abs = resolve(outFile);
  await mkdir(dirname(abs), { recursive: true });

  const json = pretty === false ? JSON.stringify(document) : JSON.stringify(document, null, pretty);

  await writeFile(abs, json, 'utf8');
  return abs;
}
