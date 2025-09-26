'use client';

import { useState } from 'react';
import AppShell from '../../components/AppShell';
import Header from '../../components/Header';

export default function AdminUsers() {
  const [users] = useState([
    {
      id: 1,
      name: '김회원',
      email: 'kim@example.com',
      phone: '010-1234-5678',
      joinDate: '2024-01-05',
      status: 'active',
      membership: 'premium',
      totalReservations: 12,
      totalSpent: 450000,
      lastActivity: '2024-01-14',
      profileImage: "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20young%20Korean%20woman%20smiling%2C%20business%20casual%20attire%2C%20clean%20background%2C%20friendly%20and%20approachable%20expression&width=100&height=100&seq=user-1&orientation=squarish"
    },
    {
      id: 2,
      name: '이회원',
      email: 'lee@example.com',
      phone: '010-2345-6789',
      joinDate: '2023-12-15',
      status: 'active',
      membership: 'basic',
      totalReservations: 8,
      totalSpent: 280000,
      lastActivity: '2024-01-13',
      profileImage: "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20young%20Korean%20man%20with%20glasses%2C%20casual%20business%20attire%2C%20neutral%20background%2C%20confident%20and%20friendly%20appearance&width=100&height=100&seq=user-2&orientation=squarish"
    },
    {
      id: 3,
      name: '박회원',
      email: 'park@example.com',
      phone: '010-3456-7890',
      joinDate: '2024-01-08',
      status: 'active',
      membership: 'basic',
      totalReservations: 5,
      totalSpent: 175000,
      lastActivity: '2024-01-12',
      profileImage: "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20middle-aged%20Korean%20woman%2C%20elegant%20business%20attire%2C%20soft%20lighting%2C%20warm%20and%20professional%20smile&width=100&height=100&seq=user-3&orientation=squarish"
    },
    {
      id: 4,
      name: '최회원',
      email: 'choi@example.com',
      phone: '010-4567-8901',
      joinDate: '2023-11-20',
      status: 'inactive',
      membership: 'premium',
      totalReservations: 15,
      totalSpent: 650000,
      lastActivity: '2024-01-02',
      profileImage: "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20young%20Korean%20man%20in%20business%20suit%2C%20modern%20office%20background%2C%20professional%20and%20trustworthy%20appearance&width=100&height=100&seq=user-4&orientation=squarish"
    },
    {
      id: 5,
      name: '정회원',
      email: 'jung@example.com',
      phone: '010-5678-9012',
      joinDate: '2024-01-10',
      status: 'active',
      membership: 'basic',
      totalReservations: 3,
      totalSpent: 95000,
      lastActivity: '2024-01-14',
      profileImage: "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20young%20Korean%20woman%20with%20long%20hair%2C%20casual%20professional%20attire%2C%20bright%20and%20cheerful%20expression&width=100&height=100&seq=user-5&orientation=squarish"
    }
  ]);

  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedMembership, setSelectedMembership] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const statuses = ['all', 'active', 'inactive'];
  const memberships = ['all', 'basic', 'premium'];

  const filteredUsers = users.filter(user => {
    if (selectedStatus !== 'all' && user.status !== selectedStatus) return false;
    if (selectedMembership !== 'all' && user.membership !== selectedMembership) return false;
    if (searchTerm && !user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !user.email.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">활성</span>;
      case 'inactive':
        return <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">비활성</span>;
      default:
        return null;
    }
  };

  const getMembershipBadge = (membership) => {
    switch (membership) {
      case 'premium':
        return <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">프리미엄</span>;
      case 'basic':
        return <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">베이직</span>;
      default:
        return null;
    }
  };

  return (
    <AppShell>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">회원 관리</h1>
              <p className="text-gray-600">등록된 회원 정보를 관리하고 활동 현황을 확인하세요</p>
            </div>

            {/* 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">총 회원</p>
                    <p className="text-3xl font-bold text-blue-600">{users.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="ri-user-line text-blue-600 w-6 h-6 flex items-center justify-center"></i>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-green-600">+8</span>
                  <span className="text-gray-600 ml-2">이번 달</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">활성 회원</p>
                    <p className="text-3xl font-bold text-green-600">{users.filter(u => u.status === 'active').length}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <i className="ri-user-heart-line text-green-600 w-6 h-6 flex items-center justify-center"></i>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-blue-600">{Math.round((users.filter(u => u.status === 'active').length / users.length) * 100)}%</span>
                  <span className="text-gray-600 ml-2">전체 비율</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">프리미엄 회원</p>
                    <p className="text-3xl font-bold text-purple-600">{users.filter(u => u.membership === 'premium').length}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <i className="ri-vip-crown-line text-purple-600 w-6 h-6 flex items-center justify-center"></i>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-purple-600">{Math.round((users.filter(u => u.membership === 'premium').length / users.length) * 100)}%</span>
                  <span className="text-gray-600 ml-2">전체 비율</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">평균 이용액</p>
                    <p className="text-3xl font-bold text-orange-600">{Math.round(users.reduce((sum, u) => sum + u.totalSpent, 0) / users.length).toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <i className="ri-money-dollar-circle-line text-orange-600 w-6 h-6 flex items-center justify-center"></i>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-orange-600">원</span>
                  <span className="text-gray-600 ml-2">회원당</span>
                </div>
              </div>
            </div>

            {/* 검색 및 필터 */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-64">
                  <label className="block text-sm font-medium text-gray-700 mb-2">검색</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="이름 or 이메일로 검색"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 flex items-center justify-center"></i>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">상태</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>
                        {status === 'all' ? '전체' : status === 'active' ? '활성' : '비활성'}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">멤버십</label>
                  <select
                    value={selectedMembership}
                    onChange={(e) => setSelectedMembership(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                  >
                    {memberships.map(membership => (
                      <option key={membership} value={membership}>
                        {membership === 'all' ? '전체' : membership === 'premium' ? '프리미엄' : '베이직'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 회원 목록 */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">회원정보</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">연락처</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">가입일</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">멤버십</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">활동</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">총 이용액</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={user.profileImage}
                              alt={user.name}
                              className="w-10 h-10 rounded-full object-cover object-top mr-3"
                            />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.joinDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getMembershipBadge(user.membership)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">예약 {user.totalReservations}건</div>
                            <div className="text-sm text-gray-500">최근: {user.lastActivity}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {user.totalSpent.toLocaleString()}원
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(user.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setSelectedUser(user)}
                              className="text-blue-600 hover:text-blue-900 cursor-pointer whitespace-nowrap"
                            >
                              상세
                            </button>
                            <button className="text-green-600 hover:text-green-900 cursor-pointer whitespace-nowrap">
                              연락
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>

        {/* 회원 상세 모달 */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">회원 상세 정보</h3>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line w-6 h-6 flex items-center justify-center"></i>
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedUser.profileImage}
                    alt={selectedUser.name}
                    className="w-16 h-16 rounded-full object-cover object-top"
                  />
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900">{selectedUser.name}</h4>
                    <p className="text-gray-600">{selectedUser.email}</p>
                    <div className="flex space-x-2 mt-2">
                      {getStatusBadge(selectedUser.status)}
                      {getMembershipBadge(selectedUser.membership)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">연락처</label>
                    <p className="text-gray-900">{selectedUser.phone}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">가입일</label>
                    <p className="text-gray-900">{selectedUser.joinDate}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">총 예약</label>
                    <p className="text-gray-900 font-semibold">{selectedUser.totalReservations}건</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">총 이용액</label>
                    <p className="text-gray-900 font-semibold">{selectedUser.totalSpent.toLocaleString()}원</p>
                  </div>

                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-700">최근 활동</label>
                    <p className="text-gray-900">{selectedUser.lastActivity}</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
                >
                  닫기
                </button>
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                  연락하기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
