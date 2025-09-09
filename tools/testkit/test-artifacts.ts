/**
 * Description : test-artifacts.ts - 📌 테스트 결과 저장 및 오류 처리 유틸
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */

import * as fs from 'fs/promises'
import path from 'path'
import { testConfig } from '../../connectwon-env.js'
import type { TestStatus, Artifact, TestResult, ArtifactKind } from '../tool-types.js';

// 기본 설정
const DEFAULT_OPTIONS = {
  outputDir: testConfig.artifactsDir,
  maxArtifactSize: 50 * 1024 * 1024, // 50MB
  saveTrace: testConfig.saveTrace,
  logVideo: testConfig.logVideo,
}

// 유틸리티 함수들
function nowTs(): string {
  return new Date().toISOString().replace(/[:.]/g, '-')
}

// 결과 ID 생성 (타임스탬프 + 랜덤)
function generateResultId(): string {
  const ts = nowTs()
  const random = Math.random().toString(36).substr(2, 6)
  return `${ts}-${random}`
}

// 디렉터리 보장
async function ensureDir(dir: string): Promise<void> {
  await fs.mkdir(dir, { recursive: true })
}

// 아티팩트 저장 경로 결정
function getArtifactDir(outputDir: string, kind: ArtifactKind): string {
  const subdirs = {
    screenshot: 'screenshots',
    trace: 'traces',
    video: 'videos',
    log: 'logs',
    custom: 'custom'
  }
  return path.join(outputDir, subdirs[kind])
}

// 핵심 함수들
export async function initResultDirs(outputDir = DEFAULT_OPTIONS.outputDir): Promise<void> {
  const dirs = [
    outputDir,
    path.join(outputDir, 'results'),
    path.join(outputDir, 'logs'),
    path.join(outputDir, 'screenshots'),
    path.join(outputDir, 'traces'),
    path.join(outputDir, 'videos'),
    path.join(outputDir, 'custom'),
  ]

  await Promise.all(dirs.map(ensureDir))
}

// 테스트 결과 저장
export async function saveTestResult(
  status: TestStatus,
  options: {
    testName?: string
    duration?: number
    details?: string
    error?: Error
    outputDir?: string
  } = {}
): Promise<string> {
  const outputDir = options.outputDir || DEFAULT_OPTIONS.outputDir
  const resultId = generateResultId()

  const result: TestResult = {
    id: resultId,
    timestamp: new Date().toISOString(),
    status,
    testName: options.testName,
    duration: options.duration,
    details: options.details,
    artifacts: [],
    error: options.error
    ? ({
        message: options.error.message,
        ...(options.error.stack !== undefined ? { stack: options.error.stack } : {})
      })
    : undefined
  }

  // 결과 파일 저장
  const resultPath = path.join(outputDir, 'results', `${resultId}.json`)
  await fs.writeFile(resultPath, JSON.stringify(result, null, 2))

  // 로그 파일에 한줄 추가
  const logPath = path.join(outputDir, 'logs', 'test-run.log')
  const logLine = `[${result.timestamp}] [${status}] ${options.testName || 'Unknown'} - ${options.details || ''}\n`
  await fs.appendFile(logPath, logLine)

  return resultId
}

// 아티팩트 저장
export async function saveArtifact(
  resultId: string,
  artifact: Artifact,
  outputDir = DEFAULT_OPTIONS.outputDir
): Promise<string | null> {
  try {
    if (artifact.buffer && artifact.buffer.length > DEFAULT_OPTIONS.maxArtifactSize) {
      console.warn(`Artifact too large: ${artifact.name} (${artifact.buffer.length} bytes)`)
      return null
    }

    if (artifact.buffer) {
      // 메모리 데이터를 파일로 저장
      const artifactDir = getArtifactDir(outputDir, artifact.kind)
      await ensureDir(artifactDir)

      const filename = `${resultId}-${artifact.name}`
      const filePath = path.join(artifactDir, filename)

      await fs.writeFile(filePath, artifact.buffer)
      return filePath
    } else if (artifact.path) {
      // 외부 경로만 기록
      return artifact.path
    }

    return null
  } catch (error) {
    console.error(`Failed to save artifact ${artifact.name}:`, error)
    return null
  }
}

// 스크린샷 저장
export async function captureScreenshot(
  resultId: string,
  screenshotBuffer: Buffer,
  outputDir = DEFAULT_OPTIONS.outputDir
): Promise<string | null> {
  const artifact: Artifact = {
    kind: 'screenshot',
    name: 'screenshot.png',
    buffer: screenshotBuffer
  }

  return saveArtifact(resultId, artifact, outputDir)
}

// 트레이스 저장
export async function saveTrace(
  resultId: string,
  tracePath: string,
  outputDir = DEFAULT_OPTIONS.outputDir
): Promise<string | null> {
  if (!DEFAULT_OPTIONS.saveTrace) return null

  const artifact: Artifact = {
    kind: 'trace',
    name: 'trace.zip',
    path: tracePath
  }

  return saveArtifact(resultId, artifact, outputDir)
}

// 결과에 아티팩트 경로 추가
export async function updateResultWithArtifacts(
  resultId: string,
  artifactPaths: string[],
  outputDir = DEFAULT_OPTIONS.outputDir
): Promise<void> {
  const resultPath = path.join(outputDir, 'results', `${resultId}.json`)

  try {
    const content = await fs.readFile(resultPath, 'utf-8')
    const result: TestResult = JSON.parse(content)

    result.artifacts = [...result.artifacts, ...artifactPaths.filter(Boolean)]

    await fs.writeFile(resultPath, JSON.stringify(result, null, 2))
  } catch (error) {
    console.error(`Failed to update result ${resultId}:`, error)
  }
}

// 오래된 아티팩트 정리
export async function cleanupOldArtifacts(
  outputDir = DEFAULT_OPTIONS.outputDir,
  maxAgeDays = testConfig.cleanupDays
): Promise<void> {
  if (maxAgeDays <= 0) return

  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - maxAgeDays)

  const dirs = [
    path.join(outputDir, 'results'),
    path.join(outputDir, 'screenshots'),
    path.join(outputDir, 'traces'),
    path.join(outputDir, 'videos'),
    path.join(outputDir, 'logs'),
  ]

  let cleanedCount = 0

  for (const dir of dirs) {
    try {
      const files = await fs.readdir(dir)

      for (const file of files) {
        const filePath = path.join(dir, file)
        const stats = await fs.stat(filePath)

        if (stats.mtime < cutoffDate) {
          await fs.unlink(filePath)
          cleanedCount++
        }
      }
    } catch (error) {
      // 디렉토리가 없거나 접근 불가한 경우 무시
    }
  }

  if (cleanedCount > 0) {
    console.log(`Cleaned up ${cleanedCount} old artifacts (older than ${maxAgeDays} days)`)
  }
}

// 간단한 사용 예시
export async function handleTestFailure(
  testName: string,
  error: Error,
  screenshotBuffer?: Buffer,
  tracePath?: string
): Promise<string> {
  // 기본 결과 저장
  const resultId = await saveTestResult('FAIL', {
    testName,
    error,
    details: error.message
  })

  // 아티팩트 수집
  const artifactPaths: string[] = []

  if (screenshotBuffer) {
    const screenshotPath = await captureScreenshot(resultId, screenshotBuffer)
    if (screenshotPath) artifactPaths.push(screenshotPath)
  }

  if (tracePath) {
    const savedTracePath = await saveTrace(resultId, tracePath)
    if (savedTracePath) artifactPaths.push(savedTracePath)
  }

  // 결과 업데이트
  if (artifactPaths.length > 0) {
    await updateResultWithArtifacts(resultId, artifactPaths)
  }

  return resultId
}

// 성공 처리
export async function handleTestSuccess(
  testName: string,
  duration: number
): Promise<string> {
  return saveTestResult('PASS', {
    testName,
    duration,
    details: 'Test passed successfully'
  })
}

// 통계 조회 (옵션)
export async function getTestStats(
  outputDir = DEFAULT_OPTIONS.outputDir
): Promise<{
  total: number
  passed: number
  failed: number
  skipped: number
}> {
  const resultsDir = path.join(outputDir, 'results')
  const stats = { total: 0, passed: 0, failed: 0, skipped: 0 }

  try {
    const files = await fs.readdir(resultsDir)

    for (const file of files.filter(f => f.endsWith('.json'))) {
      try {
        const content = await fs.readFile(path.join(resultsDir, file), 'utf-8')
        const result: TestResult = JSON.parse(content)

        stats.total++

        switch (result.status) {
          case 'PASS': stats.passed++; break
          case 'FAIL': stats.failed++; break
          case 'SKIP': stats.skipped++; break
        }
      } catch {
        // 파싱 실패한 파일 무시
      }
    }
  } catch {
    // 디렉토리 없음
  }

  return stats
}
