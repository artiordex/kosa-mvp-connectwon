/**
 * Description : db.adapter.ts - 📌 Prisma 어댑터 (DatabaseConnection 포트 구현)
 * Author : Shiwoo Min
 * Date : 2025-09-29
 */
import type { DatabaseConnection, PoolStats, Transaction } from '@connectwon/core/ports/db.port.js';
import { PrismaClient } from '@prisma/client';

/**
 * @class PrismaDb
 * @implements {DatabaseConnection}
 * @description
 * Prisma Client를 기반으로 실제 DB 접근을 수행하는 어댑터.
 * - `db.port.ts`에서 정의한 포트 인터페이스(DatabaseConnection)를 구현한다.
 * - 내부적으로 Prisma Client를 감싸, 포트 계층에서는 ORM에 종속되지 않고 DB 접근이 가능하다.
 */
export class PrismaDb implements DatabaseConnection {
  constructor(private readonly client: PrismaClient) {}

  /**
   * @description DB 연결을 초기화
   */
  async connect(): Promise<void> {
    await this.client.$connect();
  }

  /**
   * @description DB 연결을 해제
   */
  async disconnect(): Promise<void> {
    try {
      await this.client.$disconnect();
    } catch {
      // 연결 해제 실패는 무시
    }
  }

  /**
   * @description 연결 여부 확인
   * @returns {boolean} Prisma Client 인스턴스 존재 여부
   */
  isConnected(): boolean {
    // Prisma는 lazy connection → Client 인스턴스만 확인
    return !!this.client;
  }

  /**
   * @description DB 헬스 체크 (ping)
   * @returns {Promise<boolean>} SELECT 1 실행 성공 여부
   */
  async ping(): Promise<boolean> {
    try {
      await this.client.$queryRawUnsafe('SELECT 1');
      return true;
    } catch {
      return false;
    }
  }

  /**
   * @description Raw SQL 실행 (SELECT 계열)
   * @param {string} sql 실행할 SQL
   * @param {unknown[]} [params] 바인딩 파라미터
   * @returns {Promise<T[]>} 결과 배열
   */
  async rawQuery<T = unknown>(sql: string, params?: unknown[]): Promise<T[]> {
    const result = await this.client.$queryRawUnsafe(sql, ...(params || []));
    return result as T[];
  }

  /**
   * @description Raw SQL 실행 (INSERT/UPDATE/DELETE 계열)
   * @param {string} sql 실행할 SQL
   * @param {unknown[]} [params] 바인딩 파라미터
   * @returns {Promise<number>} 영향받은 행(rowCount)
   */
  async rawExecute(sql: string, params?: unknown[]): Promise<number> {
    const rowCount = await this.client.$executeRawUnsafe(sql, ...(params || []));
    return rowCount;
  }

  /**
   * @description 단일 행 조회
   * @param {string} sql 실행할 SQL
   * @param {unknown[]} [params] 바인딩 파라미터
   * @returns {Promise<T | null>} 단일 행 객체 또는 null
   */
  async queryOne<T = unknown>(sql: string, params?: unknown[]): Promise<T | null> {
    const results = await this.rawQuery<T>(sql, params);
    return results[0] || null;
  }

  /**
   * @description 트랜잭션 실행
   * @param {Function} callback 트랜잭션 내에서 실행할 함수
   * @returns {Promise<T>} 트랜잭션 결과
   * });
   */
  async transaction<T>(callback: (tx: Transaction) => Promise<T>): Promise<T> {
    return this.client.$transaction(async prismaTx => {
      const txWrapper: Transaction = {
        rawQuery: async <U>(sql: string, params?: unknown[]) => {
          const result = await prismaTx.$queryRawUnsafe(sql, ...(params || []));
          return result as U[];
        },
        rawExecute: async (sql: string, params?: unknown[]) => {
          const rowCount = await prismaTx.$executeRawUnsafe(sql, ...(params || []));
          return rowCount;
        },
      };
      return callback(txWrapper);
    });
  }

  /**
   * @description 연결 풀 상태 (Prisma는 풀을 직접 노출하지 않음 → 기본값 제공)
   */
  async getPoolStats(): Promise<PoolStats> {
    return {
      totalConnections: 1,
      idleConnections: 0,
      activeConnections: 1,
      waitingClients: 0,
    };
  }

  /**
   * @description Prisma Client 인스턴스 직접 반환
   */
  getClient(): PrismaClient {
    return this.client;
  }
}
