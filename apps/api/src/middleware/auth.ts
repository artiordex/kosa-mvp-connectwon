/**
 * Description : tsconfig.json - 📌 모노레포 전체를 위한 통합 TypeScript 설정
 * Author : Shiwoo Min
 * Date : 2025-09-07
 */

import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { prisma } from '../database.js';

const router = Router();

// 로컬 로그인
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err: any, user: any, info: any) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });

    const token = jwt.sign(
      { userId: user.id },
      process.env['JWT_SECRET']!,
      { expiresIn: '24h' }
    );

    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  })(req, res, next);
});

// 회원가입
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        provider: 'LOCAL'
      }
    });

    const token = jwt.sign(
      { userId: user.id },
      process.env['JWT_SECRET']!,
      { expiresIn: '24h' }
    );

    res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    res.status(400).json({ message: 'Registration failed' });
  }
});

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign(
      { userId: (req.user as any).id },
      process.env['JWT_SECRET']!,
      { expiresIn: '24h' }
    );
    res.redirect(`${process.env['FRONTEND_URL']}/auth/callback?token=${token}`);
  }
);

// 로그아웃
router.post('/logout', (req, res) => {
  req.logout(() => {
    res.json({ message: 'Logged out successfully' });
  });
});

export default router;
