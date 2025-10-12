/**
 * Description : ProgramDetail.tsx - 📌 프로그램 상세 페이지
 * Author : Shiwoo Min
 * Date : 2025-10-12
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import programsDataRaw from 'data/programs.json';
import programDetailsRaw from 'data/program-details.json';
import { useState, useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import toast from 'react-hot-toast';

// 타입 정의
interface Program {
  id: number;
  title: string;
  date: string;
  image: string;
  category: string;
  status: string;
  type: string;
  venueId?: number;
  roomId?: number;
  instructor?: string;
}

interface Session {
  id: number;
  date: string;
  time: string;
  spots: number;
  status: string;
}

interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
}

interface Curriculum {
  week: number;
  title: string;
  content: string;
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

interface ProgramDetailData {
  id: string;
  title: string;
  category: string;
  location: string;
  centerInfo: CenterInfo;
  price: number;
  rating: number;
  reviewCount: number;
  participants: number;
  maxParticipants: number;
  duration: string;
  level: string;
  instructor: Instructor;
  description: string;
  fullDescription: string;
  objectives: string[];
  curriculum: Curriculum[];
  whatYouLearn: string[];
  requirements: string[];
  providedItems: string[];
  sessions: Session[];
  images: string[];
  reviews: Review[];
}

interface ProgramDetailProps {
  programId: string;
}

const programsData = programsDataRaw.programs as Program[];
const programDetailsData = programDetailsRaw.programs as Record<string, ProgramDetailData>;

// 기본 이미지 생성 함수 (Program.tsx와 동일)
const getDefaultImage = (title: string) => {
  const seed = encodeURIComponent(title);
  return `https://api.dicebear.com/7.x/shapes/svg?seed=${seed}`;
};

export default function ProgramDetail({ programId }: ProgramDetailProps) {
  const [selectedSession, setSelectedSession] = useState('');
  const [participants, setParticipants] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});

  const program = programDetailsData[programId];
  const basicProgram = programsData.find(p => p.id.toString() === programId);

  const editorRef = useRef<any>(null);
  const [inquiries, setInquiries] = useState<any[]>([]);

  if (!program || !basicProgram) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">프로그램을 찾을 수 없습니다</h1>
          <Link href="/programs" className="text-blue-600 hover:underline">
            프로그램 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  // 이미지 에러 핸들링
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

  const tabs = [
    { id: 'overview', name: '개요', icon: 'ri-information-line' },
    { id: 'curriculum', name: '커리큘럼', icon: 'ri-book-line' },
    { id: 'instructor', name: '강사', icon: 'ri-user-line' },
    { id: 'reviews', name: '후기', icon: 'ri-star-line' },
    { id: 'inquiry', name: '문의', icon: 'ri-question-line' }
  ];

  return (
    <>
      {/* 브레드크럼 */}
      <section className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">홈</Link>
            <i className="ri-arrow-right-s-line"></i>
            <Link href="/programs" className="hover:text-blue-600">프로그램</Link>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-gray-900">{program.title}</span>
          </nav>
        </div>
      </section>

      {/* 프로그램 헤더 - 카드 형태 */}
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

      {/* 탭 네비게이션 - 카드 형태 */}
      <section className="bg-gray-50 py-8">
        <div className="max-w-[80%] mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* 탭 헤더 */}
            <div className="border-b">
              <nav className="flex px-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-6 border-b-2 font-medium text-xl flex items-center transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <i className={`${tab.icon} mr-2`} />
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* 탭 콘텐츠 */}
            <div className="p-8 lg:p-12">
              {/* 개요 탭 */}
              {activeTab === 'overview' && (
                <div className="space-y-12">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                      <i className="ri-information-line mr-3 text-blue-600" />
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
                                className="text-blue-600 hover:underline mt-4"
                              >
                                접기
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setShowFullDescription(true)}
                              className="text-blue-600 hover:underline"
                            >
                              자세히 보기
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {program.objectives.length > 0 && (
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                        <i className="ri-target-line mr-3 text-blue-600" />
                        학습 목표
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {program.objectives.map((objective, index) => (
                          <div key={index} className="flex items-start bg-blue-50 p-4 rounded-lg">
                            <i className="ri-check-line text-blue-600 mr-3 mt-1" />
                            <span className="text-gray-800 font-medium">{objective}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                      <i className="ri-book-open-line mr-3 text-blue-600" />
                      배우는 내용
                    </h2>
                    <div className="bg-green-50 p-8 rounded-xl">
                      <ul className="space-y-4">
                        {program.whatYouLearn.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <i className="ri-check-line text-green-600 mr-3 mt-1" />
                            <span className="text-gray-800 text-lg">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <i className="ri-alert-line mr-3 text-orange-600" />
                        준비사항
                      </h2>
                      <div className="bg-orange-50 p-6 rounded-xl">
                        <ul className="space-y-3">
                          {program.requirements.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <i className="ri-information-line text-orange-600 mr-3 mt-1" />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <i className="ri-gift-line mr-3 text-purple-600" />
                        제공용품
                      </h2>
                      <div className="bg-purple-50 p-6 rounded-xl">
                        <ul className="space-y-3">
                          {program.providedItems.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <i className="ri-check-line text-purple-600 mr-3 mt-1" />
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
                    <i className="ri-book-line mr-3 text-blue-600" />
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
                      <i className="ri-book-line text-gray-400 text-6xl mb-4" />
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
                    <i className="ri-user-line mr-3 text-blue-600" />
                    강사 소개
                  </h2>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl">
                    <div className="flex items-start mb-6">
                      <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                        <i className="ri-user-line text-3xl text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{program.instructor.name}</h3>
                        <div className="space-y-2">
                          <div className="flex items-center text-gray-700">
                            <i className="ri-medal-line mr-2 text-blue-600" />
                            <span className="font-medium">{program.instructor.experience} 경력</span>
                          </div>
                          <div className="flex items-center text-gray-700">
                            <i className="ri-award-line mr-2 text-blue-600" />
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
                      <i className="ri-star-line mr-3 text-blue-600" />
                      수강생 후기
                    </h2>
                    <div className="text-right">
                      <div className="flex items-center text-yellow-400 text-2xl mb-1">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={i < Math.floor(program.rating) ? 'ri-star-fill' : 'ri-star-line'}
                          />
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
                                <i className="ri-user-line text-gray-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">{review.name}</h4>
                                <div className="flex items-center mt-1">
                                  <div className="flex items-center text-yellow-400 mr-2">
                                    {[...Array(5)].map((_, i) => (
                                      <i
                                        key={i}
                                        className={i < review.rating ? 'ri-star-fill' : 'ri-star-line'}
                                      />
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
                      <i className="ri-star-line text-gray-400 text-6xl mb-4" />
                      <p className="text-gray-600 text-lg">아직 등록된 후기가 없습니다.</p>
                      <p className="text-gray-500 mt-2">첫 번째 후기를 남겨보세요!</p>
                    </div>
                  )}
                </div>
              )}

              {/* 문의 탭 */}
              {activeTab === 'inquiry' && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                    <i className="ri-question-line mr-3 text-blue-600" />
                    프로그램 문의
                  </h2>

                  {/* 문의 작성 폼 */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl shadow-sm p-8 mb-8">
                    <p className="text-gray-700 mb-8 leading-relaxed">
                      프로그램과 관련된 질문을 남겨보세요. 담당자나 참가자들이 댓글로 답변을 남길 수 있습니다.
                    </p>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const name = (e.currentTarget.elements.namedItem('name') as HTMLInputElement).value;
                        const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
                        const phone = (e.currentTarget.elements.namedItem('phone') as HTMLInputElement).value;
                        const title = (e.currentTarget.elements.namedItem('title') as HTMLInputElement).value;
                        const content = editorRef.current?.getInstance().getHTML();

                        if (!title.trim() || !content.trim()) {
                          toast.error('제목과 내용을 입력해주세요.');
                          return;
                        }

                        const newPost = {
                          id: Date.now(),
                          name,
                          email,
                          phone,
                          title,
                          content,
                          date: new Date().toISOString().split('T')[0],
                          replies: [],
                        };

                        setInquiries((prev) => [newPost, ...prev]);
                        toast.success('문의가 등록되었습니다!');
                        e.currentTarget.reset();
                        editorRef.current?.getInstance().setHTML('');
                      }}
                      className="space-y-6 border-t border-gray-200 pt-6"
                    >
                      {/* 비밀글 옵션 */}
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="isPrivate"
                          name="isPrivate"
                          className="w-4 h-4 text-blue-600 rounded border-gray-300"
                        />
                        <label htmlFor="isPrivate" className="text-sm text-gray-700">비밀글</label>
                      </div>

                      {/* 이름 */}
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label className="col-span-1 text-sm font-semibold text-gray-700">이름</label>
                        <div className="col-span-3">
                          <input
                            type="text"
                            name="name"
                            required
                            placeholder="홍길동"
                            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      {/* 이메일 */}
                      <div className="grid grid-cols-4 items-start gap-4">
                        <label className="col-span-1 text-sm font-semibold text-gray-700 mt-2">이메일</label>
                        <div className="col-span-3 flex flex-col">
                          <input
                            type="email"
                            name="email"
                            placeholder="example@email.com"
                            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            이메일을 입력하시면 답변 등록 시 알림이 전송됩니다.
                          </p>
                        </div>
                      </div>

                      {/* 휴대폰 */}
                      <div className="grid grid-cols-4 items-start gap-4">
                        <label className="col-span-1 text-sm font-semibold text-gray-700 mt-2">휴대폰</label>
                        <div className="col-span-3 flex flex-col">
                          <input
                            type="tel"
                            name="phone"
                            placeholder="010-0000-0000"
                            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            번호를 입력하시면 SMS 알림이 전송됩니다.
                          </p>
                        </div>
                      </div>

                      {/* 제목 */}
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label className="col-span-1 text-sm font-semibold text-gray-700">제목</label>
                        <div className="col-span-3">
                          <input
                            type="text"
                            name="title"
                            required
                            placeholder="문의 제목을 입력하세요"
                            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      {/* 내용 */}
                      <div className="grid grid-cols-4 gap-4">
                        <label className="col-span-1 text-sm font-semibold text-gray-700 mt-2">질문</label>
                        <div className="col-span-3">
                          <Editor
                            ref={editorRef}
                            previewStyle="vertical"
                            height="300px"
                            initialEditType="wysiwyg"
                            useCommandShortcut={true}
                            placeholder="문의 내용을 작성해주세요."
                          />
                        </div>
                      </div>

                      {/* 버튼 */}
                      <div className="flex justify-end border-t border-gray-200 pt-6 mt-4">
                        <button
                          type="submit"
                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all"
                        >
                          작성 완료
                        </button>
                        <button
                          type="button"
                          onClick={() => toast('작성 취소되었습니다.')}
                          className="ml-3 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg border border-gray-300 transition-all"
                        >
                          닫기
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* 문의 게시판 */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <i className="ri-discuss-line mr-2 text-blue-600" />
                      문의 게시판
                    </h3>

                    {inquiries.length === 0 ? (
                      <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
                        <i className="ri-message-line text-gray-400 text-6xl mb-4" />
                        <p className="text-gray-600 text-lg font-medium">아직 등록된 문의가 없습니다.</p>
                        <p className="text-gray-500 mt-2 text-sm">첫 번째 문의를 남겨보세요.</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {inquiries.map((post) => (
                          <div
                            key={post.id}
                            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h4 className="font-semibold text-gray-900">{post.title}</h4>
                                <p className="text-sm text-gray-500">
                                  {post.name} • {post.date}
                                </p>
                              </div>
                            </div>
                            <div
                              className="text-gray-700 prose max-w-none mb-4"
                              dangerouslySetInnerHTML={{ __html: post.content }}
                            />
                            <ReplySection post={post} setInquiries={setInquiries} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ReplySection({ post, setInquiries }: any) {
  const [replyText, setReplyText] = useState('');
  const [showReplyBox, setShowReplyBox] = useState(false);

  const addReply = () => {
    if (!replyText.trim()) return;
    const newReply = {
      id: Date.now(),
      text: replyText,
      date: new Date().toISOString().split('T')[0],
    };
    setInquiries((prev: any[]) =>
      prev.map((p) =>
        p.id === post.id ? { ...p, replies: [...p.replies, newReply] } : p
      )
    );
    toast.success('댓글이 등록되었습니다!');
    setReplyText('');
    setShowReplyBox(false);
  };

  return (
    <div className="mt-6 border-t pt-4">
      <h5 className="font-semibold text-gray-800 mb-2">댓글</h5>
      {post.replies.length > 0 ? (
        <div className="space-y-2">
          {post.replies.map((r: any) => (
            <div key={r.id} className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-700">{r.text}</p>
              <p className="text-xs text-gray-500 mt-1">{r.date}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">아직 댓글이 없습니다.</p>
      )}

      {showReplyBox ? (
        <div className="mt-3">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            rows={2}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="댓글을 입력하세요"
          />
          <div className="flex justify-end space-x-2 mt-2">
            <button
              onClick={() => setShowReplyBox(false)}
              className="text-sm text-gray-500 hover:underline"
            >
              취소
            </button>
            <button
              onClick={addReply}
              className="text-sm text-blue-600 font-semibold hover:underline"
            >
              등록
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowReplyBox(true)}
          className="text-sm text-blue-600 hover:underline mt-2"
        >
          댓글 작성
        </button>
      )}
    </div>
  );
}
