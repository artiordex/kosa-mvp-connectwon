/**
 * Description : setup.ts - 📌 Playwright 테스트 초기화 루틴
 * Author : Shiwoo Min
 * Date : 2025-09-07
 * 09-17 - 클래스 -> 간단한 유틸구조로 변경
 */
import { logger } from '@connectwon/logger';
import dotenv from 'dotenv';
import * as fs from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * @description .env 파일을 로드
 * @returns {void}
 */
function loadEnvironment(): void {
  const envPath = path.resolve(__dirname, '.env');
  dotenv.config({ path: envPath });
  logger.info(`[Setup] Environment loaded from: ${envPath}`);
}

/**
 * @description 필수 환경 변수를 검증
 * @throws {Error} 누락/형식 오류가 있으면 예외를 던진다.
 * @returns {void}
 */
function validateEnvironment(): void {
  const required = ['BASE_URL', 'API_URL', 'TEST_USER_EMAIL', 'TEST_USER_PASSWORD'] as const;
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  try {
    // URL 형식 검증
    new URL(process.env['BASE_URL']!);
    new URL(process.env['API_URL']!);
  } catch {
    throw new Error('Invalid BASE_URL or API_URL format');
  }
}

/**
 * @description E2E 아티팩트 디렉토리(로그, 스크린샷 등)를 준비
 * @returns {Promise<string>} 준비된 루트 디렉토리 경로
 */
async function setupArtifacts(): Promise<string> {
  const artifactRoot =
    process.env['E2E_ARTIFACTS_DIR'] || path.resolve(process.cwd(), 'e2e-artifacts');
  const dirs = ['results', 'logs', 'screenshots', 'traces', 'videos'];

  await fs.mkdir(artifactRoot, { recursive: true });
  for (const dir of dirs) {
    await fs.mkdir(path.join(artifactRoot, dir), { recursive: true });
  }

  if (process.env['CLEAR_ARTIFACTS'] === 'true') {
    for (const dir of dirs) {
      try {
        await fs.rm(path.join(artifactRoot, dir), { recursive: true, force: true });
        await fs.mkdir(path.join(artifactRoot, dir), { recursive: true });
      } catch {
        // 디렉토리가 없으면 무시
      }
    }
    logger.warn('[Setup] Previous artifacts cleared');
  }

  return artifactRoot;
}

/**
 * @description 테스트에 전달할 설정 JSON을 생성
 * @param {string} artifactRoot 기록 파일을 둘 루트 디렉토리
 * @returns {Promise<void>}
 */
async function createTestConfig(artifactRoot: string): Promise<void> {
  const config = {
    environment: {
      baseUrl: process.env['BASE_URL'],
      apiUrl: process.env['API_URL'],
      nodeEnv: process.env['NODE_ENV'] || 'test',
      ci: process.env['CI'] === 'true'
    },
    timeouts: {
      action: parseInt(process.env['ACTION_TIMEOUT'] || '30', 10) * 1000,
      navigation: parseInt(process.env['NAVIGATION_TIMEOUT'] || '60', 10) * 1000
    },
    testAccounts: {
      user: {
        email: process.env['TEST_USER_EMAIL'],
        password: process.env['TEST_USER_PASSWORD']
      },
      admin: {
        email: process.env['TEST_ADMIN_EMAIL'],
        password: process.env['TEST_ADMIN_PASSWORD']
      }
    },
    meta: {
      buildNumber: process.env['BUILD_NUMBER'] || 'local',
      commitSha: process.env['COMMIT_SHA'] || 'local'
    }
  } as const;

  const configPath = path.join(artifactRoot, 'test-config.json');
  await fs.writeFile(configPath, JSON.stringify(config, null, 2));
  logger.info(`[Setup] Test config created: ${configPath}`);
}

/**
 * @description 현재 테스트 환경 요약 출력
 * @returns {void}
 */
function printEnvironmentInfo(): void {
  logger.info('────────────────────────────────────────');
  logger.info('[Setup] E2E Test Environment');
  logger.info(`BASE_URL: ${process.env['BASE_URL']}`);
  logger.info(`API_URL: ${process.env['API_URL']}`);
  logger.info(`NODE_ENV: ${process.env['NODE_ENV'] || 'test'}`);
  logger.info(`CI: ${process.env['CI'] === 'true'}`);
  logger.info(`HEADLESS: ${process.env['HEADLESS'] === 'true'}`);
  logger.info('────────────────────────────────────────');
}

/**
 * @description Playwright 글로벌 셋업 엔트리포인트
 * @returns {Promise<void>}
 */
export default async function globalSetup(): Promise<void> {
  try {
    loadEnvironment();
    validateEnvironment();
    printEnvironmentInfo();
    const artifactRoot = await setupArtifacts();
    await createTestConfig(artifactRoot);
    logger.info('[Setup] Initialization completed successfully');
  } catch (error) {
    logger.error(`[Setup] Initialization failed: ${String(error)}`);
    throw error;
  }
}
