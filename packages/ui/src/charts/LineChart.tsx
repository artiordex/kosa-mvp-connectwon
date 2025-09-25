/**
 * Description : LineChart.tsx - 📌 선 차트 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-09-25
 */
import { CHART_HEIGHTS, DEFAULT_COLORS, type LineChartProps } from '../../ui-types.js';
import { CartesianGrid, Line, LineChart as RechartsLineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// 선 차트 컴포넌트
const LineChart = ({
  data,
  height = CHART_HEIGHTS.MEDIUM,
  color = DEFAULT_COLORS[0],
  showGrid = true,
  showTooltip = true,
  xKey = 'x',
  yKey = 'y',
  className = '',
}: LineChartProps) => {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" className="opacity-30" />}
          <XAxis dataKey={xKey} className="text-xs" />
          <YAxis className="text-xs" />
          {showTooltip && <Tooltip />}
          <Line type="monotone" dataKey={yKey} stroke={color} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
