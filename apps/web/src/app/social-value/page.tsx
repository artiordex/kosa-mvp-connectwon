import CTASection from './CTASection';
import EquipmentSpaceSection from './EquipmentSpaceSection';
import ImpactAreas from './ImpactAreas';
import PartnershipsSection from './PartnershipsSection';
import ProgramsSection from './ProgramsSection';
import SocialValueHero from './SocialValueHero';
import ValueIntroduction from './ValueIntroduction';

export default function SocialValuePage() {
  return (
    <div className="bg-white">
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
      {/* CTA 섹션 */}
      <CTASection />
    </div>
  );
}
