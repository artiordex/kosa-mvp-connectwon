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

export default function RoomDetail({ venueId, roomId }: RoomDetailProps) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState('2025-01-15');
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 지점 정보
  const venue = centersData.connectWonCenters.find((v) => v.id === venueId);
  const venueRooms = roomsData.venues.find((v) => v.id === venueId);

  // 룸 정보 찾기
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

  // 룸 이미지 갤러리 (더미 데이터 - 실제로는 room.images 사용)
  const roomImages = [
    room.thumbnail,
    room.thumbnail,
    room.thumbnail,
    room.thumbnail,
  ];

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % roomImages.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + roomImages.length) % roomImages.length);

  // 시간 슬롯 생성 (9시 ~ 21시)
  const timeSlots = Array.from({ length: 13 }, (_, i) => {
    const hour = i + 9;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  // 예약 불가능한 시간 (더미 데이터)
  const bookedSlots = ['10:00', '14:00', '15:00', '16:00'];

  const totalPrice = room.hourlyRate * duration;

  const handleReservation = () => {
    if (!selectedTime) {
      alert('예약 시간을 선택해주세요.');
      return;
    }

    // 종료 시간 계산
    const timeParts = selectedTime.split(':');
    const startHour = parseInt(timeParts[0] || '0');
    const endHour = startHour + duration;
    const timeRange = `${selectedTime} - ${endHour.toString().padStart(2, '0')}:00`;

    // 예약 완료 페이지로 이동
    const params = new URLSearchParams({
      id: `RES-${Date.now()}`,
      venue: venue.name,
      room: room.name,
      date: selectedDate,
      time: timeRange,
      devices: '' // 필요시 추가
    });

    router.push(`/facilities/reservations/complete?${params.toString()}`);
  };

  // 룸 상태 색상
  const getStatusColor = (status: string) => {
    return status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getStatusLabel = (status: string) => {
    return status === 'available' ? '예약 가능' : '사용중';
  };

  // 카테고리 아이콘
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* 네비게이션 */}
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
          {/* 왼쪽: 룸 정보 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 룸 이미지 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative h-96 bg-gray-200">
                <img
                  src={roomImages[currentImageIndex]}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-4 py-2 rounded-lg text-sm font-medium ${getStatusColor(room.status)}`}>
                    {getStatusLabel(room.status)}
                  </span>
                </div>

                {/* 이미지 네비게이션 버튼 */}
                {roomImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                    >
                      <i className="ri-arrow-left-line text-gray-800"></i>
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                    >
                      <i className="ri-arrow-right-line text-gray-800"></i>
                    </button>
                  </>
                )}
              </div>

              {/* 이미지 썸네일 */}
              {roomImages.length > 1 && (
                <div className="p-4 bg-gray-50 flex gap-2 overflow-x-auto">
                  {roomImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        idx === currentImageIndex ? 'border-blue-600' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${room.name} ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

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
                    <p className="text-sm text-gray-500 mb-1">이용 요금</p>
                    <p className="text-3xl font-bold text-green-600">
                      무료
                    </p>
                  </div>
                </div>

                {/* 기본 정보 */}
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

            {/* 공간 설명 */}
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

            {/* 이용 안내 */}
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

            {/* 공간 사용 유의사항 */}
            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-orange-500">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <i className="ri-alert-line mr-2 text-orange-600"></i>
                공간 사용 유의사항
              </h2>
              <div className="bg-orange-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-orange-800 font-medium mb-2">
                  <i className="ri-error-warning-line mr-1"></i>
                  필수 확인 사항
                </p>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <i className="ri-user-heart-line text-blue-600 mr-2 mt-1 flex-shrink-0"></i>
                  <span>ICT콤플렉스 시설은 공용 공간으로 타인의 SW개발 활동에 대한 배려와 매너가 필요한 공간입니다.</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-restaurant-line text-blue-600 mr-2 mt-1 flex-shrink-0"></i>
                  <span>릴렉스존에 한해 간편음식만 드실 수 있습니다. 공간 내 음식물 쓰레기통이 없으니 참고해 주십시오.</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-close-circle-line text-red-600 mr-2 mt-1 flex-shrink-0"></i>
                  <span>SW개발실에는 물과 음료 외의 음식물을 반입할 수 없습니다.</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-shield-check-line text-blue-600 mr-2 mt-1 flex-shrink-0"></i>
                  <span>ICT콤플렉스의 자산(모바일, PC 등)은 임의로 외부 반출이 불가하오니, 반드시 대여 신청을 통해 사용하시기 바랍니다.</span>
                </li>
              </ul>

              <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                <p className="text-xs text-yellow-800">
                  <i className="ri-information-line mr-1"></i>
                  위 사항을 준수하지 않을 경우 시설 이용이 제한될 수 있습니다.
                </p>
              </div>
            </div>
          </div>

          {/* 오른쪽: 예약 폼 */}
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
                  {/* 날짜 선택 */}
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

                  {/* 시간 선택 */}
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

                  {/* 이용 시간 */}
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

                  {/* 가격 요약 */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">공간 대여</span>
                      <span className="font-medium text-green-600">무료</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">이용 시간</span>
                      <span className="font-medium">{duration}시간</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 flex justify-between">
                      <span className="font-semibold text-gray-900">총 비용</span>
                      <span className="font-bold text-green-600 text-xl">
                        무료 대관
                      </span>
                    </div>
                  </div>

                  {/* 예약 버튼 */}
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
