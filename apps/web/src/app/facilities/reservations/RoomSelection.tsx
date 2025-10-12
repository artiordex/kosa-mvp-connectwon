/**
 * Description : RoomSelection.tsx - 📌 ConnectWon 공간 선택 단계 (샘플 이미지 안정화)
 * Author : Shiwoo Min
 * Date : 2025-10-13
 */

import { VenueType, RoomType } from './ReservationFlow';

// 안정적 DiceBear 이미지 + fallback
const getDefaultImage = (title: string) => {
  const seed = encodeURIComponent(title);
  return `https://api.dicebear.com/7.x/shapes/svg?seed=${seed}`;
};

export default function RoomSelection({
  venue,
  selectedRoom,
  onSelect,
}: {
  venue: VenueType;
  selectedRoom: RoomType | null;
  onSelect: (room: RoomType) => void;
}) {
  const allRooms = (venue.categories ?? []).flatMap((cat) =>
    cat.rooms.map((r) => ({
      ...r,
      categoryLabel: cat.label,
      categoryType: cat.type,
    }))
  );

  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">공간 선택</h2>
      <p className="text-gray-600 mb-6">{venue.name}의 공간을 선택하세요</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allRooms.map((room) => {
          const imgSrc =
            !room.thumbnail || room.thumbnail.trim() === ''
              ? getDefaultImage(room.name)
              : room.thumbnail;

          return (
            <div
              key={room.id}
              onClick={() => room.status === 'available' && onSelect(room)}
              className={`border-2 rounded-xl overflow-hidden transition-all ${
                selectedRoom?.id === room.id
                  ? 'border-blue-600 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              } ${
                room.status !== 'available'
                  ? 'opacity-50 cursor-not-allowed'
                  : 'cursor-pointer'
              }`}
            >
              <div className="relative w-full h-48 bg-gray-100">
                <img
                  src={imgSrc}
                  alt={room.name}
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      getDefaultImage(room.name);
                  }}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                {room.status !== 'available' && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-semibold text-sm">
                    사용중
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1">{room.name}</h3>
                <p className="text-sm text-gray-600">
                  최대 {room.capacity}명 | {room.categoryLabel}
                </p>
                <p
                  className={`text-sm font-medium ${
                    room.status === 'available'
                      ? 'text-green-600'
                      : 'text-red-500'
                  }`}
                >
                  {room.status === 'available' ? '예약 가능' : '사용중'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
