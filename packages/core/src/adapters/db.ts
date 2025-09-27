/**
 * Description : db.ts - 📌 데이터베이스 포트 및 Prisma 어댑터
 * Author : Shiwoo Min
 * Date : 2025-09-27
 */
/**
 * @description DB 연결 포트
 */
export interface DatabaseConnection {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  isConnected(): boolean;
  ping(): Promise<boolean>;
  query<T = unknown>(sql: string, params?: unknown[]): Promise<T[]>;
  queryOne<T = unknown>(sql: string, params?: unknown[]): Promise<T | null>;
  execute(sql: string, params?: unknown[]): Promise<QueryResult>;
  transaction<T>(callback: (tx: Transaction) => Promise<T>): Promise<T>;
  getPoolStats(): Promise<PoolStats>;
}

/**
 * @description 트랜잭션 컨텍스트
 */
export interface Transaction {
  query<T = unknown>(sql: string, params?: unknown[]): Promise<T[]>;
  queryOne<T = unknown>(sql: string, params?: unknown[]): Promise<T | null>;
  execute(sql: string, params?: unknown[]): Promise<QueryResult>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
}

/**
 * @description 변경계열 실행 결과
 */
export interface QueryResult {
  rowCount: number;
  affectedRows?: number;
  insertId?: string | number;
}

/**
 * @description 연결 풀 상태
 */
export interface PoolStats {
  totalConnections: number;
  idleConnections: number;
  activeConnections: number;
  waitingClients: number;
}

/**
 * @description DB 모니터링 포트
 */
export interface DatabaseMonitoring {
  getQueryStats(): Promise<QueryStats>;
  getConnectionStats(): Promise<ConnectionStats>;
  getDatabaseSize(): Promise<number>;
  healthCheck(): Promise<HealthStatus>;
}

export interface QueryStats {
  totalQueries: number;
  averageExecutionTime: number;
  slowQueries: number;
  failedQueries: number;
}

export interface ConnectionStats {
  total: number;
  active: number;
  idle: number;
  waiting: number;
}

export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  uptime: number;
  connections: {
    active: number;
    max: number;
    utilization: number;
  };
  performance: {
    avgResponseTime: number;
    slowQueries: number;
    errorRate: number;
  };
  storage: {
    used: number;
    total: number;
    utilization: number;
  };
  issues: string[];
}

/**
 * @description Prisma 클라이언트를 DatabaseConnection 포트로 어댑트
 */
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
      if (this.client?.$queryRaw) {
        await this.client.$queryRaw`SELECT 1`;
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  async query<T = unknown>(sql: string, params?: unknown[]): Promise<T[]> {
    if (!this.client?.$queryRawUnsafe) {
      throw new Error('Raw queries not supported');
    }
    return this.client.$queryRawUnsafe(sql, ...(params || []));
  }

  async queryOne<T = unknown>(sql: string, params?: unknown[]): Promise<T | null> {
    const results = await this.query<T>(sql, params);
    return results[0] || null;
  }

  async execute(sql: string, params?: unknown[]): Promise<QueryResult> {
    if (!this.client?.$executeRawUnsafe) {
      throw new Error('Raw execution not supported');
    }

    const rowCount = await this.client.$executeRawUnsafe(sql, ...(params || []));
    return {
      rowCount,
      affectedRows: rowCount,
    };
  }

  async transaction<T>(callback: (tx: Transaction) => Promise<T>): Promise<T> {
    if (!this.client?.$transaction) {
      throw new Error('Transactions not supported');
    }

    return this.client.$transaction(async (prismaTransaction: any) => {
      const txWrapper: Transaction = {
        async query<U>(sql: string, params?: unknown[]): Promise<U[]> {
          return prismaTransaction.$queryRawUnsafe(sql, ...(params || []));
        },

        async queryOne<U>(sql: string, params?: unknown[]): Promise<U | null> {
          const results = await this.query<U>(sql, params);
          return results[0] || null;
        },

        async execute(sql: string, params?: unknown[]): Promise<QueryResult> {
          const rowCount = await prismaTransaction.$executeRawUnsafe(sql, ...(params || []));
          return { rowCount, affectedRows: rowCount };
        },

        async commit(): Promise<void> {
          // Prisma 트랜잭션은 자동 커밋
        },

        async rollback(): Promise<void> {
          throw new Error('Explicit rollback - this will cause Prisma to rollback');
        },
      };

      return callback(txWrapper);
    });
  }

  async getPoolStats(): Promise<PoolStats> {
    // Prisma는 풀 상태를 직접 노출하지 않으므로 기본값 반환
    return {
      totalConnections: 1,
      idleConnections: 0,
      activeConnections: 1,
      waitingClients: 0,
    };
  }

  /**
   * @description 클라이언트 컨텍스트에서 콜백 실행
   */
  async run<T>(fn: (client: any) => Promise<T>): Promise<T> {
    try {
      return await fn(this.client);
    } catch (err) {
      // 로깅 지점 - 실제 구현에서는 로거 주입
      throw err;
    }
  }

  /**
   * @description 트랜잭션으로 래핑하여 콜백 실행
   */
  async tx<T>(fn: (tx: any) => Promise<T>): Promise<T> {
    if (!this.client?.$transaction) {
      return fn(this.client);
    }
    return this.client.$transaction(async (tx: any) => fn(tx));
  }

  /**
   * @description DB 연결 헬스체크 (ping과 동일)
   */
  async health(): Promise<boolean> {
    return this.ping();
  }

  /**
   * @description 연결 종료 (disconnect와 동일)
   */
  async close(): Promise<void> {
    await this.disconnect();
  }
}
