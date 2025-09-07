/**
 * Description : baseConfig.ts - 📌 환경설정 및 Playwright 기본 환경 정의
 * Author : Shiwoo Min
 * Date : 2025-09-07
 */
import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// 파일 경로 유틸
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// .env 로드
dotenv.config();

// 현재 환경 (development | staging | production)
export const ENV = process.env.ENV || 'staging';

// Playwright 브라우저 설정
// chromium | firefox | webkit
export const BROWSERS = ['chromium'];
export const HEADLESS = process.env.HEADLESS === 'true';
export const TIMEOUT = 20 * 1000;

// 초기 기준 경로
export const BASE_PATH = path.resolve(__dirname, '..');

// Playwright 런치 옵션
export const WORKERS = parseInt(process.env.WORKERS || '4', 10);
export const RETRY_COUNT = Math.min(parseInt(process.env.RETRY_COUNT || '2', 10), 3);
export const LAUNCH_OPTIONS = {
  slowMo: parseInt(process.env.SLOW_MO || '0', 10),
  devtools: process.env.DEVTOOLS === 'true',
};

// API & 네트워크 타임아웃
export const API_TIMEOUT = 20 * 1000;
export const RESPONSE_TIMEOUT = 10 * 1000;

// ENV별 기본 URL (프로젝트 도메인에 맞게 필요시 수정)
export const BASE_URLS: Record<string, string> = {
  development: 'http://localhost:3000',       // 로컬 Next.js
  staging: 'https://staging.connectwon.app',  // 예시: Vercel 프리뷰
  production: 'https://connectwon.app',       // 예시: 프로덕션 도메인
};
export const BASE_URL = BASE_URLS[ENV];

// 테스트 아티팩트 보존 기간(일)
export const FILE_RETENTION_DAYS = {
  log: 14,
  testResult: 14,
  allureResult: 14,
  screenshot: 7,
  video: 7,
  trace: 14,
};

// 테스트 계정 정보 (웹 MVP: 아이디/비번 플로우용, 소셜 로그인만 쓰면 공란이어도 됨)
export const USERNAME = process.env.ID;
export const PASSWORD = process.env.PW;

// 플랫폼 토글 (pc | mw) → 뷰포트/UA만 전환
export const TEST_PLATFORM = (process.env.TEST_PLATFORM || 'pc').toLowerCase();
export const IS_MOBILE = TEST_PLATFORM === 'mw';

// 뷰포트/UA 설정 (Appium 미사용, 순수 브라우저 에뮬레이션)
export const DEVICE_SETTINGS = IS_MOBILE
  ? {
      userAgent: 'Mozilla/5.0 (Mobile; rv:40.0) Gecko/40.0 Firefox/40.0',
      viewport: { width: 375, height: 667 }, // iPhone 8급 스냅샷용 보편 해상도
    }
  : {
      viewport: { width: 1280, height: 720 }, // 데스크톱 기본
    };

// 환경 플래그
export const isStaging = ENV === 'staging';
export const isProduction = ENV === 'production';
export const isMobilePlatform = (): boolean => IS_MOBILE;

// 설정 검증
export function validateBaseConfig(): void {
  if (!BASE_URL) {
    throw new Error('[baseConfig] BASE_URL 설정이 잘못되어 있습니다.');
  }
}
