/**
 * Description : page.tsx - 📌 알림 페이지
 * Author : Shiwoo Min
 * Date : 2025-10-12
 */

'use client';

import { useState } from 'react';
import mypageData from 'data/mypage-with-user.json';

interface Notification {
  id: string;
  type: 'program' | 'system' | 'review' | 'message' | 'reward';
  title: string;
  message: string;
  relatedId: string;
  category: string;
  icon: string;
  status: 'unread' | 'read';
  isImportant: boolean;
  createdAt: string;
  actionUrl: string;
}

export default function NotificationPage() {
  const { user } = mypageData;
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [notifications, setNotifications] = useState<Notification[]>(
    mypageData.myNotifications as Notification[]
  );

  // 필터링
  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return n.status === 'unread';
    if (filter === 'read') return n.status === 'read';
    return true;
  });

  // 단일 읽음 처리
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, status: 'read' } : n))
    );
  };

  // 전체 읽음 처리
  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, status: 'read' })));
  };

  // 타입별 색상
  const getTypeColor = (type: Notification['type']) => {
    switch (type) {
      case 'program':
        return 'bg-blue-100 text-blue-700';
      case 'system':
        return 'bg-gray-100 text-gray-700';
      case 'review':
        return 'bg-yellow-100 text-yellow-700';
      case 'message':
        return 'bg-green-100 text-green-700';
      case 'reward':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-8 space-y-10">
      {/* 🔔 알림 목록 섹션 */}
      <div>
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">알림</h1>
            <p className="text-sm text-gray-600 mt-1">
              내 계정과 관련된 최신 소식과 알림을 확인하세요.
            </p>
          </div>
          <button
            onClick={handleMarkAllAsRead}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm"
          >
            <i className="ri-check-double-line mr-1"></i>
            모두 읽음 처리
          </button>
        </div>

        {/* 필터 탭 */}
        <div className="flex gap-3 mb-6">
          {[{ key: 'all', label: '전체' }, { key: 'unread', label: '읽지 않음' }, { key: 'read', label: '읽음' }].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === tab.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 알림 리스트 */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="bg-gray-50 p-8 rounded-xl text-center text-gray-500 border border-gray-100">
              아직 알림이 없습니다.
            </div>
          ) : (
            filteredNotifications.map(notification => (
              <div
                key={notification.id}
                onClick={() => handleMarkAsRead(notification.id)}
                className={`flex justify-between items-start p-6 rounded-lg border transition-all cursor-pointer hover:shadow-sm ${
                  notification.status === 'read'
                    ? 'bg-white border-gray-200'
                    : 'bg-blue-50 border-blue-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-full ${getTypeColor(
                      notification.type
                    )}`}
                  >
                    <i className={`${notification.icon} text-2xl`}></i>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 text-base">
                      {notification.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(notification.createdAt).toLocaleString('ko-KR')}
                    </p>
                  </div>
                </div>

                {notification.status === 'unread' && (
                  <span className="text-xs text-blue-600 font-medium whitespace-nowrap">
                    ● 새 알림
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* ⚙️ 알림 설정 섹션 */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
          알림 설정
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">이메일 알림</p>
              <p className="text-sm text-gray-500">
                예약 및 프로그램 관련 알림을 이메일로 받습니다
              </p>
            </div>
            <button
              type="button"
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                user.preferences.emailNotifications ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform bg-white rounded-full transition-transform ${
                  user.preferences.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">SMS 알림</p>
              <p className="text-sm text-gray-500">
                중요한 알림을 SMS로 받습니다
              </p>
            </div>
            <button
              type="button"
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                user.preferences.smsNotifications ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform bg-white rounded-full transition-transform ${
                  user.preferences.smsNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">푸시 알림</p>
              <p className="text-sm text-gray-500">
                브라우저 푸시 알림을 받습니다
              </p>
            </div>
            <button
              type="button"
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                user.preferences.pushNotifications ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform bg-white rounded-full transition-transform ${
                  user.preferences.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
