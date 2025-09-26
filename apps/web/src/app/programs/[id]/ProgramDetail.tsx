
'use client';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Link from 'next/link';
import { useState } from 'react';

interface ProgramDetailProps {
  programId: string;
}

export default function ProgramDetail({ programId }: ProgramDetailProps) {
  const [selectedSession, setSelectedSession] = useState('');
  const [participants, setParticipants] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // 실제로는 API에서 가져올 데이터
  const programs = {
    '1': {
      id: '1',
      title: '요가 클래스',
      category: '건강',
      location: '강남센터',
      centerInfo: {
        name: '강남센터',
        address: '서울시 강남구 테헤란로 123',
        phone: '02-1234-5678',
        room: 'A홀'
      },
      price: 15000,
      rating: 4.8,
      reviewCount: 156,
      participants: 8,
      maxParticipants: 12,
      duration: '90분',
      level: '초급',
      instructor: {
        name: '김요가',
        bio: '10년 경력의 요가 전문 강사로, 하타 요가와 빈야사 요가를 전문으로 합니다. 초보자부터 숙련자까지 모든 레벨의 수강생들이 안전하고 효과적으로 요가를 배울 수 있도록 도와드립니다.',
        experience: '10년',
        certification: '국제요가협회 RYT 500시간 자격증',
        specialty: ['하타 요가', '빈야사 요가', '명상', '호흡법']
      },
      description: '스트레스 해소와 몸의 균형을 찾아주는 요가 클래스입니다. 기초적인 자세부터 차근차근 배워나가며, 호흡과 명상을 통해 몸과 마음의 안정을 찾을 수 있습니다. 요가 매트와 블록 등 모든 용품이 제공되며, 편안한 운동복만 준비해 오시면 됩니다.',
      fullDescription: '스트레스가 많은 현대인들을 위한 전문 요가 클래스입니다. 이 프로그램은 요가의 기본 철학부터 실제 아사나(자세) 수행까지, 체계적이고 안전한 요가 수련을 제공합니다.\n\n수업은 명상과 호흡법으로 시작하여 마음을 집중시키고, 점진적으로 몸을 풀어주는 워밍업 동작을 진행합니다. 이후 기본 요가 자세들을 단계별로 학습하며, 각 개인의 유연성과 체력 수준에 맞춰 개별 지도가 이루어집니다.\n\n특히 초보자들도 부담 없이 참여할 수 있도록 다양한 수정 동작과 보조 도구를 활용하여 안전하고 효과적인 수련을 돕습니다. 수업 마지막에는 시체 자세(사바사나)를 통해 깊은 이완과 명상 시간을 가지며, 일상의 스트레스를 완전히 해소할 수 있습니다.',
      objectives: [
        '스트레스 해소 및 정신적 안정감 증진',
        '신체 유연성과 균형감각 향상',
        '올바른 호흡법 습득',
        '코어 근력 강화 및 자세 교정',
        '명상을 통한 집중력 향상',
        '일상생활에서의 마음챙김 실천'
      ],
      curriculum: [
        {
          week: 1,
          title: '요가 기초 및 호흡법',
          content: '요가의 기본 철학, 기초 호흡법, 기본 자세 익히기'
        },
        {
          week: 2,
          title: '선 자세 (스탠딩 포즈)',
          content: '전사 자세, 삼각 자세, 나무 자세 등 균형감각 기르기'
        },
        {
          week: 3,
          title: '앉은 자세와 비틀기',
          content: '앉은 전굴, 비틀기 자세로 척추 건강 관리'
        },
        {
          week: 4,
          title: '백벤드와 코어 강화',
          content: '후굴 자세와 복부 강화를 위한 요가 동작'
        }
      ],
      whatYouLearn: [
        '기본 요가 자세 (아사나) 익히기',
        '올바른 호흡법 (프라나야마)',
        '스트레스 해소를 위한 명상법',
        '몸의 유연성과 근력 향상',
        '일상에서 실천할 수 있는 간단한 동작들'
      ],
      requirements: [
        '요가 경험이 없어도 참여 가능',
        '편안한 운동복 착용 권장',
        '수업 2시간 전 식사 금지',
        '개인 수건 지참',
        '임신 중이거나 부상이 있는 경우 사전 상담 필요'
      ],
      providedItems: [
        '요가 매트',
        '요가 블록',
        '요가 스트랩',
        '볼스터',
        '담요'
      ],
      sessions: [
        { id: 1, date: '2024-12-20', time: '10:00-11:30', spots: 5, status: 'available' },
        { id: 2, date: '2024-12-22', time: '14:00-15:30', spots: 8, status: 'available' },
        { id: 3, date: '2024-12-24', time: '10:00-11:30', spots: 3, status: 'available' },
        { id: 4, date: '2024-12-26', time: '16:00-17:30', spots: 10, status: 'available' },
        { id: 5, date: '2024-12-28', time: '10:00-11:30', spots: 7, status: 'available' }
      ],
      images: [
        "https://readdy.ai/api/search-image?query=Peaceful%20yoga%20class%20with%20instructor%20and%20students%20in%20modern%20studio%2C%20natural%20lighting%20streaming%20through%20windows%2C%20calm%20atmosphere%20with%20people%20in%20comfortable%20yoga%20poses%20on%20mats%2C%20minimalist%20clean%20environment%20with%20plants%2C%20professional%20photography%20of%20wellness%20session&width=800&height=600&seq=yoga-main&orientation=landscape",
        "https://readdy.ai/api/search-image?query=Yoga%20studio%20interior%20with%20neatly%20arranged%20mats%20and%20props%2C%20meditation%20space%20with%20plants%20and%20natural%20lighting%2C%20serene%20and%20welcoming%20environment%20for%20yoga%20practice%2C%20modern%20wellness%20center%20with%20wooden%20floors%20and%20clean%20design&width=800&height=600&seq=yoga-studio&orientation=landscape",
        "https://readdy.ai/api/search-image?query=Professional%20yoga%20instructor%20demonstrating%20poses%20and%20teaching%20students%20proper%20alignment%20and%20breathing%20techniques%20in%20bright%20studio%20space%2C%20group%20class%20with%20diverse%20participants%2C%20supportive%20learning%20environment&width=800&height=600&seq=yoga-instruction&orientation=landscape",
        "https://readdy.ai/api/search-image?query=Yoga%20equipment%20and%20props%20arranged%20beautifully%2C%20mats%20blocks%20straps%20and%20bolsters%20in%20modern%20studio%2C%20wellness%20accessories%20for%20yoga%20practice%2C%20minimalist%20aesthetic%20with%20natural%20lighting&width=800&height=600&seq=yoga-equipment&orientation=landscape"
      ],
      reviews: [
        {
          id: 1,
          name: '이수진',
          rating: 5,
          date: '2024-01-15',
          comment: '김요가 선생님의 세심한 지도 덕분에 요가 초보자인 제가 안전하게 배울 수 있었어요. 스트레스가 많이 줄어들었습니다.'
        },
        {
          id: 2,
          name: '박민호',
          rating: 5,
          date: '2024-01-10',
          comment: '매주 참여하고 있는데 몸이 많이 유연해졌고 자세도 좋아졌어요. 추천합니다!'
        },
        {
          id: 3,
          name: '최영희',
          rating: 4,
          date: '2024-01-05',
          comment: '분위기가 차분하고 좋아요. 명상 시간이 특히 마음에 들어요.'
        }
      ]
    },
    '2': {
      id: '2',
      title: '디지털 마케팅 기초',
      category: '비즈니스',
      location: '마포센터',
      centerInfo: {
        name: '마포센터',
        address: '서울시 마포구 홍익로 456',
        phone: '02-2345-6789',
        room: 'C홀'
      },
      price: 50000,
      rating: 4.6,
      reviewCount: 89,
      participants: 15,
      maxParticipants: 20,
      duration: '180분',
      level: '초급-중급',
      instructor: {
        name: '박마케팅',
        bio: '네이버, 카카오에서 디지털 마케팅 업무를 담당했으며, 현재는 마케팅 컨설턴트로 활동하고 있습니다. 실무 경험을 바탕으로 한 실전형 교육을 제공합니다.',
        experience: '8년',
        certification: 'Google Ads 인증, Facebook Blueprint 인증',
        specialty: ['퍼포먼스 마케팅', 'SNS 마케팅', '콘텐츠 마케팅', 'GA4 분석']
      },
      description: '디지털 시대에 필수적인 온라인 마케팅 전략과 실무 스킬을 배우는 프로그램입니다.',
      fullDescription: '현재 모든 비즈니스에서 필수가 된 디지털 마케팅의 핵심을 배우는 실무 중심 프로그램입니다.',
      objectives: [
        '디지털 마케팅 전략 수립 능력',
        'SNS 마케팅 실무 스킬',
        '광고 운영 및 최적화',
        '데이터 분석 및 인사이트 도출'
      ],
      curriculum: [],
      whatYouLearn: [
        '디지털 마케팅 전략 수립',
        'SNS 마케팅 (인스타그램, 페이스북)',
        'Google Ads 광고 운영',
        '콘텐츠 마케팅 기획',
        'GA4를 활용한 데이터 분석'
      ],
      requirements: [
        '기본적인 컴퓨터 활용 능력',
        '개인 노트북 지참',
        '마케팅에 대한 관심'
      ],
      providedItems: [
        '실습용 계정',
        '교육 자료',
        '수료증'
      ],
      sessions: [
        { id: 1, date: '2024-12-21', time: '14:00-17:00', spots: 3, status: 'available' },
        { id: 2, date: '2024-12-28', time: '14:00-17:00', spots: 8, status: 'available' }
      ],
      images: [
        "https://readdy.ai/api/search-image?query=Digital%20marketing%20workshop%20with%20laptops%20and%20presentations%2C%20modern%20classroom%20setting%20with%20screens%20showing%20marketing%20analytics%20and%20social%20media%20campaigns%2C%20professional%20learning%20environment%20for%20business%20education%20with%20instructor%20teaching%20students&width=800&height=600&seq=marketing-main&orientation=landscape",
        "https://readdy.ai/api/search-image?query=Business%20training%20classroom%20with%20modern%20technology%20setup%2C%20digital%20screens%20showing%20marketing%20data%20and%20analytics%2C%20professional%20workshop%20environment%20for%20digital%20marketing%20education&width=800&height=600&seq=marketing-class&orientation=landscape"
      ],
      reviews: []
    }
  };

  const program = programs[programId as keyof typeof programs] || programs['1'];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  const handleReservation = () => {
    if (!selectedSession) {
      alert('수업 일정을 선택해주세요.');
      return;
    }
    window.location.href = `/reservations/new?programId=${programId}&sessionId=${selectedSession}&participants=${participants}`;
  };

  const tabs = [
    { id: 'overview', name: '개요', icon: 'ri-information-line' },
    { id: 'curriculum', name: '커리큘럼', icon: 'ri-book-line' },
    { id: 'instructor', name: '강사', icon: 'ri-user-line' },
    { id: 'reviews', name: '후기', icon: 'ri-star-line' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20">
        {/* 브레드크럼 */}
        <section className="bg-gray-50 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600">홈</Link>
              <i className="ri-arrow-right-s-line w-4 h-4 flex items-center justify-center"></i>
              <Link href="/programs" className="hover:text-blue-600">프로그램</Link>
              <i className="ri-arrow-right-s-line w-4 h-4 flex items-center justify-center"></i>
              <span className="text-gray-900">{program.title}</span>
            </nav>
          </div>
        </section>

        {/* 프로그램 헤더 */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* 이미지 갤러리 */}
              <div>
                <div className="relative mb-6">
                  <img 
                    src={program.images[currentImageIndex]}
                    alt={program.title}
                    className="w-full h-96 object-cover object-top rounded-xl shadow-lg"
                  />
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
                </div>
                
                {program.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-3">
                    {program.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${program.title} ${index + 1}`}
                        className={`w-full h-20 object-cover object-top rounded-lg cursor-pointer transition-all ${
                          currentImageIndex === index 
                            ? 'ring-2 ring-blue-500 opacity-100' 
                            : 'opacity-70 hover:opacity-100'
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
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
                          className={`ri-star-${i < Math.floor(program.rating) ? 'fill' : 'line'} w-5 h-5 flex items-center justify-center`}
                        ></i>
                      ))}
                    </div>
                    <span className="font-semibold text-lg mr-2">{program.rating}</span>
                    <span className="text-gray-600">({program.reviewCount}개 리뷰)</span>
                  </div>
                  <span className="text-gray-600 flex items-center">
                    <i className="ri-group-line mr-2 w-5 h-5 flex items-center justify-center"></i>
                    {program.participants}/{program.maxParticipants}명
                  </span>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start text-gray-700">
                    <i className="ri-user-line mr-3 w-5 h-5 flex items-center justify-center text-blue-600 mt-1"></i>
                    <div>
                      <span className="font-medium">강사: {program.instructor.name}</span>
                      <p className="text-sm text-gray-600 mt-1">{program.instructor.experience} 경력 • {program.instructor.certification}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <i className="ri-map-pin-line mr-3 w-5 h-5 flex items-center justify-center text-blue-600"></i>
                    <span>{program.centerInfo.name} • {program.centerInfo.room}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <i className="ri-map-2-line mr-3 w-5 h-5 flex items-center justify-center text-blue-600"></i>
                    <span>{program.centerInfo.address}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <i className="ri-phone-line mr-3 w-5 h-5 flex items-center justify-center text-blue-600"></i>
                    <span>{program.centerInfo.phone}</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl mb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">수업료</div>
                      <span className="text-3xl font-bold text-blue-600">
                        {program.price.toLocaleString()}원
                      </span>
                      <span className="text-gray-600 ml-2">/ 1회</span>
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
                    <i className="ri-calendar-check-line mr-2 w-6 h-6 flex items-center justify-center text-blue-600"></i>
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
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
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
                        className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        <i className="ri-subtract-line w-5 h-5 flex items-center justify-center"></i>
                      </button>
                      <span className="w-12 text-center text-xl font-semibold">{participants}</span>
                      <button
                        onClick={() => setParticipants(Math.min(5, participants + 1))}
                        className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        <i className="ri-add-line w-5 h-5 flex items-center justify-center"></i>
                      </button>
                      <span className="text-sm text-gray-600 ml-4">최대 5명까지</span>
                    </div>
                  </div>

                  <button
                    onClick={handleReservation}
                    className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap shadow-lg hover:shadow-xl"
                  >
                    <i className="ri-calendar-check-line mr-2 w-5 h-5 flex items-center justify-center"></i>
                    예약하기
                  </button>
                  
                  <p className="text-sm text-gray-600 text-center mt-3">
                    예약 후 24시간 내 확인 메시지를 받으실 수 있습니다
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 탭 네비게이션 */}
        <section className="bg-white border-b sticky top-20 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap flex items-center transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <i className={`${tab.icon} mr-2 w-4 h-4 flex items-center justify-center`}></i>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </section>

        {/* 탭 콘텐츠 */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* 개요 탭 */}
            {activeTab === 'overview' && (
              <div className="space-y-12">
                {/* 프로그램 소개 */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <i className="ri-information-line mr-3 w-8 h-8 flex items-center justify-center text-blue-600"></i>
                    프로그램 소개
                  </h2>
                  <div className="bg-gray-50 p-8 rounded-xl">
                    <p className="text-gray-700 leading-relaxed text-lg mb-4">
                      {program.description}
                    </p>
                    {program.fullDescription && (
                      <>
                        {showFullDescription ? (
                          <div>
                            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                              {program.fullDescription}
                            </div>
                            <button
                              onClick={() => setShowFullDescription(false)}
                              className="text-blue-600 hover:underline mt-4 cursor-pointer"
                            >
                              접기
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setShowFullDescription(true)}
                            className="text-blue-600 hover:underline cursor-pointer"
                          >
                            자세히 보기
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* 학습 목표 */}
                {program.objectives.length > 0 && (
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                      <i className="ri-target-line mr-3 w-8 h-8 flex items-center justify-center text-blue-600"></i>
                      학습 목표
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {program.objectives.map((objective, index) => (
                        <div key={index} className="flex items-start bg-blue-50 p-4 rounded-lg">
                          <i className="ri-check-line text-blue-600 mr-3 mt-1 w-5 h-5 flex items-center justify-center"></i>
                          <span className="text-gray-800 font-medium">{objective}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 배우는 내용 */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <i className="ri-book-open-line mr-3 w-8 h-8 flex items-center justify-center text-blue-600"></i>
                    배우는 내용
                  </h2>
                  <div className="bg-green-50 p-8 rounded-xl">
                    <ul className="space-y-4">
                      {program.whatYouLearn.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <i className="ri-check-line text-green-600 mr-3 mt-1 w-5 h-5 flex items-center justify-center"></i>
                          <span className="text-gray-800 text-lg">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 준비사항 및 제공용품 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <i className="ri-alert-line mr-3 w-6 h-6 flex items-center justify-center text-orange-600"></i>
                      준비사항
                    </h2>
                    <div className="bg-orange-50 p-6 rounded-xl">
                      <ul className="space-y-3">
                        {program.requirements.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <i className="ri-information-line text-orange-600 mr-3 mt-1 w-4 h-4 flex items-center justify-center"></i>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <i className="ri-gift-line mr-3 w-6 h-6 flex items-center justify-center text-purple-600"></i>
                      제공용품
                    </h2>
                    <div className="bg-purple-50 p-6 rounded-xl">
                      <ul className="space-y-3">
                        {program.providedItems.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <i className="ri-check-line text-purple-600 mr-3 mt-1 w-4 h-4 flex items-center justify-center"></i>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 커리큘럼 탭 */}
            {activeTab === 'curriculum' && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                  <i className="ri-book-line mr-3 w-8 h-8 flex items-center justify-center text-blue-600"></i>
                  상세 커리큘럼
                </h2>
                {program.curriculum.length > 0 ? (
                  <div className="space-y-6">
                    {program.curriculum.map((week, index) => (
                      <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors">
                        <div className="flex items-start">
                          <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 mt-1">
                            {week.week}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{week.title}</h3>
                            <p className="text-gray-700 leading-relaxed">{week.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <i className="ri-book-line text-gray-400 text-6xl mb-4 w-16 h-16 flex items-center justify-center mx-auto"></i>
                    <p className="text-gray-600 text-lg">상세 커리큘럼이 준비 중입니다.</p>
                    <p className="text-gray-500 mt-2">자세한 내용은 수업 시작 전에 안내드립니다.</p>
                  </div>
                )}
              </div>
            )}

            {/* 강사 탭 */}
            {activeTab === 'instructor' && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                  <i className="ri-user-line mr-3 w-8 h-8 flex items-center justify-center text-blue-600"></i>
                  강사 소개
                </h2>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl">
                  <div className="flex items-start mb-6">
                    <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                      <i className="ri-user-line text-3xl text-white w-12 h-12 flex items-center justify-center"></i>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{program.instructor.name}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-700">
                          <i className="ri-medal-line mr-2 w-5 h-5 flex items-center justify-center text-blue-600"></i>
                          <span className="font-medium">{program.instructor.experience} 경력</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <i className="ri-award-line mr-2 w-5 h-5 flex items-center justify-center text-blue-600"></i>
                          <span>{program.instructor.certification}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">강사 소개</h4>
                    <p className="text-gray-700 leading-relaxed text-lg">{program.instructor.bio}</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">전문 분야</h4>
                    <div className="flex flex-wrap gap-2">
                      {program.instructor.specialty.map((specialty, index) => (
                        <span key={index} className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 후기 탭 */}
            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                    <i className="ri-star-line mr-3 w-8 h-8 flex items-center justify-center text-blue-600"></i>
                    수강생 후기
                  </h2>
                  <div className="text-right">
                    <div className="flex items-center text-yellow-400 text-2xl mb-1">
                      {[...Array(5)].map((_, i) => (
                        <i 
                          key={i}
                          className={`ri-star-${i < Math.floor(program.rating) ? 'fill' : 'line'} w-6 h-6 flex items-center justify-center`}
                        ></i>
                      ))}
                    </div>
                    <div className="text-gray-600">
                      {program.rating}/5.0 ({program.reviewCount}개 후기)
                    </div>
                  </div>
                </div>

                {program.reviews.length > 0 ? (
                  <div className="space-y-6">
                    {program.reviews.map((review) => (
                      <div key={review.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                              <i className="ri-user-line text-gray-600 w-6 h-6 flex items-center justify-center"></i>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{review.name}</h4>
                              <div className="flex items-center mt-1">
                                <div className="flex items-center text-yellow-400 mr-2">
                                  {[...Array(5)].map((_, i) => (
                                    <i 
                                      key={i}
                                      className={`ri-star-${i < review.rating ? 'fill' : 'line'} w-4 h-4 flex items-center justify-center`}
                                    ></i>
                                  ))}
                                </div>
                                <span className="text-sm text-gray-600">{review.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <i className="ri-star-line text-gray-400 text-6xl mb-4 w-16 h-16 flex items-center justify-center mx-auto"></i>
                    <p className="text-gray-600 text-lg">아직 등록된 후기가 없습니다.</p>
                    <p className="text-gray-500 mt-2">첫 번째 후기를 남겨보세요!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* 관련 프로그램 */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">이런 프로그램은 어떠세요?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  id: '2',
                  title: '필라테스 기초',
                  category: '건강',
                  price: 18000,
                  rating: 4.7,
                  duration: '75분',
                  image: "https://readdy.ai/api/search-image?query=Pilates%20class%20with%20instructor%20teaching%20proper%20form%20and%20technique%2C%20modern%20fitness%20studio%20with%20natural%20lighting%2C%20people%20exercising%20on%20mats%20with%20pilates%20equipment%2C%20professional%20wellness%20atmosphere%2C%20bright%20clean%20environment&width=400&height=300&seq=pilates-related&orientation=landscape"
                },
                {
                  id: '3',
                  title: '명상과 힐링',
                  category: '건강',
                  price: 12000,
                  rating: 4.9,
                  duration: '60분',
                  image: "https://readdy.ai/api/search-image?query=Meditation%20and%20healing%20session%20with%20people%20sitting%20peacefully%20in%20lotus%20position%2C%20peaceful%20environment%20with%20candles%20and%20soft%20lighting%2C%20serene%20and%20calming%20atmosphere%20for%20mindfulness%20practice&width=400&height=300&seq=meditation-related&orientation=landscape"
                },
                {
                  id: '4',
                  title: '스트레칭 클래스',
                  category: '건강',
                  price: 10000,
                  rating: 4.6,
                  duration: '50분',
                  image: "https://readdy.ai/api/search-image?query=Stretching%20class%20with%20instructor%20guiding%20flexibility%20exercises%2C%20people%20doing%20various%20stretches%20in%20bright%20fitness%20studio%2C%20healthy%20lifestyle%20focus%2C%20wellness%20and%20fitness%20environment&width=400&height=300&seq=stretching-related&orientation=landscape"
                }
              ].map((relatedProgram, index) => (
                <Link key={index} href={`/programs/${relatedProgram.id}`} className="group">
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="relative">
                      <img 
                        src={relatedProgram.image}
                        alt={relatedProgram.title}
                        className="w-full h-48 object-cover object-top rounded-t-xl group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {relatedProgram.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {relatedProgram.title}
                      </h3>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <i className="ri-star-fill text-yellow-400 mr-1 w-4 h-4 flex items-center justify-center"></i>
                          <span className="text-sm text-gray-600">{relatedProgram.rating}</span>
                          <span className="text-gray-400 mx-2">•</span>
                          <span className="text-sm text-gray-600">{relatedProgram.duration}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-blue-600">
                          {relatedProgram.price.toLocaleString()}원
                        </span>
                        <button className="text-blue-600 font-medium group-hover:text-blue-700 cursor-pointer">
                          자세히 보기
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
