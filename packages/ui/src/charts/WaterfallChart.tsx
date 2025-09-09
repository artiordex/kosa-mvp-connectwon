/**
 * Description : WaterfallChart.tsx - 📌 누적 영역 차트 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */

import { type WaterfallChartProps } from '../../ui-types.js';

export function WaterfallChart({
  data,
  height = 300,
  positiveColor = '#10b981',
  negativeColor = '#ef4444',
  totalColor = '#3b82f6',
  showValues = true,
  className = '',
}: WaterfallChartProps) {
  // 누적 합계 계산
  let running = 0;
  const processed = data.map((d) => {
    const start = running;
    if (d.type === 'total') {
      running = d.value;
      return { ...d, start, end: running, disp: Math.abs(running - start) };
    }
    running += d.value;
    const end = running;
    return { ...d, start, end, disp: Math.abs(d.value) };
  });

  const max = Math.max(...processed.map(p => Math.max(p.start, p.end)));
  const min = Math.min(0, ...processed.map(p => Math.min(p.start, p.end)));

  const W = 600;       // 고정 뷰박스 가로
  const H = height;
  const n = processed.length;
  const gap = 12;
  const bw = (W - gap * (n + 1)) / n; // bar width

  const yScale = (v: number) => {
    const range = max - min || 1;
    return H - ((v - min) / range) * (H - 40) - 20; // 위/아래 패딩 20
  };

  const colorOf = (d: typeof processed[number]) =>
    d.color ? d.color : d.type === 'total' ? totalColor : d.end >= d.start ? positiveColor : negativeColor;

  return (
    <div className={`cw-card ${className}`}>
      <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
        {/* 축 라인 */}
        <line x1="0" y1={yScale(0)} x2={W} y2={yScale(0)} stroke="#e5e7eb" strokeWidth="1" />

        {processed.map((d, i) => {
          const x = gap + i * (bw + gap);
          const y1 = yScale(d.start);
          const y2 = yScale(d.end);
          const yTop = Math.min(y1, y2);
          const h = Math.abs(y2 - y1);

          return (
            <g key={i}>
              {/* 막대 */}
              <rect x={x} y={yTop} width={bw} height={h} fill={colorOf(d)} rx="4" />
              {/* 연결 점선(마지막 제외) */}
              {i < n - 1 && (
                <line
                  className="cw-wf-link"
                  x1={x + bw}
                  y1={y2}
                  x2={gap + (i + 1) * (bw + gap)}
                  y2={y2}
                />
              )}
              {/* 값 라벨 */}
              {showValues && (
                <text x={x + bw / 2} y={yTop - 6} className="cw-wf-label">
                  {(d.end - d.start >= 0 ? '+' : '') + (d.end - d.start).toLocaleString()}
                </text>
              )}
              {/* 아래 이름 */}
              <text x={x + bw / 2} y={H - 4} className="cw-wf-label">
                {d.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
