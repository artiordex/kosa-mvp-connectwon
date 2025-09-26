'use client';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import TermsModal from '../../../components/TermsModal';
import Link from 'next/link';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ReservationForm() {
  const searchParams = useSearchParams();
  const programId = searchParams.get('programId');
  const sessionId = searchParams.get('sessionId');
  const participants = parseInt(searchParams.get('participants') || '1');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
    agreeTerms: false,
    agreeRefund: false
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [termsModalType, setTermsModalType] = useState<'terms' | 'privacy'>('terms');

  const program = {
    id: programId,
    title: "요가 클래스",
    instructor: "김요가",
    location: "강남구 피트니스센터",
    address: "서울특별시 강남구 테헤란로 123, 2층",
    price: 15000,
    session: {
      date: "2024-12-20",
      time: "10:00-11:30",
      duration: "90분"
    },
    image: "https://readdy.ai/api/search-image?query=Peaceful%20yoga%20class%20with%20instructor%20and%20students%20in%20modern%20studio%2C%20natural%20lighting%2C%20calm%20atmosphere%2C%20people%20in%20comfortable%20yoga%20poses%2C%20minimalist%20clean%20environment&width=400&height=300&seq=yoga-reservation&orientation=landscape"
  };

  const totalPrice = program.price * participants;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeTerms || !formData.agreeRefund) {
      alert('필수 약관에 동의해주세요.');
      return;
    }
    console.log('예약 신청:', { ...formData, programId, sessionId, participants, paymentMethod });
    window.location.href = '/reservations/complete';
  };

  const handleTermsClick = (type: 'terms' | 'privacy') => {
    setTermsModalType(type);
    setIsTermsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">프로그램 예약</h1>
            <p className="text-gray-600">예약 정보를 입력하고 결제를 진행하세요</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 예약 정보 입력 */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 예약자 정보 */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">예약자 정보</h2>
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
                    <div className="md:col-span-2">
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
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        특별 요청사항
                      </label>
                      <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                        placeholder="특별한 요청사항이 있으시면 입력해주세요"
                        maxLength={500}
                      />
                      <p className="text-xs text-gray-500 mt-1">{formData.specialRequests.length}/500</p>
                    </div>
                  </div>
                </div>

                {/* 결제 방법 */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">결제 방법</h2>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <div className="ml-3 flex items-center">
                        <i className="ri-bank-card-line mr-2 w-5 h-5 flex items-center justify-center text-gray-600"></i>
                        <span className="font-medium">신용카드 / 체크카드</span>
                      </div>
                    </label>
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="transfer"
                        checked={paymentMethod === 'transfer'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <div className="ml-3 flex items-center">
                        <i className="ri-bank-line mr-2 w-5 h-5 flex items-center justify-center text-gray-600"></i>
                        <span className="font-medium">계좌이체</span>
                      </div>
                    </label>
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="kakaopay"
                        checked={paymentMethod === 'kakaopay'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <div className="ml-3 flex items-center">
                        <i className="ri-chat-1-line mr-2 w-5 h-5 flex items-center justify-center text-yellow-500"></i>
                        <span className="font-medium">카카오페이</span>
                      </div>
                    </label>
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
                          <span className="text-red-500">*</span> 서비스 이용약관 및 개인정보 처리방침에 동의합니다
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
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        name="agreeRefund"
                        checked={formData.agreeRefund}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                        required
                      />
                      <div className="ml-3">
                        <span className="text-sm text-gray-700">
                          <span className="text-red-500">*</span> 환불 정책에 동의합니다
                        </span>
                        <button
                          type="button"
                          onClick={() => handleTermsClick('terms')}
                          className="text-blue-600 hover:underline ml-2 text-sm cursor-pointer"
                        >
                          내용 보기
                        </button>
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  {totalPrice.toLocaleString()}원 결제하기
                </button>
              </form>
            </div>

            {/* 예약 요약 */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-sm sticky top-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">예약 요약</h2>
                
                <div className="mb-4">
                  <img 
                    src={program.image}
                    alt={program.title}
                    className="w-full h-32 object-cover object-top rounded-lg"
                  />
                </div>

                <div className="space-y-3 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">{program.title}</h3>
                  
                  <div className="flex items-center text-gray-600">
                    <i className="ri-user-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                    <span className="text-sm">{program.instructor}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <i className="ri-calendar-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                    <span className="text-sm">{program.session.date} {program.session.time}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <i className="ri-time-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                    <span className="text-sm">{program.session.duration}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <i className="ri-map-pin-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                    <span className="text-sm">{program.address}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <i className="ri-group-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                    <span className="text-sm">참여 인원: {participants}명</span>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>프로그램 비용</span>
                    <span>{program.price.toLocaleString()}원 × {participants}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>소계</span>
                    <span>{totalPrice.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>할인</span>
                    <span>-0원</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between text-lg font-bold text-gray-900">
                    <span>총 결제금액</span>
                    <span className="text-blue-600">{totalPrice.toLocaleString()}원</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">환불 정책</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• 수업 7일 전: 100% 환불</li>
                    <li>• 수업 3-6일 전: 50% 환불</li>
                    <li>• 수업 1-2일 전: 환불 불가</li>
                  </ul>
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

// Export page component with Suspense
export default function ReservationNewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-lg">로딩 중...</div></div>}>
      <ReservationForm />
    </Suspense>
  );
}
