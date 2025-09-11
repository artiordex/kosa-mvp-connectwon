/**
 * Description : WebActions.ts - 📌 Playwright: 웹, 모바일웹 전용 애션 유튜리티 클래스
 * Author : Shiwoo Min
 * Date : 2025-04-07
 */
import { expect, type Page } from '@playwright/test';

import { BaseActions } from './BaseActions.js';
import { JsForceActions } from './JsForceActions.js';

export class WebActions extends BaseActions {
  // JsForceActions 조합
  readonly js: JsForceActions;

  // 생성자
  constructor(page: Page) {
    super(page);
    this.js = new JsForceActions(page);
  }

  // URL 이동 후 네트워크 안정 상태 대기
  async gotoAndWait(url: string): Promise<void> {
    await this.goto(url);
    await this.page.waitForLoadState('networkidle');
  }

  // 텍스트로 요소 찾아 클릭
  async clickByText(text: string): Promise<void> {
    await this.page.getByText(text, { exact: true }).click();
  }

  // 라벨로 input 찾아 채우기
  async fillByLabel(label: string, value: string): Promise<void> {
    await this.page.getByLabel(label).fill(value);
  }

  // 로딩 스피너가 사라질 때까지 대기
  async waitForSpinnerToDisappear(
    spinnerSelector = '[data-testid="loading"], .spinner',
    timeout = this.defaultTimeout,
  ): Promise<void> {
    const loc = this.page.locator(spinnerSelector);
    if ((await loc.count()) > 0) {
      await loc
        .first()
        .waitFor({ state: 'hidden', timeout })
        .catch(() => {});
    }
  }

  // 토스트 메시지 내용 확인
  async assertToast(message: string | RegExp): Promise<void> {
    const toast = this.page.locator('[role="alert"], [data-testid="toast"]');
    await expect(toast).toContainText(message);
  }
}
