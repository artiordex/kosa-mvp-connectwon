
import Link from 'next/link';
import Header from '../../components/Header';
import SocialValueHero from './SocialValueHero';
import ValueIntroduction from './ValueIntroduction';
import ImpactAreas from './ImpactAreas';
import ProgramsSection from './ProgramsSection';
import PartnershipsSection from './PartnershipsSection';
import StorySection from './StorySection';
import CTASection from './CTASection';
import EquipmentSpaceSection from './EquipmentSpaceSection';
import Footer from '../../components/Footer';

export default function SocialValuePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <Header />
      
      {/* 히어로 섹션 */}
      <SocialValueHero />
      
      {/* 사회적가치 소개 */}
      <ValueIntroduction />
      
      {/* 가치 영역 */}
      <ImpactAreas />
      
      {/* 장비 및 공간 안내 */}
      <EquipmentSpaceSection />
      
      {/* 프로그램 */}
      <ProgramsSection />
      
      {/* 파트너십 */}
      <PartnershipsSection />
      
      {/* 스토리 */}
      <StorySection />
      
      {/* CTA 섹션 */}
      <CTASection />
      
      {/* 푸터 */}
      <Footer />
    </div>
  );
}
