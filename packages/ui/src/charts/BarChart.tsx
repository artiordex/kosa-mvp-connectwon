/**
 * Description : BarChart.tsx - 📌 막대 차트 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */

import { CHART_HEIGHTS, DEFAULT_COLORS, type BarChartProps } from '../../ui-types.js';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
