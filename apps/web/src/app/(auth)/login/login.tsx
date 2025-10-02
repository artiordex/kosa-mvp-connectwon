'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SSOLogin from './SSO';
import Input from 'components/Input';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log('로그인 시도:', { email, password });
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/');
    } catch (error) {
      console.error('로그인 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4">
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">로그인</h1>
          <p className="text-gray-600">Connectwon에 다시 오신 걸 환영합니다.</p>
        </div>

        {/* 이메일/비밀번호 로그인 */}
        <form onSubmit={handleSubmit} className="space-y-6 mb-6">
          {/* 이메일 */}
          <Input
            id="email"
            name="email"
            type="email"
            label="이메일"
            value={email}
            onChangeAction={setEmail}
            required
          />

          {/* 비밀번호 */}
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            label="비밀번호"
            value={password}
            onChangeAction={setPassword}
            required
            rightElement={
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-500 hover:text-gray-700">
                <i className={`${showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} w-5 h-5`} />
              </button>
            }
          />

          {/* 옵션 & 링크 */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              <span className="ml-2 text-sm text-gray-600">로그인 상태 유지</span>
            </label>
            <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
              비밀번호 찾기
            </Link>
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        {/* 구분선 + SNS 로그인 */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">또는 SNS 로그인</span>
          </div>
        </div>

        <SSOLogin />

        <div className="mt-6 text-center">
          <span className="text-gray-600">아직 계정이 없으신가요? </span>
          <Link href="/signup" className="text-blue-600 font-medium hover:text-blue-800">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
