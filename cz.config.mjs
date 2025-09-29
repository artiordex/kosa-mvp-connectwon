/**
 * Description : .cz-config.mjs - 📌 Commitizen 커밋 메시지 규칙 정의 (ESM 버전)
 * Author : Shiwoo Min
 * Date : 2025-09-05
 * Note : Commitizen은 기본적으로 CommonJS만 지원.
 *        Node 실행 환경에 따라 ESM이 동작하지 않을 수 있음.
 */

export default {
  // 커밋 타입 정의
  types: [
    { value: 'feat', name: 'feat: 새로운 기능 추가' },
    { value: 'fix', name: 'fix: 버그 수정' },
    { value: 'docs', name: 'docs: 문서 수정' },
    { value: 'style', name: 'style: 코드 포맷팅 (띄어쓰기, 세미콜론 등)' },
    { value: 'refactor', name: 'refactor: 코드 리팩토링 (기능 변경 없는 수정)' },
    { value: 'perf', name: 'perf: 성능 개선' },
    { value: 'test', name: 'test: 테스트 추가 및 수정' },
    { value: 'build', name: 'build: 빌드 관련 수정 및 외부 종속성 변경' },
    { value: 'ci', name: 'ci: CI 설정 및 워크플로 수정' },
    { value: 'chore', name: 'chore: 그 외 잡다한 변경사항 (코드 수정 아님)' },
    { value: 'revert', name: 'revert: 이전 커밋 되돌리기' },
  ],

  // 작업 범위(scope) 선택 항목
  scopes: [
    { name: 'apps/admin' },
    { name: 'apps/api' },
    { name: 'apps/web' },
    { name: 'apps/e2e' },
    { name: 'apps/worker' },
    { name: 'packages/api-contract' },
    { name: 'packages/core' },
    { name: 'packages/database' },
    { name: 'packages/logger' },
    { name: 'packages/server' },
    { name: 'packages/client' },
    { name: 'packages/sdk' },
    { name: 'packages/ui' },
    { name: 'root' },
    { name: 'config' },
  ],

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  skipQuestions: ['body', 'footer'],
  subjectLimit: 100,

  messages: {
    type: '변경유형 선택 (취소하려면 Ctrl+C):',
    scope: '변경 범위 선택 (취소하려면 Ctrl+C):',
    subject: '변경 메시지 작성 (취소하려면 Ctrl+C):',
    breaking: '중대한 변경사항(BREAKING CHANGES)이 있나요? (선택):',
    footer: '관련 이슈 번호 혹은 링크 (옵션):',
    confirmCommit: '이 커밋 메시지로 진행할까요?',
  },
};
