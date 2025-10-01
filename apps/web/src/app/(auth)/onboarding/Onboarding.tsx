'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    termsAgreed: false,
    interests: [] as string[],
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
  });
  const router = useRouter();

  // 각 단계 + 아이콘
  const steps = [
    { id: 1, label: '이용약관 동의', icon: 'ri-file-list-line' },
    { id: 2, label: '가입 정보 입력', icon: 'ri-user-line' },
    { id: 3, label: '관심 분야', icon: 'ri-heart-line' },
    { id: 4, label: '알림 설정', icon: 'ri-notification-line' },
  ];

  const handleInterestToggle = (interestId: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId) ? prev.interests.filter(id => id !== interestId) : [...prev.interests, interestId],
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      localStorage.setItem('onboardingCompleted', 'true');
      router.push('/mypage');
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.termsAgreed;
      case 2:
        return formData.name.trim() && formData.phone.trim();
      case 3:
        return formData.interests.length > 0;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: // 약관 동의
        return (
          <div className="space-y-6 animate-fade-up">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <i className="ri-file-list-line text-brand-600 text-3xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">약관 동의</h2>
              <p className="text-gray-600">서비스 이용 약관을 확인하고 동의해주세요</p>
            </div>
            <div className="p-4 bg-gray-50 border rounded-lg h-40 overflow-y-auto text-sm text-gray-700">[약관 내용이 여기에 표시됩니다...]</div>
            <label className="flex items-center space-x-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={formData.termsAgreed}
                onChange={e => setFormData(prev => ({ ...prev, termsAgreed: e.target.checked }))}
                className="w-4 h-4 text-brand-600 border-gray-300 rounded"
              />
              <span>약관에 동의합니다</span>
            </label>
          </div>
        );

      case 2: // 가입 정보 입력
        return (
          <div className="space-y-6 animate-fade-up">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <i className="ri-user-line text-brand-600 text-3xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">가입 정보 입력</h2>
              <p className="text-gray-600">서비스 이용을 위한 정보를 입력해주세요</p>
            </div>
            <input
              type="text"
              placeholder="이름"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-500 text-sm"
            />
            <input
              type="tel"
              placeholder="010-0000-0000"
              value={formData.phone}
              onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-500 text-sm"
            />
          </div>
        );

      case 3: // 관심 분야
        const interests = [
          { id: 'programming', label: '프로그래밍', icon: 'ri-code-line' },
          { id: 'design', label: '디자인', icon: 'ri-palette-line' },
          { id: 'business', label: '비즈니스', icon: 'ri-briefcase-line' },
          { id: 'marketing', label: '마케팅', icon: 'ri-megaphone-line' },
          { id: 'data', label: '데이터 분석', icon: 'ri-bar-chart-line' },
          { id: 'ai', label: '인공지능', icon: 'ri-robot-line' },
          { id: 'startup', label: '스타트업', icon: 'ri-rocket-line' },
          { id: 'education', label: '교육', icon: 'ri-book-line' },
        ];
        return (
          <div className="space-y-6 animate-fade-up">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <i className="ri-heart-line text-brand-600 text-3xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">관심 분야</h2>
              <p className="text-gray-600">맞춤형 프로그램을 추천해드립니다</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {interests.map(interest => (
                <button
                  key={interest.id}
                  onClick={() => handleInterestToggle(interest.id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    formData.interests.includes(interest.id)
                      ? 'border-brand-500 bg-brand-50 text-brand-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <i className={`${interest.icon} text-2xl block mb-2 text-center`}></i>
                  <span className="text-sm font-medium">{interest.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 4: // 알림 설정
        return (
          <div className="space-y-6 animate-fade-up">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <i className="ri-notification-line text-brand-600 text-3xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">알림 설정</h2>
              <p className="text-gray-600">원하는 알림 방식을 선택하세요</p>
            </div>
            {['email', 'sms', 'push'].map(type => (
              <div key={type} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border hover:shadow-sm transition">
                <span className="font-medium text-gray-900 capitalize">{type} 알림</span>
                <button
                  onClick={() =>
                    setFormData(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, [type]: !prev.notifications[type as keyof typeof prev.notifications] },
                    }))
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                    formData.notifications[type as keyof typeof formData.notifications] ? 'bg-brand-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.notifications[type as keyof typeof formData.notifications] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-web p-8 animate-fade-up">
      {/* 진행 표시기 */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, idx) => {
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            return (
              <div key={step.id} className="flex-1 flex flex-col items-center relative">
                {/* 아이콘 원 */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-200
                    ${isActive ? 'bg-brand-600 text-white border-brand-600' : isCompleted ? 'bg-brand-500 text-white border-brand-500' : 'bg-white text-gray-400 border-gray-300'}
                  `}
                >
                  {isCompleted ? <i className="ri-check-line text-xl"></i> : <i className={`${step.icon} text-xl`}></i>}
                </div>

                {/* 라벨 */}
                <span className={`mt-2 text-sm ${isActive ? 'text-brand-600 font-semibold' : 'text-gray-500'}`}>{step.label}</span>

                {/* 연결선 */}
                {idx < steps.length - 1 && (
                  <div className={`absolute top-6 left-1/2 w-full h-[2px] -z-10 ${isCompleted ? 'bg-brand-500' : 'bg-gray-200'}`}></div>
                )}
              </div>
            );
          })}
        </div>
        <p className="text-center text-sm text-gray-600 mt-4">
          {currentStep} / {steps.length} 단계
        </p>
      </div>

      {renderStep()}

      {/* 버튼 영역 */}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={handlePrev}
          disabled={currentStep === 1}
          className={`px-6 py-3 rounded-lg font-medium ${
            currentStep === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          이전
        </button>
        <button
          onClick={handleNext}
          disabled={!isStepValid()}
          className={`px-6 py-3 rounded-lg font-medium ${
            isStepValid() ? 'bg-brand-600 text-white hover:bg-brand-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {currentStep === steps.length ? '완료' : '다음'}
        </button>
      </div>
    </div>
  );
}
