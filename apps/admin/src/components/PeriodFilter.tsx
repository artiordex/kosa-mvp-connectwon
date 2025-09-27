'use client';

interface PeriodFilterProps {
  selectedPeriod: string;
  onChange: (value: string) => void;
}

export default function PeriodFilter({ selectedPeriod, onChange }: PeriodFilterProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">분석 기간</label>
          <select
            value={selectedPeriod}
            onChange={e => onChange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
          >
            <option value="day">오늘</option>
            <option value="week">최근 1주일</option>
            <option value="month">최근 1개월</option>
            <option value="quarter">최근 3개월</option>
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">실시간 업데이트</span>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
            <i className="ri-refresh-line mr-2"></i> 새로고침
          </button>
        </div>
      </div>
    </div>
  );
}
