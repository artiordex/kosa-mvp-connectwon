/**
 * Description : .cz-config.cjs - 📌 Commitizen 커밋 메시지 규칙 정의 파일
 * Author : Shiwoo Min
 * Date : 2025-09-05
 * 09-21 - 커밋 메시지 규칙 세분화
 * Note : ESM 프로젝트에서도 이 파일만 CommonJS(.cjs)를 사용
 *        (commitizen은 내부적으로 CommonJS 방식으로 구성되어 있어 ESM을 지원하지 않음)
 */

module.exports = {
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
    // Apps
    { name: 'apps/admin' },
    { name: 'apps/api' },
    { name: 'apps/web' },
    { name: 'apps/e2e' },
    { name: 'apps/worker' },
    // Packages
    { name: 'packages/api-contract' },
    { name: 'packages/configs' },
    { name: 'packages/core' },
    { name: 'packages/database' },
    { name: 'packages/logger' },
    { name: 'packages/server' },
    { name: 'packages/client' },
    { name: 'packages/sdk' },
    { name: 'packages/ui' },
    // Root or config 영역
    { name: 'root' },
    { name: 'config' },
  ],

  // 커스텀 범위 직접 입력 허용
  allowCustomScopes: true,

  // BREAKING CHANGES 메시지를 작성할 수 있는 타입
  allowBreakingChanges: ['feat', 'fix'],

  // 질문 스킵할 항목 (본문, footer는 생략 가능)
  skipQuestions: ['body', 'footer'],

  // subject 최대 길이 제한 (100자 권장)
  subjectLimit: 100,

  // 사용자에게 보여질 메시지 정의
  messages: {
    type: '변경유형 선택 (취소하려면 Ctrl+C):',
    scope: '변경 범위 선택 (취소하려면 Ctrl+C):',
    subject: '변경 메시지 작성 (취소하려면 Ctrl+C):',
    breaking: '중대한 변경사항(BREAKING CHANGES)이 있나요? (선택):',
    footer: '관련 이슈 번호 혹은 링크 (옵션):',
    confirmCommit: '이 커밋 메시지로 진행할까요?',
  },
};
