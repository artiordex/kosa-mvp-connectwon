'use client';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { useState, useEffect } from 'react';

export default function FloorPlanPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('09:00');
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [showRoomDetail, setShowRoomDetail] = useState(false);

  // 회의실 데이터 (실제로는 API에서 가져올 데이터)
  const rooms = [
    {
      id: 1,
      name: 'A홀',
      capacity: 20,
      position: { x: 50, y: 100, width: 150, height: 100 },
      status: 'available',
      currentBooking: null,
      nextBooking: { time: '14:00', duration: 2, booker: '김개발팀' },
      facilities: ['프로젝터', '음향시설', '화이트보드', '에어컨'],
      bookings: [
        { time: '10:00-12:00', booker: '마케팅팀', status: 'confirmed' },
        { time: '14:00-16:00', booker: '김개발팀', status: 'confirmed' }
      ]
    },
    {
      id: 2,
      name: 'B홀',
      capacity: 15,
      position: { x: 250, y: 100, width: 120, height: 100 },
      status: 'occupied',
      currentBooking: { time: '09:00-11:00', booker: '디자인팀', remaining: 45 },
      nextBooking: { time: '13:00', duration: 3, booker: '영업팀' },
      facilities: ['프로젝터', '음향시설', '화이트보드'],
      bookings: [
        { time: '09:00-11:00', booker: '디자인팀', status: 'in-progress' },
        { time: '13:00-16:00', booker: '영업팀', status: 'confirmed' }
      ]
    },
    {
      id: 3,
      name: 'C홀',
      capacity: 12,
      position: { x: 50, y: 250, width: 120, height: 80 },
      status: 'available',
      currentBooking: null,
      nextBooking: null,
      facilities: ['음향시설', '화이트보드', '에어컨'],
      bookings: []
    },
    {
      id: 4,
      name: 'D홀',
      capacity: 25,
      position: { x: 220, y: 250, width: 180, height: 120 },
      status: 'maintenance',
      currentBooking: null,
      nextBooking: null,
      facilities: ['프로젝터', '음향시설', '화이트보드', '에어컨', '마이크'],
      bookings: []
    },
    {
      id: 5,
      name: '소회의실1',
      capacity: 6,
      position: { x: 450, y: 100, width: 80, height: 60 },
      status: 'available',
      currentBooking: null,
      nextBooking: { time: '11:00', duration: 1, booker: '기획팀' },
      facilities: ['화이트보드', '모니터'],
      bookings: [
        { time: '11:00-12:00', booker: '기획팀', status: 'confirmed' }
      ]
    },
    {
      id: 6,
      name: '소회의실2',
      capacity: 6,
      position: { x: 450, y: 200, width: 80, height: 60 },
      status: 'occupied',
      currentBooking: { time: '09:30-10:30', booker: '인사팀', remaining: 15 },
      nextBooking: null,
      facilities: ['화이트보드', '모니터'],
      bookings: [
        { time: '09:30-10:30', booker: '인사팀', status: 'in-progress' }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return '#10B981'; // green-500
      case 'occupied':
        return '#EF4444'; // red-500
      case 'maintenance':
        return '#F59E0B'; // amber-500
      default:
        return '#6B7280'; // gray-500
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return '예약 가능';
      case 'occupied':
        return '사용 중';
      case 'maintenance':
        return '점검 중';
      default:
        return '알 수 없음';
    }
  };

  const handleRoomClick = (room: any) => {
    setSelectedRoom(room.id);
    setShowRoomDetail(true);
  };

  const handleRoomBooking = (roomId: number) => {
    window.location.href = `/rooms/${roomId}/booking?date=${selectedDate}&time=${selectedTime}&duration=2`;
  };

  const selectedRoomData = rooms.find(room => room.id === selectedRoom);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        {/* 헤더 섹션 */}
        <section className="bg-white border-b py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">회의실 현황판</h1>
                <p className="text-gray-600">실시간 회의실 예약 상태를 확인하고 빠르게 예약하세요</p>
              </div>
              <div className="flex space-x-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">날짜</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">시간</label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8 appearance-none bg-white"
                  >
                    {Array.from({ length: 12 }, (_, i) => {
                      const hour = 9 + i;
                      const timeStr = `${hour.toString().padStart(2, '0')}:00`;
                      return (
                        <option key={timeStr} value={timeStr}>{timeStr}</option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>

            {/* 상태 범례 */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                <span className="text-sm text-gray-700">예약 가능</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                <span className="text-sm text-gray-700">사용 중</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-amber-500 rounded mr-2"></div>
                <span className="text-sm text-gray-700">점검 중</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-100 border-2 border-blue-500 rounded mr-2"></div>
                <span className="text-sm text-gray-700">선택된 회의실</span>
              </div>
            </div>
          </div>
        </section>

        {/* 플로어 플랜 */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="relative" style={{ height: '500px', background: '#F8FAFC' }}>
                {/* 배경 격자 */}
                <div className="absolute inset-0 opacity-10">
                  <svg width="100%" height="100%">
                    <defs>
                      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E5E7EB" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>

                {/* 출입구 표시 */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-gray-300 rounded-b flex items-center justify-center">
                  <span className="text-xs text-gray-600">출입구</span>
                </div>

                {/* 복도 표시 */}
                <div className="absolute top-16 left-0 right-0 h-16 bg-gray-100 flex items-center justify-center border-t border-b border-gray-200">
                  <span className="text-gray-500 font-medium">복도</span>
                </div>

                {/* 회의실들 */}
                {rooms.map((room) => (
                  <div
                    key={room.id}
                    onClick={() => handleRoomClick(room)}
                    className={`absolute cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg rounded-lg border-2 flex flex-col items-center justify-center text-white font-medium ${
                      selectedRoom === room.id ? 'border-blue-500 bg-blue-100' : 'border-transparent'
                    }`}
                    style={{
                      left: `${room.position.x}px`,
                      top: `${room.position.y}px`,
                      width: `${room.position.width}px`,
                      height: `${room.position.height}px`,
                      backgroundColor: selectedRoom === room.id ? '#DBEAFE' : getStatusColor(room.status),
                      color: selectedRoom === room.id ? '#1E40AF' : 'white'
                    }}
                  >
                    <h3 className="font-bold text-lg mb-1">{room.name}</h3>
                    <p className="text-sm opacity-90">{room.capacity}명</p>
                    <p className="text-xs opacity-80 mt-1">{getStatusText(room.status)}</p>
                    
                    {/* 현재 사용 중인 경우 남은 시간 표시 */}
                    {room.currentBooking && (
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                        {room.currentBooking.remaining}분 남음
                      </div>
                    )}

                    {/* 다음 예약 표시 */}
                    {room.nextBooking && room.status === 'available' && (
                      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                        {room.nextBooking.time} 예약됨
                      </div>
                    )}
                  </div>
                ))}

                {/* 화장실, 엘리베이터 등 기타 시설 */}
                <div className="absolute bottom-4 right-4 w-20 h-16 bg-gray-300 rounded flex items-center justify-center">
                  <div className="text-center">
                    <i className="ri-women-line text-gray-600 w-4 h-4 flex items-center justify-center mx-auto mb-1"></i>
                    <span className="text-xs text-gray-600">화장실</span>
                  </div>
                </div>

                <div className="absolute bottom-4 right-28 w-16 h-16 bg-gray-400 rounded flex items-center justify-center">
                  <div className="text-center">
                    <i className="ri-building-line text-white w-4 h-4 flex items-center justify-center mx-auto mb-1"></i>
                    <span className="text-xs text-white">EV</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 회의실 상세 정보 모달 */}
        {showRoomDetail && selectedRoomData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedRoomData.name}</h2>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedRoomData.status === 'available' ? 'bg-green-100 text-green-800' :
                        selectedRoomData.status === 'occupied' ? 'bg-red-100 text-red-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {getStatusText(selectedRoomData.status)}
                      </span>
                      <span className="text-gray-600">최대 {selectedRoomData.capacity}명</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowRoomDetail(false)}
                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <i className="ri-close-line w-6 h-6 flex items-center justify-center"></i>
                  </button>
                </div>

                {/* 현재 상태 */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">현재 상태</h3>
                  {selectedRoomData.currentBooking ? (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-red-900">사용 중</p>
                          <p className="text-red-700">{selectedRoomData.currentBooking.booker}</p>
                          <p className="text-sm text-red-600">{selectedRoomData.currentBooking.time}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-red-600">{selectedRoomData.currentBooking.remaining}분</p>
                          <p className="text-sm text-red-600">남음</p>
                        </div>
                      </div>
                    </div>
                  ) : selectedRoomData.status === 'maintenance' ? (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <p className="font-medium text-amber-900">점검 중</p>
                      <p className="text-amber-700">현재 사용할 수 없습니다</p>
                    </div>
                  ) : (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="font-medium text-green-900">예약 가능</p>
                      <p className="text-green-700">지금 바로 예약하실 수 있습니다</p>
                    </div>
                  )}
                </div>

                {/* 오늘 예약 현황 */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">오늘 예약 현황</h3>
                  {selectedRoomData.bookings.length > 0 ? (
                    <div className="space-y-2">
                      {selectedRoomData.bookings.map((booking, index) => (
                        <div key={index} className={`p-3 rounded-lg border ${
                          booking.status === 'in-progress' ? 'bg-red-50 border-red-200' :
                          'bg-gray-50 border-gray-200'
                        }`}>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium text-gray-900">{booking.time}</p>
                              <p className="text-sm text-gray-600">{booking.booker}</p>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              booking.status === 'in-progress' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {booking.status === 'in-progress' ? '진행 중' : '예약됨'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">오늘 예약이 없습니다</p>
                  )}
                </div>

                {/* 시설 정보 */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">이용 가능 시설</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedRoomData.facilities.map((facility, index) => (
                      <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {facility}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 예약 버튼 */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowRoomDetail(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    닫기
                  </button>
                  {selectedRoomData.status === 'available' && (
                    <button
                      onClick={() => handleRoomBooking(selectedRoomData.id)}
                      className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      예약하기
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}