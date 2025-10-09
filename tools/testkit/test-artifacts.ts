/**
 * Description : test-artifacts.ts - 📌 테스트 결과 저장 및 오류 처리 유틸
 * Author : Shiwoo Min
 * Date : 2025-09-09
 * 09-21 - 타입 명확화, 예외 처리 강화, 주석 보강, 코드 스타일 일관성 개선
 * 10-09 - 절대경로 import, Cloud Build 호환성 강화, 권한 수정(chmod 644)
 */
import { fileURLToPath } from 'node:url';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import { chmodSync } from 'node:fs';
import { testConfig } from '../../packages/core/src/connectwon-env.js';
import type { Artifact, ArtifactKind, TestResult, TestStatus } from '../tool-types.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 기본 설정
const DEFAULT_OPTIONS = {
  outputDir: path.resolve(process.cwd(), testConfig.artifactsDir ?? 'artifacts/test-results'),
  maxArtifactSize: 50 * 1024 * 1024, // 50MB
  saveTrace: testConfig.saveTrace ?? true,
  logVideo: testConfig.logVideo ?? true,
};

/**
 * @description 안전한 디렉터리 생성 (EEXIST 무시)
 * @param dir 생성할 디렉터리 경로
 */
async function ensureDir(dir: string): Promise<void> {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (err: any) {
    if (err.code !== 'EEXIST') {
      console.warn(`[test-artifacts] mkdir failed: ${dir}`, err);
    }
  }
}

/**
 * @description 현재 시간 ISO 형식, 파일명에 안전한 문자열로 변환
 * @returns 파일명 안전 문자열
 */
function nowTs(): string {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

/**
 * @description 고유 결과 ID 생성 ({ISO타임스탬프}-{랜덤6자리})
 * @returns 고유 결과 ID 문자열
 */
function generateResultId(): string {
  return `${nowTs()}-${Math.random().toString(36).substring(2, 8)}`;
}

/**
 * @description 아티팩트 종류(kind)에 따른 하위 디렉터리 경로 반환
 * @param outputDir 기본 출력 디렉터리
 * @param kind 아티팩트 종류
 * @returns 아티팩트 저장 경로
 */
function getArtifactDir(outputDir: string, kind: ArtifactKind): string {
  const map: Record<ArtifactKind, string> = {
    screenshot: 'screenshots',
    trace: 'traces',
    video: 'videos',
    log: 'logs',
    custom: 'custom',
  };
  return path.join(outputDir, map[kind]);
}

/**
 * @description 테스트 결과 저장에 필요한 디렉터리 초기화
 * @param out 기본 출력 경로 (기본값: DEFAULT_OPTIONS.outputDir)
 */
export async function initResultDirs(out = DEFAULT_OPTIONS.outputDir): Promise<void> {
  const dirs = ['results', 'logs', 'screenshots', 'traces', 'videos', 'custom'].map(d =>
    path.join(out, d),
  );
  await Promise.all(dirs.map(ensureDir));
}

/**
 * @description 테스트 결과 저장 (JSON + 로그)
 * @param status 테스트 상태 ('PASS', 'FAIL', 'SKIP' 등)
 * @param options 테스트 상세 정보
 * @returns 생성된 결과 ID
 */
export async function saveTestResult(
  status: TestStatus,
  options: {
    testName?: string;
    duration?: number;
    details?: string;
    error?: Error;
    outputDir?: string;
  } = {},
): Promise<string> {
  const outputDir = options.outputDir || DEFAULT_OPTIONS.outputDir;
  const resultId = generateResultId();

  const result: TestResult = {
    id: resultId,
    timestamp: new Date().toISOString(),
    status,
    testName: options.testName,
    duration: options.duration,
    details: options.details,
    artifacts: [],
    error: options.error
      ? {
          message: options.error.message,
          stack: options.error.stack,
        }
      : undefined,
  };

  const resultPath = path.join(outputDir, 'results', `${resultId}.json`);
  await fs.writeFile(resultPath, JSON.stringify(result, null, 2));
  chmodSync(resultPath, 0o644);

  const logLine = `[${result.timestamp}] [${status}] ${options.testName || 'Unknown'} - ${options.details || ''}\n`;
  await fs.appendFile(path.join(outputDir, 'logs', 'test-run.log'), logLine);

  return resultId;
}

/**
 * @description 아티팩트 저장 (버퍼 또는 외부 경로 지원)
 * @param resultId 결과 ID
 * @param artifact 저장할 아티팩트 정보
 * @param outputDir 출력 경로
 * @returns 저장된 파일 경로 또는 null
 */
export async function saveArtifact(
  resultId: string,
  artifact: Artifact,
  outputDir = DEFAULT_OPTIONS.outputDir,
): Promise<string | null> {
  try {
    if (artifact.buffer && artifact.buffer.length > DEFAULT_OPTIONS.maxArtifactSize) {
      console.warn(`[artifact] too large: ${artifact.name} (${artifact.buffer.length} bytes)`);
      return null;
    }

    const dir = getArtifactDir(outputDir, artifact.kind);
    await ensureDir(dir);

    const filePath = path.join(dir, `${resultId}-${artifact.name}`);

    if (artifact.buffer) {
      await fs.writeFile(filePath, artifact.buffer);
      chmodSync(filePath, 0o644);
      return filePath;
    } else if (artifact.path) {
      return artifact.path;
    }

    return null;
  } catch (err) {
    console.error(`[artifact] failed to save ${artifact.name}:`, err);
    return null;
  }
}

/**
 * @description 스크린샷 저장 헬퍼
 * @param resultId 결과 ID
 * @param screenshotBuffer 스크린샷 버퍼
 * @param outputDir 출력 디렉터리
 * @returns 저장된 경로 또는 null
 */
export async function captureScreenshot(
  resultId: string,
  screenshotBuffer: Buffer,
  outputDir = DEFAULT_OPTIONS.outputDir,
): Promise<string | null> {
  const artifact: Artifact = {
    kind: 'screenshot',
    name: 'screenshot.png',
    buffer: screenshotBuffer,
  };
  return saveArtifact(resultId, artifact, outputDir);
}

/**
 * @description 트레이스 저장 헬퍼
 * @param resultId 결과 ID
 * @param tracePath 트레이스 파일 경로
 * @param outputDir 출력 디렉터리
 * @returns 저장된 경로 또는 null
 */
export async function saveTrace(
  resultId: string,
  tracePath: string,
  outputDir = DEFAULT_OPTIONS.outputDir,
): Promise<string | null> {
  if (!DEFAULT_OPTIONS.saveTrace) return null;

  const artifact: Artifact = {
    kind: 'trace',
    name: 'trace.zip',
    path: tracePath,
  };
  return saveArtifact(resultId, artifact, outputDir);
}

/**
 * @description 테스트 결과 JSON에 아티팩트 경로 추가
 * @param resultId 결과 ID
 * @param artifactPaths 추가할 아티팩트 경로 배열
 * @param outputDir 출력 경로
 */
export async function updateResultWithArtifacts(
  resultId: string,
  artifactPaths: string[],
  outputDir = DEFAULT_OPTIONS.outputDir,
): Promise<void> {
  const resultPath = path.join(outputDir, 'results', `${resultId}.json`);
  try {
    const content = await fs.readFile(resultPath, 'utf-8');
    const result: TestResult = JSON.parse(content);
    result.artifacts = [...result.artifacts, ...artifactPaths.filter(Boolean)];
    await fs.writeFile(resultPath, JSON.stringify(result, null, 2));
    chmodSync(resultPath, 0o644);
  } catch (error) {
    console.error(`[test-artifacts] failed to update result ${resultId}:`, error);
  }
}

/**
 * @description 오래된 아티팩트 정리 (maxAgeDays일 이전 파일 삭제)
 * @param outputDir 아티팩트 루트 경로
 * @param maxAgeDays 보관 일수 (0 이하면 정리 안 함)
 */
export async function cleanupOldArtifacts(
  outputDir = DEFAULT_OPTIONS.outputDir,
  maxAgeDays = testConfig.cleanupDays ?? 7,
): Promise<void> {
  if (maxAgeDays <= 0) return;

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - maxAgeDays);

  const dirs = ['results', 'screenshots', 'traces', 'videos', 'logs'].map(d => path.join(outputDir, d));

  let cleanedCount = 0;
  for (const dir of dirs) {
    try {
      const files = await fs.readdir(dir);
      for (const file of files) {
        const filePath = path.join(dir, file);
        const stats = await fs.stat(filePath);

        if (stats.mtime < cutoffDate) {
          await fs.unlink(filePath);
          cleanedCount++;
        }
      }
    } catch {
      // 디렉토리 없거나 접근 불가 시 무시
    }
  }

  if (cleanedCount > 0) {
    console.log(`[test-artifacts] cleaned ${cleanedCount} old artifacts (older than ${maxAgeDays} days)`);
  }
}

/**
 * @description 테스트 실패 시 결과 및 아티팩트 저장 처리
 * @param testName 테스트 이름
 * @param error 발생한 에러
 * @param screenshotBuffer 스크린샷 데이터
 * @param tracePath 트레이스 파일 경로
 * @returns 결과 ID
 */
export async function handleTestFailure(
  testName: string,
  error: Error,
  screenshotBuffer?: Buffer,
  tracePath?: string,
): Promise<string> {
  const resultId = await saveTestResult('FAIL', {
    testName,
    error,
    details: error.message,
  });

  const artifactPaths: string[] = [];

  if (screenshotBuffer) {
    const screenshotPath = await captureScreenshot(resultId, screenshotBuffer);
    if (screenshotPath) artifactPaths.push(screenshotPath);
  }

  if (tracePath) {
    const savedTracePath = await saveTrace(resultId, tracePath);
    if (savedTracePath) artifactPaths.push(savedTracePath);
  }

  if (artifactPaths.length > 0) {
    await updateResultWithArtifacts(resultId, artifactPaths);
  }

  return resultId;
}

/**
 * @description 테스트 성공 시 결과 처리
 * @param testName 테스트 이름
 * @param duration 실행 시간 (ms)
 * @returns 결과 ID
 */
export async function handleTestSuccess(testName: string, duration: number): Promise<string> {
  return saveTestResult('PASS', {
    testName,
    duration,
    details: 'Test passed successfully',
  });
}

/**
 * @description 테스트 결과 통계 조회
 * @param outputDir 결과 저장 경로
 * @returns 통계 객체
 */
export async function getTestStats(
  outputDir = DEFAULT_OPTIONS.outputDir,
): Promise<{
  total: number;
  passed: number;
  failed: number;
  skipped: number;
}> {
  const resultsDir = path.join(outputDir, 'results');
  const stats = { total: 0, passed: 0, failed: 0, skipped: 0 };

  try {
    const files = await fs.readdir(resultsDir);
    for (const file of files.filter(f => f.endsWith('.json'))) {
      try {
        const content = await fs.readFile(path.join(resultsDir, file), 'utf-8');
        const result: TestResult = JSON.parse(content);
        stats.total++;

        switch (result.status) {
          case 'PASS': stats.passed++; break;
          case 'FAIL': stats.failed++; break;
          case 'SKIP': stats.skipped++; break;
        }
      } catch {
        // 파싱 실패 시 무시
      }
    }
  } catch {
    // results 디렉토리 없으면 무시
  }

  return stats;
}
