/**
 * Description : VenueSelection.tsx - 📌 ConnectWon 지점 선택 단계
 * Author : Shiwoo Min
 * Date : 2025-10-13
 */

import { VenueType } from './ReservationFlow';

export default function VenueSelection({
  venues,
  selectedVenueId,
  onSelect,
}: {
  venues: VenueType[];
  selectedVenueId: number | null;
  onSelect: (venueId: number) => void;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">지점 선택</h2>
      <p className="text-gray-600 mb-6">원하는 지점을 선택하세요</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {venues.map((venue) => (
          <div
            key={venue.id}
            onClick={() => onSelect(venue.id)}
            className={`border-2 rounded-xl overflow-hidden cursor-pointer transition-all ${
              selectedVenueId === venue.id
                ? 'border-blue-600 shadow-lg'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <div className="relative h-48 bg-gray-200">
              <img
                src={venue.thumbnail ?? '/images/default_venue.jpg'}
                alt={venue.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-2">{venue.name}</h3>
              <p className="text-gray-600 text-sm">{venue.address}</p>
              <p className="text-sm text-gray-500 mt-2">
                {(venue.categories ?? []).reduce((a, c) => a + c.rooms.length, 0)}개 공간
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
