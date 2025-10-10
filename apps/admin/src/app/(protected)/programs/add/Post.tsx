/**
 * Description : Post.tsx - ConnectWon 프로그램 게시 등록 페이지
 * Author : Shiwoo Min
 * Date : 2025-10-11
 */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type ProgramType = 'online' | 'offline';

export default function PostProgramPage() {
  const router = useRouter();
  const [programType, setProgramType] = useState<ProgramType>('online');
  const [venue, setVenue] = useState('');
  const [room, setRoom] = useState('');
  const [form, setForm] = useState({
    title: '',
    category: '',
    description: '',
    instructor: '',
    date: '',
    time: '',
    capacity: 0,
    fee: 0,
    link: '',
  });

  const venues = ['ConnectWon 강남지점', 'ConnectWon 마포지점', 'ConnectWon 광명지점'];
  const roomsByVenue: Record<string, string[]> = {
    'ConnectWon 강남지점': ['대회의실', 'SW개발실 A', '세미나실'],
    'ConnectWon 마포지점': ['세미나룸 1', '라운지', '스터디룸'],
    'ConnectWon 광명지점': ['컨퍼런스룸', '소회의실'],
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('등록된 프로그램:', { ...form, programType, venue, room });
    alert(`${programType === 'online' ? '온라인' : '오프라인'} 프로그램이 등록되었습니다!`);
    router.push('/programs'); // 등록 후 메인으로 이동
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          <i className="ri-edit-2-line mr-2 text-blue-600"></i>
          프로그램 게시
        </h1>
        <button
          onClick={() => router.back()}
          className="text-gray-500 hover:text-gray-800 transition flex items-center gap-1"
        >
          <i className="ri-arrow-go-back-line"></i> 돌아가기
        </button>
      </div>

      {/* 유형 선택 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">프로그램 유형</label>
        <div className="flex gap-4">
          {['online', 'offline'].map(type => (
            <button
              key={type}
              type="button"
              onClick={() => setProgramType(type as ProgramType)}
              className={`px-6 py-2 rounded-md font-medium ${
                programType === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <i
                className={`${type === 'online' ? 'ri-global-line' : 'ri-building-line'} mr-2`}
              ></i>
              {type === 'online' ? '온라인' : '오프라인'}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">프로그램명</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="예: React 실무 프로젝트"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">분류</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">선택</option>
              <option value="교육">교육</option>
              <option value="멘토링">멘토링</option>
              <option value="투자">투자</option>
              <option value="공모전">공모전</option>
            </select>
          </div>

          {programType === 'offline' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">지점 선택</label>
              <select
                value={venue}
                onChange={(e) => {
                  setVenue(e.target.value);
                  setRoom('');
                }}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">지점을 선택하세요</option>
                {venues.map((v) => (
                  <option key={v} value={v}>
                    {v.replace('ConnectWon ', '')}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* 룸 선택 */}
        {programType === 'offline' && venue && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">룸 선택</label>
            <select
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">룸을 선택하세요</option>
              {roomsByVenue[venue]?.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* 날짜/시간/정원 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">날짜</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">시간</label>
            <input
              name="time"
              placeholder="예: 13:00 - 17:00"
              value={form.time}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">참가정원</label>
            <input
              type="number"
              name="capacity"
              value={form.capacity}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="예: 50"
            />
          </div>
        </div>

        {/* 링크 or 참가비 */}
        {programType === 'online' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">참여 링크</label>
            <input
              name="link"
              value={form.link}
              onChange={handleChange}
              placeholder="https://zoom.us/..."
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">참가비 (원)</label>
            <input
              type="number"
              name="fee"
              value={form.fee}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="0 = 무료"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">상세 설명</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="프로그램 내용을 입력하세요..."
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            게시하기
          </button>
        </div>
      </form>
    </div>
  );
}
