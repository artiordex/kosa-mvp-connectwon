/**
 * Description : Signup.tsx - 📌 회원가입
 * Author : Shiwoo Min
 * Date : 2025-10-13
 */

'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
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

  // 코드와 만료를 한 묶음으로 관리
  const CODE_TTL_MS = 20_000;
  const [codeBundle, setCodeBundle] = useState<{ value: string; expiresAt: number } | null>(null);
  const [remaining, setRemaining] = useState<number>(0);

  // UI 보조
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  const [agreedMarketing, setAgreedMarketing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState<null | 'terms' | 'privacy'>(null);

  const router = useRouter();

  // 남은 시간 타이머
  useEffect(() => {
    if (!codeBundle) {
      setRemaining(0);
      return;
    }
    const tick = () => {
      const left = Math.max(0, Math.ceil((codeBundle.expiresAt - Date.now()) / 1000));
      setRemaining(left);
    };
    tick();
    const id = setInterval(tick, 250);
    return () => clearInterval(id);
  }, [codeBundle]);

  // mm:ss 포맷
  const remainLabel = useMemo(() => {
    const m = Math.floor(remaining / 60).toString().padStart(2, '0');
    const s = (remaining % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }, [remaining]);

  const isCodeExpired = useMemo(
    () => !codeBundle || Date.now() > codeBundle.expiresAt,
    [codeBundle]
  );

  // 인증번호 표시 영역(복사 폴백용)
  const codeSpanRef = useRef<HTMLSpanElement | null>(null);

  // 클립보드 복사
  const copyToClipboard = async (text: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // 폴백: 선택 후 복사
        const node = codeSpanRef.current;
        if (!node) throw new Error('no node');
        const range = document.createRange();
        range.selectNodeContents(node);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
        document.execCommand('copy');
        sel?.removeAllRanges();
      }
      alert('인증번호가 복사되었습니다.');
    } catch {
      alert('복사에 실패했어요. 수동으로 드래그해서 복사해주세요.');
    }
  };

  // 이메일 인증번호 발송/재전송 (항상 즉시 새 코드 + 만료 30초 리셋)
  const handleSendOrResend = () => {
    if (!formData.email.trim()) {
      alert('이메일을 입력해주세요.');
      return;
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationCode('');
    setEmailVerified(false); // 새 코드 발송 시 다시 미인증
    setCodeBundle({ value: code, expiresAt: Date.now() + CODE_TTL_MS });
    alert(`인증번호 발송됨 (테스트용: ${code})\n20초 내에 입력해주세요.`);
  };

  // 인증하기
  const handleVerifyCode = () => {
    if (!codeBundle) {
      alert('먼저 인증번호를 발송해주세요.');
      return;
    }
    if (Date.now() > codeBundle.expiresAt) {
      alert('인증번호가 만료되었습니다. 재전송 후 다시 시도해주세요.');
      setCodeBundle(null); // 만료 즉시 무효화
      return;
    }
    if (verificationCode === codeBundle.value) {
      setEmailVerified(true);
      setCodeBundle(null); // 성공 즉시 무효화 (재사용 방지)
      alert('이메일 인증 완료!');
    } else {
      alert('인증번호가 일치하지 않습니다.');
    }
  };

  // 회원가입(Mock)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
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

      const users = JSON.parse(localStorage.getItem('mockUsers') || '[]');
      if (users.some((u: any) => u.email === formData.email)) {
        alert('이미 가입된 이메일입니다.');
        return;
      }

      // 신규 유저
      const newUser = {
        id: `${Date.now()}`,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        birthDate: formData.birthDate,
        gender: formData.gender,
        provider: 'local',
        picture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
          formData.name || 'user'
        )}`,
        role: 'Family',
        role_flags: 0,
        preferences: {
          language: 'ko',
          theme: 'light',
          emailNotifications: true,
          smsNotifications: false,
          pushNotifications: true,
        },
        stats: {
          totalReservations: 0,
          upcomingReservations: 0,
          completedPrograms: 0,
          totalPoints: 0,
        },
        agreed: {
          terms: agreedTerms,
          privacy: agreedPrivacy,
          marketing: agreedMarketing,
        },
        createdAt: new Date().toISOString(),
        onboardingCompleted: false,
      };

      localStorage.setItem('mockUsers', JSON.stringify([...users, newUser]));
      localStorage.setItem('mockUser', JSON.stringify(newUser));
      window.dispatchEvent(new Event('auth-changed'));

      localStorage.setItem('onboardingRequired', 'true');
      localStorage.setItem('signupCongratsPending', 'true');

      await new Promise((r) => setTimeout(r, 800));
      alert(`${newUser.name}님, 회원가입이 완료되었습니다.`);
      router.push('/onboarding');
    } finally {
      setLoading(false);
    }
  };

  const sendBtnLabel = codeBundle ? '재전송' : '인증번호 보내기';

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
            onChangeAction={(v) => setFormData((prev) => ({ ...prev, name: v as string }))}
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
                  onChangeAction={(v) => setFormData((prev) => ({ ...prev, email: v as string }))}
                  disabled={emailVerified}
                />
              </div>

              {!emailVerified && (
                <button
                  type="button"
                  onClick={handleSendOrResend}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                >
                  {sendBtnLabel}
                </button>
              )}
            </div>

            {/* 인증 코드 입력 + 코드 표시/복사 + 카운트다운 */}
            {!emailVerified && codeBundle && (
              <div className="mt-3 space-y-2">
                {/* 코드 표시 + 복사 버튼 */}
                <div className="flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
                  <div className="text-sm text-gray-700">
                    <span className="mr-2 text-gray-500">인증번호:</span>
                    <span ref={codeSpanRef} className="font-mono font-semibold select-text">
                      {codeBundle.value}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(codeBundle.value)}
                    className="text-xs px-2 py-1 rounded-md border border-gray-300 hover:bg-gray-100"
                  >
                    복사
                  </button>
                </div>

                <div className="flex gap-2 items-end">
                  <div className="flex-1">
                    <Input
                      id="verificationCode"
                      name="verificationCode"
                      label="인증번호 입력"
                      value={verificationCode}
                      onChangeAction={(v) => setVerificationCode(v as string)}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleVerifyCode}
                    disabled={isCodeExpired}
                    className={`px-3 py-2 rounded-lg text-sm text-white ${
                      isCodeExpired ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    인증하기
                  </button>
                </div>

                {!isCodeExpired ? (
                  <p className="text-xs text-gray-500">
                    인증번호 유효시간 <span className="font-medium">{remainLabel}</span>
                  </p>
                ) : (
                  <p className="text-xs text-red-600">
                    인증번호가 만료되었습니다. <b>재전송</b> 버튼을 눌러 새 코드를 받아주세요.
                  </p>
                )}
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
            onChangeAction={(v) => setFormData((prev) => ({ ...prev, password: v as string }))}
            rightElement={
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-500">
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
            onChangeAction={(v) => setFormData((prev) => ({ ...prev, confirmPassword: v as string }))}
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
            onChangeAction={(v) => setFormData((prev) => ({ ...prev, phone: v as string }))}
          />

          {/* 생년월일 + 성별 */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              id="birthDate"
              name="birthDate"
              type="date"
              label="생년월일"
              value={formData.birthDate}
              onChangeAction={(v) => setFormData((prev) => ({ ...prev, birthDate: v as Date | null }))}
            />

            <Input
              id="gender"
              name="gender"
              type="select"
              label="성별"
              value={formData.gender}
              onChangeAction={(v) => setFormData((prev) => ({ ...prev, gender: v as string }))}
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
                onChange={(e) => setAgreedTerms(e.target.checked)}
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
                onChange={(e) => setAgreedPrivacy(e.target.checked)}
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
                onChange={(e) => setAgreedMarketing(e.target.checked)}
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
