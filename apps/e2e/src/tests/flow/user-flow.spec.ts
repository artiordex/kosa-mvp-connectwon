/**
 * Description : user-flow.spec.ts - 📌 사용자 전체 흐름 E2E 테스트
 * Author : Shiwoo Min
 * Date : 2025-09-26
 */
import { expect, test } from '@playwright/test';

test.describe('사용자 전체 플로우', () => {
  test('회원가입 → 로그인 → 프로그램 탐색 → 예약 → 마이페이지 확인', async ({ page }) => {
    // 회원가입
    await page.goto(process.env['WEB_BASE_URL'] ?? 'http://localhost:3000');
    await page.click('text=회원가입');

    // TODO: 회원가입 입력
    await page.fill('input[placeholder="이메일"]', `user${Date.now()}@example.com`);
    await page.fill('input[placeholder="비밀번호"]', 'test1234!');
    await page.fill('input[placeholder="비밀번호 확인"]', 'test1234!');
    await page.click('button:has-text("회원가입")');

    // 로그인
    await page.goto('/login');
    await page.fill('input[placeholder="이메일"]', process.env['TEST_USER_EMAIL'] ?? 'test@example.com');
    await page.fill('input[placeholder="비밀번호"]', process.env['TEST_USER_PASSWORD'] ?? 'password123');
    await page.click('button:has-text("로그인")');
    await expect(page).toHaveURL(/dashboard/);

    // --- 프로그램 탐색 ---
    await page.click('a:has-text("프로그램 관리")');
    await expect(page.locator('h1')).toContainText(/프로그램/);

    // --- 프로그램 예약 ---
    await page.click('text=AI 특강 프로그램'); // 예시
    await page.click('button:has-text("예약하기")');
    await expect(page.locator('[role="alert"], .toast')).toContainText(/예약 완료/);

    // --- 마이페이지 확인 ---
    await page.click('a:has-text("마이페이지")');
    await page.click('a:has-text("내 예약")');
    await expect(page.locator('text=AI 특강 프로그램')).toBeVisible();

    // --- 로그아웃 ---
    await page.click('button:has-text("로그아웃")');
    await expect(page).toHaveURL(/login/);
  });
});
