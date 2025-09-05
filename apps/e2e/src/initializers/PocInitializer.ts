/**
 * Description : PocInitializer.ts - 📌 각 POC 테스트 환경 초기화 및 정리 매니저 (POCEnv 기반, POCKey 제거 버전)
 * Author : Shiwoo Min
 * Date : 2025-04-11
 */
import { ApiTestEnv } from '@common/initializers/ApiTestEnv.js';
import { CleanupInitializer } from '@common/initializers/CleanupInitializer.js';
import { MobileWebTestEnv } from '@common/initializers/MobileWebTestEnv.js';
import { PcTestEnv } from '@common/initializers/PcTestEnv.js';
import { Logger } from '@common/logger/customLogger.js';
import type { TestEnvHandler } from '@common/types/test-env-handler.js';
import type winston from 'winston';

/**
 * 각 POC 이름에 대응하는 테스트 환경 핸들러 매핑
 */
const handlerMap: Record<string, TestEnvHandler> = {
  PC: new PcTestEnv(),
  MW: new MobileWebTestEnv(),
  API: new ApiTestEnv(),
};

/**
 * 각 POC에 대한 테스트 환경을 초기화 및 정리
 */
export class PocInitializer {
  private readonly poc: string;
  private readonly logger: winston.Logger;
  private readonly handler: TestEnvHandler;

  constructor(poc: string) {
    this.poc = poc.toUpperCase();
    this.logger = Logger.getLogger(this.poc) as winston.Logger;

    const handler = handlerMap[this.poc];
    if (!handler) {
      throw new Error(`[PocInitializer] Unknown POC: ${this.poc}`);
    }

    this.handler = handler;
  }

  /**
   * 모든 POC에 대한 테스트 환경 초기화 실행
   */
  public async setup(): Promise<void> {
    this.logger.info(`[SETUP] ${this.poc} 시작`);
    try {
      await new CleanupInitializer().run();
      await this.handler.setup();
      this.logger.info(`[SETUP] ${this.poc} 완료`);
    } catch (error: any) {
      this.logger.error(`[SETUP] ${this.poc} 실패 - ${error.message || error}`);

      // 안전하게 teardown 호출
      try {
        await this.handler.teardown();
      } catch (teardownError) {
        this.logger.warn(`[SETUP] 오류 발생 후 정리 중 추가 오류: ${teardownError}`);
      }
      throw error;
    }
  }

  /**
   * 모든 POC에 대한 테스트 환경 정리 작업 실행
   */
  public async teardown(): Promise<void> {
    this.logger.info(`[TEARDOWN] ${this.poc} 시작`);
    try {
      await this.handler.teardown();
      this.logger.info(`[TEARDOWN] ${this.poc} 완료`);
    } catch (error: any) {
      this.logger.error(`[TEARDOWN] ${this.poc} 실패 - ${error.message || error}`);
      throw error;
    }
  }
}
