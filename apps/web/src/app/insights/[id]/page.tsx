/**
 * Description : page.tsx - 📌 인사이트 인트리
 * Author : Shiwoo Min
 * Date : 2025-10-10
 */

import InsightDetail from './InsightDetail';
import insightsData from 'data/insights.json';
import InsightsHero from '../InsightsHero';

export async function generateStaticParams() {
  return insightsData.map((insight) => ({
    id: insight.id.toString(),
  }));
}

export default function InsightPage({ params }: { params: { id: string } }) {
  return (
    <>
      {/* 히어로 섹션 */}
      <InsightsHero />

      {/* 상세 컨텐츠 */}
      <InsightDetail insightId={params.id} />
    </>
  );
}
