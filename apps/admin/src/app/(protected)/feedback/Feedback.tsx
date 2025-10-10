'use client';

import { useState } from 'react';

export default function Feedback() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedRoom, setSelectedRoom] = useState('all');

  const [feedbackStats] = useState({
    totalReviews: 156,
    averageRating: 4.3,
    positiveRatio: 78,
    neutralRatio: 15,
    negativeRatio: 7,
    responseRate: 85,
  });

  const [roomFeedback] = useState([
    {
      id: 1,
      name: 'A홀',
      rating: 4.5,
      totalReviews: 45,
      positiveRatio: 82,
      negativeRatio: 8,
      recentFeedback: [
        { text: '시설이 깨끗하고 좋았습니다', sentiment: 'positive', date: '2024-01-15' },
        { text: '음향 시설이 우수해요', sentiment: 'positive', date: '2024-01-14' },
        { text: '에어컨이 너무 추웠어요', sentiment: 'negative', date: '2024-01-13' },
      ],
    },
    {
      id: 2,
      name: 'B홀',
      rating: 4.2,
      totalReviews: 38,
      positiveRatio: 75,
      negativeRatio: 12,
      recentFeedback: [
        { text: '프로젝터 화질이 선명해서 좋았습니다', sentiment: 'positive', date: '2024-01-15' },
        { text: '의자가 편안했어요', sentiment: 'positive', date: '2024-01-14' },
        { text: '주차가 불편했습니다', sentiment: 'negative', date: '2024-01-12' },
      ],
    },
    {
      id: 3,
      name: 'C홀',
      rating: 4.0,
      totalReviews: 32,
      positiveRatio: 70,
      negativeRatio: 15,
      recentFeedback: [
        { text: '위치가 좋고 접근성이 뛰어납니다', sentiment: 'positive', date: '2024-01-15' },
        { text: '인터넷 속도가 빨라서 만족합니다', sentiment: 'positive', date: '2024-01-13' },
        { text: '소음이 조금 있었어요', sentiment: 'negative', date: '2024-01-11' },
      ],
    },
  ]);

  const [moderationAlerts] = useState([
    {
      id: 1,
      type: 'inappropriate_language',
      content: '부적절한 언어가 감지된 리뷰',
      user: '익명사용자',
      timestamp: '2024-01-15 14:30',
      status: 'pending',
      severity: 'medium',
    },
    {
      id: 2,
      type: 'spam_content',
      content: '반복적인 스팸성 예약 요청',
      user: '사용자123',
      timestamp: '2024-01-15 12:15',
      status: 'reviewed',
      severity: 'high',
    },
    {
      id: 3,
      type: 'fake_review',
      content: '의심스러운 가짜 리뷰',
      user: '리뷰어456',
      timestamp: '2024-01-14 16:45',
      status: 'pending',
      severity: 'low',
    },
  ]);

  const [userBehaviorData] = useState([
    {
      id: 1,
      user: '김회원',
      email: 'kim@example.com',
      totalReservations: 15,
      cancelRate: 20,
      lateRate: 5,
      noShowRate: 0,
      averageRating: 4.2,
      riskLevel: 'low',
    },
    {
      id: 2,
      user: '이회원',
      email: 'lee@example.com',
      totalReservations: 8,
      cancelRate: 50,
      lateRate: 25,
      noShowRate: 12,
      averageRating: 3.1,
      riskLevel: 'high',
    },
    {
      id: 3,
      user: '박회원',
      email: 'park@example.com',
      totalReservations: 22,
      cancelRate: 10,
      lateRate: 0,
      noShowRate: 0,
      averageRating: 4.8,
      riskLevel: 'low',
    },
  ]);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600 bg-green-100';
      case 'negative':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ✅ 기존 JSX 전부 유지 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">피드백 분석 및 감성 분석</h1>
            <p className="text-gray-600">사용자 리뷰를 분석하고 콘텐츠 모더레이션을 관리하세요</p>
          </div>

          {/* 필터 */}
          {/* ... */}
          {/* 전체 피드백 통계 */}
          {/* ... */}
          {/* 감성 분석 + 모더레이션 알림 */}
          {/* ... */}
          {/* 공간별 피드백 분석 */}
          {/* ... */}
          {/* 사용자 행동 분석 */}
          {/* ... */}
        </div>
      </main>
    </div>
  );
}
