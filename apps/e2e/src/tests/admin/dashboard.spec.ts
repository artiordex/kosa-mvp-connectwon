/**
 * Description : PlaywrightActions.ts - 📌 admin 대시보드 블랙박스 테스트
 * Author : Shiwoo Min
 * Date : 2025-09-26
 */
import { test } from '@playwright/test';
import { PlaywrightActions } from '../../actions/PlaywrightActions.js';

test.describe('Admin Dashboard Flow', () => {
  test('대시보드 접속 및 위젯 확인', async ({ page }) => {
    const actions = new PlaywrightActions(page);

    // TODO: 로그인 페이지로 이동
    await actions.goto('/admin/login');

    // TODO: 로그인 폼 입력
    await actions.fillByLabel('아이디', 'admin');
    await actions.fillByLabel('비밀번호', 'password');
    await actions.click(actions.role('button', '로그인'));

    // TODO: 로그인 성공 후 대시보드 URL 확인
    await actions.waitForUrl(/\/admin\/dashboard/);

    // TODO: 로딩 스피너 사라질 때까지 대기
    await actions.waitForSpinnerToDisappear();

    // TODO: 주요 통계 위젯이 보이는지 확인
    await actions.expectVisible(actions.dt('widget-total-users'));
    await actions.expectVisible(actions.dt('widget-total-reservations'));

    // TODO: 기간 필터 변경 후 데이터 갱신 확인
    await actions.click(actions.role('button', '이번 달'));
    await actions.waitForSpinnerToDisappear();
    await actions.expectContainsText(actions.dt('widget-total-users'), /\d+/);

    // TODO: 로그아웃 플로우 실행
    await actions.click(actions.role('button', '로그아웃'));
    await actions.waitForUrl(/\/login/);
  });
});
