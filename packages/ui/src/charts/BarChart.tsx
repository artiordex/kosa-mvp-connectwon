/**
 * Description : BarChart.tsx - 📌 막대 차트 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-09-25
 */
import { type BarChartProps, CHART_HEIGHTS, DEFAULT_COLORS } from '../ui-types.js';
import { Bar, CartesianGrid, BarChart as RechartsBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// 막대 차트 컴포넌트
const BarChart = ({
  data,
  height = CHART_HEIGHTS.MEDIUM,
  color = DEFAULT_COLORS[0],
  showGrid = true,
  showTooltip = true,
  xKey = 'x',
  yKey = 'y',
  className = '',
  horizontal = false,
}: BarChartProps) => {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          // 수평 막대(true) = layout "vertical" (Y축이 카테고리, X축이 값)
          // 수직 막대(false) = layout "horizontal" (X축이 카테고리, Y축이 값)
          layout={horizontal ? 'vertical' : 'horizontal'}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" className="opacity-30" />}

          {horizontal ? (
            <>
              {/* 수평 막대: X축=값(number), Y축=범주(category) */}
              <XAxis type="number" className="text-xs" />
              <YAxis type="category" dataKey={xKey} className="text-xs" />
            </>
          ) : (
            <>
              {/* 수직 막대: X축=범주(category), Y축=값(number) */}
              <XAxis type="category" dataKey={xKey} className="text-xs" />
              <YAxis type="number" className="text-xs" />
            </>
          )}

          {showTooltip && <Tooltip />}

          {/* 값은 항상 yKey에서 읽음 */}
          <Bar dataKey={yKey} fill={color} radius={[2, 2, 0, 0]} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
