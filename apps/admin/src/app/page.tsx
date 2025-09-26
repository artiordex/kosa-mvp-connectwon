
'use client';

import AdminLayout from '../../components/AdminLayout';
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [aiInsights, setAiInsights] = useState({
    sentimentAnalysis: {
      positive: 78,
      neutral: 15,
      negative: 7
    },
    trendPrediction: {
      nextWeekBookings: 145,
      popularTimeSlot: '14:00-16:00',
      recommendedActions: [
        '오후 시간대 추가 회의실 오픈 권장',
        'A홀 유지보수 스케줄 조정 필요',
        '주말 프로그램 확장 검토'
      ]
    },
    userBehaviorPrediction: {
      peakHours: ['14:00', '15:00', '16:00'],
      mostPopularRoom: 'A홀',
      expectedCancellationRate: 12,
      userRetentionRate: 85
    }
  });

  const [realTimeStats] = useState({
    totalUsers: 1234,
    activeReservations: 45,
    todayRevenue: 2850000,
    systemHealth: 98,
    aiProcessingJobs: 12,
    pendingApprovals: 8
  });

  const [aiAnalyticsData] = useState({
    roomUsagePredict: [
      { room: 'A홀', current: 85, predicted: 92, trend: 'up' },
      { room: 'B홀', current: 70, predicted: 65, trend: 'down' },
      { room: 'C홀', current: 60, predicted: 75, trend: 'up' },
      { room: 'D홀', current: 45, predicted: 48, trend: 'stable' },
      { room: 'E홀', current: 55, predicted: 62, trend: 'up' }
    ],
    weeklyTrends: [
      { day: '월', bookings: 32, predicted: 35, satisfaction: 4.2 },
      { day: '화', bookings: 28, predicted: 30, satisfaction: 4.1 },
      { day: '수', bookings: 35, predicted: 38, satisfaction: 4.3 },
      { day: '목', bookings: 42, predicted: 45, satisfaction: 4.4 },
      { day: '금', bookings: 38, predicted: 40, satisfaction: 4.2 },
      { day: '토', bookings: 25, predicted: 28, satisfaction: 4.5 },
      { day: '일', bookings: 20, predicted: 22, satisfaction: 4.6 }
    ],
    timeSlotAnalysis: [
      { time: '09:00', usage: 25, predicted: 28, efficiency: 'low' },
      { time: '10:00', usage: 45, predicted: 48, efficiency: 'medium' },
      { time: '11:00', usage: 65, predicted: 70, efficiency: 'high' },
      { time: '14:00', usage: 85, predicted: 92, efficiency: 'very_high' },
      { time: '15:00', usage: 88, predicted: 95, efficiency: 'very_high' },
      { time: '16:00', usage: 82, predicted: 85, efficiency: 'high' },
      { time: '17:00', usage: 60, predicted: 58, efficiency: 'medium' },
      { time: '18:00', usage: 35, predicted: 32, efficiency: 'low' }
    ]
  });

  const [automationTasks] = useState([
    {
      id: 1,
      name: '자동 예약 승인',
      status: 'active',
      processed: 156,
      lastRun: '5분 전',
      accuracy: 94
    },
    {
      id: 2,
      name: '감정 분석 처리',
      status: 'active',
      processed: 89,
      lastRun: '2분 전',
      accuracy: 87
    },
    {
      id: 3,
      name: '스팸 리뷰 필터링',
      status: 'active',
      processed: 23,
      lastRun: '1분 전',
      accuracy: 96
    },
    {
      id: 4,
      name: '사용량 예측 분석',
      status: 'running',
      processed: 0,
      lastRun: '진행 중',
      accuracy: 91
    }
  ]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return 'ri-arrow-up-line text-green-600';
      case 'down': return 'ri-arrow-down-line text-red-600';
      default: return 'ri-subtract-line text-gray-600';
    }
  };

  const getEfficiencyColor = (efficiency: string) => {
    switch (efficiency) {
      case 'very_high': return 'bg-green-500';
      case 'high': return 'bg-blue-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50">
        <main className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">AI 통합 대시보드</h1>
              <p className="text-gray-600">실시간 데이터 모니터링 및 AI 기반 분석 결과를 확인하세요</p>
            </div>

            {/* 기간 선택 필터 */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <div className="flex items-center justify-between">
                <div className="flex space-x-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">분석 기간</label>
                    <select
                      value={selectedPeriod}
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                    >
                      <option value="day">오늘</option>
                      <option value="week">최근 1주일</option>
                      <option value="month">최근 1개월</option>
                      <option value="quarter">최근 3개월</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">실시간 업데이트</span>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer whitespace-nowrap text-sm">
                    <i className="ri-refresh-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                    새로고침
                  </button>
                </div>
              </div>
            </div>

            {/* 실시간 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">총 사용자</p>
                    <p className="text-3xl font-bold">{realTimeStats.totalUsers.toLocaleString()}</p>
                    <p className="text-blue-100 text-xs mt-1">+5% 증가</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500 bg-opacity-30 rounded-lg flex items-center justify-center">
                    <i className="ri-user-line text-white w-6 h-6 flex items-center justify-center"></i>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">활성 예약</p>
                    <p className="text-3xl font-bold">{realTimeStats.activeReservations}</p>
                    <p className="text-green-100 text-xs mt-1">실시간</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500 bg-opacity-30 rounded-lg flex items-center justify-center">
                    <i className="ri-calendar-check-line text-white w-6 h-6 flex items-center justify-center"></i>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">오늘 수익</p>
                    <p className="text-3xl font-bold">₩{(realTimeStats.todayRevenue / 1000000).toFixed(1)}M</p>
                    <p className="text-purple-100 text-xs mt-1">+12% 증가</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-500 bg-opacity-30 rounded-lg flex items-center justify-center">
                    <i className="ri-money-dollar-circle-line text-white w-6 h-6 flex items-center justify-center"></i>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">시스템 상태</p>
                    <p className="text-3xl font-bold">{realTimeStats.systemHealth}%</p>
                    <p className="text-orange-100 text-xs mt-1">정상 운영</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-500 bg-opacity-30 rounded-lg flex items-center justify-center">
                    <i className="ri-shield-check-line text-white w-6 h-6 flex items-center justify-center"></i>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-teal-100 text-sm">AI 처리 작업</p>
                    <p className="text-3xl font-bold">{realTimeStats.aiProcessingJobs}</p>
                    <p className="text-teal-100 text-xs mt-1">진행 중</p>
                  </div>
                  <div className="w-12 h-12 bg-teal-500 bg-opacity-30 rounded-lg flex items-center justify-center">
                    <i className="ri-robot-line text-white w-6 h-6 flex items-center justify-center"></i>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-100 text-sm">승인 대기</p>
                    <p className="text-3xl font-bold">{realTimeStats.pendingApprovals}</p>
                    <p className="text-red-100 text-xs mt-1">처리 필요</p>
                  </div>
                  <div className="w-12 h-12 bg-red-500 bg-opacity-30 rounded-lg flex items-center justify-center">
                    <i className="ri-notification-badge-line text-white w-6 h-6 flex items-center justify-center"></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* AI 감정 분석 */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">AI 감정 분석</h2>
                  <div className="flex items-center space-x-2">
                    <i className="ri-brain-line text-blue-600 w-5 h-5 flex items-center justify-center"></i>
                    <span className="text-sm text-blue-600 font-medium">AI 분석</span>
                  </div>
                </div>

                <div className="relative mb-6">
                  <div className="w-48 h-48 mx-auto">
                    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                      <circle
                        cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="8"
                        strokeDasharray={`${aiInsights.sentimentAnalysis.positive * 2.51} 251`}
                        strokeLinecap="round"
                      />
                      <circle
                        cx="50" cy="50" r="40" fill="none" stroke="#6b7280" strokeWidth="8"
                        strokeDasharray={`${aiInsights.sentimentAnalysis.neutral * 2.51} 251`}
                        strokeDashoffset={`-${aiInsights.sentimentAnalysis.positive * 2.51}`}
                        strokeLinecap="round"
                      />
                      <circle
                        cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="8"
                        strokeDasharray={`${aiInsights.sentimentAnalysis.negative * 2.51} 251`}
                        strokeDashoffset={`-${(aiInsights.sentimentAnalysis.positive + aiInsights.sentimentAnalysis.neutral) * 2.51}`}
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-sm text-gray-600">긍정적 반응</span>
                    </div>
                    <span className="text-sm font-medium text-green-600">{aiInsights.sentimentAnalysis.positive}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gray-500 rounded-full mr-3"></div>
                      <span className="text-sm text-gray-600">중립적 반응</span>
                    </div>
                    <span className="text-sm font-medium text-gray-600">{aiInsights.sentimentAnalysis.neutral}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                      <span className="text-sm text-gray-600">부정적 반응</span>
                    </div>
                    <span className="text-sm font-medium text-red-600">{aiInsights.sentimentAnalysis.negative}%</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <i className="ri-lightbulb-line text-blue-600 w-4 h-4 flex items-center justify-center mr-2"></i>
                    <span className="text-sm font-medium text-blue-900">AI 인사이트</span>
                  </div>
                  <p className="text-sm text-blue-800">사용자 만족도가 전주 대비 8% 향상되었습니다. 회의실 청결도와 음향 시설에 대한 긍정적 피드백이 증가했습니다.</p>
                </div>
              </div>

              {/* AI 예측 분석 */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">AI 예측 분석</h2>
                  <div className="flex items-center space-x-2">
                    <i className="ri-line-chart-line text-purple-600 w-5 h-5 flex items-center justify-center"></i>
                    <span className="text-sm text-purple-600 font-medium">예측 모델</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">다음 주 예상 예약</span>
                      <span className="text-2xl font-bold text-purple-600">{aiInsights.trendPrediction.nextWeekBookings}건</span>
                    </div>
                    <p className="text-xs text-gray-600">현재 트렌드 기반 예측 (신뢰도: 89%)</p>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">인기 시간대</span>
                      <span className="text-lg font-bold text-green-600">{aiInsights.trendPrediction.popularTimeSlot}</span>
                    </div>
                    <p className="text-xs text-gray-600">사용률 85% 이상 시간대</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">AI 권장 액션</h3>
                    <div className="space-y-2">
                      {aiInsights.trendPrediction.recommendedActions.map((action, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                          <p className="text-sm text-gray-700">{action}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 회의실 사용량 예측 */}
            <div className="bg-white rounded-xl shadow-sm mb-8">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">회의실 사용량 예측</h2>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">현재 사용률</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">예측 사용률</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  {aiAnalyticsData.roomUsagePredict.map((room) => (
                    <div key={room.room} className="text-center">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">{room.room}</h3>
                      <div className="relative w-24 h-24 mx-auto mb-4">
                        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                          <circle
                            cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="8"
                            strokeDasharray={`${room.current * 2.51} 251`} strokeLinecap="round"
                          />
                          <circle
                            cx="50" cy="50" r="35" fill="none" stroke="#8b5cf6" strokeWidth="4"
                            strokeDasharray={`${room.predicted * 2.2} 220`} strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-sm font-bold text-gray-900">{room.current}%</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-center space-x-2">
                          <span className="text-sm text-gray-600">예측:</span>
                          <span className="text-sm font-medium text-purple-600">{room.predicted}%</span>
                          <i className={`${getTrendIcon(room.trend)} w-4 h-4 flex items-center justify-center`}></i>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 시간대별 효율성 분석 */}
            <div className="bg-white rounded-xl shadow-sm mb-8">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">시간대별 효율성 분석</h2>
                <p className="text-sm text-gray-600 mt-1">AI가 분석한 최적 운영 시간대</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {aiAnalyticsData.timeSlotAnalysis.map((slot) => (
                    <div key={slot.time} className="flex items-center space-x-4">
                      <div className="w-16 text-sm font-medium text-gray-900">{slot.time}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
                            <div
                              className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                              style={{width: `${slot.usage}%`}}
                            ></div>
                            <div
                              className="absolute top-0 h-3 bg-purple-500 bg-opacity-50 rounded-full transition-all duration-300"
                              style={{width: `${slot.predicted}%`}}
                            ></div>
                          </div>
                          <div className="w-20 text-right">
                            <div className="text-sm font-medium text-gray-900">{slot.usage}%</div>
                            <div className="text-xs text-purple-600">예측: {slot.predicted}%</div>
                          </div>
                          <div className="w-24">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              slot.efficiency === 'very_high' ? 'bg-green-100 text-green-800' :
                              slot.efficiency === 'high' ? 'bg-blue-100 text-blue-800' :
                              slot.efficiency === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {slot.efficiency === 'very_high' ? '매우높음' :
                               slot.efficiency === 'high' ? '높음' :
                               slot.efficiency === 'medium' ? '보통' : '낮음'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI 자동화 작업 모니터링 */}
            <div className="bg-white rounded-xl shadow-sm mb-8">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">AI 자동화 작업 모니터링</h2>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 cursor-pointer whitespace-nowrap text-sm">
                    <i className="ri-play-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                    새 작업 실행
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {automationTasks.map((task) => (
                    <div key={task.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-medium text-gray-900">{task.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                          {task.status === 'active' ? '활성' :
                           task.status === 'running' ? '실행중' :
                           task.status === 'paused' ? '일시정지' : '오류'}
                        </span>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">처리 완료:</span>
                          <span className="font-medium">{task.processed}건</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">정확도:</span>
                          <span className="font-medium text-green-600">{task.accuracy}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">마지막 실행:</span>
                          <span className="text-xs text-gray-500">{task.lastRun}</span>
                        </div>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            task.status === 'active' ? 'bg-green-500' :
                            task.status === 'running' ? 'bg-blue-500 animate-pulse' :
                            task.status === 'paused' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{width: `${task.accuracy}%`}}
                        ></div>
                      </div>

                      <div className="flex space-x-2">
                        <button className="flex-1 text-xs bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200 cursor-pointer whitespace-nowrap">
                          상세보기
                        </button>
                        <button className="flex-1 text-xs bg-blue-100 text-blue-700 py-2 rounded hover:bg-blue-200 cursor-pointer whitespace-nowrap">
                          설정
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 주간 트렌드 분석 */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">주간 트렌드 분석</h2>
                <p className="text-sm text-gray-600 mt-1">예약 패턴 및 만족도 예측</p>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {aiAnalyticsData.weeklyTrends.map((day) => (
                    <div key={day.day} className="flex items-center space-x-6">
                      <div className="w-8 text-center">
                        <span className="text-sm font-medium text-gray-900">{day.day}</span>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600">예약수</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-blue-600">{day.bookings}건</span>
                            <span className="text-xs text-purple-600">→ {day.predicted}건</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 relative">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{width: `${(day.bookings / 50) * 100}%`}}
                          ></div>
                          <div
                            className="absolute top-0 h-2 bg-purple-500 bg-opacity-50 rounded-full"
                            style={{width: `${(day.predicted / 50) * 100}%`}}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <i className="ri-star-fill text-yellow-400 w-4 h-4 flex items-center justify-center"></i>
                        <span className="text-sm font-medium text-gray-900">{day.satisfaction}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AdminLayout>
  );
}
