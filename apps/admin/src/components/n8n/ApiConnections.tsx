'use client';

import { useState } from 'react';

interface ApiConnection {
  id: string;
  name: string;
  service: string;
  status: 'connected' | 'disconnected' | 'error' | 'testing';
  baseUrl: string;
  version: string;
  lastChecked: string;
  responseTime: number;
  uptime: number;
  rateLimitRemaining: number;
  rateLimitTotal: number;
  description: string;
  authentication: 'api_key' | 'oauth' | 'basic' | 'bearer';
  isRequired: boolean;
}

interface ApiMetrics {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
}

export default function ApiConnections() {
  const [selectedTab, setSelectedTab] = useState<'connections' | 'metrics' | 'logs'>('connections');

  const apiConnections: ApiConnection[] = [
    {
      id: 'api-001',
      name: 'Slack API',
      service: 'slack',
      status: 'connected',
      baseUrl: 'https://slack.com/api',
      version: 'v1.7.0',
      lastChecked: '1분 전',
      responseTime: 145,
      uptime: 99.9,
      rateLimitRemaining: 850,
      rateLimitTotal: 1000,
      description: '슬랙 메시지 전송 및 채널 관리',
      authentication: 'bearer',
      isRequired: true,
    },
    {
      id: 'api-002',
      name: 'n8n API',
      service: 'n8n',
      status: 'connected',
      baseUrl: 'https://n8n.company.com/api',
      version: 'v1.0',
      lastChecked: '2분 전',
      responseTime: 89,
      uptime: 98.5,
      rateLimitRemaining: 500,
      rateLimitTotal: 500,
      description: '워크플로우 자동화 및 관리',
      authentication: 'api_key',
      isRequired: true,
    },
    {
      id: 'api-003',
      name: 'AI 분석 API',
      service: 'openai',
      status: 'connected',
      baseUrl: 'https://api.openai.com',
      version: 'v1',
      lastChecked: '30초 전',
      responseTime: 1200,
      uptime: 99.8,
      rateLimitRemaining: 45,
      rateLimitTotal: 60,
      description: 'AI 기반 텍스트 분석 및 처리',
      authentication: 'bearer',
      isRequired: false,
    },
    {
      id: 'api-004',
      name: '결제 API',
      service: 'stripe',
      status: 'error',
      baseUrl: 'https://api.stripe.com',
      version: 'v2020-08-27',
      lastChecked: '5분 전',
      responseTime: 0,
      uptime: 95.2,
      rateLimitRemaining: 0,
      rateLimitTotal: 100,
      description: '결제 처리 및 구독 관리',
      authentication: 'api_key',
      isRequired: true,
    },
    {
      id: 'api-005',
      name: '이메일 API',
      service: 'sendgrid',
      status: 'disconnected',
      baseUrl: 'https://api.sendgrid.com',
      version: 'v3',
      lastChecked: '1시간 전',
      responseTime: 0,
      uptime: 99.1,
      rateLimitRemaining: 1000,
      rateLimitTotal: 1000,
      description: '이메일 발송 및 템플릿 관리',
      authentication: 'api_key',
      isRequired: false,
    },
  ];

  const metrics: ApiMetrics = {
    totalRequests: 12847,
    successfulRequests: 12456,
    failedRequests: 391,
    averageResponseTime: 245,
  };

  const getStatusColor = (status: ApiConnection['status']) => {
    switch (status) {
      case 'connected':
        return 'bg-green-100 text-green-800';
      case 'disconnected':
        return 'bg-gray-100 text-gray-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'testing':
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusIcon = (status: ApiConnection['status']) => {
    switch (status) {
      case 'connected':
        return 'ri-check-line';
      case 'disconnected':
        return 'ri-close-line';
      case 'error':
        return 'ri-error-warning-line';
      case 'testing':
        return 'ri-loader-line animate-spin';
    }
  };

  const getServiceIcon = (service: string) => {
    switch (service) {
      case 'slack':
        return 'ri-slack-fill text-purple-600';
      case 'n8n':
        return 'ri-git-branch-line text-blue-600';
      case 'openai':
        return 'ri-brain-line text-green-600';
      case 'stripe':
        return 'ri-bank-card-line text-indigo-600';
      case 'sendgrid':
        return 'ri-mail-line text-blue-500';
      default:
        return 'ri-cloud-line text-gray-600';
    }
  };

  const getAuthBadgeColor = (auth: ApiConnection['authentication']) => {
    switch (auth) {
      case 'api_key':
        return 'bg-blue-100 text-blue-800';
      case 'oauth':
        return 'bg-green-100 text-green-800';
      case 'basic':
        return 'bg-yellow-100 text-yellow-800';
      case 'bearer':
        return 'bg-purple-100 text-purple-800';
    }
  };

  const getRateLimitPercentage = (remaining: number, total: number) => {
    return total > 0 ? (remaining / total) * 100 : 0;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">API 연결 상태</h2>
            <p className="text-sm text-gray-600 mt-1">외부 서비스와의 API 연결 상태 및 성능 모니터링</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm transition-colors">
              <i className="ri-refresh-line mr-2"></i>
              전체 테스트
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm transition-colors">
              <i className="ri-add-line mr-2"></i>
              API 추가
            </button>
          </div>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 px-6">
          {[
            { key: 'connections', label: '연결 상태', icon: 'ri-links-line' },
            { key: 'metrics', label: '성능 지표', icon: 'ri-bar-chart-line' },
            { key: 'logs', label: '요청 로그', icon: 'ri-file-list-line' },
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
        {selectedTab === 'connections' && (
          <div className="space-y-6">
            {/* 요약 통계 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 text-2xl mr-3"></i>
                  <div>
                    <p className="text-green-800 text-sm font-medium">연결됨</p>
                    <p className="text-green-900 text-2xl font-bold">{apiConnections.filter(api => api.status === 'connected').length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <div className="flex items-center">
                  <i className="ri-error-warning-line text-red-600 text-2xl mr-3"></i>
                  <div>
                    <p className="text-red-800 text-sm font-medium">오류</p>
                    <p className="text-red-900 text-2xl font-bold">{apiConnections.filter(api => api.status === 'error').length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center">
                  <i className="ri-close-line text-gray-600 text-2xl mr-3"></i>
                  <div>
                    <p className="text-gray-800 text-sm font-medium">연결 끊김</p>
                    <p className="text-gray-900 text-2xl font-bold">{apiConnections.filter(api => api.status === 'disconnected').length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center">
                  <i className="ri-time-line text-blue-600 text-2xl mr-3"></i>
                  <div>
                    <p className="text-blue-800 text-sm font-medium">평균 응답시간</p>
                    <p className="text-blue-900 text-2xl font-bold">{metrics.averageResponseTime}ms</p>
                  </div>
                </div>
              </div>
            </div>

            {/* API 연결 목록 */}
            <div className="space-y-4">
              {apiConnections.map(api => (
                <div key={api.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <i className={`${getServiceIcon(api.service)} text-2xl`}></i>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-medium text-gray-900">{api.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(api.status)}`}>
                            <i className={`${getStatusIcon(api.status)} mr-1`}></i>
                            {api.status === 'connected'
                              ? '연결됨'
                              : api.status === 'error'
                                ? '오류'
                                : api.status === 'testing'
                                  ? '테스트 중'
                                  : '연결 끊김'}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAuthBadgeColor(api.authentication)}`}>
                            {api.authentication.toUpperCase()}
                          </span>
                          {api.isRequired && <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">필수</span>}
                        </div>

                        <p className="text-gray-600 text-sm mb-4">{api.description}</p>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">엔드포인트</p>
                            <p className="font-medium truncate">{api.baseUrl}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">버전</p>
                            <p className="font-medium">{api.version}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">응답시간</p>
                            <p className="font-medium">{api.responseTime}ms</p>
                          </div>
                          <div>
                            <p className="text-gray-500">가동률</p>
                            <p className="font-medium">{api.uptime}%</p>
                          </div>
                          <div>
                            <p className="text-gray-500">마지막 확인</p>
                            <p className="font-medium">{api.lastChecked}</p>
                          </div>
                        </div>

                        {/* Rate Limit */}
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-500">Rate Limit</span>
                            <span className="text-sm font-medium">
                              {api.rateLimitRemaining}/{api.rateLimitTotal}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${getRateLimitPercentage(api.rateLimitRemaining, api.rateLimitTotal)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <i className="ri-test-tube-line"></i>
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                        <i className="ri-edit-line"></i>
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

        {selectedTab === 'metrics' && (
          <div className="space-y-6">
            {/* 전체 메트릭 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-sm font-medium text-blue-800 mb-2">총 요청</h3>
                <p className="text-3xl font-bold text-blue-900">{metrics.totalRequests.toLocaleString()}</p>
                <p className="text-sm text-blue-600 mt-1">지난 24시간</p>
              </div>
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-sm font-medium text-green-800 mb-2">성공률</h3>
                <p className="text-3xl font-bold text-green-900">{((metrics.successfulRequests / metrics.totalRequests) * 100).toFixed(1)}%</p>
                <p className="text-sm text-green-600 mt-1">{metrics.successfulRequests.toLocaleString()} 성공</p>
              </div>
              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="text-sm font-medium text-red-800 mb-2">실패한 요청</h3>
                <p className="text-3xl font-bold text-red-900">{metrics.failedRequests.toLocaleString()}</p>
                <p className="text-sm text-red-600 mt-1">{((metrics.failedRequests / metrics.totalRequests) * 100).toFixed(1)}% 실패율</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-sm font-medium text-purple-800 mb-2">평균 응답시간</h3>
                <p className="text-3xl font-bold text-purple-900">{metrics.averageResponseTime}ms</p>
                <p className="text-sm text-purple-600 mt-1">지난 1시간</p>
              </div>
            </div>

            {/* API별 상세 메트릭 */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">API별 성능 지표</h3>
              <div className="space-y-4">
                {apiConnections.map(api => (
                  <div key={api.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <i className={`${getServiceIcon(api.service)} text-xl`}></i>
                        <h4 className="font-medium text-gray-900">{api.name}</h4>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(api.status)}`}>
                        {api.status === 'connected' ? '정상' : '오류'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">응답시간</p>
                        <p className="text-lg font-semibold text-gray-900">{api.responseTime}ms</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">가동률</p>
                        <p className="text-lg font-semibold text-gray-900">{api.uptime}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Rate Limit</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {api.rateLimitRemaining}/{api.rateLimitTotal}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">마지막 확인</p>
                        <p className="text-lg font-semibold text-gray-900">{api.lastChecked}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'logs' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">API 요청 로그</h3>
              <div className="flex space-x-2">
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option>모든 API</option>
                  {apiConnections.map(api => (
                    <option key={api.id} value={api.id}>
                      {api.name}
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">API</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">메서드</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">엔드포인트</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태 코드</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">응답시간</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { time: '14:32:15', api: 'Slack API', method: 'POST', endpoint: '/chat.postMessage', status: 200, responseTime: 145 },
                    { time: '14:30:22', api: 'n8n API', method: 'GET', endpoint: '/workflows', status: 200, responseTime: 89 },
                    { time: '14:28:45', api: 'AI 분석 API', method: 'POST', endpoint: '/analyze', status: 200, responseTime: 1200 },
                    { time: '14:25:10', api: '결제 API', method: 'POST', endpoint: '/payments', status: 500, responseTime: 0 },
                  ].map((log, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{log.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.api}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            log.method === 'GET' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {log.method}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{log.endpoint}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`text-sm font-medium ${
                            log.status >= 200 && log.status < 300 ? 'text-green-600' : log.status >= 400 ? 'text-red-600' : 'text-yellow-600'
                          }`}
                        >
                          {log.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.responseTime}ms</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
