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

  // 단계 정의 (아이콘 + 라벨)
  const steps = [
    { id: 1, label: '이용약관 동의', icon: 'ri-file-list-line' },
    { id: 2, label: '가입 정보 입력', icon: 'ri-user-line' },
    { id: 3, label: '관심 분야', icon: 'ri-heart-line' },
    { id: 4, label: '알림 설정', icon: 'ri-notification-line' },
  ];

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

  return (
    <div className="bg-white rounded-xl shadow-web p-8 animate-fade-up">
      {/* 진행 표시기 */}
      <div className="mb-10">
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
                <span className={`mt-2 text-sm ${isActive ? 'text-brand-600 font-semibold' : isCompleted ? 'text-gray-700' : 'text-gray-400'}`}>
                  {step.label}
                </span>

                {/* 연결선 */}
                {idx < steps.length - 1 && (
                  <div className={`absolute top-6 left-1/2 w-full h-[2px] -z-10 ${isCompleted ? 'bg-brand-500' : 'bg-gray-200'}`}></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* TODO: 여기에 각 단계별 화면 renderStep() 추가 */}
      <div className="text-center py-10 text-gray-500">
        <p>Step {currentStep} 화면이 들어갑니다.</p>
      </div>

      {/* 버튼 */}
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
