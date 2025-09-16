/**
 * Description : next.config.mjs - 📌 Admin 앱 Next.js 설정
 * Author : Shiwoo Min
 * Date : 2025-09-11
 * 09-16 - packages 컴포넌트 추가
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 모노레포 packages의 컴포넌트 사용을 위한 설정
  transpilePackages: [
    '@connectwon/ui',
    '@connectwon/api-contract',
    // '@connectwon/database',
    '@connectwon/core',
    // '@connectwon/logger',
    // '@connectwon/nest-kit',
    '@connectwon/sdk',
  ],

  // React Strict Mode (개발 환경에서 버그 감지)
  reactStrictMode: true,

  // 실험적 기능 (Next.js 최신 기능 활용)
  experimental: {
    // App Router의 최적화된 폰트 로딩
    optimizePackageImports: ['lucide-react', 'date-fns'],
    // 타입 체크 최적화
    typedRoutes: true,
    outputFileTracingRoot: '../../',
  },

  // 이미지 최적화 설정
  images: {
    // Admin에서 사용할 외부 이미지 도메인
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com', // GitHub 프로필 이미지
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Google 프로필 이미지
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Unsplash 이미지 (샘플용)
      },
    ],
    // 이미지 크기 최적화
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // 환경변수 설정
  env: {
    // 빌드 시점 환경변수
    NEXT_PUBLIC_APP_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
  },

  // 번들 분석 및 최적화
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // SVG를 React 컴포넌트로 사용
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    // 번들 분석 (개발 환경에서만)
    if (dev && !isServer) {
      config.plugins.push(
        new webpack.DefinePlugin({
          __DEV__: JSON.stringify(dev),
        }),
      );
    }

    return config;
  },

  // 헤더 설정 (보안 및 성능)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // 보안 헤더
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          // 성능 헤더
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ];
  },

  // 리다이렉트 설정
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: false,
      },
      // 레거시 경로 리다이렉트 (필요시)
      {
        source: '/admin',
        destination: '/dashboard',
        permanent: true,
      },
    ];
  },

  // 리라이트 설정 (API 프록시 등)
  async rewrites() {
    return [
      // API 요청을 백엔드로 프록시 (개발 환경)
      ...(process.env.NODE_ENV === 'development'
        ? [
            {
              source: '/api/:path*',
              destination: `${process.env.API_URL || 'http://localhost:8000'}/api/:path*`,
            },
          ]
        : []),
    ];
  },

  // 출력 설정
  output: 'standalone', // Docker 컨테이너용 최적화

  // 성능 최적화
  compress: true,
  poweredByHeader: false, // X-Powered-By 헤더 제거

  // TypeScript 설정
  typescript: {
    // 타입 에러가 있어도 빌드 진행 (CI/CD에서 별도 타입 체크)
    ignoreBuildErrors: false,
  },

  // ESLint 설정
  eslint: {
    // 빌드 시 ESLint 실행
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
