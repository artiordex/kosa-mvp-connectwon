/**
 * Description : next.config.mjs - 📌 Admin 앱 Next.js 설정 (Docker / Cloud Run 배포용)
 * Author : Shiwoo Min
 * Date : 2025-10-09
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloud Run / Docker용 서버 빌드
  output: 'standalone',

  // 내부 React 기반 패키지 트랜스파일
  transpilePackages: ['@connectwon/ui', '@connectwon/client'],

  // Webpack alias 추가 (← 핵심)
  webpack: (config) => {
    const aliasBase = path.resolve(__dirname, '../../dist/packages');

    config.resolve.alias = {
      ...config.resolve.alias,
      '@connectwon/client': path.join(aliasBase, 'client'),
      '@connectwon/ui': path.join(aliasBase, 'ui'),
      '@connectwon/core': path.join(aliasBase, 'core'),
      '@connectwon/configs': path.join(aliasBase, 'configs'),
      '@connectwon/logger': path.join(aliasBase, 'logger'),
    };

    return config;
  },

  reactStrictMode: false,

  // 이미지 도메인 허용
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },

  // Firebase Admin 환경변수 주입 (MSW 모드에서는 비활성화)
  /*
  env: {
    NEXT_PUBLIC_FIREBASE_ADMIN_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_API_KEY,
    NEXT_PUBLIC_FIREBASE_ADMIN_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_ADMIN_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_ADMIN_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_ADMIN_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_ADMIN_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_APP_ID,
    NEXT_PUBLIC_FIREBASE_ADMIN_MEASUREMENT_ID: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_MEASUREMENT_ID,
  },
  */

  // 개발 시 API 프록시 + UI 정적 자산 매핑
  async rewrites() {
    const rules = [
      {
        source: '/ui/:path*',
        destination: '/_next/static/ui/:path*',
      },
    ];

    if (process.env.NODE_ENV === 'development') {
      rules.push({
        source: '/api/:path*',
        destination: `${process.env.API_URL || 'http://localhost:8000'}/api/:path*`,
      });
    }

    return rules;
  },

  // dist 기준 루트 트레이싱
  outputFileTracingRoot: path.resolve(__dirname, '../../'),

  compress: true,
  poweredByHeader: false,

  // 타입 및 린트 오류는 빌드 시 무시
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
