
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function EquipmentSpaceSection() {
  const [activeTab, setActiveTab] = useState('spaces');

  const centers = [
    {
      id: 'gangnam',
      name: '강남센터',
      location: '서울 강남구',
      address: '서울특별시 강남구 테헤란로 123',
      capacity: '2,685㎡',
      rooms: '독립공간 22실',
      image: 'https://readdy.ai/api/search-image?query=modern%20office%20building%20exterior%20in%20Gangnam%20Seoul%2C%20glass%20facade%20with%20clean%20architectural%20design%2C%20urban%20business%20district%20atmosphere%2C%20professional%20corporate%20environment%2C%20contemporary%20commercial%20building&width=400&height=300&seq=gangnam-center-001&orientation=landscape',
      features: ['대회의실 A (20명)', '대회의실 B (15명)', '소회의실 1-4 (6-8명)', '오픈 라운지', '교육실 (30명)'],
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 'mapo',
      name: '마포센터',
      location: '서울 마포구',
      address: '서울특별시 마포구 홍익로 456',
      capacity: '1,850㎡',
      rooms: '독립공간 16실',
      image: 'https://readdy.ai/api/search-image?query=contemporary%20office%20building%20in%20Mapo%20Seoul%20near%20Han%20river%2C%20modern%20glass%20architecture%2C%20startup%20friendly%20workspace%20environment%2C%20creative%20district%20atmosphere%2C%20innovative%20business%20center&width=400&height=300&seq=mapo-center-002&orientation=landscape',
      features: ['대회의실 (18명)', '중회의실 1-2 (12-15명)', '소회의실 1-3 (6-8명)', '라운지', '교육실 (25명)'],
      color: 'bg-green-50 border-green-200'
    },
    {
      id: 'gwangmyeong',
      name: '광명센터',
      location: '경기 광명시',
      address: '경기도 광명시 광명로 789',
      capacity: '1,200㎡',
      rooms: '독립공간 12실',
      image: 'https://readdy.ai/api/search-image?query=modern%20business%20complex%20in%20Gwangmyeong%20city%2C%20contemporary%20office%20building%20with%20green%20surroundings%2C%20suburban%20business%20center%2C%20innovative%20workspace%20architecture%2C%20clean%20corporate%20environment&width=400&height=300&seq=gwangmyeong-center-003&orientation=landscape',
      features: ['회의실 A (15명)', '회의실 B (12명)', '소회의실 1-2 (6-8명)', '라운지', '교육실 (20명)'],
      color: 'bg-purple-50 border-purple-200'
    }
  ];

  const devices = [
    {
      id: 1,
      name: '빔 프로젝터',
      icon: 'ri-slideshow-line',
      image: 'https://readdy.ai/api/search-image?query=modern%20high-resolution%20beam%20projector%20in%20professional%20setting%2C%20clean%20white%20background%2C%20business%20presentation%20equipment%2C%20sleek%20design&width=300&height=200&seq=proj-001&orientation=landscape',
      specs: ['4K 해상도', '3000 루멘', '무선 연결'],
      availability: '5대 보유',
      rental: '무료 제공'
    },
    {
      id: 2,
      name: '노트북 (업무용)',
      icon: 'ri-computer-line',
      image: 'https://readdy.ai/api/search-image?query=modern%20business%20laptop%20computer%20open%20on%20clean%20desk%2C%20professional%20workspace%2C%20sleek%20design%2C%20productivity%20equipment&width=300&height=200&seq=laptop-002&orientation=landscape',
      specs: ['Intel i7', '16GB RAM', '512GB SSD'],
      availability: '10대 보유',
      rental: '시간당 3,000원'
    },
    {
      id: 3,
      name: '태블릿',
      icon: 'ri-tablet-line',
      image: 'https://readdy.ai/api/search-image?query=modern%20tablet%20device%20on%20desk%20with%20stylus%2C%20digital%20workspace%2C%20clean%20design%2C%20mobile%20productivity%20tool&width=300&height=200&seq=tablet-003&orientation=landscape',
      specs: ['10인치', '터치스크린', '스타일러스 포함'],
      availability: '8대 보유',
      rental: '시간당 2,000원'
    },
    {
      id: 4,
      name: '프린터 (컬러)',
      icon: 'ri-printer-line',
      image: 'https://readdy.ai/api/search-image?query=modern%20color%20printer%20in%20office%20environment%2C%20professional%20printing%20equipment%2C%20clean%20white%20background%2C%20business%20technology&width=300&height=200&seq=printer-004&orientation=landscape',
      specs: ['A4/A3 지원', '양면 인쇄', '컬러/흑백'],
      availability: '3대 보유',
      rental: '무료 제공'
    },
    {
      id: 5,
      name: '카메라 (촬영용)',
      icon: 'ri-camera-line',
      image: 'https://readdy.ai/api/search-image?query=professional%20digital%20camera%20with%20lens%20on%20tripod%2C%20video%20recording%20equipment%2C%20clean%20studio%20background%2C%20content%20creation%20tools&width=300&height=200&seq=camera-005&orientation=landscape',
      specs: ['4K 영상', '삼각대 포함', '무선 마이크'],
      availability: '2대 보유',
      rental: '시간당 5,000원'
    },
    {
      id: 6,
      name: '음향 장비',
      icon: 'ri-mic-line',
      image: 'https://readdy.ai/api/search-image?query=professional%20audio%20equipment%20setup%20with%20microphones%20and%20speakers%2C%20sound%20system%20for%20presentations%2C%20clean%20modern%20design&width=300&height=200&seq=audio-006&orientation=landscape',
      specs: ['무선 마이크', '스피커', '믹서'],
      availability: '완비',
      rental: '무료 제공'
    }
  ];

  const tabItems = [
    { key: 'spaces', label: '장소 대여', icon: 'ri-building-line' },
    { key: 'devices', label: '디바이스 대여', icon: 'ri-tools-line' }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            공간 및 디바이스
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            최신 장비와 다양한 공간을 통해 여러분의 아이디어를 현실로 만들어보세요
          </p>
        </div>

        {/* 탭 메뉴 */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 rounded-full p-1 inline-flex">
            {tabItems.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center space-x-2 px-8 py-3 rounded-full transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <i className={`${tab.icon} w-5 h-5 flex items-center justify-center`}></i>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 장소 대여 탭 */}
        {activeTab === 'spaces' && (
          <div className="space-y-12">
            {/* 지점별 공간 안내 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {centers.map((center) => (
                <div
                  key={center.id}
                  className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border-2 ${center.color}`}
                >
                  <div className="relative">
                    <img
                      src={center.image}
                      alt={center.name}
                      className="w-full h-48 object-cover object-top"
                    />
                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {center.capacity}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <i className="ri-building-line text-blue-600 text-xl w-5 h-5 flex items-center justify-center"></i>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{center.name}</h3>
                        <p className="text-sm text-gray-600">{center.location}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 text-sm">
                      {center.address}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-700">
                        <i className="ri-home-office-line text-blue-500 mr-2 w-4 h-4 flex items-center justify-center"></i>
                        {center.rooms}
                      </div>
                      {center.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-700">
                          <i className="ri-check-line text-green-500 mr-2 w-4 h-4 flex items-center justify-center"></i>
                          {feature}
                        </div>
                      ))}
                      {center.features.length > 3 && (
                        <div className="text-sm text-gray-500">
                          +{center.features.length - 3}개 추가 공간
                        </div>
                      )}
                    </div>
                    
                    <Link
                      href="/rooms"
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block text-center cursor-pointer whitespace-nowrap"
                    >
                      공간 예약하기
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* 공간 이용 안내 */}
            <div className="bg-blue-50 rounded-2xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">공간 이용 안내</h3>
                <p className="text-gray-600">커넥트원의 다양한 공간을 안전하고 효율적으로 이용하실 수 있도록 안내해드립니다</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-calendar-check-line text-blue-600 text-2xl w-8 h-8 flex items-center justify-center"></i>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">무료 예약</h4>
                  <p className="text-gray-600 text-sm">모든 공간은 무료로 예약하여 이용하실 수 있습니다</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-time-line text-green-600 text-2xl w-8 h-8 flex items-center justify-center"></i>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">연중무휴 운영</h4>
                  <p className="text-gray-600 text-sm">모든 센터는 연중무휴로 운영되어 언제든 이용 가능합니다</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-shield-check-line text-purple-600 text-2xl w-8 h-8 flex items-center justify-center"></i>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">완벽한 시설</h4>
                  <p className="text-gray-600 text-sm">최신 장비와 편의시설이 완비된 쾌적한 공간을 제공합니다</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 디바이스 대여 탭 */}
        {activeTab === 'devices' && (
          <div className="space-y-12">
            {/* 디바이스 목록 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {devices.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover object-top"
                    />
                    <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {item.availability}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                        <i className={`${item.icon} text-green-600 text-xl w-5 h-5 flex items-center justify-center`}></i>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {item.specs.map((spec, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-700">
                          <i className="ri-settings-3-line text-blue-500 mr-2 w-4 h-4 flex items-center justify-center"></i>
                          {spec}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-600">대여료</span>
                      <span className={`font-bold ${item.rental === '무료 제공' ? 'text-green-600' : 'text-blue-600'}`}>
                        {item.rental}
                      </span>
                    </div>
                    
                    <Link
                      href="/devices"
                      className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors inline-block text-center cursor-pointer whitespace-nowrap"
                    >
                      디바이스 대여 신청
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* 디바이스 이용 안내 */}
            <div className="bg-green-50 rounded-2xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">디바이스 대여 안내</h3>
                <p className="text-gray-600">최신 ICT 장비를 통해 여러분의 프로젝트와 업무를 지원해드립니다</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-money-dollar-circle-line text-green-600 text-2xl w-8 h-8 flex items-center justify-center"></i>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">합리적 가격</h4>
                  <p className="text-gray-600 text-sm">일부 장비는 무료 제공하고, 유료 장비도 합리적인 가격으로 대여 가능합니다</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-tools-line text-blue-600 text-2xl w-8 h-8 flex items-center justify-center"></i>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">최신 장비</h4>
                  <p className="text-gray-600 text-sm">항상 최신 사양의 장비를 유지하여 최고의 성능을 제공합니다</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-customer-service-line text-purple-600 text-2xl w-8 h-8 flex items-center justify-center"></i>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">전문 지원</h4>
                  <p className="text-gray-600 text-sm">장비 사용법과 기술적 문제에 대한 전문적인 지원을 제공합니다</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
