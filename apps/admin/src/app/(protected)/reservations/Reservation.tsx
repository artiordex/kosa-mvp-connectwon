'use client';

import { useState } from 'react';

export interface ReservationType {
  id: number;
  user: string;
  email: string;
  phone: string;
  program: string;
  instructor: string;
  date: string;
  time: string;
  room: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price: number;
  createdAt: string;
}

interface ReservationProps {
  initialReservations: ReservationType[];
}

export default function Reservation({ initialReservations }: ReservationProps) {
  const [reservations, setReservations] = useState(initialReservations);
  const [selectedReservation, setSelectedReservation] = useState<ReservationType | null>(null);

  const getStatusBadge = (status: ReservationType['status']) => {
    switch (status) {
      case 'pending':
        return <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">대기 중</span>;
      case 'confirmed':
        return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">확정</span>;
      case 'completed':
        return <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">완료</span>;
      case 'cancelled':
        return <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">취소</span>;
      default:
        return null;
    }
  };

  const handleStatusChange = (id: number, newStatus: ReservationType['status']) => {
    setReservations(prev => prev.map(r => (r.id === id ? { ...r, status: newStatus } : r)));
  };

  return (
    <>
      {/* 예약 테이블 */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3">예약자</th>
                <th className="px-6 py-3">프로그램</th>
                <th className="px-6 py-3">일시</th>
                <th className="px-6 py-3">장소</th>
                <th className="px-6 py-3">금액</th>
                <th className="px-6 py-3">상태</th>
                <th className="px-6 py-3">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reservations.map(reservation => (
                <tr key={reservation.id}>
                  <td className="px-6 py-4">{reservation.user}</td>
                  <td className="px-6 py-4">{reservation.program}</td>
                  <td className="px-6 py-4">
                    {reservation.date} {reservation.time}
                  </td>
                  <td className="px-6 py-4">{reservation.room}</td>
                  <td className="px-6 py-4">{reservation.price.toLocaleString()}원</td>
                  <td className="px-6 py-4">{getStatusBadge(reservation.status)}</td>
                  <td className="px-6 py-4">
                    {reservation.status === 'pending' && (
                      <>
                        <button onClick={() => handleStatusChange(reservation.id, 'confirmed')} className="text-green-600 mr-2">
                          승인
                        </button>
                        <button onClick={() => handleStatusChange(reservation.id, 'cancelled')} className="text-red-600">
                          취소
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 상세 모달도 유지 */}
      {selectedReservation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96">
            <h3 className="text-lg font-semibold mb-4">예약 상세</h3>
            <p>
              {selectedReservation.user} - {selectedReservation.program}
            </p>
            <button onClick={() => setSelectedReservation(null)} className="mt-4 bg-gray-100 px-4 py-2 rounded">
              닫기
            </button>
          </div>
        </div>
      )}
    </>
  );
}
