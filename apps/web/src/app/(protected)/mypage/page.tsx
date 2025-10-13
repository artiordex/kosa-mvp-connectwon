/**
 * Description : page.tsx - 📌 마이페이지 (엔트리: 여기서 데모/실사용자 자동 분기)
 * Author : Shiwoo Min
 * Date : 2025-10-13 (patched: stay on /mypage, no [id] redirect, detect newUser by identity)
 */

'use client';

import { useEffect, useState } from 'react';
import MyPageMainContent from './MyPageMainContent';
import mypageData from 'data/mypage-with-user.json';

type MockUser = {
  id?: string;
  name?: string;
  email?: string;
  provider?: string;
  role_flags?: number;
  stats?: {
    totalReservations?: number;
    upcomingReservations?: number;
    completedPrograms?: number;
    totalPoints?: number;
  };
};

type ProgramLite = {
  id: string | number;
  title: string;
  instructor?: string;
  date: string;
  time?: string;
  status?: string;
  location?: string;
  participants?: number;
  maxParticipants?: number;
  image?: string | null;
  category?: string;
};

export default function MyPageEntry() {
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState<'newUserDemo' | 'demo' | 'real'>('demo');

  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('mockUser') : null;
      const u: MockUser | null = raw ? JSON.parse(raw) : null;

      const congrats =
        typeof window !== 'undefined' &&
        localStorage.getItem('signupCongratsPending') === 'true';

      const nu = (mypageData as any).newUser ?? {};
      const isSameAsNewUser =
        !!u &&
        (
          (nu.id && u.id && String(u.id) === String(nu.id)) ||
          (nu.email && u.email && String(u.email).toLowerCase() === String(nu.email).toLowerCase()) ||
          (nu.name && u.name && String(u.name) === String(nu.name))
        );

      if (congrats || isSameAsNewUser) {
        setMode('newUserDemo');
        if (congrats) localStorage.removeItem('signupCongratsPending'); // 1회성 플래그 제거
      } else if (u?.id) {
        // 로그인 사용자: /mypage에서 바로 렌더 (실사용자 모드)
        setMode('real');
      } else {
        // 비로그인: 기본 데모
        setMode('demo');
      }
    } finally {
      setReady(true);
    }
  }, []);

  if (!ready) return <div className="px-4 py-16 text-gray-500">로딩…</div>;

  const sourceUser =
    mode === 'newUserDemo'
      ? (mypageData as any).newUser ?? {}
      : (mypageData as any).user ?? {};

  // 예약 소스
  const reservations: ProgramLite[] =
    mode === 'newUserDemo'
      ? ((sourceUser.reservations ?? []) as ProgramLite[])
      : (((mypageData as any).myReservations ?? []) as ProgramLite[]);

  const recommendedPrograms = (mypageData as any).recommendedPrograms ?? [];

  return (
    <MyPageMainContent
      stats={{
        totalReservations:
          sourceUser.stats?.totalReservations ?? (reservations?.length ?? 0),
        upcomingReservations:
          sourceUser.stats?.upcomingReservations ??
          (reservations?.filter((r) => r.status === 'upcoming').length ?? 0),
        completedPrograms:
          sourceUser.stats?.completedPrograms ??
          (reservations?.filter((r) => r.status === 'completed').length ?? 0),
        canceledReservations: 0,
      }}
      userPoints={sourceUser.stats?.totalPoints ?? 0}
      recentReservations={reservations.map((r: any) => ({
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
      userName={sourceUser.name}
      userRoleFlags={sourceUser.role_flags}
    />
  );
}
