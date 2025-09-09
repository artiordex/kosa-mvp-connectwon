/**
 * Description : assert.ts - 📌 Assertion 유틸리티 클래스 (인스턴스 기반)
 * Author : Shiwoo Min
 * Date : 2024-09-09
 */
import type { PwExpect, PwPage } from '../tool-types.js';

// SoftAssert: 오류 누적 후 한 번에 throw
export class SoftAssert {
  private errors: Error[] = [];

  add(err: unknown) {
    this.errors.push(err instanceof Error ? err : new Error(String(err)));
  }

  get size() { return this.errors.length; }

  flush(msgPrefix = 'SoftAssert failures') {
    if (this.errors.length === 0) return;
    const msg = this.errors.map((e, i) => `[${i + 1}] ${e.message}`).join('\n');
    throw new Error(`${msgPrefix}:\n${msg}`);
  }
}

// 내부 에러 처리기: soft 있으면 누적, 없으면 즉시 throw
function handle(err: unknown, soft?: SoftAssert): void {
  if (soft) soft.add(err);
  else throw (err instanceof Error ? err : new Error(String(err)));
}

function makeMsg(desc: string, tail: string) {
  return desc ? `${desc}: ${tail}` : tail;
}

// 객체 비교용 안정화된 JSON 문자열화(키 정렬)
function stableStringify(v: unknown): string {
  return JSON.stringify(v, function replacer(k, value) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      // 키 정렬
      return Object.keys(value as Record<string, unknown>)
        .sort()
        .reduce((acc, key) => {
          (acc as any)[key] = (value as any)[key];
          return acc;
        }, {} as Record<string, unknown>);
    }
    return value;
  });
}

// Assert 값이 true여야 함
export function assertTrue(cond: boolean, desc = 'assertTrue', soft?: SoftAssert) {
  try {
    if (!cond) throw new Error(makeMsg(desc, 'expected true'));
  } catch (e) { handle(e, soft); }
}

// Assert 값이 false여야 함
export function assertFalse(cond: boolean, desc = 'assertFalse', soft?: SoftAssert) {
  try {
    if (cond) throw new Error(makeMsg(desc, 'expected false'));
  } catch (e) { handle(e, soft); }
}

// Assert 값이 정의되어 있어야 함
export function assertDefined<T>(
  val: T | null | undefined,
  desc = 'assertDefined',
  soft?: SoftAssert
): asserts val is T {
  try {
    if (val === null || val === undefined) {
      throw new Error(makeMsg(desc, `expected defined value, got ${val}`));
    }
  } catch (e) { handle(e, soft); }
}

// Assert 값이 null/undefined여야 함
export function assertEquals<T>(actual: T, expected: T, desc = 'assertEquals', soft?: SoftAssert) {
  try {
    const equal =
      (typeof actual !== 'object' || actual === null) &&
      (typeof expected !== 'object' || expected === null)
        ? Object.is(actual as unknown, expected as unknown)
        : stableStringify(actual) === stableStringify(expected);

    if (!equal) {
      throw new Error(makeMsg(
        desc,
        `expected ${stableStringify(expected)}, got ${stableStringify(actual)}`
      ));
    }
  } catch (e) { handle(e, soft); }
}

// Assert 값이 근사치여야 함
export function assertApprox(
  actual: number,
  expected: number,
  epsilon = 1e-6,
  desc = 'assertApprox',
  soft?: SoftAssert
) {
  try {
    if (Number.isNaN(actual) || Number.isNaN(expected)) {
      throw new Error(makeMsg(desc, 'NaN not allowed'));
    }
    if (Math.abs(actual - expected) > epsilon) {
      throw new Error(makeMsg(desc, `|${actual} - ${expected}| > ${epsilon}`));
    }
  } catch (e) { handle(e, soft); }
}

// Assert 값이 포함되어 있어야 함
export function assertContains(
  hay: string | unknown[],
  needle: string | RegExp | unknown,
  desc = 'assertContains',
  soft?: SoftAssert
) {
  try {
    let ok = false;

    if (typeof hay === 'string') {
      if (typeof needle === 'string') ok = hay.includes(needle);
      else if (needle instanceof RegExp) ok = needle.test(hay);
    } else if (Array.isArray(hay)) {
      ok = hay.includes(needle);
    }

    if (!ok) {
      throw new Error(makeMsg(
        desc,
        `expected ${JSON.stringify(hay)} to contain ${needle instanceof RegExp ? String(needle) : JSON.stringify(needle)}`
      ));
    }
  } catch (e) { handle(e, soft); }
}

// Assert 요소가 화면에 보여야 함
export async function pwAssertVisible(
  expect: PwExpect,
  locator: any,
  desc = 'pwAssertVisible',
  soft?: SoftAssert
) {
  try {
    await expect(locator).toBeVisible();
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    handle(new Error(makeMsg(desc, `not visible (${msg})`)), soft);
  }
}

// Assert 요소가 활성화 상태여야 함
export async function pwAssertText(
  expect: PwExpect,
  locator: any,
  expected: string | RegExp,
  desc = 'pwAssertText',
  soft?: SoftAssert
) {
  try {
    await expect(locator).toHaveText(expected as any);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    handle(new Error(makeMsg(desc, `text mismatch (${msg})`)), soft);
  }
}

// Assert 요소가 특정 개수여야 함
export async function pwAssertCount(
  expect: PwExpect,
  locator: any,
  n: number,
  desc = 'pwAssertCount',
  soft?: SoftAssert
) {
  try {
    await expect(locator).toHaveCount(n);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    handle(new Error(makeMsg(desc, `count mismatch (${msg})`)), soft);
  }
}

// Assert 현재 URL이 특정 문자열을 포함해야 함
export function pwAssertUrlContains(
  page: PwPage,
  expectedSubstring: string,
  desc = 'pwAssertUrlContains',
  soft?: SoftAssert
) {
  try {
    const url = page.url();
    if (!url.includes(expectedSubstring)) {
      throw new Error(makeMsg(desc, `URL not contains '${expectedSubstring}' (got '${url}')`));
    }
  } catch (e) { handle(e, soft); }
}
