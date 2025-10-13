/**
 * Description : page.tsx - 📌 알림 페이지
 * Author : Shiwoo Min
 * Date : 2025-10-13 (patched: per-user notif store + proper source + no-empty-catch fix)
 */

'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import mypageData from 'data/mypage-with-user.json';

/** 알림 타입은 실제 데이터가 다양하므로 문자열로 완화 */
type Notification = {
  id: string;
  type: string;
  title: string;
  message: string;
  relatedId?: string | null;
  category: string;
  icon: string;
  status: 'unread' | 'read';
  isImportant: boolean;
  createdAt: string;
  actionUrl?: string | null;
};

type UserPref = {
  emailNotifications?: boolean;
  smsNotifications?: boolean;
  pushNotifications?: boolean;
};

type User = {
  name: string;
  preferences?: UserPref;
};

function InlineToast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const id = setTimeout(onClose, 3000);
    return () => clearTimeout(id);
  }, [onClose]);
  return (
    <div className="fixed top-4 inset-x-0 z-[1000] flex justify-center pointer-events-none">
      <div className="pointer-events-auto bg-gray-900 text-white text-sm px-4 py-2 rounded-lg shadow-lg">
        {message}
      </div>
    </div>
  );
}

export default function NotificationPage() {
  const searchParams = useSearchParams();
  const forceWelcome = searchParams.get('welcome') === '1';

  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const [welcomeMode, setWelcomeMode] = useState(false);
  const [toastMsg, setToastMsg] = useState<string>('');

  // StrictMode guard
  const didInit = useRef(false);
  // 사용자별 로컬스토리지 키
  const userKeyRef = useRef<string>('guest');

  // ✅ 공통: 저장 + 브로드캐스트 (no-empty-catch 회피)
  const persistAndBroadcast = (next: Notification[]) => {
    try {
      localStorage.setItem(`notifState:${userKeyRef.current}`, JSON.stringify({ items: next }));
    } catch (e) {
      // 저장 실패해도 크래시 방지 (QuotaExceeded 등)
      console.warn('Failed to persist notifications:', e);
    }
    const unread = next.filter((n) => n.status === 'unread').length;
    window.dispatchEvent(new CustomEvent('notifications-updated', { detail: { unread } }));
  };

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;

    try {
      const raw = localStorage.getItem('mockUser');
      const parsed = raw ? JSON.parse(raw) : null;

      // demo JSON
      const demoUser = (mypageData as any).user ?? {};
      const newUser = (mypageData as any).newUser ?? {};

      // 현재 로그인 사용자가 newUser인지 판정 (id/email/name 중 일치)
      const isSameAsNewUser =
        !!parsed &&
        (
          (newUser.id && parsed.id && String(parsed.id) === String(newUser.id)) ||
          (newUser.email && parsed.email && String(parsed.email).toLowerCase() === String(newUser.email).toLowerCase()) ||
          (newUser.name && parsed.name && String(parsed.name) === String(newUser.name))
        );

      // 🔑 사용자별 로컬스토리지 키 확정 (동일인의 상태는 계속 유지)
      userKeyRef.current = isSameAsNewUser
        ? (String(newUser.email || newUser.id || 'newUser'))
        : (String(demoUser.email || demoUser.id || 'demoUser'));

      // 사용자 표시에 쓸 소스
      const sourceForUser = isSameAsNewUser ? newUser : demoUser;
      const resolvedUser: User = {
        name: (parsed?.name ?? sourceForUser?.name) ?? demoUser.name,
        preferences: {
          emailNotifications:
            parsed?.preferences?.emailNotifications ??
            sourceForUser?.preferences?.emailNotifications ??
            true,
          smsNotifications:
            parsed?.preferences?.smsNotifications ??
            sourceForUser?.preferences?.smsNotifications ??
            false,
          pushNotifications:
            parsed?.preferences?.pushNotifications ??
            sourceForUser?.preferences?.pushNotifications ??
            true,
        },
      };
      setUser(resolvedUser);

      // 가입 직후 판정
      const pending = localStorage.getItem('signupCongratsPending') === 'true';
      const alreadyShown = localStorage.getItem('signupCongratsShown') === 'true';
      const createdAt = parsed?.createdAt ? new Date(parsed.createdAt).getTime() : null;
      const isFresh = typeof createdAt === 'number' && Date.now() - createdAt < 10 * 60 * 1000; // 10분
      const shouldWelcome = (forceWelcome || pending || isFresh) && !alreadyShown;

      if (shouldWelcome) {
        setWelcomeMode(true);
        const welcomeOnly: Notification[] = [
          {
            id: 'welcome-signup',
            type: 'welcome',
            title: '가입을 환영합니다 🎉',
            message: `${resolvedUser.name ?? '회원'}님, ConnectWon에 오신 것을 환영해요! 대시보드에서 프로그램을 둘러보고 첫 예약을 시작해보세요.`,
            relatedId: 'welcome',
            category: '시스템',
            icon: 'ri-hand-heart-line',
            status: 'unread',
            isImportant: true,
            createdAt: new Date().toISOString(),
            actionUrl: '/programs',
          },
        ];
        setNotifications(welcomeOnly);
        setToastMsg(`${resolvedUser.name ?? '회원'}님, 가입이 완료되었습니다. 환영해요! 🎉`);
        // 초기 브로드캐스트
        persistAndBroadcast(welcomeOnly);
      } else {
        setWelcomeMode(false);
        // newUser면 newUser.notifications, 아니면 myNotifications
        const baseFromJSON: Notification[] = isSameAsNewUser
          ? ((newUser.notifications ?? []) as Notification[])
          : ((mypageData.myNotifications ?? []) as Notification[]);

        // 사용자별 저장된 상태가 있으면 우선 사용 (없으면 JSON 기본)
        let initial: Notification[] = baseFromJSON;
        try {
          const savedRaw = localStorage.getItem(`notifState:${userKeyRef.current}`);
          if (savedRaw) {
            const parsedSaved = JSON.parse(savedRaw);
            if (parsedSaved?.items && Array.isArray(parsedSaved.items)) {
              initial = parsedSaved.items as Notification[];
            }
          }
        } catch (e) {
          console.warn('Failed to read saved notifications:', e);
        }

        setNotifications(initial);
        // 초기 언리드 수 브로드캐스트
        persistAndBroadcast(initial);
      }
    } catch (e) {
      console.warn('NotificationPage init failed:', e);
      // 폴백
      const demoUser = (mypageData as any).user ?? {};
      userKeyRef.current = String(demoUser.email || demoUser.id || 'demoUser');
      setUser({
        name: demoUser.name,
        preferences: {
          emailNotifications: demoUser?.preferences?.emailNotifications ?? true,
          smsNotifications: demoUser?.preferences?.smsNotifications ?? false,
          pushNotifications: demoUser?.preferences?.pushNotifications ?? true,
        },
      });
      const fallback = (mypageData.myNotifications ?? []) as Notification[];
      setNotifications(fallback);
      persistAndBroadcast(fallback);
    } finally {
      setReady(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceWelcome]);

  // 환영 모드 1회성 플래그 정리
  useEffect(() => {
    if (!welcomeMode) return;
    const id = setTimeout(() => {
      localStorage.setItem('signupCongratsShown', 'true');
      localStorage.removeItem('signupCongratsPending');
    }, 100);
    return () => clearTimeout(id);
  }, [welcomeMode]);

  const filteredNotifications = useMemo(() => {
    return notifications.filter((n) => {
      if (filter === 'unread') return n.status === 'unread';
      if (filter === 'read') return n.status === 'read';
      return true;
    });
  }, [notifications, filter]);

  // ✅ 단건 읽음 처리 (리터럴 유지 + 타입 고정)
  const handleMarkAsRead = (id: string) => {
    setNotifications((prev: Notification[]) => {
      const next: Notification[] = prev.map<Notification>((n) =>
        n.id === id ? { ...n, status: 'read' as const } : n
      );
      persistAndBroadcast(next);
      return next;
    });
  };

  // ✅ 전체 읽음 처리 (리터럴 유지 + 타입 고정)
  const handleMarkAllAsRead = () => {
    setNotifications((prev: Notification[]) => {
      const next: Notification[] = prev.map<Notification>((n) => ({ ...n, status: 'read' as const }));
      persistAndBroadcast(next);
      return next;
    });
  };

  const getTypeColor = (type: string) => {
    if (type.includes('program')) return 'bg-blue-100 text-blue-700';
    if (type.includes('system') || type.includes('공지') || type === 'welcome') return 'bg-gray-100 text-gray-700';
    if (type.includes('review')) return 'bg-yellow-100 text-yellow-700';
    if (type.includes('message')) return 'bg-green-100 text-green-700';
    if (type.includes('reward') || type.includes('event')) return 'bg-purple-100 text-purple-700';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-8 space-y-10">
      {!ready || !user ? (
        <div className="px-4 py-16 text-gray-500">로딩…</div>
      ) : (
        <>
          {toastMsg && <InlineToast message={toastMsg} onClose={() => setToastMsg('')} />}

          <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">알림</h1>
              <p className="text-sm text-gray-600 mt-1">내 계정과 관련된 최신 소식과 알림을 확인하세요.</p>
              {welcomeMode && (
                <p className="text-xs text-blue-600 mt-1">가입 직후 방문하여 환영 알림만 표시 중입니다.</p>
              )}
            </div>
            <button
              onClick={handleMarkAllAsRead}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm"
            >
              <i className="ri-check-double-line mr-1"></i>
              모두 읽음 처리
            </button>
          </div>

          {/* 필터 탭 */}
          <div className="flex gap-3 mb-6">
            {[
              { key: 'all', label: '전체' },
              { key: 'unread', label: '읽지 않음' },
              { key: 'read', label: '읽음' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as any)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === tab.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 알림 리스트 */}
          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <div className="bg-gray-50 p-8 rounded-xl text-center text-gray-500 border border-gray-100">
                아직 알림이 없습니다.
              </div>
            ) : (
              filteredNotifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => handleMarkAsRead(n.id)}
                  className={`flex justify-between items-start p-6 rounded-lg border transition-all cursor-pointer hover:shadow-sm ${
                    n.status === 'read' ? 'bg-white border-gray-200' : 'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 flex items-center justify-center rounded-full ${getTypeColor(n.type)}`}>
                      <i className={`${n.icon} text-2xl`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-base">{n.title}</h3>
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed">{n.message}</p>
                      <p className="text-xs text-gray-400 mt-2">{new Date(n.createdAt).toLocaleString('ko-KR')}</p>
                    </div>
                  </div>
                  {n.status === 'unread' && (
                    <span className="text-xs text-blue-600 font-medium whitespace-nowrap">● 새 알림</span>
                  )}
                </div>
              ))
            )}
          </div>

          {/* 알림 설정 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">알림 설정</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">이메일 알림</p>
                  <p className="text-sm text-gray-500">예약 및 프로그램 관련 알림을 이메일로 받습니다</p>
                </div>
                <button
                  type="button"
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    user?.preferences?.emailNotifications ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform bg-white rounded-full transition-transform ${
                      user?.preferences?.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">SMS 알림</p>
                  <p className="text-sm text-gray-500">중요한 알림을 SMS로 받습니다</p>
                </div>
                <button
                  type="button"
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    user?.preferences?.smsNotifications ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform bg-white rounded-full transition-transform ${
                      user?.preferences?.smsNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">푸시 알림</p>
                  <p className="text-sm text-gray-500">브라우저 푸시 알림을 받습니다</p>
                </div>
                <button
                  type="button"
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    user?.preferences?.pushNotifications ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform bg-white rounded-full transition-transform ${
                      user?.preferences?.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
