/**
 * Description : participant.spec.ts - 📌 프로그램 참여 관련 블랙박스 E2E 테스트
 * Author : Shiwoo Min
 * Date : 2025-09-26
 */
import { expect, test } from '@playwright/test';

test.describe('프로그램 참여 플로우 (웹 UI)', () => {
  test.beforeEach(async ({ page }) => {
    // TODO: 로그인 단계
    // 1. 로그인 페이지 이동
    await page.goto(process.env['WEB_BASE_URL'] ?? 'http://localhost:3000/login');

    // 2. 이메일/비밀번호 입력
    await page.fill('input[placeholder="이메일"]', process.env['TEST_USER_EMAIL'] ?? 'test@example.com');
    await page.fill('input[placeholder="비밀번호"]', process.env['TEST_USER_PASSWORD'] ?? 'password123');

    // 3. 로그인 버튼 클릭
    await page.click('button:has-text("로그인")');

    // 4. 로그인 성공 여부 확인 (대시보드로 리다이렉트 되는지)
    await expect(page).toHaveURL(/dashboard/);
  });

  test('프로그램 참여 → 마이페이지 확인 → 참여 취소', async ({ page }) => {
    // TODO: 프로그램 목록 페이지 이동
    await page.click('a:has-text("프로그램 관리")');

    // TODO: 특정 프로그램 상세 진입
    await page.click('text=AI 특강 프로그램'); // 실제 프로그램명에 맞게 수정 필요

    // TODO: 참여하기 버튼 클릭
    await page.click('button:has-text("참여하기")');

    // TODO: 참여 성공 토스트/알림 확인
    await expect(page.locator('[role="alert"], .toast')).toContainText(/참여 완료|성공/);

    // TODO: 마이페이지 → 내 프로그램 참여 목록 이동
    await page.click('a:has-text("마이페이지")');
    await page.click('a:has-text("내 참여 프로그램")');

    // TODO: 해당 프로그램이 목록에 있는지 확인
    await expect(page.locator('text=AI 특강 프로그램')).toBeVisible();

    // TODO: 참여 취소 버튼 클릭
    await page.click('button:has-text("참여 취소")');

    // TODO: 취소 성공 메시지 확인
    await expect(page.locator('[role="alert"], .toast')).toContainText(/취소 완료|성공/);

    // TODO: 목록에서 해당 프로그램이 사라졌는지 확인
    await expect(page.locator('text=AI 특강 프로그램')).toHaveCount(0);
  });
});
