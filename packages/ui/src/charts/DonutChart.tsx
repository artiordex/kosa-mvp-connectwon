/**
 * Description : DonutChart.tsx - 📌 도넛 차트 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-09-25
 */
import { CHART_HEIGHTS, DEFAULT_COLORS, type DonutChartProps } from '@connectwon/ui/ui-types';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

// 도넛 차트 컴포넌트
const DonutChart = ({
  data,
  height = CHART_HEIGHTS.MEDIUM,
  colors = DEFAULT_COLORS,
  showTooltip = true,
  showLegend = true,
  innerRadius = 60,
  outerRadius = 100,
  className = '',
  centerText,
}: DonutChartProps) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className={`relative ${className}`}>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={innerRadius} outerRadius={outerRadius} paddingAngle={2} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || colors[index % colors.length]} />
            ))}
          </Pie>
          {showTooltip && <Tooltip />}
          {showLegend && <Legend />}
        </PieChart>
      </ResponsiveContainer>

      {centerText && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{total.toLocaleString()}</div>
            <div className="text-sm text-gray-500">{centerText}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonutChart;
