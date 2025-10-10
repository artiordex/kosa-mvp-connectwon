'use client';

import React, { useState } from 'react';

const HelpPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const helpCards = [
    {
      id: 1,
      title: '시작 가이드',
      description: 'ConnectWon을 처음 사용하시나요? 기본 설정과 사용 방법을 안내해드립니다.',
      color: 'blue',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: '프로그램 등록',
      description: '새로운 프로그램을 추가하고 관리하는 방법을 배워보세요.',
      color: 'green',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: '예약 관리',
      description: '회원의 예약을 효율적으로 관리하는 팁을 확인하세요.',
      color: 'purple',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      id: 4,
      title: '결제 설정',
      description: '결제 옵션을 설정하고 수강료를 관리하는 방법을 알아보세요.',
      color: 'orange',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      ),
    },
  ];

  const faqs = [
    {
      id: 1,
      question: '프로그램은 어떻게 추가하나요?',
      answer:
        "'프로그램 관리' 메뉴로 이동한 후, 우측 상단의 '프로그램 추가' 버튼을 클릭하세요. 프로그램 이름, 강사, 수강료, 시간 등 필요한 정보를 입력하면 새로운 프로그램이 등록됩니다.",
    },
    {
      id: 2,
      question: '회원 등록은 어떻게 하나요?',
      answer: "'회원 관리' 메뉴에서 '회원 추가' 버튼을 클릭하고, 회원의 기본 정보를 입력하세요. 회원 가입 후에는 프로그램 신청 및 예약이 가능합니다.",
    },
    {
      id: 3,
      question: '진행 중인 프로그램과 완료된 프로그램은 어떻게 구분하나요?',
      answer:
        "프로그램 카드에 표시된 상태 배지로 구분할 수 있습니다. 녹색 '진행 중' 배지는 현재 수강이 가능한 프로그램이고, 회색 '완료' 배지는 종료된 프로그램입니다.",
    },
    {
      id: 4,
      question: '대시보드의 통계는 어떻게 확인하나요?',
      answer: '메인 대시보드 상단에서 총 프로그램 수, 진행 중인 프로그램, 총 수강생, 평균 평점 등의 주요 지표를 한눈에 확인할 수 있습니다.',
    },
    {
      id: 5,
      question: '프로그램 카테고리는 변경할 수 있나요?',
      answer:
        "네, 프로그램 수정 페이지에서 카테고리를 변경할 수 있습니다. '설정' 메뉴에서 새로운 카테고리를 추가하거나 기존 카테고리를 관리할 수도 있습니다.",
    },
  ];

  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
  };

  const toggleFaq = (id: number) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const filteredFaqs = faqs.filter(
    faq => faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">도움말</h1>
          <p className="text-gray-600">ConnectWon 사용 방법과 자주 묻는 질문을 확인하세요</p>
        </div>

        {/* Search Box */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-4 mb-10 flex items-center gap-3 focus-within:border-blue-600 transition-colors">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="궁금한 내용을 검색하세요..."
            className="flex-1 outline-none text-gray-700"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">검색</button>
        </div>

        {/* Help Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {helpCards.map(card => (
            <div
              key={card.id}
              className="bg-white rounded-xl p-6 border border-gray-200 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg hover:border-blue-600"
            >
              <div className={`w-12 h-12 rounded-lg ${colorClasses[card.color]} flex items-center justify-center mb-4`}>{card.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">자주 묻는 질문</h2>
          <div className="space-y-4">
            {filteredFaqs.map(faq => (
              <div key={faq.id} className="border-b border-gray-200 last:border-b-0 pb-5 last:pb-0">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFaq(faq.id)}>
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${activeFaq === faq.id ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {activeFaq === faq.id && <p className="mt-3 text-gray-600 leading-relaxed">{faq.answer}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-10 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">추가 도움이 필요하신가요?</h2>
          <p className="mb-6 opacity-90">문제가 해결되지 않았다면 고객 지원팀에 문의하세요</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:-translate-y-0.5 hover:shadow-lg transition-all">
            문의하기
          </button>
        </div>
      </main>
    </div>
  );
};

export default HelpPage;
