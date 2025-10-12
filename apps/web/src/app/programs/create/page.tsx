/**
 * Description : page.tsx - 📌 프로그램 제안 페이지
 * Author : Shiwoo Min
 * Date : 2025-10-11
 */

import ProgramCreatePage from './ProgramCreate';
import ProgramHero from 'src/app/programs/ProgramHero';

export const metadata = {
  title: '프로그램 제안하기 | ConnectWon',
  description: '크리에이터 전용 프로그램 제안 및 등록 페이지입니다.',
};

export default function ProgramCreateMainPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 히어로 섹션 */}
      <section className="pt-24">
        <ProgramHero />
      </section>
      {/* (Program 제안 폼 */}
      <ProgramCreatePage />

      {/* 하단 안내 문구 */}
      <div className="max-w-4xl mx-auto px-6 pb-10 text-center text-sm text-gray-500">
        <p>
          제안하신 프로그램은 관리자의 검토 과정을 거친 후 승인됩니다. <br />
          ConnectWon과 함께 혁신적인 프로그램을 만들어보세요 🚀
        </p>
      </div>
    </div>
  );
}
