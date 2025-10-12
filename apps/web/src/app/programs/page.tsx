/**
 * Description : page.tsx - 📌 프로그램 페이지
 * Author : Shiwoo Min
 * Date : 2025-10-12
 */

'use client';

import Program from './Program';
import ProgramHero from './ProgramHero';
import ProgramProposalSection from './ProgramProposalSection';

export default function ProgramPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 영역만큼 여백 확보 */}
      <div className="pt-20">
        {/* 상단 히어로 */}
        <ProgramHero />

        {/* 프로그램 제안 CTA */}
        <ProgramProposalSection />
        
        {/* 프로그램 목록 섹션 */}
        <Program />
      </div>
    </div>
  );
}
