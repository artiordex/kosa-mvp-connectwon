/**
 * Description : VenueEditForm.tsx - 📌 ConnectWon 지점 수정 폼
 * Author : Shiwoo Min
 * Date : 2025-10-12
 */
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import venueData from 'data/venues.json';

interface Venue {
  id: number;
  name: string;
  description: string;
  address: string;
  capacity: number;
  roomCount: number;
  thumbnail: string;
  images: string[];
  details: {
    phone: string;
    email: string;
    operatingHours: string;
    parking: string;
  };
  featured: boolean;
}

export default function VenueEditForm() {
  const { id } = useParams();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
  const [detailPreviews, setDetailPreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const found = (venueData as any).connectWonCenters.find(
      (v: any) => v.id === Number(id)
    );

    if (found) {
      const venueWithImages = {
        ...found,
        images: found.images || []
      };
      setVenue(venueWithImages);
      setThumbnailPreview(venueWithImages.thumbnail);
      setDetailPreviews(venueWithImages.images);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setVenue((prev) => (prev ? { ...prev, [name]: newValue } : prev));
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
      reader.onloadend = () => {
        const result = reader.result as string;
        setThumbnailPreview(result);
        setVenue((prev) => (prev ? { ...prev, thumbnail: result } : prev));
      };
      reader.readAsDataURL(file);
    }
  };

  // 세부 이미지 업로드
  const handleDetailImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const maxImages = 5;

    if (detailPreviews.length + files.length > maxImages) {
      alert(`최대 ${maxImages}장까지 업로드 가능합니다.`);
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
        setVenue((prev) => {
          if (!prev) return prev;
          return { ...prev, images: [...prev.images, result] };
        });
      };
      reader.readAsDataURL(file);
    });
  };

  // 세부 이미지 삭제
  const removeDetailImage = (index: number) => {
    setDetailPreviews(prev => prev.filter((_, i) => i !== index));
    setVenue((prev) => {
      if (!prev) return prev;
      return { ...prev, images: prev.images.filter((_, i) => i !== index) };
    });
  };

  // 드래그 앤 드롭
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter(file =>
      file.type.startsWith('image/')
    );

    if (files.length === 0) return;

    const maxImages = 5;
    if (detailPreviews.length + files.length > maxImages) {
      alert(`최대 ${maxImages}장까지 업로드 가능합니다.`);
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
        setVenue((prev) => {
          if (!prev) return prev;
          return { ...prev, images: [...prev.images, result] };
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('수정된 데이터:', venue);
    alert('지점 정보가 수정되었습니다.');
  };

  if (!venue) return <div className="text-gray-500">지점을 찾을 수 없습니다.</div>;

  return (
    <form onSubmit={handleSubmit} className="bg-white border rounded-lg shadow-sm p-6 space-y-8">
      {/* 기본 정보 */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <i className="ri-information-line mr-2"></i>
          기본 정보
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="지점명" name="name" value={venue.name} onChange={handleChange} />
          <Field label="주소" name="address" value={venue.address} onChange={handleChange} />
          <Field
            label="연락처"
            name="phone"
            value={venue.details.phone}
            onChange={(e) =>
              setVenue((prev) =>
                prev ? { ...prev, details: { ...prev.details, phone: e.target.value } } : prev
              )
            }
          />
          <Field
            label="담당자 이메일"
            name="email"
            value={venue.details.email}
            onChange={(e) =>
              setVenue((prev) =>
                prev ? { ...prev, details: { ...prev.details, email: e.target.value } } : prev
              )
            }
          />
          <Field
            label="운영시간"
            name="operatingHours"
            value={venue.details.operatingHours}
            onChange={(e) =>
              setVenue((prev) =>
                prev
                  ? { ...prev, details: { ...prev.details, operatingHours: e.target.value } }
                  : prev
              )
            }
          />
          <Field
            label="주차 정보"
            name="parking"
            value={venue.details.parking}
            onChange={(e) =>
              setVenue((prev) =>
                prev ? { ...prev, details: { ...prev.details, parking: e.target.value } } : prev
              )
            }
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">지점 설명</label>
          <textarea
            name="description"
            rows={4}
            value={venue.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </section>

      {/* 대표 이미지 업로드 */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <i className="ri-image-line mr-2"></i>
          대표 이미지
        </h3>
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            지점의 메인 이미지를 업로드하세요. (권장: 1920x1080px, 최대 5MB)
          </p>

          <div className="flex items-start gap-4">
            {thumbnailPreview && (
              <div className="relative w-48 h-32 rounded-lg overflow-hidden border-2 border-gray-200">
                <img
                  src={thumbnailPreview}
                  alt="대표 이미지"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">대표</span>
                </div>
              </div>
            )}

            <label className="flex-1 cursor-pointer">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition">
                <i className="ri-upload-cloud-line text-4xl text-gray-400 mb-2 block"></i>
                <p className="text-sm text-gray-600">
                  클릭하거나 파일을 드래그하여 업로드
                </p>
                <p className="text-xs text-gray-500 mt-1">JPG, PNG, WEBP (최대 5MB)</p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </section>

      {/* 세부 이미지 업로드 */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <i className="ri-gallery-line mr-2"></i>
          세부 이미지 ({detailPreviews.length}/5)
        </h3>
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            지점의 세부 사진을 최대 5장까지 업로드하세요. (권장: 1200x800px, 최대 5MB)
          </p>

          {/* 드래그 앤 드롭 영역 */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition ${
              isDragging
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-blue-400'
            } ${detailPreviews.length >= 5 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <label className={detailPreviews.length >= 5 ? 'cursor-not-allowed' : 'cursor-pointer'}>
              <i className="ri-image-add-line text-5xl text-gray-400 mb-3 block"></i>
              <p className="text-gray-700 font-medium mb-1">
                이미지를 드래그하거나 클릭하여 업로드
              </p>
              <p className="text-sm text-gray-500">
                JPG, PNG, WEBP (최대 5MB) • {5 - detailPreviews.length}장 추가 가능
              </p>
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

          {/* 이미지 미리보기 그리드 */}
          {detailPreviews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
              {detailPreviews.map((preview, index) => (
                <div
                  key={index}
                  className="relative group aspect-video rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-500 transition"
                >
                  <img
                    src={preview}
                    alt={`세부 이미지 ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => removeDetailImage(index)}
                      className="opacity-0 group-hover:opacity-100 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition"
                    >
                      <i className="ri-delete-bin-line text-lg"></i>
                    </button>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <span className="bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                      {index + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 기타 설정 */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <i className="ri-settings-3-line mr-2"></i>
          기타 설정
        </h3>
        <div className="flex items-center space-x-2">
          <input
            id="featured"
            name="featured"
            type="checkbox"
            checked={venue.featured}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="featured" className="text-sm text-gray-700">
            대표 지점으로 표시
          </label>
        </div>
      </section>

      {/* 제출 버튼 */}
      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-5 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
        >
          취소
        </button>
        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center"
        >
          <i className="ri-save-line mr-2"></i>
          수정하기
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
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: any) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}
