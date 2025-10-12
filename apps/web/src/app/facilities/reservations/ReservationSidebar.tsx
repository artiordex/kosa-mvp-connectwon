/**
 * Description : ReservationSidebar.tsx - 📌 예약 진행 상태 및 요약 패널 (썸네일 이미지 포함 + 안정적 fallback)
 * Author : Shiwoo Min
 * Date : 2025-10-13
 */

'use client';

import React from 'react';
import type { EquipmentType, RoomType, VenueType } from './ReservationFlow';

interface ReservationSidebarProps {
  steps: { label: string; step: number; icon: string }[];
  currentStep: number;
  selectedVenue?: VenueType | null;
  selectedRoom?: RoomType | null;
  selectedDate?: string;
  selectedTime?: string;
  duration?: number;
  selectedEquipment: { id: number; quantity: number }[];
  equipment: EquipmentType[];
  totalCost: number;
  totalEquipmentCost: number;
}

// DiceBear 기본 이미지 (svg)
const getDefaultImage = (title: string) => {
  const seed = encodeURIComponent(title);
  return `https://api.dicebear.com/7.x/shapes/svg?seed=${seed}`;
};

export default function ReservationSidebar({
  steps,
  currentStep,
  selectedVenue,
  selectedRoom,
  selectedDate,
  selectedTime,
  duration = 1,
  selectedEquipment,
  equipment,
  totalCost,
  totalEquipmentCost,
}: ReservationSidebarProps) {
  const selectedEquipDetails = selectedEquipment
    .map((e) => {
      const found = equipment.find((eq) => eq.id === e.id);
      return found ? { ...found, quantity: e.quantity } : null;
    })
    .filter(Boolean) as (EquipmentType & { quantity: number })[];

  return (
    <aside className="bg-white rounded-2xl shadow-md p-6 sticky top-8 transition-all">
      {/* 헤더 */}
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <i className="ri-calendar-check-line text-blue-600 mr-2 text-2xl"></i>
        예약 진행 현황
      </h2>

      {/* 단계 표시 */}
      <div className="space-y-7 mb-10">
        {steps.map((item, idx) => {
          const isActive = currentStep === item.step;
          const isCompleted = currentStep > item.step;
          return (
            <div key={item.step} className="relative pl-12">
              {idx < steps.length - 1 && (
                <div
                  className={`absolute left-[22px] top-10 w-0.5 h-10 ${
                    isCompleted ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                ></div>
              )}
              <div
                className={`absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 transition-all duration-300 ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-4 ring-blue-100'
                    : isCompleted
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-gray-100 text-gray-400 border-gray-200'
                }`}
              >
                {isCompleted ? (
                  <i className="ri-check-line"></i>
                ) : (
                  <i className={item.icon}></i>
                )}
              </div>

              <div className="flex flex-col">
                <p
                  className={`font-semibold ${
                    isActive
                      ? 'text-blue-600'
                      : isCompleted
                      ? 'text-gray-900'
                      : 'text-gray-400'
                  }`}
                >
                  {item.label}
                </p>
                {isActive && (
                  <span className="text-xs text-blue-500 mt-1">진행 중</span>
                )}
                {isCompleted && (
                  <span className="text-xs text-green-600 mt-1">완료</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <hr className="my-6 border-gray-200" />

      {/* 요약 정보 + 이미지 */}
      <div className="space-y-6">
        {/* 지점 */}
        {selectedVenue && (
          <div className="flex items-center space-x-3">
            <img
              src={
                !selectedVenue.thumbnail || selectedVenue.thumbnail.trim() === ''
                  ? getDefaultImage(selectedVenue.name)
                  : selectedVenue.thumbnail
              }
              alt={selectedVenue.name}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  getDefaultImage(selectedVenue.name);
              }}
              className="w-14 h-14 rounded-lg object-cover border border-gray-200"
            />
            <div>
              <p className="text-sm text-gray-500 mb-0.5 flex items-center">
                <i className="ri-map-pin-line mr-1 text-blue-600"></i> 지점
              </p>
              <p className="font-semibold text-gray-900">
                {selectedVenue.name}
              </p>
            </div>
          </div>
        )}

        {/* 공간 */}
        {selectedRoom && (
          <div className="flex items-center space-x-3">
            <img
              src={
                !selectedRoom.thumbnail || selectedRoom.thumbnail.trim() === ''
                  ? getDefaultImage(selectedRoom.name)
                  : selectedRoom.thumbnail
              }
              alt={selectedRoom.name}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  getDefaultImage(selectedRoom.name);
              }}
              className="w-14 h-14 rounded-lg object-cover border border-gray-200"
            />
            <div>
              <p className="text-sm text-gray-500 mb-0.5 flex items-center">
                <i className="ri-door-line mr-1 text-blue-600"></i> 공간
              </p>
              <p className="font-semibold text-gray-900">
                {selectedRoom.name}
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                최대 {selectedRoom.capacity}명
              </p>
            </div>
          </div>
        )}

        {/* 일정 */}
        {selectedDate && selectedTime && (
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-blue-50 text-blue-600 text-xl">
              <i className="ri-time-line"></i>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-0.5 flex items-center">
                <i className="ri-calendar-line mr-1 text-blue-600"></i> 일정
              </p>
              <p className="font-semibold text-gray-900">{selectedDate}</p>
              <p className="text-xs text-gray-600 mt-0.5">
                {selectedTime} ({duration}시간)
              </p>
            </div>
          </div>
        )}

        {/* 장비 */}
        {selectedEquipDetails.length > 0 && (
          <div>
            <p className="text-sm text-gray-500 mb-2 flex items-center">
              <i className="ri-tools-line mr-1 text-blue-600"></i> 장비
            </p>
            <div className="grid grid-cols-2 gap-3">
              {selectedEquipDetails.map((eq) => (
                <div
                  key={eq.id}
                  className="flex items-center space-x-2 border border-gray-200 rounded-lg p-2 bg-gray-50"
                >
                  <img
                    src={
                      !eq.thumbnail || eq.thumbnail.trim() === ''
                        ? getDefaultImage(eq.name)
                        : eq.thumbnail
                    }
                    alt={eq.name}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        getDefaultImage(eq.name);
                    }}
                    className="w-10 h-10 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-xs text-gray-800 font-medium truncate">
                      {eq.name}
                    </p>
                    <p className="text-xs text-blue-600 font-semibold">
                      x{eq.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 금액 */}
      <div className="pt-8 mt-6 border-t border-gray-200 space-y-3">
        {totalEquipmentCost > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">장비 대여</span>
            <span className="font-medium">
              {totalEquipmentCost.toLocaleString()}원
            </span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">공간 대여</span>
          <span className="font-medium">무료</span>
        </div>

        <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
          <span className="font-semibold text-gray-900">총 금액</span>
          <span className="font-bold text-blue-600 text-2xl">
            {totalCost === 0 ? '무료' : `${totalCost.toLocaleString()}원`}
          </span>
        </div>
      </div>
    </aside>
  );
}
