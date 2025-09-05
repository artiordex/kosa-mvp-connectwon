import { z } from 'zod'

export const VenueSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  address: z.string(),
  amenities: z.array(z.string()),
  operatingHours: z.object({
    open: z.string(),
    close: z.string(),
  }),
  imageUrl: z.string().nullable(),
  managerId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const CreateVenueSchema = z.object({
  name: z.string().min(1, '지점명을 입력해주세요'),
  description: z.string().optional(),
  address: z.string().min(1, '주소를 입력해주세요'),
  amenities: z.array(z.string()).optional(),
  operatingHours: z.object({
    open: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, '올바른 시간 형식이 아닙니다'),
    close: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, '올바른 시간 형식이 아닙니다'),
  }),
  imageUrl: z.string().url().optional(),
})

export const RoomSchema = z.object({
  id: z.string(),
  name: z.string(),
  venueId: z.string(),
  capacity: z.number(),
  hourlyRate: z.number(),
  equipment: z.array(z.string()),
  imageUrls: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const CreateRoomSchema = z.object({
  name: z.string().min(1, '방 이름을 입력해주세요'),
  capacity: z.number().min(1, '수용 인원은 1명 이상이어야 합니다'),
  hourlyRate: z.number().min(0, '시간당 요금은 0원 이상이어야 합니다'),
  equipment: z.array(z.string()).optional(),
  imageUrls: z.array(z.string().url()).optional(),
})
