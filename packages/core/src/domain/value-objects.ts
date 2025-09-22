/**
 * Description : value-objects.ts - 📌 값 객체 정의
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */

/**
 * @description 브랜드드 타입(Branded Type)을 만드는 유틸리티 타입
 * @template T 실제 값 타입
 * @template B 브랜드 식별 문자열 리터럴
 */
type Brand<T, B extends string> = T & { readonly __brand: B };

/**
 * @description 문자열인지 검사하는 타입 가드
 * @param {unknown} v 검사 대상
 * @returns {v is string} 문자열 여부
 */
const isString = (v: unknown): v is string => typeof v === 'string';

/**
 * @description 유한한 정수인지 검사하는 타입 가드
 * @param {unknown} n 검사 대상
 * @returns {n is number} 유한 정수 여부
 */
const isFiniteInteger = (n: unknown): n is number =>
  Number.isInteger(n as number) && Number.isFinite(n as number);

/**
 * @description 사용자 ID(브랜디드 문자열)
 */
export type UserId = Brand<string, 'UserId'>;

/**
 * @description 프로그램 ID(브랜디드 문자열)
 */
export type ProgramId = Brand<string, 'ProgramId'>;

/**
 * @description 세션 ID(브랜디드 문자열)
 */
export type SessionId = Brand<string, 'SessionId'>;

/**
 * @description 공통: 비어있지 않은 문자열을 보장
 * @param {string} v 값
 * @param {string} name 파라미터 표시용 이름
 * @throws {Error} 값이 비어있으면 예외
 */
const assertNonEmpty = (v: string, name: string) => {
  if (!v || v.trim() === '') throw new Error(`${name} must be non-empty`);
};

/**
 * @description UserId 값 생성
 * @param {string} value 원시 문자열
 * @returns {UserId} 브랜디드 UserId
 * @throws {Error} 비어있으면 예외
 */
export function UserId(value: string): UserId {
  assertNonEmpty(value, 'UserId');
  return value as UserId;
}

/**
 * @description ProgramId 값 생성
 * @param {string} value 원시 문자열
 * @returns {ProgramId} 브랜디드 ProgramId
 * @throws {Error} 비어있으면 예외
 */
export function ProgramId(value: string): ProgramId {
  assertNonEmpty(value, 'ProgramId');
  return value as ProgramId;
}

/**
 * @description SessionId 값 생성
 * @param {string} value 원시 문자열
 * @returns {SessionId} 브랜디드 SessionId
 * @throws {Error} 비어있으면 예외
 */
export function SessionId(value: string): SessionId {
  assertNonEmpty(value, 'SessionId');
  return value as SessionId;
}

/**
 * @description 간단한 이메일 정규식 (RFC 완전 호환 아님)
 */
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

/**
 * @description 이메일 값 객체
 */
export class Email {
  private constructor(private readonly _value: string) {
    Object.freeze(this);
  }

  /**
   * @description Email 생성 팩토리
   * @param {string} value 이메일 문자열
   * @returns {Email} 검증된 이메일 VO
   * @throws {Error} 형식이 유효하지 않으면 예외
   */
  static create(value: string): Email {
    if (!isString(value) || !EMAIL_REGEX.test(value)) {
      throw new Error('Invalid email');
    }
    return new Email(value);
  }

  /**
   * @description 원시 문자열 값
   */
  get value(): string {
    return this._value;
  }

  /**
   * @description 동등성 비교(대소문자 무시)
   * @param {Email} other 비교 대상
   * @returns {boolean} 동등 여부
   */
  equals(other: Email): boolean {
    return this._value.toLowerCase() === other._value.toLowerCase();
  }

  /** @description 문자열 표현 */
  toString() {
    return this._value;
  }

  /** @description JSON 직렬화 시 원시 문자열로 출력 */
  toJSON() {
    return this._value;
  }

  /**
   * @description 래핑 해제
   * @returns {string} 원시 문자열
   */
  unwrap(): string {
    return this._value;
  }
}

/**
 * @description URL 값 객체 (표준 URL 파서로 검증)
 */
export class Url {
  private constructor(private readonly _value: string) {
    Object.freeze(this);
  }

  /**
   * @description Url 생성 팩토리
   * @param {string} value URL 문자열
   * @returns {Url} 검증된 URL VO
   * @throws {Error} 형식/프로토콜이 유효하지 않으면 예외
   */
  static create(value: string): Url {
    if (!isString(value)) throw new Error('Url must be string');
    let u: URL;
    try {
      u = new URL(value);
    } catch {
      throw new Error('Invalid URL');
    }
    if (!['http:', 'https:'].includes(u.protocol)) {
      throw new Error('Unsupported URL protocol');
    }
    return new Url(u.toString());
  }

  /** @description 원시 문자열 값 */
  get value(): string {
    return this._value;
  }

  /**
   * @description 동등성 비교(정규화된 문자열 기준)
   * @param {Url} other 비교 대상
   * @returns {boolean} 동등 여부
   */
  equals(other: Url): boolean {
    return this._value === other._value;
  }

  /** @description 문자열 표현 */
  toString() {
    return this._value;
  }

  /** @description JSON 직렬화 시 원시 문자열로 출력 */
  toJSON() {
    return this._value;
  }

  /**
   * @description 래핑 해제
   * @returns {string} 원시 문자열
   */
  unwrap(): string {
    return this._value;
  }
}

/**
 * @description 비어있지 않은 문자열 값 객체
 */
export class NonEmptyString {
  private constructor(private readonly _value: string) {
    Object.freeze(this);
  }

  /**
   * @description NonEmptyString 생성 팩토리
   * @param {string} value 문자열
   * @returns {NonEmptyString} 비어있지 않은 문자열 VO
   * @throws {Error} 공백/빈 문자열이면 예외
   */
  static create(value: string): NonEmptyString {
    if (!isString(value) || value.trim() === '') throw new Error('String must be non-empty');
    return new NonEmptyString(value);
  }

  /** @description 원시 문자열 값 */
  get value(): string {
    return this._value;
  }

  /**
   * @description 동등성 비교
   * @param {NonEmptyString} other 비교 대상
   * @returns {boolean} 동등 여부
   */
  equals(other: NonEmptyString): boolean {
    return this._value === other._value;
  }

  /** @description 문자열 표현 */
  toString() {
    return this._value;
  }

  /** @description JSON 직렬화 시 원시 문자열로 출력 */
  toJSON() {
    return this._value;
  }

  /**
   * @description 래핑 해제
   * @returns {string} 원시 문자열
   */
  unwrap(): string {
    return this._value;
  }
}

/**
 * @description 슬러그 값 객체(영문/숫자/하이픈, 최대 100자)
 */
export class Slug {
  private constructor(private readonly _value: string) {
    Object.freeze(this);
  }

  /**
   * @description 임의 문자열에서 슬러그 생성
   * @param {string} input 원본 문자열
   * @returns {Slug} 정규화된 슬러그 VO
   * @throws {Error} 결과가 비어있으면 예외
   */
  static fromString(input: string): Slug {
    if (!isString(input)) throw new Error('Slug source must be string');
    const s = input
      .normalize('NFKD')
      .toLowerCase()
      .replace(/[\u0300-\u036f]/g, '') // 결합 악센트 제거
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 100);
    if (!s) throw new Error('Slug is empty');
    return new Slug(s);
  }

  /** @description 원시 문자열 값 */
  get value(): string {
    return this._value;
  }

  /**
   * @description 동등성 비교
   * @param {Slug} other 비교 대상
   * @returns {boolean} 동등 여부
   */
  equals(other: Slug): boolean {
    return this._value === other._value;
  }

  /** @description 문자열 표현 */
  toString() {
    return this._value;
  }

  /** @description JSON 직렬화 시 원시 문자열로 출력 */
  toJSON() {
    return this._value;
  }

  /**
   * @description 래핑 해제
   * @returns {string} 원시 문자열
   */
  unwrap(): string {
    return this._value;
  }
}

/**
 * @description 수용 인원(0 이상의 정수) 값 객체
 */
export class Capacity {
  private constructor(private readonly _value: number) {
    Object.freeze(this);
  }

  /**
   * @description Capacity 생성 팩토리
   * @param {number} value 수용 인원
   * @returns {Capacity} 검증된 Capacity VO
   * @throws {Error} 0 미만 혹은 정수가 아니면 예외
   */
  static create(value: number): Capacity {
    if (!isFiniteInteger(value) || value < 0)
      throw new Error('Capacity must be a non-negative integer');
    return new Capacity(value);
  }

  /** @description 원시 수치 값 */
  get value(): number {
    return this._value;
  }

  /**
   * @description 현재 인원 대비 수용 가능 여부
   * @param {number} currentCount 현재 인원
   * @returns {boolean} 수용 가능 여부
   */
  hasSpace(currentCount: number): boolean {
    if (!isFiniteInteger(currentCount) || currentCount < 0) return false;
    return currentCount < this._value;
  }

  /**
   * @description 초과 허용 상한치(%)로 상한 인원 계산
   * @param {number} percent 허용 퍼센트(정수, 음수면 0 처리)
   * @returns {number} 상한 인원(ceil)
   */
  overbookLimit(percent: number): number {
    const p = Math.max(0, Math.floor(percent));
    return Math.ceil(this._value * (1 + p / 100));
  }

  /**
   * @description 동등성 비교
   * @param {Capacity} other 비교 대상
   * @returns {boolean} 동등 여부
   */
  equals(other: Capacity): boolean {
    return this._value === other._value;
  }

  /** @description JSON 직렬화 시 원시 수치로 출력 */
  toJSON() {
    return this._value;
  }

  /**
   * @description 래핑 해제
   * @returns {number} 원시 수치
   */
  unwrap(): number {
    return this._value;
  }
}

/**
 * @description 시간 구간 값 객체(ISO 문자열)
 */
export class TimeRange {
  private constructor(
    private readonly _startISO: string,
    private readonly _endISO: string,
  ) {
    Object.freeze(this);
  }

  /**
   * @description TimeRange 생성 팩토리
   * @param {string} startISO 시작 시각(ISO)
   * @param {string} endISO 종료 시각(ISO)
   * @returns {TimeRange} 검증된 시간 구간 VO
   * @throws {Error} 형식이 잘못됐거나 종료가 시작 이전/동일이면 예외
   */
  static create(startISO: string, endISO: string): TimeRange {
    if (!isString(startISO) || !isString(endISO)) throw new Error('TimeRange must be ISO strings');
    const start = new Date(startISO).getTime();
    const end = new Date(endISO).getTime();
    if (!Number.isFinite(start) || !Number.isFinite(end)) throw new Error('Invalid ISO date');
    if (end <= start) throw new Error('TimeRange end must be after start');
    return new TimeRange(new Date(start).toISOString(), new Date(end).toISOString());
  }

  /** @description 시작 시각(ISO) */
  get start(): string {
    return this._startISO;
  }

  /** @description 종료 시각(ISO) */
  get end(): string {
    return this._endISO;
  }

  /**
   * @description 구간 길이(ms)
   * @returns {number} 기간(밀리초)
   */
  durationMs(): number {
    return new Date(this._endISO).getTime() - new Date(this._startISO).getTime();
  }

  /**
   * @description 다른 구간과 겹치는지 여부
   * @param {TimeRange} other 비교 대상
   * @returns {boolean} 겹침 여부
   */
  overlaps(other: TimeRange): boolean {
    const a1 = new Date(this._startISO).getTime();
    const a2 = new Date(this._endISO).getTime();
    const b1 = new Date(other._startISO).getTime();
    const b2 = new Date(other._endISO).getTime();
    return a1 < b2 && b1 < a2;
  }

  /**
   * @description 동등성 비교
   * @param {TimeRange} other 비교 대상
   * @returns {boolean} 동등 여부
   */
  equals(other: TimeRange): boolean {
    return this._startISO === other._startISO && this._endISO === other._endISO;
  }

  /** @description JSON 직렬화 시 {start, end} 형태로 출력 */
  toJSON() {
    return { start: this._startISO, end: this._endISO };
  }

  /**
   * @description 래핑 해제
   * @returns {{ start: string; end: string }} 원시 객체
   */
  unwrap(): { start: string; end: string } {
    return { start: this._startISO, end: this._endISO };
  }
}

/**
 * @description 대략적인 IANA 타임존 ID 검증 정규식
 */
const IANA_TZ_REGEX = /^[A-Za-z_]+\/[A-Za-z_]+(?:\/[A-Za-z_]+)?$/;

/**
 * @description IANA 타임존 식별자 값 객체
 */
export class TimezoneId {
  private constructor(private readonly _value: string) {
    Object.freeze(this);
  }

  /**
   * @description TimezoneId 생성 팩토리
   * @param {string} value IANA 타임존(예: "Asia/Seoul")
   * @returns {TimezoneId} 검증된 타임존 VO
   * @throws {Error} 형식이 유효하지 않으면 예외
   */
  static create(value: string): TimezoneId {
    if (!isString(value) || !IANA_TZ_REGEX.test(value)) {
      throw new Error('Invalid IANA timezone id');
    }
    return new TimezoneId(value);
  }

  /** @description 원시 문자열 값 */
  get value(): string {
    return this._value;
  }

  /**
   * @description 동등성 비교
   * @param {TimezoneId} other 비교 대상
   * @returns {boolean} 동등 여부
   */
  equals(other: TimezoneId): boolean {
    return this._value === other._value;
  }

  /** @description 문자열 표현 */
  toString() {
    return this._value;
  }

  /** @description JSON 직렬화 시 원시 문자열로 출력 */
  toJSON() {
    return this._value;
  }

  /**
   * @description 래핑 해제
   * @returns {string} 원시 문자열
   */
  unwrap(): string {
    return this._value;
  }
}
