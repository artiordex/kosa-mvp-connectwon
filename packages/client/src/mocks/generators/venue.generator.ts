/**
 * Description: venue.generator.ts - 📌 장소/회의실 데이터 생성기
 * Author: Shiwoo Min
 * Date: 2025-10-09
 */
import { faker } from '@faker-js/faker/locale/ko';
import type {
  Venue,
  VenueStatus,
  Room,
  RoomType,
  RoomStatus,
} from '../../mock-types.js';

// Venue 생성 함수
export function generateVenue(override: Partial<Venue> = {}): Venue {
  const name = faker.helpers.arrayElement(['강남 HUB', '마포 Campus', '광명 Center']);
  const slug = faker.helpers.slugify(name).toLowerCase();
  const status: VenueStatus = faker.helpers.arrayElement(['active', 'maintenance']);

  return {
    id: faker.string.uuid(),
    name,
    slug,
    description: faker.lorem.paragraphs(2),
    address: faker.location.streetAddress(),
    capacity: faker.number.int({ min: 50, max: 300 }),
    roomCount: faker.number.int({ min: 5, max: 20 }),
    rating: faker.number.float({ min: 3.5, max: 5.0, fractionDigits: 1 }),
    reviewCount: faker.number.int({ min: 10, max: 500 }),
    status,
    featured: Math.random() > 0.7,
    tags: faker.helpers.arrayElements(['스타트업', '교육', '세미나', '네트워킹'], { min: 2, max: 4 }),
    thumbnail: faker.image.url(),
    createdAt: faker.date.past({ years: 2 }).toISOString(),
    updatedAt: faker.date.recent({ days: 30 }).toISOString(),
    ...override,
  };
}

// Room 생성 함수
export function generateRoom(override: Partial<Room> = {}): Room {
  const venueNames = ['강남 HUB', '마포 Campus', '광명 Center'];
  const venueName = faker.helpers.arrayElement(venueNames);
  const roomName = `회의실 ${faker.helpers.arrayElement(['A', 'B', 'C', 'D', 'E'])}`;

  const type: RoomType = faker.helpers.arrayElement([
    'meeting',
    'conference',
    'seminar',
    'workshop',
    'studio',
  ]);

  const status: RoomStatus = faker.helpers.arrayElement([
    'active',
    'inactive',
    'maintenance',
  ]);

  return {
    id: faker.string.uuid(),
    venueId: faker.number.int({ min: 1, max: 10 }),
    venueName,
    name: roomName,
    type,
    capacity: faker.number.int({ min: 4, max: 50 }),
    status,
    pricePerHour: faker.number.int({ min: 20000, max: 100000 }),
    rating: faker.number.float({ min: 3.5, max: 5.0, fractionDigits: 1 }),
    createdAt: faker.date.past({ years: 2 }).toISOString(),
    updatedAt: faker.date.recent({ days: 30 }).toISOString(),
    ...override,
  };
}

// 다중 Venue 생성
export function generateVenueList(count = 10): Venue[] {
  return Array.from({ length: count }, () => generateVenue());
}

// 다중 Room 생성
export function generateRoomList(count = 10): Room[] {
  return Array.from({ length: count }, () => generateRoom());
}

// 특정 Venue의 Room들 생성
export function generateVenueRooms(venueId: number, venueName: string, count = 5): Room[] {
  return Array.from({ length: count }, () => generateRoom({ venueId, venueName }));
}
