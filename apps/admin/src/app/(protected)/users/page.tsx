/**
 * Description : page.tsx - 📌 ConnectWon 유저 관리 페이지
 * Author : Shiwoo Min
 * Date : 2025-10-11
 */
'use client';

import { useState } from 'react';
import Image from 'next/image';
import usersData from 'data/users.json';

// 역할 플래그
const ROLE_FLAGS = {
  USER: 1 << 0, // 1 - 일반 유저
  CREATOR: 1 << 1, // 2 - Creator
  ADMIN: 1 << 2, // 4 - 관리자
};

export interface UserType {
  id: number;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  lastActivity: string;
  profileImage: string;
  status: 'active' | 'inactive';
  roleFlags: number;
  totalReservations: number;
  totalSpent: number;
  loginType: 'normal' | 'google' | 'naver' | 'kakao';
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<UserType[]>(usersData.users as UserType[]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | number>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // 역할 플래그 → 문자열
  const getRoleLabel = (flags: number) => {
    if (flags & ROLE_FLAGS.ADMIN) return '관리자';
    if (flags & ROLE_FLAGS.CREATOR) return '크리에이터';
    return '패밀리';
  };

  // 역할 플래그 → 색상
  const getRoleBadgeColor = (flags: number) => {
    if (flags & ROLE_FLAGS.ADMIN) return 'bg-purple-100 text-purple-700';
    if (flags & ROLE_FLAGS.CREATOR) return 'bg-blue-100 text-blue-700';
    return 'bg-gray-100 text-gray-700';
  };

  // 상태 배지
  const getStatusBadge = (status: string) => {
    return status === 'active'
      ? { label: '활성', color: 'bg-green-100 text-green-700' }
      : { label: '비활성', color: 'bg-gray-100 text-gray-700' };
  };

  // 로그인 타입 아이콘
  const getLoginTypeIcon = (loginType: string) => {
    switch (loginType) {
      case 'google':
        return <i className="ri-google-fill text-red-500" title="Google"></i>;
      case 'naver':
        return <i className="ri-naver-fill text-green-500" title="Naver"></i>;
      case 'kakao':
        return <i className="ri-kakao-talk-fill text-yellow-500" title="Kakao"></i>;
      case 'normal':
        return <i className="ri-mail-line text-gray-500" title="일반로그인"></i>;
      default:
        return null;
    }
  };

  // 필터링된 유저 목록
  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);

    const matchesRole = filterRole === 'all' || user.roleFlags === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // 페이지 변경 시 처리
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 필터 변경 시 첫 페이지로 이동
  const handleFilterChange = (callback: () => void) => {
    callback();
    setCurrentPage(1);
  };

  // 유저 수정 모달 열기
  const handleEditUser = (user: UserType) => {
    setEditingUser({ ...user });
    setShowEditModal(true);
  };

  // 유저 정보 저장
  const handleSaveUser = () => {
    if (editingUser) {
      setUsers(prev => prev.map(u => u.id === editingUser.id ? editingUser : u));
      setShowEditModal(false);
      setEditingUser(null);
      alert('유저 정보가 수정되었습니다');
    }
  };

  // 유저 삭제
  const handleDeleteUser = (id: number) => {
    if (confirm('정말로 이 유저를 삭제하시겠습니까?')) {
      setUsers(prev => prev.filter(u => u.id !== id));
      alert('유저가 삭제되었습니다');
    }
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">유저 관리</h1>
          <p className="text-gray-600 mt-1">전체 {filteredUsers.length}명의 유저 (총 {users.length}명)</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
          <i className="ri-add-line mr-2"></i>
          새 유저 추가
        </button>
      </div>

      {/* 필터 & 검색 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* 검색 */}
          <div className="md:col-span-2">
            <div className="relative">
              <input
                type="text"
                placeholder="이름, 이메일, 전화번호로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          {/* 역할 필터 */}
          <div>
            <select
              value={filterRole}
              onChange={(e) => handleFilterChange(() => setFilterRole(e.target.value === 'all' ? 'all' : Number(e.target.value)))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">전체 역할</option>
              <option value={ROLE_FLAGS.USER}>패밀리</option>
              <option value={ROLE_FLAGS.CREATOR}>크리에이터</option>
              <option value={ROLE_FLAGS.ADMIN}>관리자</option>
            </select>
          </div>

          {/* 상태 필터 */}
          <div>
            <select
              value={filterStatus}
              onChange={(e) => handleFilterChange(() => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive'))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">전체 상태</option>
              <option value="active">활성</option>
              <option value="inactive">비활성</option>
            </select>
          </div>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">전체 유저</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{users.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-user-line text-blue-600 text-2xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">활성 유저</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-user-check-line text-green-600 text-2xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Creator</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {users.filter(u => u.roleFlags === ROLE_FLAGS.CREATOR).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-star-line text-blue-600 text-2xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">관리자</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">
                {users.filter(u => u.roleFlags === ROLE_FLAGS.ADMIN).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="ri-shield-user-line text-purple-600 text-2xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* 유저 테이블 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">유저 정보</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SSO</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">연락처</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">역할</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">상태</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">가입일</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">예약/이용액</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentUsers.map((user) => {
                const statusBadge = getStatusBadge(user.status);
                return (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="relative w-10 h-10 mr-3">
                          <Image
                            src={user.profileImage}
                            alt={user.name}
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center text-xl">
                        {getLoginTypeIcon(user.loginType)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.phone}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleBadgeColor(user.roleFlags)}`}>
                        {getRoleLabel(user.roleFlags)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusBadge.color}`}>
                        {statusBadge.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.joinDate}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{user.totalReservations}건</div>
                      <div className="text-xs text-gray-500">₩{user.totalSpent.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="수정"
                        >
                          <i className="ri-edit-line"></i>
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="삭제"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 결과 없음 */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <i className="ri-user-search-line text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-500">검색 결과가 없습니다</p>
          </div>
        )}

        {/* 페이지네이션 */}
        {filteredUsers.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* 페이지당 항목 수 선택 */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">페이지당</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={5}>5개</option>
                  <option value={10}>10개</option>
                  <option value={20}>20개</option>
                  <option value={50}>50개</option>
                </select>
                <span className="text-sm text-gray-700">
                  (전체 {filteredUsers.length}개 중 {startIndex + 1}-{Math.min(endIndex, filteredUsers.length)}개)
                </span>
              </div>

              {/* 페이지 버튼 */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className="ri-skip-back-mini-line"></i>
                </button>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  이전
                </button>

                {/* 페이지 번호 */}
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-1 rounded-lg ${
                          currentPage === pageNum
                            ? 'bg-blue-600 text-white'
                            : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  다음
                </button>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className="ri-skip-forward-mini-line"></i>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 수정 모달 */}
      {showEditModal && editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">유저 정보 수정</h2>
            </div>

            <div className="p-6 space-y-4">
              {/* 이름 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* 이메일 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* 전화번호 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">전화번호</label>
                <input
                  type="tel"
                  value={editingUser.phone}
                  onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* 역할 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">역할</label>
                <select
                  value={editingUser.roleFlags}
                  onChange={(e) => setEditingUser({ ...editingUser, roleFlags: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={ROLE_FLAGS.USER}>일반 유저</option>
                  <option value={ROLE_FLAGS.CREATOR}>Creator</option>
                  <option value={ROLE_FLAGS.ADMIN}>관리자</option>
                </select>
              </div>

              {/* 상태 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">상태</label>
                <select
                  value={editingUser.status}
                  onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value as 'active' | 'inactive' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">활성</option>
                  <option value="inactive">비활성</option>
                </select>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingUser(null);
                }}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
              >
                취소
              </button>
              <button
                onClick={handleSaveUser}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
