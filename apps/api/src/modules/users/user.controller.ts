/**
 * Description : user.controller.ts - 📌 사용자 컨트롤러 (User API)
 * Author : Shiwoo Min
 * Date : 2025-09-26
 */
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import type { IUserService } from './user.interface';
import type { MembershipTier, UserRole, UserStatus } from './user.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: IUserService) {}

  /** @description 사용자 생성 */
  @Post()
  async createUser(@Body() userData: any) {
    return this.userService.createUser(userData);
  }

  /** @description 사용자 단일 조회 (ID 기반) */
  @Get(':userId')
  async getUserById(@Param('userId') userId: string) {
    return this.userService.getUserById(userId);
  }

  /** @description 이메일로 사용자 조회 */
  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
  }

  /** @description 사용자 정보 업데이트 */
  @Put(':userId')
  async updateUser(@Param('userId') userId: string, @Body() updateData: any) {
    return this.userService.updateUser(userId, updateData);
  }

  /** @description 사용자 삭제 (soft/hard 옵션) */
  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string, @Query('soft') soft?: boolean) {
    return this.userService.deleteUser(userId, soft);
  }

  /** @description 전체 사용자 목록 조회 */
  @Get()
  async getAllUsers(@Query('filter') filter?: any, @Query('limit') limit?: number, @Query('offset') offset?: number) {
    return this.userService.getAllUsers(filter, limit, offset);
  }

  /** @description 사용자 검색 */
  @Get('search')
  async searchUsers(@Query('q') query: string, @Query('filter') filter?: any) {
    return this.userService.searchUsers(query, filter);
  }

  /** @description 특정 역할을 가진 사용자 조회 */
  @Get('role/:role')
  async getUsersByRole(@Param('role') role: UserRole) {
    return this.userService.getUsersByRole(role);
  }

  /** @description 특정 상태의 사용자 조회 */
  @Get('status/:status')
  async getUsersByStatus(@Param('status') status: UserStatus) {
    return this.userService.getUsersByStatus(status);
  }

  /** @description 멤버십 등급별 사용자 조회 */
  @Get('membership/tier/:tier')
  async getUsersByMembershipTier(@Param('tier') tier: MembershipTier) {
    return this.userService.getUsersByMembershipTier(tier);
  }

  /** @description 사용자 역할 부여 */
  @Post(':userId/roles/:role')
  async assignRole(@Param('userId') userId: string, @Param('role') role: UserRole) {
    return this.userService.assignRole(userId, role);
  }

  /** @description 사용자 역할 회수 */
  @Delete(':userId/roles/:role')
  async revokeRole(@Param('userId') userId: string, @Param('role') role: UserRole) {
    return this.userService.revokeRole(userId, role);
  }

  /** @description 사용자 역할 목록 조회 */
  @Get(':userId/roles')
  async getUserRoles(@Param('userId') userId: string) {
    return this.userService.getUserRoles(userId);
  }

  /** @description 특정 권한 보유 여부 확인 */
  @Get(':userId/permissions/:permission')
  async checkUserPermission(@Param('userId') userId: string, @Param('permission') permission: string) {
    return this.userService.checkUserPermission(userId, permission);
  }

  /** @description 일반 사용자를 크리에이터로 승격 */
  @Post(':userId/promote-to-creator')
  async promoteToCreator(@Param('userId') userId: string, @Body() creatorData: any) {
    return this.userService.promoteToCreator(userId, creatorData);
  }

  /** @description 사용자 활성화 */
  @Post(':userId/activate')
  async activateUser(@Param('userId') userId: string) {
    return this.userService.activateUser(userId);
  }

  /** @description 사용자 비활성화 */
  @Post(':userId/deactivate')
  async deactivateUser(@Param('userId') userId: string, @Body('reason') reason?: string) {
    return this.userService.deactivateUser(userId, reason);
  }

  /** @description 사용자 계정 정지 */
  @Post(':userId/suspend')
  async suspendUser(@Param('userId') userId: string, @Body('reason') reason: string, @Body('duration') duration?: number) {
    return this.userService.suspendUser(userId, reason, duration);
  }

  /** @description 사용자 계정 정지 해제 */
  @Post(':userId/unsuspend')
  async unsuspendUser(@Param('userId') userId: string) {
    return this.userService.unsuspendUser(userId);
  }

  /** @description 사용자 검증 처리 */
  @Post(':userId/verify')
  async verifyUser(@Param('userId') userId: string, @Body('verificationType') verificationType: string) {
    return this.userService.verifyUser(userId, verificationType);
  }

  @Get(':userId/membership')
  async getMembershipInfo(@Param('userId') userId: string) {
    return this.userService.getMembershipInfo(userId);
  }

  @Post(':userId/membership/upgrade')
  async upgradeMembership(@Param('userId') userId: string, @Body('tier') newTier: MembershipTier) {
    return this.userService.upgradeMembership(userId, newTier);
  }

  @Post(':userId/membership/downgrade')
  async downgradeMembership(@Param('userId') userId: string, @Body('tier') newTier: MembershipTier) {
    return this.userService.downgradeMembership(userId, newTier);
  }

  @Get(':userId/membership/benefits')
  async getMembershipBenefits(@Param('userId') userId: string) {
    return this.userService.getMembershipBenefits(userId);
  }

  @Get(':userId/membership/progress')
  async calculateMembershipProgress(@Param('userId') userId: string) {
    return this.userService.calculateMembershipProgress(userId);
  }

  @Get(':userId/preferences')
  async getUserPreferences(@Param('userId') userId: string) {
    return this.userService.getUserPreferences(userId);
  }

  @Put(':userId/preferences')
  async updateUserPreferences(@Param('userId') userId: string, @Body() preferences: any) {
    return this.userService.updateUserPreferences(userId, preferences);
  }

  @Post(':userId/preferences/reset')
  async resetPreferencesToDefault(@Param('userId') userId: string) {
    return this.userService.resetPreferencesToDefault(userId);
  }

  @Post(':userId/activity')
  async recordUserActivity(@Param('userId') userId: string, @Body() activity: any) {
    return this.userService.recordUserActivity(userId, activity);
  }

  @Get(':userId/activity')
  async getUserActivityHistory(@Param('userId') userId: string, @Query('limit') limit?: number, @Query('offset') offset?: number) {
    return this.userService.getUserActivityHistory(userId, limit, offset);
  }

  @Get(':userId/stats')
  async getUserStats(@Param('userId') userId: string, @Query('period') period?: 'week' | 'month' | 'year') {
    return this.userService.getUserStats(userId, period);
  }

  @Get(':userId/last-login')
  async getLastLoginInfo(@Param('userId') userId: string) {
    return this.userService.getLastLoginInfo(userId);
  }

  @Get(':userId/points')
  async getUserPoints(@Param('userId') userId: string) {
    return this.userService.getUserPoints(userId);
  }

  @Post(':userId/points/add')
  async addPoints(@Param('userId') userId: string, @Body('points') points: number, @Body('reason') reason: string) {
    return this.userService.addPoints(userId, points, reason);
  }

  @Post(':userId/points/deduct')
  async deductPoints(@Param('userId') userId: string, @Body('points') points: number, @Body('reason') reason: string) {
    return this.userService.deductPoints(userId, points, reason);
  }

  @Get(':userId/rewards')
  async getUserRewards(@Param('userId') userId: string) {
    return this.userService.getUserRewards(userId);
  }

  @Post(':userId/rewards/:rewardId/claim')
  async claimReward(@Param('userId') userId: string, @Param('rewardId') rewardId: string) {
    return this.userService.claimReward(userId, rewardId);
  }

  @Post(':followerId/follow/:followeeId')
  async followUser(@Param('followerId') followerId: string, @Param('followeeId') followeeId: string) {
    return this.userService.followUser(followerId, followeeId);
  }

  @Delete(':followerId/unfollow/:followeeId')
  async unfollowUser(@Param('followerId') followerId: string, @Param('followeeId') followeeId: string) {
    return this.userService.unfollowUser(followerId, followeeId);
  }

  @Get(':userId/followers')
  async getFollowers(@Param('userId') userId: string, @Query('limit') limit?: number, @Query('offset') offset?: number) {
    return this.userService.getFollowers(userId, limit, offset);
  }

  @Get(':userId/following')
  async getFollowing(@Param('userId') userId: string, @Query('limit') limit?: number, @Query('offset') offset?: number) {
    return this.userService.getFollowing(userId, limit, offset);
  }

  @Post(':blockerId/block/:blockedId')
  async blockUser(@Param('blockerId') blockerId: string, @Param('blockedId') blockedId: string) {
    return this.userService.blockUser(blockerId, blockedId);
  }

  @Delete(':blockerId/unblock/:blockedId')
  async unblockUser(@Param('blockerId') blockerId: string, @Param('blockedId') blockedId: string) {
    return this.userService.unblockUser(blockerId, blockedId);
  }

  @Post('admin/bulk-update')
  async bulkUpdateUsers(@Body('userIds') userIds: string[], @Body('updateData') updateData: any) {
    return this.userService.bulkUpdateUsers(userIds, updateData);
  }

  @Post('admin/bulk-delete')
  async bulkDeleteUsers(@Body('userIds') userIds: string[]) {
    return this.userService.bulkDeleteUsers(userIds);
  }

  @Get('admin/export')
  async exportUserData(@Query('filter') filter?: any) {
    return this.userService.exportUserData(filter);
  }

  @Post('admin/import')
  async importUserData(@Body() userData: any[]) {
    return this.userService.importUserData(userData);
  }

  @Get('stats/growth')
  async getUserGrowthStats(@Query('period') period: 'daily' | 'weekly' | 'monthly') {
    return this.userService.getUserGrowthStats(period);
  }

  @Get('stats/engagement')
  async getUserEngagementMetrics(@Query('userId') userId?: string) {
    return this.userService.getUserEngagementMetrics(userId);
  }

  @Get('stats/top-users')
  async getTopUsers(@Query('criteria') criteria: 'activity' | 'points' | 'reservations', @Query('limit') limit?: number) {
    return this.userService.getTopUsers(criteria, limit);
  }

  @Get('stats/retention')
  async getUserRetentionRate(@Query('period') period: string) {
    return this.userService.getUserRetentionRate(period);
  }

  @Get(':userId/export-data')
  async exportUserPersonalData(@Param('userId') userId: string) {
    return this.userService.exportUserPersonalData(userId);
  }

  @Post(':userId/anonymize')
  async anonymizeUserData(@Param('userId') userId: string) {
    return this.userService.anonymizeUserData(userId);
  }

  @Get('gdpr/deletion-requests')
  async getUserDataDeletionRequests() {
    return this.userService.getUserDataDeletionRequests();
  }

  @Post('gdpr/deletion-requests/:requestId/process')
  async processDataDeletionRequest(@Param('requestId') requestId: string, @Body('approved') approved: boolean) {
    return this.userService.processDataDeletionRequest(requestId, approved);
  }

  @Get(':userId/notifications/settings')
  async getUserNotificationSettings(@Param('userId') userId: string) {
    return this.userService.getUserNotificationSettings(userId);
  }

  @Put(':userId/notifications/settings')
  async updateNotificationSettings(@Param('userId') userId: string, @Body() settings: any) {
    return this.userService.updateNotificationSettings(userId, settings);
  }

  @Post(':userId/notifications/send')
  async sendUserNotification(@Param('userId') userId: string, @Body() notification: any) {
    return this.userService.sendUserNotification(userId, notification);
  }

  @Post(':userId/notifications/:notificationId/read')
  async markNotificationAsRead(@Param('userId') userId: string, @Param('notificationId') notificationId: string) {
    return this.userService.markNotificationAsRead(userId, notificationId);
  }
}
