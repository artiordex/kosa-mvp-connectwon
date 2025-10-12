/**
 * Description : AIViewSection.tsx - 📌 ConnectWon AI 대시보드 섹션
 * Author : Shiwoo Min
 * Date : 2025-10-13
 *
 * Summary :
 *  - AI 추천 (공간/디바이스, 프로그램) + AI 인사이트를 통합하여 표시
 *  - 사용자 맞춤 추천과 데이터 기반 통찰 제공
 *  - 홈 화면 또는 대시보드용 통합 AI 섹션
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface AIInsight {
  id: string;
  type: 'usage_pattern' | 'recommendation' | 'optimization' | 'prediction';
  title: string;
  description: string;
  confidence: number;
  action?: {
    label: string;
    url: string;
  };
  icon: string;
  priority: 'high' | 'medium' | 'low';
}

interface RecommendationItem {
  id: string;
  name: string;
  reason: string;
  confidence: number;
}

interface AIViewSectionProps {
  userId?: string;
  className?: string;
}

export default function AIViewSection({ userId = 'anonymous', className = '' }: AIViewSectionProps) {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [roomRecommendations, setRoomRecommendations] = useState<RecommendationItem[]>([]);
  const [programRecommendations, setProgramRecommendations] = useState<RecommendationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInsight, setSelectedInsight] = useState<AIInsight | null>(null);
  const [activeTab, setActiveTab] = useState<'insights' | 'rooms' | 'programs'>('insights');

  useEffect(() => {
    loadAIData();
  }, [userId]);

  const loadAIData = async () => {
    try {
      setIsLoading(true);

      // 시뮬레이션 데이터 로드
      setTimeout(() => {
        // AI 인사이트 데이터
        const mockInsights: AIInsight[] = [
          {
            id: '1',
            type: 'usage_pattern',
            title: '오후 시간대 선호 패턴 발견',
            description: '지난 한 달간 오후 2-4시 시간대에 회의실을 90% 예약하셨습니다. 이 시간대 예약을 미리 준비해보세요.',
            confidence: 0.92,
            action: {
              label: '오후 시간 예약하기',
              url: '/facilities/reservations?time=afternoon'
            },
            icon: 'ri-time-line',
            priority: 'high'
          },
          {
            id: '2',
            type: 'recommendation',
            title: '새로운 요가 클래스 추천',
            description: '필라테스와 명상 프로그램을 즐겨하시는 분들이 85% 요가도 좋아합니다. 새 요가 클래스를 확인해보세요.',
            confidence: 0.85,
            action: {
              label: '요가 클래스 보기',
              url: '/programs?category=yoga'
            },
            icon: 'ri-heart-pulse-line',
            priority: 'medium'
          },
          {
            id: '3',
            type: 'optimization',
            title: '예약 시간 최적화 제안',
            description: 'A홀을 자주 이용하시는데, B홀이 같은 시설에 대기시간이 50% 적습니다. B홀 이용을 고려해보세요.',
            confidence: 0.78,
            action: {
              label: 'B홀 정보 보기',
              url: '/facilities/venues'
            },
            icon: 'ri-lightbulb-line',
            priority: 'medium'
          },
          {
            id: '4',
            type: 'prediction',
            title: '다음 주 예약 혼잡 예상',
            description: '다음 주 목요일-금요일은 예약이 85% 찰 것으로 예상됩니다. 미리 예약하시는 것을 추천드려요.',
            confidence: 0.73,
            action: {
              label: '미리 예약하기',
              url: '/facilities/reservations'
            },
            icon: 'ri-calendar-check-line',
            priority: 'low'
          }
        ];

        // 공간 추천 데이터
        const mockRoomRecommendations: RecommendationItem[] = [
          {
            id: 'room-1',
            name: '미디어 스튜디오 A',
            reason: '최근 영상 편집 장비를 자주 이용하셔서 추천드려요',
            confidence: 0.88
          },
          {
            id: 'room-2',
            name: '세미나룸 B (20인)',
            reason: '15-20인 규모의 회의를 선호하시는 패턴이 보여요',
            confidence: 0.82
          },
          {
            id: 'room-3',
            name: '녹음실 C',
            reason: '음향 장비 대여 이력이 있어 관심 있으실 것 같아요',
            confidence: 0.75
          }
        ];

        // 프로그램 추천 데이터
        const mockProgramRecommendations: RecommendationItem[] = [
          {
            id: 'program-1',
            name: '아침 요가 클래스',
            reason: '필라테스를 즐기시는 분들이 90% 만족한 프로그램이에요',
            confidence: 0.91
          },
          {
            id: 'program-2',
            name: '명상과 힐링',
            reason: '요가와 함께 들으면 시너지가 좋은 웰니스 프로그램',
            confidence: 0.84
          },
          {
            id: 'program-3',
            name: '스트레칭 & 마사지',
            reason: '비슷한 관심사를 가진 회원들의 추천 프로그램',
            confidence: 0.79
          }
        ];

        setInsights(mockInsights);
        setRoomRecommendations(mockRoomRecommendations);
        setProgramRecommendations(mockProgramRecommendations);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error loading AI data:', error);
      setIsLoading(false);
    }
  };

  const getPriorityColor = (priority: AIInsight['priority']) => {
    switch (priority) {
      case 'high':
        return 'border-blue-200 bg-blue-50';
      case 'medium':
        return 'border-blue-200 bg-blue-50';
      case 'low':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-blue-200 bg-blue-50';
    }
  };

  const getPriorityTextColor = (priority: AIInsight['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-blue-700';
      case 'medium':
        return 'text-blue-600';
      case 'low':
        return 'text-blue-600';
      default:
        return 'text-blue-600';
    }
  };

  const getTypeLabel = (type: AIInsight['type']) => {
    switch (type) {
      case 'usage_pattern':
        return '사용 패턴';
      case 'recommendation':
        return '추천';
      case 'optimization':
        return '최적화';
      case 'prediction':
        return '예측';
      default:
        return '인사이트';
    }
  };

  const handleRecommendationClick = (type: 'room' | 'program', item: RecommendationItem) => {
    console.log('Recommendation clicked:', type, item);

    if (type === 'room') {
      window.location.href = `/facilities/venues?recommended=${item.id}`;
    } else {
      window.location.href = `/programs/${item.id}`;
    }
  };

  if (isLoading) {
    return (
      <section className={`py-16 bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 ${className}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-10 bg-gray-200 rounded w-64 mx-auto animate-pulse mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="h-32 bg-gray-100 rounded-lg animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 ${className}`}>
      <div className="container mx-auto px-4">
        {/* 섹션 헤더 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-4">
            <i className="ri-brain-line text-3xl text-white"></i>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            AI가 분석한 맞춤 추천
          </h2>
          <p className="text-lg text-gray-600">
            사용 패턴을 학습하여 최적의 공간과 프로그램을 추천드려요
          </p>
        </div>

        {/* 탭 네비게이션 */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setActiveTab('insights')}
              className={`px-6 py-2 rounded-md transition-all ${
                activeTab === 'insights'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <i className="ri-lightbulb-line mr-2"></i>
              인사이트
            </button>
            <button
              onClick={() => setActiveTab('rooms')}
              className={`px-6 py-2 rounded-md transition-all ${
                activeTab === 'rooms'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <i className="ri-building-line mr-2"></i>
              공간 추천
            </button>
            <button
              onClick={() => setActiveTab('programs')}
              className={`px-6 py-2 rounded-md transition-all ${
                activeTab === 'programs'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <i className="ri-heart-pulse-line mr-2"></i>
              프로그램 추천
            </button>
          </div>
        </div>

        {/* AI 인사이트 탭 */}
        {activeTab === 'insights' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {insights.map((insight) => (
              <div
                key={insight.id}
                className={`border rounded-xl p-6 transition-all cursor-pointer hover:shadow-lg bg-blue-50 border-blue-100 hover:border-blue-300`}
                onClick={() => setSelectedInsight(insight)}
              >
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-100">
                    <i className={`${insight.icon} text-xl text-blue-600`}></i>
                  </div>
                </div>
                <div className="mb-3">
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                    {getTypeLabel(insight.type)}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{insight.title}</h4>
                <p className="text-sm text-gray-600 mb-4">{insight.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`ri-star-${i < Math.round(insight.confidence * 5) ? 'fill' : 'line'} text-sm ${
                          i < Math.round(insight.confidence * 5) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      ></i>
                    ))}
                    <span className="text-xs text-gray-500 ml-1">
                      {Math.round(insight.confidence * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 공간 추천 탭 */}
        {activeTab === 'rooms' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-3">
                  <i className="ri-robot-line text-xl text-white"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">AI 추천 공간</h3>
                  <p className="text-sm text-gray-600">사용 패턴을 분석하여 맞춤 추천드려요</p>
                </div>
              </div>

              <div className="space-y-4">
                {roomRecommendations.map((item, index) => (
                  <div
                    key={item.id}
                    className="border border-blue-100 bg-blue-50 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                    onClick={() => handleRecommendationClick('room', item)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h4 className="font-medium text-gray-900 mr-2">{item.name}</h4>
                          <div className="flex items-center">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <i
                                  key={i}
                                  className={`ri-star-${i < Math.round(item.confidence * 5) ? 'fill' : 'line'} text-sm ${
                                    i < Math.round(item.confidence * 5) ? 'text-yellow-400' : 'text-gray-300'
                                  }`}
                                ></i>
                              ))}
                            </div>
                            <span className="text-xs text-gray-500 ml-1">{Math.round(item.confidence * 100)}%</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{item.reason}</p>
                        <div className="flex items-center text-xs text-blue-600">
                          <i className="ri-lightbulb-line mr-1"></i>
                          AI 추천 #{index + 1}
                        </div>
                      </div>
                      <div className="ml-4">
                        <i className="ri-arrow-right-line text-xl text-gray-400"></i>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-500">
                    <i className="ri-information-line mr-1"></i>
                    AI가 사용 패턴을 학습하여 추천합니다
                  </div>
                  <Link href="/facilities/venues" className="text-xs text-blue-600 hover:underline">
                    전체 공간 보기
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 프로그램 추천 탭 */}
        {activeTab === 'programs' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-3">
                  <i className="ri-robot-line text-xl text-white"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">AI 추천 프로그램</h3>
                  <p className="text-sm text-gray-600">사용 패턴을 분석하여 맞춤 추천드려요</p>
                </div>
              </div>

              <div className="space-y-4">
                {programRecommendations.map((item, index) => (
                  <div
                    key={item.id}
                    className="border border-blue-100 bg-blue-50 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                    onClick={() => handleRecommendationClick('program', item)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h4 className="font-medium text-gray-900 mr-2">{item.name}</h4>
                          <div className="flex items-center">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <i
                                  key={i}
                                  className={`ri-star-${i < Math.round(item.confidence * 5) ? 'fill' : 'line'} text-sm ${
                                    i < Math.round(item.confidence * 5) ? 'text-yellow-400' : 'text-gray-300'
                                  }`}
                                ></i>
                              ))}
                            </div>
                            <span className="text-xs text-gray-500 ml-1">{Math.round(item.confidence * 100)}%</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{item.reason}</p>
                        <div className="flex items-center text-xs text-blue-600">
                          <i className="ri-lightbulb-line mr-1"></i>
                          AI 추천 #{index + 1}
                        </div>
                      </div>
                      <div className="ml-4">
                        <i className="ri-arrow-right-line text-xl text-gray-400"></i>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-500">
                    <i className="ri-information-line mr-1"></i>
                    AI가 사용 패턴을 학습하여 추천합니다
                  </div>
                  <Link href="/programs" className="text-xs text-blue-600 hover:underline">
                    전체 프로그램 보기
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 상세 모달 */}
        {selectedInsight && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <i className={`${selectedInsight.icon} mr-2 text-xl text-blue-600`}></i>
                  <h3 className="text-lg font-semibold">{selectedInsight.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedInsight(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                    {getTypeLabel(selectedInsight.type)}
                  </span>
                  <div className="flex items-center ml-2">
                    <span className="text-sm text-gray-600">신뢰도:</span>
                    <div className="flex ml-1">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`ri-star-${i < Math.round(selectedInsight.confidence * 5) ? 'fill' : 'line'} text-sm ${
                            i < Math.round(selectedInsight.confidence * 5) ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        ></i>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-1">
                      {Math.round(selectedInsight.confidence * 100)}%
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{selectedInsight.description}</p>
              </div>

              <div className="flex space-x-3">
                {selectedInsight.action && (
                  <Link
                    href={selectedInsight.action.url}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-center hover:bg-blue-700 transition-colors"
                  >
                    {selectedInsight.action.label}
                  </Link>
                )}
                <button
                  onClick={() => setSelectedInsight(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 더보기 버튼 */}
        <div className="text-center mt-12">
          <Link
            href="/insights"
            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all font-medium"
          >
            모든 AI 인사이트 보기
            <i className="ri-arrow-right-line ml-2"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
