/**
 * Description : db.port.ts - 📌 DB 포트 (Prisma/Postgres 친화적 어댑터)
 * Author : Shiwoo Min
 * Date : 2025-09-29
 */
export interface DatabaseConnection {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  isConnected(): boolean;
  ping(): Promise<boolean>;

  rawQuery<T = unknown>(sql: string, params?: unknown[]): Promise<T[]>;
  rawExecute(sql: string, params?: unknown[]): Promise<number>;
  queryOne<T = unknown>(sql: string, params?: unknown[]): Promise<T | null>;

  transaction<T>(callback: (tx: Transaction) => Promise<T>): Promise<T>;
  getPoolStats(): Promise<PoolStats>;

  /** @description 구현체별 Client 직접 접근 (PrismaDb → PrismaClient 반환) */
  getClient(): unknown;
}

/**
 * @description 트랜잭션 컨텍스트
 */
export interface Transaction {
  rawQuery<T = unknown>(sql: string, params?: unknown[]): Promise<T[]>;
  rawExecute(sql: string, params?: unknown[]): Promise<number>;
}

/**
 * @description 변경계열 실행 결과 */
export interface QueryResult {
  rowCount: number;
  affectedRows?: number;
  insertId?: string | number;
}

/**
 * @description 연결 풀 상태 */
export interface PoolStats {
  totalConnections: number;
  idleConnections: number;
  activeConnections: number;
  waitingClients: number;
}

/**
 * @description DB 모니터링 포트 (선택: 성능/헬스체크)
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
