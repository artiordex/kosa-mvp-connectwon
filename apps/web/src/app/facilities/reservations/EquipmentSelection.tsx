/**
 * Description : EquipmentSelection.tsx - 📌 ConnectWon 장비 선택 단계 (샘플 이미지 안정화)
 * Author : Shiwoo Min
 * Date : 2025-10-13
 */

import { EquipmentType } from './ReservationFlow';

// 안정적인 기본 이미지 URL 생성기 (picsum 기반)
const getDefaultImage = (title: string) => {
  const seed = encodeURIComponent(title);
  return `https://api.dicebear.com/7.x/shapes/png?seed=${seed}`;
};

export default function EquipmentSelection({
  equipment,
  selected,
  onToggle,
  onQuantityChange,
  onComplete,
}: {
  equipment: EquipmentType[];
  selected: { id: number; quantity: number }[];
  onToggle: (id: number) => void;
  onQuantityChange: (id: number, q: number) => void;
  onComplete: () => void;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">장비 선택</h2>
      <p className="text-gray-600 mb-6">필요한 장비를 선택하세요 (선택사항)</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {equipment.map((item) => {
          const selectedItem = selected.find((s) => s.id === item.id);
          const isSelected = !!selectedItem;

          const imgSrc =
            item.thumbnail && item.thumbnail.trim() !== ''
              ? item.thumbnail
              : getDefaultImage(item.name);

          return (
            <div
              key={item.id}
              className={`border-2 rounded-lg p-4 transition-all ${
                isSelected
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start space-x-3">
                <img
                  src={imgSrc}
                  alt={item.name}
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      getDefaultImage(item.name);
                  }}
                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {item.brand} {item.model}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex justify-between items-center">
                <button
                  onClick={() => onToggle(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {isSelected ? '선택됨' : '선택하기'}
                </button>

                {isSelected && (
                  <select
                    value={selectedItem.quantity}
                    onChange={(e) =>
                      onQuantityChange(item.id, parseInt(e.target.value))
                    }
                    className="border px-2 py-1 rounded-lg text-sm"
                  >
                    {Array.from(
                      { length: Math.min(item.availableQuantity, 5) },
                      (_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}개
                        </option>
                      )
                    )}
                  </select>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between">
        <button
          onClick={onComplete}
          className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
        >
          장비 없이 예약
        </button>
        <button
          onClick={onComplete}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
        >
          예약 완료하기
        </button>
      </div>
    </div>
  );
}
