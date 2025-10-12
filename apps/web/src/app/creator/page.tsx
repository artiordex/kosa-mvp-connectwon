
/**
 * Description : page.tsx - 📌 크리에이터 페이지
 * Author : Shiwoo Min
 * Date : 2025-10-10
 */

import CreatorHero from './CreatorHero';
import CreatorSection from './CreatorSection';

export default function CreatorPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="pt-20">
        <CreatorHero />
        <CreatorSection />
      </div>
    </div>
  );
}
