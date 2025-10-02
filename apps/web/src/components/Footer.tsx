'use client';

import { useState } from 'react';
import Link from 'next/link';
import TermsModal from 'components/TermsModal';

export default function Footer() {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [termsModalType, setTermsModalType] = useState<'terms' | 'privacy'>('terms');

  const handleTermsClick = (type: 'terms' | 'privacy') => {
    setTermsModalType(type);
    setIsTermsModalOpen(true);
  };

  // JSON 형태로 메뉴 정의
  const footerMenus = [
    {
      title: 'ConnectWon',
      links: [
        { href: '/social-value', label: '사회적 가치' },
        { href: '/mission', label: '미션 및 비전' },
        { href: '/team', label: '팀 소개' },
        { href: '/insight', label: '인사이트' },
      ],
      colSpan: 'md:col-span-2',
    },
    {
      title: 'Service',
      links: [
        { href: '/spaces-and-programs', label: '공간 및 프로그램' },
        { href: '/spaces-and-devices', label: '공간 및 디바이스' },
        { href: '/creator/apply', label: '크리에이터 신청하기' },
        { href: '/guide', label: '이용 가이드' },
      ],
      colSpan: 'md:col-span-2',
    },
    {
      title: 'Support',
      links: [
        { href: '/faq', label: '자주 묻는 질문' },
        { href: '/contact', label: '문의하기' },
        { href: '/notice', label: '공지사항' },
        { href: '/sitemap', label: '사이트맵' },
      ],
      colSpan: 'md:col-span-3',
    },
  ];

  // JSON 형태로 소셜 아이콘 정의
  const socialLinks = [
    { href: '#', icon: 'ri-github-fill', label: 'GitHub' },
    { href: '#', icon: 'ri-slack-fill', label: 'Slack' },
    { href: '#', icon: 'ri-instagram-fill', label: 'Instagram' },
    { href: '#', icon: 'ri-google-fill', label: 'Google' },
    { href: '#', icon: 'ri-linkedin-fill', label: 'LinkedIn' },
  ];

  return (
    <>
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* 로고 및 소개 섹션 */}
            <div className="md:col-span-5">
              <div className="flex items-center mb-4">
                <img src="/images/footer_logo.png" alt="커넥트원 로고" className="h-12 w-auto object-contain mr-3" />
                <h3 className="text-2xl font-bold font-['Pacifico'] text-white"></h3>
              </div>
              {/* 회사 정보 */}
              <div className="text-sm text-gray-400 space-y-1 mb-6">
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
                {socialLinks.map(social => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                    aria-label={social.label}
                  >
                    <i className={`${social.icon} text-2xl`}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* JSON으로 뽑아낸 메뉴 섹션 */}
            {footerMenus.map(menu => (
              <div key={menu.title} className={menu.colSpan}>
                <h4 className="text-lg font-semibold mb-4 text-white">{menu.title}</h4>
                <ul className="space-y-3 mt-5">
                  {menu.links.map(link => (
                    <li key={link.href}>
                      <Link href={link.href} className="hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-700 mt-6 pt-4">
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
