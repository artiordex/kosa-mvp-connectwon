/**
 * Description : globalSetup.ts - 📌 Playwright 테스트 실행 초기화 작업
 * Author      : Shiwoo Min
 * Date        : 2025-09-07
 */
import dotenv from 'dotenv';
import * as fs from 'fs/promises';
import os from 'os';
import path, { dirname } from 'path';
import 'tsconfig-paths/register.js';
import { fileURLToPath } from 'url';

import { logger } from '../../packages/logger/src/logger.js';

// ESM __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// .env 로더 (e2e/.env 고정 로드)
function loadEnvFromE2E() {
  const envPath = path.resolve(__dirname, '.env');
  dotenv.config({ path: envPath });
  logger.info(`[GlobalSetup] .env loaded from: ${envPath}`);
}
loadEnvFromE2E();

// 상수/유틸
const ARTIFACT_ROOT =
  process.env['E2E_ARTIFACTS_DIR'] || path.resolve(process.cwd(), 'e2e-artifacts');

const getEnvConfig = () => ({
  nodeEnv: process.env['NODE_ENV'] || 'test',
  ci: process.env['CI'] === 'true',
  headless: process.env['HEADLESS'] === 'true',
  baseUrl: process.env['BASE_URL'] || 'http://localhost:3000',
  apiUrl: process.env['API_URL'] || 'http://localhost:8000',
  actionTimeout: parseInt(process.env['ACTION_TIMEOUT'] || '30', 10) * 1000,
  navigationTimeout: parseInt(process.env['NAVIGATION_TIMEOUT'] || '60', 10) * 1000,
  slowMo: parseInt(process.env['SLOW_MO'] || '100', 10),
  browserLaunchTimeout: parseInt(process.env['BROWSER_LAUNCH_TIMEOUT'] || '60000', 10),
  startWebServer: process.env['START_WEB_SERVER'] === 'true',
  webCommand: process.env['WEB_COMMAND'] || 'pnpm dev',
  buildNumber: process.env['BUILD_NUMBER'] || 'local',
  commitSha: process.env['COMMIT_SHA'] || 'local',
});

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}
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
    // ignore
  }
}

function validateUrls() {
  const { baseUrl, apiUrl } = getEnvConfig();
  try {
    new URL(baseUrl);
  } catch {
    throw new Error(`[GlobalSetup] BASE_URL 형식이 올바르지 않습니다: ${baseUrl}`);
  }
  try {
    new URL(apiUrl);
  } catch {
    throw new Error(`[GlobalSetup] API_URL 형식이 올바르지 않습니다: ${apiUrl}`);
  }
}

function validateRequiredEnvVars() {
  const required = ['BASE_URL', 'API_URL', 'TEST_USER_EMAIL', 'TEST_USER_PASSWORD'];
  const missing = required.filter(k => !process.env[k]);
  if (missing.length) {
    throw new Error(`[GlobalSetup] 필수 환경 변수가 누락: ${missing.join(', ')}`);
  }
}

function printEnvSummary() {
  const cfg = getEnvConfig();
  const workers = cfg.ci ? 1 : Math.max(1, Math.floor(os.cpus().length * 0.75));

  logger.info('────────────────────────────────────────');
  logger.info('[GlobalSetup] Playwright E2E 초기화 시작');
  logger.info(`NODE_ENV           : ${cfg.nodeEnv}`);
  logger.info(`CI                 : ${cfg.ci}`);
  logger.info(`HEADLESS           : ${cfg.headless}`);
  logger.info(`BASE_URL           : ${cfg.baseUrl}`);
  logger.info(`API_URL            : ${cfg.apiUrl}`);
  logger.info(`ACTION_TIMEOUT     : ${cfg.actionTimeout}ms`);
  logger.info(`NAVIGATION_TIMEOUT : ${cfg.navigationTimeout}ms`);
  logger.info(`SLOW_MO            : ${cfg.slowMo}ms`);
  logger.info(`WORKERS(target)    : ${workers}`);
  logger.info(`ARTIFACT_ROOT      : ${ARTIFACT_ROOT}`);
  logger.info(`BUILD_NUMBER       : ${cfg.buildNumber}`);
  logger.info(`COMMIT_SHA         : ${cfg.commitSha}`);
  if (cfg.startWebServer) logger.info(`WEB_COMMAND        : ${cfg.webCommand}`);
  logger.info('────────────────────────────────────────');
}

async function setupArtifactDirectories() {
  const dirs = [
    ARTIFACT_ROOT,
    path.join(ARTIFACT_ROOT, 'results'),
    path.join(ARTIFACT_ROOT, 'logs'),
    path.join(ARTIFACT_ROOT, 'screenshots'),
    path.join(ARTIFACT_ROOT, 'traces'),
    path.join(ARTIFACT_ROOT, 'videos'),
  ];
  await Promise.all(dirs.map(ensureDir));

  if (process.env['CLEAR_ARTIFACTS'] === 'true') {
    await Promise.all(
      ['results', 'logs', 'screenshots', 'traces', 'videos'].map(d =>
        emptyDir(path.join(ARTIFACT_ROOT, d)),
      ),
    );
    logger.warn('[GlobalSetup] 이전 아티팩트 정리 완료 (CLEAR_ARTIFACTS=true)');
  }
}

function setupTimezone() {
  if (process.env['TZ']) {
    logger.info(`[GlobalSetup] TZ 적용: ${process.env['TZ']}`);
  }
}

async function createTestConfig() {
  const cfg = getEnvConfig();
  const testConfig = {
    environment: {
      nodeEnv: cfg.nodeEnv,
      ci: cfg.ci,
      baseUrl: cfg.baseUrl,
      apiUrl: cfg.apiUrl,
    },
    timeouts: {
      action: cfg.actionTimeout,
      navigation: cfg.navigationTimeout,
      browserLaunch: cfg.browserLaunchTimeout,
    },
    performance: { slowMo: cfg.slowMo },
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
    oauth: {
      google: {
        clientId: process.env['GOOGLE_CLIENT_ID'],
        clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
        redirectUri: process.env['GOOGLE_REDIRECT_URI'],
      },
    },
    database: { testUrl: process.env['TEST_DATABASE_URL'] },
    notifications: {
      slack: { webhookUrl: process.env['SLACK_WEBHOOK_URL_TEST'] },
      email: {
        enabled: process.env['EMAIL_NOTIFICATION'] === 'true',
        recipients: process.env['EMAIL_RECIPIENTS'],
      },
    },
    meta: { buildNumber: cfg.buildNumber, commitSha: cfg.commitSha },
  };

  const configPath = path.join(ARTIFACT_ROOT, 'test-config.json');
  await fs.writeFile(configPath, JSON.stringify(testConfig, null, 2));
  logger.info(`[GlobalSetup] 테스트 설정 파일 생성: ${configPath}`);
}

export default async function globalSetup(): Promise<void> {
  try {
    printEnvSummary();
    validateRequiredEnvVars();
    validateUrls();
    await setupArtifactDirectories();
    await createTestConfig();
    setupTimezone();
    logger.info('[GlobalSetup] 초기화 완료');
  } catch (error) {
    logger.error(`[GlobalSetup] 초기화 실패: ${error}`);
    throw error;
  }
}
