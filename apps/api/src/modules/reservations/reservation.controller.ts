/**
 * Description : reservation.controller.ts - 📌 예약 컨트롤러 (Reservation API)
 * Author : Shiwoo Min
 * Date : 2025-09-26
 */
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ReservationService } from './reservation.service';

/**
 * @description 예약 관련 API 엔드포인트를 제공하는 컨트롤러
 */
@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  /**
   * @description 예약 생성
   * @param userId 사용자 ID
   * @param reservationData 예약 요청 데이터
   */
  @Post(':userId')
  async createReservation(@Param('userId') userId: string, @Body() reservationData: any) {
    return this.reservationService.createReservation(userId, reservationData);
  }

  /**
   * @description 예약 수정
   * @param userId 사용자 ID
   * @param reservationId 예약 ID
   * @param updateData 수정 데이터
   */
  @Put(':userId/:reservationId')
  async updateReservation(@Param('userId') userId: string, @Param('reservationId') reservationId: string, @Body() updateData: any) {
    return this.reservationService.updateReservation(userId, reservationId, updateData);
  }

  /**
   * @description 예약 취소
   * @param userId 사용자 ID
   * @param reservationId 예약 ID
   * @param reason 취소 사유
   */
  @Delete(':userId/:reservationId')
  async cancelReservation(@Param('userId') userId: string, @Param('reservationId') reservationId: string, @Body('reason') reason?: string) {
    return this.reservationService.cancelReservation(userId, reservationId, reason);
  }

  /**
   * @description 예약 확정 처리
   * @param reservationId 예약 ID
   */
  @Post(':reservationId/confirm')
  async confirmReservation(@Param('reservationId') reservationId: string) {
    return this.reservationService.confirmReservation(reservationId);
  }

  /** @description 예약 단건 조회 */
  @Get(':reservationId')
  async getReservationById(@Param('reservationId') reservationId: string) {
    return this.reservationService.getReservationById(reservationId);
  }

  /** @description 사용자 예약 목록 조회 */
  @Get('user/:userId')
  async getUserReservations(@Param('userId') userId: string, @Query() filter: any) {
    return this.reservationService.getUserReservations(userId, filter);
  }

  /** @description 지점(venue) 예약 조회 */
  @Get('venue/:venueId')
  async getVenueReservations(@Param('venueId') venueId: string, @Query('startDate') startDate: Date, @Query('endDate') endDate: Date) {
    return this.reservationService.getVenueReservations(venueId, startDate, endDate);
  }

  /** @description 특정 룸 예약 조회 */
  @Get('room/:roomId')
  async getRoomReservations(@Param('roomId') roomId: string, @Query('date') date: Date) {
    return this.reservationService.getRoomReservations(roomId, date);
  }

  /** @description 지점(venue) 예약 가능 여부 확인 */
  @Get('venue/:venueId/availability')
  async checkVenueAvailability(@Param('venueId') venueId: string, @Query('date') date: Date, @Query('duration') duration: number) {
    return this.reservationService.checkVenueAvailability(venueId, date, duration);
  }

  /** @description 특정 룸 예약 가능 여부 확인 */
  @Get('room/:roomId/availability')
  async checkRoomAvailability(@Param('roomId') roomId: string, @Query('startTime') startTime: Date, @Query('endTime') endTime: Date) {
    return this.reservationService.checkRoomAvailability(roomId, startTime, endTime);
  }

  /** @description 예약 가능한 룸 목록 조회 */
  @Get('venue/:venueId/available-rooms')
  async getAvailableRooms(
    @Param('venueId') venueId: string,
    @Query('startTime') startTime: Date,
    @Query('endTime') endTime: Date,
    @Query('capacity') capacity?: number,
  ) {
    return this.reservationService.getAvailableRooms(venueId, startTime, endTime, capacity);
  }

  /** @description 예약 가능한 타임슬롯 조회 */
  @Get('room/:roomId/available-slots')
  async getAvailableTimeSlots(@Param('roomId') roomId: string, @Query('date') date: Date, @Query('duration') duration: number) {
    return this.reservationService.getAvailableTimeSlots(roomId, date, duration);
  }

  /** @description 예약 충돌 감지 */
  @Get('room/:roomId/conflicts')
  async detectReservationConflicts(@Param('roomId') roomId: string, @Query('startTime') startTime: Date, @Query('endTime') endTime: Date) {
    return this.reservationService.detectReservationConflicts(roomId, startTime, endTime);
  }

  /** @description 충돌 해결 */
  @Post('conflicts/:conflictId/resolve')
  async resolveConflict(@Param('conflictId') conflictId: string, @Body('resolution') resolution: any) {
    return this.reservationService.resolveConflict(conflictId, resolution);
  }

  /** @description 대체 타임슬롯 추천 */
  @Post('venue/:venueId/suggest-slots')
  async suggestAlternativeSlots(@Param('venueId') venueId: string, @Body() originalRequest: any) {
    return this.reservationService.suggestAlternativeSlots(venueId, originalRequest);
  }

  /** @description 대체 룸 추천 */
  @Get('venue/:venueId/suggest-rooms')
  async suggestAlternativeRooms(
    @Param('venueId') venueId: string,
    @Query('startTime') startTime: Date,
    @Query('endTime') endTime: Date,
    @Query() requirements?: any,
  ) {
    return this.reservationService.suggestAlternativeRooms(venueId, startTime, endTime, requirements);
  }

  /** @description 반복 예약 생성 */
  @Post(':userId/recurring')
  async createRecurringReservation(@Param('userId') userId: string, @Body() recurringData: any) {
    return this.reservationService.createRecurringReservation(userId, recurringData);
  }

  /** @description 반복 예약 수정 */
  @Put(':userId/recurring/:recurringId')
  async updateRecurringReservation(@Param('userId') userId: string, @Param('recurringId') recurringId: string, @Body() updateData: any) {
    return this.reservationService.updateRecurringReservation(userId, recurringId, updateData);
  }

  /** @description 반복 예약 취소 */
  @Delete(':userId/recurring/:recurringId')
  async cancelRecurringReservation(
    @Param('userId') userId: string,
    @Param('recurringId') recurringId: string,
    @Query('cancelFrom') cancelFrom?: Date,
  ) {
    return this.reservationService.cancelRecurringReservation(userId, recurringId, cancelFrom);
  }

  /** @description 반복 예약 패턴 조회 */
  @Get('recurring/:recurringId')
  async getRecurringPattern(@Param('recurringId') recurringId: string) {
    return this.reservationService.getRecurringPattern(recurringId);
  }

  /** @description 대기자 명단 추가 */
  @Post('room/:roomId/waitlist/:userId')
  async addToWaitlist(
    @Param('userId') userId: string,
    @Param('roomId') roomId: string,
    @Body('preferredTime') preferredTime: Date,
    @Body() waitlistData: any,
  ) {
    return this.reservationService.addToWaitlist(userId, roomId, preferredTime, waitlistData);
  }

/** @description 대기자 명단 제거 */
  @Delete('waitlist/:waitlistId')
  async removeFromWaitlist(
    @Param('waitlistId') waitlistId: string,
    @Req() req: any, // 혹은 @CurrentUser() user
  ) {
    const userId = req.user.id; // 인증된 사용자 ID
    return this.reservationService.removeFromWaitlist(userId, waitlistId);
  }

  /** @description 대기자 명단 조회 */
  @Get('room/:roomId/waitlist')
  async getWaitlist(@Param('roomId') roomId: string, @Query('date') date?: Date) {
    return this.reservationService.getWaitlist(roomId, date);
  }

  /** @description 대기자 알림 발송 */
  @Post('room/:roomId/waitlist/notify')
  async notifyWaitlistUsers(@Param('roomId') roomId: string, @Body('availableSlot') availableSlot: any) {
    return this.reservationService.notifyWaitlistUsers(roomId, availableSlot);
  }

  /** @description 예약 체크인 */
  @Post(':reservationId/checkin')
  async checkInReservation(@Param('reservationId') reservationId: string) {
    return this.reservationService.checkInReservation(reservationId);
  }

  /** @description 예약 체크아웃 */
  @Post(':reservationId/checkout')
  async checkOutReservation(@Param('reservationId') reservationId: string) {
    return this.reservationService.checkOutReservation(reservationId);
  }

  /** @description 예약 노쇼 처리 */
  @Post(':reservationId/no-show')
  async markNoShow(@Param('reservationId') reservationId: string) {
    return this.reservationService.markNoShow(reservationId);
  }

  /** @description 예약 시간 연장 */
  @Post(':reservationId/extend')
  async extendReservation(@Param('reservationId') reservationId: string, @Body('additionalTime') additionalTime: number) {
    return this.reservationService.extendReservation(reservationId, additionalTime);
  }

  /** @description 전체 예약 목록 조회 */
  @Get()
  async getAllReservations(@Query() filter?: any, @Query('limit') limit?: number, @Query('offset') offset?: number) {
    return this.reservationService.getAllReservations(filter, limit, offset);
  }

  /** @description 예약 통계 조회 */
  @Get('stats')
  async getReservationStats(@Query('venueId') venueId?: string, @Query('period') period?: string) {
    return this.reservationService.getReservationStats(venueId, period);
  }

  /** @description 여러 예약 일괄 취소 */
  @Post('bulk-cancel')
  async bulkCancelReservations(@Body('reservationIds') reservationIds: string[], @Body('reason') reason: string) {
    return this.reservationService.bulkCancelReservations(reservationIds, reason);
  }

  /** @description 관리자 권한으로 예약 강제 등록/수정 */
  @Post('override/:adminId')
  async overrideReservation(@Param('adminId') adminId: string, @Body() reservationData: any) {
    return this.reservationService.overrideReservation(adminId, reservationData);
  }

  /** @description 예약 규칙 유효성 검증 */
  @Post('validate')
  async validateReservationRules(@Body() reservationData: any) {
    return this.reservationService.validateReservationRules(reservationData);
  }

  /** @description 취소 정책 조회 */
  @Get(':reservationId/cancellation-policy')
  async checkCancellationPolicy(@Param('reservationId') reservationId: string) {
    return this.reservationService.checkCancellationPolicy(reservationId);
  }

  /** @description 취소 수수료 계산 */
  @Get(':reservationId/cancellation-fee')
  async calculateCancellationFee(@Param('reservationId') reservationId: string) {
    return this.reservationService.calculateCancellationFee(reservationId);
  }

  /** @description 예약 할인 적용 */
  @Post(':reservationId/discount')
  async applyReservationDiscount(@Param('reservationId') reservationId: string, @Body('discountCode') discountCode: string) {
    return this.reservationService.applyReservationDiscount(reservationId, discountCode);
  }

  /** @description 예약 확정 알림 */
  @Post(':reservationId/notify/confirmation')
  async sendReservationConfirmation(@Param('reservationId') reservationId: string) {
    return this.reservationService.sendReservationConfirmation(reservationId);
  }

  /** @description 예약 리마인더 발송 */
  @Post(':reservationId/notify/reminder')
  async sendReservationReminder(@Param('reservationId') reservationId: string) {
    return this.reservationService.sendReservationReminder(reservationId);
  }

  /** @description 예약 취소 알림 */
  @Post(':reservationId/notify/cancellation')
  async sendCancellationNotice(@Param('reservationId') reservationId: string) {
    return this.reservationService.sendCancellationNotice(reservationId);
  }

  /** @description 예약 리마인더 예약 (스케줄링) */
  @Post(':reservationId/notify/schedule')
  async scheduleReminders(@Param('reservationId') reservationId: string) {
    return this.reservationService.scheduleReminders(reservationId);
  }

  /** @description 예약 메트릭 조회 */
  @Get('metrics')
  async getReservationMetrics(@Query('venueId') venueId?: string, @Query('period') period?: string) {
    return this.reservationService.getReservationMetrics(venueId, period);
  }

  /** @description 특정 룸 이용률 조회 */
  @Get('room/:roomId/utilization')
  async getUtilizationRate(@Param('roomId') roomId: string, @Query('period') period: string) {
    return this.reservationService.getUtilizationRate(roomId, period);
  }

  /** @description 지점 피크 타임 조회 */
  @Get('venue/:venueId/peak-times')
  async getPeakUsageTimes(@Param('venueId') venueId: string) {
    return this.reservationService.getPeakUsageTimes(venueId);
  }

  /** @description 노쇼 비율 조회 */
  @Get('venue/:venueId/no-show-rate')
  async getNoShowRate(@Param('venueId') venueId: string, @Query('period') period?: string) {
    return this.reservationService.getNoShowRate(venueId, period);
  }
}
function Req(): (target: ReservationController, propertyKey: "removeFromWaitlist", parameterIndex: 1) => void {
  throw new Error('Function not implemented.');
}

