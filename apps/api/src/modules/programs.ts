import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth.js';
import { prisma } from '../database.js';

const router = Router();

// 프로그램 목록 조회
router.get('/', async (req, res) => {
  try {
    const { venueId, category, search } = req.query;

    const where: any = { isActive: true };

    if (venueId) where.venueId = venueId;
    if (category) where.category = category;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    const programs = await prisma.program.findMany({
      where,
      include: {
        venue: true,
        sessions: {
          where: { isActive: true },
          orderBy: { startTime: 'asc' }
        },
        _count: { select: { reservations: true } }
      }
    });

    res.json(programs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch programs' });
  }
});

// 프로그램 상세 조회
router.get('/:id', async (req, res) => {
  try {
    const program = await prisma.program.findUnique({
      where: { id: req.params.id },
      include: {
        venue: true,
        sessions: {
          where: { isActive: true },
          orderBy: { startTime: 'asc' },
          include: {
            _count: { select: { reservations: true } }
          }
        }
      }
    });

    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }

    res.json(program);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch program' });
  }
});

// 프로그램 생성
router.post('/', authenticateJWT, async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      venueId,
      instructorName,
      price,
      maxParticipants,
      imageUrl
    } = req.body;

    const program = await prisma.program.create({
      data: {
        title,
        description,
        category,
        venueId,
        instructorName,
        price,
        maxParticipants,
        imageUrl
      },
      include: { venue: true }
    });

    res.status(201).json(program);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create program' });
  }
});

export default router;
