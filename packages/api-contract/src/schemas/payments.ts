import { z } from 'zod'

export const PaymentSchema = z.object({
  id: z.string(),
  userId: z.string(),
  amount: z.number(),
  currency: z.string(),
  type: z.enum(['MEMBERSHIP', 'SESSION', 'EQUIPMENT']),
  status: z.enum(['PENDING', 'COMPLETED', 'FAILED', 'CANCELLED', 'REFUNDED']),
  stripePaymentIntentId: z.string().nullable(),
  itemId: z.string(),
  metadata: z.record(z.string()).nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const CreatePaymentSchema = z.object({
  amount: z.number().min(100, '결제 금액은 100원 이상이어야 합니다'),
  currency: z.string().default('krw'),
  type: z.enum(['MEMBERSHIP', 'SESSION', 'EQUIPMENT']),
  itemId: z.string().min(1, '결제 대상을 선택해주세요'),
})

export const PaymentIntentResponseSchema = z.object({
  clientSecret: z.string(),
  paymentId: z.string(),
})
