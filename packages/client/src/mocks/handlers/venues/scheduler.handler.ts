/**
 * Description : scheduler.handler.ts - 📌 스케줄(예약/대여 통합) 핸들러
 * Author : Shiwoo Min
 * Date : 2025-10-09
 */
import { faker } from '@faker-js/faker/locale/ko';
import type {
  SchedulerEvent,
  SchedulerStatus,
  Reservation,
  EquipmentRental,
} from '../../../mock-types.js';

/**
 * Reservation + EquipmentRental → SchedulerEvent[] 변환
 * (DB 없이 독립적으로 mock-data에서 호출)
 */
export function generateSchedulerEvents(
  reservations: Reservation[],
  equipmentRentals: EquipmentRental[],
): SchedulerEvent[] {
  const events: SchedulerEvent[] = [];

  // 예약 기반 스케줄 생성
  for (const res of reservations) {
    events.push({
      id: `res-${res.id}`,
      venueId: faker.number.int({ min: 1, max: 3 }),
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
    });
  }

  // 장비 대여 기반 스케줄 생성
  for (const rent of equipmentRentals) {
    events.push({
      id: `rent-${rent.id}`,
      venueId: faker.number.int({ min: 1, max: 3 }),
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
    });
  }

  // 시간 순 정렬
  return events.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
}

/**
 * 예약 상태 → 스케줄러 상태 매핑
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
 * 장비 대여 상태 → 스케줄러 상태 매핑
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
    confirmed: '#1E88E5',
    pending: '#FFB300',
    in_use: '#43A047',
    completed: '#6D4C41',
    cancelled: '#E53935',
  };
  return map[status] ?? '#9E9E9E';
}
