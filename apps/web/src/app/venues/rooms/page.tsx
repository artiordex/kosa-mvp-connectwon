
'use client';

import Header from 'components/Header';
import Footer from 'components/Footer';
import AIChat from 'components/ai/AIChat';
import AIRecommendations from 'components/ai/AIRecommendations';
import Link from 'next/link';
import { useState } from 'react';

export default function RoomsPage() {
  const [selectedDate, setSelectedDate] = useState('2024-12-20');
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState(2);
  const [selectedLocation, setSelectedLocation] = useState('전체');
  const [selectedCapacity, setSelectedCapacity] = useState(0);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);

  const locations = ['전체', '강남지점', '홍대지점', '신촌지점', '건대지점'];

  const rooms = [
    {
      id: 1,
      name: 'A홀',
      location: '강남지점',
      capacity: 20,
      facilities: ['프로젝터', '음향시설', '화이트보드', '에어컨', '주차 가능'],
      rating: 4.8,
      reviewCount: 24,
      nextAvailable: '14:00',
      image: "https://readdy.ai/api/search-image?query=Modern%20spacious%20conference%20room%20with%20projector%20and%20whiteboard%2C%20professional%20meeting%20space%20with%20comfortable%20seating%20arrangement%2C%20bright%20natural%20lighting%2C%20clean%20contemporary%20design%20for%20business%20meetings&width=400&height=300&seq=room-booking-a&orientation=landscape"
    },
    {
      id: 2,
      name: 'B홀',
      location: '강남지점',
      capacity: 15,
      facilities: ['프로젝터', '음향시설', '화이트보드', '와이파이', '주차 가능'],
      rating: 4.7,
      reviewCount: 18,
      nextAvailable: '16:00',
      image: "https://readdy.ai/api/search-image?query=Medium%20sized%20training%20room%20with%20presentation%20setup%2C%20educational%20environment%20with%20comfortable%20chairs%20and%20tables%2C%20modern%20lighting%20and%20audio%20visual%20equipment%20for%20workshops&width=400&height=300&seq=room-booking-b&orientation=landscape"
    },
    {
      id: 3,
      name: 'C홀',
      location: '홍대지점',
      capacity: 12,
      facilities: ['음향시설', '화이트보드', '에어컨', '와이파이'],
      rating: 4.6,
      reviewCount: 15,
      nextAvailable: '10:00',
      image: "https://readdy.ai/api/search-image?query=Cozy%20workshop%20room%20with%20artistic%20setup%2C%20creative%20space%20for%20hands-on%20activities%2C%20good%20lighting%20and%20ventilation%2C%20suitable%20for%20small%20group%20activities%20and%20creative%20workshops&width=400&height=300&seq=room-booking-c&orientation=landscape"
    },
    {
      id: 4,
      name: 'D홀',
      location: '신촌지점',
      capacity: 25,
      facilities: ['프로젝터', '음향시설', '화이트보드', '에어컨', '마이크', '주차 가능'],
      rating: 4.9,
      reviewCount: 32,
      nextAvailable: '09:00',
      image: "https://readdy.ai/api/search-image?query=Large%20presentation%20hall%20with%20stage%20and%20professional%20audio%20visual%20setup%2C%20spacious%20room%20for%20big%20events%20and%20seminars%2C%20modern%20conference%20facility%20with%20excellent%20acoustics&width=400&height=300&seq=room-booking-d&orientation=landscape"
    },
    {
      id: 5,
      name: 'E홀',
      location: '건대지점',
      capacity: 18,
      facilities: ['프로젝터', '음향시설', '화이트보드', '에어컨', '와이파이'],
      rating: 4.5,
      reviewCount: 21,
      nextAvailable: '13:00',
      image: "https://readdy.ai/api/search-image?query=Versatile%20meeting%20room%20with%20flexible%20seating%20arrangement%2C%20modern%20business%20environment%20with%20professional%20equipment%2C%20suitable%20for%20various%20types%20of%20meetings%20and%20presentations&width=400&height=300&seq=room-booking-e&orientation=landscape"
    }
  ];

  const filteredRooms = rooms.filter(room => {
    const locationMatch = selectedLocation === '전체' || room.location === selectedLocation;
    const capacityMatch = selectedCapacity === 0 || room.capacity >= selectedCapacity;
    const facilitiesMatch = selectedFacilities.length === 0 ||
      selectedFacilities.every(facility => room.facilities.includes(facility));
    return locationMatch && capacityMatch && facilitiesMatch;
  });

  const handleRoomBooking = (roomId: number) => {
    if (!selectedTime) {
      alert('예약 시간을 선택해주세요.');
      return;
    }
    window.location.href = `/rooms/${roomId}/booking?date=${selectedDate}&time=${selectedTime}&duration=${duration}`;
  };

  const handleAIBookingRequest = (data: any) => {
    console.log('AI Booking request:', data);
    if (data.roomId) {
      const roomNumber = parseInt(data.roomId.replace('room-', ''));
      if (roomNumber) {
        setSelectedLocation(rooms.find(room => room.id === roomNumber)?.location || '전체');
      }
    }
  };

  const availableFacilities = ['프로젝터', '음향시설', '화이트보드', '에어컨', '마이크', '와이파이', '주차 가능'];

  const handleFacilityToggle = (facility: string) => {
    setSelectedFacilities(prev =>
      prev.includes(facility)
        ? prev.filter(f => f !== facility)
        : [...prev, facility]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-20">
        {/* 검색 및 필터 섹션 */}
        <section className="bg-blue-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                룸 예약
              </h1>
              <p className="text-gray-600">
                원하는 시간과 장소에서 무료로 룸을 이용하세요
              </p>
            </div>

            {/* 예약 조건 입력 */}
            <div className="bg-white rounded-xl p-6 shadow-sm max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">날짜</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">시작 시간</label>
                  <div className="relative">
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8 appearance-none bg-white"
                    >
                      <option value="">시간 선택</option>
                      <option value="09:00">09:00</option>
                      <option value="10:00">10:00</option>
                      <option value="11:00">11:00</option>
                      <option value="12:00">12:00</option>
                      <option value="13:00">13:00</option>
                      <option value="14:00">14:00</option>
                      <option value="15:00">15:00</option>
                      <option value="16:00">16:00</option>
                      <option value="17:00">17:00</option>
                      <option value="18:00">18:00</option>
                      <option value="19:00">19:00</option>
                      <option value="20:00">20:00</option>
                    </select>
                    <i className="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 flex items-center justify-center pointer-events-none"></i>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">사용 시간</label>
                  <div className="relative">
                    <select
                      value={duration}
                      onChange={(e) => setDuration(parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8 appearance-none bg-white"
                    >
                      <option value={1}>1시간</option>
                      <option value={2}>2시간</option>
                      <option value={3}>3시간</option>
                      <option value={4}>4시간</option>
                      <option value={5}>5시간</option>
                      <option value={6}>6시간</option>
                    </select>
                    <i className="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 flex items-center justify-center pointer-events-none"></i>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">지점</label>
                  <div className="relative">
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8 appearance-none bg-white"
                    >
                      {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                    <i className="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 flex items-center justify-center pointer-events-none"></i>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">최소 인원</label>
                  <div className="relative">
                    <select
                      value={selectedCapacity}
                      onChange={(e) => setSelectedCapacity(parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8 appearance-none bg-white"
                    >
                      <option value={0}>인원 무관</option>
                      <option value={10}>10명 이상</option>
                      <option value={15}>15명 이상</option>
                      <option value={20}>20명 이상</option>
                      <option value={25}>25명 이상</option>
                    </select>
                    <i className="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 flex items-center justify-center pointer-events-none"></i>
                  </div>
                </div>
              </div>

              {/* 시설 필터 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">필요한 시설</label>
                <div className="flex flex-wrap gap-2">
                  {availableFacilities.map(facility => (
                    <button
                      key={facility}
                      onClick={() => handleFacilityToggle(facility)}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer whitespace-nowrap ${
                        selectedFacilities.includes(facility)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {facility}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI 추천 섹션 */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AIRecommendations
              type="room"
              userId="user1"
              userPreferences={{
                capacity: selectedCapacity,
                facilities: selectedFacilities,
                location: selectedLocation
              }}
            />
          </div>
        </section>

        {/* 룸 목록 */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                사용 가능한 룸 ({filteredRooms.length}개)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRooms.map((room) => (
                <div key={room.id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-48 object-cover object-top rounded-t-xl"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                        {room.location}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        무료
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {room.name}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <i className="ri-group-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                        <span className="text-sm">최대 {room.capacity}명</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <i className="ri-time-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                        <span className="text-sm">다음 가능: {room.nextAvailable}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {room.facilities.slice(0, 3).map((facility, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {facility}
                        </span>
                      ))}
                      {room.facilities.length > 3 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          +{room.facilities.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <i className="ri-star-fill text-yellow-400 mr-1 w-4 h-4 flex items-center justify-center"></i>
                        <span className="text-sm text-gray-600">{room.rating}</span>
                        <span className="text-sm text-gray-500 ml-2">({room.reviewCount}개)</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-green-600">무료</span>
                        <span className="text-gray-600 text-sm">/시간</span>
                      </div>
                      <button
                        onClick={() => handleRoomBooking(room.id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        예약하기
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredRooms.length === 0 && (
              <div className="text-center py-12">
                <i className="ri-building-line text-gray-400 text-6xl mb-4 w-16 h-16 flex items-center justify-center mx-auto"></i>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">선택한 조건에 맞는 룸이 없습니다</h3>
                <p className="text-gray-600">다른 조건으로 검색해보세요</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      <AIChat onBookingRequest={handleAIBookingRequest} />
    </div>
  );
}
