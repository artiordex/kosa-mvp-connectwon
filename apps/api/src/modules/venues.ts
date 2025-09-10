import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth.js';
import { prisma } from '../database.js';

const router = Router();

// 장소 목록 조회
router.get('/', async (req, res) => {
  try {
    const venues = await prisma.venue.findMany({
      where: { isActive: true },
      include: { _count: { select: { programs: true } } }
    });
    res.json(venues);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch venues' });
  }
});

// 장소 상세 조회
router.get('/:id', async (req, res) => {
  try {
    const venue = await prisma.venue.findUnique({
      where: { id: req.params.id },
      include: {
        programs: {
          where: { isActive: true },
          include: { sessions: true }
        }
      }
    });

    if (!venue) {
      return res.status(404).json({ message: 'Venue not found' });
    }

    res.json(venue);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch venue' });
  }
});

// 장소 생성 (관리자)
router.post('/', authenticateJWT, async (req, res) => {
  try {
    const { name, description, address, capacity, amenities } = req.body;

    const venue = await prisma.venue.create({
      data: {
        name,
        description,
        address,
        capacity,
        amenities
      }
    });

    res.status(201).json(venue);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create venue' });
  }
});

export default router;
