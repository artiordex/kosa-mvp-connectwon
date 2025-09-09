/**
 * Description : webhook-catcher.ts - 📌 webhook 이벤트 수집 및 처리 유틸
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */

import http from 'node:http';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// 설정
const PORT = Number(process.env.WEBHOOK_PORT ?? 8787);
const OUT = process.env.WEBHOOK_OUT ?? 'artifacts/webhooks';
mkdirSync(OUT, { recursive: true });

// 간단한 HTTP 서버
const server = http.createServer(async (req, res) => {
  const chunks: Buffer[] = [];
  for await (const c of req) chunks.push(c as Buffer);
  const body = Buffer.concat(chunks).toString('utf-8');
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  const file = join(OUT, `${ts}-${(req.url ?? '/').replace(/[^\w-]/g, '_')}.json`);
  const record = {
    ts,
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: tryParse(body),
  };

  writeFileSync(file, JSON.stringify(record, null, 2));
  console.log('webhook saved:', file);

  // 필요하면 내부 API로 relay
  // await fetch('http://localhost:4000/internal/webhook', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(record) });

  res.writeHead(200).end('ok');
});

// 안전한 JSON 파싱
function tryParse(s: string) { try { return JSON.parse(s); } catch { return s; } }

process.on('SIGINT', () => { server.close(() => process.exit(0)); });
server.listen(PORT, () => console.log(`webhook-catcher listening on :${PORT}`));



