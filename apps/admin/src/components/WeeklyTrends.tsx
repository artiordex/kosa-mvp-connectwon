'use client';

export default function WeeklyTrends() {
  const trends = [
    { day: '월', bookings: 32, predicted: 35, satisfaction: 4.2 },
    { day: '화', bookings: 28, predicted: 30, satisfaction: 4.1 },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">주간 트렌드 분석</h2>
      <ul>
        {trends.map(d => (
          <li key={d.day}>
            {d.day}: {d.bookings}건 → {d.predicted}건 (만족도 {d.satisfaction})
          </li>
        ))}
      </ul>
    </div>
  );
}
