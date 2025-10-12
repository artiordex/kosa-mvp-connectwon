'use client';

import AIViewSection from 'components/home/AIViewSection';
import CTASection from 'components/home/CTASection';
import FeatureSection from 'components/home/FeatureSection';
import InsightSection from 'components/home/InsightSection';
import HeroSection from 'components/home/MainHeroSection';
import ProgramSection from 'components/home/ProgramSection';
import QuickAccessSection from 'components/home/QuickMenuSection';
import RoomSection from 'components/home/FacilitiesSection';

/* 사용자 페이지 메인 */
export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero 섹션 */}
      <HeroSection />

      {/* Quick Access 섹션 */}
      <QuickAccessSection />

      {/* Feature 섹션 */}
      <FeatureSection />

      {/* AI 활용 섹션 */}
      <AIViewSection />

      {/* 최신 프로그램 소개 섹션 */}
      <ProgramSection />

      {/* 최신 공간 소개 섹션 */}
      <RoomSection />

      {/* 최신 소식 섹션 */}
      <InsightSection />

      {/* Footer CTA 섹션 */}
      <CTASection />
    </div>
  );
}
