/**
 * Description : mypage/reservations/page.tsx - 📌 내 예약 목록 페이지
 * Author : Shiwoo Min
 * Date : 2025-10-13
 */

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Reservation {
  id: string;
  venue: string;
  room: string;
  date: string;
  time: string;
  devices?: string;
  status: string;
  createdAt: string;
}

export default function MyReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selected, setSelected] = useState<Reservation | null>(null);

  // localStorage에서 예약 불러오기
  useEffect(() => {
    const stored = localStorage.getItem('reservations');
    if (stored) setReservations(JSON.parse(stored));
  }, []);

  // 예약 삭제 기능
  const handleDelete = (id: string) => {
    const updated = reservations.filter((r) => r.id !== id);
    setReservations(updated);
    localStorage.setItem('reservations', JSON.stringify(updated));
  };

  if (reservations.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
        <i className="ri-calendar-line text-5xl text-gray-400 mb-4"></i>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">예약 내역이 없습니다</h1>
        <p className="text-gray-600 mb-6">시설 예약 페이지에서 새 예약을 진행해보세요.</p>
        <Link
          href="/facilities/reservations"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
        >
          예약하기
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">내 예약 내역</h1>

        {/* 예약 리스트 */}
        <div className="grid gap-6">
          {reservations.map((res) => (
            <div
              key={res.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all cursor-pointer"
              onClick={() => setSelected(res)}
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold text-gray-900">
                  {res.venue} · {res.room}
                </h2>
                <span className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-medium">
                  {res.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {res.date} | {res.time}
              </p>
              {res.devices && (
                <p className="text-xs text-gray-500 mt-1">
                  기기: {res.devices.split(',').join(', ')}
                </p>
              )}
              <p className="text-xs text-gray-400 mt-2">
                예약 생성일: {new Date(res.createdAt).toLocaleString('ko-KR')}
              </p>
            </div>
          ))}
        </div>

        {/* 예약 상세 모달 */}
        {selected && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setSelected(null)}
          >
            <div
              className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <i className="ri-close-line text-xl"></i>
              </button>

              <h2 className="text-xl font-bold text-gray-900 mb-4">예약 상세 정보</h2>
              <p className="text-sm text-gray-600 mb-2">예약번호: {selected.id}</p>
              <p className="text-base text-gray-800 font-medium mb-2">
                {selected.venue} · {selected.room}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                {selected.date} | {selected.time}
              </p>
              {selected.devices && (
                <p className="text-sm text-gray-600 mb-2">
                  기기: {selected.devices.split(',').join(', ')}
                </p>
              )}
              <p className="text-xs text-gray-500 mb-4">
                예약 생성일: {new Date(selected.createdAt).toLocaleString('ko-KR')}
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => handleDelete(selected.id)}
                  className="px-4 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                >
                  삭제
                </button>
                <button
                  onClick={() => setSelected(null)}
                  className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
