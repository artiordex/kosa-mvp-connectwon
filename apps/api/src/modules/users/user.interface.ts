/**
 * Description : user.interface.ts - 📌 사용자 서비스 인터페이스 정의 (참고용)
 * Author : Shiwoo Min
 * Date : 2025-09-26
 */

// Placeholder 타입들 (나중에 packages/api-contract/schemas 로 대체 예정)
type User = any;
type UserCreateRequest = any;
type UserUpdateRequest = any;
type UserFilter = any;
export type UserRole = 'user' | 'creator' | 'admin' | 'super_admin';
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'deleted' | 'pending_verification';
type UserPreferences = any;
type UserActivity = any;
type UserStats = any;
export type MembershipTier = 'basic' | 'premium' | 'vip' | 'creator';

/**
 * @description 사용자 서비스 인터페이스
 */
export interface IUserService {
  // 기본 사용자 관리
  createUser(userData: UserCreateRequest): Promise<User>;
  getUserById(userId: string): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
  updateUser(userId: string, updateData: UserUpdateRequest): Promise<User>;
  deleteUser(userId: string, soft?: boolean): Promise<void>;

  // 사용자 조회 및 검색
  getAllUsers(filter?: UserFilter, limit?: number, offset?: number): Promise<User[]>;
  searchUsers(query: string, filter?: UserFilter): Promise<User[]>;
  getUsersByRole(role: UserRole): Promise<User[]>;
  getUsersByStatus(status: UserStatus): Promise<User[]>;
  getUsersByMembershipTier(tier: MembershipTier): Promise<User[]>;

  // 역할 및 권한 관리
  assignRole(userId: string, role: UserRole): Promise<void>;
  revokeRole(userId: string, role: UserRole): Promise<void>;
  getUserRoles(userId: string): Promise<UserRole[]>;
  checkUserPermission(userId: string, permission: string): Promise<boolean>;
  promoteToCreator(userId: string, creatorData: any): Promise<void>;

  // 사용자 상태 관리
  activateUser(userId: string): Promise<void>;
  deactivateUser(userId: string, reason?: string): Promise<void>;
  suspendUser(userId: string, reason: string, duration?: number): Promise<void>;
  unsuspendUser(userId: string): Promise<void>;
  verifyUser(userId: string, verificationType: string): Promise<void>;

  // 멤버십 관리
  getMembershipInfo(userId: string): Promise<any>;
  upgradeMembership(userId: string, newTier: MembershipTier): Promise<void>;
  downgradeMembership(userId: string, newTier: MembershipTier): Promise<void>;
  getMembershipBenefits(userId: string): Promise<any[]>;
  calculateMembershipProgress(userId: string): Promise<any>;

  // 사용자 선호도 및 설정
  getUserPreferences(userId: string): Promise<UserPreferences>;
  updateUserPreferences(userId: string, preferences: UserPreferences): Promise<void>;
  resetPreferencesToDefault(userId: string): Promise<void>;

  // 사용자 활동 추적
  recordUserActivity(userId: string, activity: UserActivity): Promise<void>;
  getUserActivityHistory(userId: string, limit?: number, offset?: number): Promise<UserActivity[]>;
  getUserStats(userId: string, period?: 'week' | 'month' | 'year'): Promise<UserStats>;
  getLastLoginInfo(userId: string): Promise<any>;

  // 포인트 및 리워드
  getUserPoints(userId: string): Promise<number>;
  addPoints(userId: string, points: number, reason: string): Promise<void>;
  deductPoints(userId: string, points: number, reason: string): Promise<void>;
  getUserRewards(userId: string): Promise<any[]>;
  claimReward(userId: string, rewardId: string): Promise<void>;

  // 사용자 관계 및 네트워크
  followUser(followerId: string, followeeId: string): Promise<void>;
  unfollowUser(followerId: string, followeeId: string): Promise<void>;
  getFollowers(userId: string, limit?: number, offset?: number): Promise<User[]>;
  getFollowing(userId: string, limit?: number, offset?: number): Promise<User[]>;
  blockUser(blockerId: string, blockedId: string): Promise<void>;
  unblockUser(blockerId: string, blockedId: string): Promise<void>;

  // 관리자 전용 기능
  bulkUpdateUsers(userIds: string[], updateData: any): Promise<void>;
  bulkDeleteUsers(userIds: string[]): Promise<void>;
  exportUserData(filter?: UserFilter): Promise<any>;
  importUserData(userData: any[]): Promise<any>;

  // 통계 및 분석
  getUserGrowthStats(period: 'daily' | 'weekly' | 'monthly'): Promise<any>;
  getUserEngagementMetrics(userId?: string): Promise<any>;
  getTopUsers(criteria: 'activity' | 'points' | 'reservations', limit?: number): Promise<User[]>;
  getUserRetentionRate(period: string): Promise<number>;

  // 개인정보 및 GDPR
  exportUserPersonalData(userId: string): Promise<any>;
  anonymizeUserData(userId: string): Promise<void>;
  getUserDataDeletionRequests(): Promise<any[]>;
  processDataDeletionRequest(requestId: string, approved: boolean): Promise<void>;

  // 알림 관리
  getUserNotificationSettings(userId: string): Promise<any>;
  updateNotificationSettings(userId: string, settings: any): Promise<void>;
  sendUserNotification(userId: string, notification: any): Promise<void>;
  markNotificationAsRead(userId: string, notificationId: string): Promise<void>;
}
