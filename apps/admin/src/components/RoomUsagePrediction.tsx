'use client';

export default function RoomUsagePrediction() {
  const rooms = [
    { room: 'A홀', current: 85, predicted: 92, trend: 'up' },
    { room: 'B홀', current: 70, predicted: 65, trend: 'down' },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">회의실 사용량 예측</h2>
      <ul>
        {rooms.map(r => (
          <li key={r.room}>
            {r.room}: 현재 {r.current}% → 예측 {r.predicted}%
          </li>
        ))}
      </ul>
    </div>
  );
}
