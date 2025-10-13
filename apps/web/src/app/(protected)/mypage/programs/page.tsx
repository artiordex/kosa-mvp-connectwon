/**
 * Description : mypage/reservations/page.tsx - 📌 내 예약/프로그램 현황 (제안 + 신청 + 개설)
 * Author : Shiwoo Min (+ proposals modal detail, + created programs modal + withdraw, + toast UX)
 * Date : 2025-10-13
 */

'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

// 샘플 세션 데이터
import sessionUser from 'data/mypage-with-user.json';

// 로컬스토리지 키
const PROPOSAL_KEY = 'program_proposals';
const CREATED_HIDDEN_KEY = 'my_created_programs_hidden'; // 내가 개설한 프로그램 중 숨긴(철회) ID 보관

// ===== 타입 =====
type LocalProposal = {
  id: string;
  title?: string;
  category?: string;
  type?: string; // '온라인' | '오프라인' | etc
  location?: string;
  duration?: string;
  capacity?: number;
  price?: number;
  level?: string;
  description?: string;
  requirements?: string;
  materials?: string;
  scheduleISO?: string | null;
  fileName?: string | null;
  fileType?: string | null;
  status?: '승인 대기중' | '승인됨' | '반려됨';
  createdAt?: string;
};

type CreatedProgram = {
  id: string;
  title: string;
  category: string;
  instructor: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: number;
  participants: number;
  maxParticipants: number;
  status: 'scheduled' | 'completed' | 'canceled';
  rating: number;
  reviews: number;
  image: string;
  createdAt: string;
  materials?: string[]; // 일부에만 있을 수 있어 optional
  targetAudience?: string;
  difficulty?: string;
};

type EnrolledProgram = {
  id: number;
  type: 'program';
  title: string;
  instructor: string;
  location: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'canceled';
  participants: number;
  maxParticipants: number;
  image: string;
  reservedAt: string;
  cancelable: boolean;
  category: string;
  review?: {
    rating: number;
    comment: string;
  };
};

// ===== Toast =====
type ToastType = 'info' | 'success' | 'warning';
function Toast({ show, message, type }: { show: boolean; message: string; type: ToastType }) {
  const color =
    type === 'success'
      ? 'bg-green-600'
      : type === 'warning'
      ? 'bg-yellow-600'
      : 'bg-gray-900';
  return (
    <div
      className={`pointer-events-none fixed left-1/2 -translate-x-1/2 bottom-8 z-50 transition-all duration-300 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      }`}
    >
      <div className={`${color} text-white shadow-lg rounded-full px-4 py-2 text-sm flex items-center gap-2`}>
        <i
          className={
            type === 'success'
              ? 'ri-checkbox-circle-line'
              : type === 'warning'
              ? 'ri-error-warning-line'
              : 'ri-notification-3-line'
          }
        />
        <span>{message}</span>
      </div>
    </div>
  );
}

// ===== Modal: 제안 상세 =====
function ProposalDetailModal({
  open,
  onClose,
  proposal,
}: {
  open: boolean;
  onClose: () => void;
  proposal: LocalProposal | null;
}) {
  if (!open || !proposal) return null;

  const scheduleText = proposal.scheduleISO
    ? new Date(proposal.scheduleISO).toLocaleString('ko-KR')
    : '미지정';
  const createdText = proposal.createdAt
    ? new Date(proposal.createdAt).toLocaleString('ko-KR')
    : '-';

  const badgeColor =
    proposal.status === '승인됨'
      ? 'bg-green-100 text-green-800'
      : proposal.status === '반려됨'
      ? 'bg-red-100 text-red-800'
      : 'bg-blue-100 text-blue-800';

  const viewHref = `/programs/proposals/complete?id=${encodeURIComponent(
    proposal.id
  )}&title=${encodeURIComponent(proposal.title || '')}&type=${proposal.type || ''}&location=${encodeURIComponent(
    proposal.location || ''
  )}&date=${
    proposal.scheduleISO ? new Date(proposal.scheduleISO).toISOString().slice(0, 10) : ''
  }&time=${proposal.scheduleISO ? new Date(proposal.scheduleISO).toTimeString().slice(0, 5) : ''}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="max-w-2xl w-full bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-gray-900">{proposal.title || '제목 미지정'}</h3>
            <span className={`text-xs px-2 py-1 rounded-full ${badgeColor}`}>
              {proposal.status || '승인 대기중'}
            </span>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <i className="ri-close-line text-xl" />
          </button>
        </div>

        <div className="px-6 py-5">
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-500 mb-1">유형</div>
              <div className="font-medium text-gray-800">{proposal.type || '-'}</div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">장소</div>
              <div className="font-medium text-gray-800">{proposal.location || '-'}</div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">희망일정</div>
              <div className="font-medium text-gray-800">{scheduleText}</div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">제안일</div>
              <div className="font-medium text-gray-800">{createdText}</div>
            </div>

            {proposal.capacity !== undefined && (
              <div>
                <div className="text-gray-500 mb-1">정원</div>
                <div className="font-medium text-gray-800">{proposal.capacity}</div>
              </div>
            )}
            {proposal.price !== undefined && (
              <div>
                <div className="text-gray-500 mb-1">참가비</div>
                <div className="font-medium text-gray-800">{proposal.price.toLocaleString()}원</div>
              </div>
            )}
            {proposal.level && (
              <div>
                <div className="text-gray-500 mb-1">수준</div>
                <div className="font-medium text-gray-800">{proposal.level}</div>
              </div>
            )}
            {proposal.duration && (
              <div>
                <div className="text-gray-500 mb-1">수업시간</div>
                <div className="font-medium text-gray-800">{proposal.duration}</div>
              </div>
            )}
          </div>

          {proposal.description && (
            <div className="mt-5">
              <div className="text-gray-500 mb-1 text-sm">프로그램 설명</div>
              <div className="text-gray-800 text-sm whitespace-pre-wrap">{proposal.description}</div>
            </div>
          )}

          {(proposal.requirements || proposal.materials) && (
            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              {proposal.requirements && (
                <div>
                  <div className="text-gray-500 mb-1 text-sm">준비사항</div>
                  <div className="text-gray-800 text-sm whitespace-pre-wrap">{proposal.requirements}</div>
                </div>
              )}
              {proposal.materials && (
                <div>
                  <div className="text-gray-500 mb-1 text-sm">재료/시설</div>
                  <div className="text-gray-800 text-sm whitespace-pre-wrap">{proposal.materials}</div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t flex items-center justify-end gap-2 bg-gray-50">
          <Link href={viewHref} className="px-4 py-2 text-sm rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">
            완전 페이지로 보기
          </Link>
          <button onClick={onClose} className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700">
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

// ===== Modal: 내가 개설한 프로그램 상세 =====
function CreatedProgramDetailModal({
  open,
  onClose,
  program,
  onWithdraw,
}: {
  open: boolean;
  onClose: () => void;
  program: CreatedProgram | null;
  onWithdraw: (id: string, title?: string) => void;
}) {
  if (!open || !program) return null;

  const badge =
    program.status === 'scheduled'
      ? '예정'
      : program.status === 'completed'
      ? '종료'
      : '취소';
  const badgeColor =
    program.status === 'scheduled'
      ? 'bg-indigo-100 text-indigo-800'
      : program.status === 'completed'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';

  const createdText = program.createdAt ? new Date(program.createdAt).toLocaleString('ko-KR') : '-';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="max-w-3xl w-full bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-gray-900">{program.title}</h3>
            <span className={`text-xs px-2 py-1 rounded-full ${badgeColor}`}>{badge}</span>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <i className="ri-close-line text-xl" />
          </button>
        </div>

        <div className="px-6 py-5">
          <div className="flex items-start gap-4">
            <img src={program.image} alt={program.title} className="w-28 h-20 object-cover rounded-lg border" />
            <div className="grid sm:grid-cols-2 gap-4 text-sm flex-1">
              <div>
                <div className="text-gray-500 mb-1">일정/장소</div>
                <div className="font-medium text-gray-800">
                  {program.date} {program.time} · {program.location}
                </div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">정원/신청</div>
                <div className="font-medium text-gray-800">
                  정원 {program.maxParticipants} · 신청 {program.participants}
                </div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">참가비</div>
                <div className="font-medium text-gray-800">{program.price.toLocaleString()}원</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">개설일</div>
                <div className="font-medium text-gray-800">{createdText}</div>
              </div>

              {program.targetAudience && (
                <div>
                  <div className="text-gray-500 mb-1">대상</div>
                  <div className="font-medium text-gray-800">{program.targetAudience}</div>
                </div>
              )}
              {program.difficulty && (
                <div>
                  <div className="text-gray-500 mb-1">난이도</div>
                  <div className="font-medium text-gray-800">{program.difficulty}</div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-5">
            <div className="text-gray-500 mb-1 text-sm">프로그램 설명</div>
            <div className="text-gray-800 text-sm whitespace-pre-wrap">{program.description}</div>
          </div>

          {program.materials && program.materials.length > 0 && (
            <div className="mt-5">
              <div className="text-gray-500 mb-1 text-sm">준비물</div>
              <ul className="text-gray-800 text-sm list-disc list-inside">
                {program.materials.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t flex flex-wrap items-center justify-end gap-2 bg-gray-50">
          <Link
            href={`/programs/${program.id}`}
            className="px-4 py-2 text-sm rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            상세 페이지로 이동
          </Link>
          <Link
            href={`/programs/${program.id}/manage`}
            className="px-4 py-2 text-sm rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100"
          >
            운영/관리
          </Link>
          <button
            onClick={() => onWithdraw(program.id, program.title)}
            className="px-4 py-2 text-sm rounded-lg bg-red-50 text-red-700 hover:bg-red-100"
            title="철회(내 목록에서 숨김)"
          >
            철회
          </button>
          <button onClick={onClose} className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700">
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MyReservationsAndProgramsPage() {
  // 제안(로컬)
  const [proposals, setProposals] = useState<LocalProposal[]>([]);

  // 내가 신청/개설 (세션 JSON)
  const enrolledPrograms = useMemo(
    () => ((sessionUser as any)?.myReservations ?? []) as EnrolledProgram[],
    []
  );
  const createdProgramsAll = useMemo(
    () => ((sessionUser as any)?.myCreatedPrograms ?? []) as CreatedProgram[],
    []
  );

  // 숨김(철회)된 created program id 관리
  const [hiddenCreatedIds, setHiddenCreatedIds] = useState<Set<string>>(new Set());
  const createdPrograms = useMemo(
    () => createdProgramsAll.filter((cp) => !hiddenCreatedIds.has(cp.id)),
    [createdProgramsAll, hiddenCreatedIds]
  );

  // Toast
  const [toast, setToast] = useState<{ show: boolean; message: string; type: ToastType }>({
    show: false,
    message: '',
    type: 'info',
  });
  const showToast = (message: string, type: ToastType = 'info', ms = 1600) => {
    setToast({ show: true, message, type });
    window.setTimeout(() => setToast((t) => ({ ...t, show: false })), ms);
  };

  // 모달
  const [proposalDetailOpen, setProposalDetailOpen] = useState(false);
  const [proposalDetail, setProposalDetail] = useState<LocalProposal | null>(null);

  const [createdDetailOpen, setCreatedDetailOpen] = useState(false);
  const [createdDetail, setCreatedDetail] = useState<CreatedProgram | null>(null);

  // 초기 로드: 제안 목록
  useEffect(() => {
    try {
      const raw = localStorage.getItem(PROPOSAL_KEY) || '[]';
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) {
        const sorted = [...arr].sort((a, b) => {
          const ca = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
          const cb = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
          return cb - ca;
        });
        setProposals(sorted);
      } else {
        setProposals([]);
      }
    } catch {
      setProposals([]);
    }
  }, []);

  // 초기 로드: 숨김된 created 프로그램
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CREATED_HIDDEN_KEY) || '[]';
      const ids: string[] = JSON.parse(raw);
      setHiddenCreatedIds(new Set(Array.isArray(ids) ? ids : []));
    } catch {
      setHiddenCreatedIds(new Set());
    }
  }, []);

  const persistHiddenCreated = (ids: Set<string>) => {
    try {
      localStorage.setItem(CREATED_HIDDEN_KEY, JSON.stringify(Array.from(ids)));
    } catch {
      // ignore
    }
  };

  // 제안 철회
  const handleWithdrawProposal = (id: string, title?: string) => {
    const ok = window.confirm(`'${title || '제안'}' 제안을 철회하시겠어요?\n(로컬 목록에서 제거됩니다)`);
    if (!ok) return;

    const next = proposals.filter((p) => p.id !== id);
    setProposals(next);
    try {
      localStorage.setItem(PROPOSAL_KEY, JSON.stringify(next));
    } catch {
      // noop
    }
    showToast('제안이 철회되었습니다.', 'success');
  };

  // 내가 개설한 프로그램 철회(= 내 목록에서 숨김)
  const handleWithdrawCreated = (id: string, title?: string) => {
    const ok = window.confirm(`'${title || '프로그램'}'을(를) 내 목록에서 숨길까요?`);
    if (!ok) return;
    const next = new Set(hiddenCreatedIds);
    next.add(id);
    setHiddenCreatedIds(next);
    persistHiddenCreated(next);
    showToast('프로그램이 목록에서 숨겨졌습니다.', 'success');
    setCreatedDetailOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      {/* 토스트 */}
      <Toast show={toast.show} message={toast.message} type={toast.type} />

      {/* 모달: 제안 상세 */}
      <ProposalDetailModal
        open={proposalDetailOpen}
        onClose={() => setProposalDetailOpen(false)}
        proposal={proposalDetail}
      />

      {/* 모달: 내가 개설한 프로그램 상세 */}
      <CreatedProgramDetailModal
        open={createdDetailOpen}
        onClose={() => setCreatedDetailOpen(false)}
        program={createdDetail}
        onWithdraw={handleWithdrawCreated}
      />

      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">내 예약·프로그램 현황</h1>
          <p className="text-gray-600 mt-2">제안한 프로그램, 내가 개설한 프로그램, 신청한 프로그램을 한곳에서 확인해요.</p>
        </div>

        {/* 섹션 1: 내가 제안한 프로그램 */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">제안한 프로그램</h2>
            <Link href="/programs/create" className="text-sm px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              새 제안 작성
            </Link>
          </div>

          {proposals.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-300 rounded-xl p-8 text-center">
              <i className="ri-lightbulb-line text-4xl text-gray-400"></i>
              <p className="mt-3 font-medium text-gray-800">아직 제안한 프로그램이 없습니다.</p>
              <p className="text-sm text-gray-600 mt-1">아이디어를 제안하면 운영자 검토 후 오픈됩니다.</p>
              <div className="mt-4">
                <Link
                  href="/programs/create"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <i className="ri-add-line mr-1"></i> 제안하러 가기
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              {proposals.map((p) => {
                const created = p.createdAt ? new Date(p.createdAt).toLocaleString('ko-KR') : '-';
                const schedule = p.scheduleISO ? new Date(p.scheduleISO).toLocaleString('ko-KR') : '미지정';
                const badgeColor =
                  p.status === '승인됨'
                    ? 'bg-green-100 text-green-800'
                    : p.status === '반려됨'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-blue-100 text-blue-800';

                return (
                  <div key={p.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-gray-900">{p.title || '제목 미지정'}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${badgeColor}`}>{p.status || '승인 대기중'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setProposalDetail(p);
                            setProposalDetailOpen(true);
                          }}
                          className="text-sm px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                        >
                          상세
                        </button>
                        <button
                          onClick={() => handleWithdrawProposal(p.id, p.title)}
                          className="text-sm px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100"
                          title="제안 철회(로컬 목록에서 제거)"
                        >
                          철회
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 grid sm:grid-cols-2 gap-3 text-sm">
                      <div className="text-gray-600">
                        <span className="text-gray-500 mr-2">유형</span>
                        <span className="font-medium text-gray-800">{p.type || '-'}</span>
                      </div>
                      <div className="text-gray-600">
                        <span className="text-gray-500 mr-2">장소</span>
                        <span className="font-medium text-gray-800">{p.location || '-'}</span>
                      </div>
                      <div className="text-gray-600">
                        <span className="text-gray-500 mr-2">희망일정</span>
                        <span className="font-medium text-gray-800">{schedule}</span>
                      </div>
                      <div className="text-gray-600">
                        <span className="text-gray-500 mr-2">제안일</span>
                        <span className="font-medium text-gray-800">{created}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* 섹션 2: 내가 개설한 프로그램 */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">내가 개설한 프로그램</h2>
            <Link href="/programs/create" className="text-sm px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              새로 개설
            </Link>
          </div>

          {createdPrograms.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-300 rounded-xl p-8 text-center">
              <i className="ri-rocket-line text-4xl text-gray-400"></i>
              <p className="mt-3 font-medium text-gray-800">개설한 프로그램이 없습니다.</p>
              <p className="text-sm text-gray-600 mt-1">첫 프로그램을 개설해보세요.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {createdPrograms.map((cp) => (
                <div key={cp.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start gap-4">
                    <img src={cp.image} alt={cp.title} className="w-24 h-16 object-cover rounded-lg border" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">{cp.title}</h3>
                        <span className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-800">
                          {cp.status === 'scheduled' ? '예정' : cp.status === 'completed' ? '종료' : '취소'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {cp.date} {cp.time} · {cp.location}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        정원 {cp.maxParticipants} · 신청 {cp.participants} · 평점 {cp.rating} ({cp.reviews})
                      </p>

                      <div className="mt-3 flex items-center gap-2">
                        <button
                          onClick={() => {
                            setCreatedDetail(cp);
                            setCreatedDetailOpen(true);
                          }}
                          className="text-sm px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                        >
                          상세
                        </button>
                        <Link
                          href={`/programs/${cp.id}/manage`}
                          className="text-sm px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100"
                        >
                          운영/관리
                        </Link>
                        <button
                          onClick={() => handleWithdrawCreated(cp.id, cp.title)}
                          className="text-sm px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100"
                          title="철회(내 목록에서 숨김)"
                        >
                          철회
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 섹션 3: 내가 신청한 프로그램 */}
        <section className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">신청한 프로그램</h2>

          {useMemo(() => ((sessionUser as any)?.myReservations ?? []) as EnrolledProgram[], []).length === 0 ? (
            <div className="bg-white border border-dashed border-gray-300 rounded-xl p-8 text-center">
              <i className="ri-calendar-line text-4xl text-gray-400"></i>
              <p className="mt-3 font-medium text-gray-800">신청한 프로그램이 없습니다.</p>
              <p className="text-sm text-gray-600 mt-1">관심 프로그램을 찾아 신청해보세요.</p>
              <div className="mt-4">
                <Link
                  href="/programs"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <i className="ri-compass-3-line mr-1"></i> 프로그램 둘러보기
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              {(((sessionUser as any)?.myReservations ?? []) as EnrolledProgram[]).map((en) => (
                <div key={en.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start gap-4">
                    <img src={en.image} alt={en.title} className="w-24 h-16 object-cover rounded-lg border" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">{en.title}</h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            en.status === 'upcoming'
                              ? 'bg-blue-100 text-blue-800'
                              : en.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {en.status === 'upcoming' ? '예정' : en.status === 'completed' ? '수료' : '취소'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {en.date} {en.time} · {en.location} · 강사 {en.instructor}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">정원 {en.maxParticipants} · 현재 {en.participants}</p>
                      {en.review && en.status === 'completed' && (
                        <p className="text-sm text-gray-600 mt-1">
                          내 리뷰: ★{en.review.rating} — {en.review.comment}
                        </p>
                      )}

                      <div className="mt-3 flex items-center gap-2">
                        <Link
                          href={`/programs/${en.id}`}
                          className="text-sm px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                        >
                          상세
                        </Link>
                        {en.status === 'upcoming' && en.cancelable && (
                          <button
                            className="text-sm px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100"
                            onClick={() => {
                              window.alert('운영자 정책상 취소는 프로그램 상세에서 처리됩니다.');
                            }}
                          >
                            취소
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
