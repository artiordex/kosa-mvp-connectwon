/**
 * Description : RoomDetail.tsx - 📌 룸 상세 및 예약 페이지
 * Author : Shiwoo Min
 * Date : 2025-10-13
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import roomsData from 'data/rooms-by-venue.json';
import centersData from 'data/venues.json';

interface RoomDetailProps {
  venueId: number;
  roomId: number;
}

// 기본 이미지 생성 함수
const getDefaultImage = (title: string) => {
  const seed = encodeURIComponent(title);
  return `https://api.dicebear.com/7.x/shapes/svg?seed=${seed}`;
};

export default function RoomDetail({ venueId, roomId }: RoomDetailProps) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState('2025-01-15');
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState(1);

  const venue = centersData.connectWonCenters.find((v) => v.id === venueId);
  const venueRooms = roomsData.venues.find((v) => v.id === venueId);

  let room: any = null;
  let categoryInfo: any = null;

  if (venueRooms) {
    for (const category of venueRooms.categories) {
      const foundRoom = category.rooms.find((r) => r.id === roomId);
      if (foundRoom) {
        room = foundRoom;
        categoryInfo = category;
        break;
      }
    }
  }

  if (!room || !venue) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        해당 공간 정보를 찾을 수 없습니다.
      </div>
    );
  }

  const timeSlots = Array.from({ length: 13 }, (_, i) => {
    const hour = i + 9;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const bookedSlots = ['10:00', '14:00', '15:00', '16:00'];
  const totalPrice = room.hourlyRate * duration;

  const handleReservation = () => {
    if (!selectedTime) {
      alert('예약 시간을 선택해주세요.');
      return;
    }

    const timeParts = selectedTime.split(':');
    const startHour = parseInt(timeParts[0] || '0');
    const endHour = startHour + duration;
    const timeRange = `${selectedTime} - ${endHour.toString().padStart(2, '0')}:00`;

    const params = new URLSearchParams({
      id: `RES-${Date.now()}`,
      venue: venue.name,
      room: room.name,
      date: selectedDate,
      time: timeRange,
      devices: ''
    });

    router.push(`/facilities/reservations/complete?${params.toString()}`);
  };

  const getStatusColor = (status: string) => {
    return status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getStatusLabel = (status: string) => {
    return status === 'available' ? '예약 가능' : '사용중';
  };

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'development':
        return 'ri-code-line';
      case 'meeting':
        return 'ri-group-line';
      case 'lounge':
        return 'ri-community-line';
      case 'relax':
        return 'ri-emotion-happy-line';
      case 'studio':
        return 'ri-camera-line';
      case 'workspace':
        return 'ri-briefcase-line';
      case 'education':
        return 'ri-book-line';
      default:
        return 'ri-door-line';
    }
  };

  const thumbnailSrc =
    room.thumbnail && room.thumbnail.trim() !== ''
      ? room.thumbnail
      : getDefaultImage(room.name);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/venues" className="hover:text-blue-600 transition-colors">
              지점 목록
            </Link>
            <i className="ri-arrow-right-s-line"></i>
            <Link href={`/venues/${venueId}`} className="hover:text-blue-600 transition-colors">
              {venue.name}
            </Link>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-gray-900 font-medium">{room.name}</span>
          </nav>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative h-96 bg-gray-200">
                <img
                  src={thumbnailSrc}
                  alt={room.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.src = getDefaultImage(room.name);
                  }}
                />
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${getStatusColor(
                      room.status
                    )}`}
                  >
                    {getStatusLabel(room.status)}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium">
                        <i className={`${getCategoryIcon(categoryInfo.type)} mr-1`}></i>
                        {categoryInfo.label}
                      </span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{room.name}</h1>
                    <p className="text-gray-600 flex items-center">
                      <i className="ri-map-pin-line mr-2"></i>
                      {venue.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 mb-1">시간당</p>
                    <p className="text-3xl font-bold text-blue-600">
                      {room.hourlyRate > 0 ? `${room.hourlyRate.toLocaleString()}원` : '무료'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <i className="ri-group-line text-2xl text-blue-600 mb-2"></i>
                    <p className="text-sm text-gray-500">수용 인원</p>
                    <p className="font-semibold text-gray-900">최대 {room.capacity}명</p>
                  </div>
                  <div className="text-center">
                    <i className="ri-door-open-line text-2xl text-blue-600 mb-2"></i>
                    <p className="text-sm text-gray-500">공간 타입</p>
                    <p className="font-semibold text-gray-900">{categoryInfo.label}</p>
                  </div>
                  <div className="text-center">
                    <i className="ri-time-line text-2xl text-blue-600 mb-2"></i>
                    <p className="text-sm text-gray-500">최소 이용</p>
                    <p className="font-semibold text-gray-900">1시간</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <i className="ri-information-line mr-2 text-blue-600"></i>
                공간 소개
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {room.name}은(는) 다양한 용도로 활용 가능한 공간입니다.
                {room.capacity}명까지 수용 가능하며, 필요한 시설이 모두 갖춰져 있습니다.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">제공 시설</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center text-gray-700">
                  <i className="ri-wifi-line text-green-600 mr-2"></i>
                  고속 Wi-Fi
                </div>
                <div className="flex items-center text-gray-700">
                  <i className="ri-tv-line text-green-600 mr-2"></i>
                  프로젝터/TV
                </div>
                <div className="flex items-center text-gray-700">
                  <i className="ri-mic-line text-green-600 mr-2"></i>
                  음향 시스템
                </div>
                <div className="flex items-center text-gray-700">
                  <i className="ri-pencil-ruler-line text-green-600 mr-2"></i>
                  화이트보드
                </div>
                <div className="flex items-center text-gray-700">
                  <i className="ri-phone-line text-green-600 mr-2"></i>
                  화상회의 장비
                </div>
                <div className="flex items-center text-gray-700">
                  <i className="ri-cup-line text-green-600 mr-2"></i>
                  다과 공간
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <i className="ri-guide-line mr-2 text-blue-600"></i>
                이용 안내
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <i className="ri-checkbox-circle-fill text-green-600 mr-2 mt-1"></i>
                  예약 시간 10분 전까지 도착해주세요
                </li>
                <li className="flex items-start">
                  <i className="ri-checkbox-circle-fill text-green-600 mr-2 mt-1"></i>
                  퇴실 시 정리정돈을 부탁드립니다
                </li>
                <li className="flex items-start">
                  <i className="ri-checkbox-circle-fill text-green-600 mr-2 mt-1"></i>
                  취소는 이용 24시간 전까지 가능합니다
                </li>
                <li className="flex items-start">
                  <i className="ri-checkbox-circle-fill text-green-600 mr-2 mt-1"></i>
                  연장 이용 시 현장에서 추가 결제 가능합니다
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">예약하기</h2>

              {room.status === 'occupied' ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                  <i className="ri-close-circle-line text-red-600 text-3xl mb-2"></i>
                  <p className="text-red-800 font-medium">현재 사용 중인 공간입니다</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <i className="ri-calendar-line mr-1"></i>
                      날짜 선택
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <i className="ri-time-line mr-1"></i>
                      시작 시간
                    </label>
                    <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto p-2 border border-gray-200 rounded-lg">
                      {timeSlots.map((time) => {
                        const isBooked = bookedSlots.includes(time);
                        return (
                          <button
                            key={time}
                            type="button"
                            onClick={() => !isBooked && setSelectedTime(time)}
                            disabled={isBooked}
                            className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                              selectedTime === time
                                ? 'bg-blue-600 text-white'
                                : isBooked
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <i className="ri-hourglass-line mr-1"></i>
                      이용 시간
                    </label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(parseInt(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {[1, 2, 3, 4, 5, 6].map((hour) => (
                        <option key={hour} value={hour}>
                          {hour}시간
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">시간당 요금</span>
                      <span className="font-medium">{room.hourlyRate.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">이용 시간</span>
                      <span className="font-medium">{duration}시간</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 flex justify-between">
                      <span className="font-semibold text-gray-900">총 결제 금액</span>
                      <span className="font-bold text-blue-600 text-xl">
                        {totalPrice.toLocaleString()}원
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleReservation}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
                  >
                    예약하기
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    예약 확정 후 취소는 24시간 전까지 가능합니다
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
