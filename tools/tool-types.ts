/**
 * Description : tool-types.ts - 📌 tools 공용 타입 모음
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */

// 핵심 타입들
export type TestStatus = 'PASS' | 'FAIL' | 'SKIP' | 'TIMEOUT';
export type ArtifactKind = 'screenshot' | 'trace' | 'video' | 'log' | 'custom';

export interface Artifact {
  kind: ArtifactKind;
  name: string;
  // 메모리 상의 바이너리. undefined면 path만 기록
  buffer?: Buffer | Uint8Array;
  // 이미 존재하는 파일 경로
  path?: string;
  // 바이트 단위 크기(선택)
  size?: number;
}

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
    // exactOptionalPropertyTypes 대응
    stack?: string;
  };
}

export interface TestStoreOptions {
  // 아티팩트 저장 루트 디렉터리
  outputDir: string;
  // 저장 허용 최대 크기(바이트). 기본 50MB
  maxArtifactSize?: number;
  // 트레이스 파일 기록 여부
  saveTrace?: boolean;
  // (예약) 비디오 로깅 여부
  logVideo?: boolean;
  // 보관일(일). 0이하면 정리 비활성화
  cleanupDays?: number;
}

export interface TestStats {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
}

export type PwExpect = (arg: any) => {
  toBeVisible: () => Promise<void>;
  toBeEnabled: () => Promise<void>;
  toHaveText: (exp: any) => Promise<void>;
  toHaveAttribute: (name: string, exp: any) => Promise<void>;
  toHaveCount: (n: number) => Promise<void>;
};

export type PwPage = {
  url(): string;
  title(): Promise<string>;
};
