/**
 * Description : RoomDetail.tsx - 📌 룸 상세 정보 페이지
 * Author : Shiwoo Min
 * Date : 2025-10-12
 * Path: /facilities/rooms/[id]
 */
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import roomsData from 'data/rooms-by-venue.json';

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
  rating: number;
  reviewCount: number;
  bookingCount: number;
  createdAt: string;
  updatedAt: string;
}

export default function RoomDetail() {
  const params = useParams();
  const roomId = Number(params?.['id']);
  const [room, setRoom] = useState<Room | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [lightboxOpen, setLightboxOpen] = useState(false);

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
            features: room.features || {
              hasProjector: false,
              hasWhiteboard: false,
              hasVideoConference: false,
              isAccessible: false,
              allowsFood: false,
              hasParking: false
            },
            location: room.location || { floor: room.floor || 0, roomNumber: '', zone: '' },
            contact: room.contact || { manager: '', phone: '', email: '' },
            operatingHours: room.operatingHours || { weekday: '', weekend: '', holidays: '' },
            bookingRules: room.bookingRules || {
              minBookingHours: 0,
              maxBookingHours: 0,
              advanceBookingDays: 0,
              cancellationPolicy: '',
              cleaningFee: 0,
              overtimeFee: 0
            },
            rating: room.rating || 0,
            reviewCount: room.reviewCount || 0,
            bookingCount: room.bookingCount || 0,
            createdAt: room.createdAt || new Date().toISOString(),
            updatedAt: room.updatedAt || new Date().toISOString()
          };
          break;
        }
      }
      if (foundRoom) break;
    }

    if (foundRoom) {
      setRoom(foundRoom);
      setSelectedImage(foundRoom.thumbnail);
    }
  }, [roomId]);

  const openLightbox = (image: string) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };

  if (!room) {
    return (
      <div className="text-center text-gray-600 py-20">
        <i className="ri-error-warning-line text-4xl text-gray-400 mb-2 block" />
        해당 룸을 찾을 수 없습니다.
      </div>
    );
  }

  const allImages = [room.thumbnail, ...(room.images || [])];

  return (
    <div className="space-y-8">
      {/* 헤더 */}
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <Link href="/facilities/rooms" className="hover:text-blue-600">
              룸 관리
            </Link>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-gray-900 font-medium">{room.name}</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{room.name}</h1>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-sm text-gray-600">
              <i className="ri-user-line mr-1"></i>
              최대 {room.capacity}명
            </span>
            {room.area && (
              <span className="text-sm text-gray-600">
                <i className="ri-layout-line mr-1"></i>
                {room.area}
              </span>
            )}
            <span className={`text-sm px-2 py-1 rounded ${
              room.status === 'available'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}>
              {room.status === 'available' ? '예약 가능' : '사용중'}
            </span>
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => history.back()}
            className="text-sm px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
          >
            <i className="ri-arrow-left-line mr-1"></i> 목록으로
          </button>
          <Link
            href={`/facilities/rooms/${roomId}/edit`}
            className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <i className="ri-edit-line mr-1"></i> 수정하기
          </Link>
        </div>
      </div>

      {/* 이미지 갤러리 */}
      <section className="bg-white border rounded-lg shadow-sm overflow-hidden">
        <div className="relative">
          <img
            src={selectedImage}
            alt={room.name}
            className="w-full h-96 object-cover cursor-pointer"
            onClick={() => openLightbox(selectedImage)}
          />
          <button
            onClick={() => openLightbox(selectedImage)}
            className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-2 rounded-lg hover:bg-opacity-70"
          >
            <i className="ri-fullscreen-line mr-2"></i>
            전체보기
          </button>
        </div>

        {allImages.length > 1 && (
          <div className="p-4 bg-gray-50">
            <div className="flex gap-3 overflow-x-auto pb-2">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`flex-shrink-0 w-24 h-20 rounded-lg overflow-hidden border-2 transition ${
                    selectedImage === image
                      ? 'border-blue-600 ring-2 ring-blue-200'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${room.name} - ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 기본 정보 */}
      <section className="bg-white border rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <i className="ri-information-line mr-2"></i>
          기본 정보
        </h2>
        {room.description && <p className="text-gray-700 mb-6">{room.description}</p>}

        <div className="grid sm:grid-cols-2 gap-4">
          <InfoItem label="수용 인원" value={`${room.capacity}명`} />
          {room.area && <InfoItem label="면적" value={room.area} />}
          {room.location?.floor && (
            <InfoItem
              label="위치"
              value={`${room.location.floor}층 ${room.location.roomNumber || ''}${room.location.zone ? ` (${room.location.zone})` : ''}`}
            />
          )}
          {room.rating > 0 && (
            <InfoItem label="평점" value={`⭐ ${room.rating.toFixed(1)} (리뷰 ${room.reviewCount}개)`} />
          )}
          {room.bookingCount > 0 && <InfoItem label="총 예약" value={`${room.bookingCount}회`} />}
          {room.contact?.manager && (
            <InfoItem label="담당자" value={`${room.contact.manager} (${room.contact.phone})`} />
          )}
        </div>
      </section>

      {/* 요금 정보 */}
      {room.hourlyRate > 0 && (
        <section className="bg-white border rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <i className="ri-price-tag-3-line mr-2"></i>
            요금 정보
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">평일 시간당</p>
              <p className="text-2xl font-bold text-blue-600">{room.hourlyRate.toLocaleString()}원</p>
            </div>
            {room.weekendRate > 0 && (
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">주말 시간당</p>
                <p className="text-2xl font-bold text-purple-600">{room.weekendRate.toLocaleString()}원</p>
              </div>
            )}
            {room.bookingRules?.cleaningFee > 0 && (
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">청소비</p>
                <p className="text-2xl font-bold text-green-600">{room.bookingRules.cleaningFee.toLocaleString()}원</p>
              </div>
            )}
            {room.bookingRules?.overtimeFee > 0 && (
              <div className="p-4 bg-red-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">초과 요금</p>
                <p className="text-2xl font-bold text-red-600">{room.bookingRules.overtimeFee.toLocaleString()}원</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 운영 시간 */}
      {room.operatingHours?.weekday && (
        <section className="bg-white border rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <i className="ri-time-line mr-2"></i>
            운영 시간
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">평일</span>
              <span className="font-medium text-gray-900">{room.operatingHours.weekday}</span>
            </div>
            {room.operatingHours.weekend && (
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">주말</span>
                <span className="font-medium text-gray-900">{room.operatingHours.weekend}</span>
              </div>
            )}
            {room.operatingHours.holidays && (
              <div className="flex justify-between py-2">
                <span className="text-gray-600">공휴일</span>
                <span className="font-medium text-gray-900">{room.operatingHours.holidays}</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 예약 규칙 */}
      {room.bookingRules?.minBookingHours > 0 && (
        <section className="bg-white border rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <i className="ri-calendar-check-line mr-2"></i>
            예약 규칙
          </h2>
          <div className="space-y-3">
            <RuleItem
              icon="ri-timer-line"
              label="최소 예약 시간"
              value={`${room.bookingRules.minBookingHours}시간`}
            />
            {room.bookingRules.maxBookingHours > 0 && (
              <RuleItem
                icon="ri-timer-flash-line"
                label="최대 예약 시간"
                value={`${room.bookingRules.maxBookingHours}시간`}
              />
            )}
            {room.bookingRules.advanceBookingDays > 0 && (
              <RuleItem
                icon="ri-calendar-line"
                label="사전 예약"
                value={`최대 ${room.bookingRules.advanceBookingDays}일 전`}
              />
            )}
            {room.bookingRules.cancellationPolicy && (
              <RuleItem
                icon="ri-refund-line"
                label="취소 정책"
                value={room.bookingRules.cancellationPolicy}
              />
            )}
          </div>
        </section>
      )}

      {/* 시설 및 편의사항 */}
      {(room.facilities.length > 0 || room.amenities.length > 0) && (
        <div className="grid md:grid-cols-2 gap-6">
          {room.facilities.length > 0 && (
            <section className="bg-white border rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <i className="ri-tools-line mr-2"></i>
                보유 시설
              </h2>
              <ul className="space-y-2">
                {room.facilities.map((item, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <i className="ri-check-line text-green-600 mr-2"></i>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {room.amenities.length > 0 && (
            <section className="bg-white border rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <i className="ri-service-line mr-2"></i>
                편의사항
              </h2>
              <ul className="space-y-2">
                {room.amenities.map((item, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <i className="ri-check-line text-blue-600 mr-2"></i>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}

      {/* 특징 */}
      {(room.tags.length > 0 || room.features) && (
        <section className="bg-white border rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <i className="ri-star-line mr-2"></i>
            주요 특징
          </h2>
          {room.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {room.tags.map((tag, idx) => (
                <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          )}
          {room.features && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <FeatureBadge
                icon="ri-projector-line"
                label="프로젝터"
                active={room.features.hasProjector}
              />
              <FeatureBadge
                icon="ri-artboard-line"
                label="화이트보드"
                active={room.features.hasWhiteboard}
              />
              <FeatureBadge
                icon="ri-vidicon-line"
                label="화상회의"
                active={room.features.hasVideoConference}
              />
              <FeatureBadge
                icon="ri-wheelchair-line"
                label="휠체어 접근"
                active={room.features.isAccessible}
              />
              <FeatureBadge
                icon="ri-restaurant-line"
                label="음식 허용"
                active={room.features.allowsFood}
              />
              <FeatureBadge
                icon="ri-parking-line"
                label="주차 가능"
                active={room.features.hasParking}
              />
            </div>
          )}
        </section>
      )}

      {/* 메타 정보 */}
      {room.createdAt && (
        <div className="border-t pt-4 text-sm text-gray-500">
          <p>
            등록일: {new Date(room.createdAt).toLocaleDateString()}
            {room.updatedAt && ` / 최근 업데이트: ${new Date(room.updatedAt).toLocaleDateString()}`}
          </p>
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300"
          >
            <i className="ri-close-line"></i>
          </button>
          <div className="max-w-6xl w-full">
            <img src={selectedImage} alt={room.name} className="w-full h-auto max-h-[85vh] object-contain" onClick={(e) => e.stopPropagation()} />
            {allImages.length > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(image);
                    }}
                    className={`w-16 h-12 rounded overflow-hidden border-2 transition ${
                      selectedImage === image
                        ? 'border-white'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-900">{value}</p>
    </div>
  );
}

function RuleItem({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-start">
      <i className={`${icon} text-blue-600 mr-3 mt-1`}></i>
      <div className="flex-1">
        <p className="text-sm text-gray-600">{label}</p>
        <p className="font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function FeatureBadge({ icon, label, active }: { icon: string; label: string; active: boolean }) {
  return (
    <div className={`flex items-center p-3 rounded-lg border-2 ${
      active
        ? 'border-green-500 bg-green-50 text-green-700'
        : 'border-gray-300 bg-gray-50 text-gray-400'
    }`}>
      <i className={`${icon} text-xl mr-2`}></i>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
