
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
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* 로고 및 소개 섹션 - 1.5배 넓게 */}
            <div className="md:col-span-5">
              <div className="flex items-center mb-4">
                <img 
                  src="https://static.readdy.ai/image/e8a01b9affdf7f6133d25eaf5a26fc99/5ce16e7de0992ed214e5895b45d04f13.png" 
                  alt="커넥트원 로고" 
                  className="h-12 w-auto object-contain mr-3"
                />
                <h3 className="text-2xl font-bold font-['Pacifico'] text-white">logo</h3>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                ICT 혁신과 창업을 지원하는 디지털 허브입니다. 
                다양한 프로그램, 최신 디바이스, 그리고 협업 공간을 통해 
                여러분의 아이디어를 현실로 만들어 나가세요.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  <i className="ri-facebook-fill w-8 h-8 flex items-center justify-center text-2xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  <i className="ri-twitter-fill w-8 h-8 flex items-center justify-center text-2xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  <i className="ri-instagram-fill w-8 h-8 flex items-center justify-center text-2xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  <i className="ri-linkedin-fill w-8 h-8 flex items-center justify-center text-2xl"></i>
                </a>
              </div>
            </div>

            {/* 메뉴 섹션 */}
            <div className="md:col-span-2">
              <h4 className="text-lg font-semibold mb-4">메뉴</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                    소개
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
                  <Link href="/news" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                    보도자료
                  </Link>
                </li>
              </ul>
            </div>

            {/* Service 섹션 */}
            <div className="md:col-span-2">
              <h4 className="text-lg font-semibold mb-4">Service</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/programs" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                    프로그램
                  </Link>
                </li>
                <li>
                  <Link href="/rooms" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                    공간 및 디바이스
                  </Link>
                </li>
                <li>
                  <Link href="/reservations" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                    예약하기
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
              <ul className="space-y-3">
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
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-6 mb-4 md:mb-0">
                <button
                  onClick={() => handleTermsClick('terms')}
                  className="text-gray-400 hover:text-white text-sm cursor-pointer"
                >
                  이용약관
                </button>
                <button
                  onClick={() => handleTermsClick('privacy')}
                  className="text-gray-400 hover:text-white text-sm cursor-pointer"
                >
                  개인정보처리방침
                </button>
              </div>
              <p className="text-gray-400 text-sm">
                © 2024 logo. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      <TermsModal 
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
        type={termsModalType}
      />
    </>
  );
}
