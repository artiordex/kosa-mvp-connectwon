import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth.js';
import { prisma } from '../database.js';

const router = Router();

// 세션 목록 조회
router.get('/', async (req, res) => {
  try {
    const { programId, date, available } = req.query;

    const where: any = { isActive: true };

    if (programId) where.programId = programId;
    if (date) {
      const startDate = new Date(date as string);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);

      where.startTime = {
        gte: startDate,
        lt: endDate
      };
    }

    const sessions = await prisma.session.findMany({
      where,
      include: {
        program: { include: { venue: true } },
        _count: { select: { reservations: true } }
      },
      orderBy: { startTime: 'asc' }
    });

    // 예약 가능한 세션만 필터링
    let filteredSessions = sessions;
    if (available === 'true') {
      filteredSessions = sessions.filter(
        session => session._count.reservations < session.maxParticipants
      );
    }

    res.json(filteredSessions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch sessions' });
  }
});

// 세션 생성
router.post('/', authenticateJWT, async (req, res) => {
  try {
    const { programId, startTime, endTime, maxParticipants } = req.body;

    const session = await prisma.session.create({
      data: {
        programId,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        maxParticipants
      },
      include: {
        program: { include: { venue: true } }
      }
    });

    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create session' });
  }
});

export default router;
