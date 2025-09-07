/**
 * Description : playwright.config.ts - 📌 Playwright 테스트 실행 환경 정의 파일
 * Author : Shiwoo Min
 * Date : 2025-09-07
 * 최소 설정으로 웹/ 모바일 웹 e2e 테스트만 진행
 *
 */

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import os from 'os';
import path from 'path';
import { dirname } from 'path';
import 'tsconfig-paths/register.js';
import { fileURLToPath } from 'url';

// ESM 환경 경로 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// .env 파일 로드
dotenv.config({ path: path.resolve(__dirname, '.env') });

// ----- 환경 변수 기본값 -----
// HEADLESS=false 브라우저 UI 모드
const HEADLESS = process.env.HEADLESS !== 'false';

// BASE_URL은 테스트 대상 서비스의 루트 URL
const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000';

// CI=true 인 경우에만 RETRIES 2회 재시도, 로컬은 재시도 없음
const RETRIES = process.env.CI ? 2 : 0;

// 로컬에선 CPU의 75%만 워커로 사용하여 과부하 방지
const WORKERS = process.env.CI ? 1 : Math.max(1, Math.floor(os.cpus().length * 0.75));

// 전역 테스트 타임아웃(ms)
const GLOBAL_TIMEOUT_MS = 30 * 60 * 1000; // 30분

// 액션/네비게이션 타임아웃(초) → ms 변환
const ACTION_TIMEOUT_MS = (parseInt(process.env.ACTION_TIMEOUT ?? '30', 10)) * 1000;
const NAVIGATION_TIMEOUT_MS = (parseInt(process.env.NAVIGATION_TIMEOUT ?? '60', 10)) * 1000;

// 슬로모션(ms). UI 깜박임/타이밍 이슈를 완화할 때 100~300 권장
const SLOW_MO_MS = parseInt(process.env.SLOW_MO ?? '0', 10);

// 브라우저 시작 타임아웃(ms). CI 환경에서 여유를 두고 싶을 때 증가
const BROWSER_LAUNCH_TIMEOUT_MS = parseInt(process.env.BROWSER_LAUNCH_TIMEOUT ?? '60000', 10);

// ----- 공통 use 옵션(모든 프로젝트에 기본 적용) -----
// trace/video/screenshot 정책은 디버깅 친화적으로 최소화 구성
const commonUse = {
  baseURL: BASE_URL,
  headless: HEADLESS,
  // 사내 인증서 등으로 인한 HTTPS 경고 무시
  ignoreHTTPSErrors: true,
  // 다운로드 허용(파일 저장 테스트 등)
  acceptDownloads: true,
  actionTimeout: ACTION_TIMEOUT_MS,
  navigationTimeout: NAVIGATION_TIMEOUT_MS,
  // 실패한 케이스에만 스크린샷 저장
  screenshot: 'only-on-failure' as const,
  // 실패한 케이스에만 비디오 보관
  video: 'retain-on-failure' as const,
  // 첫 재시도에서만 트레이스 저장(용량 최소화 + 디버깅 효율)
  trace: 'on-first-retry' as const,
  // 콘솔/네트워크 소음 줄이기 위한 로거(경고/에러만 출력)
  logger: {
    isEnabled: (_name: string, severity: string) => ['warning', 'error'].includes(severity),
    log: (name: string, severity: string, message: string) =>
      console.log(`[${severity}] ${name}: ${message}`),
  },
};
// ----- 프로젝트 정의 -----
// Desktop Chrome: 일반 웹 화면(1920x1080 권장)
const desktopProject = {
  name: 'Desktop Chrome',
  use: {
    ...devices['Desktop Chrome'], // 데스크톱 UA/환경
    viewport: { width: 1920, height: 1080 }, // 리그레션 일관성
    slowMo: SLOW_MO_MS,
    launchOptions: {
      args: [
        '--start-maximized', // 시작 시 최대화
        '--disable-extensions', // 확장프로그램 비활성화
        '--disable-dev-shm-usage', // /dev/shm 이슈 회피(CI 컨테이너)
        '--no-sandbox', // 일부 CI 필수
        '--disable-gpu', // GPU 가속 비활성화(헤드리스 안정성)
        '--disable-blink-features=AutomationControlled', // 자동화 탐지 회피(일부 사이트)
      ],
      timeout: BROWSER_LAUNCH_TIMEOUT_MS,
    },
  },
};

// Mobile Chrome: Pixel 5 에뮬(UA/뷰포트/터치/스케일 모두 프리셋)
const mobileProject = {
  name: 'Mobile Chrome',
  use: {
    ...devices['Pixel 5'], // 모바일 UA/뷰포트/터치 적용
    slowMo: SLOW_MO_MS,
    launchOptions: {
      args: [
        '--disable-dev-shm-usage',
        '--no-sandbox',
        '--disable-gpu',
        '--disable-blink-features=AutomationControlled',
      ],
      timeout: BROWSER_LAUNCH_TIMEOUT_MS,
    },
  },
};

// ----- 최종 설정 -----
export default defineConfig({
  // 테스트 파일 위치와 패턴(권장: e2e 하위만 사용)
  testDir: '.',
  testMatch: ['e2e/**/*.spec.ts'],

  // 병렬 실행/리트라이/가드
  fullyParallel: true, // 파일 단위 병렬 허용
  forbidOnly: !!process.env.CI, // CI에서 test.only 방지
  retries: RETRIES,
  workers: WORKERS,
  timeout: GLOBAL_TIMEOUT_MS,

  // 공통 use 옵션
  use: commonUse,

  // 프로젝트(브라우저+디바이스) 목록
  projects: [desktopProject, mobileProject],

  // 리포터: list + html(기본 경로: playwright-report)
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    // ['junit', { outputFile: 'reports/junit.xml' }], // 필요 시 추가
    // ['json',  { outputFile: 'reports/report.json' }], // 필요 시 추가
  ],

  // 개발 서버를 테스트 전에 띄우고 싶다면 환경변수로 제어
  webServer:
    process.env.START_WEB_SERVER === 'true'
      ? {
          command: process.env.WEB_COMMAND ?? 'pnpm dev', // 서버 실행 커맨드
          url: process.env.WEB_URL ?? 'http://localhost:3000', // 헬스체크 URL
          reuseExistingServer: true, // 이미 떠 있으면 재사용
          ignoreHTTPSErrors: true,
          timeout: 120 * 1000, // 서버 부팅 대기 시간
        }
      : undefined,
});
