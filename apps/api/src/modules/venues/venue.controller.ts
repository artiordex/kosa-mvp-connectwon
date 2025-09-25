import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateVenueDto } from './dto/create-venue.dto';
// 장소 생성 DTO
import { VenueDto } from './dto/venue.dto';
import { VenuesService } from './venue.service';

import { CreateVenueDto } from './dto/create-venue.dto';
import { VenueDto } from './dto/venue.dto';
import { VenuesService } from './venue.service';

// 장소 조회 DTO

@Controller('venues')
export class VenuesController {
  constructor(private readonly venuesService: VenuesService) {}

  /**
   * 장소 생성
   * @param {CreateVenueDto} createVenueDto - 장소 생성 데이터
   * @returns {Promise<{ venueId: string }>} - 생성된 장소 ID 반환
   */
  @Post('create')
  async createVenue(@Body() createVenueDto: CreateVenueDto) {
    const venueId = await this.venuesService.createVenue(createVenueDto);
    return { venueId };
  }

  /**
   * 장소 조회
   * @param {string} venueId - 장소 ID
   * @returns {Promise<VenueDto>} - 조회된 장소 정보 반환
   */
  @Get(':venueId')
  async getVenue(@Param('venueId') venueId: string) {
    const venue = await this.venuesService.getVenue(venueId);
    return venue;
  }
}
