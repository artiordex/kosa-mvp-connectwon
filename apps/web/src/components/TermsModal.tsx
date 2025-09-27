'use client';

import { useEffect, useState } from 'react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'privacy';
}

export default function TermsModal({ isOpen, onClose, type }: TermsModalProps) {
  const [activeTab, setActiveTab] = useState(type);
  const [content, setContent] = useState<string>('');

  // type 변경될 때마다 fetch
  useEffect(() => {
    setActiveTab(type);
  }, [type]);

  // HTML 불러오기
  useEffect(() => {
    if (!isOpen) return;

    const path = activeTab === 'terms' ? '/policies/terms.html' : '/policies/privacy.html';

    fetch(path)
      .then(res => res.text())
      .then(html => setContent(html))
      .catch(() => setContent('<p>내용을 불러올 수 없습니다.</p>'));
  }, [activeTab, isOpen]);

  // body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('terms')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'terms' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              이용약관
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'privacy' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              개인정보처리방침
            </button>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <i className="ri-close-line w-6 h-6 flex items-center justify-center text-2xl"></i>
          </button>
        </div>

        {/* 내용 */}
        <div className="flex-1 overflow-y-auto p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{activeTab === 'terms' ? '서비스 이용약관' : '개인정보처리방침'}</h2>
          <div className="prose prose-blue max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
        </div>

        {/* 푸터 */}
        <div className="border-t border-gray-200 p-6 flex justify-end">
          <button onClick={onClose} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
