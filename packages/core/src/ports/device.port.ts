/**
 * Description : device.port.ts - 📌 장비/대여 관리 포트 인터페이스
 * Author : Shiwoo Min
 * Date : 2025-09-30
 */
import type { CursorPaginatedResponse, CursorPaginationQuery, Id, ISODateTime, JsonObject } from '../core-types.js';

/**
 * @description 장비 상태
 */
export type DeviceStatus = 'AVAILABLE' | 'IN_USE' | 'MAINTENANCE' | 'RETIRED';

/**
 * @description 장비 엔터티
 */
export interface Device {
  id: Id;
  name: string;
  type?: string;
  specs: JsonObject;
  status: DeviceStatus;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

/**
 * @description 장비 생성 입력
 */
export interface CreateDevice {
  name: string;
  type?: string;
  specs?: JsonObject;
  status?: DeviceStatus;
}

/**
 * @description 장비 수정 입력
 */
export interface UpdateDevice {
  name?: string;
  type?: string;
  specs?: JsonObject;
  status?: DeviceStatus;
}

/**
 * @description 장비 대여 상태
 */
export type DeviceRentalStatus = 'PENDING' | 'APPROVED' | 'RETURNED' | 'CANCELLED';

/**
 * @description 장비 대여 엔터티
 */
export interface DeviceRental {
  id: Id;
  deviceId: Id;
  userId: Id;
  startsAt: ISODateTime;
  endsAt: ISODateTime;
  status: DeviceRentalStatus;
  meta: JsonObject;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

/**
 * @description 장비 대여 생성 입력
 */
export interface CreateDeviceRental {
  deviceId: Id;
  userId: Id;
  startsAt: ISODateTime;
  endsAt: ISODateTime;
  status?: DeviceRentalStatus;
  meta?: JsonObject;
}

/**
 * @description 장비 대여 수정 입력
 */
export interface UpdateDeviceRental {
  startsAt?: ISODateTime;
  endsAt?: ISODateTime;
  status?: DeviceRentalStatus;
  meta?: JsonObject;
}

/**
 * @description 장비 저장소 포트
 */
export interface DeviceRepository {
  findById(id: Id): Promise<Device | null>;
  create(data: CreateDevice): Promise<Device>;
  update(id: Id, updates: UpdateDevice): Promise<Device>;
  delete(id: Id): Promise<void>;

  findMany(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Device>>;
  search(term: string, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Device>>;
  findByStatus(status: DeviceStatus, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Device>>;

  count(): Promise<number>;
  countByStatus(status: DeviceStatus): Promise<number>;
  exists(id: Id): Promise<boolean>;

  updateStatus(id: Id, status: DeviceStatus): Promise<void>;
  markInUse(id: Id): Promise<void>;
  markAvailable(id: Id): Promise<void>;
  markMaintenance(id: Id): Promise<void>;
  retireDevice(id: Id): Promise<void>;
}

/**
 * @description 장비 대여 저장소 포트
 */
export interface DeviceRentalRepository {
  findById(id: Id): Promise<DeviceRental | null>;
  create(data: CreateDeviceRental): Promise<DeviceRental>;
  update(id: Id, updates: UpdateDeviceRental): Promise<DeviceRental>;
  delete(id: Id): Promise<void>;

  findMany(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<DeviceRental>>;
  findByDeviceId(deviceId: Id, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<DeviceRental>>;
  findByUserId(userId: Id, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<DeviceRental>>;
  findByStatus(status: DeviceRentalStatus, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<DeviceRental>>;

  /** 대여 가능 여부 확인 (겹치는 예약 방지) */
  checkAvailability(deviceId: Id, startsAt: ISODateTime, endsAt: ISODateTime): Promise<boolean>;

  count(): Promise<number>;
  countByDevice(deviceId: Id): Promise<number>;
  countByUser(userId: Id): Promise<number>;
  countByStatus(status: DeviceRentalStatus): Promise<number>;
}
