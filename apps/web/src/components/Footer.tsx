'use client';

import Link from 'next/link';
import { useState } from 'react';
import TermsModal from './TermsModal';

export default function Footer() {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [termsModalType, setTermsModalType] = useState<'terms' | 'privacy'>('terms');

  const handleTermsClick = (type: 'terms' | 'privacy') => {
    setTermsModalType(type);
    setIsTermsModalOpen(true);
  };

  return (
    <>
      <footer className="bg-web-foreground text-white">
        <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* 로고 및 소개 섹션 - 1.5배 넓게 */}
            <div className="md:col-span-5">
              <div className="flex items-center mb-4">
                <img
                  src="/images/footer_logo.png"
                  alt="커넥트원 로고"
                  className="h-12 w-auto object-contain mr-3"
                />
                <h3 className="text-2xl font-bold font-['Pacifico'] text-white"></h3>
              </div>
              {/* 회사 정보 */}
              <div className="text-sm text-gray-500 opacity-70 space-y-1 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                  <p>커넥트원 (ConnectWon Hub.)</p>
                  <p>대표사: 아티올덱스</p>
                  <p>사업자등록번호: 000-00-00000</p>
                  <p>FAX: 000-0000-0000</p>
                  <p>주소: 경기도 광명시</p>
                </div>
              </div>
              {/* 소셜 섹션 */}
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  <i className="ri-github-fill w-8 h-8 flex items-center justify-center text-2xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  <i className="ri-slack-fill w-8 h-8 flex items-center justify-center text-2xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  <i className="ri-instagram-fill w-8 h-8 flex items-center justify-center text-2xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  <i className="ri-google-fill w-8 h-8 flex items-center justify-center text-2xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  <i className="ri-linkedin-fill w-8 h-8 flex items-center justify-center text-2xl"></i>
                </a>
              </div>
            </div>

            {/* 메뉴 섹션 */}
            <div className="md:col-span-2">
              <h4 className="text-lg font-semibold mb-4">ConnectWon</h4>
              <ul className="space-y-3 mt-5 opacity-70">
                <li>
                  <Link href="/social-value" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                    사회적 가치
                  </Link>
                </li>
                <li>
                  <Link href="/mission" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                    미션 및 비전
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                    팀 소개
                  </Link>
                </li>
                <li>
                  <Link href="/insight" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                    인사이트
                  </Link>
                </li>
              </ul>
            </div>

            {/* Service 섹션 */}
            <div className="md:col-span-2">
              <h4 className="text-lg font-semibold mb-4">Service</h4>
              <ul className="space-y-3 mt-5 opacity-70">
                <li>
                  <Link href="/spaces-and-programs" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                    공간 및 프로그램
                  </Link>
                </li>
                <li>
                  <Link href="/spaces-and-devices" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                    공간 및 디바이스
                  </Link>
                </li>
                <li>
                  <Link href="/creator/apply" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                    크리에이터 신청하기
                  </Link>
                </li>
                <li>
                  <Link href="/guide" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                    이용 가이드
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support 섹션 */}
            <div className="md:col-span-3">
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-3 mt-5 opacity-70">
                <li>
                  <Link href="/faq" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                    자주 묻는 질문
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                    문의하기
                  </Link>
                </li>
                <li>
                  <Link href="/notice" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                    공지사항
                  </Link>
                </li>
                <li>
                  <Link href="/sitemap" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                    사이트맵
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-6 pt-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-6 mb-4 md:mb-0">
                <button onClick={() => handleTermsClick('terms')} className="text-gray-400 hover:text-white text-sm cursor-pointer">
                  이용약관
                </button>
                <button onClick={() => handleTermsClick('privacy')} className="text-gray-400 hover:text-white text-sm cursor-pointer">
                  개인정보처리방침
                </button>
              </div>
              <p className="text-gray-400 text-sm">© 2025 ConnectWon All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      <TermsModal isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)} type={termsModalType} />
    </>
  );
}
