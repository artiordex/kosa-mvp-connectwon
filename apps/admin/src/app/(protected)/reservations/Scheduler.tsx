'use client';

import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, isSameDay } from 'date-fns';
import { ko } from 'date-fns/locale';

interface ScheduleItem {
  id: number;
  title: string;
  date: string; // YYYY-MM-DD
  time: string;
  type: '공간' | '프로그램';
  branch: string;
  room: string;
  status: '예약' | '가용' | '마감';
  color: string;
}

const mockSchedules: ScheduleItem[] = [
  {
    id: 1,
    title: 'React 실무 교육',
    date: '2025-10-12',
    time: '10:00~13:00',
    type: '프로그램',
    branch: '강남지점',
    room: 'SW실 A',
    status: '예약',
    color: 'bg-blue-500',
  },
  {
    id: 2,
    title: '회의실 예약',
    date: '2025-10-12',
    time: '14:00~16:00',
    type: '공간',
    branch: '마포지점',
    room: '대회의실',
    status: '예약',
    color: 'bg-green-500',
  },
  {
    id: 3,
    title: 'AI 세미나',
    date: '2025-10-13',
    time: '15:00~17:00',
    type: '프로그램',
    branch: '강남지점',
    room: '세미나실',
    status: '예약',
    color: 'bg-blue-600',
  },
  {
    id: 4,
    title: '장비 점검',
    date: '2025-10-14',
    time: '09:00~11:00',
    type: '공간',
    branch: '부산지점',
    room: '장비실',
    status: '마감',
    color: 'bg-red-500',
  },
];

export default function Scheduler() {
  const [selectedBranch, setSelectedBranch] = useState('전체');
  const [selectedRoom, setSelectedRoom] = useState('전체');
  const [currentMonth, setCurrentMonth] = useState(new Date('2025-10-01'));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const filteredSchedules = mockSchedules.filter(
    (s) =>
      (selectedBranch === '전체' || s.branch === selectedBranch) &&
      (selectedRoom === '전체' || s.room === selectedRoom)
  );

  const getSchedulesByDate = (date: Date) =>
    filteredSchedules.filter((s) => isSameDay(new Date(s.date), date));

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">스케줄러 예약 현황</h2>
          <p className="text-sm text-gray-600 mt-1">
            지점 및 룸별 예약 가능 현황을 달력으로 확인하세요.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            <i className="ri-arrow-left-s-line"></i>
          </button>
          <span className="font-semibold text-gray-700 w-28 text-center">
            {format(currentMonth, 'yyyy년 M월', { locale: ko })}
          </span>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            <i className="ri-arrow-right-s-line"></i>
          </button>
        </div>
      </div>

      {/* 필터 */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
        >
          <option value="전체">전체 지점</option>
          <option value="강남지점">강남지점</option>
          <option value="마포지점">마포지점</option>
          <option value="부산지점">부산지점</option>
        </select>

        <select
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
        >
          <option value="전체">전체 룸</option>
          <option value="SW실 A">SW실 A</option>
          <option value="세미나실">세미나실</option>
          <option value="대회의실">대회의실</option>
          <option value="장비실">장비실</option>
        </select>
      </div>

      {/* 캘린더 */}
      <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-gray-600 mb-2">
        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {daysInMonth.map((date) => {
          const daily = getSchedulesByDate(date);
          const isToday = isSameDay(date, new Date());
          const isSelected = selectedDate && isSameDay(date, selectedDate);

          return (
            <div
              key={date.toISOString()}
              onClick={() => setSelectedDate(date)}
              className={`h-28 border rounded-md p-1 text-xs text-gray-700 cursor-pointer relative transition-all
                ${isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'hover:bg-gray-50'}
              `}
            >
              <div
                className={`absolute top-1 right-1 text-[11px] font-semibold ${
                  isToday ? 'text-blue-600' : 'text-gray-500'
                }`}
              >
                {format(date, 'd')}
              </div>

              <div className="mt-5 space-y-1 overflow-y-auto max-h-[70px] scrollbar-thin scrollbar-thumb-gray-300">
                {daily.length > 0 ? (
                  daily.map((item) => (
                    <div
                      key={item.id}
                      className={`truncate text-white text-[11px] px-2 py-1 rounded ${item.color} shadow-sm`}
                      title={`${item.title} (${item.time}) - ${item.room}`}
                    >
                      {item.title}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-300 text-[10px] mt-3">가용</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 선택된 날짜 상세 */}
      {selectedDate && (
        <div className="mt-6 border-t pt-4">
          <h3 className="font-semibold text-gray-900 mb-2">
            {format(selectedDate, 'yyyy년 M월 d일', { locale: ko })} 예약 현황
          </h3>
          {getSchedulesByDate(selectedDate).length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {getSchedulesByDate(selectedDate).map((item) => (
                <li key={item.id} className="py-2 flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-900">{item.title}</div>
                    <div className="text-sm text-gray-600">
                      {item.time} · {item.branch} / {item.room}
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      item.status === '예약'
                        ? 'bg-blue-100 text-blue-700'
                        : item.status === '가용'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {item.status}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">예약이 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
}
