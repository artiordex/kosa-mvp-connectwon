'use client';

import AIChat from '../components/ai/AIChat';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AIViewSection from '../components/home/AIViewSection';
import CTASection from '../components/home/CTASection';
import FeatureSection from '../components/home/FeatureSection';
import HeroSection from '../components/home/HeroSection';
import InsightSection from '../components/home/InsightSection';
import PartnerSlideSection from '../components/home/PartnerSlideSection';
import ProgramSection from '../components/home/ProgramSection';
import QuickAccessSection from '../components/home/QuickMenuSection';
import RoomSection from '../components/home/RoomSection';
import QuickFab from '../components/QuickFab';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 헤더 */}
      <Header />
      <main className="flex-grow">
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
        {/* Partner Slide 섹션 */}
        <PartnerSlideSection />
        {/* AI Assistant 섹션 */}
        <AIChat />
        {/* QuickFab 섹션 */}
        <QuickFab />
      </main>
      {/* 푸터 */}
      <Footer />
    </div>
  );
}
