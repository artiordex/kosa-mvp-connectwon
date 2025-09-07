/**
 * Description : assertUtils.ts - 📌 Assertion 유틸리티 클래스 (인스턴스 기반)
 * Author : Shiwoo Min
 * Date : 2024-09-07
 */

// SoftAssert 클래스: 오류 누적 및 한 번에 throw
export class SoftAssert {
  private errors: Error[] = [];
  // 오류 누적
  add(err: unknown) { this.errors.push(err instanceof Error ? err : new Error(String(err))); }
  // 누적 실패를 한 번에 throw
  flush() {
    if (this.errors.length === 0) return;
    const msg = this.errors.map((e, i) => `[${i + 1}] ${e.message}`).join('\n');
    throw new Error(`SoftAssert failures:\n${msg}`);
  }
}

// 내부 에러 처리 (soft가 있으면 누적, 없으면 즉시 throw)
function handle(err: unknown, soft?: SoftAssert) {
  if (soft) soft.add(err);
  else throw (err instanceof Error ? err : new Error(String(err)));
}

// 조건이 true 여야 함
export function assertTrue(cond: boolean, desc: string, soft?: SoftAssert) {
  try { if (!cond) throw new Error(`${desc}: expected true`); } catch (e) { handle(e, soft); }
}

// 조건이 false 여야 함
export function assertFalse(cond: boolean, desc: string, soft?: SoftAssert) {
  try { if (cond) throw new Error(`${desc}: expected false`); } catch (e) { handle(e, soft); }
}

// 두 값이 같아야 함 (JSON 수준 비교)
export function assertEquals<T>(actual: T, expected: T, desc: string, soft?: SoftAssert) {
  try {
    const same = JSON.stringify(actual) === JSON.stringify(expected);
    if (!same) throw new Error(`${desc}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  } catch (e) { handle(e, soft); }
}

// 문자열 포함 여부
export function assertContains(hay: string, needle: string, desc: string, soft?: SoftAssert) {
  try { if (!hay.includes(needle)) throw new Error(`${desc}: '${needle}' not in '${hay}'`); }
  catch (e) { handle(e, soft); }
}

//  - E2E (Playwright) 전용 어설션 유틸
export type PwExpect = (arg: any) => {
  toBeVisible: () => Promise<void>;
  toBeEnabled: () => Promise<void>;
  toHaveText: (exp: any) => Promise<void>;
  toHaveAttribute: (name: string, exp: any) => Promise<void>;
  toHaveCount: (n: number) => Promise<void>;
};

export type PwPage = { url(): string; title(): Promise<string> };

// Locator 보임
export async function pwAssertVisible(expect: PwExpect, locator: any, desc: string, soft?: SoftAssert) {
  try { await expect(locator).toBeVisible(); }
  catch (e) { handle(new Error(`${desc}: not visible`), soft); }
}

// Locator 텍스트 검증
export async function pwAssertText(expect: PwExpect, locator: any, expected: string | RegExp, desc: string, soft?: SoftAssert) {
  try { await expect(locator).toHaveText(expected as any); }
  catch (e) { handle(new Error(`${desc}: text mismatch`), soft); }
}

// 페이지 URL 포함
export function pwAssertUrlContains(page: PwPage, expectedSubstring: string, desc: string, soft?: SoftAssert) {
  try {
    const url = page.url();
    if (!url.includes(expectedSubstring)) throw new Error(`${desc}: URL not contains '${expectedSubstring}' (got '${url}')`);
  } catch (e) { handle(e, soft); }
}
