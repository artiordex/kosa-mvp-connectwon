'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    interests: [] as string[],
    notifications: {
      email: true,
      sms: false,
      push: true
    }
  });
  const router = useRouter();

  const totalSteps = 3;

  const interests = [
    { id: 'programming', label: '프로그래밍', icon: 'ri-code-line' },
    { id: 'design', label: '디자인', icon: 'ri-palette-line' },
    { id: 'business', label: '비즈니스', icon: 'ri-briefcase-line' },
    { id: 'marketing', label: '마케팅', icon: 'ri-megaphone-line' },
    { id: 'data', label: '데이터 분석', icon: 'ri-bar-chart-line' },
    { id: 'ai', label: '인공지능', icon: 'ri-robot-line' },
    { id: 'startup', label: '스타트업', icon: 'ri-rocket-line' },
    { id: 'education', label: '교육', icon: 'ri-book-line' }
  ];

  const handleInterestToggle = (interestId: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // 온보딩 완료 후 마이페이지로 이동
      localStorage.setItem('onboardingCompleted', 'true');
      router.push('/mypage');
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-user-line text-blue-600 text-3xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                기본 정보를 입력해주세요
              </h2>
              <p className="text-gray-600">
                서비스 이용을 위한 기본 정보를 수집합니다
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이름 *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="실명을 입력해주세요"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  연락처 *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="010-0000-0000"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-heart-line text-green-600 text-3xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                관심 분야를 선택해주세요
              </h2>
              <p className="text-gray-600">
                맞춤형 프로그램을 추천해드립니다
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {interests.map((interest) => (
                <button
                  key={interest.id}
                  onClick={() => handleInterestToggle(interest.id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                    formData.interests.includes(interest.id)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="text-center">
                    <i className={`${interest.icon} text-2xl mb-2 w-8 h-8 flex items-center justify-center mx-auto`}></i>
                    <span className="text-sm font-medium">{interest.label}</span>
                  </div>
                </button>
              ))}
            </div>

            <p className="text-sm text-gray-500 text-center">
              선택한 관심사: {formData.interests.length}개
            </p>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-notification-line text-purple-600 text-3xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                알림 설정
              </h2>
              <p className="text-gray-600">
                원하는 알림 방식을 선택해주세요
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <i className="ri-mail-line text-blue-600 w-6 h-6 flex items-center justify-center"></i>
                  <div>
                    <h3 className="font-medium text-gray-900">이메일 알림</h3>
                    <p className="text-sm text-gray-600">새로운 프로그램 및 공지사항</p>
                  </div>
                </div>
                <button
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    notifications: { ...prev.notifications, email: !prev.notifications.email }
                  }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                    formData.notifications.email ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.notifications.email ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <i className="ri-message-line text-green-600 w-6 h-6 flex items-center justify-center"></i>
                  <div>
                    <h3 className="font-medium text-gray-900">SMS 알림</h3>
                    <p className="text-sm text-gray-600">예약 확인 및 변경사항</p>
                  </div>
                </div>
                <button
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    notifications: { ...prev.notifications, sms: !prev.notifications.sms }
                  }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                    formData.notifications.sms ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.notifications.sms ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <i className="ri-notification-3-line text-purple-600 w-6 h-6 flex items-center justify-center"></i>
                  <div>
                    <h3 className="font-medium text-gray-900">푸시 알림</h3>
                    <p className="text-sm text-gray-600">실시간 알림 및 업데이트</p>
                  </div>
                </div>
                <button
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    notifications: { ...prev.notifications, push: !prev.notifications.push }
                  }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                    formData.notifications.push ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.notifications.push ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim() && formData.phone.trim();
      case 2:
        return formData.interests.length > 0;
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
        <div className="max-w-lg mx-auto px-4">
          {/* 진행 표시기 */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div key={i} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                      i + 1 <= currentStep
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {i + 1 < currentStep ? (
                      <i className="ri-check-line"></i>
                    ) : (
                      i + 1
                    )}
                  </div>
                  {i < totalSteps - 1 && (
                    <div
                      className={`w-16 h-1 mx-2 ${
                        i + 1 < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-gray-600">
              {currentStep} / {totalSteps} 단계
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            {renderStep()}

            {/* 버튼 */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handlePrev}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                이전
              </button>

              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className={`px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  isStepValid()
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {currentStep === totalSteps ? '완료' : '다음'}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}