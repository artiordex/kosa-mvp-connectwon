/**
 * Description : reservation.spec.ts - 📌 장소 예약 플로우 E2E 테스트
 * Author : Shiwoo Min
 * Date : 2025-09-26
 */
import { expect, test } from '@playwright/test';

test.describe('장소 예약 플로우', () => {
  test('로그인 → 장소 탐색 → 예약 → 마이페이지에서 확인 및 취소', async ({ page }) => {
    // 로그인
    await page.goto(process.env['WEB_BASE_URL'] ?? 'http://localhost:3000/login');
    await page.fill('input[placeholder="이메일"]', process.env['TEST_USER_EMAIL'] ?? 'test@example.com');
    await page.fill('input[placeholder="비밀번호"]', process.env['TEST_USER_PASSWORD'] ?? 'password123');
    await page.click('button:has-text("로그인")');
    await expect(page).toHaveURL(/dashboard/);

    // 장소 탐색
    await page.click('a:has-text("룸 관리")');
    await expect(page.locator('h1')).toContainText(/룸 관리/);

    // 예약하기
    const firstRoom = page.locator('.room-card').first();
    await expect(firstRoom).toBeVisible();
    await firstRoom.click();

    await page.click('button:has-text("예약하기")');

    // TODO: 날짜/시간 선택 (샘플 – 실제 UI에 맞게 수정 필요)
    await page.fill('input[name="date"]', '2025-10-01');
    await page.fill('input[name="time"]', '14:00');
    await page.click('button:has-text("예약 확정")');

    // 예약 완료 토스트 확인
    await expect(page.locator('[role="alert"], .toast')).toContainText(/예약 완료/);

    // 마이페이지에서 예약 확인
    await page.click('a:has-text("마이페이지")');
    await page.click('a:has-text("내 예약")');
    await expect(page.locator('text=예약 내역')).toBeVisible();
    await expect(page.locator('text=2025-10-01')).toBeVisible();

    // 예약 취소
    await page.click('button:has-text("예약 취소")');
    await expect(page.locator('[role="alert"], .toast')).toContainText(/예약 취소/);

    // 로그아웃
    await page.click('button:has-text("로그아웃")');
    await expect(page).toHaveURL(/login/);
  });
});
