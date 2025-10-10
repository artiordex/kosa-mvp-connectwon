/**
 * Description : page.tsx - 📌 ConnectWon 관리자 로그인 페이지
 * Author : Shiwoo Min
 * Date : 2025-10-11
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  // 더미 관리자 계정
  const MOCK_ADMIN = {
    id: 1,
    email: 'admin@connectwon.com',
    password: 'connectwon123!',
    name: '민시우',
    role: 'Administrator',
    role_flags: 0,
    phone: '010-0000-0000',
    image_url: '/images/avatar.png',
    preferences: { theme: 'dark', language: 'ko' },
    created_at: '2025-10-09T14:32:15Z',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('로그인 시도:', { email, password });

    // 간단한 더미 인증 로직
    if (email === MOCK_ADMIN.email && password === MOCK_ADMIN.password) {
      console.log('로그인 성공');
      setError(null);

      // 인증 상태 저장
      localStorage.setItem('connectwon_admin_auth', 'true');

      // 사용자 프로필 정보 저장
      const userProfile = {
        id: MOCK_ADMIN.id,
        name: MOCK_ADMIN.name,
        email: MOCK_ADMIN.email,
        role: MOCK_ADMIN.role,
        role_flags: MOCK_ADMIN.role_flags,
        phone: MOCK_ADMIN.phone,
        image_url: MOCK_ADMIN.image_url,
        preferences: MOCK_ADMIN.preferences,
        created_at: MOCK_ADMIN.created_at,
        updated_at: new Date().toISOString(),
      };

      localStorage.setItem('connectwon_profile', JSON.stringify(userProfile));

      // 대시보드로 이동
      router.push('/dashboard');
    } else {
      console.log('로그인 실패');
      setError('이메일 또는 비밀번호가 잘못되었습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">관리자 로그인</h2>
          <p className="mt-2 text-sm text-gray-600">관리자 계정으로 로그인하세요</p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* 이메일 */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                이메일 주소
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="admin@connectwon.com"
                />
              </div>
            </div>

            {/* 비밀번호 */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                비밀번호
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="비밀번호를 입력하세요"
                />
              </div>
            </div>

            {/* 오류 메시지 */}
            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md p-2">
                {error}
              </p>
            )}

            {/* 로그인 상태 유지 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  로그인 상태 유지
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  비밀번호를 잊으셨나요?
                </a>
              </div>
            </div>

            {/* 버튼 */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                로그인
              </button>
            </div>
          </form>

          {/* 개발용 힌트 */}
          <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-xs text-blue-800 font-medium">💡 개발용 계정 정보</p>
            <p className="text-xs text-blue-600 mt-1">
              이메일: admin@connectwon.com<br />
              비밀번호: connectwon123!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
