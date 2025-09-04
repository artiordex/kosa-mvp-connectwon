module.exports = {
  apps: [
    {
      // 앱 기본 정보
      name: 'connectwon-api',
      script: 'dist/app.js',
      cwd: './apps/api',

      // 실행 환경
      node_args: '--max-old-space-size=1024',
      interpreter: 'node',

      // 클러스터 모드 (CPU 코어 수만큼 인스턴스 생성)
      instances: 'max',
      exec_mode: 'cluster',

      // 환경 변수
      env: {
        NODE_ENV: 'development',
        PORT: 8080,
        LOG_LEVEL: 'debug',
        ENABLE_LOGS: 'true'
      },

      env_production: {
        NODE_ENV: 'production',
        PORT: 8080,
        LOG_LEVEL: 'info',
        ENABLE_LOGS: 'false'
      },

      env_staging: {
        NODE_ENV: 'staging',
        PORT: 8080,
        LOG_LEVEL: 'info',
        ENABLE_LOGS: 'true'
      },

      // 자동 재시작 설정
      watch: false,
      ignore_watch: [
        'node_modules',
        'logs',
        'dist',
        '*.log'
      ],

      // 메모리/CPU 제한
      max_memory_restart: '1G',
      min_uptime: '10s',
      max_restarts: 10,

      // 로그 설정
      log_file: '../../logs/api/combined.log',
      out_file: '../../logs/api/out.log',
      error_file: '../../logs/api/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,

      // 프로세스 관리
      kill_timeout: 5000,
      listen_timeout: 3000,
      reload_delay: 1000,

      // Health check (선택사항)
      health_check_grace_period: 3000,

      // 고급 설정
      source_map_support: true,
      disable_source_map_support: false,

      // 프로덕션 최적화
      node_args: [
        '--max-old-space-size=1024',
        '--optimize-for-size'
      ],

      // 자동 재시작 조건
      autorestart: true,

      // 크론 재시작 (매일 새벽 3시)
      cron_restart: '0 3 * * *',

      // 개발 모드용 추가 설정
      env_development: {
        NODE_ENV: 'development',
        PORT: 8080,
        LOG_LEVEL: 'debug',
        ENABLE_LOGS: 'true',
        // 개발용 데이터베이스
        DATABASE_URL: 'postgresql://user:password@localhost:5432/connectwon_dev',
        REDIS_URL: 'redis://localhost:6379'
      }
    },

    // 개발 모드용 별도 설정 (선택사항)
    {
      name: 'connectwon-api-dev',
      script: 'tsx',
      args: 'watch src/app.ts',
      cwd: './apps/api',

      // 개발 모드는 단일 인스턴스
      instances: 1,
      exec_mode: 'fork',

      // 파일 변경 감지
      watch: true,
      watch_delay: 1000,
      ignore_watch: [
        'node_modules',
        'dist',
        'logs',
        '*.log',
        'prisma/migrations'
      ],

      env: {
        NODE_ENV: 'development',
        PORT: 8080,
        LOG_LEVEL: 'debug',
        ENABLE_LOGS: 'true'
      },

      // 개발용 로그 설정
      log_file: './logs/dev-combined.log',
      out_file: './logs/dev-out.log',
      error_file: './logs/dev-error.log',

      // 빠른 재시작
      min_uptime: '3s',
      max_restarts: 5,
      max_memory_restart: '500M'
    }
  ],

  // 배포 설정
  deploy: {
    production: {
      user: 'deploy',
      host: ['your-server.com'],
      ref: 'origin/main',
      repo: 'git@github.com:your-username/connectwon.git',
      path: '/var/www/connectwon',
      'post-deploy': 'pnpm install && pnpm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': 'apt update && apt install git -y'
    },

    staging: {
      user: 'deploy',
      host: ['staging-server.com'],
      ref: 'origin/develop',
      repo: 'git@github.com:your-username/connectwon.git',
      path: '/var/www/connectwon-staging',
      'post-deploy': 'pnpm install && pnpm run build && pm2 reload ecosystem.config.js --env staging'
    }
  }
}
