'use client';

import { useState } from 'react';
import AppShell from '../../components/AppShell';
import AdminLayout from '../../components/AppShell';

export default function AdminReservations() {
  const [reservations] = useState([
    {
      id: 1,
      user: '김회원',
      email: 'kim@example.com',
      program: '요가 클래스',
      instructor: '김요가',
      date: '2024-01-15',
      time: '14:00-15:30',
      room: 'A홀',
      status: 'confirmed',
      price: 25000,
      createdAt: '2024-01-10 09:30',
      phone: '010-1234-5678',
    },
    {
      id: 2,
      user: '이회원',
      email: 'lee@example.com',
      program: '디지털 마케팅 기초',
      instructor: '박마케팅',
      date: '2024-01-16',
      time: '16:00-19:00',
      room: 'B홀',
      status: 'pending',
      price: 150000,
      createdAt: '2024-01-11 14:20',
      phone: '010-2345-6789',
    },
    {
      id: 3,
      user: '박회원',
      email: 'park@example.com',
      program: '도자기 만들기',
      instructor: '이도예',
      date: '2024-01-17',
      time: '18:00-20:00',
      room: 'C홀',
      status: 'confirmed',
      price: 80000,
      createdAt: '2024-01-12 11:15',
      phone: '010-3456-7890',
    },
    {
      id: 4,
      user: '최회원',
      email: 'choi@example.com',
      program: 'AI 프로그래밍 입문',
      instructor: '최개발',
      date: '2024-01-20',
      time: '10:00-14:00',
      room: 'D홀',
      status: 'cancelled',
      price: 200000,
      createdAt: '2024-01-08 16:45',
      phone: '010-4567-8901',
    },
    {
      id: 5,
      user: '정회원',
      email: 'jung@example.com',
      program: '요가 클래스',
      instructor: '김요가',
      date: '2024-01-18',
      time: '14:00-15:30',
      room: 'A홀',
      status: 'completed',
      price: 25000,
      createdAt: '2024-01-13 13:10',
      phone: '010-5678-9012',
    },
  ]);

  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedReservation, setSelectedReservation] = useState(null);

  const statuses = ['all', 'pending', 'confirmed', 'completed', 'cancelled'];

  const filteredReservations = reservations.filter(reservation => {
    if (selectedStatus !== 'all' && reservation.status !== selectedStatus) return false;
    if (selectedDate && reservation.date !== selectedDate) return false;
    return true;
  });

  const getStatusBadge = (status: string) => {
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

  const handleStatusChange = (reservationId: number, newStatus: string) => {
    console.log(`예약 ${reservationId}의 상태를 ${newStatus}로 변경`);
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50">
        <main className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">예약 관리</h1>
              <p className="text-gray-600">프로그램 예약 현황을 관리하고 예약 상태를 변경하세요</p>
            </div>

            {/* 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">총 예약</p>
                    <p className="text-3xl font-bold text-blue-600">{reservations.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="ri-calendar-line text-blue-600 w-6 h-6 flex items-center justify-center"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">대기 중</p>
                    <p className="text-3xl font-bold text-yellow-600">{reservations.filter(r => r.status === 'pending').length}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <i className="ri-time-line text-yellow-600 w-6 h-6 flex items-center justify-center"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">확정</p>
                    <p className="text-3xl font-bold text-green-600">{reservations.filter(r => r.status === 'confirmed').length}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <i className="ri-check-line text-green-600 w-6 h-6 flex items-center justify-center"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">완료</p>
                    <p className="text-3xl font-bold text-blue-600">{reservations.filter(r => r.status === 'completed').length}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="ri-check-double-line text-blue-600 w-6 h-6 flex items-center justify-center"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">취소</p>
                    <p className="text-3xl font-bold text-red-600">{reservations.filter(r => r.status === 'cancelled').length}</p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <i className="ri-close-line text-red-600 w-6 h-6 flex items-center justify-center"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* 필터 */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <div className="flex flex-wrap gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">상태</label>
                  <select
                    value={selectedStatus}
                    onChange={e => setSelectedStatus(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>
                        {status === 'all'
                          ? '전체'
                          : status === 'pending'
                            ? '대기 중'
                            : status === 'confirmed'
                              ? '확정'
                              : status === 'completed'
                                ? '완료'
                                : '취소'}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">날짜</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* 예약 목록 */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">예약자</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">프로그램</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">일시</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">장소</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">금액</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredReservations.map(reservation => (
                      <tr key={reservation.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{reservation.user}</div>
                            <div className="text-sm text-gray-500">{reservation.email}</div>
                            <div className="text-sm text-gray-500">{reservation.phone}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{reservation.program}</div>
                            <div className="text-sm text-gray-500">{reservation.instructor} 강사</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{reservation.date}</div>
                            <div className="text-sm text-gray-500">{reservation.time}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reservation.room}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{reservation.price.toLocaleString()}원</td>
                        <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(reservation.status)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setSelectedReservation(reservation)}
                              className="text-blue-600 hover:text-blue-900 cursor-pointer whitespace-nowrap"
                            >
                              상세
                            </button>
                            {reservation.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleStatusChange(reservation.id, 'confirmed')}
                                  className="text-green-600 hover:text-green-900 cursor-pointer whitespace-nowrap"
                                >
                                  승인
                                </button>
                                <button
                                  onClick={() => handleStatusChange(reservation.id, 'cancelled')}
                                  className="text-red-600 hover:text-red-900 cursor-pointer whitespace-nowrap"
                                >
                                  취소
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>

        {/* 예약 상세 모달 */}
        {selectedReservation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">예약 상세 정보</h3>
                <button onClick={() => setSelectedReservation(null)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                  <i className="ri-close-line w-6 h-6 flex items-center justify-center"></i>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">예약자</label>
                  <p className="text-gray-900">{selectedReservation.user}</p>
                  <p className="text-gray-600 text-sm">{selectedReservation.email}</p>
                  <p className="text-gray-600 text-sm">{selectedReservation.phone}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">프로그램</label>
                  <p className="text-gray-900">{selectedReservation.program}</p>
                  <p className="text-gray-600 text-sm">{selectedReservation.instructor} 강사</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">일시 및 장소</label>
                  <p className="text-gray-900">
                    {selectedReservation.date} {selectedReservation.time}
                  </p>
                  <p className="text-gray-600 text-sm">{selectedReservation.room}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">결제 금액</label>
                  <p className="text-gray-900 font-semibold">{selectedReservation.price.toLocaleString()}원</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">예약 일시</label>
                  <p className="text-gray-600">{selectedReservation.createdAt}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">상태</label>
                  <div className="mt-1">{getStatusBadge(selectedReservation.status)}</div>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setSelectedReservation(null)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
                >
                  닫기
                </button>
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                  연락하기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
