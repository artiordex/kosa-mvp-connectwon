/**
 * Description : db.adapter.ts - 📌 Prisma 어댑터 (DatabaseConnection 포트 구현)
 * Author : Shiwoo Min
 * Date : 2025-09-27
 */
import type { DatabaseConnection, PoolStats, QueryResult, Transaction } from '@connectwon/core/ports/db.port';

export class PrismaDb implements DatabaseConnection {
  constructor(private readonly client: any) {}

  async connect(): Promise<void> {
    if (this.client?.$connect) {
      await this.client.$connect();
    }
  }

  async disconnect(): Promise<void> {
    try {
      if (this.client?.$disconnect) {
        await this.client.$disconnect();
      }
    } catch {
      // 연결 해제 실패는 무시
    }
  }

  isConnected(): boolean {
    // Prisma는 lazy connection이므로 client 존재 여부로 판단
    return !!this.client;
  }

  async ping(): Promise<boolean> {
    try {
      await this.client.$queryRaw`SELECT 1`;
      return true;
    } catch {
      return false;
    }
  }

  async query<T = unknown>(sql: string, params?: unknown[]): Promise<T[]> {
    return this.client.$queryRawUnsafe(sql, ...(params || []));
  }

  async queryOne<T = unknown>(sql: string, params?: unknown[]): Promise<T | null> {
    const results = await this.query<T>(sql, params);
    return results[0] || null;
  }

  async execute(sql: string, params?: unknown[]): Promise<QueryResult> {
    const rowCount = await this.client.$executeRawUnsafe(sql, ...(params || []));
    return { rowCount, affectedRows: rowCount };
  }

  async transaction<T>(callback: (tx: Transaction) => Promise<T>): Promise<T> {
    return this.client.$transaction(async (prismaTx: any) => {
      const txWrapper: Transaction = {
        query: <U>(sql: string, params?: unknown[]) => prismaTx.$queryRawUnsafe(sql, ...(params || [])),
        queryOne: async <U>(sql: string, params?: unknown[]) => {
          const results = await prismaTx.$queryRawUnsafe<U[]>(sql, ...(params || []));
          return results[0] || null;
        },
        execute: async (sql: string, params?: unknown[]) => {
          const rowCount = await prismaTx.$executeRawUnsafe(sql, ...(params || []));
          return { rowCount, affectedRows: rowCount };
        },
        commit: async () => {
          // Prisma 트랜잭션은 자동 커밋
        },
        rollback: async () => {
          throw new Error('Explicit rollback - triggers Prisma rollback');
        },
      };

      return callback(txWrapper);
    });
  }

  async getPoolStats(): Promise<PoolStats> {
    // Prisma는 풀 상태를 노출하지 않음 → 기본값 제공
    return {
      totalConnections: 1,
      idleConnections: 0,
      activeConnections: 1,
      waitingClients: 0,
    };
  }

  async health(): Promise<boolean> {
    return this.ping();
  }

  async close(): Promise<void> {
    await this.disconnect();
  }
}
