/**
 * Description : Login.tsx - 📌 이메일/비밀번호 로그인 폼 및 UX 로직 (Mock 계정 포함)
 * Author : Shiwoo Min
 * Date : 2025-10-10
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from 'components/Input';

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    interests: [] as string[],
    notifications: { email: true, sms: false, push: true },
  });

  // mockUser 불러오기
  useEffect(() => {
    const stored = localStorage.getItem('mockUser');
    if (!stored) {
      alert('로그인이 필요합니다.');
      router.push('/login');
      return;
    }

    const parsed = JSON.parse(stored);
    setUser(parsed);
    setFormData(prev => ({
      ...prev,
      name: parsed.name || '',
    }));
  }, [router]);

  // 관심분야 리스트
  const interestsList = [
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
      interests: prev.interests.includes(id)
        ? prev.interests.filter(x => x !== id)
        : [...prev.interests, id],
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      // ✅ mockUser 정보 업데이트 후 저장
      const updatedUser = {
        ...user,
        ...formData,
        onboardingCompleted: true,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem('mockUser', JSON.stringify(updatedUser));
      localStorage.setItem('onboardingCompleted', 'true');
      alert('온보딩이 완료되었습니다.');
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
            {/* 프로필 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden border border-gray-300">
                {user?.picture ? (
                  <img src={user.picture} alt="profile" className="w-full h-full object-cover" />
                ) : (
                  <i className="ri-user-line text-3xl text-gray-400 flex items-center justify-center h-full" />
                )}
              </div>
              <p className="text-gray-700 font-medium">{user?.email}</p>
            </div>

            {/* 닉네임 */}
            <Input
              id="name"
              label="닉네임"
              value={formData.name}
              onChangeAction={v => setFormData(prev => ({ ...prev, name: v as string }))}
            />

            {/* 자기소개 */}
            <Input
              id="bio"
              label="자기소개"
              textarea
              value={formData.bio}
              onChangeAction={v => setFormData(prev => ({ ...prev, bio: v as string }))}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-fade-up">
            <p className="text-gray-600 text-center">관심 있는 분야를 선택해주세요.</p>
            <div className="grid grid-cols-2 gap-3">
              {interestsList.map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleInterestToggle(item.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.interests.includes(item.id)
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <i className={`${item.icon} text-2xl block mb-2`} />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4 animate-fade-up">
            <p className="text-gray-600 text-center mb-4">알림 설정을 선택하세요</p>
            {['email', 'push', 'sms'].map(type => (
              <div
                key={type}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border"
              >
                <span className="font-medium capitalize">{type.toUpperCase()} 알림</span>
                <button
                  type="button"
                  onClick={() =>
                    setFormData(prev => ({
                      ...prev,
                      notifications: {
                        ...prev.notifications,
                        [type]: !prev.notifications[type as keyof typeof prev.notifications],
                      },
                    }))
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    formData.notifications[type as keyof typeof formData.notifications]
                      ? 'bg-blue-600'
                      : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform bg-white rounded-full transition-transform ${
                      formData.notifications[type as keyof typeof formData.notifications]
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
          <div className="text-center text-gray-700 animate-fade-up">
            🎉 모든 설정이 완료되었습니다.<br />
            Connectwon과 함께 여정을 시작하세요!
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-card p-8 animate-fade-up max-w-lg mx-auto">
      {/* 진행 표시 */}
      <div className="mb-8 flex justify-between items-center">
        {[1, 2, 3, 4].map(step => (
          <div key={step} className="flex-1 flex flex-col items-center">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                currentStep === step
                  ? 'border-blue-600 text-blue-600'
                  : step < currentStep
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-gray-300 text-gray-400'
              }`}
            >
              {step < currentStep ? '✔' : step}
            </div>
          </div>
        ))}
      </div>

      {renderStep()}

      {/* 버튼 */}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={handlePrev}
          disabled={currentStep === 1}
          className={`px-6 py-3 rounded-lg font-medium ${
            currentStep === 1
              ? 'bg-gray-100 text-gray-400'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          이전
        </button>
        <button
          onClick={handleNext}
          disabled={!isStepValid()}
          className={`px-6 py-3 rounded-lg font-medium ${
            isStepValid()
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {currentStep === 4 ? '완료' : '다음'}
        </button>
      </div>
    </div>
  );
}
