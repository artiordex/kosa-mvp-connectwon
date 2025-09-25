/**
 * Description : program.controller.ts - 📌 프로그램 컨트롤러
 * Author : Shiwoo Min
 * Date : 2025-09-26
 */
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProgramService } from './program.service';

@Controller('programs')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  /** @description 새로운 프로그램 생성 */
  @Post(':creatorId')
  async createProgram(@Param('creatorId') creatorId: string, @Body() programData: any) {
    return this.programService.createProgram(creatorId, programData);
  }

  /** @description 프로그램 수정 */
  @Put(':creatorId/:programId')
  async updateProgram(@Param('creatorId') creatorId: string, @Param('programId') programId: string, @Body() updateData: any) {
    return this.programService.updateProgram(creatorId, programId, updateData);
  }

  /** @description 프로그램 삭제 */
  @Delete(':creatorId/:programId')
  async deleteProgram(@Param('creatorId') creatorId: string, @Param('programId') programId: string) {
    return this.programService.deleteProgram(creatorId, programId);
  }

  /** @description 프로그램 복제 */
  @Post(':creatorId/:programId/duplicate')
  async duplicateProgram(@Param('creatorId') creatorId: string, @Param('programId') programId: string) {
    return this.programService.duplicateProgram(creatorId, programId);
  }

  /** @description 프로그램 공개 */
  @Post(':creatorId/:programId/publish')
  async publishProgram(@Param('creatorId') creatorId: string, @Param('programId') programId: string) {
    return this.programService.publishProgram(creatorId, programId);
  }

  /** @description 프로그램 일시 중지 */
  @Post(':creatorId/:programId/suspend')
  async suspendProgram(@Param('creatorId') creatorId: string, @Param('programId') programId: string, @Body('reason') reason?: string) {
    return this.programService.suspendProgram(creatorId, programId, reason);
  }

  /** @description 프로그램 완료 처리 */
  @Post(':creatorId/:programId/complete')
  async completeProgram(@Param('creatorId') creatorId: string, @Param('programId') programId: string) {
    return this.programService.completeProgram(creatorId, programId);
  }

  /** @description 모든 프로그램 조회 */
  @Get()
  async getAllPrograms(@Query() filter?: any, @Query('limit') limit?: number, @Query('offset') offset?: number) {
    return this.programService.getAllPrograms(filter, limit, offset);
  }

  /** @description 특정 프로그램 조회 */
  @Get(':programId')
  async getProgramById(@Param('programId') programId: string) {
    return this.programService.getProgramById(programId);
  }

  /** @description 생성자가 등록한 프로그램 조회 */
  @Get('creator/:creatorId')
  async getProgramsByCreator(@Param('creatorId') creatorId: string, @Query('status') status?: string) {
    return this.programService.getProgramsByCreator(creatorId, status as any);
  }

  /** @description 카테고리별 프로그램 조회 */
  @Get('category/:categoryId')
  async getProgramsByCategory(@Param('categoryId') categoryId: string) {
    return this.programService.getProgramsByCategory(categoryId);
  }

  /** @description 프로그램 검색 */
  @Get('search/:query')
  async searchPrograms(@Param('query') query: string, @Query() filter?: any) {
    return this.programService.searchPrograms(query, filter);
  }

  /** @description 세션 생성 */
  @Post(':creatorId/:programId/sessions')
  async createSession(@Param('creatorId') creatorId: string, @Param('programId') programId: string, @Body() sessionData: any) {
    return this.programService.createSession(creatorId, programId, sessionData);
  }

  /** @description 세션 수정 */
  @Put(':creatorId/sessions/:sessionId')
  async updateSession(@Param('creatorId') creatorId: string, @Param('sessionId') sessionId: string, @Body() updateData: any) {
    return this.programService.updateSession(creatorId, sessionId, updateData);
  }

  /** @description 세션 삭제 */
  @Delete(':creatorId/sessions/:sessionId')
  async deleteSession(@Param('creatorId') creatorId: string, @Param('sessionId') sessionId: string) {
    return this.programService.deleteSession(creatorId, sessionId);
  }

  /** @description 프로그램의 모든 세션 조회 */
  @Get(':programId/sessions')
  async getProgramSessions(@Param('programId') programId: string) {
    return this.programService.getProgramSessions(programId);
  }

  /** @description 세션 상세 조회 */
  @Get('sessions/:sessionId')
  async getSessionById(@Param('sessionId') sessionId: string) {
    return this.programService.getSessionById(sessionId);
  }

  /** @description 참가자 등록 */
  @Post(':programId/participants/:userId')
  async enrollParticipant(@Param('programId') programId: string, @Param('userId') userId: string) {
    return this.programService.enrollParticipant(programId, userId);
  }

  /** @description 참가 취소 */
  @Post(':programId/participants/:userId/cancel')
  async cancelEnrollment(@Param('programId') programId: string, @Param('userId') userId: string, @Body('reason') reason?: string) {
    return this.programService.cancelEnrollment(programId, userId, reason);
  }

  /** @description 참가자 목록 조회 */
  @Get(':programId/participants')
  async getProgramParticipants(@Param('programId') programId: string, @Query('status') status?: string) {
    return this.programService.getProgramParticipants(programId, status as any);
  }

  /** @description 특정 참가자 상태 조회 */
  @Get(':programId/participants/:userId/status')
  async getParticipantStatus(@Param('programId') programId: string, @Param('userId') userId: string) {
    return this.programService.getParticipantStatus(programId, userId);
  }

  /** @description 세션 출석 체크 */
  @Post('sessions/:sessionId/attendance/:userId')
  async markAttendance(@Param('sessionId') sessionId: string, @Param('userId') userId: string, @Body('attended') attended: boolean) {
    return this.programService.markAttendance(sessionId, userId, attended);
  }

  /** @description 대기자 추가 */
  @Post(':programId/waitlist/:userId')
  async addToWaitlist(@Param('programId') programId: string, @Param('userId') userId: string) {
    return this.programService.addToWaitlist(programId, userId);
  }

  /** @description 대기자 제거 */
  @Delete(':programId/waitlist/:userId')
  async removeFromWaitlist(@Param('programId') programId: string, @Param('userId') userId: string) {
    return this.programService.removeFromWaitlist(programId, userId);
  }

  /** @description 대기자 목록 조회 */
  @Get(':programId/waitlist')
  async getWaitlist(@Param('programId') programId: string) {
    return this.programService.getWaitlist(programId);
  }

  /** @description 대기자 승급 */
  @Post(':programId/waitlist/promote')
  async promoteFromWaitlist(@Param('programId') programId: string, @Body('slots') slots: number) {
    return this.programService.promoteFromWaitlist(programId, slots);
  }

  /** @description 크리에이터 권한 확인 */
  @Get('creator/:userId/validate')
  async validateCreatorPermission(@Param('userId') userId: string) {
    return this.programService.validateCreatorPermission(userId);
  }

  /** @description 프로그램 소유 여부 확인 */
  @Get(':programId/ownership/:userId')
  async checkProgramOwnership(@Param('userId') userId: string, @Param('programId') programId: string) {
    return this.programService.checkProgramOwnership(userId, programId);
  }

  /** @description 크리에이터 통계 조회 */
  @Get('creator/:creatorId/stats')
  async getCreatorStats(@Param('creatorId') creatorId: string) {
    return this.programService.getCreatorStats(creatorId);
  }

  /** @description 크리에이터가 등록한 프로그램 조회 */
  @Get('creator/:creatorId/programs')
  async getCreatorPrograms(@Param('creatorId') creatorId: string, @Query('status') status?: string) {
    return this.programService.getCreatorPrograms(creatorId, status as any);
  }

  /** @description 프로그램 승인/거절 */
  @Post('admin/:adminId/:programId/review')
  async reviewProgram(
    @Param('adminId') adminId: string,
    @Param('programId') programId: string,
    @Body('approved') approved: boolean,
    @Body('feedback') feedback?: string,
  ) {
    return this.programService.reviewProgram(adminId, programId, approved, feedback);
  }

  /** @description 검토 대기 중인 프로그램 목록 조회 */
  @Get('admin/:adminId/pending')
  async getPendingPrograms(@Param('adminId') adminId: string) {
    return this.programService.getPendingPrograms(adminId);
  }

  /** @description 프로그램 신고 */
  @Post('admin/:adminId/:programId/flag')
  async flagProgram(@Param('adminId') adminId: string, @Param('programId') programId: string, @Body('reason') reason: string) {
    return this.programService.flagProgram(adminId, programId, reason);
  }

  /** @description 프로그램 리뷰 조회 */
  @Get(':programId/reviews')
  async getProgramReviews(@Param('programId') programId: string, @Query('limit') limit?: number, @Query('offset') offset?: number) {
    return this.programService.getProgramReviews(programId, limit, offset);
  }

  /** @description 프로그램 리뷰 작성 */
  @Post(':userId/:programId/reviews')
  async addReview(@Param('userId') userId: string, @Param('programId') programId: string, @Body() reviewData: any) {
    return this.programService.addReview(userId, programId, reviewData);
  }

  /** @description 프로그램 리뷰 수정 */
  @Put(':userId/reviews/:reviewId')
  async updateReview(@Param('userId') userId: string, @Param('reviewId') reviewId: string, @Body() reviewData: any) {
    return this.programService.updateReview(userId, reviewId, reviewData);
  }

  /** @description 프로그램 리뷰 삭제 */
  @Delete(':userId/reviews/:reviewId')
  async deleteReview(@Param('userId') userId: string, @Param('reviewId') reviewId: string) {
    return this.programService.deleteReview(userId, reviewId);
  }

  /** @description 모든 카테고리 조회 */
  @Get('categories')
  async getAllCategories() {
    return this.programService.getAllCategories();
  }

  /** @description 카테고리 생성 */
  @Post('admin/:adminId/categories')
  async createCategory(@Param('adminId') adminId: string, @Body() categoryData: any) {
    return this.programService.createCategory(adminId, categoryData);
  }

  /** @description 카테고리 수정 */
  @Put('admin/:adminId/categories/:categoryId')
  async updateCategory(@Param('adminId') adminId: string, @Param('categoryId') categoryId: string, @Body() updateData: any) {
    return this.programService.updateCategory(adminId, categoryId, updateData);
  }

  /** @description 카테고리 삭제 */
  @Delete('admin/:adminId/categories/:categoryId')
  async deleteCategory(@Param('adminId') adminId: string, @Param('categoryId') categoryId: string) {
    return this.programService.deleteCategory(adminId, categoryId);
  }

  /** @description 프로그램 통계 조회 */
  @Get(':programId/stats')
  async getProgramStats(@Param('programId') programId: string) {
    return this.programService.getProgramStats(programId);
  }

  /** @description 크리에이터 분석 조회 */
  @Get('creator/:creatorId/analytics')
  async getCreatorAnalytics(@Param('creatorId') creatorId: string, @Query('period') period?: 'week' | 'month' | 'year') {
    return this.programService.getCreatorAnalytics(creatorId, period);
  }

  /** @description 인기 프로그램 조회 */
  @Get('popular')
  async getPopularPrograms(@Query('limit') limit?: number, @Query('period') period?: string) {
    return this.programService.getPopularPrograms(limit, period);
  }

  /** @description 프로그램 매출 조회 */
  @Get(':programId/revenue')
  async getProgramRevenue(@Param('programId') programId: string, @Query('period') period?: string) {
    return this.programService.getProgramRevenue(programId, period);
  }
}
