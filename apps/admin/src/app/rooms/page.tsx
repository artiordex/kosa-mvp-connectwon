
'use client';

import AdminLayout from '../../../components/AdminLayout';
import AdminHeader from '../../../components/AdminHeader';
import { useState } from 'react';

export default function AdminRooms() {
  const [rooms] = useState([
    {
      id: 1,
      name: 'A홀',
      capacity: 20,
      hourlyRate: 50000,
      facilities: ['프로젝터', '음향시설', '화이트보드', '에어컨'],
      status: 'available',
      currentBooking: null,
      todayBookings: 5,
      image: "https://readdy.ai/api/search-image?query=Modern%20spacious%20conference%20room%20with%20projector%20and%20whiteboard%2C%20professional%20meeting%20space%20with%20comfortable%20seating%20arrangement%2C%20bright%20natural%20lighting%2C%20clean%20contemporary%20design&width=400&height=300&seq=room-a&orientation=landscape"
    },
    {
      id: 2,
      name: 'B홀',
      capacity: 15,
      hourlyRate: 40000,
      facilities: ['프로젝터', '음향시설', '화이트보드'],
      status: 'occupied',
      currentBooking: { program: '디지털 마케팅 기초', time: '14:00-17:00', instructor: '박마케팅' },
      todayBookings: 3,
      image: "https://readdy.ai/api/search-image?query=Medium%20sized%20training%20room%20with%20presentation%20setup%2C%20educational%20environment%20with%20comfortable%20chairs%20and%20tables%2C%20modern%20lighting%20and%20audio%20visual%20equipment&width=400&height=300&seq=room-b&orientation=landscape"
    },
    {
      id: 3,
      name: 'C홀',
      capacity: 12,
      hourlyRate: 35000,
      facilities: ['음향시설', '화이트보드', '에어컨'],
      status: 'available',
      currentBooking: null,
      todayBookings: 4,
      image: "https://readdy.ai/api/search-image?query=Cozy%20workshop%20room%20with%20artistic%20setup%2C%20creative%20space%20for%20hands-on%20activities%2C%20good%20lighting%20and%20ventilation%2C%20suitable%20for%20small%20group%20activities&width=400&height=300&seq=room-c&orientation=landscape"
    },
    {
      id: 4,
      name: 'D홀',
      capacity: 25,
      hourlyRate: 60000,
      facilities: ['프로젝터', '음향시설', '화이트보드', '에어컨', '마이크'],
      status: 'maintenance',
      currentBooking: null,
      todayBookings: 0,
      image: "https://readdy.ai/api/search-image?query=Large%20presentation%20hall%20with%20stage%20and%20professional%20audio%20visual%20setup%2C%20spacious%20room%20for%20big%20events%20and%20seminars%2C%20modern%20conference%20facility&width=400&height=300&seq=room-d&orientation=landscape"
    }
  ]);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showAddRoom, setShowAddRoom] = useState(false);

  const getStatusBadge = (status: string) => {
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

  return (
    <AdminLayout>
      {/* 기존 내용 */}
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        
        <main className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">룸 관리</h1>
                <p className="text-gray-600">지점 내 룸 현황을 관리하고 예약 상태를 확인하세요</p>
              </div>
              <button
                onClick={() => setShowAddRoom(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                룸 추가
              </button>
            </div>

            {/* 룸 현황 요약 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">총 룸 수</p>
                    <p className="text-3xl font-bold text-blue-600">{rooms.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="ri-building-line text-blue-600 w-6 h-6 flex items-center justify-center"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">사용 가능</p>
                    <p className="text-3xl font-bold text-green-600">{rooms.filter(r => r.status === 'available').length}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <i className="ri-check-line text-green-600 w-6 h-6 flex items-center justify-center"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">사용 중</p>
                    <p className="text-3xl font-bold text-red-600">{rooms.filter(r => r.status === 'occupied').length}</p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <i className="ri-time-line text-red-600 w-6 h-6 flex items-center justify-center"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">오늘 총 예약</p>
                    <p className="text-3xl font-bold text-purple-600">{rooms.reduce((sum, room) => sum + room.todayBookings, 0)}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <i className="ri-calendar-check-line text-purple-600 w-6 h-6 flex items-center justify-center"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* 룸 목록 */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {rooms.map((room) => (
                    <div key={room.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">{room.name}</h3>
                            {getStatusBadge(room.status)}
                          </div>
                          <p className="text-gray-600">최대 {room.capacity}명 수용</p>
                        </div>
                        <img
                          src={room.image}
                          alt={room.name}
                          className="w-20 h-20 object-cover object-top rounded-lg"
                        />
                      </div>

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

                      {room.currentBooking && (
                        <div className="bg-red-50 border border-red-200 rounded p-3 mb-4">
                          <p className="text-sm font-medium text-red-900">현재 사용 중</p>
                          <p className="text-sm text-red-700">{room.currentBooking.program}</p>
                          <p className="text-sm text-red-700">{room.currentBooking.time} • {room.currentBooking.instructor}</p>
                        </div>
                      )}

                      <div className="flex space-x-2">
                        <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer text-sm whitespace-nowrap">
                          예약 현황
                        </button>
                        <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer text-sm whitespace-nowrap">
                          설정
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AdminLayout>
  );
}
