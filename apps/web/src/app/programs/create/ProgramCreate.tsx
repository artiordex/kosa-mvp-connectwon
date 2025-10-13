/**
 * Description : ProgramCreate.tsx - 📌 프로그램 제안/등록 (오프라인=지점/룸 선택+임시예약)
 * Author : Shiwoo Min (+ offline room flow, Mapo demo, exactOptionalPropertyTypes safe)
 * Date : 2025-10-11
 */

'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';

// ⬇️ 지점/룸 데이터
import roomsByVenue from 'data/rooms-by-venue.json';

// 🔒 로컬스토리지 키
const PROPOSAL_KEY = 'program_proposals';
const RESERVATION_KEY = 'reservations';

// 제안 타입
type ProposalPayload = {
  id: string;
  title: string;
  category: string;
  type: '온라인' | '오프라인' | string;
  location?: string;
  duration: string;
  capacity: number;
  price?: number;
  level?: string;
  description: string;
  requirements?: string;
  materials?: string;
  scheduleISO?: string | null;
  fileName?: string | null;
  fileType?: string | null;
  status: '승인 대기중' | '승인됨' | '반려됨';
  createdAt: string;
};

// 예약 타입(간단 버전)
type ReservationPayload = {
  id: string;
  venue: string;
  room: string;
  date: string; // YYYY-MM-DD
  time: string; // "HH:mm - HH:mm"
  devices: string; // 옵션 미사용: '' 유지
  status: '승인 대기중';
  createdAt: string;
};

export default function ProgramCreatePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    type: '' as '' | '온라인' | '오프라인',

    // 오프라인 전용
    venueId: '' as '' | number | string,
    categoryType: '' as string, // venue 내부 category.type
    roomId: '' as '' | number | string,

    // 공통
    location: '', // 오프라인: venue.name 자동세팅(읽기전용), 온라인: 항상 빈 값
    duration: '',
    capacity: '',
    price: '',
    level: '',
    description: '',
    requirements: '',
    materials: '',
  });

  const [schedule, setSchedule] = useState<Date | null>(null);
  const [proposalFile, setProposalFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const categories = ['교육', '투자', '멘토링', '공모전', '워크샵', '세미나', '네트워킹', '기타'];
  const types: Array<'온라인' | '오프라인'> = ['온라인', '오프라인'];
  const levels = ['초급', '중급', '고급', '전체'];

  const isOnline = useMemo(() => formData.type === '온라인', [formData.type]);

  // venues / categories / rooms 파생값
  const venues = (roomsByVenue as any).venues as Array<{
    id: number; name: string; slug: string; categories: Array<{
      type: string; label: string; rooms: Array<{
        id: number; name: string; capacity: number; status: 'available' | 'occupied'; hourlyRate: number; thumbnail: string;
      }>
    }>
  }>;

  const selectedVenue = useMemo(
    () => venues.find(v => String(v.id) === String(formData.venueId)),
    [venues, formData.venueId]
  );

  const venueCategories = selectedVenue?.categories ?? [];
  const selectedCategory = useMemo(
    () => venueCategories.find(c => c.type === formData.categoryType),
    [venueCategories, formData.categoryType]
  );

  const categoryRooms = selectedCategory?.rooms ?? [];
  const selectedRoom = useMemo(
    () => categoryRooms.find(r => String(r.id) === String(formData.roomId)),
    [categoryRooms, formData.roomId]
  );

  // ⏱️ 유틸: "90분", "120", "1h30m" 등에서 분 단위 추출(라이트 파서)
  const parseDurationToMinutes = (s: string): number => {
    const raw = (s || '').trim();
    if (!raw) return 0;
    const m1 = raw.match(/(\d+)\s*분/);
    if (m1) return Number(m1[1]);
    if (/^\d+$/.test(raw)) return Number(raw);
    const h = raw.match(/(\d+)\s*h/i)?.[1];
    const m = raw.match(/(\d+)\s*m/i)?.[1];
    if (h || m) return (h ? Number(h) * 60 : 0) + (m ? Number(m) : 0);
    return 0;
  };

  const addMinutes = (date: Date, minutes: number) => {
    const d = new Date(date);
    d.setMinutes(d.getMinutes() + minutes);
    return d;
  };

  const hhmm = (d: Date) => `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // 타입 변경: 온라인이면 venue/category/room/location 초기화
    if (name === 'type') {
      const next = value as '' | '온라인' | '오프라인';
      setFormData(prev => ({
        ...prev,
        type: next,
        venueId: next === '오프라인' ? prev.venueId : '',
        categoryType: next === '오프라인' ? prev.categoryType : '',
        roomId: next === '오프라인' ? prev.roomId : '',
        location: next === '온라인' ? '' : (prev.location || ''),
      }));
      return;
    }

    // venue 선택 시: location = venue.name 자동 반영
    if (name === 'venueId') {
      const ven = venues.find(v => String(v.id) === String(value));
      setFormData(prev => ({
        ...prev,
        venueId: value,
        categoryType: '',
        roomId: '',
        location: ven ? ven.name : '',
      }));
      return;
    }

    // venue 내 카테고리 전환 시 room 초기화
    if (name === 'categoryType') {
      setFormData(prev => ({ ...prev, categoryType: value, roomId: '' }));
      return;
    }

    if (name === 'capacity') {
      const onlyDigits = value.replace(/\D+/g, '');
      setFormData(prev => ({ ...prev, capacity: onlyDigits }));
      return;
    }

    if (name === 'price') {
      const onlyDigits = value.replace(/[^\d]/g, '');
      setFormData(prev => ({ ...prev, price: onlyDigits }));
      return;
    }

    if (name === 'roomId') {
      setFormData(prev => ({ ...prev, roomId: value }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;

    const allowed = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'image/png',
      'image/jpeg',
    ];
    if (!allowed.includes(file.type)) {
      alert('PDF, Word, PowerPoint 또는 이미지 파일만 업로드 가능합니다.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('파일 크기는 10MB 이하여야 합니다.');
      return;
    }
    setProposalFile(file);
  };

  const persistList = <T,>(key: string, item: T) => {
    try {
      const raw = localStorage.getItem(key) || '[]';
      const arr = JSON.parse(raw);
      const next = Array.isArray(arr) ? [item, ...arr] : [item];
      localStorage.setItem(key, JSON.stringify(next));
    } catch {
      localStorage.setItem(key, JSON.stringify([item]));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // 필수값 체크
    const missing: string[] = [];

    // 공통 필수
    (['title', 'category', 'type', 'duration', 'capacity', 'description'] as const).forEach(k => {
      const v = formData[k];
      if (!v) missing.push(k);
    });

    // 오프라인 추가 필수
    if (!isOnline) {
      if (!formData.venueId) missing.push('venueId');
      if (!formData.categoryType) missing.push('categoryType');
      if (!formData.roomId) missing.push('roomId');
      if (!selectedRoom) missing.push('room'); // 안전 가드
      if (selectedRoom?.status === 'occupied') missing.push('room(occupied)');
    }

    if (missing.length > 0) {
      alert(`필수 항목을 모두 입력해주세요.\n누락: ${missing.join(', ')}`);
      setStatus('error');
      return;
    }

    try {
      await new Promise(res => setTimeout(res, 500));

      // 제안 저장
      const proposalId = `pp-${Date.now()}`;
      const base: ProposalPayload = {
        id: proposalId,
        title: formData.title,
        category: formData.category,
        type: formData.type,
        duration: formData.duration,
        capacity: Number(formData.capacity),
        description: formData.description,
        scheduleISO: schedule ? new Date(schedule).toISOString() : null,
        fileName: proposalFile?.name ?? null,
        fileType: proposalFile?.type ?? null,
        status: '승인 대기중',
        createdAt: new Date().toISOString(),
      };

      const payload: ProposalPayload = {
        ...base,
        // ⬇️ 옵셔널은 값이 있을 때만 추가
        ...(!isOnline && (selectedVenue?.name || formData.location) ? { location: (selectedVenue?.name || formData.location)! } : {}),
        ...(formData.price ? { price: Number(formData.price) } : {}),
        ...(formData.level ? { level: formData.level } : {}),
        ...(formData.requirements ? { requirements: formData.requirements } : {}),
        ...(formData.materials ? { materials: formData.materials } : {}),
      };

      persistList(PROPOSAL_KEY, payload);

      // 오프라인이면 임시 예약도 생성
      let dateStr = '';
      let timeStr = '';

      if (!isOnline && selectedVenue && selectedRoom) {
        const start = schedule ?? new Date(); // 없으면 지금 시각
        const mins = parseDurationToMinutes(formData.duration) || 60;
        const end = addMinutes(start, mins);

        dateStr = start.toISOString().slice(0, 10);
        timeStr = `${hhmm(start)} - ${hhmm(end)}`;

        const reservationId = `rv-${Date.now()}`;
        const r: ReservationPayload = {
          id: reservationId,
          venue: selectedVenue.name,
          room: selectedRoom.name,
          date: dateStr,
          time: timeStr,
          devices: '',
          status: '승인 대기중',
          createdAt: new Date().toISOString(),
        };
        persistList(RESERVATION_KEY, r);
      } else if (schedule) {
        // 온라인인데 일정이 있으면 표시용으로만 사용
        dateStr = schedule.toISOString().slice(0, 10);
        const end = addMinutes(schedule, parseDurationToMinutes(formData.duration) || 60);
        timeStr = `${hhmm(schedule)} - ${hhmm(end)}`;
      }

      setStatus('success');

      // 폼 리셋
      setFormData({
        title: '',
        category: '',
        type: '',
        venueId: '',
        categoryType: '',
        roomId: '',
        location: '',
        duration: '',
        capacity: '',
        price: '',
        level: '',
        description: '',
        requirements: '',
        materials: '',
      });
      setProposalFile(null);
      setSchedule(null);

      // ✅ 완료 페이지로 이동 (항상 proposalId 사용)
      const q = new URLSearchParams({
        id: proposalId,
        title: payload.title,
        type: payload.type,
        ...(payload.location ? { location: payload.location } : {}),
        ...(dateStr ? { date: dateStr } : {}),
        ...(timeStr ? { time: timeStr } : {}),
      });
      router.push(`/programs/proposals/complete?${q.toString()}`);
    } catch {
      setStatus('error');
    }
  };

  // 💰 요금 미리보기(오프라인)
  const pricePreview = useMemo(() => {
    if (!selectedRoom) return null;
    const mins = parseDurationToMinutes(formData.duration);
    if (!mins) return null;
    const hours = Math.max(1, Math.ceil(mins / 60)); // 30분 단위 과금 등 단순화: 올림
    return selectedRoom.hourlyRate * hours;
  }, [selectedRoom, formData.duration]);

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 제목 */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">새로운 프로그램 제안하기</h1>
          <p className="text-gray-600">
            온라인/오프라인 중 선택하세요. 오프라인은 지점·룸까지 바로 예약 신청됩니다.
          </p>
        </div>

        {status === 'success' && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-8 flex items-start gap-3">
            <i className="ri-checkbox-circle-line text-green-600 text-2xl"></i>
            <div>
              <p className="font-semibold text-green-800">제안이 임시 저장되었습니다!</p>
              <p className="text-sm text-green-700 mt-1">이동 중입니다…</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 space-y-6">
          {/* 프로그램명 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">프로그램명 *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="예: 초보자를 위한 디지털 마케팅 클래스"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 대분류/유형 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">카테고리 *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">선택해주세요</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">유형 *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">선택해주세요</option>
                {types.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 오프라인 전용: 지점 → 공간분류 → 룸 */}
          {!isOnline && (
            <div className="space-y-4">
              {/* 지점 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">지점 *</label>
                <select
                  name="venueId"
                  value={formData.venueId}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">선택해주세요</option>
                  {venues.map(v => (
                    <option key={v.id} value={v.id}>{v.name}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  마포지점을 고르면 해당 지점의 스튜디오/회의실/프로젝트룸을 선택할 수 있어요.
                </p>
              </div>

              {/* 공간 분류 */}
              <div className={`${!selectedVenue ? 'opacity-50 pointer-events-none' : ''}`}>
                <label className="block text-sm font-medium text-gray-700 mb-2">공간 분류 *</label>
                <select
                  name="categoryType"
                  value={formData.categoryType}
                  onChange={handleChange}
                  disabled={!selectedVenue}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">선택해주세요</option>
                  {venueCategories.map(c => (
                    <option key={c.type} value={c.type}>{c.label}</option>
                  ))}
                </select>
              </div>

              {/* 룸 */}
              <div className={`${!selectedCategory ? 'opacity-50 pointer-events-none' : ''}`}>
                <label className="block text-sm font-medium text-gray-700 mb-2">룸 *</label>
                <select
                  name="roomId"
                  value={formData.roomId}
                  onChange={handleChange}
                  disabled={!selectedCategory}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">선택해주세요</option>
                  {categoryRooms.map(r => (
                    <option key={r.id} value={r.id} disabled={r.status === 'occupied'}>
                      {r.name} {r.status === 'occupied' ? '(사용중)' : ''} · 정원 {r.capacity} · 시간당 {r.hourlyRate.toLocaleString()}원
                    </option>
                  ))}
                </select>

                {/* 룸 요약 */}
                {selectedRoom && (
                  <div className="mt-3 flex items-center justify-between rounded-lg border p-3 bg-gray-50">
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedRoom.thumbnail}
                        alt={selectedRoom.name}
                        className="w-16 h-12 object-cover rounded-md border"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{selectedRoom.name}</div>
                        <div className="text-xs text-gray-600">
                          정원 {selectedRoom.capacity} · 시간당 {selectedRoom.hourlyRate.toLocaleString()}원 · {selectedRoom.status === 'available' ? '예약 가능' : '사용중'}
                        </div>
                      </div>
                    </div>
                    {pricePreview !== null && (
                      <div className="text-right">
                        <div className="text-xs text-gray-500">예상 이용료</div>
                        <div className="text-base font-semibold text-gray-900">{pricePreview.toLocaleString()}원</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 지점 표시는 읽기용(온라인은 불필요) */}
          {!isOnline && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">선택된 지점</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                readOnly
                placeholder="지점을 선택하세요"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-gray-50"
              />
            </div>
          )}

          {/* 수업시간/정원/수준 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">수업시간(분) *</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="예: 90분 / 120 / 1h30m"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">정원 *</label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="예: 12"
                min={1}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">수준</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">선택(옵션)</option>
                {levels.map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 희망일정 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">희망일정</label>
            <DatePicker
              selected={schedule}
              onChange={(date) => setSchedule(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              dateFormat="yyyy-MM-dd HH:mm"
              locale={ko}
              placeholderText="날짜와 시간을 선택하세요"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 제안서 업로드 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">제안서 / 기획서 첨부 (선택)</label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept=".pdf,.docx,.pptx,.png,.jpg"
                onChange={handleFileChange}
                className="text-sm text-gray-700 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              />
              {proposalFile && (
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-md border border-gray-200">
                  <span className="text-sm text-gray-800 truncate max-w-[180px]">{proposalFile.name}</span>
                  <button
                    type="button"
                    onClick={() => setProposalFile(null)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              * PDF, Word, PowerPoint 또는 이미지 파일 업로드 가능 (최대 10MB)
            </p>
          </div>

          {/* 설명 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">프로그램 설명 *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              placeholder="프로그램의 목적, 내용, 기대 효과를 구체적으로 작성해주세요."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 준비사항 & 시설 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">준비사항</label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows={3}
                placeholder="참여자가 준비해야 할 사항이 있다면 작성해주세요."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">필요한 재료/시설</label>
              <textarea
                name="materials"
                value={formData.materials}
                onChange={handleChange}
                rows={3}
                placeholder="예: 요가매트, 프로젝터, 재료비 등"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* 제출 */}
          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className={`px-8 py-3 rounded-lg font-medium text-white transition-colors ${
                status === 'submitting'
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {status === 'submitting' ? '제출 중...' : (isOnline ? '프로그램 제안하기' : '제안 + 룸 예약 신청')}
            </button>
            <p className="text-sm text-gray-500 mt-2">
              * 오프라인은 선택한 지점/룸으로 예약 신청이 함께 접수됩니다. (승인 대기중)
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
