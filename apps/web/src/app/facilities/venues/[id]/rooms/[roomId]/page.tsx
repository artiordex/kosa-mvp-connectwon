/**
 * Description : app/venues/[id]/rooms/[roomId]/page.tsx - 📌 룸 상세 페이지 래퍼
 * Author : Shiwoo Min
 * Date : 2025-10-13
 */

import RoomDetail from './RoomDetail';

interface RoomPageProps {
  params: {
    id: string;
    roomId: string;
  };
}

export default function RoomPage({ params }: RoomPageProps) {
  const venueId = parseInt(params.id, 10);
  const roomId = parseInt(params.roomId, 10);

  return <RoomDetail venueId={venueId} roomId={roomId} />;
}
