/**
 * Description : e2e-types.ts - 📌 E2E 테스트 관련 모든 타입정의
 * Author : Shiwoo Min
 * Date : 2025-09-07
 */
import type { BrowserContextOptions, LaunchOptions } from '@playwright/test';

// 플랫폼 관련 타입 정의
// 플랫폼 구분 (웹 데스크탑, 웹 모바일)
export const Platform = {
  WEB_DESKTOP: 'WEB_DESKTOP',
  WEB_MOBILE: 'WEB_MOBILE',
} as const;

export type Platform = (typeof Platform)[keyof typeof Platform];

// 디바이스 타입
export const DeviceType = {
  DESKTOP: 'DESKTOP',
  MOBILE: 'MOBILE',
} as const;

export type DeviceType = keyof typeof DeviceType;

// 브라우저 타입
export const BrowserType = {
  CHROME: 'chrome',
  FIREFOX: 'firefox',
  SAFARI: 'safari',
  EDGE: 'edge',
} as const;

export type BrowserType = (typeof BrowserType)[keyof typeof BrowserType];

// Playwright 프로젝트 설정 인터페이스
export interface E2EProjectConfig {
  // 프로젝트 이름
  name: string;

  // 테스트 파일 경로 패턴
  testDir: string;

  // 사용할 브라우저
  browserName: BrowserType;

  // 플랫폼 타입
  platform: Platform;

  // 디바이스 타입
  deviceType: DeviceType;

  // 뷰포트 설정
  viewport?: { width: number; height: number } | null;

  // 브라우저 실행 옵션
  launchOptions?: LaunchOptions;

  // 컨텍스트 옵션
  contextOptions?: BrowserContextOptions;

  // 사용자 에이전트
  userAgent?: string;
}

export interface TestEnvironmentConfig {
  // 베이스 URL
  baseUrl: string;

  // API URL
  apiUrl: string;

  // headless 모드 여부
  headless: boolean;

  // 병렬 실행 워커 수
  workers: number;

  // 재시도 횟수
  retries: number;

  // 타임아웃 (밀리초)
  timeout: number;

  // 스크린샷 설정
  screenshot: 'off' | 'on' | 'only-on-failure';

  // 비디오 녹화
  video: 'off' | 'on' | 'retain-on-failure';
}

// 테스트 컨텍스트 관련 타입 정의
export interface TestContext {
  // 테스트 대상 플랫폼
  platform: Platform;

  // 디바이스 타입 (데스크톱/모바일)
  deviceType: DeviceType;

  // 실행 환경
  env: 'development' | 'staging' | 'production';

  // 베이스 URL
  baseUrl: string;

  // API URL
  apiUrl: string;

  // 테스트 세션 ID
  sessionId: string;

  // 테스트 시작 시간
  startTime: string;

  // 현재 테스트 케이스 이름
  testName?: string;

  // 사용자 정보 (로그인 테스트용)
  user?: {
    email: string;
    name: string;
    token?: string;
  };
}

// 추가 유틸리티 타입들
// 환경 타입
export const Environment = {
  DEVELOPMENT: 'development',
  STAGING: 'staging',
  PRODUCTION: 'production',
} as const;

export type Environment = (typeof Environment)[keyof typeof Environment];

// 테스트 결과 타입
export interface TestResult {
  testName: string;
  status: 'passed' | 'failed' | 'skipped';
  duration: number;
  error?: string;
  screenshot?: string;
  video?: string;
}

// 테스트 실행 옵션
export interface TestExecutionOptions {
  environment: Environment;
  platform: Platform;
  deviceType: DeviceType;
  browserType: BrowserType;
  headless?: boolean;
  timeout?: number;
  retries?: number;
}

// 페이지 객체 기본 인터페이스
export interface BasePage {
  platform: Platform;
  deviceType: DeviceType;
  baseUrl: string;
  goto(path?: string): Promise<void>;
  waitForLoad(): Promise<void>;
  takeScreenshot(name: string): Promise<void>;
}

// 테스트 데이터 인터페이스
export interface TestData {
  users: {
    valid: {
      email: string;
      password: string;
      name: string;
    };
    invalid: {
      email: string;
      password: string;
    };
  };
  urls: {
    [key in Environment]: {
      base: string;
      api: string;
    };
  };
}
