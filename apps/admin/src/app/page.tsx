'use client';

import { useState } from 'react';

import PredictionAnalysis from 'components/ai/PredictionAnalysis';
import SentimentAnalysis from 'components/ai/SentimentAnalysis';
import PeriodFilter from 'components/PeriodFilter';
import RealTimeStats from 'components/RealTimeStats';

export default function AdminPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // 시간대별 효율성 데이터
  const timeSlots = [
    { time: '09:00-11:00', usage: 45, predicted: 50, trend: 'up' },
    { time: '11:00-13:00', usage: 72, predicted: 78, trend: 'up' },
    { time: '13:00-15:00', usage: 68, predicted: 65, trend: 'down' },
    { time: '15:00-17:00', usage: 85, predicted: 92, trend: 'up' },
  ];

  // 최근 AI 처리 현황
  const aiProcessing = [
    { task: '자동 예약 승인', count: 23, time: '5분 전' },
    { task: '감정 분석 완료', count: 15, time: '12분 전' },
    { task: '사용량 예측 업데이트', count: 1, time: '1시간 전' },
  ];

  // 시스템 알림
  const systemAlerts = [
    { type: 'warning', message: 'A홀 사용률 90% 초과', time: '방금 전' },
    { type: 'info', message: 'AI 모델 업데이트 완료', time: '30분 전' },
    { type: 'success', message: '예약 자동 승인 8건 처리', time: '1시간 전' },
  ];

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI 통합 대시보드</h1>
        <p className="text-gray-600 mt-1">실시간 데이터 모니터링 및 AI 기반 분석 결과를 확인하세요</p>
      </div>

      {/* 기간 필터 */}
      <PeriodFilter selectedPeriod={selectedPeriod} onChange={setSelectedPeriod} />

      {/* 실시간 통계 카드 */}
      <RealTimeStats />

      {/* AI 분석 섹션 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SentimentAnalysis />
        <PredictionAnalysis />
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
