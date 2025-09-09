/**
 * Description : ui-types.ts - 📌 ui 관련 타입 정의
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */

// 공통 Primitive & 유틸 타입
export type XValue = string | number;
export type ColorHex = string;

// 공통 인터페이스
export interface WithColor {
  color?: ColorHex;
}

// 이름과 값을 가지는 포인트
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

// 그리드 관련 Props
export interface GridProps {
  showGrid?: boolean;
}

// 범례 관련 Props
export interface LegendProps {
  showLegend?: boolean;
}

// 값 표시 관련 Props
export interface ValueDisplayProps {
  showValue?: boolean;
  showValues?: boolean;
  showPercentage?: boolean;
  unit?: string;
}

// 축 관련 Props
export interface AxisProps {
  xKey?: string;
  yKey?: string;
}

// XY 차트 공통 (선, 면, 막대)
export interface XYChartProps<T extends XYPoint = XYPoint>
  extends BaseChartProps, PaletteProps, GridProps, AxisProps {
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
export interface PieLikeProps extends BaseChartProps, PaletteProps, LegendProps {
  data: NamedValue[];
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

// 기본 색상 팔레트
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
  '#6b7280'  // gray
] as const;

// 차트 높이 옵션
export const CHART_HEIGHTS = {
  SMALL: 200,
  MEDIUM: 300,
  LARGE: 400,
  EXTRA_LARGE: 500
} as const;
export type ChartHeightKey = keyof typeof CHART_HEIGHTS;

// 게이지/진행률 차트 색상 옵션
export const GAUGE_COLORS = {
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  DANGER:  '#ef4444',
  PRIMARY: '#3b82f6'
} as const;

// 기존 DataPoint 계열
export type DataPoint = XYPoint;
export type PieDataPoint = NamedValue;
export type FunnelDataPoint = NamedValue;
export type WaterfallDataPoint = NamedValue & { type?: 'positive' | 'negative' | 'total' };
export type SparklineDataPoint = ValueOnly;
export type { XYChartProps as _XYChartProps };
