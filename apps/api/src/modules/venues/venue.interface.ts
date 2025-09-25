/**
 * Description : venue.interface.ts - 📌 지점 서비스 인터페이스 정의
 * Author : Shiwoo Min
 * Date : 2025-09-26
 */

// Placeholder 타입들 (나중에 packages/api-contract/schemas 로 대체 예정)
type Venue = any;
type VenueCreateRequest = any;
type VenueUpdateRequest = any;
type VenueFilter = any;
type Room = any;
type RoomCreateRequest = any;
type RoomUpdateRequest = any;
type VenueAmenity = any;
type VenueOperatingHours = any;
type VenueStatus = 'active' | 'inactive' | 'maintenance' | 'closed' | 'coming_soon';
type RoomStatus = 'available' | 'occupied' | 'maintenance' | 'out_of_service';
type VenueStats = any;
type MaintenanceSchedule = any;

/**
 * @description 지점 서비스 인터페이스
 */
export interface IVenueService {
  // 기본 지점 관리
  createVenue(venueData: VenueCreateRequest): Promise<Venue>;
  getVenueById(venueId: string): Promise<Venue>;
  updateVenue(venueId: string, updateData: VenueUpdateRequest): Promise<Venue>;
  deleteVenue(venueId: string, soft?: boolean): Promise<void>;

  // 지점 조회 및 검색
  getAllVenues(filter?: VenueFilter, limit?: number, offset?: number): Promise<Venue[]>;
  searchVenues(query: string, location?: any, radius?: number): Promise<Venue[]>;
  getVenuesByStatus(status: VenueStatus): Promise<Venue[]>;
  getNearbyVenues(latitude: number, longitude: number, radius: number): Promise<Venue[]>;
  getPopularVenues(limit?: number, period?: string): Promise<Venue[]>;

  // 지점 상태 관리
  activateVenue(venueId: string): Promise<void>;
  deactivateVenue(venueId: string, reason?: string): Promise<void>;
  setVenueMaintenanceMode(venueId: string, maintenanceData: MaintenanceSchedule): Promise<void>;
  closeVenue(venueId: string, reason: string, temporary?: boolean): Promise<void>;

  // 룸 관리
  addRoom(venueId: string, roomData: RoomCreateRequest): Promise<Room>;
  updateRoom(roomId: string, updateData: RoomUpdateRequest): Promise<Room>;
  removeRoom(roomId: string): Promise<void>;
  getVenueRooms(venueId: string, status?: RoomStatus): Promise<Room[]>;
  getRoomById(roomId: string): Promise<Room>;

  // 룸 상태 관리
  setRoomStatus(roomId: string, status: RoomStatus, reason?: string): Promise<void>;
  scheduleRoomMaintenance(roomId: string, maintenanceData: MaintenanceSchedule): Promise<void>;
  getRoomAvailability(roomId: string, date: Date): Promise<any>;
  bulkUpdateRoomStatus(roomIds: string[], status: RoomStatus): Promise<void>;

  // 운영 시간 관리
  getVenueOperatingHours(venueId: string): Promise<VenueOperatingHours>;
  updateOperatingHours(venueId: string, operatingHours: VenueOperatingHours): Promise<void>;
  setSpecialOperatingHours(venueId: string, date: Date, hours: any): Promise<void>;
  getHolidaySchedule(venueId: string): Promise<any[]>;
  updateHolidaySchedule(venueId: string, holidays: any[]): Promise<void>;

  // 편의시설 및 장비 관리
  getVenueAmenities(venueId: string): Promise<VenueAmenity[]>;
  addAmenity(venueId: string, amenityData: VenueAmenity): Promise<VenueAmenity>;
  updateAmenity(amenityId: string, updateData: any): Promise<VenueAmenity>;
  removeAmenity(amenityId: string): Promise<void>;
  getRoomEquipment(roomId: string): Promise<any[]>;
  updateRoomEquipment(roomId: string, equipment: any[]): Promise<void>;

  // 요금 및 정책 관리
  getVenuePricing(venueId: string): Promise<any>;
  updateVenuePricing(venueId: string, pricingData: any): Promise<void>;
  getRoomPricing(roomId: string): Promise<any>;
  updateRoomPricing(roomId: string, pricingData: any): Promise<void>;
  getVenuePolicies(venueId: string): Promise<any>;
  updateVenuePolicies(venueId: string, policies: any): Promise<void>;

  // 용량 및 레이아웃 관리
  getRoomCapacity(roomId: string, setupType?: string): Promise<number>;
  updateRoomCapacity(roomId: string, capacityData: any): Promise<void>;
  getRoomLayouts(roomId: string): Promise<any[]>;
  addRoomLayout(roomId: string, layoutData: any): Promise<any>;
  updateRoomLayout(layoutId: string, layoutData: any): Promise<any>;

  // 이미지 및 미디어 관리
  uploadVenueImages(venueId: string, images: any[]): Promise<string[]>;
  deleteVenueImage(venueId: string, imageId: string): Promise<void>;
  uploadRoomImages(roomId: string, images: any[]): Promise<string[]>;
  deleteRoomImage(roomId: string, imageId: string): Promise<void>;
  setVenueMainImage(venueId: string, imageId: string): Promise<void>;

  // 통계 및 분석
  getVenueStats(venueId: string, period?: string): Promise<VenueStats>;
  getUtilizationRate(venueId: string, period: string): Promise<number>;
  getRoomUtilizationStats(roomId: string, period: string): Promise<any>;
  getRevenueStats(venueId: string, period: string): Promise<any>;
  getPopularityTrends(venueId: string): Promise<any>;

  // 유지보수 및 관리
  scheduleVenueMaintenance(venueId: string, maintenanceData: MaintenanceSchedule): Promise<void>;
  getMaintenanceHistory(venueId: string): Promise<any[]>;
  reportVenueIssue(venueId: string, issueData: any): Promise<any>;
  resolveVenueIssue(issueId: string, resolution: any): Promise<void>;

  // 리뷰 및 평가
  getVenueReviews(venueId: string, limit?: number, offset?: number): Promise<any[]>;
  getVenueRating(venueId: string): Promise<number>;
  getRoomReviews(roomId: string, limit?: number, offset?: number): Promise<any[]>;
  calculateSatisfactionScore(venueId: string, period?: string): Promise<number>;

  // 관리자 기능
  bulkUpdateVenues(venueIds: string[], updateData: any): Promise<void>;
  exportVenueData(venueIds: string[]): Promise<any>;
  generateVenueReport(venueId: string, reportType: string): Promise<any>;

  // 예약 연계
  checkVenueBookingAvailability(venueId: string, startTime: Date, endTime: Date): Promise<any>;
  getVenueBookingCalendar(venueId: string, month: number, year: number): Promise<any>;
  blockVenueTimeSlots(venueId: string, timeSlots: any[], reason: string): Promise<void>;
  unblockVenueTimeSlots(venueId: string, timeSlotIds: string[]): Promise<void>;
}
