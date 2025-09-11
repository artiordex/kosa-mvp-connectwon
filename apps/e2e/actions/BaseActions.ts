/**
 * Description : BaseActionUtils.ts - 📌 공통 액션 유틸리티 클래스
 * Author : Shiwoo Min
 * Date : 2025-09-07
 * TDriver는 제네릭 타입 매개변수를 사용하여
 * - WebActionUtils 에서는 Playwright page 만 사용
 * - MobileActionUtils 에서는 Playwright + Appium 드라이버 객체를 함께 관리
 * - 현재 MVP 범위는 웹, 모바일웹 테스트 이므로 MobileActionUtils는 추후 구현 예정
 */
import { expect, type Locator, type Page } from '@playwright/test';

export interface BaseActionsOptions {
  defaultTimeout?: number;
}

export class BaseActions {
  // Playwright Page 객체
  protected readonly page: Page;
  // 공통 타임아웃(기본 10s)
  protected readonly defaultTimeout: number;

  // 생성자
  constructor(page: Page, opts: BaseActionsOptions = {}) {
    this.page = page;
    this.defaultTimeout = opts.defaultTimeout ?? 10_000;
  }

  // 문자열/Locator를 통일된 Locator로 변환
  locator(selector: string | Locator): Locator {
    return typeof selector === 'string' ? this.page.locator(selector) : selector;
  }

  // data-testid 헬퍼
  dt(testId: string): Locator {
    return this.page.getByTestId(testId);
  }

  // URL 이동 (DOMContentLoaded까지 대기)
  async goto(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  // 특정 URL 패턴까지 대기
  async waitForUrl(
    partial: string | RegExp | ((url: URL) => boolean),
    timeout = this.defaultTimeout,
  ): Promise<void> {
    await this.page.waitForURL(partial, { timeout });
  }

  // 요소가 보일 때까지 대기
  async waitVisible(target: string | Locator, timeout = this.defaultTimeout): Promise<Locator> {
    const loc = this.locator(target);
    await loc.waitFor({ state: 'visible', timeout });
    return loc;
  }

  // 요소가 숨겨질 때까지 대기
  async waitHidden(target: string | Locator, timeout = this.defaultTimeout): Promise<Locator> {
    const loc = this.locator(target);
    await loc.waitFor({ state: 'hidden', timeout });
    return loc;
  }

  // 요소가 Enabled 상태일 때까지 대기
  async waitEnabled(target: string | Locator, timeout = this.defaultTimeout): Promise<Locator> {
    const loc = this.locator(target);
    await expect(loc).toBeEnabled({ timeout });
    return loc;
  }

  // 클릭
  async click(target: string | Locator): Promise<void> {
    await this.locator(target).click();
  }

  // 입력 (기존 값 초기화 옵션)
  async type(target: string | Locator, text: string, clear = true): Promise<void> {
    const loc = this.locator(target);
    if (clear) await loc.fill('');
    await loc.type(text);
  }

  // 값 채우기
  async fill(target: string | Locator, value: string): Promise<void> {
    await this.locator(target).fill(value);
  }

  // 키 입력
  async press(target: string | Locator, key: string): Promise<void> {
    await this.locator(target).press(key);
  }

  // 보임 여부 검사
  async expectVisible(target: string | Locator): Promise<void> {
    await expect(this.locator(target)).toBeVisible();
  }

  // 숨김 여부 검사
  async expectHidden(target: string | Locator): Promise<void> {
    await expect(this.locator(target)).toBeHidden();
  }

  // 텍스트 일치 검사
  async expectText(target: string | Locator, expected: string | RegExp): Promise<void> {
    await expect(this.locator(target)).toHaveText(expected);
  }

  // 텍스트 포함 검사
  async expectContainsText(target: string | Locator, expected: string | RegExp): Promise<void> {
    await expect(this.locator(target)).toContainText(expected);
  }

  // 지정 시간(ms) 대기
  async pause(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }

  // 전체 페이지 스크린샷 저장
  async screenshot(filePath: string): Promise<void> {
    await this.page.screenshot({ path: filePath, fullPage: true });
  }
}
