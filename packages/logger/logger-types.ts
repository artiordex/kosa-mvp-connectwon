/**
 * Description : logger-types.ts - 📌 Logger 공용 로깅 타입
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */

/**
 * @description 로깅 레벨 타입 정의
 */
export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal' | 'http' | 'verbose' | 'silly';

/**
 * @description 로그 에러 상세 정보 타입
 */
export interface LogError {
  message: string;
  stack?: string;
  name?: string;
  code?: string | number;
  cause?: unknown;
}

/**
 * @description 로그 레코드 타입 (로그 한 건의 정보)
 */
export interface LogRecord {
  time?: number | string; // epoch(ms) 또는 ISO 문자열
  level: LogLevel | string; // 외부 입력 시 string도 허용
  msg?: string; // 짧은 메시지
  message?: string; // winston 호환 메시지
  service?: string; // 서비스 또는 모듈명
  error?: LogError; // 에러 상세 정보 (선택)
  [k: string]: unknown; // 기타 추가 메타 정보
}

/**
 * @description 로거 설정 타입 정의
 */
export type LogConfig = {
  serviceName: string; // 서비스명
  level: 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly' | string; // 로깅 레벨
  enableLogs: boolean; // 로깅 활성화 여부
  logToFile: boolean; // 파일 출력 여부
  logDir: string; // 로그 보관 디렉터리
  maxFiles: string; // 최대 로그 파일 보관 기간 예: '7d'
};

/**
 * @description 로거 옵션 타입 (부분적 설정 가능)
 */
export type LoggerOptions = Partial<LogConfig>;

/**
 * @description 트랜스포트 인터페이스
 * 로그 저장소(콘솔, 파일, HTTP 등) 인터페이스
 */
export interface Transport {
  /**
   * 로그 기록 메서드
   * @param rec 로그 레코드
   */
  log(rec: LogRecord): void | Promise<void>;

  /**
   * (옵션) 출력 버퍼 플러시 메서드
   */
  flush?(): Promise<void>;

  /**
   * (옵션) 리소스 닫기 메서드
   */
  close?(): void | Promise<void>;
}

/**
 * @description 로깅 레벨 순서 배열
 */
export const LEVEL_ORDER: LogLevel[] = ['trace', 'debug', 'info', 'http', 'verbose', 'warn', 'error', 'fatal', 'silly'];

/**
 * @description 로그 레벨별 가중치 반환 함수
 * @param lvl 로그 레벨명
 * @returns 가중치 값 (낮을수록 우선순위 높음)
 */
export function levelWeight(lvl: LogLevel | string): number {
  const i = LEVEL_ORDER.indexOf(lvl as LogLevel);
  return i === -1 ? Number.POSITIVE_INFINITY : i;
}

/**
 * @description 객체가 LogError 타입인지 검사하는 타입 가드
 * @param v 검사 대상
 * @returns v가 LogError 타입이면 true
 */
export function isLogError(v: unknown): v is LogError {
  return !!v && typeof v === 'object' && v !== null && 'message' in v;
}

/**
 * @description 콘솔 트랜스포트 옵션 타입
 */
export interface ConsoleTransportOptions {
  level?: LogLevel; // 최소 로그레벨
  json?: boolean; // true면 NDJSON 형식
  stderrLevel?: LogLevel; // 해당 레벨 이상은 stderr 출력
}

/**
 * @description 파일 트랜스포트 옵션 타입
 */
export interface FileTransportOptions {
  dir: string; // 로그 파일이 저장될 디렉터리
  prefix?: string; // 로그 파일 이름 접두사 (기본값: 'app')
  level?: LogLevel; // 최소 로그레벨 (기본값: info)
  rotate?: 'daily' | 'none'; // 로그 회전 정책 (기본값: daily)
}

/**
 * @description HTTP 전송 트랜스포트 옵션 타입
 */
export interface HttpTransportOptions {
  endpoint: string; // 로그 수집 HTTP 엔드포인트
  headers?: Record<string, string>; // HTTP 헤더
  batchSize?: number; // 배치 전송 크기
  intervalMs?: number; // 배치 전송 주기 (ms)
  fetchImpl?: typeof fetch; // 사용자 fetch 구현체
  level?: LogLevel; // 최소 로그레벨
}

/**
 * @description 예쁘게 출력하는 트랜스포트 옵션 타입
 */
export interface PrettyTransportOptions {
  level?: LogLevel; // 최소 로그레벨
  withTimestamp?: boolean; // 타임스탬프 포함 여부
  singleLine?: boolean; // 한줄 출력 여부
}

/**
 * @description 슬랙 전송 트랜스포트 옵션 타입
 */
export interface SlackTransportOptions {
  webhookUrl: string; // 슬랙 웹훅 URL
  username?: string; // 슬랙 사용자명
  iconEmoji?: string; // 아이콘 이모지
  channel?: string; // 채널명
  fetchImpl?: typeof fetch; // 사용자 fetch 구현체
  level?: LogLevel; // 최소 로그레벨
}
