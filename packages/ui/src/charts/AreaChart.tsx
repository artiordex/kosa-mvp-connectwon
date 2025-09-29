/**
 * Description : AreaChart.tsx - 📌 영역 차트 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-09-25
 */
import { useMemo } from 'react';
import { type AreaChartProps, CHART_HEIGHTS, DEFAULT_COLORS } from '../ui-types.js';
import { Area, CartesianGrid, AreaChart as RechartsAreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// 영역 차트 컴포넌트
const AreaChart = ({
  data,
  height = CHART_HEIGHTS.MEDIUM,
  color = DEFAULT_COLORS[0],
  fillOpacity = 0.2,
  strokeWidth = 2,
  showGrid = true,
  showTooltip = true,
  xKey = 'x',
  yKey = 'y',
  className = '',
}: AreaChartProps) => {
  // 고유 gradient id (SSR/CSR 모두 안전하게)
  const gradientId = useMemo(() => `area-gradient-${Math.random().toString(36).slice(2)}`, []);

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsAreaChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 8 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={fillOpacity} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>

          {showGrid && <CartesianGrid strokeDasharray="3 3" className="opacity-30" />}

          <XAxis dataKey={xKey} className="text-xs" />
          <YAxis className="text-xs" />

          {showTooltip && <Tooltip />}

          <Area type="monotone" dataKey={yKey} stroke={color} strokeWidth={strokeWidth} fill={`url(#${gradientId})`} activeDot={{ r: 5 }} />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChart;
