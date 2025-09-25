/**
 * Description : reservation.interface.ts - 📌 예약 서비스 인터페이스 정의
 * Author : Shiwoo Min
 * Date : 2025-09-26
 */

// Placeholder 타입들 (나중에 packages/api-contract/schemas 로 대체 예정)
type Reservation = any;
type ReservationCreateRequest = any;
type ReservationUpdateRequest = any;
type ReservationFilter = any;
type TimeSlot = any;
type AvailabilityCheck = any;
type ReservationConflict = any;
type ReservationStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
type RecurringReservation = any;
type WaitlistEntry = any;

/**
 * @description 예약 서비스 인터페이스
 */
export interface IReservationService {
  // 기본 예약 관리
  createReservation(userId: string, reservationData: ReservationCreateRequest): Promise<Reservation>;
  updateReservation(userId: string, reservationId: string, updateData: ReservationUpdateRequest): Promise<Reservation>;
  cancelReservation(userId: string, reservationId: string, reason?: string): Promise<void>;
  confirmReservation(reservationId: string): Promise<Reservation>;

  // 예약 조회
  getReservationById(reservationId: string): Promise<Reservation>;
  getUserReservations(userId: string, filter?: ReservationFilter): Promise<Reservation[]>;
  getVenueReservations(venueId: string, startDate: Date, endDate: Date): Promise<Reservation[]>;
  getRoomReservations(roomId: string, date: Date): Promise<Reservation[]>;

  // 가용성 확인 (지점-룸 기반)
  checkVenueAvailability(venueId: string, date: Date, duration: number): Promise<AvailabilityCheck>;
  checkRoomAvailability(roomId: string, startTime: Date, endTime: Date): Promise<boolean>;
  getAvailableRooms(venueId: string, startTime: Date, endTime: Date, capacity?: number): Promise<any[]>;
  getAvailableTimeSlots(roomId: string, date: Date, duration: number): Promise<TimeSlot[]>;

  // 충돌 감지 및 해결
  detectReservationConflicts(roomId: string, startTime: Date, endTime: Date): Promise<ReservationConflict[]>;
  resolveConflict(conflictId: string, resolution: any): Promise<void>;
  suggestAlternativeSlots(venueId: string, originalRequest: ReservationCreateRequest): Promise<TimeSlot[]>;
  suggestAlternativeRooms(venueId: string, startTime: Date, endTime: Date, requirements?: any): Promise<any[]>;

  // 반복 예약
  createRecurringReservation(userId: string, recurringData: RecurringReservation): Promise<Reservation[]>;
  updateRecurringReservation(userId: string, recurringId: string, updateData: any): Promise<void>;
  cancelRecurringReservation(userId: string, recurringId: string, cancelFrom?: Date): Promise<void>;
  getRecurringPattern(recurringId: string): Promise<RecurringReservation>;

  // 대기자 명단
  addToWaitlist(userId: string, roomId: string, preferredTime: Date, waitlistData: any): Promise<WaitlistEntry>;
  removeFromWaitlist(userId: string, waitlistId: string): Promise<void>;
  getWaitlist(roomId: string, date?: Date): Promise<WaitlistEntry[]>;
  notifyWaitlistUsers(roomId: string, availableSlot: TimeSlot): Promise<void>;

  // 예약 상태 관리
  checkInReservation(reservationId: string): Promise<Reservation>;
  checkOutReservation(reservationId: string): Promise<Reservation>;
  markNoShow(reservationId: string): Promise<void>;
  extendReservation(reservationId: string, additionalTime: number): Promise<Reservation>;

  // 관리자 기능
  getAllReservations(filter?: ReservationFilter, limit?: number, offset?: number): Promise<Reservation[]>;
  getReservationStats(venueId?: string, period?: string): Promise<any>;
  bulkCancelReservations(reservationIds: string[], reason: string): Promise<void>;
  overrideReservation(adminId: string, reservationData: any): Promise<Reservation>;

  // 예약 정책
  validateReservationRules(reservationData: ReservationCreateRequest): Promise<boolean>;
  checkCancellationPolicy(reservationId: string): Promise<any>;
  calculateCancellationFee(reservationId: string): Promise<number>;
  applyReservationDiscount(reservationId: string, discountCode: string): Promise<number>;

  // 알림 및 리마인더
  sendReservationConfirmation(reservationId: string): Promise<void>;
  sendReservationReminder(reservationId: string): Promise<void>;
  sendCancellationNotice(reservationId: string): Promise<void>;
  scheduleReminders(reservationId: string): Promise<void>;

  // 통계 및 분석
  getReservationMetrics(venueId?: string, period?: string): Promise<any>;
  getUtilizationRate(roomId: string, period: string): Promise<number>;
  getPeakUsageTimes(venueId: string): Promise<any[]>;
  getNoShowRate(venueId?: string, period?: string): Promise<number>;
}
