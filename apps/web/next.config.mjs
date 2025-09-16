/**
 * Description : next.config.mjs - 📌 Next.js 설정 파일
 * Author : Shiwoo Min
 * Date : 2025-09-06
 */
import path from 'path';
import { fileURLToPath } from 'url';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Docker standalone 모드
  output: 'standalone',

  // 모노레포 파일 추적 (웹은 루트 기준으로만 추적)
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
    // 웹에서 서버 전용 패키지 끌 필요 없음
    // serverComponentsExternalPackages: ['@prisma/client'],
    optimizePackageImports: ['lucide-react', 'date-fns'],
    typedRoutes: true,
  },

  // 클라이언트에서 필요한 패키지만
  transpilePackages: ['@connectwon/ui', '@connectwon/api-contract', '@connectwon/sdk'],

  images: {
    // 도메인 배열 대신 remotePatterns 써도 OK. 기존도 문제 없음.
    domains: ['localhost', 'your-domain.com'],
    formats: ['image/avif', 'image/webp'],
  },

  // 환경변수 (클라이언트 노출은 NEXT_PUBLIC_ 접두사 필수)
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  },

  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.devtool = 'source-map';
    }
    // SVG를 React 컴포넌트로 쓰고 싶다면:
    config.module.rules.push({ test: /\.svg$/i, issuer: /\.[jt]sx?$/, use: ['@svgr/webpack'] });
    return config;
  },

  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
