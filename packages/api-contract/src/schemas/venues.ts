/**
 * Description : venues.ts - 📌 장소/방 스키마 (Zod 기반, DTO 대체)
 * Author : Shiwoo Min
 * Date : 2025-09-16
 */
import { z } from 'zod';

// Enums
export const RoomStatus = z.enum(['ACTIVE', 'INACTIVE', 'MAINTENANCE']);
export const DayOfWeek = z.enum([
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]);

export type RoomStatus = z.infer<typeof RoomStatus>;
export type DayOfWeek = z.infer<typeof DayOfWeek>;

// Base Schemas
export const OpeningHoursSchema = z.record(
  DayOfWeek,
  z.union([
    z.object({
      open: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
      close: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    }),
    z.object({
      closed: z.literal(true),
    }),
  ]),
);

export const BlackoutRulesSchema = z.object({
  holidays: z.array(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).optional(), // YYYY-MM-DD
  maintenance_days: z.array(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).optional(),
  special_events: z
    .array(
      z.object({
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        reason: z.string(),
      }),
    )
    .optional(),
});

export const VenueSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  address: z.string().nullable(),
  opening_hours: OpeningHoursSchema.nullable(),
  blackout_rules: BlackoutRulesSchema.nullable(),
  image_url: z.string().url().nullable(),
  manager_id: z.string().nullable(),
  created_at: z.date(),
  updated_at: z.date(),
});

export const RoomSchema = z.object({
  id: z.string(),
  venue_id: z.string(),
  name: z.string(),
  capacity: z.number().min(1).nullable(),
  hourly_rate: z.number().min(0).nullable(),
  status: RoomStatus.default('ACTIVE'),
  amenities: z.record(z.unknown()).nullable(), // equipment, facilities, etc.
  image_urls: z.array(z.string().url()).nullable(),
  created_at: z.date(),
  updated_at: z.date(),
});

// CRUD Schemas
export const CreateVenueSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  address: z.string().optional(),
  opening_hours: OpeningHoursSchema.optional(),
  blackout_rules: BlackoutRulesSchema.optional(),
  image_url: z.string().url().optional(),
});

export const UpdateVenueSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  address: z.string().optional(),
  opening_hours: OpeningHoursSchema.optional(),
  blackout_rules: BlackoutRulesSchema.optional(),
  image_url: z.string().url().optional(),
});

export const CreateRoomSchema = z.object({
  venue_id: z.string(),
  name: z.string().min(1),
  capacity: z.number().min(1).optional(),
  hourly_rate: z.number().min(0).optional(),
  status: RoomStatus.optional(),
  amenities: z.record(z.unknown()).optional(),
  image_urls: z.array(z.string().url()).optional(),
});

export const UpdateRoomSchema = z.object({
  name: z.string().min(1).optional(),
  capacity: z.number().min(1).optional(),
  hourly_rate: z.number().min(0).optional(),
  status: RoomStatus.optional(),
  amenities: z.record(z.unknown()).optional(),
  image_urls: z.array(z.string().url()).optional(),
});

// Query Schemas
export const VenueQuerySchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  region: z.string().optional(),
  min_rooms: z.coerce.number().int().min(1).optional(),
  min_total_capacity: z.coerce.number().int().min(1).optional(),
  required_amenities: z.array(z.string()).optional(),
  currently_open: z.boolean().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const RoomQuerySchema = z.object({
  venue_id: z.string().optional(),
  name: z.string().optional(),
  status: RoomStatus.optional(),
  min_capacity: z.coerce.number().int().min(1).optional(),
  max_capacity: z.coerce.number().int().min(1).optional(),
  required_equipment: z.array(z.string()).optional(),
  max_hourly_rate: z.coerce.number().min(0).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

// Operating Hours Schemas
export const CheckVenueOperatingHoursSchema = z.object({
  venue_id: z.string(),
  datetime: z.string().datetime(),
});

export const OperatingHoursResponseSchema = z.object({
  is_open: z.boolean(),
  open_time: z.string().optional(),
  close_time: z.string().optional(),
  message: z.string(),
  date: z.string(),
  day_of_week: DayOfWeek,
});

export const UpdateOperatingHoursSchema = z.object({
  day: DayOfWeek,
  open_time: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .optional(),
  close_time: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .optional(),
  is_closed: z.boolean().optional(),
});

// Response Schemas
export const PaginationSchema = z.object({
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
  pages: z.number().int().min(0),
});

export const VenueListResponseSchema = z.object({
  venues: z.array(VenueSchema),
  pagination: PaginationSchema,
});

export const RoomListResponseSchema = z.object({
  rooms: z.array(RoomSchema),
  pagination: PaginationSchema,
});

// Extended Response Schemas
export const VenueWithRoomsSchema = VenueSchema.extend({
  rooms: z.array(RoomSchema),
  total_rooms: z.number().int().min(0),
  active_rooms: z.number().int().min(0),
  total_capacity: z.number().int().min(0),
});

export const RoomWithVenueSchema = RoomSchema.extend({
  venue: z.object({
    id: z.string(),
    name: z.string(),
    address: z.string().nullable(),
    opening_hours: OpeningHoursSchema.nullable(),
  }),
});

// Stats Schemas
export const VenueStatsSchema = z.object({
  venue_id: z.string(),
  period: z.string(), // YYYY-MM
  total_rooms: z.number().int().min(0),
  total_capacity: z.number().int().min(0),
  total_reservations: z.number().int().min(0),
  confirmed_reservations: z.number().int().min(0),
  occupancy_rate: z.number().min(0).max(100),
  total_hours_used: z.number().min(0),
  total_revenue: z.number().min(0),
  room_usage: z.array(
    z.object({
      room_id: z.string(),
      room_name: z.string(),
      reservations: z.number().int().min(0),
      occupancy_rate: z.number().min(0).max(100),
    }),
  ),
});

export const RoomStatsSchema = z.object({
  room_id: z.string(),
  period: z.string(),
  total_reservations: z.number().int().min(0),
  confirmed_reservations: z.number().int().min(0),
  cancelled_reservations: z.number().int().min(0),
  occupancy_rate: z.number().min(0).max(100),
  total_hours_used: z.number().min(0),
  average_duration: z.number().min(0),
  revenue: z.number().min(0),
  average_rating: z.number().min(0).max(5).optional(),
});

// Type Exports
export type Venue = z.infer<typeof VenueSchema>;
export type Room = z.infer<typeof RoomSchema>;
export type OpeningHours = z.infer<typeof OpeningHoursSchema>;
export type BlackoutRules = z.infer<typeof BlackoutRulesSchema>;
export type CreateVenue = z.infer<typeof CreateVenueSchema>;
export type UpdateVenue = z.infer<typeof UpdateVenueSchema>;
export type CreateRoom = z.infer<typeof CreateRoomSchema>;
export type UpdateRoom = z.infer<typeof UpdateRoomSchema>;
export type VenueQuery = z.infer<typeof VenueQuerySchema>;
export type RoomQuery = z.infer<typeof RoomQuerySchema>;
export type CheckVenueOperatingHours = z.infer<typeof CheckVenueOperatingHoursSchema>;
export type OperatingHoursResponse = z.infer<typeof OperatingHoursResponseSchema>;
export type UpdateOperatingHours = z.infer<typeof UpdateOperatingHoursSchema>;
export type VenueListResponse = z.infer<typeof VenueListResponseSchema>;
export type RoomListResponse = z.infer<typeof RoomListResponseSchema>;
export type VenueWithRooms = z.infer<typeof VenueWithRoomsSchema>;
export type RoomWithVenue = z.infer<typeof RoomWithVenueSchema>;
export type VenueStats = z.infer<typeof VenueStatsSchema>;
export type RoomStats = z.infer<typeof RoomStatsSchema>;
export type Pagination = z.infer<typeof PaginationSchema>;

// Helper Functions
export function isVenueOpen(venue: Venue, datetime: Date): boolean {
  if (!venue.opening_hours) return true;

  const dayNames: DayOfWeek[] = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];
  const dayIndex = datetime.getDay();
  const dayName = dayNames[dayIndex];

  if (!dayName) return false; // 안전 가드

  const dayHours = venue.opening_hours[dayName];

  if (!dayHours || 'closed' in dayHours) return false;

  const currentTime = datetime.toTimeString().substring(0, 5); // HH:mm
  return currentTime >= dayHours.open && currentTime <= dayHours.close;
}

export function isRoomAvailable(room: Room): boolean {
  return room.status === 'ACTIVE';
}

export function calculateRoomRevenue(room: Room, hoursUsed: number): number {
  return (room.hourly_rate || 0) * hoursUsed;
}

export function getRoomEquipment(room: Room): string[] {
  if (!room.amenities || typeof room.amenities !== 'object') return [];
  return (room.amenities['equipment'] as string[]) || [];
}

export function formatOperatingHours(hours: OpeningHours[DayOfWeek]): string {
  if (!hours || 'closed' in hours) return '휴무';
  return `${hours.open} - ${hours.close}`;
}

export function isBlackoutDate(venue: Venue, date: string): boolean {
  if (!venue.blackout_rules) return false;

  const { holidays, maintenance_days, special_events } = venue.blackout_rules;

  return !!(
    holidays?.includes(date) ||
    maintenance_days?.includes(date) ||
    special_events?.some(event => event.date === date)
  );
}

// Validation Helpers
export function validateCreateVenue(data: unknown) {
  return CreateVenueSchema.safeParse(data);
}

export function validateCreateRoom(data: unknown) {
  return CreateRoomSchema.safeParse(data);
}

export function validateVenueQuery(data: unknown) {
  return VenueQuerySchema.safeParse(data);
}

export function validateRoomQuery(data: unknown) {
  return RoomQuerySchema.safeParse(data);
}

// Constants
export const DEFAULT_OPENING_HOURS: OpeningHours = {
  monday: { open: '09:00', close: '18:00' },
  tuesday: { open: '09:00', close: '18:00' },
  wednesday: { open: '09:00', close: '18:00' },
  thursday: { open: '09:00', close: '18:00' },
  friday: { open: '09:00', close: '18:00' },
  saturday: { open: '10:00', close: '16:00' },
  sunday: { closed: true },
};

export const DEFAULT_ROOM_AMENITIES = {
  equipment: ['Wi-Fi'],
  facilities: ['에어컨', '난방'],
  accessibility: [],
  special_notes: '',
};
