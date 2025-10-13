/**
 * Description : ProgramInquirySection.tsx - 📌 프로그램 문의 섹션
 * Author : Shiwoo Min
 * Date : 2025-10-12
 */

'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import '@toast-ui/editor/dist/toastui-editor.css';

/* Toast UI Editor */
const Editor = dynamic(
  () => import('@toast-ui/react-editor').then((m) => m.Editor),
  {
    ssr: false,
    loading: () => (
      <div className="border border-gray-300 rounded-md p-4 bg-gray-50 text-center text-gray-600">
        에디터 로딩 중...
      </div>
    ),
  }
);

/* Types */
type SessionUser = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  profileImage?: string;
};

interface ProgramInquiryProps {
  demoOn?: boolean;
  seedUser?: SessionUser | null;
}

interface Reply {
  id: number;
  text: string;
  date: string;
  replies: Reply[];
}
interface Inquiry {
  id: number;
  name: string;
  email: string;
  password: string;
  title: string;
  content: string;
  date: string;
  replies: Reply[];
  answers: Reply[];
  profileImage?: string | undefined;
}

/* LocalStorage Namespace */
const STORAGE_NAMESPACE = 'program_inquiries';
const DRAFT_NAMESPACE   = 'program_inquiry_draft';
const sk = (userKey: string) => `${STORAGE_NAMESPACE}:${userKey}`;
const dk = (userKey: string) => `${DRAFT_NAMESPACE}:${userKey}`;

const normalizeImageUrl = (u?: string): string | undefined => {
  const raw = (u ?? '').trim();
  if (!raw) return undefined;
  if (raw.startsWith('http://') || raw.startsWith('https://') || raw.startsWith('/') || raw.startsWith('data:')) {
    return raw;
  }
  return `/${raw.replace(/^\/+/, '')}`;
};

const sanitizeInquiries = (arr: any[]): Inquiry[] =>
  (arr ?? []).map((it: any) => ({
    ...it,
    email: (it?.email ?? '').trim(),
    profileImage: normalizeImageUrl(it?.profileImage ?? it?.profile_image ?? it?.avatar),
  }));

/** 날짜 유틸 */
const fmtDateISO = (d: Date = new Date()) => {
  const offset = d.getTimezoneOffset() * 60000;
  const localTime = new Date(d.getTime() - offset);
  return localTime.toISOString().split('T')[0];
};

function fmtKoreanDate(iso: string) {
  try {
    const [y, m, d] = iso.split('-').map((x) => parseInt(x, 10));
    if (!y || !m || !d) return iso;
    return `${y}년 ${String(m).padStart(2, '0')}월 ${String(d).padStart(2, '0')}일`;
  } catch {
    return iso;
  }
}

function relativeTimeFromISO(iso: string) {
  try {
    const target = new Date(iso + 'T00:00:00');
    const now = new Date();
    const diff = Math.floor((now.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));
    if (diff === 0) return '오늘';
    if (diff === 1) return '어제';
    if (diff < 7) return `${diff}일 전`;
    const weeks = Math.floor(diff / 7);
    if (weeks < 5) return `${weeks}주 전`;
    const months = Math.floor(diff / 30);
    if (months < 12) return `${months}개월 전`;
    const years = Math.floor(diff / 365);
    return `${years}년 전`;
  } catch {
    return iso;
  }
}

function debounce<T extends (...args: any[]) => void>(fn: T, wait = 300) {
  let t: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

function initials(name?: string) {
  if (!name) return '익';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const firstG = (s?: string) => (s ? Array.from(s)[0] : undefined)?.toUpperCase() ?? '';
  if (parts.length >= 2) return (firstG(parts[0]) + firstG(parts[1])) || '익';
  return firstG(parts[0]) || '익';
}

function randomPastel(seed: number) {
  const colors = [
    'bg-rose-100 text-rose-700',
    'bg-orange-100 text-orange-700',
    'bg-amber-100 text-amber-700',
    'bg-lime-100 text-lime-700',
    'bg-emerald-100 text-emerald-700',
    'bg-cyan-100 text-cyan-700',
    'bg-sky-100 text-sky-700',
    'bg-indigo-100 text-indigo-700',
    'bg-fuchsia-100 text-fuchsia-700',
    'bg-pink-100 text-pink-700',
  ];
  return colors[seed % colors.length];
}

function maskEmail(email?: string): string {
  if (!email) return '';
  const [id = '', domain = ''] = email.split('@');
  if (!domain) return email;
  return id.length > 2 ? `${id.slice(0, 2)}***@${domain}` : `${id[0] ?? ''}***@${domain}`;
}

const sorters = {
  dateDesc: (a: Inquiry, b: Inquiry) => (a.date < b.date ? 1 : a.date > b.date ? -1 : b.id - a.id),
  dateAsc: (a: Inquiry, b: Inquiry) => (a.date > b.date ? 1 : a.date < b.date ? -1 : a.id - b.id),
  titleAsc: (a: Inquiry, b: Inquiry) => a.title.localeCompare(b.title),
  titleDesc: (a: Inquiry, b: Inquiry) => b.title.localeCompare(a.title),
};

/** 활성 사용자/네임스페이스 계산 */
function getActiveUserKey() {
  try {
    if (typeof window === 'undefined') {
      return { userKey: 'guest', activeUser: null as SessionUser | null };
    }
    const raw = localStorage.getItem('mockUser');
    const parsed: SessionUser | null = raw ? JSON.parse(raw) : null;
    if (parsed) {
      const userKey = String(parsed.email || parsed.id || parsed.name || 'guest');
      return { userKey, activeUser: parsed };
    }
    return { userKey: 'guest', activeUser: null };
  } catch {
    return { userKey: 'guest', activeUser: null };
  }
}

/** 외부에서 로그인 스냅샷 반영 */
export const applyAuthSnapshotInline = (u: SessionUser | null) => {
  try {
    if (typeof window === 'undefined') return;
    if (u) localStorage.setItem('mockUser', JSON.stringify(u));
    else localStorage.removeItem('mockUser');
    window.dispatchEvent(new Event('user-switched'));
    window.dispatchEvent(new Event('auth-changed'));
  } catch (e) {
    console.warn('[ProgramInquiry] applyAuthSnapshotInline failed', e);
  }
};

/* ------------------------------ Main Component ----------------------------- */
export default function ProgramInquirySection({
  demoOn = false,
  seedUser = null,
}: ProgramInquiryProps) {
  const editorRef = useRef<any>(null);
  const editEditorRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 데이터
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  // 선택/폼
  const [showForm, setShowForm] = useState(false);
  const [selectedInquiryId, setSelectedInquiryId] = useState<number | null>(null);

  // 폼 데이터
  const [formData, setFormData] = useState<{ name: string; email: string; password: string; title: string }>(
    { name: '', email: '', password: '', title: '' }
  );

  // 수정
  const [isEditing, setIsEditing] = useState(false);
  const [editingInquiry, setEditingInquiry] = useState<Inquiry | null>(null);

  // 비밀번호 모달
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [targetInquiry, setTargetInquiry] = useState<Inquiry | null>(null);
  const [actionType, setActionType] = useState<'edit' | 'delete' | null>(null);

  // 검색/정렬/페이징
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<keyof typeof sorters>('dateDesc');
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  // 현재 로그인 사용자 상태
  const [activeUser, setActiveUser] = useState<SessionUser | null>(null);

  // 사용자 키(스토리지 네임스페이스)
  const userKeyRef = useRef<string>('guest');

  /* 0) 상위에서 내려준 데모/시드유저 mockUser 주입 */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (demoOn && seedUser) {
        const prev = localStorage.getItem('mockUser');
        const next = JSON.stringify(seedUser);
        if (prev !== next) {
          localStorage.setItem('mockUser', next);
          window.dispatchEvent(new Event('user-switched'));
          window.dispatchEvent(new Event('auth-changed'));
        }
      }
    } catch {
      /* ignore */
    }
  }, [demoOn, seedUser]);

  /* 1) 초기 로드(localStorage) */
  useEffect(() => {
    const first = getActiveUserKey();
    userKeyRef.current = first.userKey;

    const au: SessionUser | null = first.activeUser ?? null;
    setActiveUser(au);

    try {
      const savedRaw = localStorage.getItem(sk(first.userKey));
      if (savedRaw) {
        try {
          setInquiries(sanitizeInquiries(JSON.parse(savedRaw)));
        } catch (parseErr) {
          console.warn('[inquiries:init] saved parse failed, fallback to []', parseErr);
          setInquiries([]);
        }
      } else {
        setInquiries([]);
      }

      const draftRaw = localStorage.getItem(dk(first.userKey));
      if (draftRaw) {
        try {
          const parsed = JSON.parse(draftRaw);
          setFormData((prev) => ({ ...prev, ...parsed }));
          setShowForm(true);
          toast('이전 작성 중인 초안을 복원했어요.', { icon: '📝' });
        } catch (parseErr) {
          console.warn('[inquiries:init] draft parse failed, ignore it', parseErr);
          try { localStorage.removeItem(dk(first.userKey)); } catch { /* empty */ }
          if (au) {
            setFormData((prev) => ({
              ...prev,
              name: au.name ?? prev.name,
              email: au.email ?? prev.email,
            }));
          } else {
            setFormData({ name: '', email: '', password: '', title: '' });
          }
        }
        return; // 초안 복원 시 조기 종료
      }

      // 초안이 없을 때 프리필
      if (au) {
        setFormData((prev) => ({
          ...prev,
          name: au.name ?? prev.name,
          email: au.email ?? prev.email,
        }));
      } else {
        setFormData({ name: '', email: '', password: '', title: '' });
      }
    } catch (e) {
      console.warn('[inquiries:init] load failed', e);
      setInquiries([]);
      if (au) {
        setFormData((prev) => ({
          ...prev,
          name: au.name ?? prev.name,
          email: au.email ?? prev.email,
        }));
      } else {
        setFormData({ name: '', email: '', password: '', title: '' });
      }
    }
  }, []);

  /* 2) 계정 전환/다른 탭 동기화 */
  useEffect(() => {
    const reloadByUser = () => {
      const { userKey, activeUser } = getActiveUserKey();
      userKeyRef.current = userKey;
      setActiveUser(activeUser);

      try {
        const saved = localStorage.getItem(sk(userKey));
        setInquiries(saved ? sanitizeInquiries(JSON.parse(saved)) : []);

        const draft = localStorage.getItem(dk(userKey));
        if (draft) {
          const parsed = JSON.parse(draft);
          setFormData((prev) => ({ ...prev, ...parsed }));
          setShowForm(true);
        } else if (activeUser) {
          setFormData((prev) => ({
            ...prev,
            name: activeUser.name ?? prev.name,
            email: activeUser.email ?? prev.email,
          }));
        } else {
          setFormData({ name: '', email: '', password: '', title: '' });
        }

        setSelectedInquiryId(null);
        setPage(1);
      } catch (e) {
        console.warn('[inquiries:user-switch] reload failed', e);
      }
    };

    const onStorage = (ev: StorageEvent) => {
      if (!ev.key) return;
      if (ev.key === 'mockUser') {
        reloadByUser();
        return;
      }
      const { userKey } = getActiveUserKey();

      if (ev.key === sk(userKey)) {
        try {
          const next = ev.newValue ? JSON.parse(ev.newValue) : [];
          setInquiries(sanitizeInquiries(next));
          setSelectedInquiryId(null);
          setPage(1);
        } catch (e) {
          console.warn('[inquiries:storage] load failed', e);
        }
        return;
      }

      if (ev.key === dk(userKey)) {
        try {
          const draft = ev.newValue ? JSON.parse(ev.newValue) : null;
          if (draft) {
            setFormData((prev) => ({ ...prev, ...draft }));
            setShowForm(true);
          }
        } catch (e) {
          console.warn('[inquiries:storage] load failed', e);
        }
      }
    };

    const onAuthChanged  = () => reloadByUser();
    const onUserSwitched = () => reloadByUser();
    const onVisibility   = () => { if (!document.hidden) reloadByUser(); };

    window.addEventListener('auth-changed', onAuthChanged);
    window.addEventListener('storage', onStorage);
    window.addEventListener('user-switched', onUserSwitched as EventListener);
    document.addEventListener('visibilitychange', onVisibility);

    reloadByUser();

    return () => {
      window.removeEventListener('auth-changed', onAuthChanged);
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('user-switched', onUserSwitched as EventListener);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  /* 3) 변경 시 저장(localStorage) */
  useEffect(() => {
    try {
      localStorage.setItem(sk(userKeyRef.current), JSON.stringify(inquiries));
    } catch (err) {
      console.warn('[storage] Failed to persist inquiries to localStorage', err);
      try {
        if (typeof window !== 'undefined' && 'sessionStorage' in window) {
          sessionStorage.setItem(sk(userKeyRef.current), JSON.stringify(inquiries));
          toast('세션에 임시 저장했어요. 창을 닫으면 사라집니다.', { icon: '💾' });
        }
      } catch (fallbackErr) {
        console.error('[storage] sessionStorage fallback failed', fallbackErr);
        toast.error('데이터 임시 저장에도 실패했어요. 내용 복사 후 새로고침을 고려해주세요.');
      }
    }
  }, [inquiries]);

  /* 4) 폼 초안 자동 저장 (디바운스) */
  const saveDraft = useMemo(
    () =>
      debounce((next: any) => {
        try {
          localStorage.setItem(dk(userKeyRef.current), JSON.stringify(next));
        } catch (err) {
          console.warn('[storage] Failed to persist draft to localStorage', err);
          try {
            if (typeof window !== 'undefined' && 'sessionStorage' in window) {
              sessionStorage.setItem(dk(userKeyRef.current), JSON.stringify(next));
              toast('세션에 임시 저장했어요. 창을 닫으면 사라집니다.', { icon: '💾' });
            }
          } catch (fallbackErr) {
            console.error('[storage] sessionStorage fallback failed', fallbackErr);
            toast.error('초안 임시 저장에도 실패했어요. 내용 복사 후 새로고침을 고려해주세요.');
          }
        }
      }, 500),
    []
  );
  useEffect(() => {
    saveDraft(formData);
  }, [formData, saveDraft]);

  /* 5) 검색어 디바운스 */
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const setDebounced = useMemo(
    () =>
      debounce((q: string) => {
        setDebouncedQuery(q);
        setPage(1);
      }, 250),
    []
  );
  useEffect(() => setDebounced(query), [query, setDebounced]);

  const selectedPost = useMemo(
    () => inquiries.find((inq) => inq.id === selectedInquiryId) || null,
    [inquiries, selectedInquiryId]
  );

  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    const base = q
      ? inquiries.filter((x) => x.title.toLowerCase().includes(q) || x.name.toLowerCase().includes(q))
      : [...inquiries];
    base.sort(sorters[sortKey]);
    return base;
  }, [inquiries, debouncedQuery, sortKey]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  /* 폼 변경 핸들러 */
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, maxLength } = e.target;
    if (name === 'password') {
      const onlyDigits = value.replace(/\D+/g, '').slice(0, 4);
      setFormData((prev) => ({ ...prev, password: onlyDigits }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: maxLength ? value.slice(0, maxLength) : value }));
  };

  /* 폼 제출 */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const content = editorRef.current?.getInstance().getHTML() || '';
    if (!formData.password?.trim()) {
      toast.error('비밀번호를 입력해주세요.');
      return;
    }
    if (!formData.title.trim() || !content?.trim()) {
      toast.error('제목과 내용을 입력해주세요.');
      return;
    }
    if (!/^\d{4}$/.test(formData.password)) {
      toast.error('비밀번호는 4자리 숫자여야 합니다.');
      return;
    }

    // 비로그인 상태일 때 이름/이메일 필수
    if (!activeUser) {
      if (!formData.name.trim()) {
        toast.error('이름을 입력해주세요.');
        return;
      }
      if (!formData.email.trim()) {
        toast.error('이메일을 입력해주세요.');
        return;
      }
    }

    const newPost: Inquiry = {
      id: Date.now(),
      name: activeUser ? (activeUser.name || '익명') : (formData.name.trim() || '익명'),
      email: activeUser ? (activeUser.email ?? '').trim() : (formData.email ?? '').trim(),
      password: formData.password,
      title: formData.title,
      content,
      date: fmtDateISO()!,
      replies: [],
      answers: [],
      profileImage: activeUser ? normalizeImageUrl((activeUser as any).profileImage) : undefined,
    };

    setInquiries((prev) => [newPost, ...prev]);
    setFormData({
      name: activeUser?.name ?? '',
      email: activeUser?.email ?? '',
      password: '',
      title: '',
    });
    editorRef.current?.getInstance().setHTML('');

    try {
      localStorage.removeItem(dk(userKeyRef.current));
    } catch {
      try {
        if (typeof window !== 'undefined' && 'sessionStorage' in window) {
          sessionStorage.removeItem(dk(userKeyRef.current));
          toast('로컬 저장소 정리에 실패하여 세션에서만 초안을 정리했어요.', { icon: '🧹' });
        }
      } catch (e) {
        console.warn('[inquiries:storage] clear failed', e);
      }
    }
    setShowForm(false);
    setPage(1);
    toast.success('문의가 등록되었습니다!');
  };

  const openPasswordModal = (inq: Inquiry, type: 'edit' | 'delete') => {
    setTargetInquiry(inq);
    setActionType(type);
    setPasswordModalOpen(true);
    setPasswordInput('');
  };

  const handlePasswordConfirm = () => {
    if (!targetInquiry || !actionType) return;
    if (passwordInput !== targetInquiry.password) {
      toast.error('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (actionType === 'delete') {
      setInquiries((prev) => prev.filter((p) => p.id !== targetInquiry.id));
      if (selectedInquiryId === targetInquiry.id) setSelectedInquiryId(null);
      toast.success('문의가 삭제되었습니다.');
    } else if (actionType === 'edit') {
      setIsEditing(true);
      setEditingInquiry(targetInquiry);
      setTimeout(() => {
        editEditorRef.current?.getInstance().setHTML(targetInquiry.content);
      }, 150);
    }

    setPasswordInput('');
    setPasswordModalOpen(false);
  };

  const handleExportJSON = () => {
    const key = userKeyRef.current;
    const blob = new Blob([JSON.stringify(inquiries, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const stamp = new Date().toISOString().replaceAll(':', '-').split('.')[0];
    a.href = url;
    a.download = `program_inquiries_${key}_${stamp}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = reader.result?.toString() || '[]';
        const raw = JSON.parse(text) as any[];
        if (!Array.isArray(raw)) throw new Error('Invalid');
        setInquiries(sanitizeInquiries(raw));
        setSelectedInquiryId(null);
        setPage(1);
        toast.success('JSON 데이터가 로드되었습니다.');
      } catch {
        toast.error('JSON 파싱에 실패했습니다.');
      }
    };
    reader.readAsText(file);
  };

  const handleClearAll = () => {
    if (!confirm('전체 데이터를 삭제할까요? 이 동작은 되돌릴 수 없습니다.')) return;
    setInquiries([]);
    setSelectedInquiryId(null);
    setPage(1);
    toast('전체 데이터가 삭제되었습니다.');
  };

  const Badge = ({ text, color = 'bg-gray-100 text-gray-700' }: { text: string; color?: string }) => (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}>{text}</span>
  );

  /** 네트워크 실패 시 자동 폴백되는 Avatar */
  const Avatar = ({ name, seed, image }: { name: string; seed: number; image?: string | undefined }) => {
    const [broken, setBroken] = useState(false);
    const normalized = normalizeImageUrl(image);
    const showFallback = !normalized || broken;

    if (showFallback) {
      return (
        <div
          className={`w-8 h-8 flex items-center justify-center rounded-full border ${randomPastel(seed)} border-white shadow-sm`}
          title={name}
        >
          <span className="text-xs font-bold">{initials(name)}</span>
        </div>
      );
    }
    return (
      <img
        src={normalized}
        alt={name}
        className="w-8 h-8 rounded-full object-cover border border-gray-200 shadow-sm"
        title={name}
        onError={() => setBroken(true)}
        loading="lazy"
        referrerPolicy="no-referrer"
      />
    );
  };

  // 문의의 프로필 이미지 폴백 (게스트는 이미지 없이 이니셜로 표시)
  const resolveProfileImage = (item: Inquiry): string | undefined => {
    if (item.profileImage) return normalizeImageUrl(item.profileImage);
    if (
      activeUser?.email &&
      item.email &&
      item.email.toLowerCase() === activeUser.email.toLowerCase()
    ) {
      return normalizeImageUrl((activeUser as any).profileImage);
    }
    return undefined;
  };

  return (
    <div className="w-full relative">
      {/* Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-[360px] p-6 animate-fade-up">
            <h3 className="text-lg font-bold mb-2 text-center text-gray-900">비밀번호 확인</h3>
            <p className="text-xs text-gray-500 mb-4 text-center">수정 또는 삭제를 진행하려면 4자리 비밀번호를 입력하세요.</p>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value.replace(/\D+/g, '').slice(0, 4))}
              maxLength={4}
              placeholder="4자리 숫자 입력"
              className="w-full border rounded-md px-3 py-2 text-center mb-4 focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setPasswordModalOpen(false)} className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200">
                취소
              </button>
              <button onClick={handlePasswordConfirm} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 border-b pb-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <i className="ri-question-line mr-2 text-blue-600" />
            프로그램 문의
          </h1>
          <Badge text={`총 ${inquiries.length}건`} />
          {activeUser ? (
            <Badge text="로그인됨" color="bg-emerald-100 text-emerald-700" />
          ) : (
            <Badge text="익명 모드" color="bg-gray-200 text-gray-700" />
          )}
        </div>

        {/* 현재 사용자 칩 */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border shadow-sm">
            <Avatar
              name={activeUser ? (activeUser.name || '이름 없음') : (formData.name || '익명')}
              seed={activeUser ? (activeUser.id ? Number(activeUser.id.toString().replace(/\D/g, '')) : Date.now()) : 0}
              image={activeUser ? (activeUser as any).profileImage : undefined}
            />
            <div className="leading-tight">
              <div className="text-sm font-medium text-gray-900">
                {activeUser ? (activeUser.name || '이름 없음') : (formData.name || '익명')}
              </div>
              <div className="text-[11px] text-gray-500">
                {activeUser ? (activeUser.email || '') : '로그인하지 않음'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="border rounded-lg bg-white p-6 mb-10 shadow-sm space-y-5">
          {/* 이름 + 이메일 + 비밀번호 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-4">
              <label className="w-20 text-sm font-semibold text-gray-700">이름</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder="홍길동"
                maxLength={30}
                disabled={!!activeUser}
                required={!activeUser}
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-20 text-sm font-semibold text-gray-700">이메일</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                placeholder="example@email.com"
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                maxLength={80}
                disabled={!!activeUser}
                required={!activeUser}
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-20 text-sm font-semibold text-gray-700">비밀번호</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleFormChange}
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                maxLength={4}
                placeholder="4자리 숫자"
              />
            </div>
          </div>

          {/* 제목 */}
          <div className="flex items-center gap-4">
            <label className="w-20 text-sm font-semibold text-gray-700">제목</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="문의 제목을 입력하세요"
              maxLength={120}
              required
            />
          </div>

          {/* 질문 내용 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">질문 내용</label>
            <Editor ref={editorRef} previewStyle="vertical" height="320px" initialEditType="wysiwyg" useCommandShortcut />
          </div>

          {/* 하단 버튼 */}
          <div className="flex justify-between items-center border-t pt-4 mt-6 gap-2">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <i className="ri-information-line" />
              작성 중 내용은 자동으로 저장됩니다.
              <button
                type="button"
                onClick={() => {
                  try {
                    localStorage.removeItem(dk(userKeyRef.current));
                    toast('초안을 삭제했습니다.');
                  } catch {
                    try {
                      if (typeof window !== 'undefined' && 'sessionStorage' in window) {
                        sessionStorage.removeItem(dk(userKeyRef.current));
                        toast('로컬 저장소 삭제에 실패하여 세션 초안만 삭제했어요.', { icon: '🧹' });
                      }
                    } catch {
                      toast.error('초안 삭제에 실패했어요. 브라우저 저장소를 확인해주세요.');
                    }
                  }
                }}
                className="ml-1 underline hover:text-gray-700"
                title="초안 삭제"
              >
                초안 삭제
              </button>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-md border border-gray-300"
              >
                취소
              </button>
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold">
                등록
              </button>
            </div>
          </div>
        </form>
      )}

      {/* List */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
          <i className="ri-discuss-line mr-2 text-blue-500" />
          문의 목록
          <span className="ml-2 text-sm text-gray-500 font-normal">총 {filtered.length}개</span>
        </h3>

        {filtered.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-gray-300 rounded-lg bg-gray-50">
            <i className="ri-message-line text-gray-400 text-5xl mb-2" />
            <p className="text-gray-600 font-medium">조건에 맞는 문의가 없습니다.</p>
            <p className="text-gray-500 text-sm">검색어나 정렬 조건을 변경해보세요.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto border rounded-lg bg-white shadow-sm">
              <div className="flex flex-wrap items-center gap-2 p-3 border-b">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="제목/작성자 검색"
                    className="border rounded-md px-3 py-2 w-56 focus:ring-2 focus:ring-blue-500"
                  />
                  <select
                    value={sortKey}
                    onChange={(e) => setSortKey(e.target.value as any)}
                    className="border rounded-md px-2 py-2 text-sm"
                  >
                    <option value="dateDesc">최신순</option>
                    <option value="dateAsc">오래된순</option>
                    <option value="titleAsc">오름차</option>
                    <option value="titleDesc">내림차</option>
                  </select>
                </div>

                <div className="h-6 w-px bg-gray-300" />

                <button
                  onClick={() => setShowForm((s) => !s)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium flex items-center shadow-sm"
                >
                  <i className={`${showForm ? 'ri-close-line' : 'ri-add-line'} mr-1`} />
                  {showForm ? '닫기' : '문의 작성'}
                </button>

                <button
                  onClick={handleExportJSON}
                  className="px-3 py-2 rounded-md border bg-white hover:bg-gray-50 flex items-center text-sm"
                  title="JSON 내보내기"
                >
                  <i className="ri-download-2-line mr-1" />
                  내보내기
                </button>

                <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={handleImportJSON} />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-2 rounded-md border bg-white hover:bg-gray-50 flex items-center text-sm"
                  title="JSON 불러오기"
                >
                  <i className="ri-upload-2-line mr-1" />
                  불러오기
                </button>

                <button
                  onClick={handleClearAll}
                  className="px-3 py-2 rounded-md border bg-white hover:bg-gray-50 flex items-center text-sm text-red-600"
                  title="전체 삭제"
                >
                  <i className="ri-delete-bin-6-line mr-1" />
                  전체삭제
                </button>
              </div>

              <table className="w-full border-collapse text-left text-gray-800">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-4 py-2 w-16 text-center">번호</th>
                    <th className="px-4 py-2">제목</th>
                    <th className="px-4 py-2 w-40 text-center">작성자</th>
                    <th className="px-4 py-2 w-44 text-center">등록일</th>
                    <th className="px-4 py-2 w-40 text-center">관리</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPageItems.map((inq, idx) => {
                    const listIndex = (page - 1) * PAGE_SIZE + idx;
                    const displayNo = filtered.length - listIndex;
                    return (
                      <tr
                        key={inq.id}
                        className={`hover:bg-gray-50 transition-colors border-b cursor-pointer ${selectedInquiryId === inq.id ? 'bg-blue-50' : ''}`}
                        onClick={(e) => {
                          const tag = (e.target as HTMLElement).tagName;
                          if (tag !== 'BUTTON' && tag !== 'I') {
                            setSelectedInquiryId(selectedInquiryId === inq.id ? null : inq.id);
                          }
                        }}
                      >
                        <td className="text-center py-2">{displayNo}</td>
                        <td className="py-2 px-3">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">{inq.title}</span>
                            {inq.answers.length > 0 && <Badge text={`답변 ${inq.answers.length}`} color="bg-blue-100 text-blue-700" />}
                            {inq.replies.length > 0 && <Badge text={`댓글 ${inq.replies.length}`} color="bg-gray-100 text-gray-700" />}
                          </div>
                        </td>
                        <td className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Avatar name={inq.name || '익명'} seed={inq.id} image={resolveProfileImage(inq)} />
                            <div className="text-sm leading-tight">
                              <div className="font-medium">{inq.name || '익명'}</div>
                            </div>
                          </div>
                        </td>
                        <td className="text-center text-sm">
                          <div className="flex flex-col items-center">
                            <div>{fmtKoreanDate(inq.date)}</div>
                            <div className="text-[11px] text-gray-500">{relativeTimeFromISO(inq.date)}</div>
                          </div>
                        </td>
                        <td className="text-center">
                          <div className="flex items-center justify-center">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openPasswordModal(inq, 'edit');
                              }}
                              className="text-blue-600 hover:underline mr-3 flex items-center"
                            >
                              <i className="ri-edit-2-line mr-1" />
                              수정
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openPasswordModal(inq, 'delete');
                              }}
                              className="text-red-600 hover:underline flex items-center"
                            >
                              <i className="ri-delete-bin-6-line mr-1" />
                              삭제
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 border rounded disabled:opacity-50 bg-white hover:bg-gray-50"
              >
                이전
              </button>
              <span className="text-sm text-gray-600">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50 bg-white hover:bg-gray-50"
              >
                다음
              </button>
            </div>

            {/* 상세보기 및 수정 */}
            {selectedPost && !isEditing && (
              <div className="mt-6 border border-gray-200 rounded-lg bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between border-b pb-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{selectedPost.title}</h3>
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="inline-flex items-center gap-2">
                        <Avatar name={selectedPost.name || '익명'} seed={selectedPost.id} image={resolveProfileImage(selectedPost)} />
                        <span className="font-medium">{selectedPost.name || '익명'}</span>
                      </span>

                      <span className="text-gray-300">|</span>
                      <span>{fmtKoreanDate(selectedPost.date)}</span>
                      <span className="text-gray-400 text-xs">({relativeTimeFromISO(selectedPost.date)})</span>

                      {selectedPost.email && (
                        <>
                          <span className="text-gray-300">|</span>
                          <span className="text-xs text-gray-500">{maskEmail(selectedPost.email)}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => openPasswordModal(selectedPost, 'edit')} className="px-3 py-2 rounded-md border bg-white hover:bg-gray-50 flex items-center text-sm">
                      <i className="ri-edit-2-line mr-1" />
                      수정
                    </button>
                    <button onClick={() => openPasswordModal(selectedPost, 'delete')} className="px-3 py-2 rounded-md border bg-white hover:bg-gray-50 flex items-center text-sm text-red-600">
                      <i className="ri-delete-bin-6-line mr-1" />
                      삭제
                    </button>
                  </div>
                </div>

                {/* 본문 */}
                <div className="prose max-w-none mb-6" dangerouslySetInnerHTML={{ __html: selectedPost.content }} />

                {/* 답변/댓글 섹션 */}
                <AnswerSection post={selectedPost} setInquiries={setInquiries} />
                <ReplySection  post={selectedPost} setInquiries={setInquiries} />
              </div>
            )}

            {isEditing && editingInquiry && (
              <div className="mt-6 border border-blue-300 rounded-lg bg-blue-50 p-6 shadow-md">
                <h3 className="text-xl font-bold text-blue-900 mb-3">문의 수정</h3>
                <input
                  type="text"
                  value={editingInquiry.title}
                  onChange={(e) => setEditingInquiry({ ...editingInquiry, title: e.target.value })}
                  className="w-full border rounded-md p-2 mb-4"
                  placeholder="제목 수정"
                />
                <Editor ref={editEditorRef} previewStyle="vertical" height="320px" initialEditType="wysiwyg" useCommandShortcut />
                <div className="flex justify-end space-x-2 mt-4">
                  <button onClick={() => setIsEditing(false)} className="bg-gray-300 px-4 py-2 rounded">
                    취소
                  </button>
                  <button
                    onClick={() => {
                      const newContent = editEditorRef.current?.getInstance().getHTML();
                      if (!editingInquiry.title.trim() || !newContent?.trim()) {
                        toast.error('제목과 내용을 입력해주세요.');
                        return;
                      }
                      setInquiries((prev) =>
                        prev.map((p) => (p.id === editingInquiry.id ? { ...p, title: editingInquiry.title, content: newContent } : p))
                      );
                      toast.success('문의가 수정되었습니다!');
                      setIsEditing(false);
                      setEditingInquiry(null);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    저장
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------ Answer Section ----------------------------- */
function AnswerSection({
  post,
  setInquiries,
}: {
  post: Inquiry;
  setInquiries: React.Dispatch<React.SetStateAction<Inquiry[]>>;
}) {
  const [answerText, setAnswerText] = useState('');
  const [showAnswerBox, setShowAnswerBox] = useState(false);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [nestedText, setNestedText] = useState('');

  const getReplyDepth = (replies: Reply[], targetId: number, currentDepth: number = 0): number => {
    for (const reply of replies) {
      if (reply.id === targetId) return currentDepth;
      if (reply.replies.length > 0) {
        const depth = getReplyDepth(reply.replies, targetId, currentDepth + 1);
        if (depth !== -1) return depth;
      }
    }
    return -1;
  };
  const addReplyNested = (replies: Reply[], parentId: number, newReply: Reply): Reply[] =>
    replies.map((reply) =>
      reply.id === parentId ? { ...reply, replies: [...reply.replies, newReply] } : { ...reply, replies: addReplyNested(reply.replies, parentId, newReply) }
    );

  const handleAddAnswer = () => {
    if (!answerText.trim()) {
      toast.error('답변을 입력해주세요.');
      return;
    }
    const newAnswer: Reply = { id: Date.now(), text: answerText, date: fmtDateISO()!, replies: [] };
    setInquiries((prev) => prev.map((p) => (p.id === post.id ? { ...p, answers: [...p.answers, newAnswer] } : p)));
    toast.success('답변이 등록되었습니다!');
    setAnswerText('');
    setShowAnswerBox(false);
  };

  const handleAddNested = (parentId: number) => {
    if (!nestedText.trim()) {
      toast.error('답글을 입력해주세요.');
      return;
    }
    const depth = getReplyDepth(post.answers, parentId);
    if (depth >= 2) {
      toast.error('답글은 3단계까지만 가능합니다.');
      return;
    }
    const newReply: Reply = { id: Date.now(), text: nestedText, date: fmtDateISO()!, replies: [] };
    setInquiries((prev) => prev.map((p) => (p.id === post.id ? { ...p, answers: addReplyNested(p.answers, parentId, newReply) } : p)));
    toast.success('답글이 등록되었습니다!');
    setNestedText('');
    setReplyingTo(null);
  };

  const renderAnswers = (answers: Reply[], depth: number = 0): JSX.Element[] =>
    answers.map((answer) => (
      <div key={answer.id} className="mt-3">
        <div className={`bg-blue-50 p-4 rounded border border-blue-200 ${depth > 0 ? 'ml-8' : ''}`}>
          <div className="flex items-start">
            <i className="ri-chat-check-line text-blue-600 mr-2 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-gray-800 mb-2 whitespace-pre-wrap break-words">{answer.text}</p>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>
                  {fmtKoreanDate(answer.date)} <span className="text-gray-400">({relativeTimeFromISO(answer.date)})</span>
                </span>
                {depth < 2 && (
                  <button
                    onClick={() => {
                      setReplyingTo(answer.id);
                      setShowAnswerBox(false);
                      setNestedText('');
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    답글
                  </button>
                )}
              </div>
              {replyingTo === answer.id && (
                <div className="mt-2">
                  <textarea
                    value={nestedText}
                    onChange={(e) => setNestedText(e.target.value)}
                    rows={2}
                    className="w-full border rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="답글을 입력하세요"
                  />
                  <div className="flex justify-end space-x-2 mt-1">
                    <button
                      onClick={() => {
                        setReplyingTo(null);
                        setNestedText('');
                      }}
                      className="text-xs text-gray-600 hover:underline"
                    >
                      취소
                    </button>
                    <button onClick={() => handleAddNested(answer.id)} className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                      등록
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {answer.replies.length > 0 && <div>{renderAnswers(answer.replies, depth + 1)}</div>}
      </div>
    ));

  return (
    <div className="border-t border-b py-4 mb-4">
      <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
        <i className="ri-question-answer-line mr-2 text-blue-600" />
        답변 {post.answers.length}개
      </h4>
      {post.answers.length > 0 && <div>{renderAnswers(post.answers)}</div>}
      {!showAnswerBox ? (
        <button
          onClick={() => {
            setShowAnswerBox(true);
            setReplyingTo(null);
          }}
          className="mt-3 text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + 답변 작성
        </button>
      ) : (
        <div className="mt-3">
          <textarea
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            rows={4}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="게시글에 대한 답변을 입력하세요"
          />
          <div className="flex justify-end space-x-2 mt-2">
            <button
              onClick={() => {
                setShowAnswerBox(false);
                setAnswerText('');
              }}
              className="text-sm text-gray-600 hover:underline"
            >
              취소
            </button>
            <button onClick={handleAddAnswer} className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              답변 등록
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------ Reply Section ------------------------------ */
function ReplySection({
  post,
  setInquiries,
}: {
  post: Inquiry;
  setInquiries: React.Dispatch<React.SetStateAction<Inquiry[]>>;
}) {
  const [replyText, setReplyText] = useState('');
  const [showMainBox, setShowMainBox] = useState(false);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [nestedText, setNestedText] = useState('');

  const getReplyDepth = (replies: Reply[], targetId: number, currentDepth: number = 0): number => {
    for (const reply of replies) {
      if (reply.id === targetId) return currentDepth;
      if (reply.replies.length > 0) {
        const depth = getReplyDepth(reply.replies, targetId, currentDepth + 1);
        if (depth !== -1) return depth;
      }
    }
    return -1;
  };
  const addReplyNested = (replies: Reply[], parentId: number, newReply: Reply): Reply[] =>
    replies.map((reply) =>
      reply.id === parentId ? { ...reply, replies: [...reply.replies, newReply] } : { ...reply, replies: addReplyNested(reply.replies, parentId, newReply) }
    );

  const handleAddMain = () => {
    if (!replyText.trim()) {
      toast.error('댓글을 입력해주세요.');
      return;
    }
    const newReply: Reply = { id: Date.now(), text: replyText, date: fmtDateISO()!, replies: [] };
    setInquiries((prev) => prev.map((p) => (p.id === post.id ? { ...p, replies: [...p.replies, newReply] } : p)));
    toast.success('댓글이 등록되었습니다!');
    setReplyText('');
    setShowMainBox(false);
  };

  const handleAddNested = (parentId: number) => {
    if (!nestedText.trim()) {
      toast.error('답글을 입력해주세요.');
      return;
    }
    const depth = getReplyDepth(post.replies, parentId);
    if (depth >= 2) {
      toast.error('답글은 3단계까지만 가능합니다.');
      return;
    }
    const newReply: Reply = { id: Date.now(), text: nestedText, date: fmtDateISO()!, replies: [] };
    setInquiries((prev) => prev.map((p) => (p.id === post.id ? { ...p, replies: addReplyNested(p.replies, parentId, newReply) } : p)));
    toast.success('답글이 등록되었습니다!');
    setNestedText('');
    setReplyingTo(null);
  };

  const renderReplies = (replies: Reply[], depth: number = 0): JSX.Element[] =>
    replies.map((reply) => (
      <div key={reply.id} className={`${depth > 0 ? 'ml-8' : ''} mt-3`}>
        <div className="bg-gray-50 p-3 rounded border border-gray-200">
          <p className="text-gray-800 mb-2 whitespace-pre-wrap break-words">{reply.text}</p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>
              {fmtKoreanDate(reply.date)} <span className="text-gray-400">({relativeTimeFromISO(reply.date)})</span>
            </span>
            {depth < 2 && (
              <button
                onClick={() => {
                  setReplyingTo(reply.id);
                  setShowMainBox(false);
                  setNestedText('');
                }}
                className="text-blue-600 hover:underline"
              >
                답글
              </button>
            )}
          </div>
          {replyingTo === reply.id && (
            <div className="mt-2">
              <textarea
                value={nestedText}
                onChange={(e) => setNestedText(e.target.value)}
                rows={2}
                className="w-full border rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="답글을 입력하세요"
              />
              <div className="flex justify-end space-x-2 mt-1">
                <button
                  onClick={() => {
                    setReplyingTo(null);
                    setNestedText('');
                  }}
                  className="text-xs text-gray-600 hover:underline"
                >
                  취소
                </button>
                <button onClick={() => handleAddNested(reply.id)} className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                  등록
                </button>
              </div>
            </div>
          )}
        </div>
        {reply.replies.length > 0 && renderReplies(reply.replies, depth + 1)}
      </div>
    ));

  return (
    <div className="pt-4">
      <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
        <i className="ri-chat-3-line mr-2 text-gray-600" />
        댓글 {post.replies.length}개
      </h4>
      {post.replies.length > 0 && <div>{renderReplies(post.replies)}</div>}
      {!showMainBox ? (
        <button
          onClick={() => {
            setShowMainBox(true);
            setReplyingTo(null);
          }}
          className="mt-3 text-sm text-blue-600 hover:underline"
        >
          + 댓글 작성
        </button>
      ) : (
        <div className="mt-3">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            rows={3}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="댓글을 입력하세요"
          />
          <div className="flex justify-end space-x-2 mt-2">
            <button
              onClick={() => {
                setShowMainBox(false);
                setReplyText('');
              }}
              className="text-sm text-gray-600 hover:underline"
            >
              취소
            </button>
            <button onClick={handleAddMain} className="text-sm bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
              등록
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
