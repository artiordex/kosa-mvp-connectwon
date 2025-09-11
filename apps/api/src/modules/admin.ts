import { Router } from 'express';
import { authenticateJWT, requireAdmin } from '../middleware/auth.js';
import { prisma } from '../database.js';

const router = Router();

// 관리자 전용 미들웨어 적용
router.use(authenticateJWT, requireAdmin);

// 대시보드 통계
router.get('/dashboard', async (req, res) => {
  try {
    const [
      totalUsers,
      totalPrograms,
      totalReservations,
      totalRevenue: totalRevenue._sum.amount || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch dashboard data' });
  }
});

// 사용자 관리
router.get('/users', async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const where: any = {};
    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } }
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip: offset,
        take: Number(limit),
        include: {
          _count: { select: { reservations: true } }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.user.count({ where })
    ]);

    res.json({
      users,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// 예약 관리
router.get('/reservations', async (req, res) => {
  try {
    const { status, date, programId } = req.query;

    const where: any = {};
    if (status) where.status = status;
    if (programId) where.session = { programId };
    if (date) {
      const startDate = new Date(date as string);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);

      where.session = {
        ...where.session,
        startTime: { gte: startDate, lt: endDate }
      };
    }

    const reservations = await prisma.reservation.findMany({
      where,
      include: {
        user: { select: { id: true, email: true, name: true } },
        session: {
          include: {
            program: { include: { venue: true } }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reservations' });
  }
});

export default router;
