/**
 * Description : infra-types.ts - 📌 infra/ 모듈 타입정의
 * Author : Shiwoo Min
 * Date : 2025-09-07
 * 09-16 - 보안 및 안정성 강화
 */

// URL 표기 문자열
export type Url = string;

// 파일/디렉터리 경로 문자열
export type FilePath = string;

// TCP 포트 번호
export type PortNumber = number;

// Postgres 접속 및 기본 스키마 정의
export interface PostgresConfig {
  // DB 호스트명 또는 IP
  host: string;

  // DB 포트
  port: PortNumber;

  // 데이터베이스 명
  database: string;

  // 접속 사용자명
  user: string;

  // 접속 비밀번호
  password: string;

  // 선택: 기본 스키마명 (Prisma 등 일부에서 ?schema= 지원)
  schema?: string;

  // 선택: SSL 모드 (운영 환경 권장)
  sslmode?: 'disable' | 'prefer' | 'require' | 'verify-ca' | 'verify-full';
}

// Redis 접속 정의
export interface RedisConfig {
  // Redis 호스트명 또는 IP
  host: string;

  // Redis 포트
  port: PortNumber;

  // 접근 비밀번호
  password?: string;

  // ACL 사용자명(Redis 6+)
  username?: string;

  // DB 인덱스 (기본 0)
  db?: number;
}

// Postgres는 필수, Redis는 캐시/큐 용도에 따라 선택
export interface DatabaseStack {
  // 필수: 관계형 데이터베이스(Postgres)
  postgres: PostgresConfig;

  // 선택: 캐시/세션/큐 등에 사용하는 Redis
  redis?: RedisConfig;
}

// Postgres 접속 문자열(DSN) 생성
export function toPostgresUrl(c: PostgresConfig): Url {
  const user = encodeURIComponent(c.user);
  const pw = encodeURIComponent(c.password);
  const params: string[] = [];
  if (c.schema) params.push(`schema=${encodeURIComponent(c.schema)}`);
  if (c.sslmode) params.push(`sslmode=${encodeURIComponent(c.sslmode)}`);
  const qp = params.length ? `?${params.join('&')}` : '';
  return `postgresql://${user}:${pw}@${c.host}:${c.port}/${encodeURIComponent(c.database)}${qp}`;
}

// Redis 접속 문자열(DSN) 생성 (ACL/멀티 DB 대응)
export function toRedisUrl(c: RedisConfig): Url {
  const user = c.username ? `${encodeURIComponent(c.username)}` : '';
  const pw = c.password ? `:${encodeURIComponent(c.password)}` : '';
  const auth = user || pw ? `${user}${pw}@` : '';
  const db = Number.isInteger(c.db) ? c.db : 0;
  return `redis://${auth}${c.host}:${c.port}/${db}`;
}

// Docker (Compose-ish, 최소 필드)
export type PortBinding =
  | `${number}:${number}`
  | `${number}:${number}/${'tcp' | 'udp'}`
  | { host: number; container: number; protocol?: 'tcp' | 'udp' };

// 볼륨 마운트 표기
export type VolumeMount =
  | `${string}:${string}`
  | `${string}:${string}:ro`
  | `${string}:${string}:rw`
  | { source: string; target: string; readOnly?: boolean };

// 컨테이너 헬스체크 설정
export interface HealthcheckConfig {
  // 예: ["CMD-SHELL", "pg_isready -U postgres"] 또는 "curl -f http://localhost/ || exit 1"
  test: string[] | string;

  // 헬스체크 실행 주기
  interval?: string;

  // 헬스체크 타임아웃
  timeout?: string;

  // 실패 허용 횟수
  retries?: number;

  // 초기 준비 시간
  start_period?: string;
}

// 컨테이너(서비스) 정의
export interface DockerService {
  // 사용할 이미지 태그
  image?: string;

  // 로컬 Dockerfile로 빌드 시
  build?: {
    // 빌드 컨텍스트
    context: FilePath;

    // Dockerfile 경로
    dockerfile?: FilePath;

    // 빌드 아규먼트
    args?: Record<string, string>;
  };

  // 컨테이너 이름
  container_name?: string;

  // 환경변수 맵 (Compose가 문자열로 직렬화)
  environment?: Record<string, string | number | boolean>;

  // env 파일 목록
  env_file?: FilePath[];

  // 포트 바인딩 목록
  ports?: PortBinding[];

  // 볼륨 마운트 목록
  volumes?: VolumeMount[];

  // 의존성
  depends_on?: string[] | Record<string, { condition?: 'service_started' | 'service_healthy' }>;

  // 헬스체크 설정
  healthcheck?: HealthcheckConfig;

  // 재시작 정책
  restart?: 'no' | 'always' | 'on-failure' | 'unless-stopped';
}

// docker-compose
export interface DockerComposeLike {
  // 서비스 이름(키) → DockerService 매핑
  services: Record<string, DockerService>;
}

// n8n 설정 정의
export interface N8nConfig {
  // n8n가 바인딩할 호스트
  host: string;

  // n8n 컨테이너 포트
  port: PortNumber;

  // 자격증명 암호화 키
  encryptionKey: string;

  // 선택: 에디터 접근용 외부 URL
  editorBaseUrl?: Url;

  // 선택: 퍼블릭 웹훅/콜백이 접근하는 외부 URL
  publicBaseUrl?: Url;

  // 선택: 타임존 (예: "Asia/Seoul")
  timezone?: string;

  // DB 연결 설정
  database: { type: 'postgres'; url: Url } | { type: 'sqlite'; file: FilePath };

  // 큐 설정
  queue?: { type: 'memory' } | { type: 'redis'; url: Url };
}

// n8n 환경변수 맵 생성 (DB/Queue 필수 매핑 포함)
export function toN8nEnv(c: N8nConfig): Record<string, string> {
  // 기본 환경값 설정
  const env: Record<string, string> = {
    N8N_HOST: c.host,
    N8N_PORT: String(c.port),
    N8N_EDITOR_BASE_URL: String(c.editorBaseUrl ?? c.publicBaseUrl ?? ''),
    N8N_ENCRYPTION_KEY: c.encryptionKey,
    GENERIC_TIMEZONE: c.timezone ?? 'Asia/Seoul',
    // 필요 시 쿠키/보안 관련 추가: N8N_SECURE_COOKIE, WEBHOOK_URL 등
  };

  // DB 매핑
  if (c.database.type === 'postgres') {
    // URL 한 줄로 연결(간단·안전)
    env.DB_TYPE = 'postgresdb';
    env.DB_POSTGRESDB_CONNECTION_STRING = c.database.url;
  } else {
    env.DB_TYPE = 'sqlite';
    env.DB_SQLITE_DATABASE = c.database.file;
  }

  // Queue 매핑
  if (c.queue?.type === 'redis') {
    env.EXECUTIONS_MODE = 'queue';
    // redis://[user[:pass]@]host:port/db
    env.QUEUE_BULL_REDIS = c.queue.url;
  } else if (c.queue?.type === 'memory') {
    env.EXECUTIONS_MODE = 'regular';
  }

  return env;
}
