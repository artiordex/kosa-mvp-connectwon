/**
 * Description : EquipmentEditForm.tsx - 📌 ConnectWon 장비 수정 폼
 * Author : Assistant
 * Date : 2025-10-12
 */

import { useState } from 'react';

export default function EquipmentEditForm() {
  // 기존 데이터를 불러온 상태
  const [formData, setFormData] = useState({
    id: 1,
    name: '빔프로젝터 EPSON EB-2250U',
    category: 'projector',
    brand: 'EPSON',
    model: 'EB-2250U',
    venueId: '1',
    quantity: 3,
    rentalPrice: '50000',
    depositPrice: '200000',
    spec1Key: '해상도',
    spec1Value: '1920x1200',
    spec2Key: '밝기',
    spec2Value: '5000 lumens',
    spec3Key: '연결 방식',
    spec3Value: 'HDMI, USB, WiFi'
  });

  const categories = [
    { value: 'projector', label: '프로젝터' },
    { value: 'laptop', label: '노트북' },
    { value: 'microphone', label: '마이크' },
    { value: 'speaker', label: '스피커' },
    { value: 'camera', label: '카메라' },
    { value: 'tablet', label: '태블릿' },
    { value: 'monitor', label: '모니터' },
    { value: 'adapter', label: '어댑터' },
    { value: 'cable', label: '케이블' },
    { value: 'lighting', label: '조명' }
  ];

  const venues = [
    { value: '1', label: 'ConnectWon 강남지점' },
    { value: '2', label: 'ConnectWon 마포지점' },
    { value: '3', label: 'ConnectWon 광명지점' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('장비 수정:', formData);
    goBack();
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="space-y-6">
      {/* 상단 네비게이션 */}
      <button
        onClick={goBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
      >
        <i className="ri-arrow-left-line"></i>
        <span>뒤로가기</span>
      </button>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <i className="ri-edit-line"></i>
          장비 수정
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 기본 정보 섹션 */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              기본 정보
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  장비명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 빔프로젝터 EPSON EB-2250U"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  카테고리 <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  브랜드 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="예: EPSON"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  모델명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="예: EB-2250U"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  보관 지점 <span className="text-red-500">*</span>
                </label>
                <select
                  name="venueId"
                  value={formData.venueId}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {venues.map(venue => (
                    <option key={venue.value} value={venue.value}>{venue.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  수량 <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* 가격 정보 섹션 */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              가격 정보
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  대여료 (일) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="rentalPrice"
                    value={formData.rentalPrice}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">원</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  보증금 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="depositPrice"
                    value={formData.depositPrice}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">원</span>
                </div>
              </div>
            </div>
          </div>

          {/* 사양 정보 섹션 */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              장비 사양
            </h2>
            <div className="space-y-4">
              {[1, 2, 3].map(num => (
                <div key={num} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      사양 항목 {num}
                    </label>
                    <input
                      type="text"
                      name={`spec${num}Key`}
                      value={formData[`spec${num}Key` as keyof typeof formData]}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="예: 해상도"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      사양 값 {num}
                    </label>
                    <input
                      type="text"
                      name={`spec${num}Value`}
                      value={formData[`spec${num}Value` as keyof typeof formData]}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="예: 1920x1200"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 버튼 영역 */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={goBack}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
            >
              <i className="ri-close-line"></i>
              취소
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              <i className="ri-save-line"></i>
              수정 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
