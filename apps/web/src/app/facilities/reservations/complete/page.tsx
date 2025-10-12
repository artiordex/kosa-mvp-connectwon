/**
 * Description : reservations/complete/page.tsx - 📌 예약 완료 페이지
 * Author : Shiwoo Min
 * Date : 2025-10-13
 */

'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import Link from 'next/link';

function ReservationCompleteContent() {
  const searchParams = useSearchParams();

  // URL 파라미터에서 예약 정보 가져오기
  const reservationId = searchParams.get('id');
  const venueName = searchParams.get('venue');
  const roomName = searchParams.get('room');
  const date = searchParams.get('date');
  const time = searchParams.get('time');
  const devices = searchParams.get('devices') || '';

  // 예약 정보 localStorage 저장
  useEffect(() => {
    if (reservationId && venueName && roomName && date && time) {
      const newReservation = {
        id: reservationId,
        venue: venueName,
        room: roomName,
        date,
        time,
        devices,
        status: '승인 대기중',
        createdAt: new Date().toISOString(),
      };

      const existing = JSON.parse(localStorage.getItem('reservations') || '[]');
      const updated = [...existing, newReservation];
      localStorage.setItem('reservations', JSON.stringify(updated));
    }
  }, [reservationId, venueName, roomName, date, time, devices]);

  // 필수 정보가 없을 경우 처리
  if (!reservationId || !venueName || !roomName || !date || !time) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <i className="ri-error-warning-line text-red-600 text-6xl mb-4"></i>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">예약 정보를 찾을 수 없습니다</h1>
          <p className="text-gray-600 mb-6">잘못된 접근이거나 예약 정보가 만료되었습니다.</p>
          <Link
            href="/facilities/reservations"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            예약 페이지로 이동
          </Link>
        </div>
      </div>
    );
  }

  // 캘린더에 추가
  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`${venueName} ${roomName} 예약`);
    const details = encodeURIComponent(`예약번호: ${reservationId}\n장소: ${venueName} ${roomName}`);
    const location = encodeURIComponent(venueName);
    const startDate = date.replace(/-/g, '');
    const timeParts = time.split(' - ');
    const timeStart = timeParts[0] || '14:00';
    const startTime = timeStart.replace(':', '') + '00';

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${startDate}T${startTime}/${startDate}T${startTime}`;
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* 성공 메시지 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <i className="ri-checkbox-circle-fill text-green-600 text-5xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">예약 신청이 완료되었습니다!</h1>
          <p className="text-lg text-gray-600">승인 결과는 이메일로 안내드리겠습니다</p>
        </div>

        {/* 예약 정보 카드 */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">예약 정보</h2>
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-medium text-sm">
              승인 대기중
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">예약 번호</p>
                <p className="text-lg font-bold text-gray-900">{reservationId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">지점</p>
                <p className="text-base font-medium text-gray-900">{venueName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">룸</p>
                <p className="text-base font-medium text-gray-900">{roomName}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">예약 날짜</p>
                <p className="text-base font-medium text-gray-900">{date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">예약 시간</p>
                <p className="text-base font-medium text-gray-900">{time}</p>
              </div>
              {devices && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">선택한 기기</p>
                  <div className="flex flex-wrap gap-2">
                    {devices.split(',').map((device, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium"
                      >
                        {device.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* QR 코드 */}
          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <p className="text-sm text-gray-600 mb-4">승인 후 입장용 QR 코드가 발급됩니다</p>
            <div className="inline-block w-32 h-32 bg-white rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <i className="ri-qr-code-line text-gray-400 text-4xl"></i>
            </div>
          </div>
        </div>

        {/* 안내사항 */}
        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-blue-900 mb-4 flex items-center">
            <i className="ri-information-line mr-2"></i>
            확인해주세요
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start">
              <i className="ri-checkbox-circle-line mr-2 mt-0.5"></i>
              <span>예약 승인 결과는 이메일로 발송됩니다 (영업일 기준 1~2일 소요)</span>
            </li>
            <li className="flex items-start">
              <i className="ri-checkbox-circle-line mr-2 mt-0.5"></i>
              <span>승인 후 예약 변경 또는 취소는 마이페이지에서 가능합니다</span>
            </li>
            <li className="flex items-start">
              <i className="ri-checkbox-circle-line mr-2 mt-0.5"></i>
              <span>예약 시간 10분 전까지 도착해주세요</span>
            </li>
            <li className="flex items-start">
              <i className="ri-checkbox-circle-line mr-2 mt-0.5"></i>
              <span>취소는 이용 24시간 전까지 가능합니다</span>
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
            캘린더에 추가
          </button>
          <Link
            href="/mypage/reservations"
            className="flex items-center justify-center px-6 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            <i className="ri-list-check mr-2"></i>
            내 예약 보기
          </Link>
          <Link
            href="/facilities/reservations"
            className="flex items-center justify-center px-6 py-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            <i className="ri-add-line mr-2"></i>
            추가 예약하기
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

export default function ReservationCompletePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-lg text-gray-600">로딩 중...</div>
        </div>
      }
    >
      <ReservationCompleteContent />
    </Suspense>
  );
}
