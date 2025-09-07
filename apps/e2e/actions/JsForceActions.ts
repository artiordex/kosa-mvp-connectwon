/**
 * Description : JsForceActions.ts - 📌 자바스크립트 기반 강제 액션 유틸리티
 * Author : Shiwoo Min
 * Date : 2025-09-07
 * - headless 환경이나 특수 상황에서 Playwright 기본 API로 동작하지 않을 때 활용
 * - scrollIntoView, forceClick, forceType만 유지
 */
import type { Page } from '@playwright/test';

export class JsForceActions {
  // Playwright Page 객체
  constructor(private readonly page: Page) {}

  // 요소를 화면 중앙으로 스크롤
  async scrollIntoView(selector: string): Promise<void> {
    await this.page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (!el) throw new Error(`scrollIntoView: not found: ${sel}`);
      (el as HTMLElement).scrollIntoView({ block: 'center', inline: 'center' });
    }, selector);
  }

  // 강제 클릭 (표준 클릭이 실패할 때)
  async forceClick(selector: string): Promise<void> {
    await this.page.evaluate((sel) => {
      const el = document.querySelector(sel) as HTMLElement | null;
      if (!el) throw new Error(`forceClick: not found: ${sel}`);
      el.click();
    }, selector);
  }

  // 강제 입력 (value 직접 세팅 + 이벤트 발생)
  async forceType(selector: string, text: string): Promise<void> {
    await this.page.evaluate(({ sel, text }) => {
      const el = document.querySelector(sel) as HTMLInputElement | HTMLTextAreaElement | null;
      if (!el) throw new Error(`forceType: not found: ${sel}`);
      (el as any).value = text;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    }, { sel: selector, text });
  }
}
