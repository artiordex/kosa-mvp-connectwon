/**
 * Description : ProgramHeader.tsx - 📌 프로그램 헤더 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-10-12
 */

'use client';

import Image from 'next/image';
import { useState } from 'react';

interface Session {
  id: number;
  date: string;
  time: string;
  spots: number;
  status: string;
}

interface Instructor {
  name: string;
  bio: string;
  experience: string;
  certification: string;
  specialty: string[];
}

interface CenterInfo {
  name: string;
  address: string;
  phone: string;
  room: string;
}

interface ProgramHeaderProps {
  program: {
    title: string;
    category: string;
    level: string;
    duration: string;
    rating: number;
    reviewCount: number;
    participants: number;
    maxParticipants: number;
    instructor: Instructor;
    centerInfo: CenterInfo;
    price: number;
    sessions: Session[];
    images: string[];
  };
  programId: string;
}

const getDefaultImage = (title: string) => {
  const seed = encodeURIComponent(title);
  return `https://api.dicebear.com/7.x/shapes/svg?seed=${seed}`;
};

export default function ProgramHeader({ program, programId }: ProgramHeaderProps) {
  const [selectedSession, setSelectedSession] = useState('');
  const [participants, setParticipants] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  const getImageUrl = (imageUrl: string | undefined, index: number): string => {
    if (!imageUrl || imageUrl === '' || imageErrors[index]) {
      return getDefaultImage(program.title);
    }
    return imageUrl;
  };

  const handleReservation = () => {
    if (!selectedSession) {
      alert('수업 일정을 선택해주세요.');
      return;
    }
    window.location.href = `/reservations/new?programId=${programId}&sessionId=${selectedSession}&participants=${participants}`;
  };

  return (
    <section className="bg-gray-50 py-8">
      <div className="max-w-[80%] mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 lg:p-12">
            {/* 이미지 갤러리 */}
            <div>
              <div className="relative mb-6">
                <Image
                  src={getImageUrl(program.images[currentImageIndex], currentImageIndex)}
                  alt={program.title}
                  width={800}
                  height={600}
                  onError={() => handleImageError(currentImageIndex)}
                  className="w-full h-96 object-cover rounded-xl shadow-lg"
                  priority
                  unoptimized
                />
                {program.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {program.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          currentImageIndex === index ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/70'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {program.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {program.images.map((image, index) => (
                    <Image
                      key={index}
                      src={getImageUrl(image, index)}
                      alt={`${program.title} ${index + 1}`}
                      width={200}
                      height={150}
                      onError={() => handleImageError(index)}
                      className={`w-full h-20 object-cover rounded-lg cursor-pointer transition-all ${
                        currentImageIndex === index
                          ? 'ring-2 ring-blue-500 opacity-100'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                      unoptimized
                    />
                  ))}
                </div>
              )}
            </div>

            {/* 프로그램 정보 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                  {program.category}
                </span>
                <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                  {program.level}
                </span>
                <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">
                  {program.duration}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                {program.title}
              </h1>

              <div className="flex items-center mb-6">
                <div className="flex items-center mr-6">
                  <div className="flex items-center text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={i < Math.floor(program.rating) ? 'ri-star-fill' : 'ri-star-line'}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-lg mr-2">{program.rating}</span>
                  <span className="text-gray-600">({program.reviewCount}개 리뷰)</span>
                </div>
                <span className="text-gray-600 flex items-center">
                  <i className="ri-group-line mr-2" />
                  {program.participants}/{program.maxParticipants}명
                </span>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start text-gray-700">
                  <i className="ri-user-line mr-3 text-blue-600 mt-1" />
                  <div>
                    <span className="font-medium">강사: {program.instructor.name}</span>
                    <p className="text-sm text-gray-600 mt-1">{program.instructor.experience} 경력 • {program.instructor.certification}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-700">
                  <i className="ri-map-pin-line mr-3 text-blue-600" />
                  <span>{program.centerInfo.name} • {program.centerInfo.room}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <i className="ri-map-2-line mr-3 text-blue-600" />
                  <span>{program.centerInfo.address}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <i className="ri-phone-line mr-3 text-blue-600" />
                  <span>{program.centerInfo.phone}</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">수업료</div>
                    <span className="text-3xl font-bold text-blue-600">
                      {program.price === 0 ? '무료' : `${program.price.toLocaleString()}원`}
                    </span>
                    {program.price > 0 && <span className="text-gray-600 ml-2">/ 1회</span>}
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 mb-1">잔여 자리</div>
                    <div className="text-2xl font-bold text-green-600">
                      {program.maxParticipants - program.participants}석
                    </div>
                  </div>
                </div>
              </div>

              {/* 예약 섹션 */}
              <div className="border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <i className="ri-calendar-check-line mr-2 text-blue-600" />
                  수업 예약
                </h3>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    수업 일정 선택
                  </label>
                  <div className="space-y-3">
                    {program.sessions.map((session) => (
                      <label key={session.id} className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        session.spots === 0
                          ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
                          : selectedSession === session.id.toString()
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                      }`}>
                        <input
                          type="radio"
                          name="session"
                          value={session.id}
                          onChange={(e) => setSelectedSession(e.target.value)}
                          disabled={session.spots === 0}
                          className="w-4 h-4 text-blue-600"
                        />
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium text-gray-900">{session.date}</div>
                              <div className="text-sm text-gray-600">{session.time}</div>
                            </div>
                            <div className="text-right">
                              {session.spots > 0 ? (
                                <span className="text-sm font-medium text-green-600">
                                  {session.spots}자리 남음
                                </span>
                              ) : (
                                <span className="text-sm font-medium text-red-600">
                                  마감
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    참여 인원
                  </label>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setParticipants(Math.max(1, participants - 1))}
                      className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 hover:text-blue-600 transition-colors"
                    >
                      <i className="ri-subtract-line" />
                    </button>
                    <span className="w-12 text-center text-xl font-semibold">{participants}</span>
                    <button
                      onClick={() => setParticipants(Math.min(5, participants + 1))}
                      className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 hover:text-blue-600 transition-colors"
                    >
                      <i className="ri-add-line" />
                    </button>
                    <span className="text-sm text-gray-600 ml-4">최대 5명까지</span>
                  </div>
                </div>

                <button
                  onClick={handleReservation}
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  <i className="ri-calendar-check-line mr-2" />
                  예약하기
                </button>

                <p className="text-sm text-gray-600 text-center mt-3">
                  예약 후 24시간 내 확인 메시지를 받으실 수 있습니다
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
