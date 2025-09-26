
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={`fixed top-0 w-full shadow-sm z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <img 
                  src="https://static.readdy.ai/image/e8a01b9affdf7f6133d25eaf5a26fc99/5ce16e7de0992ed214e5895b45d04f13.png" 
                  alt="커넥트원 로고" 
                  className="h-16 w-auto object-contain"
                />
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/social-value" className="text-gray-700 hover:text-orange-600 transition-colors">
                사회적가치
              </Link>
              <Link href="/programs" className="text-gray-700 hover:text-orange-600 transition-colors">
                프로그램
              </Link>
              <Link href="/rooms" className="text-gray-700 hover:text-orange-600 transition-colors">
                공간 및 디바이스
              </Link>
              <Link href="/insights" className="text-gray-700 hover:text-orange-600 transition-colors">
                인사이트
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-4">
                <Link href="/login" className="text-gray-700 hover:text-blue-600 cursor-pointer text-xl font-medium">
                  로그인
                </Link>
                <Link
                  href="/signup"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap text-xl font-medium"
                >
                  회원가입
                </Link>
              </div>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 cursor-pointer relative z-60"
              >
                <i className={`${isMenuOpen ? 'ri-close-line' : 'ri-menu-line'} w-10 h-10 flex items-center justify-center text-2xl transition-all duration-300`}></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 풀 네비게이션 오버레이 */}
      <div className={`fixed inset-0 bg-white z-40 transition-all duration-500 ${
        isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div className="h-full flex flex-col">
          {/* 상단 여백 (헤더 높이만큼) */}
          <div className="h-20"></div>
          
          {/* 메인 네비게이션 */}
          <div className="flex-1 flex flex-col justify-center px-8">
            <nav className="max-w-4xl mx-auto w-full">
              <div className="grid md:grid-cols-2 gap-8">
                {/* 주요 메뉴 */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-500 uppercase tracking-wider mb-8">메인 메뉴</h3>
                  
                  <Link 
                    href="/social-value" 
                    onClick={closeMenu}
                    className="group block py-4 border-b border-gray-100 hover:border-blue-600 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                          사회적가치
                        </h4>
                        <p className="text-gray-600 mt-2">우리의 사회적 책임과 가치</p>
                      </div>
                      <i className="ri-arrow-right-line text-2xl text-gray-400 group-hover:text-blue-600 group-hover:translate-x-2 transition-all duration-300"></i>
                    </div>
                  </Link>

                  <Link 
                    href="/programs" 
                    onClick={closeMenu}
                    className="group block py-4 border-b border-gray-100 hover:border-blue-600 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                          프로그램
                        </h4>
                        <p className="text-gray-600 mt-2">다양한 교육 및 체험 프로그램</p>
                      </div>
                      <i className="ri-arrow-right-line text-2xl text-gray-400 group-hover:text-blue-600 group-hover:translate-x-2 transition-all duration-300"></i>
                    </div>
                  </Link>

                  <Link 
                    href="/rooms" 
                    onClick={closeMenu}
                    className="group block py-4 border-b border-gray-100 hover:border-blue-600 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                          공간 및 디바이스
                        </h4>
                        <p className="text-gray-600 mt-2">최첨단 시설과 장비</p>
                      </div>
                      <i className="ri-arrow-right-line text-2xl text-gray-400 group-hover:text-blue-600 group-hover:translate-x-2 transition-all duration-300"></i>
                    </div>
                  </Link>

                  <Link 
                    href="/insights" 
                    onClick={closeMenu}
                    className="group block py-4 border-b border-gray-100 hover:border-blue-600 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                          인사이트
                        </h4>
                        <p className="text-gray-600 mt-2">트렌드와 인사이트</p>
                      </div>
                      <i className="ri-arrow-right-line text-2xl text-gray-400 group-hover:text-blue-600 group-hover:translate-x-2 transition-all duration-300"></i>
                    </div>
                  </Link>
                </div>

                {/* 계정 메뉴 및 추가 정보 */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-500 uppercase tracking-wider mb-8">계정</h3>
                  
                  <div className="space-y-4">
                    <Link 
                      href="/login" 
                      onClick={closeMenu}
                      className="group flex items-center space-x-4 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                    >
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                        <i className="ri-login-circle-line text-blue-600 text-xl"></i>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900">로그인</h4>
                        <p className="text-gray-600">계정으로 로그인하기</p>
                      </div>
                    </Link>

                    <Link 
                      href="/signup" 
                      onClick={closeMenu}
                      className="group flex items-center space-x-4 py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors duration-300"
                    >
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-700 transition-colors duration-300">
                        <i className="ri-user-add-line text-white text-xl"></i>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900">회원가입</h4>
                        <p className="text-gray-600">새 계정 만들기</p>
                      </div>
                    </Link>
                  </div>

                  {/* 연락처 정보 */}
                  <div className="mt-12 p-6 bg-gray-50 rounded-xl">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">문의하기</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <i className="ri-phone-line text-blue-600"></i>
                        <span className="text-gray-700">02-1234-5678</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <i className="ri-mail-line text-blue-600"></i>
                        <span className="text-gray-700">info@connectone.com</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <i className="ri-map-pin-line text-blue-600"></i>
                        <span className="text-gray-700">서울시 강남구 테헤란로</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>

          {/* 하단 소셜 링크 */}
          <div className="px-8 pb-8">
            <div className="max-w-4xl mx-auto flex items-center justify-between border-t border-gray-200 pt-8">
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors duration-300">
                  <i className="ri-facebook-fill text-2xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors duration-300">
                  <i className="ri-instagram-line text-2xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors duration-300">
                  <i className="ri-youtube-line text-2xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors duration-300">
                  <i className="ri-linkedin-fill text-2xl"></i>
                </a>
              </div>
              <p className="text-gray-500 text-sm">© 2024 커넥트원. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
