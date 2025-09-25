import { Injectable } from '@nestjs/common';

// 예약 처리 프로세서
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationStatusDto } from './dto/reservation-status.dto';
import { ReservationProcessor } from './reservation.processor';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationStatusDto } from './dto/reservation-status.dto';
import { ReservationProcessor } from './reservation.processor';

@Injectable()
export class ReservationService {
  constructor(private readonly reservationProcessor: ReservationProcessor) {}

  /**
   * 새로운 예약을 생성합니다.
   * @param {CreateReservationDto} createReservationDto - 예약 생성 데이터
   * @returns {Promise<string>} - 생성된 예약 ID
   */
  async createReservation(createReservationDto: CreateReservationDto): Promise<string> {
    const reservationId = await this.reservationProcessor.processReservation(createReservationDto);
    return reservationId;
  }

  /**
   * 예약 상태를 조회합니다.
   * @param {string} reservationId - 예약 ID
   * @returns {Promise<ReservationStatusDto>} - 예약 상태 정보
   */
  async getReservationStatus(reservationId: string): Promise<ReservationStatusDto> {
    const status = await this.reservationProcessor.getReservationStatus(reservationId);
    return status;
  }
}
