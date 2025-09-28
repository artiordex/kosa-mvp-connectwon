/**
 * Description : PieChart.tsx - 📌 파이 차트 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-09-25
 */
import { CHART_HEIGHTS, DEFAULT_COLORS, type PieChartProps } from '@connectwon/ui/ui-types';
import { Cell, Legend, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip } from 'recharts';

// 파이 차트 컴포넌트
const PieChart = ({
  data,
  height = CHART_HEIGHTS.MEDIUM,
  colors = DEFAULT_COLORS,
  showTooltip = true,
  showLegend = true,
  radius = 100,
  className = '',
}: PieChartProps) => {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          <Pie data={data as Record<string, any>[]} cx="50%" cy="50%" outerRadius={radius} paddingAngle={2} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || colors[index % colors.length]} />
            ))}
          </Pie>
          {showTooltip && <Tooltip />}
          {showLegend && <Legend />}
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;
