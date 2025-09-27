'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    birthDate: '',
    gender: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  const [agreedMarketing, setAgreedMarketing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors['name'] = '이름을 입력해주세요';
    if (!formData.email) newErrors['email'] = '이메일을 입력해주세요';
    if (!formData.password) newErrors['password'] = '비밀번호를 입력해주세요';
    if (formData.password !== formData.confirmPassword) newErrors['confirmPassword'] = '비밀번호가 일치하지 않습니다';
    if (!formData.phone) newErrors['phone'] = '휴대폰 번호를 입력해주세요';
    if (!agreedTerms) newErrors['terms'] = '이용약관에 동의해주세요';
    if (!agreedPrivacy) newErrors['privacy'] = '개인정보 처리방침에 동의해주세요';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      console.log('회원가입 시도:', {
        ...formData,
        agreedTerms,
        agreedPrivacy,
        agreedMarketing,
      });
      await new Promise(resolve => setTimeout(resolve, 2000));
      router.push('/login?signup=success');
    } catch (err) {
      setErrors({ submit: '회원가입 실패. 다시 시도해주세요.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = (provider: string) => {
    console.log(`${provider} 회원가입`);
    if (provider === 'Google') router.push('/auth/callback');
  };

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">회원가입</h1>
        <p className="text-gray-600">Connectwon에서 새로운 연결을 시작하세요</p>
      </div>

      {/* 소셜 회원가입 */}
      <div className="space-y-3 mb-6">
        <button
          onClick={() => handleSocialSignup('Naver')}
          className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-600"
        >
          네이버로 가입하기
        </button>
        <button
          onClick={() => handleSocialSignup('Kakao')}
          className="w-full bg-yellow-400 text-gray-900 py-3 px-4 rounded-lg font-medium hover:bg-yellow-500"
        >
          카카오로 가입하기
        </button>
        <button
          onClick={() => handleSocialSignup('Google')}
          className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50"
        >
          구글로 가입하기
        </button>
      </div>

      {/* 구분선 */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">또는</span>
        </div>
      </div>

      {/* 이메일 회원가입 */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors['submit'] && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{errors['submit']}</div>}

        {/* 이름 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">이름 *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
          />
          {errors['name'] && <p className="text-sm text-red-600">{errors['name']}</p>}
        </div>

        {/* 이메일 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">이메일 *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
          />
          {errors['email'] && <p className="text-sm text-red-600">{errors['email']}</p>}
        </div>

        {/* 비밀번호 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">비밀번호 *</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 pr-12 text-sm"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              <i className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
            </button>
          </div>
          {errors['password'] && <p className="text-sm text-red-600">{errors['password']}</p>}
        </div>

        {/* 비밀번호 확인 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">비밀번호 확인 *</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 pr-12 text-sm"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              <i className={showConfirmPassword ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
            </button>
          </div>
          {errors['confirmPassword'] && <p className="text-sm text-red-600">{errors['confirmPassword']}</p>}
        </div>

        {/* 휴대폰 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">휴대폰 번호 *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
          />
          {errors['phone'] && <p className="text-sm text-red-600">{errors['phone']}</p>}
        </div>

        {/* 생년월일 + 성별 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">생년월일</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">성별</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="">선택안함</option>
              <option value="male">남성</option>
              <option value="female">여성</option>
            </select>
          </div>
        </div>

        {/* 약관 */}
        <div className="space-y-2 pt-4 border-t border-gray-200">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={agreedTerms}
              onChange={e => setAgreedTerms(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="text-sm">이용약관 동의 *</span>
            <Link href="/terms" className="text-blue-600 text-sm ml-2">
              보기
            </Link>
          </label>
          {errors['terms'] && <p className="text-sm text-red-600 ml-6">{errors['terms']}</p>}

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={agreedPrivacy}
              onChange={e => setAgreedPrivacy(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="text-sm">개인정보 처리방침 동의 *</span>
            <Link href="/privacy" className="text-blue-600 text-sm ml-2">
              보기
            </Link>
          </label>
          {errors['privacy'] && <p className="text-sm text-red-600 ml-6">{errors['privacy']}</p>}

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={agreedMarketing}
              onChange={e => setAgreedMarketing(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="text-sm">마케팅 정보 수신 동의 (선택)</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 mt-6"
        >
          {loading ? '가입 중...' : '회원가입'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <span className="text-gray-600">이미 계정이 있으신가요? </span>
        <Link href="/login" className="text-blue-600 font-medium hover:text-blue-800">
          로그인
        </Link>
      </div>
    </>
  );
}
