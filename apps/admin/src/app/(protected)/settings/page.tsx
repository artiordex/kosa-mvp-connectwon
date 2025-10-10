'use client';

import { useState } from 'react';

export default function AdminSettings() {
  // 테마 설정
  const [theme, setTheme] = useState('light');

  // 사이트 정보
  const [siteInfo, setSiteInfo] = useState({
    title: '커넥트원',
    description: '창의적 협업 공간',
    logo: '',
    favicon: ''
  });

  // 알림 설정
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    newReservation: true,
    cancelReservation: true,
    paymentComplete: true,
    systemMaintenance: false,
    marketingEmails: false
  });

  // 언어 설정
  const [language, setLanguage] = useState('ko');

  // 보안 설정
  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    passwordMinLength: 8,
    requireSpecialChar: true,
    requireNumber: true,
    requireUppercase: false,
    sessionTimeout: 60
  });

  // 활성 탭
  const [activeTab, setActiveTab] = useState('general');

  // 변경사항 추적
  const [hasChanges, setHasChanges] = useState(false);

  const tabs = [
    { id: 'general', label: '일반 설정', icon: 'ri-settings-line' },
    { id: 'appearance', label: '테마 설정', icon: 'ri-palette-line' },
    { id: 'notifications', label: '알림 설정', icon: 'ri-notification-line' },
    { id: 'security', label: '보안 설정', icon: 'ri-shield-line' },
    { id: 'system', label: '시스템 설정', icon: 'ri-computer-line' }
  ];

  const handleSiteInfoChange = (field: string, value: string) => {
    setSiteInfo(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSecurityChange = (field: string, value: any) => {
    setSecurity(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // 저장 로직
    console.log('설정 저장:', { theme, siteInfo, notifications, language, security });
    setHasChanges(false);
    // 성공 메시지 표시
  };

  const handleCancel = () => {
    // 원래 값으로 되돌리기
    setHasChanges(false);
  };

  const handleFileUpload = (field: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleSiteInfoChange(field, e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">설정</h1>
        <p className="text-gray-600">플랫폼의 전반적인 설정을 관리하세요</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        {/* 탭 네비게이션 */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <i className={`${tab.icon} w-5 h-5 flex items-center justify-center`}></i>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* 일반 설정 */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">사이트 정보</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      사이트 제목
                    </label>
                    <input
                      type="text"
                      value={siteInfo.title}
                      onChange={(e) => handleSiteInfoChange('title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="사이트 제목을 입력하세요"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      언어 설정
                    </label>
                    <select
                      value={language}
                      onChange={(e) => {
                        setLanguage(e.target.value);
                        setHasChanges(true);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                    >
                      <option value="ko">한국어</option>
                      <option value="en">English</option>
                      <option value="ja">日本語</option>
                      <option value="zh">中文</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    사이트 설명
                  </label>
                  <textarea
                    value={siteInfo.description}
                    onChange={(e) => handleSiteInfoChange('description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="사이트 설명을 입력하세요"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">브랜딩</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      로고 업로드
                    </label>
                    <div className="flex items-center space-x-4">
                      {siteInfo.logo && (
                        <img
                          src={siteInfo.logo}
                          alt="로고 미리보기"
                          className="w-16 h-16 object-contain border border-gray-300 rounded-lg"
                        />
                      )}
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload('logo', e)}
                          className="hidden"
                          id="logo-upload"
                        />
                        <label
                          htmlFor="logo-upload"
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer whitespace-nowrap"
                        >
                          파일 선택
                        </label>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG 권장 (최대 2MB)</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      파비콘 업로드
                    </label>
                    <div className="flex items-center space-x-4">
                      {siteInfo.favicon && (
                        <img
                          src={siteInfo.favicon}
                          alt="파비콘 미리보기"
                          className="w-8 h-8 object-contain border border-gray-300 rounded"
                        />
                      )}
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload('favicon', e)}
                          className="hidden"
                          id="favicon-upload"
                        />
                        <label
                          htmlFor="favicon-upload"
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer whitespace-nowrap"
                        >
                          파일 선택
                        </label>
                        <p className="text-xs text-gray-500 mt-1">ICO, PNG 권장 (32x32px)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 테마 설정 */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">테마 설정</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      컬러 테마
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div
                        onClick={() => {
                          setTheme('light');
                          setHasChanges(true);
                        }}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          theme === 'light'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center">
                            {theme === 'light' && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">라이트 모드</h4>
                            <p className="text-sm text-gray-600">밝은 테마로 설정</p>
                          </div>
                        </div>
                        <div className="mt-3 p-3 bg-white rounded border">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-3 h-3 bg-gray-100 rounded"></div>
                            <div className="w-16 h-2 bg-gray-200 rounded"></div>
                          </div>
                          <div className="w-full h-8 bg-gray-50 rounded"></div>
                        </div>
                      </div>

                      <div
                        onClick={() => {
                          setTheme('dark');
                          setHasChanges(true);
                        }}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          theme === 'dark'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center">
                            {theme === 'dark' && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">다크 모드</h4>
                            <p className="text-sm text-gray-600">어두운 테마로 설정</p>
                          </div>
                        </div>
                        <div className="mt-3 p-3 bg-gray-800 rounded border">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-3 h-3 bg-gray-600 rounded"></div>
                            <div className="w-16 h-2 bg-gray-700 rounded"></div>
                          </div>
                          <div className="w-full h-8 bg-gray-700 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <i className="ri-information-line text-blue-600 mt-0.5 w-5 h-5 flex items-center justify-center"></i>
                      <div>
                        <h4 className="font-medium text-blue-900">미리보기</h4>
                        <p className="text-sm text-blue-700">
                          선택한 테마가 실시간으로 적용됩니다. 변경사항을 저장하려면 하단의 저장 버튼을 클릭하세요.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 알림 설정 */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">알림 설정</h3>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-medium text-gray-900">이메일 알림</h4>
                          <p className="text-sm text-gray-600">이메일로 알림을 받습니다</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.emailNotifications}
                            onChange={(e) => handleNotificationChange('emailNotifications', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-medium text-gray-900">푸시 알림</h4>
                          <p className="text-sm text-gray-600">브라우저 푸시 알림을 받습니다</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.pushNotifications}
                            onChange={(e) => handleNotificationChange('pushNotifications', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">세부 알림 설정</h4>
                    <div className="space-y-3">
                      {[
                        { key: 'newReservation', label: '새로운 예약', desc: '새 예약이 들어올 때 알림' },
                        { key: 'cancelReservation', label: '예약 취소', desc: '예약이 취소될 때 알림' },
                        { key: 'paymentComplete', label: '결제 완료', desc: '결제가 완료될 때 알림' },
                        { key: 'systemMaintenance', label: '시스템 점검', desc: '시스템 점검 시 알림' },
                        { key: 'marketingEmails', label: '마케팅 이메일', desc: '프로모션 및 마케팅 정보' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">{item.label}</div>
                            <div className="text-sm text-gray-600">{item.desc}</div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={notifications[item.key as keyof typeof notifications] as boolean}
                              onChange={(e) => handleNotificationChange(item.key, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 보안 설정 */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">보안 설정</h3>

                <div className="space-y-6">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900">2단계 인증</h4>
                        <p className="text-sm text-gray-600">추가 보안을 위한 2단계 인증을 활성화합니다</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={security.twoFactorAuth}
                          onChange={(e) => handleSecurityChange('twoFactorAuth', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">비밀번호 정책</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          최소 길이
                        </label>
                        <select
                          value={security.passwordMinLength}
                          onChange={(e) => handleSecurityChange('passwordMinLength', parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                        >
                          <option value={6}>6자</option>
                          <option value={8}>8자</option>
                          <option value={10}>10자</option>
                          <option value={12}>12자</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          세션 타임아웃 (분)
                        </label>
                        <select
                          value={security.sessionTimeout}
                          onChange={(e) => handleSecurityChange('sessionTimeout', parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                        >
                          <option value={30}>30분</option>
                          <option value={60}>1시간</option>
                          <option value={120}>2시간</option>
                          <option value={480}>8시간</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-4 space-y-3">
                      {[
                        { key: 'requireSpecialChar', label: '특수문자 필수', desc: '비밀번호에 특수문자를 포함해야 합니다' },
                        { key: 'requireNumber', label: '숫자 필수', desc: '비밀번호에 숫자를 포함해야 합니다' },
                        { key: 'requireUppercase', label: '대문자 필수', desc: '비밀번호에 대문자를 포함해야 합니다' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">{item.label}</div>
                            <div className="text-sm text-gray-600">{item.desc}</div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={security[item.key as keyof typeof security] as boolean}
                              onChange={(e) => handleSecurityChange(item.key, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 시스템 설정 */}
          {activeTab === 'system' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">시스템 관리</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <i className="ri-database-line text-blue-600 w-6 h-6 flex items-center justify-center"></i>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">데이터베이스 백업</h4>
                        <p className="text-sm text-gray-600">시스템 데이터를 백업합니다</p>
                      </div>
                    </div>
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer whitespace-nowrap">
                      백업 실행
                    </button>
                  </div>

                  <div className="p-6 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <i className="ri-refresh-line text-green-600 w-6 h-6 flex items-center justify-center"></i>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">캐시 정리</h4>
                        <p className="text-sm text-gray-600">시스템 캐시를 정리합니다</p>
                      </div>
                    </div>
                    <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer whitespace-nowrap">
                      캐시 정리
                    </button>
                  </div>

                  <div className="p-6 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <i className="ri-file-text-line text-orange-600 w-6 h-6 flex items-center justify-center"></i>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">로그 다운로드</h4>
                        <p className="text-sm text-gray-600">시스템 로그를 다운로드합니다</p>
                      </div>
                    </div>
                    <button className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 cursor-pointer whitespace-nowrap">
                      로그 다운로드
                    </button>
                  </div>

                  <div className="p-6 border border-red-200 rounded-lg bg-red-50">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <i className="ri-restart-line text-red-600 w-6 h-6 flex items-center justify-center"></i>
                      </div>
                      <div>
                        <h4 className="font-medium text-red-900">시스템 재시작</h4>
                        <p className="text-sm text-red-700">시스템을 재시작합니다 (주의 필요)</p>
                      </div>
                    </div>
                    <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer whitespace-nowrap">
                      시스템 재시작
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 저장/취소 버튼 */}
        {hasChanges && (
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-orange-600">
                <i className="ri-information-line w-4 h-4 flex items-center justify-center"></i>
                <span>변경사항이 있습니다. 저장하시겠습니까?</span>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer whitespace-nowrap"
                >
                  취소
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer whitespace-nowrap"
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
