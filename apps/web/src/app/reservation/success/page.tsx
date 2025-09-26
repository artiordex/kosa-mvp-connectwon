
'use client';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Link from 'next/link';

export default function ReservationCompletePage() {
  const reservationData = {
    reservationNumber: 'RES-2024122001',
    programTitle: '요가 클래스',
    instructor: '김요가',
    date: '2024-12-20',
    time: '10:00-11:30',
    location: '강남구 피트니스센터',
    address: '서울특별시 강남구 테헤란로 123, 2층',
    participants: 1,
    totalAmount: 15000,
    paymentMethod: '신용카드',
    customerName: '홍길동',
    customerEmail: 'hong@example.com',
    customerPhone: '010-1234-5678'
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* 성공 아이콘 */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-check-line text-3xl text-green-600 w-8 h-8 flex items-center justify-center"></i>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                예약이 완료되었습니다!
              </h1>
              <p className="text-gray-600">
                예약 확인 메일을 발송했습니다. 확인해주세요.
              </p>
            </div>

            {/* 예약 정보 */}
            <div className="border border-gray-200 rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">예약 정보</h2>
                <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                  예약 완료
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">예약 번호</span>
                  <span className="font-medium">{reservationData.reservationNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">프로그램</span>
                  <span className="font-medium">{reservationData.programTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">강사</span>
                  <span className="font-medium">{reservationData.instructor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">일시</span>
                  <span className="font-medium">{reservationData.date} {reservationData.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">장소</span>
                  <span className="font-medium">{reservationData.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">주소</span>
                  <span className="font-medium text-sm">{reservationData.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">참여 인원</span>
                  <span className="font-medium">{reservationData.participants}명</span>
                </div>
              </div>
            </div>

            {/* 결제 정보 */}
            <div className="border border-gray-200 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">결제 정보</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">결제 방법</span>
                  <span className="font-medium">{reservationData.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">결제 금액</span>
                  <span className="font-medium text-blue-600">{reservationData.totalAmount.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">결제 상태</span>
                  <span className="font-medium text-green-600">결제 완료</span>
                </div>
              </div>
            </div>

            {/* 예약자 정보 */}
            <div className="border border-gray-200 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">예약자 정보</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">이름</span>
                  <span className="font-medium">{reservationData.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">이메일</span>
                  <span className="font-medium">{reservationData.customerEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">휴대폰</span>
                  <span className="font-medium">{reservationData.customerPhone}</span>
                </div>
              </div>
            </div>

            {/* 안내사항 */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-blue-900 mb-3">수업 참여 안내</h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li className="flex items-center">
                  <i className="ri-check-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                  수업 10분 전까지 도착해주세요
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                  편안한 운동복을 착용해주세요
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                  개인 수건을 지참해주세요
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                  수업 2시간 전 식사는 피해주세요
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                  문의사항은 고객센터 (1588-1234)로 연락주세요
                </li>
              </ul>
            </div>

            {/* 액션 버튼 */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/mypage/reservations"
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer text-center whitespace-nowrap"
              >
                내 예약 보기
              </Link>
              <Link
                href="/programs"
                className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer text-center whitespace-nowrap"
              >
                다른 프로그램 보기
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
