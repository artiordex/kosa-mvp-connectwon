/**
 * Description : OfflineProgram.tsx - 📌 오프라인 프로그램 관리
 * Author : Shiwoo Min
 * Date : 2025-10-11
 */
'use client';

import { useState } from 'react';
import programData from 'data/programs.json';

type SubTab = 'programs' | 'rooms' | 'schedule';

interface Program {
  id: number;
  title: string;
  category: string;
  venue: string;
  room: string;
  date: string;
  image: string;
  instructor?: string;
  status: string;
  type: string;
}

export default function OfflineProgram() {
  const [subTab, setSubTab] = useState<SubTab>('programs');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');

  // programs.json 불러오기
  const programs: Program[] = (programData as any).programs.filter(
    (p: Program) => p.type === 'offline'
  );

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      workshop: 'bg-purple-50 text-purple-700 border border-purple-200',
      seminar: 'bg-blue-50 text-blue-700 border border-blue-200',
      education: 'bg-green-50 text-green-700 border border-green-200',
      mentoring: 'bg-orange-50 text-orange-700 border border-orange-200',
      competition: 'bg-pink-50 text-pink-700 border border-pink-200',
      conference: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
      networking: 'bg-teal-50 text-teal-700 border border-teal-200'
    };
    return colors[category] || 'bg-gray-50 text-gray-700 border border-gray-200';
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      recruiting: 'bg-green-50 text-green-700',
      ongoing: 'bg-blue-50 text-blue-700',
      closed: 'bg-gray-50 text-gray-700',
      upcoming: 'bg-indigo-50 text-indigo-700'
    };
    return colors[status] || 'bg-gray-50 text-gray-700';
  };

  const filteredPrograms = programs.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.instructor?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesCategory = selectedCategory === '전체' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* 프로그램 탭 */}
      {subTab === 'programs' && (
        <>
          <div className="p-6 border-b flex justify-between items-center">
            <div className="flex gap-2">
              {['전체', 'workshop', 'seminar', 'education', 'mentoring', 'competition'].map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    selectedCategory === c
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {c === '전체'
                    ? '전체'
                    : c === 'workshop'
                    ? '워크샵'
                    : c === 'seminar'
                    ? '세미나'
                    : c === 'education'
                    ? '교육'
                    : c === 'mentoring'
                    ? '멘토링'
                    : '공모전'}
                </button>
              ))}
            </div>

            <div className="relative w-64">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="프로그램명, 강사 검색..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">분류</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">프로그램명</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">지점</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">공간</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">일시</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">강사</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">상태</th>
                  <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase w-28">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredPrograms.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-md text-xs ${getCategoryColor(p.category)}`}>
                        {p.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium">{p.title}</td>
                    <td className="px-6 py-4">{p.venue?.replace('ConnectWon ', '')}</td>
                    <td className="px-6 py-4">{p.room}</td>
                    <td className="px-6 py-4">{p.date}</td>
                    <td className="px-6 py-4">{p.instructor}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(p.status)}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => alert(`수정 페이지로 이동: ${p.title}`)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="수정"
                        >
                          <i className="ri-edit-line text-lg"></i>
                        </button>
                        <button
                          onClick={() => confirm('정말 삭제하시겠습니까?') && alert('삭제 완료')}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="삭제"
                        >
                          <i className="ri-delete-bin-6-line text-lg"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    {/* 공간 탭 / 스케줄 탭은 추후 rooms-by-venue.json, schedules.json 연동 가능 */}
  </div>
  );
}
