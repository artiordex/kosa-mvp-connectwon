'use client';

import { useState } from 'react';

interface SlackChannel {
  id: string;
  name: string;
  memberCount: number;
  isPrivate: boolean;
  notifications: boolean;
}

interface SlackMessage {
  id: string;
  channel: string;
  user: string;
  avatar: string;
  message: string;
  timestamp: string;
  type: 'notification' | 'alert' | 'report';
}

export default function SlackIntegration() {
  const [selectedTab, setSelectedTab] = useState<'channels' | 'messages' | 'settings'>('channels');
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'connecting'>('connected');

  const channels: SlackChannel[] = [
    { id: 'C001', name: '#알림-예약', memberCount: 25, isPrivate: false, notifications: true },
    { id: 'C002', name: '#시스템-모니터링', memberCount: 8, isPrivate: false, notifications: true },
    { id: 'C003', name: '#관리자-전용', memberCount: 5, isPrivate: true, notifications: true },
    { id: 'C004', name: '#일반-공지', memberCount: 120, isPrivate: false, notifications: false },
    { id: 'C005', name: '#ai-분석-결과', memberCount: 12, isPrivate: false, notifications: true },
  ];

  const recentMessages: SlackMessage[] = [
    {
      id: 'M001',
      channel: '#알림-예약',
      user: 'AI Bot',
      avatar: '🤖',
      message: '새로운 예약이 등록되었습니다. [A홀 - 2024.01.15 14:00-16:00]',
      timestamp: '5분 전',
      type: 'notification',
    },
    {
      id: 'M002',
      channel: '#시스템-모니터링',
      user: 'System Monitor',
      avatar: '⚠️',
      message: 'CPU 사용률이 85%를 초과했습니다. 확인이 필요합니다.',
      timestamp: '12분 전',
      type: 'alert',
    },
    {
      id: 'M003',
      channel: '#ai-분석-결과',
      user: 'AI Analytics',
      avatar: '📊',
      message: '오늘의 감정 분석 결과: 긍정 78%, 중립 15%, 부정 7%',
      timestamp: '1시간 전',
      type: 'report',
    },
    {
      id: 'M004',
      channel: '#알림-예약',
      user: 'AI Bot',
      avatar: '🤖',
      message: '예약이 취소되었습니다. [B홀 - 2024.01.15 10:00-12:00]',
      timestamp: '2시간 전',
      type: 'notification',
    },
  ];

  const notificationTypes = [
    { key: 'booking', label: '예약 알림', enabled: true, channel: '#알림-예약' },
    { key: 'system', label: '시스템 경고', enabled: true, channel: '#시스템-모니터링' },
    { key: 'ai_insights', label: 'AI 분석 결과', enabled: true, channel: '#ai-분석-결과' },
    { key: 'daily_report', label: '일일 리포트', enabled: false, channel: '#관리자-전용' },
    { key: 'user_feedback', label: '사용자 피드백', enabled: true, channel: '#일반-공지' },
  ];

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'bg-green-100 text-green-800';
      case 'disconnected':
        return 'bg-red-100 text-red-800';
      case 'connecting':
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getMessageTypeColor = (type: SlackMessage['type']) => {
    switch (type) {
      case 'notification':
        return 'border-l-blue-500';
      case 'alert':
        return 'border-l-red-500';
      case 'report':
        return 'border-l-green-500';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Slack 연동 관리</h2>
              <p className="text-sm text-gray-600 mt-1">슬랙 채널 및 알림 설정 관리</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConnectionStatusColor()}`}>
              {connectionStatus === 'connected' ? '연결됨' : connectionStatus === 'disconnected' ? '연결 끊김' : '연결 중'}
            </span>
          </div>
          <div className="flex space-x-3">
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm transition-colors">
              <i className="ri-refresh-line mr-2"></i>
              동기화
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm transition-colors">
              <i className="ri-slack-fill mr-2"></i>
              Slack 열기
            </button>
          </div>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 px-6">
          {[
            { key: 'channels', label: '채널 관리', icon: 'ri-hashtag' },
            { key: 'messages', label: '최근 메시지', icon: 'ri-message-3-line' },
            { key: 'settings', label: '알림 설정', icon: 'ri-settings-3-line' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setSelectedTab(tab.key as any)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                selectedTab === tab.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <i className={`${tab.icon} mr-2`}></i>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6">
        {selectedTab === 'channels' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">연동된 채널</h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm transition-colors">
                <i className="ri-add-line mr-2"></i>
                채널 추가
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {channels.map(channel => (
                <div key={channel.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <i className={`ri-hashtag text-gray-400`}></i>
                      {channel.isPrivate && <i className="ri-lock-line text-gray-400"></i>}
                      <h4 className="font-medium text-gray-900">{channel.name}</h4>
                    </div>
                    <div className="flex space-x-1">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                        <i className="ri-edit-line text-sm"></i>
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                        <i className="ri-delete-bin-line text-sm"></i>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-between">
                      <span>멤버 수</span>
                      <span className="font-medium">{channel.memberCount}명</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>알림 상태</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          channel.notifications ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {channel.notifications ? '활성' : '비활성'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>채널 타입</span>
                      <span className="font-medium">{channel.isPrivate ? '비공개' : '공개'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'messages' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">최근 메시지</h3>
              <div className="flex space-x-2">
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option>모든 채널</option>
                  <option>#알림-예약</option>
                  <option>#시스템-모니터링</option>
                  <option>#ai-분석-결과</option>
                </select>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  <i className="ri-refresh-line mr-2"></i>
                  새로고침
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {recentMessages.map(message => (
                <div key={message.id} className={`border-l-4 ${getMessageTypeColor(message.type)} bg-gray-50 p-4 rounded-r-lg`}>
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{message.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900">{message.user}</span>
                        <span className="text-blue-600 text-sm">{message.channel}</span>
                        <span className="text-gray-500 text-sm">{message.timestamp}</span>
                      </div>
                      <p className="text-gray-700">{message.message}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        message.type === 'notification'
                          ? 'bg-blue-100 text-blue-800'
                          : message.type === 'alert'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {message.type === 'notification' ? '알림' : message.type === 'alert' ? '경고' : '리포트'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'settings' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">연결 설정</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Slack 워크스페이스</h4>
                    <p className="text-sm text-gray-600">connectwon.slack.com</p>
                  </div>
                  <button className="bg-red-100 text-red-700 px-3 py-2 rounded-lg hover:bg-red-200 text-sm transition-colors">연결 해제</button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">API 토큰</h4>
                    <p className="text-sm text-gray-600">마지막 업데이트: 2024.01.10</p>
                  </div>
                  <button className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-200 text-sm transition-colors">토큰 갱신</button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">알림 설정</h3>
              <div className="space-y-4">
                {notificationTypes.map(notification => (
                  <div key={notification.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${notification.enabled ? 'bg-green-100' : 'bg-gray-100'}`}
                      >
                        <i className={`ri-notification-line ${notification.enabled ? 'text-green-600' : 'text-gray-400'}`}></i>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{notification.label}</h4>
                        <p className="text-sm text-gray-600">채널: {notification.channel}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button className="text-gray-400 hover:text-blue-600 transition-colors">
                        <i className="ri-settings-line"></i>
                      </button>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={notification.enabled} onChange={() => {}} className="sr-only peer" />
                        <div
                          className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full
                          peer peer-checked:after:translate-x-full peer-checked:after:border-white
                          after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                          after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
                          peer-checked:bg-blue-600"
                        ></div>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
