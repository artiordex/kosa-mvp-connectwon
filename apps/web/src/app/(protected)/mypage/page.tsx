/**
 * Description : page.tsx - 📌 마이페이지 대시보드
 * Author : Shiwoo Min
 * Date : 2025-10-13
 */

import MyPageMainContent from './MyPageMainContent';
import mypageData from 'data/mypage-with-user.json';

export default function MyPagePage() {
  const { user, myReservations, recommendedPrograms } = mypageData;

  return (
    <MyPageMainContent
      stats={{
        totalReservations: user.stats.totalReservations,
        upcomingReservations: user.stats.upcomingReservations,
        completedPrograms: user.stats.completedPrograms,
        canceledReservations: 0,
      }}
      userPoints={user.stats.totalPoints}
      recentReservations={myReservations.map((r) => ({
        id: r.id,
        title: r.title,
        instructor: r.instructor,
        date: r.date,
        time: r.time,
        status: r.status,
        location: r.location,
        participants: r.participants,
        maxParticipants: r.maxParticipants,
        image: r.image,
        category: r.category,
      }))}
      recommendedPrograms={recommendedPrograms}
      userName={user.name}
      userRoleFlags={user.role_flags}
    />
  );
}
