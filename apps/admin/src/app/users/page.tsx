'use client';

import { useState } from 'react';

export interface UserType {
  id: number;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  status: 'active' | 'inactive';
  membership: 'basic' | 'premium';
  totalReservations: number;
  totalSpent: number;
  lastActivity: string;
  profileImage: string;
}

export default function UserSettings() {
  const [users] = useState<UserType[]>([
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
      profileImage: 'https://placehold.co/100x100',
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
      profileImage: 'https://placehold.co/100x100',
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">회원 관리</h1>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">회원정보</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">연락처</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">가입일</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">멤버십</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">총 이용액</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap flex items-center">
                  <img src={user.profileImage} alt={user.name} className="w-10 h-10 rounded-full object-cover mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.joinDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.membership === 'premium' ? '프리미엄' : '베이직'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.totalSpent.toLocaleString()}원</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
