/**
 * Description : ReservationFlow.tsx - 📌 ConnectWon 공간 예약 플로우 메인 (요약 패널·이미지 지원)
 * Author : Shiwoo Min
 * Date : 2025-10-13
 */

'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import roomData from 'data/rooms-by-venue.json';
import equipmentData from 'data/equipment-with-venues.json';
import venueData from 'data/venues.json';
import ReservationSidebar from './ReservationSidebar';
import VenueSelection from './VenueSelection';
import RoomSelection from './RoomSelection';
import TimeSelection from './TimeSelection';
import EquipmentSelection from './EquipmentSelection';

// 타입 정의
export interface RoomType {
  id: number;
  name: string;
  capacity: number;
  status: string;
  hourlyRate: number;
  thumbnail: string;
}

export interface CategoryType {
  type: string;
  label: string;
  rooms: RoomType[];
}

export interface VenueType {
  id: number;
  name: string;
  slug: string;
  address?: string;
  description?: string;
  capacity?: number;
  roomCount?: number;
  rating?: number;
  reviewCount?: number;
  status?: string;
  featured?: boolean;
  tags?: string[];
  thumbnail?: string;
  images?: string[];
  details?: {
    centerName: string;
    location: string;
    capacityArea: string;
    independentRooms: string;
    features: string[];
    phone: string;
    email: string;
    operatingHours: string;
    parking: string;
    transportation: string[];
  };
  categories?: CategoryType[];
}

export interface EquipmentType {
  id: number;
  name: string;
  category: string;
  brand: string;
  model: string;
  rentalPrice: number;
  depositPrice: number;
  status: string;
  thumbnail: string;
  venueId: number;
  venueName: string;
  quantity: number;
  availableQuantity: number;
}

const getDefaultImage = (title: string) => {
  const seed = encodeURIComponent(title);
  return `https://api.dicebear.com/7.x/shapes/svg?seed=${seed}`;
};

export default function ReservationFlow() {
  const router = useRouter();

  // 데이터 로드
  const venues: VenueType[] = (venueData as any).connectWonCenters || [];
  const rooms: { id: number; categories: CategoryType[] }[] = (roomData as any).venues || [];
  const equipment: EquipmentType[] = equipmentData as EquipmentType[];

  // 상태 관리
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedVenueId, setSelectedVenueId] = useState<number | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState(1);
  const [selectedEquipment, setSelectedEquipment] = useState<{ id: number; quantity: number }[]>([]);

  // ref (각 섹션으로 스크롤 이동)
  const roomRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);
  const equipmentRef = useRef<HTMLDivElement>(null);

  // 현재 선택된 지점 및 관련 데이터
  const currentVenue = venues.find((v) => v.id === selectedVenueId);
  const venueRooms = rooms.find((r) => r.id === selectedVenueId);

  const availableEquipment = equipment
    .filter((e) => e.venueId === selectedVenueId && e.status === 'active')
    .map((e) => ({
      ...e,
      thumbnail:
        e.thumbnail && e.thumbnail.trim() !== ''
          ? e.thumbnail
          : getDefaultImage(e.name),
    }));

  // 단계 목록
  const steps = [
    { label: '지점 선택', step: 1, icon: 'ri-map-pin-line' },
    { label: '공간 선택', step: 2, icon: 'ri-door-line' },
    { label: '일정 선택', step: 3, icon: 'ri-calendar-line' },
    { label: '장비 선택', step: 4, icon: 'ri-tools-line' },
  ];

  // 핸들러
  const handleVenueSelect = (venueId: number) => {
    setSelectedVenueId(venueId);
    setSelectedRoom(null);
    setSelectedEquipment([]);
    setCurrentStep(2);
    setTimeout(() => roomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleRoomSelect = (room: RoomType) => {
    setSelectedRoom(room);
    setCurrentStep(3);
    setTimeout(() => timeRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleTimeConfirm = () => {
    if (!selectedDate || !selectedTime) {
      alert('날짜와 시간을 모두 선택해주세요.');
      return;
    }
    setCurrentStep(4);
    setTimeout(() => equipmentRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleEquipmentToggle = (equipId: number) => {
    setSelectedEquipment((prev) => {
      const exists = prev.find((e) => e.id === equipId);
      return exists
        ? prev.filter((e) => e.id !== equipId)
        : [...prev, { id: equipId, quantity: 1 }];
    });
  };

  const handleEquipmentQuantityChange = (equipId: number, quantity: number) => {
    setSelectedEquipment((prev) =>
      prev.map((e) => (e.id === equipId ? { ...e, quantity } : e))
    );
  };

  const handleReservationComplete = () => {
  if (!currentVenue || !selectedRoom || !selectedDate || !selectedTime) {
    alert('지점, 공간, 일정이 모두 선택되어야 합니다.');
    return;
  }

    const startHour = parseInt(selectedTime.split(':')[0] || '0');
    const endHour = startHour + duration;
    const timeRange = `${selectedTime} - ${endHour.toString().padStart(2, '0')}:00`;

    const equipmentSummary = selectedEquipment
      .map((e) => {
        const eq = equipment.find((item) => item.id === e.id);
        return `${eq?.name} x${e.quantity}`;
      })
      .join(', ');

    const reservationId = `RES-${Date.now()}`;

    const queryParams = new URLSearchParams({
      id: reservationId,
      venue: currentVenue.name,
      room: selectedRoom.name,
      date: selectedDate,
      time: timeRange,
      devices: equipmentSummary || '',
      cost: totalCost.toString(),
    });

    router.push(`/facilities/reservations/complete?${queryParams.toString()}`);
  };

  // 금액 계산
  const totalEquipmentCost = selectedEquipment.reduce((sum, e) => {
    const equip = equipment.find((eq) => eq.id === e.id);
    return sum + (equip?.rentalPrice || 0) * e.quantity;
  }, 0);

  const totalRoomCost = (selectedRoom?.hourlyRate || 0) * duration;
  const totalCost = totalRoomCost + totalEquipmentCost;

  // venueRooms + currentVenue 병합
  const mergedVenue: VenueType | null =
    currentVenue && venueRooms
      ? {
          ...currentVenue,
          categories: venueRooms.categories.map((cat) => ({
            ...cat,
            rooms: cat.rooms.map((room) => ({
              ...room,
              thumbnail:
                room.thumbnail && room.thumbnail.trim() !== ''
                  ? room.thumbnail
                  : getDefaultImage(room.name),
            })),
          })),
        }
      : currentVenue
      ? { ...currentVenue, categories: [] }
      : null;

  // 렌더링
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-[80%] mx-auto px-8">
        <div className="grid lg:grid-cols-[8fr_2.5fr] gap-10">
          {/* 왼쪽: 메인 플로우 단계 */}
          <div className="space-y-10">
            <VenueSelection
              venues={venues}
              selectedVenueId={selectedVenueId}
              onSelect={handleVenueSelect}
            />

            {currentStep >= 2 && mergedVenue && (
              <div ref={roomRef}>
                <RoomSelection
                  venue={mergedVenue}
                  selectedRoom={selectedRoom}
                  onSelect={handleRoomSelect}
                />
              </div>
            )}

            {currentStep >= 3 && selectedRoom && (
              <div ref={timeRef}>
                <TimeSelection
                  room={selectedRoom}
                  date={selectedDate}
                  setDate={setSelectedDate}
                  time={selectedTime}
                  setTime={setSelectedTime}
                  duration={duration}
                  setDuration={setDuration}
                  onConfirm={handleTimeConfirm}
                />
              </div>
            )}

            {currentStep >= 4 && (
              <div ref={equipmentRef}>
                <EquipmentSelection
                  equipment={availableEquipment}
                  selected={selectedEquipment}
                  onToggle={handleEquipmentToggle}
                  onQuantityChange={handleEquipmentQuantityChange}
                  onComplete={handleReservationComplete}
                />
              </div>
            )}
          </div>

          {/* 오른쪽: 예약 요약 사이드바 */}
          <div className="w-full">
            <ReservationSidebar
              steps={steps}
              currentStep={currentStep}
              selectedVenue={currentVenue ?? null}
              selectedRoom={selectedRoom ?? null}
              selectedDate={selectedDate || ''}
              selectedTime={selectedTime || ''}
              duration={duration}
              selectedEquipment={selectedEquipment}
              equipment={equipment}
              totalCost={totalCost}
              totalEquipmentCost={totalEquipmentCost}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
