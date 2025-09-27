'use client';

export default function TimeSlotEfficiency() {
  const slots = [
    { time: '09:00', usage: 25, predicted: 28, efficiency: 'low' },
    { time: '10:00', usage: 45, predicted: 48, efficiency: 'medium' },
    { time: '11:00', usage: 65, predicted: 70, efficiency: 'high' },
    { time: '14:00', usage: 85, predicted: 92, efficiency: 'very_high' },
    { time: '15:00', usage: 88, predicted: 95, efficiency: 'very_high' },
    { time: '16:00', usage: 82, predicted: 85, efficiency: 'high' },
    { time: '17:00', usage: 60, predicted: 58, efficiency: 'medium' },
    { time: '18:00', usage: 35, predicted: 32, efficiency: 'low' },
  ];

  const getEfficiencyLabel = (eff: string) => {
    switch (eff) {
      case 'very_high':
        return '매우 높음';
      case 'high':
        return '높음';
      case 'medium':
        return '보통';
      case 'low':
        return '낮음';
      default:
        return '알수없음';
    }
  };

  const getEfficiencyColor = (eff: string) => {
    switch (eff) {
      case 'very_high':
        return 'bg-green-100 text-green-800';
      case 'high':
        return 'bg-blue-100 text-blue-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">시간대별 효율성 분석</h2>
        <p className="text-sm text-gray-600 mt-1">AI가 분석한 최적 운영 시간대 (현재 사용률 vs 예측 사용률)</p>
      </div>

      <div className="p-6 space-y-4">
        {slots.map(slot => (
          <div key={slot.time} className="flex items-center space-x-4">
            {/* 시간 */}
            <div className="w-16 text-sm font-medium text-gray-900">{slot.time}</div>

            {/* 프로그레스바 */}
            <div className="flex-1">
              <div className="flex items-center space-x-4">
                <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
                  {/* 현재 사용률 */}
                  <div className="bg-blue-500 h-3 rounded-full transition-all duration-300" style={{ width: `${slot.usage}%` }}></div>
                  {/* 예측 사용률 */}
                  <div
                    className="absolute top-0 h-3 bg-purple-500 bg-opacity-50 rounded-full transition-all duration-300"
                    style={{ width: `${slot.predicted}%` }}
                  ></div>
                </div>

                {/* 숫자값 */}
                <div className="w-20 text-right">
                  <div className="text-sm font-medium text-gray-900">{slot.usage}%</div>
                  <div className="text-xs text-purple-600">예측: {slot.predicted}%</div>
                </div>

                {/* 효율성 뱃지 */}
                <div className="w-24">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEfficiencyColor(slot.efficiency)}`}>
                    {getEfficiencyLabel(slot.efficiency)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
