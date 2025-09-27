'use client';

import { useState } from 'react';

interface AutomationTrigger {
  id: string;
  name: string;
  type: 'schedule' | 'webhook' | 'database' | 'file' | 'api' | 'manual';
  status: 'active' | 'inactive' | 'error' | 'paused';
  event: string;
  conditions: string[];
  actions: string[];
  lastTriggered: string;
  triggerCount: number;
  successRate: number;
  description: string;
  schedule?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

interface TriggerLog {
  id: string;
  triggerId: string;
  timestamp: string;
  status: 'success' | 'failed' | 'skipped';
  executionTime: number;
  message: string;
  data?: any;
}

export default function AutomationTriggers() {
  const [selectedTab, setSelectedTab] = useState<'triggers' | 'logs' | 'create'>('triggers');
  const [filterType, setFilterType] = useState<'all' | AutomationTrigger['type']>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | AutomationTrigger['status']>('all');

  // === 더미 데이터 ===
  const triggers: AutomationTrigger[] = [
    {
      id: 'trigger-001',
      name: '예약 생성 알림 트리거',
      type: 'database',
      status: 'active',
      event: 'booking.created',
      conditions: ['booking.status = "confirmed"', 'booking.room_type != "test"'],
      actions: ['send_slack_notification', 'update_calendar', 'send_email'],
      lastTriggered: '5분 전',
      triggerCount: 1247,
      successRate: 98.5,
      description: '새로운 예약이 확정되면 자동으로 알림을 전송합니다',
      priority: 'high',
    },
    {
      id: 'trigger-002',
      name: '일일 리포트 생성',
      type: 'schedule',
      status: 'active',
      event: 'daily_report',
      conditions: ['time = "09:00"', 'weekday = true'],
      actions: ['generate_report', 'send_to_managers', 'archive_data'],
      lastTriggered: '2시간 전',
      triggerCount: 30,
      successRate: 100,
      description: '매일 오전 9시에 전날 사용량 리포트를 생성합니다',
      schedule: '0 9 * * 1-5',
      priority: 'medium',
    },
    {
      id: 'trigger-003',
      name: '시스템 리소스 모니터링',
      type: 'api',
      status: 'active',
      event: 'system.resource_check',
      conditions: ['cpu_usage > 85', 'memory_usage > 80'],
      actions: ['send_alert', 'scale_resources', 'notify_devops'],
      lastTriggered: '1시간 전',
      triggerCount: 892,
      successRate: 95.2,
      description: '시스템 리소스가 임계값을 초과하면 경고를 발송합니다',
      priority: 'critical',
    },
  ];

  const triggerLogs: TriggerLog[] = [
    {
      id: 'log-001',
      triggerId: 'trigger-001',
      timestamp: '14:32:15',
      status: 'success',
      executionTime: 1240,
      message: '예약 알림 전송 완료 (A홀 - 2024.01.15 14:00)',
      data: { booking_id: 'B123', room: 'A홀' },
    },
    {
      id: 'log-002',
      triggerId: 'trigger-003',
      timestamp: '14:30:22',
      status: 'success',
      executionTime: 850,
      message: 'CPU 사용률 경고 발송 (87%)',
      data: { cpu_usage: 87, memory_usage: 72 },
    },
  ];

  // === 상태/타입/우선순위 색상 & 아이콘 ===
  const getStatusColor = (status: AutomationTrigger['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getTypeIcon = (type: AutomationTrigger['type']) => {
    switch (type) {
      case 'schedule':
        return 'ri-timer-line';
      case 'webhook':
        return 'ri-webhook-line';
      case 'database':
        return 'ri-database-line';
      case 'file':
        return 'ri-file-line';
      case 'api':
        return 'ri-cloud-line';
      case 'manual':
        return 'ri-hand-coin-line';
    }
  };

  const getTypeColor = (type: AutomationTrigger['type']) => {
    switch (type) {
      case 'schedule':
        return 'bg-blue-100 text-blue-800';
      case 'webhook':
        return 'bg-purple-100 text-purple-800';
      case 'database':
        return 'bg-green-100 text-green-800';
      case 'file':
        return 'bg-orange-100 text-orange-800';
      case 'api':
        return 'bg-indigo-100 text-indigo-800';
      case 'manual':
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: AutomationTrigger['priority']) => {
    switch (priority) {
      case 'low':
        return 'bg-gray-100 text-gray-800';
      case 'medium':
        return 'bg-blue-100 text-blue-800';
      case 'high':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
    }
  };

  const getLogStatusColor = (status: TriggerLog['status']) => {
    switch (status) {
      case 'success':
        return 'text-green-600';
      case 'failed':
        return 'text-red-600';
      case 'skipped':
        return 'text-yellow-600';
    }
  };

  // === 필터링 ===
  const filteredTriggers = triggers.filter(trigger => {
    const typeMatch = filterType === 'all' || trigger.type === filterType;
    const statusMatch = filterStatus === 'all' || trigger.status === filterStatus;
    return typeMatch && statusMatch;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm">
      {/* 헤더 */}
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">자동화 트리거 관리</h2>
          <p className="text-sm text-gray-600 mt-1">이벤트 기반 자동화 트리거 설정 및 모니터링</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm">
            <i className="ri-play-line mr-2"></i>
            모든 트리거 실행
          </button>
          <button onClick={() => setSelectedTab('create')} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
            <i className="ri-add-line mr-2"></i>
            트리거 생성
          </button>
        </div>
      </div>

      {/* 탭 */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 px-6">
          {[
            { key: 'triggers', label: '트리거 목록', icon: 'ri-flashlight-line' },
            { key: 'logs', label: '실행 로그', icon: 'ri-file-list-line' },
            { key: 'create', label: '트리거 생성', icon: 'ri-add-line' },
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

      {/* 탭 내용 */}
      <div className="p-6">
        {/* 트리거 목록 */}
        {selectedTab === 'triggers' && (
          <div className="space-y-4">
            {/* 필터 */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div>
                <span className="text-sm font-medium mr-2">타입:</span>
                <select value={filterType} onChange={e => setFilterType(e.target.value as any)} className="border rounded px-3 py-2 text-sm">
                  <option value="all">전체</option>
                  <option value="schedule">스케줄</option>
                  <option value="webhook">웹훅</option>
                  <option value="database">데이터베이스</option>
                  <option value="file">파일</option>
                  <option value="api">API</option>
                  <option value="manual">수동</option>
                </select>
              </div>
              <div>
                <span className="text-sm font-medium mr-2">상태:</span>
                <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as any)} className="border rounded px-3 py-2 text-sm">
                  <option value="all">전체</option>
                  <option value="active">활성</option>
                  <option value="inactive">비활성</option>
                  <option value="paused">일시정지</option>
                  <option value="error">오류</option>
                </select>
              </div>
            </div>

            {/* 트리거 카드 */}
            {filteredTriggers.map(trigger => (
              <div key={trigger.id} className="border rounded-lg p-4 hover:shadow-md transition">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium text-gray-900">{trigger.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(trigger.status)}`}>{trigger.status}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(trigger.type)}`}>
                        <i className={`${getTypeIcon(trigger.type)} mr-1`}></i>
                        {trigger.type}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(trigger.priority)}`}>{trigger.priority}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{trigger.description}</p>
                    <p className="text-xs text-gray-500">최근 실행: {trigger.lastTriggered}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:text-green-600">
                      <i className="ri-play-line"></i>
                    </button>
                    <button className="p-2 hover:text-yellow-600">
                      <i className="ri-pause-line"></i>
                    </button>
                    <button className="p-2 hover:text-blue-600">
                      <i className="ri-edit-line"></i>
                    </button>
                    <button className="p-2 hover:text-red-600">
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 실행 로그 */}
        {selectedTab === 'logs' && (
          <div className="space-y-3">
            {triggerLogs.map(log => {
              const trigger = triggers.find(t => t.id === log.triggerId);
              return (
                <div key={log.id} className="border rounded-lg p-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{trigger?.name}</p>
                      <p className="text-sm text-gray-600">{log.message}</p>
                    </div>
                    <span className={`text-sm ${getLogStatusColor(log.status)}`}>{log.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 트리거 생성 */}
        {selectedTab === 'create' && (
          <form className="space-y-4">
            <input type="text" placeholder="트리거 이름" className="w-full border rounded px-3 py-2" />
            <textarea placeholder="설명" rows={3} className="w-full border rounded px-3 py-2" />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              생성하기
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
