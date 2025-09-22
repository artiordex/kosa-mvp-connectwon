/**
 * Description : PlaywrightActions.ts - 📌 Playwright 통합 액션 유틸리티 클래스
 * Author : Shiwoo Min
 * Date : 2025-09-
 * 09-21 - 기본 액션 메서드들과 웹 전용 헬퍼 메서드들을 하나의 클래스로 통합
 * TDriver는 제네릭 타입 매개변수를 사용하여
 * - WebActionUtils 에서는 Playwright page 만 사용
 * - MobileActionUtils 에서는 Playwright + Appium 드라이버 객체를 함께 관리
 * - 현재 MVP 범위는 웹, 모바일웹 테스트 이므로 MobileActionUtils는 추후 구현 예정
 */
import { expect, type Locator, type Page } from '@playwright/test';

/**
 * @description PlaywrightActions 클래스 생성자 옵션
 */
export interface PlaywrightActionsOptions {
  /** @description 기본 타임아웃 (밀리초, 기본값: 10초) */
  defaultTimeout?: number;
}

/**
 * @description Playwright 통합 액션 유틸리티 클래스
 */
export class PlaywrightActions {
  /** @description Playwright Page 객체 */
  protected readonly page: Page;
  /** @description 공통 타임아웃(기본 10s) */
  protected readonly defaultTimeout: number;

  /**
   * @description PlaywrightActions 생성자
   * @param page Playwright Page 객체
   * @param opts 추가 옵션 (타임아웃 설정 등)
   */
  constructor(page: Page, opts: PlaywrightActionsOptions = {}) {
    this.page = page;
    this.defaultTimeout = opts.defaultTimeout ?? 10_000;
  }

  // ========================================
  // 🔧 헬퍼 메서드들
  // ========================================

  /**
   * @description 문자열/Locator를 통일된 Locator로 변환
   * @param selector CSS 선택자 문자열 또는 Locator 객체
   * @returns Locator 객체
   */
  locator(selector: string | Locator): Locator {
    return typeof selector === 'string' ? this.page.locator(selector) : selector;
  }

  /**
   * @description data-testid 속성으로 요소를 찾는 헬퍼
   * @param testId data-testid 값
   * @returns Locator 객체
   */
  dt(testId: string): Locator {
    return this.page.getByTestId(testId);
  }

  /**
   * @description role 속성으로 요소를 찾는 헬퍼
   * @param role ARIA role 값 (예: 'button', 'link', 'textbox')
   * @param name 접근 가능한 이름 (선택사항)
   * @returns Locator 객체
   */
  role(role: string, name?: string): Locator {
    return name ? this.page.getByRole(role as any, { name }) : this.page.getByRole(role as any);
  }

  /**
   * @description placeholder 텍스트로 입력 요소를 찾는 헬퍼
   * @param placeholder placeholder 텍스트
   * @returns Locator 객체
   */
  placeholder(placeholder: string): Locator {
    return this.page.getByPlaceholder(placeholder);
  }

  /**
   * @description URL 이동 (DOMContentLoaded까지 대기)
   * @param url 이동할 URL
   */
  async goto(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  /**
   * @description URL 이동 후 네트워크 안정 상태까지 대기
   * @param url 이동할 URL
   */
  async gotoAndWait(url: string): Promise<void> {
    await this.goto(url);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * @description 뒤로 가기
   */
  async goBack(): Promise<void> {
    await this.page.goBack();
  }

  /**
   * @description 앞으로 가기
   */
  async goForward(): Promise<void> {
    await this.page.goForward();
  }

  /**
   * @description 페이지 새로고침
   */
  async reload(): Promise<void> {
    await this.page.reload();
  }

  /**
   * @description 특정 URL 패턴까지 대기
   * @param partial URL 패턴 (문자열, 정규식, 또는 함수)
   * @param timeout 타임아웃 (밀리초)
   */
  async waitForUrl(
    partial: string | RegExp | ((url: URL) => boolean),
    timeout = this.defaultTimeout,
  ): Promise<void> {
    await this.page.waitForURL(partial, { timeout });
  }

  /**
   * @description 요소가 보일 때까지 대기
   * @param target 대상 요소 (선택자 또는 Locator)
   * @param timeout 타임아웃 (밀리초)
   * @returns 대기 완료된 Locator 객체
   */
  async waitVisible(target: string | Locator, timeout = this.defaultTimeout): Promise<Locator> {
    const loc = this.locator(target);
    await loc.waitFor({ state: 'visible', timeout });
    return loc;
  }

  /**
   * @description 요소가 숨겨질 때까지 대기
   * @param target 대상 요소 (선택자 또는 Locator)
   * @param timeout 타임아웃 (밀리초)
   * @returns 대기 완료된 Locator 객체
   */
  async waitHidden(target: string | Locator, timeout = this.defaultTimeout): Promise<Locator> {
    const loc = this.locator(target);
    await loc.waitFor({ state: 'hidden', timeout });
    return loc;
  }

  /**
   * @description 요소가 활성화(Enabled) 상태일 때까지 대기
   * @param target 대상 요소 (선택자 또는 Locator)
   * @param timeout 타임아웃 (밀리초)
   * @returns 대기 완료된 Locator 객체
   */
  async waitEnabled(target: string | Locator, timeout = this.defaultTimeout): Promise<Locator> {
    const loc = this.locator(target);
    await expect(loc).toBeEnabled({ timeout });
    return loc;
  }

  /**
   * @description 요소가 DOM에 추가될 때까지 대기
   * @param target 대상 요소 (선택자 또는 Locator)
   * @param timeout 타임아웃 (밀리초)
   * @returns 대기 완료된 Locator 객체
   */
  async waitAttached(target: string | Locator, timeout = this.defaultTimeout): Promise<Locator> {
    const loc = this.locator(target);
    await loc.waitFor({ state: 'attached', timeout });
    return loc;
  }

  /**
   * @description 로딩 스피너가 사라질 때까지 대기
   * @param spinnerSelector 스피너 요소 선택자
   * @param timeout 타임아웃 (밀리초)
   */
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

  /**
   * @description 지정된 시간만큼 대기
   * @param ms 대기 시간 (밀리초)
   */
  async pause(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }

  /**
   * @description 요소 클릭
   * @param target 클릭할 요소 (선택자 또는 Locator)
   * @param options 클릭 옵션 (force, timeout 등)
   */
  async click(target: string | Locator, options?: { force?: boolean; timeout?: number }): Promise<void> {
    await this.locator(target).click(options);
  }

  /**
   * @description 요소 더블클릭
   * @param target 더블클릭할 요소 (선택자 또는 Locator)
   */
  async doubleClick(target: string | Locator): Promise<void> {
    await this.locator(target).dblclick();
  }

  /**
   * @description 요소 우클릭
   * @param target 우클릭할 요소 (선택자 또는 Locator)
   */
  async rightClick(target: string | Locator): Promise<void> {
    await this.locator(target).click({ button: 'right' });
  }

  /**
   * @description 텍스트로 요소를 찾아서 클릭
   * @param text 찾을 텍스트 (정확히 일치)
   */
  async clickByText(text: string): Promise<void> {
    await this.page.getByText(text, { exact: true }).click();
  }

  /**
   * @description 요소에 마우스 호버
   * @param target 호버할 요소 (선택자 또는 Locator)
   */
  async hover(target: string | Locator): Promise<void> {
    await this.locator(target).hover();
  }

  /**
   * @description 요소로 스크롤
   * @param target 스크롤할 대상 요소 (선택자 또는 Locator)
   */
  async scrollTo(target: string | Locator): Promise<void> {
    await this.locator(target).scrollIntoViewIfNeeded();
  }

  /**
   * @description 텍스트 입력 (기존 값 초기화 옵션 포함)
   * @param target 입력할 요소 (선택자 또는 Locator)
   * @param text 입력할 텍스트
   * @param clear 기존 값 초기화 여부 (기본값: true)
   */
  async type(target: string | Locator, text: string, clear = true): Promise<void> {
    const loc = this.locator(target);
    if (clear) await loc.fill('');
    await loc.type(text);
  }

  /**
   * @description 입력 필드에 값 채우기
   * @param target 입력할 요소 (선택자 또는 Locator)
   * @param value 입력할 값
   */
  async fill(target: string | Locator, value: string): Promise<void> {
    await this.locator(target).fill(value);
  }

  /**
   * @description 라벨로 input 요소를 찾아서 값 채우기
   * @param label 라벨 텍스트
   * @param value 입력할 값
   */
  async fillByLabel(label: string, value: string): Promise<void> {
    await this.page.getByLabel(label).fill(value);
  }

  /**
   * @description 입력 필드 내용 지우기
   * @param target 지울 요소 (선택자 또는 Locator)
   */
  async clear(target: string | Locator): Promise<void> {
    await this.locator(target).fill('');
  }

  /**
   * @description 키보드 키 입력
   * @param target 키를 입력할 요소 (선택자 또는 Locator)
   * @param key 입력할 키 (예: 'Enter', 'Tab', 'Escape')
   */
  async press(target: string | Locator, key: string): Promise<void> {
    await this.locator(target).press(key);
  }

  /**
   * @description 체크박스 체크/해제
   * @param target 체크박스 요소 (선택자 또는 Locator)
   * @param checked 체크 상태 (true: 체크, false: 해제)
   */
  async setChecked(target: string | Locator, checked: boolean): Promise<void> {
    await this.locator(target).setChecked(checked);
  }

  /**
   * @description 셀렉트 박스에서 옵션 선택
   * @param target 셀렉트 요소 (선택자 또는 Locator)
   * @param value 선택할 값 (value, label, index 지원)
   */
  async selectOption(target: string | Locator, value: string | string[] | { value?: string; label?: string; index?: number }): Promise<void> {
    await this.locator(target).selectOption(value as any);
  }

  /**
   * @description 파일 업로드
   * @param target 파일 입력 요소 (선택자 또는 Locator)
   * @param filePath 업로드할 파일 경로
   */
  async uploadFile(target: string | Locator, filePath: string | string[]): Promise<void> {
    await this.locator(target).setInputFiles(filePath);
  }

  /**
   * @description 요소의 텍스트 내용 가져오기
   * @param target 대상 요소 (선택자 또는 Locator)
   * @returns 텍스트 내용
   */
  async getText(target: string | Locator): Promise<string> {
    return await this.locator(target).textContent() || '';
  }

  /**
   * @description 요소의 속성값 가져오기
   * @param target 대상 요소 (선택자 또는 Locator)
   * @param attribute 속성명
   * @returns 속성값
   */
  async getAttribute(target: string | Locator, attribute: string): Promise<string | null> {
    return await this.locator(target).getAttribute(attribute);
  }

  /**
   * @description 입력 요소의 값 가져오기
   * @param target 대상 요소 (선택자 또는 Locator)
   * @returns 입력값
   */
  async getValue(target: string | Locator): Promise<string> {
    return await this.locator(target).inputValue();
  }

  /**
   * @description 요소의 개수 가져오기
   * @param target 대상 요소 (선택자 또는 Locator)
   * @returns 요소 개수
   */
  async getCount(target: string | Locator): Promise<number> {
    return await this.locator(target).count();
  }

  /**
   * @description 요소가 존재하는지 확인
   * @param target 대상 요소 (선택자 또는 Locator)
   * @returns 존재 여부
   */
  async isExists(target: string | Locator): Promise<boolean> {
    return (await this.getCount(target)) > 0;
  }

  /**
   * @description 요소가 보이는지 확인
   * @param target 대상 요소 (선택자 또는 Locator)
   * @returns 가시성 여부
   */
  async isVisible(target: string | Locator): Promise<boolean> {
    return await this.locator(target).isVisible();
  }

  /**
   * @description 요소가 활성화되어 있는지 확인
   * @param target 대상 요소 (선택자 또는 Locator)
   * @returns 활성화 여부
   */
  async isEnabled(target: string | Locator): Promise<boolean> {
    return await this.locator(target).isEnabled();
  }

  /**
   * @description 체크박스가 체크되어 있는지 확인
   * @param target 대상 요소 (선택자 또는 Locator)
   * @returns 체크 여부
   */
  async isChecked(target: string | Locator): Promise<boolean> {
    return await this.locator(target).isChecked();
  }

  /**
   * @description 요소가 보이는지 검증
   * @param target 검증할 요소 (선택자 또는 Locator)
   * @param timeout 타임아웃 (밀리초)
   */
  async expectVisible(target: string | Locator, timeout = this.defaultTimeout): Promise<void> {
    await expect(this.locator(target)).toBeVisible({ timeout });
  }

  /**
   * @description 요소가 숨겨져 있는지 검증
   * @param target 검증할 요소 (선택자 또는 Locator)
   * @param timeout 타임아웃 (밀리초)
   */
  async expectHidden(target: string | Locator, timeout = this.defaultTimeout): Promise<void> {
    await expect(this.locator(target)).toBeHidden({ timeout });
  }

  /**
   * @description 요소가 활성화되어 있는지 검증
   * @param target 검증할 요소 (선택자 또는 Locator)
   * @param timeout 타임아웃 (밀리초)
   */
  async expectEnabled(target: string | Locator, timeout = this.defaultTimeout): Promise<void> {
    await expect(this.locator(target)).toBeEnabled({ timeout });
  }

  /**
   * @description 요소가 비활성화되어 있는지 검증
   * @param target 검증할 요소 (선택자 또는 Locator)
   * @param timeout 타임아웃 (밀리초)
   */
  async expectDisabled(target: string | Locator, timeout = this.defaultTimeout): Promise<void> {
    await expect(this.locator(target)).toBeDisabled({ timeout });
  }

  /**
   * @description 요소의 텍스트가 정확히 일치하는지 검증
   * @param target 검증할 요소 (선택자 또는 Locator)
   * @param expected 예상 텍스트 (문자열 또는 정규식)
   * @param timeout 타임아웃 (밀리초)
   */
  async expectText(target: string | Locator, expected: string | RegExp, timeout = this.defaultTimeout): Promise<void> {
    await expect(this.locator(target)).toHaveText(expected, { timeout });
  }

  /**
   * @description 요소의 텍스트가 특정 문자열을 포함하는지 검증
   * @param target 검증할 요소 (선택자 또는 Locator)
   * @param expected 포함될 텍스트 (문자열 또는 정규식)
   * @param timeout 타임아웃 (밀리초)
   */
  async expectContainsText(target: string | Locator, expected: string | RegExp, timeout = this.defaultTimeout): Promise<void> {
    await expect(this.locator(target)).toContainText(expected, { timeout });
  }

  /**
   * @description 입력 요소의 값이 예상값과 일치하는지 검증
   * @param target 검증할 요소 (선택자 또는 Locator)
   * @param expected 예상 값
   * @param timeout 타임아웃 (밀리초)
   */
  async expectValue(target: string | Locator, expected: string | RegExp, timeout = this.defaultTimeout): Promise<void> {
    await expect(this.locator(target)).toHaveValue(expected, { timeout });
  }

  /**
   * @description 요소의 개수가 예상과 일치하는지 검증
   * @param target 검증할 요소 (선택자 또는 Locator)
   * @param count 예상 개수
   * @param timeout 타임아웃 (밀리초)
   */
  async expectCount(target: string | Locator, count: number, timeout = this.defaultTimeout): Promise<void> {
    await expect(this.locator(target)).toHaveCount(count, { timeout });
  }

  /**
   * @description 체크박스가 체크되어 있는지 검증
   * @param target 검증할 요소 (선택자 또는 Locator)
   * @param timeout 타임아웃 (밀리초)
   */
  async expectChecked(target: string | Locator, timeout = this.defaultTimeout): Promise<void> {
    await expect(this.locator(target)).toBeChecked({ timeout });
  }

  /**
   * @description 요소의 속성값이 예상과 일치하는지 검증
   * @param target 검증할 요소 (선택자 또는 Locator)
   * @param attribute 속성명
   * @param expected 예상 속성값
   * @param timeout 타임아웃 (밀리초)
   */
  async expectAttribute(target: string | Locator, attribute: string, expected: string | RegExp, timeout = this.defaultTimeout): Promise<void> {
    await expect(this.locator(target)).toHaveAttribute(attribute, expected, { timeout });
  }

  /**
   * @description 현재 URL이 예상과 일치하는지 검증
   * @param expected 예상 URL (문자열 또는 정규식)
   * @param timeout 타임아웃 (밀리초)
   */
  async expectUrl(expected: string | RegExp, timeout = this.defaultTimeout): Promise<void> {
    await expect(this.page).toHaveURL(expected, { timeout });
  }

  /**
   * @description 페이지 제목이 예상과 일치하는지 검증
   * @param expected 예상 제목 (문자열 또는 정규식)
   * @param timeout 타임아웃 (밀리초)
   */
  async expectTitle(expected: string | RegExp, timeout = this.defaultTimeout): Promise<void> {
    await expect(this.page).toHaveTitle(expected, { timeout });
  }

  /**
   * @description 토스트 메시지 내용 검증
   * @param message 예상 토스트 메시지 (문자열 또는 정규식)
   * @param timeout 타임아웃 (밀리초)
   */
  async assertToast(message: string | RegExp, timeout = this.defaultTimeout): Promise<void> {
    const toast = this.page.locator('[role="alert"], [data-testid="toast"], .toast');
    await expect(toast).toContainText(message, { timeout });
  }

  /**
   * @description 터치 제스처 (모바일웹)
   * @param target 터치할 요소 (선택자 또는 Locator)
   */
  async tap(target: string | Locator): Promise<void> {
    await this.locator(target).tap();
  }

  /**
   * @description 스와이프 제스처 수행
   * @param startTarget 시작 지점 요소
   * @param endTarget 끝 지점 요소
   */
  async swipe(startTarget: string | Locator, endTarget: string | Locator): Promise<void> {
    const startElement = this.locator(startTarget);
    const endElement = this.locator(endTarget);

    const startBox = await startElement.boundingBox();
    const endBox = await endElement.boundingBox();

    if (startBox && endBox) {
      await this.page.mouse.move(startBox.x + startBox.width / 2, startBox.y + startBox.height / 2);
      await this.page.mouse.down();
      await this.page.mouse.move(endBox.x + endBox.width / 2, endBox.y + endBox.height / 2);
      await this.page.mouse.up();
    }
  }
  
  /**
   * @description 전체 페이지 스크린샷 저장
   * @param filePath 저장할 파일 경로
   */
  async screenshot(filePath: string): Promise<void> {
    await this.page.screenshot({ path: filePath, fullPage: true });
  }

  /**
   * @description 특정 요소의 스크린샷 저장
   * @param target 스크린샷을 찍을 요소
   * @param filePath 저장할 파일 경로
   */
  async screenshotElement(target: string | Locator, filePath: string): Promise<void> {
    await this.locator(target).screenshot({ path: filePath });
  }

  /**
   * @description 현재 페이지의 HTML 소스 가져오기
   * @returns HTML 소스 코드
   */
  async getPageSource(): Promise<string> {
    return await this.page.content();
  }

  /**
   * @description 현재 URL 가져오기
   * @returns 현재 페이지 URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * @description 페이지 제목 가져오기
   * @returns 페이지 제목
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * @description 페이지에서 JavaScript 실행
   * @param script 실행할 JavaScript 코드
   * @param args 스크립트에 전달할 인자들
   * @returns 실행 결과
   */
  async executeScript<T = any>(script: string | Function, ...args: any[]): Promise<T> {
    return await this.page.evaluate(script as any, ...args);
  }

  /**
   * @description 새 탭/창 열기 및 전환
   * @param url 열 URL (선택사항)
   * @returns 새 페이지 객체
   */
  async openNewTab(url?: string): Promise<Page> {
    const newPage = await this.page.context().newPage();
    if (url) {
      await newPage.goto(url);
    }
    return newPage;
  }

  /**
   * @description 알림창(alert) 처리
   * @param accept true면 확인, false면 취소
   * @param text 프롬프트에 입력할 텍스트 (선택사항)
   */
  async handleDialog(accept: boolean, text?: string): Promise<void> {
    this.page.on('dialog', async dialog => {
      if (text && dialog.type() === 'prompt') {
        await dialog.accept(text);
      } else if (accept) {
        await dialog.accept();
      } else {
        await dialog.dismiss();
      }
    });
  }
}
