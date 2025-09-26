'use client';

import { useState } from 'react';
import Link from 'next/link';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';

export default function MyReservationsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [reservations] = useState([
    {
      id: 1,
      reservationNumber: 'RES-2024122001',
      title: '요가 클래스',
      instructor: '김요가',
      date: '2024-12-20',
      time: '10:00-11:30',
      status: 'upcoming',
      location: '강남구 피트니스센터',
      address: '서울특별시 강남구 테헤란로 123, 2층',
      price: 15000,
      participants: 1,
      paymentMethod: '신용카드',
      image:
        'https://readdy.ai/api/search-image?query=Peaceful%20yoga%20class%20with%20instructor%20and%20students%20in%20modern%20studio%2C%20natural%20lighting%2C%20calm%20atmosphere%2C%20people%20in%20comfortable%20yoga%20poses%2C%20minimalist%20clean%20environment&width=300&height=200&seq=reservation-yoga&orientation=landscape',
    },
    {
      id: 2,
      reservationNumber: 'RES-2024122002',
      title: '디지털 마케팅 기초',
      instructor: '박마케팅',
      date: '2024-12-22',
      time: '14:00-17:00',
      status: 'upcoming',
      location: '역삼동 교육센터',
      address: '서울특별시 강남구 역삼동 456',
      price: 45000,
      participants: 1,
      paymentMethod: '카카오페이',
      image:
        'https://readdy.ai/api/search-image?query=Modern%20classroom%20with%20digital%20marketing%20training%20session%2C%20laptops%20and%20presentations%2C%20professional%20instructor%20teaching%20diverse%20group%20of%20students%2C%20contemporary%20learning%20environment&width=300&height=200&seq=reservation-marketing&orientation=landscape',
    },
    {
      id: 3,
      reservationNumber: 'RES-2024121501',
      title: '도자기 만들기',
      instructor: '이도예',
      date: '2024-12-15',
      time: '14:00-16:00',
      status: 'completed',
      location: '홍대 공방',
      address: '서울특별시 마포구 홍대입구 789',
      price: 25000,
      participants: 1,
      paymentMethod: '신용카드',
      image:
        'https://readdy.ai/api/search-image?query=Pottery%20workshop%20with%20people%20creating%20ceramic%20pieces%2C%20hands%20working%20with%20clay%20on%20pottery%20wheels%2C%20artistic%20studio%20environment%2C%20creative%20and%20inspiring%20atmosphere&width=300&height=200&seq=reservation-pottery&orientation=landscape',
    },
    {
      id: 4,
      reservationNumber: 'RES-2024121201',
      title: '쿠킹 클래스 - 이탈리안',
      instructor: '김셰프',
      date: '2024-12-12',
      time: '10:00-12:30',
      status: 'completed',
      location: '신촌 쿠킹스튜디오',
      address: '서울특별시 서대문구 신촌동 123',
      price: 55000,
      participants: 2,
      paymentMethod: '계좌이체',
      image:
        'https://readdy.ai/api/search-image?query=Italian%20cooking%20class%20with%20chef%20instructor%20teaching%20students%20how%20to%20make%20pasta%20and%20pizza%2C%20modern%20kitchen%20studio%2C%20ingredients%20and%20cooking%20utensils%2C%20warm%20lighting&width=300&height=200&seq=reservation-cooking&orientation=landscape',
    },
    {
      id: 5,
      reservationNumber: 'RES-2024120801',
      title: '영어 회화 집중반',
      instructor: 'John Smith',
      date: '2024-12-08',
      time: '19:00-20:30',
      status: 'canceled',
      location: '강남구 어학원',
      address: '서울특별시 강남구 논현동 456',
      price: 35000,
      participants: 1,
      paymentMethod: '신용카드',
      image:
        'https://readdy.ai/api/search-image?query=English%20conversation%20class%20with%20native%20speaker%20teacher%20and%20Korean%20students%2C%20interactive%20learning%20environment%2C%20books%20and%20whiteboards%2C%20friendly%20atmosphere&width=300&height=200&seq=reservation-english&orientation=landscape',
    },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">예정</span>;
      case 'completed':
        return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">완료</span>;
      case 'canceled':
        return <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">취소</span>;
      default:
        return null;
    }
  };

  const filteredReservations = reservations.filter(reservation => {
    if (activeTab === 'all') return true;
    return reservation.status === activeTab;
  });

  const tabCounts = {
    all: reservations.length,
    upcoming: reservations.filter(r => r.status === 'upcoming').length,
    completed: reservations.filter(r => r.status === 'completed').length,
    canceled: reservations.filter(r => r.status === 'canceled').length,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">내 예약</h1>
            <p className="text-gray-600">예약한 프로그램 목록을 확인하고 관리하세요</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm">
            {/* 탭 메뉴 */}
            <div className="border-b border-gray-200">
              <div className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`py-4 px-1 font-medium text-sm border-b-2 ${
                    activeTab === 'all' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                  } cursor-pointer whitespace-nowrap`}
                >
                  전체 ({tabCounts.all})
                </button>
                <button
                  onClick={() => setActiveTab('upcoming')}
                  className={`py-4 px-1 font-medium text-sm border-b-2 ${
                    activeTab === 'upcoming' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                  } cursor-pointer whitespace-nowrap`}
                >
                  예정 ({tabCounts.upcoming})
                </button>
                <button
                  onClick={() => setActiveTab('completed')}
                  className={`py-4 px-1 font-medium text-sm border-b-2 ${
                    activeTab === 'completed' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                  } cursor-pointer whitespace-nowrap`}
                >
                  완료 ({tabCounts.completed})
                </button>
                <button
                  onClick={() => setActiveTab('canceled')}
                  className={`py-4 px-1 font-medium text-sm border-b-2 ${
                    activeTab === 'canceled' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                  } cursor-pointer whitespace-nowrap`}
                >
                  취소 ({tabCounts.canceled})
                </button>
              </div>
            </div>

            {/* 예약 목록 */}
            <div className="p-6">
              {filteredReservations.length === 0 ? (
                <div className="text-center py-12">
                  <i className="ri-calendar-line text-gray-400 text-6xl mb-4 w-16 h-16 flex items-center justify-center mx-auto"></i>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">예약이 없습니다</h3>
                  <p className="text-gray-600 mb-6">새로운 프로그램을 예약해보세요</p>
                  <Link
                    href="/programs"
                    className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    프로그램 찾기
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredReservations.map(reservation => (
                    <div key={reservation.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start space-x-4">
                        <img src={reservation.image} alt={reservation.title} className="w-24 h-24 object-cover object-top rounded-lg" />

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-xl font-semibold text-gray-900">{reservation.title}</h3>
                                {getStatusBadge(reservation.status)}
                              </div>
                              <p className="text-sm text-gray-600 mb-1">예약번호: {reservation.reservationNumber}</p>
                              <p className="text-sm text-gray-600">강사: {reservation.instructor}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-blue-600">{reservation.price.toLocaleString()}원</p>
                              <p className="text-sm text-gray-600">{reservation.participants}명</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center text-gray-600">
                              <i className="ri-calendar-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                              <span className="text-sm">
                                {reservation.date} {reservation.time}
                              </span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <i className="ri-bank-card-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                              <span className="text-sm">{reservation.paymentMethod}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <i className="ri-map-pin-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                              <span className="text-sm">{reservation.location}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <i className="ri-map-2-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                              <span className="text-sm">{reservation.address}</span>
                            </div>
                          </div>

                          <div className="flex justify-end space-x-3">
                            {reservation.status === 'upcoming' && (
                              <>
                                <button className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 cursor-pointer whitespace-nowrap">
                                  예약 변경
                                </button>
                                <button className="px-4 py-2 text-sm text-red-600 border border-red-600 rounded-lg hover:bg-red-50 cursor-pointer whitespace-nowrap">
                                  예약 취소
                                </button>
                              </>
                            )}
                            {reservation.status === 'completed' && (
                              <>
                                <button className="px-4 py-2 text-sm text-green-600 border border-green-600 rounded-lg hover:bg-green-50 cursor-pointer whitespace-nowrap">
                                  리뷰 작성
                                </button>
                                <button className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 cursor-pointer whitespace-nowrap">
                                  다시 예약
                                </button>
                              </>
                            )}
                            {reservation.status === 'canceled' && (
                              <button className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 cursor-pointer whitespace-nowrap">
                                다시 예약
                              </button>
                            )}
                            <button className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer whitespace-nowrap">
                              상세보기
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
