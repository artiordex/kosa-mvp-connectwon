import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  // 모노레포 설정
  transpilePackages: ["@connectwon/ui", "@connectwon/shared"],

  // 이미지 최적화
  images: {
    domains: ["localhost", "your-domain.com"],
    formats: ["image/webp", "image/avif"],
  },

  // 환경변수 설정
  env: {
    API_URL: process.env.API_URL || "http://localhost:8080",
  },

  // 실험적 기능
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client"],
  },

  // 번들 분석 (개발용)
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.devtool = "source-map";
    }
    return config;
  },
};

export default nextConfig
