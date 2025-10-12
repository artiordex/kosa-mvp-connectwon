/**
 * Description : TimeSelection.tsx - 📌 ConnectWon 일정 선택 단계
 * Author : Shiwoo Min
 * Date : 2025-10-13
 */

'use client';

import { useState } from 'react';
import { RoomType } from './ReservationFlow';

export default function TimeSelection({
  room,
  date,
  setDate,
  time,
  setTime,
  duration,
  setDuration,
  onConfirm,
}: {
  room: RoomType;
  date: string;
  setDate: (d: string) => void;
  time: string;
  setTime: (t: string) => void;
  duration: number;
  setDuration: (d: number) => void;
  onConfirm: () => void;
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const timeSlots = Array.from({ length: 13 }, (_, i) => `${(i + 9).toString().padStart(2, '0')}:00`);
  const bookedSlots = ['10:00', '14:00', '15:00'];

  // 캘린더 생성
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // 이전 달의 빈 칸
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // 현재 달의 날짜들
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleDateClick = (day: Date | null) => {
    if (!day) return;
    if (day < today) return;

    const year = day.getFullYear();
    const month = String(day.getMonth() + 1).padStart(2, '0');
    const dateStr = String(day.getDate()).padStart(2, '0');
    setDate(`${year}-${month}-${dateStr}`);
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const isSelected = (day: Date | null) => {
    if (!day || !date) return false;
    return formatDate(day) === date;
  };

  const isPast = (day: Date | null) => {
    if (!day) return false;
    return day < today;
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    const prevMonthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    const today = new Date();
    today.setDate(1);
    if (prevMonthDate >= today) {
      setCurrentMonth(prevMonthDate);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">일정 선택</h2>
        <p className="text-gray-600">{room.name}의 이용 일정을 선택하세요</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* 캘린더 */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <i className="ri-calendar-line mr-2 text-blue-600"></i>
              날짜 선택
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={prevMonth}
                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <i className="ri-arrow-left-s-line text-lg"></i>
              </button>
              <span className="font-semibold text-gray-900 min-w-[100px] text-center">
                {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
              </span>
              <button
                onClick={nextMonth}
                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <i className="ri-arrow-right-s-line text-lg"></i>
              </button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['일', '월', '화', '수', '목', '금', '토'].map((day, idx) => (
                <div
                  key={day}
                  className={`text-center text-xs font-semibold py-2 ${
                    idx === 0 ? 'text-red-500' : idx === 6 ? 'text-blue-500' : 'text-gray-600'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, idx) => {
                const selected = isSelected(day);
                const past = isPast(day);
                const isToday = day && formatDate(day) === formatDate(new Date());

                return (
                  <button
                    key={idx}
                    onClick={() => handleDateClick(day)}
                    disabled={!day || past}
                    className={`h-10 rounded-lg text-sm font-medium transition-all ${
                      !day
                        ? 'invisible'
                        : past
                        ? 'text-gray-300 cursor-not-allowed'
                        : selected
                        ? 'bg-blue-600 text-white shadow-md'
                        : isToday
                        ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                        : 'hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {day && day.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 시간 선택 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <i className="ri-time-line mr-2 text-blue-600"></i>
            시간 선택
          </h3>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이용 시간
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((hour) => (
                <button
                  key={hour}
                  onClick={() => setDuration(hour)}
                  className={`py-2 rounded-lg text-sm font-semibold transition-all ${
                    duration === hour
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {hour}시간
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              시작 시간
            </label>
            <div className="bg-gray-50 rounded-lg p-3 max-h-64 overflow-y-auto">
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => {
                  const isBooked = bookedSlots.includes(slot);
                  const selected = time === slot;

                  return (
                    <button
                      key={slot}
                      onClick={() => !isBooked && setTime(slot)}
                      disabled={isBooked}
                      className={`py-2 rounded-lg text-sm font-semibold transition-all ${
                        selected
                          ? 'bg-blue-600 text-white'
                          : isBooked
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed line-through'
                          : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 선택 정보 미리보기 */}
      <div className="mt-8 bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
          <i className="ri-information-line mr-2 text-blue-600"></i>
          예약 정보 확인
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-600 mb-1">공간</p>
            <p className="font-semibold text-gray-900">{room.name}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">날짜</p>
            <p className="font-semibold text-gray-900">{date || '미선택'}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">시작 시간</p>
            <p className="font-semibold text-gray-900">{time || '미선택'}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">이용 시간</p>
            <p className="font-semibold text-gray-900">{duration}시간</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={onConfirm}
          disabled={!date || !time}
          className={`w-full py-3 rounded-lg font-medium transition-colors ${
            date && time
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          다음 단계로
        </button>
      </div>
    </div>
  );
}
