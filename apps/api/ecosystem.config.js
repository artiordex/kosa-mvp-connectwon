/**
 * Description : ecosystem.config.js - 📌 PM2 프로세스 매니저 설정 파일
 * Author : Shiwoo Min
 * Date : 2025-09-12
 * 09-22 - 로그 경로 절대화(/app/logs), Node ESM 소스맵 플래그 추가
 * 09-23 - 빌드 경로 수정 (dist/apps/api로 통일), 메모리 최적화
 * 10-09 - Docker / Cloud Run / Azure / Local 완전 호환 (절대 경로 자동 감지)
 */

const path = require('node:path');

const ROOT = process.env.PM2_ROOT || '/app';
const DIST = path.join(ROOT, 'dist', 'apps', 'api');
const LOG_DIR = path.join(ROOT, 'logs');

module.exports = {
  apps: [
    {
      // 앱 기본 정보
      name: 'connectwon-api',
      script: 'main.js',
      cwd: DIST, // NX 빌드 결과 디렉토리

      // 실행 환경
      interpreter: 'node',
      node_args: '--max-old-space-size=2048 --enable-source-maps',

      // 클러스터 모드 (프로덕션용)
      instances: process.env.NODE_ENV === 'production' ? 'max' : 1,
      exec_mode: process.env.NODE_ENV === 'production' ? 'cluster' : 'fork',

      // 기본 환경 변수
      env: {
        NODE_ENV: 'development',
        PORT: process.env.PORT || 8080,
        LOG_LEVEL: 'debug',
      },

      // 프로덕션 환경 변수
      env_production: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 8080,
        LOG_LEVEL: 'info',
      },

      // 자동 재시작 설정
      watch: false,
      ignore_watch: ['node_modules', 'logs', '*.log'],

      // 메모리/프로세스 제한
      max_memory_restart: '4G',
      min_uptime: '10s',
      max_restarts: 10,
      autorestart: true,

      // 로그 설정 (절대 경로)
      log_file: path.join(LOG_DIR, 'api-combined.log'),
      out_file: path.join(LOG_DIR, 'api-out.log'),
      error_file: path.join(LOG_DIR, 'api-error.log'),
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,

      // 프로세스 관리
      kill_timeout: 5000,
      listen_timeout: 3000,
      reload_delay: 1000,

      // 소스맵 지원
      source_map_support: true,
    },

    // 개발 모드용 (선택)
    {
      name: 'connectwon-api-dev',
      script: 'pnpm',
      args: 'nx serve api',
      cwd: ROOT,
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'development',
        PORT: 8000,
        LOG_LEVEL: 'debug',
      },
    },
  ],
};
