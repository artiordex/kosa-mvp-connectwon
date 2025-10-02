'use client';

import { useState } from 'react';

export default function AdminPrograms() {
  const [programs] = useState([
    {
      id: 1,
      title: '요가 클래스',
      instructor: '김요가',
      category: '건강',
      price: 25000,
      duration: 90,
      capacity: 12,
      enrolled: 8,
      status: 'active',
      nextSession: '2024-01-15 14:00',
      rating: 4.8,
      image: '/images/sample/yoga.jpg',
    },
    {
      id: 2,
      title: '디지털 마케팅 기초',
      instructor: '박마케팅',
      category: '비즈니스',
      price: 150000,
      duration: 180,
      capacity: 20,
      enrolled: 15,
      status: 'active',
      nextSession: '2024-01-16 16:00',
      rating: 4.6,
      image: '/images/sample/marketing.jpg',
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const categories = ['all', '건강', '비즈니스', '예술', 'IT'];
  const statuses = ['all', 'active', 'pending', 'completed'];

  const filteredPrograms = programs.filter(program => {
    if (selectedCategory !== 'all' && program.category !== selectedCategory) return false;
    if (selectedStatus !== 'all' && program.status !== selectedStatus) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">프로그램 관리</h1>
              <p className="text-gray-600">등록된 프로그램을 관리하고 새로운 프로그램을 추가하세요</p>
            </div>
            <a
              href="programs/add"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              프로그램 추가
            </a>
          </div>

          {/* 프로그램 목록 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPrograms.map(program => (
              <div key={program.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-start space-x-4">
                  <img src={program.image} alt={program.title} className="w-24 h-24 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{program.title}</h3>
                    <p className="text-sm text-gray-600">{program.instructor} 강사</p>
                    <p className="text-xs text-gray-400">{program.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
