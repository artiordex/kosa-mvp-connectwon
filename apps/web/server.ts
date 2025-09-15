/**
 * Description : server.ts - 📌 Next.js 커스텀 서버 (TypeScript)
 * Author : Shiwoo Min
 * Date : 2025-09-16
 */
import http, { IncomingMessage, ServerResponse } from 'http';
import next from 'next';

const PORT = Number(process.env.PORT || process.env.WEB_PORT || 3000);
const HOST = process.env.HOST || '0.0.0.0';
const NODE_ENV = process.env.NODE_ENV || 'production';
const isDev = NODE_ENV !== 'production';

const app = next({ dev: isDev });
const handle = app.getRequestHandler();

// 레디 상태 플래그
let isReady = false;

function sendText(res: ServerResponse, code: number, text: string) {
  res.statusCode = code;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end(text);
}

function requestListener(req: IncomingMessage, res: ServerResponse) {
  const url = new URL(req.url || '/', `http://${req.headers.host}`);

  // Liveness
  if (url.pathname === '/health') {
    return sendText(res, 200, 'ok');
  }

  // Readiness
  if (url.pathname === '/ready') {
    return sendText(res, isReady ? 200 : 503, isReady ? 'ready' : 'not-ready');
  }

  // 나머지는 Next로 처리
  return handle(req, res);
}

app
  .prepare()
  .then(() => {
    const server = http.createServer(requestListener);

    server.listen(PORT, HOST, () => {
      isReady = true;
      // eslint-disable-next-line no-console
      console.log(`[web] Next server running on http://${HOST}:${PORT} (env=${NODE_ENV})`);
    });

    // 그레이스풀 셧다운
    const shutdown = (signal: string) => {
      // eslint-disable-next-line no-console
      console.log(`[web] received ${signal}, shutting down...`);
      isReady = false;
      server.close(err => {
        if (err) {
          // eslint-disable-next-line no-console
          console.error('[web] close error:', err);
          process.exit(1);
        }
        process.exit(0);
      });

      // 안전장치: 10초 후 강제 종료
      setTimeout(() => {
        // eslint-disable-next-line no-console
        console.warn('[web] force exit after timeout');
        process.exit(1);
      }, 10_000).unref();
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error('[web] bootstrap error:', err);
    process.exit(1);
  });
