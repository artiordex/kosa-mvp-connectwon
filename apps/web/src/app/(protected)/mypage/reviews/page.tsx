/**
 * Description : reviews/page.tsx - 📌 내 리뷰 페이지
 * Author : Shiwoo Min
 * Date : 2025-10-12
 */

'use client';

import { useState } from 'react';
import mypageData from 'data/mypage-with-user.json';

export default function ReviewsPage() {
  const { myReviews, myReservations } = mypageData;
  const [filterType, setFilterType] = useState<'all' | 'program' | 'room'>('all');
  const [editingReview, setEditingReview] = useState<string | null>(null);

  // 필터링된 리뷰
  const filteredReviews = myReviews.filter(review => {
    if (filterType === 'all') return true;
    return review.type === filterType;
  });

  // 작성 가능한 리뷰 (완료된 예약 중 리뷰 미작성)
  const completedWithoutReview = myReservations.filter(
    r => r.status === 'completed' && !r.review
  );

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // 별점 렌더링
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <i
            key={star}
            className={`ri-star${star <= rating ? '-fill' : '-line'} text-xl ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          ></i>
        ))}
      </div>
    );
  };

  // 평균 평점 계산
  const averageRating =
    myReviews.length > 0
      ? (myReviews.reduce((sum, r) => sum + r.rating, 0) / myReviews.length).toFixed(1)
      : 0;

  return (
    <div className="space-y-6">
      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl shadow-sm p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm mb-1">평균 평점</p>
              <p className="text-4xl font-bold">{averageRating}</p>
              <div className="mt-2">{renderStars(Math.round(Number(averageRating)))}</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
              <i className="ri-star-fill text-4xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm mb-1">작성한 리뷰</p>
              <p className="text-4xl font-bold">{myReviews.length}</p>
              <p className="text-white/80 text-sm mt-2">개</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
              <i className="ri-chat-3-fill text-4xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-sm p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm mb-1">도움이 됐어요</p>
              <p className="text-4xl font-bold">
                {myReviews.reduce((sum, r) => sum + r.helpfulCount, 0)}
              </p>
              <p className="text-white/80 text-sm mt-2">명</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
              <i className="ri-thumb-up-fill text-4xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* 작성 가능한 리뷰 */}
      {completedWithoutReview.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start space-x-3 mb-4">
            <div className="bg-blue-600 rounded-full p-2 flex-shrink-0">
              <i className="ri-edit-line text-white text-xl"></i>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">리뷰를 작성해주세요!</h3>
              <p className="text-sm text-gray-600">
                {completedWithoutReview.length}개의 프로그램 리뷰를 작성하고 500P를 받으세요
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {completedWithoutReview.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-500">강사: {item.instructor}</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  리뷰 작성
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 내 리뷰 목록 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">내 리뷰</h3>

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
              onClick={() => setFilterType('program')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterType === 'program'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              프로그램
            </button>
            <button
              onClick={() => setFilterType('room')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterType === 'room'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              시설
            </button>
          </div>
        </div>

        {/* 리뷰 리스트 */}
        {filteredReviews.length > 0 ? (
          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4 flex-1">
                    {review.relatedImage && (
                      <img
                        src={review.relatedImage}
                        alt={review.relatedTitle}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            review.type === 'program'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-purple-100 text-purple-700'
                          }`}
                        >
                          {review.type === 'program' ? '프로그램' : '시설'}
                        </span>
                        {renderStars(review.rating)}
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {review.relatedTitle}
                      </h4>
                      {review.instructor && (
                        <p className="text-sm text-gray-600 mb-2">강사: {review.instructor}</p>
                      )}
                      {review.location && (
                        <p className="text-sm text-gray-600 mb-2">위치: {review.location}</p>
                      )}
                      <p className="text-sm text-gray-500">{formatDate(review.createdAt)}</p>
                    </div>
                  </div>
                  {review.isEditable && (
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                        <i className="ri-edit-line text-xl"></i>
                      </button>
                      <button className="p-2 text-gray-600 hover:text-red-600 transition-colors">
                        <i className="ri-delete-bin-line text-xl"></i>
                      </button>
                    </div>
                  )}
                </div>

                <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>

                {/* 장점 */}
                {review.pros.length > 0 && (
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                      <i className="ri-thumb-up-line text-green-600 mr-1"></i>
                      좋았던 점
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {review.pros.map((pro, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
                        >
                          {pro}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 단점 */}
                {review.cons.length > 0 && (
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                      <i className="ri-thumb-down-line text-orange-600 mr-1"></i>
                      아쉬운 점
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {review.cons.map((con, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm"
                        >
                          {con}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 도움이 됐어요 */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <i className="ri-user-smile-line"></i>
                    <span>{review.helpfulCount}명이 이 리뷰가 도움이 되었다고 했어요</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <i className="ri-chat-3-line text-5xl text-gray-300 mb-4"></i>
            <p className="text-gray-500">작성한 리뷰가 없습니다.</p>
            <p className="text-sm text-gray-400 mt-2">
              프로그램 참여 후 리뷰를 작성하고 포인트를 받으세요!
            </p>
          </div>
        )}
      </div>

      {/* 리뷰 작성 팁 */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <div className="bg-purple-600 rounded-full p-2 flex-shrink-0 mt-1">
            <i className="ri-lightbulb-line text-white text-xl"></i>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">리뷰 작성 팁</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li className="flex items-center">
                <i className="ri-check-line text-purple-600 mr-2"></i>
                구체적이고 솔직한 경험을 공유해주세요
              </li>
              <li className="flex items-center">
                <i className="ri-check-line text-purple-600 mr-2"></i>
                좋았던 점과 아쉬운 점을 균형있게 작성해주세요
              </li>
              <li className="flex items-center">
                <i className="ri-check-line text-purple-600 mr-2"></i>
                다른 사람에게 도움이 될 만한 정보를 포함해주세요
              </li>
              <li className="flex items-center">
                <i className="ri-check-line text-purple-600 mr-2"></i>
                리뷰 작성 시 500P를 즉시 적립해드립니다
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
