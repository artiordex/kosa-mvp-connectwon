/**
 * Description : webhook-catcher.ts - 📌 webhook 이벤트 수집 및 처리 유틸
 * Author : Shiwoo Min
 * Date : 2025-09-09
 * 09-21 - 응답 헤더 및 에러 처리 추가, JSON 파싱 함수 주석 보강
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import http from 'node:http';
import { join } from 'node:path';

// 설정
const PORT = Number(process.env.WEBHOOK_PORT ?? 8787);
const OUT = process.env.WEBHOOK_OUT ?? 'artifacts/webhooks';
mkdirSync(OUT, { recursive: true });

/**
 * 안전한 JSON 파싱 함수
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

// 간단한 HTTP 서버
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

    writeFileSync(file, JSON.stringify(record, null, 2));
    console.log('webhook saved:', file);

    const internalWebhookUrl = process.env.INTERNAL_WEBHOOK_URL;
    if (internalWebhookUrl) {
      await fetch(internalWebhookUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(record),
      });
    }

    res.writeHead(200, { 'Content-Type': 'text/plain' }).end('ok');
  } catch (error) {
    console.error('Error handling webhook:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' }).end('error');
  }
});

process.on('SIGINT', () => {
  server.close(() => process.exit(0));
});

server.listen(PORT, () => console.log(`webhook-catcher listening on :${PORT}`));
