/**
 * Description : ui-types.ts - 📌 ConnectWon UI 타입 정의
 * Author : Shiwoo Min
 * Date : 2025-09-16
 */
import type { ButtonHTMLAttributes, FormHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import type React from 'react';





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
