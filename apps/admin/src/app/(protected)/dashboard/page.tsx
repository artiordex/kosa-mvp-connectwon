/**
 * Description : page.tsx - 📌 ConnectWon 통합 대시보드 페이지
 * Author : Shiwoo Min
 * Date : 2025-10-11
 */
'use client';

import { useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Funnel,
  FunnelChart,
  LabelList,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type DashboardTab = 'ai' | 'analytics';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('ai');
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">통합 대시보드</h1>
          <p className="text-gray-600 mt-1">실시간 데이터 모니터링 및 AI 기반 분석 결과를 확인하세요</p>
        </div>

        {/* 탭 선택 */}
        <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('ai')}
            className={`px-6 py-2 rounded-md font-medium transition-all ${
              activeTab === 'ai'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <i className="ri-brain-line mr-2"></i>
            AI 대시보드
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-2 rounded-md font-medium transition-all ${
              activeTab === 'analytics'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <i className="ri-bar-chart-line mr-2"></i>
            통계 분석
          </button>
        </div>
      </div>

      {/* 탭 컨텐츠 */}
      {activeTab === 'ai' ? <AIDashboard selectedPeriod={selectedPeriod} setSelectedPeriod={setSelectedPeriod} /> : <AnalyticsDashboard />}
    </div>
  );
}

/* ==================== AI 대시보드 ==================== */
function AIDashboard({ selectedPeriod, setSelectedPeriod }: { selectedPeriod: string; setSelectedPeriod: (p: string) => void }) {
  const stats = {
    totalUsers: 1234,
    activeReservations: 45,
    todayRevenue: 2850000,
    systemHealth: 98,
    aiProcessingJobs: 12,
    pendingApprovals: 8,
  };

  const aiProcessing = [
    { task: '자동 예약 승인', count: 23, time: '5분 전' },
    { task: '감정 분석 완료', count: 15, time: '12분 전' },
    { task: '사용량 예측 업데이트', count: 1, time: '1시간 전' },
  ];

  const systemAlerts = [
    { type: 'warning', message: 'A홀 사용률 90% 초과', time: '방금 전' },
    { type: 'info', message: 'AI 모델 업데이트 완료', time: '30분 전' },
    { type: 'success', message: '예약 자동 승인 8건 처리', time: '1시간 전' },
  ];

  return (
    <>
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

      {/* 실시간 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <StatCard title="총 사용자" value={stats.totalUsers.toLocaleString()} change="+5% 증가" color="blue" />
        <StatCard title="활성 예약" value={stats.activeReservations} change="실시간" color="green" />
        <StatCard title="오늘 수익" value={`₩${(stats.todayRevenue / 1000000).toFixed(1)}M`} change="+12% 증가" color="purple" />
        <StatCard title="시스템 상태" value={`${stats.systemHealth}%`} change="정상 운영" color="orange" />
        <StatCard title="AI 처리 작업" value={stats.aiProcessingJobs} change="진행 중" color="teal" />
        <StatCard title="승인 대기" value={stats.pendingApprovals} change="처리 필요" color="red" />
      </div>

      {/* AI 분석 섹션 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SentimentAnalysis />
        <PredictionAnalysis />
      </div>

      {/* 시간대별 효율성 */}
      <TimeSlotEfficiency />

      {/* AI 자동화 작업 모니터링 */}
      <AutomationTasks />

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
    </>
  );
}

/* ==================== 통계 분석 대시보드 ==================== */
function AnalyticsDashboard() {
  const monthlyProgramData = [
    { month: '1월', 프로그램: 12, 세션: 45 },
    { month: '2월', 프로그램: 15, 세션: 52 },
    { month: '3월', 프로그램: 18, 세션: 61 },
    { month: '4월', 프로그램: 14, 세션: 55 },
    { month: '5월', 프로그램: 20, 세션: 78 },
    { month: '6월', 프로그램: 22, 세션: 85 },
  ];

  const participantTrendData = [
    { month: '1월', 참가자: 120 },
    { month: '2월', 참가자: 145 },
    { month: '3월', 참가자: 168 },
    { month: '4월', 참가자: 152 },
    { month: '5월', 참가자: 195 },
    { month: '6월', 참가자: 218 },
  ];

  const roomBookingData = [
    { room: '회의실A', 예약수: 85, 가용률: 75 },
    { room: '회의실B', 예약수: 72, 가용률: 65 },
    { room: '세미나실', 예약수: 95, 가용률: 88 },
    { room: '강당', 예약수: 45, 가용률: 55 },
    { room: '스튜디오', 예약수: 68, 가용률: 70 },
  ];

  const sessionStatusData = [
    { name: 'SCHEDULED', value: 35 },
    { name: 'CONFIRMED', value: 45 },
    { name: 'COMPLETED', value: 15 },
    { name: 'CANCELLED', value: 5 },
  ];

  const participantStatusData = [
    { name: 'CONFIRMED', value: 65 },
    { name: 'APPLIED', value: 20 },
    { name: 'CANCELLED', value: 10 },
    { name: 'NO_SHOW', value: 5 },
  ];

  const categoryRatingData = [
    { category: '요가', rating: 4.5, fullMark: 5 },
    { category: '필라테스', rating: 4.2, fullMark: 5 },
    { category: '수영', rating: 4.7, fullMark: 5 },
    { category: '헬스', rating: 4.0, fullMark: 5 },
    { category: '댄스', rating: 4.3, fullMark: 5 },
    { category: '요리', rating: 4.6, fullMark: 5 },
  ];

  const conversionFunnelData = [
    { stage: '방문자', value: 1000, fill: '#3b82f6' },
    { stage: '회원가입', value: 650, fill: '#8b5cf6' },
    { stage: '프로그램 조회', value: 480, fill: '#ec4899' },
    { stage: '세션 신청', value: 320, fill: '#f59e0b' },
    { stage: '참가 완료', value: 285, fill: '#10b981' },
  ];

  const deviceStatusData = [
    { device: '노트북', AVAILABLE: 15, IN_USE: 8, MAINTENANCE: 2 },
    { device: '프로젝터', AVAILABLE: 8, IN_USE: 4, MAINTENANCE: 1 },
    { device: '카메라', AVAILABLE: 12, IN_USE: 6, MAINTENANCE: 0 },
    { device: '마이크', AVAILABLE: 20, IN_USE: 10, MAINTENANCE: 3 },
  ];

  const roomUtilizationData = [
    { room: '회의실A', utilization: 85 },
    { room: '회의실B', utilization: 72 },
    { room: '세미나실', utilization: 95 },
    { room: '강당', utilization: 58 },
    { room: '스튜디오', utilization: 78 },
  ];

  const aiUsageData = [
    { hour: '00:00', calls: 12 },
    { hour: '04:00', calls: 8 },
    { hour: '08:00', calls: 25 },
    { hour: '12:00', calls: 45 },
    { hour: '16:00', calls: 38 },
    { hour: '20:00', calls: 28 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  return (
    <>
      {/* Row 1: Line Chart & Area Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">월별 프로그램/세션 생성 추이</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyProgramData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="프로그램" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="세션" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">월별 참가자 수 추이</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={participantTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="참가자" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 2: Bar Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">룸별 예약 현황</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={roomBookingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="room" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="예약수" fill="#3b82f6" />
              <Bar dataKey="가용률" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">디바이스 상태별 현황</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={deviceStatusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="device" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="AVAILABLE" stackId="a" fill="#10b981" />
              <Bar dataKey="IN_USE" stackId="a" fill="#f59e0b" />
              <Bar dataKey="MAINTENANCE" stackId="a" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 3: Pie Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">세션 상태 분포</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sessionStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {sessionStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">참가자 상태 분포</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={participantStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                labelLine={false}
                label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                fill="#8884d8"
                dataKey="value"
              >
                {participantStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 4: Radar & Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">카테고리별 평균 평점</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={categoryRatingData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="category" />
              <PolarRadiusAxis angle={90} domain={[0, 5]} />
              <Radar name="평점" dataKey="rating" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">사용자 전환 퍼널</h3>
          <ResponsiveContainer width="100%" height={300}>
            <FunnelChart>
              <Tooltip />
              <Funnel dataKey="value" data={conversionFunnelData} isAnimationActive>
                <LabelList position="right" fill="#000" stroke="none" dataKey="stage" />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 5: Progress & Sparkline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">룸별 사용률</h3>
          <div className="space-y-4">
            {roomUtilizationData.map(room => (
              <div key={room.room}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{room.room}</span>
                  <span className="text-sm font-medium text-gray-700">{room.utilization}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full transition-all" style={{ width: `${room.utilization}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI 사용량 추이 (시간별)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={aiUsageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="calls" stroke="#ec4899" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

/* ==================== 공통 컴포넌트 ==================== */

// 통계 카드
function StatCard({ title, value, change, color }: { title: string; value: string | number; change: string; color: string }) {
  const colorMap: Record<string, string> = {
    blue: 'from-blue-600 to-blue-700 text-blue-100',
    green: 'from-green-600 to-green-700 text-green-100',
    purple: 'from-purple-600 to-purple-700 text-purple-100',
    orange: 'from-orange-600 to-orange-700 text-orange-100',
    teal: 'from-teal-600 to-teal-700 text-teal-100',
    red: 'from-red-600 to-red-700 text-red-100',
  };

  return (
    <div className={`bg-gradient-to-br ${colorMap[color]} rounded-xl p-6 text-white shadow-lg`}>
      <p className="text-sm opacity-90">{title}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
      <p className="text-xs mt-2 opacity-90">{change}</p>
    </div>
  );
}

// AI 감정 분석
function SentimentAnalysis() {
  const sentiment = { positive: 78, neutral: 15, negative: 7 };

  return (
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
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-48 h-48">
            <div
              className="w-full h-full rounded-full relative"
              style={{
                background: `conic-gradient(
                  #10b981 0deg ${sentiment.positive * 3.6}deg,
                  #f59e0b ${sentiment.positive * 3.6}deg ${(sentiment.positive + sentiment.neutral) * 3.6}deg,
                  #ef4444 ${(sentiment.positive + sentiment.neutral) * 3.6}deg 360deg
                )`,
              }}
            >
              <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{sentiment.positive}%</div>
                  <div className="text-sm text-gray-600">긍정적 반응</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-700">긍정적 반응</span>
            </div>
            <span className="text-sm font-medium text-gray-900">{sentiment.positive}%</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-700">중립적 반응</span>
            </div>
            <span className="text-sm font-medium text-gray-900">{sentiment.neutral}%</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-700">부정적 반응</span>
            </div>
            <span className="text-sm font-medium text-gray-900">{sentiment.negative}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// AI 예측 분석
function PredictionAnalysis() {
  const prediction = {
    nextWeekBookings: 145,
    popularTimeSlot: '14:00-16:00',
    confidence: 89,
  };

  return (
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
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">다음 주 예상 예약</span>
            <span className="text-2xl font-bold text-purple-600">{prediction.nextWeekBookings}건</span>
          </div>
          <div className="text-xs text-gray-500">전월 트렌드 기반 AI 예측 (신뢰도: {prediction.confidence}%)</div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">인기 시간대</span>
            <span className="text-lg font-semibold text-gray-900">{prediction.popularTimeSlot}</span>
          </div>
          <div className="text-xs text-gray-500">사용률 85% 이상 시간대</div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">AI 권장 사항</h4>
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
  );
}

// 시간대별 효율성
function TimeSlotEfficiency() {
  const slots = [
    { time: '09:00-11:00', usage: 45, predicted: 50, trend: 'up' },
    { time: '11:00-13:00', usage: 72, predicted: 78, trend: 'up' },
    { time: '13:00-15:00', usage: 68, predicted: 65, trend: 'down' },
    { time: '15:00-17:00', usage: 85, predicted: 92, trend: 'up' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">시간대별 효율성 분석</h2>
        <p className="text-sm text-gray-600 mt-1">AI가 분석한 최적 운영 시간대 (현재 사용률 vs 예측 사용률)</p>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {slots.map((slot, index) => (
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
  );
}

// AI 자동화 작업 모니터링
function AutomationTasks() {
  const tasks = [
    { id: 1, name: '자동 예약 승인', status: 'active', processed: 156, accuracy: 94 },
    { id: 2, name: '감정 분석 처리', status: 'active', processed: 89, accuracy: 87 },
    { id: 3, name: '사용량 예측', status: 'active', processed: 45, accuracy: 91 },
    { id: 4, name: '알림 자동 발송', status: 'idle', processed: 234, accuracy: 98 },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">AI 자동화 작업 모니터링</h2>
      <div className="space-y-4">
        {tasks.map(t => (
          <div key={t.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-4">
              <div className={`w-3 h-3 rounded-full ${t.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
              <div>
                <div className="font-medium text-gray-900">{t.name}</div>
                <div className="text-sm text-gray-500">{t.status === 'active' ? '실행 중' : '대기 중'}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">처리: {t.processed}건</div>
              <div className="text-sm text-gray-600">정확도: {t.accuracy}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
