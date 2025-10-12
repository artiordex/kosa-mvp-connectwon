/**
 * Description : ProgramProposalSection.tsx - 📌 프로그램 제안 섹션 (최적화된 높이 & 오렌지 버튼)
 * Author : Shiwoo Min
 * Date : 2025-10-12
 */

'use client';

import Link from 'next/link';

export default function ProgramProposalSection() {
  return (
    <div className="relative z-20 -mt-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between px-6 py-5 gap-4">
          {/* 왼쪽 텍스트 */}
          <div className="text-center md:text-left flex-1">
            <h2 className="text-base md:text-lg font-bold text-gray-900 flex items-center gap-2">
              <i className="ri-lightbulb-flash-line text-xl text-yellow-500" />
              원하는 프로그램이 없나요?
            </h2>
            <p className="text-sm text-gray-600 mt-1 whitespace-nowrap overflow-hidden text-ellipsis">
              직접 제안하여 새로운 프로그램을 만들어보세요. 관리자가 검토 후 커넥트원에 반영됩니다.
            </p>
          </div>

          {/* 오른쪽 버튼 */}
          <div className="flex justify-end">
            <Link
              href="/programs/create"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors duration-200 shadow-sm">
              <i className="ri-add-line text-lg" />
              프로그램 제안하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
