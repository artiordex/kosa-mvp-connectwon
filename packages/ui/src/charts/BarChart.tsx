/**
 * Description : BarChart.tsx - 📌 막대 차트 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */
import {
  Bar,
  CartesianGrid,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { type BarChartProps, CHART_HEIGHTS, DEFAULT_COLORS } from '../../ui-types.js';

export function BarChart({
  data,
  height = CHART_HEIGHTS.MEDIUM,
  color = DEFAULT_COLORS[0],
  showGrid = true,
  showTooltip = true,
  xKey = 'x',
  yKey = 'y',
  className = '',
  horizontal = false,
}: BarChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          layout={horizontal ? 'horizontal' : 'vertical'}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" className="opacity-30" />}
          <XAxis
            type={horizontal ? 'number' : 'category'}
            dataKey={horizontal ? yKey : xKey}
            className="text-xs"
          />
          <YAxis
            type={horizontal ? 'category' : 'number'}
            dataKey={horizontal ? xKey : undefined}
            className="text-xs"
          />
          {showTooltip && <Tooltip />}
          <Bar dataKey={horizontal ? xKey : yKey} fill={color} radius={[2, 2, 0, 0]} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
