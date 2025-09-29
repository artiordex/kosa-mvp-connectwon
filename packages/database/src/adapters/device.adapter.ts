import type { CreateDevice, Device, DeviceRepository, DeviceStatus, UpdateDevice } from '@connectwon/core/ports/device.port.js';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const toBigInt = (id: string) => BigInt(id);
const fromBigInt = (id: bigint) => id.toString();

export class PrismaDeviceRepository implements DeviceRepository {
  async findById(id: string): Promise<Device | null> {
    const record = await prisma.device.findUnique({ where: { id: toBigInt(id) } });
    return record ? ({ ...record, id: fromBigInt(record.id) } as any) : null;
  }

  async create(data: CreateDevice): Promise<Device> {
    const record = await prisma.device.create({
      data: {
        name: data.name,
        type: data.type ?? null,
        specs: (data.specs ?? {}) as Prisma.InputJsonValue,
        status: data.status ?? 'AVAILABLE',
      },
    });
    return { ...record, id: fromBigInt(record.id) } as any;
  }


  async update(id: string, updates: UpdateDevice): Promise<Device> {
    const record = await prisma.device.update({
      where: { id: toBigInt(id) },
      data: {
        ...(updates.name && { name: updates.name }),
        ...(updates.type && { type: updates.type }),
        ...(updates.specs && { specs: updates.specs as Prisma.InputJsonValue }),
        ...(updates.status && { status: updates.status }),
      },
    });
    return { ...record, id: fromBigInt(record.id) } as any;
  }

  async delete(id: string): Promise<void> {
    await prisma.device.delete({ where: { id: toBigInt(id) } });
  }

  async exists(id: string): Promise<boolean> {
    return (await prisma.device.count({ where: { id: toBigInt(id) } })) > 0;
  }

  async updateStatus(id: string, status: DeviceStatus): Promise<void> {
    await prisma.device.update({ where: { id: toBigInt(id) }, data: { status } });
  }

  async markInUse(id: string): Promise<void> {
    await this.updateStatus(id, 'IN_USE');
  }
  async markAvailable(id: string): Promise<void> {
    await this.updateStatus(id, 'AVAILABLE');
  }
  async markMaintenance(id: string): Promise<void> {
    await this.updateStatus(id, 'MAINTENANCE');
  }
  async retireDevice(id: string): Promise<void> {
    await this.updateStatus(id, 'RETIRED');
  }

  async count(): Promise<number> {
    return prisma.device.count();
  }

  async countByStatus(status: DeviceStatus): Promise<number> {
    return prisma.device.count({ where: { status } });
  }

  async findMany(): Promise<{ items: Device[]; nextCursor: string | null }> {
    const records = await prisma.device.findMany({ orderBy: { id: 'asc' } });
    return { items: records.map(r => ({ ...r, id: fromBigInt(r.id) }) as any), nextCursor: null };
  }

  async findByStatus(status: DeviceStatus): Promise<{ items: Device[]; nextCursor: string | null }> {
    const records = await prisma.device.findMany({ where: { status }, orderBy: { id: 'asc' } });
    return { items: records.map(r => ({ ...r, id: fromBigInt(r.id) }) as any), nextCursor: null };
  }

  async search(term: string): Promise<{ items: Device[]; nextCursor: string | null }> {
    const records = await prisma.device.findMany({
      where: {
        OR: [{ name: { contains: term } }, { type: { contains: term } }],
      },
    });
    return { items: records.map(r => ({ ...r, id: fromBigInt(r.id) }) as any), nextCursor: null };
  }
}
