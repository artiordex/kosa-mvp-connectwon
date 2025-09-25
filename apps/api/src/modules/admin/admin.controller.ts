/**
 * Description : admin.controller.ts - 📌 관리자 컨트롤러
 * Author : Shiwoo Min
 * Date : 2025-09-26
 */
import { Controller, Post, Get, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { AdminService } from './admin.service';

/**
 * 관리자 컨트롤러
 * 시스템 전반의 관리 기능과 대시보드, 사용자 관리, 콘텐츠 승인 등을 담당하는 REST API 엔드포인트
 */
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  /**
   * @param adminData - 생성할 관리자 정보
   * @returns 생성된 관리자 계정 정보
   * @description 시스템에 새로운 관리자 계정을 생성하고 초기 권한을 설정
   */
  @Post('admins')
  async createAdmin(@Body() adminData: any) {
    return this.adminService.createAdmin(adminData);
  }

  /**
   * @param adminId - 조회할 관리자 ID
   * @returns 관리자 계정의 상세 정보
   * @description 특정 관리자의 프로필과 권한 정보를 조회
   */
  @Get('admins/:adminId')
  async getAdminById(@Param('adminId') adminId: string) {
    return this.adminService.getAdminById(adminId);
  }

  /**
   * @param adminId - 수정할 관리자 ID
   * @param updateData - 업데이트할 정보
   * @returns 수정된 관리자 정보
   * @description 관리자의 프로필 정보나 권한을 수정
   */
  @Put('admins/:adminId')
  async updateAdmin(@Param('adminId') adminId: string, @Body() updateData: any) {
    return this.adminService.updateAdmin(adminId, updateData);
  }

  /**
   * @param adminId - 삭제할 관리자 ID
   * @description 관리자 계정을 시스템에서 완전히 제거
   */
  @Delete('admins/:adminId')
  async deleteAdmin(@Param('adminId') adminId: string) {
    return this.adminService.deleteAdmin(adminId);
  }

  /**
   * @param filter - 필터링 조건
   * @param limit - 조회 개수 제한
   * @param offset - 페이지네이션 오프셋
   * @returns 관리자 목록
   * @description 시스템의 모든 관리자 계정을 필터링하여 조회
   */
  @Get('admins')
  async getAllAdmins(@Query() filter?: any, @Query('limit') limit?: number, @Query('offset') offset?: number) {
    return this.adminService.getAllAdmins(filter, limit, offset);
  }

  /**
   * @returns 대시보드에 표시할 주요 통계 정보
   * @description 사용자 수, 매출, 예약률 등 핵심 지표를 실시간으로 제공
   */
  @Get('dashboard/stats')
  async getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  /**
   * @returns 대시보드 개요 데이터
   * @description 시스템 전반의 상태와 주요 메트릭을 한 눈에 볼 수 있는 정보 제공
   */
  @Get('dashboard/overview')
  async getDashboardOverview() {
    return this.adminService.getDashboardOverview();
  }

  /**
   * @returns 실시간 시스템 지표
   * @description 현재 접속자 수, 서버 상태, 실시간 예약 등의 즉시성 있는 정보 제공
   */
  @Get('dashboard/realtime')
  async getRealTimeMetrics() {
    return this.adminService.getRealTimeMetrics();
  }

  /**
   * @param limit - 조회할 활동 개수
   * @returns 최근 시스템 활동 목록
   * @description 최근 사용자 활동, 예약, 결제 등의 주요 이벤트를 시간순으로 제공
   */
  @Get('dashboard/activities')
  async getRecentActivities(@Query('limit') limit?: number) {
    return this.adminService.getRecentActivities(limit);
  }

  /**
   * @param filter - 사용자 필터링 조건
   * @param limit - 조회 개수 제한
   * @param offset - 페이지네이션 오프셋
   * @returns 사용자 목록
   * @description 시스템의 모든 사용자를 상태, 등급, 가입일 등으로 필터링하여 조회
   */
  @Get('users')
  async getAllUsers(@Query() filter?: any, @Query('limit') limit?: number, @Query('offset') offset?: number) {
    return this.adminService.getAllUsers(filter, limit, offset);
  }

  /**
   * @param userId - 조회할 사용자 ID
   * @returns 사용자의 상세 프로필과 활동 정보
   * @description 특정 사용자의 프로필, 예약 이력, 결제 내역 등 종합 정보 제공
   */
  @Get('users/:userId')
  async getUserDetail(@Param('userId') userId: string) {
    return this.adminService.getUserDetail(userId);
  }

  /**
   * @param userId - 대상 사용자 ID
   * @param status - 변경할 상태
   * @description 사용자 계정을 활성화, 비활성화, 정지 등의 상태로 변경
   */
  @Put('users/:userId/status')
  async updateUserStatus(@Param('userId') userId: string, @Body('status') status: any) {
    return this.adminService.updateUserStatus(userId, status);
  }

  /**
   * @param userId - 정지할 사용자 ID
   * @param reason - 정지 사유
   * @param duration - 정지 기간 (일)
   * @description 규정 위반이나 부적절한 행위에 대해 사용자 계정을 일정 기간 정지
   */
  @Post('users/:userId/suspend')
  async suspendUser(@Param('userId') userId: string, @Body('reason') reason: string, @Body('duration') duration?: number) {
    return this.adminService.suspendUser(userId, reason, duration);
  }

  /**
   * @param userId - 삭제할 사용자 ID
   * @param reason - 삭제 사유
   * @description 심각한 위반이나 사용자 요청에 따라 계정을 완전히 삭제
   */
  @Delete('users/:userId')
  async deleteUser(@Param('userId') userId: string, @Body('reason') reason: string) {
    return this.adminService.deleteUser(userId, reason);
  }

  /**
   * @param userId - 대상 사용자 ID
   * @returns 임시 비밀번호
   * @description 사용자 요청이나 보안상 필요에 의해 비밀번호를 초기화하고 임시 비밀번호 발급
   */
  @Post('users/:userId/reset-password')
  async resetUserPassword(@Param('userId') userId: string) {
    return this.adminService.resetUserPassword(userId);
  }

  /**
   * @param status - 신청 상태 필터
   * @param limit - 조회 개수 제한
   * @param offset - 페이지네이션 오프셋
   * @returns 크리에이터 승급 신청 목록
   * @description 사용자들의 크리에이터 승급 신청을 상태별로 조회하고 관리
   */
  @Get('creators/applications')
  async getCreatorApplications(@Query('status') status?: string, @Query('limit') limit?: number, @Query('offset') offset?: number) {
    return this.adminService.getCreatorApplications(status, limit, offset);
  }

  /**
   * @param applicationId - 승인할 신청 ID
   * @param adminId - 승인하는 관리자 ID
   * @description 크리에이터 승급 신청을 검토 후 승인하여 프로그램 생성 권한 부여
   */
  @Post('creators/applications/:applicationId/approve')
  async approveCreatorApplication(@Param('applicationId') applicationId: string, @Body('adminId') adminId: string) {
    return this.adminService.approveCreatorApplication(applicationId, adminId);
  }

  /**
   * @param applicationId - 반려할 신청 ID
   * @param adminId - 처리하는 관리자 ID
   * @param reason - 반려 사유
   * @description 승급 요건을 충족하지 않은 신청에 대해 반려 처리하고 사유 전달
   */
  @Post('creators/applications/:applicationId/reject')
  async rejectCreatorApplication(@Param('applicationId') applicationId: string, @Body('adminId') adminId: string, @Body('reason') reason: string) {
    return this.adminService.rejectCreatorApplication(applicationId, adminId, reason);
  }

  /**
   * @param userId - 승급할 사용자 ID
   * @param adminId - 승급 처리하는 관리자 ID
   * @description 특별한 경우 관리자가 직접 사용자를 크리에이터로 승급 처리
   */
  @Post('users/:userId/promote-creator')
  async promoteToCreator(@Param('userId') userId: string, @Body('adminId') adminId: string) {
    return this.adminService.promoteToCreator(userId, adminId);
  }

  /**
   * @param creatorId - 자격 박탈할 크리에이터 ID
   * @param adminId - 처리하는 관리자 ID
   * @param reason - 박탈 사유
   * @description 규정 위반이나 부적절한 활동으로 크리에이터 자격을 박탈
   */
  @Post('creators/:creatorId/revoke')
  async revokeCreatorStatus(@Param('creatorId') creatorId: string, @Body('adminId') adminId: string, @Body('reason') reason: string) {
    return this.adminService.revokeCreatorStatus(creatorId, adminId, reason);
  }

  /**
   * @param filter - 크리에이터 필터링 조건
   * @param limit - 조회 개수 제한
   * @param offset - 페이지네이션 오프셋
   * @returns 크리에이터 목록과 활동 정보
   * @description 시스템의 모든 크리에이터를 활동도, 평점 등으로 필터링하여 조회
   */
  @Get('creators')
  async getAllCreators(@Query() filter?: any, @Query('limit') limit?: number, @Query('offset') offset?: number) {
    return this.adminService.getAllCreators(filter, limit, offset);
  }

  /**
   * @param creatorId - 특정 크리에이터 ID (선택사항)
   * @returns 크리에이터별 또는 전체 크리에이터 활동 통계
   * @description 프로그램 생성 수, 참가자 수, 평점 등 크리에이터 성과 지표 제공
   */
  @Get('creators/stats')
  async getCreatorStats(@Query('creatorId') creatorId?: string) {
    return this.adminService.getCreatorStats(creatorId);
  }

  /**
   * @param userId - 대상 사용자 ID
   * @param role - 할당할 역할
   * @description 사용자에게 특정 역할(user, creator, admin)을 부여
   */
  @Post('users/:userId/roles')
  async assignRole(@Param('userId') userId: string, @Body('role') role: any) {
    return this.adminService.assignRole(userId, role);
  }

  /**
   * @param userId - 대상 사용자 ID
   * @param role - 박탈할 역할
   * @description 사용자로부터 특정 역할을 제거
   */
  @Delete('users/:userId/roles')
  async revokeRole(@Param('userId') userId: string, @Body('role') role: any) {
    return this.adminService.revokeRole(userId, role);
  }

  /**
   * @param userId - 조회할 사용자 ID
   * @returns 사용자가 보유한 모든 역할 목록
   * @description 특정 사용자가 현재 가지고 있는 모든 역할과 권한 정보 제공
   */
  @Get('users/:userId/roles')
  async getUserRoles(@Param('userId') userId: string) {
    return this.adminService.getUserRoles(userId);
  }

  /**
   * @param venueId - 승인할 장소 ID
   * @param adminId - 승인하는 관리자 ID
   * @description 새로 등록된 장소를 검토 후 서비스에서 이용 가능하도록 승인
   */
  @Post('venues/:venueId/approve')
  async approveVenue(@Param('venueId') venueId: string, @Body('adminId') adminId: string) {
    return this.adminService.approveVenue(venueId, adminId);
  }

  /**
   * @param venueId - 반려할 장소 ID
   * @param adminId - 처리하는 관리자 ID
   * @param reason - 반려 사유
   * @description 기준에 맞지 않는 장소 등록을 반려하고 사유 전달
   */
  @Post('venues/:venueId/reject')
  async rejectVenue(@Param('venueId') venueId: string, @Body('adminId') adminId: string, @Body('reason') reason: string) {
    return this.adminService.rejectVenue(venueId, adminId, reason);
  }

  /**
   * @param limit - 조회 개수 제한
   * @param offset - 페이지네이션 오프셋
   * @returns 승인 대기 중인 장소 목록
   * @description 관리자의 검토를 기다리는 장소 등록 신청들을 조회
   */
  @Get('venues/pending')
  async getPendingVenues(@Query('limit') limit?: number, @Query('offset') offset?: number) {
    return this.adminService.getPendingVenues(limit, offset);
  }

  /**
   * @param filter - 장소 필터링 조건
   * @param limit - 조회 개수 제한
   * @param offset - 페이지네이션 오프셋
   * @returns 모든 장소 목록
   * @description 시스템에 등록된 모든 장소를 상태, 지역, 카테고리별로 조회
   */
  @Get('venues')
  async getAllVenues(@Query() filter?: any, @Query('limit') limit?: number, @Query('offset') offset?: number) {
    return this.adminService.getAllVenues(filter, limit, offset);
  }

  /**
   * @param venueId - 대상 장소 ID
   * @param status - 변경할 상태
   * @description 장소를 운영, 점검, 폐쇄 등의 상태로 변경
   */
  @Put('venues/:venueId/status')
  async updateVenueStatus(@Param('venueId') venueId: string, @Body('status') status: string) {
    return this.adminService.updateVenueStatus(venueId, status);
  }

  /**
   * @param venueIds - 업데이트할 장소 ID 목록
   * @param updateData - 업데이트할 데이터
   * @description 여러 장소의 정보를 한 번에 일괄 업데이트
   */
  @Put('venues/bulk-update')
  async bulkUpdateVenues(@Body('venueIds') venueIds: string[], @Body() updateData: any) {
    return this.adminService.bulkUpdateVenues(venueIds, updateData);
  }

  /**
   * @param limit - 조회 개수 제한
   * @param offset - 페이지네이션 오프셋
   * @returns 크리에이터가 생성한 승인 대기 프로그램 목록
   * @description 크리에이터들이 생성한 프로그램 중 관리자 승인을 기다리는 목록 조회
   */
  @Get('programs/pending')
  async getPendingPrograms(@Query('limit') limit?: number, @Query('offset') offset?: number) {
    return this.adminService.getPendingPrograms(limit, offset);
  }

  /**
   * @param filter - 프로그램 필터링 조건
   * @param limit - 조회 개수 제한
   * @param offset - 페이지네이션 오프셋
   * @returns 모든 프로그램 목록
   * @description 시스템의 모든 프로그램을 상태, 카테고리, 크리에이터별로 조회
   */
  @Get('programs')
  async getAllPrograms(@Query() filter?: any, @Query('limit') limit?: number, @Query('offset') offset?: number) {
    return this.adminService.getAllPrograms(filter, limit, offset);
  }

  /**
   * @param programId - 조회할 프로그램 ID
   * @returns 프로그램의 상세 정보와 승인 이력
   * @description 특정 프로그램의 모든 정보와 크리에이터 정보, 참가자 현황 등 제공
   */
  @Get('programs/:programId')
  async getProgramDetail(@Param('programId') programId: string) {
    return this.adminService.getProgramDetail(programId);
  }

  /**
   * @param programId - 승인할 프로그램 ID
   * @param adminId - 승인하는 관리자 ID
   * @description 크리에이터가 생성한 프로그램을 검토 후 서비스에 공개 승인
   */
  @Post('programs/:programId/approve')
  async approveProgram(@Param('programId') programId: string, @Body('adminId') adminId: string) {
    return this.adminService.approveProgram(programId, adminId);
  }

  /**
   * @param programId - 반려할 프로그램 ID
   * @param adminId - 처리하는 관리자 ID
   * @param reason - 반려 사유
   * @description 기준에 맞지 않는 프로그램을 반려하고 크리에이터에게 수정 사항 전달
   */
  @Post('programs/:programId/reject')
  async rejectProgram(@Param('programId') programId: string, @Body('adminId') adminId: string, @Body('reason') reason: string) {
    return this.adminService.rejectProgram(programId, adminId, reason);
  }

  /**
   * @param programId - 중단할 프로그램 ID
   * @param adminId - 처리하는 관리자 ID
   * @param reason - 중단 사유
   * @description 운영 중인 프로그램을 규정 위반이나 안전상 이유로 중단
   */
  @Post('programs/:programId/suspend')
  async suspendProgram(@Param('programId') programId: string, @Body('adminId') adminId: string, @Body('reason') reason: string) {
    return this.adminService.suspendProgram(programId, adminId, reason);
  }

  /**
   * @param creatorId - 크리에이터 ID
   * @returns 해당 크리에이터가 생성한 모든 프로그램 목록
   * @description 특정 크리에이터의 프로그램 운영 현황과 성과를 종합적으로 조회
   */
  @Get('creators/:creatorId/programs')
  async getProgramsByCreator(@Param('creatorId') creatorId: string) {
    return this.adminService.getProgramsByCreator(creatorId);
  }

  /**
   * @param filter - 예약 필터링 조건
   * @param limit - 조회 개수 제한
   * @param offset - 페이지네이션 오프셋
   * @returns 모든 예약 목록
   * @description 시스템의 모든 예약을 상태, 날짜, 사용자별로 필터링하여 조회
   */
  @Get('reservations')
  async getAllReservations(@Query() filter?: any, @Query('limit') limit?: number, @Query('offset') offset?: number) {
    return this.adminService.getAllReservations(filter, limit, offset);
  }

  /**
   * @param reservationId - 조회할 예약 ID
   * @returns 예약의 모든 상세 정보
   * @description 특정 예약의 사용자 정보, 결제 내역, 이용 현황 등 종합 정보 제공
   */
  @Get('reservations/:reservationId')
  async getReservationDetail(@Param('reservationId') reservationId: string) {
    return this.adminService.getReservationDetail(reservationId);
  }

  /**
   * @param reservationId - 취소할 예약 ID
   * @param adminId - 처리하는 관리자 ID
   * @param reason - 취소 사유
   * @description 관리자가 특별한 사유로 예약을 강제 취소하고 적절한 보상 처리
   */
  @Post('reservations/:reservationId/cancel')
  async cancelReservation(@Param('reservationId') reservationId: string, @Body('adminId') adminId: string, @Body('reason') reason: string) {
    return this.adminService.cancelReservation(reservationId, adminId, reason);
  }

  /**

   * @param reservationId - 환불할 예약 ID
   * @param adminId - 처리하는 관리자 ID
   * @param amount - 환불 금액 (선택사항)
   * @description 취소된 예약에 대해 환불 정책에 따라 환불 처리
   */
  @Post('reservations/:reservationId/refund')
  async refundReservation(@Param('reservationId') reservationId: string, @Body('adminId') adminId: string, @Body('amount') amount?: number) {
    return this.adminService.refundReservation(reservationId, adminId, amount);
  }

  /**
   * @param period - 통계 기간
   * @returns 예약 통계 데이터
   * @description 기간별 예약 현황, 취소율, 이용률 등의 통계 정보 제공
   */
  @Get('reservations/stats')
  async getReservationStats(@Query('period') period?: string) {
    return this.adminService.getReservationStats(period);
  }

  /**
   * @param period - 분석 기간 단위
   * @returns 기간별 사용자 증가 통계
   * @description 일별, 주별, 월별 신규 사용자 가입 현황과 증가율 분석
   */
  @Get('analytics/user-growth')
  async getUserGrowthStats(@Query('period') period: 'daily' | 'weekly' | 'monthly') {
    return this.adminService.getUserGrowthStats(period);
  }

  /**
   * @param period - 분석 기간 단위
   * @returns 기간별 매출 통계
   * @description 다양한 기간별 매출 현황과 성장률, 수익원별 분석 제공
   */
  @Get('analytics/revenue')
  async getRevenueStats(@Query('period') period: 'daily' | 'weekly' | 'monthly' | 'yearly') {
    return this.adminService.getRevenueStats(period);
  }

  /**
   * @param period - 분석 기간
   * @returns 서비스별 이용 통계
   * @description 장소, 프로그램, 시간대별 이용 현황과 인기도 분석
   */
  @Get('analytics/usage')
  async getUsageStats(@Query('period') period: string) {
    return this.adminService.getUsageStats(period);
  }

  /**
   * @param period - 분석 기간
   * @returns 크리에이터별 성과 통계
   * @description 크리에이터들의 프로그램 운영 성과와 참가자 만족도 분석
   */
  @Get('analytics/creator-performance')
  async getCreatorPerformanceStats(@Query('period') period?: string) {
    return this.adminService.getCreatorPerformanceStats(period);
  }

  /**
   * @param reportType - 리포트 유형
   * @param period - 분석 기간
   * @returns 생성된 분석 리포트
   * @description 특정 주제에 대한 상세한 분석 리포트를 생성하여 의사결정 지원
   */
  @Post('analytics/reports')
  async generateAnalyticsReport(@Body('reportType') reportType: string, @Body('period') period: string) {
    return this.adminService.generateAnalyticsReport(reportType, period);
  }

 /**
   * @param dataType - 내보낼 데이터 유형
   * @param filter - 필터링 조건
   * @returns 내보낸 데이터 파일 정보
   * @description 관리 목적으로 다양한 형태의 데이터를 CSV, Excel 등의 형태로 내보내기
   */
  @Post('analytics/export')
  async exportData(@Body('dataType') dataType: string, @Body('filter') filter?: any) {
    return this.adminService.exportData(dataType, filter);
  }

  /**
   * @returns 현재 시스템 설정 정보
   * @description 서비스 운영에 필요한 모든 시스템 설정값들을 조회
   */
  @Get('system/settings')
  async getSystemSettings() {
    return this.adminService.getSystemSettings();
  }

  /**
   * @param settings - 변경할 설정 정보
   * @description 서비스 정책, 요금, 운영 시간 등 시스템 설정을 업데이트
   */
  @Put('system/settings')
  async updateSystemSettings(@Body() settings: any) {
    return this.adminService.updateSystemSettings(settings);
  }

  /**
   * @returns 현재 기능 플래그 상태
   * @description A/B 테스트나 점진적 배포를 위한 기능 플래그 상태 조회
   */
  @Get('system/feature-flags')
  async getFeatureFlags() {
    return this.adminService.getFeatureFlags();
  }

  /**
   * @param flags - 변경할 기능 플래그
   * @description 새로운 기능의 활성화/비활성화를 동적으로 제어
   */
  @Put('system/feature-flags')
  async updateFeatureFlags(@Body() flags: any) {
    return this.adminService.updateFeatureFlags(flags);
  }

  /**
   * @param adminId - 생성하는 관리자 ID
   * @param notificationData - 알림 내용
   * @returns 생성된 알림 정보
   * @description 전체 사용자나 특정 그룹에게 발송할 시스템 알림을 생성
   */
  @Post('notifications')
  async createNotification(@Body('adminId') adminId: string, @Body() notificationData: any) {
    return this.adminService.createNotification(adminId, notificationData);
  }

  /**
   * @param adminId - 발송하는 관리자 ID
   * @param userIds - 대상 사용자 ID 목록
   * @param message - 알림 메시지
   * @description 선택된 사용자들에게 일괄적으로 알림 메시지를 발송
   */
  @Post('notifications/bulk')
  async sendBulkNotification(@Body('adminId') adminId: string, @Body('userIds') userIds: string[], @Body('message') message: string) {
    return this.adminService.sendBulkNotification(adminId, userIds, message);
  }

  /**
   * @param adminId - 작성하는 관리자 ID
   * @param announcementData - 공지사항 내용
   * @returns 작성된 공지사항 정보
   * @description 서비스 이용자들에게 중요한 정보를 전달하기 위한 공지사항 작성
   */
  @Post('announcements')
  async createAnnouncement(@Body('adminId') adminId: string, @Body() announcementData: any) {
    return this.adminService.createAnnouncement(adminId, announcementData);
  }

  /**
   * @param announcementId - 수정할 공지사항 ID
   * @param updateData - 수정할 내용
   * @returns 수정된 공지사항 정보
   * @description 기존 공지사항의 내용이나 노출 설정을 수정
   */
  @Put('announcements/:announcementId')
  async updateAnnouncement(@Param('announcementId') announcementId: string, @Body() updateData: any) {
    return this.adminService.updateAnnouncement(announcementId, updateData);
  }

  /**
   * @param announcementId - 삭제할 공지사항 ID
   * @description 더 이상 필요하지 않은 공지사항을 시스템에서 제거
   */
  @Delete('announcements/:announcementId')
  async deleteAnnouncement(@Param('announcementId') announcementId: string) {
    return this.adminService.deleteAnnouncement(announcementId);
  }

  /**
   * @param filter - 로그 필터링 조건
   * @param limit - 조회 개수 제한
   * @param offset - 페이지네이션 오프셋
   * @returns 감사 로그 목록
   * @description 관리자와 시스템의 모든 중요한 활동을 기록한 감사 로그 조회
   */
  @Get('audit-logs')
  async getAuditLogs(@Query() filter?: any, @Query('limit') limit?: number, @Query('offset') offset?: number) {
    return this.adminService.getAuditLogs(filter, limit, offset);
  }

  /**
   * @param adminId - 활동을 수행한 관리자 ID
   * @param action - 수행한 액션
   * @param details - 상세 정보
   * @description 중요한 관리자 활동을 감사 로그에 기록
   */
  @Post('audit-logs')
  async createAuditLog(@Body('adminId') adminId: string, @Body('action') action: string, @Body('details') details: any) {
    return this.adminService.createAuditLog(adminId, action, details);
  }

  /**
   * @param startDate - 시작 날짜
   * @param endDate - 종료 날짜
   * @returns 내보낸 감사 로그 파일
   * @description 지정된 기간의 감사 로그를 파일로 내보내기하여 규정 준수나 감사 대응
   */
  @Post('audit-logs/export')
  async exportAuditLogs(@Body('startDate') startDate: Date, @Body('endDate') endDate: Date) {
    return this.adminService.exportAuditLogs(startDate, endDate);
  }

  /**
   * @param adminId - 백업을 요청한 관리자 ID
   * @param backupRequest - 백업 설정 정보
   * @returns 생성된 백업 정보
   * @description 시스템 데이터의 안전한 백업을 생성하여 데이터 손실 방지
   */
  @Post('backups')
  async createBackup(@Body('adminId') adminId: string, @Body() backupRequest: any) {
    return this.adminService.createBackup(adminId, backupRequest);
  }

  /**
   * @returns 생성된 백업들의 목록
   * @description 시스템에 저장된 모든 백업 파일의 정보와 상태를 조회
   */
  @Get('backups')
  async getBackupList() {
    return this.adminService.getBackupList();
  }

  /**
   * @param backupId - 복원할 백업 ID
   * @param adminId - 복원을 수행하는 관리자 ID
   * @description 선택한 백업 파일로부터 시스템 데이터를 복원
   */
  @Post('backups/:backupId/restore')
  async restoreFromBackup(@Param('backupId') backupId: string, @Body('adminId') adminId: string) {
    return this.adminService.restoreFromBackup(backupId, adminId);
  }

  /**
   * @param backupId - 삭제할 백업 ID
   * @param adminId - 삭제를 수행하는 관리자 ID
   * @description 더 이상 필요하지 않은 백업 파일을 안전하게 삭제
   */
  @Delete('backups/:backupId')
  async deleteBackup(@Param('backupId') backupId: string, @Body('adminId') adminId: string) {
    return this.adminService.deleteBackup(backupId, adminId);
  }

  /**
   * @returns 시스템의 전반적인 건강 상태
   * @description 서버, 데이터베이스, 외부 서비스 등의 상태를 종합적으로 확인
   */
  @Get('system/health')
  async getSystemHealth() {
    return this.adminService.getSystemHealth();
  }

  /**
   * @returns 서버의 실시간 성능 지표
   * @description CPU, 메모리, 디스크, 네트워크 등의 서버 리소스 사용률 모니터링
   */
  @Get('system/metrics')
  async getServerMetrics() {
    return this.adminService.getServerMetrics();
  }

  /**
   * @param limit - 조회할 로그 개수
   * @param offset - 페이지네이션 오프셋
   * @returns 시스템 에러 로그 목록
   * @description 시스템에서 발생한 에러들을 조회하여 문제 해결과 안정성 개선에 활용
   */
  @Get('system/error-logs')
  async getErrorLogs(@Query('limit') limit?: number, @Query('offset') offset?: number) {
    return this.adminService.getErrorLogs(limit, offset);
  }

  /**
   * @param cacheType - 초기화할 캐시 유형
   * @description 시스템 성능 개선이나 데이터 동기화를 위해 캐시를 초기화
   */
  @Post('system/clear-cache')
  async clearCache(@Body('cacheType') cacheType?: string) {
    return this.adminService.clearCache(cacheType);
  }

  /**
   * @param limit - 조회할 이벤트 개수
   * @param offset - 페이지네이션 오프셋
   * @returns 보안 관련 이벤트 목록
   * @description 의심스러운 활동, 로그인 실패, 권한 위반 등의 보안 이벤트 모니터링
   */
  @Get('security/events')
  async getSecurityEvents(@Query('limit') limit?: number, @Query('offset') offset?: number) {
    return this.adminService.getSecurityEvents(limit, offset);
  }

  /**
   * @param ipAddress - 차단할 IP 주소
   * @param adminId - 차단을 수행하는 관리자 ID
   * @param reason - 차단 사유
   * @description 악의적인 활동이나 보안 위험이 있는 IP 주소를 시스템 접근 차단
   */
  @Post('security/block-ip')
  async blockIP(@Body('ipAddress') ipAddress: string, @Body('adminId') adminId: string, @Body('reason') reason: string) {
    return this.adminService.blockIP(ipAddress, adminId, reason);
  }

  /**
   * @param ipAddress - 차단 해제할 IP 주소
   * @param adminId - 해제를 수행하는 관리자 ID
   * @description 잘못 차단되었거나 더 이상 위험하지 않은 IP 주소의 차단을 해제
   */
  @Post('security/unblock-ip')
  async unblockIP(@Body('ipAddress') ipAddress: string, @Body('adminId') adminId: string) {
    return this.adminService.unblockIP(ipAddress, adminId);
  }

  /**
   * @returns 현재 차단된 모든 IP 주소 목록
   * @description 시스템에서 차단된 IP 주소들과 차단 사유, 차단 일시 등의 정보 제공
   */
  @Get('security/blocked-ips')
  async getBlockedIPs() {
    return this.adminService.getBlockedIPs();
  }

  /**
   * @param status - 티켓 상태 필터
   * @param priority - 우선순위 필터
   * @param limit - 조회 개수 제한
   * @param offset - 페이지네이션 오프셋
   * @returns 고객 지원 티켓 목록
   * @description 사용자들이 제출한 문의, 불만, 요청 사항들을 상태별로 관리
   */
  @Get('support/tickets')
  async getSupportTickets(
    @Query('status') status?: string,
    @Query('priority') priority?: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number
  ) {
    return this.adminService.getSupportTickets(status, priority, limit, offset);
  }

  /**
   * @param ticketId - 지정할 티켓 ID
   * @param adminId - 담당할 관리자 ID
   * @description 고객 지원 티켓을 특정 관리자에게 할당하여 책임감 있는 처리 보장
   */
  @Post('support/tickets/:ticketId/assign')
  async assignTicket(@Param('ticketId') ticketId: string, @Body('adminId') adminId: string) {
    return this.adminService.assignTicket(ticketId, adminId);
  }

  /**
   * @param ticketId - 업데이트할 티켓 ID
   * @param status - 변경할 상태
   * @param adminId - 처리하는 관리자 ID
   * @description 티켓의 처리 상태를 진행 중, 해결 완료, 보류 등으로 업데이트
   */
  @Put('support/tickets/:ticketId/status')
  async updateTicketStatus(@Param('ticketId') ticketId: string, @Body('status') status: string, @Body('adminId') adminId: string) {
    return this.adminService.updateTicketStatus(ticketId, status, adminId);
  }

  /**
   * @param ticketId - 답변할 티켓 ID
   * @param adminId - 답변하는 관리자 ID
   * @param response - 답변 내용
   * @description 고객의 문의나 요청에 대해 관리자가 답변을 작성하고 전송
   */
  @Post('support/tickets/:ticketId/response')
  async addTicketResponse(@Param('ticketId') ticketId: string, @Body('adminId') adminId: string, @Body('response') response: string) {
    return this.adminService.addTicketResponse(ticketId, adminId, response);
  }
}
