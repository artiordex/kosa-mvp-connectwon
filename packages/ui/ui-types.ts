/**
 * Description : ui-types.ts - 📌 ConnectWon UI 타입 정의
 * Author : Shiwoo Min
 * Date : 2025-09-16
 */
import type { ButtonHTMLAttributes, FormHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes, ComponentType } from 'react';
import type React from 'react';

export type NavItem = { href: string; label: string };

export type Language = { code: string; name: string };

// 공통 헤더 Props
export type CommonHeaderProps = {
  // 로고 슬롯
  logo?: ReactNode;

  // 상단 네비 항목
  nav?: NavItem[];

  // 현재 경로(활성 메뉴 표시용). 앱에서 usePathname()로 받아 주입
  activePath?: string;

  // 로그인/회원가입 버튼 노출 여부
  showAuth?: boolean;
  loginHref?: string;
  signupHref?: string;
  authRight?: ReactNode; // 우측 사용자 메뉴 등 커스텀 슬롯

  // 언어 드롭다운(없으면 숨김)
  languages?: Language[];
  currentLanguage?: string; // code
  onLanguageChange?: (code: string) => void;

  // 레이아웃/스타일 커스터마이즈용
  className?: string;

  // 헤더를 sticky 로 고정할지
  sticky?: boolean;
};

// 히어로 캐러셀 Props
export type HeroSlide = {
  title: string | React.ReactNode;
  highlight?: string | React.ReactNode;
  description?: string | React.ReactNode;
  image: string;
  alt?: string;
};

export type HeroCarouselProps = {
  slides: HeroSlide[];
  interval?: number;
  autoPlay?: boolean;
  align?: 'left' | 'center';
  className?: string;
  /** 인디케이터/화살표 표시 여부 */
  showIndicators?: boolean;
  showArrows?: boolean;
  /** 글로벌 CTA(또는 슬라이드별 렌더러) */
  renderCtas?: (index: number) => React.ReactNode;
  /** 전환 콜백 */
  onSlideChange?: (index: number) => void;
  /** 높이/여백 커스터마이즈 */
  contentPaddingClass?: string;    // 기본: py-20 lg:py-32
  maxWidthClass?: string;          // 기본: max-w-7xl
};

// AppShell Props
export interface AppShellProps {
  children: ReactNode;
  /**
   * 레이아웃 변형 타입
   * - default: 일반 웹사이트 (사이드바 없음)
   * - admin: 관리자 패널 (사이드바 있음)
   * - auth: 인증 페이지 (중앙 정렬)
   * - minimal: 미니멀 레이아웃
   */
  variant?: 'default' | 'admin' | 'auth' | 'minimal';
  showHeader?: boolean;
  showFooter?: boolean;
  showSidebar?: boolean;
  className?: string;
  headerSlot?: ReactNode;
  sidebarSlot?: ReactNode;
  footerSlot?: ReactNode;
}

// AppShell variant 타입
export type AppShellVariant = 'default' | 'admin' | 'auth' | 'minimal';

// 레이아웃 스타일 설정
export interface LayoutStyleConfig {
  container: string;
  header: string;
  sidebar: string;
  main: string;
  footer: string;
}

export interface QuickMenuItem {
  /** 고유 식별자 */
  id: string;
  /** 아이콘 (RemixIcon 클래스명 또는 React 노드) */
  icon: string | React.ReactNode;
  /** 라벨 텍스트 */
  label: string;
  /** 클릭 핸들러 */
  onClick: () => void;
  /** 링크 URL (선택사항) */
  href?: string;
  /** 새 탭에서 열기 여부 */
  target?: '_blank' | '_self';
}

export interface QuickMenuProps {
  /** 메뉴 아이템 목록 */
  items?: QuickMenuItem[];
  /** 위치 설정 */
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  /** 맨 위로 버튼 표시 여부 */
  showScrollToTop?: boolean;
  /** 스크롤 최소 거리 (맨 위로 버튼이 나타날 스크롤 위치) */
  scrollThreshold?: number;
  /** 커스텀 클래스명 */
  className?: string;
  /** QUICK 버튼 배경색 */
  buttonColor?: string;
  /** 애니메이션 활성화 여부 */
  enableAnimation?: boolean;
  /** 클라이언트 사이드 렌더링 여부 (Next.js 등) */
  isClient?: boolean;
}

export type FooterLink = {
  label: string;
  href: string;
  external?: boolean; // 외부 링크면 true -> target/_blank + rel
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
};

export type SocialLink = {
  label: string; // aria-label 용 (예: "Instagram")
  href: string;
  icon?: React.ReactNode; // <i className="ri-instagram-fill" /> 같은 노드
  external?: boolean;
};

export type BrandBlock = {
  name?: string; // 브랜드 텍스트(선택)
  logo?: React.ReactNode; // <img/> or <Logo/>
  description?: React.ReactNode; // 한 줄/두 줄 소개
};

export type FooterProps = {
  brand?: BrandBlock;
  columns?: FooterColumn[]; // 오른쪽 컬럼들
  social?: SocialLink[]; // 브랜드 블록 하단 소셜
  legal?: FooterLink[]; // 하단 우측: 약관/개인정보 등
  year?: number; // 기본: this year
  className?: string; // <footer> 커스터마이즈
  containerClassName?: string; // 내부 컨테이너 커스텀
  bottomRightSlot?: React.ReactNode; // 하단 우측 추가 배지/문구
};


export type SidebarItem = {
  href: string;
  label: string;
  icon?: ReactNode | string; // 'ri-...' or <Icon/>
  exact?: boolean; // true면 완전일치, 아니면 startsWith
};

export type SidebarNavProps = {
  items: SidebarItem[];
  extraItems?: SidebarItem[]; // 구분선 아래 추가 메뉴(설정/도움말 등)
  isCollapsed?: boolean; // 접힘 여부
  currentPath: string; // 현재 경로(앱에서 주입)
  className?: string;

  // 위치/크기 커스터마이즈 (기본: 헤더 높이 5rem 가정)
  topOffsetClass?: string; // ex) 'top-20'
  heightClass?: string; // ex) 'h-[calc(100vh-5rem)]'

  // 링크를 어떻게 렌더링할지 주입(Next Link 등)
  LinkComponent?: ComponentType<{ href: string; className?: string; children: ReactNode }>;

  // LinkComponent가 없을 때 대체 네비게이션(기본: location.href)
  onNavigate?: (href: string) => void;
};

// 빈 상태 Props
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

// 에러 페이지 Props
export interface ErrorPageProps {
  type?: '404' | '403' | '405' | '400' | '500';
  title?: string;
  description?: string;
  error?: Error;
  onRetry?: () => void;
  onHome?: () => void;
  className?: string;
}

// 차트 관련 타입
export type XValue = string | number;
export type ColorHex = string;

// 색상 포함 인터페이스
export interface WithColor {
  color?: ColorHex;
}

// 이름 값 인터페이스
export interface NamedValue extends WithColor {
  name: string;
  value: number;
  type?: 'positive' | 'negative' | 'total';
}

// 값만 가지는 포인트
export interface ValueOnly {
  value: number;
  [key: string]: any;
}

// XY 포인트
export interface XYPoint {
  x: XValue;
  y: number;
  [key: string]: any;
}

// 차트 공통 Props
export interface BaseChartProps {
  height?: number;
  className?: string;
  showTooltip?: boolean;
}

// 색상 관련 Props
export interface PaletteProps {
  color?: ColorHex;
  colors?: ReadonlyArray<ColorHex>;
}

// 차트 전용 Grid 옵션
export interface ChartGridProps {
  showGrid?: boolean;
}

// 축 관련 Props
export interface AxisProps {
  xKey?: string;
  yKey?: string;
}

// XY 차트 공통 (선, 면, 막대)
export interface XYChartProps<T extends XYPoint = XYPoint>
  extends BaseChartProps,
    PaletteProps,
    ChartGridProps,
    AxisProps {
  data: T[];
}

// 선 차트
export interface LineChartProps<T extends XYPoint = XYPoint> extends XYChartProps<T> {
  strokeWidth?: number;
}

// 면 차트
export interface AreaChartProps<T extends XYPoint = XYPoint> extends XYChartProps<T> {
  fillOpacity?: number;
  strokeWidth?: number;
}

// 막대 차트
export interface BarChartProps<T extends XYPoint = XYPoint> extends XYChartProps<T> {
  horizontal?: boolean;
}

// 파이/도넛 공통
export interface PieLikeProps extends BaseChartProps, PaletteProps {
  data: NamedValue[];
  showLegend?: boolean;
}

// 파이 차트
export interface PieChartProps extends PieLikeProps {
  radius?: number;
}

// 도넛 차트
export interface DonutChartProps extends PieLikeProps {
  innerRadius?: number;
  outerRadius?: number;
  centerText?: string;
}

// 값 표시 관련 Props
export interface ValueDisplayProps {
  showValue?: boolean;
  showValues?: boolean;
  showPercentage?: boolean;
  unit?: string;
}

// 미터 차트 공통
export interface MeterBaseProps extends BaseChartProps, ValueDisplayProps {
  value: number;
  max?: number;
  min?: number;
  title?: string;
  color?: ColorHex;
  backgroundColor?: ColorHex;
}

// 게이지 차트
export interface GaugeChartProps extends MeterBaseProps {}

// 진행률 차트
export interface ProgressChartProps extends MeterBaseProps {
  orientation?: 'horizontal' | 'vertical';
}

// 퍼널 차트
export interface FunnelChartProps extends BaseChartProps, PaletteProps, ValueDisplayProps {
  data: NamedValue[];
  showLabels?: boolean;
}

// 스파크라인 차트
export interface SparklineChartProps extends BaseChartProps, PaletteProps {
  data: ValueOnly[];
  width?: number;
  strokeWidth?: number;
  showDots?: boolean;
  trend?: 'up' | 'down' | 'neutral';
}

// 워터폴 차트
export interface WaterfallChartProps extends BaseChartProps, ValueDisplayProps {
  data: (NamedValue & { type?: 'positive' | 'negative' | 'total' })[];
  positiveColor?: ColorHex;
  negativeColor?: ColorHex;
  totalColor?: ColorHex;
}

// 기본 색상 팔레트 (차트)
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

// 차트 높이 옵션
export const CHART_HEIGHTS = {
  SMALL: 200,
  MEDIUM: 300,
  LARGE: 400,
  EXTRA_LARGE: 500,
} as const;
export type ChartHeightKey = keyof typeof CHART_HEIGHTS;

// 게이지/진행률 차트 색상 옵션
export const GAUGE_COLORS = {
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  DANGER: '#ef4444',
  PRIMARY: '#3b82f6',
} as const;

// 기존 DataPoint 계열
export type DataPoint = XYPoint;
export type PieDataPoint = NamedValue;
export type FunnelDataPoint = NamedValue;
export type WaterfallDataPoint = NamedValue & { type?: 'positive' | 'negative' | 'total' };
export type SparklineDataPoint = ValueOnly;

export type Size = 'sm' | 'md' | 'lg' | 'xl';
export type ComponentSize = 'default' | 'sm' | 'lg';
export type Variant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
export type InputVariant = 'default' | 'error' | 'success';

// Button
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: ComponentSize | 'icon';
  loading?: boolean;
}

// Input
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: InputVariant;
  size?: ComponentSize;
  error?: string;
  label?: string;
  helperText?: string;
}

// Select
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options: SelectOption[];
  variant?: InputVariant;
  size?: ComponentSize;
  error?: string;
  label?: string;
  helperText?: string;
  placeholder?: string;
}

// Textarea
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: InputVariant;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  error?: string;
  label?: string;
  helperText?: string;
}

// Checkbox
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: ComponentSize;
  label?: string;
  description?: string;
  error?: string;
}

// RadioGroup
export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

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

// Card
export interface CardProps extends HTMLAttributes<HTMLDivElement> {}
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}
export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}
export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}
export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}
export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

// Modal
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

// Drawer
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

// Container
export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  centered?: boolean;
}

// Grid (레이아웃)
export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  responsive?: boolean;
}

// Stack
export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
}

// Divider
export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  spacing?: 'sm' | 'md' | 'lg';
  label?: string;
}

// Field
export interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  children: ReactNode;
}

// Form
export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  loading?: boolean;
  children: ReactNode;
}

// PageHeader
export interface PageHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  description?: string;
  actions?: ReactNode;
  breadcrumbs?: ReactNode;
}

// Section
export interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'transparent' | 'muted' | 'soft';
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}

// Toolbar
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

// 이벤트 핸들러 & 유틸
export type ClickHandler = () => void;
export type ChangeHandler<T = string> = (value: T) => void;
export type SubmitHandler<T = any> = (data: T) => void | Promise<void>;

export type WithLoading<T> = T & { loading?: boolean };
export type WithError<T> = T & { error?: string };
export type WithClassName<T> = T & { className?: string };

// 접근성
export interface AriaProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-hidden'?: boolean;
  'aria-disabled'?: boolean;
  role?: string;
}


// CSS 커스텀 프로퍼티 인터페이스
export interface CSSCustomProperties extends React.CSSProperties {
  [key: `--${string}`]: string | number | undefined;
}

// 애니메이션 컴포넌트 인터페이스
export interface BaseAnimationProps {
  className?: string;
  style?: CSSCustomProperties;
}

// 개별 애니메이션 컴포넌트 인터페이스
export interface LoadingSpinnerProps extends BaseAnimationProps {
  size?: 'small' | 'medium' | 'large' | number;
  color?: string;
  thickness?: number;
}

// 전체 페이지 로딩 화면 인터페이스
export interface LoadingPageProps {
  title?: string;
  description?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

// 스피너 로더 인터페이스
export interface PulseLoaderProps extends BaseAnimationProps {
  color?: string;
  count?: number;
}

// 성공 체크 표시 인터페이스
export interface SuccessCheckProps extends BaseAnimationProps {
  size?: 'small' | 'medium' | 'large' | number;
  color?: string;
  onAnimationEnd?: () => void;
}

// 실패 엑스 표시 인터페이스
export interface ErrorCrossProps extends BaseAnimationProps {
  size?: 'small' | 'medium' | 'large' | number;
  color?: string;
  onAnimationEnd?: () => void;
}

// 스켈레톤 로더 인터페이스
export interface SkeletonLoaderProps extends BaseAnimationProps {
  width?: number | string;
  height?: number | string;
  variant?: 'text' | 'title' | 'avatar' | 'rectangular';
  lines?: number;
}

// 플로팅 알림 인터페이스
export interface FloatingNotificationProps extends BaseAnimationProps {
  children: React.ReactNode;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  onClose?: () => void;
  autoClose?: boolean;
}

// 애니메이션 리스트 인터페이스
export interface AnimatedListProps extends BaseAnimationProps {
  children: React.ReactNode | React.ReactNode[];
  stagger?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

// 진행률 표시줄 인터페이스
export interface ProgressBarProps extends BaseAnimationProps {
  progress: number;
  animated?: boolean;
  color?: string;
  backgroundColor?: string;
  height?: number;
  showLabel?: boolean;
}

// 원형 진행률 표시기 인터페이스
export interface CircularProgressProps extends BaseAnimationProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  showLabel?: boolean;
}

// 타이핑 표시기 인터페이스
export interface TypingIndicatorProps extends BaseAnimationProps {
  dotColor?: string;
  dotCount?: number;
}

// 애니메이션 모달 인터페이스
export interface AnimationModalProps extends BaseAnimationProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
}

// 페이드 애니메이션 인터페이스
export interface FadeProps extends BaseAnimationProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  trigger?: boolean;
}

// 하트비트 애니메이션 인터페이스
export interface HeartbeatProps extends BaseAnimationProps {
  children: React.ReactNode;
  fast?: boolean;
  active?: boolean;
}

// 범용 함수 타입
export type AnyFn = (...args: any[]) => any;

// SSR/브라우저 혼용 환경에서 타깃을 느슨하게 표현
export type TargetLike =
  | Window
  | Document
  | HTMLElement
  | EventTarget
  | MediaQueryList
  | null
  | undefined;

// ref 객체 또는 실제 노드
export type MaybeRef<T extends HTMLElement = HTMLElement> =
  | import('react').RefObject<T>
  | T
  | null
  | undefined;

// useBoolean
export type UseBooleanActions = {
  set: (v: boolean) => void;
  on: () => void;
  off: () => void;
  toggle: () => void;
};

// useDisclosure
export interface UseDisclosureOptions {
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

// useThrottle
export interface ThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

// 콜백 유틸 타입 – 필요하면 사용
export type DebouncedCallback<T extends AnyFn> = (...args: Parameters<T>) => void;
export type ThrottledCallback<T extends AnyFn> = (...args: Parameters<T>) => void;
