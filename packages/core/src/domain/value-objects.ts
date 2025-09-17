/**
 * Description : value-objects.ts - 📌 값 객체 정의
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */

// 브랜드드 타입(Branded Type) 유틸
type Brand<T, B extends string> = T & { readonly __brand: B };

// 공통 가드
const isString = (v: unknown): v is string => typeof v === 'string';
const isFiniteInteger = (n: unknown): n is number =>
  Number.isInteger(n as number) && Number.isFinite(n as number);

// 개별 ID 타입 (브랜드드 타입)
export type UserId = Brand<string, 'UserId'>;
export type ProgramId = Brand<string, 'ProgramId'>;
export type SessionId = Brand<string, 'SessionId'>;

// 간단한 비어있지 않은 문자열 ID
const assertNonEmpty = (v: string, name: string) => {
  if (!v || v.trim() === '') throw new Error(`${name} must be non-empty`);
};

// 유저 ID 팩토리 함수
export function UserId(value: string): UserId {
  assertNonEmpty(value, 'UserId');
  return value as UserId;
}

// 프로그램 ID 팩토리 함수
export function ProgramId(value: string): ProgramId {
  assertNonEmpty(value, 'ProgramId');
  return value as ProgramId;
}

// 세션 ID 팩토리 함수
export function SessionId(value: string): SessionId {
  assertNonEmpty(value, 'SessionId');
  return value as SessionId;
}

// Email 정규
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// 이메일 값 객체
export class Email {
  private constructor(private readonly _value: string) {
    Object.freeze(this);
  }
  static create(value: string): Email {
    if (!isString(value) || !EMAIL_REGEX.test(value)) {
      throw new Error('Invalid email');
    }
    return new Email(value);
  }
  get value(): string {
    return this._value;
  }
  equals(other: Email): boolean {
    return this._value.toLowerCase() === other._value.toLowerCase();
  }
  toString() {
    return this._value;
  }
  toJSON() {
    return this._value;
  }
  unwrap(): string {
    return this._value;
  }
}

// URL (표준 URL 객체 활용)
export class Url {
  private constructor(private readonly _value: string) {
    Object.freeze(this);
  }
  static create(value: string): Url {
    if (!isString(value)) throw new Error('Url must be string');
    // 표준 URL 파서로 유효성 검사 (런타임 제공)
    let u: URL;
    try {
      u = new URL(value);
    } catch {
      throw new Error('Invalid URL');
    }
    // 프로토콜 제한이 필요하면 여기서 검사 가능 (http/https 등)
    if (!['http:', 'https:'].includes(u.protocol)) {
      throw new Error('Unsupported URL protocol');
    }
    return new Url(u.toString());
  }
  get value(): string {
    return this._value;
  }
  equals(other: Url): boolean {
    return this._value === other._value;
  }
  toString() {
    return this._value;
  }
  toJSON() {
    return this._value;
  }
  unwrap(): string {
    return this._value;
  }
}

// 비어있지 않은 문자열 ( NonEmptyString / Slug )
export class NonEmptyString {
  private constructor(private readonly _value: string) {
    Object.freeze(this);
  }
  static create(value: string): NonEmptyString {
    if (!isString(value) || value.trim() === '') throw new Error('String must be non-empty');
    return new NonEmptyString(value);
  }
  get value(): string {
    return this._value;
  }
  equals(other: NonEmptyString): boolean {
    return this._value === other._value;
  }
  toString() {
    return this._value;
  }
  toJSON() {
    return this._value;
  }
  unwrap(): string {
    return this._value;
  }
}

// 간단한 슬러그 (영문/숫자/-)
export class Slug {
  private constructor(private readonly _value: string) {
    Object.freeze(this);
  }
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
  get value(): string {
    return this._value;
  }
  equals(other: Slug): boolean {
    return this._value === other._value;
  }
  toString() {
    return this._value;
  }
  toJSON() {
    return this._value;
  }
  unwrap(): string {
    return this._value;
  }
}

// Capacity: 0 이상의 정수
export class Capacity {
  private constructor(private readonly _value: number) {
    Object.freeze(this);
  }
  static create(value: number): Capacity {
    if (!isFiniteInteger(value) || value < 0)
      throw new Error('Capacity must be a non-negative integer');
    return new Capacity(value);
  }
  get value(): number {
    return this._value;
  }
  hasSpace(currentCount: number): boolean {
    if (!isFiniteInteger(currentCount) || currentCount < 0) return false;
    return currentCount < this._value;
  }
  // 초과 허용 상한 (예: 10%면 ceil(capacity * 1.1))
  overbookLimit(percent: number): number {
    const p = Math.max(0, Math.floor(percent));
    return Math.ceil(this._value * (1 + p / 100));
  }
  equals(other: Capacity): boolean {
    return this._value === other._value;
  }
  toJSON() {
    return this._value;
  }
  unwrap(): number {
    return this._value;
  }
}

// ISO 문자열 기반 (예: 2023-10-01T10:00:00.000Z)
export class TimeRange {
  private constructor(
    private readonly _startISO: string,
    private readonly _endISO: string,
  ) {
    Object.freeze(this);
  }
  static create(startISO: string, endISO: string): TimeRange {
    if (!isString(startISO) || !isString(endISO)) throw new Error('TimeRange must be ISO strings');
    const start = new Date(startISO).getTime();
    const end = new Date(endISO).getTime();
    if (!Number.isFinite(start) || !Number.isFinite(end)) throw new Error('Invalid ISO date');
    if (end <= start) throw new Error('TimeRange end must be after start');
    return new TimeRange(new Date(start).toISOString(), new Date(end).toISOString());
  }
  get start(): string {
    return this._startISO;
  }
  get end(): string {
    return this._endISO;
  }
  durationMs(): number {
    return new Date(this._endISO).getTime() - new Date(this._startISO).getTime();
  }
  overlaps(other: TimeRange): boolean {
    const a1 = new Date(this._startISO).getTime();
    const a2 = new Date(this._endISO).getTime();
    const b1 = new Date(other._startISO).getTime();
    const b2 = new Date(other._endISO).getTime();
    return a1 < b2 && b1 < a2;
  }
  equals(other: TimeRange): boolean {
    return this._startISO === other._startISO && this._endISO === other._endISO;
  }
  toJSON() {
    return { start: this._startISO, end: this._endISO };
  }
  unwrap(): { start: string; end: string } {
    return { start: this._startISO, end: this._endISO };
  }
}

// 대략적 IANA 타임존 ID 검증
const IANA_TZ_REGEX = /^[A-Za-z_]+\/[A-Za-z_]+(?:\/[A-Za-z_]+)?$/;

export class TimezoneId {
  private constructor(private readonly _value: string) {
    Object.freeze(this);
  }
  static create(value: string): TimezoneId {
    if (!isString(value) || !IANA_TZ_REGEX.test(value)) {
      throw new Error('Invalid IANA timezone id');
    }
    return new TimezoneId(value);
  }
  get value(): string {
    return this._value;
  }
  equals(other: TimezoneId): boolean {
    return this._value === other._value;
  }
  toString() {
    return this._value;
  }
  toJSON() {
    return this._value;
  }
  unwrap(): string {
    return this._value;
  }
}
