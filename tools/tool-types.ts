/**
 * Description : tool-types.ts - 📌 tools 공용 타입 모음
 * Author : Shiwoo Min
 * Date : 2025-09-09
 * 09-21 - 테스트 관련 타입 추가, JSDoc 주석 보강
 */
import { expect } from 'vitest';

// 테스트 상태
export type TestStatus = 'PASS' | 'FAIL' | 'SKIP' | 'TIMEOUT';

// 아티팩트 종류
export type ArtifactKind = 'screenshot' | 'trace' | 'video' | 'log' | 'custom';

// Vitest Expect 타입
export type VitestExpect = typeof expect;

/**
 * 테스트 아티팩트 데이터 구조
 */
export interface Artifact {
  kind: ArtifactKind;
  name: string;
  /** 메모리 상의 바이너리. undefined면 path만 기록 */
  buffer?: Buffer | Uint8Array;
  /** 이미 존재하는 파일 경로 */
  path?: string;
  /** 바이트 단위 크기 (선택) */
  size?: number;
}

/**
 * 테스트 결과 데이터 구조
 */
export interface TestResult {
  id: string;
  timestamp: string; // ISO string
  status: TestStatus;
  testName?: string;
  duration?: number;
  details?: string;
  artifacts: string[];
  error?: {
    message: string;
    /** optional stack trace */
    stack?: string;
  };
}

/**
 * 테스트 저장 옵션
 */
export interface TestStoreOptions {
  /** 아티팩트 저장 루트 디렉터리 */
  outputDir: string;
  /** 저장 허용 최대 크기(바이트). 기본 50MB */
  maxArtifactSize?: number;
  /** 트레이스 파일 기록 여부 */
  saveTrace?: boolean;
  /** (예약) 비디오 로깅 여부 */
  logVideo?: boolean;
  /** 보관일(일), 0이하면 정리 비활성화 */
  cleanupDays?: number;
}

/**
 * 테스트 통계 정보
 */
export interface TestStats {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
}

/**
 * Playwright 테스트에서 사용하는 Expect 타입 기본 형태
 * 필요 시, 정확한 Playwright 타입을 직접 import해서 교체 권장
 */
export type PwExpect = (arg: any) => {
  toBeVisible: () => Promise<void>;
  toBeEnabled: () => Promise<void>;
  toHaveText: (exp: any) => Promise<void>;
  toHaveAttribute: (name: string, exp: any) => Promise<void>;
  toHaveCount: (n: number) => Promise<void>;
};

/**
 * Playwright Page 타입 일부 추출 (간소화 버전)
 * 실제 full 타입은 '@playwright/test'에서 import 권장
 */
export type PwPage = {
  url(): Promise<string>;
  title(): Promise<string>;
};
