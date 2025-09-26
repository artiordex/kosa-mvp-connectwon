'use client';

import { useState } from 'react';
import Link from 'next/link';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

export default function MyPage() {
  const [user] = useState({
    name: '홍길동',
    email: 'hong@example.com',
    phone: '010-1234-5678',
    points: 5500,
    memberSince: '2024-01-15',
    profileImage: null,
  });

  const [stats] = useState({
    totalReservations: 12,
    upcomingReservations: 3,
    completedPrograms: 9,
    canceledReservations: 0,
  });

  const [recentReservations] = useState([
    {
      id: 1,
      title: '요가 클래스',
      instructor: '김요가',
      date: '2024-12-20',
      time: '10:00-11:30',
      status: 'upcoming',
      location: '커넥트원 빌딩 3층 A룸',
      participants: 8,
      maxParticipants: 12,
      image:
        'https://readdy.ai/api/search-image?query=Peaceful%20yoga%20class%20with%20instructor%20and%20students%20in%20modern%20studio%2C%20natural%20lighting%2C%20calm%20atmosphere%2C%20people%20in%20comfortable%20yoga%20poses%2C%20minimalist%20clean%20environment&width=300&height=200&seq=mypage-yoga&orientation=landscape',
    },
    {
      id: 2,
      title: '디지털 마케팅 기초',
      instructor: '박마케팅',
      date: '2024-12-22',
      time: '14:00-17:00',
      status: 'upcoming',
      location: '커넥트원 빌딩 2층 B룸',
      participants: 15,
      maxParticipants: 20,
      image:
        'https://readdy.ai/api/search-image?query=Modern%20classroom%20with%20digital%20marketing%20training%20session%2C%20laptops%20and%20presentations%2C%20professional%20instructor%20teaching%20diverse%20group%20of%20students%2C%20contemporary%20learning%20environment&width=300&height=200&seq=mypage-marketing&orientation=landscape',
    },
    {
      id: 3,
      title: '도자기 만들기',
      instructor: '이도예',
      date: '2024-12-15',
      time: '14:00-16:00',
      status: 'completed',
      location: '커넥트원 빌딩 1층 C룸',
      participants: 6,
      maxParticipants: 10,
      image:
        'https://readdy.ai/api/search-image?query=Pottery%20workshop%20with%20people%20creating%20ceramic%20pieces%2C%20hands%20working%20with%20clay%20on%20pottery%20wheels%2C%20artistic%20studio%20environment%2C%20creative%20and%20inspiring%20atmosphere&width=300&height=200&seq=mypage-pottery&orientation=landscape',
    },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">예정</span>;
      case 'completed':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">완료</span>;
      case 'canceled':
        return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">취소</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50 py-8 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">마이페이지</h1>
            <p className="text-gray-600">나의 프로그램 예약과 활동을 관리하세요</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* 사이드바 */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                {/* 프로필 */}
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-user-line text-3xl text-blue-600 w-8 h-8 flex items-center justify-center"></i>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
                  <p className="text-gray-600 text-sm">{user.email}</p>
                  <div className="mt-3 flex items-center justify-center">
                    <i className="ri-coin-line text-yellow-500 mr-1 w-4 h-4 flex items-center justify-center"></i>
                    <span className="text-sm font-medium text-gray-700">{user.points.toLocaleString()} 포인트</span>
                  </div>
                </div>

                {/* 네비게이션 */}
                <nav className="space-y-2">
                  <Link href="/mypage" className="flex items-center px-4 py-3 text-blue-600 bg-blue-50 rounded-lg font-medium cursor-pointer">
                    <i className="ri-dashboard-line mr-3 w-5 h-5 flex items-center justify-center"></i>
                    대시보드
                  </Link>
                  <Link href="/mypage/reservations" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <i className="ri-calendar-line mr-3 w-5 h-5 flex items-center justify-center"></i>내 예약
                  </Link>
                  <Link href="/mypage/profile" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <i className="ri-user-settings-line mr-3 w-5 h-5 flex items-center justify-center"></i>
                    프로필 설정
                  </Link>
                  <Link href="/mypage/points" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <i className="ri-coin-line mr-3 w-5 h-5 flex items-center justify-center"></i>
                    포인트
                  </Link>
                </nav>
              </div>
            </div>

            {/* 메인 콘텐츠 */}
            <div className="lg:col-span-3">
              {/* 통계 카드 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <i className="ri-calendar-check-line text-blue-600 text-xl w-6 h-6 flex items-center justify-center"></i>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">총 예약</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalReservations}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <i className="ri-time-line text-green-600 text-xl w-6 h-6 flex items-center justify-center"></i>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">예정된 예약</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.upcomingReservations}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <i className="ri-check-line text-purple-600 text-xl w-6 h-6 flex items-center justify-center"></i>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">완료된 프로그램</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.completedPrograms}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <i className="ri-coin-line text-yellow-600 text-xl w-6 h-6 flex items-center justify-center"></i>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">보유 포인트</p>
                      <p className="text-2xl font-bold text-gray-900">{user.points.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 최근 예약 */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">최근 예약</h2>
                  <Link href="/mypage/reservations" className="text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer">
                    전체 보기
                  </Link>
                </div>

                <div className="space-y-4">
                  {recentReservations.map(reservation => (
                    <div key={reservation.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <img src={reservation.image} alt={reservation.title} className="w-16 h-16 object-cover object-top rounded-lg" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-gray-900">{reservation.title}</h3>
                            {getStatusBadge(reservation.status)}
                          </div>
                          <p className="text-sm text-gray-600 mb-1">강사: {reservation.instructor}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <i className="ri-calendar-line mr-1 w-4 h-4 flex items-center justify-center"></i>
                            <span>
                              {reservation.date} {reservation.time}
                            </span>
                            <i className="ri-map-pin-line ml-4 mr-1 w-4 h-4 flex items-center justify-center"></i>
                            <span>{reservation.location}</span>
                            <i className="ri-user-line ml-4 mr-1 w-4 h-4 flex items-center justify-center"></i>
                            <span>
                              {reservation.participants}/{reservation.maxParticipants}명
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {reservation.status === 'upcoming' && (
                            <>
                              <button className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50 cursor-pointer whitespace-nowrap">
                                변경
                              </button>
                              <button className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50 cursor-pointer whitespace-nowrap">
                                취소
                              </button>
                            </>
                          )}
                          {reservation.status === 'completed' && (
                            <button className="px-3 py-1 text-sm text-green-600 border border-green-600 rounded hover:bg-green-50 cursor-pointer whitespace-nowrap">
                              리뷰 작성
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 추천 프로그램 */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">추천 프로그램</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: '필라테스 기초',
                      category: '건강',
                      price: 18000,
                      rating: 4.7,
                      image:
                        'https://readdy.ai/api/search-image?query=Pilates%20class%20with%20instructor%20teaching%20proper%20form%20and%20technique%2C%20modern%20fitness%20studio%2C%20people%20exercising%20on%20mats%2C%20professional%20atmosphere%2C%20bright%20lighting&width=300&height=200&seq=recommend-pilates&orientation=landscape',
                    },
                    {
                      title: '영어 회화 집중반',
                      category: '언어',
                      price: 35000,
                      rating: 4.6,
                      image:
                        'https://readdy.ai/api/search-image?query=English%20conversation%20class%20with%20native%20speaker%20teacher%20and%20Korean%20students%2C%20interactive%20learning%20environment%2C%20books%20and%20whiteboards%2C%20friendly%20atmosphere&width=300&height=200&seq=recommend-english&orientation=landscape',
                    },
                  ].map((program, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <img src={program.image} alt={program.title} className="w-full h-32 object-cover object-top" />
                      <div className="p-4">
                        <span className="text-sm text-blue-600 font-medium">{program.category}</span>
                        <h3 className="font-semibold text-gray-900 mt-1 mb-2">{program.title}</h3>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <i className="ri-star-fill text-yellow-400 mr-1 w-4 h-4 flex items-center justify-center"></i>
                            <span className="text-sm text-gray-600">{program.rating}</span>
                          </div>
                          <span className="text-lg font-bold text-blue-600">{program.price.toLocaleString()}원</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
