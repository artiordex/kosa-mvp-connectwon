/**
 * Description : globalTeardown.ts - 📌 Playwright 테스트 실행 후 정리 작업
 * Author      : Shiwoo Min
 * Date        : 2025-09-04
 */
import dotenv from 'dotenv';
import * as fs from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { logger } from '../../packages/logger/src/logger.js';

// ESM __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// .env 로더 (e2e/.env 고정 로드)
function loadEnvFromE2E() {
  const envPath = path.resolve(__dirname, '.env');
  dotenv.config({ path: envPath });
  logger.info(`[GlobalTeardown] .env loaded from: ${envPath}`);
}
loadEnvFromE2E();

// 유틸
const ARTIFACT_ROOT =
  process.env['E2E_ARTIFACTS_DIR'] || path.resolve(process.cwd(), 'e2e-artifacts');

async function saveTestResult(status: 'PASS' | 'FAIL', message: string) {
  try {
    const timestamp = new Date().toISOString();
    const buildNumber = process.env['BUILD_NUMBER'] || 'local';
    const commitSha = process.env['COMMIT_SHA'] || 'local';

    const resultLog = `[${timestamp}] STATUS: ${status} - ${message} (Build: ${buildNumber}, Commit: ${commitSha})`;

    if (status === 'PASS') logger.info(resultLog);
    else logger.error(resultLog);

    const resultPath = path.join(ARTIFACT_ROOT, 'logs', 'test-results.log');
    await fs.mkdir(path.dirname(resultPath), { recursive: true });
    await fs.writeFile(resultPath, resultLog + '\n', { flag: 'a' });

    if (process.env['SLACK_WEBHOOK_URL_TEST'] && status === 'FAIL') {
      await sendSlackNotification(status, message, buildNumber, commitSha);
    }
  } catch (error) {
    logger.error(`[saveTestResult] 결과 저장 실패: ${error}`);
  }
}

async function sendSlackNotification(
  status: 'PASS' | 'FAIL',
  message: string,
  buildNumber: string,
  commitSha: string,
) {
  try {
    const webhookUrl = process.env['SLACK_WEBHOOK_URL_TEST'];
    if (!webhookUrl) return;

    const payload = {
      text: `🚨 E2E 테스트 실패`,
      attachments: [
        {
          color: status === 'PASS' ? 'good' : 'danger',
          fields: [
            { title: 'Status', value: status, short: true },
            { title: 'Message', value: message, short: false },
            { title: 'Build Number', value: buildNumber, short: true },
            { title: 'Commit SHA', value: commitSha, short: true },
          ],
        },
      ],
    };

    const resp = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!resp.ok) throw new Error(`Slack API error: ${resp.status}`);

    logger.info('[sendSlackNotification] Slack 알림 전송 완료');
  } catch (error) {
    logger.error(`[sendSlackNotification] Slack 알림 전송 실패: ${error}`);
  }
}

async function cleanupResources() {
  try {
    if (process.env['TEST_DATABASE_URL']) {
      // TODO: 필요시 테스트 DB 정리 로직
      logger.info('[cleanupResources] 테스트 DB 정리 스킵');
    }
    // TODO: 필요 시 임시 파일 정리 로직
    logger.info('[cleanupResources] 리소스 정리 완료');
  } catch (error) {
    logger.error(`[cleanupResources] 리소스 정리 실패: ${error}`);
    throw error;
  }
}

export default async function globalTeardown(): Promise<void> {
  logger.info('[GlobalTeardown] 시작');
  try {
    await cleanupResources();

    if (process.env['CLEANUP_CONFIG_FILES'] === 'true') {
      const configPath = path.join(ARTIFACT_ROOT, 'test-config.json');
      try {
        await fs.unlink(configPath);
        logger.info('[GlobalTeardown] 테스트 설정 파일 정리 완료');
      } catch {
        // 파일 없으면 무시
      }
    }

    await saveTestResult('PASS', '[GlobalTeardown] 테스트 정상 종료');
    logger.info('[GlobalTeardown] 전체 테스트 환경 정리 완료');
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    logger.error(`[GlobalTeardown] 실패: ${msg}`);
    await saveTestResult('FAIL', `[GlobalTeardown] 오류: ${msg}`);
    throw err;
  }
}
