/**
 * Description : RoomEditForm.tsx - 📌 룸 정보 수정 폼
 * Author : Shiwoo Min
 * Date : 2025-10-12
 * Path: /facilities/rooms/[id]/edit
 */
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import roomsData from 'data/rooms-by-venue.json';
import Link from 'next/link';

interface Room {
  id: number;
  name: string;
  description: string;
  capacity: number;
  area: string;
  status: string;
  hourlyRate: number;
  weekendRate: number;
  thumbnail: string;
  images: string[];
  facilities: string[];
  amenities: string[];
  tags: string[];
  features: any;
  location: any;
  contact: any;
  operatingHours: any;
  bookingRules: any;
}

export default function RoomEditForm() {
  const params = useParams();
  const roomId = Number(params?.['id']);  // ✅ id만 사용
  const [room, setRoom] = useState<Room | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
  const [detailPreviews, setDetailPreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    // rooms_by_venue.json에서 모든 룸 찾기
    const venues = (roomsData as any).venues || [];
    let foundRoom = null;

    for (const venue of venues) {
      for (const category of venue.categories) {
        const room = category.rooms.find((r: any) => r.id === roomId);
        if (room) {
          foundRoom = {
            ...room,
            images: room.images || [],
            facilities: room.facilities || room.equipment || [],
            amenities: room.amenities || [],
            tags: room.tags || [],
            features: room.features || {},
            location: room.location || { floor: room.floor || 0, roomNumber: '', zone: '' },
            contact: room.contact || { manager: '', phone: '', email: '' },
            operatingHours: room.operatingHours || { weekday: '', weekend: '', holidays: '' },
            bookingRules: room.bookingRules || {
              minBookingHours: 0,
              maxBookingHours: 0,
              cleaningFee: 0,
              overtimeFee: 0
            }
          };
          break;
        }
      }
      if (foundRoom) break;
    }

    if (foundRoom) {
      setRoom(foundRoom);
      setThumbnailPreview(foundRoom.thumbnail);
      setDetailPreviews(foundRoom.images);
    }
  }, [roomId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRoom(prev => prev ? { ...prev, [name]: value } : prev);
  };

  const handleNestedChange = (parent: string, field: string, value: any) => {
    setRoom(prev => prev ? {
      ...prev,
      [parent]: { ...(prev as any)[parent], [field]: value }
    } : prev);
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('파일 크기는 5MB를 초과할 수 없습니다.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setThumbnailPreview(result);
        setRoom(prev => prev ? { ...prev, thumbnail: result } : prev);
      };
      reader.readAsDataURL(file);
    }
  };

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
      reader.onloadend = () => {
        const result = reader.result as string;
        setDetailPreviews(prev => [...prev, result]);
        setRoom(prev => prev ? { ...prev, images: [...prev.images, result] } : prev);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeDetailImage = (index: number) => {
    setDetailPreviews(prev => prev.filter((_, i) => i !== index));
    setRoom(prev => prev ? { ...prev, images: prev.images.filter((_, i) => i !== index) } : prev);
  };

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
      reader.onloadend = () => {
        const result = reader.result as string;
        setDetailPreviews(prev => [...prev, result]);
        setRoom(prev => prev ? { ...prev, images: [...prev.images, result] } : prev);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('수정된 룸 데이터:', room);
    alert('룸 정보가 수정되었습니다.');
  };

  if (!room) return (
    <div className="text-center text-gray-500 py-20">
      <i className="ri-error-warning-line text-3xl mb-2 block"></i>
      룸을 찾을 수 없습니다.
    </div>
  );

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">룸 정보 수정</h1>
          <p className="text-gray-600">{room.name}</p>
        </div>
        <Link
          href={`/facilities/rooms/${roomId}`}
          className="text-sm px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
        >
          <i className="ri-arrow-left-line mr-1"></i> 취소
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="bg-white border rounded-lg shadow-sm p-6 space-y-8">
        {/* 기본 정보 */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <i className="ri-information-line mr-2"></i>
            기본 정보
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="룸 이름" name="name" value={room.name} onChange={handleChange} />
            <Field label="수용 인원" name="capacity" type="number" value={room.capacity} onChange={handleChange} />
            <Field label="면적" name="area" value={room.area} onChange={handleChange} />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
              <select
                name="status"
                value={room.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="available">예약 가능</option>
                <option value="occupied">사용중</option>
                <option value="maintenance">점검중</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">룸 설명</label>
            <textarea
              name="description"
              rows={4}
              value={room.description || ''}
              onChange={handleChange}
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
            <Field
              label="평일 시간당 요금"
              name="hourlyRate"
              type="number"
              value={room.hourlyRate}
              onChange={handleChange}
            />
            <Field
              label="주말 시간당 요금"
              name="weekendRate"
              type="number"
              value={room.weekendRate || 0}
              onChange={handleChange}
            />
            <Field
              label="청소비"
              name="cleaningFee"
              type="number"
              value={room.bookingRules.cleaningFee}
              onChange={(e) => handleNestedChange('bookingRules', 'cleaningFee', Number(e.target.value))}
            />
            <Field
              label="초과 요금 (시간당)"
              name="overtimeFee"
              type="number"
              value={room.bookingRules.overtimeFee}
              onChange={(e) => handleNestedChange('bookingRules', 'overtimeFee', Number(e.target.value))}
            />
          </div>
        </section>

        {/* 위치 정보 */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <i className="ri-map-pin-line mr-2"></i>
            위치 정보
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field
              label="층"
              name="floor"
              type="number"
              value={room.location.floor}
              onChange={(e) => handleNestedChange('location', 'floor', Number(e.target.value))}
            />
            <Field
              label="호수"
              name="roomNumber"
              value={room.location.roomNumber}
              onChange={(e) => handleNestedChange('location', 'roomNumber', e.target.value)}
            />
            <Field
              label="구역"
              name="zone"
              value={room.location.zone}
              onChange={(e) => handleNestedChange('location', 'zone', e.target.value)}
            />
          </div>
        </section>

        {/* 운영 시간 */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <i className="ri-time-line mr-2"></i>
            운영 시간
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field
              label="평일"
              name="weekday"
              value={room.operatingHours.weekday}
              onChange={(e) => handleNestedChange('operatingHours', 'weekday', e.target.value)}
              placeholder="09:00-22:00"
            />
            <Field
              label="주말"
              name="weekend"
              value={room.operatingHours.weekend}
              onChange={(e) => handleNestedChange('operatingHours', 'weekend', e.target.value)}
              placeholder="10:00-20:00"
            />
            <Field
              label="공휴일"
              name="holidays"
              value={room.operatingHours.holidays}
              onChange={(e) => handleNestedChange('operatingHours', 'holidays', e.target.value)}
              placeholder="closed"
            />
          </div>
        </section>

        {/* 담당자 정보 */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <i className="ri-user-line mr-2"></i>
            담당자 정보
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field
              label="담당자명"
              name="manager"
              value={room.contact.manager}
              onChange={(e) => handleNestedChange('contact', 'manager', e.target.value)}
            />
            <Field
              label="연락처"
              name="phone"
              value={room.contact.phone}
              onChange={(e) => handleNestedChange('contact', 'phone', e.target.value)}
            />
            <Field
              label="이메일"
              name="email"
              type="email"
              value={room.contact.email}
              onChange={(e) => handleNestedChange('contact', 'email', e.target.value)}
            />
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

        {/* 제출 버튼 */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Link
            href={`/facilities/rooms/${roomId}`}
            className="px-5 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
          >
            취소
          </Link>
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center"
          >
            <i className="ri-save-line mr-2"></i>
            수정 완료
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
  onChange,
}: {
  label: string;
  name: string;
  value: string | number;
  type?: string;
  placeholder?: string;
  onChange: (e: any) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}
