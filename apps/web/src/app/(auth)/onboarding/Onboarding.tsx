/**
 * Description : Onboarding.tsx - 📌 온보딩 단계별 설정 (Mock 계정 + 이미지 업로더)
 * Author : Shiwoo Min
 * Date : 2025-10-13 (refined)
 */

'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Input from 'components/Input';

type Notifications = {
  email: boolean;
  sms: boolean;
  push: boolean;
};

type MockUser = {
  id: string;
  name: string;
  email: string;
  picture?: string;
  provider?: string;
  bio?: string;
  interests?: string[];
  notifications?: Notifications;
  onboardingCompleted?: boolean;
  updatedAt?: string;
  [k: string]: any;
};

export default function Onboarding() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [user, setUser] = useState<MockUser | null>(null);

    const [formData, setFormData] = useState<{
    name: string;
    bio: string;
    interests: string[];
    notifications: Notifications;
    picture?: string;
  }>({
    name: '',
    bio: '',
    interests: [] as string[],
    notifications: { email: true, sms: false, push: true },
  });


  const [dragOver, setDragOver] = useState(false); // 🖱️ 드래그 시 스타일용

  // 관심분야 리스트
  const interestsList = useMemo(
    () => [
      { id: 'programming', label: '프로그래밍', icon: 'ri-code-line' },
      { id: 'design', label: '디자인', icon: 'ri-palette-line' },
      { id: 'business', label: '비즈니스', icon: 'ri-briefcase-line' },
      { id: 'marketing', label: '마케팅', icon: 'ri-megaphone-line' },
      { id: 'data', label: '데이터 분석', icon: 'ri-bar-chart-line' },
      { id: 'ai', label: '인공지능', icon: 'ri-robot-line' },
      { id: 'startup', label: '스타트업', icon: 'ri-rocket-line' },
      { id: 'education', label: '교육', icon: 'ri-book-line' },
    ],
    []
  );

  // 이미지 → dataURL 변환 유틸
  const fileToDataURL = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => resolve(String(e.target?.result || ''));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  // 드롭/파일선택 핸들러
  const handleImageFile = useCallback(
    async (file?: File | null) => {
      if (!file) return;
      const maxBytes = 2 * 1024 * 1024; // 2MB 제한 (로컬스토리지 부담 완화)
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드할 수 있습니다.');
        return;
      }
      if (file.size > maxBytes) {
        alert('이미지 크기가 2MB를 초과합니다. 조금만 줄여주세요.');
        return;
      }
      const dataURL = await fileToDataURL(file);
      setFormData(prev => ({ ...prev, picture: dataURL })); // 미리보기
    },
    []
  );

  // mockUser 불러오기 & 단계 복원
  useEffect(() => {
    try {
      const raw = localStorage.getItem('mockUser');
      if (!raw) {
        alert('로그인이 필요합니다.');
        router.push('/login');
        return;
      }
      const parsed: MockUser = JSON.parse(raw);
      setUser(parsed);

      setFormData(prev => ({
        ...prev,
        name: parsed.name || '',
        bio: parsed.bio || '',
        interests: (parsed.interests || []) as string[],
        notifications: parsed.notifications || { email: true, sms: false, push: true },
        ...(parsed.picture ? { picture: parsed.picture } : {}),
      }));

      const savedStep = sessionStorage.getItem('onboardingStep');
      if (savedStep) setCurrentStep(Number(savedStep));
    } catch {
      alert('세션을 불러오지 못했습니다. 다시 로그인해주세요.');
      router.push('/login');
    }
  }, [router]);

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
      const next = currentStep + 1;
      setCurrentStep(next);
      sessionStorage.setItem('onboardingStep', String(next)); // 🔸진행 단계 임시 저장
      return;
    }

    // 마지막 단계: mockUser/Users 갱신 + 브로드캐스트 + 메인 이동
    try {
      if (!user) throw new Error('유저 정보가 없습니다.');
      const picture = formData.picture ?? user?.picture;
      // mockUser 업데이트
      const updatedUser: MockUser = {
        ...user!,
        ...formData,
        ...(picture ? { picture } : {}),
        onboardingCompleted: true,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem('mockUser', JSON.stringify(updatedUser));

      // mockUsers 배열에도 반영 (email 또는 id 기준으로 치환)
      const all: MockUser[] = JSON.parse(localStorage.getItem('mockUsers') || '[]');
      const idx = all.findIndex(u => u.email === updatedUser.email || u.id === updatedUser.id);
      if (idx >= 0) {
        all[idx] = { ...all[idx], ...updatedUser };
      } else {
        all.push(updatedUser);
      }
      localStorage.setItem('mockUsers', JSON.stringify(all));

      // 온보딩 플래그
      localStorage.setItem('onboardingCompleted', 'true');
      localStorage.removeItem('onboardingRequired');

      // 같은 탭 컴포넌트들 즉시 갱신 (Header 등)
      window.dispatchEvent(new Event('auth-changed'));

      // 진행 단계 임시 저장 제거
      sessionStorage.removeItem('onboardingStep');

      alert('온보딩이 완료되었습니다.');
      router.replace('/');
    } catch (e) {
      console.error(e);
      alert('온보딩 저장 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      sessionStorage.setItem('onboardingStep', String(prev));
    }
  };

  const isStepValid = () => {
    if (currentStep === 1) return formData.name.trim().length > 0;
    if (currentStep === 2) return formData.interests.length > 0;
    return true;
  };

  // 🧱 “살짝 깨짐” 대응: 컨테이너 폭/반응형, 스텝퍼 선(line), 버튼바 고정 느낌
  const Stepper = () => (
    <div className="mb-8">
      <div className="relative flex items-center justify-between">
        {/* 중간 라인 */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-gray-200" />
        {[1, 2, 3, 4].map(step => {
          const active = currentStep === step;
          const done = step < currentStep;
          return (
            <div key={step} className="relative z-10 flex-1 flex justify-center">
              <div
                className={[
                  'w-10 h-10 min-w-[2.5rem] min-h-[2.5rem] flex items-center justify-center rounded-full border-2 transition-all',
                  active
                    ? 'border-blue-600 text-blue-600 bg-white'
                    : done
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-300 text-gray-400 bg-white',
                ].join(' ')}
              >
                {done ? '✔' : step}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // 🖼️ 이미지 업로드 박스 (드롭 + 클릭 선택)
  const ImageDropZone = () => (
    <div
      className={[
        'w-28 h-28 rounded-full overflow-hidden border',
        dragOver ? 'border-blue-600 ring-4 ring-blue-100' : 'border-gray-300',
      ].join(' ')}
      onDragOver={e => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={async e => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files?.[0];
        await handleImageFile(file);
      }}
    >
      {formData.picture || user?.picture ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={formData.picture || user?.picture}
          alt="profile"
          className="w-full h-full object-cover"
        />
      ) : (
        <label
          htmlFor="file-input"
          className="w-full h-full cursor-pointer flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition"
          title="클릭하여 이미지 선택 또는 드래그 앤 드롭"
        >
          <i className="ri-user-line text-3xl text-gray-400" />
          <span className="mt-1 text-xs text-gray-500">이미지 추가</span>
        </label>
      )}

      <input
        id="file-input"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={async e => {
          const file = e.target.files?.[0] || null;
          await handleImageFile(file);
          // 파일 인풋 값 초기화(같은 파일 재업로드 허용)
          e.currentTarget.value = '';
        }}
      />
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-up">
            {/* 프로필 */}
            <div className="flex flex-col items-center gap-3">
              <ImageDropZone />
              <p className="text-gray-700 text-sm">{user?.email}</p>
              <button
                type="button"
                onClick={() => document.getElementById('file-input')?.click()}
                className="px-3 py-1.5 rounded-md border text-sm bg-white hover:bg-gray-50"
              >
                이미지 선택
              </button>
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
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {interestsList.map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleInterestToggle(item.id)}
                  className={[
                    'p-4 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-200',
                    formData.interests.includes(item.id)
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700',
                  ].join(' ')}
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
            {(['email', 'push', 'sms'] as Array<keyof Notifications>).map(type => (
              <div
                key={type}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border"
              >
                <span className="font-medium uppercase">{type} 알림</span>
                <button
                  type="button"
                  onClick={() =>
                    setFormData(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, [type]: !prev.notifications[type] },
                    }))
                  }
                  className={[
                    'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                    formData.notifications[type] ? 'bg-blue-600' : 'bg-gray-300',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'inline-block h-4 w-4 transform bg-white rounded-full transition-transform',
                      formData.notifications[type] ? 'translate-x-6' : 'translate-x-1',
                    ].join(' ')}
                  />
                </button>
              </div>
            ))}
          </div>
        );

      case 4:
        return (
          <div className="text-center text-gray-700 animate-fade-up">
            🎉 모든 설정이 완료되었습니다.
            <br />
            ConnectWon과 함께 여정을 시작하세요!
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="px-4 sm:px-6">
      <div className="bg-white rounded-xl shadow-card p-6 sm:p-8 animate-fade-up max-w-xl mx-auto">
        {/* 진행 표시 */}
        <Stepper />

        {renderStep()}

        {/* 버튼바: 모바일에서도 깨지지 않도록 여백/정렬 정리 */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className={[
              'px-6 py-3 rounded-lg font-medium transition',
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
            ].join(' ')}
          >
            이전
          </button>
          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className={[
              'px-6 py-3 rounded-lg font-medium transition',
              isStepValid()
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed',
            ].join(' ')}
          >
            {currentStep === 4 ? '완료' : '다음'}
          </button>
        </div>
      </div>
    </div>
  );
}
