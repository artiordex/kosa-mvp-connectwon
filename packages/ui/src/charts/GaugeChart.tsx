/**
 * Description : GaugeChart.tsx - 📌 게이지 차트 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-09-25
 */
import { GAUGE_COLORS, type GaugeChartProps } from '../ui-types.js';

// 게이지 차트 컴포넌트
const GaugeChart = ({
  value,
  max = 100,
  min = 0,
  title,
  showValue = true,
  unit = '%',
  color,
  backgroundColor = '#e5e7eb',
  className = '',
}: GaugeChartProps) => {
  const pct = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);
  const autoColor = pct >= 80 ? GAUGE_COLORS.SUCCESS : pct >= 40 ? GAUGE_COLORS.WARNING : GAUGE_COLORS.DANGER;
  const strokeColor = color ?? autoColor;

  const size = 120;
  const r = 45;
  const circumference = 2 * Math.PI * r;
  const dash = (pct / 100) * circumference;

  return (
    <div className={`cw-card flex flex-col items-center ${className}`}>
      <svg width={size} height={size} viewBox="0 0 120 120" className="-rotate-90">
        <circle cx="60" cy="60" r={r} stroke={backgroundColor} strokeWidth="8" fill="none" opacity={0.3} />
        <circle
          cx="60"
          cy="60"
          r={r}
          stroke={strokeColor}
          strokeWidth="8"
          fill="none"
          strokeDasharray={`${dash} ${circumference}`}
          strokeLinecap="round"
        />
      </svg>

      <div className="cw-overlay-center">
        {showValue && (
          <div className="text-2xl font-bold text-gray-900">
            {value.toFixed(1)}
            {unit}
          </div>
        )}
      </div>

      {title && <div className="mt-2 text-sm font-medium text-gray-700 text-center">{title}</div>}
    </div>
  );
};

export default GaugeChart;
