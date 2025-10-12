/**
 * Description : points/page.tsx - 📌 포인트 페이지
 * Author : Shiwoo Min
 * Date : 2025-10-12
 */

'use client';

import { useState } from 'react';
import mypageData from 'data/mypage-with-user.json';

export default function PointsPage() {
  const { user, pointHistory } = mypageData;
  const [filterType, setFilterType] = useState<'all' | 'earned' | 'used'>('all');

  // 필터링된 포인트 내역
  const filteredHistory = pointHistory.filter(item => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  // 총 적립 포인트 계산
  const totalEarned = pointHistory
    .filter(item => item.type === 'earned')
    .reduce((sum, item) => sum + item.amount, 0);

  // 총 사용 포인트 계산
  const totalUsed = Math.abs(
    pointHistory
      .filter(item => item.type === 'used')
      .reduce((sum, item) => sum + item.amount, 0)
  );

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* 포인트 요약 카드 */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-8 text-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-blue-100 text-sm mb-1">보유 포인트</p>
            <h2 className="text-5xl font-bold">{user.stats.totalPoints.toLocaleString()}</h2>
            <p className="text-blue-100 text-lg mt-2">포인트</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
            <i className="ri-coin-line text-5xl"></i>
          </div>
        </div>

        {/* 통계 */}
        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-blue-400/30">
          <div>
            <p className="text-blue-100 text-sm mb-1">총 적립</p>
            <p className="text-2xl font-semibold">+{totalEarned.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-blue-100 text-sm mb-1">총 사용</p>
            <p className="text-2xl font-semibold">-{totalUsed.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* 포인트 적립 방법 안내 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          <i className="ri-lightbulb-line text-yellow-500 mr-2"></i>
          포인트 적립 방법
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
            <div className="bg-blue-600 rounded-full p-2 flex-shrink-0">
              <i className="ri-calendar-check-line text-white text-xl"></i>
            </div>
            <div>
              <p className="font-medium text-gray-900">프로그램 참여</p>
              <p className="text-sm text-gray-600 mt-1">프로그램 완료 시 1,000P 적립</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
            <div className="bg-green-600 rounded-full p-2 flex-shrink-0">
              <i className="ri-star-line text-white text-xl"></i>
            </div>
            <div>
              <p className="font-medium text-gray-900">리뷰 작성</p>
              <p className="text-sm text-gray-600 mt-1">리뷰 작성 시 500P 적립</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg">
            <div className="bg-purple-600 rounded-full p-2 flex-shrink-0">
              <i className="ri-user-add-line text-white text-xl"></i>
            </div>
            <div>
              <p className="font-medium text-gray-900">친구 추천</p>
              <p className="text-sm text-gray-600 mt-1">친구 가입 시 2,000P 적립</p>
            </div>
          </div>
        </div>
      </div>

      {/* 포인트 내역 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">포인트 내역</h3>

          {/* 필터 버튼 */}
          <div className="flex space-x-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterType === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setFilterType('earned')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterType === 'earned'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              적립
            </button>
            <button
              onClick={() => setFilterType('used')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterType === 'used'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              사용
            </button>
          </div>
        </div>

        {/* 포인트 내역 리스트 */}
        {filteredHistory.length > 0 ? (
          <div className="space-y-3">
            {filteredHistory.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      item.type === 'earned'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    <i
                      className={`text-2xl ${
                        item.type === 'earned' ? 'ri-add-circle-line' : 'ri-subtract-circle-line'
                      }`}
                    ></i>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{item.reason}</p>
                    <p className="text-sm text-gray-500">{formatDate(item.date)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`text-xl font-bold ${
                      item.type === 'earned' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {item.amount > 0 ? '+' : ''}{item.amount.toLocaleString()}P
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <i className="ri-inbox-line text-5xl text-gray-300 mb-4"></i>
            <p className="text-gray-500">해당하는 포인트 내역이 없습니다.</p>
          </div>
        )}
      </div>

      {/* 포인트 사용 안내 */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <div className="bg-purple-600 rounded-full p-2 flex-shrink-0 mt-1">
            <i className="ri-information-line text-white text-xl"></i>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">포인트 사용 안내</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li className="flex items-center">
                <i className="ri-check-line text-purple-600 mr-2"></i>
                포인트는 프로그램 예약 시 1P = 1원으로 사용 가능합니다
              </li>
              <li className="flex items-center">
                <i className="ri-check-line text-purple-600 mr-2"></i>
                포인트는 적립일로부터 2년간 유효합니다
              </li>
              <li className="flex items-center">
                <i className="ri-check-line text-purple-600 mr-2"></i>
                포인트는 환불 또는 현금으로 전환할 수 없습니다
              </li>
              <li className="flex items-center">
                <i className="ri-check-line text-purple-600 mr-2"></i>
                예약 취소 시 사용한 포인트는 즉시 환원됩니다
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
