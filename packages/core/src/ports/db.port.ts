/**
 * Description : db.port.ts - 📌 데이터베이스 시스템 포트(커넥션/트랜잭션/마이그레이션/스키마/모니터링/쿼리빌더) 인터페이스
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
/**
 * @description DB 연결 포트
 */
export interface DatabaseConnection {
  /** @description DB 연결 */
  connect(): Promise<void>;

  /** @description 연결 해제 */
  disconnect(): Promise<void>;

  /** @description 연결 여부 */
  isConnected(): boolean;

  /** @description 핑(헬스 체크) */
  ping(): Promise<boolean>;

  /** @description SELECT 등 목록 조회 */
  query<T = unknown>(sql: string, params?: unknown[]): Promise<T[]>;

  /** @description 단일 행 조회 */
  queryOne<T = unknown>(sql: string, params?: unknown[]): Promise<T | null>;

  /** @description 변경계열 실행 (INSERT/UPDATE/DELETE) */
  execute(sql: string, params?: unknown[]): Promise<QueryResult>;

  /** @description 트랜잭션 실행 */
  transaction<T>(callback: (tx: Transaction) => Promise<T>): Promise<T>;

  /** @description 연결 풀 상태 */
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
 * @description DB 모니터링 포트 (쿼리 통계/헬스체크 최소 버전)
 */
export interface DatabaseMonitoring {
  /** @description 쿼리 성능 통계 */
  getQueryStats(): Promise<QueryStats>;

  /** @description 연결/풀 통계 */
  getConnectionStats(): Promise<ConnectionStats>;

  /** @description 전체 DB 사이즈(Byte) */
  getDatabaseSize(): Promise<number>;

  /** @description 헬스 체크 결과 */
  healthCheck(): Promise<HealthStatus>;
}

/**
 * @description 쿼리 통계
 */
export interface QueryStats {
  totalQueries: number;
  averageExecutionTime: number;
  slowQueries: number;
  failedQueries: number;
}

/**
 * @description 연결/풀 통계
 */
export interface ConnectionStats {
  total: number;
  active: number;
  idle: number;
  waiting: number;
}

/**
 * @description DB 헬스 상태
 */
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
