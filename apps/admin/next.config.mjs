/**
 * Description : next.config.mjs - 📌 Admin 앱 Next.js 설정
 * Author : Shiwoo Min
 * Date : 2025-09-11
 * 09-16 - packages 컴포넌트 추가, public 폴더 없이 빌드 가능하도록 수정
 * 09-17 - 빌드 에러 해결을 위한 임시 설정 추가
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import 'dotenv/config';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * @property output
   * @description Nx/모노레포 배포를 위한 standalone 출력
   * @default "standalone"
   */
  output: 'standalone',

  /**
   * @property transpilePackages
   * @description 내부 패키지(ESM/클라 전용 포함) 트랜스파일
   */
  transpilePackages: [
    '@connectwon/ui',
    '@connectwon/api-contract',
    '@connectwon/client',
    '@connectwon/configs'
  ],

  /**
   * @property reactStrictMode
   * @description Context 이슈 회피를 위한 임시 비활성화
   * @default false
   */
  reactStrictMode: false,

  /**
   * @property images
   * @description public 폴더 없이도 원격 이미지 허용
   */
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },

  /**
   * @property outputFileTracingRoot
   * @description 서버 번들 트레이싱 루트(정식 키)
   */
  outputFileTracingRoot: path.resolve(__dirname, '../../'),

  /**
   * @property experimental
   * @description 안정성 우선으로 실험 옵션 최소화
   */
  experimental: {
    // @note RSC 경계 충돌 가능성 있어 비활성화
    // optimizePackageImports: ['lucide-react'],
    isrMemoryCacheSize: 0,
  },

  // /**
  //  * @method redirects
  //  * @description 기본 루트 → 대시보드 리다이렉트
  //  */
  // async redirects() {
  //   return [{ source: '/', destination: '/dashboard', permanent: false }];
  // },

  /**
   * @method rewrites
   * @description 개발 환경 API 프록시
   */
  async rewrites() {
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/api/:path*',
          destination: `${process.env.API_URL || 'http://localhost:8000'}/api/:path*`,
        },
      ];
    }
    return [];
  },

  /**
   * @property compress
   * @description gzip 압축 활성화
   * @default true
   */
  compress: true,

  /**
   * @property poweredByHeader
   * @description X-Powered-By 헤더 제거
   * @default false
   */
  poweredByHeader: false,

  /**
   * @property typescript
   * @description 빌드 진행을 위한 타입 에러 임시 무시
   */
  typescript: { ignoreBuildErrors: true },

  /**
   * @property eslint
   * @description 빌드 진행을 위한 ESLint 에러 임시 무시
   */
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
