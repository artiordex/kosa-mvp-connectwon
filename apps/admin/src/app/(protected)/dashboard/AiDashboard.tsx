'use client';

import { useState } from 'react';

interface DashboardProps {
  className?: string;
}

export default function Dashboard({ className = '' }: DashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // 통계 데이터
  const stats = {
    totalUsers: 1234,
    activeReservations: 45,
    todayRevenue: 2850000,
    systemHealth: 98,
    aiProcessingJobs: 12,
    pendingApprovals: 8,
  };

  // 감정 분석 데이터
  const sentimentData = {
    positive: 78,
    neutral: 15,
    negative: 7,
  };

  // 예측 분석 데이터
  const predictionData = {
    nextWeekBookings: 145,
    popularTimeSlot: '14:00-16:00',
    confidence: 89,
  };

  // 시간대별 데이터
  const timeSlots = [
    { time: '09:00-11:00', usage: 45, predicted: 50, trend: 'up' },
    { time: '11:00-13:00', usage: 72, predicted: 78, trend: 'up' },
    { time: '13:00-15:00', usage: 68, predicted: 65, trend: 'down' },
    { time: '15:00-17:00', usage: 85, predicted: 92, trend: 'up' },
  ];

  // AI 처리 현황 데이터
  const aiProcessing = [
    { task: '자동 예약 승인', count: 23, time: '5분 전' },
    { task: '감정 분석 완료', count: 15, time: '12분 전' },
    { task: '사용량 예측 업데이트', count: 1, time: '1시간 전' },
  ];

  // 시스템 알림 데이터
  const systemAlerts = [
    { type: 'warning', message: 'A홰 사용률 90% 초과', time: '방금 전' },
    { type: 'info', message: 'AI 모델 업데이트 완료', time: '30분 전' },
    { type: 'success', message: '예약 자동 승인 8건 처리', time: '1시간 전' },
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 헤더 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI 통합 대시보드</h1>
        <p className="text-gray-600 mt-1">실시간 데이터 모니터링 및 AI 기반 분석 결과를 확인하세요</p>
      </div>

      {/* 기간 필터 */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">분석 기간</label>
            <select
              value={selectedPeriod}
              onChange={e => setSelectedPeriod(e.target.value)}
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
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm transition-colors">
              <i className="ri-refresh-line mr-2"></i> 새로고침
            </button>
          </div>
        </div>
      </div>

      {/* 실시간 통계 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        {/* 총 사용자 */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
          <p className="text-blue-100 text-sm">총 사용자</p>
          <p className="text-3xl font-bold">{stats.totalUsers.toLocaleString()}</p>
          <p className="text-blue-100 text-xs mt-1">+5% 증가</p>
        </div>

        {/* 활성 예약 */}
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white shadow-lg">
          <p className="text-green-100 text-sm">활성 예약</p>
          <p className="text-3xl font-bold">{stats.activeReservations}</p>
          <p className="text-green-100 text-xs mt-1">실시간</p>
        </div>

        {/* 오늘 수익 */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white shadow-lg">
          <p className="text-purple-100 text-sm">오늘 수익</p>
          <p className="text-3xl font-bold">₩{(stats.todayRevenue / 1000000).toFixed(1)}M</p>
          <p className="text-purple-100 text-xs mt-1">+12% 증가</p>
        </div>

        {/* 시스템 상태 */}
        <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl p-6 text-white shadow-lg">
          <p className="text-orange-100 text-sm">시스템 상태</p>
          <p className="text-3xl font-bold">{stats.systemHealth}%</p>
          <p className="text-orange-100 text-xs mt-1">정상 운영</p>
        </div>

        {/* AI 처리 작업 */}
        <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl p-6 text-white shadow-lg">
          <p className="text-teal-100 text-sm">AI 처리 작업</p>
          <p className="text-3xl font-bold">{stats.aiProcessingJobs}</p>
          <p className="text-teal-100 text-xs mt-1">진행 중</p>
        </div>

        {/* 승인 대기 */}
        <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-6 text-white shadow-lg">
          <p className="text-red-100 text-sm">승인 대기</p>
          <p className="text-3xl font-bold">{stats.pendingApprovals}</p>
          <p className="text-red-100 text-xs mt-1">처리 필요</p>
        </div>
      </div>

      {/* AI 분석 섹션 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI 감정 분석 */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">AI 감정 분석</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                <i className="ri-external-link-line mr-1"></i>
                AI 분석
              </button>
            </div>
          </div>
          <div className="p-6">
            {/* 도넛 차트 영역 */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-48 h-48">
                <div
                  className="w-full h-full rounded-full relative"
                  style={{
                    background: `conic-gradient(
                         #10b981 0deg ${sentimentData.positive * 3.6}deg,
                         #f59e0b ${sentimentData.positive * 3.6}deg ${(sentimentData.positive + sentimentData.neutral) * 3.6}deg,
                         #ef4444 ${(sentimentData.positive + sentimentData.neutral) * 3.6}deg 360deg
                       )`,
                  }}
                >
                  <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{sentimentData.positive}%</div>
                      <div className="text-sm text-gray-600">긍정적 반응</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 범례 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">긍정적 반응</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{sentimentData.positive}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">중립적 반응</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{sentimentData.neutral}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">부정적 반응</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{sentimentData.negative}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI 예측 분석 */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">AI 예측 분석</h2>
              <button className="text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors">
                <i className="ri-line-chart-line mr-1"></i>
                예측 모델
              </button>
            </div>
          </div>
          <div className="p-6 space-y-6">
            {/* 다음 주 예상 예약 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">다음 주 예상 예약</span>
                <span className="text-2xl font-bold text-purple-600">{predictionData.nextWeekBookings}건</span>
              </div>
              <div className="text-xs text-gray-500">전월 트렌드 기반 AI 예측 (신뢰도: {predictionData.confidence}%)</div>
            </div>

            {/* 인기 시간대 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">인기 시간대</span>
                <span className="text-lg font-semibold text-gray-900">{predictionData.popularTimeSlot}</span>
              </div>
              <div className="text-xs text-gray-500">사용률 85% 이상 시간대</div>
            </div>

            {/* AI 감정 예측 */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">AI 감정 예측</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <i className="ri-arrow-up-line text-blue-600 text-sm mr-2"></i>
                  <span className="text-sm text-gray-700">오후 시간대 추가 회의실 오픈 권장</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-time-line text-blue-600 text-sm mr-2"></i>
                  <span className="text-sm text-gray-700">A홀 유지보수 스케줄 조정 필요</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 시간대별 효율성 분석 */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">시간대별 효율성 분석</h2>
          <p className="text-sm text-gray-600 mt-1">AI가 분석한 최적 운영 시간대 (현재 사용률 vs 예측 사용률)</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {timeSlots.map((slot, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-900">{slot.time}</span>
                  <i className={`ri-arrow-${slot.trend === 'up' ? 'up' : 'down'}-line text-${slot.trend === 'up' ? 'green' : 'red'}-500`}></i>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">현재</span>
                    <span className="font-medium">{slot.usage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full transition-all duration-300" style={{ width: `${slot.usage}%` }}></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">예측</span>
                    <span className="font-medium text-purple-600">{slot.predicted}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 추가 정보 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 최근 AI 처리 현황 */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">최근 AI 처리 현황</h3>
          <div className="space-y-3">
            {aiProcessing.map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <div className="text-sm font-medium text-gray-900">{item.task}</div>
                  <div className="text-xs text-gray-500">{item.time}</div>
                </div>
                <div className="text-sm font-semibold text-blue-600">+{item.count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 시스템 알림 */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">시스템 알림</h3>
          <div className="space-y-3">
            {systemAlerts.map((alert, index) => (
              <div key={index} className="flex items-start space-x-3 py-2">
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    alert.type === 'warning' ? 'bg-yellow-400' : alert.type === 'info' ? 'bg-blue-400' : 'bg-green-400'
                  }`}
                ></div>
                <div className="flex-1">
                  <div className="text-sm text-gray-900">{alert.message}</div>
                  <div className="text-xs text-gray-500">{alert.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 빠른 액션 */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">빠른 액션</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <span className="text-sm font-medium text-blue-900">AI 분석 리포트 생성</span>
              <i className="ri-file-chart-line text-blue-600"></i>
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <span className="text-sm font-medium text-green-900">예약 승인 일괄 처리</span>
              <i className="ri-check-double-line text-green-600"></i>
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <span className="text-sm font-medium text-purple-900">AI 모델 재학습</span>
              <i className="ri-brain-line text-purple-600"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
