/**
 * Description : venue.controller.ts - 📌 지점 컨트롤러
 * Author : Shiwoo Min
 * Date : 2025-09-26
 */
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { VenueService } from './venue.service';

@Controller('venues')
export class VenueController {
  constructor(private readonly venueService: VenueService) {}

  /** @description 지점 생성 */
  @Post()
  async createVenue(@Body() venueData: any) {
    return this.venueService.createVenue(venueData);
  }

  /** @description 특정 지점 조회 */
  @Get(':venueId')
  async getVenueById(@Param('venueId') venueId: string) {
    return this.venueService.getVenueById(venueId);
  }

  /** @description 지점 정보 수정 */
  @Put(':venueId')
  async updateVenue(@Param('venueId') venueId: string, @Body() updateData: any) {
    return this.venueService.updateVenue(venueId, updateData);
  }

  /** @description 지점 삭제 */
  @Delete(':venueId')
  async deleteVenue(@Param('venueId') venueId: string, @Query('soft') soft?: boolean) {
    return this.venueService.deleteVenue(venueId, soft);
  }

  /** @description 전체 지점 조회 */
  @Get()
  async getAllVenues(@Query() filter: any, @Query('limit') limit?: number, @Query('offset') offset?: number) {
    return this.venueService.getAllVenues(filter, limit, offset);
  }

  /** @description 지점 검색 */
  @Get('search')
  async searchVenues(@Query('q') query: string, @Query('location') location?: any, @Query('radius') radius?: number) {
    return this.venueService.searchVenues(query, location, radius);
  }

  /** @description 상태별 지점 조회 */
  @Get('status/:status')
  async getVenuesByStatus(@Param('status') status: string) {
    return this.venueService.getVenuesByStatus(status as any);
  }

  /** @description 특정 좌표 기준 가까운 지점 조회 */
  @Get('nearby')
  async getNearbyVenues(@Query('lat') latitude: number, @Query('lng') longitude: number, @Query('radius') radius: number) {
    return this.venueService.getNearbyVenues(latitude, longitude, radius);
  }

  /** @description 인기 지점 조회 */
  @Get('popular')
  async getPopularVenues(@Query('limit') limit?: number, @Query('period') period?: string) {
    return this.venueService.getPopularVenues(limit, period);
  }

  /** @description 룸 추가 */
  @Post(':venueId/rooms')
  async addRoom(@Param('venueId') venueId: string, @Body() roomData: any) {
    return this.venueService.addRoom(venueId, roomData);
  }

  /** @description 룸 수정 */
  @Put('rooms/:roomId')
  async updateRoom(@Param('roomId') roomId: string, @Body() updateData: any) {
    return this.venueService.updateRoom(roomId, updateData);
  }

  /** @description 룸 삭제 */
  @Delete('rooms/:roomId')
  async removeRoom(@Param('roomId') roomId: string) {
    return this.venueService.removeRoom(roomId);
  }

  /** @description 특정 지점의 룸 조회 */
  @Get(':venueId/rooms')
  async getVenueRooms(@Param('venueId') venueId: string, @Query('status') status?: string) {
    return this.venueService.getVenueRooms(venueId, status as any);
  }

  /** @description 룸 상세 조회 */
  @Get('rooms/:roomId')
  async getRoomById(@Param('roomId') roomId: string) {
    return this.venueService.getRoomById(roomId);
  }

  /** @description 지점 이미지 업로드 */
  @Post(':venueId/images')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadVenueImages(@Param('venueId') venueId: string, @UploadedFiles() images: string[]) {
    return this.venueService.uploadVenueImages(venueId, images);
  }

  /** @description 지점 이미지 삭제 */
  @Delete(':venueId/images/:imageId')
  async deleteVenueImage(@Param('venueId') venueId: string, @Param('imageId') imageId: string) {
    return this.venueService.deleteVenueImage(venueId, imageId);
  }

  /** @description 룸 이미지 업로드 */
  @Post('rooms/:roomId/images')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadRoomImages(@Param('roomId') roomId: string, @UploadedFiles() images: string[]) {
    return this.venueService.uploadRoomImages(roomId, images);
  }

  /** @description 룸 이미지 삭제 */
  @Delete('rooms/:roomId/images/:imageId')
  async deleteRoomImage(@Param('roomId') roomId: string, @Param('imageId') imageId: string) {
    return this.venueService.deleteRoomImage(roomId, imageId);
  }

  /** @description 지점 리뷰 조회 */
  @Get(':venueId/reviews')
  async getVenueReviews(@Param('venueId') venueId: string, @Query('limit') limit?: number, @Query('offset') offset?: number) {
    return this.venueService.getVenueReviews(venueId, limit, offset);
  }

  /** @description 지점 평점 조회 */
  @Get(':venueId/rating')
  async getVenueRating(@Param('venueId') venueId: string) {
    return this.venueService.getVenueRating(venueId);
  }

  /** @description 룸 리뷰 조회 */
  @Get('rooms/:roomId/reviews')
  async getRoomReviews(@Param('roomId') roomId: string, @Query('limit') limit?: number, @Query('offset') offset?: number) {
    return this.venueService.getRoomReviews(roomId, limit, offset);
  }
}
