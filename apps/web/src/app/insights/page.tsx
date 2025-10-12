/**
 * Description : page.tsx - 📌 인사이트 엔트리
 * Author : Shiwoo Min
 * Date : 2025-10-10
 */

import InsightsHero from './InsightsHero';
import InsightsContent from './InsightsContent';

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="pt-20">
        <InsightsHero />
        <InsightsContent />
      </div>
    </div>
  );
}
