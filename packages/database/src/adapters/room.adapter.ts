/**
 * Description : room.adapter.ts - 📌 In-memory Room & RoomReservation Adapter
 * Author : Shiwoo Min
 * Date : 2025-09-30
 */
import type { CursorPaginatedResponse, CursorPaginationQuery, Id } from '@connectwon/core/core-types.js';
import type { CreateRoom, CreateRoomReservation, Room, RoomRepository, RoomReservation, RoomReservationRepository, RoomReservationStatus, RoomStatus, UpdateRoom, UpdateRoomReservation } from '@connectwon/core/ports/room.port.js';
import type { Clock } from '@connectwon/core/ports/time.port.js';

/**
 * @description In-memory Room 저장소
 */
export class RoomMemoryAdapter implements RoomRepository {
  private rooms: Room[] = [];
  private seq = 1;

  constructor(private clock: Clock) {}

  async findById(id: Id): Promise<Room | null> {
    return this.rooms.find(r => r.id === id) ?? null;
  }

  async findByVenueId(venueId: Id, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Room>> {
    const filtered = this.rooms.filter(r => r.venueId === venueId);
    const take = query.limit ?? 10;
    const cursorIndex = query.cursor ? filtered.findIndex(r => r.id === query.cursor) : -1;
    const start = cursorIndex >= 0 ? cursorIndex + 1 : 0;
    const items = filtered.slice(start, start + take + 1);
    const hasNext = items.length > take;
    const data = hasNext ? items.slice(0, -1) : items;
    const nextCursor = hasNext ? (data[data.length - 1]?.id ?? null) : null;
    return { items: data, nextCursor };
  }

  async create(data: CreateRoom): Promise<Room> {
    const now = this.clock.now().toISOString();
    const room: Room = {
      id: String(this.seq++),
      venueId: data.venueId,
      name: data.name,
      ...(data.capacity !== undefined ? { capacity: data.capacity } : {}),
      status: data.status ?? 'ACTIVE',
      createdAt: now,
      updatedAt: now,
    };
    this.rooms.push(room);
    return room;
  }

  async update(id: Id, updates: UpdateRoom): Promise<Room> {
    const idx = this.rooms.findIndex(r => r.id === id);
    if (idx === -1) throw new Error('room_not_found');

    const current = this.rooms[idx]!;
    const now = this.clock.now().toISOString();

    const updated: Room = {
      id: current.id,
      venueId: current.venueId,
      name: updates.name ?? current.name,
      ...(updates.capacity !== undefined ? { capacity: updates.capacity } : current.capacity !== undefined ? { capacity: current.capacity } : {}),
      status: updates.status ?? current.status,
      createdAt: current.createdAt,
      updatedAt: now,
    };

    this.rooms[idx] = updated;
    return updated;
  }

  async delete(id: Id): Promise<void> {
    this.rooms = this.rooms.filter(r => r.id !== id);
  }

  async findByStatus(status: RoomStatus, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Room>> {
    const filtered = this.rooms.filter(r => r.status === status);

    const take = query.limit ?? 10;
    const cursorIndex = query.cursor ? filtered.findIndex(r => r.id === query.cursor) : -1;
    const start = cursorIndex >= 0 ? cursorIndex + 1 : 0;

    const items = filtered.slice(start, start + take + 1);
    const hasNext = items.length > take;
    const data = hasNext ? items.slice(0, -1) : items;
    const nextCursor = hasNext ? (data[data.length - 1]?.id ?? null) : null;

    return { items: data, nextCursor };
  }

  async count(): Promise<number> {
    return this.rooms.length;
  }

  async countByVenue(venueId: Id): Promise<number> {
    return this.rooms.filter(r => r.venueId === venueId).length;
  }

  async exists(id: Id): Promise<boolean> {
    return this.rooms.some(r => r.id === id);
  }

  async existsByName(venueId: Id, name: string): Promise<boolean> {
    return this.rooms.some(r => r.venueId === venueId && r.name === name);
  }
}

/**
 * @description In-memory RoomReservation 저장소
 */
export class RoomReservationMemoryAdapter implements RoomReservationRepository {
  private reservations: RoomReservation[] = [];
  private seq = 1;

  constructor(private clock: Clock) {}

  async findById(id: Id): Promise<RoomReservation | null> {
    return this.reservations.find(r => r.id === id) ?? null;
  }

  async findByRoomId(roomId: Id, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<RoomReservation>> {
    const filtered = this.reservations.filter(r => r.roomId === roomId);

    const take = query.limit ?? 10;
    const cursorIndex = query.cursor ? filtered.findIndex(r => r.id === query.cursor) : -1;
    const start = cursorIndex >= 0 ? cursorIndex + 1 : 0;

    const items = filtered.slice(start, start + take + 1);
    const hasNext = items.length > take;
    const data = hasNext ? items.slice(0, -1) : items;
    const nextCursor = hasNext ? (data[data.length - 1]?.id ?? null) : null;

    return { items: data, nextCursor };
  }

  async findByUserId(userId: Id, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<RoomReservation>> {
    const filtered = this.reservations.filter(r => r.userId === userId);

    const take = query.limit ?? 10;
    const cursorIndex = query.cursor ? filtered.findIndex(r => r.id === query.cursor) : -1;
    const start = cursorIndex >= 0 ? cursorIndex + 1 : 0;

    const items = filtered.slice(start, start + take + 1);
    const hasNext = items.length > take;
    const data = hasNext ? items.slice(0, -1) : items;
    const nextCursor = hasNext ? (data[data.length - 1]?.id ?? null) : null;

    return { items: data, nextCursor };
  }

  async findBySessionId(sessionId: Id): Promise<RoomReservation | null> {
    return this.reservations.find(r => r.sessionId === sessionId) ?? null;
  }

  async create(data: CreateRoomReservation): Promise<RoomReservation> {
    const now = this.clock.now().toISOString();
    const res: RoomReservation = {
      id: String(this.seq++),
      roomId: data.roomId,
      ...(data.userId ? { userId: data.userId } : {}),
      ...(data.sessionId ? { sessionId: data.sessionId } : {}),
      startsAt: data.startsAt,
      endsAt: data.endsAt,
      ...(data.purpose !== undefined ? { purpose: data.purpose } : {}), // ✅ optional 안전 처리
      status: 'PENDING',
      meta: data.meta ?? {},
      createdAt: now,
      updatedAt: now,
    };
    this.reservations.push(res);
    return res;
  }

  async update(id: Id, updates: UpdateRoomReservation): Promise<RoomReservation> {
    const idx = this.reservations.findIndex(r => r.id === id);
    if (idx === -1) throw new Error('reservation_not_found');

    const current = this.reservations[idx]!;
    const now = this.clock.now().toISOString();

    const updated: RoomReservation = {
      id: current.id,
      roomId: current.roomId,
      startsAt: updates.startsAt ?? current.startsAt,
      endsAt: updates.endsAt ?? current.endsAt,
      status: updates.status ?? current.status,
      createdAt: current.createdAt,
      updatedAt: now,
      ...(current.userId ? { userId: current.userId } : {}),
      ...(current.sessionId ? { sessionId: current.sessionId } : {}),
      ...(updates.purpose !== undefined ? { purpose: updates.purpose } : current.purpose ? { purpose: current.purpose } : {}),
      ...(updates.meta !== undefined ? { meta: updates.meta } : current.meta ? { meta: current.meta } : {}),
    };

    this.reservations[idx] = updated;
    return updated;
  }

  async cancel(id: Id): Promise<void> {
    const idx = this.reservations.findIndex(r => r.id === id);
    if (idx === -1) throw new Error('reservation_not_found');

    const reservation = this.reservations[idx];
    if (!reservation) throw new Error('reservation_not_found');

    reservation.status = 'CANCELLED';
    reservation.updatedAt = this.clock.now().toISOString();
  }

  async delete(id: Id): Promise<void> {
    this.reservations = this.reservations.filter(r => r.id !== id);
  }

  async hasConflict(roomId: Id, startsAt: string, endsAt: string): Promise<boolean> {
    return this.reservations.some(r => r.roomId === roomId && !(endsAt <= r.startsAt || startsAt >= r.endsAt));
  }

  async findConflicts(roomId: Id, startsAt: string, endsAt: string): Promise<RoomReservation[]> {
    return this.reservations.filter(r => r.roomId === roomId && !(endsAt <= r.startsAt || startsAt >= r.endsAt));
  }

  async findByStatus(status: RoomReservationStatus, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<RoomReservation>> {
    const filtered = this.reservations.filter(r => r.status === status);

    const take = query.limit ?? 10;
    const cursorIndex = query.cursor ? filtered.findIndex(r => r.id === query.cursor) : -1;
    const start = cursorIndex >= 0 ? cursorIndex + 1 : 0;

    const items = filtered.slice(start, start + take + 1);
    const hasNext = items.length > take;
    const data = hasNext ? items.slice(0, -1) : items;
    const nextCursor = hasNext ? (data[data.length - 1]?.id ?? null) : null;

    return { items: data, nextCursor };
  }

  async count(): Promise<number> {
    return this.reservations.length;
  }

  async countByRoom(roomId: Id): Promise<number> {
    return this.reservations.filter(r => r.roomId === roomId).length;
  }

  async exists(id: Id): Promise<boolean> {
    return this.reservations.some(r => r.id === id);
  }
}
