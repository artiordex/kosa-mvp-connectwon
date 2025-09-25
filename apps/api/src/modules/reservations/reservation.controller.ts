import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateReservationDto } from './dto/create-reservation.dto';
// 예약 생성 DTO
import { ReservationStatusDto } from './dto/reservation-status.dto';
import { ReservationService } from './reservation.service';

import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationStatusDto } from './dto/reservation-status.dto';
import { ReservationService } from './reservation.service';

// 예약 상태 DTO

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  /**
   * 예약 생성
   * @param {CreateReservationDto} createReservationDto - 예약 생성 데이터
   * @returns {Promise<{ reservationId: string }>} - 생성된 예약 ID 반환
   */
  @Post('create')
  async createReservation(@Body() createReservationDto: CreateReservationDto) {
    const reservationId = await this.reservationService.createReservation(createReservationDto);
    return { reservationId };
  }

  /**
   * 예약 상태 조회
   * @param {string} reservationId - 예약 ID
   * @returns {Promise<ReservationStatusDto>} - 예약 상태 반환
   */
  @Get('status/:reservationId')
  async getReservationStatus(@Param('reservationId') reservationId: string) {
    const status = await this.reservationService.getReservationStatus(reservationId);
    return { status };
  }
}
