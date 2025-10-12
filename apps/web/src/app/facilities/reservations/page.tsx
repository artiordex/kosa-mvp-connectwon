/**
 * Description : page.tsx - 📌 공간 예약 페이지
 * Author : Shiwoo Min
 * Date : 2025-10-12
 * Path : app/facilities/reservations/page.tsx
 */

import ReservationFlow from './ReservationFlow';

export const metadata = {
  title: 'ConnectWon 공간 예약',
  description: 'ConnectWon 지점의 회의실, 세미나실, 스튜디오 등 다양한 공간을 예약하세요',
};

export default function ReservationPage() {
  return <ReservationFlow />;
}
