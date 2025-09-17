/**
 * Description : setup.ts - 📌 Playwright 테스트 초기화
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

// 환경 변수 로드
function loadEnvironment() {
  const envPath = path.resolve(__dirname, '.env');
  dotenv.config({ path: envPath });
  logger.info(`[Setup] Environment loaded from: ${envPath}`);
}

// 필수 환경 변수 검증
function validateEnvironment() {
  const required = ['BASE_URL', 'API_URL', 'TEST_USER_EMAIL', 'TEST_USER_PASSWORD'];
  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  // URL 유효성 검증
  try {
    new URL(process.env['BASE_URL']!);
    new URL(process.env['API_URL']!);
  } catch {
    throw new Error('Invalid BASE_URL or API_URL format');
  }
}

// 아티팩트 디렉토리 설정
async function setupArtifacts() {
  const artifactRoot =
    process.env['E2E_ARTIFACTS_DIR'] || path.resolve(process.cwd(), 'e2e-artifacts');
  const dirs = ['results', 'logs', 'screenshots', 'traces', 'videos'];

  await fs.mkdir(artifactRoot, { recursive: true });

  for (const dir of dirs) {
    await fs.mkdir(path.join(artifactRoot, dir), { recursive: true });
  }

  // 이전 결과 정리
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

// 테스트 설정 파일 생성
async function createTestConfig(artifactRoot: string) {
  const config = {
    environment: {
      baseUrl: process.env['BASE_URL'],
      apiUrl: process.env['API_URL'],
      nodeEnv: process.env['NODE_ENV'] || 'test',
      ci: process.env['CI'] === 'true',
    },
    timeouts: {
      action: parseInt(process.env['ACTION_TIMEOUT'] || '30') * 1000,
      navigation: parseInt(process.env['NAVIGATION_TIMEOUT'] || '60') * 1000,
    },
    testAccounts: {
      user: {
        email: process.env['TEST_USER_EMAIL'],
        password: process.env['TEST_USER_PASSWORD'],
      },
      admin: {
        email: process.env['TEST_ADMIN_EMAIL'],
        password: process.env['TEST_ADMIN_PASSWORD'],
      },
    },
    meta: {
      buildNumber: process.env['BUILD_NUMBER'] || 'local',
      commitSha: process.env['COMMIT_SHA'] || 'local',
    },
  };

  const configPath = path.join(artifactRoot, 'test-config.json');
  await fs.writeFile(configPath, JSON.stringify(config, null, 2));
  logger.info(`[Setup] Test config created: ${configPath}`);
}

// 환경 정보 출력
function printEnvironmentInfo() {
  logger.info('────────────────────────────────────────');
  logger.info('[Setup] E2E Test Environment');
  logger.info(`BASE_URL: ${process.env['BASE_URL']}`);
  logger.info(`API_URL: ${process.env['API_URL']}`);
  logger.info(`NODE_ENV: ${process.env['NODE_ENV'] || 'test'}`);
  logger.info(`CI: ${process.env['CI'] === 'true'}`);
  logger.info(`HEADLESS: ${process.env['HEADLESS'] === 'true'}`);
  logger.info('────────────────────────────────────────');
}

export default async function globalSetup(): Promise<void> {
  try {
    loadEnvironment();
    validateEnvironment();
    printEnvironmentInfo();

    const artifactRoot = await setupArtifacts();
    await createTestConfig(artifactRoot);

    logger.info('[Setup] Initialization completed successfully');
  } catch (error) {
    logger.error(`[Setup] Initialization failed: ${error}`);
    throw error;
  }
}
