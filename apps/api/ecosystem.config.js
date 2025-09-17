/**
 * Description : ecosystem.config.js - 📌 PM2 프로세스 매니저 설정 파일
 * Author : Shiwoo Min
 * Date : 2025-09-12
 */

module.exports = {
  apps: [
    {
      // 앱 기본 정보
      name: 'connectwon-api',
      script: 'main.js', // Nx 빌드 결과: dist/apps/api/main.js
      cwd: '../../dist/apps/api', // 빌드된 위치

      // 실행 환경
      interpreter: 'node',
      node_args: '--max-old-space-size=1024',

      // 클러스터 모드 (프로덕션용)
      instances: process.env.NODE_ENV === 'production' ? 'max' : 1,
      exec_mode: process.env.NODE_ENV === 'production' ? 'cluster' : 'fork',

      // 기본 환경 변수
      env: {
        NODE_ENV: 'development',
        PORT: 8080,
        LOG_LEVEL: 'debug',
      },

      // 프로덕션 환경 변수
      env_production: {
        NODE_ENV: 'production',
        PORT: 8080,
        LOG_LEVEL: 'info',
      },

      // 자동 재시작 설정
      watch: false,
      ignore_watch: ['node_modules', 'logs', '*.log'],

      // 메모리/프로세스 제한
      max_memory_restart: '1G',
      min_uptime: '10s',
      max_restarts: 10,
      autorestart: true,

      // 로그 설정 (프로젝트 루트 기준)
      log_file: '../../logs/api-combined.log',
      out_file: '../../logs/api-out.log',
      error_file: '../../logs/api-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,

      // 프로세스 관리
      kill_timeout: 5000,
      listen_timeout: 3000,
      reload_delay: 1000,

      // 소스맵 지원
      source_map_support: true,
    },

    // 개발 모드용 설정 (선택사항)
    {
      name: 'connectwon-api-dev',
      script: 'pnpm',
      args: 'nx serve api',
      cwd: '../..', // 모노레포 루트

      // 개발 모드는 단일 인스턴스
      instances: 1,
      exec_mode: 'fork',

      // 환경 변수
      env: {
        NODE_ENV: 'development',
        PORT: 8080,
        LOG_LEVEL: 'debug',
      },

      // 개발용 설정
      watch: false, // Nx가 알아서 watch 처리
      min_uptime: '3s',
      max_restarts: 5,
      max_memory_restart: '500M',

      // 개발용 로그
      log_file: 'logs/api-dev.log',
      out_file: '/dev/null',
      error_file: 'logs/api-dev-error.log',
    },
  ],
};
