/**
 * Description : MyPageMainContent.tsx - 📌 마이페이지 메인 콘텐츠
 * Author : Shiwoo Min
 * Date : 2025-10-12 (patched for newUser - hardened)
 */

'use client';

import Link from 'next/link';

interface Stats {
  totalReservations: number;
  upcomingReservations: number;
  completedPrograms: number;
  canceledReservations: number;
}

interface Reservation {
  id: number | string;
  title: string;
  instructor: string;
  date: string;
  time: string;
  status: string;
  location: string;
  participants: number;
  maxParticipants: number;
  image?: string | null; 
  category?: string;
}

interface RecommendedProgram {
  id: string;
  title: string;
  category: string;
  instructor: string;
  price: number;
  rating: number;
  reviews: number;
  image?: string | null;
  matchReason?: string;
}

interface MyPageMainContentProps {
  stats: Stats;
  userPoints: number;
  recentReservations: Reservation[];
  recommendedPrograms?: RecommendedProgram[];
  userName?: string;
  userRoleFlags?: number;
  onboardingUrl?: string;
}

export default function MyPageMainContent({
  stats,
  userPoints,
  recentReservations,
  recommendedPrograms = [],
  userName,
  userRoleFlags,
  onboardingUrl = '/onboarding',
}: MyPageMainContentProps) {

  const n = (v: unknown, d = 0) => {
    const num = Number(v);
    return Number.isFinite(num) ? num : d;
  };

  const sTotal = n(stats?.totalReservations);
  const sUpcoming = n(stats?.upcomingReservations);
  const sCompleted = n(stats?.completedPrograms);
  const sCanceled = n(stats?.canceledReservations);
  const points = n(userPoints);

  // 신규 가입자 판단: 모든 카운트가 0 & 포인트 0
  const isBrandNew = sTotal === 0 && sUpcoming === 0 && sCompleted === 0 && points === 0;

  const statCards = [
    {
      icon: 'ri-calendar-check-line',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
      label: '총 예약',
      value: sTotal,
    },
    {
      icon: 'ri-time-line',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
      label: '예정된 예약',
      value: sUpcoming,
    },
    {
      icon: 'ri-check-line',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600',
      label: '완료된 프로그램',
      value: sCompleted,
    },
    {
      icon: 'ri-coin-line',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-600',
      label: '보유 포인트',
      value: points.toLocaleString(),
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">예정</span>;
      case 'completed':
        return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">완료</span>;
      case 'canceled':
        return <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium">취소</span>;
      default:
        return null;
    }
  };

  const imgOrPlaceholder = (src?: string | null) =>
    src && src.trim().length > 0 ? src : '/images/placeholder.png';

  return (
    <div className="lg:col-span-3">
      {/* 환영 메시지 */}
      {userName && (
        <div
          className={`rounded-xl p-6 mb-6 text-white ${
            isBrandNew ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' : 'bg-gradient-to-r from-blue-500 to-blue-600'
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">안녕하세요, {userName}님! 👋</h1>
              <p className="opacity-90">
                {isBrandNew
                  ? '가입을 환영합니다. 프로필과 관심사를 설정하면 맞춤 프로그램을 추천해드려요.'
                  : '오늘도 ConnectWon과 함께 성장하는 하루 되세요.'}
              </p>
            </div>

            {isBrandNew && (
              <Link
                href={onboardingUrl}
                className="flex-shrink-0 inline-flex items-center px-4 py-2 bg-white text-emerald-600 rounded-lg font-medium hover:bg-emerald-50 transition-colors"
              >
                온보딩 시작
                <i className="ri-arrow-right-line ml-1"></i>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((item, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">{item.label}</p>
                <p className="text-2xl font-bold text-gray-900">{item.value}</p>
              </div>
              <div className={`w-12 h-12 ${item.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <i className={`${item.icon} ${item.textColor} text-xl w-6 h-6 flex items-center justify-center`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 최근 예약 */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">최근 예약</h2>
          <Link href="/mypage/reservations" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
            전체 보기
            <i className="ri-arrow-right-line ml-1"></i>
          </Link>
        </div>

        {recentReservations?.length > 0 ? (
          <div className="space-y-4">
            {recentReservations.map((r) => (
              <div key={r.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start space-x-4">
                  <img
                    src={imgOrPlaceholder(r.image)}
                    alt={r.title}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{r.title}</h3>
                        {r.category && <span className="text-xs text-gray-500">{r.category}</span>}
                      </div>
                      <div className="ml-2 flex-shrink-0">{getStatusBadge(r.status)}</div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">강사: {r.instructor}</p>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                      <span className="flex items-center">
                        <i className="ri-calendar-line mr-1"></i>
                        {r.date} {r.time}
                      </span>
                      <span className="flex items-center">
                        <i className="ri-map-pin-line mr-1"></i>
                        {r.location}
                      </span>
                      <span className="flex items-center">
                        <i className="ri-user-line mr-1"></i>
                        {n(r.participants)}/{n(r.maxParticipants)}명
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 flex-shrink-0">
                    {r.status === 'upcoming' && (
                      <>
                        <button className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors whitespace-nowrap">
                          변경
                        </button>
                        <button className="px-4 py-2 text-sm text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors whitespace-nowrap">
                          취소
                        </button>
                      </>
                    )}
                    {r.status === 'completed' && (
                      <button className="px-4 py-2 text-sm text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors whitespace-nowrap">
                        리뷰 작성
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <i className="ri-calendar-line text-4xl text-gray-300 mb-4"></i>
            <p className="text-gray-500">
              {isBrandNew ? '아직 예약이 없어요. 온보딩을 완료하고 관심사 기반 추천을 받아보세요.' : '아직 예약한 프로그램이 없습니다.'}
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              {isBrandNew && (
                <Link
                  href={onboardingUrl}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  온보딩 시작
                </Link>
              )}
              <Link href="/programs" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                프로그램 둘러보기
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* 추천 프로그램 */}
      {recommendedPrograms?.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">추천 프로그램</h2>
              <p className="text-sm text-gray-500 mt-1">회원님의 관심사를 바탕으로 추천합니다</p>
            </div>
            <Link href="/programs" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
              더보기
              <i className="ri-arrow-right-line ml-1"></i>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedPrograms.map((program) => (
              <Link
                key={program.id}
                href={`/programs/${program.id}`}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow group"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={imgOrPlaceholder(program.image)}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm text-blue-600 text-xs font-medium px-3 py-1 rounded-full">
                      {program.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">강사: {program.instructor}</p>
                  {program.matchReason && (
                    <p className="text-xs text-blue-600 mb-3 flex items-center">
                      <i className="ri-lightbulb-line mr-1"></i>
                      {program.matchReason}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">{n(program.price).toLocaleString()}원</span>
                    <div className="flex items-center text-sm">
                      <i className="ri-star-fill text-yellow-400 mr-1"></i>
                      <span className="font-medium text-gray-900">{n(program.rating)}</span>
                      <span className="text-gray-500 ml-1">({n(program.reviews)})</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Creator 전용: 내 프로그램 빠른 통계 */}
      {userRoleFlags === 2 && (
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 mt-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">크리에이터 대시보드</h3>
              <p className="text-purple-100 text-sm">내가 만든 프로그램 통계를 확인하세요</p>
            </div>
            <Link
              href="/mypage/programs"
              className="px-4 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors"
            >
              자세히 보기
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
