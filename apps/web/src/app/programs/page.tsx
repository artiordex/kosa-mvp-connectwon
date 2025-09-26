'use client';

import { useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

export default function ProgramsPage() {
  const [currentStep, setCurrentStep] = useState(1); // 1: 지점선택, 2: 프로그램 찾기, 3: 프로그램 제안
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userGrade, setUserGrade] = useState('일반');

  const locations = [
    {
      id: 'gangnam',
      name: '강남센터',
      address: '서울시 강남구 테헤란로 217',
      programs: 12,
      image:
        'https://readdy.ai/api/search-image?query=Modern%20business%20district%20building%20in%20Gangnam%20Seoul%2C%20professional%20office%20complex%20with%20glass%20facade%2C%20urban%20skyline%2C%20contemporary%20architecture%2C%20busy%20street%20with%20people&width=400&height=300&seq=gangnam-center&orientation=landscape',
    },
    {
      id: 'mapo',
      name: '마포센터',
      address: '서울시 마포구 홍익로 456',
      programs: 8,
      image:
        'https://readdy.ai/api/search-image?query=Creative%20cultural%20district%20building%20in%20Mapo%20Seoul%2C%20artistic%20neighborhood%20with%20modern%20facilities%2C%20young%20people%20and%20creative%20atmosphere%2C%20contemporary%20design&width=400&height=300&seq=mapo-center&orientation=landscape',
    },
    {
      id: 'gwangmyeong',
      name: '광명센터',
      address: '경기도 광명시 광명로 789',
      programs: 10,
      image:
        'https://readdy.ai/api/search-image?query=Suburban%20modern%20community%20center%20in%20Gwangmyeong%2C%20family-friendly%20facility%20with%20green%20surroundings%2C%20welcoming%20atmosphere%2C%20accessible%20location&width=400&height=300&seq=gwangmyeong-center&orientation=landscape',
    },
  ];

  const handleLocationSelect = (locationId: string) => {
    setSelectedLocation(locationId);
    setCurrentStep(2);
  };

  const handleProgramNotFound = () => {
    if (!isLoggedIn) {
      alert('프로그램 제안하기는 로그인이 필요한 서비스입니다.\n로그인 페이지로 이동하시겠습니까?');
      window.location.href = '/login';
      return;
    }

    if (userGrade === '일반') {
      alert('프로그램 제안하기는 크리에이터 등급부터 이용 가능합니다.\n크리에이터 신청 페이지로 이동하시겠습니까?');
      window.location.href = '/family';
      return;
    }

    setCurrentStep(3);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-20">
        {/* 히어로 섹션 */}
        <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">공간 및 프로그램</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">원하는 지점과 룰을 선택하고 필요한 디바이스까지 한번에 예약하세요</p>
          </div>
        </section>

        {/* 진행 단계 표시 */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center">
              <div className="flex items-center space-x-8">
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    1
                  </div>
                  <span className={`ml-2 font-medium ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-500'}`}>지점 선택</span>
                </div>

                <div className={`w-12 h-px ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>

                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    2
                  </div>
                  <span className={`ml-2 font-medium ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-500'}`}>룰 선택</span>
                </div>

                <div className={`w-12 h-px ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>

                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    3
                  </div>
                  <span className={`ml-2 font-medium ${currentStep >= 3 ? 'text-blue-600' : 'text-gray-500'}`}>시간 선택</span>
                </div>

                <div className={`w-12 h-px ${currentStep >= 4 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>

                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= 4 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    4
                  </div>
                  <span className={`ml-2 font-medium ${currentStep >= 4 ? 'text-blue-600' : 'text-gray-500'}`}>디바이스 선택</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 단계별 콘텐츠 */}
        {currentStep === 1 && <LocationSelectionStep locations={locations} onLocationSelect={handleLocationSelect} />}

        {currentStep === 2 && (
          <ProgramFindSection
            selectedLocation={selectedLocation}
            locations={locations}
            onBackToLocationSelect={() => setCurrentStep(1)}
            onProgramNotFound={handleProgramNotFound}
          />
        )}

        {currentStep === 3 && (
          <ProgramCreateSection selectedLocation={selectedLocation} locations={locations} onBackToProgramFind={() => setCurrentStep(2)} />
        )}
      </main>

      <Footer />
    </div>
  );
}

// 지점 선택 단계
function LocationSelectionStep({ locations, onLocationSelect }: { locations: any[]; onLocationSelect: (locationId: string) => void }) {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">지점을 선택해주세요</h2>
          <p className="text-lg text-gray-600">원하는 지점의 프로그램과 공간을 확인해보세요</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {locations.map(location => (
            <div
              key={location.id}
              onClick={() => onLocationSelect(location.id)}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer group"
            >
              <img
                src={location.image}
                alt={location.name}
                className="w-full h-48 object-cover object-top rounded-t-xl group-hover:scale-105 transition-transform"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{location.name}</h3>
                <p className="text-gray-600 mb-4">{location.address}</p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-medium">{location.programs}개 프로그램</span>
                  <i className="ri-arrow-right-line text-blue-600 group-hover:translate-x-1 transition-transform w-5 h-5 flex items-center justify-center"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 프로그램 찾기 섹션
function ProgramFindSection({
  selectedLocation,
  locations,
  onBackToLocationSelect,
  onProgramNotFound,
}: {
  selectedLocation: string;
  locations: any[];
  onBackToLocationSelect: () => void;
  onProgramNotFound: () => void;
}) {
  const programs = [
    {
      id: 1,
      title: '요가 클래스',
      category: '건강',
      location: '강남센터',
      price: 15000,
      rating: 4.8,
      participants: 8,
      maxParticipants: 12,
      duration: '90분',
      level: '초급',
      instructor: '김요가',
      nextSession: '2024-12-20',
      image:
        'https://readdy.ai/api/search-image?query=Peaceful%20yoga%20class%20with%20instructor%20and%20students%20in%20modern%20studio%2C%20natural%20lighting%2C%20calm%20atmosphere%2C%20people%20in%20comfortable%20yoga%20poses%2C%20minimalist%20clean%20environment%2C%20professional%20photography&width=400&height=300&seq=yoga1&orientation=landscape',
    },
    {
      id: 2,
      title: '디지털 마케팅 기초',
      category: '교육',
      location: '마포센터',
      price: 45000,
      rating: 4.9,
      participants: 15,
      maxParticipants: 20,
      duration: '180분',
      level: '초급',
      instructor: '박마케팅',
      nextSession: '2024-12-22',
      image:
        'https://readdy.ai/api/search-image?query=Modern%20classroom%20with%20digital%20marketing%20training%20session%2C%20laptops%20and%20presentations%2C%20professional%20instructor%20teaching%20diverse%20group%20of%20students%2C%20contemporary%20learning%20environment&width=400&height=300&seq=marketing1&orientation=landscape',
    },
    {
      id: 3,
      title: '도자기 만들기',
      category: '취미',
      location: '광명센터',
      price: 25000,
      rating: 4.7,
      participants: 6,
      maxParticipants: 10,
      duration: '120분',
      level: '초급',
      instructor: '이도예',
      nextSession: '2024-12-21',
      image:
        'https://readdy.ai/api/search-image?query=Pottery%20workshop%20with%20people%20creating%20ceramic%20pieces%2C%20hands%20working%20with%20clay%20on%20pottery%20wheels%2C%20artistic%20studio%20environment%2C%20creative%20and%20inspiring%20atmosphere%2C%20natural%20lighting&width=400&height=300&seq=pottery1&orientation=landscape',
    },
  ];

  const selectedLocationData = locations.find(loc => loc.id === selectedLocation);
  const filteredPrograms = programs.filter(program => program.location === selectedLocationData?.name);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button onClick={onBackToLocationSelect} className="flex items-center text-blue-600 hover:text-blue-700 cursor-pointer mr-4">
              <i className="ri-arrow-left-line mr-2 w-5 h-5 flex items-center justify-center"></i>
              지점 다시 선택
            </button>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{selectedLocationData?.name} 프로그램</h2>
              <p className="text-gray-600">{filteredPrograms.length}개의 프로그램을 찾았어요</p>
            </div>
          </div>

          <button
            onClick={onProgramNotFound}
            className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors cursor-pointer whitespace-nowrap"
          >
            원하는 프로그램이 없나요?
          </button>
        </div>

        {filteredPrograms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map(program => (
              <div key={program.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <img src={program.image} alt={program.title} className="w-full h-48 object-cover object-top rounded-t-xl" />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">{program.category}</span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">{program.level}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{program.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{program.instructor} 강사</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <i className="ri-star-fill text-yellow-400 mr-2 w-4 h-4 flex items-center justify-center"></i>
                      <span>
                        {program.rating} ({program.participants}명 참여)
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <i className="ri-time-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <i className="ri-calendar-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                      <span>다음 수업: {program.nextSession}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-blue-600">{program.price.toLocaleString()}원</span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                      자세히 보기
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <i className="ri-search-line text-6xl text-gray-300 mb-4 w-24 h-24 flex items-center justify-center mx-auto"></i>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{selectedLocationData?.name}에서 진행되는 프로그램이 없습니다</h3>
            <p className="text-gray-600 mb-6">원하는 프로그램을 제안해 보세요! 관리자가 검토 후 프로그램을 개설해 드립니다.</p>
            <button
              onClick={onProgramNotFound}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              프로그램 제안하기
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// 프로그램 만들기 섹션
function ProgramCreateSection() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    description: '',
    duration: '',
    capacity: '',
    price: '',
    level: '',
    requirements: '',
    materials: '',
    schedule: '',
  });

  const [submitStatus, setSubmitStatus] = useState('');

  const categories = ['건강', '교육', '취미', '요리', '언어', '기술', '예술', '기타'];
  const locations = ['강남점', '마포점', '광명점'];
  const levels = ['초급', '중급', '고급', '전체'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');

    // 폼 검증
    const requiredFields = ['title', 'category', 'location', 'description', 'duration', 'capacity'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      setSubmitStatus('error');
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    try {
      // 실제로는 Supabase에 저장하거나 관리자에게 알림을 보냄
      await new Promise(resolve => setTimeout(resolve, 2000)); // 임시 딜레이

      setSubmitStatus('success');

      // 폼 초기화
      setFormData({
        title: '',
        category: '',
        location: '',
        description: '',
        duration: '',
        capacity: '',
        price: '',
        level: '',
        requirements: '',
        materials: '',
        schedule: '',
      });
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">새로운 프로그램 제안하기</h2>
          <p className="text-lg text-gray-600">
            원하는 프로그램이 없나요? 새로운 프로그램을 제안해주세요!
            <br />
            관리자가 검토 후 승인되면 프로그램이 개설됩니다.
          </p>
        </div>

        {submitStatus === 'success' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <i className="ri-check-circle-line text-green-600 mr-3 w-5 h-5 flex items-center justify-center"></i>
              <div>
                <h3 className="text-green-800 font-medium">제안이 성공적으로 전송되었습니다!</h3>
                <p className="text-green-700 text-sm mt-1">관리자가 검토한 후 승인 여부를 알려드리겠습니다. 보통 3-5일 정도 소요됩니다.</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 프로그램명 */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">프로그램명 *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 초보자를 위한 요가 클래스"
                required
              />
            </div>

            {/* 카테고리 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">카테고리 *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                required
              >
                <option value="">선택해주세요</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* 희망 지점 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">희망 지점 *</label>
              <select
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                required
              >
                <option value="">선택해주세요</option>
                {locations.map(location => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* 수업 시간 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">수업 시간 *</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 90분"
                required
              />
            </div>

            {/* 정원 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">정원 *</label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 12"
                min="1"
                required
              />
            </div>

            {/* 희망 가격 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">희망 가격</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="원"
                min="0"
              />
            </div>

            {/* 난이도 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">난이도</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
              >
                <option value="">선택해주세요</option>
                {levels.map(level => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            {/* 프로그램 설명 */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">프로그램 설명 *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="프로그램의 목적, 내용, 기대 효과 등을 자세히 설명해주세요"
                maxLength={500}
                required
              />
              <p className="text-sm text-gray-500 mt-1">{formData.description.length}/500</p>
            </div>

            {/* 준비사항/요구사항 */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">준비사항 및 요구사항</label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="참여자가 준비해야 할 것들이나 필요한 조건이 있다면 적어주세요"
                maxLength={300}
              />
              <p className="text-sm text-gray-500 mt-1">{formData.requirements.length}/300</p>
            </div>

            {/* 필요한 시설/재료 */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">필요한 시설 및 재료</label>
              <textarea
                name="materials"
                value={formData.materials}
                onChange={handleInputChange}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="프로젝터, 음향시설, 요가매트, 재료비 등 필요한 것들을 적어주세요"
                maxLength={300}
              />
              <p className="text-sm text-gray-500 mt-1">{formData.materials.length}/300</p>
            </div>

            {/* 희망 일정 */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">희망 일정</label>
              <textarea
                name="schedule"
                value={formData.schedule}
                onChange={handleInputChange}
                rows={2}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="언제부터 시작하고 싶은지, 주몇회 진행하고 싶은지 등을 적어주세요"
                maxLength={200}
              />
              <p className="text-sm text-gray-500 mt-1">{formData.schedule.length}/200</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              type="submit"
              disabled={submitStatus === 'submitting'}
              className={`px-8 py-3 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                submitStatus === 'submitting' ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {submitStatus === 'submitting' ? '제출 중...' : '프로그램 제안하기'}
            </button>
            <p className="text-sm text-gray-500 mt-3">* 필수 항목을 모두 작성하신 후 제출해주세요</p>
          </div>
        </form>
      </div>
    </section>
  );
}
