/**
 * Description : VenueAddForm.tsx - 📋 ConnectWon 지점 등록 폼
 * Author : Shiwoo Min
 * Date : 2025-10-12
 */
'use client';

import { useState } from 'react';

export default function VenueAddForm() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    address: '',
    capacity: '',
    roomCount: '',
    phone: '',
    email: '',
    operatingHours: '24시간 운영',
    parking: '',
    tags: '',
    featured: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('등록 데이터:', form);
    alert('새 지점이 등록되었습니다!');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border rounded-lg shadow-sm p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="지점명" name="name" value={form.name} onChange={handleChange} required />
        <Field label="주소" name="address" value={form.address} onChange={handleChange} required />
        <Field label="담당자 이메일" name="email" value={form.email} onChange={handleChange} />
        <Field label="연락처" name="phone" value={form.phone} onChange={handleChange} />
        <Field label="수용 인원" name="capacity" value={form.capacity} onChange={handleChange} />
        <Field label="보유 공간 수" name="roomCount" value={form.roomCount} onChange={handleChange} />
        <Field label="운영시간" name="operatingHours" value={form.operatingHours} onChange={handleChange} />
        <Field label="주차 정보" name="parking" value={form.parking} onChange={handleChange} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">지점 설명</label>
        <textarea
          name="description"
          rows={4}
          value={form.description}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">태그 (쉼표로 구분)</label>
        <input
          name="tags"
          value={form.tags}
          onChange={handleChange}
          placeholder="예: 강남, 창업, 협업공간"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          id="featured"
          name="featured"
          type="checkbox"
          checked={form.featured}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
        />
        <label htmlFor="featured" className="text-sm text-gray-700">
          대표 지점으로 표시
        </label>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          등록하기
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  required,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: any) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
