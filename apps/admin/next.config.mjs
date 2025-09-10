// apps/admin/next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {

  // 모노레포 packages의 컴포넌트 사용을 위한 설정
  transpilePackages: ['@repo/ui'],

  // 개발 환경에서 빠른 새로고침
  reactStrictMode: true,

  // 이미지 최적화 설정 (필요시)
  images: {
    domains: [],
  },

  // 환경변수 설정 (필요시)
  env: {
    CUSTOM_KEY: process.env.NODE_ENV,
  },
}

export default nextConfig
