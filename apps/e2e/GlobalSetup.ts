/**
 * Description : GlobalSetup.ts - 📌 Playwright 테스트 실행 초기화 작업
 * Author : Shiwoo Min
 * Date : 2025-09-07
 */
import 'tsconfig-paths/register.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import os from 'os';
import * as fs from 'fs/promises';
import dotenv from 'dotenv';
import { logger } from '../../packages/logger/customLogger.js';

const __filename = fileURLToPath(import.meta.url); // ESM용 __filename
const __dirname = dirname(__filename); // ESM용 __dirname

dotenv.config({ path: path.resolve(__dirname, '.env') }); // e2e/.env 로드(없어도 무시)

// 아티팩트 루트(리포트/스크린샷/비디오 등 저장 위치)
const ARTIFACT_ROOT = process.env.E2E_ARTIFACTS_DIR || path.resolve(process.cwd(), 'e2e-artifacts');

// 디렉터리 생성 보장
async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

// 디렉터리 비우기(옵션)
async function emptyDir(dir: string) {
  try {
    const items = await fs.readdir(dir);
    await Promise.all(
      items.map(async name => {
        const p = path.join(dir, name);
        const stat = await fs.lstat(p);
        if (stat.isDirectory()) await fs.rm(p, { recursive: true, force: true });
        else await fs.rm(p, { force: true });
      }),
    );
  } catch {
    // 폴더가 없으면 무시
  }
}

// BASE_URL 형식 간단 검증
function validateBaseUrl() {
  const base = process.env.BASE_URL ?? 'http://localhost:3000';
  try {
    new URL(base);
  } catch {
    throw new Error(`[GlobalSetup] BASE_URL 형식이 올바르지 않습니다: ${base}`);
  }
}

// 환경 요약 로그
function printEnvSummary() {
  const headless = process.env.HEADLESS ?? '(unset)';
  const baseUrl = process.env.BASE_URL ?? 'http://localhost:3000';
  const slowMo = process.env.SLOW_MO ?? '0';
  const workers = process.env.CI ? 1 : Math.max(1, Math.floor(os.cpus().length * 0.75));

  logger.info('────────────────────────────────────────');
  logger.info('[GlobalSetup] Playwright MVP 초기화 시작');
  logger.info(`[GlobalSetup] BASE_URL        : ${baseUrl}`);
  logger.info(`[GlobalSetup] HEADLESS        : ${headless}`);
  logger.info(`[GlobalSetup] SLOW_MO         : ${slowMo}ms`);
  logger.info(`[GlobalSetup] WORKERS(target) : ${workers}`);
  logger.info(`[GlobalSetup] ARTIFACT_ROOT   : ${ARTIFACT_ROOT}`);
  logger.info('────────────────────────────────────────');
}

export default async function globalSetup(): Promise<void> {
  printEnvSummary(); // 환경 요약
  validateBaseUrl(); // BASE_URL 검증

  // 아티팩트 기본 폴더 구성
  const dirs = [
    ARTIFACT_ROOT,
    path.join(ARTIFACT_ROOT, 'results'),
    path.join(ARTIFACT_ROOT, 'logs'),
    path.join(ARTIFACT_ROOT, 'screenshots'),
    path.join(ARTIFACT_ROOT, 'traces'),
    path.join(ARTIFACT_ROOT, 'videos'),
  ];

  await Promise.all(dirs.map(ensureDir)); // 아티팩트 폴더 보장

  if (process.env.CLEAR_ARTIFACTS === 'true') {
    // 이전 실행 산출물 정리(선택)
    await Promise.all(
      ['results', 'logs', 'screenshots', 'traces', 'videos'].map(d =>
        emptyDir(path.join(ARTIFACT_ROOT, d)),
      ),
    );
    logger.warn('[GlobalSetup] 이전 아티팩트 정리 완료 (CLEAR_ARTIFACTS=true)');
  }

  if (process.env.TZ && process.env.TZ.length > 0) {
    // 타임존 강제(옵션)
    logger.info(`[GlobalSetup] TZ 적용: ${process.env.TZ}`);
  }

  logger.info('[GlobalSetup] 초기화 완료');
}
