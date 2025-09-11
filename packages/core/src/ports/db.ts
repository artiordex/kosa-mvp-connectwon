/**
 * Description : ports/db.ts - 📌 데이터베이스 시스템 포트 인터페이스
 * Author      : Shiwoo Min
 * Date        : 2025-09-10
 */

// ============== 데이터베이스 연결 포트 ==============

export interface DatabaseConnection {
  // 연결 관리
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  isConnected(): boolean;
  ping(): Promise<boolean>;

  // 쿼리 실행
  query<T = unknown>(sql: string, params?: unknown[]): Promise<T[]>;
  queryOne<T = unknown>(sql: string, params?: unknown[]): Promise<T | null>;
  execute(sql: string, params?: unknown[]): Promise<QueryResult>;

  // 트랜잭션
  transaction<T>(callback: (tx: Transaction) => Promise<T>): Promise<T>;

  // 연결 풀 관리
  getPoolStats(): Promise<PoolStats>;
}

// ============== 트랜잭션 포트 ==============

export interface Transaction {
  // 쿼리 실행
  query<T = unknown>(sql: string, params?: unknown[]): Promise<T[]>;
  queryOne<T = unknown>(sql: string, params?: unknown[]): Promise<T | null>;
  execute(sql: string, params?: unknown[]): Promise<QueryResult>;

  // 트랜잭션 제어
  commit(): Promise<void>;
  rollback(): Promise<void>;
  savepoint(name: string): Promise<void>;
  rollbackToSavepoint(name: string): Promise<void>;
  releaseSavepoint(name: string): Promise<void>;
}

// ============== 마이그레이션 포트 ==============

export interface MigrationService {
  // 마이그레이션 실행
  migrate(): Promise<MigrationResult>;
  rollback(steps?: number): Promise<MigrationResult>;
  reset(): Promise<MigrationResult>;

  // 마이그레이션 상태
  getPendingMigrations(): Promise<Migration[]>;
  getAppliedMigrations(): Promise<Migration[]>;
  getCurrentVersion(): Promise<string>;

  // 마이그레이션 생성
  createMigration(name: string): Promise<string>;
  validateMigrations(): Promise<ValidationResult>;
}

// ============== 스키마 관리 포트 ==============

export interface SchemaService {
  // 테이블 관리
  createTable(tableName: string, schema: TableSchema): Promise<void>;
  dropTable(tableName: string): Promise<void>;
  alterTable(tableName: string, changes: TableChange[]): Promise<void>;

  // 컬럼 관리
  addColumn(tableName: string, column: ColumnDefinition): Promise<void>;
  dropColumn(tableName: string, columnName: string): Promise<void>;
  modifyColumn(
    tableName: string,
    columnName: string,
    newDefinition: ColumnDefinition,
  ): Promise<void>;

  // 인덱스 관리
  createIndex(tableName: string, index: IndexDefinition): Promise<void>;
  dropIndex(tableName: string, indexName: string): Promise<void>;

  // 제약조건 관리
  addConstraint(tableName: string, constraint: ConstraintDefinition): Promise<void>;
  dropConstraint(tableName: string, constraintName: string): Promise<void>;

  // 스키마 정보
  getTableInfo(tableName: string): Promise<TableInfo>;
  getTablesInfo(): Promise<TableInfo[]>;
  getColumnInfo(tableName: string): Promise<ColumnInfo[]>;
  getIndexInfo(tableName: string): Promise<IndexInfo[]>;
}

// ============== 데이터베이스 모니터링 포트 ==============

export interface DatabaseMonitoring {
  // 성능 통계
  getQueryStats(): Promise<QueryStats>;
  getConnectionStats(): Promise<ConnectionStats>;
  getTableStats(): Promise<TableStats[]>;

  // 시스템 정보
  getDatabaseSize(): Promise<number>;
  getSlowQueries(limit?: number): Promise<SlowQuery[]>;
  getActiveQueries(): Promise<ActiveQuery[]>;

  // 락 정보
  getLocks(): Promise<LockInfo[]>;
  getBlockedQueries(): Promise<BlockedQuery[]>;

  // 헬스 체크
  healthCheck(): Promise<HealthStatus>;
}

// ============== 타입 정의 ==============

export interface QueryResult {
  rowCount: number;
  affectedRows?: number;
  insertId?: string | number;
  fields?: string[];
}

export interface PoolStats {
  totalConnections: number;
  idleConnections: number;
  activeConnections: number;
  waitingClients: number;
  maxConnections: number;
}

export interface Migration {
  id: string;
  name: string;
  version: string;
  appliedAt?: string;
  sql: string;
}

export interface MigrationResult {
  success: boolean;
  migrationsApplied: number;
  currentVersion: string;
  error?: string;
  migrations: Migration[];
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface TableSchema {
  columns: ColumnDefinition[];
  primaryKey?: string[];
  foreignKeys?: ForeignKeyDefinition[];
  indexes?: IndexDefinition[];
  constraints?: ConstraintDefinition[];
}

export interface ColumnDefinition {
  name: string;
  type: string;
  nullable?: boolean;
  defaultValue?: unknown;
  autoIncrement?: boolean;
  unique?: boolean;
  comment?: string;
}

export interface ForeignKeyDefinition {
  name: string;
  columns: string[];
  referencedTable: string;
  referencedColumns: string[];
  onUpdate?: 'CASCADE' | 'SET NULL' | 'RESTRICT' | 'NO ACTION';
  onDelete?: 'CASCADE' | 'SET NULL' | 'RESTRICT' | 'NO ACTION';
}

export interface IndexDefinition {
  name: string;
  columns: string[];
  unique?: boolean;
  type?: 'BTREE' | 'HASH' | 'GIN' | 'GIST';
  where?: string;
}

export interface ConstraintDefinition {
  name: string;
  type: 'CHECK' | 'UNIQUE' | 'EXCLUDE';
  definition: string;
}

export interface TableChange {
  type:
    | 'ADD_COLUMN'
    | 'DROP_COLUMN'
    | 'MODIFY_COLUMN'
    | 'RENAME_COLUMN'
    | 'ADD_INDEX'
    | 'DROP_INDEX';
  details: unknown;
}

export interface TableInfo {
  name: string;
  schema: string;
  rows: number;
  size: number;
  comment?: string;
  createdAt?: string;
}

export interface ColumnInfo {
  name: string;
  type: string;
  nullable: boolean;
  defaultValue?: unknown;
  isPrimaryKey: boolean;
  isUnique: boolean;
  comment?: string;
}

export interface IndexInfo {
  name: string;
  columns: string[];
  unique: boolean;
  type: string;
  size: number;
}

export interface QueryStats {
  totalQueries: number;
  averageExecutionTime: number;
  slowQueries: number;
  failedQueries: number;
  mostFrequentQueries: Array<{
    sql: string;
    count: number;
    avgTime: number;
  }>;
}

export interface ConnectionStats {
  total: number;
  active: number;
  idle: number;
  waiting: number;
  failed: number;
  maxLifetime: number;
}

export interface TableStats {
  tableName: string;
  rowCount: number;
  size: number;
  indexSize: number;
  lastAnalyzed?: string;
}

export interface SlowQuery {
  sql: string;
  executionTime: number;
  timestamp: string;
  user?: string;
  database?: string;
}

export interface ActiveQuery {
  id: string;
  sql: string;
  startTime: string;
  duration: number;
  user?: string;
  state: string;
}

export interface LockInfo {
  lockType: string;
  tableName: string;
  mode: string;
  granted: boolean;
  waiting: boolean;
  query?: string;
}

export interface BlockedQuery {
  blockedQuery: string;
  blockingQuery: string;
  waitTime: number;
  blockedUser?: string;
  blockingUser?: string;
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

// ============== 쿼리 빌더 포트 ==============

export interface QueryBuilder {
  select(fields?: string[]): QueryBuilder;
  from(table: string): QueryBuilder;
  where(condition: string, value?: unknown): QueryBuilder;
  whereIn(field: string, values: unknown[]): QueryBuilder;
  whereNull(field: string): QueryBuilder;
  whereNotNull(field: string): QueryBuilder;
  join(table: string, condition: string): QueryBuilder;
  leftJoin(table: string, condition: string): QueryBuilder;
  innerJoin(table: string, condition: string): QueryBuilder;
  orderBy(field: string, direction?: 'ASC' | 'DESC'): QueryBuilder;
  groupBy(fields: string[]): QueryBuilder;
  having(condition: string, value?: unknown): QueryBuilder;
  limit(count: number): QueryBuilder;
  offset(count: number): QueryBuilder;
  insert(data: Record<string, unknown>): QueryBuilder;
  update(data: Record<string, unknown>): QueryBuilder;
  delete(): QueryBuilder;

  // 실행
  execute<T = unknown>(): Promise<T[]>;
  executeOne<T = unknown>(): Promise<T | null>;
  executeRaw(): Promise<QueryResult>;

  // SQL 생성
  toSQL(): { sql: string; params: unknown[] };
}
