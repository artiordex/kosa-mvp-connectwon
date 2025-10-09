/**
 * Description : scheduler.generator.ts - 📅 스케줄(예약/대여) 데이터 생성기
 * Author : Shiwoo Min
 * Date : 2025-10-09
 *
 * 역할:
 * - reservations.json + equipmentRentals.json → SchedulerEvent[] 변환
 * - 리소스 타입(room/equipment/program) 기반 병합
 */

import { faker } from '@faker-js/faker/locale/ko';
import type {
  Reservation,
  EquipmentRental,
  SchedulerEvent,
  SchedulerStatus,
} from '../../mock-types.js';

/**
 * 예약 + 대여 → 스케줄 이벤트 병합
 */
export function generateSchedulerEvents(
  reservations: Reservation[],
  equipmentRentals: EquipmentRental[],
): SchedulerEvent[] {
  const events: SchedulerEvent[] = [];

  // 프로그램/룸 예약 기반 스케줄 생성
  for (const res of reservations) {
    const event: SchedulerEvent = {
      id: `res-${res.id}`,
      venueId: faker.number.int({ min: 1, max: 3 }), // 가상 venueId (mock)
      resourceType: 'program',
      resourceId: res.programId,
      resourceName: res.programSnapshot.title,
      title: `${res.userName} - ${res.programSnapshot.title}`,
      start: res.reservedAt,
      end: res.cancelledAt
        ? res.cancelledAt
        : faker.date.soon({ days: 3, refDate: res.reservedAt }).toISOString(),
      status: mapReservationStatusToScheduler(res.status),
      color: getStatusColor(mapReservationStatusToScheduler(res.status)),
      description: res.programSnapshot.description,
      relatedReservationId: res.id,
      relatedProgramId: res.programId,
      createdAt: res.reservedAt,
      updatedAt: res.cancelledAt ?? res.attendedAt ?? res.reservedAt,
    };
    events.push(event);
  }

  // 장비 대여 기반 스케줄 생성
  for (const rent of equipmentRentals) {
    const event: SchedulerEvent = {
      id: `rent-${rent.id}`,
      venueId: faker.number.int({ min: 1, max: 3 }), // 가상 venueId (mock)
      resourceType: 'equipment',
      resourceId: rent.equipmentId,
      resourceName: rent.equipmentName,
      title: `${rent.userName} - ${rent.equipmentName}`,
      start: rent.startsAt,
      end: rent.endsAt,
      status: mapRentalStatusToScheduler(rent.status),
      color: getStatusColor(mapRentalStatusToScheduler(rent.status)),
      description: rent.purpose ?? '장비 대여 일정',
      relatedRentalId: rent.id,
      createdAt: rent.createdAt,
      updatedAt: rent.updatedAt,
    };
    events.push(event);
  }

  // 정렬 (시작 시간 기준)
  return events.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
}

/**
 * Reservation → SchedulerStatus 매핑
 */
function mapReservationStatusToScheduler(status: Reservation['status']): SchedulerStatus {
  switch (status) {
    case 'reserved':
    case 'confirmed':
      return 'confirmed';
    case 'attended':
      return 'in_use';
    case 'cancelled':
      return 'cancelled';
    case 'refunded':
      return 'completed';
    default:
      return 'pending';
  }
}

/**
 * EquipmentRental → SchedulerStatus 매핑
 */
function mapRentalStatusToScheduler(status: EquipmentRental['status']): SchedulerStatus {
  switch (status) {
    case 'APPROVED':
    case 'IN_USE':
      return 'in_use';
    case 'RETURNED':
      return 'completed';
    case 'PENDING':
      return 'pending';
    case 'CANCELLED':
      return 'cancelled';
    case 'OVERDUE':
      return 'confirmed';
    default:
      return 'pending';
  }
}

/**
 * 스케줄 상태별 색상 매핑
 */
function getStatusColor(status: SchedulerStatus): string {
  const map: Record<SchedulerStatus, string> = {
    confirmed: '#1E88E5', // 파랑
    pending: '#FFB300',   // 노랑
    in_use: '#43A047',    // 초록
    completed: '#6D4C41', // 브라운
    cancelled: '#E53935', // 빨강
  };
  return map[status] ?? '#9E9E9E';
}
