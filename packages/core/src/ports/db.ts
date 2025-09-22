/**
 * Description : db.ts - 📌 데이터베이스 시스템 포트(커넥션/트랜잭션/마이그레이션/스키마/모니터링/쿼리빌더) 인터페이스
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
/**
 * @description 데이터베이스 연결 포트
 */
export interface DatabaseConnection {
  /**
   * @description DB 연결 수립
   * @returns {Promise<void>}
   */
  connect(): Promise<void>;

  /**
   * @description DB 연결 해제
   * @returns {Promise<void>}
   */
  disconnect(): Promise<void>;

  /**
   * @description 연결 여부 반환
   * @returns {boolean}
   */
  isConnected(): boolean;

  /**
   * @description 가벼운 핑(헬스 체크)을 수행
   * @returns {Promise<boolean>} 성공 여부
   */
  ping(): Promise<boolean>;

  /**
   * @description SELECT 등 목록을 반환하는 쿼리를 수행
   * @template T
   * @param {string} sql SQL 문자열
   * @param {unknown[]} [params] 파라미터
   * @returns {Promise<T[]>} 결과 목록
   */
  query<T = unknown>(sql: string, params?: unknown[]): Promise<T[]>;

  /**
   * @description 단일 행을 기대하는 쿼리를 수행
   * @template T
   * @param {string} sql SQL 문자열
   * @param {unknown[]} [params] 파라미터
   * @returns {Promise<T | null>} 단일 결과 또는 null
   */
  queryOne<T = unknown>(sql: string, params?: unknown[]): Promise<T | null>;

  /**
   * @description 변경계열(INSERT/UPDATE/DELETE 등) 쿼리를 수행
   * @param {string} sql SQL 문자열
   * @param {unknown[]} [params] 파라미터
   * @returns {Promise<QueryResult>} 영향 행 수 등의 메타정보
   */
  execute(sql: string, params?: unknown[]): Promise<QueryResult>;

  /**
   * @description 트랜잭션을 시작하고 콜백 안에서 작업을 수행
   * @template T
   * @param {(tx: Transaction) => Promise<T>} callback 트랜잭션 컨텍스트 콜백
   * @returns {Promise<T>} 콜백 반환값
   */
  transaction<T>(callback: (tx: Transaction) => Promise<T>): Promise<T>;

  /**
   * @description 연결 풀 상태를 조회
   * @returns {Promise<PoolStats>}
   */
  getPoolStats(): Promise<PoolStats>;
}

/**
 * @description 트랜잭션 컨텍스트 포트
 */
export interface Transaction {
  query<T = unknown>(sql: string, params?: unknown[]): Promise<T[]>;
  queryOne<T = unknown>(sql: string, params?: unknown[]): Promise<T | null>;
  execute(sql: string, params?: unknown[]): Promise<QueryResult>;

  /**
   * @description 트랜잭션 커밋
   * @returns {Promise<void>}
   */
  commit(): Promise<void>;

  /**
   * @description 트랜잭션 롤백
   * @returns {Promise<void>}
   */
  rollback(): Promise<void>;

  /**
   * @description 세이브포인트 생성
   * @param {string} name 세이브포인트 이름
   * @returns {Promise<void>}
   */
  savepoint(name: string): Promise<void>;

  /**
   * @description 세이브포인트로 롤백
   * @param {string} name 세이브포인트 이름
   * @returns {Promise<void>}
   */
  rollbackToSavepoint(name: string): Promise<void>;

  /**
   * @description 세이브포인트 해제
   * @param {string} name 세이브포인트 이름
   * @returns {Promise<void>}
   */
  releaseSavepoint(name: string): Promise<void>;
}

/**
 * @description DB 마이그레이션 포트
 */
export interface MigrationService {
  /**
   * @description pending 마이그레이션 적용
   * @returns {Promise<MigrationResult>}
   */
  migrate(): Promise<MigrationResult>;

  /**
   * @description 이전 스텝 수만큼 롤백
   * @param {number} [steps] 롤백 스텝 수(기본 1)
   * @returns {Promise<MigrationResult>}
   */
  rollback(steps?: number): Promise<MigrationResult>;

  /**
   * @description 초기화 후 최신 상태로 재적용
   * @returns {Promise<MigrationResult>}
   */
  reset(): Promise<MigrationResult>;

  /**
   * @description 대기중인 마이그레이션 목록
   * @returns {Promise<Migration[]>}
   */
  getPendingMigrations(): Promise<Migration[]>;

  /**
   * @description 적용된 마이그레이션 목록
   * @returns {Promise<Migration[]>}
   */
  getAppliedMigrations(): Promise<Migration[]>;

  /**
   * @description 현재 버전 조회
   * @returns {Promise<string>}
   */
  getCurrentVersion(): Promise<string>;

  /**
   * @description 새 마이그레이션 생성
   * @param {string} name 이름(설명)
   * @returns {Promise<string>} 파일 경로 등 식별자
   */
  createMigration(name: string): Promise<string>;

  /**
   * @description 마이그레이션 유효성 검사
   * @returns {Promise<ValidationResult>}
   */
  validateMigrations(): Promise<ValidationResult>;
}

/**
 * @description 스키마 관리 포트
 */
export interface SchemaService {
  /** @description 테이블 생성 */
  createTable(tableName: string, schema: TableSchema): Promise<void>;
  /** @description 테이블 삭제 */
  dropTable(tableName: string): Promise<void>;
  /** @description 테이블 변경(컬럼/인덱스/제약 등) */
  alterTable(tableName: string, changes: TableChange[]): Promise<void>;

  /** @description 컬럼 추가 */
  addColumn(tableName: string, column: ColumnDefinition): Promise<void>;
  /** @description 컬럼 삭제 */
  dropColumn(tableName: string, columnName: string): Promise<void>;
  /** @description 컬럼 수정 */
  modifyColumn(tableName: string, columnName: string, newDefinition: ColumnDefinition): Promise<void>;

  /** @description 인덱스 생성 */
  createIndex(tableName: string, index: IndexDefinition): Promise<void>;
  /** @description 인덱스 삭제 */
  dropIndex(tableName: string, indexName: string): Promise<void>;

  /** @description 제약조건 추가 */
  addConstraint(tableName: string, constraint: ConstraintDefinition): Promise<void>;
  /** @description 제약조건 삭제 */
  dropConstraint(tableName: string, constraintName: string): Promise<void>;

  /** @description 테이블 정보 조회 */
  getTableInfo(tableName: string): Promise<TableInfo>;
  /** @description 모든 테이블 정보 조회 */
  getTablesInfo(): Promise<TableInfo[]>;
  /** @description 컬럼 정보 조회 */
  getColumnInfo(tableName: string): Promise<ColumnInfo[]>;
  /** @description 인덱스 정보 조회 */
  getIndexInfo(tableName: string): Promise<IndexInfo[]>;
}

/**
 * @description DB 모니터링/헬스 포트
 */
export interface DatabaseMonitoring {
  /** @description 쿼리 성능 통계 */
  getQueryStats(): Promise<QueryStats>;
  /** @description 연결/풀 통계 */
  getConnectionStats(): Promise<ConnectionStats>;
  /** @description 테이블별 통계 */
  getTableStats(): Promise<TableStats[]>;

  /** @description 전체 DB 사이즈(Byte) */
  getDatabaseSize(): Promise<number>;
  /** @description 느린 쿼리 Top-N */
  getSlowQueries(limit?: number): Promise<SlowQuery[]>;
  /** @description 활성 쿼리 목록 */
  getActiveQueries(): Promise<ActiveQuery[]>;

  /** @description 락 목록 */
  getLocks(): Promise<LockInfo[]>;
  /** @description 차단된 쿼리 목록 */
  getBlockedQueries(): Promise<BlockedQuery[]>;

  /** @description 헬스 체크 결과 */
  healthCheck(): Promise<HealthStatus>;
}

/**
 * @description 변경계열 실행 결과
 */
export interface QueryResult {
  rowCount: number;
  affectedRows?: number;
  insertId?: string | number;
  fields?: string[];
}

/**
 * @description 커넥션 풀 상태
 */
export interface PoolStats {
  totalConnections: number;
  idleConnections: number;
  activeConnections: number;
  waitingClients: number;
  maxConnections: number;
}

/**
 * @description 마이그레이션 메타
 */
export interface Migration {
  id: string;
  name: string;
  version: string;
  appliedAt?: string;
  sql: string;
}

/**
 * @description 마이그레이션 실행 결과
 */
export interface MigrationResult {
  success: boolean;
  migrationsApplied: number;
  currentVersion: string;
  error?: string;
  migrations: Migration[];
}

/**
 * @description 유효성 검사 결과
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * @description 테이블 스키마
 */
export interface TableSchema {
  columns: ColumnDefinition[];
  primaryKey?: string[];
  foreignKeys?: ForeignKeyDefinition[];
  indexes?: IndexDefinition[];
  constraints?: ConstraintDefinition[];
}

/**
 * @description 컬럼 정의
 */
export interface ColumnDefinition {
  name: string;
  type: string;
  nullable?: boolean;
  defaultValue?: unknown;
  autoIncrement?: boolean;
  unique?: boolean;
  comment?: string;
}

/**
 * @description 외래키 정의
 */
export interface ForeignKeyDefinition {
  name: string;
  columns: string[];
  referencedTable: string;
  referencedColumns: string[];
  onUpdate?: 'CASCADE' | 'SET NULL' | 'RESTRICT' | 'NO ACTION';
  onDelete?: 'CASCADE' | 'SET NULL' | 'RESTRICT' | 'NO ACTION';
}

/**
 * @description 인덱스 정의
 */
export interface IndexDefinition {
  name: string;
  columns: string[];
  unique?: boolean;
  type?: 'BTREE' | 'HASH' | 'GIN' | 'GIST';
  where?: string;
}

/**
 * @description 제약조건 정의
 */
export interface ConstraintDefinition {
  name: string;
  type: 'CHECK' | 'UNIQUE' | 'EXCLUDE';
  definition: string;
}

/**
 * @description 테이블 변경 사항
 */
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

/**
 * @description 테이블 정보
 */
export interface TableInfo {
  name: string;
  schema: string;
  rows: number;
  size: number;
  comment?: string;
  createdAt?: string;
}

/**
 * @description 컬럼 정보
 */
export interface ColumnInfo {
  name: string;
  type: string;
  nullable: boolean;
  defaultValue?: unknown;
  isPrimaryKey: boolean;
  isUnique: boolean;
  comment?: string;
}

/**
 * @description 인덱스 정보
 */
export interface IndexInfo {
  name: string;
  columns: string[];
  unique: boolean;
  type: string;
  size: number;
}

/**
 * @description 쿼리 통계
 */
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

/**
 * @description 연결/풀 통계
 */
export interface ConnectionStats {
  total: number;
  active: number;
  idle: number;
  waiting: number;
  failed: number;
  maxLifetime: number;
}

/**
 * @description 테이블 통계
 */
export interface TableStats {
  tableName: string;
  rowCount: number;
  size: number;
  indexSize: number;
  lastAnalyzed?: string;
}

/**
 * @description 느린 쿼리 기록
 */
export interface SlowQuery {
  sql: string;
  executionTime: number;
  timestamp: string;
  user?: string;
  database?: string;
}

/**
 * @description 활성 쿼리 정보
 */
export interface ActiveQuery {
  id: string;
  sql: string;
  startTime: string;
  duration: number;
  user?: string;
  state: string;
}

/**
 * @description 락 정보
 */
export interface LockInfo {
  lockType: string;
  tableName: string;
  mode: string;
  granted: boolean;
  waiting: boolean;
  query?: string;
}

/**
 * @description 차단된 쿼리 페어
 */
export interface BlockedQuery {
  blockedQuery: string;
  blockingQuery: string;
  waitTime: number;
  blockedUser?: string;
  blockingUser?: string;
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

/**
 * @description 체인 가능한 쿼리 빌더 포트
 */
export interface QueryBuilder {
  /** @description SELECT 절 필드 지정 */
  select(fields?: string[]): QueryBuilder;

  /** @description FROM 절 테이블 지정 */
  from(table: string): QueryBuilder;

  /** @description WHERE 절 추가(= 바인딩 1개) */
  where(condition: string, value?: unknown): QueryBuilder;

  /** @description WHERE IN 절 */
  whereIn(field: string, values: unknown[]): QueryBuilder;

  /** @description WHERE field IS NULL */
  whereNull(field: string): QueryBuilder;

  /** @description WHERE field IS NOT NULL */
  whereNotNull(field: string): QueryBuilder;

  /** @description JOIN */
  join(table: string, condition: string): QueryBuilder;

  /** @description LEFT JOIN */
  leftJoin(table: string, condition: string): QueryBuilder;

  /** @description INNER JOIN */
  innerJoin(table: string, condition: string): QueryBuilder;

  /** @description ORDER BY */
  orderBy(field: string, direction?: 'ASC' | 'DESC'): QueryBuilder;

  /** @description GROUP BY */
  groupBy(fields: string[]): QueryBuilder;

  /** @description HAVING */
  having(condition: string, value?: unknown): QueryBuilder;

  /** @description LIMIT */
  limit(count: number): QueryBuilder;

  /** @description OFFSET */
  offset(count: number): QueryBuilder;

  /** @description INSERT */
  insert(data: Record<string, unknown>): QueryBuilder;

  /** @description UPDATE */
  update(data: Record<string, unknown>): QueryBuilder;

  /** @description DELETE */
  delete(): QueryBuilder;

  /**
   * @description 실행(여러 행)
   * @template T
   * @returns {Promise<T[]>}
   */
  execute<T = unknown>(): Promise<T[]>;

  /**
   * @description 실행(단일 행)
   * @template T
   * @returns {Promise<T | null>}
   */
  executeOne<T = unknown>(): Promise<T | null>;

  /**
   * @description 변경계열 실행
   * @returns {Promise<QueryResult>}
   */
  executeRaw(): Promise<QueryResult>;

  /**
   * @description 생성된 SQL과 파라미터 추출
   * @returns {{ sql: string; params: unknown[] }}
   */
  toSQL(): { sql: string; params: unknown[] };
}
