/**
 * Description : GlobalTeardown.ts - 📌 Playwright 테스트 실행 후 정리 작업
 * Author : Shiwoo Min
 * Date : 2025-09-04
 */
import dotenv from 'dotenv';
import { logger } from '../../packages/logger/customLogger.js';
import { ResultHandler } from '../../packages/logger/ResultHandler.js';

dotenv.config(); // e2e/.env 로드(없어도 무시)

export default async function globalTeardown(): Promise<void> {
  logger.info('[GlobalTeardown] 시작');

  // ResultHandler는 MVP 버전(패스/로그 저장)으로 가정
  const result = new ResultHandler();

  try {
    // 여기서 별도의 리소스 정리가 필요하면 수행(큐/세션/임시파일 등)
    // 예: await someTmpCleaner();

    logger.info('[GlobalTeardown] 전체 테스트 환경 정리 완료');

    // 최종 결과 PASS 저장
    await result.saveTestResult('PASS', '[GlobalTeardown] 테스트 정상 종료');
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    logger.error(`[GlobalTeardown] 실패: ${msg}`);

    // 최종 결과 FAIL 저장
    await result.saveTestResult('FAIL', `[GlobalTeardown] 오류: ${msg}`);
    throw err; // Playwright에 종료 에러 전파
  }
}
