/**
 * Description : admin-flow.spec.ts - 📌 관리자 전체 흐름 E2E 테스트
 * Author : Shiwoo Min
 * Date : 2025-09-26
 */
import { expect, test } from '@playwright/test';

test.describe('관리자 전체 플로우', () => {
  test('로그인 → 대시보드 확인 → 프로그램 승인 → 예약 관리 → 로그아웃', async ({ page }) => {
    // --- 관리자 로그인 ---
    await page.goto(process.env['WEB_BASE_URL'] ?? 'http://localhost:3000/admin/login');
    await page.fill('input[placeholder="이메일"]', process.env['ADMIN_EMAIL'] ?? 'admin@example.com');
    await page.fill('input[placeholder="비밀번호"]', process.env['ADMIN_PASSWORD'] ?? 'admin1234');
    await page.click('button:has-text("로그인")');
    await expect(page).toHaveURL(/dashboard/);

    // 대시보드 확인
    await expect(page.locator('h1')).toContainText(/AI 통합 대시보드/);
    await expect(page.locator('text=총 사용자')).toBeVisible();
    await expect(page.locator('text=활성 예약')).toBeVisible();

    // 프로그램 승인 처리
    await page.click('a:has-text("프로그램 관리")');
    await page.click('text=승인 대기'); // 예시
    await page.click('button:has-text("승인")');
    await expect(page.locator('[role="alert"], .toast')).toContainText(/승인 완료/);

    // 예약 관리
    await page.click('a:has-text("예약 관리")');
    await expect(page.locator('h1')).toContainText(/예약 관리/);

    // 회원 관리
    await page.click('a:has-text("회원 관리")');
    await expect(page.locator('h1')).toContainText(/회원 관리/);

    // 로그아웃
    await page.click('button:has-text("로그아웃")');
    await expect(page).toHaveURL(/login/);
  });
});
