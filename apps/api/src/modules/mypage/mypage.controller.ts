/**
 * Description : mypage.controller.ts - 📌 마이페이지 컨트롤러
 * Author : Shiwoo Min
 * Date : 2025-09-26
 */
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MyPageService } from './mypage.service';

@Controller('mypage')
export class MyPageController {
  constructor(private readonly myPageService: MyPageService) {}

  /** @description 사용자 프로필 조회 */
  @Get(':userId/profile')
  async getUserProfile(@Param('userId') userId: string) {
    return this.myPageService.getUserProfile(userId);
  }

  /** @description 사용자 프로필 업데이트 */
  @Put(':userId/profile')
  async updateUserProfile(@Param('userId') userId: string, @Body() profileData: any) {
    return this.myPageService.updateUserProfile(userId, profileData);
  }

  /** @description 프로필 이미지 업로드 */
  @Post(':userId/profile/image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfileImage(@Param('userId') userId: string, @UploadedFile() imageFile: any) {
    return this.myPageService.uploadProfileImage(userId, imageFile);
  }

  /** @description 프로필 이미지 삭제 */
  @Delete(':userId/profile/image')
  async deleteProfileImage(@Param('userId') userId: string) {
    return this.myPageService.deleteProfileImage(userId);
  }

  /** @description 비밀번호 변경 */
  @Post(':userId/change-password')
  async changePassword(@Param('userId') userId: string, @Body('currentPassword') currentPassword: string, @Body('newPassword') newPassword: string) {
    return this.myPageService.changePassword(userId, currentPassword, newPassword);
  }

  /** @description 사용자 예약 목록 조회 */
  @Get(':userId/reservations')
  async getUserReservations(@Param('userId') userId: string, @Query() filter: any) {
    return this.myPageService.getUserReservations(userId, filter);
  }

  /** @description 예약 상세 조회 */
  @Get(':userId/reservations/:reservationId')
  async getReservationDetail(@Param('userId') userId: string, @Param('reservationId') reservationId: string) {
    return this.myPageService.getReservationDetail(userId, reservationId);
  }

  /** @description 예약 취소 */
  @Post(':userId/reservations/:reservationId/cancel')
  async cancelReservation(@Param('userId') userId: string, @Param('reservationId') reservationId: string, @Body('reason') reason?: string) {
    return this.myPageService.cancelReservation(userId, reservationId, reason);
  }

  /** @description 예약 수정 */
  @Put(':userId/reservations/:reservationId')
  async modifyReservation(@Param('userId') userId: string, @Param('reservationId') reservationId: string, @Body() modificationData: any) {
    return this.myPageService.modifyReservation(userId, reservationId, modificationData);
  }

  /** @description 예약 히스토리 조회 */
  @Get(':userId/reservations/history')
  async getReservationHistory(@Param('userId') userId: string, @Query('limit') limit?: number, @Query('offset') offset?: number) {
    return this.myPageService.getReservationHistory(userId, limit, offset);
  }

  /** @description 사용자 포인트 조회 */
  @Get(':userId/points')
  async getUserPoints(@Param('userId') userId: string) {
    return this.myPageService.getUserPoints(userId);
  }

  /** @description 포인트 내역 조회 */
  @Get(':userId/points/history')
  async getPointHistory(@Param('userId') userId: string, @Query('limit') limit?: number, @Query('offset') offset?: number) {
    return this.myPageService.getPointHistory(userId, limit, offset);
  }

  /** @description 포인트 적립 */
  @Post(':userId/points/earn')
  async earnPoints(@Param('userId') userId: string, @Body('amount') amount: number, @Body('reason') reason: string) {
    return this.myPageService.earnPoints(userId, amount, reason);
  }

  /** @description 포인트 사용 */
  @Post(':userId/points/spend')
  async spendPoints(@Param('userId') userId: string, @Body('amount') amount: number, @Body('reason') reason: string) {
    return this.myPageService.spendPoints(userId, amount, reason);
  }

  /** @description 포인트 만료 정보 조회 */
  @Get(':userId/points/expiry')
  async getPointExpiryInfo(@Param('userId') userId: string) {
    return this.myPageService.getPointExpiryInfo(userId);
  }

  /** @description 알림 설정 조회 */
  @Get(':userId/settings/notifications')
  async getNotificationSettings(@Param('userId') userId: string) {
    return this.myPageService.getNotificationSettings(userId);
  }

  /** @description 알림 설정 업데이트 */
  @Put(':userId/settings/notifications')
  async updateNotificationSettings(@Param('userId') userId: string, @Body() settings: any) {
    return this.myPageService.updateNotificationSettings(userId, settings);
  }

  /** @description 선호 설정 조회 */
  @Get(':userId/settings/preferences')
  async getPreferenceSettings(@Param('userId') userId: string) {
    return this.myPageService.getPreferenceSettings(userId);
  }

  /** @description 선호 설정 업데이트 */
  @Put(':userId/settings/preferences')
  async updatePreferenceSettings(@Param('userId') userId: string, @Body() preferences: any) {
    return this.myPageService.updatePreferenceSettings(userId, preferences);
  }

  /** @description 계정 설정 조회 */
  @Get(':userId/settings/account')
  async getAccountSettings(@Param('userId') userId: string) {
    return this.myPageService.getAccountSettings(userId);
  }

  /** @description 계정 설정 업데이트 */
  @Put(':userId/settings/account')
  async updateAccountSettings(@Param('userId') userId: string, @Body() settings: any) {
    return this.myPageService.updateAccountSettings(userId, settings);
  }

  /** @description 활동 로그 조회 */
  @Get(':userId/activity/logs')
  async getUserActivityLog(@Param('userId') userId: string, @Query('limit') limit?: number, @Query('offset') offset?: number) {
    return this.myPageService.getUserActivityLog(userId, limit, offset);
  }

  /** @description 로그인 히스토리 조회 */
  @Get(':userId/activity/login-history')
  async getLoginHistory(@Param('userId') userId: string, @Query('limit') limit?: number) {
    return this.myPageService.getLoginHistory(userId, limit);
  }

  /** @description 사용 통계 조회 */
  @Get(':userId/activity/statistics')
  async getUsageStatistics(@Param('userId') userId: string, @Query('period') period?: 'week' | 'month' | 'year') {
    return this.myPageService.getUsageStatistics(userId, period);
  }

  /** @description 즐겨찾기 장소 조회 */
  @Get(':userId/favorites/venues')
  async getFavoriteVenues(@Param('userId') userId: string) {
    return this.myPageService.getFavoriteVenues(userId);
  }

  /** @description 즐겨찾기 장소 추가 */
  @Post(':userId/favorites/venues/:venueId')
  async addFavoriteVenue(@Param('userId') userId: string, @Param('venueId') venueId: string) {
    return this.myPageService.addFavoriteVenue(userId, venueId);
  }

  /** @description 즐겨찾기 장소 삭제 */
  @Delete(':userId/favorites/venues/:venueId')
  async removeFavoriteVenue(@Param('userId') userId: string, @Param('venueId') venueId: string) {
    return this.myPageService.removeFavoriteVenue(userId, venueId);
  }

  /** @description 즐겨찾기 프로그램 조회 */
  @Get(':userId/favorites/programs')
  async getFavoritePrograms(@Param('userId') userId: string) {
    return this.myPageService.getFavoritePrograms(userId);
  }

  /** @description 즐겨찾기 프로그램 추가 */
  @Post(':userId/favorites/programs/:programId')
  async addFavoriteProgram(@Param('userId') userId: string, @Param('programId') programId: string) {
    return this.myPageService.addFavoriteProgram(userId, programId);
  }

  /** @description 즐겨찾기 프로그램 삭제 */
  @Delete(':userId/favorites/programs/:programId')
  async removeFavoriteProgram(@Param('userId') userId: string, @Param('programId') programId: string) {
    return this.myPageService.removeFavoriteProgram(userId, programId);
  }

  /** @description 사용자 리뷰 조회 */
  @Get(':userId/reviews')
  async getUserReviews(@Param('userId') userId: string, @Query('limit') limit?: number, @Query('offset') offset?: number) {
    return this.myPageService.getUserReviews(userId, limit, offset);
  }

  /** @description 리뷰 작성 */
  @Post(':userId/reviews/:reservationId')
  async writeReview(@Param('userId') userId: string, @Param('reservationId') reservationId: string, @Body() reviewData: any) {
    return this.myPageService.writeReview(userId, reservationId, reviewData);
  }

  /** @description 리뷰 수정 */
  @Put(':userId/reviews/:reviewId')
  async updateReview(@Param('userId') userId: string, @Param('reviewId') reviewId: string, @Body() reviewData: any) {
    return this.myPageService.updateReview(userId, reviewId, reviewData);
  }

  /** @description 리뷰 삭제 */
  @Delete(':userId/reviews/:reviewId')
  async deleteReview(@Param('userId') userId: string, @Param('reviewId') reviewId: string) {
    return this.myPageService.deleteReview(userId, reviewId);
  }

  /** @description 사용자 멤버십 정보 조회 */
  @Get(':userId/membership')
  async getUserMembershipInfo(@Param('userId') userId: string) {
    return this.myPageService.getUserMembershipInfo(userId);
  }

  /** @description 멤버십 혜택 조회 */
  @Get(':userId/membership/benefits')
  async getMembershipBenefits(@Param('userId') userId: string) {
    return this.myPageService.getMembershipBenefits(userId);
  }

  /** @description 멤버십 진행도 조회 */
  @Get(':userId/membership/progress')
  async getMembershipProgress(@Param('userId') userId: string) {
    return this.myPageService.getMembershipProgress(userId);
  }

  /** @description 연결된 SSO 계정 조회 */
  @Get(':userId/sso/accounts')
  async getLinkedSSOAccounts(@Param('userId') userId: string) {
    return this.myPageService.getLinkedSSOAccounts(userId);
  }

  /** @description SSO 계정 연결 */
  @Post(':userId/sso/:provider/link')
  async linkSSOAccount(@Param('userId') userId: string, @Param('provider') provider: string, @Body() ssoData: any) {
    return this.myPageService.linkSSOAccount(userId, provider, ssoData);
  }

  /** @description SSO 계정 연결 해제 */
  @Delete(':userId/sso/:provider/unlink')
  async unlinkSSOAccount(@Param('userId') userId: string, @Param('provider') provider: string) {
    return this.myPageService.unlinkSSOAccount(userId, provider);
  }

  /** @description 계정 비활성화 */
  @Post(':userId/deactivate')
  async deactivateAccount(@Param('userId') userId: string, @Body('reason') reason?: string) {
    return this.myPageService.deactivateAccount(userId, reason);
  }

  /** @description 계정 삭제 요청 */
  @Post(':userId/delete')
  async requestAccountDeletion(@Param('userId') userId: string, @Body('reason') reason?: string) {
    return this.myPageService.requestAccountDeletion(userId, reason);
  }
}
