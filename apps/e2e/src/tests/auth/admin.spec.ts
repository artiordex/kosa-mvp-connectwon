/**
 * Description : admin.spec.ts - 📌 관리자 대시보드 기본 UI 동작 테스트
 * Author : Shiwoo Min
 * Date : 2025-09-26
 */
import { expect, test } from '@playwright/test';

test.describe('Admin Dashboard - 기본 작동 테스트', () => {
  test.beforeEach(async ({ page }) => {
    // TODO: 관리자 페이지 URL 환경변수 처리 (없으면 localhost 기본)
    const baseUrl = process.env['ADMIN_BASE_URL'] ?? 'http://localhost:3000/admin';

    // 1. 관리자 대시보드 접속
    await page.goto(baseUrl);

    // 2. 페이지 로드 및 타이틀 확인
    await expect(page).toHaveTitle(/관리자 대시보드/);
  });

  test('대시보드 주요 지표 카드가 표시되는지 확인', async ({ page }) => {
    // TODO: 지표 카드들이 정상 표시되는지 확인
    await expect(page.getByText('총 사용자')).toBeVisible();
    await expect(page.getByText('활성 예약')).toBeVisible();
    await expect(page.getByText('오늘 수익')).toBeVisible();
    await expect(page.getByText('시스템 상태')).toBeVisible();
    await expect(page.getByText('AI 처리 작업')).toBeVisible();
    await expect(page.getByText('승인 대기')).toBeVisible();
  });

  test('사이드바 메뉴 클릭 시 페이지 이동 확인', async ({ page }) => {
    // TODO: 프로그램 관리 메뉴 클릭
    await page.getByRole('link', { name: '프로그램 관리' }).click();
    await expect(page).toHaveURL(/.*program/);

    // TODO: 룸 관리 메뉴 클릭
    await page.getByRole('link', { name: '룸 관리' }).click();
    await expect(page).toHaveURL(/.*room/);

    // TODO: 예약 관리 메뉴 클릭
    await page.getByRole('link', { name: '예약 관리' }).click();
    await expect(page).toHaveURL(/.*reservation/);

    // TODO: 회원 관리 메뉴 클릭
    await page.getByRole('link', { name: '회원 관리' }).click();
    await expect(page).toHaveURL(/.*user/);
  });

  test('AI 분석 섹션이 표시되는지 확인', async ({ page }) => {
    // TODO: AI 감정 분석 차트 존재 확인
    await expect(page.getByText('AI 감정 분석')).toBeVisible();

    // TODO: AI 예측 분석 카드 존재 확인
    await expect(page.getByText('AI 예측 분석')).toBeVisible();
    await expect(page.getByText('다음 주 예상 예약')).toBeVisible();
  });
});
