/**
 * Description : OnlineProgram.tsx - 📌 온라인 프로그램 관리 (아이콘 수정/삭제 버튼 적용)
 * Author : Shiwoo Min
 * Date : 2025-10-11
 */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import programData from 'data/programs.json';

interface Program {
  id: number;
  title: string;
  category: string;
  date: string;
  image: string;
  status: string;
  type: string;
}

export default function OnlineProgram() {
  const [programs, setPrograms] = useState<Program[]>(
    (programData as any).programs.filter((p: Program) => p.type === 'online')
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      investment: 'bg-purple-50 text-purple-700 border border-purple-200',
      education: 'bg-blue-50 text-blue-700 border border-blue-200',
      competition: 'bg-green-50 text-green-700 border border-green-200',
      mentoring: 'bg-orange-50 text-orange-700 border border-orange-200',
    };
    return colors[category] || 'bg-gray-50 text-gray-700 border border-gray-200';
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      recruiting: 'bg-green-50 text-green-700',
      ongoing: 'bg-blue-50 text-blue-700',
      closed: 'bg-gray-50 text-gray-700',
      upcoming: 'bg-indigo-50 text-indigo-700',
    };
    return colors[status] || 'bg-gray-50 text-gray-700';
  };

  const handleEditProgram = (program: Program) => {
    alert(`수정 페이지로 이동: ${program.title}`);
    // ex) router.push(`/programs/online/${program.id}/edit`)
  };

  const handleDeleteProgram = (id: number) => {
    if (confirm('정말 이 프로그램을 삭제하시겠습니까?')) {
      setPrograms((prev) => prev.filter((p) => p.id !== id));
      alert('프로그램이 삭제되었습니다.');
    }
  };

  const filteredPrograms = programs.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === '전체' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* 필터 및 검색 */}
      <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-wrap gap-2">
          {['전체', 'investment', 'education', 'competition', 'mentoring'].map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                selectedCategory === c
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {c === '전체'
                ? '전체'
                : c === 'investment'
                ? '투자'
                : c === 'education'
                ? '교육'
                : c === 'competition'
                ? '공모전'
                : '멘토링'}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-80">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input
            type="text"
            placeholder="프로그램 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">분류</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">제목</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">기간</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">상태</th>
              <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase w-28">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredPrograms.length > 0 ? (
              filteredPrograms.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-md text-xs font-medium ${getCategoryColor(
                        p.category
                      )}`}
                    >
                      {p.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{p.title}</td>
                  <td className="px-6 py-4 text-gray-700">{p.date}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        p.status
                      )}`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEditProgram(p)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="수정"
                      >
                        <i className="ri-edit-line text-lg"></i>
                      </button>
                      <button
                        onClick={() => handleDeleteProgram(p.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="삭제"
                      >
                        <i className="ri-delete-bin-6-line text-lg"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-12 text-gray-500">
                  <i className="ri-inbox-line text-4xl text-gray-300 mb-2 block" />
                  검색 결과가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
