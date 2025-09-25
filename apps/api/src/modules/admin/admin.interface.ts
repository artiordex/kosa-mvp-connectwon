/**
 * Description : admin.interface.ts - 📌 관리자 서비스 인터페이스 정의 (참고용)
 * Author : Shiwoo Min
 * Date : 2025-09-26
 */

// Placeholder 타입들 (나중에 packages/api-contract/schemas 로 대체 예정)
type AdminUser = any;
type AdminCreateRequest = any;
type AdminUpdateRequest = any;
type AdminFilter = any;
type UserManagementRequest = any;
type VenueManagementRequest = any;
type SystemSettings = any;
type AnalyticsReport = any;
type AuditLog = any;
type BackupRequest = any;
type AdminRole = 'admin'; // admin만 존재
type UserRole = 'user' | 'creator' | 'admin';
type UserStatus = 'active' | 'inactive' | 'suspended' | 'deleted';
type SystemHealth = any;
type SecurityEvent = any;
type DashboardStats = any;

/**
 * 관리자 서비스 인터페이스
 */
export interface IAdminService {
  // 관리자 계정 관리
  createAdmin(adminData: AdminCreateRequest): Promise<AdminUser>;
  getAdminById(adminId: string): Promise<AdminUser>;
  updateAdmin(adminId: string, updateData: AdminUpdateRequest): Promise<AdminUser>;
  deleteAdmin(adminId: string): Promise<void>;
  getAllAdmins(filter?: AdminFilter, limit?: number, offset?: number): Promise<AdminUser[]>;

  // 대시보드
  getDashboardStats(): Promise<DashboardStats>;
  getDashboardOverview(): Promise<any>;
  getRealTimeMetrics(): Promise<any>;
  getRecentActivities(limit?: number): Promise<any[]>;

  // 사용자 관리
  getAllUsers(filter?: AdminFilter, limit?: number, offset?: number): Promise<any[]>;
  getUserDetail(userId: string): Promise<any>;
  updateUserStatus(userId: string, status: UserStatus): Promise<void>;
  suspendUser(userId: string, reason: string, duration?: number): Promise<void>;
  deleteUser(userId: string, reason: string): Promise<void>;
  resetUserPassword(userId: string): Promise<string>;

  // 크리에이터 관리 (사용자 → 크리에이터 승급 관리)
  getCreatorApplications(status?: string, limit?: number, offset?: number): Promise<any[]>;
  approveCreatorApplication(applicationId: string, adminId: string): Promise<void>;
  rejectCreatorApplication(applicationId: string, adminId: string, reason: string): Promise<void>;
  promoteToCreator(userId: string, adminId: string): Promise<void>;
  revokeCreatorStatus(creatorId: string, adminId: string, reason: string): Promise<void>;
  getAllCreators(filter?: any, limit?: number, offset?: number): Promise<any[]>;
  getCreatorStats(creatorId?: string): Promise<any>;

  // 역할 관리
  assignRole(userId: string, role: UserRole): Promise<void>;
  revokeRole(userId: string, role: UserRole): Promise<void>;
  getUserRoles(userId: string): Promise<UserRole[]>;

  // 장소 관리
  approveVenue(venueId: string, adminId: string): Promise<void>;
  rejectVenue(venueId: string, adminId: string, reason: string): Promise<void>;
  getPendingVenues(limit?: number, offset?: number): Promise<any[]>;
  getAllVenues(filter?: any, limit?: number, offset?: number): Promise<any[]>;
  updateVenueStatus(venueId: string, status: string): Promise<void>;
  bulkUpdateVenues(venueIds: string[], updateData: VenueManagementRequest): Promise<void>;

  // 프로그램 승인 관리 (크리에이터가 생성한 프로그램 관리)
  getPendingPrograms(limit?: number, offset?: number): Promise<any[]>;
  getAllPrograms(filter?: any, limit?: number, offset?: number): Promise<any[]>;
  getProgramDetail(programId: string): Promise<any>;
  approveProgram(programId: string, adminId: string): Promise<void>;
  rejectProgram(programId: string, adminId: string, reason: string): Promise<void>;
  suspendProgram(programId: string, adminId: string, reason: string): Promise<void>;
  getProgramsByCreator(creatorId: string): Promise<any[]>;

  // 예약 관리
  getAllReservations(filter?: any, limit?: number, offset?: number): Promise<any[]>;
  getReservationDetail(reservationId: string): Promise<any>;
  cancelReservation(reservationId: string, adminId: string, reason: string): Promise<void>;
  refundReservation(reservationId: string, adminId: string, amount?: number): Promise<void>;
  getReservationStats(period?: string): Promise<any>;

  // 결제 관리
  getAllPayments(filter?: any, limit?: number, offset?: number): Promise<any[]>;
  getPaymentDetail(paymentId: string): Promise<any>;
  processRefund(paymentId: string, adminId: string, amount: number, reason: string): Promise<void>;
  markPaymentAsFraud(paymentId: string, adminId: string): Promise<void>;
  getPaymentStats(period?: string): Promise<any>;

  // 리뷰 및 신고 관리
  getAllReviews(filter?: any, limit?: number, offset?: number): Promise<any[]>;
  moderateReview(reviewId: string, adminId: string, action: 'approve' | 'reject' | 'hide'): Promise<void>;
  getReportedContent(type?: string, limit?: number, offset?: number): Promise<any[]>;
  resolveReport(reportId: string, adminId: string, action: string, reason?: string): Promise<void>;

  // 통계 및 분석
  getUserGrowthStats(period: 'daily' | 'weekly' | 'monthly'): Promise<any>;
  getRevenueStats(period: 'daily' | 'weekly' | 'monthly' | 'yearly'): Promise<any>;
  getUsageStats(period: string): Promise<any>;
  getCreatorPerformanceStats(period?: string): Promise<any>;
  generateAnalyticsReport(reportType: string, period: string): Promise<AnalyticsReport>;
  exportData(dataType: string, filter?: any): Promise<any>;

  // 시스템 설정
  getSystemSettings(): Promise<SystemSettings>;
  updateSystemSettings(settings: SystemSettings): Promise<void>;
  getFeatureFlags(): Promise<any>;
  updateFeatureFlags(flags: any): Promise<void>;

  // 알림 및 공지사항
  createNotification(adminId: string, notificationData: any): Promise<any>;
  sendBulkNotification(adminId: string, userIds: string[], message: string): Promise<void>;
  createAnnouncement(adminId: string, announcementData: any): Promise<any>;
  updateAnnouncement(announcementId: string, updateData: any): Promise<any>;
  deleteAnnouncement(announcementId: string): Promise<void>;

  // 감사 로그
  getAuditLogs(filter?: any, limit?: number, offset?: number): Promise<AuditLog[]>;
  createAuditLog(adminId: string, action: string, details: any): Promise<void>;
  exportAuditLogs(startDate: Date, endDate: Date): Promise<any>;

  // 백업 및 복원
  createBackup(adminId: string, backupRequest: BackupRequest): Promise<any>;
  getBackupList(): Promise<any[]>;
  restoreFromBackup(backupId: string, adminId: string): Promise<void>;
  deleteBackup(backupId: string, adminId: string): Promise<void>;

  // 시스템 모니터링
  getSystemHealth(): Promise<SystemHealth>;
  getServerMetrics(): Promise<any>;
  getErrorLogs(limit?: number, offset?: number): Promise<any[]>;
  clearCache(cacheType?: string): Promise<void>;

  // 보안 관리
  getSecurityEvents(limit?: number, offset?: number): Promise<SecurityEvent[]>;
  blockIP(ipAddress: string, adminId: string, reason: string): Promise<void>;
  unblockIP(ipAddress: string, adminId: string): Promise<void>;
  getBlockedIPs(): Promise<any[]>;

  // 콘텐츠 관리
  getFlaggedContent(type?: string, limit?: number, offset?: number): Promise<any[]>;
  moderateContent(contentId: string, adminId: string, action: 'approve' | 'reject' | 'hide'): Promise<void>;
  getBannedWords(): Promise<string[]>;
  updateBannedWords(words: string[]): Promise<void>;

  // 포인트 및 멤버십 관리
  adjustUserPoints(userId: string, adminId: string, amount: number, reason: string): Promise<void>;
  getUserPointsHistory(userId: string, limit?: number, offset?: number): Promise<any[]>;
  updateMembershipTier(userId: string, adminId: string, newTier: string): Promise<void>;
  getMembershipStats(): Promise<any>;

  // 마케팅 및 프로모션
  createPromotion(adminId: string, promotionData: any): Promise<any>;
  updatePromotion(promotionId: string, updateData: any): Promise<any>;
  deletePromotion(promotionId: string, adminId: string): Promise<void>;
  getPromotionStats(promotionId: string): Promise<any>;

  // 지원 및 고객 서비스
  getSupportTickets(status?: string, priority?: string, limit?: number, offset?: number): Promise<any[]>;
  assignTicket(ticketId: string, adminId: string): Promise<void>;
  updateTicketStatus(ticketId: string, status: string, adminId: string): Promise<void>;
  addTicketResponse(ticketId: string, adminId: string, response: string): Promise<void>;
}
