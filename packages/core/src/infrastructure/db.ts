/**
 * Description : db.ts - 📌 DB 어댑터(Prisma 래퍼)
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */

// 타입 임포트가 필요하면 다음 라인을 열어 사용 (verbatimModuleSyntax 고려)
// import type { Db } from '@connectwon/core/ports/db';

/**
 * @description Prisma 등 DB 클라이언트를 얇게 감싼 래퍼
 * @template TClient DB 클라이언트 타입(PrismaClient 등)
 */
export class PrismaDb /* implements Db */ {
  /**
   * @param {TClient} client DB 클라이언트 인스턴스
   */
  constructor(private readonly client: any) {}

  /**
   * @description 클라이언트 컨텍스트에서 콜백 실행
   * @template T 반환 타입
   * @param {(client: any) => Promise<T>} fn 실행 함수
   * @returns {Promise<T>}
   */
  async run<T>(fn: (client: any) => Promise<T>): Promise<T> {
    try {
      return await fn(this.client);
    } catch (err) {
      // 로깅/매핑 지점
      throw err;
    }
  }

  /**
   * @description 트랜잭션으로 래핑하여 콜백 실행
   * @template T 반환 타입
   * @param {(tx: any) => Promise<T>} fn 트랜잭션 내 실행 함수
   * @returns {Promise<T>}
   */
  async tx<T>(fn: (tx: any) => Promise<T>): Promise<T> {
    if (!this.client?.$transaction) {
      return fn(this.client);
    }
    return this.client.$transaction(async (tx: any) => fn(tx));
  }

  /**
   * @description DB 연결 헬스체크
   * @returns {Promise<boolean>} 성공 여부
   */
  async health(): Promise<boolean> {
    try {
      if (this.client?.$queryRaw) {
        await this.client.$queryRaw`SELECT 1`;
        return true;
      }
      if (this.client?.query) {
        await this.client.query('SELECT 1');
        return true;
      }
      return !!this.client;
    } catch {
      return false;
    }
  }

  /**
   * @description 연결 종료(드라이버별 API 호출)
   * @returns {Promise<void>}
   */
  async close(): Promise<void> {
    try {
      if (this.client?.$disconnect) await this.client.$disconnect();
      else if (this.client?.end) await this.client.end();
    } catch {
      // noop
    }
  }
}
