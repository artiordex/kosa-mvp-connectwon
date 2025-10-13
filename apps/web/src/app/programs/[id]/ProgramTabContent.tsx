/**
 * Description : ProgramTabContent.tsx - 📌 프로그램 탭 콘텐츠 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-10-12
 */

'use client';

import { useState } from 'react';
import ProgramInquirySection from './ProgramInquirySection';
import sessionUser from 'data/mypage-with-user.json';

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

interface ProgramTabContentProps {
  program: {
    description: string;
    fullDescription: string;
    objectives: string[];
    curriculum: Curriculum[];
    whatYouLearn: string[];
    requirements: string[];
    providedItems: string[];
    instructor: Instructor;
    rating: number;
    reviewCount: number;
    reviews: Review[];
  };
}

export default function ProgramTabContent({ program }: ProgramTabContentProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showFullDescription, setShowFullDescription] = useState(false);

  const demoFlag = process.env['NEXT_PUBLIC_ALLOW_DEMO'] ?? '0';
  const demoOn   = demoFlag === '1' || demoFlag === '2';
  const demoUser =
    (sessionUser as any)?.user ??
    (sessionUser as any)?.newUser ??
    null;

  const tabs = [
    { id: 'overview', name: '개요', icon: 'ri-information-line' },
    { id: 'curriculum', name: '커리큘럼', icon: 'ri-book-line' },
    { id: 'instructor', name: '강사', icon: 'ri-user-line' },
    { id: 'reviews', name: '후기', icon: 'ri-star-line' },
    { id: 'inquiry', name: '문의', icon: 'ri-question-line' },
  ];

  return (
    <section className="bg-gray-50 py-8">
      <div className="max-w-[80%] mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* 상단 탭 네비게이션 */}
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

          {/* 탭별 콘텐츠 */}
          <div className="p-8 lg:p-12">
            {/* 개요 */}
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
                        <div
                          key={index}
                          className="flex items-start bg-blue-50 p-4 rounded-lg"
                        >
                          <i className="ri-check-line text-blue-600 mr-3 mt-1" />
                          <span className="text-gray-800 font-medium">
                            {objective}
                          </span>
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

            {/* 커리큘럼 */}
            {activeTab === 'curriculum' && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                  <i className="ri-book-line mr-3 text-blue-600" />
                  상세 커리큘럼
                </h2>
                {program.curriculum.length > 0 ? (
                  <div className="space-y-6">
                    {program.curriculum.map((week, index) => (
                      <div
                        key={index}
                        className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors"
                      >
                        <div className="flex items-start">
                          <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 mt-1">
                            {week.week}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                              {week.title}
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                              {week.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <i className="ri-book-line text-gray-400 text-6xl mb-4" />
                    <p className="text-gray-600 text-lg">상세 커리큘럼이 준비 중입니다.</p>
                    <p className="text-gray-500 mt-2">
                      자세한 내용은 수업 시작 전에 안내드립니다.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* 강사 소개 */}
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
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {program.instructor.name}
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-700">
                          <i className="ri-medal-line mr-2 text-blue-600" />
                          <span className="font-medium">
                            {program.instructor.experience} 경력
                          </span>
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
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {program.instructor.bio}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">전문 분야</h4>
                    <div className="flex flex-wrap gap-2">
                      {program.instructor.specialty.map((specialty, index) => (
                        <span
                          key={index}
                          className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 후기 */}
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
                          className={
                            i < Math.floor(program.rating)
                              ? 'ri-star-fill'
                              : 'ri-star-line'
                          }
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
                      <div
                        key={review.id}
                        className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                              <i className="ri-user-line text-gray-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                {review.name}
                              </h4>
                              <div className="flex items-center mt-1">
                                <div className="flex items-center text-yellow-400 mr-2">
                                  {[...Array(5)].map((_, i) => (
                                    <i
                                      key={i}
                                      className={
                                        i < review.rating
                                          ? 'ri-star-fill'
                                          : 'ri-star-line'
                                      }
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-600">
                                  {review.date}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                          {review.comment}
                        </p>
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

            {/* 문의 섹션: JSON과 플래그를 내려줌 */}
            {activeTab === 'inquiry' && (
              <ProgramInquirySection demoOn={demoOn} seedUser={demoUser} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
