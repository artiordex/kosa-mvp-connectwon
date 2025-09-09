/**
 * Description : SparklineChart.tsx - 📌 스파크라인 차트 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */

import { DEFAULT_COLORS, type SparklineChartProps } from '../../ui-types.js';
import { LineChart, Line } from 'recharts';

export function SparklineChart({
  data,
  width = 120,
  height = 40,
  color = DEFAULT_COLORS[0],
  strokeWidth = 2,
  className = '',
  showDots = false,
  trend,
}: SparklineChartProps) {
  const auto =
    data.length >= 2
      ? (data[data.length - 1]?.value ?? 0) > (data[0]?.value ?? 0)
        ? 'up'
        : (data[data.length - 1]?.value ?? 0) < (data[0]?.value ?? 0)
        ? 'down'
        : 'neutral'
      : 'neutral';
  const t = trend ?? auto;
  const trendColor = t === 'up' ? '#10b981' : t === 'down' ? '#ef4444' : color;

  return (
    <div className={`inline-flex items-center ${className}`}>
      <LineChart width={width} height={height} data={data}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={trendColor}
          strokeWidth={strokeWidth}
          dot={showDots ? { r: 2 } : false}
          activeDot={false}
        />
      </LineChart>
      {t !== 'neutral' && (
        <span className={t === 'up' ? 'text-green-500 text-xs ml-1' : 'text-red-500 text-xs ml-1'}>
          {t === 'up' ? '↗' : '↘'}
        </span>
      )}
    </div>
  );
}
