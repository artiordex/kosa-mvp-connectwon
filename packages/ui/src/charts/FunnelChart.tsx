/**
 * Description : FunnelChart.tsx - 📌 깔때기 차트 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-09-25
 */
import { DEFAULT_COLORS, type FunnelChartProps } from '../ui-types.js';

// 깔때기 차트 컴포넌트
const FunnelChart = ({ data, colors = DEFAULT_COLORS, showLabels = true, showValues = true, height = 300, className = '' }: FunnelChartProps) => {
  const W = 100; // viewBox 가로(상대)
  const H = height; // 세로는 실제 px 사용
  const rows = data.length;
  const segH = H / rows - 6; // segment height (작은 갭 포함)
  const max = Math.max(...data.map(d => d.value));

  const pointsFor = (idx: number) => {
    const cur = data[idx] ?? { value: 0, name: '', color: undefined };
    const next = data[idx + 1] ?? cur;
    const wTop = (cur.value / max) * W;
    const wBot = (next.value / max) * W;

    const y1 = idx * (H / rows);
    const y2 = y1 + segH;
    const x1L = (W - wTop) / 2;
    const x1R = x1L + wTop;
    const x2L = (W - wBot) / 2;
    const x2R = x2L + wBot;

    return `${x1L},${y1} ${x1R},${y1} ${x2R},${y2} ${x2L},${y2}`;
  };

  return (
    <div className={`cw-card ${className}`}>
      <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
        {data.map((d, i) => (
          <g key={i}>
            <polygon points={pointsFor(i)} fill={d.color || colors[i % colors.length]} />
            {(showLabels || showValues) && (
              <>
                <text className="cw-fn-label" x={W / 2} y={i * (H / rows) + segH / 2 - 8} textAnchor="middle">
                  {showLabels ? d.name : ''}
                </text>
                <text className="cw-fn-value" x={W / 2} y={i * (H / rows) + segH / 2 + 8} textAnchor="middle">
                  {showValues ? d.value.toLocaleString() : ''}
                </text>
              </>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};

export default FunnelChart;
