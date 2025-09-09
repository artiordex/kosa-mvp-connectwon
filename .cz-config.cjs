/**
 * Description : .cz-config.cjs - 📌 Commitizen 커밋 메시지 규칙 정의 파일
 * Author : Shiwoo Min
 * Date : 2025-09-05
 * ESM 프로젝트에서도 이 파일만 CommonJS(.cjs)를 사용
 * commitizen은 내부적으로 CommonJS 방식으로 구성되어 있어 ESM을 지원하지 않음
 */

module.exports = {
  // 커밋 타입 정의
  types: [
    { value: 'feat', name: 'feat: 새로운 기능 추가' },
    { value: 'fix', name: 'fix: 버그 수정' },
    { value: 'docs', name: 'docs: 문서 수정' },
    { value: 'style', name: 'style: 코드 포맷팅' },
    { value: 'refactor', name: 'refactor: 코드 리팩토링' },
    { value: 'test', name: 'test: 테스트 추가 및 수정' },
    { value: 'chore', name: 'chore: 기타 설정, 빌드 작업 등' },
  ],
  // 작업 범위(scope) 선택 항목
  scopes: [
    { name: 'e2e' },
    { name: 'app' },
    { name: 'api' },
    { name: 'web' },
    { name: 'admin' },
    { name: 'infra' },
    { name: 'packages' },
    { name: 'setting' },
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
    type: '변경유형 선택:',
    scope: '변경 범위 선택:',
    subject: '변경 메시지 작성:',
    breaking: 'BREAKING CHANGES (선택):',
    footer: '관련 이슈 링크 (옵션):',
    confirmCommit: '이 커밋 메시지로 진행할까요?',
  },
};
