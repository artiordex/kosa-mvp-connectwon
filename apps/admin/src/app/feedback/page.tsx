'use client';

import AdminLayout from '../../../components/AdminLayout';
import { useState } from 'react';

export default function FeedbackAnalysis() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedRoom, setSelectedRoom] = useState('all');

  const [feedbackStats] = useState({
    totalReviews: 156,
    averageRating: 4.3,
    positiveRatio: 78,
    neutralRatio: 15,
    negativeRatio: 7,
    responseRate: 85
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
        { text: '에어컨이 너무 추웠어요', sentiment: 'negative', date: '2024-01-13' }
      ]
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
        { text: '주차가 불편했습니다', sentiment: 'negative', date: '2024-01-12' }
      ]
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
        { text: '소음이 조금 있었어요', sentiment: 'negative', date: '2024-01-11' }
      ]
    }
  ]);

  const [moderationAlerts] = useState([
    {
      id: 1,
      type: 'inappropriate_language',
      content: '부적절한 언어가 감지된 리뷰',
      user: '익명사용자',
      timestamp: '2024-01-15 14:30',
      status: 'pending',
      severity: 'medium'
    },
    {
      id: 2,
      type: 'spam_content',
      content: '반복적인 스팸성 예약 요청',
      user: '사용자123',
      timestamp: '2024-01-15 12:15',
      status: 'reviewed',
      severity: 'high'
    },
    {
      id: 3,
      type: 'fake_review',
      content: '의심스러운 가짜 리뷰',
      user: '리뷰어456',
      timestamp: '2024-01-14 16:45',
      status: 'pending',
      severity: 'low'
    }
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
      riskLevel: 'low'
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
      riskLevel: 'high'
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
      riskLevel: 'low'
    }
  ]);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-100';
      case 'negative': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50">
        <main className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">피드백 분석 및 감성 분석</h1>
              <p className="text-gray-600">사용자 리뷰를 분석하고 콘텐츠 모더레이션을 관리하세요</p>
            </div>

            {/* 필터 */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <div className="flex flex-wrap gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">기간</label>
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                  >
                    <option value="week">최근 1주일</option>
                    <option value="month">최근 1개월</option>
                    <option value="quarter">최근 3개월</option>
                    <option value="year">최근 1년</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">공간</label>
                  <select
                    value={selectedRoom}
                    onChange={(e) => setSelectedRoom(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                  >
                    <option value="all">전체 공간</option>
                    <option value="A홀">A홀</option>
                    <option value="B홀">B홀</option>
                    <option value="C홀">C홀</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 전체 피드백 통계 */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">총 리뷰</p>
                    <p className="text-3xl font-bold text-blue-600">{feedbackStats.totalReviews}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="ri-chat-3-line text-blue-600 w-6 h-6 flex items-center justify-center"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">평균 평점</p>
                    <p className="text-3xl font-bold text-yellow-600">{feedbackStats.averageRating}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <i className="ri-star-line text-yellow-600 w-6 h-6 flex items-center justify-center"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">긍정적</p>
                    <p className="text-3xl font-bold text-green-600">{feedbackStats.positiveRatio}%</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <i className="ri-emotion-happy-line text-green-600 w-6 h-6 flex items-center justify-center"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">중립적</p>
                    <p className="text-3xl font-bold text-gray-600">{feedbackStats.neutralRatio}%</p>
                  </div>
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <i className="ri-emotion-normal-line text-gray-600 w-6 h-6 flex items-center justify-center"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">부정적</p>
                    <p className="text-3xl font-bold text-red-600">{feedbackStats.negativeRatio}%</p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <i className="ri-emotion-unhappy-line text-red-600 w-6 h-6 flex items-center justify-center"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">응답률</p>
                    <p className="text-3xl font-bold text-purple-600">{feedbackStats.responseRate}%</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <i className="ri-feedback-line text-purple-600 w-6 h-6 flex items-center justify-center"></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* 감성 분석 차트 */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">감성 분석</h2>
                <div className="relative">
                  <div className="w-48 h-48 mx-auto mb-6">
                    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="8"
                        strokeDasharray={`${feedbackStats.positiveRatio * 2.51} 251`}
                        strokeLinecap="round"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#6b7280"
                        strokeWidth="8"
                        strokeDasharray={`${feedbackStats.neutralRatio * 2.51} 251`}
                        strokeDashoffset={`-${feedbackStats.positiveRatio * 2.51}`}
                        strokeLinecap="round"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="8"
                        strokeDasharray={`${feedbackStats.negativeRatio * 2.51} 251`}
                        strokeDashoffset={`-${(feedbackStats.positiveRatio + feedbackStats.neutralRatio) * 2.51}`}
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600">긍정적</span>
                      </div>
                      <span className="text-sm font-medium">{feedbackStats.positiveRatio}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600">중립적</span>
                      </div>
                      <span className="text-sm font-medium">{feedbackStats.neutralRatio}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600">부정적</span>
                      </div>
                      <span className="text-sm font-medium">{feedbackStats.negativeRatio}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 콘텐츠 모더레이션 알림 */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">콘텐츠 모더레이션 알림</h2>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                    {moderationAlerts.filter(alert => alert.status === 'pending').length}개 대기
                  </span>
                </div>
                <div className="space-y-4">
                  {moderationAlerts.slice(0, 5).map((alert) => (
                    <div key={alert.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                            {alert.severity === 'high' ? '높음' : alert.severity === 'medium' ? '보통' : '낮음'}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            alert.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {alert.status === 'pending' ? '대기' : '검토완료'}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">{alert.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-900 mb-1">{alert.content}</p>
                      <p className="text-xs text-gray-600">사용자: {alert.user}</p>
                      {alert.status === 'pending' && (
                        <div className="flex space-x-2 mt-3">
                          <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer whitespace-nowrap">
                            검토
                          </button>
                          <button className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer whitespace-nowrap">
                            삭제
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 공간별 피드백 분석 */}
            <div className="bg-white rounded-xl shadow-sm mb-8">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">공간별 피드백 분석</h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {roomFeedback.map((room) => (
                    <div key={room.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <h3 className="text-lg font-semibold text-gray-900">{room.name}</h3>
                          <div className="flex items-center">
                            <i className="ri-star-fill text-yellow-400 mr-1 w-4 h-4 flex items-center justify-center"></i>
                            <span className="font-medium">{room.rating}</span>
                            <span className="text-gray-500 ml-1">({room.totalReviews}개 리뷰)</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className="text-sm text-green-600 font-medium">{room.positiveRatio}%</div>
                            <div className="text-xs text-gray-500">긍정적</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-red-600 font-medium">{room.negativeRatio}%</div>
                            <div className="text-xs text-gray-500">부정적</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{width: `${room.positiveRatio}%`}}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-3">최근 피드백</h4>
                        <div className="space-y-2">
                          {room.recentFeedback.map((feedback, index) => (
                            <div key={index} className="flex items-start space-x-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(feedback.sentiment)}`}>
                                {feedback.sentiment === 'positive' ? '긍정' : feedback.sentiment === 'negative' ? '부정' : '중립'}
                              </span>
                              <div className="flex-1">
                                <p className="text-sm text-gray-900">{feedback.text}</p>
                                <p className="text-xs text-gray-500">{feedback.date}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 사용자 행동 분석 */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">사용자 행동 분석</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">사용자</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">총 예약</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">취소율</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">지각률</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">노쇼율</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">평균 평점</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">위험도</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userBehaviorData.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.user}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.totalReservations}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900">{user.cancelRate}%</div>
                            <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${user.cancelRate > 30 ? 'bg-red-500' : user.cancelRate > 15 ? 'bg-yellow-500' : 'bg-green-500'}`}
                                style={{width: `${Math.min(user.cancelRate, 100)}%`}}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900">{user.lateRate}%</div>
                            <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${user.lateRate > 20 ? 'bg-red-500' : user.lateRate > 10 ? 'bg-yellow-500' : 'bg-green-500'}`}
                                style={{width: `${Math.min(user.lateRate, 100)}%`}}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900">{user.noShowRate}%</div>
                            <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${user.noShowRate > 15 ? 'bg-red-500' : user.noShowRate > 5 ? 'bg-yellow-500' : 'bg-green-500'}`}
                                style={{width: `${Math.min(user.noShowRate, 100)}%`}}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <i className="ri-star-fill text-yellow-400 mr-1 w-4 h-4 flex items-center justify-center"></i>
                            <span className="text-sm font-medium text-gray-900">{user.averageRating}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(user.riskLevel)}`}>
                            {user.riskLevel === 'high' ? '높음' : user.riskLevel === 'medium' ? '보통' : '낮음'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900 cursor-pointer whitespace-nowrap">
                              상세
                            </button>
                            {user.riskLevel === 'high' && (
                              <button className="text-red-600 hover:text-red-900 cursor-pointer whitespace-nowrap">
                                제재
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AdminLayout>
  );
}