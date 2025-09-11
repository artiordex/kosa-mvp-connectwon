/**
 * Description : db.ts - 📌 DB 어댑터(Prisma 래퍼)
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */

// 타입 임포트가 필요하면 다음 라인을 열어 사용 (verbatimModuleSyntax 고려)
// import type { Db } from '@connectwon/core/ports/db';

export class PrismaDb /* implements Db */ {
  constructor(private readonly client: any) {} // PrismaClient 등

  // 임의의 동작을 DB 클라이언트 컨텍스트에서 실행
  async run<T>(fn: (client: any) => Promise<T>): Promise<T> {
    try {
      return await fn(this.client);
    } catch (err) {
      // 로깅 훅 연결 가능
      throw err;
    }
  }

  // 트랜잭션 래핑
  async tx<T>(fn: (tx: any) => Promise<T>): Promise<T> {
    if (!this.client?.$transaction) {
      // 드라이버가 트랜잭션 API를 지원하지 않는 경우
      return fn(this.client);
    }
    return this.client.$transaction(async (tx: any) => fn(tx));
  }

  // 헬스체크 (드라이버에 맞게 수정)
  async health(): Promise<boolean> {
    try {
      if (this.client?.$queryRaw) {
        // Prisma 환경
        await this.client.$queryRaw`SELECT 1`;
        return true;
      }
      if (this.client?.query) {
        // node-postgres 등
        await this.client.query('SELECT 1');
        return true;
      }
      // 최소 보장
      return !!this.client;
    } catch {
      return false;
    }
  }

  // 종료 훅
  async close(): Promise<void> {
    try {
      if (this.client?.$disconnect) await this.client.$disconnect();
      else if (this.client?.end) await this.client.end();
    } catch {
      // noop
    }
  }
}
