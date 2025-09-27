
'use client';

import { useState, useEffect } from 'react';

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

interface AIInsightsProps {
  userId?: string;
  className?: string;
}

export default function AIInsights({ userId = 'anonymous', className = '' }: AIInsightsProps) {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInsight, setSelectedInsight] = useState<AIInsight | null>(null);

  useEffect(() => {
    loadInsights();
  }, [userId]);

  const loadInsights = async () => {
    try {
      setIsLoading(true);
      
      // 실제로는 Hugging Face API나 백엔드에서 인사이트를 가져와야 합니다
      // 여기서는 시뮬레이션 데이터를 사용합니다
      setTimeout(() => {
        const mockInsights: AIInsight[] = [
          {
            id: '1',
            type: 'usage_pattern',
            title: '오후 시간대 선호 패턴 발견',
            description: '지난 한 달간 오후 2-4시 시간대에 회의실을 90% 예약하셨습니다. 이 시간대 예약을 미리 준비해보세요.',
            confidence: 0.92,
            action: {
              label: '오후 시간 예약하기',
              url: '/rooms?time=afternoon'
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
              url: '/rooms/b-hall'
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
              url: '/rooms?week=next'
            },
            icon: 'ri-calendar-check-line',
            priority: 'low'
          }
        ];
        
        setInsights(mockInsights);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error loading AI insights:', error);
      setIsLoading(false);
    }
  };

  const getPriorityColor = (priority: AIInsight['priority']) => {
    switch (priority) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50';
      case 'low':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getPriorityTextColor = (priority: AIInsight['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-700';
      case 'medium':
        return 'text-yellow-700';
      case 'low':
        return 'text-blue-700';
      default:
        return 'text-gray-700';
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

  if (isLoading) {
    return (
      <div className={`bg-white rounded-xl p-6 shadow-sm ${className}`}>
        <div className="flex items-center mb-4">
          <div className="w-6 h-6 bg-purple-100 rounded-full animate-pulse mr-3"></div>
          <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-100 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl p-6 shadow-sm ${className}`}>
      <div className="flex items-center mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mr-3">
          <i className="ri-brain-line w-4 h-4 flex items-center justify-center text-white"></i>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">AI 인사이트</h3>
          <p className="text-sm text-gray-600">
            사용 데이터를 분석한 맞춤 제안
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={`border rounded-lg p-4 transition-all cursor-pointer hover:shadow-md ${getPriorityColor(insight.priority)}`}
            onClick={() => setSelectedInsight(insight)}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getPriorityTextColor(insight.priority).replace('text-', 'bg-').replace('-700', '-100')}`}>
                  <i className={`${insight.icon} w-5 h-5 flex items-center justify-center ${getPriorityTextColor(insight.priority)}`}></i>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityTextColor(insight.priority).replace('text-', 'bg-').replace('-700', '-100')} ${getPriorityTextColor(insight.priority)} font-medium`}>
                      {getTypeLabel(insight.type)}
                    </span>
                    <div className="flex items-center ml-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`ri-star-${i < Math.round(insight.confidence * 5) ? 'fill' : 'line'} w-3 h-3 flex items-center justify-center ${
                              i < Math.round(insight.confidence * 5) ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          ></i>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">
                        {Math.round(insight.confidence * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
                <h4 className="font-medium text-gray-900 mb-1">{insight.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                {insight.action && (
                  <a
                    href={insight.action.url}
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {insight.action.label}
                    <i className="ri-arrow-right-line ml-1 w-3 h-3 flex items-center justify-center"></i>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {insights.length === 0 && (
        <div className="text-center py-8">
          <i className="ri-brain-line w-12 h-12 flex items-center justify-center text-gray-400 mx-auto mb-4 text-4xl"></i>
          <p className="text-gray-600">
            아직 분석할 데이터가 충분하지 않습니다.<br />
            서비스를 더 이용하시면 맞춤 인사이트를 제공해드려요.
          </p>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500">
            <i className="ri-refresh-line mr-1 w-3 h-3 flex items-center justify-center"></i>
            24시간마다 업데이트
          </div>
          <button
            onClick={loadInsights}
            className="text-xs text-purple-600 hover:underline cursor-pointer"
          >
            새로고침
          </button>
        </div>
      </div>

      {/* 상세 모달 */}
      {selectedInsight && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <i className={`${selectedInsight.icon} mr-2 w-5 h-5 flex items-center justify-center text-purple-600`}></i>
                <h3 className="text-lg font-semibold">{selectedInsight.title}</h3>
              </div>
              <button
                onClick={() => setSelectedInsight(null)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line w-5 h-5 flex items-center justify-center"></i>
              </button>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <span className={`text-xs px-2 py-1 rounded-full ${getPriorityTextColor(selectedInsight.priority).replace('text-', 'bg-').replace('-700', '-100')} ${getPriorityTextColor(selectedInsight.priority)} font-medium`}>
                  {getTypeLabel(selectedInsight.type)}
                </span>
                <div className="flex items-center ml-2">
                  <span className="text-sm text-gray-600">신뢰도:</span>
                  <div className="flex ml-1">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`ri-star-${i < Math.round(selectedInsight.confidence * 5) ? 'fill' : 'line'} w-3 h-3 flex items-center justify-center ${
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
                <a
                  href={selectedInsight.action.url}
                  className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg text-center hover:bg-purple-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  {selectedInsight.action.label}
                </a>
              )}
              <button
                onClick={() => setSelectedInsight(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer whitespace-nowrap"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
