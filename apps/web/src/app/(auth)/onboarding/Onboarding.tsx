'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from 'components/Input';


export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    region: '',
    goal: '',
    interests: [] as string[],
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
    profileImage: null as File | null,
    bio: '',
    authCode: '',
    sentCode: '',
  });

  const router = useRouter();

  // 단계 정의
  const steps = [
    { id: 1, label: '프로필 설정', icon: 'ri-user-smile-line' },
    { id: 2, label: '관심 분야', icon: 'ri-heart-line' },
    { id: 3, label: '알림 설정', icon: 'ri-notification-line' },
    { id: 4, label: '추가 정보', icon: 'ri-map-pin-line' },
  ];

  // 관심분야 리스트
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

  const handleInterestToggle = (id: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(id) ? prev.interests.filter(x => x !== id) : [...prev.interests, id],
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) setCurrentStep(prev => prev + 1);
    else {
      localStorage.setItem('onboardingCompleted', 'true');
      router.push('/');
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim().length > 0;
      case 2:
        return formData.interests.length > 0;
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-up">
            {/* 프로필 이미지 업로드 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {formData.profileImage ? (
                  <img src={URL.createObjectURL(formData.profileImage)} alt="프로필 미리보기" className="w-full h-full object-cover" />
                ) : (
                  <i className="ri-user-line text-3xl text-gray-400"></i>
                )}
              </div>
              <label className="cursor-pointer text-sm text-brand font-medium hover:underline">
                프로필 사진 업로드
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                      setFormData(prev => ({ ...prev, profileImage: e.target.files![0] ?? null }));
                    }
                  }}
                />
              </label>
            </div>

            {/* 닉네임 */}
            <Input id="name" label="닉네임" value={formData.name} onChangeAction={v => setFormData(prev => ({ ...prev, name: v as string }))} />

            {/* 자기소개 */}
            <Input
              id="bio"
              label="자기소개"
              value={formData.bio}
              textarea
              onChangeAction={v => setFormData(prev => ({ ...prev, bio: v as string }))}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-fade-up">
            <p className="text-gray-600 text-center">맞춤형 추천을 위해 관심 분야를 선택하세요</p>
            <div className="grid grid-cols-2 gap-3">
              {interests.map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleInterestToggle(item.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.interests.includes(item.id)
                      ? 'border-[#2563eb] bg-[#2563eb]/10 text-[#2563eb]' // 선택됨: 파란 테두리 + 옅은 배경
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <i className={`${item.icon} text-2xl block mb-2 text-center`}></i>
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4 animate-fade-up">
            {[
              { id: 'email', label: 'Email 알림' },
              { id: 'push', label: 'Push 알림' },
              { id: 'sms', label: 'SMS 알림' },
            ].map(item => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border"
              >
                <span className="font-medium text-gray-900">{item.label}</span>
                <button
                  type="button"
                  onClick={() =>
                    setFormData(prev => ({
                      ...prev,
                      notifications: {
                        ...prev.notifications,
                        [item.id]: !prev.notifications[item.id as keyof typeof prev.notifications],
                      },
                    }))
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    formData.notifications[item.id as keyof typeof formData.notifications]
                      ? 'bg-[#2563eb]' // ON일 때 파란색
                      : 'bg-gray-300' // OFF일 때 회색
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.notifications[item.id as keyof typeof formData.notifications]
                        ? 'translate-x-6'
                        : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 animate-fade-up">
            <p className="text-gray-700 text-center font-medium">
              휴대폰 인증을 완료하면 <span className="text-[#2563eb]"><br />
              프로그램 신청</span>과{' '}<span className="text-[#2563eb]">방 예약</span>이 훨씬 간편해집니다
            </p>

            {/* 휴대폰 번호 입력 */}
            <div className="flex gap-3 items-end">
              <Input
                id="phone"
                type="tel"
                label="휴대폰 번호"
                value={formData.phone}
                onChangeAction={v => setFormData(prev => ({ ...prev, phone: v as string }))}
              />
              <button
                type="button"
                className="px-4 py-2 rounded-lg bg-[#2563eb] text-white font-medium hover:bg-[#1d4ed8]"
                onClick={() => {
                  if (!formData.phone) {
                    alert('휴대폰 번호를 입력해주세요!');
                    return;
                  }
                  // 서버 API 대신 가짜 인증번호 발급
                  const fakeCode = '123456';
                  setFormData(prev => ({ ...prev, sentCode: fakeCode }));
                  alert(`인증번호가 발송되었습니다! (테스트용: ${fakeCode})`);
                }}
              >
                인증번호 받기
              </button>
            </div>

            {/* 인증번호 입력 */}
            <div className="flex gap-3 items-end">
              <Input
                id="authCode"
                type="text"
                label="인증번호"
                placeholder="6자리 코드 입력"
                value={formData.authCode}
                onChangeAction={v => setFormData(prev => ({ ...prev, authCode: v as string }))}
              />
              <button
                type="button"
                className="px-4 py-2 rounded-lg bg-[#2563eb] text-white font-medium hover:bg-[#1d4ed8]"
                onClick={() => {
                  if (formData.authCode === formData.sentCode) {
                    alert('휴대폰 인증이 완료되었습니다');
                  } else {
                    alert('인증번호가 올바르지 않습니다');
                  }
                }}
              >
                인증하기
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-card p-8 animate-fade-up">
      {/* 진행 표시기 */}
      <div className="mb-8 flex justify-between items-center">
        {steps.map((step, idx) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          return (
            <div key={step.id} className="flex-1 flex flex-col items-center relative">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-200
                  ${
                    isCompleted
                      ? 'bg-[#2563eb] border-[#2563eb] text-white'
                      : isActive
                        ? 'bg-white border-[#2563eb] text-[#2563eb]'
                        : 'bg-white border-gray-300 text-gray-400'
                  }`}
              >
                <i className={`text-xl ${isCompleted ? 'ri-check-line' : step.icon}`} />
              </div>
              <span
                className={`mt-2 text-sm ${
                  isActive
                    ? 'text-[#2563eb] font-semibold'
                    : isCompleted
                      ? 'text-gray-700'
                      : 'text-gray-500'
                }`}
              >
                {step.label}
              </span>
              {idx < steps.length - 1 && (
                <div
                  className={`absolute top-6 left-1/2 w-full h-[2px] -z-10 ${
                    isCompleted ? 'bg-[#2563eb]' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {renderStep()}

      {/* 버튼 */}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={handlePrev}
          disabled={currentStep === 1}
          className={`px-6 py-3 rounded-lg font-medium ${
            currentStep === 1 ? 'bg-gray-100 text-gray-400' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          이전
        </button>
        <button
          onClick={handleNext}
          disabled={!isStepValid()}
          className={`px-6 py-3 rounded-lg font-medium ${
            isStepValid() ? 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {currentStep === steps.length ? '시작하기' : '다음'}
        </button>
      </div>

      {/* 스킵 버튼 */}
      {currentStep < steps.length && (
        <div className="mt-4 text-center">
          <button type="button" onClick={() => router.push('/')} className="text-sm text-gray-500 hover:underline">
            나중에 설정할래요
          </button>
        </div>
      )}
    </div>
  );
}
