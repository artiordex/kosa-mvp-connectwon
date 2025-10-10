/**
 * Description : page.tsx - 📌 ConnectWon Admin 프로필 관리 페이지
 * Author : Shiwoo Min
 * Date : 2025-10-11
 */
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function AdminProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState({
    id: 1,
    name: '민시우',
    email: 'admin@connectwon.com',
    role: 'Administrator',
    role_flags: 0,
    phone: '010-0000-0000',
    image_url: '/images/avatar.png',
    preferences: { theme: 'dark', language: 'ko' },
    last_login_at: new Date().toISOString(),
    created_at: '2025-10-09T14:32:15Z',
    updated_at: new Date().toISOString(),
    login_ip: '-',
    browser: '-',
    location: '-',
    country_flag: '🏳️',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 저장된 프로필 데이터 불러오기
      const savedProfile = localStorage.getItem('connectwon_profile');
      if (savedProfile) {
        const parsedProfile = JSON.parse(savedProfile);
        setProfile(prev => ({
          ...prev,
          name: parsedProfile.name || prev.name,
          email: parsedProfile.email || prev.email,
          phone: parsedProfile.phone || prev.phone,
          image_url: parsedProfile.image_url || prev.image_url,
          preferences: parsedProfile.preferences || prev.preferences,
          updated_at: parsedProfile.updated_at || prev.updated_at,
        }));
      }

      const browser = navigator.userAgent;
      const now = new Date().toISOString();

      // IP 가져오기
      fetch('https://api.ipify.org?format=json')
        .then(res => res.json())
        .then(ipData => {
          const ip = ipData.ip;
          localStorage.setItem('connectwon_ip', ip);

          // 위치 정보 가져오기
          return fetch(`https://ipapi.co/${ip}/json/`);
        })
        .then(res => res.json())
        .then(locData => {
          const {
            ip,
            country_name,
            country_code,
            region,
            city,
            postal,
          } = locData;

          const locationText = `${country_name || ''}${
            region ? ', ' + region : ''
          }${city ? ', ' + city : ''}${postal ? ' ' + postal : ''}`;

          const flag = getFlagEmoji(country_code);

          setProfile(prev => ({
            ...prev,
            login_ip: ip || '-',
            browser,
            last_login_at: now,
            location: locationText || '-',
            country_flag: flag,
          }));
        })
        .catch(() => {
          // 실패 시 fallback
          setProfile(prev => ({
            ...prev,
            browser,
            login_ip: '127.0.0.1',
            location: '위치 정보 불러오기 실패',
            country_flag: '🏳️',
            last_login_at: now,
          }));
        });
    }
  }, []);

  const handleEditClick = () => router.push('/profile/edit');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-xl p-8 space-y-8">
        {/* 제목 + 버튼 */}
        <div className="flex items-center justify-between border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-900">프로필 관리</h1>
          <button
            onClick={handleEditClick}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm font-medium shadow cursor-pointer"
          >
            프로필 수정
          </button>
        </div>

        {/* 프로필 요약 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 mt-6">
          <Image
            src={profile.image_url}
            alt="관리자 프로필"
            width={96}
            height={96}
            className="rounded-full border aspect-square object-cover"
          />
          <div className="mt-4 sm:mt-0 text-center sm:text-left">
            <h2 className="text-2xl font-semibold text-gray-900">{profile.name}</h2>
            <p className="text-sm text-gray-500">{profile.email}</p>
            <span className="inline-block mt-2 px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-md border border-blue-200">
              {profile.role}
            </span>
          </div>
        </div>

        {/* 계정 정보 */}
        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 mt-8">계정 정보</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Info label="이메일" value={profile.email} />
            <Info label="전화번호" value={profile.phone} />
            <Info label="권한 Flag" value={profile.role_flags} mono />
            <div>
              <label className="block text-sm text-gray-600">선호 설정 (Preferences)</label>
              <ul className="mt-1 text-gray-900 text-sm space-y-1">
                <li>테마: {profile.preferences.theme === 'dark' ? '다크 모드' : '라이트 모드'}</li>
                <li>
                  언어:{' '}
                  {profile.preferences.language === 'ko'
                    ? '한국어'
                    : profile.preferences.language === 'en'
                    ? '영어'
                    : profile.preferences.language === 'ja'
                    ? '일본어'
                    : profile.preferences.language === 'zh'
                    ? '중국어'
                    : profile.preferences.language}
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 접속 & 활동 정보 */}
        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 mt-8">최근 접속 정보</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Info label="마지막 로그인" value={formatDate(profile.last_login_at)} />
            <Info label="접속 IP" value={profile.login_ip} />
            <Info
              label="위치 정보"
              value={`${profile.country_flag} ${profile.location}`}
            />
            <div className="md:col-span-2">
              <Info label="브라우저 / OS" value={profile.browser} />
            </div>
          </div>
        </section>

        {/* 시스템 메타데이터 */}
        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 mt-8">시스템 메타데이터</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Info label="계정 생성일" value={formatDate(profile.created_at)} />
            <Info label="마지막 수정일" value={formatDate(profile.updated_at)} />
          </div>
        </section>
      </div>
    </div>
  );
}

/* 공통 Info 컴포넌트 */
function Info({
  label,
  value,
  mono,
}: {
  label: string;
  value: string | number;
  mono?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm text-gray-600">{label}</label>
      <p
        className={`${
          mono ? 'font-mono' : 'font-medium'
        } text-base text-gray-900 break-words`}
      >
        {value}
      </p>
    </div>
  );
}

/* 날짜 포맷 */
function formatDate(dateString: string) {
  if (!dateString) return '-';
  const date = new Date(dateString);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const mi = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');
  return `${yyyy}/${mm}/${dd} ${hh}:${mi}:${ss}`;
}

/* ISO 국가 코드 → 국기 emoji 변환 */
function getFlagEmoji(countryCode?: string) {
  if (!countryCode) return '🏳️';
  return countryCode
    .toUpperCase()
    .replace(/./g, char =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );
}
