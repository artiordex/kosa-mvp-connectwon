/**
 * Description : globalTeardown.ts - 📌 Playwright 테스트 실행 후 정리 작업
 * Author : Shiwoo Min
 * Date : 2025-09-04
 */
import dotenv from 'dotenv';
import { logger } from '../../packages/logger/customLogger.js';

dotenv.config(); // e2e/.env 로드(없어도 무시)

// 테스트 결과 저장 함수
async function saveTestResult(status: 'PASS' | 'FAIL', message: string): Promise<void> {
  try {
    // MVP 버전: 간단한 로그 기반 결과 저장
    const timestamp = new Date().toISOString();
    const resultLog = `[${timestamp}] STATUS: ${status} - ${message}`;

    // 콘솔 로그
    if (status === 'PASS') {
      logger.info(resultLog);
    } else {
      logger.error(resultLog);
    }

    // 필요시 파일 시스템에 저장하는 로직 추가 가능
    // await fs.writeFile('test-results.log', resultLog + '\n', { flag: 'a' });

  } catch (error) {
    logger.error(`[saveTestResult] 결과 저장 실패: ${error}`);
  }
}

// 리소스 정리 함수
async function cleanupResources(): Promise<void> {
  try {
    // 여기서 별도의 리소스 정리가 필요하면 수행(큐/세션/임시파일 등)
    // 예: await someTmpCleaner();
    // 예: await closeDbConnections();
    // 예: await clearTempFiles();

    logger.info('[cleanupResources] 리소스 정리 완료');
  } catch (error) {
    logger.error(`[cleanupResources] 리소스 정리 실패: ${error}`);
    throw error;
  }
}

// 최종 정리 작업 함수
async function performFinalCleanup(): Promise<void> {
  try {
    await cleanupResources();
    logger.info('[GlobalTeardown] 전체 테스트 환경 정리 완료');
  } catch (error) {
    logger.error(`[GlobalTeardown] 정리 작업 실패: ${error}`);
    throw error;
  }
}

export default async function globalTeardown(): Promise<void> {
  logger.info('[GlobalTeardown] 시작');

  try {
    await performFinalCleanup();

    // 최종 결과 PASS 저장
    await saveTestResult('PASS', '[GlobalTeardown] 테스트 정상 종료');
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    logger.error(`[GlobalTeardown] 실패: ${msg}`);

    // 최종 결과 FAIL 저장
    await saveTestResult('FAIL', `[GlobalTeardown] 오류: ${msg}`);
    throw err; // Playwright에 종료 에러 전파
  }
}
