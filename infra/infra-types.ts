/**
 * Description : infra-types.ts - 📌 infra/ 모듈 타입정의
 * Author : Shiwoo Min
 * Date : 2025-09-07
 */


// URL 표기 문자열
export type Url = string

// 파일/디렉터리 경로 문자열
export type FilePath = string

// TCP 포트 번호
export type PortNumber = number

// Postgres 접속 및 기본 스키마 정의
export interface PostgresConfig {
  // DB 호스트명 또는 IP
  host: string

  // DB 포트
  port: PortNumber

  // 데이터베이스 명.
  database: string

  // 접속 사용자명
  user: string

  // 접속 비밀번호
  password: string

  // 선택: 기본 스키마명
  schema?: string
}

// Redis 접속 정의
export interface RedisConfig {
  // Redis 호스트명 또는 IP
  host: string

  // Redis 포트
  port: PortNumber

  // 접근 비밀번호
  password?: string
}

// Postgres는 필수, Redis는 캐시/큐 용도에 따라 선택
export interface DatabaseStack {
  // 필수: 관계형 데이터베이스(Postgres)
  postgres: PostgresConfig

  // 선택: 캐시/세션/큐 등에 사용하는 Redis
  redis?: RedisConfig
}

// Postgres 접속 문자열(DSN) 생성
export function toPostgresUrl(c: PostgresConfig): Url {
  const pw = encodeURIComponent(c.password)
  const qp = c.schema ? `?schema=${c.schema}` : ""
  return `postgresql://${c.user}:${pw}@${c.host}:${c.port}/${c.database}${qp}`
}

// Redis 접속 문자열(DSN)을 생성
export function toRedisUrl(c: RedisConfig): Url {
  const auth = c.password ? `:${encodeURIComponent(c.password)}@` : ""
  return `redis://${auth}${c.host}:${c.port}/0`
}


// Docker (Compose-ish, 최소 필드)
export type PortBinding =
  | `${number}:${number}`
  | `${number}:${number}/${"tcp" | "udp"}`
  | { host: number; container: number; protocol?: "tcp" | "udp" }

// 볼륨 마운트 표기
export type VolumeMount =
  | `${string}:${string}`
  | `${string}:${string}:ro`
  | `${string}:${string}:rw`
  | { source: string; target: string; readOnly?: boolean }

// 컨테이너 헬스체크 설정
export interface HealthcheckConfig {
  // 예: ["CMD-SHELL", "pg_isready -U postgres"] 또는 "curl -f http://localhost/ || exit 1"
  test: string[] | string

  // 헬스체크 실행 주기
  interval?: string

  // 헬스체크 타임아웃
  timeout?: string

  // 실패 허용 횟수
  retries?: number

  // 초기 준비 시간
  start_period?: string
}

// 컨테이너 (서비스) 정의
export interface DockerService {
  // 사용할 이미지 태그
  image?: string

  // 로컬 Dockerfile로 빌드 시
  build?: {
    context: FilePath

    // Dockerfile 경로
    dockerfile?: FilePath

    // 빌드 아규먼트
    args?: Record<string, string>
  }

  // 컨테이너 이름
  container_name?: string

  // 환경변수 맵
  environment?: Record<string, string | number | boolean>

  // env 파일 목록
  env_file?: FilePath[]

  // 포트 바인딩 목록
  ports?: PortBinding[]

  // 볼륨 마운트 목록
  volumes?: VolumeMount[]

  // 의존성
  depends_on?: string[] | Record<string, { condition?: "service_started" | "service_healthy" }>

  // 헬스체크 설정
  healthcheck?: HealthcheckConfig

  // 재시작 정책
  restart?: "no" | "always" | "on-failure" | "unless-stopped"
}

// docker-compose
export interface DockerComposeLike {
  // 서비스 이름(키) → DockerService 매핑
  services: Record<string, DockerService>
}

// n8n 설정 정의
export interface N8nConfig {
  // n8n가 바인딩할 호스트
  host: string

  // n8n 컨테이너 포트
  port: PortNumber

  // 자격증명 암호화 키
  encryptionKey: string

  // 선택: 에디터 접근용 외부 URL
  editorBaseUrl?: Url

  // 선택: 퍼블릭 웹훅/콜백이 접근하는 외부 URL
  publicBaseUrl?: Url

  // DB 연결 설정
  database: { type: "postgres"; url: Url } | { type: "sqlite"; file: FilePath }

  // 큐 설정
  queue?: { type: "memory" } | { type: "redis"; url: Url }
}

// n8n 환경변수 맵을 생성
export function toN8nEnv(c: N8nConfig): Record<string, string> {
  // 기본 환경값 설정
  const env: Record<string, string> = {
    N8N_HOST: c.host,
    N8N_PORT: String(c.port),
    N8N_EDITOR_BASE_URL: c.editorBaseUrl ?? c.publicBaseUrl ?? "",
    N8N_ENCRYPTION_KEY: c.encryptionKey,
  }
  return env
}

