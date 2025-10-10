'use client';

import Reservation, { ReservationType } from './Reservation';

const mockProgramReservations: ReservationType[] = [
  {
    id: 1,
    user: '박준영',
    email: 'jy.park@example.com',
    phone: '010-5555-6666',
    program: 'AI 모델 실무 교육',
    instructor: '민시우',
    date: '2025-10-15',
    time: '09:00 ~ 12:00',
    room: '강남 SW개발실 A',
    status: 'confirmed',
    price: 80000,
    createdAt: '2025-10-09T12:00:00Z',
  },
  {
    id: 2,
    user: '최은지',
    email: 'ej.choi@example.com',
    phone: '010-7777-8888',
    program: 'React 심화 교육',
    instructor: '김코드',
    date: '2025-10-17',
    time: '13:00 ~ 17:00',
    room: '마포 세미나룸',
    status: 'pending',
    price: 90000,
    createdAt: '2025-10-10T11:00:00Z',
  },
];

export default function ProgramReservation() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">프로그램 예약 관리</h2>
          <p className="text-sm text-gray-600 mt-1">
            온라인/오프라인 프로그램 예약 내역을 관리합니다.
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow">
          <i className="ri-add-line mr-1"></i> 신규 예약
        </button>
      </div>

      <Reservation initialReservations={mockProgramReservations} />
    </div>
  );
}
