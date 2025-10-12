/**
 * Description : page.ts - 📌 social-value 엔트리
 * Author : Shiwoo Min
 * Date : 2025-10-10
 */
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
      {/* 프로그램 */}
      <ProgramsSection />
      {/* 파트너십 */}
      <PartnershipsSection />
    </div>
  );
}
