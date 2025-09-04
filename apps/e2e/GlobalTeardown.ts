/**
 * Description : GlobalTeardown.ts - 📌 Playwright 테스트 실행 후 정리 작업
 * Author : Shiwoo Min
 * Date : 2025-04-11
 */
import { PocInitializer } from '@common/initializers/PocInitializer.js';
import { Logger } from '@common/logger/customLogger.js';
import { ResultHandler } from '@common/logger/ResultHandler.js';
import { POCEnv } from '@common/utils/env/POCEnv.js';
import dotenv from 'dotenv';
import type winston from 'winston';

dotenv.config();

class GlobalTeardown {
  // 단일 실행 POC 타입
  private readonly poc: string;
  // 전역 로거 인스턴스
  private readonly logger: winston.Logger;
  // 결과 저장 핸들러
  private readonly resultHandler: ResultHandler;

  constructor() {
    this.poc = POCEnv.getType();
    this.logger = Logger.getLogger(this.poc.toUpperCase()) as winston.Logger;
    this.resultHandler = new ResultHandler(this.poc);
  }

  public async run(): Promise<void> {
    this.logger.info(`[GLOBAL TEARDOWN] 시작 - 대상 POC: ${this.poc}`);

    try {
      const initializer = new PocInitializer(this.poc);
      await initializer.teardown();
      this.logger.info(`[GLOBAL TEARDOWN] 전체 테스트 환경 정리 완료`);

      await this.resultHandler.saveTestResult('PASS', '[GLOBAL TEARDOWN] 테스트 정상 종료');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      this.logger.error(`[GLOBAL TEARDOWN] 실패: ${errorMessage}`);

      await this.resultHandler.saveTestResult('FAIL', `[GLOBAL TEARDOWN] 오류: ${errorMessage}`);
      throw err;
    }
  }
}

export default async function globalTeardown(): Promise<void> {
  const handler = new GlobalTeardown();
  await handler.run();
}
