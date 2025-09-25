/**
 * Description : program.interface.ts - 📌 프로그램 서비스 인터페이스 정의
 * Author : Shiwoo Min
 * Date : 2025-09-26
 */

// Placeholder 타입들 (나중에 packages/api-contract/schemas 로 대체 예정)
type Program = any;
type ProgramCreateRequest = any;
type ProgramUpdateRequest = any;
type ProgramSession = any;
type SessionCreateRequest = any;
type ProgramParticipant = any;
type ProgramReview = any;
type ProgramFilter = any;
type ProgramCategory = any;
type ProgramStatus = 'draft' | 'active' | 'suspended' | 'completed' | 'cancelled';
type ParticipantStatus = 'enrolled' | 'waitlisted' | 'completed' | 'cancelled' | 'no_show';
type UserRole = 'user' | 'creator' | 'admin' | 'super_admin';

/**
 * @description 프로그램 서비스 인터페이스
 */
export interface IProgramService {
  // 프로그램 생성/관리 (크리에이터 이상)
  createProgram(creatorId: string, programData: ProgramCreateRequest): Promise<Program>;
  updateProgram(creatorId: string, programId: string, updateData: ProgramUpdateRequest): Promise<Program>;
  deleteProgram(creatorId: string, programId: string): Promise<void>;
  duplicateProgram(creatorId: string, programId: string): Promise<Program>;

  // 프로그램 상태 관리
  publishProgram(creatorId: string, programId: string): Promise<Program>;
  suspendProgram(creatorId: string, programId: string, reason?: string): Promise<void>;
  completeProgram(creatorId: string, programId: string): Promise<void>;

  // 프로그램 조회
  getAllPrograms(filter?: ProgramFilter, limit?: number, offset?: number): Promise<Program[]>;
  getProgramById(programId: string): Promise<Program>;
  getProgramsByCreator(creatorId: string, status?: ProgramStatus): Promise<Program[]>;
  getProgramsByCategory(categoryId: string): Promise<Program[]>;
  searchPrograms(query: string, filter?: ProgramFilter): Promise<Program[]>;

  // 세션 관리
  createSession(creatorId: string, programId: string, sessionData: SessionCreateRequest): Promise<ProgramSession>;
  updateSession(creatorId: string, sessionId: string, updateData: any): Promise<ProgramSession>;
  deleteSession(creatorId: string, sessionId: string): Promise<void>;
  getProgramSessions(programId: string): Promise<ProgramSession[]>;
  getSessionById(sessionId: string): Promise<ProgramSession>;

  // 참가자 관리
  enrollParticipant(programId: string, userId: string): Promise<ProgramParticipant>;
  cancelEnrollment(programId: string, userId: string, reason?: string): Promise<void>;
  getProgramParticipants(programId: string, status?: ParticipantStatus): Promise<ProgramParticipant[]>;
  getParticipantStatus(programId: string, userId: string): Promise<ParticipantStatus>;
  markAttendance(sessionId: string, userId: string, attended: boolean): Promise<void>;

  // 대기자 관리
  addToWaitlist(programId: string, userId: string): Promise<void>;
  removeFromWaitlist(programId: string, userId: string): Promise<void>;
  getWaitlist(programId: string): Promise<any[]>;
  promoteFromWaitlist(programId: string, slots: number): Promise<void>;

  // 크리에이터 권한 검증
  validateCreatorPermission(userId: string): Promise<boolean>;
  checkProgramOwnership(userId: string, programId: string): Promise<boolean>;
  getCreatorStats(creatorId: string): Promise<any>;
  getCreatorPrograms(creatorId: string, status?: ProgramStatus): Promise<Program[]>;

  // 프로그램 승인 (어드민용)
  reviewProgram(adminId: string, programId: string, approved: boolean, feedback?: string): Promise<void>;
  getPendingPrograms(adminId: string): Promise<Program[]>;
  flagProgram(adminId: string, programId: string, reason: string): Promise<void>;

  // 리뷰/평가
  getProgramReviews(programId: string, limit?: number, offset?: number): Promise<ProgramReview[]>;
  addReview(userId: string, programId: string, reviewData: any): Promise<ProgramReview>;
  updateReview(userId: string, reviewId: string, reviewData: any): Promise<ProgramReview>;
  deleteReview(userId: string, reviewId: string): Promise<void>;

  // 카테고리 관리
  getAllCategories(): Promise<ProgramCategory[]>;
  createCategory(adminId: string, categoryData: any): Promise<ProgramCategory>;
  updateCategory(adminId: string, categoryId: string, updateData: any): Promise<ProgramCategory>;
  deleteCategory(adminId: string, categoryId: string): Promise<void>;

  // 통계/분석
  getProgramStats(programId: string): Promise<any>;
  getCreatorAnalytics(creatorId: string, period?: 'week' | 'month' | 'year'): Promise<any>;
  getPopularPrograms(limit?: number, period?: string): Promise<Program[]>;
  getProgramRevenue(programId: string, period?: string): Promise<any>;
}
