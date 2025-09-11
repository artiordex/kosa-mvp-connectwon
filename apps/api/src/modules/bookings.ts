import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth.js';
import { reservationService } from '../services/reservation.js';
import { prisma } from '../database.js';

const router = Router();

// 예약 생성
router.post('/', authenticateJWT, async (req, res) => {
  try {
    const { sessionId, participants } = req.body;
    const userId = (req.user as any).id;

    const reservation = await reservationService.createReservation(
      userId,
      sessionId,
      participants
    );

    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

// 내 예약 목록
router.get('/my', authenticateJWT, async (req, res) => {
  try {
    const userId = (req.user as any).id;
    const { status } = req.query;

    const where: any = { userId };
    if (status) where.status = status;

    const reservations = await prisma.reservation.findMany({
      where,
      include: {
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

// 예약 취소
router.delete('/:id', authenticateJWT, async (req, res) => {
  try {
    const reservationId = req.params.id;
    const userId = (req.user as any).id;

    const reservation = await reservationService.cancelReservation(reservationId, userId);
    res.json(reservation);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

export default router;
