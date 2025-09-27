'use client';

import { useState } from 'react';

interface Webhook {
  id: string;
  name: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  status: 'active' | 'inactive' | 'failed';
  events: string[];
  lastTriggered: string;
  totalCalls: number;
  successRate: number;
  description: string;
  headers?: Record<string, string>;
  payload?: string;
}

interface WebhookLog {
  id: string;
  webhookId: string;
  timestamp: string;
  status: 'success' | 'failed' | 'timeout';
  responseCode: number;
  responseTime: number;
  errorMessage?: string;
}

export default function WebhookManager() {
  const [selectedTab, setSelectedTab] = useState<'webhooks' | 'logs' | 'create'>('webhooks');
  const [selectedWebhook, setSelectedWebhook] = useState<string | null>(null);

  const webhooks: Webhook[] = [
    {
      id: 'wh-001',
      name: '예약 생성 알림',
      url: 'https://hooks.slack.com/services/T123/B456/xyz789',
      method: 'POST',
      status: 'active',
      events: ['booking.created', 'booking.updated'],
      lastTriggered: '5분 전',
      totalCalls: 1847,
      successRate: 98.5,
      description: '새로운 예약이 생성되거나 수정될 때 슬랙으로 알림 전송',
      headers: { 'Content-Type': 'application/json' },
      payload: '{"text": "새로운 예약: {{booking.room}} - {{booking.time}}"}',
    },
    {
      id: 'wh-002',
      name: '시스템 상태 모니터링',
      url: 'https://api.monitoring.com/alerts',
      method: 'POST',
      status: 'active',
      events: ['system.cpu_high', 'system.memory_high', 'system.disk_full'],
      lastTriggered: '1시간 전',
      totalCalls: 234,
      successRate: 95.2,
      description: '시스템 리소스 임계값 초과 시 모니터링 서비스로 알림',
      headers: { Authorization: 'Bearer token123', 'Content-Type': 'application/json' },
    },
    {
      id: 'wh-003',
      name: 'AI 분석 결과 전송',
      url: 'https://analytics.company.com/webhook/ai-results',
      method: 'POST',
      status: 'failed',
      events: ['ai.analysis_complete', 'ai.prediction_ready'],
      lastTriggered: '2일 전',
      totalCalls: 89,
      successRate: 87.6,
      description: 'AI 분석이 완료되면 결과를 분석 플랫폼으로 전송',
      headers: { 'X-API-Key': 'api-key-456' },
    },
    {
      id: 'wh-004',
      name: '사용자 피드백 수집',
      url: 'https://feedback.api.com/submit',
      method: 'POST',
      status: 'inactive',
      events: ['user.feedback_submitted'],
      lastTriggered: '1주일 전',
      totalCalls: 156,
      successRate: 100,
      description: '사용자 피드백을 외부 피드백 관리 시스템으로 전송',
    },
  ];

  const webhookLogs: WebhookLog[] = [
    {
      id: 'log-001',
      webhookId: 'wh-001',
      timestamp: '14:32:15',
      status: 'success',
      responseCode: 200,
      responseTime: 145,
    },
    {
      id: 'log-002',
      webhookId: 'wh-002',
      timestamp: '14:30:22',
      status: 'failed',
      responseCode: 500,
      responseTime: 3000,
      errorMessage: 'Internal Server Error',
    },
    {
      id: 'log-003',
      webhookId: 'wh-001',
      timestamp: '14:28:45',
      status: 'success',
      responseCode: 200,
      responseTime: 120,
    },
    {
      id: 'log-004',
      webhookId: 'wh-003',
      timestamp: '14:25:10',
      status: 'timeout',
      responseCode: 0,
      responseTime: 30000,
      errorMessage: 'Request timeout after 30 seconds',
    },
  ];

  const getStatusColor = (status: Webhook['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
    }
  };

  const getLogStatusColor = (status: WebhookLog['status']) => {
    switch (status) {
      case 'success':
        return 'text-green-600';
      case 'failed':
        return 'text-red-600';
      case 'timeout':
        return 'text-yellow-600';
    }
  };

  const getMethodColor = (method: Webhook['method']) => {
    switch (method) {
      case 'GET':
        return 'bg-blue-100 text-blue-800';
      case 'POST':
        return 'bg-green-100 text-green-800';
      case 'PUT':
        return 'bg-yellow-100 text-yellow-800';
      case 'DELETE':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">웹훅 관리</h2>
            <p className="text-sm text-gray-600 mt-1">외부 시스템과의 실시간 데이터 연동 관리</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm transition-colors">
              <i className="ri-test-tube-line mr-2"></i>
              테스트 실행
            </button>
            <button
              onClick={() => setSelectedTab('create')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm transition-colors"
            >
              <i className="ri-add-line mr-2"></i>
              웹훅 추가
            </button>
          </div>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 px-6">
          {[
            { key: 'webhooks', label: '웹훅 목록', icon: 'ri-links-line' },
            { key: 'logs', label: '실행 로그', icon: 'ri-file-list-line' },
            { key: 'create', label: '웹훅 생성', icon: 'ri-add-line' },
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
        {selectedTab === 'webhooks' && (
          <div className="space-y-6">
            {/* 통계 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 text-2xl mr-3"></i>
                  <div>
                    <p className="text-green-800 text-sm font-medium">활성 웹훅</p>
                    <p className="text-green-900 text-2xl font-bold">{webhooks.filter(w => w.status === 'active').length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center">
                  <i className="ri-send-plane-line text-blue-600 text-2xl mr-3"></i>
                  <div>
                    <p className="text-blue-800 text-sm font-medium">오늘 호출</p>
                    <p className="text-blue-900 text-2xl font-bold">147</p>
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center">
                  <i className="ri-bar-chart-line text-purple-600 text-2xl mr-3"></i>
                  <div>
                    <p className="text-purple-800 text-sm font-medium">평균 성공률</p>
                    <p className="text-purple-900 text-2xl font-bold">95.3%</p>
                  </div>
                </div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <div className="flex items-center">
                  <i className="ri-error-warning-line text-orange-600 text-2xl mr-3"></i>
                  <div>
                    <p className="text-orange-800 text-sm font-medium">실패한 웹훅</p>
                    <p className="text-orange-900 text-2xl font-bold">{webhooks.filter(w => w.status === 'failed').length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 웹훅 목록 */}
            <div className="space-y-4">
              {webhooks.map(webhook => (
                <div key={webhook.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{webhook.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(webhook.status)}`}>
                          {webhook.status === 'active' ? '활성' : webhook.status === 'failed' ? '실패' : '비활성'}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMethodColor(webhook.method)}`}>{webhook.method}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{webhook.description}</p>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-4">
                          <span className="text-gray-500">URL:</span>
                          <code className="bg-gray-100 px-2 py-1 rounded text-xs">{webhook.url}</code>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-gray-500">이벤트:</span>
                          <div className="flex flex-wrap gap-1">
                            {webhook.events.map((event, idx) => (
                              <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                {event}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-3">
                          <div>
                            <span className="text-gray-500">마지막 실행:</span>
                            <span className="ml-2 font-medium">{webhook.lastTriggered}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">총 호출:</span>
                            <span className="ml-2 font-medium">{webhook.totalCalls}회</span>
                          </div>
                          <div>
                            <span className="text-gray-500">성공률:</span>
                            <span className="ml-2 font-medium">{webhook.successRate}%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                        <i className="ri-play-line"></i>
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <i className="ri-edit-line"></i>
                      </button>
                      <button className="p-2 text-gray-400 hover:text-yellow-600 transition-colors">
                        <i className="ri-test-tube-line"></i>
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'logs' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">웹훅 실행 로그</h3>
              <div className="flex space-x-2">
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option>모든 웹훅</option>
                  {webhooks.map(webhook => (
                    <option key={webhook.id} value={webhook.id}>
                      {webhook.name}
                    </option>
                  ))}
                </select>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  <i className="ri-refresh-line mr-2"></i>
                  새로고침
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">시간</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">웹훅</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">응답 코드</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">응답 시간</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">오류 메시지</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {webhookLogs.map(log => {
                    const webhook = webhooks.find(w => w.id === log.webhookId);
                    return (
                      <tr key={log.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{log.timestamp}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{webhook?.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <i className={`ri-circle-fill text-xs mr-2 ${getLogStatusColor(log.status)}`}></i>
                          <span className={`text-sm ${getLogStatusColor(log.status)}`}>
                            {log.status === 'success' ? '성공' : log.status === 'failed' ? '실패' : '타임아웃'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.responseCode || '-'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.responseTime}ms</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{log.errorMessage || '-'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedTab === 'create' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">새 웹훅 생성</h3>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">웹훅 이름</label>
                  <input
                    type="text"
                    placeholder="예: 예약 알림 웹훅"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">HTTP 메서드</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="POST">POST</option>
                    <option value="GET">GET</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">엔드포인트 URL</label>
                <input
                  type="url"
                  placeholder="https://api.example.com/webhook"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">설명</label>
                <textarea
                  rows={3}
                  placeholder="웹훅의 용도와 기능을 설명해주세요"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">트리거 이벤트</label>
                <div className="space-y-2">
                  {['booking.created', 'booking.updated', 'booking.cancelled', 'user.registered', 'system.cpu_high', 'ai.analysis_complete'].map(
                    event => (
                      <label key={event} className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm text-gray-700">{event}</span>
                      </label>
                    ),
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">헤더 (선택사항)</label>
                <textarea
                  rows={3}
                  placeholder='{"Authorization": "Bearer token", "Content-Type": "application/json"}'
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">페이로드 템플릿 (선택사항)</label>
                <textarea
                  rows={4}
                  placeholder='{"message": "{{event.type}}", "data": "{{event.data}}"}'
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div className="flex space-x-4">
                <button type="button" className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  취소
                </button>
                <button type="button" className="bg-blue-100 text-blue-700 px-6 py-2 rounded-lg hover:bg-blue-200 transition-colors">
                  테스트
                </button>
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  웹훅 생성
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
