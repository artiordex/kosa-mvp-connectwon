'use client';

import { useState } from 'react';

interface Room {
  id: number;
  name: string;
  capacity: number;
  hourlyRate: number;
  facilities: string[];
  status: 'available' | 'occupied' | 'maintenance';
  currentBooking: null | { program: string; time: string; instructor: string };
  todayBookings: number;
  image: string;
}

interface RoomSettingsProps {
  rooms: Room[];
}

export default function RoomSettings({ rooms }: RoomSettingsProps) {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const getStatusBadge = (status: Room['status']) => {
    switch (status) {
      case 'available':
        return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">사용 가능</span>;
      case 'occupied':
        return <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">사용 중</span>;
      case 'maintenance':
        return <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">점검 중</span>;
      default:
        return null;
    }
  };

  const handleEdit = (room: Room) => {
    setSelectedRoom(room);
    // 추후 모달 열기 or 편집 폼 로직 연결
    alert(`${room.name} 수정 기능 준비중`);
  };

  const handleDelete = (room: Room) => {
    if (confirm(`${room.name}을(를) 삭제하시겠습니까?`)) {
      // 실제 삭제 로직 연결 필요
      alert(`${room.name} 삭제됨`);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rooms.map(room => (
            <div key={room.id} className="border border-gray-200 rounded-lg p-6">
              {/* 헤더 */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{room.name}</h3>
                    {getStatusBadge(room.status)}
                  </div>
                  <p className="text-gray-600">최대 {room.capacity}명 수용</p>
                </div>
                <img src={room.image} alt={room.name} className="w-20 h-20 object-cover object-top rounded-lg" />
              </div>

              {/* 상세 정보 */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-gray-600">
                  <i className="ri-money-dollar-circle-line mr-2 w-5 h-5 flex items-center justify-center"></i>
                  <span>시간당 {room.hourlyRate.toLocaleString()}원</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <i className="ri-calendar-line mr-2 w-5 h-5 flex items-center justify-center"></i>
                  <span>오늘 {room.todayBookings}건 예약</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {room.facilities.map((facility, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                      {facility}
                    </span>
                  ))}
                </div>
              </div>

              {/* 현재 예약 */}
              {room.currentBooking && (
                <div className="bg-red-50 border border-red-200 rounded p-3 mb-4">
                  <p className="text-sm font-medium text-red-900">현재 사용 중</p>
                  <p className="text-sm text-red-700">{room.currentBooking.program}</p>
                  <p className="text-sm text-red-700">
                    {room.currentBooking.time} • {room.currentBooking.instructor}
                  </p>
                </div>
              )}

              {/* 액션 버튼 */}
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer text-sm whitespace-nowrap">
                  예약 현황
                </button>
                <button
                  onClick={() => handleEdit(room)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer text-sm whitespace-nowrap"
                >
                  수정
                </button>
                <button
                  onClick={() => handleDelete(room)}
                  className="flex-1 bg-red-100 text-red-700 py-2 px-4 rounded-lg hover:bg-red-200 transition-colors cursor-pointer text-sm whitespace-nowrap"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
