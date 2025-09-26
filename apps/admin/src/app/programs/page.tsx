'use client';

import { useState } from 'react';

import AppShell from '../../components/AppShell';
import Header from '../../components/Header';

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
      image:
        'https://readdy.ai/api/search-image?query=Professional%20yoga%20class%20in%20modern%20studio%20with%20natural%20lighting%2C%20people%20practicing%20yoga%20poses%20on%20mats%2C%20peaceful%20atmosphere%20with%20instructor%20demonstrating%20poses%2C%20wellness%20and%20fitness%20environment&width=300&height=200&seq=yoga-class&orientation=landscape',
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
      image:
        'https://readdy.ai/api/search-image?query=Digital%20marketing%20workshop%20with%20laptops%20and%20presentations%2C%20modern%20classroom%20setting%20with%20screens%20showing%20marketing%20analytics%2C%20professional%20learning%20environment%20for%20business%20education&width=300&height=200&seq=marketing-class&orientation=landscape',
    },
    {
      id: 3,
      title: '도자기 만들기',
      instructor: '이도예',
      category: '예술',
      price: 80000,
      duration: 120,
      capacity: 10,
      enrolled: 6,
      status: 'active',
      nextSession: '2024-01-17 18:00',
      rating: 4.9,
      image:
        'https://readdy.ai/api/search-image?query=Pottery%20making%20workshop%20with%20clay%20and%20pottery%20wheels%2C%20artistic%20ceramic%20studio%20with%20handmade%20pottery%20pieces%2C%20creative%20crafts%20class%20with%20instructor%20teaching%20pottery%20techniques&width=300&height=200&seq=pottery-class&orientation=landscape',
    },
    {
      id: 4,
      title: 'AI 프로그래밍 입문',
      instructor: '최개발',
      category: 'IT',
      price: 200000,
      duration: 240,
      capacity: 15,
      enrolled: 12,
      status: 'pending',
      nextSession: '2024-01-20 10:00',
      rating: 4.7,
      image:
        'https://readdy.ai/api/search-image?query=AI%20programming%20course%20with%20computers%20showing%20code%20and%20machine%20learning%20concepts%2C%20modern%20tech%20classroom%20with%20multiple%20monitors%2C%20students%20learning%20artificial%20intelligence%20development&width=300&height=200&seq=ai-programming&orientation=landscape',
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddProgram, setShowAddProgram] = useState(false);

  const categories = ['all', '건강', '비즈니스', '예술', 'IT'];
  const statuses = ['all', 'active', 'pending', 'completed'];

  const filteredPrograms = programs.filter(program => {
    if (selectedCategory !== 'all' && program.category !== selectedCategory) return false;
    if (selectedStatus !== 'all' && program.status !== selectedStatus) return false;
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">진행 중</span>;
      case 'pending':
        return <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">대기 중</span>;
      case 'completed':
        return <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">완료</span>;
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
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">프로그램 관리</h1>
                <p className="text-gray-600">등록된 프로그램을 관리하고 새로운 프로그램을 추가하세요</p>
              </div>
              <button
                onClick={() => setShowAddProgram(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                프로그램 추가
              </button>
            </div>

            {/* 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">총 프로그램</p>
                    <p className="text-3xl font-bold text-blue-600">{programs.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="ri-book-line text-blue-600 w-6 h-6 flex items-center justify-center"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">진행 중</p>
                    <p className="text-3xl font-bold text-green-600">{programs.filter(p => p.status === 'active').length}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <i className="ri-play-circle-line text-green-600 w-6 h-6 flex items-center justify-center"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">총 수강생</p>
                    <p className="text-3xl font-bold text-purple-600">{programs.reduce((sum, p) => sum + p.enrolled, 0)}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <i className="ri-user-line text-purple-600 w-6 h-6 flex items-center justify-center"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">평균 평점</p>
                    <p className="text-3xl font-bold text-orange-600">
                      {(programs.reduce((sum, p) => sum + p.rating, 0) / programs.length).toFixed(1)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <i className="ri-star-line text-orange-600 w-6 h-6 flex items-center justify-center"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* 필터 */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <div className="flex flex-wrap gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
                  <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? '전체' : category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">상태</label>
                  <select
                    value={selectedStatus}
                    onChange={e => setSelectedStatus(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>
                        {status === 'all' ? '전체' : status === 'active' ? '진행 중' : status === 'pending' ? '대기 중' : '완료'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 프로그램 목록 */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredPrograms.map(program => (
                    <div key={program.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start space-x-4">
                        <img src={program.image} alt={program.title} className="w-24 h-24 object-cover object-top rounded-lg" />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{program.title}</h3>
                              <p className="text-gray-600 text-sm">{program.instructor} 강사</p>
                            </div>
                            {getStatusBadge(program.status)}
                          </div>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm text-gray-600">
                              <i className="ri-price-tag-3-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                              <span>{program.price.toLocaleString()}원</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <i className="ri-time-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                              <span>{program.duration}분</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <i className="ri-user-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                              <span>
                                {program.enrolled}/{program.capacity}명
                              </span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <i className="ri-star-fill mr-2 w-4 h-4 flex items-center justify-center text-yellow-500"></i>
                              <span>{program.rating}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">다음 세션: {new Date(program.nextSession).toLocaleString()}</span>
                            <div className="flex space-x-2">
                              <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                                편집
                              </button>
                              <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap">
                                상세
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AppShell>
  );
}
