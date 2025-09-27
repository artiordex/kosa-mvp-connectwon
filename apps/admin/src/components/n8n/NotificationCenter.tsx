'use client';

import { useState } from 'react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  source: 'system' | 'slack' | 'n8n' | 'ai' | 'user';
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
  actions?: Array<{
    label: string;
    action: string;
  }>;
}

export default function NotificationCenter() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'unread' | 'critical'>('all');
  const [selectedSource, setSelectedSource] = useState<'all' | Notification['source']>('all');

  const notifications: Notification[] = [
    {
      id: 'N001',
      title: '시스템 리소스 경고',
      message: 'CPU 사용률이 90%를 초과했습니다. 시스템 점검이 필요합니다.',
      type: 'warning',
      source: 'system',
      timestamp: '5분 전',
      read: false,
      priority: 'high',
      actions: [
        { label: '시스템 점검', action: 'check_system' },
        { label: '무시', action: 'dismiss' }
      ]
    },
    {
      id: 'N002',
      title: '새로운 예약 알림',
      message: 'A홀에 새로운 예약이 등록되었습니다. (2024.01.15 14:00-16:00)',
      type: 'info',
      source: 'slack',
      timestamp: '12분 전',
      read: false,
      priority: 'medium'
    },
    {
      id: 'N003',
      title: 'AI 분석 완료',
      message: '오늘의 감정 분석이 완료되었습니다. 긍정적 반응이 전일 대비 5% 증가했습니다.',
      type: 'success',
      source: 'ai',
      timestamp: '30분 전',
      read: true,
      priority: 'low'
    },
    {
      id: 'N004',
      title: '워크플로우 실행 오류',
      message: '예약 알림 자동화 워크플로우에서 오류가 발생했습니다.',
      type: 'error',
      source: 'n8n',
      timestamp: '1시간 전',
      read: false,
      priority: 'critical',
      actions: [
        { label: '워크플로우 확인', action: 'check_workflow' },
        { label: '재시작', action: 'restart_workflow' }
      ]
    },
    {
      id: 'N005',
      title: '사용자 피드백',
      message: '김철수님이 회의실 시설에 대한 피드백을 남겼습니다.',
      type: 'info',
      source: 'user',
      timestamp: '2시간 전',
      read: true,
      priority: 'low'
    },
    {
      id: 'N006',
      title: '데이터베이스 백업 완료',
      message: '일일 데이터베이스 백업이 성공적으로 완료되었습니다.',
      type: 'success',
      source: 'system',
      timestamp: '3시간 전',
      read: true,
      priority: 'low'
    }
  ];

  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'info': return 'ri-information-line';
      case 'warning': return 'ri-error-warning-line';
      case 'error': return 'ri-close-circle-line';
      case 'success': return 'ri-check-circle-line';
    }
  };

  const getTypeColor = (type: Notification['type']) => {
    switch (type) {
      case 'info': return 'text-blue-600 bg-blue-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      case 'success': return 'text-green-600 bg-green-100';
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'high': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
    }
  };

  const getSourceIcon = (source: Notification['source']) => {
    switch (source) {
      case 'system': return 'ri-computer-line';
      case 'slack': return 'ri-slack-fill';
      case 'n8n': return 'ri-git-branch-line';
      case 'ai': return 'ri-brain-line';
      case 'user': return 'ri-user-line';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const filterMatch = selectedFilter === 'all' ||
      (selectedFilter === 'unread' && !notification.read) ||
      (selectedFilter === 'critical' && notification.priority === 'critical');

    const sourceMatch = selectedSource === 'all' || notification.source === selectedSource;

    return filterMatch && sourceMatch;
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const criticalCount = notifications.filter(n => n.priority === 'critical').length;

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">통합 알림 센터</h2>
            <p className="text-sm text-gray-600 mt-1">시스템, 슬랙, n8n, AI 알림을 한곳에서 관리</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm transition-colors">
              <i className="ri-mark-pen-line mr-2"></i>
              모두 읽음
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm transition-colors">
              <i className="ri-settings-3-line mr-2"></i>
              알림 설정
            </button>
          </div>
        </div>
      </div>

      {/* 통계 및 필터 */}
      <div className="p-6 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center">
              <i className="ri-notification-line text-blue-600 text-2xl mr-3"></i>
              <div>
                <p className="text-blue-800 text-sm font-medium">전체 알림</p>
                <p className="text-blue-900 text-2xl font-bold">{notifications.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center">
              <i className="ri-mail-unread-line text-yellow-600 text-2xl mr-3"></i>
              <div>
                <p className="text-yellow-800 text-sm font-medium">읽지 않음</p>
                <p className="text-yellow-900 text-2xl font-bold">{unreadCount}</p>
              </div>
            </div>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex items-center">
              <i className="ri-error-warning-line text-red-600 text-2xl mr-3"></i>
              <div>
                <p className="text-red-800 text-sm font-medium">긴급</p>
                <p className="text-red-900 text-2xl font-bold">{criticalCount}</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center">
              <i className="ri-check-line text-green-600 text-2xl mr-3"></i>
              <div>
                <p className="text-green-800 text-sm font-medium">처리 완료</p>
                <p className="text-green-900 text-2xl font-bold">
                  {notifications.filter(n => n.type === 'success').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 필터 */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex space-x-2">
            <span className="text-sm font-medium text-gray-700">필터:</span>
            {[
              { key: 'all', label: '전체' },
              { key: 'unread', label: '읽지 않음' },
              { key: 'critical', label: '긴급' }
            ].map(filter => (
              <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key as any)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedFilter === filter.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">소스:</span>
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
            >
              <option value="all">전체</option>
              <option value="system">시스템</option>
              <option value="slack">Slack</option>
              <option value="n8n">n8n</option>
              <option value="ai">AI</option>
              <option value="user">사용자</option>
            </select>
          </div>
        </div>
      </div>

      {/* 알림 목록 */}
      <div className="divide-y divide-gray-200">
        {filteredNotifications.map(notification => (
          <div
            key={notification.id}
            className={`p-6 hover:bg-gray-50 transition-colors ${
              !notification.read ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className={`p-2 rounded-full ${getTypeColor(notification.type)}`}>
                <i className={`${getTypeIcon(notification.type)} text-lg`}></i>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className={`text-lg font-medium ${
                        !notification.read ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {notification.title}
                      </h4>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-gray-600 mb-3">{notification.message}</p>

                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <i className={getSourceIcon(notification.source)}></i>
                        <span className="capitalize">{notification.source}</span>
                      </div>
                      <span>{notification.timestamp}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(notification.priority)}`}>
                        {notification.priority === 'low' ? '낮음' :
                         notification.priority === 'medium' ? '보통' :
                         notification.priority === 'high' ? '높음' : '긴급'}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {!notification.read && (
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <i className="ri-check-line"></i>
                      </button>
                    )}
                    <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                      <i className="ri-close-line"></i>
                    </button>
                  </div>
                </div>

                {notification.actions && (
                  <div className="flex space-x-2 mt-4">
                    {notification.actions.map((action, index) => (
                      <button
                        key={index}
                        className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                          action.action === 'dismiss'
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        }`}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <div className="p-12 text-center">
          <i className="ri-notification-off-line text-4xl text-gray-400 mb-4"></i>
          <h3 className="text-lg font-medium text-gray-900 mb-2">알림이 없습니다</h3>
          <p className="text-gray-600">현재 조건에 맞는 알림이 없습니다.</p>
        </div>
      )}
    </div>
  );
}
