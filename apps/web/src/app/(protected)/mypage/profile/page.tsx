/**
 * Description : profile/page.tsx - 📌 프로필 설정 페이지
 * Author : Shiwoo Min
 * Date : 2025-10-12
 */

'use client';

import { useState, useRef } from 'react';
import mypageData from 'data/mypage-with-user.json';

export default function ProfilePage() {
  const { user } = mypageData;
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    bio: user.bio || '',
    interests: user.interests || [],
    profileImage: user.profileImage,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

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

  // 이미지 변경 버튼 클릭
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // 이미지 파일 선택 시
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 크기 체크 (5MB 제한)
    if (file.size > 5 * 1024 * 1024) {
      alert('파일 크기는 5MB 이하여야 합니다.');
      return;
    }

    // 파일 타입 체크
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    // 미리보기 이미지 생성
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreviewImage(result);
      setFormData(prev => ({ ...prev, profileImage: result }));
    };
    reader.readAsDataURL(file);
  };

  // 이미지 제거
  const handleImageRemove = () => {
    setPreviewImage(null);
    setFormData(prev => ({ ...prev, profileImage: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updated profile:', formData);
    alert('프로필이 업데이트되었습니다!');
  };

  // 현재 표시할 이미지 결정
  const displayImage = previewImage || formData.profileImage;

  return (
    <form onSubmit={handleSubmit}>
      {/* 하나의 큰 카드로 통합 */}
      <div className="bg-white rounded-xl shadow-sm p-8 space-y-10">

        {/* 기본 정보 섹션 */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
            기본 정보
          </h2>

          {/* 프로필 이미지 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              프로필 이미지
            </label>
            <div className="flex items-center space-x-4">
              <div className="relative w-20 h-20 bg-blue-100 rounded-full overflow-hidden group cursor-pointer" onClick={handleImageClick}>
                {displayImage ? (
                  <img
                    src={displayImage}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <i className="ri-user-line text-3xl text-blue-600"></i>
                  </div>
                )}

                {/* 호버 시 오버레이 */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <i className="ri-camera-line text-white text-2xl"></i>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleImageClick}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  이미지 변경
                </button>

                {displayImage && (
                  <button
                    type="button"
                    onClick={handleImageRemove}
                    className="px-4 py-2 border border-red-300 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                  >
                    제거
                  </button>
                )}
              </div>

              {/* 숨겨진 파일 입력 */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              JPG, PNG, GIF 형식 지원 (최대 5MB)
            </p>
          </div>

          {/* 이름, 전화번호 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* 이름 */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                이름
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* 전화번호 */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                전화번호
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {user.phoneVerified && (
                <p className="text-xs text-gray-500 mt-1 flex items-center">
                  <i className="ri-checkbox-circle-fill text-green-500 mr-1"></i>
                  전화번호 인증 완료
                </p>
              )}
            </div>
          </div>

          {/* 이메일 */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              이메일
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {user.emailVerified && (
              <p className="text-xs text-gray-500 mt-1 flex items-center">
                <i className="ri-checkbox-circle-fill text-green-500 mr-1"></i>
                이메일 인증 완료
              </p>
            )}
          </div>

          {/* 자기소개 */}
          <div className="mb-6">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
              자기소개
            </label>
            <textarea
              id="bio"
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              maxLength={500}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="자신을 소개해주세요"
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.bio.length} / 500자
            </p>
          </div>

          {/* 위치 정보 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              위치
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                value={user.location.city}
                readOnly
                className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
              <input
                type="text"
                value={user.location.district}
                readOnly
                className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
            </div>
          </div>
        </div>

        {/* 관심 분야 섹션 */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 pb-3 border-b border-gray-200">
            관심 분야
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            관심 있는 분야를 선택하면 맞춤형 프로그램을 추천받을 수 있습니다
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
        {/* 제출 버튼 */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            취소
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            저장하기
          </button>
        </div>

      </div>
    </form>
  );
}
