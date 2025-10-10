/**
 * Description : page.tsx - 📌 ConnectWon Admin 프로필 수정 페이지
 * Author : Shiwoo Min
 * Date : 2025-10-11
 */
'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProfileEditPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState('/images/avatar.png');

  const [formData, setFormData] = useState({
    name: '민시우',
    email: 'admin@connectwon.com',
    phone: '010-0000-0000',
    theme: 'dark',
    language: 'ko',
  });

  // 기존 프로필 데이터 불러오기
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedProfile = localStorage.getItem('connectwon_profile');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        setFormData({
          name: profile.name || '민시우',
          email: profile.email || 'admin@connectwon.com',
          phone: profile.phone || '010-0000-0000',
          theme: profile.preferences?.theme || 'dark',
          language: profile.preferences?.language || 'ko',
        });
        setPreviewImage(profile.image_url || '/images/avatar.png');
      }
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // 수정된 프로필 데이터 저장
    const updatedProfile = {
      id: 1,
      name: formData.name,
      email: formData.email,
      role: 'Administrator',
      role_flags: 0,
      phone: formData.phone,
      image_url: previewImage,
      preferences: {
        theme: formData.theme,
        language: formData.language,
      },
      updated_at: new Date().toISOString(),
    };

    localStorage.setItem('connectwon_profile', JSON.stringify(updatedProfile));

    // 저장 완료 시뮬레이션
    setTimeout(() => {
      setIsLoading(false);
      alert('프로필이 성공적으로 수정되었습니다!');
      router.push('/profile');
    }, 1000);
  };

  const handleCancel = () => {
    router.push('/profile');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-xl p-8">
        {/* 제목 */}
        <div className="border-b pb-4 mb-8">
          <h1 className="text-2xl font-bold text-gray-900">프로필 수정</h1>
          <p className="text-sm text-gray-500 mt-1">
            계정 정보와 선호 설정을 변경할 수 있습니다.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 프로필 이미지 */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">프로필 이미지</h3>
            <div className="flex items-center space-x-6">
              <Image
                src={previewImage}
                alt="프로필 미리보기"
                width={96}
                height={96}
                className="rounded-full border aspect-square object-cover"
              />
              <div>
                <label
                  htmlFor="image-upload"
                  className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 cursor-pointer text-sm font-medium"
                >
                  이미지 변경
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <p className="text-xs text-gray-500 mt-2">
                  JPG, PNG 파일만 가능합니다. (최대 5MB)
                </p>
              </div>
            </div>
          </section>

          {/* 기본 정보 */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">기본 정보</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이름 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이메일 <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  전화번호
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="010-0000-0000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
            </div>
          </section>

          {/* 선호 설정 */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">선호 설정</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  테마
                </label>
                <select
                  name="theme"
                  value={formData.theme}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white"
                >
                  <option value="light">라이트 모드</option>
                  <option value="dark">다크 모드</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  언어
                </label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white"
                >
                  <option value="ko">한국어</option>
                  <option value="en">영어</option>
                  <option value="ja">일본어</option>
                  <option value="vi">베트남어</option>
                </select>
              </div>
            </div>
          </section>

          {/* 버튼 */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isLoading}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium disabled:opacity-50"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '저장 중...' : '저장'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
