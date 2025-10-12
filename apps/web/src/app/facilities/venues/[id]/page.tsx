/**
 * Description : app/venues/[id]/page.tsx - 📌 지점 상세 페이지 래퍼
 * Author : Shiwoo Min
 * Date : 2025-10-13
 */

import VenueDetail from './VenueDetail';

interface VenuePageProps {
  params: {
    id: string;
  };
}

export default function VenuePage({ params }: VenuePageProps) {
  const venueId = parseInt(params.id, 10);
  return <VenueDetail id={venueId} />;
}
