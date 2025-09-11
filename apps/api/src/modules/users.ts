import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth.js';
import { prisma } from '../database.js';

const router = Router();

// 사용자 프로필 조회
router.get('/profile', authenticateJWT, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: (req.user as any).id },
      select: { id: true, email: true, name: true, avatar: true, createdAt: true }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
});

// 사용자 목록 조회 (관리자)
router.get('/', authenticateJWT, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, createdAt: true }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// 프로필 업데이트
router.put('/profile', authenticateJWT, async (req, res) => {
  try {
    const { name, avatar } = req.body;
    const user = await prisma.user.update({
      where: { id: (req.user as any).id },
      data: { name, avatar },
      select: { id: true, email: true, name: true, avatar: true }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile' });
  }
});

export default router;
