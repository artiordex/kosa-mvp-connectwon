/**
 * Description : assert.ts - 📌 Assertion 유틸리티 클래스 (인스턴스 기반)
 * Author : Shiwoo Min
 * Date : 2024-09-09
 * 09-21 - 타입 강화, 코드 중복 제거, JSDoc 주석 추가
 */
import type { Expect, Locator, Page } from '@playwright/test';

// SoftAssert: 오류를 누적했다가 한 번에 throw 하는 클래스
export class SoftAssert {
  private errors: Error[] = [];

  /**
   * 에러를 누적
   * @param err Error 또는 오류 메시지
   */
  add(err: unknown) {
    this.errors.push(err instanceof Error ? err : new Error(String(err)));
  }

  /** 누적된 에러의 개수 */
  get size() {
    return this.errors.length;
  }

  /**
   * 누적된 에러가 있으면 예외 throw
   * @param msgPrefix 예외 메시지 접두사
   */
  flush(msgPrefix = 'SoftAssert failures') {
    if (this.errors.length === 0) return;
    const msg = this.errors.map((e, i) => `[${i + 1}] ${e.message}`).join('\n');
    throw new Error(`${msgPrefix}:\n${msg}`);
  }
}

/**
 * 오류 처리 함수: SoftAssert 있으면 누적, 아니면 즉시 throw
 * @param err 처리할 오류
 * @param soft SoftAssert 인스턴스 (옵션)
 */
function handle(err: unknown, soft?: SoftAssert): void {
  if (soft) soft.add(err);
  else throw err instanceof Error ? err : new Error(String(err));
}

/**
 * 오류 메시지 생성 (생성자에 넘길 메시지)
 * @param desc 설명(예: 함수명)
 * @param tail 상세 메시지
 * @returns 조합된 메시지 문자열
 */
function makeMsg(desc: string, tail: string) {
  return desc ? `${desc}: ${tail}` : tail;
}

/**
 * 객체 비교용 안정화된 JSON 문자열화(키 정렬)
 * @param v 직렬화할 객체
 * @returns 안정적으로 정렬된 JSON 문자열
 */
function stableStringify(v: unknown): string {
  return JSON.stringify(v, function replacer(k, value) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      // 키 정렬
      return Object.keys(value as Record<string, unknown>)
        .sort()
        .reduce(
          (acc, key) => {
            (acc as any)[key] = (value as any)[key];
            return acc;
          },
          {} as Record<string, unknown>,
        );
    }
    return value;
  });
}

/**
 * 값이 true여야 함
 * @param cond 조건식
 * @param desc 설명 (옵션)
 * @param soft SoftAssert 인스턴스 (옵션)
 */
export function assertTrue(cond: boolean, desc = 'assertTrue', soft?: SoftAssert) {
  try {
    if (!cond) throw new Error(makeMsg(desc, 'expected true'));
  } catch (e) {
    handle(e, soft);
  }
}

/**
 * 값이 false여야 함
 * @param cond 조건식
 * @param desc 설명 (옵션)
 * @param soft SoftAssert 인스턴스 (옵션)
 */
export function assertFalse(cond: boolean, desc = 'assertFalse', soft?: SoftAssert) {
  try {
    if (cond) throw new Error(makeMsg(desc, 'expected false'));
  } catch (e) {
    handle(e, soft);
  }
}

/**
 * 값이 정의(undefind, null 아님)되어 있어야 함
 * @param val 확인할 값
 * @param desc 설명 (옵션)
 * @param soft SoftAssert 인스턴스 (옵션)
 */
export function assertDefined<T>(
  val: T | null | undefined,
  desc = 'assertDefined',
  soft?: SoftAssert,
): asserts val is T {
  try {
    if (val === null || val === undefined) {
      throw new Error(makeMsg(desc, `expected defined value, got ${val}`));
    }
  } catch (e) {
    handle(e, soft);
  }
}

/**
 * 값이 정확히 같아야 함 (원시값 또는 객체 deep equal)
 * @param actual 실제값
 * @param expected 기대값
 * @param desc 설명 (옵션)
 * @param soft SoftAssert 인스턴스 (옵션)
 */
export function assertEquals<T>(actual: T, expected: T, desc = 'assertEquals', soft?: SoftAssert) {
  try {
    const equal =
      (typeof actual !== 'object' || actual === null) &&
      (typeof expected !== 'object' || expected === null)
        ? Object.is(actual as unknown, expected as unknown)
        : stableStringify(actual) === stableStringify(expected);

    if (!equal) {
      throw new Error(
        makeMsg(desc, `expected ${stableStringify(expected)}, got ${stableStringify(actual)}`),
      );
    }
  } catch (e) {
    handle(e, soft);
  }
}

/**
 * 수치값들이 근사치여야 함 (오차 범위 epsilon)
 * @param actual 실제값
 * @param expected 기대값
 * @param epsilon 허용 오차, 기본 1e-6
 * @param desc 설명 (옵션)
 * @param soft SoftAssert 인스턴스 (옵션)
 */
export function assertApprox(
  actual: number,
  expected: number,
  epsilon = 1e-6,
  desc = 'assertApprox',
  soft?: SoftAssert,
) {
  try {
    if (Number.isNaN(actual) || Number.isNaN(expected)) {
      throw new Error(makeMsg(desc, 'NaN not allowed'));
    }
    if (Math.abs(actual - expected) > epsilon) {
      throw new Error(makeMsg(desc, `|${actual} - ${expected}| > ${epsilon}`));
    }
  } catch (e) {
    handle(e, soft);
  }
}

/**
 * 문자열 또는 배열 내에 특정 값 포함 여부 검사
 * @param hay 포함 여부 검사 대상 (문자열 또는 배열)
 * @param needle 찾을 값 (문자열, 정규식, 기타)
 * @param desc 설명 (옵션)
 * @param soft SoftAssert 인스턴스 (옵션)
 */
export function assertContains(
  hay: string | unknown[],
  needle: string | RegExp | unknown,
  desc = 'assertContains',
  soft?: SoftAssert,
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
      throw new Error(
        makeMsg(
          desc,
          `expected ${JSON.stringify(hay)} to contain ${needle instanceof RegExp ? String(needle) : JSON.stringify(needle)}`,
        ),
      );
    }
  } catch (e) {
    handle(e, soft);
  }
}

/**
 * Playwright 요소가 화면에 보여야 함(assertion)
 * @param expect Playwright expect 객체
 * @param locator Playwright Locator 객체
 * @param desc 설명 (옵션)
 * @param soft SoftAssert 인스턴스 (옵션)
 */
export async function pwAssertVisible(
  expect: Expect,
  locator: Locator,
  desc = 'pwAssertVisible',
  soft?: SoftAssert,
) {
  try {
    await expect(locator).toBeVisible();
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    handle(new Error(makeMsg(desc, `not visible (${msg})`)), soft);
  }
}

/**
 * Playwright 요소가 특정 텍스트 또는 정규식과 일치해야 함
 * @param expect Playwright expect 객체
 * @param locator Playwright Locator 객체
 * @param expected 기대 텍스트 또는 정규식
 * @param desc 설명 (옵션)
 * @param soft SoftAssert 인스턴스 (옵션)
 */
export async function pwAssertText(
  expect: Expect,
  locator: Locator,
  expected: string | RegExp,
  desc = 'pwAssertText',
  soft?: SoftAssert,
) {
  try {
    await expect(locator).toHaveText(expected);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    handle(new Error(makeMsg(desc, `text mismatch (${msg})`)), soft);
  }
}

/**
 * Playwright 요소가 특정 개수여야 함
 * @param expect Playwright expect 객체
 * @param locator Playwright Locator 객체
 * @param n 기대 개수
 * @param desc 설명 (옵션)
 * @param soft SoftAssert 인스턴스 (옵션)
 */
export async function pwAssertCount(
  expect: Expect,
  locator: Locator,
  n: number,
  desc = 'pwAssertCount',
  soft?: SoftAssert,
) {
  try {
    await expect(locator).toHaveCount(n);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    handle(new Error(makeMsg(desc, `count mismatch (${msg})`)), soft);
  }
}

/**
 * Playwright 페이지 URL이 특정 문자열을 포함해야 함
 * @param page Playwright Page 객체
 * @param expectedSubstring 기대 URL 부분 문자열
 * @param desc 설명 (옵션)
 * @param soft SoftAssert 인스턴스 (옵션)
 */
export async function pwAssertUrlContains(
  page: Page,
  expectedSubstring: string,
  desc = 'pwAssertUrlContains',
  soft?: SoftAssert,
) {
  try {
    const url = await page.url();
    if (!url.includes(expectedSubstring)) {
      throw new Error(makeMsg(desc, `URL not contains '${expectedSubstring}' (got '${url}')`));
    }
  } catch (e) {
    handle(e, soft);
  }
}
