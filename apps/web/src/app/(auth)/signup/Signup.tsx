'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SSOSignup from '../login/SSO';
import Input from 'components/Input';
import TermsModal from 'components/TermsModal';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    birthDate: null as Date | null,
    gender: '',
  });

  const [emailVerified, setEmailVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [sentCode, setSentCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  const [agreedMarketing, setAgreedMarketing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState<null | 'terms' | 'privacy'>(null);

  const router = useRouter();

  // 이메일 인증번호 발송 (Mock)
  const handleSendCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setSentCode(code);
    alert(`인증번호 발송됨 (테스트용: ${code})`);
  };

  // 인증번호 확인 (Mock)
  const handleVerifyCode = () => {
    if (verificationCode === sentCode) {
      setEmailVerified(true);
      alert('이메일 인증 완료!');
    } else {
      alert('인증번호가 일치하지 않습니다.');
    }
  };

  // 회원가입 Mock 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 간단한 유효성 검사
      if (!emailVerified) {
        alert('이메일 인증을 완료해주세요.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }
      if (!agreedTerms || !agreedPrivacy) {
        alert('필수 약관에 동의해주세요.');
        return;
      }

      // 기존 유저 목록 확인
      const users = JSON.parse(localStorage.getItem('mockUsers') || '[]');
      if (users.some((u: any) => u.email === formData.email)) {
        alert('이미 가입된 이메일입니다.');
        return;
      }

      // 새 유저 생성
      const newUser = {
        id: `mock-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        birthDate: formData.birthDate,
        gender: formData.gender,
        provider: 'local',
        picture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(formData.name || 'user')}`,
        agreed: {
          terms: agreedTerms,
          privacy: agreedPrivacy,
          marketing: agreedMarketing,
        },
        createdAt: new Date().toISOString(),
      };

      // localStorage 저장
      localStorage.setItem('mockUsers', JSON.stringify([...users, newUser]));
      localStorage.setItem('mockUser', JSON.stringify(newUser)); // 자동 로그인

      // UX용 딜레이
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(`${newUser.name}님, 회원가입이 완료되었습니다.`);
      router.push('/onboarding');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4">
      <div className="bg-white rounded-xl shadow-md p-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">회원가입</h1>
          <p className="text-gray-600">Connectwon에서 새로운 연결을 시작하세요</p>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 이름 */}
          <Input
            id="name"
            name="name"
            label="이름 *"
            value={formData.name}
            onChangeAction={v => setFormData(prev => ({ ...prev, name: v as string }))}
          />

          {/* 이메일 + 인증 */}
          <div>
            <div className="flex space-x-2">
              <div className="flex-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  label="이메일 *"
                  value={formData.email}
                  onChangeAction={v => setFormData(prev => ({ ...prev, email: v as string }))}
                  disabled={emailVerified}
                />
              </div>
              {!emailVerified && (
                <button
                  type="button"
                  onClick={handleSendCode}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                >
                  인증번호 보내기
                </button>
              )}
            </div>

            {!emailVerified && sentCode && (
              <div className="mt-3 flex space-x-2">
                <Input
                  id="verificationCode"
                  name="verificationCode"
                  label="인증번호 입력"
                  value={verificationCode}
                  onChangeAction={v => setVerificationCode(v as string)}
                />
                <button
                  type="button"
                  onClick={handleVerifyCode}
                  className="px-3 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                >
                  인증하기
                </button>
              </div>
            )}
          </div>

          {/* 비밀번호 */}
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            label="비밀번호 *"
            value={formData.password}
            onChangeAction={v => setFormData(prev => ({ ...prev, password: v as string }))}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500"
              >
                <i className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} />
              </button>
            }
          />

          {/* 비밀번호 확인 */}
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            label="비밀번호 확인 *"
            value={formData.confirmPassword}
            onChangeAction={v => setFormData(prev => ({ ...prev, confirmPassword: v as string }))}
            rightElement={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-gray-500"
              >
                <i className={showConfirmPassword ? 'ri-eye-off-line' : 'ri-eye-line'} />
              </button>
            }
          />

          {/* 휴대폰 */}
          <Input
            id="phone"
            name="phone"
            type="tel"
            label="휴대폰 번호 *"
            value={formData.phone}
            onChangeAction={v => setFormData(prev => ({ ...prev, phone: v as string }))}
          />

          {/* 생년월일 + 성별 */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              id="birthDate"
              name="birthDate"
              type="date"
              label="생년월일"
              value={formData.birthDate}
              onChangeAction={v => setFormData(prev => ({ ...prev, birthDate: v as Date | null }))}
            />

            <Input
              id="gender"
              name="gender"
              type="select"
              label="성별"
              value={formData.gender}
              onChangeAction={v => setFormData(prev => ({ ...prev, gender: v as string }))}
              options={[
                { value: 'none', label: '선택안함' },
                { value: 'male', label: '남성' },
                { value: 'female', label: '여성' },
                { value: 'other', label: '기타' },
              ]}
            />
          </div>

          {/* 약관 동의 */}
          <div className="space-y-2 pt-4 border-t border-gray-200">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={agreedTerms}
                onChange={e => setAgreedTerms(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <span className="text-sm">이용약관 동의 *</span>
              <button
                type="button"
                onClick={() => setOpenModal('terms')}
                className="text-blue-600 text-sm ml-2 hover:underline"
              >
                보기
              </button>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={agreedPrivacy}
                onChange={e => setAgreedPrivacy(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <span className="text-sm">개인정보 처리방침 동의 *</span>
              <button
                type="button"
                onClick={() => setOpenModal('privacy')}
                className="text-blue-600 text-sm ml-2 hover:underline"
              >
                보기
              </button>
            </label>

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

          {/* 제출 버튼 */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 mt-6"
          >
            {loading ? '가입 중...' : '회원가입'}
          </button>
        </form>

        {/* SNS 가입 */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">SNS로 가입하기</span>
          </div>
        </div>

        <SSOSignup />

        <div className="mt-6 text-center">
          <span className="text-gray-600">이미 계정이 있으신가요? </span>
          <Link href="/login" className="text-blue-600 font-medium hover:text-blue-800">
            로그인
          </Link>
        </div>
      </div>

      {/* 약관 모달 */}
      <TermsModal
        type={openModal ?? 'terms'}
        isOpen={openModal !== null}
        onClose={() => setOpenModal(null)}
      />
    </div>
  );
}
