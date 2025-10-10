/**
 * Description : EquipmentDetail.tsx - 📌 ConnectWon 장비 상세 정보
 * Author : Assistant
 * Date : 2025-10-12
 */

'use client';

import { useState } from 'react';

export default function EquipmentDetail() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // ✅ 임시 데이터
  const equipment = {
    id: 1,
    name: "빔프로젝터 EPSON EB-2250U",
    category: "projector",
    brand: "EPSON",
    model: "EB-2250U",
    specifications: {
      resolution: "1920x1200",
      brightness: "5000 lumens",
      connectivity: ["HDMI", "USB", "WiFi"]
    },
    rentalPrice: 50000,
    depositPrice: 200000,
    status: "active",
    thumbnail: "/images/equipment/projector-1.jpg",
    venueId: 1,
    venueName: "ConnectWon 강남지점",
    venueSlug: "gangnam-center",
    quantity: 3,
    availableQuantity: 2
  };

  const rentalHistory = [
    {
      id: "ER-20251009-005",
      userName: "홍길동",
      rentalDate: "2025-10-09T08:30:00Z",
      returnDate: null,
      status: "in_use",
      purpose: "프로젝트 피칭 발표"
    },
    {
      id: "ER-20251008-001",
      userName: "김지원",
      rentalDate: "2025-10-08T10:00:00Z",
      returnDate: "2025-10-09T17:30:00Z",
      status: "returned",
      purpose: "AI 프로젝트 발표용"
    },
    {
      id: "ER-20251007-012",
      userName: "박서연",
      rentalDate: "2025-10-07T09:00:00Z",
      returnDate: "2025-10-08T18:00:00Z",
      status: "returned",
      purpose: "워크샵 발표"
    }
  ];

  // ✅ 상태 뱃지
  const getStatusBadge = (available: number, total: number) => {
    if (available === 0) {
      return <span className="bg-red-100 text-red-700 text-sm px-3 py-1 rounded-full">대여불가</span>;
    } else if (available < total * 0.3) {
      return <span className="bg-yellow-100 text-yellow-700 text-sm px-3 py-1 rounded-full">품절임박</span>;
    } else {
      return <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">대여가능</span>;
    }
  };

  // ✅ 대여 상태 뱃지 (TypeScript 오류 수정)
  const getRentalStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; color: string }> = {
      in_use: { label: '사용중', color: 'bg-blue-100 text-blue-700' },
      returned: { label: '반납완료', color: 'bg-gray-100 text-gray-700' },
      overdue: { label: '연체', color: 'bg-red-100 text-red-700' }
    };

    // ✅ fallback 존재 → undefined 가능성 제거
    const statusInfo = (statusMap[status] || statusMap['returned']) as {
      label: string;
      color: string;
    };

    return (
      <span className={`px-2 py-1 ${statusInfo.color} text-xs rounded`}>
        {statusInfo.label}
      </span>
    );
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const goBack = () => {
    window.history.back();
  };

  const goToEdit = () => {
    console.log('수정 페이지로 이동');
  };

  const handleDelete = () => {
    console.log('장비 삭제');
    setShowDeleteModal(false);
    goBack();
  };

  return (
    <div className="space-y-6">
      {/* 상단 네비게이션 */}
      <button
        onClick={goBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
      >
        <i className="ri-arrow-left-line"></i>
        <span>목록으로 돌아가기</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 메인 정보 영역 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 기본 정보 카드 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">{equipment.name}</h1>
                  {getStatusBadge(equipment.availableQuantity, equipment.quantity)}
                </div>
                <p className="text-gray-600">{equipment.brand} {equipment.model}</p>
                <div className="flex items-center gap-1 text-sm text-gray-600 mt-2">
                  <i className="ri-map-pin-line"></i>
                  <span>{equipment.venueName}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={goToEdit}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  title="수정"
                >
                  <i className="ri-edit-line text-xl"></i>
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  title="삭제"
                >
                  <i className="ri-delete-bin-line text-xl"></i>
                </button>
              </div>
            </div>

            {/* 이미지 영역 */}
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
              <i className="ri-tools-line text-8xl text-gray-300"></i>
            </div>

            {/* 상세 정보 */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">카테고리</p>
                <p className="font-semibold text-gray-900">프로젝터</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">재고 현황</p>
                <p className="font-semibold text-blue-600">
                  {equipment.availableQuantity} / {equipment.quantity}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">대여료 (일)</p>
                <p className="font-semibold text-gray-900">{equipment.rentalPrice.toLocaleString()}원</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">보증금</p>
                <p className="font-semibold text-gray-900">{equipment.depositPrice.toLocaleString()}원</p>
              </div>
            </div>
          </div>

          {/* 사양 정보 카드 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">장비 사양</h2>
            <div className="space-y-3">
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">해상도</span>
                <span className="font-semibold text-gray-900">{equipment.specifications.resolution}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">밝기</span>
                <span className="font-semibold text-gray-900">{equipment.specifications.brightness}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-gray-600">연결 방식</span>
                <span className="font-semibold text-gray-900">
                  {equipment.specifications.connectivity.join(', ')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 대여 현황 사이드바 */}
        <div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-calendar-check-line"></i>
              대여 현황
            </h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {rentalHistory.map(rental => (
                <div key={rental.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900 flex items-center gap-2">
                      <i className="ri-user-line text-gray-500"></i>
                      {rental.userName}
                    </span>
                    {getRentalStatusBadge(rental.status)}
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                      <i className="ri-calendar-line mt-0.5 flex-shrink-0"></i>
                      <div>
                        <p>대여: {formatDate(rental.rentalDate)}</p>
                        <p>반납: {formatDate(rental.returnDate)}</p>
                      </div>
                    </div>
                    <p className="text-xs mt-2 text-gray-500 flex items-start gap-2">
                      <i className="ri-file-text-line mt-0.5 flex-shrink-0"></i>
                      {rental.purpose}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 삭제 확인 모달 */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-full">
                <i className="ri-error-warning-line text-2xl text-red-600"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900">장비 삭제</h3>
            </div>
            <p className="text-gray-600 mb-6">
              <strong>{equipment.name}</strong>을(를) 삭제하시겠습니까?<br />
              이 작업은 되돌릴 수 없습니다.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                취소
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
