'use client';

import { useState } from 'react';

import PredictionAnalysis from 'components/ai/PredictionAnalysis';
import SentimentAnalysis from 'components/ai/SentimentAnalysis';
import AppShell from 'components/AppShell';
import PeriodFilter from 'components/PeriodFilter';
import RealTimeStats from 'components/RealTimeStats';

export default function AdminPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  return (
    <AppShell>
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
      </div>
    </AppShell>
  );
}

