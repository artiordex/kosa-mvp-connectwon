/**
 * Description : ai.interface.ts - 📌 AI 서비스 인터페이스 정의
 * Author : Shiwoo Min
 * Date : 2025-09-26
 */

// Placeholder 타입들 (나중에 packages/api-contract/schemas 로 대체 예정)
type VenueRecommendation = any;
type TimeSlotRecommendation = any;
type ProgramPreference = any;
type ProgramRecommendation = any;
type TimeRange = any;
type UsagePrediction = any;
type PeakTimesPrediction = any;
type ProgramPopularityPrediction = any;
type SchedulingConstraints = any;
type OptimizedSchedule = any;
type BookingRequest = any;
type AlternativeOption = any;
type LoadBalancingResult = any;
type OptimizationContext = any;

/**
 * @description AI 서비스 인터페이스
 */
export interface IAIService {
  // 추천
  analyzeUserBookingPatterns(userId: string): Promise<any>;
  recommendVenues(userId: string, limit?: number): Promise<VenueRecommendation[]>;
  recommendTimeSlots(userId: string, venueId: string): Promise<TimeSlotRecommendation[]>;
  recommendPrograms(userId: string, preferences?: ProgramPreference[]): Promise<ProgramRecommendation[]>;
  getPersonalizedRecommendations(userId: string, type: 'venue' | 'program' | 'time'): Promise<any[]>;
  calculateRecommendationScore(userId: string, itemId: string, itemType: string): Promise<number>;

  // 예측
  predictVenueUsage(venueId: string, timeRange: TimeRange): Promise<UsagePrediction>;
  predictPeakTimes(venueId?: string): Promise<PeakTimesPrediction[]>;
  forecastWeeklyBookings(startDate: Date): Promise<any>;
  predictOptimalCapacity(venueId: string, date: Date): Promise<number>;
  analyzeDemandTrends(period: 'daily' | 'weekly' | 'monthly'): Promise<any[]>;
  predictPopularPrograms(timeframe: number): Promise<ProgramPopularityPrediction[]>;

  // 감정/만족도 분석
  analyzeSentiment(review: string): Promise<'positive' | 'negative' | 'neutral'>;
  extractKeywords(text: string, limit?: number): Promise<string[]>;
  calculateSatisfactionScore(feedbacks: string[]): Promise<number>;
  generateInsights(feedbacks: string[]): Promise<any>;

  // 패턴 분석
  analyzeBookingPatterns(timeRange?: any): Promise<any>;
  identifyTrends(dataType: 'booking' | 'usage' | 'satisfaction'): Promise<any>;
  detectAnomalies(venueId?: string): Promise<any[]>;
  generateUsageReport(params: any): Promise<any>;

  // 실시간 최적화
  optimizeScheduling(constraints: SchedulingConstraints): Promise<OptimizedSchedule>;
  suggestAlternatives(originalBooking: BookingRequest): Promise<AlternativeOption[]>;
  balanceLoad(venueIds: string[]): Promise<LoadBalancingResult>;
  recommendActions(optimizationContext: OptimizationContext): Promise<any[]>;
}
