/**
 * Description : ProgramCreate.tsx - 📌 프로그램 제안/등록 섹션 (제안서 업로드 + 캘린더)
 * Author : Shiwoo Min
 * Date : 2025-10-11
 */

'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';

export default function ProgramCreatePage() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    type: '',
    location: '',
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
  const types = ['온라인', '오프라인'];
  const levels = ['초급', '중급', '고급', '전체'];
  const locations = ['강남센터', '마포센터', '광명센터'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const required = ['title', 'category', 'type', 'location', 'duration', 'capacity', 'description'];
    const missing = required.filter(key => !formData[key as keyof typeof formData]);

    if (missing.length > 0) {
      alert('필수 항목을 모두 입력해주세요.');
      setStatus('error');
      return;
    }

    try {
      await new Promise(res => setTimeout(res, 1500));
      setStatus('success');
      setFormData({
        title: '',
        category: '',
        type: '',
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
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 제목 */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">새로운 프로그램 제안하기</h1>
          <p className="text-gray-600">
            크리에이터 전용 기능입니다. 새로운 프로그램을 제안하고, ConnectWon과 함께 만들어보세요.
          </p>
        </div>

        {status === 'success' && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-8 flex items-start gap-3">
            <i className="ri-checkbox-circle-line text-green-600 text-2xl"></i>
            <div>
              <p className="font-semibold text-green-800">제안이 성공적으로 제출되었습니다!</p>
              <p className="text-sm text-green-700 mt-1">관리자 검토 후 승인 여부를 알려드립니다. (3~5일 소요)</p>
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

          {/* 분류 */}
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

          {/* 지점/시간/정원 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">지점 *</label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">선택해주세요</option>
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">수업시간 *</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="예: 90분"
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
                min="1"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* 희망일정 (캘린더 적용) */}
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
              {status === 'submitting' ? '제출 중...' : '프로그램 제안하기'}
            </button>
            <p className="text-sm text-gray-500 mt-2">* 필수 항목을 모두 입력하신 후 제출해주세요.</p>
          </div>
        </form>
      </div>
    </div>
  );
}
