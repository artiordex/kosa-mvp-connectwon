/**
 * Description : locators.ts - 📌  화면 영역별 Locator를 한 파일에 섹션 단위로 정리
 * Author : Shiwoo Min
 * Date : 2025-09-07
 */

// ──────────────────────────────────
// 공통/레이아웃
// ──────────────────────────────────
export const common = {
  // 글로벌 로딩 스피너
  spinner: '[data-testid="loading"], .spinner',
  // 토스트/알림
  toast: '[role="alert"], [data-testid="toast"]',
  // 공통 모달 루트
  modalRoot: '[data-testid="modal-root"], .modal, [role="dialog"]',
  // 모달 확인/취소 버튼
  modalConfirm: '[data-testid="modal-confirm"], button:has-text("확인"), button:has-text("OK")',
  modalCancel: '[data-testid="modal-cancel"], button:has-text("취소"), button:has-text("Cancel")',
  // 오류 메시지/인풋 밑 에러
  errorText: '[data-testid="error-text"], .error, .c-error, [role="alert"]',
  // 공통 검색 인풋
  searchInput: '[data-testid="search-input"], input[type="search"], input[name="q"]',
  // 저장/다음/이전
  saveButton: '[data-testid="save-button"], button:has-text("저장"), button:has-text("Save")',
  nextButton: '[data-testid="next-button"], button:has-text("다음"), button:has-text("Next")',
  prevButton: '[data-testid="prev-button"], button:has-text("이전"), button:has-text("Prev")',
} as const;

// ──────────────────────────────────
export const nav = {
  // 헤더 로고
  logo: '[data-testid="header-logo"], header a[href="/"]',
  // 헤더 메뉴(예약/프로그램/마이페이지 등)
  menuReservations: '[data-testid="nav-reservations"], a[href*="/reservations"]',
  menuPrograms: '[data-testid="nav-programs"], a[href*="/programs"]',
  menuMy: '[data-testid="nav-my"], a[href*="/me"], a[href*="/mypage"]',
  // 프로필/내 정보 드롭다운
  myInfoIcon: '[data-testid="header-myinfo"], a.icon-myInfo-1',
  myInfoDropdown: '[data-testid="myinfo-dropdown"], .myInfo-list',
  // 로그인/로그아웃
  loginLink: '[data-testid="login-link"], a:has-text("로그인")',
  logoutLink: '[data-testid="logout-link"], a:has-text("로그아웃"), .loginList > li:nth-of-type(2) > a',
} as const;

// ──────────────────────────────────
export const auth = {
  // 로그인 페이지 타이틀
  loginTitle: '[data-testid="login-title"], h2:has-text("로그인")',
  // 구글 로그인 버튼 (커스텀 버튼 혹은 텍스트)
  googleButton:
    '[data-testid="social-google"], [data-provider="google"], button:has-text("Google"), button:has-text("Continue with Google")',
  // 기본 ID/PW (있을 때만 사용)
  idInput: '[data-testid="login-id"], input[type="email"], input[name="email"], input[name="id"]',
  pwInput: '[data-testid="login-password"], input[type="password"], input[name="password"], input[name="pw"]',
  submitButton:
    '[data-testid="login-submit"], button[type="submit"], button:has-text("로그인"), button:has-text("Sign in")',
  // 로그아웃 버튼
  logoutButton: '[data-testid="logout-button"], button:has-text("로그아웃")',
} as const;

// ──────────────────────────────────
export const venues = {
  // 지점 리스트/카드
  list: '[data-testid="venue-list"], [data-testid="venues"]',
  card: '[data-testid="venue-card"]',
  // 필터 (지역/인원/장비)
  filterRegion: '[data-testid="filter-region"], select[name="region"]',
  filterCapacity: '[data-testid="filter-capacity"], input[name="capacity"]',
  filterEquipment: '[data-testid="filter-equipment"]',
  // 상세 페이지
  detailTitle: '[data-testid="venue-title"], h1',
  roomsTab: '[data-testid="tab-rooms"], [role="tab"]:has-text("공간")',
  programsTab: '[data-testid="tab-programs"], [role="tab"]:has-text("프로그램")',
} as const;

// ──────────────────────────────────
export const rooms = {
  // 룸 카드/리스트
  list: '[data-testid="room-list"]',
  card: '[data-testid="room-card"]',
  // 룸 상세 정보
  name: '[data-testid="room-name"], h2',
  capacity: '[data-testid="room-capacity"]',
  // 예약 버튼
  reserveButton: '[data-testid="room-reserve-button"], button:has-text("예약")',
} as const;

// ──────────────────────────────────
export const calendar = {
  // FullCalendar 루트/헤더
  root: '[data-testid="calendar"], .fc',
  next: '[data-testid="cal-next"], .fc-next-button',
  prev: '[data-testid="cal-prev"], .fc-prev-button',
  today: '[data-testid="cal-today"], .fc-today-button',
  // 뷰 전환
  viewMonth: '[data-testid="cal-view-month"], button:has-text("월")',
  viewWeek: '[data-testid="cal-view-week"], button:has-text("주")',
  viewDay: '[data-testid="cal-view-day"], button:has-text("일")',
  // 타임 슬롯/이벤트
  slot: '[data-testid="cal-slot"], .fc-timegrid-slot',
  event: '[data-testid="cal-event"], .fc-event',
  // 예약 가능 표시
  available: '[data-testid="slot-available"], .is-available',
  selected: '[data-testid="slot-selected"], .is-selected',
} as const;

// ──────────────────────────────────
export const programs = {
  // 프로그램 목록/카드/검색
  list: '[data-testid="program-list"]',
  card: '[data-testid="program-card"]',
  searchInput: '[data-testid="program-search"], input[name="keyword"]',
  // 상세
  title: '[data-testid="program-title"], h1',
  sessionItem: '[data-testid="program-session"], .session-item',
  applyButton: '[data-testid="program-apply"], button:has-text("신청")',
} as const;

// ──────────────────────────────────
export const reservation = {
  // 예약 생성 플로우
  stepSelectRoom: '[data-testid="step-select-room"]',
  stepSelectTime: '[data-testid="step-select-time"]',
  stepConfirm: '[data-testid="step-confirm"]',
  // 입력 폼
  datePicker: '[data-testid="date-picker"], input[type="date"]',
  timeStart: '[data-testid="time-start"], input[name="start"]',
  timeEnd: '[data-testid="time-end"], input[name="end"]',
  attendeeCount: '[data-testid="attendee-count"], input[name="attendees"]',
  memo: '[data-testid="reserve-memo"], textarea[name="memo"]',
  // 액션 버튼
  next: '[data-testid="reserve-next"], button:has-text("다음")',
  back: '[data-testid="reserve-back"], button:has-text("이전")',
  submit: '[data-testid="reserve-submit"], button:has-text("예약 완료"), button:has-text("확정")',
  // 완료 페이지/모달
  successTitle: '[data-testid="reserve-success-title"], h2:has-text("예약 완료")',
  number: '[data-testid="reserve-number"]',
} as const;

// ──────────────────────────────────
export const payment = {
  // 결제 요약/금액
  summary: '[data-testid="payment-summary"]',
  amount: '[data-testid="payment-amount"], .amount',
  // 결제 수단
  methodCard: '[data-testid="pay-card"], input[value="card"]',
  methodTransfer: '[data-testid="pay-transfer"], input[value="transfer"]',
  // 약관 동의
  termsCheckbox: '[data-testid="terms"], input[name="terms"]',
  // 결제 버튼/결과
  payButton: '[data-testid="pay-button"], button:has-text("결제")',
  successTitle: '[data-testid="payment-success-title"], h2:has-text("결제 완료")',
  receiptLink: '[data-testid="receipt-link"], a:has-text("영수증")',
} as const;

// ──────────────────────────────────
export const mypage = {
  // 마이페이지 대시보드
  root: '[data-testid="mypage"]',
  // 예약 내역 테이블/카드
  reservationsTable: '[data-testid="my-reservations"], table',
  reservationRow: '[data-testid="my-reservation-row"], tr',
  reservationCancelButton:
    '[data-testid="my-reservation-cancel"], button:has-text("취소"), button:has-text("Cancel")',
  // 결제 내역
  paymentsTable: '[data-testid="my-payments"]',
} as const;

// ──────────────────────────────────
// 관리(향후 확장용, MVP에선 필요 없으면 삭제)
// ──────────────────────────────────
export const admin = {
  root: '[data-testid="admin"]',
  userTable: '[data-testid="admin-users"]',
  venueTable: '[data-testid="admin-venues"]',
  programTable: '[data-testid="admin-programs"]',
} as const;

// ──────────────────────────────────
// 통합 내보내기
// ──────────────────────────────────
export const Locators = {
  common,
  nav,
  auth,
  venues,
  rooms,
  calendar,
  programs,
  reservation,
  payment,
  mypage,
  admin,
} as const;

// 타입 유틸
export type LocatorSection = keyof typeof Locators;
export type SectionLocators<T extends LocatorSection> = typeof Locators[T];
