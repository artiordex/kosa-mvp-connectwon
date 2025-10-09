/**
 * Description : webhook-catcher.ts - 📌 webhook 이벤트 수집 및 처리 유틸
 * Author : Shiwoo Min
 * Date : 2025-09-09
 * 09-21 - 응답 헤더 및 에러 처리 추가, JSON 파싱 함수 주석 보강
 * 10-09 - 절대경로 및 CloudRun 호환, fetch fallback, graceful shutdown 개선
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import http from 'node:http';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';


// 설정
const __dirname = resolve(fileURLToPath(import.meta.url), '..');
const PORT = Number(process.env.WEBHOOK_PORT ?? 8787);
const OUT = resolve(process.cwd(), process.env.WEBHOOK_OUT ?? 'artifacts/webhooks');

// 디렉터리 생성
mkdirSync(OUT, { recursive: true });

/**
 * @description 안전한 JSON 파싱 함수
 * @param s 파싱할 문자열
 * @returns 파싱된 객체 또는 원본 문자열
 */
function tryParse(s: string) {
  try {
    return JSON.parse(s);
  } catch {
    return s;
  }
}

// HTTP 서버 정의
const server = http.createServer(async (req, res) => {
  const chunks: Buffer[] = [];

  try {
    for await (const c of req) chunks.push(c as Buffer);

    const body = Buffer.concat(chunks).toString('utf-8');
    const ts = new Date().toISOString().replace(/[:.]/g, '-');
    const safeUrl = (req.url ?? '/').replace(/[^\w-]/g, '_');
    const file = join(OUT, `${ts}-${safeUrl}.json`);

    const record = {
      ts,
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: tryParse(body),
    };

    // 파일 저장
    writeFileSync(file, JSON.stringify(record, null, 2));
    console.log(`[webhook] saved: ${file}`);

    // 내부 webhook 전달 (옵션)
    const internalWebhookUrl = process.env.INTERNAL_WEBHOOK_URL;
    if (internalWebhookUrl && typeof fetch === 'function') {
      try {
        await fetch(internalWebhookUrl, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(record),
        });
      } catch (err) {
        console.warn('[webhook] internal forward failed:', err);
      }
    }

    res.writeHead(200, { 'Content-Type': 'text/plain' }).end('ok');
  } catch (error) {
    console.error('[webhook] Error handling request:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' }).end('error');
  }
});


// 종료 처리
process.on('SIGINT', () => {
  console.log('[webhook] SIGINT received, shutting down...');
  server.close(() => process.exit(0));
});

process.on('SIGTERM', () => {
  console.log('[webhook] SIGTERM received, shutting down...');
  server.close(() => process.exit(0));
});

// 실행
server.listen(PORT, () =>
  console.log(`[webhook] listening on port ${PORT} → output: ${OUT}`),
);
