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

export default function HelpPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Line Chart - 월별 프로그램/세션 생성 추이
  const monthlyProgramData = [
    { month: '1월', 프로그램: 12, 세션: 45 },
    { month: '2월', 프로그램: 15, 세션: 52 },
    { month: '3월', 프로그램: 18, 세션: 61 },
    { month: '4월', 프로그램: 14, 세션: 55 },
    { month: '5월', 프로그램: 20, 세션: 78 },
    { month: '6월', 프로그램: 22, 세션: 85 },
  ];

  // 2. Area Chart - 참가자 수 추이
  const participantTrendData = [
    { month: '1월', 참가자: 120 },
    { month: '2월', 참가자: 145 },
    { month: '3월', 참가자: 168 },
    { month: '4월', 참가자: 152 },
    { month: '5월', 참가자: 195 },
    { month: '6월', 참가자: 218 },
  ];

  // 3. Bar Chart - 룸별 예약 현황
  const roomBookingData = [
    { room: '회의실A', 예약수: 85, 가용률: 75 },
    { room: '회의실B', 예약수: 72, 가용률: 65 },
    { room: '세미나실', 예약수: 95, 가용률: 88 },
    { room: '강당', 예약수: 45, 가용률: 55 },
    { room: '스튜디오', 예약수: 68, 가용률: 70 },
  ];

  // 4. Pie Chart - 세션 상태 분포
  const sessionStatusData = [
    { name: 'SCHEDULED', value: 35 },
    { name: 'CONFIRMED', value: 45 },
    { name: 'COMPLETED', value: 15 },
    { name: 'CANCELLED', value: 5 },
  ];

  // 5. Donut Chart - 참가자 상태 분포
  const participantStatusData = [
    { name: 'CONFIRMED', value: 65 },
    { name: 'APPLIED', value: 20 },
    { name: 'CANCELLED', value: 10 },
    { name: 'NO_SHOW', value: 5 },
  ];

  // 6. Radar Chart - 카테고리별 평균 평점
  const categoryRatingData = [
    { category: '요가', rating: 4.5, fullMark: 5 },
    { category: '필라테스', rating: 4.2, fullMark: 5 },
    { category: '수영', rating: 4.7, fullMark: 5 },
    { category: '헬스', rating: 4.0, fullMark: 5 },
    { category: '댄스', rating: 4.3, fullMark: 5 },
    { category: '요리', rating: 4.6, fullMark: 5 },
  ];

  // 7. Funnel Chart - 사용자 전환 퍼널
  const conversionFunnelData = [
    { stage: '방문자', value: 1000, fill: '#3b82f6' },
    { stage: '회원가입', value: 650, fill: '#8b5cf6' },
    { stage: '프로그램 조회', value: 480, fill: '#ec4899' },
    { stage: '세션 신청', value: 320, fill: '#f59e0b' },
    { stage: '참가 완료', value: 285, fill: '#10b981' },
  ];

  // 8. Stacked Bar Chart - 디바이스 상태별 현황
  const deviceStatusData = [
    { device: '노트북', AVAILABLE: 15, IN_USE: 8, MAINTENANCE: 2 },
    { device: '프로젝터', AVAILABLE: 8, IN_USE: 4, MAINTENANCE: 1 },
    { device: '카메라', AVAILABLE: 12, IN_USE: 6, MAINTENANCE: 0 },
    { device: '마이크', AVAILABLE: 20, IN_USE: 10, MAINTENANCE: 3 },
  ];

  // 9. Progress/Gauge-style Bar - 룸 사용률
  const roomUtilizationData = [
    { room: '회의실A', utilization: 85 },
    { room: '회의실B', utilization: 72 },
    { room: '세미나실', utilization: 95 },
    { room: '강당', utilization: 58 },
    { room: '스튜디오', utilization: 78 },
  ];

  // 10. Sparkline-style Line Chart - AI 사용량 추이 (시간별)
  const aiUsageData = [
    { hour: '00:00', calls: 12 },
    { hour: '04:00', calls: 8 },
    { hour: '08:00', calls: 25 },
    { hour: '12:00', calls: 45 },
    { hour: '16:00', calls: 38 },
    { hour: '20:00', calls: 28 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  const helpCards = [
    {
      id: 1,
      title: '시작 가이드',
      description: 'ConnectWon을 처음 사용하시나요? 기본 설정과 사용 방법을 안내해드립니다.',
      color: 'blue',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: '프로그램 등록',
      description: '새로운 프로그램을 추가하고 관리하는 방법을 배워보세요.',
      color: 'green',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: '예약 관리',
      description: '회원의 예약을 효율적으로 관리하는 팁을 확인하세요.',
      color: 'purple',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      id: 4,
      title: '결제 설정',
      description: '결제 옵션을 설정하고 수강료를 관리하는 방법을 알아보세요.',
      color: 'orange',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      ),
    },
  ];

  const faqs = [
    {
      id: 1,
      question: '프로그램은 어떻게 추가하나요?',
      answer:
        "'프로그램 관리' 메뉴로 이동한 후, 우측 상단의 '프로그램 추가' 버튼을 클릭하세요. 프로그램 이름, 강사, 수강료, 시간 등 필요한 정보를 입력하면 새로운 프로그램이 등록됩니다.",
    },
    {
      id: 2,
      question: '회원 등록은 어떻게 하나요?',
      answer: "'회원 관리' 메뉴에서 '회원 추가' 버튼을 클릭하고, 회원의 기본 정보를 입력하세요. 회원 가입 후에는 프로그램 신청 및 예약이 가능합니다.",
    },
    {
      id: 3,
      question: '진행 중인 프로그램과 완료된 프로그램은 어떻게 구분하나요?',
      answer:
        "프로그램 카드에 표시된 상태 배지로 구분할 수 있습니다. 녹색 '진행 중' 배지는 현재 수강이 가능한 프로그램이고, 회색 '완료' 배지는 종료된 프로그램입니다.",
    },
    {
      id: 4,
      question: '대시보드의 통계는 어떻게 확인하나요?',
      answer: '메인 대시보드 상단에서 총 프로그램 수, 진행 중인 프로그램, 총 수강생, 평균 평점 등의 주요 지표를 한눈에 확인할 수 있습니다.',
    },
    {
      id: 5,
      question: '프로그램 카테고리는 변경할 수 있나요?',
      answer:
        "네, 프로그램 수정 페이지에서 카테고리를 변경할 수 있습니다. '설정' 메뉴에서 새로운 카테고리를 추가하거나 기존 카테고리를 관리할 수도 있습니다.",
    },
  ];

  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
  };

  const toggleFaq = (id: number) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const filteredFaqs = faqs.filter(
    faq => faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">통계 대시보드</h1>
        <p className="text-gray-600 mt-1">ConnectWon 사용 방법과 자주 묻는 질문을 확인하세요</p>
      </div>

      {/* Search Box */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-4 flex items-center gap-3 focus-within:border-blue-600 transition-colors">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="궁금한 내용을 검색하세요..."
          className="flex-1 outline-none text-gray-700"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">검색</button>
      </div>

      {/* Help Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {helpCards.map(card => (
          <div
            key={card.id}
            className="bg-white rounded-xl p-6 border border-gray-200 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg hover:border-blue-600"
          >
            <div className={`w-12 h-12 rounded-lg ${colorClasses[card.color]} flex items-center justify-center mb-4`}>{card.icon}</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{card.description}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">통계 및 분석</h2>

        {/* Row 1: Line Chart & Area Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* 1. Line Chart - 프로그램/세션 추이 */}
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

          {/* 2. Area Chart - 참가자 추이 */}
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

        {/* Row 2: Bar Chart & Stacked Bar Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* 3. Bar Chart - 룸별 예약 현황 */}
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

          {/* 8. Stacked Bar Chart - 디바이스 상태 */}
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

        {/* Row 3: Pie Chart & Donut Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* 4. Pie Chart - 세션 상태 분포 */}
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

          {/* 5. Donut Chart - 참가자 상태 분포 */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">참가자 상태 분포</h3>
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
                  {participantStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Row 4: Radar Chart & Funnel Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* 6. Radar Chart - 카테고리별 평점 */}
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

          {/* 7. Funnel Chart - 전환율 */}
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

        {/* Row 5: Progress Bars & Sparkline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* 9. Progress Bar - 룸 사용률 */}
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

          {/* 10. Sparkline - AI 사용량 */}
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
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-xl p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">자주 묻는 질문</h2>
        <div className="space-y-4">
          {filteredFaqs.map(faq => (
            <div key={faq.id} className="border-b border-gray-200 last:border-b-0 pb-5 last:pb-0">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFaq(faq.id)}>
                <span className="font-semibold text-gray-900">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${activeFaq === faq.id ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {activeFaq === faq.id && <p className="mt-3 text-gray-600 leading-relaxed">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-10 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">추가 도움이 필요하신가요?</h2>
        <p className="mb-6 opacity-90">문제가 해결되지 않았다면 고객 지원팀에 문의하세요</p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:-translate-y-0.5 hover:shadow-lg transition-all">
          문의하기
        </button>
      </div>
    </div>
  );
}
