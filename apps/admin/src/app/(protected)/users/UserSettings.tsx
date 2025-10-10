'use client';

import { useState } from 'react';

// 비트 플래그 (role_flags)
export const ROLE_FLAGS = {
  USER: 1 << 0, // 1
  CREATOR: 1 << 1, // 2
  ADMIN: 1 << 2, // 4
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
  roleFlags: number; // INT로 관리
}

export default function UserSettings() {
  const [users, setUsers] = useState<UserType[]>([
    {
      id: 1,
      name: '김회원',
      email: 'kim@example.com',
      phone: '010-1234-5678',
      joinDate: '2024-01-05',
      lastActivity: '2024-01-14',
      profileImage: 'https://placehold.co/100x100',
      status: 'active',
      roleFlags: ROLE_FLAGS.ADMIN, // 관리자
    },
    {
      id: 2,
      name: '이회원',
      email: 'lee@example.com',
      phone: '010-2345-6789',
      joinDate: '2023-12-15',
      lastActivity: '2024-01-13',
      profileImage: 'https://placehold.co/100x100',
      status: 'active',
      roleFlags: ROLE_FLAGS.CREATOR, // Creator
    },
  ]);

  // 역할 플래그 → 문자열
  const getRoleLabel = (flags: number) => {
    if (flags & ROLE_FLAGS.ADMIN) return '관리자';
    if (flags & ROLE_FLAGS.CREATOR) return 'Creator';
    return '일반 회원';
  };

  // 역할 수정 핸들러
  const handleRoleChange = (id: number, newRole: number) => {
    setUsers(prev => prev.map(user => (user.id === id ? { ...user, roleFlags: newRole } : user)));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">회원 관리</h1>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">회원정보</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">연락처</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">가입일</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">마지막 활동</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">역할</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                {/* 프로필 */}
                <td className="px-6 py-4 flex items-center">
                  <img src={user.profileImage} alt={user.name} className="w-10 h-10 rounded-full object-cover mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </td>

                {/* 연락처 */}
                <td className="px-6 py-4 text-sm">{user.phone}</td>

                {/* 가입일 */}
                <td className="px-6 py-4 text-sm">{user.joinDate}</td>

                {/* 마지막 활동 */}
                <td className="px-6 py-4 text-sm">{user.lastActivity}</td>

                {/* 역할 (수정 가능) */}
                <td className="px-6 py-4">
                  <select
                    value={user.roleFlags}
                    onChange={e => handleRoleChange(user.id, Number(e.target.value))}
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                  >
                    <option value={ROLE_FLAGS.USER}>일반 회원</option>
                    <option value={ROLE_FLAGS.CREATOR}>Creator</option>
                    <option value={ROLE_FLAGS.ADMIN}>관리자</option>
                  </select>
                  <div className="text-xs text-gray-500 mt-1">{getRoleLabel(user.roleFlags)}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
