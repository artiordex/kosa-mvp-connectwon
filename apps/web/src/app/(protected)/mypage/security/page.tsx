/**
 * Description : page.tsx - 🔐 보안 설정 페이지 (Standalone with dummy data)
 * Author : Shiwoo Min
 * Date : 2025-10-12
 */

'use client';

import { useState } from 'react';

// 더미 데이터
const mypageData = {
  user: {
    name: '민시우',
    security: {
      is2FAEnabled: true,
      loginHistory: [
        {
          device: 'MacBook Pro (Safari)',
          location: '서울, 대한민국',
          ip: '192.168.0.15',
          date: '2025-10-10 09:42'
        },
        {
          device: 'iPhone 15 (Mobile Safari)',
          location: '서울, 대한민국',
          ip: '192.168.0.17',
          date: '2025-10-08 21:31'
        }
      ],
      trustedDevices: [
        {
          id: 'dev-01',
          name: 'MacBook Pro (민시우)',
          lastUsed: '2025-10-10 09:42'
        },
        {
          id: 'dev-02',
          name: 'iPhone 15',
          lastUsed: '2025-10-08 21:31'
        }
      ]
    },
    providers: [
      {
        provider: 'local',
        connected: true
      },
      {
        provider: 'sso',
        connected: true,
        domain: 'connectwon.okta.com',
        idp: 'okta'
      }
    ]
  }
};

export default function SecurityPage() {
  const { user } = mypageData;

  const [is2FAEnabled, setIs2FAEnabled] = useState(user.security.is2FAEnabled);
  const [trustedDevices, setTrustedDevices] = useState(user.security.trustedDevices || []);

  const handleToggle2FA = () => {
    setIs2FAEnabled(prev => !prev);
    alert(!is2FAEnabled ? '2단계 인증이 활성화되었습니다.' : '2단계 인증이 비활성화되었습니다.');
  };

  const handleRemoveDevice = (deviceId: string) => {
    setTrustedDevices(prev => prev.filter(d => d.id !== deviceId));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-8 space-y-10">
      {/* 헤더 */}
      <div className="pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">보안 설정</h1>
        <p className="text-sm text-gray-600 mt-1">
          계정의 안전을 위해 비밀번호, 2단계 인증, 로그인 기기 등을 관리하세요.
        </p>
      </div>

      {/* 🔑 비밀번호 변경 */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
          비밀번호 변경
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          정기적으로 비밀번호를 변경하면 계정 보안을 강화할 수 있습니다.
        </p>
        <div className="max-w-md space-y-4">
          <input
            type="password"
            placeholder="현재 비밀번호"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="password"
            placeholder="새 비밀번호"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="password"
            placeholder="새 비밀번호 확인"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            변경하기
          </button>
        </div>
      </div>

      {/* 🔐 2단계 인증 */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
          2단계 인증 (2FA)
        </h2>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium text-gray-900">2단계 인증 활성화</p>
            <p className="text-sm text-gray-500">
              로그인 시 비밀번호 외에도 인증 코드를 요구하여 보안을 강화합니다.
            </p>
          </div>
          <button
            onClick={handleToggle2FA}
            type="button"
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              is2FAEnabled ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform bg-white rounded-full transition-transform ${
                is2FAEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* 💻 로그인 이력 */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
          최근 로그인 이력
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-100 rounded-lg overflow-hidden">
            <thead className="bg-gray-50 text-sm text-gray-600">
              <tr>
                <th className="px-4 py-2 text-left">기기</th>
                <th className="px-4 py-2 text-left">위치</th>
                <th className="px-4 py-2 text-left">IP 주소</th>
                <th className="px-4 py-2 text-left">로그인 시간</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {user.security.loginHistory.map((log, idx) => (
                <tr key={idx} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-2">{log.device}</td>
                  <td className="px-4 py-2">{log.location}</td>
                  <td className="px-4 py-2">{log.ip}</td>
                  <td className="px-4 py-2">{log.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🧩 연결된 기기 관리 */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
          연결된 기기
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          로그인 상태가 유지된 신뢰할 수 있는 기기 목록입니다.
        </p>
        <div className="space-y-4">
          {trustedDevices.length === 0 ? (
            <p className="text-gray-500 text-sm">등록된 기기가 없습니다.</p>
          ) : (
            trustedDevices.map(device => (
              <div
                key={device.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                <div>
                  <p className="font-medium text-gray-900">{device.name}</p>
                  <p className="text-sm text-gray-500">{device.lastUsed}</p>
                </div>
                <button
                  onClick={() => handleRemoveDevice(device.id)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  로그아웃
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 🏢 SSO 설정 */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-3 pb-3 border-b border-gray-200">
          SSO 설정
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          조직용 계정(Single Sign-On)을 통해 로그인할 수 있습니다.
        </p>
        <div className="space-y-4">
          {user.providers
            .filter(p => p.provider === 'sso')
            .map((provider, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
                    <i className="ri-building-4-fill text-purple-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">SSO (Okta)</p>
                    <p className="text-sm text-gray-500">
                      {provider.connected ? (
                        <span className="flex items-center">
                          <i className="ri-checkbox-circle-fill text-green-500 mr-1"></i>
                          연동됨
                        </span>
                      ) : (
                        '연동 안됨'
                      )}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    provider.connected
                      ? 'border border-red-500 text-red-600 hover:bg-red-50'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {provider.connected ? '연동 해제' : '연동하기'}
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
