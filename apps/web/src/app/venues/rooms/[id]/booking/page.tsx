'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Footer from '../../../../../components/Footer';
import Header from '../../../../../components/Header';
import TermsModal from '../../../../../components/TermsModal';

function BookingForm() {
  const searchParams = useSearchParams();
  const date = searchParams.get('date');
  const time = searchParams.get('time');
  const duration = parseInt(searchParams.get('duration') || '2');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    purpose: '',
    expectedParticipants: 1,
    additionalRequests: '',
    agreeTerms: false
  });

  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [termsModalType, setTermsModalType] = useState<'terms' | 'privacy'>('terms');

  const availableEquipment = [
    {
      id: 'printer',
      name: '프린터',
      icon: 'ri-printer-line',
      description: 'A4 컬러/흑백 인쇄 가능',
      cost: 0,
      costNote: '무료 (용지 제공)'
    },
    {
      id: 'coffee-machine',
      name: '커피머신',
      icon: 'ri-cup-line',
      description: '원두커피, 아메리카노 제조',
      cost: 5000,
      costNote: '5,000원 (원두 포함)'
    },
    {
      id: 'beam-projector',
      name: '빔 프로젝트',
      icon: 'ri-slideshow-line',
      description: 'Full HD 화질, HDMI 연결',
      cost: 0,
      costNote: '무료 (기본 제공)'
    },
    {
      id: 'computer',
      name: '컴퓨터',
      icon: 'ri-computer-line',
      description: 'Windows 11, Office 설치',
      cost: 3000,
      costNote: '3,000원/시간'
    },
    {
      id: 'microphone',
      name: '마이크',
      icon: 'ri-mic-line',
      description: '무선 핸드마이크 2개',
      cost: 0,
      costNote: '무료'
    },
    {
      id: 'flip-chart',
      name: '플립차트',
      icon: 'ri-sticky-note-line',
      description: '이젤 스탠드 + 차트지',
      cost: 2000,
      costNote: '2,000원 (차트지 포함)'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEquipmentChange = (equipmentId: string) => {
    setSelectedEquipment(prev => {
      if (prev.includes(equipmentId)) {
        return prev.filter(id => id !== equipmentId);
      } else {
        return [...prev, equipmentId];
      }
    });
  };

  const calculateEquipmentCost = () => {
    return selectedEquipment.reduce((total, equipmentId) => {
      const equipment = availableEquipment.find(eq => eq.id === equipmentId);
      if (!equipment) return total;

      if (equipmentId === 'computer') {
        return total + (equipment.cost * duration);
      }
      return total + equipment.cost;
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeTerms) {
      alert('이용약관에 동의해주세요.');
      return;
    }
    if (!formData.purpose.trim()) {
      alert('사용 목적을 입력해주세요.');
      return;
    }

    const equipmentCost = calculateEquipmentCost();
    console.log('룸 예약 신청:', {
      ...formData,
      date,
      time,
      duration,
      roomId: room.id,
      selectedEquipment,
      equipmentCost
    });

    if (equipmentCost > 0) {
      alert(`룸 예약 신청이 완료되었습니다.\n기기 대여 비용: ${equipmentCost.toLocaleString()}원\n승인 결과는 이메일로 알려드리겠습니다.`);
    } else {
      alert('룸 예약 신청이 완료되었습니다. 승인 결과는 이메일로 알려드리겠습니다.');
    }

    window.location.href = '/rooms';
  };

  const handleTermsClick = (type: 'terms' | 'privacy') => {
    setTermsModalType(type);
    setIsTermsModalOpen(true);
  };

  const room = {
    id: 1,
    name: 'A홀',
    location: '강남지점',
    address: '서울특별시 강남구 테헤란로 123, 2층',
    capacity: 20,
    facilities: ['프로젝터', '음향시설', '화이트보드', '에어컨', '주차 가능'],
    image: "https://readdy.ai/api/search-image?query=Modern%20spacious%20conference%20room%20with%20projector%20and%20whiteboard%2C%20professional%20meeting%20space%20with%20comfortable%20seating%20arrangement%2C%20bright%20natural%20lighting%2C%20clean%20contemporary%20design%20for%20business%20meetings&width=400&height=300&seq=room-booking-detail&orientation=landscape"
  };

  const equipmentCost = calculateEquipmentCost();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">룸 예약 신청</h1>
            <p className="text-gray-600">예약 정보를 입력하고 사용 목적을 제출해주세요</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 예약 정보 입력 */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 신청자 정보 */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">신청자 정보</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        이름 *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="이름을 입력하세요"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        이메일 *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="이메일을 입력하세요"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        휴대폰 번호 *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="휴대폰 번호를 입력하세요"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        소속 기관/단체
                      </label>
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="소속을 입력하세요 (선택사항)"
                      />
                    </div>
                  </div>
                </div>

                {/* 사용 정보 */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">사용 정보</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        예상 참여 인원 *
                      </label>
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, expectedParticipants: Math.max(1, prev.expectedParticipants - 1) }))}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 cursor-pointer"
                        >
                          <i className="ri-subtract-line w-4 h-4 flex items-center justify-center"></i>
                        </button>
                        <span className="w-12 text-center font-medium">{formData.expectedParticipants}명</span>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, expectedParticipants: Math.min(room.capacity, prev.expectedParticipants + 1) }))}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 cursor-pointer"
                        >
                          <i className="ri-add-line w-4 h-4 flex items-center justify-center"></i>
                        </button>
                        <span className="text-sm text-gray-500">(최대 {room.capacity}명)</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        사용 목적 *
                      </label>
                      <textarea
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                        placeholder="룸을 사용하는 목적을 상세히 작성해주세요 (예: 스터디 모임, 팀 프로젝트 회의, 워크샵 진행 등)"
                        required
                        maxLength={500}
                      />
                      <p className="text-xs text-gray-500 mt-1">{formData.purpose.length}/500</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        추가 요청사항
                      </label>
                      <textarea
                        name="additionalRequests"
                        value={formData.additionalRequests}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                        placeholder="특별한 요청사항이 있으시면 입력해주세요"
                        maxLength={300}
                      />
                      <p className="text-xs text-gray-500 mt-1">{formData.additionalRequests.length}/300</p>
                    </div>
                  </div>
                </div>

                {/* 기기 대여 선택 */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">기기 대여 (선택사항)</h2>
                  <p className="text-sm text-gray-600 mb-6">필요한 기기를 선택하시면 예약과 함께 준비해드립니다</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {availableEquipment.map((equipment) => (
                      <div key={equipment.id} className="relative">
                        <label className="flex items-start p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                          <input
                            type="checkbox"
                            checked={selectedEquipment.includes(equipment.id)}
                            onChange={() => handleEquipmentChange(equipment.id)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                          />
                          <div className="ml-3 flex-1">
                            <div className="flex items-center mb-2">
                              <i className={`${equipment.icon} mr-2 w-5 h-5 flex items-center justify-center text-blue-600`}></i>
                              <span className="font-medium text-gray-900">{equipment.name}</span>
                              {equipment.cost > 0 && (
                                <span className="ml-auto text-sm font-medium text-blue-600">
                                  {equipment.id === 'computer' ? `${equipment.cost.toLocaleString()}원/시간` : `${equipment.cost.toLocaleString()}원`}
                                </span>
                              )}
                              {equipment.cost === 0 && (
                                <span className="ml-auto text-sm font-medium text-green-600">무료</span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{equipment.description}</p>
                            <p className="text-xs text-gray-500 mt-1">{equipment.costNote}</p>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>

                  {selectedEquipment.length > 0 && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">선택된 기기</h4>
                      <div className="space-y-2">
                        {selectedEquipment.map(equipmentId => {
                          const equipment = availableEquipment.find(eq => eq.id === equipmentId);
                          if (!equipment) return null;

                          const cost = equipment.id === 'computer' ? equipment.cost * duration : equipment.cost;

                          return (
                            <div key={equipmentId} className="flex items-center justify-between text-sm text-blue-800">
                              <span>• {equipment.name}</span>
                              <span className="font-medium">
                                {cost === 0 ? '무료' : `${cost.toLocaleString()}원`}
                              </span>
                            </div>
                          );
                        })}
                        {equipmentCost > 0 && (
                          <div className="border-t border-blue-200 pt-2 mt-2">
                            <div className="flex items-center justify-between font-semibold text-blue-900">
                              <span>기기 대여 총 비용</span>
                              <span>{equipmentCost.toLocaleString()}원</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium text-yellow-900 mb-2">기기 이용 안내</h4>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      <li>• 기기는 예약 승인 후 이용 가능 여부를 확인해드립니다</li>
                      <li>• 기기 손상 시 실비 변상해야 합니다</li>
                      <li>• 사용법은 현장에서 안내드립니다</li>
                      <li>• 추가 비용은 현장에서 결제 가능합니다</li>
                    </ul>
                  </div>
                </div>

                {/* 약관 동의 */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">약관 동의</h2>
                  <div className="space-y-3">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                        required
                      />
                      <div className="ml-3">
                        <span className="text-sm text-gray-700">
                          <span className="text-red-5">* </span>룸 이용 약관 및 개인정보 처리방침에 동의합니다
                        </span>
                        <div className="flex space-x-2 mt-1">
                          <button
                            type="button"
                            onClick={() => handleTermsClick('terms')}
                            className="text-blue-600 hover:underline text-sm cursor-pointer"
                          >
                            이용약관
                          </button>
                          <span className="text-gray-400 text-sm">|</span>
                          <button
                            type="button"
                            onClick={() => handleTermsClick('privacy')}
                            className="text-blue-600 hover:underline text-sm cursor-pointer"
                          >
                            개인정보처리방침
                          </button>
                        </div>
                      </div>
                    </label>
                  </div>

                  <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium text-yellow-900 mb-2">룸 이용 수칙</h4>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      <li>• 예약 승인 후 이용 가능이며, 승인 결과는 이메일로 안내됩니다</li>
                      <li>• 시설물 파손 시 배상 책임이 있습니다</li>
                      <li>• 소음 및 타인에게 피해를 주는 행위는 금지됩니다</li>
                      <li>• 예약 시간을 초과하여 사용할 수 없습니다</li>
                      <li>• 사용 후 정리정돈은 필수입니다</li>
                    </ul>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  예약 신청하기
                </button>
              </form>
            </div>

            {/* 예약 요약 */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-sm sticky top-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">예약 정보</h2>

                <div className="mb-4">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-32 object-cover object-top rounded-lg"
                  />
                </div>

                <div className="space-y-3 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">{room.name}</h3>

                  <div className="flex items-center text-gray-600">
                    <i className="ri-building-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                    <span className="text-sm">{room.location}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <i className="ri-calendar-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                    <span className="text-sm">{date}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <i className="ri-time-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                    <span className="text-sm">{time} ({duration}시간)</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <i className="ri-map-pin-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                    <span className="text-sm">{room.address}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <i className="ri-group-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                    <span className="text-sm">최대 {room.capacity}명</span>
                  </div>
                </div>

                <div className="border-t pt-4 mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">이용 가능 시설</h4>
                  <div className="flex flex-wrap gap-1">
                    {room.facilities.map((facility, index) => (
                      <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {facility}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedEquipment.length > 0 && (
                  <div className="border-t pt-4 mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">선택된 기기</h4>
                    <div className="space-y-1">
                      {selectedEquipment.map(equipmentId => {
                        const equipment = availableEquipment.find(eq => eq.id === equipmentId);
                        if (!equipment) return null;
                        return (
                          <div key={equipmentId} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded inline-block mr-1 mb-1">
                            {equipment.name}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>룸 이용료</span>
                      <span className="text-green-600 font-medium">무료</span>
                    </div>
                    {equipmentCost > 0 && (
                      <div className="flex justify-between text-gray-600">
                        <span>기기 대여료</span>
                        <span className="font-medium">{equipmentCost.toLocaleString()}원</span>
                      </div>
                    )}
                    <div className="border-t pt-2 flex justify-between text-lg font-bold">
                      <span>총 비용</span>
                      <span className={equipmentCost > 0 ? "text-blue-600" : "text-green-600"}>
                        {equipmentCost > 0 ? `${equipmentCost.toLocaleString()}원` : '무료'}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">사용 승인 후 이용 가능</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
        type={termsModalType}
      />
    </div>
  );
}

export default function RoomBookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-lg">로딩 중...</div></div>}>
      <BookingForm />
    </Suspense>
  );
}
