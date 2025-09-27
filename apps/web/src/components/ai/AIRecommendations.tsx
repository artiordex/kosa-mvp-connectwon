'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getRecommendations, RecommendationResult } from '../../lib/huggingface';

/**
 * AI 추천 컴포넌트의 Props 인터페이스
 * @interface AIRecommendationsProps
 */
interface AIRecommendationsProps {
  /** 추천 유형: 'room'은 공간 및 디바이스, 'program'은 공간 및 프로그램 */
  type: 'room' | 'program';
  /** 사용자 ID (선택사항, 기본값: 'anonymous') */
  userId?: string;
  /** 사용자 선호도 설정 (선택사항) */
  userPreferences?: any;
  /** 추가 CSS 클래스명 (선택사항) */
  className?: string;
}

/**
 * AI 기반 추천 시스템 컴포넌트
 * 사용자의 이용 패턴을 분석하여 맞춤형 공간/프로그램을 추천합니다.
 *
 * @param {AIRecommendationsProps} props - 컴포넌트 속성
 * @returns {JSX.Element} AI 추천 컴포넌트
 *
 * @example
 * // 공간 및 디바이스 추천
 * <AIRecommendations type="room" userId="user123" />
 *
 * @example
 * // 공간 및 프로그램 추천
 * <AIRecommendations type="program" userId="user456" userPreferences={{category: '요가'}} />
 */
export default function AIRecommendations({ type, userId = 'anonymous', userPreferences = {}, className = '' }: AIRecommendationsProps) {
  /** AI 추천 결과 상태 */
  const [recommendations, setRecommendations] = useState<RecommendationResult | null>(null);

  /** 로딩 상태 */
  const [isLoading, setIsLoading] = useState(true);

  /** 에러 메시지 상태 */
  const [error, setError] = useState<string | null>(null);

  /**
   * 컴포넌트 마운트 및 의존성 변경 시 추천 데이터를 로드합니다.
   */
  useEffect(() => {
    loadRecommendations();
  }, [type, userId]);

  /**
   * AI 추천 데이터를 비동기적으로 로드합니다.
   * 사용자 히스토리를 기반으로 HuggingFace API를 통해 추천을 받습니다.
   *
   * @async
   * @function loadRecommendations
   * @returns {Promise<void>}
   */
  const loadRecommendations = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // 사용자 히스토리 시뮬레이션 (실제로는 데이터베이스에서 가져와야 함)
      const userHistory = getUserHistory(type);

      const result = await getRecommendations(userId, type, userHistory, userPreferences);
      setRecommendations(result);
    } catch (err) {
      console.error('Recommendations loading error:', err);
      setError('추천을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 추천 타입에 따라 시뮬레이션된 사용자 히스토리를 반환합니다.
   * 실제 환경에서는 데이터베이스에서 실제 사용자 데이터를 가져와야 합니다.
   *
   * @param {('room' | 'program')} type - 추천 타입
   * @returns {Array} 사용자 히스토리 배열
   */
  const getUserHistory = (type: 'room' | 'program') => {
    // 실제로는 데이터베이스에서 사용자 히스토리를 가져와야 합니다
    if (type === 'room') {
      return [
        { roomType: 'conference', capacity: 10, facilities: ['프로젝터'] },
        { roomType: 'meeting', capacity: 6, facilities: ['화이트보드'] },
        { roomType: 'conference', capacity: 15, facilities: ['프로젝터', '음향시설'] },
      ];
    } else {
      return [
        { programType: 'fitness', category: '요가' },
        { programType: 'wellness', category: '명상' },
        { programType: 'fitness', category: '필라테스' },
      ];
    }
  };

  /**
   * 추천 아이템 클릭 이벤트를 처리합니다.
   * 클릭 이벤트를 추적하고 해당 페이지로 이동합니다.
   *
   * @param {any} item - 클릭된 추천 아이템
   */
  const handleRecommendationClick = (item: any) => {
    // 클릭 이벤트를 추적하여 AI 모델 개선에 활용
    console.log('Recommendation clicked:', item);

    // 실제 예약/등록 페이지로 이동
    if (type === 'room') {
      window.location.href = `/rooms?recommended=${item.id}`;
    } else {
      window.location.href = `/programs?recommended=${item.id}`;
    }
  };

  /**
   * 추천 타입에 따른 표시 텍스트를 반환합니다.
   *
   * @returns {Object} 표시 텍스트 객체
   */
  const getDisplayText = () => {
    return type === 'room'
      ? {
          title: 'AI 추천 공간 및 디바이스',
          emptyMessage: '추천할 공간 및 디바이스가 없습니다',
        }
      : {
          title: 'AI 추천 공간 및 프로그램',
          emptyMessage: '추천할 공간 및 프로그램이 없습니다',
        };
  };

  const displayText = getDisplayText();

  // 로딩 상태 렌더링
  if (isLoading) {
    return (
      <div className={`bg-white rounded-xl p-6 shadow-sm ${className}`}>
        <div className="flex items-center mb-4">
          <div className="w-6 h-6 bg-blue-100 rounded-full animate-pulse mr-3"></div>
          <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  // 에러 상태 렌더링
  if (error) {
    return (
      <div className={`bg-white rounded-xl p-6 shadow-sm ${className}`}>
        <div className="text-center py-8">
          <i className="ri-error-warning-line w-12 h-12 flex items-center justify-center text-red-500 mx-auto mb-4 text-4xl"></i>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={loadRecommendations}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer whitespace-nowrap"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  // 추천 결과가 없는 경우 렌더링
  if (!recommendations || recommendations.items.length === 0) {
    return (
      <div className={`bg-white rounded-xl p-6 shadow-sm ${className}`}>
        <div className="text-center py-8">
          <i className="ri-lightbulb-line w-12 h-12 flex items-center justify-center text-gray-400 mx-auto mb-4 text-4xl"></i>
          <p className="text-gray-600">{displayText.emptyMessage}</p>
        </div>
      </div>
    );
  }

  // 메인 추천 결과 렌더링
  return (
    <div className={`bg-white rounded-xl p-6 shadow-sm ${className}`}>
      <div className="flex items-center mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
          <i className="ri-robot-line w-4 h-4 flex items-center justify-center text-white"></i>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{displayText.title}</h3>
          <p className="text-sm text-gray-600">사용 패턴을 분석하여 맞춤 추천드려요</p>
        </div>
      </div>

      <div className="space-y-4">
        {recommendations.items.map((item, index) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
            onClick={() => handleRecommendationClick(item)}
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
                          className={`ri-star-${i < Math.round(item.confidence * 5) ? 'fill' : 'line'} w-3 h-3 flex items-center justify-center ${
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
                  <i className="ri-lightbulb-line mr-1 w-3 h-3 flex items-center justify-center"></i>
                  AI 추천 #{index + 1}
                </div>
              </div>
              <div className="ml-4">
                <i className="ri-arrow-right-line w-5 h-5 flex items-center justify-center text-gray-400"></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500">
            <i className="ri-information-line mr-1 w-3 h-3 flex items-center justify-center"></i>
            AI가 사용 패턴을 학습하여 추천합니다
          </div>
          <Link href={type === 'room' ? '/rooms' : '/programs'} className="text-xs text-blue-600 hover:underline">
            전체 보기
          </Link>
        </div>
      </div>
    </div>
  );
}
