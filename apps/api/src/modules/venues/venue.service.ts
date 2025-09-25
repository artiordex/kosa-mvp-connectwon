3. venues/venue.service.ts (Venues 서비스)
import { Injectable } from '@nestjs/common';
import { VenuesProcessor } from './venue.processor'; // 장소 처리 프로세서
import { CreateVenueDto } from './dto/create-venue.dto'; // 장소 생성 DTO
import { VenueDto } from './dto/venue.dto'; // 장소 조회 DTO

@Injectable()
export class VenuesService {
  constructor(private readonly venuesProcessor: VenuesProcessor) {}

  /**
   * 새로운 장소를 생성합니다.
   * @param {CreateVenueDto} createVenueDto - 장소 생성 데이터
   * @returns {Promise<string>} - 생성된 장소 ID
   */
  async createVenue(createVenueDto: CreateVenueDto): Promise<string> {
    const venueId = await this.venuesProcessor.processVenueCreation(createVenueDto);
    return venueId;
  }

  /**
   * 장소 ID로 장소를 조회합니다.
   * @param {string} venueId - 장소 ID
   * @returns {Promise<VenueDto>} - 조회된 장소 정보
   */
  async getVenue(venueId: string): Promise<VenueDto> {
    const venue = await this.venuesProcessor.getVenueDetails(venueId);
    return venue;
  }
}
