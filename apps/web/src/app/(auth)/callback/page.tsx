'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthCallbackPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // 구글 인증 후 처리 로직 (mock)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // 사용자 정보를 로컬 스토리지에 저장 (실제로는 Supabase Auth 사용)
        const userData = {
          id: '1',
          email: 'artiordex@gmail.com',
          name: '홍길동',
          avatar: '/images/avatar.jpg',
        };
        localStorage.setItem('user', JSON.stringify(userData));

        // 로그인 성공 후 마이페이지로 리다이렉트
        setLoading(false);
        router.push('/mypage');
      } catch (err) {
        setError('로그인 처리 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    handleAuthCallback();
  }, [router]);

  // 에러 화면
  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow bg-gray-50 flex items-center justify-center">
          <div className="max-w-md mx-auto px-4 text-center">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-error-warning-line text-red-600 text-2xl"></i>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">로그인 실패</h1>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={() => router.push('/login')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                다시 시도
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // 로딩 화면
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow bg-gray-50 flex items-center justify-center">
          <div className="max-w-md mx-auto px-4 text-center">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
                <i className="ri-loader-4-line text-blue-600 text-2xl"></i>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">로그인 처리 중...</h1>
              <p className="text-gray-600">잠시만 기다려주세요</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // 성공 시 → redirect 직후이므로 사실상 여기 도달하지 않음
  return null;
}
