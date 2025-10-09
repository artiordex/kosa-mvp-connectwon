/**
 * Description : next.config.mjs - 📌 Web 앱 Next.js 설정 (Firebase Hosting / Cloud Run 완전 호환)
 * Author : Shiwoo Min
 * Date : 2025-10-09
 *
 * Environment :
 *  - Firebase Hosting : 정적 export 모드 (output: 'export')
 *  - Cloud Run / Docker : SSR 모드 (server.ts 사용)
 *  - Azure / Local : next dev / start 병행 지원
 *
 * Notes :
 *  - @connectwon/ui/dist/public 자산 직접 참조
 *  - Firebase Hosting export 모드 자동 인식
 *  - Cloud Run에서는 SSR 모드 자동 빌드
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IS_FIREBASE = process.env.FIREBASE === 'true';
const IS_DOCKER = process.env.DOCKER === 'true';
const IS_CLOUD_RUN = process.env.CLOUD_RUN === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ 배포 환경에 따른 모드 자동 설정
  output: IS_FIREBASE ? 'export' : 'standalone',

  // 내부 패키지 빌드 대상
  transpilePackages: [
    '@connectwon/ui',
    '@connectwon/api-contract',
    '@connectwon/client',
    '@connectwon/configs',
    '@connectwon/sdk'
  ],

  // 이미지 최적화 비활성화 (Firebase / Docker 호환)
  images: {
    unoptimized: IS_FIREBASE,
    domains: ['localhost', 'your-domain.com'],
    formats: ['image/avif', 'image/webp']
  },

  // 클라이언트 환경변수 주입
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
    NEXT_PUBLIC_DEPLOY_ENV: IS_FIREBASE
      ? 'firebase'
      : IS_CLOUD_RUN
      ? 'cloud-run'
      : IS_DOCKER
      ? 'docker'
      : 'local'
  },

  // SVG 처리
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) config.devtool = 'source-map';
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack']
    });
    return config;
  },

  // @connectwon/ui 정적 리소스 매핑
  async rewrites() {
    return [
      { source: '/ui/:path*', destination: '/_next/static/ui/:path*' }
    ];
  },

  // 루트 기준으로 추적
  outputFileTracingRoot: path.resolve(__dirname, '../../'),

  reactStrictMode: false,
  poweredByHeader: false,
  compress: true,
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true }
};

export default nextConfig;
