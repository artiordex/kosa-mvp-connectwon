/**
 * Description : ProgressChart.tsx - 📌 진행 상황 차트 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-09-25
 */
import { GAUGE_COLORS, type ProgressChartProps } from '../../ui-types.js';

// 진행 상황 차트 컴포넌트
const ProgressChart = ({
  value,
  max = 100,
  title,
  showValue = true,
  showPercentage = true,
  unit = '',
  color, // 있으면 강제
  className = '',
  orientation = 'horizontal',
}: ProgressChartProps) => {
  const pct = Math.min(Math.max((value / max) * 100, 0), 100);
  const scheme = color ? 'cw-primary' : pct >= 100 ? 'cw-ok' : pct >= 50 ? 'cw-warn' : 'cw-danger';

  if (orientation === 'vertical') {
    // 수직 게이지는 SVG 직사각형으로 표현
    const w = 20,
      h = 160;
    const filled = (pct / 100) * h;
    const fillColor = color ?? (pct >= 100 ? GAUGE_COLORS.SUCCESS : pct >= 50 ? GAUGE_COLORS.WARNING : GAUGE_COLORS.DANGER);

    return (
      <div className={`flex flex-col items-center ${className}`}>
        {title && <div className="mb-2 text-sm font-medium text-gray-700 text-center">{title}</div>}
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
          <rect x="0" y="0" width={w} height={h} rx="10" fill="#e5e7eb" />
          <rect x="0" y={h - filled} width={w} height={filled} rx="10" fill={fillColor} />
        </svg>
        {(showValue || showPercentage) && (
          <div className="mt-2 text-center">
            {showValue && (
              <div className="text-lg font-bold text-gray-900">
                {value.toLocaleString()}
                {unit}
              </div>
            )}
            {showPercentage && <div className="text-sm text-gray-500">{pct.toFixed(1)}%</div>}
          </div>
        )}
      </div>
    );
  }

  // 수평은 <progress>로 처리 (CSS로 트랙/필 색)
  return (
    <div className={`w-full ${className}`}>
      {title && <div className="mb-2 text-sm font-medium text-gray-700">{title}</div>}
      <progress className={`cw-progress ${scheme}`} max={max} value={value} {...(color ? { style: undefined } : {})} />
      {(showValue || showPercentage) && (
        <div className="mt-1 flex items-center justify-end gap-2 text-right">
          {showValue && (
            <div className="text-sm font-bold text-gray-900">
              {value.toLocaleString()}
              {unit}
            </div>
          )}
          {showPercentage && <div className="text-xs text-gray-500">{pct.toFixed(1)}%</div>}
        </div>
      )}
    </div>
  );
};

export default ProgressChart;
