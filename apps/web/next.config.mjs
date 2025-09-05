/**
 * Description : next.config.mjs - 📌 Next.js 설정 파일
 * Author      : Shiwoo Min
 * Date        : 2025-09-06
 */

import path from "path";
import { fileURLToPath } from "url";

/** __dirname 대체 코드 (ESM) */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Docker standalone 모드
  output: "standalone",

  // 모노레포 파일 추적 설정
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
    serverComponentsExternalPackages: ["@prisma/client"],
  },

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

  // 번들 분석 (개발용)
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.devtool = "source-map";
    }
    return config;
  },
};

export default nextConfig;
