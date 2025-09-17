/**
 * Description : teardown.ts - 📌 Playwright 테스트 정리 작업
 * Author : Shiwoo Min
 * Date : 2025-09-04
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
}

// 테스트 결과 로그 저장
async function saveTestResults(status: 'PASS' | 'FAIL', message: string) {
  try {
    const artifactRoot =
      process.env['E2E_ARTIFACTS_DIR'] || path.resolve(process.cwd(), 'e2e-artifacts');
    const timestamp = new Date().toISOString();
    const buildNumber = process.env['BUILD_NUMBER'] || 'local';
    const commitSha = process.env['COMMIT_SHA'] || 'local';

    const resultLog = `[${timestamp}] ${status}: ${message} (Build: ${buildNumber}, Commit: ${commitSha})`;

    if (status === 'PASS') {
      logger.info(resultLog);
    } else {
      logger.error(resultLog);
    }

    const logPath = path.join(artifactRoot, 'logs', 'test-results.log');
    await fs.mkdir(path.dirname(logPath), { recursive: true });
    await fs.appendFile(logPath, resultLog + '\n');

    // 실패 시 Slack 알림
    if (status === 'FAIL' && process.env['SLACK_WEBHOOK_URL_TEST']) {
      await sendSlackNotification(message, buildNumber, commitSha);
    }
  } catch (error) {
    logger.error(`[Teardown] Failed to save test results: ${error}`);
  }
}

// Slack 알림 전송
async function sendSlackNotification(message: string, buildNumber: string, commitSha: string) {
  try {
    const webhookUrl = process.env['SLACK_WEBHOOK_URL_TEST'];
    if (!webhookUrl) return;

    const payload = {
      text: '🚨 E2E Test Failed',
      attachments: [
        {
          color: 'danger',
          fields: [
            { title: 'Message', value: message, short: false },
            { title: 'Build', value: buildNumber, short: true },
            { title: 'Commit', value: commitSha, short: true },
          ],
        },
      ],
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Slack API error: ${response.status}`);
    }

    logger.info('[Teardown] Slack notification sent');
  } catch (error) {
    logger.error(`[Teardown] Failed to send Slack notification: ${error}`);
  }
}

// 리소스 정리
async function cleanupResources() {
  try {
    // 테스트 설정 파일 정리 (선택적)
    if (process.env['CLEANUP_CONFIG_FILES'] === 'true') {
      const artifactRoot =
        process.env['E2E_ARTIFACTS_DIR'] || path.resolve(process.cwd(), 'e2e-artifacts');
      const configPath = path.join(artifactRoot, 'test-config.json');

      try {
        await fs.unlink(configPath);
        logger.info('[Teardown] Test config file cleaned up');
      } catch {
        // 파일이 없으면 무시
      }
    }

    // 추가 정리 작업이 필요하면 여기에 추가
    logger.info('[Teardown] Resource cleanup completed');
  } catch (error) {
    logger.error(`[Teardown] Resource cleanup failed: ${error}`);
    throw error;
  }
}

export default async function globalTeardown(): Promise<void> {
  try {
    loadEnvironment();
    logger.info('[Teardown] Starting cleanup process');

    await cleanupResources();
    await saveTestResults('PASS', 'Test teardown completed successfully');

    logger.info('[Teardown] Cleanup process completed');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error(`[Teardown] Cleanup process failed: ${errorMessage}`);

    await saveTestResults('FAIL', `Teardown error: ${errorMessage}`);
    throw error;
  }
}
