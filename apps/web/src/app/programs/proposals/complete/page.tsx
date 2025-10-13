/**
 * Description : programs/proposals/complete/page.tsx - 📌 제안 완료 페이지
 * Author : Shiwoo Min
 * Date : 2025-10-13
 */

'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'program_proposals';

// 안전한 ISO 빌더: date="YYYY-MM-DD", time="HH:mm" 또는 "HH:mm - HH:mm"
function buildISO(dateStr: string, timeStr?: string | null): string | null {
  if (!dateStr) return null;

  // YYYY-MM-DD 정확 매칭 (캡처 그룹 사용)
  const mDate = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
  if (!mDate) return null;

  const y = Number(mDate[1]);
  const mo = Number(mDate[2]); // 1~12
  const d = Number(mDate[3]);

  // "09:00 - 11:00" → 시작 "09:00"만 사용
  const first = (timeStr || '09:00').split('-')[0]?.trim() || '09:00';
  const mTime = /^(\d{2}):(\d{2})$/.exec(first);
  const hh = Number(mTime?.[1] ?? '09');
  const mm = Number(mTime?.[2] ?? '00');

  // UTC 기준으로 조립 (타임존 흔들림 방지)
  const iso = new Date(Date.UTC(y, mo - 1, d, hh, mm, 0)).toISOString();
  return iso;
}

function ProposalCompleteContent() {
  const searchParams = useSearchParams();

  // URL 파라미터에서 제안 정보 가져오기
  const proposalId = searchParams.get('id') || '';
  const title      = searchParams.get('title') || '';
  const pType      = searchParams.get('type') || '';
  const location   = searchParams.get('location') || '';
  const date       = searchParams.get('date') || '';
  const time       = searchParams.get('time') || '';

  // 안전 가드 + (누락 시) 최소 정보 저장
  useEffect(() => {
    if (!proposalId || !title) return;
    if (typeof window === 'undefined') return;

    const scheduleISO = buildISO(date, time);

    // exactOptionalPropertyTypes 대응:
    // - location은 값 있을 때만 포함
    // - scheduleISO는 null 가능 (명시적으로 키 포함)
    const base = {
      id: proposalId,
      title,
      type: pType,
      ...(location ? { location } : {}),
      scheduleISO: scheduleISO, // null 또는 string
      status: '승인 대기중' as const,
      createdAt: new Date().toISOString(),
    };

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY) || '[]';
      const existing = JSON.parse(raw) as any[];

      // 이미 ProgramCreate에서 저장했다면 그대로 두고,
      // 없다면 최소 객체로 추가
      const exists = Array.isArray(existing) && existing.some(p => p?.id === proposalId);
      if (!exists) {
        const updated = Array.isArray(existing) ? [base, ...existing] : [base];
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
    } catch {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify([base]));
    }
  }, [proposalId, title, pType, location, date, time]);

  // 필수 정보가 없을 경우 처리
  if (!proposalId || !title) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <i className="ri-error-warning-line text-red-600 text-6xl mb-4"></i>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">제안 정보를 찾을 수 없습니다</h1>
          <p className="text-gray-600 mb-6">잘못된 접근이거나 제안 정보가 만료되었습니다.</p>
          <Link
            href="/programs/create"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            제안 페이지로 이동
          </Link>
        </div>
      </div>
    );
  }

  // 캘린더에 메모 추가
  const handleAddToCalendar = () => {
    // time이 "09:30 - 11:00" 형태일 수도 있고, "09:30" 하나만 올 수도 있음
    const [startLabelRaw] = time.split('-').map(s => s.trim());
    const startLabel = startLabelRaw || '09:00';
    const startDate = (date || '').replace(/-/g, '');
    const startTime = startLabel.replace(':', '') + '00';

    const calTitle    = encodeURIComponent(`프로그램 제안: ${title}`);
    const details     = encodeURIComponent(
      `제안번호: ${proposalId}\n유형: ${pType || '미지정'}${location ? `\n장소: ${location}` : ''}`
    );
    const locParam    = encodeURIComponent(location || (pType === '온라인' ? 'Online' : ''));

    // 종료시간 미지정 → 시작과 동일(사용자가 캘린더에서 조정)
    const datesParam =
      startDate ? `&dates=${startDate}T${startTime}/${startDate}T${startTime}` : '';

    const googleCalendarUrl =
      `https://calendar.google.com/calendar/render` +
      `?action=TEMPLATE&text=${calTitle}&details=${details}&location=${locParam}` +
      datesParam;

    window.open(googleCalendarUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* 성공 메시지 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <i className="ri-checkbox-circle-fill text-green-600 text-5xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">제안 접수가 완료되었습니다!</h1>
          <p className="text-lg text-gray-600">운영자 검토 후 승인 결과를 안내드립니다</p>
        </div>

        {/* 제안 정보 카드 */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">제안 정보</h2>
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-medium text-sm">
              승인 대기중
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">제안 번호</p>
                <p className="text-lg font-bold text-gray-900">{proposalId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">프로그램명</p>
                <p className="text-base font-medium text-gray-900">{title}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">유형</p>
                <p className="text-base font-medium text-gray-900">{pType || '미지정'}</p>
              </div>
            </div>

            <div className="space-y-4">
              {pType !== '온라인' && location && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">장소</p>
                  <p className="text-base font-medium text-gray-900">{location}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500 mb-1">희망 날짜</p>
                <p className="text-base font-medium text-gray-900">{date || '미지정'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">희망 시간</p>
                <p className="text-base font-medium text-gray-900">{time || '미지정'}</p>
              </div>
            </div>
          </div>

          {/* QR/플레이스홀더 (승인 후 발급 안내) */}
          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <p className="text-sm text-gray-600 mb-4">승인 후 운영 일정 및 상세 정보가 확정됩니다</p>
            <div className="inline-block w-32 h-32 bg-white rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <i className="ri-calendar-check-line text-gray-400 text-4xl"></i>
            </div>
          </div>
        </div>

        {/* 안내사항 (문구 수정: 예약→일정, 취소→제안 철회/수정) */}
        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-blue-900 mb-4 flex items-center">
            <i className="ri-information-line mr-2"></i>
            확인해주세요
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start">
              <i className="ri-checkbox-circle-line mr-2 mt-0.5"></i>
              <span>승인 결과 및 다음 단계(일정 확정/모집 오픈)는 이메일로 안내됩니다 (영업일 기준 1~2일 소요)</span>
            </li>
            <li className="flex items-start">
              <i className="ri-checkbox-circle-line mr-2 mt-0.5"></i>
              <span>승인 후 <b>일정 변경</b> 또는 세부 내용 조율은 운영팀과 협의하여 반영됩니다</span>
            </li>
            <li className="flex items-start">
              <i className="ri-checkbox-circle-line mr-2 mt-0.5"></i>
              <span>검토 중 제안을 수정하거나 <b>제안 철회</b>를 원하시면 마이페이지 &gt; 내 제안에서 처리할 수 있습니다</span>
            </li>
          </ul>
        </div>

        {/* 액션 버튼 */}
        <div className="grid md:grid-cols-3 gap-4">
          <button
            onClick={handleAddToCalendar}
            className="flex items-center justify-center px-6 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            <i className="ri-calendar-line mr-2"></i>
            캘린더에 메모 추가
          </button>
          <Link
            href="/mypage/programs"
            className="flex items-center justify-center px-6 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            <i className="ri-list-check mr-2"></i>
            내 제안 보기
          </Link>
          <Link
            href="/programs/create"
            className="flex items-center justify-center px-6 py-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            <i className="ri-add-line mr-2"></i>
            새 제안 작성
          </Link>
        </div>

        {/* 문의 안내 */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            문의사항이 있으신가요?{' '}
            <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">
              고객센터 바로가기
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ProposalCompletePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-lg text-gray-600">로딩 중...</div>
        </div>
      }
    >
      <ProposalCompleteContent />
    </Suspense>
  );
}
