
'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { useState } from 'react';

export default function DevicesPage() {
  const [selectedCenter, setSelectedCenter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);

  const centers = [
    {
      id: 'gangnam',
      name: '강남센터',
      address: '서울시 강남구 테헤란로 123',
      phone: '02-1234-5678',
      image: "https://readdy.ai/api/search-image?query=Modern%20office%20building%20exterior%20in%20Gangnam%20Seoul%2C%20sleek%20contemporary%20architecture%20with%20glass%20facade%2C%20professional%20business%20district%20environment%2C%20urban%20cityscape%20with%20clean%20lines%20and%20sophisticated%20design&width=300&height=200&seq=gangnam-center&orientation=landscape"
    },
    {
      id: 'mapo',
      name: '마포센터',
      address: '서울시 마포구 홍익로 456',
      phone: '02-2345-6789',
      image: "https://readdy.ai/api/search-image?query=Creative%20workspace%20building%20in%20Mapo%20Seoul%2C%20artistic%20modern%20architecture%20with%20unique%20design%20elements%2C%20innovative%20office%20space%20with%20contemporary%20styling%20and%20cultural%20atmosphere&width=300&height=200&seq=mapo-center&orientation=landscape"
    },
    {
      id: 'gwangmyeong',
      name: '광명센터',
      address: '경기도 광명시 광명로 789',
      phone: '02-3456-7890',
      image: "https://readdy.ai/api/search-image?query=Large%20modern%20community%20center%20in%20Gwangmyeong%2C%20spacious%20educational%20facility%20with%20contemporary%20design%2C%20accessible%20building%20with%20ample%20parking%20and%20open%20public%20spaces&width=300&height=200&seq=gwangmyeong-center&orientation=landscape"
    }
  ];

  const categories = [
    { id: '전체', name: '전체', icon: 'ri-grid-line', color: 'bg-gray-50 border-gray-200' },
    { id: '프로젝터', name: '프로젝터', icon: 'ri-slideshow-line', color: 'bg-blue-50 border-blue-200' },
    { id: '노트북', name: '노트북', icon: 'ri-computer-line', color: 'bg-green-50 border-green-200' },
    { id: '스피커', name: '스피커', icon: 'ri-volume-up-line', color: 'bg-purple-50 border-purple-200' },
    { id: '기타장비', name: '기타 장비', icon: 'ri-tools-line', color: 'bg-orange-50 border-orange-200' }
  ];

  const devices = [
    {
      id: 1,
      name: '빔프로젝터 Pro',
      category: '프로젝터',
      description: 'Full HD 1080p 지원, 밝기 3500안시루멘',
      features: ['HDMI/USB 연결', '무선 연결 지원', '최대 300인치 투사'],
      price: 15000,
      priceUnit: '/일',
      available: true,
      availableCount: 3,
      image: "https://readdy.ai/api/search-image?query=Professional%20business%20projector%20with%20modern%20design%2C%20high-quality%20presentation%20equipment%20for%20conferences%20and%20meetings%2C%20sleek%20black%20projector%20on%20clean%20white%20background%20with%20contemporary%20styling&width=400&height=300&seq=projector-device&orientation=landscape",
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 2,
      name: '노트북 Ultra 15',
      category: '노트북',
      description: 'Intel i7, 16GB RAM, 512GB SSD',
      features: ['Office 365 설치', '고성능 그래픽카드', '12시간 배터리'],
      price: 25000,
      priceUnit: '/일',
      available: true,
      availableCount: 5,
      image: "https://readdy.ai/api/search-image?query=Modern%20laptop%20computer%20with%20sleek%20silver%20design%2C%20premium%20business%20notebook%20with%20thin%20profile%20and%20high-resolution%20screen%2C%20professional%20workspace%20setup%20with%20contemporary%20styling&width=400&height=300&seq=laptop-device&orientation=landscape",
      color: 'bg-green-50 border-green-200'
    },
    {
      id: 3,
      name: '무선 스피커 시스템',
      category: '스피커',
      description: '블루투스 5.0, 대용량 배터리',
      features: ['360도 사운드', '방수 기능', '최대 20시간 재생'],
      price: 12000,
      priceUnit: '/일',
      available: false,
      availableCount: 0,
      image: "https://readdy.ai/api/search-image?query=Premium%20wireless%20bluetooth%20speaker%20system%20with%20modern%20cylindrical%20design%2C%20professional%20audio%20equipment%20for%20presentations%20and%20events%2C%20high-quality%20sound%20device%20with%20sleek%20finish&width=400&height=300&seq=speaker-device&orientation=landscape",
      color: 'bg-purple-50 border-purple-200'
    },
    {
      id: 4,
      name: '태블릿 Galaxy Tab',
      category: '기타장비',
      description: '10.5인치 디스플레이, S펜 포함',
      features: ['4G LTE 지원', 'DeX 모드', '대용량 저장공간'],
      price: 18000,
      priceUnit: '/일',
      available: true,
      availableCount: 2,
      image: "https://readdy.ai/api/search-image?query=Modern%20tablet%20device%20with%20stylus%20pen%2C%20sleek%20design%20tablet%20computer%20for%20business%20and%20creative%20work%2C%20high-resolution%20display%20with%20digital%20pen%20on%20clean%20background&width=400&height=300&seq=tablet-device&orientation=landscape",
      color: 'bg-orange-50 border-orange-200'
    },
    {
      id: 5,
      name: '웹캠 HD Pro',
      category: '기타장비',
      description: '4K 화질, 자동 초점 및 조명 보정',
      features: ['노이즈 캔슬링 마이크', 'USB 플러그앤플레이', '광각 렌즈'],
      price: 8000,
      priceUnit: '/일',
      available: true,
      availableCount: 4,
      image: "https://readdy.ai/api/search-image?query=Professional%20webcam%20with%20high-resolution%20lens%2C%20modern%20video%20conference%20camera%20for%20streaming%20and%20online%20meetings%2C%20compact%20design%20with%20adjustable%20mount%20and%20contemporary%20styling&width=400&height=300&seq=webcam-device&orientation=landscape",
      color: 'bg-teal-50 border-teal-200'
    },
    {
      id: 6,
      name: '휴대용 프린터',
      category: '기타장비',
      description: '모바일 프린터, A4 컬러 인쇄',
      features: ['무선 인쇄', '배터리 내장', '컬러/흑백 지원'],
      price: 10000,
      priceUnit: '/일',
      available: true,
      availableCount: 1,
      image: "https://readdy.ai/api/search-image?query=Compact%20portable%20printer%20for%20mobile%20printing%2C%20modern%20wireless%20printer%20with%20sleek%20white%20design%2C%20professional%20office%20equipment%20for%20on-the-go%20printing%20with%20clean%20contemporary%20styling&width=400&height=300&seq=printer-device&orientation=landscape",
      color: 'bg-pink-50 border-pink-200'
    }
  ];

  const filteredDevices = devices.filter(device => 
    selectedCategory === '전체' || device.category === selectedCategory
  );

  const selectedCenterData = centers.find(center => center.id === selectedCenter);

  const addToCart = (device: any, duration: number) => {
    const existingItem = cart.find(item => item.id === device.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === device.id 
          ? { ...item, duration, totalPrice: device.price * duration }
          : item
      ));
    } else {
      setCart([...cart, {
        ...device,
        duration,
        totalPrice: device.price * duration,
        center: selectedCenterData
      }]);
    }
    setShowCart(true);
  };

  const removeFromCart = (deviceId: number) => {
    setCart(cart.filter(item => item.id !== deviceId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.totalPrice, 0);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20">
        {/* 헤로 섹션 */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              ICT 디바이스 대여
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              원하는 지점에서 필요한 디바이스를 선택하고 한번에 예약하세요
            </p>
            
            {/* 단계 표시 */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  selectedCenter ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  1
                </div>
                <span className="ml-2 text-sm text-gray-600">지점 선택</span>
              </div>
              <div className="w-6 h-0.5 bg-gray-300"></div>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  selectedCategory && selectedCenter ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  2
                </div>
                <span className="ml-2 text-sm text-gray-600">카테고리 선택</span>
              </div>
              <div className="w-6 h-0.5 bg-gray-300"></div>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  cart.length > 0 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  3
                </div>
                <span className="ml-2 text-sm text-gray-600">디바이스 선택</span>
              </div>
            </div>

            <div className="flex justify-center items-center space-x-6 text-blue-600">
              <div className="flex items-center">
                <i className="ri-shield-check-line mr-2 w-5 h-5 flex items-center justify-center"></i>
                <span>안전한 대여</span>
              </div>
              <div className="flex items-center">
                <i className="ri-time-line mr-2 w-5 h-5 flex items-center justify-center"></i>
                <span>유연한 대여기간</span>
              </div>
              <div className="flex items-center">
                <i className="ri-customer-service-line mr-2 w-5 h-5 flex items-center justify-center"></i>
                <span>전문 지원</span>
              </div>
            </div>
          </div>
        </section>

        {/* 지점 선택 섹션 */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Step 1. 지점을 선택하세요
              </h2>
              <p className="text-gray-600 text-lg">
                디바이스를 수령할 지점을 선택해주세요
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {centers.map((center) => (
                <div 
                  key={center.id} 
                  onClick={() => {
                    setSelectedCenter(center.id);
                    setCart([]);
                  }}
                  className={`bg-white border-2 rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer ${
                    selectedCenter === center.id 
                      ? 'border-blue-500 ring-2 ring-blue-200' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="relative">
                    <img 
                      src={center.image}
                      alt={center.name}
                      className="w-full h-48 object-cover object-top rounded-t-xl"
                    />
                    {selectedCenter === center.id && (
                      <div className="absolute top-4 right-4">
                        <div className="bg-blue-600 text-white p-2 rounded-full">
                          <i className="ri-check-line w-5 h-5 flex items-center justify-center"></i>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {center.name}
                    </h3>
                    
                    <div className="space-y-2">
                      <div className="flex items-start text-gray-600">
                        <i className="ri-map-pin-line mr-2 w-4 h-4 flex items-center justify-center mt-1"></i>
                        <span className="text-sm">{center.address}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <i className="ri-phone-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                        <span className="text-sm">{center.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 카테고리 필터 */}
        {selectedCenter && (
          <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Step 2. 카테고리를 선택하세요
                </h2>
                <p className="text-gray-600 text-lg">
                  <span className="font-semibold text-blue-600">{selectedCenterData?.name}</span>에서 대여할 디바이스 카테고리를 선택해주세요
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center px-6 py-4 rounded-xl transition-all duration-200 cursor-pointer whitespace-nowrap border-2 ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white shadow-lg border-blue-600'
                        : `${category.color} text-gray-700 hover:shadow-md`
                    }`}
                  >
                    <i className={`${category.icon} mr-2 w-5 h-5 flex items-center justify-center`}></i>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 디바이스 목록 */}
        {selectedCenter && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  Step 3. 디바이스를 선택하세요
                </h2>
                <button
                  onClick={() => setShowCart(true)}
                  className="relative bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap shadow-lg"
                >
                  <i className="ri-shopping-cart-line mr-2 w-5 h-5 flex items-center justify-center"></i>
                  장바구니
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                      {cart.length}
                    </span>
                  )}
                </button>
              </div>

              <div className="mb-6">
                <p className="text-gray-600 text-lg">
                  <span className="font-semibold text-blue-600">{selectedCategory === '전체' ? '전체' : selectedCategory}</span> 
                  ({filteredDevices.length}개) • 
                  <span className="font-semibold text-green-600"> {selectedCenterData?.name}</span>에서 수령
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDevices.map((device) => (
                  <DeviceCard 
                    key={device.id} 
                    device={device} 
                    onAddToCart={addToCart}
                    selectedCenter={selectedCenterData}
                  />
                ))}
              </div>

              {filteredDevices.length === 0 && (
                <div className="text-center py-16">
                  <i className="ri-tools-line text-gray-400 text-6xl mb-4 w-16 h-16 flex items-center justify-center mx-auto"></i>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">해당 카테고리에 디바이스가 없습니다</h3>
                  <p className="text-gray-600">다른 카테고리를 선택해보세요</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 안내 섹션 */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              디바이스 대여 서비스 안내
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-hand-coin-line text-white text-2xl w-8 h-8 flex items-center justify-center"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">합리적인 가격</h3>
                <p className="text-gray-600 text-sm">시중 대여료 대비 30% 저렴한 가격으로 제공</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-tools-line text-white text-2xl w-8 h-8 flex items-center justify-center"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">최신 장비</h3>
                <p className="text-gray-600 text-sm">최신 사양의 고품질 디바이스만 보유</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-customer-service-line text-white text-2xl w-8 h-8 flex items-center justify-center"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">전문 지원</h3>
                <p className="text-gray-600 text-sm">사용법 안내 및 기술 지원 서비스 제공</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-shield-check-line text-white text-2xl w-8 h-8 flex items-center justify-center"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">안전 보장</h3>
                <p className="text-gray-600 text-sm">정기 점검 및 소독으로 안전한 대여 서비스</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* 장바구니 모달 */}
      {showCart && (
        <CartModal 
          cart={cart}
          onClose={() => setShowCart(false)}
          onRemove={removeFromCart}
          totalPrice={getTotalPrice()}
        />
      )}
    </div>
  );
}

function DeviceCard({ device, onAddToCart, selectedCenter }: { 
  device: any, 
  onAddToCart: (device: any, duration: number) => void,
  selectedCenter: any
}) {
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [showDetails, setShowDetails] = useState(false);

  const durations = [
    { value: 1, label: '1일' },
    { value: 3, label: '3일' },
    { value: 7, label: '7일' },
    { value: 14, label: '14일' }
  ];

  return (
    <div className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all border-2 ${device.color}`}>
      <div className="relative">
        <img 
          src={device.image}
          alt={device.name}
          className="w-full h-48 object-cover object-top rounded-t-xl"
        />
        <div className="absolute top-4 right-4">
          {device.available ? (
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              대여 가능
            </span>
          ) : (
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              대여 중
            </span>
          )}
        </div>
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {selectedCenter?.name}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {device.name}
        </h3>
        
        <p className="text-gray-600 mb-4 text-sm">
          {device.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <i className="ri-check-line mr-2 w-4 h-4 flex items-center justify-center text-green-600"></i>
            <span className="text-sm">재고: {device.availableCount}개</span>
          </div>
        </div>

        <div className="mb-4">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-blue-600 hover:underline text-sm cursor-pointer flex items-center"
          >
            상세 기능 보기
            <i className={`ri-arrow-${showDetails ? 'up' : 'down'}-s-line ml-1 w-4 h-4 flex items-center justify-center`}></i>
          </button>
          
          {showDetails && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              <ul className="text-sm text-gray-600 space-y-1">
                {device.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <i className="ri-check-line mr-2 w-3 h-3 flex items-center justify-center text-green-600"></i>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {device.available && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">대여 기간</label>
              <div className="grid grid-cols-2 gap-2">
                {durations.map((duration) => (
                  <button
                    key={duration.value}
                    onClick={() => setSelectedDuration(duration.value)}
                    className={`px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer whitespace-nowrap ${
                      selectedDuration === duration.value
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {duration.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-2xl font-bold text-blue-600">
                  {(device.price * selectedDuration).toLocaleString()}원
                </span>
                <span className="text-gray-600 text-sm">
                  /{selectedDuration}일
                </span>
              </div>
            </div>

            <button
              onClick={() => onAddToCart(device, selectedDuration)}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap shadow-lg hover:shadow-xl"
            >
              장바구니에 추가
            </button>
          </>
        )}

        {!device.available && (
          <div className="text-center py-4">
            <p className="text-gray-500 mb-3">현재 대여 중입니다</p>
            <button className="w-full bg-gray-300 text-gray-500 py-3 px-4 rounded-lg cursor-not-allowed">
              대여 불가
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function CartModal({ cart, onClose, onRemove, totalPrice }: { 
  cart: any[], 
  onClose: () => void, 
  onRemove: (id: number) => void, 
  totalPrice: number 
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">장바구니</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <i className="ri-close-line w-6 h-6 flex items-center justify-center"></i>
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-96">
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <i className="ri-shopping-cart-line text-gray-400 text-6xl mb-4 w-16 h-16 flex items-center justify-center mx-auto"></i>
              <p className="text-gray-600">장바구니가 비어있습니다</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center p-4 border rounded-lg">
                  <img 
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover object-top rounded-lg"
                  />
                  <div className="flex-1 ml-4">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.duration}일 대여 • {item.center?.name}</p>
                    <p className="text-lg font-bold text-blue-600">
                      {item.totalPrice.toLocaleString()}원
                    </p>
                  </div>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="text-red-600 hover:text-red-800 cursor-pointer ml-4"
                  >
                    <i className="ri-delete-bin-line w-5 h-5 flex items-center justify-center"></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold text-gray-900">총 금액</span>
              <span className="text-2xl font-bold text-blue-600">
                {totalPrice.toLocaleString()}원
              </span>
            </div>
            <Link href="/devices/checkout" className="block">
              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap shadow-lg">
                결제하기
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
