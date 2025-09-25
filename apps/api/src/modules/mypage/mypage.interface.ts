/**
 * Description : mypage.interface.ts - 📌 마이페이지 서비스 인터페이스 정의
 * Author : Shiwoo Min
 * Date : 2025-09-26
 */

// Placeholder 타입들 (나중에 packages/api-contract/schemas 로 대체 예정)
type UserProfile = any;
type ProfileUpdateRequest = any;
type UserReservation = any;
type ReservationFilter = any;
type PointHistory = any;
type PointTransaction = any;
type NotificationSettings = any;
type PreferenceSettings = any;
type AccountSettings = any;
type ActivityLog = any;
type UsageStatistics = any;
type ReservationStatus = 'active' | 'completed' | 'cancelled' | 'pending';
type PointTransactionType = 'earn' | 'spend' | 'refund' | 'bonus';

/**
 * 마이페이지 서비스 인터페이스 (참고용)
 */
export interface IMyPageService {
  // 프로필 관리
  getUserProfile(userId: string): Promise<UserProfile>;
  updateUserProfile(userId: string, profileData: ProfileUpdateRequest): Promise<UserProfile>;
  uploadProfileImage(userId: string, imageFile: any): Promise<string>;
  deleteProfileImage(userId: string): Promise<void>;
  changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void>;

  // 예약 관리
  getUserReservations(userId: string, filter?: ReservationFilter): Promise<UserReservation[]>;
  getReservationDetail(userId: string, reservationId: string): Promise<UserReservation>;
  cancelReservation(userId: string, reservationId: string, reason?: string): Promise<void>;
  modifyReservation(userId: string, reservationId: string, modificationData: any): Promise<UserReservation>;
  getReservationHistory(userId: string, limit?: number, offset?: number): Promise<UserReservation[]>;

  // 포인트 관리
  getUserPoints(userId: string): Promise<number>;
  getPointHistory(userId: string, limit?: number, offset?: number): Promise<PointHistory[]>;
  getPointTransactions(userId: string, type?: PointTransactionType): Promise<PointTransaction[]>;
  earnPoints(userId: string, amount: number, reason: string): Promise<PointTransaction>;
  spendPoints(userId: string, amount: number, reason: string): Promise<PointTransaction>;
  getPointExpiryInfo(userId: string): Promise<any>;

  // 설정 관리
  getNotificationSettings(userId: string): Promise<NotificationSettings>;
  updateNotificationSettings(userId: string, settings: NotificationSettings): Promise<void>;
  getPreferenceSettings(userId: string): Promise<PreferenceSettings>;
  updatePreferenceSettings(userId: string, preferences: PreferenceSettings): Promise<void>;
  getAccountSettings(userId: string): Promise<AccountSettings>;
  updateAccountSettings(userId: string, settings: AccountSettings): Promise<void>;

  // 활동 로그
  getUserActivityLog(userId: string, limit?: number, offset?: number): Promise<ActivityLog[]>;
  getLoginHistory(userId: string, limit?: number): Promise<any[]>;
  getUsageStatistics(userId: string, period?: 'week' | 'month' | 'year'): Promise<UsageStatistics>;

  // 즐겨찾기
  getFavoriteVenues(userId: string): Promise<any[]>;
  addFavoriteVenue(userId: string, venueId: string): Promise<void>;
  removeFavoriteVenue(userId: string, venueId: string): Promise<void>;
  getFavoritePrograms(userId: string): Promise<any[]>;
  addFavoriteProgram(userId: string, programId: string): Promise<void>;
  removeFavoriteProgram(userId: string, programId: string): Promise<void>;

  // 리뷰 관리
  getUserReviews(userId: string, limit?: number, offset?: number): Promise<any[]>;
  writeReview(userId: string, reservationId: string, reviewData: any): Promise<any>;
  updateReview(userId: string, reviewId: string, reviewData: any): Promise<any>;
  deleteReview(userId: string, reviewId: string): Promise<void>;

  // 멤버십/등급
  getUserMembershipInfo(userId: string): Promise<any>;
  getMembershipBenefits(userId: string): Promise<any[]>;
  getMembershipProgress(userId: string): Promise<any>;

  // 계정 관리
  getLinkedSSOAccounts(userId: string): Promise<any[]>;
  linkSSOAccount(userId: string, provider: string, ssoData: any): Promise<void>;
  unlinkSSOAccount(userId: string, provider: string): Promise<void>;
  deactivateAccount(userId: string, reason?: string): Promise<void>;
  requestAccountDeletion(userId: string, reason?: string): Promise<void>;
}
