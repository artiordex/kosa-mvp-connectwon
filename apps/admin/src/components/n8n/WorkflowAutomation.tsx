'use client';

import { useState } from 'react';

interface Workflow {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'error' | 'paused';
  lastRun: string;
  successRate: number;
  executions: number;
  trigger: string;
  description: string;
}

export default function WorkflowAutomation() {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'workflows' | 'logs'>('overview');

  const workflows: Workflow[] = [
    {
      id: 'wf-001',
      name: '예약 알림 자동화',
      status: 'active',
      lastRun: '5분 전',
      successRate: 98.5,
      executions: 1247,
      trigger: 'HTTP 웹훅',
      description: '예약 생성 시 슬랙 채널로 자동 알림 발송',
    },
    {
      id: 'wf-002',
      name: '일일 리포트 생성',
      status: 'active',
      lastRun: '2시간 전',
      successRate: 100,
      executions: 30,
      trigger: '스케줄러 (매일 9시)',
      description: '일일 사용량 통계를 생성하여 관리자에게 전송',
    },
    {
      id: 'wf-003',
      name: '고객 피드백 분석',
      status: 'paused',
      lastRun: '1일 전',
      successRate: 95.2,
      executions: 156,
      trigger: '데이터베이스 변경',
      description: 'AI를 통한 고객 리뷰 감정 분석 및 알림',
    },
    {
      id: 'wf-004',
      name: '시스템 상태 모니터링',
      status: 'error',
      lastRun: '30분 전',
      successRate: 87.3,
      executions: 892,
      trigger: 'HTTP 폴링 (5분마다)',
      description: '시스템 헬스체크 및 장애 알림',
    },
  ];

  const getStatusColor = (status: Workflow['status']) => {
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

  const getStatusIcon = (status: Workflow['status']) => {
    switch (status) {
      case 'active':
        return 'ri-play-circle-fill';
      case 'inactive':
        return 'ri-stop-circle-line';
      case 'error':
        return 'ri-error-warning-fill';
      case 'paused':
        return 'ri-pause-circle-fill';
    }
  };

  const recentLogs = [
    { time: '14:32:15', workflow: '예약 알림 자동화', status: 'success', message: '슬랙 알림 전송 완료' },
    { time: '14:30:22', workflow: '시스템 상태 모니터링', status: 'error', message: 'API 응답 시간 초과' },
    { time: '14:28:45', workflow: '예약 알림 자동화', status: 'success', message: '예약 데이터 처리 완료' },
    { time: '14:25:10', workflow: '일일 리포트 생성', status: 'success', message: '리포트 생성 및 전송 완료' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">n8n 워크플로우 관리</h2>
            <p className="text-sm text-gray-600 mt-1">자동화 워크플로우 상태 및 실행 현황</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm transition-colors">
              <i className="ri-add-line mr-2"></i>새 워크플로우
            </button>
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm transition-colors">
              <i className="ri-external-link-line mr-2"></i>
              n8n 열기
            </button>
          </div>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 px-6">
          {[
            { key: 'overview', label: '개요', icon: 'ri-dashboard-line' },
            { key: 'workflows', label: '워크플로우', icon: 'ri-git-branch-line' },
            { key: 'logs', label: '실행 로그', icon: 'ri-file-list-line' },
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
        {selectedTab === 'overview' && (
          <div className="space-y-6">
            {/* 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center">
                  <i className="ri-play-circle-fill text-green-600 text-2xl mr-3"></i>
                  <div>
                    <p className="text-green-800 text-sm font-medium">활성 워크플로우</p>
                    <p className="text-green-900 text-2xl font-bold">2</p>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center">
                  <i className="ri-timer-line text-blue-600 text-2xl mr-3"></i>
                  <div>
                    <p className="text-blue-800 text-sm font-medium">오늘 실행</p>
                    <p className="text-blue-900 text-2xl font-bold">47</p>
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center">
                  <i className="ri-check-line text-purple-600 text-2xl mr-3"></i>
                  <div>
                    <p className="text-purple-800 text-sm font-medium">성공률</p>
                    <p className="text-purple-900 text-2xl font-bold">96.8%</p>
                  </div>
                </div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <div className="flex items-center">
                  <i className="ri-error-warning-line text-orange-600 text-2xl mr-3"></i>
                  <div>
                    <p className="text-orange-800 text-sm font-medium">오류 발생</p>
                    <p className="text-orange-900 text-2xl font-bold">3</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 최근 활동 */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">최근 워크플로우 활동</h3>
              <div className="space-y-3">
                {workflows.slice(0, 3).map(workflow => (
                  <div key={workflow.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <i
                        className={`${getStatusIcon(workflow.status)} text-xl ${
                          workflow.status === 'active'
                            ? 'text-green-600'
                            : workflow.status === 'error'
                              ? 'text-red-600'
                              : workflow.status === 'paused'
                                ? 'text-yellow-600'
                                : 'text-gray-600'
                        }`}
                      ></i>
                      <div>
                        <p className="font-medium text-gray-900">{workflow.name}</p>
                        <p className="text-sm text-gray-600">마지막 실행: {workflow.lastRun}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(workflow.status)}`}>
                      {workflow.status === 'active'
                        ? '실행중'
                        : workflow.status === 'error'
                          ? '오류'
                          : workflow.status === 'paused'
                            ? '일시정지'
                            : '비활성'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'workflows' && (
          <div className="space-y-4">
            {workflows.map(workflow => (
              <div key={workflow.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{workflow.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(workflow.status)}`}>
                        {workflow.status === 'active'
                          ? '실행중'
                          : workflow.status === 'error'
                            ? '오류'
                            : workflow.status === 'paused'
                              ? '일시정지'
                              : '비활성'}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{workflow.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">트리거</p>
                        <p className="font-medium">{workflow.trigger}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">마지막 실행</p>
                        <p className="font-medium">{workflow.lastRun}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">성공률</p>
                        <p className="font-medium">{workflow.successRate}%</p>
                      </div>
                      <div>
                        <p className="text-gray-500">총 실행</p>
                        <p className="font-medium">{workflow.executions}회</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <i className="ri-play-line"></i>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-yellow-600 transition-colors">
                      <i className="ri-pause-line"></i>
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
        )}

        {selectedTab === 'logs' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">실행 로그</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                <i className="ri-refresh-line mr-2"></i>
                새로고침
              </button>
            </div>

            <div className="space-y-2">
              {recentLogs.map((log, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-500 font-mono">{log.time}</span>
                  <div className={`w-2 h-2 rounded-full ${log.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm font-medium text-gray-900">{log.workflow}</span>
                  <span className="text-sm text-gray-600">{log.message}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
