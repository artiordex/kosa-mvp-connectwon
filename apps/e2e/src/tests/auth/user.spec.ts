/**
 * Description : user.spec.ts - 📌 사용자 로그인 기본 플로우 테스트
 * Author : Shiwoo Min
 * Date : 2025-09-26
 */
import { expect, test } from '@playwright/test';

test.describe('사용자 로그인 플로우', () => {
  test.beforeEach(async ({ page }) => {
    // TODO: 로그인 페이지 URL (환경 변수에서 가져오고 기본값 localhost)
    const baseUrl = process.env['WEB_BASE_URL'] ?? 'http://localhost:3000';
    await page.goto(`${baseUrl}/login`);

    // 페이지 제목 확인
    await expect(page.getByText('로그인')).toBeVisible();
  });

  test('소셜 로그인 버튼들이 표시되는지 확인', async ({ page }) => {
    await expect(page.getByRole('button', { name: '네이버로 로그인' })).toBeVisible();
    await expect(page.getByRole('button', { name: '카카오로 로그인' })).toBeVisible();
    await expect(page.getByRole('button', { name: '구글로 로그인' })).toBeVisible();
  });

  test('이메일/비밀번호 입력 필드와 로그인 버튼 확인', async ({ page }) => {
    await expect(page.getByPlaceholder('이메일을 입력하세요')).toBeVisible();
    await expect(page.getByPlaceholder('비밀번호를 입력하세요')).toBeVisible();
    await expect(page.getByRole('button', { name: '로그인' })).toBeVisible();
  });

  test('잘못된 자격 증명으로 로그인 시 오류 메시지 표시', async ({ page }) => {
    await page.fill('input[placeholder="이메일을 입력하세요"]', 'wrong@example.com');
    await page.fill('input[placeholder="비밀번호를 입력하세요"]', 'wrongpassword');
    await page.getByRole('button', { name: '로그인' }).click();

    // TODO: 백엔드 연동 시 오류 메시지 확인
    // 예: "이메일 또는 비밀번호가 잘못되었습니다."
    await expect(page.getByText(/잘못|오류|실패/)).toBeVisible();
  });

  test('회원가입 링크가 표시되는지 확인', async ({ page }) => {
    await expect(page.getByRole('link', { name: '회원가입' })).toBeVisible();
  });
});
