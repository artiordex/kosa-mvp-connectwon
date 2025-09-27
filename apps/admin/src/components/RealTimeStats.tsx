'use client';

export default function RealTimeStats() {
  const stats = {
    totalUsers: 1234,
    activeReservations: 45,
    todayRevenue: 2850000,
    systemHealth: 98,
    aiProcessingJobs: 12,
    pendingApprovals: 8,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
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
  );
}
