/**
 * Description : instrument.ts - 📌 Sentry 에러 트래킹 초기화 설정
 * Author : Shiwoo Min
 * Date : 2025-09-24
 */
import * as Sentry from '@sentry/nestjs';

// 애플리케이션 생명주기 초기에 Sentry 초기화
if (process.env['SENTRY_DSN']) {
  Sentry.init({
    dsn: process.env['SENTRY_DSN'],

    // 성능 모니터링
    tracesSampleRate: 1.0,

    // 환경 설정
    environment: process.env['NODE_ENV'] || 'development',

    // 디버그 모드 (운영 환경에서는 비활성화)
    debug: process.env['NODE_ENV'] === 'development',

    // 통합 모듈 (Node.js/NestJS용)
    integrations: [Sentry.httpIntegration(), Sentry.nodeContextIntegration(), Sentry.localVariablesIntegration()],
  });
} else {
  console.warn('SENTRY_DSN이 설정되지 않았습니다. Sentry 초기화를 건너뜁니다.');
}
