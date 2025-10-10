'use client';

import Reservation, { ReservationType } from './Reservation';

const mockSpaceReservations: ReservationType[] = [
  {
    id: 1,
    user: '김지훈',
    email: 'jh.kim@example.com',
    phone: '010-1111-2222',
    program: '회의실 대여',
    instructor: '-',
    date: '2025-10-13',
    time: '14:00 ~ 16:00',
    room: '강남지점 대회의실',
    status: 'confirmed',
    price: 30000,
    createdAt: '2025-10-11T08:30:00Z',
  },
  {
    id: 2,
    user: '이수연',
    email: 'sy.lee@example.com',
    phone: '010-3333-4444',
    program: '세미나실 대여',
    instructor: '-',
    date: '2025-10-14',
    time: '10:00 ~ 12:00',
    room: '마포지점 세미나실',
    status: 'pending',
    price: 50000,
    createdAt: '2025-10-10T15:00:00Z',
  },
];

export default function SpaceReservation() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">공간 예약 관리</h2>
          <p className="text-sm text-gray-600 mt-1">
            회의실 및 세미나실 등의 공간 예약 현황을 관리합니다.
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow">
          <i className="ri-add-line mr-1"></i> 신규 예약
        </button>
      </div>

      <Reservation initialReservations={mockSpaceReservations} />
    </div>
  );
}
