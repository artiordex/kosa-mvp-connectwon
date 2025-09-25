/**
 * Description : ai.controller.ts - 📌 AI 서비스 컨트롤러
 * Author : Shiwoo Min
 * Date : 2025-09-26
 */
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AiService } from './ai.service';

/**
 * @description AI 서비스 컨트롤러 - 인공지능 기반 추천, 예측, 분석, 최적화 기능을 제공하는 REST API 엔드포인트
 */
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  /**
   * 사용자 예약 패턴 분석
   * @param {string} userId - 분석할 사용자 ID
   * @returns {Promise<any>} 사용자의 예약 패턴 분석 결과
   * @description 사용자의 과거 예약 이력을 바탕으로 선호하는 시간대, 장소, 빈도 등을 분석
   */
  @Get('users/:userId/booking-patterns')
  async analyzeUserBookingPatterns(@Param('userId') userId: string) {
    return this.aiService.analyzeUserBookingPatterns(userId);
  }

  /**
   * 사용자 맞춤 장소 추천
   * @param {string} userId - 추천받을 사용자 ID
   * @param {number} [limit] - 추천 결과 개수 제한 (선택사항)
   * @returns {Promise<VenueRecommendation[]>} 추천 장소 목록
   * @description 사용자의 과거 이용 패턴과 선호도를 기반으로 맞춤형 장소 추천
   */
  @Get('users/:userId/recommendations/venues')
  async recommendVenues(@Param('userId') userId: string, @Query('limit') limit?: number) {
    return this.aiService.recommendVenues(userId, limit);
  }

  /**
   * 사용자 맞춤 시간대 추천
   * @param {string} userId - 추천받을 사용자 ID
   * @param {string} venueId - 대상 장소 ID
   * @returns {Promise<TimeSlotRecommendation[]>} 추천 시간대 목록
   * @description 특정 장소에서 사용자에게 최적화된 이용 시간대 추천
   */
  @Get('users/:userId/recommendations/time-slots')
  async recommendTimeSlots(@Param('userId') userId: string, @Query('venueId') venueId: string) {
    return this.aiService.recommendTimeSlots(userId, venueId);
  }

  /**
   * 사용자 맞춤 프로그램 추천
   * @param {string} userId - 추천받을 사용자 ID
   * @param {any} [preferences] - 사용자 선호도 설정 (선택사항)
   * @returns {Promise<ProgramRecommendation[]>} 추천 프로그램 목록
   * @description 사용자의 관심사와 참여 이력을 바탕으로 맞춤형 프로그램 추천
   */
  @Get('users/:userId/recommendations/programs')
  async recommendPrograms(@Param('userId') userId: string, @Body() preferences?: any) {
    return this.aiService.recommendPrograms(userId, preferences);
  }

  /**
   * 통합 개인화 추천
   * @param {string} userId - 추천받을 사용자 ID
   * @param {'venue' | 'program' | 'time'} type - 추천 타입 (장소/프로그램/시간)
   * @returns {Promise<any[]>} 타입별 개인화 추천 결과
   * @description 사용자에게 특정 카테고리의 개인화된 추천 제공
   */
  @Get('users/:userId/recommendations')
  async getPersonalizedRecommendations(@Param('userId') userId: string, @Query('type') type: 'venue' | 'program' | 'time') {
    return this.aiService.getPersonalizedRecommendations(userId, type);
  }

  /**
   * 추천 점수 계산
   * @param {string} userId - 사용자 ID
   * @param {string} itemId - 대상 아이템 ID
   * @param {string} itemType - 아이템 유형 (venue/program 등)
   * @returns {Promise<number>} 0-1 사이의 추천 점수
   * @description 특정 사용자에게 특정 아이템이 얼마나 적합한지 점수로 계산
   */
  @Get('users/:userId/recommendations/:itemId/score')
  async calculateRecommendationScore(@Param('userId') userId: string, @Param('itemId') itemId: string, @Query('itemType') itemType: string) {
    return this.aiService.calculateRecommendationScore(userId, itemId, itemType);
  }

  /**
   * 장소 이용률 예측
   * @param {string} venueId - 예측할 장소 ID
   * @param {any} timeRange - 예측 시간 범위
   * @returns {Promise<UsagePrediction>} 이용률 예측 결과
   * @description 특정 장소의 미래 이용률을 시간대별로 예측
   */
  @Get('venues/:venueId/usage-prediction')
  async predictVenueUsage(@Param('venueId') venueId: string, @Query('timeRange') timeRange: any) {
    return this.aiService.predictVenueUsage(venueId, timeRange);
  }

  /**
   * 피크 시간대 예측
   * @param {string} [venueId] - 특정 장소 ID (선택사항, 없으면 전체 분석)
   * @returns {Promise<PeakTimesPrediction[]>} 피크 시간대 예측 목록
   * @description 가장 붐빌 것으로 예상되는 시간대 예측
   */
  @Get('peak-times')
  async predictPeakTimes(@Query('venueId') venueId?: string) {
    return this.aiService.predictPeakTimes(venueId);
  }

  /**
   * 주간 예약 예측
   * @param {Date} startDate - 예측 시작 날짜
   * @returns {Promise<any>} 주간 예약량 예측 결과
   * @description 특정 주간의 예약 패턴과 수요를 예측
   */
  @Get('forecast/weekly-bookings')
  async forecastWeeklyBookings(@Query('startDate') startDate: Date) {
    return this.aiService.forecastWeeklyBookings(startDate);
  }

  /**
   * 최적 수용 인원 예측
   * @param {string} venueId - 대상 장소 ID
   * @param {Date} date - 예측 날짜
   * @returns {Promise<number>} 최적 수용 인원 수
   * @description 특정 날짜에 해당 장소의 최적 수용 인원을 예측
   */
  @Get('venues/:venueId/optimal-capacity')
  async predictOptimalCapacity(@Param('venueId') venueId: string, @Query('date') date: Date) {
    return this.aiService.predictOptimalCapacity(venueId, date);
  }

  /**
   * 수요 트렌드 분석
   * @param {'daily' | 'weekly' | 'monthly'} period - 분석 기간 단위
   * @returns {Promise<any[]>} 수요 트렌드 분석 결과
   * @description 설정된 기간별로 수요 패턴과 트렌드를 분석
   */
  @Get('demand-trends')
  async analyzeDemandTrends(@Query('period') period: 'daily' | 'weekly' | 'monthly') {
    return this.aiService.analyzeDemandTrends(period);
  }

  /**
   * 인기 프로그램 예측
   * @param {number} timeframe - 예측 기간 (일 단위)
   * @returns {Promise<ProgramPopularityPrediction[]>} 인기 예상 프로그램 목록
   * @description 향후 특정 기간 동안 인기를 끌 것으로 예상되는 프로그램 예측
   */
  @Get('programs/popularity-prediction')
  async predictPopularPrograms(@Query('timeframe') timeframe: number) {
    return this.aiService.predictPopularPrograms(timeframe);
  }

  /**
   * 감정 분석
   * @param {string} review - 분석할 리뷰 텍스트
   * @returns {Promise<'positive' | 'negative' | 'neutral'>} 감정 분석 결과
   * @description 텍스트의 감정을 긍정/부정/중립으로 분류
   */
  @Post('sentiment-analysis')
  async analyzeSentiment(@Body('review') review: string) {
    return this.aiService.analyzeSentiment(review);
  }

  /**
   * 키워드 추출
   * @param {string} text - 키워드를 추출할 텍스트
   * @param {number} [limit] - 추출할 키워드 개수 제한 (선택사항)
   * @returns {Promise<string[]>} 추출된 키워드 목록
   * @description 텍스트에서 중요한 키워드들을 자동 추출
   */
  @Post('extract-keywords')
  async extractKeywords(@Body('text') text: string, @Body('limit') limit?: number) {
    return this.aiService.extractKeywords(text, limit);
  }

  /**
   * 만족도 점수 계산
   * @param {string[]} feedbacks - 피드백 텍스트 배열
   * @returns {Promise<number>} 0-100 사이의 만족도 점수
   * @description 여러 피드백을 종합하여 전체적인 만족도 점수 계산
   */
  @Post('satisfaction-score')
  async calculateSatisfactionScore(@Body('feedbacks') feedbacks: string[]) {
    return this.aiService.calculateSatisfactionScore(feedbacks);
  }

  /**
   * 인사이트 생성
   * @param {string[]} feedbacks - 분석할 피드백 데이터 배열
   * @returns {Promise<any>} 생성된 인사이트 정보
   * @description 피드백 데이터를 분석하여 의미있는 인사이트와 개선사항 도출
   */
  @Post('insights')
  async generateInsights(@Body('feedbacks') feedbacks: string[]) {
    return this.aiService.generateInsights(feedbacks);
  }

  /**
   * 예약 패턴 분석
   * @param {any} [timeRange] - 분석 시간 범위 (선택사항)
   * @returns {Promise<any>} 예약 패턴 분석 결과
   * @description 전체 사용자들의 예약 패턴을 분석하여 트렌드 파악
   */
  @Get('analysis/booking-patterns')
  async analyzeBookingPatterns(@Query('timeRange') timeRange?: any) {
    return this.aiService.analyzeBookingPatterns(timeRange);
  }

  /**
   * 트렌드 식별
   * @param {'booking' | 'usage' | 'satisfaction'} dataType - 분석할 데이터 타입
   * @returns {Promise<any>} 식별된 트렌드 정보
   * @description 특정 데이터 타입의 트렌드를 식별하고 변화 패턴 분석
   */
  @Get('analysis/trends')
  async identifyTrends(@Query('dataType') dataType: 'booking' | 'usage' | 'satisfaction') {
    return this.aiService.identifyTrends(dataType);
  }

  /**
   * 이상 현상 탐지
   * @param {string} [venueId] - 특정 장소 ID (선택사항, 없으면 전체 분석)
   * @returns {Promise<any[]>} 탐지된 이상 현상 목록
   * @description 평소 패턴과 다른 이상한 현상이나 급격한 변화를 탐지
   */
  @Get('analysis/anomalies')
  async detectAnomalies(@Query('venueId') venueId?: string) {
    return this.aiService.detectAnomalies(venueId);
  }

  /**
   * 사용량 리포트 생성
   * @param {any} params - 리포트 생성 파라미터
   * @returns {Promise<any>} 생성된 사용량 리포트
   * @description 설정된 조건에 따라 상세한 사용량 분석 리포트 생성
   */
  @Post('reports/usage')
  async generateUsageReport(@Body() params: any) {
    return this.aiService.generateUsageReport(params);
  }

  /**
   * 스케줄 최적화
   * @param {any} constraints - 최적화 제약 조건
   * @returns {Promise<any>} 최적화된 스케줄
   * @description 주어진 제약 조건 하에서 최적의 스케줄 배치 제안
   */
  @Post('optimization/scheduling')
  async optimizeScheduling(@Body('constraints') constraints: any) {
    return this.aiService.optimizeScheduling(constraints);
  }

  /**
   * 대안 제안
   * @param {any} originalBooking - 원래 예약 요청 정보
   * @returns {Promise<any[]>} 대안 옵션 목록
   * @description 원하는 예약이 불가능할 때 유사한 조건의 대안들 제안
   */
  @Post('alternatives')
  async suggestAlternatives(@Body() originalBooking: any) {
    return this.aiService.suggestAlternatives(originalBooking);
  }

  /**
   * 부하 분산
   * @param {string[]} venueIds - 부하 분산 대상 장소 ID 목록
   * @returns {Promise<any>} 부하 분산 결과
   * @description 여러 장소 간의 이용률을 균등하게 분산하는 방안 제시
   */
  @Post('load-balancing')
  async balanceLoad(@Body('venueIds') venueIds: string[]) {
    return this.aiService.balanceLoad(venueIds);
  }

  /**
   * 액션 추천
   * @param {any} optimizationContext - 최적화 컨텍스트 정보
   * @returns {Promise<any[]>} 추천 액션 목록
   * @description 현재 상황에 맞는 최적의 운영 액션들을 추천
   */
  @Post('recommendations/actions')
  async recommendActions(@Body('context') optimizationContext: any) {
    return this.aiService.recommendActions(optimizationContext);
  }
}
