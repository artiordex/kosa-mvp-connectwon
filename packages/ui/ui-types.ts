/**
 * Description : ui-types.ts - 📌 ConnectWon UI 타입 정의
 * Author : Shiwoo Min
 * Date : 2025-09-16
 */
import type { ButtonHTMLAttributes, ComponentType, FormHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import type React from 'react';

/**
 * @description 네비게이션 메뉴 아이템 타입
 * @property href - 링크 경로
 * @property label - 표시 텍스트
 */
export type NavItem = { href: string; label: string };

/**
 * @description 다국어 지원을 위한 언어 정보 타입
 * @property code - 언어 코드 (예: 'ko', 'en')
 * @property name - 언어명 (예: '한국어', 'English')
 */
export type Language = { code: string; name: string };

/**
 * @description 공통 헤더 컴포넌트 Props 인터페이스
 * @property logo - 로고 영역 슬롯
 * @property nav - 상단 네비게이션 메뉴 항목 배열
 * @property activePath - 현재 활성 경로 (usePathname()로 주입)
 * @property showAuth - 로그인/회원가입 버튼 표시 여부
 * @property loginHref - 로그인 페이지 링크
 * @property signupHref - 회원가입 페이지 링크
 * @property authRight - 우측 사용자 메뉴 커스텀 슬롯
 * @property languages - 지원 언어 목록 (없으면 언어 드롭다운 숨김)
 * @property currentLanguage - 현재 선택된 언어 코드
 * @property onLanguageChange - 언어 변경 핸들러
 * @property className - 추가 CSS 클래스명
 * @property sticky - 헤더 고정(sticky) 적용 여부
 */
export type CommonHeaderProps = {
  logo?: ReactNode;
  nav?: NavItem[];
  activePath?: string;
  showAuth?: boolean;
  loginHref?: string;
  signupHref?: string;
  authRight?: ReactNode;
  languages?: Language[];
  currentLanguage?: string;
  onLanguageChange?: (code: string) => void;
  className?: string;
  sticky?: boolean;
};

/**
 * @description 히어로 캐러셀 슬라이드 데이터 타입
 * @property title - 메인 제목
 * @property highlight - 강조 텍스트
 * @property description - 설명 텍스트
 * @property image - 배경 이미지 경로
 * @property alt - 이미지 대체 텍스트
 */
export type HeroSlide = {
  title: string | React.ReactNode;
  highlight?: string | React.ReactNode;
  description?: string | React.ReactNode;
  image: string;
  alt?: string;
};

/**
 * @description 히어로 캐러셀 컴포넌트 Props 인터페이스
 * @property slides - 슬라이드 데이터 배열
 * @property interval - 자동 재생 간격 (밀리초)
 * @property autoPlay - 자동 재생 활성화 여부
 * @property align - 텍스트 정렬 방향
 * @property className - 추가 CSS 클래스명
 * @property showIndicators - 인디케이터 표시 여부
 * @property showArrows - 화살표 네비게이션 표시 여부
 * @property renderCtas - CTA 버튼 렌더링 함수
 * @property onSlideChange - 슬라이드 변경 콜백
 * @property contentPaddingClass - 콘텐츠 패딩 클래스
 * @property maxWidthClass - 최대 너비 클래스
 */
export type HeroCarouselProps = {
  slides: HeroSlide[];
  interval?: number;
  autoPlay?: boolean;
  align?: 'left' | 'center';
  className?: string;
  showIndicators?: boolean;
  showArrows?: boolean;
  renderCtas?: (index: number) => React.ReactNode;
  onSlideChange?: (index: number) => void;
  contentPaddingClass?: string;
  maxWidthClass?: string;
};

/**
 * @description 애플리케이션 레이아웃 Shell 컴포넌트 Props 인터페이스
 * @property children - 자식 컴포넌트
 * @property variant - 레이아웃 변형 타입 (default: 일반, admin: 관리자, auth: 인증, minimal: 미니멀)
 * @property showHeader - 헤더 표시 여부
 * @property showFooter - 푸터 표시 여부
 * @property showSidebar - 사이드바 표시 여부
 * @property className - 추가 CSS 클래스명
 * @property headerSlot - 헤더 커스텀 슬롯
 * @property sidebarSlot - 사이드바 커스텀 슬롯
 * @property footerSlot - 푸터 커스텀 슬롯
 */
export interface AppShellProps {
  children: ReactNode;
  variant?: 'default' | 'admin' | 'auth' | 'minimal';
  showHeader?: boolean;
  showFooter?: boolean;
  showSidebar?: boolean;
  className?: string;
  headerSlot?: ReactNode;
  sidebarSlot?: ReactNode;
  footerSlot?: ReactNode;
}

/**
 * @description AppShell 컴포넌트의 레이아웃 변형 타입
 */
export type AppShellVariant = 'default' | 'admin' | 'auth' | 'minimal';

/**
 * @description 레이아웃 스타일 설정 인터페이스
 * @property container - 컨테이너 영역 스타일 클래스
 * @property header - 헤더 영역 스타일 클래스
 * @property sidebar - 사이드바 영역 스타일 클래스
 * @property main - 메인 콘텐츠 영역 스타일 클래스
 * @property footer - 푸터 영역 스타일 클래스
 */
export interface LayoutStyleConfig {
  container: string;
  header: string;
  sidebar: string;
  main: string;
  footer: string;
}

/**
 * @description 퀵 메뉴 아이템 인터페이스
 * @property id - 고유 식별자
 * @property icon - 아이콘 (RemixIcon 클래스명 또는 React 노드)
 * @property label - 라벨 텍스트
 * @property onClick - 클릭 핸들러
 * @property href - 링크 URL (선택사항)
 * @property target - 새 탭에서 열기 여부
 */
export interface QuickMenuItem {
  id: string;
  icon: string | React.ReactNode;
  label: string;
  onClick: () => void;
  href?: string;
  target?: '_blank' | '_self';
}

/**
 * @description 퀵 메뉴 컴포넌트 Props 인터페이스
 * @property items - 메뉴 아이템 목록
 * @property position - 메뉴 위치 설정
 * @property showScrollToTop - 맨 위로 버튼 표시 여부
 * @property scrollThreshold - 스크롤 최소 거리 (맨 위로 버튼 표시 기준)
 * @property className - 커스텀 클래스명
 * @property buttonColor - QUICK 버튼 배경색
 * @property enableAnimation - 애니메이션 활성화 여부
 * @property isClient - 클라이언트 사이드 렌더링 여부 (Next.js 등)
 */
export interface QuickMenuProps {
  items?: QuickMenuItem[];
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  showScrollToTop?: boolean;
  scrollThreshold?: number;
  className?: string;
  buttonColor?: string;
  enableAnimation?: boolean;
  isClient?: boolean;
}

/**
 * @description 푸터 링크 데이터 타입
 * @property label - 링크 텍스트
 * @property href - 링크 URL
 * @property external - 외부 링크 여부 (true시 target="_blank" + rel 적용)
 */
export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

/**
 * @description 푸터 컬럼 데이터 타입
 * @property title - 컬럼 제목
 * @property links - 컬럼 내 링크 목록
 */
export type FooterColumn = {
  title: string;
  links: FooterLink[];
};

/**
 * @description 소셜 미디어 링크 데이터 타입
 * @property label - aria-label용 텍스트 (예: "Instagram")
 * @property href - 링크 URL
 * @property icon - 아이콘 React 노드 (예: <i className="ri-instagram-fill" />)
 * @property external - 외부 링크 여부
 */
export type SocialLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
  external?: boolean;
};

/**
 * @description 브랜드 블록 데이터 타입
 * @property name - 브랜드 텍스트 (선택사항)
 * @property logo - 로고 React 노드 (예: <img/> or <Logo/>)
 * @property description - 브랜드 소개 텍스트
 */
export type BrandBlock = {
  name?: string;
  logo?: React.ReactNode;
  description?: React.ReactNode;
};

/**
 * @description 푸터 컴포넌트 Props 인터페이스
 * @property brand - 브랜드 블록 데이터
 * @property columns - 우측 컬럼 데이터 배열
 * @property social - 소셜 미디어 링크 배열 (브랜드 블록 하단 표시)
 * @property legal - 하단 우측 법적 링크 배열 (약관/개인정보 등)
 * @property year - 저작권 연도 (기본: 현재 연도)
 * @property className - <footer> 태그 커스터마이즈 클래스
 * @property containerClassName - 내부 컨테이너 커스텀 클래스
 * @property bottomRightSlot - 하단 우측 추가 배지/문구 슬롯
 */
export type FooterProps = {
  brand?: BrandBlock;
  columns?: FooterColumn[];
  social?: SocialLink[];
  legal?: FooterLink[];
  year?: number;
  className?: string;
  containerClassName?: string;
  bottomRightSlot?: React.ReactNode;
};

/**
 * @description 사이드바 네비게이션 아이템 타입
 * @property href - 링크 경로
 * @property label - 표시 텍스트
 * @property icon - 아이콘 ('ri-...' 클래스명 또는 React 노드)
 * @property exact - 경로 매칭 방식 (true: 완전일치, false: startsWith)
 */
export type SidebarItem = {
  href: string;
  label: string;
  icon?: ReactNode | string;
  exact?: boolean;
};

/**
 * @description 사이드바 네비게이션 컴포넌트 Props 인터페이스
 * @property items - 네비게이션 메뉴 아이템 배열
 * @property extraItems - 구분선 아래 추가 메뉴 배열 (설정/도움말 등)
 * @property isCollapsed - 사이드바 접힘 여부
 * @property currentPath - 현재 경로 (앱에서 주입)
 * @property className - 추가 CSS 클래스명
 * @property topOffsetClass - 상단 오프셋 클래스 (예: 'top-20')
 * @property heightClass - 높이 클래스 (예: 'h-[calc(100vh-5rem)]')
 * @property LinkComponent - 커스텀 링크 컴포넌트 (Next Link 등)
 * @property onNavigate - LinkComponent 없을 때 대체 네비게이션 핸들러
 */
export type SidebarNavProps = {
  items: SidebarItem[];
  extraItems?: SidebarItem[];
  isCollapsed?: boolean;
  currentPath: string;
  className?: string;
  topOffsetClass?: string;
  heightClass?: string;
  LinkComponent?: ComponentType<{ href: string; className?: string; children: ReactNode }>;
  onNavigate?: (href: string) => void;
};

/**
 * @description 빈 상태 컴포넌트 Props 인터페이스
 * @property icon - 표시할 아이콘
 * @property title - 제목 텍스트
 * @property description - 설명 텍스트
 * @property action - 액션 버튼 설정
 * @property className - 추가 CSS 클래스명
 */
export interface EmptyStateProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

/**
 * @description 에러 페이지 컴포넌트 Props 인터페이스
 * @property type - 에러 타입 (HTTP 상태 코드)
 * @property title - 커스텀 제목
 * @property description - 커스텀 설명
 * @property error - Error 객체
 * @property onRetry - 재시도 핸들러
 * @property onHome - 홈으로 이동 핸들러
 * @property className - 추가 CSS 클래스명
 */
export interface ErrorPageProps {
  type?: '404' | '403' | '405' | '400' | '500';
  title?: string;
  description?: string;
  error?: Error;
  onRetry?: () => void;
  onHome?: () => void;
  className?: string;
}

/**
 * @description 차트 X축 값 타입 (문자열 또는 숫자)
 */
export type XValue = string | number;

/**
 * @description 16진수 색상 코드 타입
 */
export type ColorHex = string;

/**
 * @description 색상 속성을 포함하는 인터페이스
 * @property color - 16진수 색상 코드
 */
export interface WithColor {
  color?: ColorHex;
}

/**
 * @description 이름과 값을 가지는 데이터 포인트 인터페이스
 * @property name - 데이터 이름
 * @property value - 데이터 값
 * @property type - 데이터 유형 (양수/음수/합계)
 * @property color - 색상 (WithColor 상속)
 */
export interface NamedValue extends WithColor {
  name: string;
  value: number;
  type?: 'positive' | 'negative' | 'total';
}

/**
 * @description 값만 가지는 데이터 포인트 인터페이스
 * @property value - 데이터 값
 */
export interface ValueOnly {
  value: number;
  [key: string]: any;
}

/**
 * @description XY 좌표를 가지는 데이터 포인트 인터페이스
 * @property x - X축 값
 * @property y - Y축 값
 */
export interface XYPoint {
  x: XValue;
  y: number;
  [key: string]: any;
}

/**
 * @description 차트 공통 Props 기본 인터페이스
 * @property height - 차트 높이
 * @property className - 추가 CSS 클래스명
 * @property showTooltip - 툴팁 표시 여부
 */
export interface BaseChartProps {
  height?: number;
  className?: string;
  showTooltip?: boolean;
}

/**
 * @description 색상 팔레트 관련 Props 인터페이스
 * @property color - 단일 색상
 * @property colors - 색상 배열
 */
export interface PaletteProps {
  color?: ColorHex;
  colors?: ReadonlyArray<ColorHex>;
}

/**
 * @description 차트 그리드 옵션 인터페이스
 * @property showGrid - 그리드 라인 표시 여부
 */
export interface ChartGridProps {
  showGrid?: boolean;
}

/**
 * @description 차트 축 관련 Props 인터페이스
 * @property xKey - X축 데이터 키
 * @property yKey - Y축 데이터 키
 */
export interface AxisProps {
  xKey?: string;
  yKey?: string;
}

/**
 * @description XY 차트 공통 Props 인터페이스 (선, 면, 막대 차트용)
 * @template T - XYPoint를 확장한 데이터 타입
 * @property data - 차트 데이터 배열
 */
export interface XYChartProps<T extends XYPoint = XYPoint>
  extends BaseChartProps,
    PaletteProps,
    ChartGridProps,
    AxisProps {
  data: T[];
}

/**
 * @description 선 차트 Props 인터페이스
 * @template T - XYPoint를 확장한 데이터 타입
 * @property strokeWidth - 선 두께
 */
export interface LineChartProps<T extends XYPoint = XYPoint> extends XYChartProps<T> {
  strokeWidth?: number;
}

/**
 * @description 면 차트 Props 인터페이스
 * @template T - XYPoint를 확장한 데이터 타입
 * @property fillOpacity - 면 투명도
 * @property strokeWidth - 선 두께
 */
export interface AreaChartProps<T extends XYPoint = XYPoint> extends XYChartProps<T> {
  fillOpacity?: number;
  strokeWidth?: number;
}

/**
 * @description 막대 차트 Props 인터페이스
 * @template T - XYPoint를 확장한 데이터 타입
 * @property horizontal - 수평 막대 차트 여부
 */
export interface BarChartProps<T extends XYPoint = XYPoint> extends XYChartProps<T> {
  horizontal?: boolean;
}

/**
 * @description 파이/도넛 차트 공통 Props 인터페이스
 * @property data - NamedValue 타입의 데이터 배열
 * @property showLegend - 범례 표시 여부
 */
export interface PieLikeProps extends BaseChartProps, PaletteProps {
  data: NamedValue[];
  showLegend?: boolean;
}

/**
 * @description 파이 차트 Props 인터페이스
 * @property radius - 파이 반지름
 */
export interface PieChartProps extends PieLikeProps {
  radius?: number;
}

/**
 * @description 도넛 차트 Props 인터페이스
 * @property innerRadius - 내부 반지름
 * @property outerRadius - 외부 반지름
 * @property centerText - 중앙 텍스트
 */
export interface DonutChartProps extends PieLikeProps {
  innerRadius?: number;
  outerRadius?: number;
  centerText?: string;
}

/**
 * @description 값 표시 관련 Props 인터페이스
 * @property showValue - 단일 값 표시 여부
 * @property showValues - 복수 값 표시 여부
 * @property showPercentage - 백분율 표시 여부
 * @property unit - 값 단위
 */
export interface ValueDisplayProps {
  showValue?: boolean;
  showValues?: boolean;
  showPercentage?: boolean;
  unit?: string;
}

/**
 * @description 미터 차트 공통 Props 인터페이스
 * @property value - 현재 값
 * @property max - 최대값
 * @property min - 최소값
 * @property title - 차트 제목
 * @property color - 진행률 색상
 * @property backgroundColor - 배경 색상
 */
export interface MeterBaseProps extends BaseChartProps, ValueDisplayProps {
  value: number;
  max?: number;
  min?: number;
  title?: string;
  color?: ColorHex;
  backgroundColor?: ColorHex;
}

/**
 * @description 게이지 차트 Props 인터페이스
 */
export interface GaugeChartProps extends MeterBaseProps {}

/**
 * @description 진행률 차트 Props 인터페이스
 * @property orientation - 진행률 표시 방향
 */
export interface ProgressChartProps extends MeterBaseProps {
  orientation?: 'horizontal' | 'vertical';
}

/**
 * @description 퍼널 차트 Props 인터페이스
 * @property data - NamedValue 타입의 데이터 배열
 * @property showLabels - 라벨 표시 여부
 */
export interface FunnelChartProps extends BaseChartProps, PaletteProps, ValueDisplayProps {
  data: NamedValue[];
  showLabels?: boolean;
}

/**
 * @description 스파크라인 차트 Props 인터페이스
 * @property data - ValueOnly 타입의 데이터 배열
 * @property width - 차트 너비
 * @property strokeWidth - 선 두께
 * @property showDots - 데이터 포인트 표시 여부
 * @property trend - 트렌드 방향
 */
export interface SparklineChartProps extends BaseChartProps, PaletteProps {
  data: ValueOnly[];
  width?: number;
  strokeWidth?: number;
  showDots?: boolean;
  trend?: 'up' | 'down' | 'neutral';
}

/**
 * @description 워터폴 차트 Props 인터페이스
 * @property data - 타입이 포함된 NamedValue 데이터 배열
 * @property positiveColor - 양수 값 색상
 * @property negativeColor - 음수 값 색상
 * @property totalColor - 합계 값 색상
 */
export interface WaterfallChartProps extends BaseChartProps, ValueDisplayProps {
  data: (NamedValue & { type?: 'positive' | 'negative' | 'total' })[];
  positiveColor?: ColorHex;
  negativeColor?: ColorHex;
  totalColor?: ColorHex;
}

/**
 * @description 기본 차트 색상 팔레트 (10색상)
 */
export const DEFAULT_COLORS = [
  '#3b82f6', // blue
  '#10b981', // green
  '#f59e0b', // yellow
  '#ef4444', // red
  '#8b5cf6', // purple
  '#06b6d4', // cyan
  '#f97316', // orange
  '#84cc16', // lime
  '#ec4899', // pink
  '#6b7280', // gray
] as const;

/**
 * @description 차트 높이 프리셋 상수
 */
export const CHART_HEIGHTS = {
  SMALL: 200,
  MEDIUM: 300,
  LARGE: 400,
  EXTRA_LARGE: 500,
} as const;

/**
 * @description 차트 높이 키 타입
 */
export type ChartHeightKey = keyof typeof CHART_HEIGHTS;

/**
 * @description 게이지/진행률 차트 색상 프리셋
 */
export const GAUGE_COLORS = {
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  DANGER: '#ef4444',
  PRIMARY: '#3b82f6',
} as const;

/**
 * @description XY 데이터 포인트 별칭 (하위 호환성)
 */
export type DataPoint = XYPoint;

/**
 * @description 파이 차트 데이터 포인트 별칭
 */
export type PieDataPoint = NamedValue;

/**
 * @description 퍼널 차트 데이터 포인트 별칭
 */
export type FunnelDataPoint = NamedValue;

/**
 * @description 워터폴 차트 데이터 포인트 별칭
 */
export type WaterfallDataPoint = NamedValue & { type?: 'positive' | 'negative' | 'total' };

/**
 * @description 스파크라인 차트 데이터 포인트 별칭
 */
export type SparklineDataPoint = ValueOnly;

/**
 * @description 크기 옵션 타입
 */
export type Size = 'sm' | 'md' | 'lg' | 'xl';

/**
 * @description 컴포넌트 크기 타입
 */
export type ComponentSize = 'default' | 'sm' | 'lg';

/**
 * @description 컴포넌트 변형 타입
 */
export type Variant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';

/**
 * @description 입력 컴포넌트 변형 타입
 */
export type InputVariant = 'default' | 'error' | 'success';

/**
 * @description 버튼 컴포넌트 Props 인터페이스
 * @property variant - 버튼 스타일 변형
 * @property size - 버튼 크기
 * @property loading - 로딩 상태 표시 여부
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: ComponentSize | 'icon';
  loading?: boolean;
}

/**
 * @description 입력 컴포넌트 Props 인터페이스
 * @property variant - 입력 필드 스타일 변형
 * @property size - 입력 필드 크기
 * @property error - 에러 메시지
 * @property label - 라벨 텍스트
 * @property helperText - 도움말 텍스트
 */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: InputVariant;
  size?: ComponentSize;
  error?: string;
  label?: string;
  helperText?: string;
}

/**
 * @description 셀렉트 옵션 데이터 타입
 * @property value - 옵션 값
 * @property label - 옵션 표시 텍스트
 * @property disabled - 비활성화 여부
 */
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * @description 셀렉트 컴포넌트 Props 인터페이스
 * @property options - 옵션 목록
 * @property variant - 셀렉트 스타일 변형
 * @property size - 셀렉트 크기
 * @property error - 에러 메시지
 * @property label - 라벨 텍스트
 * @property helperText - 도움말 텍스트
 * @property placeholder - 플레이스홀더 텍스트
 */
export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options: SelectOption[];
  variant?: InputVariant;
  size?: ComponentSize;
  error?: string;
  label?: string;
  helperText?: string;
  placeholder?: string;
}

/**
 * @description 텍스트영역 컴포넌트 Props 인터페이스
 * @property variant - 텍스트영역 스타일 변형
 * @property resize - 리사이즈 옵션
 * @property error - 에러 메시지
 * @property label - 라벨 텍스트
 * @property helperText - 도움말 텍스트
 */
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: InputVariant;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  error?: string;
  label?: string;
  helperText?: string;
}

/**
 * @description 체크박스 컴포넌트 Props 인터페이스
 * @property size - 체크박스 크기
 * @property label - 라벨 텍스트
 * @property description - 설명 텍스트
 * @property error - 에러 메시지
 */
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: ComponentSize;
  label?: string;
  description?: string;
  error?: string;
}

/**
 * @description 라디오 옵션 데이터 타입
 * @property value - 옵션 값
 * @property label - 옵션 표시 텍스트
 * @property description - 옵션 설명 텍스트
 * @property disabled - 비활성화 여부
 */
export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

/**
 * @description 라디오 그룹 컴포넌트 Props 인터페이스
 * @property options - 라디오 옵션 목록
 * @property size - 라디오 버튼 크기
 * @property value - 현재 선택된 값
 * @property defaultValue - 기본 선택값
 * @property error - 에러 메시지
 * @property label - 라벨 텍스트
 * @property helperText - 도움말 텍스트
 * @property orientation - 레이아웃 방향
 * @property onValueChange - 값 변경 핸들러
 */
export interface RadioGroupProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  options: RadioOption[];
  size?: ComponentSize;
  value?: string;
  defaultValue?: string;
  error?: string;
  label?: string;
  helperText?: string;
  orientation?: 'horizontal' | 'vertical';
  onValueChange?: (value: string) => void;
}

/**
 * @description 카드 컴포넌트 Props 인터페이스
 */
export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * @description 카드 헤더 컴포넌트 Props 인터페이스
 */
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * @description 카드 제목 컴포넌트 Props 인터페이스
 */
export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

/**
 * @description 카드 설명 컴포넌트 Props 인터페이스
 */
export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

/**
 * @description 카드 콘텐츠 컴포넌트 Props 인터페이스
 */
export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * @description 카드 푸터 컴포넌트 Props 인터페이스
 */
export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * @description 모달 컴포넌트 Props 인터페이스
 * @property isOpen - 모달 열림 상태
 * @property onClose - 모달 닫기 핸들러
 * @property title - 모달 제목
 * @property size - 모달 크기
 * @property showCloseButton - 닫기 버튼 표시 여부
 * @property closeOnOverlay - 오버레이 클릭시 닫기 여부
 * @property closeOnEsc - ESC 키로 닫기 여부
 * @property children - 모달 콘텐츠
 */
export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: Size;
  showCloseButton?: boolean;
  closeOnOverlay?: boolean;
  closeOnEsc?: boolean;
  children: ReactNode;
}

/**
 * @description 드로어 컴포넌트 Props 인터페이스
 * @property isOpen - 드로어 열림 상태
 * @property onClose - 드로어 닫기 핸들러
 * @property title - 드로어 제목
 * @property side - 드로어 표시 위치
 * @property size - 드로어 크기
 * @property children - 드로어 콘텐츠
 * @property closeOnOverlay - 오버레이 클릭시 닫기 여부
 * @property closeOnEsc - ESC 키로 닫기 여부
 */
export interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  side?: 'left' | 'right';
  size?: Size;
  children: ReactNode;
  closeOnOverlay?: boolean;
  closeOnEsc?: boolean;
}

/**
 * @description 컨테이너 컴포넌트 Props 인터페이스
 * @property size - 컨테이너 최대 너비
 * @property padding - 내부 패딩 크기
 * @property centered - 중앙 정렬 여부
 */
export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  centered?: boolean;
}

/**
 * @description 그리드 레이아웃 컴포넌트 Props 인터페이스
 * @property cols - 그리드 컬럼 수
 * @property gap - 그리드 간격
 * @property responsive - 반응형 레이아웃 적용 여부
 */
export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  responsive?: boolean;
}

/**
 * @description 스택 레이아웃 컴포넌트 Props 인터페이스
 * @property direction - 플렉스 방향
 * @property spacing - 요소 간 간격
 * @property align - 교차축 정렬
 * @property justify - 주축 정렬
 * @property wrap - 요소 줄바꿈 허용 여부
 */
export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
}

/**
 * @description 구분선 컴포넌트 Props 인터페이스
 * @property orientation - 구분선 방향
 * @property variant - 구분선 스타일
 * @property spacing - 구분선 여백
 * @property label - 구분선 라벨 텍스트
 */
export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  spacing?: 'sm' | 'md' | 'lg';
  label?: string;
}

/**
 * @description 필드 컴포넌트 Props 인터페이스
 * @property label - 필드 라벨
 * @property error - 에러 메시지
 * @property helperText - 도움말 텍스트
 * @property required - 필수 입력 여부
 * @property children - 필드 내용
 */
export interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  children: ReactNode;
}

/**
 * @description 폼 컴포넌트 Props 인터페이스
 * @property loading - 폼 제출 로딩 상태
 * @property children - 폼 내용
 */
export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  loading?: boolean;
  children: ReactNode;
}

/**
 * @description 페이지 헤더 컴포넌트 Props 인터페이스
 * @property title - 페이지 제목
 * @property subtitle - 페이지 부제목
 * @property description - 페이지 설명
 * @property actions - 액션 버튼 영역
 * @property breadcrumbs - 브레드크럼 네비게이션
 */
export interface PageHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  description?: string;
  actions?: ReactNode;
  breadcrumbs?: ReactNode;
}

/**
 * @description 섹션 컴포넌트 Props 인터페이스
 * @property spacing - 섹션 여백
 * @property background - 배경 스타일
 * @property title - 섹션 제목
 * @property subtitle - 섹션 부제목
 * @property actions - 액션 버튼 영역
 * @property children - 섹션 내용
 */
export interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'transparent' | 'muted' | 'soft';
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}

/**
 * @description 툴바 컴포넌트 Props 인터페이스
 * @property size - 툴바 크기
 * @property variant - 툴바 스타일 변형
 * @property position - 툴바 위치
 * @property title - 툴바 제목
 * @property subtitle - 툴바 부제목
 * @property leftContent - 좌측 콘텐츠
 * @property rightContent - 우측 콘텐츠
 * @property centerContent - 중앙 콘텐츠
 */
export interface ToolbarProps extends HTMLAttributes<HTMLDivElement> {
  size?: ComponentSize;
  variant?: 'default' | 'muted' | 'transparent';
  position?: 'static' | 'sticky' | 'fixed';
  title?: string;
  subtitle?: string;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  centerContent?: ReactNode;
}

/**
 * @description 클릭 이벤트 핸들러 타입
 */
export type ClickHandler = () => void;

/**
 * @description 값 변경 이벤트 핸들러 타입
 * @template T - 값의 타입 (기본: string)
 */
export type ChangeHandler<T = string> = (value: T) => void;

/**
 * @description 폼 제출 이벤트 핸들러 타입
 * @template T - 폼 데이터 타입
 */
export type SubmitHandler<T = any> = (data: T) => void | Promise<void>;

/**
 * @description 로딩 상태를 포함하는 타입 헬퍼
 * @template T - 기본 타입
 * @property loading - 로딩 상태 여부
 */
export type WithLoading<T> = T & { loading?: boolean };

/**
 * @description 에러 상태를 포함하는 타입 헬퍼
 * @template T - 기본 타입
 * @property error - 에러 메시지
 */
export type WithError<T> = T & { error?: string };

/**
 * @description 클래스명을 포함하는 타입 헬퍼
 * @template T - 기본 타입
 * @property className - CSS 클래스명
 */
export type WithClassName<T> = T & { className?: string };

/**
 * @description 접근성 관련 Props 인터페이스
 * @property aria-label - 접근성 라벨
 * @property aria-labelledby - 라벨 참조 ID
 * @property aria-describedby - 설명 참조 ID
 * @property aria-expanded - 확장 상태
 * @property aria-hidden - 숨김 상태
 * @property aria-disabled - 비활성화 상태
 * @property role - ARIA 역할
 */
export interface AriaProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-hidden'?: boolean;
  'aria-disabled'?: boolean;
  role?: string;
}

/**
 * @description CSS 커스텀 프로퍼티를 포함하는 스타일 인터페이스
 */
export interface CSSCustomProperties extends React.CSSProperties {
  [key: `--${string}`]: string | number | undefined;
}

/**
 * @description 애니메이션 컴포넌트 기본 Props 인터페이스
 * @property className - CSS 클래스명
 * @property style - 커스텀 CSS 프로퍼티 포함 스타일
 */
export interface BaseAnimationProps {
  className?: string;
  style?: CSSCustomProperties;
}

/**
 * @description 로딩 스피너 컴포넌트 Props 인터페이스
 * @property size - 스피너 크기 (프리셋 또는 픽셀 값)
 * @property color - 스피너 색상
 * @property thickness - 스피너 두께
 */
export interface LoadingSpinnerProps extends BaseAnimationProps {
  size?: 'small' | 'medium' | 'large' | number;
  color?: string;
  thickness?: number;
}

/**
 * @description 전체 페이지 로딩 화면 Props 인터페이스
 * @property title - 로딩 화면 제목
 * @property description - 로딩 화면 설명
 * @property size - 로딩 스피너 크기
 * @property className - CSS 클래스명
 */
export interface LoadingPageProps {
  title?: string;
  description?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

/**
 * @description 펄스 로더 컴포넌트 Props 인터페이스
 * @property color - 펄스 색상
 * @property count - 펄스 개수
 */
export interface PulseLoaderProps extends BaseAnimationProps {
  color?: string;
  count?: number;
}

/**
 * @description 성공 체크 표시 컴포넌트 Props 인터페이스
 * @property size - 체크 표시 크기 (프리셋 또는 픽셀 값)
 * @property color - 체크 표시 색상
 * @property onAnimationEnd - 애니메이션 완료 콜백
 */
export interface SuccessCheckProps extends BaseAnimationProps {
  size?: 'small' | 'medium' | 'large' | number;
  color?: string;
  onAnimationEnd?: () => void;
}

/**
 * @description 실패 엑스 표시 컴포넌트 Props 인터페이스
 * @property size - 엑스 표시 크기 (프리셋 또는 픽셀 값)
 * @property color - 엑스 표시 색상
 * @property onAnimationEnd - 애니메이션 완료 콜백
 */
export interface ErrorCrossProps extends BaseAnimationProps {
  size?: 'small' | 'medium' | 'large' | number;
  color?: string;
  onAnimationEnd?: () => void;
}

/**
 * @description 스켈레톤 로더 컴포넌트 Props 인터페이스
 * @property width - 스켈레톤 너비
 * @property height - 스켈레톤 높이
 * @property variant - 스켈레톤 형태
 * @property lines - 텍스트 스켈레톤 라인 수
 */
export interface SkeletonLoaderProps extends BaseAnimationProps {
  width?: number | string;
  height?: number | string;
  variant?: 'text' | 'title' | 'avatar' | 'rectangular';
  lines?: number;
}

/**
 * @description 플로팅 알림 컴포넌트 Props 인터페이스
 * @property children - 알림 내용
 * @property type - 알림 타입
 * @property duration - 표시 지속 시간 (밀리초)
 * @property position - 알림 표시 위치
 * @property onClose - 닫기 콜백
 * @property autoClose - 자동 닫기 여부
 */
export interface FloatingNotificationProps extends BaseAnimationProps {
  children: React.ReactNode;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  onClose?: () => void;
  autoClose?: boolean;
}

/**
 * @description 애니메이션 리스트 컴포넌트 Props 인터페이스
 * @property children - 리스트 아이템들
 * @property stagger - 애니메이션 지연 시간 (밀리초)
 * @property direction - 애니메이션 방향
 */
export interface AnimatedListProps extends BaseAnimationProps {
  children: React.ReactNode | React.ReactNode[];
  stagger?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

/**
 * @description 진행률 표시줄 컴포넌트 Props 인터페이스
 * @property progress - 진행률 (0-100)
 * @property animated - 애니메이션 적용 여부
 * @property color - 진행률 색상
 * @property backgroundColor - 배경 색상
 * @property height - 표시줄 높이 (픽셀)
 * @property showLabel - 진행률 라벨 표시 여부
 */
export interface ProgressBarProps extends BaseAnimationProps {
  progress: number;
  animated?: boolean;
  color?: string;
  backgroundColor?: string;
  height?: number;
  showLabel?: boolean;
}

/**
 * @description 원형 진행률 표시기 컴포넌트 Props 인터페이스
 * @property progress - 진행률 (0-100)
 * @property size - 원형 진행률 크기 (픽셀)
 * @property strokeWidth - 진행률 링 두께
 * @property color - 진행률 색상
 * @property backgroundColor - 배경 색상
 * @property showLabel - 진행률 라벨 표시 여부
 */
export interface CircularProgressProps extends BaseAnimationProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  showLabel?: boolean;
}

/**
 * @description 타이핑 표시기 컴포넌트 Props 인터페이스
 * @property dotColor - 점 색상
 * @property dotCount - 점 개수
 */
export interface TypingIndicatorProps extends BaseAnimationProps {
  dotColor?: string;
  dotCount?: number;
}

/**
 * @description 애니메이션 모달 컴포넌트 Props 인터페이스
 * @property isOpen - 모달 열림 상태
 * @property onClose - 모달 닫기 핸들러
 * @property children - 모달 내용
 * @property closeOnBackdrop - 배경 클릭시 닫기 여부
 * @property closeOnEscape - ESC 키로 닫기 여부
 */
export interface AnimationModalProps extends BaseAnimationProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
}

/**
 * @description 페이드 애니메이션 컴포넌트 Props 인터페이스
 * @property children - 애니메이션 적용 대상
 * @property direction - 페이드 방향
 * @property delay - 애니메이션 지연 시간 (밀리초)
 * @property duration - 애니메이션 지속 시간 (밀리초)
 * @property trigger - 애니메이션 트리거 상태
 */
export interface FadeProps extends BaseAnimationProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  trigger?: boolean;
}

/**
 * @description 하트비트 애니메이션 컴포넌트 Props 인터페이스
 * @property children - 애니메이션 적용 대상
 * @property fast - 빠른 하트비트 여부
 * @property active - 애니메이션 활성화 여부
 */
export interface HeartbeatProps extends BaseAnimationProps {
  children: React.ReactNode;
  fast?: boolean;
  active?: boolean;
}

/**
 * @description 범용 함수 타입 (임의 매개변수, 임의 반환값)
 */
export type AnyFn = (...args: any[]) => any;

/**
 * @description SSR/브라우저 혼용 환경에서 이벤트 타깃을 느슨하게 표현하는 타입
 */
export type TargetLike =
  | Window
  | Document
  | HTMLElement
  | EventTarget
  | MediaQueryList
  | null
  | undefined;

/**
 * @description React ref 객체 또는 실제 HTML 요소 타입
 * @template T - HTML 요소 타입 (기본: HTMLElement)
 */
export type MaybeRef<T extends HTMLElement = HTMLElement> =
  | import('react').RefObject<T>
  | T
  | null
  | undefined;

/**
 * @description useBoolean 훅의 액션 메서드들
 * @property set - 불린 값 직접 설정
 * @property on - true로 설정
 * @property off - false로 설정
 * @property toggle - 값 토글
 */
export type UseBooleanActions = {
  set: (v: boolean) => void;
  on: () => void;
  off: () => void;
  toggle: () => void;
};

/**
 * @description useDisclosure 훅 옵션 인터페이스
 * @property defaultOpen - 기본 열림 상태
 * @property onOpenChange - 열림 상태 변경 콜백
 */
export interface UseDisclosureOptions {
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/**
 * @description useThrottle 훅 옵션 인터페이스
 * @property leading - 첫 번째 호출 즉시 실행 여부
 * @property trailing - 마지막 호출 후 지연 실행 여부
 */
export interface ThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

/**
 * @description 디바운스된 콜백 함수 타입
 * @template T - 원본 함수 타입
 */
export type DebouncedCallback<T extends AnyFn> = (...args: Parameters<T>) => void;

/**
 * @description 스로틀된 콜백 함수 타입
 * @template T - 원본 함수 타입
 */
export type ThrottledCallback<T extends AnyFn> = (...args: Parameters<T>) => void;
