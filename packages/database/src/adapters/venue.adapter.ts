/**
 * Description : venue.adapter.ts - 📌 In-memory 장소 저장소 어댑터
 * Author : Shiwoo Min
 * Date : 2025-09-30
 */
import type { CursorPaginatedResponse, CursorPaginationQuery, Id, ISODateTime } from '@connectwon/core/core-types.js';
import type { CreateVenue, UpdateVenue, Venue, VenueRepository } from '@connectwon/core/ports/venue.port.js';

function nowISO(): ISODateTime {
  return new Date().toISOString();
}

export class VenueMemoryAdapter implements VenueRepository {
  private venues: Venue[] = [];
  private seq = 1;

  constructor(seed?: Venue[]) {
    if (seed) {
      this.venues = seed;
      this.seq = seed.length + 1;
    }
  }

  async findById(id: Id): Promise<Venue | null> {
    return this.venues.find(v => v.id === id) ?? null;
  }

  async findByName(name: string): Promise<Venue | null> {
    return this.venues.find(v => v.name === name) ?? null;
  }

  async create(data: CreateVenue): Promise<Venue> {
    const venue: Venue = {
      id: String(this.seq++),
      name: data.name,
      createdAt: nowISO(),
      updatedAt: nowISO(),
      ...(data.address ? { address: data.address } : {}),
      ...(data.openingHours ? { openingHours: data.openingHours } : {}),
      ...(data.blackoutRules ? { blackoutRules: data.blackoutRules } : {}),
    };
    this.venues.push(venue);
    return venue;
  }

  async update(id: Id, updates: UpdateVenue): Promise<Venue> {
    const idx = this.venues.findIndex(v => v.id === id);
    if (idx === -1) throw new Error('venue_not_found');
    const current = this.venues[idx]!;
    const updated: Venue = {
      id: current.id,
      name: updates.name ?? current.name,
      createdAt: current.createdAt,
      updatedAt: nowISO(),
      ...(updates.address !== undefined ? { address: updates.address } : current.address !== undefined ? { address: current.address } : {}),
      ...(updates.openingHours !== undefined
        ? { openingHours: updates.openingHours }
        : current.openingHours !== undefined
          ? { openingHours: current.openingHours }
          : {}),
      ...(updates.blackoutRules !== undefined
        ? { blackoutRules: updates.blackoutRules }
        : current.blackoutRules !== undefined
          ? { blackoutRules: current.blackoutRules }
          : {}),
    };

    this.venues[idx] = updated;
    return updated;
  }

  async delete(id: Id): Promise<void> {
    this.venues = this.venues.filter(v => v.id !== id);
  }

  async findMany(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Venue>> {
    const take = query.limit ?? 10;
    const startIndex = query.cursor ? this.venues.findIndex(v => v.id === query.cursor) + 1 : 0;

    const slice = this.venues.slice(startIndex, startIndex + take + 1);
    const hasNext = slice.length > take;
    const items = hasNext ? slice.slice(0, -1) : slice;
    const nextCursor = hasNext ? (items.at(-1)?.id ?? null) : null;

    return { items, nextCursor };
  }

  async searchByName(term: string, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Venue>> {
    const filtered = this.venues.filter(v => v.name.toLowerCase().includes(term.toLowerCase()));

    const take = query.limit ?? 10;
    const startIndex = query.cursor ? filtered.findIndex(v => v.id === query.cursor) + 1 : 0;

    const slice = filtered.slice(startIndex, startIndex + take + 1);
    const hasNext = slice.length > take;
    const items = hasNext ? slice.slice(0, -1) : slice;
    const nextCursor = hasNext ? (items.at(-1)?.id ?? null) : null;

    return { items, nextCursor };
  }
}
