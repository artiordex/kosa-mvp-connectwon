'use client';

export default function PredictionAnalysis() {
  const prediction = {
    nextWeekBookings: 145,
    popularTimeSlot: '14:00-16:00',
    recommendedActions: ['오후 시간대 추가 회의실 오픈 권장', 'A홀 유지보수 스케줄 조정 필요'],
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">AI 예측 분석</h2>
      <p>다음 주 예상 예약: {prediction.nextWeekBookings}건</p>
      <p>인기 시간대: {prediction.popularTimeSlot}</p>
    </div>
  );
}
