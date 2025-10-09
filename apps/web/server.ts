/**
 * Description : server.ts - 📌 Next.js 커스텀 서버 (TypeScript)
 * Author : Shiwoo Min
 * Date : 2025-09-16
 *
 * Note :
 *  - Docker / Cloud Run / Firebase / Azure / Local 완전 호환
 *  - /health, /ready 헬스체크 및 graceful shutdown 포함
 *  - 빌드 시 tsc --outDir dist/apps/web && node dist/apps/web/server.js 로 실행 가능
 */
import http, { IncomingMessage, ServerResponse } from 'http';
import next from 'next';
import process from 'node:process'; // ✅ Node 런타임 안전참조 추가 (Vercel/Firebase 런타임 대응)

const PORT = Number(process.env.PORT || process.env.WEB_PORT || 3000);
const HOST = process.env.HOST || '0.0.0.0';
const NODE_ENV = process.env.NODE_ENV || 'production';
const isDev = NODE_ENV !== 'production';

// Cloud Run / Docker 감지 로그 (optional)
const DEPLOY_ENV =
  process.env.FIREBASE === 'true'
    ? 'firebase'
    : process.env.CLOUD_RUN === 'true'
    ? 'cloud-run'
    : process.env.DOCKER === 'true'
    ? 'docker'
    : 'local';

const app = next({ dev: isDev });
const handle = app.getRequestHandler();

// 레디 상태 플래그
let isReady = false;

/** 단순 텍스트 응답 유틸 */
function sendText(res: ServerResponse, code: number, text: string) {
  res.statusCode = code;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end(text);
}

/** 요청 핸들러 */
function requestListener(req: IncomingMessage, res: ServerResponse) {
  const url = new URL(req.url || '/', `http://${req.headers.host}`);

  // Liveness probe
  if (url.pathname === '/health') {
    return sendText(res, 200, 'ok');
  }

  // Readiness probe
  if (url.pathname === '/ready') {
    return sendText(res, isReady ? 200 : 503, isReady ? 'ready' : 'not-ready');
  }

  // 나머지는 Next.js 라우트 처리
  return handle(req, res);
}

/** 앱 부트스트랩 */
app
  .prepare()
  .then(() => {
    const server = http.createServer(requestListener);

    server.listen(PORT, HOST, () => {
      isReady = true;
      // eslint-disable-next-line no-console
      console.log(
        `[web] Next server running on http://${HOST}:${PORT} (env=${NODE_ENV}, deploy=${DEPLOY_ENV})`
      );
    });

    // Cloud Run / Docker friendly shutdown
    const shutdown = (signal: string) => {
      console.log(`[web] received ${signal}, shutting down...`);
      isReady = false;
      server.close(err => {
        if (err) {
          console.error('[web] close error:', err);
          process.exit(1);
        }
        process.exit(0);
      });

      // 안전장치: 10초 후 강제 종료
      setTimeout(() => {
        console.warn('[web] force exit after timeout');
        process.exit(1);
      }, 10_000).unref();
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  })
  .catch(err => {
    console.error('[web] bootstrap error:', err);
    process.exit(1);
  });
