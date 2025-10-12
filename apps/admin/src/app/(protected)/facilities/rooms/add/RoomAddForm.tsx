/**
 * Description : RoomAddForm.tsx - 📌 ConnectWon 룸 등록 폼
 * Author : Shiwoo Min
 * Date : 2025-10-12
 * Path: /facilities/rooms/add
 */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import roomData from 'data/rooms-by-venue.json';

export default function RoomAddForm() {
  const venues = (roomData as any).venues || [];

  const [form, setForm] = useState({
    venueId: '',
    categoryType: '',
    name: '',
    description: '',
    capacity: '',
    area: '',
    status: 'available',
    hourlyRate: '',
    weekendRate: '',
    floor: '',
    roomNumber: '',
    zone: '',
    manager: '',
    phone: '',
    email: '',
    weekdayHours: '09:00-22:00',
    weekendHours: '10:00-20:00',
    holidayHours: 'closed',
    minBookingHours: '2',
    maxBookingHours: '8',
    cleaningFee: '',
    overtimeFee: '',
  });

  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
  const [detailPreviews, setDetailPreviews] = useState<string[]>([]);
  const [facilities, setFacilities] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newItem, setNewItem] = useState({ facility: '', amenity: '', tag: '' });
  const [isDragging, setIsDragging] = useState(false);

  // 선택된 지점의 카테고리 목록
  const selectedVenue = venues.find((v: any) => v.id === Number(form.venueId));
  const availableCategories = selectedVenue?.categories || [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 대표 이미지 업로드
  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('파일 크기는 5MB를 초과할 수 없습니다.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setThumbnailPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // 세부 이미지 업로드
  const handleDetailImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (detailPreviews.length + files.length > 5) {
      alert('최대 5장까지 업로드 가능합니다.');
      return;
    }
    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name}: 파일 크기는 5MB를 초과할 수 없습니다.`);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setDetailPreviews(prev => [...prev, reader.result as string]);
      reader.readAsDataURL(file);
    });
  };

  const removeDetailImage = (index: number) => {
    setDetailPreviews(prev => prev.filter((_, i) => i !== index));
  };

  // 드래그 앤 드롭
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    if (detailPreviews.length + files.length > 5) {
      alert('최대 5장까지 업로드 가능합니다.');
      return;
    }
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => setDetailPreviews(prev => [...prev, reader.result as string]);
      reader.readAsDataURL(file);
    });
  };

  // 시설 추가
  const addFacility = () => {
    if (newItem.facility.trim()) {
      setFacilities(prev => [...prev, newItem.facility.trim()]);
      setNewItem(prev => ({ ...prev, facility: '' }));
    }
  };

  const removeFacility = (index: number) => {
    setFacilities(prev => prev.filter((_, i) => i !== index));
  };

  // 편의사항 추가
  const addAmenity = () => {
    if (newItem.amenity.trim()) {
      setAmenities(prev => [...prev, newItem.amenity.trim()]);
      setNewItem(prev => ({ ...prev, amenity: '' }));
    }
  };

  const removeAmenity = (index: number) => {
    setAmenities(prev => prev.filter((_, i) => i !== index));
  };

  // 태그 추가
  const addTag = () => {
    if (newItem.tag.trim()) {
      setTags(prev => [...prev, newItem.tag.trim()]);
      setNewItem(prev => ({ ...prev, tag: '' }));
    }
  };

  const removeTag = (index: number) => {
    setTags(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const roomData = {
      ...form,
      thumbnail: thumbnailPreview,
      images: detailPreviews,
      facilities,
      amenities,
      tags,
    };

    console.log('등록된 룸 정보:', roomData);
    alert('새로운 룸이 등록되었습니다.');
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">새 룸 등록</h1>
          <p className="text-gray-600">새로운 공간을 등록하고 관리하세요.</p>
        </div>
        <Link
          href="/facilities/rooms"
          className="text-sm px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
        >
          <i className="ri-arrow-left-line mr-1"></i> 목록으로
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border rounded-lg shadow-sm p-6 space-y-8">
        {/* 지점 및 카테고리 선택 */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <i className="ri-building-line mr-2"></i>
            지점 및 카테고리
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="지점"
              name="venueId"
              value={form.venueId}
              onChange={handleChange}
              options={venues.map((v: any) => ({ value: v.id, label: v.name }))}
              required
            />
            <SelectField
              label="카테고리"
              name="categoryType"
              value={form.categoryType}
              onChange={handleChange}
              options={availableCategories.map((c: any) => ({ value: c.type, label: c.label }))}
              required
              disabled={!form.venueId}
            />
          </div>
        </section>

        {/* 기본 정보 */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <i className="ri-information-line mr-2"></i>
            기본 정보
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="룸 이름" name="name" value={form.name} onChange={handleChange} required />
            <Field label="수용 인원" name="capacity" type="number" value={form.capacity} onChange={handleChange} required />
            <Field label="면적 (㎡)" name="area" value={form.area} onChange={handleChange} placeholder="45㎡" />
            <SelectField
              label="상태"
              name="status"
              value={form.status}
              onChange={handleChange}
              options={[
                { value: 'available', label: '예약 가능' },
                { value: 'occupied', label: '사용중' },
                { value: 'maintenance', label: '점검중' },
              ]}
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">룸 설명</label>
            <textarea
              name="description"
              rows={4}
              value={form.description}
              onChange={handleChange}
              placeholder="룸에 대한 상세 설명을 입력하세요."
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </section>

        {/* 요금 정보 */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <i className="ri-price-tag-3-line mr-2"></i>
            요금 정보
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="평일 시간당 요금 (원)" name="hourlyRate" type="number" value={form.hourlyRate} onChange={handleChange} required />
            <Field label="주말 시간당 요금 (원)" name="weekendRate" type="number" value={form.weekendRate} onChange={handleChange} required />
            <Field label="청소비 (원)" name="cleaningFee" type="number" value={form.cleaningFee} onChange={handleChange} />
            <Field label="초과 요금 (원/시간)" name="overtimeFee" type="number" value={form.overtimeFee} onChange={handleChange} />
          </div>
        </section>

        {/* 위치 정보 */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <i className="ri-map-pin-line mr-2"></i>
            위치 정보
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="층" name="floor" type="number" value={form.floor} onChange={handleChange} required />
            <Field label="호수" name="roomNumber" value={form.roomNumber} onChange={handleChange} placeholder="301" />
            <Field label="구역" name="zone" value={form.zone} onChange={handleChange} placeholder="동쪽" />
          </div>
        </section>

        {/* 운영 시간 */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <i className="ri-time-line mr-2"></i>
            운영 시간
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="평일" name="weekdayHours" value={form.weekdayHours} onChange={handleChange} placeholder="09:00-22:00" />
            <Field label="주말" name="weekendHours" value={form.weekendHours} onChange={handleChange} placeholder="10:00-20:00" />
            <Field label="공휴일" name="holidayHours" value={form.holidayHours} onChange={handleChange} placeholder="closed" />
          </div>
        </section>

        {/* 예약 규칙 */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <i className="ri-calendar-check-line mr-2"></i>
            예약 규칙
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="최소 예약 시간 (시간)" name="minBookingHours" type="number" value={form.minBookingHours} onChange={handleChange} />
            <Field label="최대 예약 시간 (시간)" name="maxBookingHours" type="number" value={form.maxBookingHours} onChange={handleChange} />
          </div>
        </section>

        {/* 담당자 정보 */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <i className="ri-user-line mr-2"></i>
            담당자 정보
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="담당자명" name="manager" value={form.manager} onChange={handleChange} />
            <Field label="연락처" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="02-1234-5678" />
            <Field label="이메일" name="email" type="email" value={form.email} onChange={handleChange} placeholder="room@connectone.co.kr" />
          </div>
        </section>

        {/* 대표 이미지 */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <i className="ri-image-line mr-2"></i>
            대표 이미지
          </h3>
          <div className="flex items-start gap-4">
            {thumbnailPreview && (
              <div className="relative w-48 h-32 rounded-lg overflow-hidden border-2 border-gray-200">
                <img src={thumbnailPreview} alt="대표 이미지" className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2">
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">대표</span>
                </div>
              </div>
            )}
            <label className="flex-1 cursor-pointer">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition">
                <i className="ri-upload-cloud-line text-4xl text-gray-400 mb-2 block"></i>
                <p className="text-sm text-gray-600">클릭하거나 드래그하여 업로드</p>
                <p className="text-xs text-gray-500 mt-1">JPG, PNG (최대 5MB)</p>
              </div>
              <input type="file" accept="image/*" onChange={handleThumbnailUpload} className="hidden" />
            </label>
          </div>
        </section>

        {/* 세부 이미지 */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <i className="ri-gallery-line mr-2"></i>
            세부 이미지 ({detailPreviews.length}/5)
          </h3>
          <div
            onDragOver={handleDragOver}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition ${
              isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            } ${detailPreviews.length >= 5 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <label className={detailPreviews.length >= 5 ? 'cursor-not-allowed' : 'cursor-pointer'}>
              <i className="ri-image-add-line text-5xl text-gray-400 mb-3 block"></i>
              <p className="text-gray-700 font-medium mb-1">이미지를 드래그하거나 클릭하여 업로드</p>
              <p className="text-sm text-gray-500">JPG, PNG (최대 5MB) • {5 - detailPreviews.length}장 추가 가능</p>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleDetailImageUpload}
                disabled={detailPreviews.length >= 5}
                className="hidden"
              />
            </label>
          </div>

          {detailPreviews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
              {detailPreviews.map((preview, index) => (
                <div key={index} className="relative group aspect-video rounded-lg overflow-hidden border-2 border-gray-200">
                  <img src={preview} alt={`세부 ${index + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeDetailImage(index)}
                    className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center opacity-0 group-hover:opacity-100"
                  >
                    <i className="ri-delete-bin-line text-white text-2xl"></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 보유 시설 */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <i className="ri-tools-line mr-2"></i>
            보유 시설
          </h3>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newItem.facility}
              onChange={(e) => setNewItem(prev => ({ ...prev, facility: e.target.value }))}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFacility())}
              placeholder="시설 입력 후 추가 버튼 클릭"
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={addFacility}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <i className="ri-add-line"></i>
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {facilities.map((item, idx) => (
              <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center gap-2">
                {item}
                <button type="button" onClick={() => removeFacility(idx)} className="text-red-500 hover:text-red-700">
                  <i className="ri-close-line"></i>
                </button>
              </span>
            ))}
          </div>
        </section>

        {/* 편의사항 */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <i className="ri-service-line mr-2"></i>
            편의사항
          </h3>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newItem.amenity}
              onChange={(e) => setNewItem(prev => ({ ...prev, amenity: e.target.value }))}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAmenity())}
              placeholder="편의사항 입력 후 추가 버튼 클릭"
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={addAmenity}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <i className="ri-add-line"></i>
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {amenities.map((item, idx) => (
              <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2">
                {item}
                <button type="button" onClick={() => removeAmenity(idx)} className="text-red-500 hover:text-red-700">
                  <i className="ri-close-line"></i>
                </button>
              </span>
            ))}
          </div>
        </section>

        {/* 태그 */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <i className="ri-price-tag-line mr-2"></i>
            태그
          </h3>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newItem.tag}
              onChange={(e) => setNewItem(prev => ({ ...prev, tag: e.target.value }))}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              placeholder="태그 입력 후 추가 버튼 클릭"
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <i className="ri-add-line"></i>
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((item, idx) => (
              <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-2">
                #{item}
                <button type="button" onClick={() => removeTag(idx)} className="text-red-500 hover:text-red-700">
                  <i className="ri-close-line"></i>
                </button>
              </span>
            ))}
          </div>
        </section>

        {/* 제출 버튼 */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Link
            href="/facilities/rooms"
            className="px-5 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
          >
            취소
          </Link>
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center"
          >
            <i className="ri-add-line mr-2"></i>
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  type = 'text',
  placeholder = '',
  required = false,
  onChange,
}: {
  label: string;
  name: string;
  value: string | number;
  type?: string;
  placeholder?: string;
  required?: boolean;
  onChange: (e: any) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  disabled = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: any) => void;
  options: { value: string | number; label: string }[];
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        <option value="">선택하세요</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
